<script setup>
defineProps({
    content:{
        type: Object,
        required: true,
    }
});
</script>

<template>
    <div class="px-4 py-2 rounded-md text-sm font-medium mb-4" :class="{
    'bg-green-100 text-green-800 border border-green-300' : content.type == 'success',
    'bg-red-100 text-red-800 border border-red-300' : content.type == 'error'
  }"
>
  {{ content.message }}
</div>
</template>