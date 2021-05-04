"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiErrorHandler = void 0;
const ErrorCompact_1 = __importDefault(require("./ErrorCompact"));
/**
 * Convert joi error to validate error
 * @param {IJoiError} joiError
 * @returns {[string, {[p: string]: string}]}
 */
function _getErrorCode(joiError) {
    var _a;
    const joiErrorCode = joiError.code;
    const joiContext = joiError.local;
    let code;
    const context = {};
    //region Convert Joi Context to i18n context
    switch (joiErrorCode) {
        case 'any.custom':
            code = (_a = joiContext === null || joiContext === void 0 ? void 0 : joiContext.error) === null || _a === void 0 ? void 0 : _a.message;
            break;
        case 'any.required':
            code = 'REQUIRED';
            break;
        case 'array.base':
            code = 'ARRAY';
            break;
        case 'string.min':
            code = 'MIN_STRING';
            context['min_value'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.limit;
            break;
        case 'string.max':
            code = 'MAX_STRING';
            context['max_value'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.limit;
            break;
        case 'number.min':
            code = 'MIN_NUMBER';
            context['min_value'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.limit;
            break;
        case 'number.max':
            code = 'MAX_NUMBER';
            context['max_value'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.limit;
            break;
        case 'array.min':
            code = 'MIN_ARRAY';
            context['min_value'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.limit;
            break;
        case 'array.max':
            code = 'MAX_ARRAY';
            context['max_value'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.limit;
            break;
        case 'date.format':
            code = 'INVALID_DATE_FORMAT';
            break;
        case 'object.with':
            code = 'INVALID_WITH';
            context['main'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.main;
            context['peer'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.peer;
            break;
        case 'object.and':
            code = 'INVALID_AND';
            context['missing'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.missing.join();
            context['present'] = joiContext === null || joiContext === void 0 ? void 0 : joiContext.present.join();
            break;
        default:
            code = 'INVALID';
            break;
    }
    //endregion
    return [code, context];
}
function joiErrorHandler(opts) {
    return ([error]) => {
        if (error instanceof ErrorCompact_1.default) {
            return error;
        }
        const { code, field, locale_field } = opts || {};
        const [validateCode, context] = code ? [code, {}] : _getErrorCode(error);
        return new ErrorCompact_1.default({
            joiError: error || error,
            code: validateCode,
            context,
            field,
            locale_field,
        });
    };
}
exports.joiErrorHandler = joiErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map