<template>
    <h1 v-if="!pokemon">Please, wait...</h1>
    <div v-else>
        <!-- Pokemon -->
        <h1>Who's this Pokémon?</h1>
        <PokemonPicture
            v-bind:pokemon-id="pokemon.id"
            :show-pokemon="showPokemon"
        />

        <!-- Options -->
        <PokemonOptions
            v-if="!showAnswer"
            :pokemons="pokemonArr"
            @select-pokemon="checkAnswer(1, $event)"
        />

        <template v-else>
            <h2 class="fade-in">{{ message }}</h2>
            <button @click="newGame" class="fade-in">New game</button>
        </template>
    </div>
</template>

<script>
// Components
import PokemonPicture from "@/components/PokemonPicture.vue"
import PokemonOptions from "@/components/PokemonOptions.vue"

// Helpers
import getPokemonOptions from "@/helpers/getPokemonOptions"

const ANSWERS = {
    ok: "THAT'S RIGHT!",
    wrong: "OOPS!",
}

export default {
    name: "PokemonPage",
    components: {
        PokemonPicture,
        PokemonOptions,
    },
    data: function () {
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: "",
        }
    },
    methods: {
        mixPokemonArray: async function () {
            this.pokemonArr = await getPokemonOptions()
            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt]
        },
        checkAnswer: function (test, selectedId) {
            this.showPokemon = true

            if (selectedId === this.pokemon.id) {
                this.message = `${ANSWERS.ok} - It's ${this.pokemon.name}`
            } else {
                this.message = `${ANSWERS.wrong} - It's ${this.pokemon.name}`
            }

            this.showAnswer = true
        },
        newGame: function () {
            this.pokemonArr = []
            this.pokemon = null
            this.showPokemon = false
            this.showAnswer = false
            this.message = ""
            this.mixPokemonArray()
        },
    },
    mounted: function () {
        this.mixPokemonArray()
    },
}
</script>