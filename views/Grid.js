import {store} from '../store.js'

export default {
    store,
    template: `
     <div class="grid">
         <div class="path" v-for="(blockRow, row) in grids">
            <div class="all-blocks" v-for="(block, col) in blockRow" :style="{ top: row*64 + 'px', left: col*64 + 'px'}">
                <div class="wall" v-if="block == 'W'" :style="{backgroundColor: '#F93409', backgroundColor: '#434343'}">
                     <!-- {{block}}   -->
                </div>  
                <div class="object" v-else-if="block === 'O'" :style="{backgroundColor: '#ddd'}">
                    <!-- {{block}} -->
                </div>     

            </div>
        </div>

     </div>`,
     data() {
         return {
            //  grids: [],
             grids: [
                ['W', 'W', 'W', 'W', 'W', 'W'],
                ['W', 'W', 'G', ' ', ' ', 'W'],
                ['W', 'A', ' ', 'O', 'W', 'W'],
                ['W', ' ', ' ', ' ', ' ', 'W'],
                ['W', 'W', 'W', ' ', ' ', 'W'],
                ['W', 'W', 'W', 'W', 'W', 'W']
            ],
             
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
        //  this.grids = this.$store.state.grids;
         for(let x=0; x<this.grids.length; x++){
             for(let y=0; y<this.grids.length; y++){
                 if (this.grids[y][x] == 'O') {
                    this.grids[y][x] = 'Hi'
                    // console.log(this.grids[x][y]);                                                     
                 }
             } 
             console.log(this.grids[2][1]);              
         }
     }
}