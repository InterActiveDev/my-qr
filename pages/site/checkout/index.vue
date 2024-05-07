<template>
  <div>
    <Navbar :to="navbarTo" />

    <section id="checkout">
      <div class="head-title">
        <h2>CHECKOUT PESANAN</h2>
      </div>

      <div class="spacer"></div>

      <div class="type-order">
        <span>Jenis Pesanan</span>
        <h2>DINE IN</h2>
      </div>

      <div class="spacer"></div>

      <div class="item-order">
        <div class="head">
          <span>Pesanan Anda </span>
          <span class="mr-10">Harga</span>
        </div>

        <div class="list-item-order">
          <div
            class="item mb-5"
            v-for="(items, index) in products"
            :key="items.uuid"
          >
            <div class="col-1">
              <span class="item-name">
                ({{ items.quantityItem }}x)
                {{ items.product.product_name }}
                <sup>
                  {{
                    items.topping.name != undefined
                      ? "(" +
                        items.topping.name +
                        " - " +
                        formatCurrency(items.topping.price) +
                        ")"
                      : ""
                  }}
                </sup>
                <span class="font-bold">
                  {{ items.wrap == true ? "(" + "Bungkus" + ")" : "" }}
                </span>
              </span>
              <div class="qty">
                <div class="split-item">
                  <button class="btn btn-minus" @click="decrementValue(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="5"
                      viewBox="0 0 21 5"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.192383 2.5C0.192383 1.39543 1.08781 0.5 2.19238 0.5H18.1924C19.297 0.5 20.1924 1.39543 20.1924 2.5C20.1924 3.60457 19.297 4.5 18.1924 4.5H2.19238C1.08781 4.5 0.192383 3.60457 0.192383 2.5Z"
                        fill="#DA2424"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="1"
                    class="input input-ghost w-full max-w-xs"
                    :value="items.quantityItem"
                    @input="updateQuantity(index, $event)"
                    readonly
                  />
                  <button class="btn btn-plus" @click="incrementValue(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.192383 10.498C0.192383 9.39348 1.08781 8.49805 2.19238 8.49805H18.1924C19.297 8.49805 20.1924 9.39348 20.1924 10.498C20.1924 11.6026 19.297 12.498 18.1924 12.498H2.19238C1.08781 12.498 0.192383 11.6026 0.192383 10.498Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.1924 0.5C11.297 0.5 12.1924 1.39543 12.1924 2.5L12.1924 18.5C12.1924 19.6046 11.297 20.5 10.1924 20.5C9.08781 20.5 8.19238 19.6046 8.19238 18.5L8.19238 2.5C8.19238 1.39543 9.08781 0.5 10.1924 0.5Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  <button @click="removeItem(index)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      viewBox="0 0 34 34"
                      fill="none"
                    >
                      <path
                        d="M13.964 7.28585H20.0354C20.0354 6.48073 19.7156 5.70859 19.1463 5.13928C18.577 4.56997 17.8048 4.25014 16.9997 4.25014C16.1946 4.25014 15.4225 4.56997 14.8531 5.13928C14.2838 5.70859 13.964 6.48073 13.964 7.28585ZM12.1426 7.28585C12.1426 5.99766 12.6543 4.76223 13.5652 3.85134C14.4761 2.94044 15.7115 2.42871 16.9997 2.42871C18.2879 2.42871 19.5233 2.94044 20.4342 3.85134C21.3451 4.76223 21.8569 5.99766 21.8569 7.28585H29.4462C29.6877 7.28585 29.9193 7.3818 30.0901 7.5526C30.2609 7.72339 30.3569 7.95503 30.3569 8.19657C30.3569 8.4381 30.2609 8.66975 30.0901 8.84054C29.9193 9.01133 29.6877 9.10728 29.4462 9.10728H27.8554L26.3777 26.8395C26.2701 28.1295 25.6818 29.3319 24.7293 30.2084C23.7767 31.0849 22.5296 31.5715 21.2352 31.5716H12.7643C11.4699 31.5715 10.2227 31.0849 9.27019 30.2084C8.31766 29.3319 7.72931 28.1295 7.62179 26.8395L6.14401 9.10728H4.55329C4.31176 9.10728 4.08011 9.01133 3.90932 8.84054C3.73853 8.66975 3.64258 8.4381 3.64258 8.19657C3.64258 7.95503 3.73853 7.72339 3.90932 7.5526C4.08011 7.3818 4.31176 7.28585 4.55329 7.28585H12.1426ZM9.43715 26.6877C9.50659 27.5224 9.88719 28.3006 10.5035 28.8678C11.1197 29.435 11.9267 29.75 12.7643 29.7501H21.2352C22.0727 29.75 22.8797 29.435 23.496 28.8678C24.1123 28.3006 24.4929 27.5224 24.5623 26.6877L26.0292 9.10728H7.97151L9.43715 26.6877ZM14.2676 13.3573C14.5091 13.3573 14.7408 13.4532 14.9116 13.624C15.0823 13.7948 15.1783 14.0265 15.1783 14.268V24.5894C15.1783 24.831 15.0823 25.0626 14.9116 25.2334C14.7408 25.4042 14.5091 25.5001 14.2676 25.5001C14.026 25.5001 13.7944 25.4042 13.6236 25.2334C13.4528 25.0626 13.3569 24.831 13.3569 24.5894V14.268C13.3569 14.0265 13.4528 13.7948 13.6236 13.624C13.7944 13.4532 14.026 13.3573 14.2676 13.3573ZM20.6426 14.268C20.6426 14.0265 20.5466 13.7948 20.3758 13.624C20.205 13.4532 19.9734 13.3573 19.7319 13.3573C19.4903 13.3573 19.2587 13.4532 19.0879 13.624C18.9171 13.7948 18.8212 14.0265 18.8212 14.268V24.5894C18.8212 24.831 18.9171 25.0626 19.0879 25.2334C19.2587 25.4042 19.4903 25.5001 19.7319 25.5001C19.9734 25.5001 20.205 25.4042 20.3758 25.2334C20.5466 25.0626 20.6426 24.831 20.6426 24.5894V14.268Z"
                        fill="#DA2424"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-2">
              <span>{{
                formatCurrency(
                  (items.product.product_pricenow +
                    (items.topping?.price || 0)) *
                    parseInt(items.quantityItem)
                )
              }}</span>
            </div>
          </div>
          <button class="btn btn-add-more" @click="backtoHome">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="25"
              viewBox="0 0 27 25"
              fill="none"
            >
              <path
                d="M23.4744 9.25381L22.5302 5.87006C22.1658 4.56462 21.9836 3.91255 21.6099 3.42025C21.2373 2.93115 20.7313 2.55438 20.1497 2.33304C19.5646 2.10962 18.8731 2.10962 17.49 2.10962M3.52637 9.25381L4.47058 5.87006C4.83496 4.56462 5.01715 3.91255 5.39085 3.42025C5.76344 2.93115 6.26948 2.55438 6.85104 2.33304C7.43619 2.10962 8.12772 2.10962 9.51078 2.10962"
                stroke="white"
                stroke-width="1.48451"
              />
              <path
                d="M9.51074 2.10876C9.51074 1.76426 9.65085 1.43387 9.90025 1.19027C10.1497 0.946667 10.4879 0.809814 10.8406 0.809814H16.1601C16.5128 0.809814 16.8511 0.946667 17.1005 1.19027C17.3499 1.43387 17.49 1.76426 17.49 2.10876C17.49 2.45326 17.3499 2.78365 17.1005 3.02725C16.8511 3.27085 16.5128 3.4077 16.1601 3.4077H10.8406C10.4879 3.4077 10.1497 3.27085 9.90025 3.02725C9.65085 2.78365 9.51074 2.45326 9.51074 2.10876Z"
                stroke="white"
                stroke-width="1.48451"
              />
              <path
                d="M8.18164 13.7991V18.9948M18.8206 13.7991V18.9948M13.5011 13.7991V18.9948"
                stroke="white"
                stroke-width="1.48451"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.68088 18.2864C3.40699 21.122 3.77004 22.5391 4.85123 23.3653C5.93374 24.1901 7.42985 24.1901 10.4221 24.1901H16.5794C19.5716 24.1901 21.0677 24.1901 22.1515 23.3653C23.2327 22.5391 23.5957 21.122 24.3205 18.2864C25.4616 13.8284 26.0321 11.6007 24.8352 10.1018C23.637 8.60278 21.2831 8.60278 16.5807 8.60278H10.4207C5.71564 8.60278 3.36443 8.60278 2.16622 10.1018C1.46272 10.9811 1.3683 12.1125 1.64225 13.7986"
                stroke="white"
                stroke-width="1.48451"
                stroke-linecap="round"
              />
            </svg>
            Tambah Pesanan Lainya
          </button>
        </div>
      </div>
      <!-- <div class="spacer"></div> -->

      <!-- summary pay -->
      <div class="card-summary">
        <div class="card-item">
          <div class="title">Rincian Pembayaran</div>
          <div class="item">
            <span>Subtotal ({{ countSubTotal }} menu)</span>
            <span>{{ formatCurrency(subTotal) }}</span>
          </div>

          <div class="striper" v-if="serviceFee > 0"></div>
          <div class="item" v-if="serviceFee > 0">
            <span v-if="serviceFee > 0">{{ dataRestaurant.service_name }}</span>
            <span v-if="serviceFee > 0">{{ formatCurrency(serviceFee) }}</span>
          </div>

          <div class="striper" v-if="tax > 0"></div>
          <div class="item" v-if="tax > 0">
            <span v-if="tax > 0">{{ dataRestaurant.tax_name }} </span>
            <span v-if="tax > 0">{{ formatCurrency(tax) }}</span>
          </div>

          <!-- disable rounding untuk tes -->
          <div
            class="striper"
            v-if="rounding != 0 && roundingType != 'none'"
          ></div>
          <div class="item" v-if="rounding != 0 && roundingType != 'none'">
            <span v-if="rounding != 0 && roundingType != 'none'">Rounding</span>
            <span v-if="rounding != 0 && roundingType != 'none'">{{
              formatCurrency(rounding)
            }}</span>
          </div>

          <div class="striper"></div>
          <div class="item">
            <h2>Total Pembayaran</h2>
            <div class="price">{{ formatCurrency(totalPay) }}</div>
          </div>
        </div>

        <div class="btn-group">
          <button class="btn btn-back" @click="backtoHome">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="68"
              height="69"
              viewBox="0 0 68 69"
              fill="none"
            >
              <rect
                y="69"
                width="68.8947"
                height="68"
                rx="15"
                transform="rotate(-90 0 69)"
                fill="white"
              />
              <path
                d="M39.6667 20.1996L25.5 34.5527L39.6667 48.9058"
                stroke="black"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <div class="spacer-vertical"></div>
          <button
            class="btn btn-pay"
            @click="openModalPayment"
            :disabled="validatePayment"
          >
            BAYAR
          </button>
        </div>
      </div>
      <!-- end summary pay -->
    </section>

    <!-- modal select payments -->
    <dialog id="modalSelectPayments" class="modal">
      <div class="modal-box">
        <div class="title">Pilih Metode pembayaran</div>

        <div
          v-for="(payment, index) in paymentMethod"
          :key="index"
          class="row-item"
        >
          <!-- ini qris buat test data lokal -->
          <!-- <div class="item" @click="openModal('e-money')">
            <div class="col-1">
              <img
                src="~/assets/icons/qris.png"
                loading="lazy"
                preload
                alt=""
              />
              <span>QRIS </span>
            </div>
          </div> -->
          <div class="item" @click="openModal(payment.payment_category)">
            <div class="col-1">
              <img
                v-if="payment.payment_category === 'e-money'"
                src="~/assets/icons/qris.png"
                loading="lazy"
                alt=""
              />

              <img v-else src="~/assets/icons/cash.png" loading="lazy" alt="" />
              <span>{{ payment.payment_method }} </span>
            </div>
          </div>
          <!-- <div class="item" @click="openModalQrisMethod">
            <div class="col-1">
              <img
                src="~/assets/icons/qris.png"
                loading="lazy"
                preload
                alt=""
              />
              <span>QRIS </span>
            </div>
          </div>
          <div class="item" @click="toInputReceipt">
            <div class="col-1">
              <img
                src="~/assets/icons/cash.png"
                loading="lazy"
                preload
                alt=""
              />
              <span>Cash </span>
            </div>
          </div> -->
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- end modal select payments -->

    <!-- modal qris method -->
    <dialog id="modalQrisMethod" class="modal">
      <div class="modal-box">
        <img
          src="~/assets/images/buble.png"
          loading="lazy"
          preload
          class="buble-img"
          alt="Buble"
        />
        <div class="head">
          <div></div>
          <div class="description">
            <span>Pembayaran</span>
          </div>
          <form method="dialog">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20 2.5C10.25 2.5 2.5 10.25 2.5 20C2.5 29.75 10.25 37.5 20 37.5C29.75 37.5 37.5 29.75 37.5 20C37.5 10.25 29.75 2.5 20 2.5ZM26.75 28.75L20 22L13.25 28.75L11.25 26.75L18 20L11.25 13.25L13.25 11.25L20 18L26.75 11.25L28.75 13.25L22 20L28.75 26.75L26.75 28.75Z"
                  fill="#DA2424"
                />
              </svg>
            </button>
          </form>
        </div>

        <div class="total-price">
          <span class="title">Total Pembayaran</span>
          <span class="price">{{ formatCurrency(totalPay) }}</span>
        </div>

        <div class="alert">
          <div class="head">
            <img
              src="~/assets/icons/warning.png"
              loading="lazy"
              preload
              alt=""
              srcset=""
            />
            <p>
              Mohon segera membayar pesanan dan tunggu sampai muncul halaman
              pembayaran berhasil
            </p>
          </div>
        </div>

        <div class="qris" @click="toInputTable">
          <!-- terapkan qr disini -->
          <template v-if="qrCodeImage">
            <!-- Tampilkan QR code jika sudah digenerate -->
            <img :src="qrCodeImage" alt="QR Code" />
          </template>
          <template v-else>
            <!-- Placeholder blur ketika QR code belum tergenerate -->
            <div
              style="
                width: 400px;
                height: 400px;
                background-color: #f0f0f0;
                filter: blur(5px);
              "
            ></div>
          </template>
          <span>QRIS MIE GACOAN</span>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    <!-- end modal qris method -->
  </div>

  <dialog id="modalWaiting" class="modal" v-if="showModalWaiting">
    <div class="modal-box">
      <span class="loading loading-spinner"></span>
      <h2>Menyiapkan ...</h2>
    </div>
  </dialog>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import Navbar from "@/components/Navbar.vue";
