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
      validateRequiredDefault: true,
      errorMode: 'toast',
      extraRegular: []
}

export default function Validator(payload, options = {}) {
      return new Promise((resolve, reject) => {
            if (!payload) {
                  reject(new Error('none params'))
            }
            const config = Object.assign(defaultOptions, options)
            let propAndRef = Object.keys(payload)
            for (let i = 0; i < propAndRef.length; i++) {
                  let propOptions = payload[propAndRef[i]]
                  if (isObject(propOptions) && !propOptions.hasOwnProperty('value')) {
                        reject(`'${propAndRef[i]}' must contain attribute 'value'`)
                        throw new Error('wrong format')
                  }
                  // no validator or not an object, determine whether to use the default validator
                  if (((!isObject(propOptions) || isObject(propOptions) && !propOptions.validator) && config.validateRequiredDefault)) {
                        let propResult = _Validate_(propOptions, 'required')
                        if (propResult) {
                              i === propAndRef.length - 1 ? resolve(payload) : ''
                        } else {
                              reject('validate failed')
                        }
                  }
                  // if defined a validator
                  if (isObject(propOptions) && propOptions.validator) {
                        const vValue = propOptions.value
                        const vRules = propOptions.validator
                        if (isArray(propOptions.validator)) {
                              for (let v = 0; v < vRules.length; v++) {
                                    let propResult = _Validate_(vValue, vRules[v])
                                    if (propResult) {
                                          (i === propAndRef.length - 1 && v === vRules.length - 1) ? resolve(payload) : ''
                                    } else {
                                          reject('validate failed')
                                    }
                              }
                        } else {
                              // repeated code snippet
                              let propResult = _Validate_(vValue, vRules)
                              if (propResult) {
                                    i === propAndRef.length - 1 ? resolve(payload) : ''
                              } else {
                                    reject('validate failed')
                              }
                        }
                  }
            }
      })
}

/**
 * 验证主体方法，支持 require, 正则, 自定义校验函数
 */
function _Validate_(value, rule) {
      let regul = rule.reg
      let msg = rule.message || '参数有误'
      if (isString(regul) && regul === 'required' && value.trim() === '') {
            oToast(msg)
            return false
      } else if (isFunction(regul) && !regul(value)) {
            oToast(msg)
            return false
      } else if (isRegExp(regul) && !regul.test(value)) {
            oToast(msg)
            return false
      }
      return true
}