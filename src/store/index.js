/*
 * this is the main vuex store
 */

import Vue from 'vue'
import Vuex from 'vuex'
import { sum } from 'lodash'

Vue.use(Vuex)
const curTrans = localStorage.transactions ? JSON.parse(localStorage.transactions) : [300];
export default new Vuex.Store({
  state: {
    transactions: [...curTrans]
  },
  mutations: {
      deposit(state, money) {
          if (money) {
              state.transactions = [...state.transactions, money];
          }
      },
      withdrawl(state, money) {
          if (money) {
              state.transactions = [...state.transactions, -money];
          }
      },
      clearHistory(state){
          state.transactions = [];
      }
  },
  actions: {
  },
    getters: {
        balance(state) {
            return sum(state.transactions);
        },
         deposits(state) {
            return state.transactions.filter((t) => t >= 0);
        },
         withdrawls(state) {
            return state.transactions.filter((t) => t < 0);
        },
        isNegative(state, getters){
          return getters.balance < 0;
        }
    },
  modules: {
  }
})
