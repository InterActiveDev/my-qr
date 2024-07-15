<template>
  <div class="flex justify-center w-full">
    <div class="frame-qris bg-white">
      <!-- <Navbar /> -->
      <section
        id="menux"
        class="w-full min-h-screen bg-white flex flex-col text-black gap-2"
      >
        <details
          class="collapse w-full min-h-full flex flex-col text-black gap-2"
        >
          <summary
            class="collapse-title px-2 py-2 min-h-2 font-medium bg-gray-200 border-2 shadow-xl border-gray-300"
          >
            <div class="flex gap-4">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6668 7.83331L8.00016 11.8333L3.3335 7.83331"
                  stroke="#F2A054"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  opacity="0.5"
                  d="M12.6668 5.16666L8.00016 9.16666L3.3335 5.16666"
                  stroke="#F2A054"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>Buka Filter</span>
            </div>
          </summary>
          <div
            class="collapse-content px-5 pt-4 border-2 border-gray-300"
            :class="isOpen === true ? 'h-[470px]' : 'h-full'"
          >
            <div class="flex flex-row justify-between items-center w-full">
              <div class="flex flex-col w-[200px]">
                <label for="start-date"> Start Date </label>
                <VueDatePicker
                  v-model="startDate"
                  @open="openDate"
                  @closed="closeDate"
                ></VueDatePicker>
              </div>
              <div class="flex flex-col w-[200px]">
                <label for="start-date"> End Date </label>
                <VueDatePicker
                  v-model="endDate"
                  @open="openDate"
                  @closed="closeDate"
                ></VueDatePicker>
              </div>
            </div>
            <div class="flex flex-row items-center gap-2 w-full">
              <label class="form-control w-7/12 max-w-xs">
                <div class="label text-black">
                  <span class="text-black">Lokasi</span>
                </div>
                <div class="overflow-y-visible h-[50px]">
                  <select class="select min-h-[50px] select-bordered bg-white">
                    <option selected>All Data</option>
                    <option v-for="(gc, index) in dataGacoan">
                      {{ gc.loc_name }}
                    </option>
                  </select>
                </div>
              </label>
              <label class="form-control w-5/12 max-w-xs">
                <div class="label">
                  <span class="text-black">Status</span>
                </div>
                <select class="select select-bordered bg-white">
                  <option>Pending MyOrder</option>
                  <option>Pending POS</option>
                </select>
              </label>
            </div>
            <div class="flex flex-row items-center gap-2 w-full mt-2">
              <label
                class="input input-bordered flex w-7/12 items-center bg-white gap-2"
              >
                <input
                  type="text"
                  class="grow bg-white"
                  placeholder="Search"
                  v-model="inputSearch"
                  @keyup="filter(inputSearch)"
                />
              </label>
              <button @click="searchData" class="btn w-5/12">Search</button>
            </div>
          </div>
        </details>
        <details
          v-for="(data, index) in datasCopy"
          :key="index"
          class="collapse flex justify-between items-center w-full max-w bg-white h-full border-2 border-[#00000020] mb-4 rounded-sm"
        >
          <summary>
            <div
              class="flex flex-rpw mx-5 justify-between items-center text-black pt-4 pb-3"
            >
              <span>{{ data.myresto_ref }}</span>
              <span>{{ formatDate(data.tanggalBukaNota) }} </span>
            </div>
          </summary>
          <div class="collapse-content">
            <div class="flex justify-between items-center text-black py-3">
              <span class="text-gray-500">Cabang</span>
              <span>{{ data.loc_name }}</span>
            </div>
            <div class="flex justify-between items-center text-black py-3">
              <span class="text-gray-500">Nota HL</span>
              <span>{{ data.noNota }}</span>
            </div>
            <div class="flex justify-between items-center text-black py-3">
              <span class="text-gray-500">Total</span>
              <span>{{ formatCurrency(data.gtotal) }}</span>
            </div>
            <div class="flex justify-between items-center text-black py-3">
              <span class="text-gray-500">Status MyOrder</span>
              <span class="font-bold text-red-700" v-if="data.lunas == '0'">
                {{ data.lunas == "0" ? "PENDING" : "LUNAS" }}
              </span>
              <span
                class="font-bold text-green-700"
                v-else-if="data.lunas == '1'"
                >{{ data.lunas == "0" ? "PENDING" : "LUNAS" }}</span
              >
            </div>
            <div class="flex justify-between items-center text-black py-3">
              <span class="text-gray-500">Status POS</span>
              <span class="font-bold text-red-700">{{
                data.myresto_qris_status.toUpperCase()
              }}</span>
            </div>
          </div>
        </details>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import FetchData from "~/middleware/services/Fetch.js";

const startDate = ref();
const endDate = ref();
const inputSearch = ref();

