import { factory } from '../../request'

export default {
  getUserInfo: factory.get('/login/userInfo'),
  login: factory.postForm('/login/login'),
  logout: factory.postForm('/login/logout')
}
