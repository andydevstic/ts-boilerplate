import { injectable } from 'inversify';

import { ICrudRemoteFacade, PaginateResult } from '@src/shared/interfaces';

@injectable()
export abstract class BaseRemoteFacade<T> implements Partial<ICrudRemoteFacade<T>> {
  constructor(protected repository: any) {}

  public find(options?: any): Promise<T[]> {
    return this.repository.find(options);
  }

  public async paginate(options: any): Promise<PaginateResult<T>> {
    const { rows, count } = await this.repository.findAndCountAll(options);

    return {
      totalCount: count,
      docs: rows,
    }
  }

  public async findById(id: any, options?: any): Promise<T> {
    const doc = await this.repository.findOne({
      where: { id },
      ...options,
    });

    return doc;
  }

  public async create(data: any, options?: any): Promise<T> {
    const newEntity = await this.repository.create(data, options);

    return newEntity;
  };

  public async updateById(id: number, data: Partial<T>, options?: any): Promise<T> {
    const updatedEntity = await this.repository.update(data, {
      where: { id },
      ...options,
    });

    return updatedEntity;
  }

  public deleteById(id: number, options?: any): Promise<void> {
    return this.repository.destroy({
      where: { id },
      ...options,
    });
  }
}
