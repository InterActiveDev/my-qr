<template>
  <div>
    <div class="flex justify-center">
      <div class="frame-qris">
        <Navbar :to="navbarTo" />
        <section id="qris">
          <!-- <img
          src="~/assets/images/buble-top.png"
          class="buble-top"
          loading="lazy"
          preload
          alt=""
          srcset=""
        /> -->

          <div class="wrapper">
            <div class="content">
              <div class="card-total">
                <div class="row">
                  <span class="title">Total Pembayaran</span>
                  <p class="total">{{ formatCurrency(total) }}</p>
                </div>
              </div>

              <div class="description">
                <p class="name">{{ restaurantName }}</p>
                <p class="nmid">NMID : {{ nmid }}</p>
              </div>

              <div id="qrisBarcode" v-if="qrCodeImage">
                <!-- Tampilkan QR code jika sudah digenerate -->
                <div v-if="qrCodeImage == 'error'">
                  <div class="flex w-[250px] h-[150px] items-center">
                    <span class="text-center text-red-500 font-bold">{{
                      messageErrorQR
                    }}</span>
                  </div>
                </div>
                <div v-else>
                  <img :src="qrCodeImage" alt="QR Code" />
                </div>
              </div>
              <div v-else>
                <!-- Placeholder blur ketika QR code belum tergenerate -->
                <div
                  style="
                    width: 300px;
                    height: 300px;
                    background-color: #f0f0f0;
                    filter: blur(5px);
                  "
                ></div>
              </div>

              <div class="description">
                <span class="text-center mb-1 text-red-500">{{
                  messagePaymentError
                }}</span>
                <span class="text-center mb-1 text-green-500">{{
                  messagePaymentSuccess
                }}</span>
                <button class="btn btn-check mb-5" @click="checkPaymentTrigger">
                  Periksa Status Pembayaran
                </button>
                <button
                  class="btn btn-download-qris mb-5"
                  @click="downloadQris"
                >
                  Download
                </button>
                <p class="caption">Selesaikan pembayaran sebelum</p>
                <p class="caption" v-if="expiredDate">
                  {{ formatDate(expiredDate) }}
                </p>
              </div>
            </div>
          </div>

          <!-- <img
          src="~/assets/images/buble-bottom-right.png"
          class="buble-bottom"
          loading="lazy"
          preload
          alt=""
          srcset=""
        /> -->
        </section>

        <dialog id="modalCancel" class="modal" :open="showModalCancel">
          <div class="modal-box">
            <span class="loading loading-spinner"></span>
            <h2>Pembayaran dibatalkan.</h2>
          </div>
        </dialog>

        <dialog
          id="modalWaitingQris"
          class="modal"
          :open="showModalWaitingQris"
        >
          <div class="modal-box">
            <span class="loading loading-spinner"></span>
            <h2>Menyiapkan ...</h2>
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import QRCode from "qrcode";
import FetchData from "~/middleware/services/Fetch.js";
import html2canvas from "html2canvas";

