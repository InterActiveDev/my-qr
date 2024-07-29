import axios from "axios";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getClientIp: async () => {
        try {
          const response = await axios.get("https://api.ipify.org?format=json");
          return response.data.ip;
        } catch (error) {
          console.error("Error fetching IP address:", error);
          return null;
        }
      },
    },
  };
});
