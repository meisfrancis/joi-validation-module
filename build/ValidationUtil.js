"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateValidation = exports.removeDuplicate = void 0;
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const removeDuplicate = (duplicateBy) => {
    return value => {
        if (Object.prototype.toString.call(value) === '[object String]') {
            return lodash_1.default.uniq(value);
        }
        return lodash_1.default.uniqBy(value, duplicateBy);
    };
};
exports.removeDuplicate = removeDuplicate;
const DateValidation = (keyPair, limited) => {
    return value => {
        let dateFrom;
        let dateTo;
        if (Array.isArray(value)) {
            [dateFrom, dateTo] = value;
        }
        else {
            dateFrom = value[keyPair.from];
            dateTo = value[keyPair.to];
        }
        if (dateFrom && dateTo) {
            const isDate = (v) => Object.prototype.toString.call(v) === '[object Date]';
            if (!isDate(dateFrom)) {
                dateFrom = new Date(dateFrom);
            }
            if (!isDate(dateTo)) {
                dateTo = new Date(dateTo);
            }
            if (dateFrom.getTime() > dateTo.getTime()) {
                throw new Error('DATE_FROM_GT_DATE_TO');
            }
            if (limited && moment_1.default(dateTo).diff(moment_1.default(dateFrom), 'day') > 30) {
                throw new Error('LIMITED_DATE_RANGE');
            }
        }
        return value;
    };
};
exports.DateValidation = DateValidation;
//# sourceMappingURL=ValidationUtil.js.map