<template>
  <div>
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <link rel="icon" type="image/png" href="/icon.png" />
    </head>
    <VitePwaManifest />
    <div @touchstart="resetTimer">
      <NuxtPage />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeoutId: null,
    };
  },
  mounted() {
    document.addEventListener("contextmenu", this.preventContextMenu);
  },
  beforeDestroy() {
    document.removeEventListener("contextmenu", this.preventContextMenu);
  },
  destroyed() {
    clearTimeout(this.timeoutId);
  },
  watch: {
    $route(to, from) {
      this.resetTimer();
    },
  },
  methods: {
    preventContextMenu(event) {
      event.preventDefault();
    },
    resetTimer() {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        localStorage.removeItem("cartItems");
        localStorage.removeItem("type_order");
        localStorage.removeItem("checkoutData");
        localStorage.removeItem("data_customer");
        localStorage.removeItem("qrContent");
        this.$router.push("/home");
      }, 2 * 60 * 1000);
    },
  },
};
</script>


<style lang="scss">
@import "@/assets/scss/style.scss";
</style>