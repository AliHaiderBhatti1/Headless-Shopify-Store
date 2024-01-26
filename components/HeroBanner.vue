<template>
  <div>
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.img"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <!-- <img src="../assets/images/banner.webp" class="img-banner" /> -->
  </div>
</template>

<script>
export default {
  name: "HeroBanner",
  data() {
    return {
      items: [
        { id: 1, img: require("@/assets/images/banner.webp") },
        { id: 2, img:require("@/assets/images/banner2.avif") },
        { id: 3, img:require("@/assets/images/banner3.avif") },
        { id: 4, img:require("@/assets/images/banner.webp") },
      ],
    };
  },
};
</script>
<style scoped>
.img-banner {
  width: 100%;
  height: 600px;
  object-fit: cover;
}
</style>
