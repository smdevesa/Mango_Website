<template>
    <v-container>
        <ReusableCard title="Invertir">
      <!-- Información de inversión -->
      <v-card class="mt-4 mb-4">
        <v-card-title>Invest in Common Fund</v-card-title>
        <v-card-text>
          <p><strong>Available Balance:</strong> ${{ availableBalance }}</p>
          <p><strong>Invested Amount:</strong> ${{ investedAmount }}</p>
          <v-text-field
            v-model="investmentAmount"
            label="Enter Amount to Invest/Withdraw"
            type="number"
            min="0"
            required
          ></v-text-field>
          <v-btn class="button-container" @click="invest">Invest</v-btn>
          <v-btn class="button-container" @click="withdraw">Withdraw</v-btn>
        </v-card-text>
      </v-card>
  
      
    </ReusableCard>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { Chart } from 'chart.js';
  
  const availableBalance = ref(5000); // Balance disponible inicial
  const investedAmount = ref(0);      // Monto invertido inicial
  const investmentAmount = ref('');   // Monto a invertir o retirar
  
  const invest = () => {
    const amount = parseFloat(investmentAmount.value);
    if (amount > 0 && amount <= availableBalance.value) {
      availableBalance.value -= amount;
      investedAmount.value += amount;
      updateCharts();
    } else {
      alert('Insufficient funds or invalid amount.');
    }
  };
  
  const withdraw = () => {
    const amount = parseFloat(investmentAmount.value);
    if (amount > 0 && amount <= investedAmount.value) {
      availableBalance.value += amount;
      investedAmount.value -= amount;
      updateCharts();
    } else {
      alert('Insufficient invested amount or invalid input.');
    }
  };
  
  // Datos para el crecimiento proyectado (rendimiento hardcodeado)
  const annualReturnRate = 5; // Rendimiento anual del 5%
  const projectedGrowthData = Array.from({ length: 12 }, (_, i) =>
    investedAmount.value * Math.pow(1 + annualReturnRate / 100, i / 12)
  );
  
  // Función para actualizar el gráfico al cambiar los valores
  const updateCharts = () => {
    balanceChart.data.datasets[0].data = [availableBalance.value, investedAmount.value];
    balanceChart.update();
  
    // Actualizar gráfico de crecimiento proyectado
    projectedGrowthData.forEach((_, i) => {
      projectedGrowthData[i] = investedAmount.value * Math.pow(1 + annualReturnRate / 100, i / 12);
    });
    growthChart.data.datasets[0].data = projectedGrowthData;
    growthChart.update();
  };
  
  // Configuración de gráficos y renderizado al montar el componente
  let balanceChart, growthChart;
  
  onMounted(() => {
    // Gráfico de balance disponible vs. invertido
    balanceChart = new Chart(document.getElementById('balanceChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Available Balance', 'Invested Amount'],
        datasets: [{
          data: [availableBalance.value, investedAmount.value],
          backgroundColor: ['#4CAF50', '#FFC107']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  
    // Gráfico de crecimiento proyectado
    growthChart = new Chart(document.getElementById('growthChart').getContext('2d'), {
      type: 'line',
      data: {
        labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
        datasets: [{
          label: 'Projected Value',
          data: projectedGrowthData,
          borderColor: '#3E95CD',
          backgroundColor: 'rgba(62, 149, 205, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: false, title: { display: true, text: 'Investment Value ($)' } },
          x: { title: { display: true, text: 'Months' } }
        }
      }
    });
  });
  </script>
  
  <style scoped>
  .button-container {
    display: inline-block;
    color: #FFFBE6;
    background: #F19743;
    font-size: 17px;
    margin: 8px;
  }
  .v-container {
    text-align: center;
  }
  </style>
  