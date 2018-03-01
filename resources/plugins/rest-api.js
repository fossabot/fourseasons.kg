import Vue from 'vue'
import axios from 'axios'


const rest = {
  install(Vue, options) {
    Vue.prototype.$rest = this
  },
  api(method, param) {
    return axios.post('http://localhost/api/' + method + '/', param).then(res => {
      return res.data;
    })
  }
};
Vue.use(rest);
