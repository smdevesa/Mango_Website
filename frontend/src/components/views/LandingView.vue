<template>
    <v-app>
      <div class="landing-container">
       
        <section class="hero-section">
          <v-img
            src="@/assets/mangoLogo3.png"
            class="hero-logo"
            alt="Mango Logo"
          ></v-img>
          
          <h1 class="hero-title">MANGO$</h1>
          <p class="hero-subtitle">La forma más fácil y segura de manejar tu dinero</p>
          
          <div class="hero-buttons">
            <v-btn class="cta-btn" outlined color="orange" text-color="white" @click="navigateToRegister">Crear cuenta</v-btn>
            <v-btn class="cta-btn" outlined color="orange" text-color="white" @click="navigateToLogin">Iniciar sesión</v-btn>
          </div>
        </section>
  
       
        <section class="features-section">
          <h2 class="section-title">Por qué elegir Mango$</h2>
          <v-row class="features-row" justify="center">
            <v-col cols="12" md="3" class="text-center" v-for="feature in features" :key="feature.title">
              <v-icon large>{{ feature.icon }}</v-icon>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </v-col>
          </v-row>
        </section>
      </div>
    </v-app>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  
  const navigateToLogin = () => {
    router.push('/login');
  };
  
  const navigateToRegister = () => {
    router.push('/register');
  };
  
  const features = ref([
    {
      icon: 'mdi-shield-check',
      title: 'Seguridad avanzada',
      description: 'Protege tu dinero con múltiples capas de seguridad, autenticación y cifrado avanzado.',
    },
    {
      icon: 'mdi-currency-usd',
      title: 'Transacciones instantáneas',
      description: 'Envía y recibe dinero de forma rápida y segura, sin comisiones ocultas.',
    },
    {
      icon: 'mdi-cellphone',
      title: 'Acceso desde cualquier lugar',
      description: 'Gestiona tu dinero desde cualquier dispositivo con nuestra aplicación intuitiva.',
    },
    {
      icon: 'mdi-cash-plus',
      title: 'Comisiones bajas',
      description: 'Disfruta de las tarifas más competitivas del mercado en todas tus transacciones.',
    },
  ]);
  </script>
  
  <style scoped>
  
  .landing-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  
  .hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 50px 20px;
    background-color: #D5ED9F;
    color: #333;
  }
  
  .hero-logo {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
  
  .hero-title {
    font-size: 3.5rem;
    font-weight: bold;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    margin: 20px 0;
  }
  
  .hero-buttons {
    margin-top: 30px;
  }

  .hero-buttons button {
    font-size: 1.1em;
    height: 70px;
    width: 160px;
  }
  
  .cta-btn {
    margin-right: 15px;
    text-transform: none; 
  }
  
  .features-section {
    padding: 60px 20px;
  }
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
  
  .features-row {
    gap: 20px;
  }
  
  .feature-title {
    font-size: 1.25rem;
    margin: 15px 0 10px;
  }
  
  .feature-description {
    font-size: 1rem;
    color: #666;
  }
  </style>