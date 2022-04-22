import { EnumDataType } from '@/enum';

export function isNumber(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.number;
}
export function isString(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.string;
}
export function isBoolean(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.boolean;
}
export function isNull(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.null;
}
export function isUndefined(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.undefined;
}
export function isObject(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.object;
}
export function isArray(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.array;
}
export function isDate(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.date;
}
export function isRegExp(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.regexp;
}
export function isSet(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.set;
}
export function isMap(data: unknown) {
  return Object.prototype.toString.call(data) === EnumDataType.map;
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined';
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val);
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}
export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val);
}
