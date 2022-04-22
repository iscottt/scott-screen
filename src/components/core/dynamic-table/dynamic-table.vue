<template>
  <a-table
    :columns="cols"
    :loading="loading"
    :rowSelection="rowSelection"
    :rowKey="rowKey"
    :data-source="data"
    :pagination="pageOptions"
    size="middle"
    :customRow="customRow"
    v-bind="{ ...$attrs }"
    :rowClassName="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
    @change="paginationChange"
  >
    <!--  自定义slots start-->
    <template v-for="(_value, key) in $slots" #[key]="slotProps">
      <slot :name="key" v-bind="slotProps"></slot>
    </template>
    <!--    自定义slots end-->
    <!--    是否有自定义显示slots start-->
    <template
      v-for="slotItem in cols.filter((item) => item.slots && !item.hidden)"
      :key="slotItem.dataIndex || slotItem.slots?.customRender"
      #[slotItem.slots?.customRender]="slotProps"
    >
      <!--        自定义渲染start-->
      <slot v-if="$slots[slotItem.slots?.customRender]" :name="slotItem.slots?.customRender" v-bind="slotProps"></slot>
      <!--        自定义渲染end-->

      <!--     非自定义渲染start -->
      <template v-else>
        <!--        非操作 start-->
        <template v-if="slotItem.slots?.customRender !== 'action'">
          <!--        使用自定义组件格式化显示start-->
          <template v-if="slotItem.slotsType == 'component'">
            <component :is="slotItem?.slotsFunc?.(slotProps.record, () => refreshTableData())" />
          </template>
          <!--        使用自定义组件格式化显示end-->
          <!--        使用自定义函数格式化显示-->
          <template v-if="slotItem.slotsType == 'format'">
            {{ slotItem?.slotsFunc?.(slotProps.record[slotItem.dataIndex || slotItem.key], slotProps.record) }}
          </template>
          <!-- 不显示 -->
        </template>
        <!--      非操作 end-->
        <!--        操作start-->
        <div v-if="slotItem.slots?.customRender == 'action'" :key="slotItem.slots.customRender" class="actions">
          <!--        对表格的操作动作start-->
          <template v-for="(action, index) in actions">
            <template v-if="action.type == 'select'">
              <!--              下拉选择器-->
              <a-select :key="index" v-model:value="slotProps.record[(action as any).key]" size="small">
                <Option v-for="option in (action as any).options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </Option>
              </a-select>
            </template>
            <!--            编辑按钮-->
            <template v-if="action.type == 'button'">
              <a-button
                v-bind="{ ...buttonProps, ...action.props }"
                :key="index"
                @click="actionEvent(slotProps.record, action.func)"
              >
                {{ action.text }}
              </a-button>
            </template>
            <!--            删除按钮 气泡确认框-->
            <template v-if="action.type == 'popconfirm'">
              <!-- <a-popconfirm
                :key="index"
                placement="leftTop"
                @confirm="actionEvent(slotProps.record, action.func, 'del')"
              >
                <template #title> 您确定要{{ action.text }}吗？ </template> -->
              <a-button
                :key="index"
                v-bind="{ ...buttonProps, ...action.props }"
                @click="actionEvent(slotProps.record, action.func, 'del')"
              >
                {{ action.text }}
              </a-button>
              <!-- </a-popconfirm> -->
            </template>

            <!--            编辑按钮-->
            <template v-if="action.type == 'text'">
              <a :key="index" @click="actionEvent(slotProps.record, action.func)">
                {{ action.text }}
              </a>
            </template>
          </template>
          <!--        对表格的操作动作end-->
        </div>
        <!--      操作end-->
      </template>
      <!--      非自定义渲染end-->
    </template>
    <!--    是否有自定义显示slots end-->
  </a-table>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, toRefs, ref } from 'vue';
