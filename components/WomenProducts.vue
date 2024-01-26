<template>
    <div style="margin-top: 20px; padding-left: 70px; padding-right: 70px">
      <h2>Women Products</h2>
      <div class="d-flex flex-wrap justify-center align-center">
        <v-hover
          v-for="item in items"
          :key="item.id"
          v-slot="{ hover }"
          close-delay="200"
          class="mx-3"
        >
          <div @click="$router.push(`/women-categories/${item.id}`)">
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
                  :src="hover ? item.frontView : item.sideView"
                  style="object-fit: contain; width: 100%; height: 300px"
                />
              </v-card-text>
            </v-card>
            <div class="d-flex justify-center mt-2">
              <div class="pointer text-body-1">{{ item.name }}</div>
            </div>
            <div class="d-flex justify-center">
              <div class="pointer text-body-2">{{ item.price }}</div>
            </div>
          </div>
        </v-hover>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "WomenCategories",
    data() {
      return {
        items: [
          {
            id: 1,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
          {
            id: 2,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
          {
            id: 3,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
          {
            id: 4,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
          {
            id: 5,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
          {
            id: 6,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
          {
            id: 7,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
          {
            id: 8,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
          {
            id: 9,
            frontView: require("@/assets/images/red_shirt_front.webp"),
            sideView: require("@/assets/images/red_shirt.webp"),
            name: "Red Shirt",
            price: "Rs. 3,199 PKR",
          },
        ],
      };
    },
  };
  </script>
  