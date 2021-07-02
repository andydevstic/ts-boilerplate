import { BaseError } from './base-error';
import { AxiosError as OriginalAxiosError } from 'axios';

export class AxiosError extends BaseError {
  private static _axiosErrorGeneralMessage = 'Error sending HTTP request';
  public static wrapError(error: any) {
    if (error.isCustomError) { return error; }
    return new AxiosError(error);
  }

  constructor(axiosError: OriginalAxiosError) {
    const axiosErrorResponse = axiosError.response || {
      statusText: axiosError.message,
      status: axiosError.code as any,
      data: '',
    };

    super(
      AxiosError._axiosErrorGeneralMessage,
      axiosErrorResponse.statusText,
      axiosErrorResponse.status,
      axiosErrorResponse.data,
    );
  }
}