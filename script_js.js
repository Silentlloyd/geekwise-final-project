/**
 * This function returns the HTML for a <table>
 * that has `numCols` columns and `numRows` rows.
 */
//function createTableHTML(numCols, numRows) {
//
//    var begin  = '<table>';
//    var middle = '';
//    var end    = '</table>';
//
//    for (var r = 0; r < numRows; r++) {
//        middle += '<tr class="row">';
//
//        for (var c = 0; c < numCols; c++) {
//            middle += '<td class="cell"></td>';
//        }
//
//        middle += '</tr>';
//    }
//
//    return begin + middle + end;
//}


/**
 * This function returns a Table element
 * that has `numCols` <td/> per `numRows` <tr/>
 */
function createTableElement(numCols, numRows) {

    var table = document.createElement('table');

    for (var r = 0; r < numRows; r++) {
        var row = document.createElement('tr');
        row.classList.add('row');

        for (var c = 0; c < numCols; c++) {
            var cell = document.createElement('td');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}


/***
 * Random Object of Awesome
 */
var ROOA = {
    randomColor: function() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
};


// 1: Times Table
function timesTable(table) {

    var rows = table.getElementsByTagName('tr');
    for (var r = 0; r < rows.length; r++) {

        var cols = rows[r].getElementsByTagName('td');
        for (var c = 0; c < cols.length; c++) {
            cols[c].innerHTML = (c || 1) * (r || 1);
        }
    }
}

// 2: Number Each Cell
function numberEachCell(table) {
    var rows = table.rows,
        counter = 0;

    for (var r = 0; r < rows.length; r++)
        for (var c = 0; c < rows[r].cells.length; c++)
            rows[r].cells[c].textContent = ++counter;

}


// 3: 8-Bit Art
function artify(table) {

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML += '.clicked { background: black !important; }';
    document.head.appendChild(style);

    var rows = table.rows;
    for (var r = 0; r < rows.length; r++)
        for (var c = 0; c < rows[r].cells.length; c++)
            rows[r].cells[c].addEventListener('click', function (evt) {
                this.classList.toggle('clicked');
            });
}

// 4: 8-Bit Art (w/Color)
function artifyWithColor(table) {

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML += '.blue      { background: #0171EF !important; }';
    style.innerHTML += '.lightblue { background: #39BEFF !important; }';
    style.innerHTML += '.skin      { background: #FFE7A5 !important; }';
    style.innerHTML += '.black     { background: #000000 !important; }';
    style.innerHTML += '.white     { background: #ffffff !important; }';
    document.head.appendChild(style);

    var rows = table.rows;
    for (var r = 0; r < rows.length; r++)
        for (var c = 0; c < rows[r].cells.length; c++)
            rows[r].cells[c].addEventListener('click', function (evt) {
               if (evt.ctrlKey && evt.shiftKey)
                   this.className = 'blue';
               else if (evt.ctrlKey)
                   this.className = 'lightblue';
               else if (evt.shiftKey)
                   this.className = 'skin';
               else if (evt.detail === 2)
                   this.className = 'white';
               else
                   this.className = 'black';
            });
}


// 5: Zebra Style
function zebraStyle(table, direction) {

    direction = direction || 'horizontal';  // default to 'horizontal'
    table.style.backgroundColor = 'white';

    var bgColor;
    var rows = table.rows;
    for (var r = 0; r < rows.length; r++) {
        for (var c = 0; c < rows[r].cells.length; c++) {

            bgColor = (direction === 'horizontal' && r % 2) ||
                      (direction === 'vertical'   && c % 2);

            if (bgColor)
                rows[r].cells[c].style.backgroundColor = '#666';

        }
    }



}

// 6: Vegas Border
function vegasBorder(table) {

    var bgColor;
    var rows = table.rows;
    for (var r = 0; r < rows.length; r++) {
        for (var c = 0; c < rows[r].cells.length; c++) {
            bgColor = null;

            if (r === 0 || c === 0)
                bgColor = 'red';
            else if (r === rows.length - 1 || c === rows[r].cells.length - 1)
                bgColor = 'black';

            if (bgColor)
                rows[r].cells[c].style.backgroundColor = bgColor;

        }
    }
}

// 7: Snake (In progress)
function snake(table) {

    var self = this,
        rows = table.rows,
        numRows = rows.length,
        numCols = rows[0].cells.length,
        cells = table.getElementsByTagName('td'),
        gridSize = numRows * numCols;

    this.newPosition = function() {
        return Math.floor(Math.random() * (numRows * numCols));
    }

    this.state = {
        direction: 'right',
        length: 5,
        opposite: {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left'
        }
    };

    this.body = [self.newPosition()];

    this.move = function (direction) {
        var d, newHead, oldTail;

        if (direction === 'up' || direction === 'left')
            d = -1;
        else
            d = 1;

        if (self.body.length > self.state.length) {
            oldTail = self.body.pop();
            cells[oldTail].style.backgroundColor = 'white';
        }

        if (direction === 'up' || direction === 'down') {

            newHead = self.body[0] + numCols * d;

            if (newHead < 0)
                newHead += gridSize;
            else if (newHead >= gridSize)
                newHead -= gridSize;

        } else {
            newHead = self.body[0] + d;
            if (direction === 'left' && ((newHead % numCols) === (numCols - 1)))
                newHead += numCols;
            else if (direction === 'right' && ((newHead % numCols) === 0))
                newHead -= numCols;
        }

        self.body.unshift(newHead);

    };

    this.init = function () {
        var lock = false;
        document.addEventListener('keydown', function (evt) {

            if (lock) return;
            lock = true;

            var direction;
            switch (evt.keyCode) {
                case 40:
                    direction = 'down';
                    break;
                case 38:
                    direction = 'up';
                    break;
                case 39:
                    direction = 'right';
                    break;
                case 37:
                    direction = 'left';
                    break;
                default:
                    break;
            }

            if (self.state.opposite[self.state.direction] === direction)
                return;

            if (direction === 'up' || direction === 'down')
                if (self.state.direction === 'up' || self.state.direction === 'down')
                    if (direction !== self.state.direction)
                        self.body = self.body.reverse();

            self.state.direction = direction;

        });

        var t = setInterval(function () {
            self.move(self.state.direction);
            lock = false;
            cells[self.body[0]].style.backgroundColor = 'black';
        }, 100);
    };

    this.init();
}


// get the "grid" container <div/>
// create the "grid" <table/> element
// append the "grid" <table/> to the "grid" container <div/>
var gridContainer = document.getElementById("the-grid");
var gridTable = createTableElement(25, 15);
gridContainer.appendChild(gridTable);


/**
 * Practice Tasks
 **/

// timesTable(gridTable);
// numberEachCell(gridTable);
// artify(gridTable);
// artifyWithColor(gridTable);
// zebraStyle(gridTable);
// zebraStyle(gridTable, 'vertical');
// vegasBorder(gridTable);
// snake(gridTable);
