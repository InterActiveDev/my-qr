<template>
  <Navbar :to="navbarTo" />
  <div>
    <section id="paymentFailed">
      <img
        src="~/assets/images/buble-top.png"
        class="buble-top"
        loading="lazy"
        preload
        alt=""
        srcset=""
      />
      <div class="wrapper">
        <div class="content">
          <img
            src="~/assets/images/illustration-payments-failed.png"
            loading="lazy"
            preload
            alt=""
            srcset=""
          />

          <div class="description">
            <h2>Pembayaran Gagal!</h2>
            <p>
              Pembayaran Anda gagal. Mohon ulangi proses pembayaran atau pilih
              metode pembayaran lain
            </p>
          </div>

          <div class="btn-group">
            <button class="btn btn-primary">
              COBA LAGI
            </button>
            <nuxt-link class="btn btn-outline-primary" to="/checkout">
              GANTI METODE PEMBAYARAN
            </nuxt-link>
          </div>
        </div>
      </div>
      <img
        src="~/assets/images/buble-bottom-right.png"
        class="buble-bottom"
        loading="lazy"
        preload
        alt=""
        srcset=""
      />
    </section>
  </div>
</template>

<script>
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
      navbarTo: "/checkout",
    };
  },
  mounted() {
  },
  methods: {
  },
});
</script>