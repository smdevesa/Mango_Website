<template>
  <v-container>
    <v-row align="center" justify="space-between" class="top-row">
      <v-col cols="auto">
        <v-btn class="custom-button" @click="goToHome">
          Volver al inicio
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <img src="../../assets/mangoLogo3.png" alt="Logo" class="app-logo">
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <ReusableCard title="Agregar nueva tarjeta">
          <v-card-text>
            <v-img
              src="https://static.vecteezy.com/system/resources/thumbnails/009/384/393/small_2x/credit-card-clipart-design-illustration-free-png.png"
              height="150"
              contain
              class="card-image"
            />

            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="6">
                  <ReusableInput
                    v-model="formattedCardNumber"
                    :rules="[rules.required, rules.cardNumber]"
                    label="Número de tarjeta"
                  />
                </v-col>
                <v-col cols="6">
                  <ReusableInput
                    v-model="expirationDate"
                    :rules="[rules.required, rules.expirationDate]"
                    label="Fecha de expiración (MM/AA)"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <ReusableInput
                    v-model="cardName"
                    :rules="[rules.required, rules.cardName]"
                    label="Nombre del titular"
                  />
                </v-col>
                <v-col cols="6">
                  <ReusableInput
                    v-model="cvv"
                    :rules="[rules.required, rules.cvv]"
                    label="Código (CVV)"
                  />
                </v-col>
              </v-row>
              <v-btn class="button-container" @click="addCard">
                Agregar tarjeta
              </v-btn>
            </v-form>
          </v-card-text>
        </ReusableCard>
      </v-col>

      <v-col cols="6">
        <ReusableCard title="Mis tarjetas">
          <v-card-text>
            <div class="scrollable">
              <div v-for="card in cards" :key="card.id" class="card-item">
                <div class="card-content">
                  <CardDisplay
                    :card-name="card.name"
                    :card-number="card.number"
                    :expiration-date="card.expiration"
                    :cvv="card.cvv"
                  />
                  <v-btn icon small class="remove-button" @click="openConfirmDialog(card.id)">
                    <v-icon color="red">mdi-delete</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
            <div v-if="cards.length === 0">
              No tienes tarjetas guardadas.
            </div>
          </v-card-text>
        </ReusableCard>
      </v-col>
    </v-row>

    <!-- Diálogo de confirmación -->
    <v-dialog v-model="showConfirmDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Confirmar eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que quieres eliminar esta tarjeta?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeConfirmDialog">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="confirmRemove">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import ReusableCard from '../common/ReusableCard.vue';
import CardDisplay from '../common/CardDisplay.vue';
import ReusableInput from '../common/ReusableInput.vue'; // Importa el componente ReusableInput


// Variables reactivas
const router = useRouter();
const cardName = ref('');
const cardNumber = ref('');
const expirationDate = ref('');
const valid = ref(false);
const cvv = ref('');
const cards = ref([]);
const showConfirmDialog = ref(false);
const cardToRemove = ref(null);

// Reglas de validación
const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  cardNumber: (v) => (v && v.replace(/\s/g, '').length === 16) || 'Número de tarjeta inválido',
  expirationDate: (v) => (v && /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(v)) || 'Fecha de expiración inválida',
  cvv: (v) => (v && (/^[0-9]{3,4}$/.test(v))) || 'CVV inválido',
  cardName: (v) => (v && /^[a-zA-Z\s]*$/.test(v)) || 'Nombre de tarjeta inválido',
};

// Funciones
const goToHome = () => {
  router.push('/home');
};

const formattedCardNumber = computed({
  get() {
    return cardNumber.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  },
  set(value) {
    cardNumber.value = value.replace(/\s/g, '');
  },
});

const addCard = () => {
  if (valid.value) {
    cards.value.push({
      id: Date.now(),
      name: cardName.value,
      number: cardNumber.value,
      expiration: expirationDate.value,
      cvv: cvv.value,
      showCvv: false,
    });
    cardName.value = '';
    cardNumber.value = '';
    expirationDate.value = '';
    cvv.value = '';
  }
};

const openConfirmDialog = (id) => {
  cardToRemove.value = id;
  showConfirmDialog.value = true;
};

const closeConfirmDialog = () => {
  showConfirmDialog.value = false;
  cardToRemove.value = null;
};

const confirmRemove = () => {
  if (cardToRemove.value !== null) {
    removeCard(cardToRemove.value);
    closeConfirmDialog();
  }
};

const removeCard = (id) => {
  cards.value = cards.value.filter(card => card.id !== id);
};

</script>

<style scoped>
.app-logo {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}
.custom-button {
  border-radius: 55px;
  background-color: #3D3C37;
  color: white;
  text-align: left;
  width: 300px;
  height: 50px;
  text-transform: none; 
  font-size: 20px;
}
.card-image {
  display: block;
  margin: 0 auto 20px;
}

.button-container {
  display: block;
  margin: 20px auto;
  color: #FFFBE6;
  background: #F19743;
  font-size: 17px;
}

.scrollable {
  max-height: 425px;
  overflow-y: auto;  
}

.card-item {
  margin-bottom: 20px; 
}

.card-content {
  position: relative; 
}

.remove-button{
  position: absolute;
  top: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.remove-button {
  right: 10px;
}

.remove-button:hover {
  background: rgba(255, 0, 0, 0.1); /* Fondo rojo suave al pasar el mouse */
}

</style>
