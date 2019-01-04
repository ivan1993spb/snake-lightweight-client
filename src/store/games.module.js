import Vue from 'vue'
import {
  GamesService
} from '@/common/api.service'
import {
  FETCH_GAMES
} from './actions.type'
import {
  RESET_STATE,
  SET_GAMES,
  FETCH_START,
  FETCH_END
} from './mutations.type'

const initialState = {
  isLoading: false,
  games: [],
  count: 0,
  limit: 0
}

export const state = { ...initialState }

export const actions = {
  async [FETCH_GAMES] (context) {
    context.commit(FETCH_START)
    const { data } = await GamesService.all()
    context.commit(FETCH_END)
    context.commit(SET_GAMES, data)
    return data
  }
}

export const mutations = {
  [FETCH_START] (state) {
    state.isLoading = true
  },
  [FETCH_END] (state) {
    state.isLoading = false
  },
  [SET_GAMES] (state, data) {
    state.games = data.games
    state.count = data.count
    state.limit = data.limit
  },
  [RESET_STATE] () {
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  }
}

const getters = {
  games (state) {
    return state.games
  },
  limit (state) {
    return state.limit
  },
  count (state) {
    return state.count
  },
  isLoadingGames (state) {
    return state.isLoading
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
