<template>
    <div>
      <WomenProducts />
    </div>
  </template>
  
  <script>
  export default {
    name: "WomenCategories",
    components: {
      WomenProducts: () => import(`~/components/WomenProducts.vue`),
    },
  };
  </script>