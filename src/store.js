import {grids} from './data/grids.js'

export const store = new Vuex.Store({
    state: {
        score: 0,
        steps: 0,
        time: 0,
        grids: grids,
        level: 0,
        complete: false
    }
})