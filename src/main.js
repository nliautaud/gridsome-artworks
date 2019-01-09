import DefaultLayout from '~/layouts/Default.vue'

import Buefy from 'buefy'
import '~/assets/main.sass'

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";

import VueLazyload from 'vue-lazyload'
import Lazymage from '~/components/Lazymage'

export default function (Vue) {
  Vue.component('DefaultLayout', DefaultLayout)
  Vue.component('Lazymage', Lazymage)

  Vue.use(Buefy, {
    defaultIconPack: "far"
  })

  Vue.use(VueLazyload)
}
