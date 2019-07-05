let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let Sequelize = require('sequelize');
let sequelize = new Sequelize("dc317d0h61c540","jpemyduacpuljs", "e18511991221e18291f98b28bbeacecf8d0a257ace3ce9e2d77454cb0d938adf",{
  dialect : 'postgres',
  host: 'ec2-54-83-1-101.compute-1.amazonaws.com'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  app.get('/', (req, res) =>{
    res.sendFile('/public/index.html')
  })
  const Message = sequelize.define("messages", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false
    },
    msg_text: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  sequelize.sync();
let port = 8080;

server.listen(process.env.PORT || port);


app.use(express.static('public'));

io.on('connection', function(socket){
 console.log('user connected');

 socket.on('SEND_MESSAGE', function(data){
           console.log(data);
        Message.create({
          author: data['author'],
          msg_text: data['msg_text']
        }).then(msg => {
          console.log(msg.dataValues)
          let msg1 = {author : '', msg_text: ''};
          msg1.author = msg.dataValues.author;
          msg1.msg_text = msg.dataValues.msg_text;
          console.log(msg1);
          io.emit('RECEIVE_MESSAGE', msg1)
        });
    });

    socket.on('SEND_ALL_MESSAGE', function(){
           Message.findAll({
             attributes: ['id','author','msg_text', 'createdAt']
           }).then((info) => {io.emit('RECEIVE_ALL_MESSAGE', info);
         });
       });

  socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});
