import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('problems', {
      params: { search }
    })
  },
  post (route) {
    return Api().post('problems', route)
  }
}
