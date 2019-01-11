import { ServerService } from '@/common/api.service'
import { FETCH_CAPACITY } from './actions.type'
import { SET_CAPACITY } from './mutations.type'

const initialState = {
  capacity: 0.0
}

export const state = { ...initialState }

const getters = {
  capacity (state) {
    return state.capacity
  }
}

const actions = {
  [FETCH_CAPACITY] ({ commit }, params) {
    return ServerService.capacity()
      .then(({ data }) => {
        commit(SET_CAPACITY, data.capacity)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const mutations = {
  [SET_CAPACITY] (state, capacity) {
    state.capacity = capacity
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
