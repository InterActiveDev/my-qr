<template>
  <Navbar :to="navbarTo" />
  <div>
    <section id="synchronize">
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
            <!-- saat success -->
            <span><img src="~/assets/icons/sync.png" /> Sync Produk</span>

            <!-- saat gagal -->
            <!-- <span><img src="~/assets/icons/sync-failed.png" /> Sync Failed</span> -->

            <!-- untuk memperbaruhi -->
            <p>
              Tekan "Syncronize" untuk memperbarui menu dengan yang terbaru.
            </p>

            <!-- berhasil Sinkronisasi -->
            <!-- <p class="head-dark">
              Sinkronisasi <strong>BERHASIL</strong>, kami telah memparui data
              master pada perangkat ini. Berikut adalah data terbaru terkait
              pembaruan Produk:
            </p> -->

            <!-- tidak ada yang diperbaruhi -->
            <!-- <p class="head-dark">
              Anda tidak mempunyai update Produk terbaru, mohon coba kembali
              atau hubungi pihak penginput Produk
            </p> -->

            <!-- gagal -->
            <!-- <p class="head-dark">Sync <strong>Gagal</strong>, mohon ulangi proses sync atau coba kembali nanti</p> -->
          </div>

          <div class="body">

            <button class="btn btn-primary" @click="syncData">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M26.2045 19.9727H19.787C19.4113 19.9727 19.051 20.1219 18.7853 20.3876C18.5196 20.6533 18.3704 21.0136 18.3704 21.3893C18.3704 21.7651 18.5196 22.1254 18.7853 22.3911C19.051 22.6567 19.4113 22.806 19.787 22.806H23.187C21.6244 24.439 19.6091 25.5675 17.4002 26.0465C15.1913 26.5254 12.8896 26.3329 10.7909 25.4938C8.69219 24.6546 6.89235 23.2071 5.62262 21.3372C4.35289 19.4673 3.67128 17.2604 3.66536 15.0002C3.66536 14.6244 3.51611 14.2641 3.25043 13.9984C2.98476 13.7328 2.62442 13.5835 2.2487 13.5835C1.87297 13.5835 1.51264 13.7328 1.24696 13.9984C0.981287 14.2641 0.832031 14.6244 0.832031 15.0002C0.839521 17.7666 1.65684 20.4704 3.18314 22.7777C4.70943 25.085 6.87789 26.895 9.42092 27.9842C11.9639 29.0735 14.7702 29.3943 17.4935 28.9071C20.2167 28.4199 22.7377 27.146 24.7454 25.2427V27.7502C24.7454 28.1259 24.8946 28.4862 25.1603 28.7519C25.426 29.0176 25.7863 29.1668 26.162 29.1668C26.5378 29.1668 26.8981 29.0176 27.1638 28.7519C27.4294 28.4862 27.5787 28.1259 27.5787 27.7502V21.3752C27.5752 21.0091 27.4302 20.6587 27.174 20.3972C26.9178 20.1358 26.5704 19.9836 26.2045 19.9727ZM14.9987 0.833496C11.3669 0.843855 7.87781 2.24862 5.25203 4.75766V2.25016C5.25203 1.87444 5.10278 1.5141 4.8371 1.24843C4.57142 0.982752 4.21109 0.833496 3.83536 0.833496C3.45964 0.833496 3.09931 0.982752 2.83363 1.24843C2.56795 1.5141 2.4187 1.87444 2.4187 2.25016V8.62516C2.4187 9.00089 2.56795 9.36122 2.83363 9.6269C3.09931 9.89257 3.45964 10.0418 3.83536 10.0418H10.2104C10.5861 10.0418 10.9464 9.89257 11.2121 9.6269C11.4778 9.36122 11.627 9.00089 11.627 8.62516C11.627 8.24944 11.4778 7.88911 11.2121 7.62343C10.9464 7.35775 10.5861 7.2085 10.2104 7.2085H6.81036C8.37219 5.57631 10.3862 4.44812 12.5938 3.96873C14.8014 3.48934 17.1019 3.68064 19.2 4.51805C21.2981 5.35547 23.0981 6.8008 24.3689 8.66852C25.6397 10.5362 26.3233 12.7411 26.332 15.0002C26.332 15.3759 26.4813 15.7362 26.747 16.0019C27.0126 16.2676 27.373 16.4168 27.7487 16.4168C28.1244 16.4168 28.4848 16.2676 28.7504 16.0019C29.0161 15.7362 29.1654 15.3759 29.1654 15.0002C29.1654 13.1398 28.7989 11.2976 28.087 9.57881C27.3751 7.86003 26.3315 6.29831 25.016 4.98282C23.7005 3.66732 22.1388 2.62381 20.42 1.91187C18.7013 1.19993 16.8591 0.833496 14.9987 0.833496Z"
                  fill="#E0E0E0"
                />
              </svg>
              Syncronize Produk
            </button>

            <span class="text-muted">
              Last syncronise is 12 february 2024
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="3"
                height="3"
                viewBox="0 0 3 3"
                fill="none"
              >
                <circle
                  cx="1.5"
                  cy="1.5"
                  r="1.5"
                  transform="matrix(1 0 0 -1 0 3)"
                  fill="#D9D9D9"
                />
              </svg>
              20:44
            </span>
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

      <dialog id="modalLoadingSync" class="modal">
        <div class="modal-box">
          <img src="~/assets/icons/loading-sync.gif" preload loading="lazy" />
          <div class="description">
            <h2>SNYCRONIZE DATA PRODUK . .</h2>
          </div>
        </div>
      </dialog>
    </section>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import FetchData from "~/middleware/services/Fetch.js";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

function getCookie(name) {
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
}

export default defineComponent({
  component: {
    Navbar,
    Footer,
  },
  data() {
    return {
      navbarTo: "/backOffice",
    };
  },
  mounted() {
    const userDataLog = this.getCookie("user-data-log");
    if (!userDataLog) {
      this.$router.push("/");
    }
    const isMobile = this.checkIsMobile();

    const weight = window.innerWidth;
    const height = window.innerHeight;

    console.log("weight", weight, "height", height, "isMobile", isMobile);

    this.checkLocation(); // Call the method using 'this'
  },
  methods: {
    checkIsMobile(){
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    },
    checkLocation() {
      let storedLocation = localStorage.getItem("location");
      if (!storedLocation) {
        this.$router.push("/backOffice/location"); 
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
      return null;
    },
    async syncData() {
      this.openModalSync();
      const token = JSON.parse(this.getCookie("user-data-log")).token;
      const location = localStorage.getItem("location");
      const locId = atob(location);
      const urlGetRestoDetail = "/restaurant/get_restaurant_detail?loc="+locId;

      // set data restoran
      await FetchData.getData(urlGetRestoDetail, token)
        .then((res) => {
          localStorage.setItem("data_restaurant", JSON.stringify(res.data.data[0])); // Set response into local storage as data_menu

          const urlGetPaymentMethod = "/payment/get_payment_method?appid="+res.data.data[0].appid+"&loc="+locId;

          // set payment method
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
              alert('Failer getting background: ', error.message);
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
    openModalSync() {
      let modal = document.getElementById("modalLoadingSync");
      modal.showModal();
    },
    closeModalSync() {
      let modal = document.getElementById("modalLoadingSync");
      setTimeout(() => {
        modal.close();

        setTimeout(() => {
          window.location.href = "/";
        }, 350);
      }, 1300);
    },
  },
});
</script>