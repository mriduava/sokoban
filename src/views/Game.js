import {store} from '../store.js'
import * as logic from '../logic/logic.js'
import {eventBus} from "../main.js";

export default {
    store,
    template: `
     <div class="grid" @reset="reset()">
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
            strengthActive: false,
            bombActive: false,
            drillActive: false
         }
     },
     mounted() {
        //Grids pattern coming from data/grids.js file via store
        this.grids = this.$store.state.grids[0].grid

        console.log(this.$store.state.bombActive);
        /**
        * Defined object's movement unit
        */
        let unit = this.unit;       
        
        //All positions of different letters in grids.
        let wallPositions = logic.findPositions('W',this.grids)
        let targetPositions = logic.findPositions('B',this.grids)
        let goalPositions = logic.findPositions('G',this.grids)
        let avatarPosition = logic.findPositions('A', this.grids)[0]

        // console.log(goalPositions.length);
        

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
        let bombActive = this.bombActive;
        let strengthActive = this.strengthActive;
        let drillActive = this.drillActive;

        function resetLevel(store, thisGame){
            listZeroX = [0,0,0,0,0,0]
            listZeroY = [0,0,0,0,0,0]
            thisGame.grids = store.grids[store.level].grid 
            avatarPosition = logic.findPositions('A', thisGame.grids)[0]
            targetPositions = logic.findPositions('B',thisGame.grids)                      
            avatar.style.left = avatarPosition.x * unit + 'px'
            avatar.style.top = avatarPosition.y * unit + 'px'
 
            for (let i = 0; i < targetPositions.length; i++) {
                target[i].style.left = targetPositions[i].x + 'px';
                target[i].style.top = targetPositions[i].y + 'px'; 
                console.log(i, targetPositions[i]);           
            } 
        }

        // setTimeout(() => {
        //     resetLevel(this.$store.state, this)
        //     console.log('Mridul');
        // }, 5000);
        
        /**
        * To navigate to the next level
        * 
        */
        function levelUp(store, thisGame) {
            store.level += 1
            thisGame.grids = store.grids[store.level].grid 
            avatarPosition = logic.findPositions('A', thisGame.grids)[0]
            wallPositions = logic.findPositions('W',thisGame.grids)
            targetPositions = logic.findPositions('B',thisGame.grids)
            goalPositions = logic.findPositions('G',thisGame.grids)                        
            avatar.style.left = avatarPosition.x * unit + 'px'
            avatar.style.top = avatarPosition.y * unit + 'px'
            listZeroX = [0,0,0,0,0,0]
            listZeroY = [0,0,0,0,0,0]
        }

        /**
        * Event key listener
        * For the movement of the Avatar and Boxes by
        * pressing Arrow Key from Keyboard
        */
        document.addEventListener('keydown', (e) => {
            // Left arrow key
            switch (e.keyCode) {
                case 37:
                   this.$store.state.steps += 1  
                   this.$store.state.stopWatch = true
                    avatarPosition.x -= 1
                    //Check if avatar has same position as any wall and has the drill active
                    if ((logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) && this.$store.state.drillActive) {
                        walls[logic.findArrayElementIndex(wallPositions, avatarPosition)].style.display = "none";
                        delete wallPositions[logic.findArrayElementIndex(wallPositions, avatarPosition)];
                        avatarPosition.x += 1
                        this.$store.state.drillActive = false;
                        console.log('drill used');
                    }
                    //Check if avatar has same position as a box and a bomb active
                    else if (logic.checkSamePosObjectList(avatarPosition, targetPositions) == false && this.$store.state.bombActive) {
                        target[logic.findArrayElementIndex(targetPositions, avatarPosition)].style.display = "none";
                        delete targetPositions[logic.findArrayElementIndex(targetPositions, avatarPosition)]; 
                        avatarPosition.x += 1
                        this.$store.state.bombActive = false;
                        console.log('bomb used');
                    }
                    //Check if avatar has same position as any wall.
                    else if(logic.checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.x += 1
                    }
                    //moves avatar to the left
                    else {
                        avatar.style.left = avatarPosition.x * unit + 'px'
                        //moves target to the left
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroX, "left", target, targetPositions, this.$store.state.strengthActive)
                    }
                    //checks if all targets are on the goal positions
                    if(logic.evaluateWin(goalPositions, targetPositions)){
                        console.log("You have won.")
                        if (this.$store.state.level< this.$store.state.grids.length-1) {
                            levelUp(this.$store.state, this)
                        }else{
                            this.$store.state.level = 0;
                            this.$store.state.complete = true;
                            this.$store.state.stopWatch = false;
                        }
                    }
                    break;
                // Up arrow key   
                case 38:
                    this.$store.state.steps += 1 
                    this.$store.state.stopWatch = true                   
                    avatarPosition.y -= 1
                    if ((logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) && this.$store.state.drillActive) {
                        walls[logic.findArrayElementIndex(wallPositions, avatarPosition)].style.display = "none";
                        delete wallPositions[logic.findArrayElementIndex(wallPositions, avatarPosition)];
                        avatarPosition.y += 1
                        this.$store.state.drillActive = false;
                        console.log('no drill');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, targetPositions) == false && this.$store.state.bombActive) {
                        target[logic.findArrayElementIndex(targetPositions, avatarPosition)].style.display = "none";
                        delete targetPositions[logic.findArrayElementIndex(targetPositions, avatarPosition)];
                        avatarPosition.y += 1
                        this.$store.state.bombActive = false;
                        console.log('bomb used');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) {
                        avatarPosition.y += 1
                    }
                    else{
                        avatar.style.top = avatarPosition.y*unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroY, "up", target, targetPositions, this.$store.state.strengthActive)
                    }
                    if(logic.evaluateWin(goalPositions, targetPositions)){
                        console.log("You have won.")

                        if (this.$store.state.level < this.$store.state.grids.length-1) {
                            levelUp(this.$store.state, this)
                        }else{
                            this.$store.state.level = 0;
                            this.$store.state.complete = true;  
                        }
                    }
                    break;
                // Right arrow key 
                case 39:
                    this.$store.state.steps += 1
                    this.$store.state.stopWatch = true
                    avatarPosition.x += 1
                    if ((logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) && this.$store.state.drillActive) {
                        walls[logic.findArrayElementIndex(wallPositions, avatarPosition)].style.display = "none";
                        delete wallPositions[logic.findArrayElementIndex(wallPositions, avatarPosition)];
                        avatarPosition.x -= 1
                        this.$store.state.drillActive = false;
                        console.log('no drill');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, targetPositions) == false && this.$store.state.bombActive) {
                        target[logic.findArrayElementIndex(targetPositions, avatarPosition)].style.display = "none";
                        delete targetPositions[logic.findArrayElementIndex(targetPositions, avatarPosition)];
                        avatarPosition.x -= 1
                        this.$store.state.bombActive = false;
                        console.log('bomb used');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) {
                        avatarPosition.x -= 1
                    }
                    else{
                        avatar.style.left = avatarPosition.x *unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroX, "right", target, targetPositions, this.$store.state.strengthActive)
                    }
                    if(logic.evaluateWin(goalPositions, targetPositions)){
                        console.log("You have won.")
                        if (this.$store.state.level< this.$store.state.grids.length-1) {
                            levelUp(this.$store.state, this)
                            this.$store.state.score += goalPositions.length
                        }else{
                            this.$store.state.level = 0;
                            this.$store.state.complete = true;
                            this.$store.state.stopWatch = false;
                        } 
                    }
                    break;
                // Down arrow key
                case 40:
                    this.$store.state.steps += 1
                    this.$store.state.stopWatch = true
                    avatarPosition.y += 1
                    if ((logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) && this.$store.state.drillActive) {
                        walls[logic.findArrayElementIndex(wallPositions, avatarPosition)].style.display = "none";
                        delete wallPositions[logic.findArrayElementIndex(wallPositions, avatarPosition)];
                        avatarPosition.y -= 1
                        this.$store.state.drillActive = false;
                        console.log('no drill');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, targetPositions) == false && this.$store.state.bombActive) {
                        target[logic.findArrayElementIndex(targetPositions, avatarPosition)].style.display = "none";
                        delete targetPositions[logic.findArrayElementIndex(targetPositions, avatarPosition)];
                        avatarPosition.y -= 1
                        this.$store.state.bombActive = false;
                        console.log('bomb used');
                    }
                    else if (logic.checkSamePosObjectList(avatarPosition, wallPositions) == false) {
                        avatarPosition.y -= 1
                    }
                    else{
                        avatar.style.top = avatarPosition.y*unit + 'px'
                        logic.moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroY, "down", target, targetPositions, this.$store.state.strengthActive)
                    }
                    if(logic.evaluateWin(goalPositions, targetPositions)){
                       if (this.$store.state.level < this.$store.state.grids.length-1) {
                            levelUp(this.$store.state, this)
                        }else{
                            this.$store.state.level = 0;
                            this.$store.state.complete = true;
                            this.$store.state.stopWatch = false;
                        }
                    }
                    break;
            }
        });
    }
}