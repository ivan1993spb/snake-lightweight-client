import { shallowMount } from '@vue/test-utils'
import Capacity from '@/components/Capacity.vue'

describe('Capacity', () => {
  it('renders capacity 100% when passed', () => {
    const wrapper = shallowMount(Capacity, {
      propsData: {
        capacity: 1
      }
    })
    expect(wrapper.text()).toBe('Server capacity 100 %')
  })

  it('renders capacity 0.10% when passed', () => {
    const wrapper = shallowMount(Capacity, {
      propsData: {
        capacity: 0.001
      }
    })
    expect(wrapper.text()).toBe('Server capacity 0.10 %')
  })

  it('renders capacity 0% when passed', () => {
    const wrapper = shallowMount(Capacity, {
      propsData: {
        capacity: 0.0
      }
    })
    expect(wrapper.text()).toBe('Server capacity 0 %')
  })

  it('renders capacity 51% when passed', () => {
    const wrapper = shallowMount(Capacity, {
      propsData: {
        capacity: 0.51
      }
    })
    expect(wrapper.text()).toBe('Server capacity 51 %')
  })
})
