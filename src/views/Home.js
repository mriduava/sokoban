import {store} from '../store.js'
import * as logic from '../logic/logic.js'
import {eventBus} from "../main.js";
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
                        <div class="level"><i class="fas fa-layer-group"></i> LEVEL <span class="level-num">{{updateLevel}}</span></div>
                        <div class="steps"><i class="fas fa-walking"></i> STEPS <span class="steps-num">{{updateSteps}}</span></div>
                        <div class="time"><i class="far fa-clock"></i> TIME <span v-if="!updateStopWatch">00:00:00</span>
                                                <span class="stop-watch" v-if="updateStopWatch"></span>
                        </div>
                        <div class="score"><i class="fas fa-chart-line"></i> SCORE <span class="score-num">{{updateScore}}</span></div>
                    </div>
                </div>

                <div class="under-nav">
                    <div class="nav-width">
                        <button class="reset" @click="showInfo"><i class="fas fa-info-circle"></i> INFO</button>
                        <div class="power">POWER 
                            <span class="star"><i ref="strength" @click="activeStrength" class="fas fa-user-friends"></i>
                                  <i ref="bomb" @click="activeBomb" class="fas fa-bomb"></i>
                                  <i ref="hammer" @click="activeDrill" class="fas fa-hammer"></i>
                            </span>
                        </div>
                        <span class="message">{{message}}</span>
                        <button class="reset" @click="resetLevel()"><i class="fas fa-undo-alt"></i> RESET</button>
                    </div>
                </div>
            </div>

            <div ref="show" class="game-info">
              <div class="info-text">
                <h1>How to play</h1>
                <hr>
                <ul>
                    <li>Complete level within minimum steps.</li>
                    <li>Minimum time can give extra points.</li>
                    <li>Each power can be used only once.</li>
                </ul>
              </div>
            </div>

            <div class="game" v-if="!updateComplete">                    
                <Game/>                
            </div> 

            <div class="completion" >
                <Final v-if="updateComplete && complete" 
                    @close="complete = false"
                     @restart="restartGame">
                </Final>
            </div>

            <div>
                <div v-if="updateComplete" class="game-name-end">{{gameName}}</div> 
            </div>
        </div>`,
    data() {
        return {
            gameName: 'sOkObAn',
            complete: false,
            restart: false,
            bombActive: false,
            strengthActive: false,
            hammerActive: false,
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
            !this.strengthActive?
            (this.strengthActive = true,
            this.$store.state.strengthActive = true,
            this.message = 'Strength is active!',
            this.$refs.strength.classList.add('selected')):
            (this.$store.state.strengthActive = false,
            this.message = 'Strength is used!')
        },
        activeBomb(){
            !this.bombActive?
            (this.bombActive = true, 
            this.$store.state.bombActive = true,
            this.message = 'Bomb is avtive!',
            this.$refs.bomb.classList.add('selected')):
            (this.$store.state.bombActive = false,
            this.message = "Bomb is used!")
        },
        activeDrill(){
            !this.hammerActive?
            (this.hammerActive = true,
            this.$store.state.drillActive = true,
            this.message = 'Hammer is active!',
            this.$refs.hammer.classList.add('selected')):
            (this.$store.state.drillActive = false,
            this.message = 'Hammer is used!')
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
        },
        restartGame(){
            this.$store.state.restart = true;
            location.reload()
        },
        resetLevel(){
            eventBus.$emit('reset');
        },
        showInfo(){
            this.$refs.show.classList.toggle('show-info')            
        }
    },
    watch: {
        stopWatch(){
            if (this.$store.state.stopWatch) {
                this.stopClock()
            }
        }
    }

}