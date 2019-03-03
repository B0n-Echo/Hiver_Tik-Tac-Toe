/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 0;
let xPos = [];
let oPos = [];
let gameWon = false;
const winCombos = [
	["0", "0", "0", "1", "0", "2"],
	["1", "0", "1", "1", "1", "2"],
	["2", "0", "2", "1", "2", "2"],
	["0", "0", "1", "0", "2", "0"],
	["0", "1", "1", "1", "2", "1"],
	["0", "2", "1", "2", "2", "2"],
	["0", "2", "1", "1", "2", "0"],
	["0", "0", "1", "1", "2", "2"]
]


function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    renderMainGrid();
    addClickHandlers();
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        // console.log(grid[colIdx][rowIdx]);
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
    checkWinner();
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");

    
    let newValue = 0;
    turn += 1;
    
    if(turn % 2 == 0) {
        newValue = 1;
        xPos.push([colIdx, rowIdx]);
    } else{
        newValue = 2;
        oPos.push([colIdx, rowIdx]);
    }

    grid[colIdx][rowIdx] = newValue;


    renderMainGrid();
    addClickHandlers();
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function checkWinner() {

    if(turn % 2 == 0) {
        
        var xPlays = xPos.reduce((a, e, i) =>(xPos.length != 0) ? a.concat(e) : a, []);
          
        for (let [index, win] of winCombos.entries()) {
            if (win.every(elem => xPlays.indexOf(elem) > -1) && win.length === xPlays.length) {
                gameWon = true;
                break;
            }
        }
        if(gameWon === true) {
            setTimeout(function(){ alert("X won the Game"); }, 200);
            
      }
      } else {
        var oPlays = oPos.reduce((a, e, i) =>(oPos.length != 0) ? a.concat(e) : a, []);

        for (let [index, win] of winCombos.entries()) {
            if (win.every(elem => oPlays.indexOf(elem) > -1) && win.length === oPlays.length) {
                gameWon = true;
                break;
            }
        }
        if(gameWon === true) {
            setTimeout(function(){ alert("O won the Game"); }, 200);
        }
      }
      
}

document.querySelector('.refreshButton').addEventListener('click', onRefreshClick);

function onRefreshClick() {
    
    turn = 0;
    gameWon = false;
    grid.length = 0;
    xPos.length = 0;
    oPos.length = 0;
    initializeGrid();
}

initializeGrid();
