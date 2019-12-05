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

                <!-- <div class="target" v-else-if="block === 'T'" 
                     :style="{backgroundColor: '#ddd', textAlign: 'center'}">
                    {{block}}
                </div> -->
            </div>

        </div>
            <div class="avatar"><i class="far fa-smile"></i></div>
            <div class="targets"></div>
            <!-- <div class="goal"></div> -->
     </div>`,
     data() {
         return {
            grids: [
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W'],
                ['W', ' ', ' ', 'W', ' ', ' ', ' ', ' ', 'T', ' ', 'W', 'W'],
                ['W', ' ', ' ', 'T', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'G', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'G', 'W'],
                ['W', ' ', 'T', 'T', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
            ],
            wallPositions: [],
            targetPositions: [],
            goalPositions: [] 
         }
     },
     mounted() {

        let avatar = document.querySelector('.avatar')
        let target = document.querySelector('.targets')
        let goal = document.querySelector('.goal')
        
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

        let objPos = {x: 1, y: 1}

        // let tarPos = [{x: 5, y: 3},
        //               {x: 3, y: 3},
        //               {x: 5, y: 3},
        //               {x: 5, y: 3}]

        let tarPos = this.targetPositions;


        let goalPos = [{x: 8, y: 6},
                       {x: 5, y: 3},
                       {x: 3, y: 5},
                       {x: 3, y: 5}]

        target.style.left = 5*unit + 'px'
        target.style.top = 3*unit + 'px'

        
        // console.log(this.targetPositions)

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
        
        // To find Target positions
        findPositions('T', this.targetPositions);

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
        * Functions to create movable Targets
        * It creates Targert according to grid's Targets positions
        */
        const createTargets = () => {
            for(let i=0; i<tarPos.length; i++){
                target.insertAdjacentHTML('afterend',
                     `<div class="target2"
                           style="left: ${(tarPos[i].x)*unit}px; top: ${(tarPos[i].y)*unit}px">
                      </div>`) 
            }            
        }
        createTargets()

        //To select all Targets which is created by the createTargets function
        let target2 = document.querySelector('.target2')
        // let target2 = $('.target2')

        /**
        * Event key listener
        * For the movement of the Avatar and Target by
        * pressing Arrow Key from Keyboard
        */
        document.addEventListener('keydown', (e) => {
            // Left arrow key
            if (e.keyCode == 37) {
                if (row > 32 && !existObj(this.wallPositions, objPos)) {   
                    row -= unit;  

                    objPos.x = row/unit
                    objPos.y = col/unit

                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit

                    let trueW = true;
                    let trueT = true;
                    let valueOfW = 0;
                    for(valueOfW of this.wallPositions){
                        if(valueOfW.x*unit == tarRow-unit & valueOfW.y*unit == tarCol){
                            trueT = false
                        }
                        if(valueOfW.x*unit == row & valueOfW.y*unit == col){
                            trueW = false;
                            row += unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                    if(trueW){
                    avatar.style.left = row + 'px'
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit

                    if(JSON.stringify(objPos) == JSON.stringify(tarPos) && trueT){                        
                        console.log('Hit');
                        tarRow -= unit
                        target.style.left = tarRow + 'px'
                    }                                      
                }                                    
            }
          }   // Up arrow key   
            else if (e.keyCode == 38) {
                if (col > 32 && !existObj(this.wallPositions, objPos)) {
                    col -= unit;

                    objPos.x = row/unit
                    objPos.y = col/unit
                    let valueOfW = 0;
                    let trueW = true;
                    let trueT= true;
                    for(valueOfW of this.wallPositions){
                        if(valueOfW.x*unit == tarRow & valueOfW.y*unit == tarCol-unit){
                            trueT = false
                        }
                        if(valueOfW.x *unit == row & valueOfW.y*unit == col){
                            trueW = false;
                            col += unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                    if(trueW){
                    avatar.style.top = col + 'px'
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit

                    if(JSON.stringify(objPos) == JSON.stringify(tarPos) & trueT){                        
                        console.log('Hit');
                        tarCol -= unit
                        target.style.top = tarCol + 'px'
                    } 
                }                          
            }
        }  // Right arrow key 
            else if (e.keyCode == 39) {
                if (row < gridWidth-32 && !existObj(this.wallPositions, objPos)) {
                    row += unit;        
                
                    objPos.x = row/unit
                    objPos.y = col/unit

                    let valueOfW = 0;
                    let trueW = true;
                    let trueT =true
                    for(valueOfW of this.wallPositions){
                        
                        if(valueOfW.x*unit == tarRow+unit & valueOfW.y*unit == tarCol){
                            trueT = false
                            console.log(trueT)
                        }
                        if(valueOfW.x*unit == row & valueOfW.y*unit == col){
                            trueW = false;
                            console.log(trueW)
                            row -= unit;
                            objPos.x = row/unit
                            return;
                        }
                    }
                    
                    if(trueW){
                    avatar.style.left = row + 'px' 
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit

                    if(existObj(this.targetPositions, objPos) && trueT){                        
                        console.log('Hit');
                        tarRow += unit
                        target2.style.left = tarRow + 'px'
                    } 
                    //If the Target & Goals positions are same, it will give One Point
                    if(JSON.stringify(tarPos) === JSON.stringify(goalPos)){
                        score ++ 
                        this.score = score; 
                        //The score in store.js file will be filled with this data
                        this.$store.state.score = this.score
                        console.log('hit') 

                    }
                }            
            }
            // Down arrow key
        }else if (e.keyCode == 40) {
                if (col < gridHeight-32 && !existObj(this.wallPositions, objPos)) {
                    col += unit;

                    objPos.x = row/unit
                    objPos.y = col/unit

                    let valueOfW = 0;
                    let trueT=true;
                    let trueW = true;
                    for(valueOfW of this.wallPositions){
                        if(valueOfW.x*unit == tarRow & valueOfW.y*unit == tarCol+unit){
                            trueT = false
                        }
                        if(valueOfW.x*unit == row & valueOfW.y*unit == col){
                            trueW = false;
                            col -= unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                    if(trueW){
                    avatar.style.top = col + 'px'
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit
                        if(JSON.stringify(objPos) == JSON.stringify(tarPos) && trueT){                        
                            console.log('Hit');
                            tarCol += unit
                            target.style.top = tarCol + 'px'
                        }
                    }
                }        
            } 
        });       
    
     }
}