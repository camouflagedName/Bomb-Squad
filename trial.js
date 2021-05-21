//add a reset or clear button

var counter = 0,
    a,
    b,
    clickCount = 1,
    rightClickCount = 0;
    bombClick = 0,
    bombArray = [];


/* ---hide everything except for the table--- */

function hideStuff(thisTag) {
    var hide = document.getElementsByTagName(thisTag);

    for (i = 0; i < hide.length; i++) {
    hide[i].style.display = "none";
  }
}


/* ---bomb picture generator--- */

function pictureGen(chosenX) {
    var pic = document.createElement("img");
    
    pic.setAttribute("src", "https://t4.ftcdn.net/jpg/03/08/86/01/240_F_308860103_kFlXRszeVOYD9zMLrPNG45yr25PeMBix.jpg");
    pic.setAttribute("alt", "boom");
    pic.setAttribute("width", "20");
    pic.setAttribute("height", "20");
    
    if (chosenX.innerHTML == " ") {      //have to make sure it is empty first, otherwise there will be bombs galore
        chosenX.appendChild(pic);
    }
}


/* ---button element creator and containers--- */    

    var resetButton = document.createElement("button");
        resetButton.id = "resetButton";
        resetButton.className = "button";
        resetButton.type = "button";
        resetButton.innerHTML = "Reset";



/* ---New Game button--- */

    var newGame = document.createElement("button");
        newGame.id = "newGame";
        newGame.className = "button";
        newGame.type = "button";
        newGame.innerHTML = "New Game";



