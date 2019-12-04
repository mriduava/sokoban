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
                     {{block}}  
                </div>              

                <div class="object" v-else-if="block === 'O'" 
                     :style="{backgroundColor: '#ddd'}">
                    <!-- {{block}} -->
                </div> 

                <div class="av" v-else-if="block === 'A'" 
                     :style="{backgroundColor: '#ddd'}">
                    <!-- {{block}} -->
                    <!-- <div class="avatar"><i class="far fa-smile"></i></div> -->
                </div> 

                <div class="object" v-else-if="block === 'G'" 
                     :style="{backgroundColor: '#999fff'}">
                    <!-- {{block}} -->
                </div>

                <!-- {{block}} -->
            </div>

              
                

        </div>
            <div class="avatar"><i class="far fa-smile"></i></div>
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
                ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']
            ],
            goalPositions: []
             
         }
     },
     created() {

     },
     computed: {
        //  grids(){
        //      return this.$store.state.grids;
        //  }

        
     },
     methods() {
         
         
     },
     mounted() {
        this.grids = this.$store.state.grids;

        for(let x=0; x<this.grids.length; x++){
            for(let y=0; y<this.grids[x].length; y++){
                if (this.grids[x][y] === 'G') {

                    var indexs = [];
                    this.grids[x].filter(function(elem, index, array){
                        if(elem == 'G') {
                            indexs.push(index);
                        }
                    });

                    let rowId = ''
                    for(let i=0; i<indexs.length; i++){
                        rowId += indexs[i]
                    }

                    let objectPosition = {
                        x: +rowId,                    
                        y: x
                    }
                    this.goalPositions.push(objectPosition)
                }
            }            
        }

        console.log(this.goalPositions);        

        let avatar = document.querySelector('.avatar')  

        let score = 0;
        let unit = 32;
        let gridWidth = 352;
        let gridHeight = 224;

        let row = 0;
        let col = 0;

        let tarRow = 0;
        let tarCol = 0;

        let objPos = {x: 0, y: 0}

        let tarPos = {x: 0, y: 0}
        let goalPos = {x: 3, y: 5}

         
        // let obj = document.querySelector('.obj')

        let randNumX = Math.floor(Math.random()*6)
        let randNumY = Math.floor(Math.random()*6)

        let target = document.querySelector('.target')
        let goal = document.querySelector('.goal')

        document.addEventListener('keydown', (e) => {
            if (e.keyCode == 37) {
                if (row > 0) {   
                    row -= unit;  

                    // avatar.style.left = row + 'px'
                    $('.avatar').css('left', row + 'px')

                    objPos.x = row/unit
                    objPos.y = col/unit

                    console.log(objPos); 

                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit

                    if(JSON.stringify(objPos) == JSON.stringify(tarPos)){                        
                        console.log('Hit');
                        tarRow -= unit
                        target.style.left = tarRow + 'px'
                    }                                       
                }                            
            }else if (e.keyCode == 38) {
                if (col > 1) {
                    col -= unit;
                    avatar.style.top = col + 'px'

                    objPos.x = row/unit
                    objPos.y = col/unit

                    console.log(objPos); 
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit

                    if(JSON.stringify(objPos) == JSON.stringify(tarPos)){                        
                        console.log('Hit');
                        tarCol -= unit
                        target.style.top = tarCol + 'px'
                    } 
                }                
            }else if (e.keyCode == 39) {
                if (row < gridWidth) {
                    row += unit;        
                    avatar.style.left = row + 'px'

                    objPos.x = row/unit
                    objPos.y = col/unit
 
                    console.log(objPos); 
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
                    if(JSON.stringify(objPos) == JSON.stringify(tarPos)){                        
                        console.log('Hit');
                        tarRow += unit
                        target.style.left = tarRow + 'px'                        
                    } 
                }
            }else if (e.keyCode == 40) {
                if (col < gridHeight) {
                    col += unit;
                    avatar.style.top = col + 'px'

                    objPos.x = row/unit
                    objPos.y = col/unit
  
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit
                    if(JSON.stringify(objPos) == JSON.stringify(tarPos)){                        
                        console.log('Hit');
                        tarCol += unit
                        target.style.top = tarCol + 'px'
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