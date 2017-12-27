import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (credentials) {
    return Api().post('login', credentials)
  },
  getUsers (token) {
    return Api().get('api/users' + '?token=' + token)
  },
  deleteUser (token, id) {
    return Api().delete(`api/users/${id}?token=${token}`)
  }
}
