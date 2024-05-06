<template>
  <Navbar :to="navbarTo" />
  <div>
    <section id="loginBackOffice">
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
            <span>Log In</span>
            <p>Masuk ke Pengaturan InterActive MyOrder</p>
          </div>

          <div class="body">
            <label class="form-control">
              <div class="label">
                <span class="label-text">Email</span>
              </div>
              <input
                type="text"
                v-model="email"
                placeholder="Masukkan Email Anda"
                class="input input-bordered"
              />
            </label>
            <label class="form-control">
              <div class="label">
                <span class="label-text">Password</span>
              </div>
              <input
                type="password"
                v-model="password"
                placeholder="Masukkan Kata Sandi"
                class="input input-bordered"
              />
            </label>

            <button class="btn btn-primary" @click="login">Masuk</button>
            <span class="text-danger">Kembali Ke Beranda</span>
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
  </div>
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
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import FetchData from "~/middleware/services/Fetch.js";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default defineComponent({
  component: {
    Navbar,
    Footer,
  },
  data() {
    return {
      errorMessage: "",
      showModalWaiting: false,
      showModalError: false,
      navbarTo: "/checkout",
      email: "budidi1231@gmail.com", // budidi1231@gmail.com   keripiku13@gmail.com
      password: "12345678", // 12345678   123123123
      locations: [],
    };
  },
  async mounted() {
    const userDataLog = this.getCookie("user-data-log");
    if (userDataLog) {
      this.$router.push("/backOffice/sync");
    }
  },
  methods: {
    setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 48 * 60 * 60 * 1000); //setting 2 hari
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
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
      return null;
    },
    async login() {
      const data = {
        email: this.email,
        password: this.password,
      };

      const loginPromise = FetchData.login(data);

      // handle timeout lamanya durasi coba akses login
      const timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error("Login timed out"));
        }, 5000); // 15 detik
      });

      Promise.race([loginPromise, timeoutPromise])
        .then((result) => {
          if (result && result.data.status === "success") {
            const dataUser = {
              email: result.data.data.email,
              token: result.data.data.token,
            };

            // Store token in cookies
            this.setCookie("user-data-log", JSON.stringify(dataUser));

            // const locations = [result.data.data.locations[0]]; buat cek kalau single location
            const locations = result.data.data.locations; 
            if (locations.length > 0) {
              // store in local storage
              localStorage.setItem("locations", JSON.stringify(locations));

              if (locations.length == 1) {
                // store in local storage
                const locationValue = btoa(locations[0].loc_id);
                localStorage.setItem("location", locationValue);
                this.syncData();

                this.showModalWaiting = true; // to show the modal
                const checkOrderType = setInterval(() => {
                  const data = JSON.parse(localStorage.getItem("order_type"));
                  if (data) {
                    clearInterval(checkOrderType); // Stop the loop once data is found
                    this.$router.push("/");
                  }
                }, 1000); // Check every second

              } else {
                this.$router.push("/backOffice/location");
              }
            } else {
              console.log("data lokasi kosong");
            }
          } else {
            // Handle unsuccessful login
            console.error(
              "Login failed:",
              result
                ? result.message || "Unknown error occurred"
                : "No response received"
            );
          }
        })
        .catch((error) => {
          // Handle timeout or other errors || error ketika lama login juga kesini
          this.errorMessage = "Try again later.";
          this.showModalError = true; // to show the modal
          console.error("Login failed:", error);
          setTimeout(() => {
            this.showModalError = false; 
          }, 2000);
        });
    },
    async syncData() {
      const token = JSON.parse(this.getCookie("user-data-log")).token;
      const location = localStorage.getItem("location");
      const locId = atob(location);
      const urlGetRestoDetail = "/restaurant/get_restaurant_detail?loc="+locId;

      // set data restoran
      await FetchData.getData(urlGetRestoDetail, token)
        .then((res) => {
          localStorage.setItem("data_restaurant", JSON.stringify(res.data.data[0])); // Set response into local storage as data_menu

          // set payment method
          const urlGetPaymentMethod = "/payment/get_payment_method?appid="+res.data.data[0].appid+"&loc="+locId;

          FetchData.getData(urlGetPaymentMethod, token)
            .then((resPaymentMethod) => {
              localStorage.setItem("payment_method", JSON.stringify(resPaymentMethod.data.data[0])); // Set response into local storage as data_menu
            })
            .catch((error) => {
              console.log('error.message', error.message);
            })

          // set order type
          const urlOrderType = "/restaurant/get_order_type?appid="+res.data.data[0].appid+"&loc="+locId;
          FetchData.getData(urlOrderType, token)
            .then((resOrderType) => {
              localStorage.setItem("order_type", JSON.stringify(resOrderType.data.data)); // Set response into local storage as data_menu
            })
            .catch((error) => {
              console.log('error.message', error.message);
            })

          // set banner
          const urlBannerTop = "/restaurant/get_banner?appid="+res.data.data[0].appid+"&loc="+locId;
          FetchData.getData(urlBannerTop, token)
            .then((resBannerTop) => {
              localStorage.setItem("banner", JSON.stringify(resBannerTop.data.data)); // Set response into local storage as data_menu
            })
            .catch((error) => {
              console.log('Failer getting top banner: ', error.message);
            })

          // set background
          const urlBackground = "/restaurant/get_background?appid="+res.data.data[0].appid+"&loc="+locId;
          FetchData.getData(urlBackground, token)
            .then((resBackground) => {
              localStorage.setItem("background", JSON.stringify(resBackground.data.data)); // Set response into local storage as data_menu
            })
            .catch((error) => {
              console.log('Failer getting background: ', error.message);
            })
        })
        .catch((error) => {
          console.log('error.message', error.message);
        })
        
      FetchData.synchronize(locId, token)
        .then((response) => {
          localStorage.setItem("data_menu", JSON.stringify(response.data.data)); // Set response into local storage as data_menu

          const url = "/restaurant/getAllTable/?loc="+locId;
          FetchData.getData(url, token)
            .then((resp) => {
              localStorage.setItem("table_list", JSON.stringify(resp.data.data)); // Set response into local storage as data_menu

              this.closeModalSync();
            }).catch((err) => {

            });
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    },
  },
});
</script>
