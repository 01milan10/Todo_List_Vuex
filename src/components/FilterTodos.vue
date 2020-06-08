<template>
  <div>
    Filter Todos:
    <select @change="filterTodos($event)">
      <option>Show All</option>
      <option value="30">30</option>
      <option value="20">20</option>
      <option value="10">10</option>
      <option value="5">5</option>
    </select>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FilterTodos",
  methods: {
    ...mapActions(["filterTodos"])
  }
};
</script>
<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: #41b883 1px solid;
  border-radius: 2px;
}
</style>