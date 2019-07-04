import React from 'react';

class MessageList extends React.Component {
  constructor(props){
    super(props);
    this.messages = [];

  }
  componentDidMount(){

  }

  render(){
    return(
      <div id="msgs">
      <ul id='messages'> </ul>
      </div>

    )
  }
}

export default MessageList;
