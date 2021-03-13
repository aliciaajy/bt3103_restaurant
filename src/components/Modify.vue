<template>
  <div>
    <h1>AAJY's Kitchen</h1>
    <div>
      <p v-for="(qty, name) in datapacket[0]" :key="name">
        <br />
        {{ name }} : {{ qty }} <br /><br />

        <input
          v-model="datapacket_copy[name]"
          placeholder="0"
          type="number"
          min="0"
        />
      </p>
    </div>

    <button v-on:click="updateOrder">Update Order</button>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      datapacket: [],
      item_id: "",
      datapacket_copy: {},
      foodList: [],
    };
  },
  methods: {
    updateOrder: function () {
      if (Object.keys(this.datapacket_copy).length == 0) {
        database.collection("orders").doc(this.item_id).delete();
      } else {
        for (var i = 0; i < this.foodList.length; i++) {
          if (!(this.foodList[i] in this.datapacket_copy)) {
            this.datapacket_copy[this.foodList[i]] = 0;
          }
        }
        database
          .collection("orders")
          .doc(this.item_id)
          .set(this.datapacket_copy);
      }

      this.$router.push({ path: "/orders" });
    },
    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.foodList.push(doc.data().name);
          });
        });
      database
        .collection("orders")
        .doc(this.item_id)
        .get()
        .then((snapshot) => {
          this.datapacket.push(snapshot.data());
        });
    },
  },
  created() {
    this.item_id = this.$route.params.id;
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
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 100px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>