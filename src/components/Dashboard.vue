<template>
  <div>
      <ul>
        <li ><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </ul>
      <bar-chart></bar-chart>
      <line-chart></line-chart>

  </div>
</template>

<script>
import BarChart from './BarChart.vue';
import LineChart from './LineChart.vue'

export default {
  name: 'Dashboard',
  components: {
    BarChart,
    LineChart
  }
  
}
</script>

<style scoped>
h1 {
  font-family: cursive;
  font-style: italic;
  font-size: 60px;
  background-color: slateblue;
  color: aliceblue;
  text-align: center;
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 2px solid #222;
  margin: 10px;
}
</style>
