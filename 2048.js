var colorsArray = {
	2:'linear-gradient(to right, #EE82EE, #FFEEFF, #EE82EE)',
	4:'linear-gradient(to top, #DDA0DD, #FFEEFF, #DDA0DD)',
	8:'linear-gradient(to right, #DA70D6, #FFEEFF, #DA70D6',
	16:'linear-gradient(to top, #BA55D3, #FFEEFF, #BA55D3',
	32:'linear-gradient(to right, #9932CC, #FFEEFF, #9932CC',
	64:'linear-gradient(to top left, #9400D3, #FFEEFF, #9400D3',
	128:'linear-gradient(to  bottom right, #8A2BE2, #FFEEFF, #8A2BE2',
	256:'linear-gradient(to right, #A020F0, #FFEEFF, #A020F0',
	512:'linear-gradient(to bottom left, #9370DB, #FFEEFF, #9370DB',
	1024:'linear-gradient(to right, #D02090, #FFEEFF, #D02090',
	2048:'linear-gradient(to top, #C71585, #FFEEFF, #C71585',
	0:'#FFFFFF'
};
var allCells = document.getElementsByClassName('cell')
//возвращает массив пустых ячеек поля
function emptyCell (array){
	var emptyCellArray = [];
	for (var i = 0; i < array.length; i++){
		if (array[i].innerHTML == ''){
			emptyCellArray.push(array[i]);
		}
	}
	return emptyCellArray;
}
//вставляет число 2 или 4 в случайную пустую ячейку
function insertRandNumber(){
	var array = emptyCell(document.getElementsByClassName('cell'));
		isBeginNewGame(isLoose());
		array[randomCell(array.length)].innerHTML = randomNumber();
}
//возвращает число 2 или 4 для вставки (рандом)
function randomNumber(){
	return (Math.random() < 0.7) ? 2 : 4;
}
//возвращает номер ячейки для записи числа (рандом)
function randomCell(number){
	return Math.floor(Math.random() * number)
}
// проверка проигрыша
function isLoose (isExistMove){
	var array = emptyCell(document.getElementsByClassName('cell'));
	if (array.length == 0 && isExistMove){
		return 'loose';
	}
	return false;
}
//проверка победы
function isWin (){
	var array = document.getElementsByClassName('cell');
	for (var i = 0; i < array.length; i++){
		if (array[i].innerHTML == 2048){
			return 'win';
		}
	}
	return false;
}
//предложение пользователю после игры
function isBeginNewGame(reason){
	switch (reason){
		case 'loose': 
			if (confirm('К сожалению, Вы проиграли. Начнем новую игру?')){
				newGame();
			} else {
				alert('Для начала новой игры нажмите кнопку "New game"');
			};
			break;
		case 'win':
			if (confirm('Вы выиграли! Начнем новую игру?')){
				newGame();
			} else {
				alert('Для начала новой игры нажмите кнопку "New game"');	
			};
			break;
	}
}
//начало новой игры
function newGame(){
	for (var i = 0; i < allCells.length; i++){
		allCells[i].innerHTML = '';
	}
	insertRandNumber();
	changeColors(colorsArray, allCells);
}

