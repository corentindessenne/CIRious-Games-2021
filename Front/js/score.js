let score = document.getElementById('score');

socket.emit('displayScore');

socket.on('scoreDisplay', (i, player1, player2, player3, player4, player5, player6, time, nbTurns, gameState, winner) => {
    let k = 1;
    score.insertRow(k);
    for(let j = 0; j < 11; j++){
        score.rows[k].insertCell(j);
    }
    score.rows[k].cells[0].innerText = i;
    score.rows[k].cells[1].innerText = player1;
    score.rows[k].cells[2].innerText = player2;
    score.rows[k].cells[3].innerText = player3;
    score.rows[k].cells[4].innerText = player4;
    score.rows[k].cells[5].innerText = player5;
    score.rows[k].cells[6].innerText = player6;
    score.rows[k].cells[7].innerText = time;
    score.rows[k].cells[8].innerText = nbTurns;
    score.rows[k].cells[9].innerText = gameState;
    score.rows[k].cells[10].innerText = winner;
});