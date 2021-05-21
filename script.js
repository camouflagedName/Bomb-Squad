//add a reset or clear button

var counter = 0;
var a;
var b;
var clickCount = 1;


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
    resetButton.type = "button";
    resetButton.innerHTML = "Reset";


/* ---main function--- */
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
    /*if (rowRequest == "undefined" && colRequest == "undefined"){
        rowRequest = userRows;
        colRequest = userCols;
    }*/
    
    var gridTotal = rowRequest * colRequest;

    var i;
    var j;
    var counter2 = 0;
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
   
    /*if (superEasy == false && easy == false && medium == false && hard == false) {
        constant = userLevel;
        return;
    }*/
    
    var totalBombs = Math.trunc(gridTotal * constant);


/* ---table element creator and containers--- */

    var table = document.createElement("TABLE");
    table.setAttribute("id", "userTable");
    document.body.appendChild(table);

    var row = document.createElement("TR");
    row.setAttribute("id", "userTR");
    document.getElementById("userTable").appendChild(row);
    

/* ---logic loop--- */
//loops through the immediate surrounding squares

    function neighborSquares(bombX, bombY) {
        var cellNum = 0;
        var neighborVal = 0;
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
    
/* ---finds bombs and fills in the surrounding squares--- */


    function bombFind(bx, by) {   //start checking the surrounding squares and replacing them
        var nBombVal;
        cellNum = ((bx*colRequest)+(by+1));
        nBombVal = document.getElementById(cellNum);
        
        if(tableArray[bx][by] == "B") {
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

/* ---finds and detonates empty squares--- */

   
   
   
   
   

/* ---bombGen - randomize bomb placement creator--- */

    function bombGen(selX, selY) {
        var rowX;
        var colY;
        var randCell; 
        var notRandCell
        for (i = 0; i < totalBombs; i++) {
            rowX = Math.floor(Math.random() * rowRequest);
            colY = Math.floor(Math.random() * colRequest);
            randCell = document.getElementById("userTable").rows[rowX].cells[colY];
            notRandCell = document.getElementById("userTable").rows[selX].cells[selY];
            if(randCell.value != "B" && randCell != notRandCell) { //avoids duplicates
                randCell.value = "B"; //random bomb location, denoted by letter B
                tableArray[rowX][colY] = "B";
                neighborSquares(rowX, colY);
            }
            else {i--;} //subtract 1 if there are duplicates
        }
    }


/* ---table creator--- */

    var tableAdd = document.getElementById("userTable"); //creates table called userTable, reference using tableAdd
    var cellCount = 0;
    var cellAdd;
    var arrayX;
    var arrayY
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
            
            document.getElementById(cellCount).onclick = function() {   //inserts a click function in each cell
                cellClick(this);
            }; 
        }   
    }
/* ---after creating table, bombs are created and randomly placed--- */

     //bombGen();

/* --- reset button action ---*/

    document.body.appendChild(resetButton);
    
    var remB = document.getElementById("resetButton");
    var remT = document.getElementById("userTable");
    
    remB.onclick = function(){
        remB.parentNode.removeChild(remB);
        remT.parentNode.removeChild(remT);
        genTable();
        document.body.appendChild(resetButton);
        clickCount = 1;
    }
    
    
/* ---cell click (when user leftclick's a cell, the cell will change colors & display value)--- */

function cellClick(chosen) {
var tableCount = chosen.getAttribute("id"),   //cell#
    clickX = Math.trunc((tableCount-1) / colRequest),   //x-coord
    clickY = (tableCount - 1) - (colRequest*clickX),   //y-coord
    tableHide;
    
    if (clickCount == 1) {bombGen(clickX, clickY);} //bombs are generated on the first click only
    clickCount = 1+clickCount;    



        if(chosen.value == "B") {
            pictureGen(chosen);
            chosen.style.backgroundColor = "white";
            tableHide = document.getElementById("userTable");
            //tableHide[1].style.display = "none";
            //GAME OVER
        }
        else if(chosen.value > 0) {  
            chosen.style.backgroundColor = "white";
            chosen.innerHTML = chosen.value;
        }
        
        else if(chosen.value == 0) { //this will set off any other blocks that are 0
            //alert("x = " + clickX + "   " + "y = " + clickY + "  " + " #of rows = " + rowRequest + " cell# " + tableCount);
                //neighborSquares(clickX, clickY, 1);
                chosen.style.backgroundColor = "white";
                chosen.innerHTML = " ";
                searchTable(chosen, clickX, clickY);
        }

// x tells which row    &    y tells which column   (oops!)
    }
    function searchTable(startVal, startX, startY){


        let currentVal;
        var queue = [];
        
        var arrCount = new Array(rowRequest);
        for(iArr=0; iArr<rowRequest; iArr++){  //creates a 2D counter to match the gameboard
            arrCount[iArr] = new Array(colRequest);
            for(jArr=0; jArr<colRequest; jArr++){
                arrCount[iArr][jArr] = -1;
                //console.log("x= " + iArr + ", y= " + jArr + "|| value is " + arrCount[iArr][jArr]);
            }
        }

        var left = startY-1,            //this will keep the integrity of the original x and y-coordinates
            right = startY+1,
            up = startX-1,
            down = startX+1,
            vertical = startX,
            horizontal = startY,
            
            findCell = {    //this can be used to get surrounding row/col of selected cell
                        currentCell: tableArray[startX][startY],
                        leftCell: (left >= 0) ? tableArray[startX][left] : "B",
                        rightCell: (right <= colRequest) ? tableArray[startX][right] : "B",
                        aboveCell: (up >= 0) ? tableArray[up][startY] : "B",
                        belowCell: (down < rowRequest) ? tableArray[down][startY] : "B",
                    };
            //console.log("This is move# " + sCount + " at (" + startX + ", " + startY + "). Type: " + findCell.currentCell + " ; Counter: " + arrCount[startX][startY]);  
            queue.push(findCell.currentCell);  //the value of the current cell added to the array
            
boardArray(startX, startY);




//clear cell's location
        function clearCell(vert, horiz, choice) {  
            let cN = cellNum(vert, horiz);
            let clearDocID = cN.thisC;
            //let thisC = document.getElementById(cN);
            clearDocID.style.backgroundColor = "white";
            if (choice == 0){
                clearDocID.innerHTML = " ";
            }
            else{
                clearDocID.innerHTML = clearDocID.value;
            }
        }
//this function uses array coordinates to identify the current cell
        function cellNum(thisX, thisY) {
            let thisLocation;
            cellLoc = thisX*colRequest + (thisY+1);
            let thisC = document.getElementById(cellLoc);
            return {
                thisC,
                cellLoc
            }
        }
        
        
        function boardArray(xCoord, yCoord){ 
            
            var vertCh,
            horizCh,
            totalCount = 0,
            savedCount = 0;

            for(var fCount=0; queue.length>=1; fCount++){

                var addCount = 0;
                queue.shift();
                for(vertCh = fCount; vertCh >= (-1*fCount); vertCh--){          //this will loop through the x (up/down) coordinates
		            for(horizCh = fCount; horizCh >= (-1*fCount); horizCh-- ){
		                
		                if (Math.abs(vertCh)+Math.abs(horizCh) == fCount) {
                            
                            let bArrayX = xCoord + vertCh;          //original coord + increase
                            let bArrayY = yCoord + horizCh;
                            if (bArrayX >= 0 && bArrayX < rowRequest && bArrayY >= 0 && bArrayY < colRequest){  //within gameboard boundaries
                                if(tableArray[bArrayX][bArrayY] == 0) { 
                                    //alert(vertCh + "  " + horizCh + "  " + tableArray[bArrayX][bArrayY]);                                    

                                    
                                    if(fCount == 0){
                                        arrCount[xCoord][yCoord] = 0;
                                        //clearCell(bArrayX, bArrayY, tableArray[bArrayX][bArrayY]);
                                        addCount++;
                                    }
                                    else {
                                        if(bArrayX < (rowRequest-1)){
                                            if(arrCount[(bArrayX+1)][bArrayY]==0){
                                                clearCell(bArrayX, bArrayY, tableArray[bArrayX][bArrayY]);
                                                arrCount[bArrayX][bArrayY] = 0;
                                                addCount++;    
                                            }
                                        }
                                        if(bArrayX > 0){
                                            if(arrCount[(bArrayX-1)][bArrayY]==0){
                                                clearCell(bArrayX, bArrayY, tableArray[bArrayX][bArrayY]);
                                                arrCount[bArrayX][bArrayY] = 0;
                                                addCount++;    
                                            }
                                        }
                                        if(bArrayY < (colRequest-1)){
                                            if(arrCount[(bArrayX)][(bArrayY+1)]==0){
                                                clearCell(bArrayX, bArrayY, tableArray[bArrayX][bArrayY]);
                                                arrCount[bArrayX][bArrayY] = 0;
                                                addCount++;    
                                            }
                                        }
                                        if(bArrayY > 0){
                                            if(arrCount[(bArrayX)][(bArrayY-1)]==0){
                                                clearCell(bArrayX, bArrayY, tableArray[bArrayX][bArrayY]);
                                                arrCount[bArrayX][bArrayY] = 0;
                                                addCount++;    
                                            }
                                        }
                                    }
		                            totalCount = savedCount+addCount;
                                }
		                        //else  --> if it is not empty, remove something from the loop
                            }
		                }
		            }
	            }  
	            if (addCount > 0){  //basically, if at least one square was found to be empty, continue looping
	                //alert("hello");
	                queue.push(fCount);
	                savedCount = totalCount;
	            }
	            else{
	                return;
	            }
	            //console.log(queue + "  " + addCount);
            }
        }
    }
}