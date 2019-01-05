import Vue from 'vue'
import {
  ServerService
} from '@/common/api.service'
import {
  FETCH_INFO
} from './actions.type'
import {
  RESET_STATE,
  SET_INFO,
  FETCH_START,
  FETCH_END
} from './mutations.type'

const initialState = {
  isLoading: false,

  info: {
    author: '',
    license: '',
    version: '',
    build: ''
  }
}

export const state = { ...initialState }

export const actions = {
  async [FETCH_INFO] (context, gameId) {
    context.commit(FETCH_START)
    const { data } = await ServerService.info()
    context.commit(FETCH_END)
    context.commit(SET_INFO, data)
    return data
  }
}

export const mutations = {
  [RESET_STATE] (state) {
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  },
  [SET_INFO] (state, info) {
    state.info = info
  },
  [FETCH_START] (state) {
    state.isLoading = true
  },
  [FETCH_END] (state) {
    state.isLoading = false
  }
}

const getters = {
  info (state) {
    return state.info
  },
  isLoadingInfo (state) {
    return state.isLoading
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}