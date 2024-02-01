<template>
  <v-app dark>
    <v-navigation-drawer :value="drawer" fixed>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app class="bg-black">
      <v-app-bar-nav-icon v-if="largeScreens" @click="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
        </v-btn> -->
      <!-- <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn> -->
      <div
        v-if="!largeScreens"
        style="min-width: 760px"
        class="d-flex justify-space-around"
      >
        <span class="pointer" @click="$router.push('/')"> Home </span>
        <span class="pointer" @click="$router.push('/men-categories')">
          Men
        </span>
        <span class="pointer" @click="$router.push('/women-categories')">
          Women
        </span>
        <span class="pointer" @click="$router.push('/kids-categories')">
          Kids
        </span>
        <span class="pointer" @click="$router.push('/contact-us')">
          Contact Us</span
        >
        <v-snackbar
          :value="getSnackbarFlag"
          class="mt-5"
          top
          right
          color="red lighten-5"
          light
          timeout="5000"
        >
          <span class="red--text"> {{ getErrorMsg }}</span>
          <template #action="{ attrs }">
            <v-btn
              color="red"
              text
              v-bind="attrs"
              small
              fab
              @click="snackbar = false"
            >
              <v-icon small> mdi-close-circle </v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </div>
      <v-spacer />
      <v-btn class="mx-3" icon @click="toggleCartDrawer(true)">
        <v-icon>mdi-cart</v-icon>
        <v-badge
          v-if="getAddedProducts?.length"
          class="mb-2"
          color="teal acent-1"
          :content="getTotalAddedProducts"
        >
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      :width="325"
    >
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon @click="toggleCartDrawer(false)"> mdi-close </v-icon>
          </v-list-item-action>
          <v-list-item-title>Added Products</v-list-item-title>
        </v-list-item>
        <div v-if="getAddedProducts?.length" class="px-2">
          <v-card
            v-for="(item, index) in getAddedProducts"
            :key="index"
            class="mx-4 my-4"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-subtite-2 mb-4">
                  {{ getProductAmount(item) }}
                </div>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-list-item-title v-on="on" class="text-h6 mb-1">
                      {{ item.title }}
                    </v-list-item-title>
                  </template>
                  <span> {{ item.title }}</span>
                </v-tooltip>
              </v-list-item-content>

              <img class="mt-2" :src="item?.image?.originalSrc" height="100" />
            </v-list-item>

            <div
              v-for="(val, index) in item?.selectedOptions"
              :key="index"
              class="mx-3"
            >
              <div class="d-flex justify-space-between">
                <span class="mt-2 text-body-2">{{ val.name }}</span>
                <v-chip small class="mx-2 mt-2" color="teal accent-1">
                  {{ val.value }}
                </v-chip>
              </div>
              <div class="d-flex flex-wrap mt-2">
                <!-- <div v-for="(chip, index) in values" :key="index">
                    <v-chip
                      class="mx-2 my-1 pointer"
                      :color="checkSelected(chip) ? 'teal accent-1' : ''"
                      @click="getValue(chip, key)"
                    >
                      {{ chip }}
                    </v-chip>
                  </div> -->
              </div>
            </div>
            <div class="d-flex justify-space-between mx-3 my-2">
              <v-icon @click="removeProduct(index)">mdi-delete-outline</v-icon>
              <div>
                <span class="text-body-2">Quantity</span>
                <v-icon
                  class="mr-2 pointer"
                  :disabled="item.count == 1"
                  @click="changeQuantityItems(item, 'decrease', item.count - 1)"
                  >mdi-minus</v-icon
                >
                {{ item.count }}
                <v-icon
                  class="ml-2 pointer"
                  @click="changeQuantityItems(item, 'increase', item.count + 1)"
                  >mdi-plus</v-icon
                >
              </div>
            </div>
            <div v-if="checkValidation(item.id)" class="text-red px-2">
              {{
                item?.quantityAvailable === 1
                  ? "Only 1 item is available!"
                  : item?.quantityAvailable > 1
                  ? `Only ${item?.quantityAvailable} items are available!`
                  : ""
              }}
            </div>
          </v-card>
          <div class="text-subtitle-2 mx-4 my-2">
            Estimated Total: {{ estimatedTotal }}
          </div>
        </div>
        <div v-else style="height: calc(100vh - 120px)"></div>

        <div class="d-flex justify-center">
          <v-tooltip :disabled="!!getAddedProducts?.length" bottom>
            <template v-slot:activator="{ on }">
              <div v-on="on">
                <v-btn
                  :disabled="!getAddedProducts?.length || loader"
                  width="260px"
                  color="teal accent-1"
                  class="mx-3"
                  depressed
                  @click="redirectToShopifyCheckout"
                >
                  Proceed to checkout
                  <v-progress-circular
                    v-if="loader"
                    size="20"
                    width="2"
                    color="black"
                    class="mx-2"
                    indeterminate
                  ></v-progress-circular>
                </v-btn></div
            ></template>
            <span>Please select any item</span>
          </v-tooltip>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useStore } from "../store/index";
