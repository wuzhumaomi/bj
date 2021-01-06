function pad0(n) {
  return n < 10 ? '0' + n : n
}

export function unixToDate(val) {
  const date = new Date(val)
  return (
    date.getFullYear() +
    '-' +
    pad0(date.getMonth() + 1) +
    '-' +
    pad0(date.getDate())
  )
}

export function unixToDateTime(val) {
  const date = new Date(val)
  return (
    unixToDate(val) +
    ' ' +
    pad0(date.getHours()) +
    ':' +
    pad0(date.getMinutes()) +
    ':' +
    pad0(date.getSeconds())
  )
}

export function marriage(value) {
  if (value === '1') {
    return '已婚'
  }
  if (value === '2') {
    return '未婚'
  }
}

export function gender(value) {
  if (value === '1') {
    return '男'
  }
  if (value === '2') {
    return '女'
  }
}

export function formaterSize(value) {
  var scales = ['B', 'K', 'M', 'G', 'T']
  var dispSize = 0
  var dispScale = ''
  for (var i = 0; i < scales.length; i++) {
    var size = value / Math.pow(1024, i)
    if (size < 1024 || i === scales.length - 1) {
      dispScale = scales[i]
      dispSize = Math.floor(size * 100) / 100
      break
    }
  }
  return dispSize + dispScale
}

export function eventStatus(value) {
  if (value === 'Assigned') {
    return '已指派'
  }
  if (value === 'InProgress') {
    return '进行中'
  }
  if (value === 'Pending') {
    return '待解决'
  }
  if (value === 'Resolved') {
    return '已解决'
  }
  if (value === 'Closed') {
    return '已关闭'
  }
  if (value === 'Cancelled') {
    return '已取消'
  }
  if (value === 'New') {
    return '新建'
  }
}
