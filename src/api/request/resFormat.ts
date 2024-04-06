/**
 * 格式化 response
 * 规定为 `success` 和 `result` 返回，业务层采用 `{ success, result } = await xxx()`取值，提高可读性
 * 若 silent 为 false，错误信息统一在此处理和弹出，这样就不需要在业务里做处理了
 */
import { AxiosResponse } from 'axios'
import { Message } from 'element-ui'

const _validateResponse = (res: any) => {
  try {
    return res.success || res.isSuccess || res.is_success || res.code === 200
  } catch (error) {
    return false
  }
}

const _handleError = (res: any, defaultMsg?: string) => {
  try {
    let msg = ''
    const validation_error_info = res.error_info.validation_error_info
    if (validation_error_info) {
      msg = validation_error_info.members.join() + validation_error_info.message
    }
    return msg || res.error_info.msg || res.msg || res.message || defaultMsg
  } catch (error) {
    return defaultMsg || null
  }
}

export default function (
  response: AxiosResponse,
  silent: boolean,
  defaultMsg: string = '请求成功'
) {
  const isBlob = response.config.responseType === 'blob'
  const res = isBlob ? response : response.data
  if (isBlob) {
    // if (res.data.type === 'application/json') {
    //   let fileReader = new FileReader()
    //   fileReader.readAsText(res.data)
    //   fileReader.onload = (result) => {
    //     try {
    //       // @ts-ignore
    //       let jsonData = JSON.parse(result.target?.result) // 说明是普通对象数据，后台转换失败
    //       console.log(jsonData)
    //       Message.error('下载遇到一点问题，请稍后。。。。')
    //     } catch (e) {}
    //   }
    // }
    return res
  }

  if (_validateResponse(res)) {
    const msg = _handleError(res, defaultMsg)
    //  !silent && Message.success(msg)

    return {
      is_success: true,
      result: res.data || res.result,
      msg,
    }
  } else {
    const msg = _handleError(res, '接口响应出错')
    !silent && Message.error(msg)

    return {
      is_success: false,
      result: [],
      msg,
    }
  }
}