function moveNumbers(direction){
	var isExistMove = true;
	var isMove = 0;
	var dimension = document.getElementsByClassName('row').length;
	switch (direction){
		case 'left':
			for (var i = 0; i < dimension; i++){
				var cells = document.querySelectorAll('DIV[data-row="' + (i + 1) + '"]');
				isMove = moveNotEmptyArrayElementsBegin(cells, isMove); 
				isMove = sumArrayElementsBegin(cells, isMove);
			}
			break;
		case 'right':
			for (var i = 0; i < dimension; i++){
				var cellsReverse = document.querySelectorAll('DIV[data-row="' + (i + 1) + '"]');
				var cells = [];
				for (var j = cellsReverse.length - 1; j >= 0; j--){
					cells.push(cellsReverse[j]);
				}
				isMove = moveNotEmptyArrayElementsBegin(cells, isMove); 
				isMove = sumArrayElementsBegin(cells, isMove);
			}
			break;
		case 'up':
			for (var i = 0; i < dimension; i++){
				var cells = document.querySelectorAll('DIV[data-column="' + (i + 1) + '"]');
				isMove = moveNotEmptyArrayElementsBegin(cells, isMove); 
				isMove = sumArrayElementsBegin(cells, isMove);
			}
			break;
		case 'down':
			for (var i = 0; i < dimension; i++){
				var cellsReverse = document.querySelectorAll('DIV[data-column="' + (i + 1) + '"]');
				var cells = [];
				for (var j = cellsReverse.length - 1; j >= 0; j--){
					cells.push(cellsReverse[j]);
				}
				isMove = moveNotEmptyArrayElementsBegin(cells, isMove); 
				isMove = sumArrayElementsBegin(cells, isMove);
			}
			break;
	};
	if (isMove > 0){
		insertRandNumber();
	}
	changeColors(colorsArray, allCells);
	if (emptyCell(allCells).length == 0){
		if (!checkMove(dimension)){
			isBeginNewGame('loose');
		}
	}
	var win = isBeginNewGame(isWin());
}
//сдвиг элементов массива на один шаг в начало, начиная с позиции number
function moveArrayElementsBegin(array, number){
	for (var i = number; i < array.length - 1; i++){
		array[i].innerHTML = array[i+1].innerHTML;
	}
	array[array.length - 1].innerHTML = '';
}
//проверка на массив с пустыми ячейками
function isArrayEmpty(array, number){
	for (var i = number; i < array.length; i++){
		if (array[i].innerHTML != ''){
			return false;
		}
	}
	return true;
}
//сдвиг непустых элементов массива в начало
function moveNotEmptyArrayElementsBegin(array, isMove){
	for (var i = 0; i < array.length; i++){
		if (isArrayEmpty(array, i)){
			return isMove;
		}
		if (array[i].innerHTML == ''){
			moveArrayElementsBegin(array, i);
			i--;
			isMove++;
		}
	}
	return isMove;
}
//сложение одинаковых элементов и сдвиг в начало
function sumArrayElementsBegin(array,isMove){
	for (var i = 0; i < array.length - 1; i++){
			if (isArrayEmpty(array, i)){
				return isMove;
			}
			if (array[i].innerHTML == array[i + 1].innerHTML && array[i].innerHTML != ''){
				array[i].innerHTML = +array[i].innerHTML + +array[i + 1].innerHTML;
				moveArrayElementsBegin(array, i + 1);
				isMove++;
			}
	}
	return isMove;
}
//проверка возможности хода
function checkMove(dimension){
	for (var i = 0; i < dimension; i++){
		var cellsRow = document.querySelectorAll('DIV[data-row="' + (i + 1) + '"]');
		var cellsColumn = document.querySelectorAll('DIV[data-column="' + (i + 1) + '"]');
		for (var j = 0; j < dimension - 1; j++){
			if ((cellsRow[j].innerHTML == cellsRow[j + 1].innerHTML) || (cellsColumn[j].innerHTML == cellsColumn[j + 1].innerHTML)){
				return true;
			}
		}	
	}
	return false;
}
//замена цвета у ячеек
function changeColors(colors, cells){
	for (var i = 0; i < cells.length; i++){
		cells[i].style.background = colors[cells[i].innerHTML];
		if (cells[i].innerHTML == ''){
			cells[i].style.background = colors[0];
		}
	}
}

window.addEventListener('keydown', function(event){
	event = event || window.event;
	if ((event.keyCode == 39) || (event.keyCode == "D".charCodeAt(0))){
		moveNumbers('right')
	};
	if ((event.keyCode == 37) || (event.keyCode == "A".charCodeAt(0))){
		moveNumbers('left')
	};
	if ((event.keyCode == 38) || (event.keyCode == "W".charCodeAt(0))){
		moveNumbers('up')
	};
	if ((event.keyCode == 40) || (event.keyCode == "S".charCodeAt(0))){
		moveNumbers('down')
	};
	event.preventDefault();
});

newGame();
