<template>
  <v-container>

    <v-row align="center" justify="space-between" class="top-row">
      <v-col cols="auto">
        <v-btn class="custom-button" @click="goBack">
          Volver
        </v-btn>
      </v-col>
    </v-row>


    <v-row justify="center" class="content-row">
      <v-col cols="7" class="text-center">
        <ReusableCard :title="title">
          <ReusableInput
            v-model="recipientUsername"
            :label="inputLabel"
            placeholder="Ingrese el dato"
          />
          <ReusableInput
            v-model="amount"
            label="Monto a transferir"
            placeholder="Ingrese el monto"
            type="number"
          />
          <p>Saldo disponible: ${{ balanceStore.availableBalance(userStore.currentUser.username) }}</p>
          <v-btn class="continue-button" @click="handleContinue">Continuar</v-btn>
        </ReusableCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineEmits} from 'vue';
import { useRouter } from 'vue-router';
import ReusableCard from './ReusableCard.vue';
import ReusableInput from './ReusableInput.vue';
import { useUserStore } from '@/store/userStore';
import { useBalanceStore } from '@/store/balanceStore';

const router = useRouter();
const emit = defineEmits(['transfer']);
const userStore = useUserStore();
const balanceStore = useBalanceStore();


const props = defineProps({
  title: String,
  inputLabel: String,
  transferType: {
    type: String,
    default: 'internal'
  }
});

const recipientUsername = ref('');
const amount = ref('');


const goBack = () => {
  router.back();
};

const handleContinue = () => {
  if (recipientUsername.value && amount.value) {
    if (props.transferType === 'internal') {
      
      emit('transfer', {
        recipientUsername: recipientUsername.value,
        amount: Number(amount.value)
      });
    } else {
      
      emit('transfer', {
        recipientId: recipientUsername.value,
        amount: Number(amount.value)
      });
    }
  }
};
</script>

<style scoped>
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

.continue-button {
  background-color: #F19743;
  color: #333; 
  text-transform: none; 
  font-size: 19px; 
  margin-top: 10px; 
}
</style>
