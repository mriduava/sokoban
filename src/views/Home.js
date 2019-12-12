import {store} from '../store.js'
import * as logic from '../logic/logic.js'
import Game from './Game.js'
import Final from './Final.js'

export default{
    store,
    name: "home",
    components: {
          Game,
          Final      
    },
    template: `
        <div id="home">

            <div class="nav">
                <div class="game-name">{{gameName}}</div> 

                <div class="sub-nav">
                    <div class="nav-width">
                        <div class="level">LEVEL <span class="level-num">{{updateLevel}}</span></div>
                        <div class="steps">STEPS <span class="steps-num">{{updateSteps}}</span></div>
                        <div class="time">TIME <span class="stop-watch"> 00:00:00</span></div>
                        <div class="score">SCORE <span class="score-num">{{score}}</span></div>
                    </div>
                </div>

                <div class="under-nav">
                    <div class="nav-width">
                        <button class="reset" @click="$emit('reset')">RESET</button>
                        <div class="life">POWER 
                            <span class="star"><i class="fas fa-star"></i>
                                  <i class="fas fa-bomb"></i>
                                  <i class="far fa-star"></i>
                            </span>
                        </div>
                        <div class="bonus-points">BONUS POINTS {{bonus}}</div>
                    </div>
                </div>
                
            </div>

           <transition name="fade">
                <div class="game" v-if="!updateComplete">                    
                    <Game/>                
                </div> 
           </transition>

           <div class="completion" >
            <Final v-if="updateComplete && complete" @close="complete = false">
            </Final>
            </div>

        </div>`,
    data() {
        return {
            gameName: 'sOkObAn',
            level: 1,
            score: this.$store.state.score,
            bonus: 0,
            power: 3,
            complete: false
        }        
    },
    computed: {
        updateSteps(){
            return this.$store.state.steps
        },
        updateTime(){
            return this.$store.state.time
        },
        updateLevel(){
            return this.complete?
                this.$store.state.level:
                this.$store.state.level + 1  
        },
        updateComplete(){
            return this.complete = this.$store.state.complete
        }
    },
    mounted() {
      
      
        // let game = document.querySelector('.game')
        // let store = this.complete
        // // game.style.setProperty('opacity', '1');
        // if (this.complete == true) {
        //     game.style.setProperty('display', 'none');
        //     (function fadeGame(){
        //     (game.style.opacity -= 0.1 ) < 0 ? game.style.display="none": setTimeout(fadeGame, 1000)})(); 
        // }
    }

}