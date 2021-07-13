import { unixDate } from '@puckjs/utils'

export function formatTimestamp(timestamp, formater = 'YYYY.MM.DD HH:mm') {
  const unixTimestamp = Math.floor(timestamp / 1000)
  return unixDate(unixTimestamp).format(formater)
}
