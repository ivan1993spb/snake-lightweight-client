import { ServerService } from '@/common/api.service'
import { FETCH_PING } from './actions.type'
import { SET_PING } from './mutations.type'

const initialState = {
  ping: 0
}

export const state = { ...initialState }

const getters = {
  ping (state) {
    return state.ping
  }
}

const actions = {
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
