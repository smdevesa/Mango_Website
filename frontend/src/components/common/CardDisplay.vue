<template>
  <div class="card-display">
    <v-card-title>
      <h2>{{ cardName }}</h2>
    </v-card-title>
    <v-card-text>
      <div class="card-number">
        {{ formattedCardNumber }}
      </div>
      <div class="card-expiration">
        Exp: {{ expirationDate }}
      </div>
      <div class="cvv-container">
        <span>CVV: {{ maskedCvv }}</span>
        <v-icon
          class="cvv-toggle-icon"
          @click="toggleCvv" > {{ showCvv ? 'mdi-eye-off' : 'mdi-eye' }}
        </v-icon>
      </div>
    </v-card-text>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  cardName: {
    type: String,
    default: 'Nombre de la Tarjeta',
  },
  cardNumber: {
    type: String,
    default: 'Número de Tarjeta',
  },
  expirationDate: {
    type: String,
    default: 'MM/AA',
  },
  cvv: {
    type: String,
    default: '***',
  },
});

const showCvv = ref(false);

const formattedCardNumber = computed(() => {
  return props.cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
});

const maskedCvv = computed(() => {
  return showCvv.value ? props.cvv : '***';
});

const toggleCvv = () => {
  showCvv.value = !showCvv.value;
};
</script>

<style scoped>
.card-display {
  width: 300px;
  height: 180px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 10px;
  text-align: left;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #45b6fc 0%, #5dadec 100%);
  color: white;
}

.card-display::after {
  content: '';
  position: absolute;
  bottom: 40%;
  left: -10%;
  width: 150%;
  height: 150%;
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(20deg);
  border-radius: 50%;
  z-index: 1;
}

.card-number {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-expiration,
.card-cvv {
  font-size: 14px;
  margin-bottom: 5px;
}

h2 {
  font-size: 16px;
  margin-bottom: 15px;
}

.cvv-container {
  display: flex;
  align-items: center;
  gap: 5px;
}

.cvv-toggle-icon {
  cursor: pointer;
  font-size: 18px;
}
</style>
