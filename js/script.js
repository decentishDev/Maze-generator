var sizeX = 20;
var sizeY = 30;
var squareGroups = [];
var horizontalLines = [];
var verticalLines = [];
var horizontalDone = false;
var verticalDone = false;

function deleteOne(){
    var sidePicked = Math.floor(Math.random() * 2);
    if(horizontalDone){
        sidePicked = 1;
    }
    if(verticalDone){
        sidePicked = 0;
    }
    if(horizontalDone && verticalDone){
        sidePicked = 2;
    }
    if(sidePicked == 0){
        const currentIndexes = [];
        for(var x = 0; x<horizontalLines.length; x++){
            if(horizontalLines[x] == true){
                currentIndexes.push(x);
            }
        }
        var index = Math.floor(Math.random() * currentIndexes.length);
        var currentChoice = currentIndexes[index];
        var indexesLength = currentIndexes.length;
        for(var i = 0; i<indexesLength; i++){
            var thisRow = 0;
            var thisColumn = 0;
            for(var x = 0; x < sizeY; x++){
                if((currentChoice) - (sizeX*(x + 1)) < 0){
                    thisRow = x;
                    thisColumn = currentChoice - sizeX*x;
                    break;
                }
            }
            //Debug.Log(thisRow.ToString() + "  " + thisColumn.ToString() + "  " + currentChoice.ToString());
            if(squareGroups[(thisRow*sizeX) + thisColumn] == squareGroups[((thisRow+1)*sizeX) + thisColumn]){
                //Debug.Log("horizontal same");
                //Debug.Log("Horizontal before " +string.Join(" ", currentIndexes.ToArray()));
                currentIndexes.splice(currentChoice, 1);
                //Debug.Log("Horizontal after " +string.Join(" ", currentIndexes.ToArray()));
                //Debug.Log(currentIndexes.Count);
                if(currentIndexes.length == 0){
                    horizontalDone = true;
                    break;
                }else{
                    var index1 = Math.floor(Math.random() * currentIndexes.length);
                    currentChoice = currentIndexes[index1];
                }
            }else{
                //Debug.Log("horizontal different");
                //print("horizontal" + str(currentChoice) + " " + str(squareGroups[(thisRow*size) + thisColumn]) + " " + str(squareGroups[((thisRow+1)*size) + thisColumn]))
                horizontalLines[currentChoice] = false;
                const changingIndexes = [];
                for(var x = 0; x<squareGroups.length; x++){
                    if(squareGroups[x] == squareGroups[((thisRow+1)*sizeX) + thisColumn]){
                        changingIndexes.push(x);
                    }
                }
                // = squareGroups[(thisRow*size) + thisColumn]
                for(var x = 0; x<changingIndexes.length; x++){
                    squareGroups[changingIndexes[x]] = squareGroups[(thisRow*sizeX) + thisColumn];
                }
                break;
            }
        }
    }else if(sidePicked == 1){
        const currentIndexes = [];
        for(var x = 0; x<verticalLines.length; x++){
            if(verticalLines[x] == true){
                currentIndexes.push(x);
            }
        }
        var index = Math.floor(Math.random() * currentIndexes.length);
        var currentChoice = currentIndexes[index];
        var indexesLength = currentIndexes.length;
        for(var i = 0; i<indexesLength; i++){
            var thisRow = 0;
            var thisColumn = 0;
            for(var x = 0; x < sizeY; x++){
                if((currentChoice) - ((sizeX-1)*(x + 1)) < 0){
                    thisRow = x;
                    thisColumn = currentChoice - ((sizeX-1)*x);
                    break;
                }
            }
            if(squareGroups[(thisRow*sizeX) + thisColumn] == squareGroups[(thisRow*sizeX) + thisColumn + 1]){
                //Debug.Log("vertical same");
                //Debug.Log("Vertical before " + string.Join(" ", currentIndexes.ToArray()));
                currentIndexes.splice(currentChoice, 1);
                //Debug.Log("Vertical after " + string.Join(" ", currentIndexes.ToArray()));
                //Debug.Log(currentIndexes.Count);
                if(currentIndexes.length == 0){
                    verticalDone = true;
                    break;
                }else{
                    var index1 = Math.floor(Math.random() * currentIndexes.length);
                    currentChoice = currentIndexes[index1];
                }
            }else{
                //Debug.Log("vertical different");
                //print("vertical" + str(currentChoice) + " " + str(squareGroups[(thisRow*size) + thisColumn]) + " " + str(squareGroups[(thisRow*size) + thisColumn + 1]))
                verticalLines[currentChoice] = false;
                const changingIndexes = [];
                for(var x = 0; x<squareGroups.length; x++){
                    if(squareGroups[x] == squareGroups[(thisRow*sizeX) + thisColumn + 1]){
                        changingIndexes.push(x);
                    }
                }
                // = squareGroups[(thisRow*size) + thisColumn]
                for(var x = 0; x<changingIndexes.length; x++){
                    squareGroups[changingIndexes[x]] = squareGroups[(thisRow*sizeX) + thisColumn];
                }
                break;
            } 
        }
    }



    if(horizontalDone != true || verticalDone != true){
        deleteOne();
    }
    // if(timesLeft>0f){
    //     timesLeft-=1f;
    //     deleteOne();
    // }
}
const canvas = document.querySelector('#canvas');

// if (!canvas.getContext) {
//     return;
// }

const ctx = canvas.getContext('2d');
ctx.fillStyle = '#000000';

ctx.fillRect(25, 25, (sizeX - 1) * 25, 2);
ctx.fillRect(50, (sizeY*25) + 25, (sizeX - 1) * 25, 2);
ctx.fillRect(25, 25, 2, sizeY*25);
ctx.fillRect((sizeX*25) + 25, 25, 2, sizeY*25);

// for (let i = 0; i < size*size; i++) {
//     squareGroups.push(String(i)+"a");
// }
// for (let i = 0; i < size*(size-1); i++) {
//     horizontalLines.push(true);
//     verticalLines.push(true);
// }


for(var x = 0; x < sizeX*sizeY; x++){
    squareGroups.push(x.toString());
}
for(var x = 0; x < sizeX*(sizeY-1); x++){
    horizontalLines.push(true);
}
for(var x = 0; x < sizeY*(sizeX-1); x++){
    verticalLines.push(true);
}

deleteOne();

while(true){
    if(horizontalDone && verticalDone){
        for(let y = 0; y<size-1; y++){
            for(let x = 0; x<size; x++){
                if(horizontalLines[y*size + x] == true){
                    ctx.fillRect((x*25) + 25, (y*25) + 50, 25, 2);
                }
            }
        }
        for(let y = 0; y<size; y++){
            for(let x = 0; x<size-1; x++){
                if(verticalLines[y*(size-1) + x] == true){
                    ctx.fillRect((x*25) + 50, (y*25) + 25, 2, 25);
                }
            }
        }
        break;
    }
}