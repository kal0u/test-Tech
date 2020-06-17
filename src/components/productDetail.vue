<template>
  <body>
    <div v-for="prod in product" :key="prod.product_name">
      <div v-if="id == prod._id.$oid" class="row">
        <div class="col s12 m6">
          <div class="card teal lighten-2">
            <div class="card-content white-text">
              <span class="card-title">{{ prod.product_name }}</span>
              <p>Made by {{ prod.supplier }}</p>
              <p>Price : {{ prod.unit_cost }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center">
    <a @click="backShop" class="waves-effect waves-light btn-small"
      ><i class="material-icons left">arrow_drop_down</i>Back to the shop !
    </a>
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
        localStorage.setItem("id", this.id);
      });
    },
    backShop: function() {
      this.$router.push("/");
    }
  }
};
</script>
<style>
.card {
  width: 30%;
  margin-left: 35%;
  margin-right: 35%;
}
.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>
