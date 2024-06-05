<template>
  <div class="frame-error">
    <section id="error">
        <span>Maaf sepertinya meja anda nggak ada, coba scan lagi</span>
      <img src="~/assets/images/not_found_2.png" alt="" />
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
    localStorage.clear();

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
