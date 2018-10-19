function time (dateline) {
  let result = ''
  const nowTime = new Date().getTime()
  const disTime = nowTime - dateline
  console.log('in time')
  console.log(disTime)
  if (disTime < 60000) {
    result = '刚刚'
  } else if (disTime >= 60000 && disTime < 3600000) {
    result = `${Math.floor(disTime / 60000)}分钟前`
  } else if (disTime >= 3600000 && disTime < 86400000) {
    result = `${Math.floor(disTime / 3600000)}小时前`
  } else {
    const date = new Date(dateline)
    result = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }
  return result
}

export default time
