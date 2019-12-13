
export default {
    template: `
       <div class="final">
        <transition name="modal">
            <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                            <h1>Thanks to play SOKOBAN!</h1>
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        <h4>Your total score {{updateScore}}</h4>
                        <h4>You played {{updateLevelPlayed}} levls</h4>
                        <h4>Time spend {{updateSpendTime}} minutes</h4>
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                    <button class="modal-default-button" @click="$emit('close')">
                        No
                    </button>
                    </slot>
                </div>
                </div>
            </div>
            </div>
        </transition>
       </div>`,
       data() {
           return {
               fianlScore: 0,
               levelPlayed: 0,
               spendTime: 0
           }
       },
       computed: {
           updateSpendTime(){
               return this.$store.state.spendTime
           },
           updateLevelPlayed(){
               return this.$store.state.level
           },
           updateScore(){
               return this.$store.state.score
           }
       },
}