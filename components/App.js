import Home from './Home.js'
import Board from './Board.js'

export default{
    name: "app",
    components: {
       Home,
       Board
    },
    template: `
        <div id="app">

            <div @click="isShow ^= true">
                <Home/>
            </div>

            <div v-show="isShow">
                <Board/>
            </div>
                     
        </div>`,

    data() {
        return {
            isShow: false
        }
    },
}