<template>
    <v-container>
      <!-- Contenedor para el logo y el botón de volver al inicio -->
      <v-row align="center" justify="space-between" class="top-row">
        <v-col cols="auto">
          <v-btn class="custom-button" @click="goToHome">
            Volver al inicio
          </v-btn>
        </v-col>
        <v-col cols="auto">
          <img :src="require('@/assets/logo.png')" alt="Logo" class="app-logo" />
        </v-col>
      </v-row>
  
      <v-row>
        <v-col cols="6">
          <ReusableCard title="Agregar Nueva Tarjeta">
            <v-card-text>
              <v-img
                src="https://static.vecteezy.com/system/resources/thumbnails/009/384/393/small_2x/credit-card-clipart-design-illustration-free-png.png"
                height="150"
                contain
                class="card-image"
              ></v-img>
  
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="formattedCardNumber"
                      :rules="[rules.required, rules.cardNumber]"
                      label="Número de tarjeta"
                      required
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="expirationDate"
                      :rules="[rules.required, rules.expirationDate]"
                      label="Fecha de expiración (MM/AA)"
                      required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="cardName"
                      :rules="[rules.required]"
                      label="Nombre de la tarjeta"
                      required
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="cvv"
                      :rules="[rules.required, rules.cvv]"
                      label="Código (CVV)"
                      required
                    />
                  </v-col>
                </v-row>
                <v-btn @click="addCard" class="button-container">Agregar tarjeta</v-btn>
              </v-form>
            </v-card-text>
          </ReusableCard>
        </v-col>
  
        <v-col cols="6">
          <ReusableCard title="Mis Tarjetas">
            <v-card-text>
              <div v-for="card in cards" :key="card.id">
                <CardDisplay
                  :cardName="card.name"
                  :cardNumber="card.number"
                  :expirationDate="card.expiration"
                  :cvv="card.cvv"
                />
              </div>
              <div v-if="cards.length === 0">No tienes tarjetas guardadas.</div>
            </v-card-text>
          </ReusableCard>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import ReusableCard from '../components/common/ReusableCard.vue';
  import CardDisplay from '../components/common/CardDisplay.vue'; // Importa el componente CardDisplay
  
  export default {
    name: 'AddCardView',
    components: {
      ReusableCard,
      CardDisplay, // Registra el componente
    },
    setup() {
      const router = useRouter();
  
      // Datos para el formulario
      const cardName = ref('');
      const cardNumber = ref('');
      const expirationDate = ref('');
      const valid = ref(false);
      const cvv = ref('');
  
      const cards = ref([]); // Inicializa un array para las tarjetas
  
      // Reglas de validación
      const rules = {
        required: (v) => !!v || 'Este campo es requerido',
        cardNumber: (v) => (v && v.replace(/\s/g, '').length === 16) || 'Número de tarjeta inválido',
        expirationDate: (v) => (v && /^[0-9]{2}\/[0-9]{2}$/.test(v)) || 'Fecha de expiración inválida',
        cvv: (v) => (v && (v.length === 3 || v.length === 4)) || 'CVV inválido',
      };
  
      // Función para volver al inicio
      const goToHome = () => {
        router.push('/'); // Cambia esta ruta a la que necesites para volver al inicio
      };
  
      // Computed para formatear el número de tarjeta
      const formattedCardNumber = computed({
        get() {
          // Agrega espacios cada 4 dígitos
          return cardNumber.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        },
        set(value) {
          // Elimina espacios al ingresar
          cardNumber.value = value.replace(/\s/g, '');
        },
      });
  
      // Función para agregar tarjeta
      const addCard = () => {
        if (valid.value) {
          cards.value.push({
            id: Date.now(),
            name: cardName.value,
            number: cardNumber.value, // Almacena el número de tarjeta sin formato
            expiration: expirationDate.value,
            cvv: cvv.value.length === 3 ? '***' : '****', // Establece el CVV basado en su longitud
          });
          cardName.value = '';
          cardNumber.value = '';
          expirationDate.value = '';
          cvv.value = ''; // Reinicia el CVV
        }
      };
  
      return {
        goToHome,
        cardName,
        formattedCardNumber,
        expirationDate,
        valid,
        rules,
        cards,
        addCard,
        cvv,
      };
    },
  };
  </script>
  
  <style scoped>
  .app-logo {
    width: 75px;
    height: 75px;
    margin-right: 10px;
  }
  .custom-button {
    border-radius: 55px;
    background-color: #3D3C37;
    color: white;
    text-align: left;
    width: 300px; /* Ajusta el tamaño según sea necesario */
    height: 50px;
    text-transform: none; 
    font-size: 20px;
  }
  .card-image {
    display: block;
    margin: 0 auto; /* Centra la imagen horizontalmente */
    margin-bottom: 20px; /* Espacio debajo de la imagen */
  }
  
  .button-container {
    display: block;
    margin: 20px auto;
    color: #FFFBE6;
    background: #F19743;
  }
  </style>
  