import { injectable } from "inversify";
import { Connection, Model } from "mongoose";

@injectable()
export class BaseModel {
  protected get schema(): any {
    throw new Error('Model schema not implemented');
  }

  protected static _connectionRegistry = new Map<string, Map<Connection, Model<any>>>();

  public static useConnection(conn: Connection): Model<any> {
    let connectionMap = this._connectionRegistry.get(this.name);

    if (!connectionMap) {
      connectionMap = new Map<Connection, Model<any>>();
      this._connectionRegistry.set(this.name, connectionMap);
    }

    if (connectionMap.has(conn)) {
      return connectionMap.get(conn);
    }

    const modelInstance = new this();

    const connectionModel = conn.model(this.name, modelInstance.schema);
    connectionMap.set(conn, connectionModel);

    return connectionModel;
  }
}
