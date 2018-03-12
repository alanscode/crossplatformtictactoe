const Vue = require('nativescript-vue');
const store = require('./store')

new Vue({    
    store,
    template: 
    `
        <Page>
            <ActionBar class="action-bar" :title="this.$store.state.playerTurn + ' Move'"></ActionBar>
            <GridLayout columns="*,*,*" rows="*,*,*" backgroundColor="white">
            <Label v-for="cell in this.$store.state.cells" :text="cell.player" :row="cell.row" :col="cell.col" :backgroundColor="cell.color" @tap="tapped(cell)"/>
            </GridLayout>
        </Page>
    `,                                             
    methods:{
        tapped(cell){
            this.$store.commit('playerMove', cell)
        }
    },
    mounted(){
        this.$store.dispatch('init')
    }
}).$start();
