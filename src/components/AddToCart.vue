<template>
  <div>
    <v-btn color="accent" elevation="2" outlined small @click="AddItemToTheCart"
      >Añadir al carrito</v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    productid: String,
    price: Number,
    image: String,
  },
  data() {
    return {
      productId: this.productid,
      productName: this.name,
      productPrice: this.price,
      productImage: this.image,
    };
  },
  methods: {
    AddItemToTheCart() {
      console.log(
        this.productId,
        this.productName,
        this.productImage,
        this.productPrice
      );
    },
  },
};
</script>

<style scoped>
</style>