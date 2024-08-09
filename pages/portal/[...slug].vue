<template>
  <div class="frame-error">
    <section id="error">
      <!-- <span>Maaf sepertinya meja anda nggak ada, coba scan lagi</span> -->
      <!-- <img src="~/assets/images/not_found_2.png" alt="" /> -->
      <span class="loading loading-spinner text-error bg-red-500 h-20 w-20">
      </span>
      <h1 class="text-2xl text-gray-700 font-semibold mt-4">Menyiapkan ...</h1>
    </section>
  </div>
</template>

<script>
import FetchData from "~/middleware/services/Fetch.js";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();

export default defineComponent({
  component: {
    navbarTo: "/index",
  },
  async mounted() {
    const rawLocId = this.$route.params.slug[0];
    const locId = atob(rawLocId);
    const tableCode = this.$route.query.table_code
      ? this.$route.query.table_code
      : this.$route.params.slug[1];
    const tableParams = this.$route.query.table_code;
    const urlRaw = this.$route.fullPath;
    // console.log("this.$route", this.$route.fullPath);
    // console.log("this.$route", this.$route.params.id);
    // console.log("this.$route", this.$route.query.table_code);
    // console.log("this.$route", this.$route.params.slug[0]);
    // console.log("this.$route", this.$route.params.slug[1]);
    // console.log("locId", locId);

    // cek update data
    const urlCheck = "/qr_myorder/get_location_type?loc=" + locId;
    const check_data = await FetchData.getData(urlCheck);
    const business_type = check_data.data.data[0].business_type;
    // remove /portal
    const url = urlRaw.replace("/portal/", "");

    if (business_type === "fnb") {
      localStorage.setItem("route", "fnb");
      this.$router.push("/fnb/detail/" + url);
    } else if (business_type === "retail") {
      localStorage.setItem("route", "retail");
      this.$router.push("/retail/detail/" + url);
    } else if (business_type === "service") {
      localStorage.setItem("route", "service");
      this.$router.push("/service/detail/" + url);
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    goToIndex() {
      this.$router.push("/");
    },
  },
});
</script>
