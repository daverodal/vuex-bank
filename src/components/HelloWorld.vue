<template>
  <div>
    <h1>Account Summary</h1>
    Balance is
    <span class="balance" :class="{negative: isNegative}">$ {{ balance }}</span>
    <div class="box-wrapper">
      <div class="box">
        <h2>all transactions</h2>
        <div v-for="transaction of transactions" :class="{negative: transaction < 0}">{{transaction}}</div>
      </div>
      <div class="box">
        <h2>deposits</h2>
        <div v-for="deposit of deposits">{{ deposit }}</div>
      </div>
      <div class="box">
        <h2>withdrawls</h2>
        <div v-for="withdrawl of withdrawls">{{ withdrawl }}</div>
      </div>
    </div>

    <div class="button-wrapper">
      <button @click="deposit">deposit</button>
      <button @click="withdrawl">withdrawl</button>
      <button @click="clearHistory">clear</button>
    </div>

  </div>
</template>

<script>
    import {mapGetters, mapMutations, mapState} from 'vuex'
    export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
    computed: {...mapGetters(['balance', 'deposits', 'withdrawls', 'isNegative']),
        ...mapState(['transactions']),
   },
        watch: {
            transactions: ( arg ) => {
                debugger;
                localStorage.transactions = JSON.stringify(arg);
            }
        },
    methods:{...mapMutations(['clearHistory']),
        deposit(){
            const m = (parseInt(window.prompt('select amount')));
            this.$store.commit('deposit', m)
        },
        withdrawl(){
            const m = (parseInt(window.prompt('select amount')));
            this.$store.commit('withdrawl', m)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .box-wrapper{
    display:flex;
    justify-content: space-around;
    .box{
      border: 1px solid #999;
      padding:10px;
      box-shadow: 3px 3px 3px #999;
    }
  }
  .button-wrapper{
    margin-top: 30px;
    display:flex;
    justify-content: center;
    button{
      margin: 0 10px;
      font-size:24px;
      background:#fefefe;
    }
  }
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.balance{
  color: green;
}
  .negative{
    color: red;
  }
</style>
