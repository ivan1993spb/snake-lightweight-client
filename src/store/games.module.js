import Vue from 'vue'
import _ from 'lodash'
import {
  GamesService
} from '@/common/api.service'
import {
  FETCH_GAMES,
  DELETE_GAME,
  UPDATE_GAMES
} from './actions.type'
import {
  RESET_STATE,
  SET_GAMES,
  FETCH_START,
  FETCH_END,
  EXCLUDE_GAME
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
  },
  async [UPDATE_GAMES] (context) {
    const { data } = await GamesService.all()
    context.commit(SET_GAMES, data)
    return data
  },
  async [DELETE_GAME] (context, id) {
    const { data } = await GamesService.delete(id)
    context.commit(EXCLUDE_GAME, data.id)
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
  [EXCLUDE_GAME] (state, id) {
    state.games = _.filter(state.games, game => game.id !== id)
    state.count = state.games.length
  },
  [SET_GAMES] (state, data) {
    const relevantGames = []
    const emptyGames = []
    const fullGames = []

    _.forEach(data.games, game => {
      if (game.count === 0) {
        emptyGames.push(game)
      } else if (game.limit === game.count) {
        fullGames.push(game)
      } else {
        relevantGames.push(game)
      }
    })

    state.games = []

    _.sortBy(relevantGames, [
      'rate',
      'id'
    ]).forEach(game => {
      state.games.push(game)
    })

    _.sortBy(emptyGames, [
      'limit',
      'id'
    ]).forEach(game => {
      state.games.push(game)
    })

    _.sortBy(fullGames, [
      'count',
      'id'
    ]).forEach(game => {
      state.games.push(game)
    })

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
