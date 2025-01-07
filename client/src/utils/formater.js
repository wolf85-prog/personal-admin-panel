import * as dayjs from 'dayjs'

export function format(num, decimals) {
  let tempStr = ''
  tempStr = num.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  })
  tempStr = tempStr.replace(/,/g, '.')
  return tempStr
}

export function formatMoney(num, decimals) {
  let ruble = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumSignificantDigits: 3,
    signDisplay: 'never',
  })

  ruble = ruble.format(num)
  return ruble.replace(/,/g, '.')
}

export function formatDateTime(num, decimals) {
  let tempStr = ''
  tempStr = num.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  tempStr = tempStr.replace(/,/g, '.')
  return tempStr
}

export function formatDate(num, decimals) {
  return dayjs(num).format('DD.MM.YYYY')
}

export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(7|)?(\d{3})(\d{3})(\d{2})(\d{2})$/)
  if (match) {
    var intlCode = match[1] ? '+7 ' : ''
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4], '-', match[5]].join('')
  }
  return null
}

export function formatDocumentStatus(num) {
  let tempStr = ''
  if (num === 'Новый') {
    tempStr = '🟥'
  }
  if (num === 'Подписан') {
    tempStr = '🟩'
  }

  return tempStr
}
