<template>
  <div class="chart-container">
    <canvas
      ref="myChart"
      width="300"
      height="300"
    />
    <div class="balance-text">
      {{ balance }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, toRefs } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  balance: {
    type: String,
    required: true,
  },
  sections: {
    type: Array,
    required: true,
  },
});

const { balance, sections } = toRefs(props);

const myChart = ref(null);
let chartInstance = null;

const drawChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  const ctx = myChart.value.getContext('2d'); // Obtiene el contexto del canvas
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: sections.value.map(section => section.label),
      datasets: [{
        data: sections.value.map(section => section.percentage),
        backgroundColor: sections.value.map(section => section.color),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: '75%', // Aumentado para mantener la proporción
      plugins: {
        legend: {
          display: false, // Oculta la leyenda
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

// Ejecutar la función drawChart cuando el componente se monta
onMounted(() => {
  drawChart();
});

// Vigilar cambios en las props y volver a dibujar el gráfico
watch([balance, sections], () => {
  drawChart();
}, { deep: true });
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 250px; /*Aumentado de 200px a 300px*/
  height: 250px; /*Aumentado de 200px a 300px*/
  margin-left: 80px;
}

.balance-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18pt; /*Aumentado de 14pt a 18pt*/
  text-align: center;
  font-weight: bold;
}
</style>