import HomeCarousel from "@/components/HomeCarousel.vue";
import ProductSlider from "@/components/ProductSlider.vue";
import ProductSliderDouble from "@/components/ProductSliderDouble.vue";
import Footer from "@/components/Footer.vue";
import FetchData from "~/middleware/services/Fetch.js";
import QRCode from "qrcode";

export default defineComponent({
  component: {
    Navbar,
    HomeCarousel,
    ProductSlider,
    ProductSliderDouble,
    Footer,
  },
  data() {
    return {
      navbarTo: "/home",
      showModalWaiting: false,
      validatePayment: false,
      products: [],
      subTotal: 0,
      countSubTotal: 0,
      promo: 0,
      deliveryFee: 0,
      totalPay: 0,
      quantity: 1,
      tax: 0,
      taxPercentage: 0,
      serviceFee: 0,
      serviceFeePercentage: 0,
      rounding: 0,
      roundingType: "none",
      dataRestaurant: [],
      link: "",
      qrCodeImage: "",
      noNota: "",
      invoiceId: "",
      refNo: "",
      mID: "",
      intervalId: null,
      transactionId: "",
      paymentMethod: [],
      nameMethod: 0,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const data_restaurant =
        JSON.parse(localStorage.getItem("data_restaurant")) || [];

      this.paymentMethod =
        JSON.parse(localStorage.getItem("payment_method")) || [];
      this.dataRestaurant = data_restaurant;
      this.products = cartItems;
      this.countSubTotal = cartItems.length;
      this.subTotal = this.calculateTotal(cartItems, data_restaurant);
      if (data_restaurant.tax_nominal != null) {
        this.tax = Math.round(
          (this.subTotal * data_restaurant.tax_nominal) / 100
        );
        this.taxPercentage = data_restaurant.tax_nominal;
      }
      if (data_restaurant.service_nominal != null) {
        this.serviceFee = Math.round(
          (this.subTotal * data_restaurant.service_nominal) / 100
        );
        this.serviceFeePercentage = data_restaurant.service_nominal;
      }

      let tempTotalPay = 0;
      let divided = 0;
      let mod = 0;

      tempTotalPay =
        this.subTotal +
        this.serviceFee +
        this.tax +
        this.deliveryFee +
        this.promo;

      divided = Math.floor(tempTotalPay / data_restaurant.rounding_nominal);
      mod = tempTotalPay % data_restaurant.rounding_nominal;

      this.roundingType = data_restaurant.rounding;
      if (data_restaurant.rounding == "up") {
        this.rounding =
          Math.ceil(tempTotalPay / data_restaurant.rounding_nominal) *
            data_restaurant.rounding_nominal -
          tempTotalPay;
      } else if (data_restaurant.rounding == "down") {
        this.rounding =
          Math.floor(tempTotalPay / data_restaurant.rounding_nominal) *
            data_restaurant.rounding_nominal -
          tempTotalPay;
      } else if (data_restaurant.rounding == "auto") {
        if (mod >= data_restaurant.rounding_nominal / 2) {
          this.rounding =
            Math.ceil(tempTotalPay / data_restaurant.rounding_nominal) *
              data_restaurant.rounding_nominal -
            tempTotalPay;
        } else {
          this.rounding =
            Math.floor(tempTotalPay / data_restaurant.rounding_nominal) *
              data_restaurant.rounding_nominal -
            tempTotalPay;
        }
      } else {
        this.rounding = 0;
      }

      // disable buat tes tanpa rounding
      this.totalPay = tempTotalPay + this.rounding;
      if (this.totalPay <= 0) {
        // kalau jumlah kurang dari 0 di disable button nya
        this.validatePayment = true;
      }
    },
    removeItem(index) {
      this.products.splice(index, 1);

      localStorage.setItem("cartItems", JSON.stringify(this.products));
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      if (cartItems.length == 0) {
        localStorage.removeItem("cartItems");
        this.$router.push("/home");
      }

      // Panggil metode untuk menghitung ulang pembayaran
      this.recalculatePayment();
    },
    calculateTotal(items) {
      let totalPrice = 0;
      items.forEach((item) => {
        if (
          item.product &&
          item.product.product_pricenow &&
          item.quantityItem
        ) {
          let modifierPrice = item.topping?.price || 0;
          totalPrice +=
            (parseFloat(item.product.product_pricenow) + modifierPrice) *
            item.quantityItem;
        }
      });
      return totalPrice;
    },
    recalculatePayment() {
      this.countSubTotal = this.products.length;
      this.subTotal = this.calculateTotal(this.products);
      if (this.dataRestaurant.tax_nominal != null) {
        this.tax = Math.round(
          (this.subTotal * this.dataRestaurant.tax_nominal) / 100
        );
        this.taxPercentage = this.dataRestaurant.tax_nominal;
      }
      if (this.dataRestaurant.service_nominal != null) {
        this.serviceFee = Math.round(
          (this.subTotal * this.dataRestaurant.service_nominal) / 100
        );
        this.serviceFeePercentage = this.dataRestaurant.service_nominal;
      }

      let tempTotalPay = 0;
      tempTotalPay =
        this.subTotal +
        this.serviceFee +
        this.tax +
        this.deliveryFee +
        this.promo;

      let divided = 0;
      let mod = 0;
      divided = Math.floor(tempTotalPay / this.dataRestaurant.rounding_nominal);
      mod = tempTotalPay % this.dataRestaurant.rounding_nominal;

      if (this.dataRestaurant.rounding == "up") {
        this.rounding =
          Math.ceil(tempTotalPay / this.dataRestaurant.rounding_nominal) *
            this.dataRestaurant.rounding_nominal -
          tempTotalPay;
      } else if (this.dataRestaurant.rounding == "down") {
        this.rounding =
          Math.floor(tempTotalPay / this.dataRestaurant.rounding_nominal) *
            this.dataRestaurant.rounding_nominal -
          tempTotalPay;
      } else {
        if (mod >= this.dataRestaurant.rounding_nominal / 2) {
          this.rounding =
            Math.ceil(tempTotalPay / this.dataRestaurant.rounding_nominal) *
              this.dataRestaurant.rounding_nominal -
            tempTotalPay;
        } else {
          this.rounding =
            Math.floor(tempTotalPay / this.dataRestaurant.rounding_nominal) *
              this.dataRestaurant.rounding_nominal -
            tempTotalPay;
        }
      }

      this.totalPay = tempTotalPay;
      // disable rounding untuk tes
      // this.totalPay = tempTotalPay + this.rounding;
      // if(this.totalPay <= 0){
      //   // kalau jumlah kurang dari 0 di disable button nya
      //   this.validatePayment = true;
      // }
    },
    backtoHome() {
      this.$router.push("/home");
    },
    openModalPayment() {
      let modal = document.getElementById("modalSelectPayments");

      let checkoutData = JSON.parse(localStorage.getItem("checkoutData")) || [];
      const checkoutItem = {
        product: this.products,
        subTotal: this.subTotal,
        promo: this.promo,
        serviceFee: this.serviceFee,
        serviceFeePercentage: this.serviceFeePercentage,
        deliveryFee: this.deliveryFee,
        total: this.totalPay,
        tax: this.tax,
        taxPercentage: this.taxPercentage,
        rounding: this.rounding,
      };

      const existingIndex = checkoutData.findIndex((item) => {
        return item.total === checkoutItem.total;
      });

      if (existingIndex !== -1) {
        checkoutData.splice(existingIndex, 1, checkoutItem);
      } else {
        checkoutData.push(checkoutItem);
      }

      const checkoutDataString = JSON.stringify(checkoutData);
      localStorage.setItem("checkoutData", checkoutDataString);

      modal.showModal();
    },
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
    sendTransaction() {
      this.buttonClicked = true;
      this.table = JSON.parse(localStorage.getItem("data_customer"));

      const checkoutData =
        JSON.parse(localStorage.getItem("checkoutData")) || [];
      const tableList = JSON.parse(localStorage.getItem("table_list")) || [];
      const token = JSON.parse(this.getCookie("user-data-log")).token;
      const location = localStorage.getItem("location");
      const locId = atob(location);
      const dataCustomer =
        JSON.parse(localStorage.getItem("data_customer")) || [];
      const typeOrder = JSON.parse(localStorage.getItem("type_order"));
      const data_restaurant = JSON.parse(
        localStorage.getItem("data_restaurant")
      );
      const paymentMethod =  JSON.parse(
        localStorage.getItem("payment_method")
      );

      paymentMethod.forEach((element) => {
        if(this.table.paymentMethod == element.payment_category){
          this.nameMethod = element.payment_id;
        }
      })

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      // Retrieve current time
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const seconds = String(today.getSeconds()).padStart(2, "0");
      const dateYMD = `${year}-${month}-${day}`;
      const dateYMDHMS = `${year}-${month}-${day}`;
      const data = [
        {
          mID: data_restaurant.mID, // kalau pakai qris
          appid: data_restaurant.appid,
          loc_id: locId,
          restaurant_table: "", // checkTable[0].table_id
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
            payment_name: this.table.paymentMethod == "e-money" ? "qris" : "cash", // qris - cash
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
      ];

      // console.log('data', data);
      // return null;
      const url = "/transactions/insert_transaction";

      FetchData.createData(url, JSON.stringify(data), token)
        .then((result) => {
          if (result && result.data.status === "success") {
            // sukses simpan transaksi
            const data = {
              contents: result.data.result[0],
              nota: result.data.result[0].noNota,
              invoice: result.data.result[0].qrisData.noNota,
              ref: result.data.result[0].qrisData.refNo,
            };
            localStorage.setItem("qrContent", JSON.stringify(data));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    openModalConfrimOrder() {
      let modalConfirm = document.getElementById("modalConfirmOrder");
      let modalSelectPayment = document.getElementById("modalSelectPayments");
      modalConfirm.showModal();
      modalSelectPayment.close();
    },
    openModalQrisMethod() {
      this.showModalWaiting = true;
      this.$nextTick(() => {
        this.sendTransaction();
        let modal = document.getElementById("modalWaiting");
        modal.showModal();
      });

      const checkQrContent = setInterval(() => {
        const data = JSON.parse(localStorage.getItem("qrContent"));
        if (data) {
          clearInterval(checkQrContent); // Stop the loop once data is found
          this.$router.push("/qris");
        }
      }, 1000); // Check every second
    },
    openModal(name) {
      let dataCustomer = localStorage.getItem("data_customer");

      dataCustomer = dataCustomer ? JSON.parse(dataCustomer) : {};

      if (name === "cash") {
        dataCustomer.paymentMethod = "cash";
        this.toInputReceipt();
      } else if (name === "e-money") {
        dataCustomer.paymentMethod = "e-money";
        this.openModalQrisMethod();
      } else {
        alert("Payment method is not registered.");
      }

      localStorage.setItem("data_customer", JSON.stringify(dataCustomer));
    },
    closeModalConfrimOrder() {
      let modalConfirm = document.getElementById("modalConfirmOrder");
      modalConfirm.close();
    },
    toInputReceipt() {
      this.sendTransaction();
      this.$router.push("/receipt");
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
    },
    updateQuantity(index, event) {
      this.$set(this.products[index], "quantityItem", event.target.value);
      localStorage.setItem("cartItems", JSON.stringify(this.products));
    },
    incrementValue(index) {
      this.products[index].quantityItem++;
      this.recalculatePayment();

      localStorage.setItem("cartItems", JSON.stringify(this.products));
    },
    decrementValue(index) {
      if (this.products[index].quantityItem > 1) {
        this.products[index].quantityItem--;
        this.recalculatePayment();
        localStorage.setItem("cartItems", JSON.stringify(this.products));
      }
    },
  },
});
</script>
<style scoped>
/* CSS for this component */
/* .loading {
    width: 100px;
    color: #da2424;
  } */
</style>