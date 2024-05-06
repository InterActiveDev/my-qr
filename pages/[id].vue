<template>
  <Navbar :to="navbarTo" />
  <div>
    <section id="menu">
      <div class="card-tap-order" @click="openModalMenu">
        <img src="~/assets/icons/icons-tap.png" />
        <p>Tap here to Order</p>
      </div>

      <dialog id="modalMenu" class="modal">
        <div class="modal-box">
          <div class="logo">
            <img src="~/assets/images/gacoan.png" alt="" />
          </div>

          <h3>Pilih Jenis Pesanan</h3>

          <div class="row-item">
            <div class="item" @click="goToHome()">
              <img src="~/assets/images/dine-in.png" />
              <div class="content">
                <span>Dine In</span>
                <p>
                  Makan disini bareng temen-temen, keluarga sambil menikmati
                  <br />
                  susasana
                </p>
              </div>
            </div>
            <div class="item" @click="goToHome()">
              <img src="~/assets/images/take-away.png" />
              <div class="content">
                <span>Takeaway</span>
                <p>
                  Makan diluar bareng temen-temen, keluarga sambil seru-seruan
                </p>
              </div>
            </div>
          </div>

          <div class="warning">
            <p>
              Perhatian: Pemesanan makan di tempat dan take away tidak dapat
              dilakukan bersamaan. Silakan buat pesanan terpisah untuk setiap
              kategori.
            </p>
          </div>
        </div>
      </dialog>
    </section>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  component: {
    Navbar,
    navbarTo: "/index",
  },
  mounted() {
    const locId = this.$route.params.id;

    // Set loc_id into local storage
    if(locId){
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
