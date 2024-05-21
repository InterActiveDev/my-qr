<template>
  <div>
    <div class="flex justify-center">
      <div class="frame-receipt">
        <Navbar :to="navbarTo" />
        <section id="receipt">
          <div class="wrapper">
            <div class="content">
              <div class="head">
                <div class="logo">
                  <img src="~/assets/images/gacoan.png" alt="" />
                </div>

                <div class="title">
                  <span>GACOAN</span>
                  <p>Jl. Ambengan No 85</p>
                </div>
              </div>

              <div class="transactions-details">
                <div class="row">
                  <div class="items">
                    <span class="title">Pelanggan</span>
                    <span class="detail">Faris</span>
                  </div>
                  <div class="items">
                    <span class="title">Tanggal Order</span>
                    <span class="detail">Faris</span>
                  </div>
                </div>

                <div class="row">
                  <div class="items">
                    <span class="title">Tipe Order</span>
                    <span class="detail">Dine In</span>
                  </div>
                  <div class="items">
                    <span class="title">Meja</span>
                    <span class="detail">12</span>
                  </div>
                </div>

                <div class="row">
                  <div class="items">
                    <span class="title">Kode Transaksi</span>
                    <span class="detail">Faris</span>
                  </div>
                  <div class="items">
                    <span class="title">Waktu Transaksi</span>
                    <span class="detail">Faris</span>
                  </div>
                </div>

                <div class="row">
                  <div class="items">
                    <span class="title">Pembayaran</span>
                    <span class="detail">Faris</span>
                  </div>
                  <div class="items">
                    <span class="title">Status</span>
                    <span class="detail">Faris</span>
                  </div>
                </div>

                <span class="note"
                  >Silakan tunjukkan Kode Transaksi ini kepada Kasir untuk
                  menyelesaikan pesanan Anda.</span
                >
              </div>

              <div class="orders-details">
                <div class="title">
                  <span>Order Detail</span>
                </div>

                <div class="row">
                  <div class="items">
                    <div class="col-1">
                      <div class="qty">1x</div>
                      <div class="product">
                        <span>Ayam Woku</span>
                        <p>- tingkat kepedasan</p>
                        <p>sdsdsdsd</p>
                      </div>
                    </div>
                    <div class="col-2">Rp 30.000</div>
                  </div>
                </div>
                <div class="row">
                  <div class="items">
                    <div class="col-1">
                      <div class="qty">1x</div>
                      <div class="product">Ayam Woku</div>
                    </div>
                    <div class="col-2">Rp 30.000</div>
                  </div>
                </div>

                <div class="total">
                  <div class="title-total">Total</div>
                  <div class="price">Rp 60.000</div>
                </div>

                <div class="total-details">
                  <div class="row-total">
                    <div class="title-total">Sub Total</div>
                    <div class="price">Rp 60.000</div>
                  </div>
                  <div class="row-total">
                    <div class="title-total">Promo</div>
                    <div class="price">-Rp 10.000</div>
                  </div>
                  <div class="row-total">
                    <div class="title-total">Biaya layanan</div>
                    <div class="price">Rp 10.000</div>
                  </div>
                  <div class="row-total">
                    <div class="title-total">Rounding</div>
                    <div class="price">Rp 10.000</div>
                  </div>
                  <div class="row-total">
                    <div class="title-total-bold">Total Semua</div>
                    <div class="price-bold">Rp 100.000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bottom-nav-receipt">
            <div class="row-bottom-nav">
              <button class="btn btn-primary-outline" @click="backToHome">
                Pesan Lagi
              </button>
              <button class="btn btn-primary" @click="openModalCash">
                Bayar
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- modal nota cash -->
    <dialog id="modalNotaCash" class="modal">
      <div class="modal-box">
        <div class="description">
          <h2>
            Mohon tunjukkan Kode Transaksi ini kepada Kasir untuk
            penyelesaiannya memesan.
          </h2>
          <p>
            Kode transaksi :
            <span class="no-nota">HL-3365G- 664AADA07D6FE</span>
          </p>

          <button class="btn btn-primary" @click="closeModalNotaCash">
            Tutup
          </button>
        </div>
      </div>
    </dialog>
    <!-- end modal nota cash -->

    <!-- modal waiting bill -->
    <dialog id="modalWaitingBill" class="modal">
      <div class="modal-box">
        <img
          src="~/assets/images/illustration-waiting-bill.png"
          class="buble-img"
          loading="lazy"
          preload
          alt="Buble"
        />

        <div class="description">
          <h2>Tunggu ya Bill sedang kami cetak</h2>
          <p>Silahkan Ambil bukti transaksi Anda terlebih dahulu</p>
        </div>
      </div>
    </dialog>
    <!-- end modal waiting bill -->
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import FetchData from "~/middleware/services/Fetch.js";
// salestransaction->tanggalPenyerahan
// salestransaction->tanggalBukaNota

