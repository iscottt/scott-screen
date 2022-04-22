import type { TableColumnProps, TableProps } from 'ant-design-vue';
import type { PaginationProps } from 'ant-design-vue/lib/pagination/Pagination';

export interface Columns extends TableColumnProps {
  actions?: any;
  dataIndex: string;
}

export type pageOption = Partial<PaginationProps>;

export interface Props extends Omit<TableProps, 'columns'> {
  columns: Columns[];
  rowKey: string | ((record: any) => string);
  pageOption: pageOption;
  getListFunc: (prams) => any;
}
