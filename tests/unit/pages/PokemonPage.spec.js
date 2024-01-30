import { shallowMount, mount } from '@vue/test-utils'
import PokemonPage from "@/pages/PokemonPage"
import { pokemons } from '../mocks/pokemons.mock'
import PokemonPicture from '@/components/PokemonPicture'
import PokemonOptions from '@/components/PokemonOptions'

describe('PokemonPage component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })

    test('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('should call mixPokemonArray after mount', () => {
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    })

    test('should match with snapshot when pokémons are loaded', () => {
        const wrapper = shallowMount(PokemonPage, {
            data: function () {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: "",
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('should show PokemonPicture and PokemonOptions components', () => {
        /**
         * PokemonPicture should exist
         * PokemonOptions should exist
         * 
         * PokemonPicture should have pokemonId attribute and should be equal to the first pokémon
         * PokemonOptions should have pokemons attribute (to be truthy)
         */
        const wrapper = mount(PokemonPage, {
            data: function () {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        })

        // const pokemonPicture = wrapper.find('pokemon-picture-stub')
        // expect(pokemonPicture.exists()).toBeTruthy()

        // const pokemonOptions = wrapper.find('pokemon-options-stub')
        // expect(pokemonOptions.exists()).toBeTruthy()

        // expect(pokemonPicture.attributes('pokemonid')).toBe(pokemons[0].id.toString())
        // expect(pokemonOptions.attributes('pokemons')).toBeTruthy()

        const pokemonPicture = wrapper.findComponent(PokemonPicture)
        expect(pokemonPicture.exists()).toBeTruthy()

        const pokemonOptions = wrapper.findComponent(PokemonOptions)
        expect(pokemonOptions.exists()).toBeTruthy()

        const { pokemonId } = pokemonPicture.props()
        expect(pokemonId).toBe(pokemons[0].id)

        const { pokemons: options } = pokemonOptions.props()
        expect(options).toStrictEqual(pokemons)
    })

    test('testing checkAnswer', async () => {
        const wrapper = shallowMount(PokemonPage, {
            data: function () {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        })

        const ANSWERS = {
            ok: "THAT'S RIGHT!",
            wrong: "OOPS!",
        }

        await wrapper.vm.checkAnswer(1, pokemons[0].id)
        expect(wrapper.find('h2').exists()).toBeTruthy()
        expect(wrapper.vm.showPokemon).toBeTruthy()
        expect(wrapper.find('h2').text()).toBe(`${ANSWERS.ok} - It's ${pokemons[0].name}`)

        await wrapper.vm.checkAnswer(1, pokemons[1].id)
        expect(wrapper.vm.message).toBe(`${ANSWERS.wrong} - It's ${pokemons[0].name}`)
    })
})