import { IJoiError } from './IError';
export default class ErrorCompact extends Error {
    /**
     * Joi error instance
     * @type {IJoiError}
     */
    joiError: IJoiError;
    /**
     * This object defined a template to format a string by key-value
     * @type {{[p: string]: string}}
     */
    context: {
        [key: string]: string;
    };
    /**
     * Code name. Refer to i18n config
     * @type {string}
     */
    code: string;
    /**
     * field name
     * @type {string}
     */
    field: string;
    /**
     * local field code
     * @type {string}
     */
    locale_field: string;
    /**
     * @param {IJoiError} config.joiError
     * @param {object} config.context
     * @param {string} config.code
     * @param {string} config.field
     * @param {string} config.locale_field
     */
    constructor(config: {
        joiError: any;
        code: any;
        context: any;
        field: any;
        locale_field: any;
    });
}
