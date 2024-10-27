<template>
  <div class="chart-container">
    <canvas ref="myChart" width="300" height="300" />
    <div class="balance-text">
      ${{ balanceStore.formattedBalance(userStore.currentUser.username) }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useBalanceStore } from '@/store/balanceStore';
import { useUserStore } from '@/store/userStore';
import Chart from 'chart.js/auto';

const balanceStore = useBalanceStore();
const userStore = useUserStore();

const myChart = ref(null);
let chartInstance = null;

// Asegúrate de inicializar el balance del usuario al montar el componente
balanceStore.initUserBalance(userStore.currentUser.username);

const drawChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = myChart.value.getContext('2d');
  const currentUserSections = balanceStore.users[userStore.currentUser.username].sections;

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: currentUserSections.map(section => section.label),
      datasets: [{
        data: currentUserSections.map(section => section.percentage),
        backgroundColor: currentUserSections.map(section => section.color),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: '75%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: function(context) {
              
              return `${context.label}: ${Math.round(context.raw)}%`;
            }
          }
        },
      },
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        animateScale: true
      },
      elements: {
        arc: {
          borderWidth: 0
        }
      }
    }
  });
};

onMounted(() => {
  drawChart();
});

watch(
  () => balanceStore.users[userStore.currentUser.username]?.sections,
  drawChart,
  { deep: true }
);
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 250px;
  height: 250px;
  margin-left: 80px;
}

.balance-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 22pt;
  text-align: center;
  font-weight: bold;
}
</style>
