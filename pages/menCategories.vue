<template>
  <div>
    <MenProducts />
  </div>
</template>

<script>
export default {
  name: "MenCategories",
  components: {
    MenProducts: () => import(`~/components/MenProducts.vue`),
  },
};
</script>