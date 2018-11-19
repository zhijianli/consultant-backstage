import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)

axios.defaults.timeout = 10000
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
const urlPrefix = 'http://localhost:8089/'


// export function getResponseGeneral(url, params = {}) {
// 	return axios.get(urlPrefix + url).then((response) => {
// 		if (response.status === 200) {
// 			return response.data2
// 		} else {
// 			return {msg: "抱歉，服务器错误"}
// 		}
// 	}).catch((error) => {
// 		return Promise.reject({msg: error.message})
// 	})
// }

export function getResponseGeneral(url, params = {}) {
  return axios.post("/api" + url, params).then((response) => {
    if (response.status === 200) {
      return response.data
    } else {
      return {msg: "抱歉，服务器错误"}
    }
  }).catch((error) => {
    return Promise.reject({msg: error.message})
  })
}



export default new Vuex.Store({
  state:{
    count:0,
    consultantList: []
  },
  mutations:{
    increment:state => state.count ++,
    decrement:state => state.count --,
    getConsultantList({commit}) {
  			     return Promise.all([getResponseGeneral("/consultant/getAllMessageByCondition")
  				]).then(([a, b]) => {
  	         commit("consultantList", a.consultantList)
  			}).catch((error) => {
  				console.error(error)

  				return Promise.reject(error)
  			})
  	},


  },


})
