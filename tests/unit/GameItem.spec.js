import { shallowMount } from '@vue/test-utils'
import GameItem from '@/components/GameItem.vue'

describe('GameItem', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(GameItem, {
      propsData: {
        id: 1,
        width: 10,
        height: 10,
        count: 10,
        limit: 10,
        rate: 10
      }
    })
    expect(wrapper.text()).toBe("Game 1 map: 10x10 players: 10/10 rate: 10 delete")
  })
})
