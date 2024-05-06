<template>
  <Navbar :to="navbarTo" />
  <div>
    <section id="location">
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
          <div class="head">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                width="48"
                height="48"
                viewBox="0 0 256 256"
                xml:space="preserve"
              >
                <defs></defs>
                <g
                  style="
                    stroke: none;
                    stroke-width: 0;
                    stroke-dasharray: none;
                    stroke-linecap: butt;
                    stroke-linejoin: miter;
                    stroke-miterlimit: 10;
                    fill: none;
                    fill-rule: nonzero;
                    opacity: 1;
                  "
                  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                >
                  <path
                    d="M 48.647 69.718 c 13.692 0.652 24.265 4.924 24.265 10.098 C 72.912 85.44 60.415 90 45 90 s -27.912 -4.56 -27.912 -10.184 c 0 -5.173 10.573 -9.446 24.265 -10.098"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: rgb(221, 200, 47);
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                  />
                  <path
                    d="M 45 79.665 l 21.792 -6.211 c -3.033 -1.381 -7.032 -2.466 -11.622 -3.122 L 45 79.665 z"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: rgb(168, 149, 38);
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                  />
                  <path
                    d="M 45 0 C 30.802 0 19.291 11.51 19.291 25.709 c 0 20.07 21.265 33.961 25.709 53.956 C 48.304 53.11 48.304 26.555 45 0 z"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: rgb(255, 49, 64);
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                  />
                  <path
                    d="M 45 14.965 c -6.011 0 -10.885 4.873 -10.885 10.885 S 38.989 36.735 45 36.735 C 47.897 29.478 47.897 22.222 45 14.965 z"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: rgb(255, 255, 255);
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                  />
                  <path
                    d="M 45 0 c 14.198 0 25.709 11.51 25.709 25.709 c 0 20.07 -21.265 33.961 -25.709 53.956 V 0 z"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: rgb(199, 34, 46);
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                  />
                  <path
                    d="M 45 14.965 c 6.011 0 10.885 4.873 10.885 10.885 S 51.011 36.735 45 36.735 V 14.965 z"
                    style="
                      stroke: none;
                      stroke-width: 1;
                      stroke-dasharray: none;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-miterlimit: 10;
                      fill: rgb(240, 240, 240);
                      fill-rule: nonzero;
                      opacity: 1;
                    "
                    transform=" matrix(1 0 0 1 0 0) "
                    stroke-linecap="round"
                  />
                </g>
              </svg>
              Setting Lokasi</span
            >
            <p>Masukkan kode lokasi untuk diterapkan.</p>
          </div>

          <div class="body">
            <select class="select-input" v-model="loc_id">
              <option disabled value="" class="select-option">
                Please select location
              </option>
              <option
                v-for="(location, index) in locations"
                :key="index"
                :value="location.loc_id"
                class="select-option"
              >
                {{ location.loc_name }}
              </option>
            </select>

            <button class="btn btn-primary" @click="settingLocation">
              Terapkan lokasi
            </button>
          </div>
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
    <dialog id="modalWaiting" class="modal" :open="showModalWaiting">
      <div class="modal-box">
        <span class="loading loading-spinner"></span>
        <h2>Menyiapkan ...</h2>
      </div>
    </dialog>
    <dialog id="modalError" class="modal modal-general" :open="showModalError">
      <div class="modal-box" style="border: 3px solid red">
        <img src="~/assets/icons/warning.png" preload loading="lazy" />
        <h2>Something went wrong ...</h2>
        <p>{{ errorMessage }}</p>
      </div>
    </dialog>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import ToastComponent from "@/components/Toast.vue";
