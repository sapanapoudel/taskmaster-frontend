import React from 'react';
import './App.css';
import Header from './components/Header.js';
import Main from './components/Main.js';

class App extends React.Component {
  render() {
    return (
      <div class="container-fluid">
      <React.Fragment>
        <Header />
        <Main />
      </React.Fragment>
      </div>
    )
  }
}
export default App;