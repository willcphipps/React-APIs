import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'nes.css/css/nes.min.css'
import axios from 'axios';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [poke, setPoke] = useState({ 'data': { abilities: [{ ability: {} }] } });
  const [moves, setMoves] = useState([]);
  const [show, setShow] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [name, setName] = useState("");

  
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=200")
            .then(response => response.json())
          .then(response => {
            setPokemon(response.results)
          })
    }, []);
  const showPoke = (e) => {
    show === false ? setShow(true) : setShow(false);

  }
  const thisPoke = (e, idx) => {
    let poke = pokemon[idx]
    setName(poke.name);
    axios.get(poke.url)
      .then(res => {
        console.log(res)
        setMoves(res.data.moves)
        setPoke(res);
        setShowStats(true);
        document.getElementById("box").style.display = "block";
      });
  }
  const hideStats = () => {
    document.getElementById("box").style.display = "none";
    setShowStats(false);
  }
  const toggleImg = (e, idx) => {
    let imagediv = document.getElementById(idx);
    let imgtemp = imagediv.src;
    imagediv.src = imagediv.alt;
    imagediv.alt = imgtemp;
    imagediv.style.height = "125px";
  }
  const toggleAlt = (e, idx) => {
    let imagediv = document.getElementById(idx);
    let imgtemp = imagediv.src;
    imagediv.src = imagediv.alt;
    imagediv.alt = imgtemp;
    imagediv.style.height = "95px";
  }
    
      
  return (
    <div
      onClick={(e) => hideStats(e)}
      className="App">
      
      <div
      className="d-flex flex-wrap justify-content-between">{
        show === true ? 
          
            pokemon.length > 0 && pokemon.map((poke, index) => {
              let imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
              let altImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${index + 1}.png`
            
              return (
                  
                <div
                  className="m-2"
                  style={{
                    height: "100px",
                    width: "100px",
                    position: "relative"
                  }}

                  key={index}>
                  {showStats === false ?
                    
                    <img
                      style={{
                        imageRendering: "pixelated",
                        position: "",
                      }}
                      onClick={(e) => thisPoke(e, index)}
                      onMouseOver={(e) => toggleImg(e, index)}
                      onMouseOut={(e) => toggleAlt(e, index)}
                      id={index} src={imgSrc} alt={altImg} />
                  
                    :
                    <img
                      style={{
                        imageRendering: "pixelated",
                        position: "static",
                        opacity: ".5",
                        overflow:"hidden"
                      
                      }}
                     
                      id={index} src={imgSrc} alt={altImg} />
                  }
                </div>
              )
            })
            :
            <div className="pokeBall">
              <i
              onClick={(e)=> showPoke(e)}
              className="nes-pokeball is-small"></i>
            </div>
        }
        <div id="box">
          <span
            onClick={(e) => hideStats(e)}
            className="close">&times;</span>
          <h4>Name:</h4>
          <p>{name}</p>
          <h4>Ability:</h4>
          <p>{poke.data.abilities[0].ability.name}</p>
          <h4>Moves:</h4>
          {moves.map((m, i) => <li key={i}>{m.move.name}</li>
          )}
        </div>
        </div>
      </div>
    );
}


export default App;
