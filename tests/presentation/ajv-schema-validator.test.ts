import { expect } from 'chai';

import { AjvSchemaValidator } from '@src/presentation/validations/ajv-schema-validator';
import { AjvErrorFormater } from '@src/shared';

const mockValidationSchemas = [
  {
    schema: {
      $id: 'paginationSchema',
      type: 'object',
      required: ['limit'],
      properties: {
        limit: {
          type: 'integer',
          minimum: 1,
        },
        offset: {
          type: 'integer',
          minimum: 0,
        },
      },
    }
  },
]

const ajvErrorFormatter = new AjvErrorFormater({
  debug: () => {},
  error: () => {},
  info: () => {},
  warn: () => {},
});

const ajvSchemaValidator = new AjvSchemaValidator(mockValidationSchemas, ajvErrorFormatter);

describe('Ajv schema validator', () => {
  it('Should pass if dto is valid', () => {
    const dto = {
      limit: 20,
      offset: 0,
    };

    const validationResult = ajvSchemaValidator.validate('paginationSchema', dto);

    expect(validationResult.valid).to.be.true;
  });

  it('Should throw if dto is missing required property', () => {
    const dto = {
      offset: 0,
    };

    const validationResult = ajvSchemaValidator.validate('paginationSchema', dto);

    expect(validationResult.valid).to.be.false;
  });

  it('Should throw if dto is invalid', () => {
    const dto = {
      limit: 0,
      offset: 1,
    };

    const validationResult = ajvSchemaValidator.validate('paginationSchema', dto);

    expect(validationResult.valid).to.be.false;
  });
});