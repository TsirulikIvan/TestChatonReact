import React from 'react';
import io from "socket.io-client";


class InputForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {name:'', msg:''};
    this.onChangedName = this.onChangedName.bind(this);
    this.onChangedMSG = this.onChangedMSG.bind(this);
    this.socket = io();
    this.sendMessage = this.sendMessage.bind(this);
  };

  onChangedName(event){
    this.setState({name: event.target.value});
  };

  onChangedMSG(event){
    this.setState({msg: event.target.value});
  };

  sendMessage(ev){
  ev.preventDefault();
  this.socket.emit('SEND_MESSAGE', {
      author: this.state.name,
      message: this.state.msg
        })
  this.setState({msg: ''});
};

  render()
  {
    return(


      <form id='form' onSubmit={this.sendMessage}>
    <label> Введите ваше имя:
        <p>
      <input type='text' value={this.state.name} id='name' onChange={this.onChangedName}/>
          </p>
    </label>


    <label>    Введите ваше сообщение:
      <p>

      <input id="m" type='text' value={this.state.msg} id='name' onChange={this.onChangedMSG}/>
          </p>
    </label>
    <input type="submit" value="Отправить" />


    </form>
  )};
};
export default InputForm
