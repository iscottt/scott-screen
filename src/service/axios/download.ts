import { message } from 'ant-design-vue';
import http from './index';
/**
 * download File
 * @param url
 * @param params
 */
export async function downloadFile(url: string, params?: {}) {
  message.loading('正在发起下载...', 0);
  const res = await http.request(
    {
      url,
      method: 'POST',
      responseType: 'blob',
      params
    },
    {
      // 是否显示错误提示信息
      successMessageText: '导出成功',
      isParseToJson: true,
      isDownload: true
    }
  );
  const name = res.headers['content-disposition'];
  const fileName = name.substring(name.indexOf('=') + 1, name.length);
  const blob = new Blob([res.data]);
  if ('download' in document.createElement('a')) {
    const isEXCLE = res.headers['content-type'] === 'application/msexcel;charset=UTF-8';
    if (!isEXCLE) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        message.error(JSON.parse(e.target.result).retMessage);
      };
      reader.readAsText(res.data);
    } else {
      const str = res.headers['content-disposition'];
      const name = str.split('=')[1].split('.')[0];
      const fileType = str.split('=')[1].split('.')[1];
      const elink: any = document.createElement('a');
      const blob = new Blob([res.data]);
      // elink.hreflang = "zh";
      // elink.charset = "utf8";
      // elink.type = "application/vnd.ms-excel";
      elink.style.display = 'none';
      elink.href = URL.createObjectURL(blob);
      elink.target = '_blank';
      elink.download = decodeURI(name) + '.' + fileType;
      elink.tableBorder = 1;
      document.body.appendChild(elink);
      elink.click();
      // 释放URL 对象
      URL.revokeObjectURL(elink.href);
      document.body.removeChild(elink);
    }
  } else {
    // IE10+下载
    (navigator as any).msSaveBlob(blob, fileName);
  }
  message.destroy();
}
