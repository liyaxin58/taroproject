import Taro from '@tarojs/taro'
import { apiBaseUri } from '@/config'
import { isPlainObject } from '@puckjs/utils/lib/helper'

export class RequestError extends Error {
  constructor(response) {
    super(response.message || '系统发生内部错误')
    this.response = response
  }
}

function getStorageToken() {
  try {
    const cache = JSON.parse(Taro.getStorageSync('vuex'))
    return cache.user.userInfo.token
  } catch (_) {}
}

export async function request({ url, method = 'POST', data, header = {} }) {
  try {
    const result = await Taro.request({
      url: `${apiBaseUri}${url}`,
      method,
      data,
      header: {
        token: getStorageToken(),
        ...header
      }
    })

    if (result.statusCode >= 200 && result.statusCode < 300) {
      // if (String(result.data.code) === String(50000)) {
      //   return Taro.switchTab({
      //     url: '/pages/index/index'
      //   })
      // }

      if (
        isPlainObject(result.data) &&
        String(result.data.code) === String(200)
      ) {
        return result.data.data
      }
    }

    throw new RequestError(result.data)
  } catch (err) {
    throw new RequestError(err)
  }
}

export async function uploadFile({ name, filePath, header = {} }) {
  try {
    const result = await Taro.uploadFile({
      url: `${apiBaseUri}/uploadPhotos/uploadPhoto`,
      name,
      filePath,
      header: {
        token: getStorageToken(),
        ...header
      }
    })

    if (result.statusCode >= 200 && result.statusCode < 300) {
      try {
        return JSON.parse(result.data).data
      } catch (err) {
        throw new RequestError(err)
      }
    }

    throw new RequestError(result.data)
  } catch (err) {
    throw new RequestError(err)
  }
}
