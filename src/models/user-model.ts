import { constructorProvide } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_TYPES } from '@src/shared/constants';
import { Column, CreatedAt, DataType, Model, Table } from 'sequelize-typescript';

@constructorProvide(API_PROVIDER_TYPES.DB_MODEL)
@Table({
  tableName: 'users',
  updatedAt: false,
})
export class UserModel extends Model<UserModel> {
  public static tableName = 'users';

  @Column({
    type: DataType.STRING,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    field: 'user_index',
  })
  userIndex: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'location_id',
  })
  locationId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'first_name',
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'last_name',
  })
  lastName: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'date_of_birth'
  })
  dateOfBirth: Date;

  @Column({
    type: DataType.TEXT({ length: 'medium' }),
    allowNull: false,
  })
  picture: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at'
  })
  createdAt: Date;
}
