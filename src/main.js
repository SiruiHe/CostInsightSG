import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import VueAwesomePaginate from "vue-awesome-paginate";

import './css/style.css'
import "vue-awesome-paginate/dist/style.css";

const app = createApp(App)
app.use(router).use(VueAwesomePaginate)
app.mount('#app')
