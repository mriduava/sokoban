import {store} from '../store.js'

export default {
    store,
    template: `
     <div class="grid">
        <div v-for="(blockRow, row) in grids">
            <div class="all-blocks" v-for="(block, col) in blockRow" 
                 :style="{ top: row*unit + 'px', left: col*unit + 'px'}">
                <div class="walls" v-if="block == 'W'" 
                     :style="{backgroundColor: '#F93409'}">
                     <!-- {{block}}   -->
                </div>              
                <div class="goals" v-else-if="block === 'G'" 
                     :style="{backgroundColor: '#99ffff', textAlign: 'center'}">
                    <!-- {{block}} -->
                </div>
                <div class="boxes" v-else-if="block === 'B'" 
                     :style="{backgroundColor: '#d3a13b', textAlign: 'center'}">
                    <!-- {{block}} -->
                </div>
            </div>
        </div>
            <div class="avatar"><i class="far fa-smile"></i></div>           
     </div>`,
     data() {
         return {
            unit: 32,
            grids: []
         }
     },
     mounted() {
        //Grids pattern coming from data/grids.js file via store
        this.grids = this.$store.state.grids

        /**
        * Defined initial score
        * Defined object's movement unit
        */
        let score = 0;
        let unit = this.unit;

        /*
        findPositions: Goes through the list this.grids and finds position of a certain element in the list.
        parameters: Takes two parameters; the first os of datatype string and other is of type array.
        */
        function findPositions(findElement, grids){
            let array = [];
            for(let i = 0; i<grids.length; i++){
                for(let j=0;j<grids[0].length; j++){
                    if(findElement === grids[i][j]){
                        var object = {
                            x:j,
                            y:i
                        }
                        array.push(object)
                    }
                }
            }
            return array
        }


        //All positions of different letters in this.grids.
        let wallPositions = findPositions('W',this.grids)
        let targetPositions = findPositions('B',this.grids)
        let goalPositions = findPositions('G',this.grids)
        let avatarPosition = findPositions('A', this.grids)[0]

        //Finds all tags with the with certain tag-names.
        let target = document.getElementsByClassName('boxes')
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

        /*
        checkSamePosObjectList: Checks that an object has the same position as any element in an array.
        */
        function checkSamePosObjectList(object, array){
            let trueW = true;
            for(let element of array){
                if(JSON.stringify(object) === JSON.stringify(element)){
                    trueW = false;
                    break;
                }
            }
            return trueW
        }
        /*
        Checks if element at array[index] has same value as array[j] where j!=index.
        */
        function arrayNext(array, index){
            let nextValue = true;
            for(let j=0; j<array.length; j++){
                if(j != index){
                    if(JSON.stringify(array[index]) === JSON.stringify(array[j])){
                        nextValue = false;
                        break;
                    }
                }
            }
            return nextValue
        }
        /*
        moveTarget: The avatar moves the target either left, up, right or down
        */
        function moveTarget(avaPos, objectPos, wallPos, tarPos, listZero, direction){
            
            for(let i = 0; i<tarPos.length; i++){
                if(JSON.stringify(objectPos) === JSON.stringify(tarPos[i])){
                    switch(direction){
                        case "left":
                            listZero[i] -= 1
                            tarPos[i].x -= 1                        
                            //if targetposition is the same as wall stop
                            if(checkSamePosObjectList(tarPos[i], wallPos) == false || arrayNext(tarPos, i) == false){
                                listZero[i] += 1
                                tarPos[i].x += 1
                            }                            
                            //check if there is any nearby which has same position
                            else if(arrayNext(tarPos, i)){
                                //if target position is not same as wall move 1 step
                                if(checkSamePosObjectList(tarPos[i], wallPos)){
                                    tarPos[i].x = targetPositions[i].x
                                    target[i].style.left = listZero[i]*unit + 'px'
                                    console.log('X:' + listZeroX);
                                    console.log('Y:' + listZeroY);
                                    console.log(JSON.stringify(targetPositions));   
                                    console.log(JSON.stringify(avatarPosition));
                                }                                
                            }
                            //if avatar position is same as target, doesn't go into target
                            if(objectPos.x == tarPos[i].x){
                                objectPos.x = tarPos[i].x + 1
                                avaPos.style.left = objectPos.x * unit + 'px'
                            }
                            break;
                        case "up":
                            listZero[i] -= 1
                            tarPos[i].y -= 1   
                            //if targetposition is the same as wall stop
                            if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                                listZero[i] += 1
                                tarPos[i].y += 1
                            }
                            if(arrayNext(tarPos, i)){
                                //if target position is not same as wall move 1 step
                                if(checkSamePosObjectList(tarPos[i],wallPos)){
                                    tarPos[i].y = targetPositions[i].y
                                    target[i].style.top = listZero[i]*unit + 'px'
                                    console.log('X:'+listZeroX);
                                    console.log('Y:'+listZeroY);
                                    console.log(JSON.stringify(targetPositions));
                                    console.log(JSON.stringify(avatarPosition));
                                }                                
                            }
                            //if avatar position is same as target, doesn't go into target
                            if(objectPos.y == tarPos[i].y){
                                objectPos.y = tarPos[i].y + 1
                                avaPos.style.top = objectPos.y * unit + 'px'
                            }
                            break;
                        case "right":
                            listZero[i] += 1
                            tarPos[i].x += 1   
                              ;
                            if(checkSamePosObjectList(tarPos[i], wallPos) == false || arrayNext(tarPos,i) == false){
                                listZero[i] -= 1
                                tarPos[i].x -= 1
                            }
                            //check if there is any nearby which has same position
                            if(arrayNext(tarPos, i)){
                                //if target position is not same as wall move 1 step
                                if(checkSamePosObjectList(tarPos[i], wallPos)){
                                    tarPos[i].x = targetPositions[i].x
                                    target[i].style.left = listZero[i]*unit + 'px'
                                    console.log('X:'+listZeroX);
                                    console.log('Y:'+listZeroY);
                                    console.log(JSON.stringify(targetPositions));
                                    console.log(JSON.stringify(avatarPosition));
                                }
                            }
                            //if avatar position is same as target, doesn't go into target
                            if(objectPos.x == tarPos[i].x){
                                objectPos.x = tarPos[i].x - 1
                                avaPos.style.left = objectPos.x * unit + 'px'
                            }
                            break;
                        case "down":{
                            listZero[i] += 1
                            tarPos[i].y += 1    
                              ;
                            if(checkSamePosObjectList(tarPos[i], wallPos) == false || arrayNext(tarPos, i) == false){
                                listZero[i] -= 1
                                tarPos[i].y -= 1
                            }
                            
                            if(arrayNext(tarPos,i)){
                                //if target position is not same as wall move 1 step
                                if(checkSamePosObjectList(tarPos[i],wallPos)){
                                    tarPos[i].y = targetPositions[i].y
                                    target[i].style.top = listZero[i]*unit + 'px'
                                    console.log('X:'+listZeroX);
                                    console.log('Y:'+listZeroY);
                                    console.log(JSON.stringify(targetPositions));
                                    console.log(JSON.stringify(avatarPosition));
                                }                                
                            }
                            //if avatar position is same as target, doesn't go into target
                            if(objectPos.y == tarPos[i].y){
                                objectPos.y = tarPos[i].y - 1
                                avaPos.style.top = objectPos.y * unit + 'px'
                            }
                            break;
                        }
                    }  
                }            
            }
        }

        /*Checks if all element in two arrays are the same. We want this when checking if the player has all targets on the goals.*/
        function checkArraySameElements(array1, array2){
            let sameElement = 0;
            for(let element1 of array1){
                for(let element2 of array2){
                    if(JSON.stringify(element1) == JSON.stringify(element2)){
                        sameElement++;
                    }
                }
            }
            if(sameElement == array1.length){
                return true
            }
        }
        
        // Takes in an array and an object, if the object shares coordinates with an element in the array, the element is removed
        function destroyArrayElement(array, object) {
            let indexOfFound = -1;
            for(let i = 0; i<array.length; i++){
                if(JSON.stringify(array[i]) == JSON.stringify(object)){
                    array.splice(i, 1);
                    indexOfFound = i;
                    console.log(indexOfFound);
                    console.log(i);
                    
                }
            }
            return indexOfFound;
        }

        /**
        * Event key listener
        * For the movement of the Avatar and Target by
        * pressing Arrow Key from Keyboard
        */
        document.addEventListener('keydown', (e) => {
            // Left arrow key
            switch(e.keyCode){
                case 37:      
                    avatarPosition.x -=1
                    //Check if avatar has same position as any wall and has the drill active
                    if((checkSamePosObjectList(avatarPosition, wallPositions) == false) && drillActive){
                        destroyArrayElement(wallPositions, avatarPosition);
                        avatarPosition.x +=1
                        drillActive = false;
                        console.log('drill used');
                    }
                    else if(checkSamePosObjectList(avatarPosition, targetPositions) == false && bombActive){
                        let indexOfDestroyed = destroyArrayElement(targetPositions, avatarPosition);
                        listZeroX.splice(indexOfDestroyed, 1);
                        listZeroY.splice(indexOfDestroyed, 1);
                        avatarPosition.x +=1
                        /* console.log(listZeroX);
                        console.log(listZeroY); */
                        console.log(indexOfDestroyed);
                        console.log(JSON.stringify(avatarPosition));
                        
                        bombActive = false;
                        console.log('bomb used');                        
                    }
                    //Check if avatar has same position as any wall.
                    else if(checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.x +=1
                    }
                    //moves avatar to the left
                    else{
                        avatar.style.left = avatarPosition.x*unit + 'px'
                        //moves target to the left
                        moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroX, "left")
                    }
                    //checks if all targets are on the goal positions
                    if(checkArraySameElements(targetPositions, goalPositions)){
                        console.log("You have won.")
                    }
                    break;
             // Up arrow key   
                case 38:
                    avatarPosition.y -= 1
                    if((checkSamePosObjectList(avatarPosition, wallPositions) == false) && drillActive){
                        destroyArrayElement(wallPositions, avatarPosition)
                        avatarPosition.y +=1
                        drillActive = false;
                        console.log('no drill');
                    }
                    else if(checkSamePosObjectList(avatarPosition, targetPositions) == false && bombActive){
                        let indexOfDestroyed = destroyArrayElement(targetPositions, avatarPosition);
                        listZeroX.splice(indexOfDestroyed, 1);
                        listZeroY.splice(indexOfDestroyed, 1);
                        avatarPosition.y +=1
                        bombActive = false;
                        /* console.log(listZeroX);
                        console.log(listZeroY); */
                        console.log(indexOfDestroyed);
                        console.log(JSON.stringify(avatarPosition));
                        console.log('bomb used');                        
                    }
                    else if(checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.y += 1
                    }
                    else{
                        avatar.style.top = avatarPosition.y*unit + 'px'
                        moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroY, "up")
                    }
                    if(checkArraySameElements(targetPositions, goalPositions)){
                        console.log("You have won.")
                    }
                    break;                  
            // Right arrow key 
                case 39: 
                    avatarPosition.x += 1
                    if((checkSamePosObjectList(avatarPosition, wallPositions) == false) && drillActive){
                        destroyArrayElement(wallPositions, avatarPosition)
                        avatarPosition.x -= 1
                        drillActive = false;
                        console.log('no drill');
                    }
                    else if(checkSamePosObjectList(avatarPosition, targetPositions) == false && bombActive){
                        let indexOfDestroyed = destroyArrayElement(targetPositions, avatarPosition);
                        listZeroX.splice(indexOfDestroyed, 1);
                        listZeroY.splice(indexOfDestroyed, 1);
                        avatarPosition.x -=1
                        bombActive = false;
                        /* console.log(listZeroX);
                        console.log(listZeroY); */
                        console.log(indexOfDestroyed);
                        console.log(JSON.stringify(avatarPosition));
                        console.log('bomb used');                        
                    }
                    else if(checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.x -= 1
                    }
                    else{
                        avatar.style.left = avatarPosition.x *unit + 'px'
                        moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroX, "right")
                    }
                    if(checkArraySameElements(targetPositions, goalPositions)){
                        console.log("You have won.")
                    }
                    break;
            // Down arrow key
                case 40:
                    avatarPosition.y += 1
                    if((checkSamePosObjectList(avatarPosition, wallPositions) == false) && drillActive){
                        destroyArrayElement(wallPositions, avatarPosition)
                        avatarPosition.y -= 1
                        drillActive = false;
                        console.log('no drill');
                    }
                    else if(checkSamePosObjectList(avatarPosition, targetPositions) == false && bombActive){
                        let indexOfDestroyed = destroyArrayElement(targetPositions, avatarPosition);
                        listZeroX.splice(indexOfDestroyed, 1);
                        listZeroY.splice(indexOfDestroyed, 1);
                        avatarPosition.y -=1
                        bombActive = false;
                        /* console.log(listZeroX);
                        console.log(listZeroY); */
                        console.log(indexOfDestroyed);
                        console.log(JSON.stringify(avatarPosition));
                        console.log('bomb used');                        
                    }
                    else if(checkSamePosObjectList(avatarPosition, wallPositions) == false){
                        avatarPosition.y -= 1
                    }
                    else{
                        avatar.style.top = avatarPosition.y*unit + 'px'
                        moveTarget(avatar, avatarPosition, wallPositions, targetPositions, listZeroY, "down")
                    }
                    if(checkArraySameElements(targetPositions, goalPositions)){
                        console.log("You have won.")
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