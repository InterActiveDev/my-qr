<template>
  <div class="frame">
    <div class="navbar flex justify-between z-50">
      <div class="back">
        <div
          class="ml-20"
          v-if="
            isIndexRoute ||
            isCheckoutRoute ||
            isReceipt ||
            isIndexOrHomeRoute ||
            isId ||
            isListBranchStore
          "
        ></div>
        <div class="ml-0" v-if="isQris"></div>
        <div class="ml-20" v-if="isRestaurantDetail">&nbsp;</div>
        <nuxt-link
          v-if="
            !isBackOfficeRoute &&
            !isCheckoutRoute &&
            !isRestaurantDetail &&
            !isReceipt &&
            !isIndexOrHomeRoute &&
            !isId &&
            !isListBranchStore
          "
          :to="to"
          class="text-xl ml-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
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
        </nuxt-link>
        <button
          class="btn-back"
          v-if="isBackOfficeRoute"
          @click="openModalCancelOrder"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
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
      </div>
      <div class="title">
        <img
          src="~/assets/icons/logo.png"
          loading="lazy"
          preload
          class="w-32"
          alt=""
          srcset=""
        />
      </div>
      <div class="profile">
        <div v-if="!isIndexRoute" class="mr-16"></div>
        <button
          class="btn"
          @click="goToBackOffice"
          v-if="isIndexRoute"
          style="border: none"
        >
          <svg
            style="display: none"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="37"
            viewBox="0 0 38 37"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.0172 13.1978C15.8962 13.1978 13.3662 15.7278 13.3662 18.8488C13.3662 21.9698 15.8962 24.4999 19.0172 24.4999C22.1382 24.4999 24.6683 21.9698 24.6683 18.8488C24.6683 15.7278 22.1382 13.1978 19.0172 13.1978ZM15.6266 18.8488C15.6266 16.9762 17.1446 15.4582 19.0172 15.4582C20.8898 15.4582 22.4078 16.9762 22.4078 18.8488C22.4078 20.7214 20.8898 22.2394 19.0172 22.2394C17.1446 22.2394 15.6266 20.7214 15.6266 18.8488Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.9792 2.64917C18.3094 2.64916 17.7502 2.64915 17.2912 2.68047C16.8134 2.71307 16.362 2.78336 15.9244 2.96462C14.909 3.38522 14.1022 4.19197 13.6816 5.20739C13.4626 5.73602 13.4033 6.29314 13.3807 6.8987C13.3625 7.38548 13.1168 7.79163 12.7543 8.00095C12.3917 8.21026 11.9172 8.21994 11.4865 7.99231C10.9507 7.70914 10.4386 7.48193 9.87132 7.40725C8.78164 7.26379 7.6796 7.55908 6.80764 8.22816C6.43186 8.5165 6.14531 8.87225 5.87814 9.26978C5.6215 9.65166 5.34194 10.1359 5.00706 10.7159L4.96901 10.7819C4.63411 11.3619 4.35454 11.8461 4.15214 12.2593C3.94145 12.6894 3.77664 13.1155 3.71482 13.5851C3.57136 14.6748 3.86665 15.7768 4.53573 16.6488C4.88401 17.1026 5.33676 17.4325 5.84979 17.7549C6.26236 18.0141 6.49131 18.4301 6.49129 18.8488C6.49126 19.2675 6.26232 19.6834 5.8498 19.9426C5.33671 20.2649 4.88389 20.5948 4.53558 21.0488C3.8665 21.9207 3.57121 23.0228 3.71467 24.1125C3.77649 24.5821 3.94131 25.0081 4.152 25.4382C4.35439 25.8514 4.63395 26.3356 4.96884 26.9157L5.00691 26.9816C5.34179 27.5617 5.62136 28.0459 5.878 28.4278C6.14516 28.8253 6.43172 29.181 6.80749 29.4694C7.67945 30.1385 8.78149 30.4338 9.87117 30.2903C10.4384 30.2156 10.9505 29.9884 11.4863 29.7053C11.917 29.4776 12.3916 29.4873 12.7542 29.6966C13.1168 29.906 13.3625 30.3122 13.3807 30.799C13.4034 31.4046 13.4627 31.9616 13.6816 32.4902C14.1022 33.5057 14.909 34.3124 15.9244 34.733C16.362 34.9143 16.8134 34.9846 17.2912 35.0172C17.7502 35.0485 18.3094 35.0485 18.9791 35.0485H19.0553C19.725 35.0485 20.2842 35.0485 20.7432 35.0172C21.2211 34.9846 21.6724 34.9143 22.11 34.733C23.1254 34.3124 23.9322 33.5057 24.3528 32.4903C24.5718 31.9616 24.6311 31.4045 24.6537 30.7989C24.6719 30.3121 24.9176 29.906 25.2801 29.6966C25.6427 29.4872 26.1173 29.4775 26.548 29.7052C27.0837 29.9883 27.5958 30.2155 28.1631 30.2902C29.2528 30.4336 30.3548 30.1384 31.2268 29.4693C31.6025 29.1809 31.8891 28.8252 32.1563 28.4277C32.4129 28.0458 32.6924 27.5616 33.0273 26.9816L33.0654 26.9156C33.4002 26.3356 33.6799 25.8513 33.8823 25.4381C34.093 25.008 34.2578 24.582 34.3196 24.1124C34.4631 23.0227 34.1678 21.9206 33.4987 21.0487C33.1504 20.5948 32.6976 20.2649 32.1845 19.9425C31.772 19.6833 31.5431 19.2674 31.5431 18.8487C31.5431 18.4301 31.7721 18.0143 32.1845 17.7551C32.6976 17.4327 33.1505 17.1028 33.4988 16.6489C34.1679 15.7769 34.4632 14.6749 34.3197 13.5852C34.2579 13.1156 34.0931 12.6895 33.8824 12.2594C33.68 11.8462 33.4005 11.3621 33.0656 10.7821L33.0275 10.7161C32.6926 10.1361 32.413 9.65177 32.1564 9.26989C31.8892 8.87236 31.6027 8.5166 31.2269 8.22826C30.355 7.55918 29.2529 7.26389 28.1632 7.40735C27.596 7.48203 27.0839 7.70922 26.5481 7.99237C26.1174 8.22002 25.6428 8.21034 25.2802 8.001C24.9176 7.79166 24.6719 7.38546 24.6537 6.89861C24.6311 6.29309 24.5718 5.736 24.3528 5.20739C23.9322 4.19197 23.1254 3.38522 22.11 2.96462C21.6724 2.78336 21.2211 2.71307 20.7432 2.68047C20.2842 2.64915 19.725 2.64916 19.0553 2.64917H18.9792ZM16.7894 5.05297C16.9057 5.00482 17.0823 4.96039 17.4451 4.93564C17.818 4.9102 18.2996 4.90959 19.0172 4.90959C19.7348 4.90959 20.2164 4.9102 20.5893 4.93564C20.9521 4.96039 21.1287 5.00482 21.245 5.05297C21.7066 5.24416 22.0733 5.61086 22.2644 6.07241C22.3247 6.21801 22.3747 6.44497 22.3949 6.9831C22.4395 8.17717 23.0558 9.32687 24.15 9.95858C25.2441 10.5903 26.548 10.5492 27.6044 9.99082C28.0805 9.73919 28.302 9.669 28.4583 9.64843C28.9536 9.58322 29.4545 9.71744 29.8509 10.0216C29.9507 10.0982 30.0775 10.2289 30.2803 10.5307C30.4888 10.841 30.7301 11.2577 31.0889 11.8792C31.4477 12.5007 31.688 12.9181 31.8524 13.2537C32.0124 13.5803 32.0622 13.7555 32.0787 13.8802C32.1439 14.3755 32.0096 14.8765 31.7055 15.2728C31.6096 15.3978 31.438 15.5546 30.982 15.8412C29.9703 16.4768 29.2828 17.5853 29.2827 18.8486C29.2826 20.1121 29.9701 21.2207 30.9819 21.8565C31.4379 22.1429 31.6094 22.2997 31.7054 22.4247C32.0095 22.8211 32.1437 23.322 32.0785 23.8173C32.0621 23.9421 32.0122 24.1173 31.8523 24.4438C31.6879 24.7795 31.4476 25.1969 31.0888 25.8183C30.73 26.4398 30.4887 26.8566 30.2802 27.1668C30.0773 27.4686 29.9506 27.5994 29.8507 27.676C29.4544 27.9801 28.9534 28.1143 28.4581 28.0491C28.3019 28.0285 28.0804 27.9584 27.6043 27.7067C26.5478 27.1484 25.2439 27.1073 24.1498 27.7391C23.0558 28.3708 22.4395 29.5204 22.3949 30.7144C22.3747 31.2526 22.3248 31.4796 22.2644 31.6252C22.0733 32.0868 21.7066 32.4535 21.245 32.6447C21.1287 32.6928 20.9521 32.7373 20.5893 32.762C20.2164 32.7874 19.7348 32.7881 19.0172 32.7881C18.2996 32.7881 17.818 32.7874 17.4451 32.762C17.0823 32.7373 16.9057 32.6928 16.7894 32.6447C16.3278 32.4535 15.9611 32.0868 15.77 31.6252C15.7097 31.4796 15.6597 31.2527 15.6395 30.7145C15.5949 29.5205 14.9786 28.3708 13.8844 27.7391C12.7903 27.1074 11.4864 27.1485 10.43 27.7068C9.95392 27.9585 9.73237 28.0286 9.57613 28.0492C9.08082 28.1144 8.57989 27.9802 8.18354 27.6761C8.08371 27.5995 7.95692 27.4687 7.7541 27.1669C7.54561 26.8567 7.30428 26.4399 6.94547 25.8184C6.58666 25.197 6.34639 24.7796 6.18197 24.4439C6.02202 24.1174 5.97217 23.9422 5.95575 23.8174C5.89054 23.3221 6.02476 22.8212 6.32889 22.4248C6.42482 22.2998 6.59639 22.143 7.05238 21.8565C8.06412 21.2208 8.75163 20.1123 8.7517 18.8489C8.75177 17.5854 8.06422 16.4767 7.05239 15.8409C6.59651 15.5545 6.42496 15.3977 6.32904 15.2727C6.02491 14.8764 5.89069 14.3754 5.95589 13.8801C5.97232 13.7554 6.02217 13.5802 6.18212 13.2536C6.34654 12.918 6.58681 12.5006 6.94562 11.8791C7.30442 11.2576 7.54576 10.8409 7.75425 10.5306C7.95706 10.2288 8.08385 10.0981 8.18369 10.0215C8.58004 9.71734 9.08097 9.58312 9.57627 9.64832C9.73253 9.6689 9.95409 9.73909 10.4302 9.99076C11.4866 10.5491 12.7904 10.5902 13.8845 9.95853C14.9786 9.32686 15.5949 8.1772 15.6395 6.98317C15.6597 6.44499 15.7097 6.21801 15.77 6.07242C15.9611 5.61086 16.3279 5.24416 16.7894 5.05297Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- modal confirm cancel -->
  <dialog id="modalCancelOrder" class="modal" @if="showModalCancelOrder">
    <div class="modal-box">
      <img
        src="~/assets/images/illustration-payments.png"
        preload
        loading="lazy"
      />
      <div class="description" v-if="isBackOfficeRoute">
        <h2>Apakah Anda sudah selesai melakukan Pengaturan ?</h2>
      </div>
      <div class="description" v-if="isHomeRoute">
        <h2>Anda yakin membatalkan pesanan?</h2>
      </div>

      <div class="btn-group">
        <button class="btn-confirm" @click="logout" v-if="isBackOfficeRoute">
          Ya
        </button>
        <button class="btn-confirm" @click="cancelOrder" v-if="isHomeRoute">
          Ya
        </button>
        <button class="btn-cancel" @click="closeModalCancelOrder">Tidak</button>
      </div>
    </div>
  </dialog>
  <!-- end modal confirm cancel -->
