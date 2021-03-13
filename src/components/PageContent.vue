
<template>
  <div>
    <h1>AAJY's Kitchen</h1>
    <nav>
      <ul id="itemsList">
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </ul>
    </nav>
    <ul id="itemsList">
      <li v-for="item in itemsList" :key="item.id">
        <div id="itemName">{{ item.name }}</div>
        <img :src="item.imageURL" />
        <div id="price">${{ item.price }}</div>
        <QtyCounter v-bind:item="item" v-on:counter="onCounter"></QtyCounter>
      </li>
    </ul>
    <Basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></Basket>
  </div>
</template>

<script>
import Basket from "./Basket.vue";
import database from "../firebase.js";

export default {
  name: "PageContent",
  data() {
    return {
      itemsList: [],
      itemsSelected: [],
    };
  },
  components: {
    Basket: Basket,
  },
  methods: {
    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          let items = {};
          snapshot.docs.forEach((doc) => {
            items = doc.data();
            this.itemsList.push(items);
          });
        });
    },

    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        // Loop through everything to check what is not in the basket
        var found = false;
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];
          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item_name === item.name && count > 0) {
            this.itemsSelected.splice(i, 1);
            this.itemsSelected.splice(i, 0, [item.name, count, item.price]);
            found = true;
            break;
          }
          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          else if (item_name === item.name && count == 0) {
            this.itemsSelected.splice(i, 1);
            found = true;
            break;
          }
        }
        // otherwise, if the item  is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
        if (found == false && count > 0) {
          this.itemsSelected.push([item.name, count, item.price]);
        }
      }
    },
  },
  created() {
    this.fetchItems();
  },
};
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
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#itemName {
  font-size: 30px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>