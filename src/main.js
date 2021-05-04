import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, 
        BIconPerson, 
        BIconFileEarmarkRuledFill, 
        BIconHouseFill, 
        BIconTrashFill, 
        BIconArrowLeft, 
        BIconArrowRight,
        BIconFileEarmarkXFill } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)

Vue.component('i-person', BIconPerson)
Vue.component('i-survey', BIconFileEarmarkRuledFill)
Vue.component('i-house', BIconHouseFill)
Vue.component('i-trash', BIconTrashFill)
Vue.component('i-left', BIconArrowLeft)
Vue.component('i-right', BIconArrowRight)
Vue.component('i-x-eamark', BIconFileEarmarkXFill)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
