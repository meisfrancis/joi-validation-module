"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorCompact extends Error {
    /**
     * @param {IJoiError} config.joiError
     * @param {object} config.context
     * @param {string} config.code
     * @param {string} config.field
     * @param {string} config.locale_field
     */
    constructor(config) {
        super();
        this.joiError = config.joiError;
        this.code = config.code;
        this.context = config.context;
        this.field = config.field;
        this.locale_field = config.locale_field;
    }
}
exports.default = ErrorCompact;
//# sourceMappingURL=ErrorCompact.js.map