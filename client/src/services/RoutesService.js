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
  post (route, token) {
    return Api().post(`api/problems/?token=${token}`, route)
  },
  put (route) {
    return Api().put(`problems/${route._id}`, route)
  },
  delete (problemId, token) {
    return Api().delete(`api/problems/${problemId}/?token=${token}`)
  },
  getGyms (search, token) {
    return Api().get(`gyms/?token=${token}`, {
      params: { search }
    })
  }
}
