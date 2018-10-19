import emots from '@/common/js/emots'

function formatEmots (str) {
  let result = ''
  // 匹配['微笑']这类字符串
  let reg = /\[[^\]]+\]/gm
  let matchArr = str.match(reg)
  console.log('matchArr：' + matchArr)
  if (matchArr) {
    for (let i = 0; i < matchArr.length; i++) {
      let matchItem = matchArr[i].slice(1, matchArr[i].length - 1)
      console.log('matchItem：' + matchItem)
      let index = emots.indexOf(matchItem)
      let emot = `<img style="vertical-align:middle" src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`
      result = str.replace(reg, emot)
    }
  } else {
    result = str
  }
  console.log('in formatEmots')
  console.log(result)
  return result
}

export default formatEmots
