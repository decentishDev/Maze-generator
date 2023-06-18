var size = 20;
var squareGroups = [];
var horizontalLines = [];
var verticalLines = [];
var horizontalDone = false;
var verticalDone = false;

var horizontalIndexes = [];
var verticalIndexes = [];

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
    var randomIndex = Math.floor(Math.random() * horizontalIndexes.length);
    var currentChoice = horizontalIndexes[randomIndex];
    
    // console.log(horizontalIndexes.length);
    for(let i = 0; i < horizontalIndexes.length; i++){
      var thisRow = 0;
      var thisColumn = 0;
      for(let x = 0; x < size; x++){
        if(currentChoice - (size * ( x + 1)) < 0){
          thisRow = x;
          thisColumn = currentChoice - (size * x)
          break;
        }
      }
      if(squareGroups[(thisRow*size) + thisColumn] == squareGroups[((thisRow+1)*size) + thisColumn]){
        // console.log("gotta be true");
        var indexToRemove = horizontalIndexes.indexOf(currentChoice);
        horizontalIndexes.splice(indexToRemove, 1);
        console.log(horizontalIndexes.length);
        if(horizontalIndexes.length == 0){
          horizontalDone = true;
          break;
        }else{
          var randomIndex = Math.floor(Math.random() * horizontalIndexes.length);
          var currentChoice = horizontalIndexes[randomIndex];
        }
      }else{
        // console.log("gotta be false");
        horizontalLines[currentChoice] = false;
        var indexToRemove = horizontalIndexes.indexOf(currentChoice);
        horizontalIndexes.splice(indexToRemove, 1);
        var changingIndexes = [];
        for(let x = 0; x < squareGroups.length; x++){
          if(squareGroups[x] == squareGroups[((thisRow + 1) * size) + thisColumn]){
            changingIndexes.push(x);
          }
        }
        for(let x = 0; x < changingIndexes.length; x++){
          squareGroups[changingIndexes[x]] = squareGroups[(thisRow*size) + thisColumn]
        }
        break;
      }
    }
  }else if(sidePicked == 1){
    var randomIndex = Math.floor(Math.random() * verticalIndexes.length);
    var currentChoice = verticalIndexes[randomIndex];

    for(let i = 0; i < verticalIndexes.length; i++){
      var thisRow = 0;
      var thisColumn = 0;
      for(let x = 0; x < size; x++){
        if(currentChoice - ((size - 1) * (x + 1)) < 0){
          thisRow = x;
          thisColumn = currentChoice - ((size - 1) * x);
          break;
        }
      }
      if(squareGroups[(thisRow * size) + thisColumn] == squareGroups[(thisRow * size) + thisColumn + 1]){
        var indexToRemove = verticalIndexes.indexOf(currentChoice);
        verticalIndexes.splice(indexToRemove, 1);
        if(verticalIndexes.length == 0){
          verticalDone = true;
          break;
        }else{
          var randomIndex = Math.floor(Math.random() * verticalIndexes.length);
          var currentChoice = verticalIndexes[randomIndex];
        }
      }else{
        verticalLines[currentChoice] = false;
        var indexToRemove = verticalIndexes.indexOf(currentChoice);
        verticalIndexes.splice(indexToRemove, 1);
        var changingIndexes = [];
        for(let x = 0; x < squareGroups.length; x++){
          if(squareGroups[x] == squareGroups[(thisRow * size) + thisColumn + 1]){
            changingIndexes.push(x);
          }
        }
        for(let x = 0; x < changingIndexes.length; x++){
          squareGroups[changingIndexes[x]] = squareGroups[(thisRow * size) + thisColumn];
        }
        break;
      }
    }
  }
}

const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');
ctx.fillStyle = '#FFFFFF';

ctx.fillRect(25, 25, (size - 1) * 25, 2);
ctx.fillRect(50, (size*25) + 25, (size - 1) * 25, 2);
ctx.fillRect(25, 25, 2, size*25);
ctx.fillRect((size*25) + 25, 25, 2, size*25);


for(var x = 0; x < size*size; x++){
  squareGroups.push(x.toString());
}
for(var x = 0; x < size*(size-1); x++){
  horizontalLines.push(true);
}
for(var x = 0; x < size*(size-1); x++){
  verticalLines.push(true);
}

for(let x = 0; x < horizontalLines.length; x++){
  horizontalIndexes.push(x);
}

for(let x = 0; x < verticalLines.length; x++){
  verticalIndexes.push(x);
}

while(!horizontalDone || !verticalDone){
  deleteOne();
}


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