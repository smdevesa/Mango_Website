<template>
  <div style="position: relative; width: 200px; height: 200px; margin-left: 50px;">
    <canvas ref="myChart" width="200" height="200"></canvas>
    <div class="balance-text">{{ balance }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

// Definir props con defineProps
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

// Ref para acceder al canvas
const myChart = ref(null);

// Función para dibujar el gráfico
const drawChart = () => {
  const ctx = myChart.value.getContext('2d'); // Obtiene el contexto del canvas
  const datasets = [];

  props.sections.forEach((section) => {
    datasets.push({
      data: [section.percentage],
      backgroundColor: section.color,
    });
  });

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: props.sections.map(section => section.label),
      datasets: [{
        data: props.sections.map(section => section.percentage),
        backgroundColor: datasets.map(dataset => dataset.backgroundColor),
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      cutout: '70%',
      plugins: {
        legend: {
          display: false, // Oculta la leyenda
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
};

// Ejecutar la función drawChart cuando el componente se monta
onMounted(() => {
  drawChart();
});
</script>

<style scoped>
.balance-text {
  position: absolute;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  font-size: 14pt; 
  text-align: center;
  font-weight: bold;
}
</style>
