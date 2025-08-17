<script setup>
import { computed } from 'vue'

const props = defineProps({
  buttonStyle: {
    type: String,
    default: 'primary',
  },
})

const buttonColor = computed(() => {
  switch (props.buttonStyle) {
    case 'secondary':
      return 'bg-gray-600 hover:bg-gray-500 focus:bg-gray-500 active:bg-gray-700'
    case 'danger':
      return 'bg-red-600 hover:bg-red-500 focus:bg-red-500 active:bg-red-700'
    case 'success':
      return 'bg-green-600 hover:bg-green-500 focus:bg-green-500 active:bg-green-700'
    default:
      return 'bg-blue-600 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-700'
  }
})
</script>

<template>
  <button
    :class="`transition-colors py-2 px-4 rounded ${buttonColor} text-white`"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
