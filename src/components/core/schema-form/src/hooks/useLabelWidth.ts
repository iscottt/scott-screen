import { computed, unref } from 'vue';
import type { Ref } from 'vue';
import type { FormSchema } from '../types/form';
import type { SchemaFormProps } from '../schema-form';
import { isNumber } from '@/utils';

export function useItemLabelWidth(schemaRef: Ref<FormSchema>, formPropsRef: Ref<SchemaFormProps>) {
  return computed(() => {
    const schemaItem = unref(schemaRef);
    const { labelCol = {}, wrapperCol = {} } = schemaItem.formItemProps || {};
    const { labelWidth, disabledLabelWidth } = schemaItem;

    const {
      labelWidth: globalLabelWidth,
      labelCol: globalLabelCol,
      wrapperCol: globWrapperCol,
    } = unref(formPropsRef) as any;

    // 如果labelWidth是全局设置的，则会设置所有项
    if ((!globalLabelWidth && !labelWidth && !globalLabelCol) || disabledLabelWidth) {
      labelCol.style = {
        textAlign: 'left',
      };
      return { labelCol, wrapperCol };
    }
    let width = labelWidth || globalLabelWidth;
    const col = { ...globalLabelCol, ...labelCol };
    const wrapCol = { ...globWrapperCol, ...wrapperCol };

    if (width) {
      width = isNumber(width) ? `${width}px` : width;
    }

    return {
      labelCol: { style: { width }, ...col },
      wrapperCol: { style: { width: `calc(100% - ${width})` }, ...wrapCol },
    };
  });
}
