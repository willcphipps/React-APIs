import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'nes.css/css/nes.min.css'

import './App.css';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=807")
            .then(response => response.json())
            .then(response => setPokemon(response.results))
    }, []);
  const showPoke = (e) => {
    show === false ? setShow(true) : setShow(false);
  }
      
  return (
    <div className="App">
      <button 
        className="m-3 btn btn-outline-dark "
        onClick={(e)=> showPoke(e)}
      >
        Fetch Pokemon
      </button>
      <div>{
        show === true ? 
            pokemon.length > 0 && pokemon.map((poke, index)=>{
                return (<div className="m-1" key={index}>{poke.name}</div>)
            })
          :
          <div className="m-5">
            <i className="nes-pokeball"></i>
          </div>
        }
          
      </div>
        </div>
    );
}


export default App;
