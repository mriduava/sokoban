import Block from './Block.js'

export default{
    components: {
        Block
    },
    template: `
        <div id="grid">
          <div class="grid-block">
            <Block class="block"
              v-for="(block, i) of flatTiles"
              v-bind:position="block"
              v-bind:key="'block' + i + block.x + block.y"
            />      
            <div class="obj"></div>
            <div class="target"></div>
          </div>
        </div>`,
    data() {
        return {
            blocks: [],
            object: []
        }
    },
    computed: {
        flatTiles(){
            return this.blocks.flat()
        }
    },
    created() {
        for(let row=0; row<10; row++){
            this.blocks[row] = []
            for(let col=0; col<10; col++){
                let position = {
                    x: col,
                    y: row
                }
                this.blocks[row].push(position)
            }
        }
    },
    mounted() {
        let unit = 32;
        let gridWidth = 288;
        let gridHeight = 288;
        let row = 0;
        let col = 0;

        let tarRow = 0;
        let tarCol = 0;

        let objPos = {
            x: 0,
            y: 0
        }

        let tarPos = {
            x: 0,
            y: 0
        }

        document.addEventListener('keydown', direction);
        let obj = document.querySelector('.obj')
        let randNumX = Math.floor(Math.random()*6)
        let randNumY = Math.floor(Math.random()*6)

        let target = document.querySelector('.target')

        function direction(e) {
            if (e.keyCode == 37) {
                if (row > 0) {   
                    row -= unit;         
                    obj.style.left = row + 'px'
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
                if (col > 0) {
                    col -= unit;
                    obj.style.top = col + 'px'
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
                    obj.style.left = row + 'px'
                    objPos.x = row/unit
                    objPos.y = col/unit
 
                    console.log(objPos); 
                    tarPos.x = tarRow/unit
                    tarPos.y = tarCol/unit
                    if(JSON.stringify(objPos) == JSON.stringify(tarPos)){                        
                        console.log('Hit');
                        tarRow += unit
                        target.style.left = tarRow + 'px'
                    } 
                }
            }else if (e.keyCode == 40) {
                if (col < gridHeight) {
                    col += unit;
                    obj.style.top = col + 'px'
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
        }

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