<template>
  <div class="chart">
    <h1>Bar Chart</h1>
    <chart></chart>
  </div>
</template>

<script>
import Chart from "../BarChart.js";
export default {
  components: {
    Chart
  }
};
</script>

<style>
h1 {
  font-family: cursive;
  font-style: italic;
  font-size: 60px;
  background-color: slateblue;
  color: aliceblue;
  text-align: center;
}
</style>
