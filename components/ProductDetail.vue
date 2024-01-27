<template>
  <div>
    <div
      style="padding-top: 50px; padding-left: 70px; padding-right: 70px"
      class="d-flex flex-wrap justify-center"
    >
      <div style="max-width: 600px">
        <v-carousel :show-arrows="false">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div style="width: calc(100% - 600px)">
        <div class="d-flex justify-center">
          <h1>Brown Belt</h1>
        </div>
        <div class="px-8">
          <div class="d-flex py-4">
            <h3>Price:</h3>
            <div class="mx-4" style="margin: 3px">Rs. 3100 PKR</div>
          </div>
          <div class="">
            <h3>Description</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div>
            <h3 class="py-1">Quantity</h3>
            <v-icon @click="setQunatity('decrease')" class="mr-2 pointer"
              >mdi-minus</v-icon
            >
            {{ quantity }}
            <v-icon @click="setQunatity('increase')" class="ml-2 pointer"
              >mdi-plus</v-icon
            >
          </div>
        </div>

        <div class="d-flex justify-center py-4">
          <v-btn width="300px" color="teal accent-2" depressed>
            <v-icon class="mx-2" medium>mdi-cart</v-icon>
            Add to cart
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useStore } from "../store/index";
export default {
  name: "ProductDetail",
  data() {
    return {
      quantity: 1,
      items: [
        "https://cdn.shopify.com/s/files/1/0686/2441/7014/files/D77250003-alt1-pdp-lse.jpg?v=1706353349",
        "https://cdn.shopify.com/s/files/1/0686/2441/7014/files/D77250003-alt2-pdp-lse.jpg?v=1706353349",
        "https://cdn.shopify.com/s/files/1/0686/2441/7014/files/D77250003-alt3-pdp-lse.jpg?v=1706353349",
      ],
      item: {
        id: 1,
        img: "https://cdn.shopify.com/s/files/1/0686/2441/7014/files/D77250003-alt1-pdp-lse.jpg?v=1706353349",
        img2: "https://cdn.shopify.com/s/files/1/0686/2441/7014/files/D77250003-alt2-pdp-lse.jpg?v=1706353349",
        img3: "https://cdn.shopify.com/s/files/1/0686/2441/7014/files/D77250003-alt3-pdp-lse.jpg?v=1706353349",
        title: "Brown Sweat Shirt",
        price: "1200 PKR",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    };
  },
  methods: {
    ...mapActions(useStore, ["fetchSingleProduct"]),
    setQunatity(value) {
      if (value == "increase") this.quantity++;
      else if (this.quantity != 1 && "decrease") this.quantity--;
    },
  },
  mounted() {
    console.log("this", this.$route);
    // this.fetchSingleProduct();
  },
};
</script>