export default defineComponent({
  component: {
    Navbar,
    Footer,
  },
  data() {
    return {
      navbarTo: "/site/checkout",
      countDown: 1200,
      total: 0,
      expiredDate: "",
      showModalWaitingQris: false,
      showModalCancel: false,
      link: "",
      qrCodeImage: "",
      noNota: "",
      invoiceId: "",
      refNo: "",
      mID: "",
      intervalId: null,
      transactionId: "",
      restaurantName: "",
      nmid: "",
      messagePaymentError: "",
      messagePaymentSuccess: "",
      messageErrorQR: "",
    };
  },
  async mounted() {
    const check = localStorage.getItem("qrContent");
    const checkPayment = JSON.parse(check).contents.paymentMethod;
    if (checkPayment == "cash") {
      this.$router.push("/site/receipt");
    }

    await this.getQr();
  },
  methods: {
    getCookie(name) {
      const cookieName = name + "=";
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName)) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return "";
    },
    downloadQris() {
      html2canvas(document.getElementById("qrisBarcode"), {
        logging: true,
        allowTaint: false,
        useCORS: true,
      }).then(function (canvas) {
        var link = document.createElement("a");
        link.download = "QR.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    },
    startCountDown() {
      this.countDownInterval = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          clearInterval(this.intervalId);
          clearInterval(this.setInterval);
          this.showModalCancel = true;
          // FetchData.syncMyResto(noNota, token)
          //   .then((resultPos) => {
          //     // get nota
          //   })
          //   .catch((err) => {
          //     console.log("err: ", err.message);
          //   });
          setTimeout(() => {
            clearInterval(this.countDownInterval);
            // this.checkPayment();
            this.$router.push("/site/checkout");
          }, 2000);
        }
      }, 1000);
    },
    checkPaymentTrigger() {
      const url = "/qr_myorder/check_payment_qris";
      const data = {
        mID: this.mID,
        invoiceId: this.invoiceId,
        refNo: this.refNo,
      };
      FetchData.createData(url, data)
        .then((res) => {
          console.log(res.data.data.status);
          if (res.data.data.status === "success") {
            this.messagePaymentError = "";
            this.messagePaymentSuccess = "Pembayaran berhasil";
            clearInterval(this.intervalId);
            this.updatePayment();
          } else {
            this.messagePaymentError = "Pembayaran tertunda";
          }
        })
        .catch((error) => {
          console.log("error message (1) : ", error);
        });
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${
        remainingSeconds < 10 ? "0" : ""
      }${remainingSeconds}`;
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
    async generateQRCode(content) {
      const currentUrl = window.location.pathname;
      let timerStop = 0;
      try {
        const qrCodeDataURL = await QRCode.toDataURL(content);
        this.qrCodeImage = qrCodeDataURL;
        const intervalId = setInterval(() => {
          if (timerStop <= 240) {
            // 20 menit
            // buat stop proses di background, biar ga jalan terus pengecekannya
            this.checkPayment(this.mID, this.invoiceId, this.refNo);
            timerStop++;
          } else {
            clearInterval(this.intervalId);
          }
        }, 5000); // tiap 5 detik

        this.intervalId = intervalId;
      } catch (error) {
        console.error("Error generating QR code:", error.message);
      }
    },
    checkPayment(mID, invoiceId, refNo) {
      const url = "/qr_myorder/check_payment_qris";
      const data = {
        mID: mID,
        invoiceId: invoiceId,
        refNo: refNo,
      };

      FetchData.createData(url, data)
        .then((res) => {
          if (res.data.data.status === "success") {
            clearInterval(this.intervalId);
            this.updatePayment();
          }
        })
        .catch((error) => {
          console.log("error message (2) : ", error.message);
        });
    },
    generateNotaManual(restaurant, qrContent) {
      // creating short no nota manual
      let alpha = "";
      let restoname = restaurant.loc_name.split(" ");

      restoname.forEach(function (name) {
        alpha += name.charAt(0).toUpperCase();
      });

      let short = String(qrContent.contents.transactionId).slice(-4);
      return alpha + "5" + short + "Q";
    },
    updatePayment() {
      const dateYMD = this.today("dateYMD");
      const dateYMDHMS = this.today("dateYMDHMS");
      const checkoutData = JSON.parse(localStorage.getItem("receipt")) || [];
      const restaurant = JSON.parse(localStorage.getItem("data_restaurant"));
      const qrContent = JSON.parse(localStorage.getItem("qrContent"));

      // creating short no nota manual
      let shortNota = this.generateNotaManual(restaurant, qrContent);

      const data = {
        transaction_id: this.transactionId,
        payment_status: "sudah",
        payment_amount: checkoutData[0].total.toString(),
        payment_date: dateYMD,
        date_process: dateYMDHMS,
        nota_short: shortNota,
      };

      this.showModalWaitingQris = true; // to show the modal
      this.steps = "update payment";
      const urlUpdatePayment = "/qr_myorder/update_payment";
      FetchData.updateData(urlUpdatePayment, data)
        .then((res) => {
          clearInterval(this.intervalId);

          this.steps = "get transactionId";
          const getNotaUrl =
            "/qr_myorder/get_transaction?transactionId=" + this.transactionId;
          FetchData.getData(getNotaUrl).then((getNota) => {
            // sukses simpan transaksi
            if (
              getNota.data.data.status === 1 ||
              getNota.data.data.myresto_ref !== "" ||
              getNota.data.data.myresto_ref !== null
            ) {
              const qrContent = JSON.parse(localStorage.getItem("qrContent"));
              qrContent.qr_nota_short = getNota.data.data[0].myresto_ref
                ? getNota.data.data[0].myresto_ref
                : shortNota;
              qrContent.qr_status = getNota.data.data[0].status;
              localStorage.removeItem("qrContent");

              localStorage.setItem("qrContent", JSON.stringify(qrContent));
              const selectedOrderType = JSON.parse(
                localStorage.getItem("selected_type_order")
              );
              const dataTemp = JSON.parse(localStorage.getItem("dataTemp"));
              const location = localStorage.getItem("location");
              const locId = atob(location);
              const dr = JSON.parse(localStorage.getItem("data_restaurant"));

              if (dataTemp) {
                // MP01M51463F20230206169 budidi | MP01M32319F20221011805 geprek | MP01M381F20190423491 keripiku
                if (
                  dr.appid == "MP01M51463F20230206169" ||
                  dr.appid == "MP01M32319F20221011805" ||
                  dr.appid == "MP01M381F20190423491"
                ) {
                  this.setHistory(
                    qrContent.nota,
                    shortNota,
                    selectedOrderType,
                    dataTemp,
                    locId
                  );
                }
              }
              localStorage.removeItem("dataTemp");
              setTimeout(() => {
                this.toInputReceipt();
              }, 1000);
            }
          });
        })
        .catch((error) => {
          console.log("error message (3) : ", error.message);
        });
    },
    setHistory(notaHL, shortNota, selectedOrderType, data, locId) {
      const dataDetail = {
        nota: notaHL,
        notaShort: shortNota ? shortNota : null,
        orderType: selectedOrderType,
        data: data ? data[0] : null,
        status: "selesai",
        isChecked: true,
      };

      let historyTemp = JSON.parse(localStorage.getItem("history"));

      if (historyTemp === null) {
        let history = {};
        history[locId] = [];
        history[locId].push(dataDetail);

        localStorage.setItem("history", JSON.stringify(history));
      } else {
        if (historyTemp.hasOwnProperty(locId)) {
          historyTemp[locId].push(dataDetail);
        } else {
          historyTemp[locId] = [dataDetail];
        }
        localStorage.setItem("history", JSON.stringify(historyTemp));
      }
    },
    today(type) {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const seconds = String(today.getSeconds()).padStart(2, "0");

      if (type == "dateYMDHMS") {
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    },
    getQr() {
      localStorage.removeItem("checkoutData");
      const qrContent = localStorage.getItem("qrContent");
      const data = qrContent ? JSON.parse(qrContent) : "";

      const data_restaurant = localStorage.getItem("data_restaurant");
      const mid = data_restaurant ? JSON.parse(data_restaurant) : "";
      const checkoutData = localStorage.getItem("receipt");
      const checkout = checkoutData ? JSON.parse(checkoutData) : "";

      if (data && mid && checkout && data.contents.qrisData.content) {
        this.expiredDate = data.expired;
        this.transactionId = data.contents.transactionId;
        this.link = data.contents.qrisData.content;
        this.nmid = data.contents.qrisData.nmid;
        this.mID = mid.mID;
        this.total = checkout[0].total.toString();
        this.restaurantName = mid.loc_name;
        this.noNota = data.nota;
        this.invoiceId = data.contents.qrisData.invoiceId;
        this.refNo = data.ref;

        this.generateQRCode(this.link);
      } else {
        this.qrCodeImage = "error";
        this.messageErrorQR =
          "Harap scan ulang QR Code pada meja untuk mengulangi pesanan";
      }
    },
    toInputReceipt() {
      this.$router.push("/site/receipt");
    },
    formatCurrency(amount) {
      const numberValue = parseFloat(amount);

      // Check if the parsed number is not NaN and is finite
      if (!isNaN(numberValue) && isFinite(numberValue)) {
        // If valid number, format it as currency
        const formatter = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
        return formatter.format(numberValue);
      } else {
        // If not a valid number, return 0
        return 0;
      }
    },
  },
});
</script>

<style scoped>
/* CSS for this component */

.loading {
  width: 100px;
  color: #da2424;
}
</style>
