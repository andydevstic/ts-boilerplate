import { BaseError } from "./base-error";

export class FakeError extends BaseError {
  constructor(message?: string) {
    super(message, 'Fake', 200);
  }
}