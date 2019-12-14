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
                        <div class="time">TIME <span v-if="!updateStopWatch">00:00:00</span>
                                                <span class="stop-watch" v-if="updateStopWatch"></span>
                        </div>
                        <div class="score">SCORE <span class="score-num">{{updateScore}}</span></div>
                    </div>
                </div>

                <div class="under-nav">
                    <div class="nav-width">
                        <button class="reset" @click="$emit('reset')">RESET</button>
                        <div class="power">POWER 
                            <span class="star"><i @click="activeStrength" class="fas fa-user-friends"></i>
                                  <i @click="activeBomb" class="fas fa-bomb"></i>
                                  <i @click="activeDrill" class="fas fa-hammer"></i>
                            </span>
                        </div>
                        <div class="message">{{message}}</div>
                    </div>
                </div>
            </div>

           <transition name="fade">
                <div class="game" v-if="!updateComplete">                    
                    <Game/>                
                </div> 
           </transition>

           <div class="completion" >
                <Final v-if="updateComplete && complete" 
                    @close="complete = false">
                </Final>
           </div>

        </div>`,
    data() {
        return {
            gameName: 'sOkObAn',
            complete: false,
            bombActive: false,
            strengthActive: false,
            drillActive: false,
            stopWatch: false,
            message: 'No power used!'
        }        
    },
    computed: {
        updateScore(){
            return this.$store.state.score
        },
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
        },
        updateStopWatch(){
            return this.stopWatch = this.$store.state.stopWatch            
        }
    },
    methods: {
        activeStrength(){
            this.$store.state.strengthActive = true
            this.message = 'Strength is active!'
        },
        activeBomb(){
            this.$store.state.bombActive = true
            this.message = 'Bomb is avtive!'
            console.log(this.$store.state.bombActive);           
        },
        activeDrill(){
            this.$store.state.drillActive = true
            this.message = 'Drill is active!'
        },
        stopClock(){
            let watch = document.querySelector('.stop-watch')
            let milseconds = 0, seconds = 0, minutes = 0;
            function time() {
                milseconds++;
                if (milseconds >= 99) {
                    milseconds = 0;
                    seconds++;
                    if (seconds >= 60) {
                        seconds = 0;
                        minutes++;
                    }
                }
                watch.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
                                    (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":" + 
                                    (milseconds > 9 ? milseconds : "0" + milseconds);
            }
            function stopWatch() {
                setInterval(time, 10);
            }
            stopWatch();
        }
    },
    watch: {
        'stopWatch' (){
            if (this.$store.state.stopWatch) {
                this.stopClock()
            }
        }
    },
    mounted() {
    }

}