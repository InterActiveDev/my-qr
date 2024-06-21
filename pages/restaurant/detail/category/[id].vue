<template>
  <div>
    <!-- Tambahkan Navbar jika belum ada -->
    <section id="detail">
      <div class="frame">
        <Navbar :to="navbarTo" />
        <!-- carousel -->
        <NuxtLazyHydrate>
          <div v-if='isSkeleton' class="carousel relative shadow-2xl bg-white" >
            <div class="carousel-inner relative overflow-hidden w-full">
                <div class="skeleton animate-pulse w-[480px] h-[180px] bg-gray-400 rounded"></div>
            </div>
          </div>
          <HomeCarousel v-if='!isSkeleton' />
        </NuxtLazyHydrate>
        <!-- end carousel -->

        <!-- sort item -->
        <div class="sort-item">
          <div class="flex gap-6 btn-group">
            <button class="btn btn-muted" @click="openModalCategory">
              Kategori Lainya 
            </button>
          </div>
          <div class="full">
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="text"
                class="grow bg-white"
                placeholder="Cari Produk"
                v-model="searchQuery"
                @input="searchProducts"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  d="M28.0358 26.4479L20.4838 18.8959C22.2986 16.7172 23.2035 13.9228 23.0104 11.0938C22.8173 8.2649 21.541 5.61932 19.447 3.70745C17.353 1.79557 14.6025 0.764606 11.7677 0.829018C8.93293 0.89343 6.23211 2.04826 4.2271 4.05327C2.22209 6.05828 1.06726 8.75911 1.00285 11.5939C0.938435 14.4287 1.9694 17.1792 3.88128 19.2732C5.79315 21.3672 8.43873 22.6435 11.2677 22.8366C14.0966 23.0297 16.8911 22.1247 19.0698 20.3099L26.6218 27.8619L28.0358 26.4479ZM3.03576 11.8619C3.03576 10.0819 3.5636 8.34184 4.55253 6.8618C5.54147 5.38176 6.94707 4.22821 8.59161 3.54702C10.2361 2.86583 12.0457 2.6876 13.7916 3.03486C15.5374 3.38213 17.141 4.2393 18.3997 5.49797C19.6584 6.75664 20.5156 8.36029 20.8628 10.1061C21.2101 11.8519 21.0319 13.6615 20.3507 15.3061C19.6695 16.9506 18.5159 18.3562 17.0359 19.3452C15.5559 20.3341 13.8158 20.8619 12.0358 20.8619C9.64962 20.8593 7.36198 19.9102 5.67472 18.223C3.98747 16.5357 3.03841 14.2481 3.03576 11.8619Z"
                  fill="#979797"
                  stroke="#979797"
                />
              </svg>
            </label>
          </div>
        </div>
        <!-- end sort item -->

      

        <div class="spacer"></div>
        <div class="list-product" v-if='isSkeleton'>
          <div class="head">
            <div class="skeleton animate-pulse w-[43px] h-[43px] bg-gray-400  rounded"></div>
            <!-- end icon -->

            <span class="skeleton w-60 h-6 bg-gray-400 animate-pulse rounded"></span>
          </div>

          <div class="product">
            <div
              class="product-item"
              v-for="n in 4" :key="n"
            >
              <div class="card bg-base-100 shadow-xl" rel="preload">
                <figure>
                  <NuxtLazyHydrate>
                    <div class="skeleton animate-pulse min-w-full aspect-square bg-gray-400 rounded"></div>
                  </NuxtLazyHydrate>
                </figure>
                <div class="card-body">
                  <div class="card-title ">
                    <span class="skeleton min-w-full h-[20px]  bg-gray-400 animate-pulse rounded"></span>
                    <!-- <p class="skeleton min-w-full h-4 bg-gray-400 animate-pulse rounded"></p> -->
                  </div>
            
                  <div class="price flex items-center">
                    <span class="skeleton w-[50px] h-4 bg-gray-400 animate-pulse rounded"></span>
                  </div>
                  <div class="card-actions cursor-pointer">
                    <div class="btn-add-cart">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26"
                          height="26"
                          viewBox="0 0 27 26"
                          fill="none"
                        >
                          <path
                            d="M23.4744 9.77016L22.5302 6.38642C22.1658 5.08098 21.9836 4.42891 21.6099 3.93661C21.2373 3.44751 20.7313 3.07074 20.1497 2.84939C19.5646 2.62598 18.8731 2.62598 17.49 2.62598M3.52637 9.77016L4.47058 6.38642C4.83496 5.08098 5.01715 4.42891 5.39085 3.93661C5.76344 3.44751 6.26948 3.07074 6.85104 2.84939C7.43619 2.62598 8.12772 2.62598 9.51078 2.62598"
                            stroke="white"
                            stroke-width="1.48451"
                          />
                          <path
                            d="M9.51074 2.62511C9.51074 2.28061 9.65085 1.95022 9.90025 1.70662C10.1497 1.46302 10.4879 1.32617 10.8406 1.32617H16.1601C16.5128 1.32617 16.8511 1.46302 17.1005 1.70662C17.3499 1.95022 17.49 2.28061 17.49 2.62511C17.49 2.96962 17.3499 3.30001 17.1005 3.54361C16.8511 3.78721 16.5128 3.92406 16.1601 3.92406H10.8406C10.4879 3.92406 10.1497 3.78721 9.90025 3.54361C9.65085 3.30001 9.51074 2.96962 9.51074 2.62511Z"
                            stroke="white"
                            stroke-width="1.48451"
                          />
                          <path
                            d="M8.18213 14.3154V19.5112M18.8211 14.3154V19.5112M13.5016 14.3154V19.5112"
                            stroke="white"
                            stroke-width="1.48451"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M2.68088 18.8028C3.40699 21.6384 3.77004 23.0555 4.85123 23.8816C5.93374 24.7065 7.42985 24.7065 10.4221 24.7065H16.5794C19.5716 24.7065 21.0677 24.7065 22.1515 23.8816C23.2327 23.0555 23.5957 21.6384 24.3205 18.8028C25.4616 14.3448 26.0321 12.1171 24.8352 10.6181C23.637 9.11914 21.2831 9.11914 16.5807 9.11914H10.4207C5.71564 9.11914 3.36443 9.11914 2.16622 10.6181C1.46272 11.4975 1.3683 12.6289 1.64225 14.3149"
                            stroke="white"
                            stroke-width="1.48451"
                            stroke-linecap="round"
                          />
                        </svg>
                        <span> Tambah Pesanan </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>

        <div class="list-product" v-if='!isSkeleton'>
          <div class="head">
            <!-- icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43"
              height="44"
              viewBox="0 0 43 44"
              fill="none"
            >
              <path
                d="M5.37554 15.5119V15.4877C5.37551 13.0987 6.08305 10.7632 7.4089 8.77582C8.73476 6.78847 10.6195 5.23832 12.8254 4.32095C15.0313 3.40358 17.4594 3.1601 19.8035 3.62121C22.1477 4.08233 24.3027 5.22738 25.9967 6.91191C27.3296 6.25405 28.8184 5.97745 30.2986 6.11267C31.7789 6.2479 33.1929 6.78969 34.3845 7.67819C35.5761 8.56668 36.4989 9.7673 37.051 11.1474C37.603 12.5275 37.7628 14.0333 37.5127 15.4985C37.8804 15.5326 38.2372 15.6422 38.5607 15.8203C38.8842 15.9985 39.1675 16.2414 39.393 16.5339C39.6184 16.8265 39.7812 17.1623 39.871 17.5205C39.9609 17.8788 39.976 18.2517 39.9153 18.616C38.7005 25.9233 35.6959 30.5485 30.9068 32.4942V34.3002C30.9068 35.3694 30.4821 36.3947 29.7261 37.1508C28.9701 37.9068 27.9447 38.3315 26.8755 38.3315H16.1255C15.0564 38.3315 14.031 37.9068 13.275 37.1508C12.519 36.3947 12.0943 35.3694 12.0943 34.3002V32.4942C7.30517 30.5485 4.30054 25.9233 3.08579 18.616C3.02717 18.2613 3.04028 17.8986 3.12434 17.5491C3.20841 17.1996 3.36173 16.8705 3.57523 16.5814C3.78872 16.2922 4.05805 16.0488 4.36729 15.8656C4.67652 15.6823 5.01937 15.563 5.37554 15.5146V15.5119ZM8.06304 15.4877H10.7505C10.7505 13.7058 11.4584 11.9969 12.7184 10.7369C13.9784 9.47684 15.6874 8.76898 17.4693 8.76898C19.2512 8.76898 20.9602 9.47684 22.2202 10.7369C23.4802 11.9969 24.188 13.7058 24.188 15.4877H26.8755C26.8755 12.993 25.8845 10.6005 24.1205 8.8365C22.3565 7.07249 19.964 6.08148 17.4693 6.08148C14.9746 6.08148 12.5821 7.07249 10.8181 8.8365C9.05406 10.6005 8.06304 12.993 8.06304 15.4877ZM13.438 15.4877H21.5005C21.5005 14.4186 21.0758 13.3932 20.3198 12.6372C19.5638 11.8812 18.5384 11.4565 17.4693 11.4565C16.4001 11.4565 15.3748 11.8812 14.6188 12.6372C13.8628 13.3932 13.438 14.4186 13.438 15.4877ZM31.8904 15.4877H34.7687C34.9716 14.6935 34.9905 13.8634 34.824 13.0608C34.6575 12.2581 34.31 11.5041 33.8079 10.8561C33.3059 10.2081 32.6625 9.68325 31.9269 9.32156C31.1913 8.95987 30.3828 8.77088 29.563 8.76898C28.918 8.76898 28.3053 8.88185 27.7355 9.08879C28.2112 9.85204 28.6036 10.6744 28.9046 11.5371C29.4165 11.4101 29.9544 11.4363 30.4515 11.6123C30.9487 11.7883 31.3832 12.1064 31.7012 12.5271C32.0192 12.9479 32.2066 13.4527 32.2403 13.979C32.2739 14.5053 32.1523 15.0299 31.8904 15.4877ZM28.2193 32.9565H14.7818V34.3002C14.7818 34.6566 14.9234 34.9984 15.1754 35.2504C15.4274 35.5024 15.7692 35.644 16.1255 35.644H26.8755C27.2319 35.644 27.5737 35.5024 27.8257 35.2504C28.0777 34.9984 28.2193 34.6566 28.2193 34.3002V32.9565ZM13.8358 30.269H29.1653C33.4277 28.8984 36.1259 25.023 37.2654 18.1752H5.73567C6.87517 25.023 9.57342 28.8984 13.8358 30.269Z"
                fill="#DA2424"
              />
            </svg>
            <!-- end icon -->

            <span>{{ categoryName }}</span>
          </div>

          <div class="product">
            <div
              class="product-item"
              v-for="product in products"
              :key="product.id"
            >
              <ProductCardDetail :product="product" />
            </div>
          </div>
        </div>

        <!-- Modal All Product filtered-->
        <dialog id="modalAllProduct" class="modal" v-if="showModalCategory" >
          <div class="modal-box">
            <div class="row-item">
              <div
                class="item "
                v-for="(items, index) in filteredCategory"
                :key="index"
                @click="toDetail(items.category_id)"
                :class="paramsID == items.category_id? 'border-[3px] border-red-400':''"
              >
                <div class="description cursor-pointer">
                  <span>{{ items.category_name }}</span>
                  <p>
                    Temukan kejutan di setiap promo spesial kami, hanya untuk
                    Anda!
                  </p>
                </div>
              </div>
            </div>

            <div class="modal-action">
              <button
                id="closeButton"
                class="btn close-btn"
                @click="closeModalCategory"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
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
            </div>
          </div>
        </dialog>
        <!-- end Modal All Product -->
      </div>
    </section>

    <div class="flex justify-center">
      <div class="spacer"></div>
      <BottomNavCart v-if="showBottomCart" />
    </div>
    <div class="flex justify-center">
      <Footer />
    </div>
  </div>
