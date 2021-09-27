import Api from "@/services/Api";

export default {
  login(user) {
    return Api().post('/login',user)
  },
  signup(params) {
    console.log('req----------',params);
    return Api().post('/signup', params)
  },
  shorten(params) {
    return Api().post('/shorten', params)
  },
};