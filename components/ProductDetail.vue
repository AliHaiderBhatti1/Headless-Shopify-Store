<template>
  <div>
    <v-progress-linear
      v-if="loader"
      indeterminate
      class="mt-4"
      color="teal acent-1"
    ></v-progress-linear>
    <div class="d-flex flex-wrap justify-center px-12 pt-12">
      <div style="min-width: 300px; max-width: 400px">
        <v-carousel v-if="getSingleProduct" :show-arrows="false">
          <v-carousel-item
            v-for="(item, i) in getSingleProduct?.images?.edges"
            :key="i"
            :src="item?.node?.originalSrc"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div style="max-width: calc(100% - 600px); min-width: 300px">
        <div class="d-flex justify-center">
          <h1>{{ getSingleProduct?.title }}</h1>
        </div>
        <div class="px-8">
          <div class="d-flex py-4">
            <h3>Price:</h3>
            <div class="mx-4" style="margin: 3px">
              {{ getSingleProduct && getProductAmount(getSingleProduct) }}
            </div>
            <v-chip
              v-if="!selectedSize?.availableForSale"
              class="white--text"
              color="black"
              >Out of stock</v-chip
            >
          </div>
          <div class="">
            <h3>Description</h3>
            <p>
              {{ getSingleProduct?.description }}
            </p>
          </div>
          <div v-if="getSingleProduct?.variants?.edges" class="pb-2">
            <h3>Sizes</h3>
            <div class="d-flex flex-wrap mt-2">
              <div
                v-for="item in getSingleProduct?.variants?.edges"
                :key="item.id"
                @click="
                  selectedSize = item.node;
                  quantity = 1;
                "
              >
                <v-chip
                  class="mx-2 pointer"
                  :color="
                    selectedSize?.id == item.node.id ? 'teal accent-1' : ''
                  "
                >
                  {{
                    item?.node?.title == "Default Title"
                      ? "Medium"
                      : item.node.title
                  }}
                </v-chip>
              </div>
            </div>
          </div>
          <div>
            <h3 class="py-1">Quantity</h3>
            <v-icon
              @click="setQunatity('decrease')"
              class="mr-2 pointer"
              :disabled="!selectedSize?.availableForSale"
              >mdi-minus</v-icon
            >
            {{ !selectedSize?.availableForSale ? 0 : quantity }}
            <v-icon
              @click="setQunatity('increase')"
              class="ml-2 pointer"
              :disabled="!selectedSize?.availableForSale"
              >mdi-plus</v-icon
            >
          </div>
        </div>

        <div class="d-flex justify-center py-4">
          <v-btn
            @click="addCartItems()"
            width="300px"
            color="teal accent-1"
            depressed
            :disabled="!selectedSize?.availableForSale"
          >
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
      loader: false, // Variable indicating whether data is being loaded
      quantity: 1, // Quantity of a product (default set to 1)
      selectedSize: null, // Selected size for a product (initially set to null)
      addedProducts: [], // Array to store added products
    };
  },
  computed: {
    ...mapState(useStore, ["getSingleProduct"]), // Getter to get the single product data
  },
  methods: {
    ...mapActions(useStore, [
      "fetchSingleProduct", // Method to fetch single product data using API
      "setAddedProducts", // Setter to set the products that user is going to buy
      "toggleCartDrawer", // Toggle the cart drawer
    ]),

    // Method to update the quantity based on the action (increase or decrease)
    setQunatity(value) {
      // Increase quantity by 1
      if (value == "increase") this.quantity++;
      // Decrease quantity by 1, but ensure it doesn't go below 1
      else if (this.quantity != 1 && "decrease") this.quantity--;
    },

    // Method to get the formatted product amount as "amount currencyCode"
    getProductAmount(item) {
      return (
        item?.variants?.edges[0]?.node?.priceV2?.amount +
        " " +
        item?.variants?.edges[0]?.node?.priceV2?.currencyCode
      );
    },

    // Method to add products to the cart based on the selected quantity
    addCartItems() {
      // Loop to add products to the cart array based on the selected quantity
      for (let i = 0; i < this.quantity; i++) {
        this.addedProducts.push(this.getSingleProduct);
      }

      // Update the state with the added products
      this.setAddedProducts(this.addedProducts);

      // Toggle the cart drawer to be visible
      this.toggleCartDrawer(true);

      // Reset the addedProducts array
      this.addedProducts = [];
    },
  },
  mounted() {
    // Get the product ID from the route parameters
    const id = this.$route.params.id;

    // Set loader to true to indicate that data is being loaded
    this.loader = true;

    // If there is a product ID, fetch the single product and set loader to false when done
    if (id) this.fetchSingleProduct(id, 3).finally(() => (this.loader = false));
  },
  watch: {
    // Update the selected size based on the received single product data
    getSingleProduct(value) {
      this.selectedSize = value?.variants?.edges[0]?.node;
    },
  },
};
</script>
