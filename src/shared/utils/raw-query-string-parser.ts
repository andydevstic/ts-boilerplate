import { provideNamed } from "@src/presentation/core/ioc/decorators";
import { API_PROVIDER_NAMES, API_PROVIDER_TYPES } from "../constants";
import { BadRequestError } from "../errors";
import { ApiQueryString, IParser, RawQueryString } from "../interfaces";

@provideNamed(API_PROVIDER_TYPES.PARSER, API_PROVIDER_NAMES.API_QUERY_STRING)
export class ApiQueryStringParser implements IParser<ApiQueryString> {
  protected parsedResult: any = {};

  public parse(rawQueryString: RawQueryString): ApiQueryString {
    return this.parseRawData(rawQueryString);
  }

  public parseRawData(rawData: RawQueryString): ApiQueryString {
    if (!rawData) {
      return;
    }

    try {
      const { select, filters, sort, limit, page, offset, actionId } = rawData;

      if (select) { this.parseSelect(select); }
      if (filters) { this.parseFilters(filters); }
      if (sort) { this.parseSort(sort); }
      if (actionId) { this.parsedResult.actionId = this.parseNumber(actionId); }
      if (limit && (page || offset)) { this.parsePaging(limit, page, offset); }

      return this.parsedResult as ApiQueryString;
    } catch (error) {
      throw new BadRequestError('Error parsing raw query string', error);
    }
  }

  private parseSelect(rawSelect: string): void {
    this.parsedResult.select = rawSelect;
  }

  private parseFilters(rawFilters: string): void {
    try {
      this.parsedResult.filters = JSON.parse(rawFilters);
    } catch (error) {
      throw new BadRequestError('Invalid JSON for field Filters');
    }
  }

  private parseSort(rawSort: string): void {
    try {
      this.parsedResult.sort = JSON.parse(rawSort);
    } catch (error) {
      throw new BadRequestError('Invalid JSON for field Sort');
    }
  }

  private parseNumber(rawNumber: string): number {
    const parsedNumber = Number(rawNumber);

    if (isNaN(parsedNumber)) {
      throw new BadRequestError('Invalid number value');
    }

    return parsedNumber;
  }

  private parsePaging(limit: string, page: string, offset: string): void {
    const parsedLimit = Number(limit);
    const parsedPage = Number(page);
    const parsedOffset = Number(offset);

    if (isNaN(parsedLimit) || (isNaN(parsedPage) && isNaN(parsedOffset))) {
      throw new BadRequestError('Invalid number for limit or page or offset');
    }

    this.parsedResult.limit = parsedLimit;

    if (page) {
      this.parsedResult.page = parsedPage;

      return;
    }
    if (offset) {
      this.parsedResult.offset = parsedOffset;

      return;
    }
  }
}
