<template>
  <dialog id="cart" class="modal" ref="modal" @show="handleDialogShow">
    <div class="modal-box">
      <div class="cart-wrapper">
        <div class="card-cart">
          <div class="head">
            <div class="description">
              <span>Keranjang</span>
              <div class="count-cart">{{ getItem.length }}</div>
              <!-- <div class="spacer-vertical"></div> -->

              <!-- <button class="btn btn-outline-primary" @click="removeAll">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M10.678 5.57152H15.3209C15.3209 4.95584 15.0763 4.36538 14.6409 3.93003C14.2056 3.49467 13.6151 3.2501 12.9994 3.2501C12.3838 3.2501 11.7933 3.49467 11.3579 3.93003C10.9226 4.36538 10.678 4.95584 10.678 5.57152ZM9.28516 5.57152C9.28516 4.58643 9.67648 3.64169 10.373 2.94513C11.0696 2.24856 12.0144 1.85724 12.9994 1.85724C13.9845 1.85724 14.9293 2.24856 15.6258 2.94513C16.3224 3.64169 16.7137 4.58643 16.7137 5.57152H22.5173C22.702 5.57152 22.8791 5.6449 23.0097 5.7755C23.1404 5.90611 23.2137 6.08325 23.2137 6.26795C23.2137 6.45266 23.1404 6.6298 23.0097 6.7604C22.8791 6.89101 22.702 6.96438 22.5173 6.96438H21.3009L20.1708 20.5243C20.0886 21.5108 19.6387 22.4303 18.9103 23.1005C18.1819 23.7708 17.2282 24.1429 16.2383 24.143H9.76058C8.77072 24.1429 7.81703 23.7708 7.08862 23.1005C6.36022 22.4303 5.9103 21.5108 5.82808 20.5243L4.69801 6.96438H3.48158C3.29688 6.96438 3.11974 6.89101 2.98914 6.7604C2.85853 6.6298 2.78516 6.45266 2.78516 6.26795C2.78516 6.08325 2.85853 5.90611 2.98914 5.7755C3.11974 5.6449 3.29688 5.57152 3.48158 5.57152H9.28516ZM7.2163 20.4082C7.2694 21.0465 7.56045 21.6416 8.03172 22.0754C8.50299 22.5091 9.12007 22.75 9.76058 22.7501H16.2383C16.8788 22.75 17.4959 22.5091 17.9672 22.0754C18.4384 21.6416 18.7295 21.0465 18.7826 20.4082L19.9043 6.96438H6.09551L7.2163 20.4082ZM10.9102 10.2144C11.0949 10.2144 11.272 10.2878 11.4026 10.4184C11.5332 10.549 11.6066 10.7261 11.6066 10.9108V18.8037C11.6066 18.9884 11.5332 19.1655 11.4026 19.2961C11.272 19.4267 11.0949 19.5001 10.9102 19.5001C10.7255 19.5001 10.5483 19.4267 10.4177 19.2961C10.2871 19.1655 10.2137 18.9884 10.2137 18.8037V10.9108C10.2137 10.7261 10.2871 10.549 10.4177 10.4184C10.5483 10.2878 10.7255 10.2144 10.9102 10.2144ZM15.7852 10.9108C15.7852 10.7261 15.7118 10.549 15.5812 10.4184C15.4506 10.2878 15.2734 10.2144 15.0887 10.2144C14.904 10.2144 14.7269 10.2878 14.5963 10.4184C14.4657 10.549 14.3923 10.7261 14.3923 10.9108V18.8037C14.3923 18.9884 14.4657 19.1655 14.5963 19.2961C14.7269 19.4267 14.904 19.5001 15.0887 19.5001C15.2734 19.5001 15.4506 19.4267 15.5812 19.2961C15.7118 19.1655 15.7852 18.9884 15.7852 18.8037V10.9108Z"
                    fill="#DA2424"
                  />
                </svg>
                Hapus Semua
              </button> -->
            </div>
            <form method="dialog">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                >
                  <path
                    d="M18 0.5C8.25 0.5 0.5 8.25 0.5 18C0.5 27.75 8.25 35.5 18 35.5C27.75 35.5 35.5 27.75 35.5 18C35.5 8.25 27.75 0.5 18 0.5ZM24.75 26.75L18 20L11.25 26.75L9.25 24.75L16 18L9.25 11.25L11.25 9.25L18 16L24.75 9.25L26.75 11.25L20 18L26.75 24.75L24.75 26.75Z"
                    fill="#232323"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div
            class="list-product-cart"
            v-for="(item, index) in getItem"
            :key="item.uuid"
          >
            <div class="card-cart-item">
              <div class="product">
                <div class="images">
                  <div v-if="item.product.product_images">
                    <img
                      :src="item.product.product_images"
                      loading="lazy"
                      preload
                      alt=""
                      @error="setDefaultImage"
                    />
                  </div>
                </div>

                <div class="content">
                  <div class="description">
                    <div
                      class="information max-w-full w-full min-w-full text-wrap"
                    >
                      <div class="title">{{ item.product.product_name }}</div>
                      <div class="price">
                        {{
                          formatCurrency(
                            item.product.product_pricenow +
                              (item.topping?.reduce(
                                (acc, t) => acc + t.price,
                                0
                              ) || 0)
                          )
                        }}
                      </div>
                      <div v-if="item.topping?.name != null">
                        <p>
                          {{ item.topping.name }} -
                          {{ formatCurrency(item.topping.price) }}
                        </p>
                      </div>
                      <!-- <p class="break-words whitespace-normal">{{ item.product.product_description }}</p> -->
                    </div>

                    <div class="trash">
                      <button @click="removeItem(index)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
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

                  <div class="btn-group">
                    <div class="btn" @click="handleMenuChange(item, index)">
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none" stroke="currentColor" stroke-width="2">
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M4.333 16.048L16.57 3.81a2.56 2.56 0 0 1 3.62 3.619L7.951 19.667a2 2 0 0 1-1.022.547L3 21l.786-3.93a2 2 0 0 1 .547-1.022"
                            />
                            <path d="m14.5 6.5l3 3" />
                          </g>
                        </svg>
                      </button>
                    </div>

                    <div class="split-item">
                      <div class="btn-minus">
                        <button class="btn" @click="decrementValue(index)">
                          -
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="1"
                        class="input input-ghost w-full max-w-xs"
                        :value="item.quantityItem"
                        @input="updateQuantity(index, $event)"
                        readonly
                      />
                      <div class="btn-plus">
                        <button class="btn" @click="incrementValue(index)">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-cart">
        <div class="content">
          <div class="total">
            <button class="btn-icon-cart" @click="showCart">
              <div class="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="34"
                  viewBox="0 0 35 34"
                  fill="none"
                >
                  <path
                    d="M30.6055 12.3752L29.3334 7.81649C28.8425 6.05774 28.597 5.17924 28.0936 4.51599C27.5916 3.85706 26.9098 3.34945 26.1263 3.05124C25.338 2.75024 24.4063 2.75024 22.543 2.75024M3.73047 12.3752L5.00255 7.81649C5.49347 6.05774 5.73893 5.17924 6.24239 4.51599C6.74437 3.85706 7.42612 3.34945 8.20964 3.05124C8.99797 2.75024 9.92964 2.75024 11.793 2.75024"
                    stroke="#272829"
                    stroke-width="2"
                  />
                  <path
                    d="M11.793 2.75C11.793 2.28587 11.9817 1.84075 12.3177 1.51256C12.6537 1.18437 13.1095 1 13.5846 1H20.7513C21.2265 1 21.6822 1.18437 22.0182 1.51256C22.3542 1.84075 22.543 2.28587 22.543 2.75C22.543 3.21413 22.3542 3.65925 22.0182 3.98744C21.6822 4.31563 21.2265 4.5 20.7513 4.5H13.5846C13.1095 4.5 12.6537 4.31563 12.3177 3.98744C11.9817 3.65925 11.793 3.21413 11.793 2.75Z"
                    stroke="#272829"
                    stroke-width="2"
                  />
                  <path
                    d="M10.0029 18.5002V25.5002M24.3363 18.5002V25.5002M17.1696 18.5002V25.5002"
                    stroke="#272829"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2.59094 24.5465C3.56919 28.3667 4.05831 30.276 5.51494 31.389C6.97336 32.5002 8.98898 32.5002 13.0202 32.5002H21.3156C25.3469 32.5002 27.3625 32.5002 28.8227 31.389C30.2794 30.276 30.7685 28.3667 31.7449 24.5465C33.2822 18.5405 34.0508 15.5392 32.4383 13.5197C30.824 11.5002 27.6528 11.5002 21.3174 11.5002H13.0184C6.67952 11.5002 3.51186 11.5002 1.89756 13.5197C0.949773 14.7045 0.822565 16.2287 1.19165 18.5002"
                    stroke="#272829"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <div class="badge badge-primary badge-md">
                {{ getItem.length }}
              </div>
            </button>
            <span> TOTAL : {{ formatCurrency(totalPrice) }}</span>
          </div>

          <div>
            <button
              class="btn btn-primary"
              v-if="getItem.length !== 0"
              @click="handlePayment"
            >
              BAYAR
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.2727 20.3149C11.1824 20.4104 11.1119 20.5227 11.0651 20.6455C11.0183 20.7682 10.9961 20.8989 10.9998 21.0302C11.0035 21.1615 11.0331 21.2908 11.0867 21.4107C11.1404 21.5306 11.2172 21.6387 11.3127 21.7289C11.4081 21.8192 11.5204 21.8897 11.6432 21.9365C11.7659 21.9833 11.8966 22.0055 12.0279 22.0018C12.1592 21.9981 12.2885 21.9685 12.4084 21.9149C12.5283 21.8612 12.6364 21.7844 12.7267 21.6889L21.2267 12.6889C21.4022 12.5033 21.5 12.2575 21.5 12.0019C21.5 11.7464 21.4022 11.5006 21.2267 11.3149L12.7267 2.31395C12.637 2.21639 12.5289 2.1376 12.4086 2.08218C12.2883 2.02676 12.1581 1.99579 12.0257 1.99109C11.8933 1.98639 11.7613 2.00804 11.6374 2.05478C11.5134 2.10153 11.4 2.17244 11.3037 2.26339C11.2073 2.35434 11.1301 2.46353 11.0763 2.58461C11.0225 2.70568 10.9933 2.83624 10.9905 2.96869C10.9876 3.10113 11.011 3.23283 11.0595 3.35613C11.1079 3.47944 11.1804 3.59188 11.2727 3.68695L19.1247 12.0019L11.2727 20.3149Z"
                  fill="white"
                />
              </svg>
            </button>
            <button class="btn btn-disabled" v-else>
              BAYAR
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.2727 20.3149C11.1824 20.4104 11.1119 20.5227 11.0651 20.6455C11.0183 20.7682 10.9961 20.8989 10.9998 21.0302C11.0035 21.1615 11.0331 21.2908 11.0867 21.4107C11.1404 21.5306 11.2172 21.6387 11.3127 21.7289C11.4081 21.8192 11.5204 21.8897 11.6432 21.9365C11.7659 21.9833 11.8966 22.0055 12.0279 22.0018C12.1592 21.9981 12.2885 21.9685 12.4084 21.9149C12.5283 21.8612 12.6364 21.7844 12.7267 21.6889L21.2267 12.6889C21.4022 12.5033 21.5 12.2575 21.5 12.0019C21.5 11.7464 21.4022 11.5006 21.2267 11.3149L12.7267 2.31395C12.637 2.21639 12.5289 2.1376 12.4086 2.08218C12.2883 2.02676 12.1581 1.99579 12.0257 1.99109C11.8933 1.98639 11.7613 2.00804 11.6374 2.05478C11.5134 2.10153 11.4 2.17244 11.3037 2.26339C11.2073 2.35434 11.1301 2.46353 11.0763 2.58461C11.0225 2.70568 10.9933 2.83624 10.9905 2.96869C10.9876 3.10113 11.011 3.23283 11.0595 3.35613C11.1079 3.47944 11.1804 3.59188 11.2727 3.68695L19.1247 12.0019L11.2727 20.3149Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </dialog>

  <dialog id="modalWaiting" class="modal" v-if="showModalWaiting">
    <div class="modal-box">
      <span class="loading loading-spinner"></span>
      <h2>Menyiapkan pesanan ...</h2>
    </div>
  </dialog>

  <ToastComponent :showToast="showToast" :toastMessage="toastMessage" />
  <ModalChangeMenu
    v-if="showModalChangeMenu"
    :getProduct="changeItem"
    ref="modalComponent"
    :key="modalKey"
  />
