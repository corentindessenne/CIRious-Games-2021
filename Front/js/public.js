let tab = document.getElementById('waitingPlayers');

socket.emit('multijoueur');

socket.on('play', () =>{
    console.log("ça marche youhou");
   /* var tblBody = document.createElement("tbody");
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode(socket.handshake.session.username);
    cell.appendChild(cellText);
    row.appendChild(cell);
    tblBody.appendChild(row);
    tab.appendChild(tblBody);*/
});