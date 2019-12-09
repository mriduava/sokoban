import {store} from '../js/store.js'

export default {
    store,
    template: `
     <div class="grid">
        <div class="path" v-for="(blockRow, row) in grids">

            <div class="all-blocks" v-for="(block, col) in blockRow" 
                 :style="{ top: row*32 + 'px', left: col*32 + 'px'}">
                <div class="wall" v-if="block == 'W'" 
                     :style="{backgroundColor: '#F93409'}">
                     <!-- {{block}}   -->
                </div>              

                <div class="object" v-else-if="block === 'G'" 
                     :style="{backgroundColor: '#99ffff', textAlign: 'center'}">
                    {{block}}
                </div>

                <div class="target" v-else-if="block === 'T'" 
                     :style="{backgroundColor: '#ddd', textAlign: 'center'}">
                    {{block}}
                </div>
            </div>

        </div>
            <div class="avatar"><i class="far fa-smile"></i></div>
     </div>`,
     data() {
         
         return {
            grids: [
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', 'W', ' ', 'W', 'W', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'T', ' ', 'W', 'W'],
                ['W', ' ', ' ', 'T', ' ', 'W', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', ' ', 'G', 'G', 'W'],
                ['W', ' ', ' ', ' ', 'A', ' ', ' ', ' ', ' ', 'G', 'G', 'W'],
                ['W', ' ', 'T', 'T', '', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', 'W', ' ', ' ', 'W', ' ', ' ', ' ', ' ', 'W'],
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
            ]
         }
     },
     mounted() {

        /*
        findPositions: Goes through the list this.grids and finds position of a certain element in the list.
        parameters: Takes two parameters; the first os of datatype string and other is of type array.
        */
        function findPositions(findElement,grids){
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
        /*checkSamePosObjectList: Checks that an object has the same position as any element in an array. */
        function checkSamePosObjectList(object,array){
            let element = 0;
            let trueW = true;
            for(element of array){
                    
                // if(JSON.stringify(objPos)===JSON.stringify(tarPos)){
                //     trueT = false
                // }
                if(JSON.stringify(object)===JSON.stringify(element)){
                    trueW = false;
                    break;
                }
            }
            return trueW
        }
        /*Checks if element at array[index] has same value as array[j] where j!=index.  */
        function arrayNext(array,index){
            let nextValue = true;
            for(let j=0;j<array.length;j++){
                if(j!=index){
                    if(JSON.stringify(array[index])===JSON.stringify(array[j])){
                        nextValue = false;
                        break;
                    }
                }
            }
            return nextValue
        }
        /*
        moveTarget: The avatar moves the target either left,up, right or down
        */
        function moveTarget(avaPos,objectPos,wallPos,tarPos,listZero,direction){
            
            for(let i = 0; i<tarPos.length;i++){
                if(JSON.stringify(objectPos)===JSON.stringify(tarPos[i])){
                    switch(direction){
                        case "left":
                            listZero[i]-=1
                            tarPos[i].x-=1
                             

                            //if targetposition is the same as wall stop
                            if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                                listZero[i]+=1
                                tarPos[i].x+=1
                            }
                            
                            //check if there is any nearby which has same position
                            if(arrayNext(tarPos,i)){
                                //if target position is not same as wall move 1 step
                                if(checkSamePosObjectList(tarPos[i],wallPos)){
                                    tarPos[i].x = targetPositions[i].x
                                    target[i].style.left = listZero[i]*32 + 'px'
                                }
                                
                            }
                            //if avatar position is same as target, doesn't go into target
                            if(objectPos.x == tarPos[i].x){
                                objectPos.x = tarPos[i].x + 1
                                avaPos.style.left = objectPos.x * 32 + 'px'
                            }
                            break;
                        case "up":
                            listZero[i]-=1
                            tarPos[i].y-=1   
                            
                            //if targetposition is the same as wall stop
                            if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                                listZero[i]+=1
                                tarPos[i].y+=1
                            }
                            
                            if(arrayNext(tarPos,i)){
                                //if target position is not same as wall move 1 step
                                if(checkSamePosObjectList(tarPos[i],wallPos)){
                                    tarPos[i].y = targetPositions[i].y
                                    target[i].style.top = listZero[i]*32 + 'px'
                                }
                                
                            }
                            //if avatar position is same as target, doesn't go into target
                            if(objectPos.y == tarPos[i].y){
                                objectPos.y = tarPos[i].y + 1
                                avaPos.style.top = objectPos.y * 32 + 'px'
                            }
                            break;
                        case "right":
                            listZero[i]+=1
                            tarPos[i].x+=1   
                              ;
                            if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                                listZero[i]-=1
                                tarPos[i].x-=1
                            }
                            
                            //check if there is any nearby which has same position
                            if(arrayNext(tarPos,i)){
                                //if target position is not same as wall move 1 step
                                if(checkSamePosObjectList(tarPos[i],wallPos)){
                                    tarPos[i].x = targetPositions[i].x
                                    target[i].style.left = listZero[i]*32 + 'px'
                                }
                                
                            }
                            //if avatar position is same as target, doesn't go into target
                            if(objectPos.x == tarPos[i].x){
                                objectPos.x = tarPos[i].x - 1
                                avaPos.style.left = objectPos.x * 32 + 'px'
                            }
                            break;
                        case "down":{
                            listZero[i]+=1
                            tarPos[i].y+=1    
                              ;
                            if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                                listZero[i]-=1
                                tarPos[i].y-=1
                            }
                            
                            if(arrayNext(tarPos,i)){
                                //if target position is not same as wall move 1 step
                                if(checkSamePosObjectList(tarPos[i],wallPos)){
                                    tarPos[i].y = targetPositions[i].y
                                    target[i].style.top = listZero[i]*32 + 'px'
                                }
                                
                            }
                            //if avatar position is same as target, doesn't go into target
                            if(objectPos.y == tarPos[i].y){
                                objectPos.y = tarPos[i].y - 1
                                avaPos.style.top = objectPos.y * 32 + 'px'
                            }
                            break;
                        }
                    }  
                }
            
            }
        }
        
        //All positions of different letters in this.grids.
        let wallPositions=findPositions('W',this.grids)
        let targetPositions= findPositions('T',this.grids)
        let goalPositions= findPositions('G',this.grids)
        let objPos = findPositions('A', this.grids)[0]

        //Finds all tags with the with certain tag-names.
        let target = document.getElementsByClassName('target')
        let avatar = document.querySelector('.avatar')
        let goal = document.querySelector('.goal')
        
        
        let score = 0;

        //Start position of object.
        avatar.style.left = objPos.x * 32 + 'px'
        avatar.style.top = objPos.y * 32 + 'px'

        //Values which are later used for determining the pixels for moving the targets.
        let listZeroX = [0,0,0,0]
        let listZeroY = [0,0,0,0]

        /**
        * Event key listener
        * For the movement of the Avatar and Target by
        * pressing Arrow Key from Keyboard
        */
        document.addEventListener('keydown', (e) => {
            // Left arrow key
            switch(e.keyCode){
                case 37:      
                    objPos.x -=1
                    //Check if avatar has same position as any wall.
                    if(checkSamePosObjectList(objPos,wallPositions)==false){
                        objPos.x +=1
                    }
                    if(checkSamePosObjectList(objPos,wallPositions)){
                        avatar.style.left = objPos.x*32 + 'px'
                        moveTarget(avatar, objPos,wallPositions,targetPositions,listZeroX,"left")
                    }
                    break;
             // Up arrow key   
                case 38:
                    objPos.y -=1
                    if(checkSamePosObjectList(objPos,wallPositions)==false){
                        objPos.y +=1
                    }
                    if(checkSamePosObjectList(objPos,wallPositions)){
                        avatar.style.top = objPos.y*32 + 'px'
                        moveTarget(avatar,objPos,wallPositions,targetPositions,listZeroY,"up")
                    }
                    break;                  
            // Right arrow key 
                case 39: 
                    objPos.x +=1
                    if(checkSamePosObjectList(objPos,wallPositions)==false){
                        objPos.x -=1
                    }
                    if(checkSamePosObjectList(objPos,wallPositions)){
                        avatar.style.left = objPos.x *32 + 'px'
                        moveTarget(avatar, objPos,wallPositions,targetPositions,listZeroX,"right")
                    }
                    break;
            // Down arrow key
                case 40:
                    objPos.y+=1
                    if(checkSamePosObjectList(objPos,wallPositions)==false){
                        objPos.y-=1
                    }
                    if(checkSamePosObjectList(objPos,wallPositions)){
                        avatar.style.top = objPos.y*32 + 'px'
                        moveTarget(avatar,objPos,wallPositions, targetPositions,listZeroY,"down")
                    }
                    break;
            }
        });
     }
}