</template>

<script>
import QuantityInput from "@/components/QuantityInput.vue";
import ToastComponent from "@/components/Toast.vue";
import ModalChangeMenu from "@/components/ModalChangeMenu.vue";
import defaultImage from "~/assets/images/no-image.jpg";

export default {
  components: {
    QuantityInput,
    ToastComponent,
    ModalChangeMenu,
  },
  data() {
    return {
      showBottomCart: false,
      quantityItem: 1,
      getItem: [],
      getItems: [],
      showModalWaiting: false,
      totalPrice: 0,
      showToast: false,
      toastMessage: "",
      showModalChangeMenu: false,
      changeItem: null,
      localStorageListener: null,
      modalKey: 0, // Add this line
    };
  },
  created() {
    // this.updateLocalStorage();
    this.total();
  },
  mounted() {
    // this.localStorageTimer = setInterval(this.checkLocalStorage, 500);
    // setInterval(this.checkLocalStorage, 500);
    this.getCartItems();
    this.calculateTotalPrice();
  },
  methods: {
    setDefaultImage(event) {
      event.target.src = defaultImage;
    },
    checkLocalStorage() {
      const currentCartItems = JSON.parse(localStorage.getItem("cart_items"));
      // console.log('ini error', currentCartItems);
      if (currentCartItems != null) {
        this.getCartItems();
        this.calculateTotalPrice();
      }
    },
    getCartItems() {
      const cartItems = JSON.parse(localStorage.getItem("cart_items"));
      this.getItem = cartItems.data;
    },
    removeItem(index) {
      this.getItem.splice(index, 1);

      localStorage.setItem(
        "cart_items",
        JSON.stringify({ isDone: false, data: this.getItem })
      );
      const cartItems = JSON.parse(localStorage.getItem("cart_items")[0].data);

      if (cartItems.length == 0) {
        this.totalPrice = 0;
        localStorage.removeItem("cart_items");
      }

      this.calculateTotalPrice();
    },
    calculateTotalPrice() {
      this.totalPrice = this.getItem.reduce(
        (total, item) =>
          total +
          (item.product.product_pricenow +
            (item.topping?.reduce((acc, t) => acc + t.price, 0) || 0)) *
            item.quantityItem,
        0
      );
    },
    recalculatePayment() {
      if (Array.isArray(this.getItem)) {
        this.getItem.forEach((item) => {
          if (
            item.product &&
            item.product.product_pricenow &&
            item.quantityItem
          ) {
            this.totalPrice =
              parseFloat(item.product.product_pricenow) * item.quantityItem;
          }
        });
      }

      return this.totalPrice;
    },
    total() {
      if (Array.isArray(this.getItem)) {
        this.getItem.forEach((item) => {
          if (
            item.product &&
            item.product.product_pricenow &&
            item.quantityItem
          ) {
            const modifierPrice = item.topping?.price || 0;
            this.totalPrice +=
              (parseFloat(item.product.product_pricenow) + modifierPrice) *
              item.quantityItem;
          }
        });
      }

      return this.totalPrice;
    },
    removeAll() {
      localStorage.removeItem("cart_items");
      this.showToastMessage("Item berhasil dihapus dari keranjang!");
      window.location.reload();
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;

      setTimeout(() => {
        this.hideToast();
      }, 1000);
    },
    hideToast() {
      this.showToast = false;
    },
    handlePayment() {
      this.showModalWaiting = true;
      this.$nextTick(() => {
        let modal = document.getElementById("modalWaiting");
        modal.showModal();
      });

      setTimeout(() => {
        this.$router.push("/site/checkout");
      }, 2000);
    },
    showCart() {
      this.getCartItems();
      this.calculateTotalPrice();
      this.$refs.modalCart.showModal();
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
    },
    updateItemNote(index, event) {
      this.getItem[index].note = event.target.value;
      console.log("dd", this.getItem[index].note);
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      localStorage.setItem("cart_items", JSON.stringify(this.getItem));
    },
    showModal() {
      this.getCartItems();
      this.calculateTotalPrice();
      this.showBottomCart = true;
      this.$refs.modal.showModal();
    },
    hideModal() {
      this.$refs.modal.close();
    },
    updateQuantity(index, event) {
      const newValue = parseInt(event.target.value);
      if (!isNaN(newValue) && newValue > 0) {
        this.getItem[index].quantityItem = newValue;
        this.calculateTotalPrice(); // Recalculate total price after quantity update
      }
    },
    incrementValue(index) {
      this.getItem[index].quantityItem++;
      this.calculateTotalPrice();

      localStorage.setItem(
        "cart_items",
        JSON.stringify({ isDone: false, data: this.getItem })
      );
    },
    decrementValue(index) {
      if (this.getItem[index].quantityItem > 1) {
        this.getItem[index].quantityItem--;
        this.calculateTotalPrice();

        localStorage.setItem(
          "cart_items",
          JSON.stringify({ isDone: false, data: this.getItem })
        );
      } else {
        this.removeItem(index);
      }
    },
    handleMenuChange(item, index) {
      // Dapatkan data dari localStorage dengan kunci 'cart_items'
      let cartItems = JSON.parse(localStorage.getItem("cart_items")).data || [];

      // Cari item yang sama berdasarkan product_id
      // let existingItem = cartItems.find(
      //   (cartItem) => cartItem.product.product_id === item.product.product_id
      // );
      let existingItem = cartItems[index];

      if (existingItem) {
        this.changeItem = existingItem;
      }

      // Tampilkan modal perubahan menu
      this.showModalChangeMenu = true;
      this.modalKey++; // Add this line to re render new modal
      this.$nextTick(() => {
        if (this.$refs.modalComponent) {
          this.$refs.modalComponent.showModal(item); // Perubahan disini juga
        }
      });
      this.$refs.modal.close();
    },
  },
};
</script>
