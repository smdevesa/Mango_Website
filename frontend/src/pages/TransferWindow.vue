<template>
  <v-container>
    <v-card class="mx-auto" max-width="400">
      <v-card-title>
        Transferir Fondos
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field label="Monto" type="number"></v-text-field>
          <v-text-field label="Destinatario" type="text"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="submitTransfer">Confirmar</v-btn>
        <v-btn color="error" @click="goBack">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const submitTransfer = () => {
      // Lógica para procesar la transferencia
      console.log("Transferencia realizada");
      // Después de procesar, regresar a la vista general
      router.push('/');
    };

    const goBack = () => {
      router.push('/');
    };

    return {
      submitTransfer,
      goBack
    };
  }
};
</script>

<style scoped>
.mx-auto {
  margin: auto;
}
</style>