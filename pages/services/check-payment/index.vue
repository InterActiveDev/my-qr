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
                  <select
                    class="select min-h-[50px] select-bordered bg-white"
                    v-model="locQuery"
                    @change="filter"
                  >
                    <option value="all data">All Data</option>
                    <option
                      v-for="(gc, index) in dataGacoan"
                      :key="index"
                      :value="gc.loc_name"
                    >
                      {{ gc.loc_name }}
                    </option>
                  </select>
                </div>
              </label>
              <label class="form-control w-5/12 max-w-xs">
                <div class="label">
                  <span class="text-black">Status</span>
                </div>
                <select
                  class="select select-bordered bg-white"
                  v-model="statusQuery"
                  @change="filter()"
                >
                  <option value="All Status">All Status</option>
                  <option value="Pending Payment">Pending Payment</option>
                  <option value="Pending POS">Pending POS</option>
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
                  v-model="searchQuery"
                  @input="filter"
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
          <summary class="cursor-pointer bg-slate-200 hover:bg-gray-300">
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
              <span class="text-gray-500">Status Payment</span>
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
              <span
                class="font-bold text-red-700"
                v-if="data.myresto_qris_status == 'pending'"
                >{{ data.myresto_qris_status.toUpperCase() }}</span
              >
              <span
                class="font-bold text-green-700"
                v-else-if="data.myresto_qris_status == 'lunas'"
                >{{ data.myresto_qris_status.toUpperCase() }}</span
              >
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
      searchQuery: "",
      statusQuery: "All Status",
      locQuery: "all data",
      isOpen: false,
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
    // this.searchData();
    // this.datas = [
    //   {
    //     idTransaksi: 3005499,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T04:55:21.000Z",
    //     noNota: "HL-104190G-669208B9CA4D9",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001848",
    //     lunas: 0,
    //     myresto_ref: "GS8AY55499Q",
    //     myresto_qris_status: "lunas",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 56001,
    //   },
    //   {
    //     idTransaksi: 3008213,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T09:22:33.000Z",
    //     noNota: "HL-104190G-6692475933B5D",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001883",
    //     lunas: 0,
    //     myresto_ref: "GS8AY18213C",
    //     myresto_qris_status: "pending",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 61001,
    //   },
    //   {
    //     idTransaksi: 3009606,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T11:17:39.000Z",
    //     noNota: "HL-104190G-66926253CC44E",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001900",
    //     lunas: 0,
    //     myresto_ref: "GS8AY59606Q",
    //     myresto_qris_status: "pending",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 40001,
    //   },
    //   {
    //     idTransaksi: 3010010,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T11:45:29.000Z",
    //     noNota: "HL-104190G-669268D95B178",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001906",
    //     lunas: 0,
    //     myresto_ref: "GS8AY50010Q",
    //     myresto_qris_status: "pending",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 75002,
    //   },
    //   {
    //     idTransaksi: 3010958,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T12:52:18.000Z",
    //     noNota: "HL-104190G-669278829D067",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001922",
    //     lunas: 0,
    //     myresto_ref: "GS8AY50958Q",
    //     myresto_qris_status: "lunas",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 18501,
    //   },
    //   {
    //     idTransaksi: 3010996,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T12:54:32.000Z",
    //     noNota: "HL-104190G-6692790820360",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001925",
    //     lunas: 0,
    //     myresto_ref: "GS8AY10996C",
    //     myresto_qris_status: "lunas",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 18501,
    //   },
    //   {
    //     idTransaksi: 3011635,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 83883,
    //     tanggalBukaNota: "2024-07-13T13:41:44.000Z",
    //     noNota: "HL-104190G-6692841913852",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001931",
    //     lunas: 0,
    //     myresto_ref: "GS8AY51635Q",
    //     myresto_qris_status: "lunas",
    //     loc_name: "Mie Gacoan Kediri Pare",
    //     gtotal: 72003,
    //   },
    //   {
    //     idTransaksi: 3011637,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T13:41:48.000Z",
    //     noNota: "HL-104190G-6692841C64914",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001932",
    //     lunas: 1,
    //     myresto_ref: "GS8AY11637C",
    //     myresto_qris_status: "pending",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 44502,
    //   },
    //   {
    //     idTransaksi: 3012399,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T14:39:28.000Z",
    //     noNota: "HL-104190G-669291A024732",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001954",
    //     lunas: 0,
    //     myresto_ref: "GS8AY52399Q",
    //     myresto_qris_status: "pending",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 57001,
    //   },
    //   {
    //     idTransaksi: 3012475,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T14:46:09.000Z",
    //     noNota: "HL-104190G-669293312CFD2",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001959",
    //     lunas: 0,
    //     myresto_ref: "GS8AY32475E",
    //     myresto_qris_status: "pending",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 54502,
    //   },
    //   {
    //     idTransaksi: 3013123,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 83883,
    //     tanggalBukaNota: "2024-07-13T16:05:55.000Z",
    //     noNota: "HL-104190G-6692A5E3CF280",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001981",
    //     lunas: 0,
    //     myresto_ref: "GS8AY13123C",
    //     myresto_qris_status: "pending",
    //     loc_name: "Mie Gacoan Kediri Pare",
    //     gtotal: 37001,
    //   },
    //   {
    //     idTransaksi: 3013317,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T16:30:37.000Z",
    //     noNota: "HL-104190G-6692ABAD35A39",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001989",
    //     lunas: 0,
    //     myresto_ref: "GS8AY13317C",
    //     myresto_qris_status: "pending",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 112002,
    //   },
    //   {
    //     idTransaksi: 3013549,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 133454,
    //     tanggalBukaNota: "2024-07-13T17:09:36.000Z",
    //     noNota: "HL-104190G-6692B4D0DDD19",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560001997",
    //     lunas: 1,
    //     myresto_ref: "GS8AY13549C",
    //     myresto_qris_status: "pending",
    //     loc_name: "Mie Gacoan Cab Surabaya Merr",
    //     gtotal: 48001,
    //   },
    //   {
    //     idTransaksi: 3013860,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 104190,
    //     tanggalBukaNota: "2024-07-13T18:37:21.000Z",
    //     noNota: "HL-104190G-6692C9614AA59",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560002010",
    //     lunas: 0,
    //     myresto_ref: "GS8AY53860Q",
    //     myresto_qris_status: "pending",
    //     loc_name: "Gacoan Surabaya 8 Ahmad Yani",
    //     gtotal: 22000,
    //   },
    //   {
    //     idTransaksi: 3013899,
    //     appid: "MP01M89093F20230801804",
    //     loc_id: 133454,
    //     tanggalBukaNota: "2024-07-13T19:08:50.000Z",
    //     noNota: "HL-104190G-6692D0C23824C",
    //     jenistran: "hungryline",
    //     qren_invoice_id: "INV58560002015",
    //     lunas: 1,
    //     myresto_ref: "GS8AY13899C",
    //     myresto_qris_status: "pending",
    //     loc_name: "Mie Gacoan Cab Surabaya Merr",
    //     gtotal: 32002,
    //   },
    // ];
    // this.datasCopy = this.datas;
  },
  methods: {
    searchData() {
      const startDateValue = this.startDate;
      const endDateValue = this.endDate;
      // const startDateValue = "2024-07-13 09-23-00";
      // const endDateValue = "2024-07-14 09-23-00";
      if (startDateValue && endDateValue) {
        // console.log(`Start Date: ${this.escapeDate(startDateValue)}`);
        // console.log(`End Date: ${this.escapeDate(endDateValue)}`);

        const url = "/qr_myorder/transaction_monitor";
        const data = {
          appid: "MP01M89093F20230801804",
          locid: "104190",
          tag: "hungryline",
          startDate: this.escapeDate(startDateValue),
          endDate: this.escapeDate(endDateValue),
          isDel: "0",
          status: "pending",
        };
        // startDate: startDateValue,
        // endDate: endDateValue,
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
    filter() {
      console.log("inputSearch", this.searchQuery);
      console.log("statusQuery", this.statusQuery);
      console.log("locQuery", this.locQuery);
      const filteredSearchQuery = this.datas.filter(
        (detail) =>
          (this.locQuery == "all data" || this.locQuery == null
            ? true
            : detail.loc_name == this.locQuery) &&
          (this.searchQuery != ""
            ? detail.myresto_ref
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              detail.noNota
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              detail.loc_name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              this.formatDate(detail.tanggalBukaNota)
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              detail.gtotal.toString().includes(this.searchQuery)
            : true) &&
          (this.statusQuery == "All Status"
            ? true
            : this.statusQuery == "Pending Payment"
            ? detail.lunas == "0"
            : this.statusQuery == "Pending POS"
            ? detail.myresto_qris_status == "pending"
            : true)
      );

      let tempArr = [];
      tempArr.push(...filteredSearchQuery);
      this.datasCopy = tempArr;
    },
  },
});
</script>
