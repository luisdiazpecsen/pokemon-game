import { shallowMount } from "@vue/test-utils"
import PokemonPicture from '@/components/PokemonPicture'

describe('PokemonPicture component', () => {
    test('should match with snapshot', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false,
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('should show the hidden image and Pokemon #100', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: false,
            }
        })

        // const hiddenImage = wrapper.find('.hidden-pokemon')
        // expect(hiddenImage.exists()).toBeTruthy()

        const [img1, img2] = wrapper.findAll('img')

        // Validate hidden image
        expect(img1.exists()).toBeTruthy()
        expect(img2).toBe(undefined)
        expect(img1.classes('hidden-pokemon')).toBeTruthy()

        // Validate URL
        expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
    })

    test('should show Pokemon if showPokemon:true', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: true,
            }
        })

        const img1 = wrapper.find('img')

        expect(img1.exists()).toBeTruthy()
        expect(img1.classes('hidden-pokemon')).toBeFalsy()
        expect(img1.classes('fade-in')).toBeTruthy()
    })
})