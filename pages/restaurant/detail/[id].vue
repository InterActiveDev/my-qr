<template>
  <div @touchstart="resetTimer">
    <div>
      <section id="home">
        <div class="frame">
          <!-- carousel -->
          <Navbar :to="navbarTo" />
          <NuxtLazyHydrate>
            <HomeCarousel />
          </NuxtLazyHydrate>
          <!-- end carousel -->

          <!-- sort item -->
          <div class="sort-item">
            <div class="flex gap-6 btn-group">
              <button class="btn btn-primary">
                Semua Produk
                <div class="badge">{{ countProduct }}</div>
              </button>
              <button class="btn btn-muted" @click="openModalCategory">
                Kategori Lainya
              </button>
            </div>
            <div class="full">
              <label class="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  class="grow"
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

          <!-- Modal All Product -->
          <dialog id="modalAllProduct" class="modal" v-if="showModalCategory">
            <div class="modal-box">
              <div class="row-item">
                <div
                  class="item"
                  v-for="(items, index) in category"
                  :key="index"
                  @click="toDetail(items.category_id)"
                >
                  <div class="description">
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

          <!-- loop -->
          <div v-if="searchQuery == ''">
            <div v-for="perProduct in products" :key="perProduct.category_id">
              <div
                v-if="
                  (perProduct.order_time_start < perProduct.order_time_end &&
                    perProduct.order_time_start <= clockNow &&
                    perProduct.order_time_end >= clockNow) ||
                  (perProduct.order_time_start > perProduct.order_time_end &&
                    perProduct.order_time_start >= clockNow) ||
                  perProduct.order_time_end <= clockNow
                "
              >
                <div class="spacer"></div>
                <div class="list-product">
                  <div class="head">
                    <div class="title">
                      <!-- icon -->
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="43"
                        height="44"
                        viewBox="0 0 43 44"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_465_1774)">
                          <path
                            d="M16.2529 2.703C17.4002 5.57275 17.9001 7.9574 17.7922 10.2182C17.6873 12.4423 16.9931 14.6612 15.5683 17.2032L15.5338 17.2648L15.4871 17.2118L11.6018 12.8013L11.6018 12.8012C11.465 12.6457 11.2973 12.5205 11.1093 12.4337C10.9213 12.3468 10.7173 12.3002 10.5102 12.2969C10.3032 12.2935 10.0977 12.3335 9.90702 12.4142C9.71633 12.4949 9.54462 12.6146 9.40289 12.7656L9.40284 12.7656C3.87789 18.6338 2.65087 26.3657 5.10067 32.579C7.57123 38.8457 13.7186 43.3977 22.482 42.9565L22.4845 42.9563V42.9564H22.5014C29.0801 42.5484 33.3128 40.1273 35.8639 36.7932L35.8639 36.7932C38.3765 33.5154 39.1032 29.5563 39.1032 26.3163C39.1032 18.1351 35.4745 12.1369 31.0381 8.00106M16.2529 2.703C16.1508 2.4473 16.1217 2.16825 16.1689 1.89699C16.2161 1.62572 16.3378 1.37291 16.5204 1.16678L16.5762 1.1037C16.7491 0.929138 16.9629 0.799829 17.1988 0.727945C17.4622 0.647666 17.7427 0.642168 18.009 0.712063L18.0091 0.712085C21.4086 1.59797 26.6345 3.90106 31.0381 8.00106M16.2529 2.703C16.2529 2.703 16.2529 2.703 16.2529 2.70301L16.2065 2.72156L16.2529 2.703ZM31.0381 8.00106L31.0722 7.96449L31.0382 8.00108C31.0381 8.00107 31.0381 8.00107 31.0381 8.00106ZM28.5989 24.9288H28.602L28.6167 24.9142C28.7639 24.7667 28.8806 24.5918 28.9602 24.3992C29.0398 24.2067 29.0807 24.0003 29.0806 23.792C29.0804 23.5836 29.0392 23.3773 28.9594 23.1849C28.8795 22.9925 28.7625 22.8176 28.6151 22.6704C28.4677 22.5232 28.2927 22.4065 28.1001 22.3269C27.9076 22.2473 27.7012 22.2064 27.4929 22.2065C27.2845 22.2067 27.0783 22.2479 26.8858 22.3277C26.6934 22.4076 26.5186 22.5246 26.3713 22.672L16.2885 32.7549C16.2884 32.755 16.2883 32.7551 16.2882 32.7551C16.1369 32.9014 16.0162 33.0762 15.9331 33.2696C15.85 33.4631 15.8063 33.6711 15.8045 33.8817C15.8026 34.0922 15.8427 34.301 15.9225 34.4959C16.0022 34.6908 16.1199 34.8678 16.2688 35.0167C16.4177 35.1656 16.5948 35.2834 16.7896 35.3631C16.9845 35.4428 17.1933 35.483 17.4039 35.4811C17.6144 35.4793 17.8225 35.4355 18.016 35.3524C18.2093 35.2694 18.3842 35.1487 18.5304 34.9974C18.5305 34.9973 18.5306 34.9972 18.5307 34.9971L28.5989 24.9288ZM16.4555 23.5912C16.3372 23.8767 16.2763 24.1828 16.2763 24.4918C16.2763 25.1161 16.5243 25.7147 16.9656 26.1561C17.407 26.5974 18.0057 26.8454 18.6299 26.8454C19.2541 26.8454 19.8527 26.5974 20.2941 26.1561C20.7355 25.7147 20.9834 25.1161 20.9834 24.4918C20.9834 24.1828 20.9226 23.8767 20.8043 23.5912C20.686 23.3056 20.5126 23.0462 20.2941 22.8276C20.0755 22.6091 19.8161 22.4357 19.5305 22.3174C19.245 22.1992 18.9389 22.1383 18.6299 22.1383C18.3208 22.1383 18.0147 22.1992 17.7292 22.3174C17.4436 22.4357 17.1842 22.6091 16.9656 22.8276C16.7471 23.0462 16.5737 23.3056 16.4555 23.5912ZM25.1356 31.5167C24.6943 31.9581 24.4463 32.5567 24.4463 33.1809C24.4463 33.8051 24.6943 34.4038 25.1356 34.8451C25.577 35.2865 26.1757 35.5345 26.7999 35.5345C27.4241 35.5345 28.0227 35.2865 28.4641 34.8451C28.9055 34.4038 29.1534 33.8051 29.1534 33.1809C29.1534 32.5567 28.9055 31.9581 28.4641 31.5167C28.0227 31.0753 27.4241 30.8273 26.7999 30.8273C26.1757 30.8273 25.577 31.0753 25.1356 31.5167Z"
                            fill="url(#paint0_radial_465_1774)"
                            stroke="#DA2424"
                            stroke-width="0.1"
                          />
                        </g>
                        <defs>
                          <radialGradient
                            id="paint0_radial_465_1774"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(6.67959 -31.4811) rotate(64.4782) scale(139.606 116.182)"
                          >
                            <stop offset="0.35" stop-color="#F92E2E" />
                            <stop
                              offset="0.778938"
                              stop-color="#FAFF00"
                              stop-opacity="0.49"
                            />
                          </radialGradient>
                          <clipPath id="clip0_465_1774">
                            <rect
                              width="43"
                              height="43"
                              fill="white"
                              transform="translate(0 0.326172)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                      <!-- end icon -->

                      <span> {{ perProduct.category_name }} </span>
                    </div>

                    <!-- <div class="border-list-product"></div> -->

                    <button
                      @click="toDetail(perProduct.category_id)"
                      class="link-see-all"
                    >
                      See all
                    </button>
                  </div>

                  <ProductSlider :products="perProduct.product_details" />
                </div>
              </div>
            </div>
          </div>
          <div v-else class="else">
            <div class="spacer"></div>
            <div class="list-product">
              <div class="product-search">
                <div v-for="items in filteredProducts" :key="items.product_id">
                  <ProductCard :product="items" />
                </div>
              </div>
            </div>
          </div>
          <BottomNavCart v-if="showBottomCart" />
        </div>
      </section>

      <div class="spacer"></div>
      <Footer />
    </div>
  </div>
