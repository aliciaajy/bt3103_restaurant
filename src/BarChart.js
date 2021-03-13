import { Bar } from 'vue-chartjs'
import database from './firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
      datacollection: {
        labels: [],
        datasets: [{
          label: "Quantity Ordered",
          backgroundColor: [],
          data: []
        }]
      },
      foodList: [],

      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total Number of each dish'
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [ {
            ticks: {
              min:0
            }
          }]
        }
      }
    }
  },

  methods: {
    getFoodList: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.foodList.push(doc.data().name);
            this.datacollection.labels.push(doc.data().name)
            this.datacollection.datasets[0].backgroundColor.push(doc.data().colour)
          });
        });
    },

    fetchItems: function () {
      var item ={}
      
      database.collection('orders').get().then(querySnapShot => {
        for (let i = 0; i < this.foodList.length; i++) {      
          //initialise all food qty to 0 first
          item[this.foodList[i]] = 0;
        }

        querySnapShot.forEach(doc => {
          let order = doc.data()
          for (var orderedItem in order) {
            item[orderedItem] += parseInt(order[orderedItem])
          }
        })

      
        for (let i = 0; i < this.datacollection.labels.length; i++) {
          this.datacollection.datasets[0].data.push(item[this.datacollection.labels[i]])

        }
        this.renderChart(this.datacollection, this.options)
      })
    },

  },

  created() {
    this.getFoodList()
    this.fetchItems()
  }
}