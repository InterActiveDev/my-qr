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
                  <!-- eed -->
                  <img :src="restaurant.loc_logo_base64" alt="" />
                </div>

                <div class="title">
                  <span>{{ restaurant.loc_name }}</span>
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
                      customer.order_date ? formatDate(customer.order_date) : ""
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
                    <span class="detail" v-if="table !== ''">{{ table }}</span>
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
                      customer.order_date ? formatDate(customer.order_date) : ""
                    }}</span>
                  </div>
                </div>

                <div class="row">
                  <div class="items">
                    <span class="title">Pembayaran</span>
                    <span class="detail">{{ payment.toUpperCase() }}</span>
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
                        <p class="topping" v-for="topping in data.topping">
                          {{
                            topping.name != undefined
                              ? "( " +
                                topping.name +
                                " - " +
                                formatCurrency(topping.price) +
                                " )"
                              : ""
                          }}
                        </p>
                        <p class="font-bold">
                          {{
                            data.note
                              ? "Note: " +
                                data.note.slice(0, 30) +
                                (data.note.length > 30 ? "..." : "")
                              : ""
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="col-2">
                      {{
                        formatCurrency(
                          data.product.product_pricenow +
                            (data.topping
                              ? data.topping.reduce(
                                  (acc, mdf) => acc + mdf.price,
                                  0
                                )
                              : 0)
                        )
                      }}
                    </div>
                  </div>
                </div>

                <div
                  class="total-details"
                  v-if="locProducts && locProducts.length > 0 && locProducts[0]"
                >
                  <div class="border">
                    <div class="total">
                      <div class="detail">
                        <div class="title-total">Total</div>
                        <div class="price">
                          {{ formatCurrency(locProducts[0].subTotal) }}
                        </div>
                      </div>
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
                  <div class="row-total" v-if="locProducts[0].tax != 0">
                    <div class="title-total">Tax</div>
                    <div class="price">
                      {{ formatCurrency(locProducts[0].tax) }}
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
                      {{ formatCurrency(locProducts[0].total) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="bottom-nav-receipt" v-if="!isGeneratingPDF">
          <div class="row-bottom-nav">
            <!-- <button class="btn btn-primary-outline" @click="backToHome">
              Pesan Lagi
            </button> -->
            <button
              class="btn btn-primary"
              v-if="payment == 'cash'"
              @click="openModalCash"
            >
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
// import domtoimage from "dom-to-image";
import domtoimage from "dom-to-image-more";

export default defineComponent({
  component: {
    Navbar,
    Footer,
  },
  data() {
    return {
      test: "",
      isAndroid: "",
      navbarTo: "/site/checkout",
      email: "",
      isAndroid: "",
      isIOS: "",
      noNota: "",
      status: "PENDING",
      payment: "",
      transID: "",
      buttonClicked: false,
      logo: "",
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
  mounted() {
    // this.$refs.inputField.focus();
    this.isAndroid = navigator.userAgent.toLowerCase().includes("android");
    this.isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    const dataRes = JSON.parse(localStorage.getItem("data_restaurant"));

    if (dataRes.loc_myorderqr_print == 1) {
      if (this.isAndroid) {
        console.log("Android detected");
        this.getData();
        this.printAndroid();
      } else {
        this.getData();
      }
    } else {
      console.log("Other OS detected");
      this.getData();
    }
  },
  methods: {
    printAndroid() {
      this.test = "print android success";
      const data = {
        name: this.customer.name,
        dateOrder: this.customer.order_date,
        typeOrder: this.typeOrder.name,
        table: this.table !== "" ? this.table : "",
        noNota: this.noNota,
        timeOrder: this.customer.order_date,
        payment: this.payment.toUpperCase(),
        status: this.status,
        total: this.locProducts[0],
        logo: this.restaurant.loc_logo,
        address: this.restaurant.loc_addr,
        isRemoveFooter: "0",
        restaurantName: this.restaurant.loc_name,
        restaurantPhone: this.restaurant.loc_phone,
      };

      Android.showToast(JSON.stringify(data));
    },
    downloadReceipt() {
      const dataRestaurant = JSON.parse(
        localStorage.getItem("data_restaurant")
      );
      const dataCustomer = JSON.parse(localStorage.getItem("data_customer"));
      const date = this.formatDate(this.customer.order_date);
      const filename =
        dataRestaurant.loc_name +
        "-" +
        dataCustomer.name +
        "-" +
        date +
        "-" +
        this.noNota;

      // eed
      html2canvas(document.getElementById("receipt"), {
        logging: true,
        allowTaint: true,
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
        localStorage.removeItem("checkoutData");
        const customerData = localStorage.getItem("data_customer");
        const typeOrderData = localStorage.getItem("selected_type_order");
        const checkoutData = localStorage.getItem("receipt");
        const transactions = JSON.parse(localStorage.getItem("qrContent"));
        const location = localStorage.getItem("location");
        const dataRestaurant = localStorage.getItem("data_restaurant");
        this.table = localStorage.getItem("table_code");

        if (!customerData || !typeOrderData || !checkoutData || !transactions) {
          this.$router.push("/restaurant/detail/" + location);
          return;
        }

        const tableCode = localStorage.getItem("table_code");
        this.navbarTo =
          "/restaurant/detail/" + location + "?table_code=" + btoa(tableCode);

        this.customer = customerData ? JSON.parse(customerData) : {};
        this.typeOrder = typeOrderData ? JSON.parse(typeOrderData) : {};
        this.locProducts = checkoutData ? JSON.parse(checkoutData) : [];
        this.transaction = transactions ? transactions : {};
        this.restaurant = dataRestaurant ? JSON.parse(dataRestaurant) : {};
        // eed

        this.noNota =
          transactions.noNotaNew != null
            ? transactions.noNotaNew
            : transactions.qr_nota_short
            ? transactions.qr_nota_short
            : transactions.contents.noNota;
        this.payment = this.customer.paymentMethod.payment_myresto_key
          ? this.customer.paymentMethod.payment_myresto_key
          : this.customer.paymentMethod.payment_method;
        if (transactions.contents.status == 0) {
          this.status = "PENDING";
        } else if (transactions.contents.status == undefined) {
          this.status = transactions.qr_status == 1 ? "LUNAS" : "PENDING";
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
      localStorage.removeItem("qrContent");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("selected_type_order");
      localStorage.removeItem("data_customer");
      localStorage.removeItem("temporary_item_cart");
      localStorage.removeItem("cart_items");
      localStorage.removeItem("checkoutData");
      localStorage.removeItem("receipt");
      const location = localStorage.getItem("location");
      const tableCode = localStorage.getItem("table_code");

      if (tableCode) {
        this.$router.push(
          "/restaurant/detail/" + location + "?table_code=" + btoa(tableCode)
        );
      } else {
        this.$router.push("/restaurant/detail/" + location);
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
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

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
