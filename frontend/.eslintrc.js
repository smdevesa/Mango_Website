/* eslint-disable */

module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'plugin:vue/vue3-recommended', // Configuración recomendada para Vue 3
      'eslint:recommended',
    ],
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    globals: {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      defineOptions: 'readonly',
    },
    rules: {
      // Aquí puedes añadir reglas adicionales o personalizadas si lo deseas
    },
  };
  