<template>
  <Navbar :to="navbarTo" />
  <div>
    <section id="receipt">
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
            src="~/assets/images/illustration-table.png"
            loading="lazy"
            preload
            alt=""
            srcset=""
          />

          <div class="description">
            <h2>Satu Langkah lagi!</h2>
            <p>
              Masukkan email Anda untuk Menerima bukti pembayaran, Anda dapat
              melewati proses ini dengan klik selesai.
            </p>
          </div>

          <div class="striper"></div>

          <div class="form-group">
            <label for="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="46"
                height="47"
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M23.0013 24.9696L7.66797 15.3863L23.0013 5.80298L38.3346 15.3863L23.0013 24.9696Z"
                  fill="#DA2424"
                />
                <path
                  d="M5.75 15.5029C5.75 14.8352 6.09749 14.2157 6.66722 13.8675L23 3.88634L39.3327 13.8675C39.9025 14.2157 40.25 14.8352 40.25 15.5029V34.553C40.25 35.6116 39.3919 36.4697 38.3333 36.4697H7.66667C6.60813 36.4697 5.75 35.6116 5.75 34.553V15.5029Z"
                  stroke="black"
                  stroke-width="3.83333"
                  stroke-linecap="round"
                />
                <path
                  d="M5.75 16.3447L23 26.8864L40.25 16.3447"
                  stroke="black"
                  stroke-width="3.83333"
                  stroke-linecap="round"
                />
              </svg>
              Email <span>(opsional)</span>
            </label>
            <input
              ref="inputField"
              type="email"
              placeholder="email@contoh.com"
              v-model="email"
              class="input input-bordered"
            />
          </div>

          <div class="btn-group">
            <button
              class="btn btn-primary"
              @click="openModalWaitingBill"
              :disabled="false"
            >
              KIRIM EMAIL
            </button>
          </div>
          <button
            class="btn btn-success"
            @click="openModalWaitingBill"
            :disabled="buttonClicked"
          >
            SELESAI
          </button>
          <button
            class="btn btn-success"
            @click="openModalWaitingBillTes"
            :disabled="buttonClicked"
          >
            SELESAI TES
          </button>
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

const styles = `
  * {
    font-size: 12px;
  }


  .logo {
    background-image: url('https://miegacoan.com/images/logo-full.png') !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    display: block;
    width: 120px;
    height: auto;
    margin: auto; /* Sesuaikan posisi gambar sesuai kebutuhan */
  }

  body {
    width: fit-content;
    font-family: Arial, sans-serif;
    font-size: 12px;
  }

  .invoice {
    max-width: 850px;
    margin: auto;
  }

  .invoice .header {
    font-size: 12px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-self: center;
  }

  .invoice .header .logo {
    width: 120px !important;
    height: 100% !important;
    margin-bottom: 20px !important;
    display: block !important; 
  }

  .invoice .header .logox {
      width: 9.182cm !important;
      height: 2.721cm !important;
      margin-top: 0.199cm !important;
      background-image: url('gacoan.png') !important;
      background-repeat: no-repeat !important;
      background-position: center !important;
  }

  table {
    width: 100%;
  }

  table tr td {
    padding-top: 6px;
    padding-bottom: 6px;
    border-bottom: 1px dashed #000;
  }

  .text-al {
    text-align: left;
  }

  .text-ar {
    text-align: right;
  }

  .address {
    text-align: center;
    border-bottom: 1px dashed  #000;
    padding-bottom: 10px;
    margin-bottom: 20px;
  }

  .row-items {
    display: flex;
    flex-direction: column;
  }

  .row-items .items {
    display: grid;
    text-align: right;
    grid-template-columns: 1.2fr 0.5fr; /* Dua kolom */
    margin-bottom: 5px;
  }

  .row-items .items span {
    text-align: right;
  }

  .promo-text {
    width: 100%;
    text-align: left;
    margin-top: 10px; /* Adjust margin as needed */
    margin-bottom: 10px; /* Adjust margin as needed */
  }

  .row-info {
    display: flex;
    flex-direction: column;
  }

  .row-info .items {
    display: grid;
    grid-template-columns: 0.5fr 1fr; /* Two columns */
    margin-bottom: 5px; /* Add margin between items */
  }

  .row-info .date-item {
    margin-bottom: 15px; /* Larger margin for Date item */
  }

  .row-info .items span {
    margin-right: 5px;
  }

  .items {
    margin-bottom: 9px;
  }

  .type-order {
    padding: 10px;
    text-align: center;
    border-top: 1px dashed #000;
    border-bottom: 1px dashed #000;
    margin-bottom: 20px;
  }

  .line-wrapper {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .line {
    flex: 1;
    border-top:  1px dashed #000;
  }

  .product-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .items-products {
    padding-bottom: 10px;
  }

  .product-item .product {
    display: flex;
    gap: 5px;
  }

  .product-name,
  .product-quantity,
  .product-price,
  .product-subtotal {
    font-size: 12px;
  }

  .topping-item {
    margin-left: 20px;
  }

  .note-item {
    margin-left: 20px;
  }

  .summary-total {
    display: flex;
    flex-direction: column;
    align-items: end;
    border-bottom: 1px dashed #000;
  }

  .code {
    text-align: center;
    font-size: 12px;
  }

  .text {
    text-align: center;
  }

  .total {
    font-weight: bold;
    font-size: 12px;
  }

  .border-total {
    padding: 10px;
    border-bottom: 1px dashed #000;
  }

`;

