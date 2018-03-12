<template>
<div id="app" class="grid">
  <div v-for="(cell,index) in this.$store.state.cells" :key="index" class="cell" @click="tapped(cell)"><div>{{cell.player}}</div></div>  
</div>
</template>

<script>

export default {
  name: 'app',

  mounted(){
      this.$store.dispatch('init')
  },
  methods:{
      tapped(cell){
          this.$store.commit('playerMove', cell)
      }
  }

}
</script>

<style>

.grid {
  display: flex;                       /* establish flex container */
  flex-wrap: wrap;                     /* enable flex items to wrap */
  justify-content: space-around;
  width:300px;
  height:150px;  
}
.cell {
  flex: 0 0 32%;                       /* don't grow, don't shrink, width */
  height: 100%;
  margin-bottom: 5px; 
  color:red; 
  font-size:80px;
  text-align: center;  
}
.cell div {
  font-family: Cambria;
  padding-top:25px;
}
.cell:nth-child(odd) {
  background-color: #FFF;
}
.cell:nth-child(even) {
  background-color: #000;
}
</style>