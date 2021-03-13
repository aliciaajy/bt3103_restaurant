import { Line } from 'vue-chartjs'
import axios from 'axios'


export default {
  extends: Line,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: []
      },
      regions: [],
      colors:["red", "blue", "pink", "yellow", "green", "purple"],
      options: {
        legend: { display: true },
        title: {
          display: true,
          text: 'PSI Twenty Four Hourly (By Region)'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },

  methods: {

    fetchRegion: function () {
      axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
          response.data.region_metadata.forEach(data => {
            this.regions.push(data.name)
          })
        })
    },

    fetchItems: function () {
      // store psi for each region in a list as a key value pair
      var tempItems = []
      axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
          for (var i = 0; i < this.regions.length; i++) {
            var regionDict = {
              "label": "",
              "data": [],
              "fill": "false",
              "backgroundColor": this.colors[i],
              "borderColor": this.colors[i]
              
            }
            regionDict.label = this.regions[i]
            tempItems.push(regionDict)
          }
          response.data.items.forEach(data => {
            let psi = data["readings"]["psi_twenty_four_hourly"]
            this.datacollection.labels.push(data["timestamp"])
            
            for (var key in psi) {           
              for (var dict in tempItems) {
                if (tempItems[dict]["label"] == key) {  
                  tempItems[dict]["data"].push(psi[key])
                }
              }
            }
          })

          for (var dict in tempItems) { 
            this.datacollection.datasets.push(tempItems[dict])
          }
          this.renderChart(this.datacollection, this.options)

        })
        
    }

  },
  created() {
    this.fetchRegion()
    this.fetchItems()
  }
}
