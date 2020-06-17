

<template>
  <div class="container">
    <h3>Products</h3>

    <input type="text" v-model="search" />

    <button @click="sort">Order by Price (DESC)</button>
    <button @click="reverse">Order By Price (ASC)</button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Supplier</th>
          <th scope="col">Quantity</th>
          <th scope="col">Unit Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr  v-for="product in filteredProducts" :key="product.product_name ">
          <th scope="row">{{ product._id }}</th>
          <!-- <td > {{ product.product_name }}</td> -->
          <router-link tag="td" :to="'/product/' + product._id"><a>{{ product.product_name }}</a></router-link>
          <td>{{ product.supplier }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.unit_cost }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
// import data from '../../static/data.json'
// console.log(data)
export default {
  name: "Products",
  data() {
    return {
      componentLoaded: false,
      search: "",
      products: [],
    };
  },
  created: function() {
    axios.get("/static/data.json").then((res) => {
      this.products = res.data;
    });
  },
  methods: {
    sort: function() {
      this.products.sort(this.sortByPrice);
    },
    reverse: function() {
      this.products.sort(this.sortPriceDesc);
    },
    src: function() {
      this.product.filter(this.filteredProducts);
    },
    sortByPrice: function(a, b) {
      var reN = /[^0-9]/g;
      var aN = parseInt(a.unit_cost.replace(reN, ""), 10);
      var bN = parseInt(b.unit_cost.replace(reN, ""), 10);
      return aN === bN ? 0 : aN < bN ? 1 : -1;
    },
    sortPriceDesc: function(a, b) {
      var reN = /[^0-9]/g;
      var aN = parseInt(a.unit_cost.replace(reN, ""), 10);
      var bN = parseInt(b.unit_cost.replace(reN, ""), 10);
      return aN === bN ? 0 : aN > bN ? 1 : -1;
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          product.product_name
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
};
</script>
<style>
h3 {
  margin-bottom: 5%;
}
</style>
