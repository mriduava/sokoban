import {store} from '../store.js'
export default {
    template: `
       <div class="final">
           <div class="final-message">
               <div><h1>Thanks for playing SOKOBAN!</h1></div>
               <div>
                   <h4>Your total score {{finalScore}}</h4>
                   <h4>Your played {{levelPlayed}} levels</h4>
                   <h4>Time spend {{spendTime}} minutes</h4>
               </div>
               <div><h2>Do you want to play again?</h2></div>
               <div>
                   <button>Yes</button>
                   <button>No</button>
               </div>
           </div>
       </div>`,
       data() {
           return {
               finalScore: this.$store.state.score,
               levelPlayed: this.$store.state.level,
               spendTime: 0
           }
       },
}