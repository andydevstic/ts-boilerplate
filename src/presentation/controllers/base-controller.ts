import { injectable } from "inversify";

import { ICrudRemoteFacade, IParser, IRequest } from "@src/shared/interfaces";

@injectable()
export abstract class BaseController<T> {
  constructor(
    protected remoteFacade: ICrudRemoteFacade<T>,
    protected optionsParser: IParser,
  ) {}

  public findOrPaginate(req: IRequest) {
    const { limit } = req.context.queryString;

    return limit ? this.paginate(req) : this.find(req);
  }

  public async find(req: IRequest): Promise<Partial<T>[]> {
    const findOptions = req.context.queryString;
    const parsedOptions = this.optionsParser.parse(findOptions);

    const findResult = await this.remoteFacade.find(parsedOptions);

    return findResult;
  }

  public async paginate(req: IRequest) {
    const findOptions = req.context.queryString;
    const parsedOptions = this.optionsParser.parse(findOptions);

    const { docs, totalCount } = await this.remoteFacade.paginate(parsedOptions);

    return {
      docs,
      totalCount,
    };
  }

  public async findById(req: IRequest) {
    const { id } = req.params;
    const findOptions = req.context.queryString;
    const parsedOptions = this.optionsParser.parse(findOptions);

    return this.remoteFacade.findById(id, parsedOptions);
  }

  public create(req: IRequest): Promise<T> {
    const createData = req.body;

    return this.remoteFacade.create(createData);
  }

  public updateById(req: IRequest): Promise<T> {
    const { id } = req.params;
    const updateData = req.body;

    return this.remoteFacade.updateById(id, updateData);
  }

  public deleteById(req: IRequest): Promise<void> {
    const { id } = req.params;

    return this.remoteFacade.deleteById(id);
  }
}