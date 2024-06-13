<template>
  <section id="footer">
    <span>© {{ currentYear }}, InterActive. All rights reserved</span>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
