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
            v-for="(item, i) in selectedValues?.length
              ? [getSelectedVariant?.node?.image?.originalSrc]
              : getSingleProduct?.images?.edges"
            :key="i"
            :src="selectedValues?.length ? item : item?.node?.originalSrc"
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
              v-if="
                selectedValues?.length
                  ? !getSelectedVariant?.node?.availableForSale
                  : false
              "
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
          <div class="pb-2">
            <div v-for="(item, index) in requiredOptions" :key="index">
              <div v-for="(values, key) in item" :key="key">
                <h3 class="mt-2">{{ key }}</h3>
                <div class="d-flex flex-wrap mt-2">
                  <div v-for="(chip, index) in values" :key="index">
                    <v-chip
                      class="mx-2 my-1 pointer"
                      :color="checkSelected(chip) ? 'teal accent-1' : ''"
                      @click="getSelectedValues(chip, key)"
                    >
                      {{ chip }}
                    </v-chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="py-1">Quantity</h3>
            <v-icon
              @click="setQunatity('decrease')"
              class="mr-2 pointer"
              :disabled="!getSelectedVariant?.node?.availableForSale"
              >mdi-minus</v-icon
            >
            {{ !getSelectedVariant?.node?.availableForSale ? 0 : quantity }}
            <v-icon
              @click="setQunatity('increase')"
              class="ml-2 pointer"
              :disabled="!getSelectedVariant?.node?.availableForSale"
              >mdi-plus</v-icon
            >
          </div>
        </div>

        <div class="d-flex justify-center py-4">
          <v-tooltip :disabled="!checkValidation" bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn
                  @click="addCartItems()"
                  width="300px"
                  color="teal accent-1"
                  depressed
                  :disabled="checkValidation"
                >
                  <v-icon class="mx-2" medium>mdi-cart</v-icon>
                  Add to cart
                </v-btn>
              </div>
            </template>
            <span>
              {{
                selectedValues?.length != requiredOptions?.length
                  ? validationMessage()
                  : !getSelectedVariant?.node?.availableForSale
                  ? "Out of stock"
                  : ""
              }}
            </span>
          </v-tooltip>
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
      addedProducts: [], // Array to store added products
      requiredOptions: [],
      selectedValues: [],
      selectedVariant: null,
    };
  },
  computed: {
    ...mapState(useStore, ["getSingleProduct"]), // Getter to get the single product data

    // Getter to get the selected variant based on selected options
    getSelectedVariant() {
      if (this.selectedValues) {
        this.selectedVariant = this.getSingleProduct?.variants?.edges?.find(
          (item) =>
            // Check if all selected parameters match variant's selected options
            this.selectedValues.every((param) =>
              item?.node?.selectedOptions.some(
                (option) =>
                  option.name === Object.keys(param)[0] &&
                  option.value === param[Object.keys(param)[0]]
              )
            )
        );
        return this.selectedVariant;
      }
    },

    // Getter to check validation based on selected values and variant availability
    checkValidation() {
      return (
        // Check if the number of selected values is not equal to the required number
        this.selectedValues?.length != this.requiredOptions?.length ||
        // Check if the selected variant is not available for sale
        !this.getSelectedVariant?.node?.availableForSale
      );
    },
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
        // this.addedProducts.push(this.getSingleProduct);
        this.addedProducts.push({
          ...this.getSelectedVariant.node,
          title: this.getSingleProduct.title,
        });
      }

      // // Update the state with the added products
      this.setAddedProducts(this.addedProducts);

      // Toggle the cart drawer to be visible
      this.toggleCartDrawer(true);

      // Reset the addedProducts array
      this.addedProducts = [];
    },

    // Method to update selected values array based on the options
    getSelectedValues(chip, key) {
      const newObj = { [key]: chip };
      const index = this.selectedValues.findIndex(
        (obj) => Object.keys(obj)[0] === Object.keys(newObj)[0]
      );
      // Update existing value or add new value to selectedValues array
      if (index !== -1) this.selectedValues.splice(index, 1, newObj);
      else this.selectedValues.push(newObj);
    },

    // Method to highlight a specific option is selected among the selected values
    checkSelected(chip) {
      if (!this.selectedValues) return;
      const validate = !!this.selectedValues
        .map((obj) => Object.values(obj)[0])
        .find((item) => item == chip);
      return validate;
    },

    // Method to generate a validation message based on required and selected options
    validationMessage() {
      let msg;
      let requiredOptions = [];
      if (this.requiredOptions?.length)
        for (let item of this.requiredOptions) {
          requiredOptions = requiredOptions.concat(Object.keys(item));
        }
      let selectedArray = [];
      if (this.selectedValues?.length)
        for (let item of this.selectedValues) {
          selectedArray = selectedArray.concat(Object.keys(item));
        }
      let filteredArray = requiredOptions.filter(
        (x) => !selectedArray.includes(x)
      );
      if (filteredArray.length >= 2)
        msg = `Please select the ${
          filteredArray.slice(0, filteredArray.length - 1).join(", ") +
          " " +
          "and " +
          filteredArray.slice(-1)
        }.`;
      else msg = `Please select the ${filteredArray[0]}.`;
      return msg;
    },
  },
  mounted() {
    // Get the product ID from the route parameters
    const id = this.$route.params.id;

    // Set loader to true to indicate that data is being loaded
    this.loader = true;

    // If there is a product ID, fetch the single product and set loader to false when done
    if (id) this.fetchSingleProduct(id, 5).finally(() => (this.loader = false));
  },
  watch: {
    // Update the selected size based on the received single product data
    getSingleProduct(obj) {
      if (obj) {
        let resultObj = {};
        // Iterate over the array and populate the resultObj
        obj?.variants?.edges.forEach((item) => {
          item?.node?.selectedOptions.forEach((option) => {
            if (!resultObj[option.name]) resultObj[option.name] = [];
            if (!resultObj[option.name].includes(option.value))
              resultObj[option.name].push(option.value);
          });
        });
        // Transform resultObj into the desired format
        this.requiredOptions = Object.keys(resultObj).map((key) => ({
          [key]: resultObj[key],
        }));
      }
    },
  },
};
</script>
