"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Joi = void 0;
const joi = __importStar(require("joi"));
const lodash_1 = __importDefault(require("lodash"));
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
            const data = lodash_1.default.last(helper.state.ancestors);
            const groupName = schema.$_getFlag('groupName');
            if (groupName) {
                if (!data.__group) {
                    data.__group = {};
                }
                if (!data.__group[groupName]) {
                    data.__group[groupName] = {};
                }
                data.__group[groupName][lodash_1.default.last(helper.state.path)] = value;
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
exports.Joi = joi.extend(...extended);
//# sourceMappingURL=_extension.js.map