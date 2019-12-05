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
            <div class="avatar"><i class="far fa-smile"></i></div>
            <div class="target"></div>
            <div class="goal"></div>
     </div>`,
     data() {
         return {
             grids: [
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W', 'W'],
                ['W', 'A', ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'G', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'G', 'G', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
            ],
            wallPositions: []   
         }
     },
     mounted() {

        let avatar = document.querySelector('.avatar')
        let target = document.querySelector('.target')
        let goal = document.querySelector('.goal')
        
        let score = 0;
        let unit = 32;

        let yWidth = this.grids.length * unit
        let xWidth = this.grids[0].length * unit

        let gridWidth = xWidth;
        let gridHeight = yWidth;

        let row = 1*unit;
        let col = 1*unit;

        let tarRow = 5*unit;
        let tarCol = 3*unit;

        let objPos = {x: 1, y: 1}

        let tarPos = {x: 5, y: 3}
        let goalPos = {x: 8, y: 6}

        target.style.left = 5*unit + 'px'
        target.style.top = 3*unit + 'px'

        /**
        * To find the position of each blocks in the array
        * 
        */
        //ToDO 
        for(var x=0; x<this.grids.length; x++){
         var indexes = [];
         let row  = x;
            for(var y=0; y<this.grids[x].length; y++){
                if (this.grids[x][y] === 'W') {
                    
                    let rowArr = this.grids[x];
                    indexes = rowArr
                        .map((row, i) => row === "W" ? i : null)
                        .filter(i => i !== null)
                }                   
            }
            for(var i=0; i<indexes.length; i++){       
            var objectPosition = {
                x: +indexes[i],                    
                y: +row
            }
            this.wallPositions.push(objectPosition);                  
            }       
        }

        console.log(this.wallPositions);     

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

                    console.log(objPos); 

                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit

                    let trueW = true;
                    let trueT = true;
                    let valueOfW = 0;
                    for(valueOfW of this.wallPositions){
                        if(valueOfW.x*unit == tarRow-unit & valueOfW.y*unit == tarCol){
                            trueT = false
                            console.log(trueT)
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
                        console.log(tarRow)
                        console.log(tarRow + unit)
                        tarRow -= unit
                        target.style.left = tarRow + 'px'
                    }                                      
                } 
            // Up arrow key                          
            }
        }
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
                            console.log(trueT)
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
            // Right arrow key              
            }
        }
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

                    if(JSON.stringify(objPos) == JSON.stringify(tarPos) && trueT){                        
                        console.log('Hit');
                        tarRow += unit
                        target.style.left = tarRow + 'px'
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
            // Down arrow key
            }
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
                            console.log(trueT)
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
        }
    )

        /**
        * To give a position of the Target
        * The position is fixed now
        */
        // target.style.left = 5*unit + 'px'
        // target.style.top = 3*unit + 'px'

        // tarPos.x = 5
        // tarPos.y = 3

        // tarRow = 5*unit
        // tarCol = 3*unit

        console.log('Target ' + JSON.stringify(tarPos));         
    
     }
}