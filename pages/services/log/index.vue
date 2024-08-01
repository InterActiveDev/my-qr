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
          class="flex flex-row justify-between w-full px-3 py-3 bg-slate-200 gap-1"
        >
          <div class="flex flex-col w-6/12">
            <label for="start-date" class="ml-3 font-bold">Log Date</label>
            <VueDatePicker
              v-model="startDate"
              :enable-time-picker="false"
              @open="openDate"
              @closed="closeDate"
            ></VueDatePicker>
          </div>
          <div class="flex flex-col w-6/12 relative">
            <label for="password" class="ml-3 font-bold">Password</label>
            <input
              :type="passwordFieldType"
              id="password"
              class="input input-bordered h-[38px] bg-white text-black"
              placeholder="Password..."
              v-model="password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute right-2 top-11 transform -translate-y-1/2 text-black"
            >
              <span v-if="passwordFieldType === 'password'">👓</span>
              <span v-else>🕶️</span>
            </button>
          </div>
        </div>
        <button
          @click="downloadLogFile()"
          class="btn bg-red-600 text-white self-end w-full"
        >
          Download
        </button>
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
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const startDate = ref(new Date());
const password = "";

export default defineComponent({
  components: {
    Navbar,
    VueDatePicker,
  },
  data() {
    return {
      startDate: new Date(),
      password: "",
      passwordFieldType: "password",
    };
  },
  mounted() {
    // do somehting
  },
  methods: {
    async downloadLogFile() {
      const startDateValue = this.startDate;
      const password = this.password;
      if (startDateValue && password) {
        try {
          const yearMonth = startDateValue.toISOString().slice(0, 7);
          const date = startDateValue.toISOString().slice(0, 10);

          if (btoa(password) !== btoa(config.public.logSalt)) {
            return alert("Password salah!");
          }

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
        alert("Tanggal atau Password kosong!");
      }
    },
    openDate() {
      this.isOpen = true;
    },
    closeDate() {
      this.isOpen = false;
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
});
</script>
