<template>
  <div class="flex justify-center w-full">
    <div class="frame-qris bg-white">
      <!-- <Navbar /> -->
      <section
        id="menux"
        class="w-full min-h-screen bg-white flex flex-col text-black"
      >
        <div class="flex justify-center py-2 bg-slate-200">
          <h1 class="text-2xl font-bold">Download Log</h1>
        </div>
        <div
          class="flex flex-row justify-between w-full px-3 py-3 bg-slate-200"
        >
          <div class="flex flex-col w-6/12">
            <label for="start-date" class="ml-3"> Log Date </label>
            <VueDatePicker
              v-model="startDate"
              :enable-time-picker="false"
              @open="openDate"
              @closed="closeDate"
            ></VueDatePicker>
          </div>
          <button
            @click="downloadLogFile()"
            class="btn w-5/12 bg-red-600 text-white self-end"
          >
            Download
          </button>
        </div>
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

const startDate = ref(new Date());

export default defineComponent({
  components: {
    Navbar,
    VueDatePicker,
  },
  data() {
    return {
      startDate: new Date(),
    };
  },
  mounted() {
    // do somehting
  },
  methods: {
    async downloadLogFile() {
      const startDateValue = this.startDate;

      if (startDateValue) {
        try {
          const yearMonth = startDateValue.toISOString().slice(0, 7);
          const date = startDateValue.toISOString().slice(0, 10);

          const response = await fetch(
            `/api/download-log?yearMonth=${yearMonth}&date=${date}`
          );

          if (!response.ok) {
            throw new Error("Failed to download log file");
          }

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${date}.txt`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch (error) {
          alert(error.message);
          console.log("Error downloading log file:", error.message);
        }
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
