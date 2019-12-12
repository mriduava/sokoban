
export default {
    template: `
       <div class="final">
           <div class="final-message">
               <div><h1>Thanks for playing SOKOBAN!</h1></div>
               <div>
                   <h4>Your total score {{fianlScore}}</h4>
                   <h4>Your played {{levelPlayed}} Levls</h4>
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
               fianlScore: 0,
               levelPlayed: 0,
               spendTime: 0
           }
       },
}