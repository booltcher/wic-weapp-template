import Toast from "../miniprogram_npm/@vant/weapp/toast/toast"
import { ErrorToast, oToast } from "../utils/toast"

function isRealType(type) {
      return function (obj) {
            return {}.toString.call(obj) === `[object ${type}]`
      }
}
const isFunction = isRealType("Function")
const isRegExp = isRealType("RegExp")
const isArray = isRealType("Array")
const isString = isRealType('String')
const isObject = isRealType('Object')
const isUndef = value => value === undefined
const isEmpty = value => value === undefined || value === null || value === '' || value.trim() === ''

const REGEXPRESSION = {
      //手机号
      mobile: new RegExp(/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/),
      //二代身份证号
      idcard: new RegExp(/^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/),
      //纯数字
      number: new RegExp(/^\d{1,}$/),
}
const defaultOptions = {
      errorMode: 'toast', //错误提示方式
      extraRegular: {} //拓展的正则表达式
}

export default function Validator(data, rules, options = {}) {
      return new Promise((resolve, reject) => {
            if (!rules || !rules.length) {
                  throw new Error('No field to validate')
            }
            const { errorMode } = Object.assign(defaultOptions, options)
            const regExprssions = Object.assign(REGEXPRESSION, options.extraRegular)
            for (let i = 0; i < rules.length; i++) {
                  const { prop, validator, msg } = rules[i]
                  const value = data[prop]
                  if (data.hasOwnProperty(prop)) {
                        let result = _Validate_({ prop, value, validator, msg }, regExprssions, errorMode)
                        if (result && i === rules.length - 1) {
                              resolve(rules)
                        }
                        if (!result) {
                              reject({ prop, msg })
                              break
                        }
                  }
            }
      })
}


/**
 * 验证主体方法，支持 require, 正则, 自定义校验函数
 */
function _Validate_(regular, regExprssions, errorMode) {
      const { prop, value, validator, msg } = regular
      let regexp;
      if (validator === 'required') {
            if (isEmpty(value)) {
                  return errorHandle(prop, msg, errorMode)
            } else {
                  return true
            }
      }
      if (isFunction(validator)) {
            regexp = null
            return validator(value) ? true : errorHandle(prop, msg, errorMode)
      } else {
            regexp = validator.split('regexp:')[1]
      }
      if (regExprssions[regexp]) {
            return regExprssions[regexp].test(value) ? true : errorHandle(prop, msg, errorMode)
      }
}

const errorHandle = (prop, msg, errorMode) => {
      if (errorMode === 'toast') {
            wx.hideToast()
            Toast.clear()
            oToast(msg)
      }
      return false
}