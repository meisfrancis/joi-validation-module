import { CustomValidator } from 'joi';
import _ from 'lodash';
import moment from 'moment';

export const removeDuplicate = (duplicateBy?: any): CustomValidator => {
  return value => {
    if (Object.prototype.toString.call(value) === '[object String]') {
      return _.uniq(value);
    }
    return _.uniqBy(value, duplicateBy);
  };
};

export const DateValidation = (keyPair: { from: string; to: string }, limited?: number): CustomValidator => {
  return value => {
    let dateFrom;
    let dateTo;
    if (Array.isArray(value)) {
      [dateFrom, dateTo] = value;
    } else {
      dateFrom = value[keyPair.from];
      dateTo = value[keyPair.to];
    }

    if (dateFrom && dateTo) {
      const isDate = (v: unknown) => Object.prototype.toString.call(v) === '[object Date]';
      if (!isDate(dateFrom)) {
        dateFrom = new Date(dateFrom);
      }
      if (!isDate(dateTo)) {
        dateTo = new Date(dateTo);
      }
      if (dateFrom.getTime() > dateTo.getTime()) {
        throw new Error('DATE_FROM_GT_DATE_TO');
      }
      if (limited && moment(dateTo).diff(moment(dateFrom), 'day') > 30) {
        throw new Error('LIMITED_DATE_RANGE');
      }
    }

    return value;
  };
};
