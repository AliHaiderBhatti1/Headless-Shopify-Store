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
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: "FeaturedProducts",
  data() {
    return {
      groupSize: 3,
      items: [
        {
          id: 1,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
        {
          id: 2,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
        {
          id: 3,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
        {
          id: 4,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
        {
          id: 5,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
        {
          id: 6,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
        {
          id: 7,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
        {
          id: 8,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
        {
          id: 9,
          frontView: require("@/assets/images/trouser.webp"),
          sideView: require("@/assets/images/trouser1.webp"),
          name: "White Black Trousers",
          price: "Rs. 3,199 PKR",
        },
      ],
    };
  },
  methods: {
    calculateGroupSize() {
      const container = document.getElementById("feature-product-container");
      if (!container) return;

      const containerWidth = container.clientWidth;
      if (containerWidth <= 400) return (this.groupSize = 1);
      console.log("containerWidth", containerWidth);
      this.groupSize = Math.floor(containerWidth / 260);
    },
  },
  created() {
    if (process.browser)
      window.addEventListener("resize", this.calculateGroupSize);
  },
  mounted() {
    this.calculateGroupSize();
  },
  destroyed() {
    if (process.browser)
      window.removeEventListener("resize", this.calculateGroupSize);
  },
  computed: {
    itemCarousels() {
      const groups = [];

      for (let i = 0; i < this.items.length; i += this.groupSize) {
        groups.push(this.items.slice(i, i + this.groupSize));
      }

      return groups;
    },
  },
};
</script>
