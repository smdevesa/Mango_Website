<template>
    <div style="position: relative; width: 200px; height: 200px; margin-left: 50px;"> <!-- Aumenta el tamaño aquí -->
      <canvas ref="myChart" width="200" height="200"></canvas> <!-- Aumenta el tamaño aquí -->
      <div class="balance-text">{{ balance }}</div>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'CircularBalance',
    props: {
      balance: {
        type: String,
        required: true,
      },
      sections: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart() {
        const ctx = this.$refs.myChart.getContext('2d');
        const datasets = [];
  
        this.sections.forEach((section) => {
          datasets.push({
            data: [section.percentage],
            backgroundColor: section.color,
          });
        });
  
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: this.sections.map(section => section.label),
            datasets: [{
              data: this.sections.map(section => section.percentage),
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
      },
    },
  };
  </script>
  
  <style scoped>
  .balance-text {
    position: absolute;
    top: 50%; /* Ajusta para centrar verticalmente */
    left: 50%; /* Ajusta para centrar horizontalmente */
    transform: translate(-50%, -50%); /* Centra el texto */
    font-size: 14pt; /* Cambia el tamaño de fuente según sea necesario */
    text-align: center;
    font-weight: bold;
  }
  </style>
  