<template>
  <div class="bottom-cart">
    <div class="content">
      <div class="total">
        <button class="btn-icon-cart" @click="showCart">
          <div class="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
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

          <div class="badge badge-primary badge-md">{{ getItem.length }}</div>
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
      </div>
    </div>
  </div>

  <dialog id="modalWaiting" class="modal" v-if="showModalWaiting">
    <div class="modal-box">
      <span class="loading loading-spinner"></span>
      <h2>Menyiapkan pesanan ...</h2>
    </div>
  </dialog>

  <Cart ref="modalCart" />
</template>

<script>
import Cart from "@/components/Cart.vue";

export default {
  components: {
    Cart,
  },
  data() {
    return {
      showModalWaiting: false,
      getItem: [],
      totalPrice: 0,
    };
  },
  created() {
    this.getCartItems();
  },
  methods: {
    handlePayment() {
      // this.showModalWaiting = true;
      // this.$nextTick(() => {
      //   let modal = document.getElementById("modalWaiting");
      //   modal.showModal();
      // });

      this.$router.push("/site/checkout");
    },
    getCartItems() {
      const cartItems = JSON.parse(localStorage.getItem("cart_items"));
      this.getItem = cartItems;
      this.total();
    },
    recalculatePayment() {
      if (Array.isArray(this.getItem)) {
        this.getItem.forEach((item) => {
          if (item.product && item.product.fix_price && item.quantityItem) {
            this.totalPrice +=
              parseFloat(item.product.fix_price) * item.quantityItem;
          }
        });
      }

      return this.totalPrice;
    },
    total() {
      if (Array.isArray(this.getItem)) {
        this.getItem.forEach((item) => {
          this.totalPrice +=
            parseFloat(item.product.product_pricenow) * item.quantityItem;
        });
      }

      return this.totalPrice;
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
    },
    showCart() {
      this.$refs.modalCart.showModal();
    },
  },
};
</script>
