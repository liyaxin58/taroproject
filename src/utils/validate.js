import { isArray, isValid } from '@puckjs/utils/lib/helper'
import isDate from 'validator/es/lib/isDate'
import isMobilePhone from 'validator/es/lib/isMobilePhone'
import isNumeric from 'validator/es/lib/isNumeric'

export function validate(rules, values) {
  const keys = Object.keys(rules)
  const data = {}

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    const value = values[key]
    const rule = rules[key]

    if (rule.required) {
      if (!isValid(value)) {
        throw new Error(rule.message)
      }
    }

    switch (rule.type) {
      case 'date':
        if (!isDate(value)) throw new Error(rule.message)
        break

      case 'phone':
        if (!isMobilePhone(value, 'zh-CN')) throw new Error(rule.message)
        break

      case 'number':
        if (!isNumeric(value)) throw new Error(rule.message)
        break

      case 'array':
        if (!isArray(value)) {
          throw new Error(rule.message)
        }

        const len = value.filter(Boolean).length

        if (rule.min && len < rule.min) {
          throw new Error(rule.message)
        }

        if (rule.max && len > rule.max) {
          throw new Error(rule.message)
        }
        break
    }

    data[key] = value
  }

  return data
}
