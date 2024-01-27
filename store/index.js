import { defineStore } from "pinia";
import { getProducts } from "../services/productsQuery";
import { getSingleProduct } from "../services/singleProductQuery";

export const useStore = defineStore("storeId", {
  // arrow function recommended for full type inference
  state: () => {
    return {
      products: [],
      singleProduct: null,
    };
  },
  getters: {
    getAllProducts: (state) => state.products,
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
    // Action used to call products
    fetchProducts(collection, numOfItems, imagesPerItem) {
      getProducts(collection, numOfItems, imagesPerItem)
        .then((res) =>
          this.setProducts(res?.data?.collectionByHandle?.products?.edges)
        )
        .catch((err) => console.log("err", err));
    },

    // Action to call Single Product
    fetchSingleProduct(productId, imagesPerItem) {
      getSingleProduct(productId, imagesPerItem).then((res) => {
        console.log("single -->", res.data);
      });
    },
  },
});
