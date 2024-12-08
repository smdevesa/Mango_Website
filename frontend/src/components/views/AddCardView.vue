<template>
  <v-container>
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
                    <v-icon color="red">mdi-close-circle</v-icon>
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

  
    <v-dialog v-model="showConfirmDialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Confirmar eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que quieres eliminar esta tarjeta?</v-card-text>
        <v-card-actions>
          <v-btn class="cancel-button" text @click="closeConfirmDialog">Cancelar</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="confirm-button" text @click="confirmRemove">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      location="top"
    >
      {{ snackbarMessage }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import ReusableCard from '../common/ReusableCard.vue';
import CardDisplay from '../common/CardDisplay.vue';
import ReusableInput from '../common/ReusableInput.vue';
import { useCardStore } from '../../store/cardStore';

const cardStore = useCardStore();
const cardName = ref('');
const cardNumber = ref('');
const expirationDate = ref('');
const valid = ref(false);
const cvv = ref('');
const showConfirmDialog = ref(false);
const cardToRemove = ref(null);
const cards = computed(() => cardStore.getCards);

const rules = {
  required: (v) => !!v || 'Este campo es requerido',
  cardNumber: (v) => (v && v.replace(/\s/g, '').length === 16) || 'Número de tarjeta inválido',
  expirationDate: (v) => (v && /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(v)) || 'Fecha de expiración inválida',
  cvv: (v) => (v && (/^[0-9]{3,4}$/.test(v))) || 'CVV inválido',
  cardName: (v) => (v && /^[a-zA-Z\s]*$/.test(v)) || 'Nombre de tarjeta inválido',
};

const formattedCardNumber = computed({
  get() {
    return cardNumber.value.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  },
  set(value) {
    cardNumber.value = value.replace(/\s/g, '');
  },
});

const form = ref(null); 
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

const addCard = async () => {
 
  const { valid } = await form.value.validate();
  
  if (valid) {
    cardStore.addCard({
      id: Date.now(),
      name: cardName.value,
      number: cardNumber.value,
      expiration: expirationDate.value,
      cvv: cvv.value,
    });
    
    
    snackbarMessage.value = 'Tarjeta agregada exitosamente';
    snackbarColor.value = 'success';
    snackbar.value = true;
    

    form.value.reset();
    cardName.value = '';
    cardNumber.value = '';
    expirationDate.value = '';
    cvv.value = '';
  } else {
 
    snackbarMessage.value = 'Por favor, complete todos los campos correctamente';
    snackbarColor.value = 'error';
    snackbar.value = true;
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
    cardStore.removeCard(cardToRemove.value);
    closeConfirmDialog();
  }
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
  color: #333;
  background: #F19743;
  font-size: 20px;
  text-transform: none; 
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

.remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.remove-button:hover {
  background: rgba(255, 0, 0, 0.1);
}

.cancel-button {
  color: green; 
  justify-content: flex-start; 
  font-size: 16px;
  text-transform: none;
}

.confirm-button {
  color: red; 
  justify-content: flex-end; 
  font-size: 16px;
  text-transform: none;
}
</style>
