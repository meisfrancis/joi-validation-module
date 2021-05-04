"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
class Validator {
    constructor(config) {
        if (!Validator.instance) {
            this._fieldCallback = config._fieldCallback;
            this._errorCallback = config._errorCallback;
            Validator.instance = this;
        }
        return Validator.instance;
    }
    validate(schema, input, lang) {
        var _a, _b;
        // Get data from key(params|query|body) in Request
        const result = schema.validate(input, {
            stripUnknown: true,
        });
        let message = '';
        let data = {};
        if (result.error) {
            const joiErrorCompact = result.error;
            let label;
            if (joiErrorCompact.field) {
                label = joiErrorCompact.field;
            }
            else if (this._fieldCallback && joiErrorCompact.locale_field) {
                label = this._fieldCallback(lang, joiErrorCompact.locale_field);
            }
            else {
                label = (_b = (_a = joiErrorCompact.joiError) === null || _a === void 0 ? void 0 : _a.local) === null || _b === void 0 ? void 0 : _b.label;
            }
            message = this._errorCallback(lang, joiErrorCompact.code, label, joiErrorCompact.context);
        }
        else {
            data = result.value;
        }
        return {
            error: result.error ? 1 : 0,
            message,
            data,
        };
    }
}
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map