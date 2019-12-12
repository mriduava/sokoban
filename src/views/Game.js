import {store} from '../store.js'
import * as logic from '../logic/logic.js'

export default {
    store,
    template: `
     <div class="grid">
        <div class ="row" v-for="(blockRow, row) in grids">
            <div class="all-blocks" v-for="(block, col) in blockRow" 
                 :style="{ top: row*unit + 'px', left: col*unit + 'px'}">
                <div class="walls" v-if="block == 'W'" 
                     :style="{backgroundColor: '#F93409'}">
                </div>              
                <div class="goals" v-else-if="block === 'G'" 
                     :style="{backgroundColor: '#07e2ff', textAlign: 'center'}">
                </div>
                <div class="floor" v-else-if="block === 'F'" 
                     :style="{backgroundColor: 'rgb(216, 240, 252)'}">
                </div>
                <div class="boxes" v-else-if="block === 'B'" 
                     :style="{textAlign: 'center'}">
                </div>
                
            </div>
        </div>
        <div class="avatar" :style="{top:7*unit+'px', left:10*unit+'px'}"><i class="far fa-smile"></i></div>           
     </div>`,
    data() {
        return {
            unit: 32,
            grids: this.$store.state.grids[0].grid,
            complete: false
         }
     },
     mounted() {
        //Grids pattern coming from data/grids.js file via store
        

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
        let walls = document.getElementsByClassName('walls')
        let avatar = document.querySelector('.avatar')

        //Start position of object.
        avatar.style.left = avatarPosition.x * unit + 'px'
        avatar.style.top = avatarPosition.y * unit + 'px'

        //Values which are later used for determining the pixels for moving the targets.
        let listZeroX = [0, 0, 0, 0, 0, 0]
        let listZeroY = [0, 0, 0, 0, 0, 0]

        // Powerups
        let bombActive = false;
        let strengthActive = false;
        let drillActive = false;

        function levelUp(store, thisGame) {
            store.level += 1
            thisGame.grids = store.grids[store.level].grid 
            avatarPosition = logic.findPositions('A', thisGame.grids)[0]
            wallPositions = logic.findPositions('W',thisGame.grids)
            targetPositions = logic.findPositions('B',thisGame.grids)
            goalPositions = logic.findPositions('G',thisGame.grids)                        
            avatar.style.left = avatarPosition.x * unit + 'px'
            avatar.style.top = avatarPosition.y * unit + 'px'
            listZeroX = [0,0,0,0,0]
            listZeroY = [0,0,0,0,0]
        }

        /**
        * Event key listener
        * For the movement of the Avatar and Target by
        * pressing Arrow Key from Keyboard
        */
        document.addEventListener('keydown', (e) => {
            // Left arrow key
            
            switch (e.keyCode) {
                case 37:
                    
                   this.$store.state.steps += 1  
                    avatarPosition.x -= 1
                    //Check if avatar has same position as any wall and has the drill active
                    if ((logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) && drillActive) {
                        walls[logic.findArrayElementIndex(wallPositions, avatarPosition)].style.display = "none";
                        delete wallPositions[logic.findArrayElementIndex(wallPositions, avatarPosition)];

                        avatarPosition.x += 1
                        drillActive = false;
                        console.log('drill used');

                    }
                    //Check if avatar has same position as a box and a bomb active
                    else if (logic.checkSamePosObjectList(avatarPosition, targetPositions) == false && bombActive) {
                        
                        target[logic.findArrayElementIndex(targetPositions, avatarPosition)].style.display = "none";
                        delete targetPositions[logic.findArrayElementIndex(targetPositions, avatarPosition)]; 

                        avatarPosition.x += 1
                        bombActive = false;
                        console.log('bomb used');
                    }
                    //Check if avatar has same position as any wall.
                    else if(logic.checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.x +=1
                    }
                    //moves avatar to the left
                    else {
                        avatar.style.left = avatarPosition.x * unit + 'px'
                        
                        //moves target to the left
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroX, "left", target, targetPositions, strengthActive)
                    }
                    //checks if all targets are on the goal positions
                    if(logic.evaluateWin(goalPositions, targetPositions)){
                        console.log("You have won.")
                        levelUp(this.$store.state, this)
                        // if (this.$state.grids.length > this.$store.state.grids.level ) {
                        //     levelUp()
                        // }
                      
                      
                    }
                    break;
                // Up arrow key   
                case 38:
                    this.$store.state.steps += 1                    
                    avatarPosition.y -= 1
                    if ((logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) && drillActive) {
                        walls[logic.findArrayElementIndex(wallPositions, avatarPosition)].style.display = "none";
                        delete wallPositions[logic.findArrayElementIndex(wallPositions, avatarPosition)];

                        avatarPosition.y += 1
                        drillActive = false;
                        console.log('no drill');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, targetPositions) == false && bombActive) {
                        target[logic.findArrayElementIndex(targetPositions, avatarPosition)].style.display = "none";
                        delete targetPositions[logic.findArrayElementIndex(targetPositions, avatarPosition)];

                        avatarPosition.y += 1
                        bombActive = false;
                        
                        console.log('bomb used');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) {
                        avatarPosition.y += 1
                    }
                    else{
                        avatar.style.top = avatarPosition.y*unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroY, "up", target, targetPositions, strengthActive)
                    }
                    if(logic.evaluateWin(goalPositions, targetPositions)){
                        console.log("You have won.")

                        if (this.$store.state.level<2) {
                            levelUp(this.$store.state, this)
                        }else{
                            this.$store.state.level=0;
                        }
                    }
                    break;
                // Right arrow key 
                case 39:
                    this.$store.state.steps += 1
                    avatarPosition.x += 1
                    if ((logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) && drillActive) {
                        walls[logic.findArrayElementIndex(wallPositions, avatarPosition)].style.display = "none";
                        delete wallPositions[logic.findArrayElementIndex(wallPositions, avatarPosition)];

                        avatarPosition.x -= 1
                        drillActive = false;
                        console.log('no drill');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, targetPositions) == false && bombActive) {
                        target[logic.findArrayElementIndex(targetPositions, avatarPosition)].style.display = "none";
                        delete targetPositions[logic.findArrayElementIndex(targetPositions, avatarPosition)];

                        avatarPosition.x -= 1
                        bombActive = false;
                    
                        console.log('bomb used');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) {
                        avatarPosition.x -= 1
                    }
                    else{
                        avatar.style.left = avatarPosition.x *unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroX, "right", target, targetPositions, strengthActive)
                    }
                    if(logic.evaluateWin(goalPositions, targetPositions)){
                        console.log("You have won.")

                        if (this.$store.state.level< this.$store.state.grids.length-1) {
                            levelUp(this.$store.state, this)
                        }else{
                            this.$store.state.level = 0;
                            this.$store.state.complete = true;
                        }
                        
                        
                    }
                    break;
                // Down arrow key
                case 40:
                    this.$store.state.steps += 1
                    avatarPosition.y += 1
                    if ((logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) && drillActive) {
                        walls[logic.findArrayElementIndex(wallPositions, avatarPosition)].style.display = "none";
                        delete wallPositions[logic.findArrayElementIndex(wallPositions, avatarPosition)];

                        avatarPosition.y -= 1
                        drillActive = false;
                        console.log('no drill');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, targetPositions) == false && bombActive) {
                        target[logic.findArrayElementIndex(targetPositions, avatarPosition)].style.display = "none";
                        delete targetPositions[logic.findArrayElementIndex(targetPositions, avatarPosition)];

                        avatarPosition.y -= 1
                        bombActive = false;
                        console.log('bomb used');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) {
                        avatarPosition.y -= 1
                    }
                    else{
                        avatar.style.top = avatarPosition.y*unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroY, "down", target, targetPositions, strengthActive)
                    }
                    if(logic.evaluateWin(goalPositions, targetPositions)){
                       levelUp(this.$store.state, this)
                        
                    }
                    break;
                // a key 
                case 65:
                    bombActive = true;
                    console.log('bomb');
                    break;
                // s key
                case 83:
                    strengthActive = true;
                    console.log('strength');
                    break;
                // d key
                case 68:
                    drillActive = true;
                    console.log('drill');
                    break;
            }
        });
    }
}