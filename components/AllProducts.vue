<template>
  <div class="px-16 pt-5">
    <h2 class="text-capitalize">{{ category }} Products</h2>
    <v-progress-linear
      v-if="loader"
      indeterminate
      color="teal acent-1"
    ></v-progress-linear>
    <div class="mt-3 d-flex flex-wrap justify-end">
      <div style="max-width: 300px">
        <v-text-field
          v-model="searchByTitle"
          label="Search by title"
          hide-details
          outlined
          dense
        ></v-text-field>
      </div>
      <div class="d-flex">
        <span class="mt-2 mx-2">Sort by:</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <div v-on="on" v-bind="attrs" class="ml-2 mt-2">
              {{ sortingOrder ? sortingOrder.title : "Not Selected" }}
              <v-icon>mdi-menu-down</v-icon>
            </div>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              class="pointer"
              @click="sortingOrder = item"
              :class="sortingOrder?.value == item.value && 'bg-selected'"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
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
    <div
      v-else
      class="d-flex flex-wrap justify-center align-center"
      style="height: calc(100vh - 200px)"
    >
      No products found.
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useStore } from "../store/index";
export default {
  data() {
    return {
      // Initial state variables
      loader: false, // Indicates whether data is being loaded
      category: null, // Selected category filter includes (men, women, kids)
      searchByTitle: null, // Search filter based on product title
      sortingOrder: null, // Sorting order for product display
      items: [
        // Sorting options for dropdown
        { title: "Alphabetically A-Z", value: "ascending" },
        { title: "Alphabetically Z-A", value: "descending" },
        { title: "Price, low to high", value: "asc" },
        { title: "Price, high to low", value: "desc" },
      ],
    };
  },
  computed: {
    ...mapState(useStore, ["getAllProducts"]), // Getter to get all the products to the specific category

    // Filter the items according to the filter selected
    filteredProducts() {
      const allProducts = [...this.getAllProducts];

      if (this.searchByTitle) {
        const searchLowerCase = this.searchByTitle.toLowerCase();
        return allProducts.filter((item) =>
          item.node.title
            ? item.node.title.toLowerCase().includes(searchLowerCase)
            : false
        );
      }

      if (
        this.sortingOrder?.value === "ascending" ||
        this.sortingOrder?.value === "descending"
      ) {
        return allProducts.sort((a, b) => {
          const nameA = a.node.title.toLowerCase();
          const nameB = b.node.title.toLowerCase();
          if (this.sortingOrder?.value === "ascending")
            return nameA.localeCompare(nameB);
          else return nameB.localeCompare(nameA);
        });
      }

      if (
        this.sortingOrder?.value === "asc" ||
        this.sortingOrder?.value === "desc"
      ) {
        return allProducts.sort((a, b) => {
          const priceA = a.node.variants.edges[0]?.node.priceV2.amount || 0;
          const priceB = b.node.variants.edges[0]?.node.priceV2.amount || 0;
          if (this.sortingOrder?.value == "asc") return priceA - priceB;
          else return priceB - priceA;
        });
      }

      return allProducts;
    },
  },
  methods: {
    ...mapActions(useStore, ["fetchProducts"]),

    // Function to get the product amount formatted as "amount currencyCode"
    getProductAmount(item) {
      return (
        item.node.variants.edges[0].node.priceV2.amount +
        " " +
        item.node.variants.edges[0].node.priceV2.currencyCode
      );
    },

    // Function to open the product detail page by navigating to the specified route
    openProduct(id) {
      this.$router.push({
        name: `ProductDetail`, // Assuming there is a route named "ProductDetail"
        params: { id }, // Passing the product id as a route parameter
      });
    },
  },
  mounted() {
    // Set loader to true to indicate that data is being loaded
    this.loader = true;

    // Get the full path of the current route
    const fullPath = this.$route.fullPath;

    // Determine the category based on the route path
    if (fullPath == "/kids-categories") this.category = "kids";
    else if (fullPath == "/men-categories") this.category = "men";
    else if (fullPath == "/women-categories") this.category = "women";

    // Check if the fullPath is available
    if (fullPath)
      // Fetch products based on category with a limit of 10 items and 3 images per item
      this.fetchProducts(this.category, 10, 3).finally(
        () => (this.loader = false)
      );
  },
};
</script>
<style scoped>
.bg-selected {
  background-color: #a7ffeb;
}
</style>
