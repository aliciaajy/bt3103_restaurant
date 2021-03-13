<template>
  <div>
    <h1>AAJY's Kitchen</h1>
    <nav>
      <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
      </ul>

      <ul>
        <li v-for="item in orders" :key="item.index">
          <button
            class="btn1"
            v-bind:id="item[0]"
            v-on:click="deleteItem($event)"
          >
            Delete
          </button>
          <button class="btn2" v-bind:id="item[0]" v-on:click="route($event)">
            Modify
          </button>

          <div v-for="(qty, name) in item[1]" :key="qty.index">
            {{ name }} : {{ qty }}
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import database from "../firebase.js";
export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    route: function (event) {
      let doc_id = event.target.getAttribute("id");
      this.$router.push({ name: "modify", params: { id: doc_id } });
    },
    deleteItem: function (event) {
      let doc_id = event.target.getAttribute("id");
      database
        .collection("orders")
        .doc(doc_id)
        .delete()
        .then(() => {
          location.reload();
        });
    },
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          let items = [];
          snapshot.docs.forEach((doc) => {
            const id = doc.id;
            items = doc.data();
            this.orders.push([id, items]);
          });
        });
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
.btn1 {
  flex-grow: 1;
  flex-basis: 100px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;

  margin-left: 50%;
}
.btn2 {
  flex-grow: 1;
  flex-basis: 100px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
  margin-left: 0%;
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
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
  margin-left: 80%;
}
</style>