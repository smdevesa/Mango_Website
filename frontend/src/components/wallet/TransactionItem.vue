<template>
    <div class="transaction-item">
      <div class="transaction-info">
        <img :src="logoUrl" alt="Logo" class="transaction-logo" />
        <div class="transaction-details">
          <span class="transaction-name">{{ name }}</span>
          <span class="transaction-date">{{ date }}</span>
        </div>
      </div>
      <div class="transaction-amount" :class="amountClass">{{ formattedAmount }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TransactionItem',
    props: {
      logoUrl: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      date: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    },
    computed: {
      amountClass() {
        return this.amount < 0 ? 'expense' : 'income';
      },
      formattedAmount() {
        const sign = this.amount < 0 ? '-' : '+';
        return `${sign} $${Math.abs(this.amount).toFixed(2)}`;
      }
    }
  };
  </script>
  
  <style scoped>
  .transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
  }
  
  .transaction-info {
    display: flex;
    align-items: center;
  }
  
  .transaction-logo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  
  .transaction-details {
    display: flex;
    flex-direction: column;
  }
  
  .transaction-name {
    font-weight: bold;
    font-size: 16px;
  }
  
  .transaction-date {
    font-size: 12px;
    color: #888;
  }
  
  .transaction-amount {
    font-weight: bold;
    font-size: 16px;
  }
  
  .expense {
    color: red;
  }
  
  .income {
    color: green;
  }
  </style>
  