<template>
  <div class="transaction-item">
    <div class="transaction-info">
      <img
        :src="logoUrl"
        alt="Logo"
        class="transaction-logo"
      >
      <div class="transaction-details">
        <span class="transaction-name">{{ name }}</span>
        <span class="transaction-date">{{ date }}</span>
      </div>
    </div>
    <div 
      class="transaction-amount"
      :class="amountClass"
    >
      {{ formattedAmount }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'; 

const props = defineProps({
  logoUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const amountClass = computed(() => {
  return props.amount < 0 ? 'expense' : 'income';
});

const formattedAmount = computed(() => {
  const sign = props.amount < 0 ? '-' : '+';
  return `${sign} $${Math.abs(props.amount).toFixed(2)}`;
});
</script>

<style scoped>
.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #8b8383;
}

.transaction-info {
  display: flex;
  align-items: center;
}

.transaction-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #000;
}

.transaction-details {
  display: flex;
  flex-direction: column;
}

.transaction-name {
  font-weight: normal;
  font-size: 20px;
}

.transaction-date {
  font-size: 14px;
  color: #000;
}

.transaction-amount {
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
}

.expense {
  color: red;
}

.income {
  color: green;
}
</style>
