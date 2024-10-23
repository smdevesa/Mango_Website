<template>
  <div class="chart-container">
    <canvas ref="myChart" width="300" height="300" />
    <div class="balance-text">
      {{ balanceStore.formattedBalance }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useBalanceStore } from '@/store/balanceStore';
import Chart from 'chart.js/auto';

const balanceStore = useBalanceStore();

const myChart = ref(null);
let chartInstance = null;

const drawChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  const ctx = myChart.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: balanceStore.sections.map(section => section.label),
      datasets: [{
        data: balanceStore.sections.map(section => section.percentage),
        backgroundColor: balanceStore.sections.map(section => section.color),
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

watch(() => balanceStore.sections, drawChart, { deep: true });
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
  font-size: 18pt;
  text-align: center;
  font-weight: bold;
}
</style>