import { checkoutQuery } from "../queries/checkoutQuery";
export default {
  name: "DefaultLayout",
  data() {
    return {
      loader: false, // Indicates whether data is being loaded
      clipped: false, // Controls whether the app bar is clipped
      drawer: false, // Controls the main drawer visibility
      fixed: false, // Controls whether the app bar is fixed
      snackbar: false, // Controls the snackbar visibility
      items: [
        // Navigation items with icons, titles, and corresponding routes
        {
          icon: "mdi-apps",
          title: "Home",
          to: "/",
        },
        {
          icon: "mdi-human-male",
          title: "Men",
          to: "/men-categories",
        },
        {
          icon: "mdi-human-female",
          title: "Women",
          to: "/women-categories",
        },
        {
          icon: "mdi-teddy-bear",
          title: "Kids",
          to: "/kids-categories",
        },
        {
          icon: "mdi-account-box",
          title: "Contact Us",
          to: "/contact-us",
        },
      ],
      miniVariant: false, // Controls whether the drawer is in mini variant mode
      right: true, // Positions the drawer on the right side
      rightDrawer: false, // Controls the visibility of the right drawer
    };
  },
  computed: {
    ...mapState(useStore, [
      "getAddedProducts", // Getter to get all added products in cart
      "getCartDrawerValue", // Get the cart drawer value (true or false)
      "getSnackbarFlag", // Get snackbar flag value (true or false)
      "getErrorMsg", // Getter to get error message from API
      "getErrorArray",
    ]),

    estimatedTotal() {
      // Calculate the estimated total cost of added products in the cart
      let totalCost = 0;
      for (let item of this.getAddedProducts) {
        totalCost = totalCost + item.count * parseInt(item?.priceV2?.amount);
      }
      return totalCost;
    },

    largeScreens() {
      // Check if the screen size is considered large
      return this.$breakpoints.sLg;
    },

    getTotalAddedProducts() {
      // Calculate the total count of added products in the cart
      let count = 0;
      for (let item of this.getAddedProducts) {
        count = count + (item.count || 1);
      }
      return count;
    },

    checkValidation() {
      return (id) => !!this.getErrorArray.find((item) => item === id);
    },
  },
  methods: {
    ...mapActions(useStore, [
      "removeProduct", // Method to remove product from the cart
      "toggleCartDrawer", // Toggle the cart drawer
      "setAddedProducts", // Method to set all the products are buying add in the cart
      "changeQuantityItems", // Increase or decrease the quantity of the item
    ]),

    getProductAmount(item) {
      // Get the formatted product amount as "amount currencyCode"
      return item?.priceV2?.amount + " " + item?.priceV2?.currencyCode;
    },

    redirectToShopifyCheckout() {
      // Set loader to true to indicate that data is being loaded
      this.loader = true;
      const cartItems = this.getAddedProducts.map((item) => ({
        variantId: item.id,
        quantity: item.count,
      }));

      // Execute checkoutQuery() and set loader to false when done
      checkoutQuery(cartItems).finally(() => (this.loader = false));
    },
  },
  watch: {
    getCartDrawerValue(value) {
      this.rightDrawer = value;
    },

    rightDrawer(value) {
      this.toggleCartDrawer(value);
    },
  },
};
</script>
<style scoped>
.bg-black {
  background-color: black;
}
</style>
