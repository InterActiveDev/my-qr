<template>
    <div class="sort-item flex flex-row items-center justify-center">
        <span>Your table number is empty, please scan the QR Code again</span>
        <div>
            <img src="~/assets/images/not_found_2.png" alt="Logo" style="width: 300px; height: 300px;" />
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    data() {
    return {
            showBottomCart: false,
            showAddProductModal: false,
        };
    },
    methods: {

    },
};
</script>
