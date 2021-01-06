/**
 * User: sheyude
 * Date: 2017/9/4 0004
 * Time: 上午 10:51
 *
 */
const number = {
  twoWay: true,
  bind: function(el) {
    el.addEventListener('blur', function() {
      // let value = formatNumber(el.value,2,0)
      let value

      (function() {
        value = formatNumber(el.value, 2, 0)
        return value
      })()
      el.value = value
    })
  },
  update: function(el, binding, vnode) {
    if (el.value !== '') {
      el.value = el.value.replace(/[^0-9.]+/g, '')
    }
  }
}

/**
 * 将数值四舍五入后格式化.
 * @param num 数值(Number或者String)
 * @param cent 要保留的小数位(Number)
 * @param isThousand 是否需要千分位 0:不需要,1:需要(数值类型);
 * @return 格式的字符串,如'1,234,567.45'
 * @type String
 */
export function formatNumber(num, cent, isThousand) {
  num = num.toString().replace(/\$|\,/g, '')

  // 检查传入数值为数值类型
  if (isNaN(num)) {
    num = '0'
  }

  // 获取符号(正/负数)
  const sign = (num === Math.abs(num).toString())
  num = Math.abs(num).toString()

  num = Math.floor(num * Math.pow(10, cent) + 0.50000000001) // 把指定的小数位先转换成整数.多余的小数位四舍五入
  let cents = num % Math.pow(10, cent) // 求出小数位数值
  num = Math.floor(num / Math.pow(10, cent)).toString() // 求出整数位数值
  cents = cents.toString() // 把小数位转换成字符串,以便求小数位长度

  // 补足小数位到指定的位数
  while (cents.length < cent) {
    cents = '0' + cents
  }

  if (isThousand) {
    // 对整数部分进行千分位格式化.
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
      num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
    }
  }

  // if (cent > 0) {
  //   return (((sign) ? '' : '-') + num + '.' + cents)
  // } else {
  //   return (((sign) ? '' : '-') + num)
  // }
  if (!sign) {
    num = '-' + num
  }
  if (cent > 0) {
    return num + '.' + cents
  } else {
    return num
  }
}
export {
  number
}
