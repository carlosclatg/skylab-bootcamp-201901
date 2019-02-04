import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/DetailedPokemonPanel'
import DetailedPokemonPanel from './components/DetailedPokemonPanel';


class App extends Component {
  state={
    
     statsReal : [
    
      {
        base_stat: 48,
    
        stat: {
    
          name:'speed'
    
    
        }
    
    
      },
      {
        base_stat: 48,
    
        stat: {
    
          name:'special-defense'
    
    
        }
    
      },
      {
        base_stat: 48,
    
        stat: {
    
          name:'special-attack'
    
    
        }
    
      },
      {
        base_stat: 48,
    
        stat: {
    
          name:'defense'
    
    
        }
    
      },
      {
        base_stat: 48,
    
        stat: {
    
          name:'attack'
    
    
        }
    
      },
      {
        base_stat: 48,
    
        stat: {
    
          name:'hp'
    
    
        }
    
      }
    
    
    
    ],
    
    realAbilities :
    [
    
      {
    
        ability:{
          name:'imposter'
        }
    
      },
      {
    
        ability:{
          name:'limber'
        }
    
      }
    
    
    
    
    ],
    
    RealMoves : [
    
    {
      move:{
    
        name:'transform'
    
    
      }
    }
    
    
    
    ],
    
    
    RealTypes:[
    
    {
      type:{
        name:'normal'
      }
    }
    
    ],
    
    RealHeldItems :[
    
    {
      item:{
        name:'metal-powder'
      }
    },
    {
      item:{
        name:'quick-powder'
      }
    }
    
    
    ]



}


  render() {
    const { state: { statsReal, realAbilities, RealMoves, RealTypes,RealHeldItems }} = this

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <DetailedPokemonPanel name={'ditto'} stats={statsReal} abilities={realAbilities} moves={RealMoves} types = {RealTypes} heldItems = {RealHeldItems} heigth={'3'}weight={'3'}/>



      </div >
    );
  }
}

export default App;
