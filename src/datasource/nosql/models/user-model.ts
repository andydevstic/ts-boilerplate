import { Schema } from "mongoose";

import { IUser } from "@src/shared/interfaces";
import { BaseModel } from "./base-model";

export class User extends BaseModel {
  public static toSessionUser(user: IUser): Partial<IUser> {
    return {
      email: user.email,
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      userType: user.userType,
      status: user.status,
      meta: user.meta,
    };
  }

  protected get schema() {
    return new Schema<IUser>({
      fullName: {
        type: String,
      },
      email: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      status: {
        type: Number,
        required: true,
      },
      userType: {
        type: Number,
        required: true,
      },
      meta: {
        type: Object,
      }
    }, { collection: 'users' });
  }
}
