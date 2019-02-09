import Vue from 'vue'
import log from 'loglevel'
import {
  ServerService
} from '@/common/api.service'
import {
  FETCH_INFO
} from './actions.type'
import {
  FETCH_END,
  FETCH_START,
  RESET_STATE,
  SET_INFO
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
  [FETCH_INFO] (context, gameId) {
    context.commit(FETCH_START)

    ServerService.info()
      .then(({ data }) => {
        context.commit(SET_INFO, data)
      })
      .catch(error => {
        log.error(error)
      })
      .then(() => {
        context.commit(FETCH_END)
      })
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
