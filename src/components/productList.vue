<template>
  <div class="container">
    <h3>Products</h3>
    <a @click="goBack" class="waves-effect waves-light btn-small"
      ><i class="material-icons left">forward</i>Last product view
    </a>

    <form class="form-inline d-flex justify-content-center md-form form-sm">
      <input
        v-model="search"
        class="form-control form-control-sm mr-3 w-75"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
    </form>

    <a @click="sort" class="waves-effect waves-light btn-small"
      ><i class="material-icons left">arrow_drop_down</i>Price : High To Low
    </a>
    <a @click="reverse" class="waves-effect waves-light btn-small"
      ><i class="material-icons left">arrow_drop_up</i>Price : Low To High
    </a>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Supplier</th>
          <th scope="col">Quantity</th>
          <th scope="col">Unit Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.product_name">
          <router-link tag="td" :to="'/product/' + product._id.$oid"
            ><a>{{ product.product_name }}</a></router-link
          >
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
export default {
  name: "Products",
  data() {
    return {
      search: "",
      products: [],
      lastView: ""
    };
  },
  created: function() {
    axios.get("/static/data.json").then(res => {
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
    goBack: function() {
      this.$router.push("/product/" + this.lastView);
    }
  },
  mounted() {
    this.lastView = localStorage.getItem("id");
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        return (
          product.product_name
            .toLowerCase()
            .indexOf(this.search.toLowerCase()) > -1
        );
      });
    }
  }
};
</script>
<style>
h3 {
  margin-bottom: 2%;
}
a {
  margin-bottom: 2%;
  margin-top: 2%;
}
</style>
