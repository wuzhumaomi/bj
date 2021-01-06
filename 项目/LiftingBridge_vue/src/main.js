import Vue from 'vue'

import Cookies from 'js-cookie'

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control

import * as filters from './filters' // global filters
import * as formater from './utils/formater'
import qs from 'qs'
import moment from 'moment'
import { number } from './utils/number'

import Mock from './mock'

import axios from 'axios' // axios http请求库
Vue.prototype.$http = axios

import htmlToPdf from './utils/htmlToPdf'
Vue.use(htmlToPdf)

Vue.filter('date', val => formater.unixToDate(val))
Vue.filter('dateTime', val => formater.unixToDateTime(val))

Vue.directive('numbers', number)

Vue.prototype.$qs = qs
Vue.prototype.$moment = moment

Vue.use(Element, {
  size: Cookies.get('size') || 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

Vue.directive('power', {
  bind: function(el, binding) {
    if (!Vue.prototype.$_power(binding.expression)) {
      el.style.display = 'none';
    }
  }
})

// 权限检查方法
Vue.prototype.$_power = function(value) {
  value = value.replace(/'/g,'')
  const routerName = router.currentRoute.name
  const roles = store.state.user.roles
  if (roles === undefined || roles === null) {
    return false
  } else {
    return hasRole(value, routerName, roles)
  }
}


function hasRole(value, routerName, roles) {
  for (var index in roles) {
    if (roles[index].code === routerName) {
      if (roles[index].children && roles[index].children.length) {
        for (var i in roles[index].children) {
          if (roles[index].children[i].code === value) {
            return true
          }
        }
      }
      return false
    }
    if (roles[index].children && roles[index].children.length) {
      if (hasRole(value, routerName, roles[index].children)) {
        return true
      }
    }
  }
  return false
}

function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  // function XHR2ExpressReqWrap(respond) {
  //   return function(options) {
  //     let result = null
  //     if (respond instanceof Function) {
  //       const { body, type, url } = options
  //       // https://expressjs.com/en/4x/api.html#req
  //       result = respond({
  //         method: type,
  //         body: JSON.parse(body),
  //         query: param2Obj(url)
  //       })
  //     } else {
  //       result = respond
  //     }
  //     return Mock.mock(result)
  //   }
  // }
}
mockXHR()
