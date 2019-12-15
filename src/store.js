import {grids} from './data/grids.js'

export const store = new Vuex.Store({
    state: {
        score: 0,
        steps: 0,
        level: 0,
        spendTime: 0,
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