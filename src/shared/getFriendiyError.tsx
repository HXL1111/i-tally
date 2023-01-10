const map: Record<string, string> = {
  找不到对应的记录: '验证码错误',
}
export const getFriendlyError = (error: string) => {
  return map[error] || error
}
