import { IJoiError, IJoiErrorOptions } from './IError';
import { ValidationErrorFunction } from 'joi';
import ErrorCompact from './ErrorCompact';

/**
 * Convert joi error to validate error
 * @param {IJoiError} joiError
 * @returns {[string, {[p: string]: string}]}
 */
function _getErrorCode(joiError: IJoiError): [string, { [key: string]: string }] {
  const joiErrorCode = joiError.code;
  const joiContext = joiError.local;
  let code;
  const context: Record<string, any> = {};
  //region Convert Joi Context to i18n context
  switch (joiErrorCode) {
    case 'any.custom':
      code = joiContext?.error?.message;
      break;
    case 'any.required':
      code = 'REQUIRED';
      break;
    case 'array.base':
      code = 'ARRAY';
      break;
    case 'string.min':
      code = 'MIN_STRING';
      context['min_value'] = joiContext?.limit;
      break;
    case 'string.max':
      code = 'MAX_STRING';
      context['max_value'] = joiContext?.limit;
      break;
    case 'number.min':
      code = 'MIN_NUMBER';
      context['min_value'] = joiContext?.limit;
      break;
    case 'number.max':
      code = 'MAX_NUMBER';
      context['max_value'] = joiContext?.limit;
      break;
    case 'array.min':
      code = 'MIN_ARRAY';
      context['min_value'] = joiContext?.limit;
      break;
    case 'array.max':
      code = 'MAX_ARRAY';
      context['max_value'] = joiContext?.limit;
      break;
    case 'date.format':
      code = 'INVALID_DATE_FORMAT';
      break;
    case 'object.with':
      code = 'INVALID_WITH';
      context['main'] = joiContext?.main;
      context['peer'] = joiContext?.peer;
      break;
    case 'object.and':
      code = 'INVALID_AND';
      context['missing'] = joiContext?.missing.join();
      context['present'] = joiContext?.present.join();
      break;
    default:
      code = 'INVALID';
      break;
  }
  //endregion

  return [code, context];
}

export function joiErrorHandler(opts?: IJoiErrorOptions): ValidationErrorFunction {
  return ([error]: Array<IJoiError>): ErrorCompact | IJoiError => {
    if (error instanceof ErrorCompact) {
      return error;
    }

    const { code, field, locale_field } = opts || {};
    const [validateCode, context] = code ? [code, {}] : _getErrorCode(error);

    return new ErrorCompact({
      joiError: ((error as unknown) as ErrorCompact['joiError']) || error,
      code: validateCode,
      context,
      field,
      locale_field,
    });
  };
}
