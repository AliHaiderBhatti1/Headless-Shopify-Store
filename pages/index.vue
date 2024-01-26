<template>
  <div>
    <HeroBanner />
    <FeaturedProducts />
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  components: {
    HeroBanner: () => import(`~/components/HeroBanner.vue`),
    FeaturedProducts: () => import(`~/components/FeaturedProducts.vue`),
  },
};
</script>
