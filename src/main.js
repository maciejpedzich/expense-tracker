import Vue from 'vue'
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format'

import App from './App.vue'
import router from './frontend/router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(VueFilterDateFormat)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
