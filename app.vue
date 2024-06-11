<template>
  <div>
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <link rel="icon" type="image/png" href="/icon.png" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha384-cO/b1mfj7PQ5I+C0jfKqBt5LHPdfZVOuJrwEh2O1M6k+U1+Bz6Y1l+LjG+QhiQLf"
        crossorigin="anonymous"
      />
    </head>
    <VitePwaManifest />
    <!-- <div @touchstart="resetTimer"> -->
    <!-- <div class="flex justify-center"> -->
    <NuxtPage />
    <!-- </div> -->
    <!-- </div> -->
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
    document.addEventListener("gesturestart", function (e) {
    	e.preventDefault();
        document.body.style.zoom = 0.99;
    });
    document.addEventListener("gesturechange", function (e) {
    	e.preventDefault();
    
      document.body.style.zoom = 0.99;
    });
    document.addEventListener("gestureend", function (e) {
    	  e.preventDefault();
        document.body.style.zoom = 1;
    });
    document.addEventListener("contextmenu", this.preventContextMenu);
  },
  beforeDestroy() {
    document.removeEventListener("gesturestart", this.preventGesture);
    document.removeEventListener("gesturechange", this.preventGesture);
    document.removeEventListener("gestureend", this.preventGesture);
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
    preventGesture(event) {
      event.preventDefault();
    },
    preventContextMenu(event) {
      event.preventDefault();
    },
    resetTimer() {
      clearTimeout(this.timeoutId);
      const location = localStorage.getItem("location");

      this.navbarTo = "/restaurant/detail/" + location;
      this.timeoutId = setTimeout(() => {
        localStorage.removeItem("cart_items");
        localStorage.removeItem("type_order");
        localStorage.removeItem("checkoutData");
        localStorage.removeItem("data_customer");
        localStorage.removeItem("qrContent");
        this.$router.push(this.navbarTo);
      }, 25 * 60 * 1000);
    },
  },
};
</script>


<style lang="scss">
html {
  touch-action: pan-y;
}
@import "@/assets/scss/style.scss";
</style>
