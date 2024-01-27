<template>
  <div>
    <AllProducts />
  </div>
</template>

<script>
export default {
  name: "KidsCategories",
  components: {
    AllProducts: () => import(`~/components/AllProducts.vue`),
  },
};
</script>
