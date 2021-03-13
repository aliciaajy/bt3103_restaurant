<template>
  <div>
    <button class="btn" @click="decrement()">-</button>
    <span class="counter"> {{ counter }} </span>
    <button class="btn" @click="increment()">+</button>
  </div>
</template>

<script>
export default {
  name: "QuantityCounter",
  data() {
    return {
      counter: 0,
    };
  },
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    increment() {
      if (this.counter < 10) {
        this.counter++;
        this.$emit("counter", this.item, this.counter);
      } else {
        alert("You cannot buy more than 10 items.");
      }
    },
    decrement() {
      if (this.counter > 0) {
        this.counter--;
        this.$emit("counter", this.item, this.counter);
      }
    },
  },
};
</script>
<style scoped>
.btn {
  background-color: lightblue;
  text-align: center;
  font-size: 25px;
  width: 15%;
  height: 50px;
  border-radius: 8px;
}

.counter {
  font-size: 30px;
  text-align: center;
}
</style>