class Room {
    constructor(socket1, socket2, socket3, socket4, socket5, socket6, password) {
        this.player1 = socket1;
        this.player2 = socket2;
        this.player3 = socket3;
        this.player4 = socket4;
        this.player5 = socket5;
        this.player6 = socket6;
        this.public = password ? false : true;
        this.password = this.public ? undefined : password;
        this.ready = false;
        this.time = 0;
    }

    isFull() {
        return this.socket1 && this.socket2 && this.socket3 && this.socket4 && this.socket5 && this.socket6;
    }

    isIn(socket) {
        return (this.player1 && this.player1.handshake.session.username == socket.handshake.session.username) || (this.player2 && this.player2.handshake.session.username == socket.handshake.session.username);
    }

    update(socket) {
        if (this.player1 && this.player1.handshake.session.username == socket.handshake.session.username) {
            clearTimeout(this.player1.reportId);
            this.player1 = socket;
            this.player1.ready = true;
        }
        else if (this.player2 && this.player2.handshake.session.username == socket.handshake.session.username) {
            clearTimeout(this.player2.reportId);
            this.player2 = socket;
            this.player2.ready = true;
        }
        else if (this.player3 && this.player3.handshake.session.username == socket.handshake.session.username) {
            clearTimeout(this.player3.reportId);
            this.player3 = socket;
            this.player3.ready = true;
        }
        else if (this.player4 && this.player4.handshake.session.username == socket.handshake.session.username) {
            clearTimeout(this.player4.reportId);
            this.player4 = socket;
            this.player4.ready = true;
        }
        else if (this.player5 && this.player5.handshake.session.username == socket.handshake.session.username) {
            clearTimeout(this.player5.reportId);
            this.player5 = socket;
            this.player5.ready = true;
        }
        else if (this.player6 && this.player6.handshake.session.username == socket.handshake.session.username) {
            clearTimeout(this.player6.reportId);
            this.player6 = socket;
            this.player6.ready = true;
        }
        if (!this.ready && this.player1 && this.player1.ready && this.player2 && this.player2.ready && this.player3 && this.player3.ready) {
            if(!this.player4 && !this.player5 && !this.player6) {
                this.ready = true;
                setInterval(() => this.time++, 1000);
            }
            else if(this.player4 && this.player4.ready && !this.player5 && !this.player6) {
                this.ready = true;
                setInterval(() => this.time++, 1000);
            }
            else if(this.player4 && this.player4.ready && this.player5 && this.player5.ready && !this.player6) {
                this.ready = true;
                setInterval(() => this.time++, 1000);
            }
            else if(this.player4 && this.player4.ready && this.player5 && this.player5.ready && this.player6 && this.player6.ready) {
                this.ready = true;
                setInterval(() => this.time++, 1000);
            }
        }
    }

    join(socket) {
        if (this.isFull()) return false;
        else {
            if (!this.player1) this.player1 = socket;
            else if(!this.player2) this.player2 = socket;
            else if(!this.player3) this.player3 = socket;
            else if(!this.player4) this.player4 = socket;
            else if(!this.player5) this.player5 = socket;
            else this.player6 = socket;
            return true;
        }
    }

    reportDisappearance(socket, callback, timeout) {
        if (this.player1.handshake.session.username == socket.handshake.session.username)
            this.player1.reportId = setTimeout(() => callback(), timeout);
        else if (this.player2.handshake.session.username == socket.handshake.session.username)
            this.player2.reportId = setTimeout(() => callback(), timeout);
        else if (this.player3.handshake.session.username == socket.handshake.session.username)
            this.player3.reportId = setTimeout(() => callback(), timeout);
        else if (this.player4.handshake.session.username == socket.handshake.session.username)
            this.player4.reportId = setTimeout(() => callback(), timeout);
        else if (this.player5.handshake.session.username == socket.handshake.session.username)
            this.player5.reportId = setTimeout(() => callback(), timeout);
        else if (this.player6.handshake.session.username == socket.handshake.session.username)
            this.player6.reportId = setTimeout(() => callback(), timeout);
    }

    destroyReports() {
        if (this.player1 && this.player1.reportId) clearTimeout(this.player1.reportId);
        if (this.player2 && this.player2.reportId) clearTimeout(this.player2.reportId);
        if (this.player3 && this.player3.reportId) clearTimeout(this.player3.reportId);
        if (this.player4 && this.player4.reportId) clearTimeout(this.player4.reportId);
        if (this.player5 && this.player5.reportId) clearTimeout(this.player5.reportId);
        if (this.player6 && this.player6.reportId) clearTimeout(this.player6.reportId);
    }
}


