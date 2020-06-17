<template>
  <body>
    <div v-for="prod in product" :key="prod.product_name">
      <div v-if="id == prod._id">
        {{ prod.product_name }}
        {{ prod.supplier }}
        {{ prod.unit_cost}}
      </div>
    </div>
  </body>
</template>
<script>
import axios from "axios";
export default {
  name: "detailProduct",
  data() {
    return {
      id: this.$route.params.id,
      product: []
    };
  },
  created() {
    this.getProduct();
    // console.log(this.product);
  },
  methods: {
    getProduct() {
      axios.get("/static/data.json").then(res => {
        this.product = res.data;
      });
    },
  },
};
</script>
