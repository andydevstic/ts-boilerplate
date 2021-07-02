import { FindOptions, WhereOptions } from 'sequelize';
import { isArray } from 'lodash';

import { provideNamed } from '@src/presentation/core/ioc/decorators';
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from '../constants';
import { ICriteria, IFilter, IParser, ISort } from '../interfaces';
import { BadRequestError } from '../errors';

@provideNamed(API_PROVIDER_TYPES.PARSER, API_PROVIDER_NAMES.SEQUELIZE_OPTIONS)
export class SequelizeOptionsParser implements IParser<FindOptions> {

  public parse(rawCriteria: ICriteria): FindOptions {
    if (!rawCriteria) {
      return;
    }

    const parsedCriteria: any = {};
    const { select, filters, limit, page, sort, offset } = rawCriteria;

    if (select && select.length) {
      parsedCriteria.attributes = this.parseSelect(select);
    }

    if (filters && filters.length) {
      parsedCriteria.where = this.parseFilters(filters);
    }

    if (limit) {
      parsedCriteria.limit = limit;
      parsedCriteria.offset = page !== undefined ? page * limit : (limit || 0);
    }

    if (sort) {
      parsedCriteria.order = this.parseSort(sort);
    }

    return parsedCriteria;
  }

  private parseSelect(rawSelect: any): any[] {
    if (isArray(rawSelect)) {
      return rawSelect;
    }

    if (typeof rawSelect === 'string') {
      const selectColumns = rawSelect.split(',').map(i => i.trim());

      return selectColumns;
    }

    throw new Error('Select must be a string or an array');
  }

  private parseSort(sort: ISort): [string, string][] {
    if (!sort || !sort.column) {
      return;
    }

    const columns = sort.column.split('.').map(i => i.trim());

    return columns.map(columnName => [columnName, sort.direction]);
  }

  private parseFilters(filters: IFilter[]): WhereOptions {
    const where: WhereOptions = {};

    filters.forEach((filter) => {
      if (!filter.operator || !filter.field) {
        return;
      }

      switch (filter.operator) {
        case 'equals':
          where[filter.field] = filter.value;
          break;
        case 'not_equals':
          where[filter.field] = { $not: filter.value };
          break;
        case 'contains':
          where[filter.field] = { $like: `%${filter.value}%` };
          break;
        case 'does_not_contain':
          where[filter.field] = { $notLike: `%${filter.value}%` };
          break;
        case 'contains_case_insensitive':
          where[filter.field] = { $iLike: `%${filter.value}%` };
          break;
        case 'does_not_contain_case_insensitive':
          where[filter.field] = { $notILike: `%${filter.value}%` };
          break;
        case 'starts_with':
          where[filter.field] = { $like: `${filter.value}%` };
          break;
        case 'ends_with':
          where[filter.field] = { $like: `%${filter.value}` };
          break;
        case 'in':
          where[filter.field] = { $in: filter.value };
          break;
        case 'not_in':
          where[filter.field] = { $notIn: filter.value };
          break;
        case 'is':
          where[filter.field] = { $in: filter.value };
          break;
        case 'is_not':
          where[filter.field] = { $notIn: filter.value };
          break;
        case 'is_greater_than':
          where[filter.field] = { $gt: filter.value };
          break;
        case 'is_smaller_than':
          where[filter.field] = { $lt: filter.value };
          break;
        case 'between':
          where[filter.field] = { $between: filter.value };
          break;
        default:
          throw new BadRequestError(`Operator ${filter.operator} not supported`);
      }
    });

    return where;
  }
}
