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
                <img :src="qrCodeImage" alt="QR Code" />
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
                <span class="message-error">{{ messagePaymentError }}</span>
                <span class="message-success">{{ messagePaymentSuccess }}</span>
                <button class="btn btn-check mb-5" @click="checkPaymentTrigger">
                  Periksa Status Pembayaran
                </button>
                <button class="btn btn-download-qris mb-5" @click="downloadQris">
                  Download
                </button>
                <p class="caption">Selesaikan pembayaran sebelum :</p>
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
    };
  },
  async mounted() {
    await this.getQr();
    // this.startCountDown();
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

          // bypass payment
          // if(this.countDown == 5){
          //   this.updatePayment();
          // }
        } else {
          clearInterval(this.intervalId);
          clearInterval(this.setInterval);
          this.showModalCancel = true;

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
          console.log("error.message", error.message);
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
      console.log('content', content)
      try {
        const qrCodeDataURL = await QRCode.toDataURL(content);
        this.qrCodeImage = qrCodeDataURL;
        const intervalId = setInterval(() => {
          // if(currentUrl === '/qris'){
          if (timerStop <= 120) {
            // buat stop proses di background
            this.checkPayment(this.mID, this.invoiceId, this.refNo);
            timerStop++;
          }
        }, 5000);

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
          console.log("error.message", error.message);
        });
    },
    updatePayment() {
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

      const checkoutData =
        JSON.parse(localStorage.getItem("checkoutData")) || [];
      const url = "/qr_myorder/update_payment";
      const data = {
        transaction_id: this.transactionId,
        payment_status: "sudah",
        payment_amount: checkoutData[0].total.toString(),
        payment_date: dateYMD,
        date_process: dateYMDHMS,
      };
      this.showModalWaitingQris = true; // to show the modal

      const qrContent = localStorage.getItem("qrContent");
      this.steps = "get transactionId";
      const getNotaUrl = "/qr_myorder/get_transaction?transactionId=" + this.transactionId;
      FetchData.getData(getNotaUrl).then((getNota) => {
        // sukses simpan transaksi
        console.log('getNota', getNota)
      })

      this.toInputReceipt();

      // FetchData.updateData(url, data)
      //   .then((res) => {
      //     clearInterval(this.intervalId);
      //     // localStorage.removeItem("qrContent");

      //     setTimeout(() => {
      //       this.toInputReceipt();
      //     }, 2000);
      //   })
      //   .catch((error) => {
      //     console.log("error.message xx", error.message);
      //   });
    },
    getNota(result, transactionId) {
      this.steps = "get transactionId";
      const getNotaUrl = "/qr_myorder/get_transaction?transactionId=" + transactionId;
      FetchData.getData(getNotaUrl).then((getNota) => {
        // sukses simpan transaksi
        const dataQrContent = {
          contents: result.data.result[0],
          nota: result.data.result[0].noNota,
          noNotaNew: getNota.data.data[0].myresto_ref,
          invoice: result.data.result[0].qrisData?.noNota,
          ref: result.data.result[0].qrisData?.refNo,
          expired: result.data.result[0].qrisData?.expiredDate,
        };
        localStorage.setItem("qrContent", JSON.stringify(dataQrContent));
      });
    },
    getQr() {
      const qrContent = localStorage.getItem("qrContent");
      const data = qrContent ? JSON.parse(qrContent) : "";

      const data_restaurant = localStorage.getItem("data_restaurant");
      const mid = data_restaurant ? JSON.parse(data_restaurant) : "";
      console.log('data', data)
      const checkoutData = localStorage.getItem("checkoutData");
      const checkout = checkoutData? JSON.parse(checkoutData):'';
      
      if(data && mid && checkout){
        this.expiredDate = data.expired;
        this.transactionId = data.contents.transactionId;
        this.link = data.contents.qrisData.content;
        console.log('data.contents.qrisData.content', data.contents.qrisData.content)
        this.nmid = data.contents.qrisData.nmid;
        this.mID = mid.mID;
        this.total = checkout[0].total.toString();
        this.restaurantName = mid.loc_name;
        this.noNota = data.nota;
        this.invoiceId = data.contents.qrisData.invoiceId;
        this.refNo = data.ref;

        this.generateQRCode(this.link);
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