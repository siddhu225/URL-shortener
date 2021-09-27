import Api from "@/services/Api";

export default {
  login(user) {
    return Api().post('/login',user)
  },
  signup(params) {
    return Api().post('/signup', params)
  },
  shorten(params) {
    return Api().post('/shorten', params)
  },
};