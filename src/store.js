import {grids} from './data/grids.js'

export const store = new Vuex.Store({
    state: {
        score: 0,
        steps: 1,
        grids: grids
    },
    getters:{
        grids: state => state.grids,
        complete: state => state.complete
    },
    mutations: {
        completLevel(state, i){
            if (i> state.grids.length) {
                
            }
        }

    }
})