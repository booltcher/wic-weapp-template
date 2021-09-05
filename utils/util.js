// 判空
export const isEmpty = (value) => {
  return value === undefined || value.trim() === '' || value === null
}

/**
 * @params {Array} items 源数据
 * @params {String} link 生成树依据的属性名，默认'parent_id'
 * @returns result 树状对象
 * @description 依据link属性，将扁平数据转化为树状结构
 */
const arrayTree = (items, id = null, link = 'parent_id') =>
  items
  .filter(item => item[link] === id)
  .map(item => ({
    ...item,
    children: arrayTree(items, item.id)
  }));

/*
 * @params {Array} source 源数据
 * @return result
 * @description 数组去重
 */
function arrayUnique(source) {
  return Array.from(new Set(source))
}

/**
 * @params {Array} list 源数据
 * @params {String} key 求和的项 默认number
 * @returns result 和
 * @description 数组key属性求和
 */
const arraySum = (list, key = 'number') => {
  return list.reduce((total, cur) => {
    return total + Number(cur[key])
  }, 0)
}

/*
 * @params {Array} source 源数据
 * @return result
 * @description 树状数据扁平化
 */
function arrayFlator(source) {
  const result = [];
  const iterator = source => {
    return source.forEach(item => {
      result.push(item)
      if (!item.children) return false
      iterator(item.children)
    })
  }
  iterator(source)
  return result
}

/**
 * @params {source} 源数据
 * @returns {*}
 * @description 对象深拷贝
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj = Array.isArray(source) ? [] : {}
  Object.keys(source).map(item => {
    if (source[item] && typeof source[item] === 'object') {
      targetObj[item] = deepClone(source[item])
    } else {
      targetObj[item] = source[item]
    }
  })
  return targetObj
}

/**
 * @params {Date} dateInitial 初始日期
 * @params {Date} dateFinal 结束日期
 * @return result 相隔天数
 * @description 计算两个日期之间相差多少天
 */
function dateGap(dateInitial, dateFinal) {
  return (dateFinal - dateInitial) / (1000 * 3600 * 24);
}

/*
 * @params {Number} count 天数
 * @params {String} symbol 连接符
 * @return result 几天后日期字符串
 * @description 返回几天后的日期字符串，如果入参为负数，则表示n天前的日期
 */
export function dateAfterCount(count, symbol = '-') {
  var currentDay = new Date();
  currentDay.setDate(currentDay.getDate() + count); //获取count天后的日期
  var y = currentDay.getFullYear();
  var m = (currentDay.getMonth() + 1) < 10 ? "0" + (currentDay.getMonth() + 1) : (currentDay.getMonth() + 1); //获取当前月份的日期，不足10补0
  var d = currentDay.getDate() < 10 ? "0" + currentDay.getDate() : currentDay.getDate(); //获取当前几号，不足10补0
  return y + symbol + m + symbol + d;
}

/**
 * @params {Number} timestamp 时间戳毫秒
 * @returns {String} 日期格式
 * @description 时间戳转日期格式
 */
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘   
  var Y = date.getFullYear()
  var Month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  var D = date.getDate()
  var H = date.getHours()
  var M = date.getMinutes()
  var S = date.getSeconds();
  return `${Y}-${Month}-${D} ${H}-${M}-${S}`
}
