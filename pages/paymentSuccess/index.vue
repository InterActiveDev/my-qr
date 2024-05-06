<template>
  <Navbar :to="navbarTo" />
  <div>
    <section id="payment-done">
      <div class="wrapper">
        <div class="card-bill">
          <div class="content">
            <img
              src="~/assets/images/gacoan.png"
              loading="lazy"
              preload
              class="logo"
              alt=""
            />
            <img
              src="~/assets/images/illustration-payments.png"
              class="illustration"
              loading="lazy"
              preload
              alt=""
              srcset=""
            />

            <div class="description">
              <h2>Pembayaran berhasil</h2>
              <p>Nomor Transaksi : <span> SSR2384902-32</span></p>
            </div>
          </div>

          <div class="spacer-dashed"></div>

          <div class="content">
            <div class="table-number">
              <h2>Nomor Meja</h2>
              <span>{{ this.table.table }}</span>
            </div>
          </div>
        </div>

        <div class="information">
          <p class="description">
            Terimakasih telah melakukan transaksi. <br />
            Silahkan tunggu pesanan dimeja yang telah Anda input. <br />Enjoy
            your Food!
          </p>

          <button class="btn btn-primary" @click="toHome">PESAN LAGI</button>
          <span class="count-down">SELESAI ({{ countDown }} S)</span>

          <div class="carousel w-full">
            <div id="item1" class="carousel-item w-full">
              <NuxtImg
                provider="cloudinary"
                src="v1709535527/banner-1_pptqvt.webp"
                loading="lazy"
                preload
                class="w-full"
              />
            </div>
            <div id="item2" class="carousel-item w-full">
              <NuxtImg
                provider="cloudinary"
                src="v1709535527/banner-4_qxzpo5.webp"
                loading="lazy"
                preload
                class="w-full"
              />
            </div>
            <div id="item3" class="carousel-item w-full">
              <NuxtImg
                provider="cloudinary"
                src="v1709535527/banner-3_vbqsmy.webp"
                loading="lazy"
                preload
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="spacer"></div>
  </div>
  <Footer />
</template>

<script defer>
import { defineComponent } from "@vue/composition-api";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  component: {
    Navbar,
    Footer,
  },
  data() {
    return {
      countDown: 10,
      countDownInterval: null,
      navbarTo: "/receipt",
      table: "",
    };
  },
  mounted() {
    this.getTable();
    this.startCarousel();
    this.startCountDown();
  },
  methods: {
    getTable() {
      this.table = JSON.parse(localStorage.getItem("data_customer"));
    },
    startCountDown() {
      localStorage.removeItem("numberTable");
      localStorage.removeItem("numberTable");
      localStorage.removeItem("type_order");
      this.countDownInterval = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          clearInterval(this.countDownInterval);
          this.$router.push("/");
        }
      }, 1000);
    },
    startCarousel() {
      let currentItem = 1;
      setInterval(() => {
        const currentItemElement = document.getElementById(
          `item${currentItem}`
        );
        if (currentItemElement) {
          currentItemElement.style.display = "none";
        }
        currentItem = currentItem === 3 ? 1 : currentItem + 1;
        const nextItemElement = document.getElementById(`item${currentItem}`);
        // nextItemElement.style.display = "block";
      }, 1000);
    },
    toHome() {
      localStorage.removeItem("numberTable");
      localStorage.removeItem("numberTable");
      localStorage.removeItem("data_customer");
      localStorage.removeItem("type_order");
      this.$router.push("/");
    },
  },
});
</script>