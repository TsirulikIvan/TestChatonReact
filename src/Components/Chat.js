import React from 'react';
import io from "socket.io-client";


class Chat extends React.Component{

  constructor(props){
    super(props);
    this.state = {name:'', msg:'', messages : []};
    this.onChangedName = this.onChangedName.bind(this);
    this.onChangedMSG = this.onChangedMSG.bind(this);
    this.socket = io();
    this.sendMessage = this.sendMessage.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.seeHistory = this.seeHistory.bind(this);
    this.socket.on('RECEIVE_MESSAGE' , (data) => {
        this.addMessage(data);
    });

    this.socket.on('RECEIVE_ALL_MESSAGE' , (data) => {
        this.setState({messages : data});
    });
};

  onChangedName(event){
    this.setState({name: event.target.value});
  };

  onChangedMSG(event){
    this.setState({msg: event.target.value});
  };

  addMessage(data){
    this.setState({messages : this.state.messages.concat(data)});
  };


  sendMessage(ev){
  ev.preventDefault();
  this.socket.emit('SEND_MESSAGE', {
      author: this.state.name,
      msg_text: this.state.msg
        })

  this.setState({msg: ''});
};

seeHistory(){
  this.socket.emit('SEND_ALL_MESSAGE');
}
  render()
  {
    return(
      <div>
      <ul className="message-list">
      {
        this.state.messages.map(message => {
        return (
          <li className="message">
          <div>{message.author}</div>
          <div>{message.msg_text}</div></li>
        )
      })
    }
    </ul>

    <div id='footer'>
      <form className="send-message-form" onSubmit={this.sendMessage}>
        <label> Введите ваше имя:
            <input type='text' required value={this.state.name} id='name' onChange={this.onChangedName}/>
        </label>
        <label>    Введите ваше сообщение:
            <input id="m" required type='text' value={this.state.msg} id='name' onChange={this.onChangedMSG}/>
        </label>
        <input type="submit" value="Отправить" id='sendBTN'/>
      </form>
      </div>
      </div>
)};
};


export default Chat
