import { Context, ErrorReport } from 'joi';
export interface IJoiError extends ErrorReport {
    local?: Context;
}
/**
 * Configure the validation error
 * @interface IJoiErrorOptions
 * @property {string} code Force error return this code.
 * @property {string} field Force value for field returned.
 * Define value for this prop will make it replace the string 'category' in the following example
 * For example:
 * ---> category is invalid!
 * @property {string} locale_field Like #field, but it's affected by i18n config
 */
export interface IJoiErrorOptions {
    code?: string;
    field?: string;
    locale_field?: string;
}
export declare type ILocalizationCallback = (...args: unknown[]) => string;
