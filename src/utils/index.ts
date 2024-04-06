import { Message } from 'element-ui'

export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0)
    }, time)
  })
}

export function doFormate(data) {
  for (const key in data) {
    if (Object.prototype.toString.call(data[key]) === '[object Array]') {
      data[key].forEach((item) => {
        if (item.formate) item.formate()
        doFormate(item)
      })
    }
  }
}

export function clearKey(obj, filter = ['Proxy']) {
  for (const key in obj) {
    if (obj[key] === undefined) obj[key] = null

    if (key[0] === '_') {
      delete obj[key]
    }
    for (let i = 0; i < filter.length; i++) {
      if (key.indexOf(filter[i]) !== -1) {
        delete obj[key]
      }
    }

    if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      clearKey(obj[key], filter)
    }
    if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
      obj[key].forEach((item) => {
        clearKey(item, filter)
      })
    }
  }
}

// 使用iframe框架下载文件 -兼容性考虑
export async function downloadUrl(res) {
  let filename: any = null
  const disposition = res.headers['content-disposition']
  if (disposition && disposition.indexOf('attachment') !== -1) {
    let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    let matches = filenameRegex.exec(disposition)
    if (matches != null && matches[1]) {
      filename = decodeURI(matches[1].replace(/['"]/g, ''))
    }
  }

  try {
    const content = await res.data.text()
    if (JSON.stringify(content).indexOf('msg') > -1) {
      Message.error('导出失败')
      return
    }
  } catch (e) {
    console.log(e)
    alert('您的浏览器版本太低，可能会导致导出失败，建议升级您的浏览器版本')
  }

  // const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
  const blob = res.data
  filename === null ? (filename = new Date().getTime()) : ''
  // @ts-ignore
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // @ts-ignore
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const elink = document.createElement('a')
    elink.download = filename
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  }
}

export const setDefalut = (sourceData, defaultData) => {
  Object.keys(defaultData).forEach((key) => {
    if (!sourceData.hasOwnProperty(key)) {
      sourceData[key] = defaultData[key]
    }
  })
  return sourceData
}
