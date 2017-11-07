import Api from '@/services/Api'

export default {
  index () {
    return Api().get('problems')
  },
  post (route) {
    return Api().post('problems', route)
  }
}
