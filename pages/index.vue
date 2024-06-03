<template>
  <div>
    <div class="bg-white py-8 flex flex-col justify-center items-center">
      <img
      src="~/assets/icons/logo.png"
      loading="lazy"
      preload
      class="w-32"
      alt=""
      srcset=""
    />
    </div>
    <section id="menu" :style="{ backgroundImage: `url(${background})` }">

    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  component: {
    Navbar,
  },
  data() {
    return {
      navbarTo: "/index",
      background: "",
    };
  },
  created() {
    // 
  },
  mounted() {
    this.background = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="0" y="0" width="100%" height="100%" fill="%23f3f3f3" /%3E%3C/svg%3E';
    this.getBackground();
  },
  methods: {
    getBackground() {
      // this.background = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="0" y="0" width="100%" height="100%" fill="%23f3f3f3" /%3E%3C/svg%3E';
    },
  },
});
</script>
