var size = 5;
var squareGroups = [];
var horizontalLines = [];
var verticalLines = [];
var horizontalDone = false;
var verticalDone = false;

function drawRectangles() {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';

    ctx.fillRect(25, 25, (size - 1) * 25, 2);
    ctx.fillRect(50, (size*25) + 25, (size - 1) * 25, 2);
    ctx.fillRect(25, 25, 2, size*25);
    ctx.fillRect((size*25) + 25, 25, 2, size*25);

    for (let i = 0; i < size*size; i++) {
        squareGroups.push(String(i)+"a");
    }
    for (let i = 0; i < size*(size-1); i++) {
        horizontalLines.push(true);
        verticalLines.push(true);
    }
    var completelyDone = false;
    while(!completelyDone){
        while(!horizontalDone || !verticalDone){
            deleteOne();
        }
        var done = true;
        for(let i = 0; i<squareGroups.length; i++){
            if(squareGroups[i] != "0a"){
                done = false;
                break
            }
        }
        if(done){
            completelyDone = true;
        }else{
            horizontalDone = false;
            verticalDone = false;
        }
    }
    

    console.log(squareGroups);

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
}

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
        console.log(squareGroups);
    }
    if(sidePicked == 0){
        var currentIndexes = [];
        for (let i = 0; i < horizontalLines.length; i++){
            if(horizontalLines[i]){
                currentIndexes.push(i);
            }
        }
        var currentChoice = currentIndexes[Math.floor(Math.random() * currentIndexes.length)];
        for(let i = 0; i < currentIndexes.length; i++){
            var thisRow = 0;
            var thisColumn = 0;
            for(let x = 0; x < size; x++){
                if((currentChoice) - (size*(x + 1)) < 0){
                    thisRow = x;
                    thisColumn = currentChoice - size*x;
                    break;
                }
            }
            if(squareGroups[(thisRow*size) + thisColumn] == squareGroups[((thisRow+1)*size) + thisColumn]){
                //let arrayLength = currentIndexes.length
                let index = currentIndexes.indexOf(currentChoice);
                let testsidk = currentIndexes.splice(index-1);
                //console.log(String(currentIndexes.length) + " " + String(arrayLength));
                if(currentIndexes.length == 0){
                    horizontalDone = true;
                    break;
                }else{
                    currentChoice = currentIndexes[Math.floor(Math.random() * currentIndexes.length)];
                }
            }else{
                //onsole.log("horizontal" + String(currentChoice) + " " + String((thisRow*size) + thisColumn) + " " + String(((thisRow+1)*size) + thisColumn));
                horizontalLines[currentChoice] = false;
                var changingIndexes = [];
                for(let x = 0; x<squareGroups.length; x++){
                    if(squareGroups[x] == squareGroups[((thisRow+1)*size) + thisColumn]){
                        changingIndexes.push(x);
                    }
                }
                for(let x = 0; x<changingIndexes.length; x++){
                    squareGroups[changingIndexes[x]] = squareGroups[(thisRow*size) + thisColumn];
                }
                break;
            }
        }
    }else if(sidePicked == 1){
        var currentIndexes = [];
        for (let i = 0; i < verticalLines.length; i++){
            if(verticalLines[i]){
                currentIndexes.push(i);
            }
        }
        var currentChoice = currentIndexes[Math.floor(Math.random() * currentIndexes.length)];
        for(let i = 0; i < currentIndexes.length; i++){
            var thisRow = 0;
            var thisColumn = 0;
            for(let x = 0; x < size; x++){
                if((currentChoice) - ((size-1)*(x + 1)) < 0){
                    thisRow = x;
                    thisColumn = currentChoice - ((size-1)*x);
                    break;
                }
            }
            if(squareGroups[(thisRow*size) + thisColumn] == squareGroups[(thisRow*size) + thisColumn + 1]){
                //console.log(currentIndexes);
                let index = currentIndexes.indexOf(currentChoice);
                let textidk = currentIndexes.splice(index);
                //console.log(currentIndexes);
                if(currentIndexes.length == 0){
                    verticalDone = true;
                    break;
                }else{
                    currentChoice = currentIndexes[Math.floor(Math.random() * currentIndexes.length)];
                }
            }else{
                //console.log("vertical" + String(currentChoice) + " " + String((thisRow*size) + thisColumn) + " " + String((thisRow*size) + thisColumn + 1));
                verticalLines[currentChoice] = false;
                var changingIndexes = [];
                for(let x = 0; x<squareGroups.length; x++){
                    if(squareGroups[x] == squareGroups[(thisRow*size) + thisColumn + 1]){
                        changingIndexes.push(x);
                    }
                }
                for(let x = 0; x<changingIndexes.length; x++){
                    squareGroups[changingIndexes[x]] = squareGroups[(thisRow*size) + thisColumn];
                }
                break;
            }
        }
    }
}

drawRectangles();