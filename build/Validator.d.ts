import { ILocalizationCallback } from './IError';
import * as Joi from 'joi';
export declare class Validator {
    static instance: Validator;
    private readonly _fieldCallback;
    private readonly _errorCallback;
    constructor(config: {
        _fieldCallback?: ILocalizationCallback;
        _errorCallback: ILocalizationCallback;
    });
    validate(schema: Joi.Schema, input: any, lang?: string): {
        error: number;
        message: string;
        data: Record<string, any>;
    };
}
