const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    add(state) { // store.commit('add');
      state.count++;
    },
    sub(state) {
      state.count--;
    },
    add1(state, payload) { // store.commit('add1', 100);
      state.count = state.count + payload;
    },
    sub1(state, payload) {
      state.count = state.count - payload;
    },
    add2(state, payload) { // store.commit('add1', {number: 100});
      state.count = state.count + payload.number;
    },
    sub2(state, payload) {
      state.count = state.count - payload.number;
    },
  },
});