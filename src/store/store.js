import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        balance: 10000,
        market: [
            {brand: 'BMW', price: 0, owned: 0},
            {brand: 'Apple', price: 0, owned: 0},
            {brand: 'Microsoft', price: 0, owned: 0},
            {brand: 'Facebook', price: 0, owned: 0}
        ],
        savedBalance: 0,
        savedMarket: ''
    },
    getters: {
        firstBrandPrice: state => {
            return state.market[0].price;
        },
        secondBrandPrice: state => {
            return state.market[1].price;
        },
        thirdBrandPrice: state => {
            return state.market[2].price;
        },
        fourthBrandPrice: state => {
            return state.market[3].price;
        }
    },
    mutations: {
        substractBalance: (state, payload) => {
            state.balance -= payload;
        },
        addBalance: (state, payload) => {
            state.balance += payload;
        },
        setMode: (state, payload) => {
            state.selectedMode = payload;
        },
        mutateStockPrices(state) {
            //Generate random variations between +- 10% of current prices and add/substract it
            for (let i = 0; i < state.market.length; i++) {
                state.market[i].price +=
                    Math.floor(
                        Math.random() * (Math.floor(state.market[i].price / 10) -
                        -Math.ceil(state.market[i].price / 10 + 1)) +
                        -Math.ceil(state.market[i].price / 10));
            }
        },
        generateStockPrices(state) {
            //Generate random variations between +- 10% of current prices and add/substract it
            for (let i = 0; i < state.market.length; i++) {
                state.market[i].price =
                    Math.floor(
                        Math.random() * (Math.floor(200) -
                        Math.ceil(100)) +
                        Math.ceil(100));
            }
        },
        preventFromReachingZero: function (state, i) {
            state.market[i].price += Math.floor(
                Math.random() * (Math.floor(15) -
                Math.ceil(7)) +
                Math.ceil(15));
        },
        //State saving&loading function (save object as string)
        save: (state) => {
            state.savedBalance = state.balance;
            state.savedMarket = JSON.stringify(state.market);
        },
        //Turn stringified saved state to readable object
        load: (state) => {
            state.balance = state.savedBalance;
            state.market = JSON.parse(state.savedMarket);
        }
    },
    actions: {
        //Basic stock trading actions
        substractBalance({commit}, payload) {
            commit('substractBalance', payload);
        },
        addBalance({commit}, payload) {
            commit('addBalance', payload);
        },
        //Setting trading mode
        setMode({commit}, payload) {
            commit('setMode', payload);
        },
        //Saving and loading state
        save({commit}) {
            commit('save');
        },
        load({commit}) {
            commit('load');
        },
        //Mutating and generating stock prices
        mutateStockPrices({commit}) {
            commit('mutateStockPrices');
        },
        generateStockPrices({commit}) {
            commit('generateStockPrices');
        },
        preventFromReachingZero({commit}, i) {
            commit('preventFromReachingZero', i);
        }
    }
});