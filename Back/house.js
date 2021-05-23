class Room {
    constructor(password, ...sockets) {
        this.diffSockets = sockets.slice();
        if(password === 0) password = undefined;
        this.public = password ? false : true;
        this.password = this.public ? undefined : password;
        this.ready = false;
        this.time = 0;
    }

    update(socket) {
        let count = 0;
        for(let i = 0; i < this.diffSockets.length; i++){
            if(this.diffSockets[i] && this.diffSockets[i].handshake.session.username === socket.handshake.session.username){
                clearTimeout(this.diffSockets[i].reportId);
                this.diffSockets[i] = socket;
                this.diffSockets[i].ready = true;
            }
            if(!this.ready){
                if(this.diffSockets[i] && this.diffSockets[i].ready){
                    count++;
                }
                if(count === this.diffSockets.length){
                    this.ready = true;
                    setInterval(() => this.time++, 1000);
                }
            }
        }
    }

    reportDisappearance(socket, callback, timeout) {
        for(let i = 0; i < this.diffSockets.length; i++){
            if(this.diffSockets[i].handshake.session.username === socket.handshake.session.username){
                this.diffSockets[i] = setTimeout(() => callback(), timeout);
            }
        }
    }

    destroyReports() {
        for(let i = 0; i < this.diffSockets.length; i++){
            if(this.diffSockets[i] && this.diffSockets[i].reportId){
                clearTimeout(this.diffSockets[i].reportId);
            }
        }
    }
}


class House {
    constructor() {
        this.rooms = new Array();
        this.waiters = new Array();
        this.nbPlayers = 0;
    }
    setNbPlayers(nb){
        this.nbPlayers = nb;
    }
    getWaiters(){
        return this.waiters;
    }
    isPlayer(socket) {
        let count = 0;
        for(let i = 0; i < this.nbPlayers; i++){
            if(this.rooms.some(room => (room.diffSockets[i] && room.diffSockets[i].handshake === socket.handshake))){
                count++;
            }
        }
        if(count !== 0) return true;
        else return false;
    }

    findRoomBySocket(socket) {
        return this.rooms.find(room => (room.player1 && room.player1.handshake.sessionID === socket.handshake.sessionID) || (room.player2 && room.player2.handshake.sessionID === socket.handshake.sessionID) || (room.player3 && room.player3.handshake.sessionID === socket.handshake.sessionID) || (room.player4 && room.player4.handshake.sessionID === socket.handshake.sessionID) || (room.player5 && room.player5.handshake.sessionID === socket.handshake.sessionID) || (room.player6 && room.player6.handshake.sessionID === socket.handshake.sessionID));
    }

    addRoom(password, diffSockets) {
        let count1 = 0;
        let count2 = 0;
        for (let i = 0; i < diffSockets.length; i++) {
            if (!this.isWaiter(diffSockets[i])) {
                count1++;
                if (count1 === diffSockets.length) {
                    for (let j = 0; j < diffSockets.length; j++) {
                        if (!this.isPlayer(diffSockets[j])) {
                            count2++;
                            if (count2 === diffSockets.length) {
                                this.rooms.push(new Room(password, diffSockets.join()));
                                return this.rooms[this.rooms.length - 1];
                            }
                        }
                    }
                }
            }
        }
        return undefined;
    }

    joinRoom(socket) {
        if (!this.isWaiter(socket)){//} && this.isPlayer(socket)) {
                let room =  this.findRoomBySocket(socket);
                return room;
            }
        return undefined;
    }

    popRoom(socket) {
        let array = new Array();
        let room = this.findRoomBySocket(socket);
        room.destroyReports();
        for(let i = 0; i < room.diffSockets.length; i++){
            if(room.diffSockets[i]) array.push(room.diffSockets[i]);
        }
        this.rooms.splice(this.rooms.indexOf(room), 1);

        return array;
    }

    isWaiter(socket) {
        return this.waiters.some(waiter => waiter.handshake.session.username === socket.handshake.session.username);
    }

    addWaiter(socket) {
        if (!this.isPlayer(socket)) {
            let index = this.waiterIndex(socket);
            if (index > -1) this.waiters[index] = socket;
            else this.waiters.push(socket);
            return true;
        } else {
            return false;
        }
    }

    deleteWaiter(socket) {
        let index = this.waiterIndex(socket);
        if (index > -1) this.waiters.splice(index, 1);
    }

    waiterIndex(socket) {
        return this.waiters.indexOf(this.waiters.find(waiter => waiter.handshake.session.username == socket.handshake.session.username));
    }

    popWaiters() {
        let array = new Array();
        if (this.waiters.length === 3) {
            array.push(this.waiters[0]);
            array.push(this.waiters[1]);
            array.push(this.waiters[2]);
            this.waiters.splice(0, 3);
        }
        else if (this.waiters.length === 4) {
            array.push(this.waiters[0]);
            array.push(this.waiters[1]);
            array.push(this.waiters[2]);
            array.push(this.waiters[3]);
            this.waiters.splice(0, 4);
        }
        else if (this.waiters.length === 5) {
            array.push(this.waiters[0]);
            array.push(this.waiters[1]);
            array.push(this.waiters[2]);
            array.push(this.waiters[3]);
            array.push(this.waiters[4]);
            this.waiters.splice(0, 5);
        }
        else if (this.waiters.length >= 6) {
            array.push(this.waiters[0]);
            array.push(this.waiters[1]);
            array.push(this.waiters[2]);
            array.push(this.waiters[3]);
            array.push(this.waiters[4]);
            array.push(this.waiters[5]);
            this.waiters.splice(0, 6);
        }
        return array;
    }
}

module.exports = House;