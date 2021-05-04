import { ILocalizationCallback } from './IError';
import * as Joi from 'joi';
import ErrorCompact from './ErrorCompact';

export class Validator {
  static instance: Validator;

  private readonly _fieldCallback!: ILocalizationCallback;
  private readonly _errorCallback!: ILocalizationCallback;

  constructor(config: { _fieldCallback?: ILocalizationCallback; _errorCallback: ILocalizationCallback }) {
    if (!Validator.instance) {
      this._fieldCallback = config._fieldCallback;
      this._errorCallback = config._errorCallback;

      Validator.instance = this;
    }

    return Validator.instance;
  }

  public validate(schema: Joi.Schema, input: any, lang?: string) {
    // Get data from key(params|query|body) in Request
    const result = schema.validate(input, {
      stripUnknown: true,
    });
    let message = '';
    let data: Record<string, any> = {};

    if (result.error) {
      const joiErrorCompact = <ErrorCompact>(<unknown>result.error);

      let label;
      if (joiErrorCompact.field) {
        label = joiErrorCompact.field;
      } else if (this._fieldCallback && joiErrorCompact.locale_field) {
        label = this._fieldCallback(lang, joiErrorCompact.locale_field);
      } else {
        label = joiErrorCompact.joiError?.local?.label;
      }

      message = this._errorCallback(lang, joiErrorCompact.code, label, joiErrorCompact.context);
    } else {
      data = result.value;
    }

    return {
      error: result.error ? 1 : 0,
      message,
      data,
    };
  }
}
