import {
  v4 as uuidV4
} from "uuid";
import md5 from "js-md5";

/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time, pattern) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === 'string') {
      time = time
        .replace(new RegExp(/-/gm), '/')
        .replace('T', ' ')
        .replace(new RegExp(/\.[\d]{3}/gm), '');
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

// 表单重置
export function resetForm(refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
  let search = params;
  search.params =
    typeof search.params === 'object' &&
    search.params !== null &&
    !Array.isArray(search.params) ?
    search.params :
    {};
  dateRange = Array.isArray(dateRange) ? dateRange : [];
  if (typeof propName === 'undefined') {
    search.params['beginTime'] = dateRange[0];
    search.params['endTime'] = dateRange[1];
  } else {
    search.params['begin' + propName] = dateRange[0];
    search.params['end' + propName] = dateRange[1];
  }
  return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).some((key) => {
    if (datas[key].value == '' + value) {
      actions.push(datas[key].label);
      return true;
    }
  });
  return actions.join('');
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas, value, separator) {
  var actions = [];
  var currentSeparator = undefined === separator ? ',' : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val) => {
    Object.keys(datas).some((key) => {
      if (datas[key].value == '' + temp[val]) {
        actions.push(datas[key].label + currentSeparator);
      }
    });
  });
  return actions.join('').substring(0, actions.join('').length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
  var args = arguments,
    flag = true,
    i = 1;
  str = str.replace(/%s/g, function () {
    var arg = args[i++];
    if (typeof arg === 'undefined') {
      flag = false;
      return '';
    }
    return arg;
  });
  return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty(str) {
  if (!str || str == 'undefined' || str == 'null') {
    return '';
  }
  return str;
}

// 数据合并
export function mergeRecursive(source, target) {
  for (var p in target) {
    try {
      if (target[p].constructor == Object) {
        source[p] = mergeRecursive(source[p], target[p]);
      } else {
        source[p] = target[p];
      }
    } catch (e) {
      source[p] = target[p];
    }
  }
  return source;
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children',
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

/**
 * 树结构搜索
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} key 要搜索的key
 * @param {*} searchVal 搜索值
 */
export function searchTree({
  data,
  id = 'id',
  parentId = 'parentId',
  children = 'children',
  key = 'label',
  searchVal,
}) {
  var resultNode = [];
  var dataMap = {};

  let treeList = [...data];
  //遍历树结构 进行搜索
  for (let d of treeList) {
    searchNode(d, null);
  }
  //递归遍历树结构找出符合条件的节点 并构建祖级列表 ancestors
  function searchNode(node, parentNode) {
    //所有节点存入map
    dataMap[node[id]] = node;
    //构建祖级列表 ancestors
    node.ancestors =
      parentNode == null ? '0' : parentNode.ancestors + ',' + parentNode[id];
    if (new RegExp(escapeRegexpString(searchVal), 'i').test(node[key])) {
      resultNode.push(node);
    }
    if (node[children] instanceof Array && node[children].length > 0) {
      for (let d of node[children]) {
        searchNode(d, node);
      }
    }
  }
  //遍历符合要求的节点 根据祖级列表获取可以展示的节点id
  let resultIds = [];
  let resultParentIds = [];
  for (let d of resultNode) {
    if (resultIds.indexOf(d[id]) === -1) {
      resultIds.push(d[id]);
    }
    var ancestors = d.ancestors.split(',');
    for (var i = 0; i < ancestors.length; i++) {
      if (resultParentIds.indexOf(ancestors[i]) === -1) {
        resultParentIds.push(ancestors[i]);
      }
    }
  }
  //遍历树结构 赋值是否显示情况
  for (let d of treeList) {
    showNode(d, false);
  }
  // 递归遍历节点,赋值显示情况 visible 结果节点 的显示状态需要传递到所有子节点
  function showNode(node, visible) {
    //默认隐藏
    node.visible = false;
    //如果是结果节点 显示状态传递
    if (resultIds.indexOf(node[id]) != -1) {
      visible = true;
      node.visible = true;
    }
    //结果节点的子节点展示  结果节点的父节点展示
    if (visible || resultParentIds.indexOf(node[id] + '') != -1) {
      node.visible = true;
    }
    if (node[children] instanceof Array && node[children].length > 0) {
      for (let d of node[children]) {
        showNode(d, visible);
      }
    }
  }
  return treeList;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParamsNoencodeURI(params) {
  let result = '';
  for (const propName of Object.keys(params).sort()) {
    const value = params[propName];
    var part = propName + '=';
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = params + '=';
            result += subPart + value[key] + '&';
          }
        }
      } else {
        result += part + value + '&';
      }
    }
  }
  return result;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + '=';
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result;
}