export default defineComponent({
  component: {
    Navbar,
    Footer,
  },
  data() {
    return {
      navbarTo: "/checkout",
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
                localStorage.removeItem("cart_items");
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
    openModalWaitingBillTes() {
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
                localStorage.removeItem("cart_items");
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
                  // this.actionPrint(checkoutData[0], result.data.data.orderID);
                  //  console.log("err1");
                })
                .catch((err) => {
                  console.log("err", err);
                });

              // let modalBill = document.getElementById("modalWaitingBill");
              // modalBill.showModal();
              localStorage.removeItem("cart_items");
              localStorage.removeItem("checkoutData");
              this.$router.push("/");
              modalBill.close();
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
    actionPrint(dataRaw, noNota) {
      console.log("ini masuk di dalanm print atas");
      let total = 0;
      let productsContent = "";
      let address = "";
      let infoBill = "";
      let typeOrder = "";
      let subTotal = "";
      let textThanks = "";
      let generalInfo = "";
      let tableContent = "";
      let serviceFeeSection = "";
      let taxSection = "";
      let promoSection = "";
      const dataCustomer = JSON.parse(localStorage.getItem("data_customer"));
      const dataTable = JSON.parse(localStorage.getItem("numberTable"));
      const type = JSON.parse(localStorage.getItem("type_order"));
      const date = this.getDate();

      dataRaw.product.forEach((product, index) => {
        let notes = "";
        let istakeaway = "";
        if (product.note != "") {
          notes += "<br> Notes : " + product.note;
        }
        product.istakeaway == 1 ? (istakeaway = `"Bungkus"`) : "";

        productsContent += `
          <tr>
              <td class="text-al">${product.product.product_name} 
                ${notes} ${istakeaway}
              </td>
              <td class="text-ar">${this.money(
                product.product.product_pricenow
              )}</td>
              <td class="text-ar">${product.quantityItem}</td>
              <td class="text-ar">${this.money(
                product.product.product_pricenow * product.quantityItem
              )}</td>
            </tr>
        `;
      });

      tableContent +=
        `
        <table>
          <tr>
            <td class="text-al" style="padding-top: 0px;">Order Item</td>
            <td class="text-ar" style="padding-top: 0px;">Price</td>
            <td class="text-ar" style="padding-top: 0px;">Qty</td>
            <td class="text-ar" style="padding-top: 0px;">Sub Tot</td>
          </tr>
        ` +
        `
        ${productsContent}
        ` +
        `
        </table>
      `;

      typeOrder += `${type.name}`;
      if (dataRaw.serviceFeePercentage > 0) {
        serviceFeeSection += `
          <div class="items">
            <span style="margin-right: 15px;">Service Fee (Subtotal) (${dataRaw.serviceFeePercentage}%) : </span>
            <span>${dataRaw.serviceFee}</span> 
          </div>
        `;
      }

      if (dataRaw.taxPercentage > 0) {
        taxSection += `
          <div class="items">
            <span style="margin-right: 15px;">Tax (${dataRaw.taxPercentage}%) : </span>
            <span>${dataRaw.tax}</span> 
          </div>
        `;
      }

      if (dataRaw.promo > 0) {
        promoSection += `
          <div class="promo-text">
            <span>You get discount promo</span>
            <br>
            <span>* ayubukber</span>
          </div>
        `;
      }

      subTotal +=
        `
          <div class="row-items">
            <div class="items">
              <span style="margin-right: 15px;">Sub Total : </span>
              <span>${this.money(dataRaw.subTotal)}</span> 
            </div>
            ` +
        serviceFeeSection +
        taxSection +
        `
            <div class="items">
              <span style="margin-right: 15px;">Grand Total : </span>
              <span>${this.money(dataRaw.total)}</span> 
            </div>
          </div>
          ` +
        promoSection +
        `
        `;

      address += `
          MIE GACOAN AMBENGAN <br>
          JL.Ambengan No 51
        `;

      infoBill += `
          <div class="row-info">
              <div class="items" style="">
                <span>No. Receipt</span>
                <span style="">: ${noNota}</span>
              </div>
              <div class="items">
                <span>Date</span>
                <span>: ${date}</span>
              </div>
              <div class="items">
                <span>Customer </span>
                <span>: ${dataCustomer.name}</span>
              </div>
              <div class="items">
                <span>Order Type</span>
                <span>: ${type.name}</span>
              </div>
              <div class="items">
                <span>Nomor Meja</span>
                <span>: ${dataCustomer.table}</span>
              </div>
          </div>
        `;

      generalInfo += `
          <div class="line-wrapper">
            <span class="line"></span>&nbsp Currency : Rupiah &nbsp<span class="line"></span>
          </div>
        `;

      textThanks += `
        <div class="border-total">
          ** Thank You **
        </div>
      `;

      // Pastikan konten yang akan dicetak adalah yang diinginkan
      const printableContent = `
        <div class="invoice">
          <div class="header">
            <img src="gacoan.png" class="logo">
          </div>
          <div class="address">${address}</div>
          <div class="information">${infoBill}</div>
          ${generalInfo}
          <div class="items-products">${tableContent}</div>
          <div class="summary-total">${subTotal}</div>
          <div class="text">${textThanks}</div>
          <div class="code">${this.noNota}</div>
        </div>
      `;

      // Buat dokumen cetak dalam bentuk iframe
      // const printDocument = document.createElement("iframe");
      // printDocument.style.display = "none"; // Sembunyikan iframe agar tidak terlihat oleh pengguna
      // document.body.appendChild(printDocument);

      // // Tambahkan konten ke dalam iframe
      // printDocument.contentWindow.document.open();
      // printDocument.contentWindow.document.write(`
      //   <html>
      //     <head>
      //       <style>
      //         ${styles}
      //       </style>
      //     </head>
      //     <body class="printed-div">${printableContent}</body>
      //   </html>
      // `);

      // printDocument.contentWindow.document.close();

      // // Setelah iframe dimuat, panggil metode print()
      // printDocument.onload = () => {
      //   printDocument.contentWindow.print();
      // };

      // // Hapus iframe setelah cetak selesai
      // setTimeout(() => {
      //   console.log('ini timeout ditengah print');
      //   printDocument.parentNode.removeChild(printDocument);
      // }, 100);
      // console.log('ini ditengah print');

      const printWindow = window.open("");
      printWindow.document.write(`
        <html>
          <head>
            <style>
              ${styles}
            </style>
          </head>
          <body class="printed-div">${printableContent}</body>
        </html>
      `);

      printWindow.document.close(); // Menutup dokumen untuk menyelesaikan penulisan HTML

      printWindow.onload = () => {
        // Setelah konten dimuat, panggil metode print
        printWindow.print();

        // Tunggu beberapa detik sebelum menutup jendela cetak
        setTimeout(() => {
          printWindow.close();
        }, 1000); // Ubah angka ini sesuai dengan kebutuhan Anda
      };

      let modalBill = document.getElementById("modalWaitingBill");
      modalBill.showModal();

      console.log("ini sebelum timout bawah print");
      setTimeout(() => {
        localStorage.removeItem("cart_items");
        localStorage.removeItem("checkoutData");
        console.log("ini print bawah timout");
        this.$router.push("/");
        modalBill.close();
      }, 1000);
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