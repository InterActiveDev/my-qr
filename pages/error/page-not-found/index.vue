<template>
  <div class="frame-error">
    <section id="error">
      <h1 class="text-center">
        Silahkan scan ulang QR code.
      </h1>
      <img src="~/assets/images/not_found.png" alt="" />
    </section>
  </div>
  <!-- <div class="h-screen bg-white"></div> -->
</template>


<script>
export default defineComponent({
  component: {
    navbarTo: "/index",
  },
  mounted() {
    const locId = this.$route.params.id;
    if (locId) {
      localStorage.setItem("location", locId);
      this.goToIndex();
    }
  },
  methods: {
    goToIndex() {
      this.$router.push("/");
    },
    openModalMenu() {
      let modal = document.getElementById("modalMenu");
      modal.showModal();
    },
  },
});
</script>