export default defineComponent({
  component: {
    Navbar,
    Footer,
  },
  data() {
    return {
      navbarTo: "/site/checkout",
      email: "", // table 11 // gojek
      isAndroid: "",
      noNota: "",
      transID: "",
      buttonClicked: false,
      table: "",
      nameMethod: 0,
    };
  },
  mounted() {
    // this.$refs.inputField.focus();
  },
  methods: {
    openModalWaitingBill() {
      var serviceFee = "";
      var deliveryFee = "";
      var promo = "";
      var subTotal = "";
      var total = "";
      let products = [];
      this.buttonClicked = true; // eed
      this.table = JSON.parse(localStorage.getItem("data_customer"));

      const checkoutData =
        JSON.parse(localStorage.getItem("checkoutData")) || [];
      const tableList = JSON.parse(localStorage.getItem("table_list")) || [];
      const token = JSON.parse(this.getCookie("user-data-log")).token;
      const location = localStorage.getItem("location");
      const locId = atob(location);
      const dataCustomer =
        JSON.parse(localStorage.getItem("data_customer")) || [];

      //android print
      this.isAndroid = navigator.userAgent.toLowerCase().includes("android");
      if (typeof Android !== "undefined") {
        console.log("print android");
        const typeOrder = JSON.parse(localStorage.getItem("type_order"));
        const data_restaurant = JSON.parse(
          localStorage.getItem("data_restaurant")
        );

        const paymentMethod = JSON.parse(
          localStorage.getItem("payment_method")
        );

        paymentMethod.forEach((element) => {
          if (this.table.paymentMethod == element.payment_category) {
            this.nameMethod = element.payment_id;
          }
        });

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        // Retrieve current time
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        const seconds = String(today.getSeconds()).padStart(2, "0");
        const dateYMD = `${year}-${month}-${day}`;
        const dateYMDHMS = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const data = [
          {
            mID: data_restaurant.mID, // kalau pakai qris
            appid: data_restaurant.appid,
            loc_id: locId,
            restaurant_table: dataCustomer.table,
            type_order: typeOrder,
            hl_enable_login: data_restaurant.hl_enable_login,
            data: [],
            payment: {
              diskonall: 0,
              rounding: checkoutData[0].rounding,
              tax: checkoutData[0].tax,
              stotal: checkoutData[0].subTotal,
              gtotal: checkoutData[0].total,
              payment_method: this.nameMethod, // cash
              payment_name:
                this.table.paymentMethod == "e-money" ? "qris" : "cash", // qris - cash
              paymdate: dateYMD,
            },
            guest_detail: {
              guest_name: dataCustomer.name,
              guest_addr: {
                idmember: "",
                address_name: "",
                is_default: "",
                dateadd: dateYMDHMS,
                provinsi: "",
                kota: "",
                nama: dataCustomer.name,
                alamat: "",
                telp: dataCustomer.phone,
                latitude: "",
                longitude: "",
              },
            },
          },
        ]; // Initialize data as an array
        checkoutData[0].product.forEach((element, index) => {
          data[0].data.push({
            // Access the array within the first object in data array
            id: element.product.product_id,
            product_name: element.product.product_name,
            qty: element.quantityItem,
            istakeaway: element.istakeaway,
            price: element.product.product_pricenow,
            total: element.product.product_pricenow * element.quantityItem,
            description: element.product.product_description,
            indx: index + 1,
            note: element.note,
          });
        });

        const url = "/transactions/insert_transaction";

        FetchData.createData(url, JSON.stringify(data), token)
          .then((result) => {
            if (result && result.data.status === "success") {
              // sukses simpan transaksi
              const noNota = {
                no_nota: result.data.result[0].noNota,
              };

              FetchData.syncPos(noNota, token)
                .then((result) => {
                  Android.showToast(
                    result.data.data.orderID,
                    dateYMDHMS,
                    dataCustomer.name,
                    typeOrder.name,
                    dataCustomer.table,
                    JSON.stringify(checkoutData[0])
                  );
                })
                .catch((err) => {
                  console.log("err", err);
                });

              setTimeout(() => {
                localStorage.removeItem("cartItems");
                localStorage.removeItem("checkoutData");
                this.$router.push("/");
                modalBill.close();
              }, 1000);

              let modalBill = document.getElementById("modalWaitingBill");
              modalBill.showModal();
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        console.log("print windows");
        const typeOrder = JSON.parse(localStorage.getItem("type_order"));
        const data_restaurant = JSON.parse(
          localStorage.getItem("data_restaurant")
        );

        const paymentMethod = JSON.parse(
          localStorage.getItem("payment_method")
        );

        paymentMethod.forEach((element) => {
          if (this.table.paymentMethod == element.payment_category) {
            this.nameMethod = element.payment_id;
          }
        });

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        // Retrieve current time
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        const seconds = String(today.getSeconds()).padStart(2, "0");
        const dateYMD = `${year}-${month}-${day}`;
        const dateYMDHMS = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const data = [
          {
            mID: data_restaurant.mID, // kalau pakai qris
            appid: data_restaurant.appid,
            loc_id: locId,
            restaurant_table: dataCustomer.table,
            type_order: typeOrder,
            hl_enable_login: data_restaurant.hl_enable_login,
            data: [],
            payment: {
              diskonall: 0,
              rounding: checkoutData[0].rounding,
              tax: checkoutData[0].tax,
              stotal: checkoutData[0].subTotal,
              gtotal: checkoutData[0].total,
              payment_method: this.nameMethod, // cash
              payment_name:
                this.table.paymentMethod == "e-money" ? "qris" : "cash", // qris - cash
              paymdate: dateYMD,
            },
            guest_detail: {
              guest_name: dataCustomer.name,
              guest_addr: {
                idmember: "",
                address_name: "",
                is_default: "",
                dateadd: dateYMDHMS,
                provinsi: "",
                kota: "",
                nama: dataCustomer.name,
                alamat: "",
                telp: dataCustomer.phone,
                latitude: "",
                longitude: "",
              },
            },
          },
        ]; // Initialize data as an array
        checkoutData[0].product.forEach((element, index) => {
          data[0].data.push({
            // Access the array within the first object in data array
            id: element.product.product_id,
            product_name: element.product.product_name,
            qty: element.quantityItem,
            istakeaway: element.istakeaway,
            price: element.product.product_pricenow,
            total: element.product.product_pricenow * element.quantityItem,
            description: element.product.product_description,
            indx: index + 1,
            note: element.note,
          });
        });

        const url = "/transactions/insert_transaction";

        FetchData.createData(url, JSON.stringify(data), token)
          .then((result) => {
            if (result && result.data.status === "success") {
              // sukses simpan transaksi
              const noNota = {
                no_nota: result.data.result[0].noNota,
              };

              // sync ke POS
              FetchData.syncPos(noNota, token)
                .then((result) => {
                  this.actionPrint(checkoutData[0], result.data.data.orderID);
                  //  console.log("err1");
                })
                .catch((err) => {
                  console.log("err", err);
                });

              // let modalBill = document.getElementById("modalWaitingBill");
              // modalBill.showModal();
              // this.actionPrint(checkoutData[0], result.data.result[0].noNota);
              // setTimeout(() => {
              // }, 1000);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    openModalCash() {
      let modalBill = document.getElementById("modalNotaCash");
      modalBill.showModal();
    },
    closeModalNotaCash() {
      let modalBill = document.getElementById("modalNotaCash");
      modalBill.close();
    },
    backToHome() {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("data_customer");
      const location = localStorage.getItem("location");
      const url = "/restaurant/detail/" + location;
      this.$router.push(url);
    },
    getCookie(name) {
      const cookieName = name + "=";
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(";");
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === " ") {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return "";
    },
    total(price, qty) {
      const total = price * qty;
      return this.formatCurrency(total);
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
    },
    getDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const seconds = String(today.getSeconds()).padStart(2, "0");
      const dateYMDHMS = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return dateYMDHMS;
    },
    money(nominal) {
      return nominal.toLocaleString().replace(/,/g, ".");
    },
  },
});
</script>