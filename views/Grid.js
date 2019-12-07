import {store} from '../js/store.js'

export default {
    store,
    template: `
     <div class="grid">
        <div v-for="(blockRow, row) in grids">

            <div class="blocks-container" v-for="(block, col) in blockRow" 
                 :style="{ top: row*32 + 'px', left: col*32 + 'px'}">
                <div class="wall" v-if="block === 'W'" 
                     :style="{backgroundColor: '#F93409'}">
                     <!-- {{block}}   -->
                </div>              

                <div class="goals" v-else-if="block === 'G'" 
                     :style="{backgroundColor: '#99ffff', textAlign: 'center'}">
                    {{block}}
                </div>
            </div>

        </div>
            <div class="avatar-container"></div>
            <div class="boxes-container"></div>
     </div>`,
     data() {
         return {
            grids: [
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
                ['W', 'A', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W'],
                ['W', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', 'B', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
            ]
       
         }
     },
     mounted() {
        /**
        * To find the position of each blocks in the array
        * It takes two parameters. 
        * First one is the elemnt which positions need to find.
        * Second parameter is the Grid.
        */
        function findPositions(findElement, grids){
            let array = [];
            for(let i = 0; i<grids.length; i++){
                for(let j=0;j<grids[i].length; j++){
                    if(findElement === grids[i][j]){
                        let object = {
                            x:j,
                            y:i
                        }
                        array.push(object)
                    }
                }
            }
            return array
        }

        // To find Wall positions
        let wallPositions = findPositions('W', this.grids);
        // To find Avatar position
        let avatarPosition = findPositions('A', this.grids);        
        // To find Target positions
        let boxPositions = findPositions('B', this.grids);
        // To find Goal positions
        let goalPostions = findPositions('G', this.grids);



        let avatarContainer = document.querySelector('.avatar-container')
        let boxesContainer = document.querySelector('.boxes-container')
        
        let score = 0;
        let unit = 32;

        let yWidth = this.grids.length * unit
        let xWidth = this.grids[0].length * unit

        let gridWidth = xWidth;
        let gridHeight = yWidth;
        
       

        /**
        * Functions to create movable Avatar and Boxes
        * It creates Avatar & Boxes according to grid's 'A' & 'B' positions
        * This function takes three parameters-
        * First: Positions-Array of Element
        * Second: HTML tag, where it will create new HTML element
        * Thire: Created element's class name
        */
        function createElement(positionArray, parentTag, myClass){
            for(let i=0; i<positionArray.length; i++){
                parentTag.insertAdjacentHTML('afterend',
                     `<div class="${myClass}" id="${(positionArray[i].x)*unit}${(positionArray[i].y)*unit}"
                           style="left: ${(positionArray[i].x)*unit}px; top: ${(positionArray[i].y)*unit}px">
                      </div>`) 
            }            
        }

        //To create Boxes, where 'box' is class name 
        createElement(boxPositions, boxesContainer, 'boxes')
        //To create Avatar wher 'avatar' is it's class name
        createElement(avatarPosition, avatarContainer, 'avatar')

        //To select the Avatar
        let avatar = document.querySelector('.avatar')
        //To select all Targets which is created by the createTargets function
        let boxes = document.querySelector('.boxes')


        //ToDo
        for(let i=0; i<boxes.length; i++){
            boxes[i].addEventListener('click', ()=> {
                let leftDist = boxes[i].style.left.replace('px', '')
                let topDist = boxes[i].style.top.replace('px', '')
                console.log(leftDist, topDist);
            })
        }
 

        let goalPos = [{x: goalPostions[0].x,
                        y: goalPostions[0].y}];

        let avtRow = 1*unit;
        let avtCol = 1*unit;
        let avtPos = {x: avatarPosition[0].x,
                      y: avatarPosition[0].y}


        let boxRow = 1*unit;
        let boxCol = 1*unit;
        // let boxPos = [{x: boxPositions[0].x,
        //               y: boxPositions[0].y}];

        let boxPos = {x: boxPositions[0].x, 
                      y: boxPositions[0].y}



        /**
        * To find if an object exist in the array
        * The function takes one array of objects and one comparable object
        */
        function existObj(arrObj, compObj){
            let found = false;
            for(var i = 0; i < arrObj.length; i++) {
                if (arrObj[i].x == compObj.x  && arrObj[i].y == compObj.y) {
                    found = true;
                    break;
                }
            }
            return found;
        }


        //TEST FUNCTIONS
        let box2Pos = {x: boxPositions[0].x, 
                      y: boxPositions[0].y}

        let box2Row = (box2Pos.x)*unit;
        let box2Col = (box2Pos.y)*unit;

        function leftRightDirection() {                                            
            console.log('Hit');
            box2Pos.x = box2Row/unit
            boxes.style.left = box2Row + 'px' 
            box2Pos.x = box2Row/unit
            box2Pos.y = box2Col/unit              
        }

        function upDownDirection() {                                            
            console.log('Hit');
            box2Pos.y = box2Col/unit
            boxes.style.top = box2Col + 'px' 
            box2Pos.x = box2Row/unit
            box2Pos.y = box2Col/unit              
        }

         /**
        * Event key listener
        * For the movement of the Avatar and Boxes by
        * pressing Arrow Key from Keyboard
        */
        // Right arrow key
        function rightKeyPress(e){ 
            
            if (e.keyCode == 39) {
                if (avtRow < gridWidth-unit && !existObj(wallPositions, avtPos)) {
                    avtRow += unit;        
                
                    avtPos.x = avtRow/unit
                    avtPos.y = avtCol/unit

                    let valueOfW = 0;
                    let trueW = true;
                    let trueT =true
                    for(valueOfW of wallPositions){
                        
                        if(valueOfW.x*unit == boxRow+unit & valueOfW.y*unit == boxCol){
                            trueT = false
                            console.log(trueT)
                        }
                        if(valueOfW.x*unit == avtRow & valueOfW.y*unit == avtCol){
                            trueW = false;
                            console.log(trueW)
                            avtRow -= unit;
                            avtPos.x = avtRow/unit
                            return;
                        }
                    }
                    
                    if(trueW){
                       avatar.style.left = avtRow + 'px' 
                    }   

                    if(JSON.stringify(avtPos) === JSON.stringify(box2Pos) && trueT){                                  
                        box2Row += unit                    
                        leftRightDirection()                        
                    }

                    console.log(box2Pos);
                    console.log(avtPos);        
                }
            } 
        }

        // Left arrow key
        const leftKeyPress = (e) => {
            if (e.keyCode == 37) {
             
                if (avtRow > 32 && !existObj(wallPositions, avtPos)) {   
                    avtRow -= unit;  

                    avtPos.x = avtRow/unit
                    avtPos.y = avtCol/unit

                    let trueW = true;
                    let trueT = true;
                    let valueOfW = 0;
                    for(valueOfW of wallPositions){
                        if(valueOfW.x*unit == boxRow-unit & valueOfW.y*unit == boxCol){
                            trueT = false
                        }
                        if(valueOfW.x*unit == avtRow & valueOfW.y*unit == avtCol){
                            trueW = false;
                            avtRow += unit;
                            avtPos.x = avtRow*unit
                            avtPos.y = avtCol*unit
                            return;
                        }
                    }
                    if(trueW){
                        avatar.style.left = avtRow + 'px'                                     
                    }
                    if(JSON.stringify(avtPos) === JSON.stringify(box2Pos)){                                  
                        box2Row -= unit                    
                        leftRightDirection()                        
                    } 

                    console.log(box2Pos);
                    console.log(avtPos);                                  
                }
            }
        }
        
        //Up arrow key  
        const upKeyPress = (e) => { 
           if (e.keyCode == 38) {
                if (avtCol > 32 && !existObj(wallPositions, avtPos)) {
                    avtCol -= unit;

                    avtPos.x = avtRow/unit
                    avtPos.y = avtCol/unit
                    let valueOfW = 0;
                    let trueW = true;
                    let trueT= true;
                    for(valueOfW of wallPositions){
                        if(valueOfW.x*unit == boxRow & valueOfW.y*unit == boxCol-unit){
                            trueT = false
                        }
                        if(valueOfW.x *unit == avtRow & valueOfW.y*unit == avtCol){
                            trueW = false;
                            avtCol += unit;
                            avtPos.x = avtRow*unit
                            avtPos.y = avtCol*unit
                            return;
                        }
                    }
                    if(trueW){
                       avatar.style.top = avtCol + 'px'
                    }
                    if(JSON.stringify(avtPos) === JSON.stringify(box2Pos)){                                  
                        box2Col -= unit                    
                        upDownDirection()                        
                    }                         
                }
            }
        }

        //Down arrow key
        const downKeyPress = (e) => {
            if (e.keyCode == 40) {
                if (avtCol < gridHeight-32 && !existObj(wallPositions, avtPos)) {
                    avtCol += unit;

                    avtPos.x = avtRow/unit
                    avtPos.y = avtCol/unit

                    let valueOfW = 0;
                    let trueT=true;
                    let trueW = true;
                    for(valueOfW of wallPositions){
                        if(valueOfW.x*unit == boxRow & valueOfW.y*unit == boxCol+unit){
                            trueT = false
                        }
                        if(valueOfW.x*unit == avtRow & valueOfW.y*unit == avtCol){
                            trueW = false;
                            avtCol -= unit;
                            avtPos.x = avtRow*unit
                            avtPos.y = avtCol*unit
                            return;
                        }
                    }
                    if(trueW){
                        avatar.style.top = avtCol + 'px'
                    }
                    if(JSON.stringify(avtPos) === JSON.stringify(box2Pos)){                                  
                        box2Col += unit                    
                        upDownDirection()                        
                    }
                }        
            } 
        }

        
        document.addEventListener('keydown', rightKeyPress)
        document.addEventListener('keydown', leftKeyPress)
        document.addEventListener('keydown', upKeyPress)
        document.addEventListener('keydown', downKeyPress)       
    
     }
}