import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire'

import auth from './auth';
import user from './user'
import clients from './clients'
import calendar from './calendar'
import common from './common'
import ThemeBuilder from './ThemeBuilder'
import projects from './projects';
import groups from './groups';
import steps from './steps';
import blocks from './blocks';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      auth,
      user,
      clients,
      calendar,
      common,
      ThemeBuilder,
      projects,
      groups,
      steps,
      blocks,
    },
    mutations: {
      ...vuexfireMutations
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
  });
}
