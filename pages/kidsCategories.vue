<template>
    <div>
      <KidsProducts />
    </div>
  </template>
  
  <script>
  export default {
    name: "KidsCategories",
    components: {
      KidsProducts: () => import(`~/components/KidsProducts.vue`),
    },
  };
  </script>