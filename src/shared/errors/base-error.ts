export class BaseError extends Error {
  public readonly isCustomError = true;
  public details?: any;
  public status: number;
  public type: string;

  constructor(message: string, type: string, status?: number, details?: any) {
    super(message);
    this.type = type;
    this.status = status;
    this.details = details;
  }
}
