/* let strengthActive = true; */

/*
findPositions: Goes through the list this.grids and finds position of a certain element in the list.
parameters: Takes two parameters; the first os of datatype string and other is of type array.
*/
export function findPositions(findElement, grids) {
    let array = [];
    for (let i = 0; i < grids.length; i++) {
        for (let j = 0; j < grids[0].length; j++) {
            if (findElement === grids[i][j]) {
                var object = {
                    x: j,
                    y: i
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
export function checkSamePosObjectList(object, array) {
    let trueW = true;
    for (let element of array) {
        if (JSON.stringify(object) === JSON.stringify(element)) {
            trueW = false;
            break;
        }
    }
    return trueW
}
/*
Checks if element at array[index] has same value as array[j] where j!=index.
*/
export function arrayNext(array, index) {
    let nextValue = true;
    for (let j = 0; j < array.length; j++) {
        if (j != index) {
            if (JSON.stringify(array[index]) === JSON.stringify(array[j])) {
                nextValue = false;
                break;
            }
        }
    }
    return nextValue
}
/*
Send in two coordinates and an object, return true if object coordinates matches sent coordinates
*/
export function compareCoordinates(x, y, object) {
    let coordinateMatch = false;
    if (object.x == x && object.y == y) {
        coordinateMatch = true;
        console.log('coord match');
        console.log(JSON.stringify(object));
        console.log('x:' + x);
        console.log('y:' + y);

    }
    return coordinateMatch;
}
/*
moveTarget: The avatar moves the target either left,up, right or down
*/
export function moveTarget(avaPos, objectPos, wallPos, tarPos, listZero, direction, boxes, boxPosArray, strengthActive) {

    for (let i = 0; i < tarPos.length; i++) {
        if (JSON.stringify(objectPos) === JSON.stringify(tarPos[i])) {
            switch (direction) {
                case "left":
                    listZero[i] -= 1
                    if (strengthActive) {
                        for (let j = 0; j < tarPos.length; j++) { //Looks for a box to the left of the box already found (that's where the x-1 on the next row comes in) 
                            if (compareCoordinates((tarPos[i].x - 1), tarPos[i].y, tarPos[j]) && strengthActive) {
                                listZero[j] -= 1
                                tarPos[j].x -= 1
                                tarPos[i].x -= 1
                                console.log('strength & coord true');
                                if (checkSamePosObjectList(tarPos[j], wallPos) && arrayNext(tarPos, j)) { //we want neither walls nor blocks to the left of the second block
                                    /* console.log('not blocked by wall'); */

                                    tarPos[i].x = boxPosArray[i].x
                                    boxes[i].style.left = listZero[i] * 32 + 'px'

                                    tarPos[j].x = boxPosArray[j].x
                                    boxes[j].style.left = listZero[j] * 32 + 'px'
                                    break;
                                } else {
                                    listZero[j] += 1
                                    tarPos[j].x += 1
                                    tarPos[i].x += 1
                                }
                            }
                        }
                    }
                    tarPos[i].x -= 1
                    //if targetposition is the same as wall stop
                    if (checkSamePosObjectList(tarPos[i], wallPos) == false || arrayNext(tarPos, i) == false) {
                        listZero[i] += 1
                        tarPos[i].x += 1
                    }
                    //check if there is any nearby which has same position
                    else if (arrayNext(tarPos, i)) {
                        //if target position is not same as wall move 1 step
                        if (checkSamePosObjectList(tarPos[i], wallPos)) {
                            tarPos[i].x = boxPosArray[i].x
                            boxes[i].style.left = listZero[i] * 32 + 'px'
                        }
                    }
                    //if avatar position is same as target, doesn't go into target
                    if (objectPos.x == tarPos[i].x) {
                        objectPos.x = tarPos[i].x + 1
                        avaPos.style.left = objectPos.x * 32 + 'px'
                    }
                    break;
                case "up":
                    listZero[i] -= 1
                    if (strengthActive) {
                        for (let j = 0; j < tarPos.length; j++) {
                            if (compareCoordinates(tarPos[i].x, (tarPos[i].y - 1), tarPos[j]) && strengthActive) {
                                listZero[j] -= 1
                                tarPos[j].y -= 1
                                tarPos[i].y -= 1
                                console.log('strength & coord true');
                                if (checkSamePosObjectList(tarPos[j], wallPos) && arrayNext(tarPos, j)) {
                                    /* console.log('not blocked by wall'); */

                                    tarPos[i].y = boxPosArray[i].y
                                    boxes[i].style.top = listZero[i] * 32 + 'px'

                                    tarPos[j].y = boxPosArray[j].y
                                    boxes[j].style.top = listZero[j] * 32 + 'px'
                                    break;
                                } else {
                                    listZero[j] += 1
                                    tarPos[j].y += 1
                                    tarPos[i].y += 1
                                }
                            }
                        }
                    }
                    tarPos[i].y -= 1
                    //if targetposition is the same as wall stop
                    if (checkSamePosObjectList(tarPos[i], wallPos) == false || arrayNext(tarPos, i) == false) {
                        listZero[i] += 1
                        tarPos[i].y += 1
                    }
                    if (arrayNext(tarPos, i)) {
                        //if target position is not same as wall move 1 step
                        if (checkSamePosObjectList(tarPos[i], wallPos)) {
                            tarPos[i].y = boxPosArray[i].y
                            boxes[i].style.top = listZero[i] * 32 + 'px'
                        }
                    }
                    //if avatar position is same as target, doesn't go into target
                    if (objectPos.y == tarPos[i].y) {
                        objectPos.y = tarPos[i].y + 1
                        avaPos.style.top = objectPos.y * 32 + 'px'
                    }
                    break;
                case "right":
                    listZero[i] += 1
                    if (strengthActive) {
                        for (let j = 0; j < tarPos.length; j++) {
                            if (compareCoordinates((tarPos[i].x + 1), tarPos[i].y, tarPos[j]) && strengthActive) {
                                listZero[j] += 1
                                tarPos[j].x += 1
                                tarPos[i].x += 1
                                console.log('strength & coord true');
                                if (checkSamePosObjectList(tarPos[j], wallPos) && arrayNext(tarPos, j)) {
                                    /* console.log('not blocked by wall'); */

                                    tarPos[i].x = boxPosArray[i].x
                                    boxes[i].style.left = listZero[i] * 32 + 'px'

                                    tarPos[j].x = boxPosArray[j].x
                                    boxes[j].style.left = listZero[j] * 32 + 'px'
                                    break;
                                } else {
                                    listZero[j] -= 1
                                    tarPos[j].x -= 1
                                    tarPos[i].x -= 1
                                }
                            }
                        }
                    }
                    tarPos[i].x += 1
                        ;
                    if (checkSamePosObjectList(tarPos[i], wallPos) == false || arrayNext(tarPos, i) == false) {
                        listZero[i] -= 1
                        tarPos[i].x -= 1
                    }
                    //check if there is any nearby which has same position
                    if (arrayNext(tarPos, i)) {
                        //if target position is not same as wall move 1 step
                        if (checkSamePosObjectList(tarPos[i], wallPos)) {
                            tarPos[i].x = boxPosArray[i].x
                            boxes[i].style.left = listZero[i] * 32 + 'px'
                        }
                    }
                    //if avatar position is same as target, doesn't go into target
                    if (objectPos.x == tarPos[i].x) {
                        objectPos.x = tarPos[i].x - 1
                        avaPos.style.left = objectPos.x * 32 + 'px'
                    }
                    break;
                case "down": {
                    listZero[i] += 1
                    if (strengthActive) {
                        for (let j = 0; j < tarPos.length; j++) {
                            if (compareCoordinates(tarPos[i].x, (tarPos[i].y + 1), tarPos[j]) && strengthActive) {
                                listZero[j] += 1
                                tarPos[j].y += 1
                                tarPos[i].y += 1
                                console.log('strength & coord true');
                                if (checkSamePosObjectList(tarPos[j], wallPos) && arrayNext(tarPos, j)) {
                                    /* console.log('not blocked by wall'); */

                                    tarPos[i].y = boxPosArray[i].y
                                    boxes[i].style.top = listZero[i] * 32 + 'px'

                                    tarPos[j].y = boxPosArray[j].y
                                    boxes[j].style.top = listZero[j] * 32 + 'px'
                                    break;
                                } else {
                                    listZero[j] -= 1
                                    tarPos[j].y -= 1
                                    tarPos[i].y -= 1
                                }
                            }
                        }
                    }
                    tarPos[i].y += 1
                        ;
                    if (checkSamePosObjectList(tarPos[i], wallPos) == false || arrayNext(tarPos, i) == false) {
                        listZero[i] -= 1
                        tarPos[i].y -= 1
                    }

                    if (arrayNext(tarPos, i)) {
                        //if target position is not same as wall move 1 step
                        if (checkSamePosObjectList(tarPos[i], wallPos)) {
                            tarPos[i].y = boxPosArray[i].y
                            boxes[i].style.top = listZero[i] * 32 + 'px'
                        }

                    }
                    //if avatar position is same as target, doesn't go into target
                    if (objectPos.y == tarPos[i].y) {
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
export function checkArraySameElements(array1, array2) {
    let sameElement = 0;
    for (let element1 of array1) {
        for (let element2 of array2) {
            if (JSON.stringify(element1) == JSON.stringify(element2)) {
                sameElement++;
            }
        }
    }
    if (sameElement == array1.length) {
        return true
    }
}



