<template>
  <div class="px-16 pt-12">
    <h2>Featured Products</h2>
    <div id="feature-product-container" class="d-flex justify-center flex-wrap">
      <v-carousel>
        <v-carousel-item
          v-for="(carouselItem, i) in itemCarousels"
          :key="i"
          cycle
        >
          <div class="d-flex justify-center align-center">
            <v-hover
              v-for="item in carouselItem"
              :key="item.id"
              v-slot="{ hover }"
              close-delay="200"
              class="mx-3"
            >
              <div @click="openProduct(item.node.id)">
                <v-card
                  :class="{ 'on-hover': hover }"
                  class="mx-auto"
                  height="350"
                  width="240"
                >
                  <v-card-text
                    class="font-weight-medium mt-12 text-center text-subtitle-1"
                  >
                    <img
                      contain
                      :src="
                        hover
                          ? item.node.images.edges[0].node.originalSrc
                          : item.node.images.edges[1].node.originalSrc
                      "
                      style="object-fit: contain; width: 100%; height: 300px"
                    />
                  </v-card-text>
                </v-card>
                <div class="d-flex justify-center mt-2">
                  <div class="pointer text-body-1">{{ item.node.title }}</div>
                </div>
                <div class="d-flex justify-center">
                  <div class="pointer text-body-2">
                    {{ getProductAmount(item) }}
                  </div>
                </div>
              </div>
            </v-hover>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "pinia";
import { useStore } from "../store/index";
export default {
  name: "FeaturedProducts",
  data() {
    return {
      groupSize: 3, // data property to set items per carousel
    };
  },
  computed: {
    ...mapState(useStore, ["getAllProducts"]),

    // Getter to divide an array of products into groups of a specified size
    itemCarousels() {
      const groups = []; // Array to store groups of products

      // Loop through the array of all products
      for (let i = 0; i < this.getAllProducts.length; i += this.groupSize) {
        groups.push(this.getAllProducts.slice(i, i + this.groupSize));
      }
      return groups; // Return the array of product groups
    },
  },
  methods: {
    ...mapActions(useStore, ["fetchProducts"]),

    // Function to calculate and set the group size based on the container width
    calculateGroupSize() {
      const container = document.getElementById("feature-product-container");

      // If the container is not found, exit the function
      if (!container) return;

      // Get the width of the container
      const containerWidth = container.clientWidth;

      // If the container width is less than or equal to 400, set groupSize to 1
      if (containerWidth <= 400) return (this.groupSize = 1);
      this.groupSize = Math.floor(containerWidth / 260);
    },

    // Function to get the formatted product amount as "amount currencyCode"
    getProductAmount(item) {
      return (
        item.node.variants.edges[0].node.priceV2.amount +
        " " +
        item.node.variants.edges[0].node.priceV2.currencyCode
      );
    },

    // Function to navigate to the product detail page using the router
    openProduct(id) {
      this.$router.push({
        name: `ProductDetail`, // Assuming there is a route named "ProductDetail"
        params: { id }, // Passing the product id as a route parameter
      });
    },
  },
  created() {
    // Check if the code is running in the browser environment
    if (process.browser)
      window.addEventListener("resize", this.calculateGroupSize);
  },
  mounted() {
    // Call the calculateGroupSize method on component mount
    this.calculateGroupSize();

    // Fetch products on component mount with specified parameters
    this.fetchProducts("featured-products", 10, 3);
  },
  destroyed() {
    // Check if the code is running in the browser environment
    if (process.browser)
      window.removeEventListener("resize", this.calculateGroupSize);
  },
};
</script>
