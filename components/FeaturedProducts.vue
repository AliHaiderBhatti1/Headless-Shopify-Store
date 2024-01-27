<template>
  <div style="padding-top: 50px; padding-left: 70px; padding-right: 70px">
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
              <div>
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
// import getProductAmount from "../utils/utils";
export default {
  name: "FeaturedProducts",
  data() {
    return {
      groupSize: 3,
    };
  },
  computed: {
    ...mapState(useStore, ["getAllProducts"]),
    itemCarousels() {
      const groups = [];
      for (let i = 0; i < this.getAllProducts.length; i += this.groupSize) {
        groups.push(this.getAllProducts.slice(i, i + this.groupSize));
      }
      return groups;
    },
  },
  methods: {
    ...mapActions(useStore, ["fetchProducts"]),

    calculateGroupSize() {
      const container = document.getElementById("feature-product-container");
      if (!container) return;

      const containerWidth = container.clientWidth;
      if (containerWidth <= 400) return (this.groupSize = 1);
      this.groupSize = Math.floor(containerWidth / 260);
    },

    getProductAmount(item) {
      return (
        item.node.variants.edges[0].node.priceV2.amount +
        " " +
        item.node.variants.edges[0].node.priceV2.currencyCode
      );
    },
  },
  created() {
    if (process.browser)
      window.addEventListener("resize", this.calculateGroupSize);
  },
  mounted() {
    this.calculateGroupSize();
    this.fetchProducts("featured-products", 10, 3);
  },
  destroyed() {
    if (process.browser)
      window.removeEventListener("resize", this.calculateGroupSize);
  },
  watch: {
    getAllProducts(val) {
      console.log("val of getAllProducts", val);
    },
  },
};
</script>
