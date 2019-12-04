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

                <div class="object" v-else-if="block === 'O'" 
                     :style="{backgroundColor: '#ddd'}">
                    <!-- {{block}} -->
                </div>  

                <!-- <div class="obj" v-if="block === 'W'" v-show="showAvatar"><i class="far fa-smile"></i></div>
                <div class="obj" v-else v-show="showAvatar ^= true"><i class="far fa-smile"></i></div> -->
            </div>
                

        </div>
        <div class="obj"><i class="far fa-smile"></i></div>
                <div class="target"></div>
                <div class="goal"></div>
     </div>`,
     data() {
         return {
            //  grids: [],
             grids: [
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
                ['W', 'W', 'G', ' ', ' ', 'W', ' ', ' ', 'W', 'W', 'W', 'W'],
                ['W', 'A', ' ', 'O', 'W', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W'],
                ['W', 'W', 'W', ' ', ' ', ' ', ' ', ' ', ' ', 'W', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', ' ', 'W'],
                ['W', 'W', 'W', ' ', 'W', 'W', ' ', 'W', 'W', ' ', ' ', 'W'],
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
            ],
            posOfW:[],
            posOfWX:[],
            posOfWY:[],
            showAvatar: false
             
         }
     },
     computed: {
        //  grids(){
        //      return this.$store.state.grids;
        //  }
     },
     methods() { 
     },
     mounted() {
        let obj = document.querySelector('.obj')
         for(let x=0; x<this.grids[0].length; x++){
             for(let y=0; y<this.grids.length; y++){
                 if (this.grids[y][x] == 'O') {
                    this.grids[y][x] = 'Hi'
                    // console.log(this.grids[x][y]);                                                 
                 }
                 if(this.grids[y][x] == 'W'){
                     let pair = {xValue:x*32, yValue:y*32}
                     this.posOfW.push(pair)
                     this.posOfWX.push(x*32)
                     this.posOfWY.push(y*32)
                    //  console.log(JSON.stringify(pair))
                 }
                 
             }              
         }


        let score = 0;
        let unit = 32;
        let gridWidth = 352;
        let gridHeight = 224;

        let row = 64;
        let col = 32;

        let tarRow = 0;
        let tarCol = 0;

        let objPos = {x: 2, y: 1}
        obj.style.left = 2*unit + 'px'
        obj.style.top = 1*unit + 'px'
        let tarPos = {x: 0, y: 0}
        let goalPos = {x: 3, y: 5}
        // let valueOfW = 0;
        // for(valueOfW of this.posOfW){
        //     console.log(valueOfW.xValue)
        // }
        // let obj = document.querySelector('.obj')

        let randNumX = Math.floor(Math.random()*6)
        let randNumY = Math.floor(Math.random()*6)

        let target = document.querySelector('.target')
        let goal = document.querySelector('.goal')

        document.addEventListener('keydown', (e) => { 
            if (e.keyCode == 37) {//left-key
                if (row > 1) {   
                    row -= unit;
                    objPos.x = row/unit
                    objPos.y = col/unit
                    let valueOfW = 0;
                    let trueW = true;
                    for(valueOfW of this.posOfW){
                        if(valueOfW.xValue == row & valueOfW.yValue == col){
                            trueW = false;
                            row += unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                    if(trueW){
                        obj.style.left = row + 'px'
                        tarPos.x = tarRow/unit
                        tarPos.y = tarCol/unit
                        if(JSON.stringify(objPos) == JSON.stringify(tarPos) && 0 < tarRow){                        
                            console.log('Hit');
                            tarRow -= unit
                            target.style.left = tarRow + 'px'
                            }
                        }
                    }
            }else if (e.keyCode == 38) { //up-key
                if (col > 1) {
                    col -= unit;
                    objPos.x = row/unit
                    objPos.y = col/unit
                    let valueOfW = 0;
                    let trueW = true;
                    for(valueOfW of this.posOfW){
                        if(valueOfW.xValue == row & valueOfW.yValue == col){
                            trueW = false;
                            col += unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                    if(trueW){
                    obj.style.top = col + 'px'
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit
                        if(JSON.stringify(objPos) == JSON.stringify(tarPos) && 0 < tarCol){                        
                            console.log('Hit');
                            tarCol -= unit
                            target.style.top = tarCol + 'px'
                        }
                    }
                }                
            }else if (e.keyCode == 39) {//right-key
                if (row < gridWidth) {
                    row += unit;        
                    objPos.x = row/unit
                    objPos.y = col/unit

                    let valueOfW = 0;
                    let trueW = true;
                    for(valueOfW of this.posOfW){
                        if(valueOfW.xValue == row & valueOfW.yValue == col){
                            trueW = false;
                            row -= unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                    
                    if(trueW){
                    obj.style.left = row + 'px' 
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit
                        if(JSON.stringify(tarPos) === JSON.stringify(goalPos)){
                            console.log('Good job!'); 
                            score ++ 
                            this.score = score; 


                            this.$store.state.score = this.score                    
                            console.log(this.score);
                        
                            // this.updateScore(score)
                                                    
                        }
                        if(JSON.stringify(objPos) == JSON.stringify(tarPos) && tarRow < gridWidth){                        
                            console.log('Hit');
                            tarRow += unit
                            target.style.left = tarRow + 'px'                        
                        } 
                    }
                }
            }else if (e.keyCode == 40) {//down-key
                if (col < gridHeight) {
                    col += unit;
                    
                    objPos.x = row/unit
                    objPos.y = col/unit

                    let valueOfW = 0;
                    let trueW = true;
                    for(valueOfW of this.posOfW){
                        if(valueOfW.xValue == row & valueOfW.yValue == col){
                            trueW = false;
                            col -= unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                    if(trueW){
                    obj.style.top = col + 'px'
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit
                        if(JSON.stringify(objPos) == JSON.stringify(tarPos)){                        
                            console.log('Hit');
                            tarCol += unit
                            target.style.top = tarCol + 'px'
                        }
                    }
                }        
            } 
        })

        target.style.left = randNumX*unit + 'px'
        target.style.top = randNumY*unit + 'px'

        tarPos.x = randNumX
        tarPos.y = randNumY

        tarRow = randNumX*unit
        tarCol = randNumY*unit

        // console.log(randNumX, randNumY);
        console.log('Target ' + JSON.stringify(tarPos));         
    
     }
}