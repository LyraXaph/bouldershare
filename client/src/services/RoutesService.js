import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('problems', {
      params: { search }
    })
  },
  show (problemSlug) {
    return Api().get(`problem/${problemSlug}`)
  },
  post (route) {
    return Api().post('problems', route)
  },
  put (route) {
    return Api().put(`problems/${route._id}`, route)
  }
}
