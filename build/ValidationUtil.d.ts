import { CustomValidator } from 'joi';
export declare const removeDuplicate: (duplicateBy?: any) => CustomValidator;
export declare const DateValidation: (keyPair: {
    from: string;
    to: string;
}, limited?: number) => CustomValidator;