class House {
    constructor() {
        this.rooms = new Array();
        this.waiters = new Array();
    }
    getRooms(){
        return this.rooms;
    }
    getWaiters(){
        return this.waiters;
    }
    isPlayer(socket) {
        return this.rooms.some(room => (room.player1 && room.player1.handshake.session.username == socket.handshake.session.username) || (room.player2 && room.player2.handshake.session.username == socket.handshake.session.username) || (room.player3 && room.player3.handshake.session.username == socket.handshake.session.username) || (room.player4 && room.player4.handshake.session.username == socket.handshake.session.username) || (room.player5 && room.player5.handshake.session.username == socket.handshake.session.username) || (room.player6 && room.player6.handshake.session.username == socket.handshake.session.username));
    }

    isPlayerByUsername(username) {
        return this.rooms.some(room => (room.player1 && room.player1.handshake.session.username == username) || (room.player2 && room.player2.handshake.session.username == username) || (room.player3 && room.player3.handshake.session.username == username) || (room.player4 && room.player4.handshake.session.username == username) || (room.player5 && room.player5.handshake.session.username == username) || (room.player6 && room.player6.handshake.session.username == username));
    }

    isFree(password) {
        return !this.rooms.some(room => !room.public && room.password == password);
    }

    findRoomByUsername(username) {
        return this.rooms.find(room => (room.player1 && room.player1.handshake.session.username == username) || (room.player2 && room.player2.handshake.session.username == username) || (room.player3 && room.player3.handshake.session.username == username) || (room.player4 && room.player4.handshake.session.username == username) || (room.player5 && room.player5.handshake.session.username == username) || (room.player6 && room.player6.handshake.session.username == username));
    }

    findRoomBySocket(socket) {
        return this.rooms.find(room => (room.player1 && room.player1.handshake.session.username == socket.handshake.session.username) || (room.player2 && room.player2.handshake.session.username == socket.handshake.session.username) || (room.player3 && room.player3.handshake.session.username == socket.handshake.session.username) || (room.player4 && room.player4.handshake.session.username == socket.handshake.session.username) || (room.player5 && room.player5.handshake.session.username == socket.handshake.session.username) || (room.player6 && room.player6.handshake.session.username == socket.handshake.session.username));
    }

    findRoomByPassword(password) {
        return this.rooms.find(room => !room.public && room.password == password);
    }

    addPublicRoom(socket1, socket2, socket3, socket4, socket5, socket6) {
        if (!this.isWaiter(socket1) && !this.isWaiter(socket2) && !this.isWaiter(socket3) && !this.isWaiter(socket4) && !this.isWaiter(socket5) && !this.isWaiter(socket6)) {
            if (!this.isPlayer(socket1) && !this.isPlayer(socket2) && !this.isPlayer(socket3) && !this.isPlayer(socket4) && !this.isPlayer(socket5) && !this.isPlayer(socket6)) {
                this.rooms.push(new Room(socket1, socket2, socket3, socket4, socket5, socket6));
                return this.rooms[this.rooms.length - 1];
            }
        }
        return undefined;
    }

    addPrivateRoom(socket, password) {
        if (!this.isWaiter(socket)) {
            if (!this.isPlayer(socket) && this.isFree(password)) {
                this.rooms.push(new Room(socket, undefined, undefined, undefined, undefined, undefined, password));
                return this.rooms[this.rooms.length - 1];
            }
        }
        return undefined;
    }

    joinRoom(socket, password) {
        if (password) {
            if (!this.isWaiter(socket) && !this.isFree(password)) {
                let room = this.findRoomByPassword(password);
                if (room.join(socket)) return true;
            }
            return false;
        } else {
            if (!this.isWaiter(socket) && this.isPlayer(socket)) {
                let room =  this.findRoomBySocket(socket);
                room.update(socket);
                return room;
            }
            return undefined;
        }
    }

    popRoom(socket) {
        let array = new Array();
        if (this.isPlayer(socket)) {
            let room = this.findRoomBySocket(socket);
            room.destroyReports();
            if (room.player1) array.push(room.player1);
            if (room.player2) array.push(room.player2);
            if (room.player3) array.push(room.player3);
            if (room.player4) array.push(room.player4);
            if (room.player5) array.push(room.player5);
            if (room.player6) array.push(room.player6);
            this.rooms.splice(this.rooms.indexOf(room), 1);
        }
        return array;
    }

    packRoomList() {
        let list = new Array();
        this.rooms.forEach(room => list.push({
            name1: room.player1 ? room.player1.handshake.session.username : '',
            name2: room.player2 ? room.player2.handshake.session.username : '',
            name3: room.player3 ? room.player3.handshake.session.username : '',
            name4: room.player4 ? room.player4.handshake.session.username : '',
            name5: room.player5 ? room.player5.handshake.session.username : '',
            name6: room.player6 ? room.player6.handshake.session.username : ''
        }));
        return list;
    }

    isWaiter(socket) {
        return this.waiters.some(waiter => waiter.handshake.session.username == socket.handshake.session.username);
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
        if (this.waiters.length >= 6) {
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