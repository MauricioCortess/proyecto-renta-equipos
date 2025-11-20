<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl p-6 relative">
      <button @click="close" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold">
        &times;
      </button>

      <h3 class="text-2xl font-bold text-brand-blue mb-4">
        <slot name="header">
          Título del Modal
        </slot>
      </h3>

      <div class="modal-body mb-4">
        <slot></slot>
      </div>

      <div class="modal-footer text-right">
        <slot name="footer">
          </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
/* Puedes añadir transiciones o estilos adicionales aquí si lo deseas */
</style>