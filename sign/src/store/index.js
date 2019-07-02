import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import index from './modules/index';
import scope from './modules/scope';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        index,
        scope
    },
    plugins:[createLogger()]
})