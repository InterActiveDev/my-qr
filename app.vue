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
    <NuxtPage />
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeoutId: null,
      intervalId: null,
    };
  },
  mounted() {
    document.addEventListener("touchmove", this.preventPinchZoom, {
      passive: false,
    });
    document.addEventListener("contextmenu", this.preventContextMenu);
    this.startCartCheckTimer();
  },
  beforeDestroy() {
    document.removeEventListener("touchmove", this.preventPinchZoom);
    document.removeEventListener("contextmenu", this.preventContextMenu);
    this.stopCartCheckTimer();
  },
  methods: {
    preventPinchZoom(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    },
    preventContextMenu(event) {
      event.preventDefault();
    },
    startCartCheckTimer() {
      this.stopCartCheckTimer(); // Stop any existing timer

      this.intervalId = setInterval(() => {
        if (localStorage.getItem("cart_items")) {
          this.timeoutId = setTimeout(() => {
            localStorage.removeItem("cart_items");
            console.log("cart_items removed after 20 minute");
          }, 2 * 60 * 60 * 20000); // 1 minute
        }
      }, 1000); // Check every second
    },
    stopCartCheckTimer() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
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
