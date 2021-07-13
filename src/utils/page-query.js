import * as qs from '@puckjs/utils/lib/qs'

export function pageQuery(url, query) {
  return url + '?' + qs.stringify(query)
}
