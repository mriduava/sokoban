import {store} from '../store.js'
import * as logic from '../logic/logic.js'

export default {
    store,
    template: `
     <div class="grid">
        <div v-for="(blockRow, row) in grids">
            <div class="all-blocks" v-for="(block, col) in blockRow" 
                 :style="{ top: row*unit + 'px', left: col*unit + 'px'}">
                <div class="walls" v-if="block == 'W'" 
                     :style="{backgroundColor: '#F93409'}">
                </div>              
                <div class="goals" v-else-if="block === 'G'" 
                     :style="{backgroundColor: '#99ffff', textAlign: 'center'}">
                </div>
                <div class="boxes" v-else-if="block === 'B'" 
                     :style="{backgroundColor: '#d3a13b', textAlign: 'center'}">
                </div>
            </div>
        </div>
            <div class="avatar"><i class="far fa-smile"></i></div>
     </div>`,
     data() {
         return {
            unit: 32,
            grids: [],
            complete: false
         }
     },
     mounted() {
        //Grids pattern coming from data/grids.js file via store
        this.grids = this.$store.state.grids[0].grid

        /**
        * Defined initial score
        * Defined object's movement unit
        */
        let score = 0;
        let unit = this.unit;       
        


        //All positions of different letters in this.grids.
        let wallPositions = logic.findPositions('W',this.grids)
        let targetPositions = logic.findPositions('B',this.grids)
        let goalPositions = logic.findPositions('G',this.grids)
        let avatarPosition = logic.findPositions('A', this.grids)[0]

        //Finds all tags with the with certain tag-names.
        let target = document.getElementsByClassName('boxes')
        let avatar = document.querySelector('.avatar')
        

        //Start position of object.
        avatar.style.left = avatarPosition.x * unit + 'px'
        avatar.style.top = avatarPosition.y * unit + 'px'

        //Values which are later used for determining the pixels for moving the targets.
        let listZeroX = [0, 0, 0, 0, 0, 0]
        let listZeroY = [0, 0, 0, 0, 0, 0]
        

        /**
        * Event key listener
        * For the movement of the Avatar and Target by
        * pressing Arrow Key from Keyboard
        */
        document.addEventListener('keydown', (e) => {
            // Left arrow key
            switch(e.keyCode){
                case 37:
                    this.$store.state.steps += 1 

                    avatarPosition.x -=1
                    //Check if avatar has same position as any wall.
                    if(logic.checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.x +=1
                    }
                    //moves avatar to the left
                    else{
                        avatar.style.left = avatarPosition.x*unit + 'px'
                        //moves target to the left
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroX, "left", target, targetPositions)
                    }
                    //checks if all targets are on the goal positions
                    if(logic.checkArraySameElements(goalPositions, targetPositions)){
                        console.log("You have won.")
                        this.complete = true;
                        setTimeout(() => {
                            this.grids = this.$store.state.grids[1].grid
                        }, 1000);
                      
                    }
                    break;
             // Up arrow key   
                case 38:
                    this.$store.state.steps += 1                    
                    avatarPosition.y -= 1
                    
                    if(logic.checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.y += 1
                    }
                    else{
                        avatar.style.top = avatarPosition.y*unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroY, "up", target, targetPositions)
                    }
                    if(logic.checkArraySameElements(goalPositions, targetPositions)){
                        console.log("You have won.")
                        this.complete = true;
                        setTimeout(() => {
                            this.grids = this.$store.state.grids[1].grid
                        }, 1000);
                        
                    }
                    break;                  
            // Right arrow key 
                case 39:
                    this.$store.state.steps += 1 
                    avatarPosition.x += 1
                    if(logic.checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.x -= 1
                    }
                    else{
                        avatar.style.left = avatarPosition.x *unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroX, "right", target, targetPositions)
                    }
                    if(logic.checkArraySameElements(goalPositions, targetPositions)){
                        console.log("You have won.")
                        this.$store.state.complete = true;
                        setTimeout(() => {
                            this.grids = this.$store.state.grids[1].grid
                            avatar.style.left = avatarPosition.x * unit + 'px'
                            avatar.style.top = avatarPosition.y * unit + 'px'
                        }, 5000);
                      
                    }
                    break;
            // Down arrow key
                case 40:
                    this.$store.state.steps += 1
                    avatarPosition.y += 1
                    if(logic.checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.y -= 1
                    }
                    else{
                        avatar.style.top = avatarPosition.y*unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroY, "down", target, targetPositions)
                    }
                    if(logic.checkArraySameElements(goalPositions, targetPositions)){
                        setTimeout(() => {
                            this.grids = this.$store.state.grids[1].grid
                        }, 1000);
                        
                    }
                    break;
            }
        });
     }
}