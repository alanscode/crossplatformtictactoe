const Vue = require('nativescript-vue');
const Vuex = require('vuex')
const firebase = require("nativescript-plugin-firebase/app");
const game = require('./game')

firebase.initializeApp()

Vue.use(Vuex)

const CELLS_PATH = 'tictactoe/cells'
const TURN_PATH = 'tictactoe/turn'
const store = new Vuex.Store({
    state:{
        playerTurn: '',
        cells:[]
    },
    mutations:{        
        playerMove(state,cell){
            if(cell.player != '') return

            cell.player = state.playerTurn           
            
            firebase.database().ref(CELLS_PATH).set(state.cells)
            firebase.database().ref(TURN_PATH).set(state.playerTurn == 'X' ? 'O' : 'X')
            
            this.dispatch('checkForWinner')
        },
        reset(state){            
            state.cells.forEach(cell=>
                cell.player = ''
            )
            firebase.database().ref(CELLS_PATH).set(state.cells)
            firebase.database().ref(TURN_PATH).set('X')
        },
        updateCells(state,cells){
            state.cells = cells
            this.dispatch('checkForWinner')
        },
        updatePlayer(state,player){
            state.playerTurn = player
        }
    },
    actions:{
        init(context){
            firebase.database().ref(CELLS_PATH).on('value', result =>
                this.commit('updateCells', result.val())
            )

            firebase.database().ref(TURN_PATH).on('value', result =>                
                this.commit('updatePlayer', result.val())
            )
        },
        checkForWinner(context){
            var result = game.checkForWinner(context.state.cells)

            if(result){
                alert(result)
                this.commit('reset')
            }
        }
    },
    getters:{

    }
})


module.exports = store
