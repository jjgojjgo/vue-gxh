// 没有引用
function transformCss (node, name, value) {
  let result = ''
  if (!node.transform) {
    node.transform = {}
  }
  if (arguments.length > 2) {
    console.log('写入操作！')
    node.transform[name] = value
    for (let key in node.transform) {
      switch (key) {
        case 'rotate':
        case 'skewX':
        case 'skewY':
          result += `${key}(${node.transform[key]}deg) `
          break
        case 'scaleX':
        case 'scaleY':
          result += `${key}(${node.transform[key]}) `
          break
        case 'translateX':
        case 'translateY':
          result += `${key}(${node.transform[key]}px) `
          break
        default:
          console.log('参数错误！')
      }
    }
    node.style.transform = result
  } else {
    console.log('读取操作')
    if (node.transform[name] === undefined) {
      if (name === 'scaleX' || name === 'scaleY') {
        value = 1
      } else {
        value = 0
      }
    } else {
      value = node.transform[name]
    }
    return value
  }
}

export default transformCss