export default defineComponent({
  components: {
    Navbar,
    VueDatePicker,
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      datas: [],
      datasCopy: [],
      isOpen: false,
      inputSearch: "",
      dataGacoan: {
        83724: { loc_name: "Me Gacoan" },
        83883: { loc_name: "Mie Gacoan Kediri Pare" },
        93072: { loc_name: "Mie Gacoan Depok Kelapa Dua" },
        104163: { loc_name: "Mie Gacoan Cikarang" },
        104164: { loc_name: "Mie Gacoan Cab Tangerang Cipondoh" },
        104169: { loc_name: "Mie Gacoan Cab Jakarta Garden City" },
        104173: { loc_name: "Mie Gacoan Kudus" },
        104175: { loc_name: "Mie Gacoan Sidoarjo Krian" },
        104176: { loc_name: "Mie Gacoan Cab Gresik 2 GKB" },
        104177: { loc_name: "Mie Gacoan Malang 6 Tlogomas" },
        104178: { loc_name: "Mie Gacoan Yogyakarta" },
        104190: { loc_name: "Gacoan Surabaya 8 Ahmad Yani" },
        133441: { loc_name: "Mie Gacoan Cab Panglima Sudirman" },
        133444: { loc_name: "Mie Gacoan Cab Ambengan" },
        133446: { loc_name: "Mie Gacoan Cab Wiyung" },
        133452: { loc_name: "Mie Gacoan Cab Surabaya Manyar" },
        133454: { loc_name: "Mie Gacoan Cab Surabaya Merr" },
        133456: { loc_name: "Mie Gacoan Cab Margorejo" },
        133460: { loc_name: "Mie Gacoan Cab Sby Mayjend Sungkono" },
        133552: { loc_name: "Mie Gacoan Cab Sby Kenjeran" },
        133553: { loc_name: "Mie Gacoan Cab Sby Manukan" },
        133554: { loc_name: "Mie Gacoan Cab Sby Kenjeran 2" },
        133555: { loc_name: "Mie Gacoan Cab Sby Bung Tomo" },
        133556: { loc_name: "Mie Gacoan Cab Sby Mulyorejo" },
        134272: { loc_name: "Mie Gacoan Cab Bogor Cibinong" },
        134273: { loc_name: "Mie Gacoan Cab Tasikmalaya Yudanegara" },
        140056: { loc_name: "Mie gacoan Cirebon Tentara Pelajar" },
      },
    };
  },
  mounted() {
    // do somehting
    const st = "13 Juli 2024 - 11:55";
    console.log("first", st.toLowerCase().includes("juli"));
    // console.log("dataGacoan", this.dataGacoan[133555]);
  },
  methods: {
    searchData() {
      const startDateValue = this.startDate;
      const endDateValue = this.endDate;
      if (startDateValue && endDateValue) {
        console.log(`Start Date: ${this.escapeDate(startDateValue)}`);
        console.log(`End Date: ${this.escapeDate(endDateValue)}`);

        const url = "/qr_myorder/transaction_monitor";
        const data = {
          appid: "MP01M89093F20230801804",
          locid: "104190",
          tag: "hungryline",
          isDel: "0",
          startDate: this.escapeDate(startDateValue),
          endDate: this.escapeDate(endDateValue),
          status: "pending",
        };
        FetchData.createData(url, data)
          .then((res) => {
            this.datas = res.data.data[0];
            this.datasCopy = this.datas;
            console.log("res: ", res.data.data[0]);
          })
          .catch((error) => {
            console.log("error message (1) : ", error);
          });
      } else {
        alert("no date");
      }
    },
    openDate() {
      this.isOpen = true;
    },
    closeDate() {
      this.isOpen = false;
    },
    formatCurrency(amount) {
      const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
      return formatter.format(amount);
    },
    formatDate(dateString) {
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const date = new Date(dateString);
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${day} ${month} ${year} - ${hours}:${minutes}`;
    },
    escapeDate(inputDate) {
      const date = new Date(inputDate);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
    },
    filter(inputSearch) {
      // this.datasCopy = this.datas.filter((detail) =>
      //   detail.myresto_ref.toLowerCase().includes(inputSearch.toUpperCase())
      // );

      console.log("inputSearch", inputSearch);
      const filteredDetails = this.datas.filter(
        (detail) =>
          detail.myresto_ref
            .toLowerCase()
            .includes(inputSearch.toLowerCase()) ||
          detail.noNota.toLowerCase().includes(inputSearch.toLowerCase()) ||
          detail.loc_name.toLowerCase().includes(inputSearch.toLowerCase()) ||
          this.formatDate(detail.tanggalBukaNota)
            .toLowerCase()
            .includes(inputSearch.toLowerCase()) ||
          detail.gtotal.toString().includes(inputSearch)
      );
      let tempArr = [];

      tempArr.push(...filteredDetails);
      this.datasCopy = tempArr;
    },
  },
});
</script>
