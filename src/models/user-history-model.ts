import { constructorProvide } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_TYPES } from '@src/shared/constants';
import { Column, CreatedAt, DataType, Model, Table } from 'sequelize-typescript';

@constructorProvide(API_PROVIDER_TYPES.DB_MODEL)
@Table({
  tableName: 'user_histories',
  updatedAt: false,
})
export class UserHistoryModel extends Model<UserHistoryModel> {
  public static tableName = 'user_histories';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_index',
  })
  userIndex: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'action_id',
  })
  actionId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'target_user_index',
  })
  targetUserIndex: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at'
  })
  createdAt: Date;
}