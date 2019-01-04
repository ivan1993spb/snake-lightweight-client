import { ServerService } from '@/common/api.service'
import { FETCH_CAPACITY, FETCH_PING } from './actions.type'
import {
  SET_CAPACITY,
  SET_PING
} from './mutations.type'

const initialState = {
  ping: 0,
  capacity: 0.0
}

export const state = { ...initialState }

const getters = {
  ping (state) {
    return state.ping
  },
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
  },
  [FETCH_PING] ({ commit }) {
    return ServerService.ping()
      .then(({ data }) => {
        commit(SET_PING, data.pong)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
}

const mutations = {
  [SET_CAPACITY] (state, capacity) {
    state.capacity = capacity
  },
  [SET_PING] (state, pong) {
    state.ping = pong
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
