import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './Components/Chat';


let Title = (props) => {
  return(
    <p className="title">Тестовое задание</p>
  )
}


class App  extends React.Component{
  constructor(props){
    super(props);

  }
  render() {
    return (
    <div className="app">
          <Title />
        <Chat />
    </div>
  )}

}

export default App;
