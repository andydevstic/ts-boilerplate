import { constructorProvide } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_TYPES } from '@src/shared/constants';
import { Column, CreatedAt, DataType, Model, Table } from 'sequelize-typescript';

@constructorProvide(API_PROVIDER_TYPES.DB_MODEL)
@Table({
  tableName: 'user_action_types'
})
export class UserActionTypesModel extends Model<UserActionTypesModel> {
  public static tableName = 'user_action_types';

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'action_name',
  })
  actionName: number;

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
