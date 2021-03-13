<template>
  <div>
    <p>Menu:</p>
    <ul>
      <li class="items" v-for="item in itemsSelected" :key="item.name">
        {{ item[0] }} x {{ item[1] }}
      </li>
    </ul>
    <button
      class="btn"
      v-on:click="
        getTotal();
        sendOrder();
      "
    >
      Add Order</button
    ><br /><br />
    <div class="price" v-show="shown">Subtotal: ${{ subTotal }}</div>
    <div class="price" v-show="shown">
      Grand Total: ${{ grandTotal.toFixed(2) }}
    </div>
  </div>
</template>

<script>
import database from "../firebase.js";

export default {
  name: "Basket",
  data() {
    return {
      subTotal: 0,
      grandTotal: 0,
      shown: false,
    };
  },
  props: {
    itemsSelected: {
      type: Array,
    },
  },

  methods: {
    sendOrder: function () {
      var foodOrder = {};
      for (var i = 0; i < this.itemsSelected.length; i++) {
        const item = this.itemsSelected[i];
        foodOrder[item[0]] = item[1];
      }

      console.log(foodOrder);
      database
        .collection("orders")
        .add(foodOrder)
        .then(() => {
          location.reload();
        });
    },
    getTotal: function () {
      this.subTotal = 0;
      this.grandTotal = 0;
      this.itemsSelected.forEach((item) => {
        this.subTotal += item[1] * item[2];
      });
      this.grandTotal = this.subTotal * 1.07;
      if (this.shown == false) {
        this.shown = true;
      }
    },
  },
};
</script>

<style scoped>
p {
  font-size: 40px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

.btn {
  background-color: lightblue;
  font-size: 15px;
  width: 150px;
  height: 35px;
  border-radius: 8px;
}

.price {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 20px;
}

.items {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 22px;
}
</style>