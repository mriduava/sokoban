import {store} from '../store.js'
import * as logic from '../logic/logic.js'
import Game from './Game.js'

export default{
    store,
    name: "home",
    components: {
          Game        
    },
    template: `
        <div id="home">

            <div class="nav">
                <div class="game-name">{{gameName}}</div> 

                <div class="sub-nav">
                    <div class="nav-width">
                        <div class="level">LEVEL <span class="level-num">{{level}}</span></div>
                        <div class="steps">STEPS <span class="steps-num">{{updateSteps}}</span></div>
                        <div class="time">TIME <span class="stop-watch"> 00:00:00</span></div>
                        <div class="score">SCORE <span class="score-num">{{score}}</span></div>
                    </div>
                </div>

                <div class="under-nav">
                    <div class="nav-width">
                        <div class="reset">RESET</div>
                        <div class="life">POWER 
                            <span class="star"><i class="fas fa-star"></i>
                                  <i class="far fa-star"></i>
                                  <i class="far fa-star"></i>
                            </span>
                        </div>
                        <div class="bonus-points">BONUS POINTS {{bonus}}</div>
                    </div>
                </div>
                
            </div>

            <div class="game">                    
                <Game/>                
            </div> 

        </div>`,
    data() {
        return {
            gameName: 'sOkObAn',
            level: 1,
            score: this.$store.state.score,
            bonus: 0,
            power: 3
        }        
    },
    computed: {
        updateSteps(){
            return this.$store.state.steps
        },
        updateTime(){
            return this.$store.state.time
        }
    },
    mounted() {
        let store = this.$store.state.complete
        let game = document.querySelector('.game').style

        // game.opacity = 1;
        // if (store == true) {
        //    (function fadeGame(){
        //     (game.opacity -= 0.1 ) < 0 ? game.display="none": setTimeout(fadeGame, 40)})(); 
        // }
    }

}