</template>

<script>
import ProductCardDetail from "~/components/ProductCardDetail.vue";
import Footer from "@/components/Footer.vue";
import BottomNavCart from "@/components/BottomNavCart.vue";
import HomeCarousel from "@/components/HomeCarousel.vue";

export default {
  components: {
    ProductCardDetail,
    Footer,
    BottomNavCart,
    HomeCarousel,
  },
  data() {
    return {
      products: [],
      isSkeleton: true,
      showBottomCart: false,
      navbarTo: "/",
      showModalCategory: false,
      paramsID: this.$route.params.id,
      categoryName: "",
      searchQuery: "",
      category: [],
      filteredCategory: [],
      localStorageListener: null,
    };
  },
  mounted() {
    this.isSkeleton = true;

    this.getList();
    this.getListCategory();
    this.localStorageTimer = setInterval(this.checkLocalStorage, 1000);

    this.isSkeleton = false;
  },
  created() {
    if (process.client) {
      this.getCartItems();
    }
  },
  methods: {
    checkLocalStorage() {
      // const currentCartItems = JSON.parse(localStorage.getItem("cart_items"));
      const currentCartItems = JSON.parse(localStorage.getItem("cart_items")) || [];

      // if (JSON.stringify(currentCartItems) !== []) {
      if (currentCartItems.length !== 0) {
        this.getCartItems();
      }
    },
    getCartItems() {
      if (process.client) {
        const location = localStorage.getItem("location");
        const tableCode = localStorage.getItem("table_code");
        const cartItems = JSON.parse(localStorage.getItem("cart_items"));

        this.navbarTo = "/restaurant/detail/" + location + "?table_code=" + btoa(tableCode);
        if (cartItems) {
          this.showBottomCart = true;
        } else {
          this.showBottomCart = false;
        }
      }
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
    getList() {
      const dataMenus = JSON.parse(localStorage.getItem("data_menu") || "[]");

      dataMenus.forEach((element) => {
        if (element.category_id == parseInt(this.paramsID)) {
          console.log("Filtered Data Menus:", element);
          this.products = element.product_details;
          this.categoryName = element.category_name;
        }
      });
    },
    getListCategory() {
      const time = new Date().toLocaleTimeString();
      this.category = JSON.parse(localStorage.getItem("data_menu"));
      const filteredCategory = this.category.filter((item) => 
                  (item.order_time_start < item.order_time_end &&
                  item.order_time_start <= time &&
                  item.order_time_end >= time) ||
                  (item.order_time_start >= item.order_time_end &&
                  time >= item.order_time_start) ||
                  (item.order_time_start > item.order_time_end && 
                  item.order_time_start >= time && item.order_time_end >= time)
      )
      this.filteredCategory = filteredCategory;
    },
    openModalCategory() {
      this.showModalCategory = true;
      this.$nextTick(() => {
        let modal = document.getElementById("modalAllProduct");
        modal.showModal();
      });
    },
    toDetail(id) {
      this.$router.push("/restaurant/detail/category/" + id);
    },
    closeModalCategory() {
      this.showModalCategory = false;
      this.$nextTick(() => {
        let modal = document.getElementById("modalAllProduct");
        modal.close();
      });
    },
    searchProducts() {
      if (this.searchQuery.trim() !== "") {
        // Jika ada kueri pencarian
        // Lakukan pencarian produk berdasarkan nama produk
        this.products = this.products.filter((product) =>
          product.product_name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        );
      } else {
        // Jika input pencarian kosong, kembalikan semua produk
        this.getList();
      }
    },
  },
};
</script>
