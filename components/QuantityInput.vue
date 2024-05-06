<template>
  <div class="split-item">
    <button class="btn btn-minus" @click="decrementValue">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="5"
        viewBox="0 0 21 5"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.192383 2.5C0.192383 1.39543 1.08781 0.5 2.19238 0.5H18.1924C19.297 0.5 20.1924 1.39543 20.1924 2.5C20.1924 3.60457 19.297 4.5 18.1924 4.5H2.19238C1.08781 4.5 0.192383 3.60457 0.192383 2.5Z"
          fill="#DA2424"
        />
      </svg>
    </button>
    <input
      type="text"
      placeholder="0"
      class="input input-ghost w-full max-w-xs"
      v-model="inputValue"
      readonly
    />
    <button class="btn btn-plus" @click="incrementValue">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.192383 10.498C0.192383 9.39348 1.08781 8.49805 2.19238 8.49805H18.1924C19.297 8.49805 20.1924 9.39348 20.1924 10.498C20.1924 11.6026 19.297 12.498 18.1924 12.498H2.19238C1.08781 12.498 0.192383 11.6026 0.192383 10.498Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.1924 0.5C11.297 0.5 12.1924 1.39543 12.1924 2.5L12.1924 18.5C12.1924 19.6046 11.297 20.5 10.1924 20.5C9.08781 20.5 8.19238 19.6046 8.19238 18.5L8.19238 2.5C8.19238 1.39543 9.08781 0.5 10.1924 0.5Z"
          fill="white"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['inputValue'],
  data() {
    return {
      inputValue: 1
    };
  },
  methods: {
    incrementValue() {
      this.inputValue++;
    },
    decrementValue() {
      if (this.inputValue > 1) {
        console.log("as", this.inputValue);
        this.inputValue--;
      }
    }
  }
};
</script>
