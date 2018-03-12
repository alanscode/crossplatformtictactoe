import Vue from  'vue';
import Vuex from  'vuex';
import game from './game'
import * as firebase from 'firebase'

var config = {
        apiKey: "AIzaSyA2d4Fkma3i5DBvoFz5AxT2wgvZYAIgki0",
        authDomain: "resume-edfe8.firebaseapp.com",
        databaseURL: "https://resume-edfe8.firebaseio.com",
        projectId: "resume-edfe8",
        storageBucket: "resume-edfe8.appspot.com",
        messagingSenderId: "25303282816"
    };

firebase.initializeApp(config);

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
            state.cells.forEach(cell => cell.player = '')
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

export default store
