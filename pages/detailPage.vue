<template>
    <div>
      <ProductDetail />
    </div>
  </template>
  
  <script>
  export default {
    name: "DetailPage",
    components: {
      ProductDetail: () => import(`~/components/ProductDetail.vue`),
    },
  };
  </script>