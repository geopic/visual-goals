import Vue from 'vue';
import Vuex from 'vuex';
import props from '@/common/props';
import utils from '@/common/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    siteData: utils.loadDataFromLS(),
    dataExists: Boolean(utils.loadDataFromLS())
  },
  mutations: {
    saveData(state, data) {
      utils.saveDataToLS(data);
      state.dataExists = true;
    },
    deleteData(state) {
      localStorage.removeItem(props.site.lsEntry);
      state.dataExists = false;
    }
  },
  actions: {},
  modules: {}
});
