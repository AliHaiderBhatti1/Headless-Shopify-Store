<template>
  <div>
    <ContactUs />
  </div>
</template>

<script>
export default {
  name: "ContactUsPage",
  components: {
    ContactUs: () => import(`~/components/ContactUs.vue`),
  },
};
</script>