</template>

<script>
export default {
  props: {
    to: String,
  },
  computed: {
    isId() {
      return this.$route.name === "id";
    },
    isIndexRoute() {
      return this.$route.name === "index";
    },
    isHomeRoute() {
      return this.$route.name === "restaurant-detail-slug";
    },
    isCheckoutRoute() {
      return this.$route.name === "checkout";
    },
    isQris() {
      return this.$route.name === "qris";
    },
    isReceipt() {
      return this.$route.name === "site-receipt";
    },
    isRestaurantDetail() {
      return this.$route.name === "restaurant-detail-id";
    },
    isListBranchStore() {
      return this.$route.name === "site-list-branch-slug";
    },
    isBackOfficeRoute() {
      return (
        this.$route.name === "backOffice" ||
        this.$route.name === "backOffice-sync" ||
        this.$route.name === "backOffice-location"
      );
    },
    isIndexOrHomeRoute() {
      return this.isIndexRoute || this.isHomeRoute;
    },
  },
  data() {
    return {
      showModalCancelOrder: false,
    };
  },
  methods: {
    openModalCancelOrder() {
      this.showModalCancelOrder = true;
      this.$nextTick(() => {
        let modal = document.getElementById("modalCancelOrder");
        modal.showModal();
      });
    },
    closeModalCancelOrder() {
      this.showModalCancelOrder = false;
      this.$nextTick(() => {
        let modal = document.getElementById("modalCancelOrder");
        modal.close();
      });
    },
    goToBackOffice() {
      this.$router.push("/backOffice");
    },
    logout() {
      // Redirect ke halaman login
      this.$router.push("/");
    },
    cancelOrder() {
      localStorage.removeItem("cart_items");
      localStorage.removeItem("type_order");
      localStorage.removeItem("checkoutData");
      localStorage.removeItem("data_customer");
      this.$router.push("/");
    },
  },
};
</script>