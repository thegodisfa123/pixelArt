const getEle = (id) => {
    return document.getElementById(id)
}

let table = document.querySelector('.drawingTable')
let lose = document.querySelector('.lose')
let totalLose = 0
let totalWin = 0
let colorTable = getEle('colorTable')
let chosingColor = getEle('chosingColor')
let totalBomb = getEle('totalBomb')
let totalBombNextToPixel = 0
size = 10




function getRow(size, boardGame) {
    for (let i = 0; i < size; i++) {
        const row = []
        getColumn(size, row, i)
    }
    return boardGame.push(row)
}

function createColumn(i,j) {
    const column = document.createElement('div')
    column.dataset.status = 'hidden'
    column.dataset.line = i;
    column.dataset.column = j;
    return column
}
function createPixel(i,j) {
    pixel = {
        i,
        j,
        column,
        setBoom = false,
        value = 0
    }
    return pixel
}
function getColumn(size, row, i) {
    for (let j = 0; j < size; j++) {
        column = createColumn(i,j)
        pixel = createPixel(i,j)
        row.push(pixel)
    }
    return row
}

function drawingTable(size) {
    boardGame = []
    arrayBomb = []
    totalBombs = 0;
    getRow(size,boardGame)
    displayBomb()
    table.style.setProperty('--size', size)
    boardGame.forEach(row => {
        row.forEach(pixel => {
            table.append(pixel.column)
        })
    })

    displayGame()
}

function displayGame() {
    table.addEventListener('click', function (e) {
        if (e.target.dataset.setBoom === false && e.target.dataset.value === 0) {
            e.target.dataset.status = 'marked'
        } else if (e.target.dataset.setBoom === true) {
            alert('you lose')
        } else if (e.target.dataset.value != 0) {
            e.target.dataset.status = 'number'
            e.target.innerHTML = e.target.dataset.value
        }
    })
}

function displayBomb() {
    for (let i = 0; i < 10; i++) {
        bomb = {
            i: Math.floor(Math.random() * 10),
            j: Math.floor(Math.random() * 10),
        }
        arrayBomb.push(bomb)
    }
    arrayBomb.forEach(bomb => {
        const boom = boardGame[bomb.i][bomb.j]
        boom.column.dataset.setBoom = true
        getTopPixel(bomb.i, bomb.j, boardGame)
        getRightPixel(bomb.i, bomb.j, boardGame)
        getLeftPixel(bomb.i, bomb.j, boardGame)
        getBottomPixel(bomb.i, bomb.j, boardGame)
        getTopRightPixel(bomb.i, bomb.j, boardGame)
        getTopLeftPixel(bomb.i, bomb.j, boardGame)
        getBottomRightPixel(bomb.i, bomb.j, boardGame)
        getBottomLeftPixel(bomb.i, bomb.j, boardGame)
    })
}

function getTopPixel(i, j, boardGame) {
    console.log(boardGame[i][j])
    if (i > 0) {
        const topPosition = boardGame[i - 1][j]
        if (boardGame[i][j] != topPosition) {
            topPosition.column.dataset.value = Number(topPosition.column.dataset.value) + 1
        }
        return topPosition
    }
}
function getRightPixel(i, j, boardGame) {
    if (j < 9) {
        const rightPosition = boardGame[i][j + 1]
        if (boardGame[i][j] != rightPosition) {
            rightPosition.column.dataset.value = Number(rightPosition.column.dataset.value) + 1
        }
        return rightPosition
    }
}
function getLeftPixel(i, j, boardGame) {
    if (j > 0) {
        const leftPosition = boardGame[i][j - 1]
        if (boardGame[i][j] != leftPosition) {
            leftPosition.column.dataset.value = Number(leftPosition.column.dataset.value) + 1
        }
        return leftPosition
    }
}
function getBottomPixel(i, j, boardGame) {
    if (i < 9) {
        const bottomPosition = boardGame[i + 1][j]
        if (boardGame[i][j] != bottomPosition) {
            bottomPosition.column.dataset.value = Number(bottomPosition.column.dataset.value) + 1
        }
        return bottomPosition
    }
}
function getTopRightPixel(i, j, boardGame) {
    if (i > 0 && j < 9) {
        const topRightPixel = boardGame[i - 1][j + 1]
        if (boardGame[i][j] != topRightPixel) {
            topRightPixel.column.dataset.value = Number(topRightPixel.column.dataset.value) + 1
        }
        return topRightPixel
    }
}
function getTopLeftPixel(i, j, boardGame) {
    if (i > 0 && j > 0) {
        const topLeftPixel = boardGame[i - 1][j - 1]
        if (boardGame[i][j] != topLeftPixel) {
            topLeftPixel.column.dataset.value = Number(topLeftPixel.column.dataset.value) + 1
        }
        return topLeftPixel
    }
}
function getBottomRightPixel(i, j, boardGame) {
    if (i < 9 && j < 9) {
        const bottomRightPixel = boardGame[i + 1][j + 1]
        if (boardGame[i][j] != bottomRightPixel) {
            bottomRightPixel.column.dataset.value = Number(bottomRightPixel.column.dataset.value) + 1
        }
        return bottomRightPixel
    }
}
function getBottomLeftPixel(i, j, boardGame) {
    if (i < 9 && j > 0) {
        const bottomLeftPixel = boardGame[i + 1][j - 1]
        if (boardGame[i][j] != bottomLeftPixel) {
            bottomLeftPixel.column.dataset.value = Number(bottomLeftPixel.column.dataset.value) + 1
        }
        return bottomLeftPixel
    }
}

function handleApplyColor() {
    colorPicked = 'rgb(61, 61, 61)'
    colorTable.addEventListener('click', function (e) {
        colorPicked = e.target.style.backgroundColor
        chosingColor.innerHTML = e.target.style.backgroundColor
    })
    table.addEventListener('click', function (e) {
        e.target.style.backgroundColor = colorPicked;
    })
}


drawingTable(size)
handleApplyColor()
