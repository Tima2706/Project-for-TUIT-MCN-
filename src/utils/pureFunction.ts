export const scrollMainTop = (el = '.ant-layout-content', top = 0) => {
  const item = document.querySelector(el)
  if (item)
    item.scrollTop = top
}

export const fileToDataUrl = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }
    fileReader.onerror = reject
  })
}

export function formatMoney(amount: any, decimalCount = 0, decimal = '', thousands = ' ') {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign
      + (j ? i.slice(0, j) + thousands : '')
      + i.slice(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`)
      + (decimalCount ? decimal + Math.abs(amount - (+i)).toFixed(decimalCount).slice(2) : '')
  }
  catch (e) {
    console.error(e)
  }
}
export const addScriptToHtml = (url: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    document.head.append(script)
    script.src = url
    script.onload = resolve
    script.onerror = reject
  })
}

export const validateQueryPage = (page?: string, defaultPage = 1): number => {
  if (!page)
    return defaultPage
  return isNaN(+page) ? defaultPage : +page
}

export const downloadBlobFile = (file: Blob, fileName: string) => {
  const a = document.createElement('a')
  document.body.appendChild(a)
  a.style.display = 'none'
  const url = window.URL.createObjectURL(file)
  a.href = url
  a.download = fileName
  a.click()
  window.URL.revokeObjectURL(url)
  setTimeout(() => a.remove())
}
