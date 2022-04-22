import type { App } from 'vue';
import { Modal, Table, Input, Form, Card, Checkbox, Radio, Col, Row, Select, DatePicker } from 'ant-design-vue';
import { AButton } from '@/components/common/button/index';

import 'ant-design-vue/dist/antd.css';
import 'dayjs/locale/zh-cn';

export function setupAntd(app: App<Element>) {
  app.component('AButton', AButton);
  app
    .use(Form)
    .use(Input)
    .use(Modal)
    .use(Table)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Col)
    .use(Row)
    .use(Select)
    .use(DatePicker);
}
