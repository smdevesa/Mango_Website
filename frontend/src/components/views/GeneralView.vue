<template>
  <v-container>
    <ReusableCard title="Balance">
      <v-row class="balance-layout">
        <v-col cols="5">
          <CircularBalance
              :balance="balance"
              :sections="sections"
          />
        </v-col>

        <v-col cols="7" class="button-column">
          <v-row justify="center">
            <v-col cols="6">
              <ReusableIconButton
                  icon="mdi-bank-transfer"
                  text="Transferir"
                  @click="goToTransfer"
              />
            </v-col>
            <v-col cols="6">
              <ReusableIconButton
                  icon="mdi-cash-plus"
                  text="Ingresar"
                  @click="handleShowCvu"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="6">
              <ReusableIconButton
                icon="mdi-cash-register"
                text="Cobrar"
                @click="goToCharge"
              />
            </v-col>
            <v-col cols="6">
              <ReusableIconButton
                  icon="mdi-credit-card-plus"
                  text="Añadir tarjeta"
                  @click="goToAddCard"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </ReusableCard>

    <v-row>
      <v-col cols="6">
        <ReusableCard title="Inversiones">
          <v-card class="invest-card">
            <v-card-text class="invest-container">
              <Invest&Rescue />
            </v-card-text>
          </v-card>
        </ReusableCard>
      </v-col>

      <v-col cols="6">
        <ReusableCard title="Historial">
        <v-card class="historial-card">
          <v-card-text>
            <div v-if="displayedTransactions.length === 0">
              No hay transacciones recientes.
            </div>
            <div v-else>
              <div
                v-for="(transaction, index) in displayedTransactions"
                :key="index"
              >
                <TransactionItem
                  logo-url="https://via.placeholder.com/50"
                  :name="userStore.currentUser.username === transaction.toUser
                          ? transaction.fromUser
                          : transaction.toUser"
                  :date="formatDate(transaction.date)"
                  :amount="userStore.currentUser.username === transaction.toUser
                          ? transaction.amount 
                          : -transaction.amount"
                />
              </div>
            </div>
            <div
              v-if="transactions.length > 3"
              class="historial-button"
              @click="goToHistory"
            >
              Ver historial completo
            </div>
          </v-card-text>
        </v-card>
      </ReusableCard>
      </v-col>
    </v-row>

    <!-- Diálogo para mostrar CVU y Alias -->
    <v-dialog v-model="showCvuDialog" max-width="500px">
      <v-card class="v-card-class">
        <v-card-title class="headline">Recibir Dinero</v-card-title>
        <v-card-text>
          <div class="cvu-info">
            <p><strong>CVU:</strong> {{ cvu }}</p>
            <p><strong>Alias:</strong> {{ alias }}</p>
            <div v-if="showAliasInput">
              <reusableInput
              v-if="showAliasInput"
              v-model="newAlias"
              label="Ingrese su nuevo alias"
              outlined
              class= "cambio-alias"
              ></reusableInput>
              <a class="confirm-text">
                para confirmar su nuevo alias presione "cambiar alias"
              </a>
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="reduced-margin">
          <v-btn color="blue" @click="changeAlias">Cambiar alias</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="cerrarBotton" >Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useBalanceStore } from '@/store/balanceStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import ReusableCard from '../common/ReusableCard.vue';
import CircularBalance from '../common/CircularBalance.vue';
import ReusableIconButton from '../common/ReusableIconButton.vue';
import TransactionItem from '../common/TransactionItem.vue';
import { useUserStore } from '@/store/userStore'; // Importa el store de usuario
import ReusableInput from '../common/ReusableInput.vue';
import { errorMessages } from 'vue/compiler-sfc';
import { useHistoryStore } from '@/store/historyStore'; // Importa el store de historial

const balanceStore = useBalanceStore();
const { balance, sections } = storeToRefs(balanceStore);
const router = useRouter();
const userStore = useUserStore(); // Obtén el store de usuario
const newAlias = ref('');
const showAliasInput = ref(false);
const showCvuDialog = ref(false);
const historyStore = useHistoryStore();
const transactions = ref([]);

const cvu = ref(userStore.currentUser.cvu);
const alias = ref(userStore.currentUser.alias);

function formatDate(dateString) {
const date = new Date(dateString);
return date.toLocaleString('es-AR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
}).replace(',', '');
}

onMounted(() => {
transactions.value = historyStore.getTransactionsByUser(userStore.currentUser.username);
historyStore.loadTransactions();
});

const displayedTransactions = computed(() => {
return transactions.value.slice(-3).reverse();
});
// Funciones de navegación
const goToTransfer = () => {
  router.push('/transfer');
};

const goToCharge = () => {
  router.push('/charge');  
};

const goToAddCard = () => {
  router.push('/cards');
};

const goToHistory = () => {
  router.push('/history');
};

// Función para manejar el click en "Ingresar"
const handleShowCvu = () => {
  fetchCvuAndAlias().then(data => {
    cvu.value = data.cvu;
    alias.value = data.alias;
    showCvuDialog.value = true; // Mostrar el modal
  });
};

// Llamada simulada a la API (esta sería tu lógica real)
const fetchCvuAndAlias = () => {
  return new Promise(resolve => {
  const currentUser = userStore.currentUser;

  if (currentUser) {
    // Obtener el CVU y alias del usuario actual desde el store
    const cvu = userStore.currentUser.cvu;
    const alias = userStore.currentUser.alias;

    resolve({
      cvu: cvu,
      alias: alias
    });
  } else {
    // Manejar el caso en que no haya un usuario actual
    resolve({
      cvu: 'N/A',
      alias: 'N/A'
    });
  }
});
};

const changeAlias = () => {
showAliasInput.value = !showAliasInput.value;
if (!showAliasInput.value) {
  if ((newAlias.value.trim() !== '') && !userStore.aliasIsUsed(newAlias.value)) {
      userStore.currentUser.alias = newAlias;
      alias.value = newAlias;
  }
  else{
    errorMessages.value = "alias en uso"; 
  }
}
};

const cerrarBotton = () => {
showAliasInput.value = false;
showCvuDialog.value = false;
}


</script>

<style scoped>
.app-logo {
  width: 150px;
  height: 150px;
  margin-right: 10px;
}

.button-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.invest-container {
  padding: 0;
  margin: 0;
}


.invest-card {
  background-color: #D5ED9F;
  box-shadow: none;
}

.historial-card {
  background-color: transparent;
  box-shadow: none;
}

.historial-button {
  text-align: center;
  color: #000;
  font-weight: 600;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 20px;
}

.balance-layout {
  height: 100%;
  align-items: center;
}

/* Estilo para el scroll de las pills */
.scrollable-pills {
  max-height: 287px;
  overflow-y: auto;
}

/* Estilo del CVU */
.cvu-info {
  text-align: center;
  font-size: 19px;
  margin-bottom: 20px;
}

.cambio-alias {
  margin-top: 20px;
}

.v-card-class {
  padding: 0px;
}

.reduced-margin {
  margin-top: -40px;
}

.confirm-text {
margin-top: -20px;
font-size: 14px;
color: gray;
text-align: center;
padding: 0px;
}
</style>