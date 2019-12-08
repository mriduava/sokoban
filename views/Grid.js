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
                ['W', ' ', ' ', 'W', ' ', ' ', ' ', ' ', 'T', ' ', 'W', 'W'],
                ['W', ' ', ' ', 'T', ' ', 'W', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'G', 'W'],
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
        
        /*moveTarget: The avatar moves the target either left,up, right or down */
        function moveTarget(objectPos, array, listZero,direction){
            for(let i = 0; i<array.length;i++){
                let tarPos = array[i]
                if(JSON.stringify(objectPos)===JSON.stringify(tarPos)){
                    switch(direction){
                        case "left":
                            listZero[i]-=1
                            array[i].x-=1
                            console.log('Hit');
                            tarPos.x = targetPositions[i].x 
                            target[i].style.left = listZero[i]*unit + 'px'
                            break;
                        case "up":
                            listZero[i]-=1
                            array[i].y-=1        
                            console.log('Hit');
                            tarPos.y = targetPositions[i].y
                            target[i].style.top = listZero[i]*unit + 'px'
                            break;
                        case "right":
                            listZero[i]+=1
                            array[i].x+=1   
                            console.log('Hit');
                            tarPos.x = targetPositions[i].x
                            target[i].style.left = listZero[i]*unit + 'px'
                            break;
                        case "down":{
                            listZero[i]+=1
                            array[i].y+=1    
                            console.log('Hit');
                            tarPos.y = targetPositions[i].y 
                            target[i].style.top = listZero[i]*unit + 'px'
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
        let unit = 32;

        //Start position of object.
        avatar.style.left = objPos.x * unit + 'px'
        avatar.style.top = objPos.y * unit + 'px'

        //Values which are later used for determining the pixels for moving the avatar.
        let row = objPos.x*unit;
        let col = objPos.y*unit;

        //Width and height of the this.grid. 
        let gridWidth = this.grids.length * unit
        let gridHeight = this.grids[0].length * unit

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
            if (e.keyCode == 37) {
                row -= unit;        
                objPos.x = row/unit
                objPos.y = col/unit

                //Check if avatar has same position as any wall.
                if(checkSamePosObjectList(objPos,wallPositions)==false){
                    row += unit;
                    objPos.x = row/unit
                }
                if(checkSamePosObjectList(objPos,wallPositions)){
                    avatar.style.left = row + 'px'
                    //Move target to left.  
                    moveTarget(objPos,targetPositions,listZeroX,"left")
                }
            }
             // Up arrow key   
            else if (e.keyCode == 38) {
                
                    col -= unit;
                    objPos.x = row/unit
                    objPos.y = col/unit

                    if(checkSamePosObjectList(objPos,wallPositions)==false){
                        col += unit;
                        objPos.y = col/unit
                    }
                    if(checkSamePosObjectList(objPos,wallPositions)){
                            avatar.style.top = col + 'px'
                            moveTarget(objPos,targetPositions,listZeroY,"up")
                    }
                }                         
            // Right arrow key 
            else if (e.keyCode == 39) {

                    row += unit;        
                    objPos.x = row/unit
                    objPos.y = col/unit

                    if(checkSamePosObjectList(objPos,wallPositions)==false){
                        row -= unit;
                        objPos.x = row/unit
                    }
                    if(checkSamePosObjectList(objPos,wallPositions)){
                        avatar.style.left = row + 'px'
                        moveTarget(objPos,targetPositions,listZeroX,"right")
                    }
                }
            // Down arrow key
            else if (e.keyCode == 40) {

                    col += unit;
                    objPos.x = row/unit
                    objPos.y = col/unit

                    if(checkSamePosObjectList(objPos,wallPositions)==false){
                        col -= unit;
                        objPos.y = col/unit
                    }
                    if(checkSamePosObjectList(objPos,wallPositions)){
                        avatar.style.top = col + 'px'
                        moveTarget(objPos,targetPositions,listZeroY,"down")
                    }
                }
            });
     }
}