import Vue from 'vue'
import log from 'loglevel'

import router from '@/router'
import store from '@/store'
import { LOG_LEVEL } from '@/common/config'

import App from '@/App.vue'
import ApiService from '@/common/api.service'
import DateFilter from '@/common/date.filter'
import ErrorFilter from '@/common/error.filter'

import '@/assets/styles/main.scss'

log.setLevel(LOG_LEVEL)

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.filter('error', ErrorFilter)

ApiService.init()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
