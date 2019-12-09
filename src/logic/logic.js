import {store} from './store.js'

/*
findPositions: Goes through the list this.grids and finds position of a certain element in the list.
parameters: Takes two parameters; the first os of datatype string and other is of type array.
*/
function findPositions(findElement, grids){
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
/*
checkSamePosObjectList: Checks that an object has the same position as any element in an array.
*/
function checkSamePosObjectList(object, array){
    let trueW = true;
    for(let element of array){
        if(JSON.stringify(object)===JSON.stringify(element)){
            trueW = false;
            break;
        }
    }
    return trueW
}
/*
Checks if element at array[index] has same value as array[j] where j!=index.
*/
function arrayNext(array, index){
    let nextValue = true;
    for(let j=0; j<array.length; j++){
        if(j != index){
            if(JSON.stringify(array[index]) === JSON.stringify(array[j])){
                nextValue = false;
                break;
            }
        }
    }
    return nextValue
}
/*
moveTarget: The avatar moves the target either left,up, right or down
*/
function moveTarget(avaPos, objectPos, wallPos, tarPos, listZero, direction){
    
    for(let i = 0; i<tarPos.length;i++){
        if(JSON.stringify(objectPos)===JSON.stringify(tarPos[i])){
            switch(direction){
                case "left":
                    listZero[i]-=1
                    tarPos[i].x-=1                        
                    //if targetposition is the same as wall stop
                    if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                        listZero[i]+=1
                        tarPos[i].x+=1
                    }                            
                    //check if there is any nearby which has same position
                    else if(arrayNext(tarPos,i)){
                        //if target position is not same as wall move 1 step
                        if(checkSamePosObjectList(tarPos[i],wallPos)){
                            tarPos[i].x = targetPositions[i].x
                            target[i].style.left = listZero[i]*32 + 'px'
                        }                                
                    }
                    //if avatar position is same as target, doesn't go into target
                    if(objectPos.x == tarPos[i].x){
                        objectPos.x = tarPos[i].x + 1
                        avaPos.style.left = objectPos.x * 32 + 'px'
                    }
                    break;
                case "up":
                    listZero[i]-=1
                    tarPos[i].y-=1   
                    //if targetposition is the same as wall stop
                    if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                        listZero[i]+=1
                        tarPos[i].y+=1
                    }
                    if(arrayNext(tarPos,i)){
                        //if target position is not same as wall move 1 step
                        if(checkSamePosObjectList(tarPos[i],wallPos)){
                            tarPos[i].y = targetPositions[i].y
                            target[i].style.top = listZero[i]*32 + 'px'
                        }                                
                    }
                    //if avatar position is same as target, doesn't go into target
                    if(objectPos.y == tarPos[i].y){
                        objectPos.y = tarPos[i].y + 1
                        avaPos.style.top = objectPos.y * 32 + 'px'
                    }
                    break;
                case "right":
                    listZero[i]+=1
                    tarPos[i].x+=1   
                        ;
                    if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                        listZero[i]-=1
                        tarPos[i].x-=1
                    }
                    //check if there is any nearby which has same position
                    if(arrayNext(tarPos,i)){
                        //if target position is not same as wall move 1 step
                        if(checkSamePosObjectList(tarPos[i],wallPos)){
                            tarPos[i].x = targetPositions[i].x
                            target[i].style.left = listZero[i]*32 + 'px'
                        }
                    }
                    //if avatar position is same as target, doesn't go into target
                    if(objectPos.x == tarPos[i].x){
                        objectPos.x = tarPos[i].x - 1
                        avaPos.style.left = objectPos.x * 32 + 'px'
                    }
                    break;
                case "down":{
                    listZero[i]+=1
                    tarPos[i].y+=1    
                        ;
                    if(checkSamePosObjectList(tarPos[i],wallPos) == false || arrayNext(tarPos,i) == false){
                        listZero[i]-=1
                        tarPos[i].y-=1
                    }
                    
                    if(arrayNext(tarPos,i)){
                        //if target position is not same as wall move 1 step
                        if(checkSamePosObjectList(tarPos[i],wallPos)){
                            tarPos[i].y = targetPositions[i].y
                            target[i].style.top = listZero[i]*32 + 'px'
                        }
                        
                    }
                    //if avatar position is same as target, doesn't go into target
                    if(objectPos.y == tarPos[i].y){
                        objectPos.y = tarPos[i].y - 1
                        avaPos.style.top = objectPos.y * 32 + 'px'
                    }
                    break;
                }
            }  
        }            
    }
}

/*Checks if all element in two arrays are the same. We want this when checking if the player has all targets on the goals.*/
function checkArraySameElements(array1, array2){
    let sameElement = 0;
    for(let element1 of array1){
        for(let element2 of array2){
            if(JSON.stringify(element1) == JSON.stringify(element2)){
                sameElement++;
            }
        }
    }
    if(sameElement == array1.length){
        return true
    }
}

//All positions of different letters in this.grids.
let wallPositions=findPositions('W',this.grids)
let targetPositions= findPositions('T',this.grids)
let goalPositions= findPositions('G',this.grids)
let objPos = findPositions('A', this.grids)[0]

//Finds all tags with the with certain tag-names.
let target = document.getElementsByClassName('target')
let avatar = document.querySelector('.avatar')

let score = 0;

//Start position of object.
avatar.style.left = objPos.x * 32 + 'px'
avatar.style.top = objPos.y * 32 + 'px'

//Values which are later used for determining the pixels for moving the targets.
let listZeroX = [0,0,0,0]
let listZeroY = [0,0,0,0]

/**
* Event key listener
* For the movement of the Avatar and Target by
* pressing Arrow Key from Keyboard
*/
document.addEventListener('keydown', (e) => {
    // Left arrow key
    switch(e.keyCode){
        case 37:      
            objPos.x -=1
            //Check if avatar has same position as any wall.
            if(checkSamePosObjectList(objPos,wallPositions)==false){
                objPos.x +=1
            }
            //moves avatar to the left
            else{
                avatar.style.left = objPos.x*32 + 'px'
                //moves target to the left
                moveTarget(avatar, objPos,wallPositions,targetPositions,listZeroX,"left")
            }
            //checks if all targets are on the goal positions
            if(checkArraySameElements(goalPositions,targetPositions)){
                console.log("You have won.")
            }
            break;
        // Up arrow key   
        case 38:
            objPos.y -=1
            if(checkSamePosObjectList(objPos,wallPositions)==false){
                objPos.y +=1
            }
            else{
                avatar.style.top = objPos.y*32 + 'px'
                moveTarget(avatar,objPos,wallPositions,targetPositions,listZeroY,"up")
            }
            if(checkArraySameElements(goalPositions,targetPositions)){
                console.log("You have won.")
            }
            break;                  
    // Right arrow key 
        case 39: 
            objPos.x +=1
            if(checkSamePosObjectList(objPos,wallPositions)==false){
                objPos.x -=1
            }
            else{
                avatar.style.left = objPos.x *32 + 'px'
                moveTarget(avatar, objPos,wallPositions,targetPositions,listZeroX,"right")
            }
            if(checkArraySameElements(goalPositions,targetPositions)){
                console.log("You have won.")
            }
            break;
    // Down arrow key
        case 40:
            objPos.y+=1
            if(checkSamePosObjectList(objPos,wallPositions)==false){
                objPos.y-=1
            }
            else{
                avatar.style.top = objPos.y*32 + 'px'
                moveTarget(avatar,objPos,wallPositions, targetPositions,listZeroY,"down")
            }
            if(checkArraySameElements(goalPositions,targetPositions)){
                console.log("You have won.")
            }
            break;
    }
});




