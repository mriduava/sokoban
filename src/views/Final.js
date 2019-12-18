
export default {
    template: `
       <div class="final">
        <transition name="modal">

            <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                 <div class="background-modal"></div>
                <div class="modal-header">
                    <slot name="header">
                        <h1>Thank you for playing Sokoban!</h1>
                        <hr>
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        <h4>You walked <span>{{updateSteps}}</span> steps</h4>
                        <h4 v-bind="updateTime">Time spent <span>{{spendTime.minutes}}</span> minutes, <span>{{spendTime.seconds}}</span> seconds</h4>
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                      <h2>Do you want to play again?</h2>
                       <div class="modal-button">
                        <button class="modal-default-button yes" @click="$emit('restart')">
                           Yes
                        </button>
                        <button class="modal-default-button no" @click="$emit('close')">
                            No
                        </button>
                     </div>
                    </slot>
                </div>
                </div>
            </div>
            </div>
        </transition>
       </div>`,
       data() {
           return {
               spendTime: {
                    minutes: 0,
                    seconds: 0
               }
           }
       },
       computed: {
           updateSteps(){
               return this.$store.state.steps
           },
           updateTime () {
               this.spendTime.minutes = Math.floor(this.$store.state.timeSpend/60000)
               this.spendTime.seconds = ((this.$store.state.timeSpend % 60000)/1000).toFixed(0)
           }
       }
}