// 验证是否为blob格式
export async function blobValidate(data) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  } catch (error) {
    return true;
  }
}
export function getAgeByIdCard(identityCard) {
  var len = (identityCard + '').length;
  var strBirthday = '';
  if (len == 18) {
    //处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday =
      identityCard.substr(6, 4) +
      '/' +
      identityCard.substr(10, 2) +
      '/' +
      identityCard.substr(12, 2);
  }
  if (len == 15) {
    var birthdayValue = '';
    birthdayValue = identityCard.charAt(6) + identityCard.charAt(7);
    if (parseInt(birthdayValue) < 10) {
      strBirthday =
        '20' +
        identityCard.substr(6, 2) +
        '/' +
        identityCard.substr(8, 2) +
        '/' +
        identityCard.substr(10, 2);
    } else {
      strBirthday =
        '19' +
        identityCard.substr(6, 2) +
        '/' +
        identityCard.substr(8, 2) +
        '/' +
        identityCard.substr(10, 2);
    }
  }
  //时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday);
  var nowDateTime = new Date();
  var age = nowDateTime.getFullYear() - birthDate.getFullYear();
  //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (
    nowDateTime.getMonth() < birthDate.getMonth() ||
    (nowDateTime.getMonth() == birthDate.getMonth() &&
      nowDateTime.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export function isObjectNotBlank(obj) {
  for (var i in obj) {
    // 如果不为空，则会执行到这一步，返回true
    if (i && obj[i] != null && obj[i] != '') {
      return true;
    }
  }
  return false; // 如果为空,返回false
}
export function isObjectNotBlankExclude(obj, exclude) {
  for (var i in obj) {
    if (exclude == null || exclude.indexOf(i) == -1) {
      // 如果不为空，则会执行到这一步，返回true
      if (i && obj[i] != null && obj[i] != '') {
        return true;
      }
    }
  }
  return false; // 如果为空,返回false
}
export function isObjectNotNull(obj) {
  for (var i in obj) {
    // 如果不为空，则会执行到这一步，返回true
    return true;
  }
  return false; // 如果为空,返回false
}

export const escapeRegexpString = (value = '') =>
  String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false;
  }
  if (typeof val === 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (
      val == 'null' ||
      val == null ||
      val == 'undefined' ||
      val == undefined ||
      val == ''
    )
      return true;
    return false;
  }
  return false;
}

export const filterForm = (form) => {
  let obj = {};
  Object.keys(form).forEach((ele) => {
    if (!validatenull(form[ele])) {
      obj[ele] = form[ele];
    }
  });
  return obj;
};

/**
 * 获取当前时间
 * 格式YYYY-MM-DD HH:mm:ss
 */
export const getNowFormatDate = function () {
  var date = new Date();
  var seperator1 = '-';
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();

  var hours = new Date().getHours();
  var minutes = new Date().getMinutes();
  var seconds = new Date().getSeconds();

  if (month >= 1 && month <= 9) {
    month = '0' + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate;
  }
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds;
  }

  var currentdate =
    year +
    seperator1 +
    month +
    seperator1 +
    strDate +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;
  return currentdate;
};

export const getActionCode = function (text) {
  var result = {
    text: '',
    action: null
  };
  var strArray = text.split('#');
  if (strArray.length < 1) {
    result.text = text;
  } else {
    result.text = strArray[0];
    result.action = strArray[1];
  }
  return result;
};

/**
 * 获取url上的参数
 */
export const getQueryString = function (name) {
  let reg = `(^|&)${name}=([^&]*)(&|$)`;
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
};

/**
 * 判断字符串最后字符，是否是标点符号
 */
export const checkEndStr = function (str) {
  let bdfh = [',', '.', '?', ';', ':', '，', '。', '？', '；', '：'];
  let regex = new RegExp('.*[' + bdfh.join('') + ']$', 'i');
  return regex.test(str);
};

export const handleResponse = function (handleResponse, callbak) {
  if (handleResponse.status == 200) {
    this.handleResult(handleResponse.data, callbak);
  } else {
    this.$modal.msgError(handleResponse.status);
  }
};

/**
 * 判断对象中是否含有某个key
 */
export const hasProperty = function (...args) {
  arguments[1];
  let len = args.length;
  for (let i = 1; i < len; i++) {
    if (Object.prototype.hasOwnProperty.call(args[0], args[i])) {
      return true;
    }
  }
  return false;
};
/**
 * 生成请求头
 */
export const createHeader = () => {
  const header = {}
  const timestamp = new Date().getTime();
  const nonceStr = uuidV4();
  header['timestamp'] = timestamp;
  header['nonceStr'] = nonceStr;
  header['signature'] = md5(`undefined&timestamp=${timestamp}&nonceStr=${nonceStr}&key=${MD5SECRET}`);
  return header
}