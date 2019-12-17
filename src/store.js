import {grids} from './data/grids.js'

export const store = new Vuex.Store({
    state: {
        steps: 0,
        level: 0,
        timeSpend: 0,
        grids: grids,
        complete: false,
        stopWatch: false,
        strengthActive: false,
        bombActive: false,
        drillActive: false,
        resetLevel: false,
        restart: false
    }
})