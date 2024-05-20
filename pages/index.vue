<template>
  <Navbar :to="navbarTo" />
  <div>
    <section id="menu" :style="{ backgroundImage: `url(${background})` }">
      <div class="card-tap-order" @click="openModalMenu">
        <img src="~/assets/icons/icons-tap.png" />
        <p>Tap here to Order</p>
      </div>

      <dialog id="modalMenu" class="modal">
        <div class="modal-box" role="dialog">
          <div class="logo">
            <img src="~/assets/images/gacoan.png" alt="" />
          </div>

          <h3>Pilih Jenis Pesanan</h3>

          <div class="row-item">
            <div
              v-for="(order, index) in orderType"
              :key="index"
              class="item"
              @click="typeOrder(order)"
            >
              <img
                v-if="order.code_type === 0"
                src="~/assets/images/dine-in.png"
              />
              <img
                v-else-if="order.code_type === 1"
                src="~/assets/images/take-away.png"
              />
              <img v-else src="~/assets/images/take-away.png" />

              <div class="content">
                <span>{{ order.name }}</span>
                <p v-if="order.code_type === 0">
                  Makan disini bareng temen-temen, keluarga sambil menikmati
                  <br />
                  suasana
                </p>
                <p v-else-if="order.code_type === 1">
                  Makan diluar bareng temen-temen, keluarga sambil seru-seruan
                </p>
                <p v-else>Nikmati berbagai menu istimewa kami.</p>
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
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

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
      name: "",
      phone: "",
      typeOrders: "",
      orderType: [],
      table: "",
      errors: "",
      errorsTable: "",
      background: "",
    };
  },
  created() {
    this.getOrderType();

    // const userDataLog = this.getCookie("user-data-log");
    // if (!userDataLog) {
    //   this.$router.push("/backOffice");
    // }
  },
  mounted() {
    if (process.client) {
      this.getBackground();
      localStorage.removeItem("cart_items");
      localStorage.removeItem("checkoutData");
      localStorage.removeItem("numberTable");
      localStorage.removeItem("data_customer");
      localStorage.removeItem("type_order");
      localStorage.removeItem("qrContent");
    }
  },
  methods: {
    // getCookie(name) {
    //   const cookieName = name + "=";
    //   const cookies = document.cookie.split(";");
    //   for (let i = 0; i < cookies.length; i++) {
    //     let cookie = cookies[i];
    //     while (cookie.charAt(0) === " ") {
    //       cookie = cookie.substring(1);
    //     }
    //     if (cookie.indexOf(cookieName) === 0) {
    //       return cookie.substring(cookieName.length, cookie.length);
    //     }
    //   }
    //   return null;
    // },
    getBackground() {
      if (process.client) {
        const background = JSON.parse(
          localStorage.getItem("background") || "[]"
        );
        const appid = JSON.parse(
          localStorage.getItem("data_restaurant") || "[]"
        );
        if (background && background.length > 0) {
          this.background =
            `https://cloud.interactive.co.id/myprofit/uploads/img_slider/` +
            appid.appid +
            `/` +
            background[0].filename;
        } else {
          this.background =
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="0" y="0" width="100%" height="100%" fill="%23f3f3f3" /%3E%3C/svg%3E';
        }
      } else {
        this.background =
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="0" y="0" width="100%" height="100%" fill="%23f3f3f3" /%3E%3C/svg%3E';
      }
    },
    filterName() {
      this.name = this.name.replace(/[^a-zA-Z\s]/g, "");
    },
    async getOrderType() {
      if (process.client) {
        this.orderType = JSON.parse(localStorage.getItem("order_type"));
      }
    },
    typeOrder(order) {
      if (process.client) {
        if (order.code_type === 0) {
          localStorage.setItem("type_order", JSON.stringify(order));
        } else if (order.code_type === 1) {
          localStorage.setItem("type_order", JSON.stringify(order));
        } else {
          alert("Order type not found");
        }
      }

      this.typeOrders = order.code_type;
      this.openModalData();
      this.closeModalMenu();
    },
    openModalMenu() {
      let modal = document.getElementById("modalMenu");
      modal.showModal();

      setTimeout(() => {
        modal.close();
      }, 120000);
    },
    goToHome() {
      const dataCustomer = {
        table: this.table,
        name: this.name,
        phone: this.phone,
      };

      if (process.client) {
        localStorage.setItem("data_customer", JSON.stringify(dataCustomer));
      }

      if (this.typeOrders !== 1) {
        if (this.table === "" && this.name === "") {
          this.errors = "Isi nama anda dahulu";
          this.errorsTable = "Isi nomor meja dahulu";
        } else if (this.table === "") {
          this.errorsTable = "Isi nomor meja dahulu";
        } else if (this.name === "") {
          this.errors = "Isi nama anda dahulu";
        } else {
          this.$router.push("/home");
        }
      } else {
        this.name === ""
          ? (this.errors = "Isi nama anda dahulu")
          : this.$router.push("/home");
      }
    },
    closeModalMenu() {
      let modal = document.getElementById("modalMenu");
      modal.close();
    },
    openModalData() {
      let modal = document.getElementById("modalInformationData");
      modal.showModal();

      setTimeout(() => {
        modal.close();
      }, 120000);
    },
  },
});
</script>
