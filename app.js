const User = function(name) {
  this.name = name;
  this.chatroom = null;
}

User.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function(message, from) {
    console.log(`${from.name} to ${this.name}: ${message}`);
  }
}

const Chatroom = function() {
  let users = {}; // list of users

  return {
    register: function(user) {
      users[user.name] = user;
      user.chatroom = this;
    },
    send: function(message, from, to) {
      if(to) {
        // Single user message
        to.receive(message, from);
      } else {
        // Mass message
        for(key in users) {
          if(users[key] !== from) {
            users[key].receive(message, from);
          }
        }
      }
    }
  }
}

const marcel = new User('Marcel');
const reza = new User('Reza');
const putra = new User('Putra');

const chatroom = new Chatroom();

chatroom.register(marcel);
chatroom.register(reza);
chatroom.register(putra);

marcel.send('Hello Reza', reza);
reza.send('Hello Marcel, Kamu ganteng!', marcel);
putra.send('Halo Semuanya!!');