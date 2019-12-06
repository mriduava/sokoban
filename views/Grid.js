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
            </div>

        </div>
            <div class="emoticon"></div>
            <div class="boxes"></div>
     </div>`,
     data() {
         return {
            // grids: [],
            grids: [
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W'],
                ['W', ' ', ' ', 'W', ' ', ' ', ' ', ' ', 'B', ' ', 'W', 'W'],
                ['W', ' ', ' ', 'B', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'G', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'G', 'W'],
                ['W', ' ', 'B', 'B', ' ', ' ', 'A', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
            ],
            wallPositions: [],
            avatarPosition: [],
            boxPositions: [],
            goalPositions: [] 
         }
     },
     mounted() {

        let emoticon = document.querySelector('.emoticon')
        let boxes = document.querySelector('.boxes')
        
        let score = 0;
        let unit = 32;

        let yWidth = this.grids.length * unit
        let xWidth = this.grids[0].length * unit

        let gridWidth = xWidth;
        let gridHeight = yWidth;

        let row = 1*unit;
        let col = 1*unit;

        let tarRow = 1*unit;
        let tarCol = 1*unit;

        let objPos = this.avatarPosition

        let currentAvatarPos = {x: (this.avatarPosition[0])*unit,
                                y: (this.avatarPosition[0])*unit}

        let tarPos = this.boxPositions;

        let tar2Pos = [{x: 0, x: 0}];

        let goalPos = [];


        let avatarId = 0;

        for(let el in objPos){
            console.log(el.x);
            
        }
        

        /**
        * To find the position of each blocks in the array
        * It takes two parameters. First one is the elemnt or object
        * which positions need tp find.
        * Second parameter is the Array where all positions will be stored.
        */
        const findPositions = (elementToFind, positionsArray) => {
            for(var x=0; x<this.grids.length; x++){
            var indexes = [];
            let row  = x;
                for(var y=0; y<this.grids[x].length; y++){
                    if (this.grids[x][y] === elementToFind) {                        
                        let rowArr = this.grids[x];
                        indexes = rowArr
                            .map((row, i) => row === elementToFind ? i : null)
                            .filter(i => i !== null)
                    }                   
                }
                for(var i=0; i<indexes.length; i++){       
                    var objectPosition = {
                        x: +indexes[i],                    
                        y: +row
                    }
                    positionsArray.push(objectPosition);                  
                }       
            }
        }

        // To find Wall positions
        findPositions('W', this.wallPositions);

        // To find Avatar position
        findPositions('A', this.avatarPosition);
        
        // To find Target positions
        findPositions('B', this.boxPositions);

        // To find Goal positions
        findPositions('G', this.goalPositions);

           

        /**
        * To find if an object exist in the array
        * The function takes one array of objects and one comparable object
        */
        const existObj = (arrObj, compObj) => {
            let found = false;
            for(var i = 0; i < arrObj.length; i++) {
                if (arrObj[i].x == compObj.x  && arrObj[i].y == compObj.y) {
                    found = true;
                    break;
                }
            }
            return found;
        }

        /**
        * Functions to create movable Avatar and Boxes
        * It creates Avatar & Boxes according to grid's 'A' & 'B' positions
        * This function takes three parameters-
        * First: Positions-Array of Element
        * Second: HTML tag, where it will create new HTML element
        * Thire: Created element's class name
        */
        const createElement = (positionArray, parentTag, myClass) => {
            for(let i=0; i<positionArray.length; i++){
                parentTag.insertAdjacentHTML('afterend',
                     `<div class="${myClass}" id="${(positionArray[i].x)*unit}${(positionArray[i].y)*unit}"
                           style="left: ${(positionArray[i].x)*unit}px; top: ${(positionArray[i].y)*unit}px">
                      </div>`) 
            }            
        }

        //To create Boxes, where 'box' is class name 
        createElement(this.boxPositions, boxes, 'box')

        //To create Avatar wher 'avatar' is it's class name
        createElement(this.avatarPosition, emoticon, 'avatar')

        //To select all Targets which is created by the createTargets function
        let target2 = document.querySelectorAll('.box')

        //To select the Avatar
        let avatar = document.querySelector('.avatar')

        //ToDo
        for(let i=0; i<target2.length; i++){
            target2[i].addEventListener('click', ()=>{
                let idNum = target2[i].getAttribute('id');
                // console.log(idNum)
                let leftDist = target2[i].style.left.replace('px', '')
                let topDist = target2[i].style.top
                console.log(leftDist, topDist);
            })
        }

        /**
        * Event key listener
        * For the movement of the Avatar and Boxes by
        * pressing Arrow Key from Keyboard
        */
        // document.addEventListener('keydown', (e) => {
        //     // Left arrow key
        //     if (e.keyCode == 37) {
        //         if (row > 32 && !existObj(this.wallPositions, objPos)) {   
        //             row -= unit;  

        //             objPos.x = row/unit
        //             objPos.y = col/unit

        //             tarPos.x = tarRow/unit
        //             tarPos.y = tarCol/unit

        //             let trueW = true;
        //             let trueT = true;
        //             let valueOfW = 0;
        //             for(valueOfW of this.wallPositions){
        //                 if(valueOfW.x*unit == tarRow-unit & valueOfW.y*unit == tarCol){
        //                     trueT = false
        //                 }
        //                 if(valueOfW.x*unit == row & valueOfW.y*unit == col){
        //                     trueW = false;
        //                     row += unit;
        //                     objPos.x = row*unit
        //                     objPos.y = col*unit
        //                     return;
        //                 }
        //             }
        //             if(trueW){
        //             avatar.style.left = row + 'px'
        //             tarPos.x = tarRow/unit
        //             tarPos.y = tarCol/unit

        //             if(JSON.stringify(objPos) == JSON.stringify(tarPos) && trueT){                        
        //                 console.log('Hit');
        //                 tarRow -= unit
        //                 target.style.left = tarRow + 'px'
        //             }                                      
        //         }                                    
        //     }
        //   }   // Up arrow key   
        //     else if (e.keyCode == 38) {
        //         if (col > 32 && !existObj(this.wallPositions, objPos)) {
        //             col -= unit;

        //             objPos.x = row/unit
        //             objPos.y = col/unit
        //             let valueOfW = 0;
        //             let trueW = true;
        //             let trueT= true;
        //             for(valueOfW of this.wallPositions){
        //                 if(valueOfW.x*unit == tarRow & valueOfW.y*unit == tarCol-unit){
        //                     trueT = false
        //                 }
        //                 if(valueOfW.x *unit == row & valueOfW.y*unit == col){
        //                     trueW = false;
        //                     col += unit;
        //                     objPos.x = row*unit
        //                     objPos.y = col*unit
        //                     return;
        //                 }
        //             }
        //             if(trueW){
        //             avatar.style.top = col + 'px'
        //             tarPos.x = tarRow/unit
        //             tarPos.y = tarCol/unit

        //             if(JSON.stringify(objPos) == JSON.stringify(tarPos) & trueT){                        
        //                 console.log('Hit');
        //                 tarCol -= unit
        //                 target.style.top = tarCol + 'px'
        //             } 
        //         }                          
        //     }
        // }  // Right arrow key 
        //     else if (e.keyCode == 39) {
        //         if (row < gridWidth-32 && !existObj(this.wallPositions, objPos)) {
        //             row += unit;        
                
        //             objPos.x = row/unit
        //             objPos.y = col/unit

        //             let valueOfW = 0;
        //             let trueW = true;
        //             let trueT =true
        //             for(valueOfW of this.wallPositions){
                        
        //                 if(valueOfW.x*unit == tarRow+unit & valueOfW.y*unit == tarCol){
        //                     trueT = false
        //                     console.log(trueT)
        //                 }
        //                 if(valueOfW.x*unit == row & valueOfW.y*unit == col){
        //                     trueW = false;
        //                     console.log(trueW)
        //                     row -= unit;
        //                     objPos.x = row/unit
        //                     return;
        //                 }
        //             }
                    
        //             if(trueW){
        //             avatar.style.left = row + 'px' 
                    
        //             //ToDo
        //             for(let t=0; t<tarPos.length; t++){

        //                 let newTarPos = {
        //                     x: tarPos[t].x,
        //                     y: tarPos[t].y
        //                 }
        //                 tar2Pos.push(newTarPos) 
        //                 tarRow = (tarPos[t].x)*unit
                    
        //             }
                    

        //             if(existObj(tar2Pos, objPos) && trueT){                        
        //                 console.log('Hit');
        //                 tarRow += unit
        //                 for(let i=0; i<target2.length; i++){
        //                     target2[i].style.left = tarRow + 'px'

        //                     let leftDist = target2[i].getAttribute('style')
        //                     let topDist = target2[i].getAttribute('style')
        //                     console.log(leftDist. topDist);                            
        //                 }                        
        //             } 
        //             //If the Target & Goals positions are same, it will give One Point
        //             if(JSON.stringify(tarPos) === JSON.stringify(goalPos)){
        //                 score ++ 
        //                 this.score = score; 
        //                 //The score in store.js file will be filled with this data
        //                 this.$store.state.score = this.score
        //                 console.log('hit') 

        //             }
        //         }            
        //     }
        //     // Down arrow key
        // }else if (e.keyCode == 40) {
        //         if (col < gridHeight-32 && !existObj(this.wallPositions, objPos)) {
        //             col += unit;

        //             objPos.x = row/unit
        //             objPos.y = col/unit

        //             let valueOfW = 0;
        //             let trueT=true;
        //             let trueW = true;
        //             for(valueOfW of this.wallPositions){
        //                 if(valueOfW.x*unit == tarRow & valueOfW.y*unit == tarCol+unit){
        //                     trueT = false
        //                 }
        //                 if(valueOfW.x*unit == row & valueOfW.y*unit == col){
        //                     trueW = false;
        //                     col -= unit;
        //                     objPos.x = row*unit
        //                     objPos.y = col*unit
        //                     return;
        //                 }
        //             }
        //             if(trueW){
        //             avatar.style.top = col + 'px'

        //             tarPos.x = tarRow/unit
        //             tarPos.y = tarCol/unit

        //                 if(JSON.stringify(objPos) == JSON.stringify(tarPos) && trueT){                        
        //                     console.log('Hit');
        //                     tarCol += unit
        //                     target.style.top = tarCol + 'px'
        //                 }
        //             }
        //         }        
        //     } 
        // });       
    
     }
}