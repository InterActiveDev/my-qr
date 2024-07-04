<template>
  <div>
    <div class="flex justify-center">
      <div class="frame-receipt">
        <Navbar :to="navbarTo" v-if="!isGeneratingPDF" />
        <section id="receipt">
          <div class="wrapper">
            <div class="content ">
              <div class="head">
                <div class="logo">
                  <img :src="restaurant.loc_logo" alt="" />
                </div>

                <div class="title">
                  <span>{{ restaurant.loc_name }}</span>
                  <p>{{ restaurant.loc_addr }}</p>
                </div>
              </div>

              <div class="transactions-details w-full min-w-full">
                <div class="row">
                  <div class="items">
                    <span class="title">Pelanggan</span>
                    <span class="detail">{{ customer.guest_name }}</span>
                  </div>
                  <div class="items">
                    <span class="title">Tanggal Order</span>
                    <span class="detail">{{
                      customer.guest_addr ? formatDate(customer.guest_addr.dateadd) : ""
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
                      customer.guest_addr ? formatDate(customer.guest_addr.dateadd) : ""
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

                <span class="note"></span>
              </div>

              <div class="orders-details">
                <div class="title">
                  <span>Order Detail</span>
                </div>

                <div class="row" v-for="(data, index) in products" :key="index">
                  <div class="items">
                    <div class="col-1">
                      <div class="qty">{{ data.qty }}x</div>
                      <div class="product">
                        <span>{{ data.product_name }}</span>
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
                        <p>
                          {{
                            data.note ? 'Note: ' + data.note.slice(0, 30) +
                                (data.note.length > 30 ? "..." : "")
                              : ""
                          }}
                        </p>
                      </div>
                    </div>
                    <div class="col-2">
                      <!-- {{ formatCurrency(data.price) }} -->
                      {{ formatCurrency(data.price + (data.topping? data.topping.reduce((acc, mdf) => acc + mdf.price, 0):0) ) }}
                    </div>
                  </div>
                </div>

                <div
                  class="total-details"
                  v-if="paymentDetail"
                >
                  <div class="border">
                    <div class="total">
                      <div class="detail">
                        <div class="title-total">Total</div>
                        <div class="price">
                          {{ formatCurrency(paymentDetail.stotal) }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row-total">
                    <div class="title-total">Sub Total</div>
                    <div class="price">
                      {{ formatCurrency(paymentDetail.stotal) }}
                    </div>
                  </div>
                  <div class="row-total" v-if="paymentDetail.promo && paymentDetail.promo != 0">
                    <div class="title-total">Promo</div>
                    <div class="price">
                      {{ formatCurrency(paymentDetail.promo? paymentDetail.promo:0) }}
                    </div>
                  </div>
                  <div class="row-total" v-if="paymentDetail.tax && paymentDetail.tax != 0">
                    <div class="title-total">Tax</div>
                    <div class="price">
                      {{ formatCurrency(paymentDetail.tax? paymentDetail.tax:0) }}
                    </div>
                  </div>
                  <div class="row-total" v-if="paymentDetail.serviceFee && paymentDetail.serviceFee != 0">
                    <div class="title-total">Biaya layanan</div>
                    <div class="price">
                      {{ formatCurrency(paymentDetail.serviceFee? paymentDetail.serviceFee:0) }}
                    </div>
                  </div>
                  <div class="row-total" v-if="paymentDetail.rounding && paymentDetail.rounding != 0">
                    <div class="title-total">Rounding</div>
                    <div class="price">
                      {{ formatCurrency(paymentDetail.rounding? paymentDetail.rounding:0) }}
                    </div>
                  </div>
                  <div class="row-total">
                    <div class="title-total-bold">Total Semua</div>
                    <div class="price-bold">
                      {{ formatCurrency(paymentDetail.gtotal) }}
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
      test: "",
      isAndroid: "",
      navbarTo: "/restaurant/history-transaction",
      isAndroid: "",
      isIOS: "",
      noNota: "",
      status: "PENDING",
      payment: "",
      paymentDetail: null,
      table: "",
      customer: {},
      typeOrder: {},
      products: [],
      locProducts: {},
      isGeneratingPDF: false,
      restaurant: {},
    };
  },
  mounted() {
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
        total: this.payment[0],
      };

      Android.showToast(JSON.stringify(data));
    },
    downloadReceipt() {
      const dataRestaurant = JSON.parse(
        localStorage.getItem("data_restaurant")
      );
      console.log('dataCustomer')
      const date = this.formatDate(this.customer.order_date);
      const filename =
        dataRestaurant.loc_name +
        "-" +
        this.customer.guest_name +
        "-" +
        date +
        "-" +
        this.noNota;
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
        localStorage.removeItem("checkoutData");
        const location = localStorage.getItem("location");
        const locId = atob(location);
        const history = JSON.parse(localStorage.getItem("history"));
        const selectedLocation = history[locId];
        const hlCode = this.$route.params.id;
        const selectedHistory = selectedLocation.filter((item) => item.nota == hlCode);
        const tableCode = localStorage.getItem("table_code");

        this.customer = selectedHistory[0].data.guest_detail;
        this.typeOrder = selectedHistory[0].orderType;
        this.paymentDetail = selectedHistory[0].data.payment;
        this.products = selectedHistory[0].data.data;
        this.noNota = selectedHistory[0].notaShort? selectedHistory[0].notaShort : selectedHistory[0].nota;
        this.payment = this.paymentDetail.payment_name.toUpperCase();
        this.restaurant = JSON.parse(localStorage.getItem("data_restaurant"));
        this.table = selectedHistory[0].data.restaurant_table? selectedHistory[0].data.restaurant_table : '-';
        this.status = selectedHistory[0].status.toUpperCase();
      }
    },
    openModalCash() {
      // edw receipt
      // Select the element that you want to capture

      let modalBill = document.getElementById("modalNotaCash");
      modalBill.showModal();
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
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
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
  },
});
</script>
