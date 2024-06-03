<template>
  <div>
    <div class="flex justify-center">
      <div class="frame-qris">
        <Navbar />
        <section id="menu">
          <span>Halaman Tidak ditemukan</span>
          <img
            src="~/assets/images/not_found_2.png"
            alt="Logo"
          />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  component: {
    Navbar,
  },
  created() {
    const locId = this.$route.params.id;

    // Set loc_id into local storage
    if (locId) {
      // localStorage.setItem("location", locId);
      // this.goToIndex();
    }
  },
  methods: {
    goToIndex() {
      // this.$router.push("/");
    },
    openModalMenu() {
      let modal = document.getElementById("modalMenu");
      modal.showModal();
    },
  },
});
</script>