import Navbar from "@/components/Navbar.vue";
import FetchData from "~/middleware/services/Fetch.js";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  component: {
    Navbar,
    Footer,
    ToastComponent,
  },
  data() {
    return {
      navbarTo: "/",
      showToast: false,
      showModalError: false,
      showModalWaiting: false,
      locationsLoaded: false, // Flag to track if locations are already loaded
      isError: false,
      steps: "",
      toastMessage: "",
      locations: [],
      loc_id: null,
    };
  },
  mounted() {
    const userDataLog = this.getCookie("user-data-log");
    if (!userDataLog) {
      this.$router.push("/backOffice");
    }
    // if (this.locationsLoaded == false) {
    //   alert(this.locationsLoaded);
    //   this.loadLocations();
    // }
    let storedLocations = localStorage.getItem("locations");
    this.locations = JSON.parse(storedLocations);
  },
  methods: {
    loadLocations() {
      let storedLocations = localStorage.getItem("locations");
      if (storedLocations) {
        this.locations = JSON.parse(storedLocations);
        this.locationsLoaded = true; // Set the flag to true after loading locations
        alert(this.locationsLoaded);

        console.log("this.locations", this.locations);

        if (this.locations.length == 1) {
          const locationValue = btoa(this.locations[0].loc_id); // Assuming loc_id is the selected location value

          localStorage.setItem("location", locationValue); // Store selected location in localStorage

          // action sync
          const token = JSON.parse(this.getCookie("user-data-log")).token;
          const location = localStorage.getItem("location");
          const locId = atob(location);
          const urlGetRestoDetail =
            "/restaurant/get_restaurant_detail?loc=" + locId;

          // set data restoran
          FetchData.getData(urlGetRestoDetail, token)
            .then((res) => {
              localStorage.setItem(
                "data_restaurant",
                JSON.stringify(res.data.data[0])
              );

              // set payment method
              const urlGetPaymentMethod =
                "/payment/get_payment_method?appid=" +
                res.data.data[0].appid +
                "&loc=" +
                locId;

              FetchData.getData(urlGetPaymentMethod, token)
                .then((resPaymentMethod) => {
                  localStorage.setItem(
                    "payment_method",
                    JSON.stringify(resPaymentMethod.data.data[0])
                  );
                })
                .catch((error) => {
                  console.log("error.message", error.message);
                });

              // set order type
              const urlOrderType =
                "/restaurant/get_order_type?appid=" +
                res.data.data[0].appid +
                "&loc=" +
                locId;
              FetchData.getData(urlOrderType, token)
                .then((resOrderType) => {
                  console.log("OrderType", resOrderType);
                  localStorage.setItem(
                    "order_type",
                    JSON.stringify(resOrderType.data.data)
                  );
                })
                .catch((error) => {
                  console.log("error.message", error.message);
                });
            })
            .catch((error) => {
              console.log("error.message", error.message);
            });

          FetchData.synchronize(locId, token)
            .then((response) => {
              localStorage.setItem(
                "data_menu",
                JSON.stringify(response.data.data)
              );

              const url = "/restaurant/getAllTable/?loc=" + locId;
              FetchData.getData(url, token)
                .then((resp) => {
                  localStorage.setItem(
                    "table_list",
                    JSON.stringify(resp.data.data)
                  );

                  this.closeModalSync();
                })
                .catch((err) => {});
            })
            .catch((error) => {
              console.log("error: " + error);
            });
          // end of sync

          this.$nextTick(() => {
            this.$router.push("/");
          });
        }
      } else {
        this.locations = []; // Ensure that locations is initialized as an empty array if it's not found in local storage
      }
    },
    async settingLocation() {
      const locationValue = btoa(this.loc_id); // Assuming loc_id is the selected location value

      // pop up modal
      this.$nextTick(() => {
        this.showModalWaiting = true;
      });

      if (locationValue.trim() !== "") {
        localStorage.setItem("location", locationValue); // Store selected location in localStorage
        console.log("this.isError before", this.isError);
        await this.syncData();
        console.log("this.isError after", this.isError);
        console.log("Error in: ", this.steps);

        if (this.isError === false) {
          const checkOrderType = setInterval(() => {
            const data = JSON.parse(localStorage.getItem("order_type"));

            if (data) {
              clearInterval(checkOrderType); // Stop the loop once data is found
              this.showModalWaiting = false;
              this.$router.push("/");
            }
          }, 1000); // Check every second
        }
      } else {
        console.log("Location value is empty.");
      }
    },
    async syncData() {
      const token = JSON.parse(this.getCookie("user-data-log")).token;
      const location = localStorage.getItem("location");
      const locId = atob(location);

      try {
        const urlGetRestoDetail =
          "/restaurant/get_restaurant_detail?loc=" + locId;
        const res = await FetchData.getData(urlGetRestoDetail, token);
        this.steps = "get restaurant detail";
        localStorage.setItem(
          "data_restaurant",
          JSON.stringify(res.data.data[0])
        );

        // xxx
        const urlGetPaymentMethod =
          "/payment/get_payment_method?appid=" +
          res.data.data[0].appid +
          "&loc=" +
          locId;
        const resPaymentMethod = await FetchData.getData(
          urlGetPaymentMethod,
          token
        );
        this.steps = "get payment method";
        localStorage.setItem(
          "payment_method",
          JSON.stringify(resPaymentMethod.data.data[0])
        );

        const urlOrderType =
          "/restaurant/get_order_type?appid=" +
          res.data.data[0].appid +
          "&loc=" +
          locId;
        const resOrderType = await FetchData.getData(urlOrderType, token);
        this.steps = "get order type";
        localStorage.setItem(
          "order_type",
          JSON.stringify(resOrderType.data.data)
        );

        const urlBanner =
          "/restaurant/get_banner?appid=" +
          res.data.data[0].appid +
          "&loc=" +
          locId;
        const resBanner = await FetchData.getData(urlBanner, token);
        this.steps = "get banner";
        localStorage.setItem("banner", JSON.stringify(resBanner.data.data));

        const urlBackground =
          "/restaurant/get_background?appid=" +
          res.data.data[0].appid +
          "&loc=" +
          locId;
        const resBackground = await FetchData.getData(urlBackground, token);
        this.steps = "get background";
        localStorage.setItem(
          "background",
          JSON.stringify(resBackground.data.data)
        );

        const url = "/restaurant/getAllTable/?loc=" + locId;
        const resp = await FetchData.getData(url, token);
        this.steps = "get table list";
        localStorage.setItem("table_list", JSON.stringify(resp.data.data));

        const response = await FetchData.synchronize(locId, token);
        this.steps = "synchronize";
        localStorage.setItem("data_menu", JSON.stringify(response.data.data));
      } catch (error) {
        console.error("Error:", error.message);
        this.isError = true;
        this.showModalWaiting = false;
        this.errorMessage = "Try again later.";
        setTimeout(() => {
          this.showModalError = true;
          this.$router.push("/backOffice")
        }, 1000);
      }
    },
    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      console.log("message", message);
      setTimeout(() => {
        this.hideToast();
      }, 1000);
    },
    hideToast() {
      this.showToast = false;
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
      return null;
    },
  },
});
</script>