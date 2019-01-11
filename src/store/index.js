import Vue from 'vue'
import Vuex from 'vuex'

import about from './about.module'
import game from './game.module'
import games from './games.module'
import home from './home.module'
import capacity from './capacity.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    about,
    game,
    games,
    home,
    capacity
  }
})
