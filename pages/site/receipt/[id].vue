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
                  <img :src="restaurant.loc_logo_base64" alt="" />
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
                      customer.guest_addr
                        ? formatDate(customer.guest_addr.dateadd)
                        : ""
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
                      customer.guest_addr
                        ? formatDate(customer.guest_addr.dateadd)
                        : ""
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
                    <div class="flex gap-3">
                      <span class="detail">{{ status }}</span>
                      <button
                        v-if="payment === 'QRIS'"
                        type="button"
                        @click="checkPaymentTrigger"
                        class="px-2 py-1 relative rounded group text-center text-white inline-block"
                      >
                        <span
                          class="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-[#da2424] to-red-500"
                        ></span>
                        <span
                          class="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-[#da2424] to-red-500"
                        ></span>
                        <span
                          class="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-[#da2424] to-red-500"
                        ></span>
                        <span
                          class="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-[#da2424] from-red-500"
                        ></span>
                        <span class="relative"> Check Payment </span>
                      </button>
                    </div>
                  </div>
                </div>

                <span
                  class="text-right underline font-bold"
                  :class="
                    statusTransaksi == 'Transaksi Sukses'
                      ? 'text-green-500 mr-10'
                      : 'text-red-500 mr-6'
                  "
                >
                  {{ statusTransaksi }}
                </span>
                <hr />
                <span class="note" v-if="expiredDate">
                  Batas maksimal pembayaran QRIS adalah : <br />
                  {{ this.formatDate(expiredDate) }}
                </span>
                <hr v-if="expiredDate" />
                <span class="note"
                  >Silahkan perlihatkan nota ini ke kasir untuk konfirmasi
                  pembayaran.</span
                >
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
                          data.price +
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

                <div class="total-details" v-if="paymentDetail">
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
                  <div
                    class="row-total"
                    v-if="paymentDetail.promo && paymentDetail.promo != 0"
                  >
                    <div class="title-total">Promo</div>
                    <div class="price">
                      {{
                        formatCurrency(
                          paymentDetail.promo ? paymentDetail.promo : 0
                        )
                      }}
                    </div>
                  </div>
                  <div
                    class="row-total"
                    v-if="paymentDetail.tax && paymentDetail.tax != 0"
                  >
                    <div class="title-total">Tax</div>
                    <div class="price">
                      {{
                        formatCurrency(
                          paymentDetail.tax ? paymentDetail.tax : 0
                        )
                      }}
                    </div>
                  </div>
                  <div
                    class="row-total"
                    v-if="
                      paymentDetail.serviceFee && paymentDetail.serviceFee != 0
                    "
                  >
                    <div class="title-total">Biaya layanan</div>
                    <div class="price">
                      {{
                        formatCurrency(
                          paymentDetail.serviceFee
                            ? paymentDetail.serviceFee
                            : 0
                        )
                      }}
                    </div>
                  </div>
                  <div
                    class="row-total"
                    v-if="paymentDetail.rounding && paymentDetail.rounding != 0"
                  >
                    <div class="title-total">Rounding</div>
                    <div class="price">
                      {{
                        formatCurrency(
                          paymentDetail.rounding ? paymentDetail.rounding : 0
                        )
                      }}
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
      mID: "",
      invoiceId: "",
      refNo: "",
      paymentDetail: null,
      table: "",
      customer: {},
      typeOrder: {},
      products: [],
      locProducts: {},
      isGeneratingPDF: false,
      restaurant: {},
      qrContent: {},
      selectedHistory: {},
      expiredDate: null,
      statusTransaksi: "",
      messagePaymentError: "",
      messagePaymentError: "",
      route: "restaurant",
    };
  },
  mounted() {
    this.isAndroid = navigator.userAgent.toLowerCase().includes("android");
    this.isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const route = localStorage.getItem("route")
      ? localStorage.getItem("route")
      : "restaurant";
    this.route = route;

    this.navbarTo = "/" + this.route + "/history-transaction";

    const dataRes = JSON.parse(localStorage.getItem("data_restaurant"));

    if (dataRes.loc_myorderqr_print == 1) {
      if (this.isAndroid) {
        console.log("Android detected");
        this.printAndroid();
      }
    } else {
      console.log("Other OS detected");
    }
    this.getData();
  },
  methods: {
    checkPaymentTrigger() {
      const url = "/qr_myorder/check_payment_qris";
      const data = {
        mID: this.selectedHistory.data.mID,
        invoiceId: this.selectedHistory.qrContent.qrisData.invoiceId,
        refNo: this.selectedHistory.qrContent.qrisData.refNo,
      };

      const restaurant = JSON.parse(localStorage.getItem("data_restaurant"));

      FetchData.createData(url, data)
        .then((res) => {
          if (res.data.data.status === "success") {
            this.messagePaymentError = "";
            this.messagePaymentSuccess = "Pembayaran berhasil";
            this.status = "LUNAS";
            this.statusTransaksi = "Transaksi Sukses";
            const hlCode = this.$route.params.id;

            let historyTemp = localStorage.getItem("history")
              ? JSON.parse(localStorage.getItem("history"))
              : [];
            historyTemp[restaurant.loc_id].forEach((item) => {
              if (item.nota === hlCode) {
                item.status = "selesai";
              }
            });
            localStorage.setItem("history", JSON.stringify(historyTemp));

            // res.data.data[0].forEach((item) => {
            //   if (item.status === 1) {
            //     const dataItem = this.dataPending.find(
            //       (data) => data.nota === item.noNota
            //     );
            //     if (dataItem) {
            //       dataItem.status = "selesai";
            //     }
            //   }
            // });
            // localStorage.setItem("history", JSON.stringify(historyTemp));
          } else {
            console.log("last", res.data.data.message);
            this.statusTransaksi = "Transaksi Pending";
            this.messagePaymentError = "Pembayaran tertunda";
          }
        })
        .catch((error) => {
          console.log("error message (1) : ", error);
        });
    },
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
      console.log("dataCustomer");
      const date = this.formatDate(this.customer.order_date);
      const filename =
        dataRestaurant.loc_name +
        "-" +
        this.customer.guest_name +
        "-" +
        this.formatDate(this.customer.guest_addr.dateadd) +
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
        const selectedHistory = selectedLocation.filter(
          (item) => item.nota == hlCode
        );

        this.selectedHistory = selectedHistory[0];
        this.expiredDate = selectedHistory[0].qrContent.qrisData.expiredDate;
        this.customer = selectedHistory[0].data.guest_detail;
        this.typeOrder = selectedHistory[0].orderType;
        this.paymentDetail = selectedHistory[0].data.payment;
        this.products = selectedHistory[0].data.data;
        this.noNota = selectedHistory[0].notaShort
          ? selectedHistory[0].notaShort
          : selectedHistory[0].nota;
        this.payment = this.paymentDetail.payment_name.toUpperCase();
        this.restaurant = JSON.parse(localStorage.getItem("data_restaurant"));
        this.table = selectedHistory[0].data.restaurant_table
          ? selectedHistory[0].data.restaurant_table
          : "-";
        this.status =
          selectedHistory[0].status == "selesai"
            ? "LUNAS"
            : selectedHistory[0].status.toUpperCase();
        this.mID = selectedHistory[0].data.mID;
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
          "/" +
            this.route +
            "/detail/" +
            location +
            "?table_code=" +
            btoa(tableCode)
        );
      } else {
        this.$router.push("/" + this.route + "/detail/" + location);
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