import { Card, Select, Table, Popconfirm } from 'ant-design-vue';
import { TableProps } from 'ant-design-vue';
import { usePagination, PageOption } from './hooks/usePagination';

export default defineComponent({
  name: 'DynamicTable',
  components: {
    [Table.name]: Table,
    [Card.name]: Card,
    [Select.name]: Select,
    [Popconfirm.name]: Popconfirm,
    Option: Select.Option,
  },
  inheritAttrs: false,
  props: {
    columns: {
      type: Object as PropType<TableColumn[]>,
      required: true,
    },
    getListFunc: {
      // 获取列表数据函数API
      type: Function,
      required: true,
    },
    rowSelection: {
      type: Object,
    },
    searchData: {
      type: Object,
    },
    rowKey: {
      // 表格唯一字段
      type: [String, Function] as PropType<string | ((record: any) => string)>,
    },
    pageOption: {
      // 分页参数
      type: Object as PropType<PageOption>,
      default: () => ({}),
    },
    dragColEnable: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    dragRowEnable: Boolean as PropType<boolean>,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const { pageOptions } = usePagination();
    const cols = ref<any>([]);
    cols.value = props.columns.filter((_) => !_.hidden);

    Object.assign(pageOptions.value, props.pageOption);

    const state = reactive({
      expandItemRefs: {},
      customRow: () => ({} as TableProps['customRow']),
      data: [], // 表格数据
      actions: props.columns.find((item) => (item.dataIndex || item.key) == 'action')?.actions || [], // 表格操作（如：编辑、删除的按钮等）
      loading: false, // 表格加载
    });
    let searchParams: any = {};

    // 获取表格数据
    const refreshTableData = async (params = {}) => {
      if (props.searchData && JSON.stringify(params) == '{}') {
        params = Object.assign(params, props.searchData);
      }
      searchParams = params;
      params = {
        current: pageOptions.value.current,
        pageSize: pageOptions.value.pageSize,
        ...props.pageOption,
        ...params,
      };
      state.loading = true;
      const { retData } = await props.getListFunc(params).finally(() => (state.loading = false));
      Object.assign(pageOptions.value, {
        current: ~~retData.current,
        pageSize: ~~retData.pageSize,
        total: ~~retData.total,
      });
      state.data = retData.data;
    };

    refreshTableData();

    // 操作事件
    const actionEvent = async (record, func, actionType?) => {
      // 将refreshTableData放入宏任务中,等待当前微任务拿到结果进行判断操作，再请求表格数据
      await func({ record, props }, () => setTimeout(() => refreshTableData()));
      // 如果为删除操作,并且删除成功，当前的表格数据条数小于2条,则当前页数减一,即请求前一页
      if (actionType == 'del' && state.data.length < 2) {
        pageOptions.value.current = Math.max(1, pageOptions.value.current - 1);
      }
    };

    // 分页改变
    const paginationChange = (pagination, filters, sorter, { currentDataSource }) => {
      const { field, order } = sorter;
      pageOptions.value = {
        ...pageOptions.value,
        ...pagination,
      };
      refreshTableData({
        ...searchParams,
        pageSize: pagination.pageSize,
        current: pagination.current,
        ...props.pageOption,
        ...filters,
        field,
        order,
      });
      emit('change', pagination, filters, sorter, { currentDataSource });
    };

    // dataIndex 可以为 a.b.c
    // const getDataIndexVal = (dataIndex, record) => dataIndex.split('.').reduce((pre, curr) => pre[curr], record)

    const buttonProps = {
      size: 'small',
      type: 'primary',
    };

    return {
      ...toRefs(state),
      cols,
      pageOptions,
      buttonProps,
      actionEvent,
      refreshTableData,
      paginationChange,
    };
  },
});
</script>

<style lang="less" scoped>
::v-deep(.ant-table .ant-table-title) {
  display: flex;

  .ant-btn {
    margin-right: 10px;
  }
}

.actions > * {
  margin-right: 10px;
}
</style>
