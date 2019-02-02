import React, { Component } from 'react'
import './index.sass'


class DetailedPokemonPanel extends Component {

    state = {

        id: null,
        name: null,
        abilities: [],
        heigth: null,
        heldItems: [],
        moves: [],
        sprites: [],
        stats: [],
        weight:null,
        types: []

    }


    render() {
        return <section>

            <h2>Ditto</h2>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'></img>
            <p>Height: <span>3</span></p>
            <p>weight: <span>40</span></p>
            <ul>
                <h3>stats</h3>
                <li>Speed: <span> 48</span></li>
                <li>Special Defense: <span> 48</span></li>
                <li>Special Attack: <span> 48</span></li>
                <li>Defense: <span> 48</span></li>
                <li>Attack: <span> 48</span></li>
                <li>HP: <span> 48</span></li>

            </ul>

            <ul>
                <h3>Abilities</h3>

                <li>Imposter</li>
                <li>Limber</li>
                

            </ul>

            <ul>
                <h3>Moves</h3>
                <li>Transform</li>


            </ul>

            <ul>
                <h3>Types</h3>
                <li>Normal</li>

            </ul>

            <ul>
                <h3>Held Items</h3>
                <li>Metal Powder</li>
                <li>Quick Powder</li>

            </ul>

        </section>


    }


}

export default DetailedPokemonPanel