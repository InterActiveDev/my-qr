<template>
  <div>
    <!-- Tambahkan Navbar jika belum ada -->
    <section id="list-branch">
      <div class="frame">
        <Navbar :to="navbarTo" />
        <button
          v-show="showScrollButton"
          @click="scrollToTop"
          class="scroll-to-top"
        >
          <svg
            fill="#ffffff"
            height="50px"
            width="50px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 330 330"
            xml:space="preserve"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                id="XMLID_224_"
                d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
              ></path>
            </g>
          </svg>
        </button>

        <!-- sort item -->
        <div class="sort-item">
          <div class="full">
            <label class="input input-bordered flex items-center gap-2">
              <input
                type="text"
                class="grow bg-white"
                placeholder="Cari Toko"
                v-model="searchQuery"
                @input="searchStore"
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

        <div class="store">
          <div class="head">
            <span>Toko yang tersedia</span>
          </div>

          <div class="list-branch" v-if="isSkeleton">
            <div
              class="card bg-base-100 shadow-xl"
              rel="preload"
              v-for="n in 4"
              :key="n"
            >
              <div class="flex w-52 flex-col gap-4">
                <div class="skeleton h-32 w-full"></div>
                <div class="skeleton h-4 w-28"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
              </div>
            </div>
          </div>

          <div class="list-branch" v-else>
            <div
              class="card shadow-xl"
              rel="preload"
              v-for="(items, index) in dataStore"
              :key="index"
            >
              <div @click="goToMenu(items.loc_id)">
                <figure>
                  <img
                    v-if="items.loc_logo"
                    :src="items.loc_logo"
                    class="image-card min-w-full"
                    width="327"
                    height="322"
                    loading="lazy"
                    preload
                    :placeholder="productPlaceholder"
                    @error="setDefaultImage"
                  />
                  <NuxtImg
                    v-else
                    :src="productPlaceholder || null"
                    class="image-card"
                    width="327"
                    height="322"
                    loading="lazy"
                    preload
                  />
                </figure>
              </div>
              <div class="title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M0.75 9.01875C0.75 8.76875 0.80625 8.5375 0.91875 8.325C1.03125 8.1125 1.1875 7.9375 1.3875 7.8L5.1375 5.11875C5.275 5.01875 5.41575 4.94675 5.55975 4.90275C5.70375 4.85875 5.8505 4.837 6 4.8375C6.1495 4.838 6.2965 4.86 6.441 4.9035C6.5855 4.947 6.726 5.01875 6.8625 5.11875L10.6125 7.8C10.8125 7.9375 10.9688 8.1125 11.0812 8.325C11.1937 8.5375 11.25 8.76875 11.25 9.01875V14.25C11.25 14.6625 11.1033 15.0157 10.8097 15.3097C10.5162 15.6038 10.163 15.7505 9.75 15.75H9C8.5875 15.75 8.2345 15.6033 7.941 15.3097C7.6475 15.0162 7.5005 14.663 7.5 14.25V12.375C7.5 12.0625 7.39075 11.797 7.17225 11.5785C6.95375 11.36 6.688 11.2505 6.375 11.25H5.625C5.3125 11.25 5.047 11.3595 4.8285 11.5785C4.61 11.7975 4.5005 12.063 4.5 12.375V14.25C4.5 14.6625 4.35325 15.0157 4.05975 15.3097C3.76625 15.6038 3.413 15.7505 3 15.75H2.25C1.8375 15.75 1.4845 15.6033 1.191 15.3097C0.8975 15.0162 0.7505 14.663 0.75 14.25V9.01875ZM17.25 3.75V14.25C17.25 14.6625 17.1033 15.0157 16.8097 15.3097C16.5162 15.6038 16.163 15.7505 15.75 15.75H13.5C13.2875 15.75 13.1095 15.678 12.966 15.534C12.8225 15.39 12.7505 15.212 12.75 15V8.26875C12.75 8.01875 12.6968 7.7875 12.5903 7.575C12.4838 7.3625 12.3307 7.1875 12.1312 7.05L8.2125 4.2375C8.05 4.1125 7.91875 3.9625 7.81875 3.7875C7.71875 3.6125 7.66875 3.4375 7.66875 3.2625C7.66875 2.95 7.76875 2.70325 7.96875 2.52225C8.16875 2.34125 8.4375 2.2505 8.775 2.25H15.75C16.1625 2.25 16.5157 2.397 16.8097 2.691C17.1038 2.985 17.2505 3.338 17.25 3.75ZM13.125 6.75H13.875C13.975 6.75 14.0625 6.7125 14.1375 6.6375C14.2125 6.5625 14.25 6.475 14.25 6.375V5.625C14.25 5.525 14.2125 5.4375 14.1375 5.3625C14.0625 5.2875 13.975 5.25 13.875 5.25H13.125C13.025 5.25 12.9375 5.2875 12.8625 5.3625C12.7875 5.4375 12.75 5.525 12.75 5.625V6.375C12.75 6.475 12.7875 6.5625 12.8625 6.6375C12.9375 6.7125 13.025 6.75 13.125 6.75ZM13.125 9.75H13.875C13.975 9.75 14.0625 9.7125 14.1375 9.6375C14.2125 9.5625 14.25 9.475 14.25 9.375V8.625C14.25 8.525 14.2125 8.4375 14.1375 8.3625C14.0625 8.2875 13.975 8.25 13.875 8.25H13.125C13.025 8.25 12.9375 8.2875 12.8625 8.3625C12.7875 8.4375 12.75 8.525 12.75 8.625V9.375C12.75 9.475 12.7875 9.5625 12.8625 9.6375C12.9375 9.7125 13.025 9.75 13.125 9.75ZM13.125 12.75H13.875C13.975 12.75 14.0625 12.7125 14.1375 12.6375C14.2125 12.5625 14.25 12.475 14.25 12.375V11.625C14.25 11.525 14.2125 11.4375 14.1375 11.3625C14.0625 11.2875 13.975 11.25 13.875 11.25H13.125C13.025 11.25 12.9375 11.2875 12.8625 11.3625C12.7875 11.4375 12.75 11.525 12.75 11.625V12.375C12.75 12.475 12.7875 12.5625 12.8625 12.6375C12.9375 12.7125 13.025 12.75 13.125 12.75Z"
                    fill="#242424"
                  />
                </svg>
                <span>{{ items.loc_name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="flex justify-center">
      <Footer />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import ProductCardDetail from "~/components/ProductCardDetail.vue";
import FetchData from "~/middleware/services/Fetch.js";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import BottomNavCart from "@/components/BottomNavCart.vue";
import HomeCarousel from "@/components/HomeCarousel.vue";
import defaultImage from "~/assets/images/no-image.jpg";

export default {
  components: {
    Footer,
    Navbar,
  },
  data() {
    return {
      navbarTo: "/",
      searchQuery: "",
      showScrollButton: false,
      dataStore: [],
      productPlaceholder:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect x="0" y="0" width="100%" height="100%" fill="%23f3f3f3" /%3E%3C/svg%3E',
      isSkeleton: false,
    };
  },
  async mounted() {
    this.isSkeleton = true;
    await this.getList();
    this.isSkeleton = false;
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {},
  methods: {
    goToMenu(locId) {
      return this.$router.push("/restaurant/detail/" + btoa(locId));
    },
    setDefaultImage(event) {
      event.target.src = defaultImage;
    },
    handleScroll() {
      this.showScrollButton = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    async getList() {
      const urlCheckBranch =
        "/qr_myorder/get_locations?appid=" + atob(this.$route.params.slug);
      const branch = await FetchData.getData(urlCheckBranch);
      this.dataStore = branch.data.data;
    },
    searchStore() {
      if (this.searchQuery.trim() !== "") {
        this.dataStore = this.dataStore.filter((store) =>
          store.loc_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.getList();
      }
    },
  },
};
</script>
