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
        weight: null,
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

        // return <section>

        //     <h2>${name}</h2>
        //     <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'></img>
        //     <p>Height: <span>${heigth}</span></p>
        //     <p>weight: <span>${weight}</span></p>
        //     <ul>
        //         <h3>stats</h3>
        //         <li>Speed: <span> ${stats[0].base_stat}</span></li>
        //         <li>Special Defense: <span> ${stats[1].base_stat}</span></li>
        //         <li>Special Attack: <span> ${stats[2].base_stat}</span></li>
        //         <li>Defense: <span> ${stats[3].base_stat}</span></li>
        //         <li>Attack: <span> ${stats[4].base_stat}</span></li>
        //         <li>HP: <span> ${stats[5].base_stat}</span></li>

        //     </ul>

        //     <ul>
        //         <h3>Abilities</h3>

        //         <li>${abilities[0].ability.name}</li>
        //         <li>${abilities[1].ability.name}</li>


        //     </ul>

        //     <ul>
        //         <h3>Moves</h3>
        //         <li>${moves[0].move.name}</li>


        //     </ul>

        //     <ul>
        //         <h3>Types</h3>
        //         <li>${types[0].type.name}</li>

        //     </ul>

        //     <ul>
        //         <h3>Held Items</h3>
        //         <li>{heldItems[0].item.name}</li>
        //         <li>{heldItems[1].item.name}</li>

        //     </ul>

        // </section>


    }


}

export default DetailedPokemonPanel