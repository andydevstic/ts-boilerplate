import { Schema } from "mongoose";

import { IGeneralType } from "@src/shared/interfaces";
import { BaseModel } from "./base-model";

export class UserStatus extends BaseModel {
  protected get schema() {
    return new Schema<IGeneralType>({
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    }, { collection: 'user_status' });
  }
}
