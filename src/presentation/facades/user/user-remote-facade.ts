import { Sequelize } from "sequelize-typescript";

import { BaseRemoteFacade } from "../base";
import { UserHistoryModel, UserModel } from "@src/models";
import { injectNamed, provideSingletonNamed, useLruCache } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES, MODEL_NAMES, TABLE_NAMES, USER_ACTION_TYPES } from "@src/shared/constants";
import { ICrudRemoteFacade } from "@src/shared/interfaces";

@provideSingletonNamed(API_PROVIDER_TYPES.REMOTE_FACADE, MODEL_NAMES.USER)
export class UserRemoteFacade extends BaseRemoteFacade<UserModel> implements ICrudRemoteFacade<UserModel> {
  protected userHistoryRepository: any;
  protected postgresConnection: Sequelize;

  constructor(
    @injectNamed(API_PROVIDER_TYPES.ADAPTER, API_PROVIDER_NAMES.POSTGRES)
    postgresAdapter: any,
  ) {
    const userRepository = postgresAdapter.getRepository(TABLE_NAMES.USER);

    super(userRepository);

    this.postgresConnection = postgresAdapter.getConnection();
    this.userHistoryRepository = postgresAdapter.getRepository(TABLE_NAMES.USER_HISTORY);
  }

  public async paginateUnwatchedUsers(sessionUserIndex: number, paginationOptions?: any) {
    const { limit, offset } = paginationOptions;
    const userLastWatched: UserHistoryModel = await this.userHistoryRepository.findOne({
      where: { userIndex: sessionUserIndex },
      order: [['targetUserIndex', 'DESC']],
    });

    const userLastWatchedIndex = userLastWatched ? userLastWatched.targetUserIndex : 0;

    const nextPageUsers: any[] = await this.postgresConnection.query(`
      SELECT id,
             user_index AS "userIndex",
             first_name || ' ' || last_name AS "fullName",
             date_of_birth AS "dateOfBirth",
             picture
      FROM users
      WHERE user_index > $userLastWatchedIndex
        AND user_index != $sessionUserIndex
      ORDER BY user_index ASC
      LIMIT $limit OFFSET $offset;
    `, { type: 'SELECT', bind: { userLastWatchedIndex, sessionUserIndex, limit, offset } });

    const results = await this.addIsMatchedPropsIfAny(sessionUserIndex, nextPageUsers);

    return results;
  }

  @useLruCache({
    ttlInSeconds: 30,
    customHashFn: (userId) => `user:${userId}`,
  })
  public findById(userId: string, options?: any) {
    return super.findById(userId, options);
  }

  public recordUserAction(sessionUserIndex: number, actionId: number, targetUserIndex: number): Promise<void> {
    return this.userHistoryRepository.create({
      userIndex: sessionUserIndex,
      actionId,
      targetUserIndex,
    });
  }

  public async paginateUserHistory(sessionUserIndex: number, actionId: number, paginationOptions?: any) {
    const { limit, offset } = paginationOptions;

    await this.userHistoryRepository.findAll({
      where: { userIndex: sessionUserIndex, actionId },
      order: [['targetUserIndex', 'DESC']],
      limit,
      offset,
      raw: true,
    });

    const historyUsers: any[] = await this.postgresConnection.query(`
      SELECT users.id,
             users.user_index AS "userIndex",
             users.first_name || ' ' || last_name AS "fullName",
             users.date_of_birth AS "dateOfBirth",
             users.picture
      FROM user_histories JOIN users
        ON users.user_index = user_histories.target_user_index
      WHERE user_histories.user_index = $sessionUserIndex
        AND user_histories.action_id = $actionId
      ORDER BY user_histories.target_user_index ASC
      LIMIT $limit OFFSET $offset;
    `, { type: 'SELECT', bind: { sessionUserIndex, limit, offset, actionId } });

    const results = actionId === USER_ACTION_TYPES.LIKED
      ? await this.addIsMatchedPropsIfAny(sessionUserIndex, historyUsers)
      : historyUsers;

    return results;
  }

  protected async addIsMatchedPropsIfAny(sessionUserIndex: number, toBeCheckedUsers: UserModel[]) {
    const userIndexesToCheckForMatches = toBeCheckedUsers.map(i => i.userIndex);
    const matchedUsers = await this.filterMatchedUsersForSessionUserIndex(sessionUserIndex, userIndexesToCheckForMatches);

    const setOfMatchedUsers = new Set(matchedUsers);

    return toBeCheckedUsers.map(user => ({
      ...user,
      isMatch: setOfMatchedUsers.has(user.userIndex),
    }));
  }

  public async filterMatchedUsersForSessionUserIndex(sessionUserIndex: number, userIndexesToCheckForMatches: number[]): Promise<number[]> {
    const results: Partial<UserModel>[] = await this.postgresConnection.query(`
      SELECT user_index AS "userIndex" FROM user_histories
      WHERE target_user_index = $sessionUserIndex
        AND action_id = $actionId
        AND user_index IN (${userIndexesToCheckForMatches.join(', ')});
    `, { type: 'SELECT', bind: { sessionUserIndex, actionId: USER_ACTION_TYPES.LIKED, userIndexesToCheckForMatches } });

    return results.length ? results.map(i => i.userIndex) : [];
  }
}