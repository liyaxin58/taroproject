const apiBaseUris = {
  // 本地开发
  development: 'https://www.caamyj.com/myj',
  // 正式环境
  production: 'https://www.caamyj.com/myj'
}

export const env = process.env.NODE_ENV || 'development'
export const apiBaseUri = apiBaseUris[env]
