import App from './views/App.js'
import {store} from './store.js'


Vue.config.devtools = true;
new Vue({
    store,
    render: h => h(App)
}).$mount('#app')


