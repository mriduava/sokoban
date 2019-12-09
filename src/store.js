import {grids} from './data/grids.js'

export const store = new Vuex.Store({
    state: {
        score: 0,
        grids: grids[0].grid
    },
    getters:{
        grids: state => state.grids
    },
    mutations: {

    }
})