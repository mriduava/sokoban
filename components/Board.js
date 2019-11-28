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
          </div>
        </div>`,
    data() {
        return {
            blocks: []
        }
    },
    computed: {
        flatTiles(){
            return this.blocks.flat()
        }
    },
    created() {
        for(let row=0; row<13; row++){
            this.blocks[row] = []
            for(let col=0; col<13; col++){
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
        let gridWidth = 384;
        let gridHeight = 384;
        let row = 0;
        let col = 0;

        document.addEventListener('keydown', direction);
        let obj = document.querySelector('.obj')

        function direction(e) {
            if (e.keyCode == 37) {
                if (row > 0) {   
                    row -= unit;         
                    obj.style.left = row + 'px' 
                }           
            }else if (e.keyCode == 38) {
                if (col > 0) {
                    col -= unit;
                    obj.style.top = col + 'px'
                }                
            }else if (e.keyCode == 39) {
                if (row < gridWidth) {
                    row += unit;        
                    obj.style.left = row + 'px'
                }
            }else if (e.keyCode == 40) {
                if (col < gridHeight) {
                    col += unit;
                    obj.style.top = col + 'px'
                }        
            } 
        }
        
    },

}