import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from "./stores";
import './assets/styles/main.css'

// 引入 Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCode, faPaintBrush, faCogs, faEnvelope, faGlobe,
    faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faBlogger } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 添加图标到库
library.add(
    faCode, faPaintBrush, faCogs, faEnvelope,
    faGlobe, faExternalLinkAlt, faGithub, faBlogger
)

const app = createApp(App)
app.use(router)
app.use(pinia)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
