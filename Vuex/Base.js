const mapGetters = Vuex.mapGetters;
const mapMutations = Vuex.mapMutations;

const store = new Vuex.Store({
  state: {
    numbers: [],
  },
  mutations: {
    add(state, payload) { // store.commit('add1', 100);
      state.numbers.push(payload);
    },
    sub(state) {
      state.numbers.pop();
    },
  },
  getters: {
    sum(state) { // 这是一个属性,值未发生改变会走缓存 缺点是不能传参
      return state.numbers.reduce((num1, num2) => num1 + num2, 0);
    },
    /*sum: (state) => () => { // 这事一个方法,值未发生改变调用也会重新计算 有点可以传参
      return state.numbers.reduce((num1, num2) => num1 + num2, 0);
    },*/
    total(state) {
      return state.numbers.length;
    },
    average(state, getters) {
      return (getters.sum / getters.total * 100 / 100).toFixed(1);
    },
  },
  actions: {
    add(context) {
      axios.get('http://vue.bloglc.com/blog/test/rand').then( (response) => {
        context.commit('add', response.data);
      });

    },
    sub(context) {
      context.commit('sub');
    }
  },
});

const addButton = {
  // getters 传参写法
  /*template: `
    <button class="btn btn-danger" v-on:click.prevent="add(Math.floor(Math.random()*(10-1)+1))">add</button>
  `,*/
  // actions 写法
  template: `
    <button class="btn btn-danger" v-on:click.prevent="add()">add</button>
  `,
  methods: {
    /*add() { // 调用 getters 方法
      this.$store.commit('add', 5);
    },*/
    /*...mapMutations([ // 调用 getters 方法
      'add'
    ])*/
    add() { // 调用 actions 方法
      this.$store.dispatch('add');
    }
  },
};

const subButton = {
  template: `
    <button class="btn btn-danger" v-on:click.prevent="sub()">sub</button>
  `,
  methods: {
    /*sub () {
      this.$store.commit('sub');
    },*/
    /*...mapMutations([
      'sub'
    ])*/
    sub() {
      this.$store.dispatch('sub');
    }
  }
};

const Counter = {
  template: `
      <div class="counter">
          总和:{{ nSum }}
          <br>
          个数:{{ nTotal }}
          <br>
          平均值:{{ average }}
          <hr>
          <add-button></add-button>
          <sub-button></sub-button>
      </div>
    `,
  computed: {
    /*sum() {
      return this.$store.getters.sum; // 属性调用方式
      //return this.$store.getters.sum(); // 方法调用方式
    },
    total() {
      return this.$store.getters.total;
    },
    average() {
      return this.$store.getters.average;
    },*/
    ...mapGetters({
      nSum: 'sum',
      nTotal: 'total',
      average: 'average',
    }),
  },
  components: {
    addButton,
    subButton
  }
};

const app = new Vue({
  el: '#app',
  store,
  components: {
    Counter,
  },
  template: `
    <div>
      <counter></counter>
  </div>
  `,
});