import { shallowMount } from '@vue/test-utils'
import PokemonOptions from '@/components/PokemonOptions'
import { pokemons } from '../mocks/pokemons.mock'

describe('Pokemon Options component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons
            }
        })
    })

    test('should match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
        // expect(wrapper.html()).toMatchInlineSnapshot(`<div class="options-container">
        //     <ul>
        //     <li>Bulbasaur</li>
        //     <li>Ivysaur</li>
        //     <li>Venusaur</li>
        //     <li>Charmander</li>
        //     </ul>
        // </div>`)
    })

    test('should show 4 options', () => {
        const listItems = wrapper.findAll('li')
        expect(listItems.length).toBe(4)
        listItems.forEach((item, index) => {
            const name = item.text().toLowerCase()
            expect(name).toBe(pokemons[index].name)
        })
    })

    test('should emit "selectPokemon" with its respective parameters', () => {
        const listItems = wrapper.findAll('li')
        listItems.forEach((item, index) => {
            item.trigger('click')
            const event = wrapper.emitted('selectPokemon')[index]
            expect(event).toEqual([pokemons[index].id])
        })
    })
})