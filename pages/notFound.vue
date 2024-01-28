<template>
  <div>
    <NotFound />
  </div>
</template>

<script>
export default {
  name: "ContactUsPage",
  components: {
    NotFound: () => import(`~/components/NotFound.vue`),
  },
};
</script>
