<template>
  <div>
    <div class="flex justify-center">
      <div class="frame-receipt">
        <Navbar :to="navbarTo" v-if="!isGeneratingPDF" />
        <section id="receipt">
          <div class="wrapper">
            <div class="content">
              <div class="head">
                <div class="logo">
                  <img :src="restaurant.loc_logo" alt="" />
                </div>

                <div class="title">
                  <span>{{restaurant.loc_name}}</span>
                  <p>{{ restaurant.loc_addr }}</p>
                </div>
              </div>

              <div class="transactions-details">
                <div class="row">
                  <div class="items">
                    <span class="title">Pelanggan</span>
                    <span class="detail">{{ customer.name }}</span>
                  </div>
                  <div class="items">
                    <span class="title">Tanggal Order</span>
                    <span class="detail">{{
                      customer.order_date? formatDate(customer.order_date):""
                    }}</span>
                  </div>
                </div>

                <div class="row">
                  <div class="items">
                    <span class="title">Tipe Order</span>
                    <span class="detail">{{ typeOrder.name }}</span>
                  </div>
                  <div class="items">
                    <span class="title">Meja</span>
                    <span class="detail" v-if="customer.table !== ''">{{
                      customer.table
                    }}</span>
                    <span class="detail" v-else>-</span>
                  </div>
                </div>

                <div class="row">
                  <div class="items">
                    <span class="title">Kode Transaksi</span>
                    <span class="detail">{{ noNota }}</span>
                  </div>
                  <div class="items">
                    <span class="title">Waktu Transaksi</span>
                    <span class="detail">{{
                      customer.order_date? formatDate(customer.order_date):""
                    }}</span>
                  </div>
                </div>

                <div class="row">
                  <div class="items">
                    <span class="title">Pembayaran</span>
                    <span class="detail">{{ payment }}</span>
                  </div>
                  <div class="items">
                    <span class="title">Status</span>
                    <span class="detail">{{ status }}</span>
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

                <div class="row" v-for="(data, index) in products" :key="index">
                  <div class="items">
                    <div class="col-1">
                      <div class="qty">{{ data.quantityItem }}x</div>
                      <div class="product">
                        <span>{{ data.product.product_name }}</span>
                        <p>
                          {{ data.product.topping }}
                        </p>
                        <p>
                          {{ data.note }}
                        </p>
                      </div>
                    </div>
                    <div class="col-2">
                      {{ formatCurrency(data.product.product_pricenow) }}
                    </div>
                  </div>
                </div>

                <div
                  class="total-details"
                  v-if="locProducts && locProducts.length > 0 && locProducts[0]"
                >
                  <div class="total">
                    <div class="title-total">Total</div>
                    <div class="price">
                      {{ formatCurrency(locProducts[0].subTotal) }}
                    </div>
                  </div>
                  <div class="row-total">
                    <div class="title-total">Sub Total</div>
                    <div class="price">
                      {{ formatCurrency(locProducts[0].subTotal) }}
                    </div>
                  </div>
                  <div class="row-total" v-if="locProducts[0].promo != 0">
                    <div class="title-total">Promo</div>
                    <div class="price">
                      {{ formatCurrency(locProducts[0].promo) }}
                    </div>
                  </div>
                  <div class="row-total" v-if="locProducts[0].serviceFee != 0">
                    <div class="title-total">Biaya layanan</div>
                    <div class="price">
                      {{ formatCurrency(locProducts[0].serviceFee) }}
                    </div>
                  </div>
                  <div class="row-total" v-if="locProducts[0].rounding != 0">
                    <div class="title-total">Rounding</div>
                    <div class="price">
                      {{ formatCurrency(locProducts[0].rounding) }}
                    </div>
                  </div>
                  <div class="row-total">
                    <div class="title-total-bold">Total Semua</div>
                    <div class="price-bold">
                      {{ formatCurrency(locProducts[0].subTotal) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="bottom-nav-receipt" v-if="!isGeneratingPDF">
          <div class="row-bottom-nav">
            <button class="btn btn-primary-outline" @click="backToHome">
              Pesan Lagi
            </button>
            <button class="btn btn-primary" v-if="payment == 'cash'" @click="openModalCash">
              Bayar
            </button>
          </div>
          <div class="btn-download" v-if="payment !== 'cash'">
            <button class="btn btn-primary" @click="downloadReceipt">
              Download Nota
            </button>
          </div>
        </div>
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
            <span class="no-nota">{{ noNota }}</span>
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
import html2canvas from "html2canvas";
import FetchData from "~/middleware/services/Fetch.js";

export default defineComponent({
  component: {
    Navbar,
    Footer,
  },
  data() {
    return {
      navbarTo: "/site/checkout",
      email: "",
      isAndroid: "",
      noNota: "",
      status: "PENDING",
      payment: "",
      transID: "",
      buttonClicked: false,
      table: "",
      customer: {},
      nameMethod: 0,
      typeOrder: {},
      products: [],
      locProducts: {},
      transaction: {},
      isGeneratingPDF: false,
      restaurant: {},
    };
  },
  async mounted() {
    // this.$refs.inputField.focus();
    this.getData();
  },
  methods: {
    downloadReceipt() {
      const dataRestaurant = JSON.parse(localStorage.getItem("data_restaurant"));
      const dataCustomer = JSON.parse(localStorage.getItem("data_customer"));
      const date = this.formatDate(this.customer.order_date);
      const filename = dataRestaurant.loc_name + "-" + dataCustomer.name + "-" + date + "-" + this.noNota;
      html2canvas(document.getElementById("receipt"), {
        logging: true,
        allowTaint: false,
        useCORS: true,
      }).then(function (canvas) {
        var link = document.createElement("a");
        link.download = filename + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    },
    downloads(dataUrl, fileName) {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = fileName;
      link.click();
    },
    getData() {
      if (process.client) {
        const customerData = localStorage.getItem("data_customer");
        const typeOrderData = localStorage.getItem("selected_type_order");
        const checkoutData = localStorage.getItem("checkoutData");
        const transactions = localStorage.getItem("qrContent");
        const location = localStorage.getItem("location");
        const dataRestaurant = localStorage.getItem("data_restaurant");
        
        if(!customerData || !typeOrderData || !checkoutData || !transactions){
          this.$router.push("/restaurant/detail/"+location);
          return; 
        }

        const tableCode = localStorage.getItem("table_code");
        this.navbarTo = "/restaurant/detail/" + location + "?table_code=" + tableCode;

        this.customer = customerData ? JSON.parse(customerData) : {};
        this.typeOrder = typeOrderData ? JSON.parse(typeOrderData) : {};
        this.locProducts = checkoutData ? JSON.parse(checkoutData) : [];
        this.transaction = transactions ? JSON.parse(transactions) : {};
        this.restaurant = dataRestaurant ? JSON.parse(dataRestaurant) : {};

        this.noNota = JSON.parse(transactions).noNotaNew;
        this.payment = JSON.parse(transactions).contents.paymentMethod;
        
        const paymentStatus = JSON.parse(transactions).contents.status;
        if(paymentStatus !== undefined){
          this.status = JSON.parse(transactions).contents.status == 0 ? "PENDING" : "LUNAS";
        }

        if (this.locProducts.length > 0) {
          this.products = this.locProducts[0].product || [];
        } else {
          this.products = [];
        }
      }
    },
    openModalCash() {
      // edw receipt
      // Select the element that you want to capture
      
      let modalBill = document.getElementById("modalNotaCash");
      modalBill.showModal();
    },
    closeModalNotaCash() {
      let modalBill = document.getElementById("modalNotaCash");
      modalBill.close();
    },
    backToHome() {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("selected_type_order");
      localStorage.removeItem("data_customer");
      localStorage.removeItem("temporary_item_cart");
      localStorage.removeItem("cart_items");
      localStorage.removeItem("checkoutData");
      const location = localStorage.getItem("location");
      const tableCode = localStorage.getItem("table_code");
      if(tableCode){
        this.$router.push(
          "/restaurant/detail/" + location + "?table_code=" + tableCode
        );
      }else{
        this.$router.push( "/restaurant/detail/" + location );
      }
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
    formatDate(dateString) {
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        
        const date = new Date(dateString);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day} ${month} ${year} - ${hours}:${minutes}`;
    },
    formatHours(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    },
  },
});
</script>