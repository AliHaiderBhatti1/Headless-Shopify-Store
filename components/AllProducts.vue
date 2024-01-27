<template>
  <div style="margin-top: 20px; padding-left: 70px; padding-right: 70px">
    <h2 class="text-capitalize">{{ category }} Products</h2>
    <div style="max-width: 300px">
      <v-text-field
        v-model="searchByTitle"
        label="Search by title"
        hide-details
        outlined
        dense
      ></v-text-field>
    </div>
    <div
      v-if="filteredProducts.length"
      class="d-flex flex-wrap justify-center align-center"
    >
      <v-hover
        v-for="item in filteredProducts"
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
    <div v-else class="d-flex flex-wrap justify-center align-center">
      No products found.
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useStore } from "../store/index";
export default {
  name: "WomenCategories",
  data() {
    return {
      category: null,
      searchByTitle: null,
    };
  },
  computed: {
    ...mapState(useStore, ["getAllProducts"]),

    filteredProducts() {
      return this.searchByTitle && this.getAllProducts
        ? this.getAllProducts.filter((item) => {
            return item.node.title
              ? item.node.title
                  .toLowerCase()
                  .includes(this.searchByTitle.toLowerCase())
              : false;
          })
        : this.getAllProducts;
    },
  },
  methods: {
    ...mapActions(useStore, ["fetchProducts"]),

    getProductAmount(item) {
      return (
        item.node.variants.edges[0].node.priceV2.amount +
        " " +
        item.node.variants.edges[0].node.priceV2.currencyCode
      );
    },

    openProduct(id) {
      // this.$router.push(`/product-detail/` + id.slice(21));
      this.$router.push({ path: `/product-detail/` + id });
    },
  },
  mounted() {
    if (this.$route.fullPath == "/kids-categories") this.category = "kids";
    else if (this.$route.fullPath == "/men-categories") this.category = "men";
    else if (this.$route.fullPath == "/women-categories")
      this.category = "women";
    this.fetchProducts(this.category, 10, 3);
    console.log("this.$route", this.$route.fullPath);
  },
};
</script>
