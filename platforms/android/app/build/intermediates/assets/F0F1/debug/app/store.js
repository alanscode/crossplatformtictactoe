const Vue = require('nativescript-vue');
const Vuex = require('vuex')
const game = require('./game')
const firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
}).then(
    function (instance) {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        playerTurn: 'X',
        cells:
        [
            {row:0,col:0,color:'white',player:''},{row:0,col:1,color:'black',player:''},{row:0,col:2,color:'white',player:''},
            {row:1,col:0,color:'black',player:''},{row:1,col:1,color:'white',player:''},{row:1,col:2,color:'black',player:''},
            {row:2,col:0,color:'white',player:''},{row:2,col:1,color:'black',player:''},{row:2,col:2,color:'white',player:''}
        ]
    },
    mutations:{        
        playerMove(state,cell){
            if(cell.player != '') return

            cell.player = state.playerTurn
            state.playerTurn = state.playerTurn == 'X' ? 'O' : 'X'
            state.status = state.playerTurn + ' Move'

            var result = game.checkForWinner(state.cells)

            if(result){
                alert(result)
                .then(()=>{
                    this.commit('reset')
                })
            }
        },
        reset(state){
            state.playerTurn = 'X'
            state.cells.forEach(cell=>{
                cell.player = ''
            })
        }
    },
    actions:{

    },
    getters:{

    }
})

module.exports = store