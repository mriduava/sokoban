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
        let wallPositions=findPositions('W',this.grids)
        let targetPositions= findPositions('T',this.grids)
        let goalPositions= findPositions('G',this.grids)
        let objPos = findPositions('A', this.grids)[0]
        let target = document.getElementsByClassName('target')
        let avatar = document.querySelector('.avatar')
        let goal = document.querySelector('.goal')
        
        
        let score = 0;
        let unit = 32;
        //objStart
        avatar.style.left = objPos.x * unit + 'px'
        avatar.style.top = objPos.y * unit + 'px'


        let gridWidth = this.grids.length * unit
        let gridHeight = this.grids[0].length * unit

        let row = objPos.x*unit;
        let col = objPos.y*unit;

        let tarListRowCol =[]
        for(let i = 0; i<targetPositions.length; i++){
            // target[i].style.top = targetPositions[i].y * unit  + 'px'
            console.log('tar-x, ' + targetPositions[i].x +' '+targetPositions[i].y)
            
            var targets = {
                x: targetPositions[i].x,
                y: targetPositions[i].y
            }
            tarListRowCol.push(targets)
        }

        let listZeroX = [0,0,0,0]
        let listZeroY = [0,0,0,0]
         console.log(tarListRowCol)

        /**
        * To find the position of each blocks in the array
        * It takes two parameters. First one is the elemnt or object
        * which positions need tp find.
        * Second parameter is the Array where all positions will be stored.
        // */
        // const findPositions = (elementToFind, positionsArray) => {
        //     for(var x=0; x<this.grids.length; x++){
        //     var indexes = [];
        //     let row  = x;
        //         for(var y=0; y<this.grids[x].length; y++){
        //             if (this.grids[x][y] === elementToFind) {                        
        //                 let rowArr = this.grids[x];
        //                 indexes = rowArr
        //                     .map((row, i) => row === elementToFind ? i : null)
        //                     .filter(i => i !== null)
        //             }                   
        //         }
        //         for(var i=0; i<indexes.length; i++){       
        //         var objectPosition = {
        //             x: +indexes[i],                    
        //             y: +row
        //         }
        //          positionsArray.push(objectPosition);                  
        //         }       
        //     }
        // }

        // // To find Wall positions
        // findPositions('W', wallPositions);
        
        // // To find Target positions
        // findPositions('T', targetPositions);

        // // To find Goal positions
        // findPositions('G', goalPositions);

           

        // /**
        // * To find if an object exist in the array
        // * The function takes one array of objects and one comparable object
        // */
        // const existObj = (arrObj, compObj) => {
        //     let found = false;
        //     for(var i = 0; i < arrObj.length; i++) {
        //         if (arrObj[i].x == compObj.x  && arrObj[i].y == compObj.y) {
        //             found = true;
        //             break;
        //         }
        //     }
        //     return found;
        // }

        /**
        * Functions to create movable Targets
        * It creates Targert according to grid's Targets positions
        // */
        // const createTargets = () => {
        //     for(let i=0; i<tarPos.length; i++){
        //         target.insertAdjacentHTML('afterend',
        //              `<div class="target2"
        //                    style="left: ${(tarPos[i].x)*unit}px; top: ${(tarPos[i].y)*unit}px">
        //               </div>`) 
        //     }            
        // }
        // createTargets()

        /**
        * Event key listener
        * For the movement of the Avatar and Target by
        * pressing Arrow Key from Keyboard
        */

        console.log('staart', target);
        document.addEventListener('keydown', (e) => {
            // Left arrow key
            
            if (e.keyCode == 37) {
                 

                    row -= unit; 

                    let trueW = true;
                    let trueT = true;
                    let valueOfW = 0;

                    objPos.x = row/unit
                    
                    for(valueOfW of wallPositions){
                        for(let i = 0; i<targetPositions.length;i++){
                            let tarPos = targetPositions[i]
                            // listZeroX[i]-=1
                            // tarListRowCol[i].x-=1
                            // let tarRow = tarListRowCol[i].x        
                            // console.log('Hit');
                            // tarPos.x = tarRow
                            // if(JSON.stringify(tarPos)===JSON.stringify(valueOfW)){
                            //     trueW = false
                            //     return
                            // }
                        }
                        if(JSON.stringify(objPos)===JSON.stringify(valueOfW)){
                            trueW = false;
                            row += unit;
                            return
                        }
                        
                    }

                    
                    for(let i = 0; i<targetPositions.length;i++){
                        let tarPos = targetPositions[i]
                        if(JSON.stringify(tarPos)===JSON.stringify(valueOfW)){
                            trueT = false
                            return
                        }
                    }

                    if(trueW){
                        avatar.style.left = row + 'px'
                        console.log('objPos', objPos);
                        for(let i = 0; i<targetPositions.length;i++){
                            let tarPos = targetPositions[i]
                            
                            if(JSON.stringify(objPos)===JSON.stringify(tarPos)){
                                listZeroX[i]-=1
                                tarListRowCol[i].x-=1
                                let tarRow = tarListRowCol[i].x        
                                console.log('Hit');
                                tarPos.x = tarRow
                                target[i].style.left = listZeroX[i]*unit + 'px'
                                return 
                            }
                        
                    }
                }
            }
                      // Up arrow key   
            else if (e.keyCode == 38) {
                
                    col -= unit;

                    objPos.x = row/unit
                    objPos.y = col/unit

                    let valueOfW = 0;
                    let trueW = true;
                    let trueT= true;
                    let tarPos = 0;
                    for(valueOfW of wallPositions){
                        if(JSON.stringify(objPos)===JSON.stringify(tarPos)){
                            trueT = false
                        }
                        if(JSON.stringify(objPos)===JSON.stringify(valueOfW)){
                            trueW = false;
                            col += unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                        if(trueW){
                            avatar.style.top = col + 'px'
                            // objPos.x=row/unit
                            for(let i = 0; i<targetPositions.length;i++){
                                let tarPos = targetPositions[i]
                                
                           
                                if(JSON.stringify(objPos)===JSON.stringify(tarPos)){
                                    listZeroY[i]-=1
                                    tarListRowCol[i].y-=1
                                    let tarCol = tarListRowCol[i].y        
                                    console.log('Hit');
                                    tarPos.y = tarCol
                                    target[i].style.top = listZeroY[i]*unit + 'px'
                                    return 
                                }
                            
                }                          
            }
        }  // Right arrow key 
            else if (e.keyCode == 39) {
                    row += unit;        

                    let valueOfW = 0;
                    let trueW = true;
                    let trueT =true;
                    let tarPos = 0;

                    objPos.x = row/unit
                    objPos.y = col/unit

                    for(valueOfW of wallPositions){
                        
                        if(JSON.stringify(objPos)===JSON.stringify(tarPos)){
                            trueT = false
                        }
                        if(JSON.stringify(objPos)===JSON.stringify(valueOfW)){
                            trueW = false;
                            row -= unit;
                            objPos.x = row/unit
                            return;
                        }
                    }

                    for(let i = 0; i<targetPositions.length;i++){
                        
                        if(trueW){
                            avatar.style.left = row + 'px'
                            for(let i = 0; i<targetPositions.length;i++){
                                let tarPos = targetPositions[i]
                                 
                                if(JSON.stringify(objPos)===JSON.stringify(tarPos)){
                                    listZeroX[i]+=1
                                    tarListRowCol[i].x+=1
                                    let tarRow = tarListRowCol[i].x        
                                    console.log('Hit');
                                    tarPos.x = tarRow
                                    target[i].style.left = listZeroX[i]*unit + 'px'
                                    return 
                                
                            }
                        }
                    }
            }
            // Down arrow key
        }else if (e.keyCode == 40) {
               
                    col += unit;
                    objPos.x = row/unit
                    objPos.y = col/unit

                    let valueOfW = 0;
                    let trueT=true;
                    let trueW = true;
                    let tarPos = 0;
                    for(valueOfW of wallPositions){
                        if(JSON.stringify(objPos) === JSON.stringify(tarPos)){
                            trueT = false
                        }
                        if(JSON.stringify(objPos) === JSON.stringify(valueOfW)){
                            trueW = false;
                            col -= unit;
                            objPos.x = row*unit
                            objPos.y = col*unit
                            return;
                        }
                    }
                    if(trueW){
                        avatar.style.top = col + 'px'
                        // objPos.x=row/unit
                        for(let i = 0; i<targetPositions.length;i++){
                            let tarPos = targetPositions[i]

                            if(JSON.stringify(objPos)===JSON.stringify(tarPos)){
                                listZeroY[i]+=1
                                tarListRowCol[i].y+=1
                                let tarCol = tarListRowCol[i].y        
                                console.log('Hit');
                                tarPos.y = tarCol
                                target[i].style.top = listZeroY[i]*unit + 'px'
                                return 
                            }
                        
                    }
                }
            }
        });       
    
     }
}