</template>
  
  <script>
import { defineComponent } from "@vue/composition-api";
import Navbar from "@/components/Navbar.vue";
import HomeCarousel from "@/components/HomeCarousel.vue";
import HotOfferSlider from "@/components/HotOfferSlider.vue";
import ProductSlider from "@/components/ProductSlider.vue";
import ProductSliderDouble from "@/components/ProductSliderDouble.vue";
import Footer from "@/components/Footer.vue";
import ProductCard from "~/components/ProductCard.vue";
import BottomNavCart from "@/components/BottomNavCart.vue";
import { reactive, watch } from "vue";
import FetchData from "~/middleware/services/Fetch.js";

export default defineComponent({
  webVitals: {
    provider: "log",
    debug: true, // debug enable metrics reporting on dev environments
    disabled: false,
  },
  components: {
    Navbar,
    HomeCarousel,
    HotOfferSlider,
    ProductSlider,
    ProductSliderDouble,
    Footer,
    BottomNavCart,
    ProductCard,
  },
  data() {
    return {
      navbarTo: "/",
      showModalCategory: false,
      restaurantId: false,
      products: [],
      showBottomCart: false,
      category: [],
      searchQuery: "",
      filteredProducts: [],
      filteredProductsByClock: [],
      countProduct: 0,
      clockNow: null,
      localStorageListener: null,
    };
  },
  async mounted() {
    // this.getList();
    const location = localStorage.getItem("location");
    this.restaurantId = this.$route.params.id;
    const locId = atob(this.restaurantId);

    if (location && location != this.restaurantId) {
      console.log("ini refresh data karna lokasi beda");
      await this.starter(locId);
    }
    const data_restaurant = JSON.parse(localStorage.getItem("data_restaurant"));
    const data_menu = JSON.parse(localStorage.getItem("data_menu"));

    // cek update data
    const urlCheckUpdate = "/qr_myorder/check_update?loc=" + locId;
    const last_updated_data = await FetchData.getData(urlCheckUpdate);
    const date = new Date(last_updated_data.data.data[0].last_updated_data);
    const last_update = date.toISOString().slice(0, 19).replace("T", " ");
    localStorage.setItem("last_update", JSON.stringify(last_update));

    if (data_restaurant === null || data_menu === null) {
      console.log("ini refresh data karna restoran / data menu kosong");
      await this.starter(locId);
    } else {
      if (
        last_updated_data.data.data[0].last_updated_data !==
        data_restaurant.last_updated_data
      ) {
        // jika data update terakhir tidak sesuai dengan data kita, sinkronkan data ulang
        console.log(
          "ini refresh data karna tanggal update data terakhir berbeda"
        );
        await this.starter(locId);
      }
    }

    this.getListCategory();
    this.localStorageTimer = setInterval(this.checkLocalStorage, 500);
    if (process.client) {
      localStorage.removeItem("qrContent");
      localStorage.removeItem("checkoutData");
    }
    this.getList();
  },
  created() {
    if (process.client) {
      this.getCartItems();
    }
  },
  methods: {
    async starter(locId) {
      // set lokasi
      localStorage.setItem("location", this.restaurantId);

      // set detail restaurant
      const urlGetRestoDetail =
        "/qr_myorder/get_restaurant_detail?loc=" + locId;
      const res = await FetchData.getData(urlGetRestoDetail);
      const appid = res.data.data[0].appid;
      this.steps = "get restaurant detail";
      localStorage.setItem("data_restaurant", JSON.stringify(res.data.data[0]));

      // set payment method
      const urlGetPaymentMethod =
        "/qr_myorder/get_payment_method?appid=" + appid + "&loc=" + locId;
      const resPayment = await FetchData.getData(urlGetPaymentMethod);
      this.steps = "get payment method";
      localStorage.setItem(
        "payment_method",
        JSON.stringify(resPayment.data.data[0])
      );

      // set order type
      const urlOrderType =
        "/qr_myorder/get_order_type?appid=" + appid + "&loc=" + locId;
      const resOrderType = await FetchData.getData(urlOrderType);
      this.steps = "get order type";
      localStorage.setItem(
        "order_type",
        JSON.stringify(resOrderType.data.data)
      );

      // set promo
      const urlPromo =
        "/qr_myorder/get_all_promo?appid=" + appid + "&loc=" + locId;
      const resPromo = await FetchData.getData(urlPromo);
      this.steps = "get promo";
      localStorage.setItem("promo", JSON.stringify(resPromo.data.data));

      // set banner
      const urlBanner =
        "/qr_myorder/get_banner?appid=" + appid + "&loc=" + locId;
      const resBanner = await FetchData.getData(urlBanner);
      this.steps = "get banner";
      localStorage.setItem("banner", JSON.stringify(resBanner.data.data));

      // set background
      const urlBackground =
        "/qr_myorder/get_background?appid=" + appid + "&loc=" + locId;
      const resBackground = await FetchData.getData(urlBackground);
      this.steps = "get background";
      localStorage.setItem(
        "background",
        JSON.stringify(resBackground.data.data)
      );

      // set table
      const urlTables =
        "/qr_myorder/get_all_table?appid=" + appid + "&loc=" + locId;
      const resTables = await FetchData.getData(urlTables);
      this.steps = "get table list";
      localStorage.setItem("table_list", JSON.stringify(resTables.data.data));

      // set menu
      const response = await FetchData.synchronize(locId);
      localStorage.setItem("data_menu", JSON.stringify(response.data.data));
    },
    checkLocalStorage() {
      // Get the current localStorage data
      const currentCartItems = JSON.parse(localStorage.getItem("cartItems"));
      // Compare with the previously stored data
      if (JSON.stringify(currentCartItems) !== []) {
        // If there's a change, update the data
        this.getCartItems();
      }
    },
    getList() {
      this.clockNow = new Date().toLocaleTimeString();
      let storedProducts = localStorage.getItem("data_menu");
      this.products = JSON.parse(storedProducts);
      this.products.forEach((element) => {
        this.countProduct += element.product_count;
      });
    },
    getListCategory() {
      this.category = JSON.parse(localStorage.getItem("data_menu"));
    },
    getCartItems() {
      if (process.client) {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (cartItems) {
          this.showBottomCart = true;
        } else {
          this.showBottomCart = false;
        }
      }
    },
    searchProducts() {
      if (this.searchQuery.trim() !== "") {
        const currentTime = new Date().toLocaleTimeString(); // Get current time in milliseconds
        let tempArr = []; // nanti hasilnya ditampung dulu kesini

        this.products.forEach((product) => {
          const orderStart = product.order_time_start;
          const orderEnd = product.order_time_end;
          const isOrderInRange =
            (orderStart < orderEnd &&
              orderStart <= currentTime &&
              orderEnd >= currentTime) ||
            (orderStart > orderEnd &&
              (orderStart >= currentTime || orderEnd <= currentTime));

          if (isOrderInRange) {
            const filteredDetails = product.product_details.filter((detail) =>
              detail.product_name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            );
            tempArr.push(...filteredDetails);
          }
        });
        this.filteredProducts = tempArr;

        return this.filteredProducts;
      } else {
        this.filteredProducts = [];
        this.getList();
      }
    },
    handleStorageEvent(event) {
      if (event.key === "cartItems") {
        this.getCartItems();
      }
    },
    toDetail(id) {
      this.$router.push("/restaurant/category/" + id);
    },
    openModalCategory() {
      this.showModalCategory = true;
      this.$nextTick(() => {
        let modal = document.getElementById("modalAllProduct");
        modal.showModal();
      });
    },
    closeModalCategory() {
      this.showModalCategory = false;
      this.$nextTick(() => {
        let modal = document.getElementById("modalAllProduct");
        modal.close();
      });
    },
  },
});
</script>