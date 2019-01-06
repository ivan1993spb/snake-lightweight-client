import Vue from 'vue'
import {
  GamesService
} from '@/common/api.service'
import router from '@/router'
import {
  FETCH_GAME,
  UPDATE_GAME,
  CREATE_GAME
} from './actions.type'
import {
  RESET_STATE,
  SET_GAME,
  FETCH_START,
  FETCH_END
} from './mutations.type'

const initialState = {
  isLoading: false,
  game: {
    id: 0,
    limit: 0,
    count: 0,
    width: 0,
    height: 0,
    rate: 0
  }
}

export const state = { ...initialState }

export const actions = {
  async [FETCH_GAME] (context, id) {
    context.commit(FETCH_START)
    const { data } = await GamesService.get(id)
    context.commit(FETCH_END)
    context.commit(SET_GAME, data)
    return data
  },
  async [UPDATE_GAME] (context, id) {
    const { data } = await GamesService.get(id)
    context.commit(SET_GAME, data)
    return data
  },
  async [CREATE_GAME] (context, params) {
    const { data } = await GamesService.create(params)

    router.push({
      name: 'game',
      params: {
        id: data.id
      }
    })

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
  [SET_GAME] (state, game) {
    state.game = game
  },
  [RESET_STATE] () {
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  }
}

const getters = {
  game (state) {
    return state.game
  },
  isLoadingGame (state) {
    return state.isLoading
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
