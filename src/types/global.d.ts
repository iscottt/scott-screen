/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void];
}

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string;

declare type EmitFn<E = EmitsOptions> = SetupContext<E>['emit'];

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type Recordable<T = any> = Record<string, T>;

declare type Indexable<T = any> = {
  [key: string]: T;
};

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
