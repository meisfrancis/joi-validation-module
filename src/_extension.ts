import * as joi from 'joi';
import _ from 'lodash';

import * as extensionType from './_extension_type';

/**
 * This extension adds a rule that will group the relevant fields based on the given group name.
 * NOTE: If you intend to add another extension, please make sure this either this extension is extended lastly or your extension inherit this.
 * @param type
 * @returns {(_joi) => {prepare(value, helper): {value: any}, flags: {groupName: {default: string}}, rules: {group: {method(groupName): void}}, type: any, base: any}}
 * @example
 * // Extend this as the last
 * const extension1 = joi.extend(...);
 * const extension2 = extension1.extend(...);
 * const groupExtension = extension2.extend(...);
 *
 * // Inherit from group extension
 * const extension1 = groupExtension.extend(...);
 * const extension2 = extension1.extend(...);
 */
const _groupExtension = type => _joi => {
  return {
    type,
    base: _joi[type](),
    flags: {
      groupName: { default: '' },
    },
    prepare(value, helper) {
      const schema = helper.schema;
      const data = _.last(helper.state.ancestors) as any;
      const groupName = schema.$_getFlag('groupName');
      if (groupName) {
        if (!data.__group) {
          data.__group = {};
        }
        if (!data.__group[groupName]) {
          data.__group[groupName] = {};
        }

        data.__group[groupName][_.last(helper.state.path) as string] = value;
      }
      return { value };
    },
    rules: {
      group: {
        method(groupName) {
          return this.$_setFlag('groupName', groupName);
        },
      },
    },
  };
};

const extended = Array.from(joi['_types']).map(i => _groupExtension(i));

export const Joi: typeof extensionType = joi.extend(...extended);
