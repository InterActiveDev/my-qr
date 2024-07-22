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
                  <img :src="restaurant.loc_logo" alt="" />
                  <!-- <img
                    src="data:image/png;base64,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"
                    alt="Red dot"
                  /> -->
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

      // domtoimage.toPng(node, { cacheBust: true })
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
        const imageURL =
          "https://myprofit.interactiveholic.net/myprofit/images/locations/logo/230206-161523-700.jpg";
        this.imageUrlToBase64(imageURL).then(console.log);

        // const imageDescription = "The Mozilla logo";

        // // Ensure imageBox is defined and exists in the DOM
        // const imageBox = document.getElementById("imageBox");
        // if (!imageBox) {
        //   console.error('Element with id "imageBox" not found.');
        // }

        // const downloadedImg = new Image();
        // downloadedImg.crossOrigin = "anonymous"; // Handle cross-origin requests
        // downloadedImg.alt = imageDescription; // Set image description
        // downloadedImg.src = imageURL;

        // downloadedImg.addEventListener("load", imageReceived, false);
        // downloadedImg.addEventListener("error", imageLoadError, false);

        // function imageReceived() {
        //   // Create and configure canvas
        //   const canvas = document.createElement("canvas");
        //   const context = canvas.getContext("2d");

        //   if (!context) {
        //     console.error("Failed to get canvas context.");
        //     return;
        //   }

        //   // Set canvas size to image size
        //   canvas.width = downloadedImg.width;
        //   canvas.height = downloadedImg.height;

        //   // Draw image onto canvas
        //   context.drawImage(downloadedImg, 0, 0);

        //   // Optionally add text to canvas
        //   context.font = "16px Arial";
        //   context.fillStyle = "black";
        //   context.fillText(downloadedImg.alt, 10, 20); // Draw text on canvas

        //   // Append canvas to the imageBox
        //   if (imageBox) {
        //     imageBox.appendChild(canvas);
        //   }

        //   // Save canvas image data to localStorage
        //   try {
        //     localStorage.setItem(
        //       "saved-image-example",
        //       canvas.toDataURL("image/png")
        //     );

        //     console.log("Image saved to localStorage.");
        //   } catch (err) {
        //     console.error(`Error saving image to localStorage: ${err}`);
        //   }
        // }

        // function imageLoadError() {
        //   console.error("Failed to load image.");
        // }

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
    async imageUrlToBase64(url) {
      const data = await fetch(url);
      const blob = await data.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
        reader.onerror = reject;
      });
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
