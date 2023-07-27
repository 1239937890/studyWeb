import { read, write, utils, writeFile } from 'xlsx';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import { blobValidate } from '@/utils/ruoyi';
import { saveAs } from 'file-saver';
import errorCode from '@/utils/errorCode';
import { ElMessage } from 'element-plus';

const BASE_API = import.meta.env.VITE_APP_BASE_API;

/**
 * xlsx导出
 *
 * data格式
 * [
 *  ['姓名','年龄','性别']，
 *  ['李宝刚','18','男']，
 *  ['李宝刚1','18','女']，
 *  ['李宝刚2','18','女']，
 * ]
 *
 * @param data 导出数据
 * @param name 文件名
 */
export function exportSheet(data, name = 'data') {
  const workbook = {
    SheetNames: ['sheet1'],
    Sheets: { sheet1: utils.aoa_to_sheet(data) },
  };
  writeFile(workbook, name + '.xlsx');
}
/**
 * xlsx导出 简单版
 *
 * col格式示例
 * [{value:'name',label:'姓名'},{value:'sex',label:'性别'}]
 * data格式示例
 * [{name:'于猛',sex:'男'},{name:'于猛2',sex:'男'}]
 *
 * @param data 导出数据
 * @param name 文件名
 */
export function exportSheetSimple(
  col,
  data,
  name = 'data',
  props = { value: 'value', label: 'label' }
) {
  let header = [];
  let headerData = {};
  col.forEach((item) => {
    header.push(item[props.value]);
    headerData[item[props.value]] = item[props.label];
  });
  /* Initial row */
  let ws = utils.json_to_sheet([headerData], {
    header: header,
    skipHeader: true,
  });
  console.log(data);
  /* Write data starting at A2 */
  let sheet1 = utils.sheet_add_json(ws, data, {
    header: header,
    skipHeader: true,
    origin: 'A2',
  });
  const workbook = {
    SheetNames: ['sheet1'],
    Sheets: { sheet1: sheet1 },
  };
  writeFile(workbook, name + '.xlsx');
}

/**
 * xlsx导出 自定义
 * 1.只导出 col内包含的字段
 *
 * col格式示例 可直接使用 列表 columns 配置
 * [{value:'name',label:'姓名'},{value:'sex',label:'性别'}]
 * data格式示例
 * [{name:'于猛',sex:'男'},{name:'于猛2',sex:'男'}]
 *
 * @param data 导出数据
 * @param name 文件名
 */
export function exportSheetCustom(
  col,
  data,
  name = 'data',
  props = { value: 'value', label: 'label' }
) {
  // 排除 多选框 列
  col = col.value.filter(item => item.prop);

  let header = [];
  let headerData = {};
  col.forEach((item) => {
    header.push(item[props.value]);
    headerData[item[props.value]] = item[props.label];
  });
  /* Initial row */
  let ws = utils.json_to_sheet([headerData], {
    header: header,
    skipHeader: true,
  });

  let dataList = []
  data.forEach(item =>{
    let i = {}
    header.forEach(h=>{
      i[h] = item[h]
    })
    dataList.push(i)
  })

  data = dataList
  /* Write data starting at A2 */
  let sheet1 = utils.sheet_add_json(ws, data, {
    header: header,
    skipHeader: true,
    origin: 'A2',
  });
  const workbook = {
    SheetNames: ['sheet1'],
    Sheets: { sheet1: sheet1 },
  };
  writeFile(workbook, name + '.xlsx');
}



/**
 * 判断 vnode 是否是 el-table-column 组件
 */
export function isElTableColumn(vnode) {
  return vnode.type?.name === 'ElTableColumn';
}

/**
 * 是否是数据列
 */
export function isDataColumn(column) {
  return column.label && column.prop;
}

/**
 * 获取前端分页数据
 */
export function getPageData(data, pageNum, pageSize) {
  if (!data) {
    return [];
  }
  const start = (pageNum - 1) * pageSize;
  const end = pageNum * pageSize;
  return data.slice(start, end);
}

/**
 * 接口数据格式校验
 * 暂时 返回true
 */
export function checkResData(res) {
  // if (res.code === undefined || res.total === undefined
  //   || (res.data === undefined && res.list === undefined && res.rows === undefined)) {
  //   const errorText = '接口返回数据格式错误，正确数据格式： {data: [], code: 200, total: 0}'
  //   console.error(errorText)
  //   return errorText
  // }
  return null;
}

export function isFunction(func) {
  return typeof func === 'function';
}

/**
 * ajax下载
 * @param url url
 * @param method get or post
 * @param name 文件名
 * @param param 查询参数
 */
export function download({
  url,
  name,
  params,
  method = 'POST',
  success,
  error,
  complete,
}) {
  const option = {
    method: method,
    url: BASE_API + url,
    data: params,
    responseType: 'blob',
    headers: { Authorization: 'Bearer ' + getToken() },
  };
  axios(option)
    .then(async (res) => {
      complete && complete();
      const isBlob = await blobValidate(res.data);
      if (isBlob) {
        const blob = new Blob([res.data]);
        saveAs(blob, decodeURI(name));
        success && success();
      } else {
        const resText = await res.data.text();
        const rspObj = JSON.parse(resText);
        const errMsg =
          errorCode[rspObj.code] || rspObj.msg || errorCode['default'];
        ElMessage.error(errMsg);
        error && error();
      }
    })
    .catch((err) => {
      complete && complete();
    });
}
