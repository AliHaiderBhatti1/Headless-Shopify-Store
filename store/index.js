import { defineStore } from "pinia";
import { getProducts } from "../queries/productsQuery";
import { getSingleProduct } from "../queries/singleProductQuery";

export const useStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      products: [], // State to store a list of products.
      singleProduct: null, // State to store information about a single product.
      addedProducts: [], // Satte to store products that have been added to the cart.
      cartDrawer: false, //  State variable indicating whether the cart drawer is open or closed.
      snackbarFlag: false, // State variable indicating whether a snackbar notification should be displayed.
      snackbarMsg: null, // State to store the message content for the snackbar notification.
    };
  },
  getters: {
    getAllProducts: (state) => state.products, // Getter to get all products stored in the state.
    getSingleProduct: (state) => state.singleProduct, // Getter to get information about a single product stored in the state.
    getAddedProducts: (state) => state.addedProducts, // Getter to get the array of products that have been added to the cart.
    getCartDrawerValue: (state) => state.cartDrawer, // Getter to get the boolean value indicating whether the cart drawer is open or closed.
    getSnackbarFlag: (state) => state.snackbarFlag, // Getter to get the boolean value indicating whether a snackbar notification should be displayed.
    getErrorMsg: (state) => state.snackbarMsg, // Getter to get the content of the snackbar message, which is typically an error message.
  },
  actions: {
    // Setter to set products
    setProducts(value) {
      this.products = value;
    },

    // Setter to set single product value
    setSingleProduct(value) {
      this.singleProduct = value;
    },

    // Set Added Products
    setAddedProducts(value) {
      this.addedProducts = [...this.addedProducts, ...value];
      const array = [];

      this.addedProducts.forEach((item) => {
        const existingItem = array.find((x) => x.id === item.id);

        if (existingItem) existingItem.count += item.count || 1;
        else array.push({ ...item, count: item.count || 1 });
      });

      this.addedProducts = array;
    },

    // Method to remove the added item from the cart
    removeProduct(value) {
      this.addedProducts = this.addedProducts.filter(
        (_, index) => index != value
      );
    },

    // Change quantity cart items
    changeQuantityItems(obj, value) {
      const index = this.addedProducts.findIndex((item) => item.id == obj.id);
      if (index != -1) {
        if (value == "decrease")
          Object.assign(this.addedProducts[index], {
            ...this.addedProducts[index],
            count: (this.addedProducts[index].count || 0) - 1,
          });
        else if (value == "increase")
          Object.assign(this.addedProducts[index], {
            ...this.addedProducts[index],
            count: (this.addedProducts[index].count || 0) + 1,
          });
      }
    },

    // Toggle cart drawer
    toggleCartDrawer(value) {
      this.cartDrawer = value;
    },

    // Trigger snackbar to display error msg
    setSnackbarMsg(value) {
      this.snackbarFlag = true;
      this.snackbarMsg = value;
    },

    // Action used to call products
    fetchProducts(collection, numOfItems, imagesPerItem) {
      return new Promise((resolve, reject) => {
        getProducts(collection, numOfItems, imagesPerItem)
          .then((res) => {
            this.setProducts(res?.data?.collectionByHandle?.products?.edges);
            resolve(res);
          })
          .catch((err) => {
            this.setSnackbarMsg(err.response.data.errors[0]?.extensions?.code);
            reject(er);
          });
      });
    },

    // Action to call Single Product
    fetchSingleProduct(productId, imagesPerItem) {
      return new Promise((resolve, reject) => {
        getSingleProduct(productId, imagesPerItem)
          .then((res) => {
            this.setSingleProduct(res.data.product);
            resolve(res);
          })
          .catch((err) => {
            this.setSnackbarMsg(err.response.data.errors[0]?.extensions?.code);
            reject(err);
          });
      });
    },
  },
});
