import Vue from 'vue'
import log from 'loglevel'
import {
  GamesService
} from '@/common/api.service'
import router from '@/router'
import {
  CREATE_GAME,
  FETCH_GAME,
  UPDATE_GAME
} from './actions.type'
import {
  FETCH_END,
  FETCH_START,
  RESET_STATE,
  SET_GAME
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
  [FETCH_GAME] (context, id) {
    context.commit(FETCH_START)

    GamesService.get(id)
      .then(response => {
        context.commit(SET_GAME, response.data)
      })
      .catch(error => {
        if (error.response.status === 404) {
          router.push({
            path: '/404'
          })
        } else {
          log.error(error)
        }
      })
      .then(() => {
        context.commit(FETCH_END)
      })
  },
  [UPDATE_GAME] (context, id) {
    GamesService.get(id)
      .then(({ data }) => {
        context.commit(SET_GAME, data)
      })
      .catch(error => {
        log.error(error)
      })
  },
  [CREATE_GAME] (context, params) {
    GamesService.create(params)
      .then(({ data }) => {
        router.push({
          name: 'game',
          params: {
            id: data.id
          }
        })
      })
      .catch(error => {
        log.error(error)
      })
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