/* ---main function--- */
//everything here happens after user input
function genTable() {

    rowRequest = document.getElementById("rowBox").value;
    colRequest = document.getElementById("colBox").value;
    var arrCount = new Array(rowRequest);
    
    for(iArr=0; iArr<rowRequest; iArr++){  //creates a 2D array the size of the playing board
        arrCount[iArr] = new Array(colRequest);
        for(jArr=0; jArr<colRequest; jArr++){
            arrCount[iArr][jArr] = -1;
        }
    }
    
    var gridTotal = rowRequest * colRequest;

    var i;
    var j;
    var cellCount2 = [];  //an array that will contain all of the individual numbers "1 through n" of the grid/table
    var tableArray = new Array(rowRequest); //this will eventually be two dimensions; at declaration, define the number of rows     
    
    
/* --- check to make sure all options are selected --- */

    var superEasy = document.getElementById("superEasy").checked;
    var easy = document.getElementById("easy").checked;
    var medium = document.getElementById("medium").checked;
    var hard = document.getElementById("hard").checked;
    if (superEasy == false && easy == false && medium == false && hard == false) {
        alert("Choose your difficulty level.");
        return;
    }
        if (superEasy == false && easy == false && medium == false && hard == false) {
        alert("Choose your difficulty level.");
        return;
    }
    if (document.getElementById("rowBox").value == "") {
        alert("Provide the number of rows.");
        return;
    }
    if (document.getElementById("colBox").value == "") {
        alert("Provide the number of columns.");
        return;
    }
    
    if (isNaN(document.getElementById("rowBox").value) == true){
        alert("Must provide a number in the row box.");
        return;
    }
    
        if (isNaN(document.getElementById("colBox").value) == true){
        alert("Must provide a number in the columns box.");
        return;
    }

    hideStuff("div");

/* ---difficulty selector--- */

    var constant;
    if (superEasy == true){
        constant = 0.025;
    }
    else if (easy == true) {
        constant = 0.125;
    }
    else if (medium == true) {
        constant = 0.25;
    }
    else if (hard == true) {
        constant = 0.4;
    }
      
    var totalBombs = Math.trunc(gridTotal * constant);


/* ---table element creator and containers--- */
    
    /*var columnLeft = document.createElement("div");
    columnLeft.className = "column";
    document.body.appendChild(columnLeft);*/

    var columnMid = document.createElement("div");
    columnMid.className = "column";
    columnMid.setAttribute("margin", "auto");
    document.body.appendChild(columnMid);

    var table = document.createElement("TABLE");
    table.setAttribute("id", "userTable");
    table.setAttribute("margin", "auto");

    columnMid.appendChild(table);

    /*var row = document.createElement("TR");
    row.setAttribute("id", "userTR");
    document.getElementById("userTable").appendChild(row);*/

    /*var columnRight = document.createElement("div");
    columnRight.className = "column";
    document.body.appendChild(columnRight);*/



/* ---Cell Number Generator--- */

function cellNum(cellX, cellY){ 
    return ((cellX*colRequest)+(cellY+1));
}



/* ---logic loop--- */
//loops through the immediate surrounding squares (will be used to fill in quantity of bombs)
    function neighborSquares(bombX, bombY) {
        a = 0;  //in place of i
        b = 0;  //in place of j
        
        for(a = bombX-1; a <= bombX+1; a++){
            if(a < 0) {  //checks to see if the row is outside of grid, left side
                continue;
            }
            else if((a+1) > rowRequest) {  //checks to see if row outside of grid, right side
                continue;
            }
            else {            
                for(b = bombY-1; b <= bombY+1; b++){
                    if (b < 0) {  //checks to see if outside grid boundary, top
                        continue;
                    }
                    else if (b+1 > colRequest) {  //checks to see if outside grid boundary, bottom
                        continue;
                    }
                    else {  //start checking the surrounding squares and replacing them
                        bombFind(a, b);
                    }
                }
            }
        }
    }
    
/* ---finds bombs and fills in the surrounding squares with a value--- */

    function bombFind(bx, by) {   //start checking the surrounding squares and replacing them
        var nBombVal;
        cellNumVar = cellNum(bx, by);
        nBombVal = document.getElementById(cellNumVar);

        if(tableArray[bx][by] == "B") {
            bombArray.push(cellNumVar); 
            return;
        }                    
        else if(tableArray[bx][by] == 0) {
            tableArray[bx][by] = 1;               //1;
            nBombVal.value = tableArray[bx][by];
        }
        else if(tableArray[bx][by] >= 1) {
            tableArray[bx][by] = tableArray[bx][by] + 1;
            nBombVal.value = tableArray[bx][by]
        }
    }      

/* ---bombGen - randomize bomb placement creator--- */

    function bombGen(selX, selY) {
        var rowX;
        var colY;
        var randCell; 
        var notRandCell;
        for (i = 0; i < totalBombs; i++) {
            rowX = Math.floor(Math.random() * rowRequest);
            colY = Math.floor(Math.random() * colRequest);
            randCell = document.getElementById("userTable").rows[rowX].cells[colY];
            notRandCell = document.getElementById("userTable").rows[selX].cells[selY];
            if(randCell.value != "B" && randCell != notRandCell) {                  //avoids duplicates
                randCell.value = "B";                                               //random bomb location, denoted by letter B
                tableArray[rowX][colY] = "B";
                neighborSquares(rowX, colY);
                //alert(randCell);
                //randCell.
            }
            else {i--;}                                                             //subtract 1 if there are duplicates
        }
    }


/* ---table creator--- */

    var tableAdd = document.getElementById("userTable"); //creates table called userTable, reference using tableAdd
    var cellCount = 0;
    var cellAdd;
    var thisCell;
;
    for (i = 1; i <= rowRequest; i++) {
        var newRow = tableAdd.insertRow(i-1); //inserts the number of rows entered by user
        tableArray[i-1] = new Array(colRequest);  //creates 2D array

        for (j = 1; j <= colRequest; j++) {
            if(i==1 && j==1) {
                cellAdd = newRow.insertCell(0);
            }
            
            else {
                cellAdd = newRow.insertCell(j-1);
            }

            cellCount = ((i-1)*colRequest)+j;

            cellAdd.value = 0; //initiates the value of each cell
            cellAdd.innerHTML = " ";
            cellAdd.setAttribute("id", cellCount);
            
            cellCount2[cellCount] = cellCount; //places the numbers into an array for future use
            tableArray[i-1][j-1] = "0";     //initiates each array entry as 0
            arrayX = i-1;
            arrayY = j-1;
            
            thisCell = document.getElementById(cellCount);
            thisCell.onmousedown = function(e) {
                    flag(e, this);
            };

            document.getElementById(cellCount).onmousedown = function(e) {   //inserts a click function in each cell
                if(bombClick == 0){                                     //if no bombs have been left clicked
                    if(this.innerHTML == " " || e.button == 2){             //either the cell has to be blank or right clicked
                        cellClick(e, this);
                    }
                }
            };
        }   
    }
/* --- button creation in following 2 sections--- */
    
var remT = document.getElementById("userTable");

    /* --- reset button action ---*/

    
        columnMid.appendChild(resetButton);
        var remB = document.getElementById("resetButton");
    
        remB.onclick = function(){

            remT.parentNode.removeChild(remT);
            bombClick = 0;
            bombArray.splice(0, bombArray.length);
            genTable();
            clickCount = 1;
        }
        
    /* --- New Game button action ---*/

    columnMid.appendChild(newGame);
    var newB = document.getElementById("newGame");

    newB.onclick = function(){
        newB.parentNode.removeChild(newB);
        remT.parentNode.removeChild(remT);
        columnMid.parentNode.removeChild(columnMid);
        bombClick = 0;
        bombArray.splice(0, bombArray.length);
        window.location.replace("start.html");
        clickCount = 1;
    }


/* ---Other Mouse Events--- */

window.oncontextmenu = (e) =>{ e.preventDefault(); }        //removes right click context menu



/* ---cell click (when user leftclick's a cell, the cell will change colors & display value)--- */
    function cellClick(e, chosen) {

        var cellLoc = chosen.getAttribute("id"),   //cell#   
            queue = [],
            visited = [],
            arrCount = new Array(rowRequest);

        for(iArr=0; iArr<rowRequest; iArr++){  //creates a 2D counter to match the gameboard
            arrCount[iArr] = new Array(colRequest);
            for(jArr=0; jArr<colRequest; jArr++){
                arrCount[iArr][jArr] = -1;
            }
        }

        var startX = Math.trunc((cellLoc-1) / colRequest),   //x-coord
            startY = (cellLoc - 1) - (colRequest*startX);   //y-coord
            // x tells which row    &    y tells which column   (oops!)

        if (clickCount == 1) {
            bombGen(startX, startY); //bombs are generated on the first click only
        } 
        clickCount = clickCount + 1;

        queue.push(cellLoc);

        if (e.button == 2){             //right click event will place a "check" (Google Icon) over a square
            var iconFlag = document.createElement("i");
            iconFlag.className = "material-icons";
            var iconText = document.createTextNode('check');
            iconFlag.appendChild(iconText);
            
            if (chosen.value >= 0 || chosen.value == "B") {
                if(chosen.innerHTML == " ") {
                    chosen.appendChild(iconFlag);
                }
                else {
                    chosen.innerHTML = " ";
                }
            }
        }

        else {
            //this loop will iterate through 
            while (queue.length > 0){ 

                cellLoc = queue.shift();                        //remove first from array and put it in cellLoc
                chosen = document.getElementById(cellLoc);      //use it to find the next cell
                visited.push(cellLoc);                          //add it to visited array

                var startX = Math.trunc((cellLoc-1) / colRequest),   //update the x-coord & y-coord
                    startY = (cellLoc - 1) - (colRequest*startX),   
                    left = startY-1,            
                    right = startY+1,
                    up = startX-1,
                    down = startX+1;             
        
                if(chosen.value == "B") {
                    bombClick = 1;          //board cannot be interacted with anymore
                    pictureGen(chosen);
                    chosen.style.backgroundColor = "white";
                    
                    for(let i = 0; bombArray.length > 0; i++) {             //displays all bombs
                        cellLoc = bombArray.shift();
                        chosen = document.getElementById(cellLoc);
                        pictureGen(chosen);
                        chosen.style.backgroundColor = "red";
                        }
                    //GAME OVER indicator
                }

                else if(chosen.value > 0) {  
                    chosen.style.backgroundColor = "white";
                    chosen.innerHTML = chosen.value;
                    chosen.value = -1;
                }
                
                else if(chosen.value == 0) { //reveals the current cell if it is empty and then iterates through the surrouding cells
                    chosen.style.backgroundColor = "white";
                    chosen.innerHTML = " ";
                    chosen.value = -1;              //change the value to a negative so that right click event wont create "flag"

                    //the value of the neighboring cells are added into the "queue" array to be "inspected" by the loop during future iterations
                    if (up >= 0) { 
                        cellLoc = cellNum(up, startY);              
                        queue.push(cellLoc);
                    }
                    if (down < rowRequest) {   
                        cellLoc = cellNum(down, startY);
                        queue.push(cellLoc);
                    }
                    if (left >= 0) { 
                        cellLoc = cellNum(startX, left);
                        queue.push(cellLoc);
                    }
                    if (right < colRequest) {  
                        cellLoc = cellNum(startX, right);
                        queue.push(cellLoc);
                    }    
//need to add in diagonal cells

                    /*for(let i = 0; i < queue.length; i++) {
                        console.log(sum + " " + "Entry# " + i + " in Queue: " + queue[i]);
                }
                    for(let i = 0; i < visited.length; i++) {
                        console.log(sum + " " + "Entry# " + i + " in Visited: " + visited[i]);
                }*/

                    /* removes any instance of a duplicate  */
                    for(let visitedCounter = 0; visitedCounter < visited.length; visitedCounter++){
                        if(queue.indexOf(visited[visitedCounter]) >= 0 ){
                            //console.log("Loop" + sum + ":  queue= " + queue[queue.indexOf(visited[visitedCounter])] + " visited= " + visited[visitedCounter]);
                            //console.log ("At index " + queue.indexOf(visited[visitedCounter]) + ", removed " + queue.splice(queue.indexOf(visited[visitedCounter]), 1));
                            queue.splice(queue.indexOf(visited[visitedCounter]), 1);
                        }
                    }  
                }
                //sum++;
            }
        }
    }
}      

