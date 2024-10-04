<template>
    <v-card class="welcome-banner" outlined>
        <v-row align="center" justify="flex-start" class="banner-content">
            <v-col cols="auto" class="profile-col">
                <v-img :src="profileImage" class="profile-image"></v-img>
                <v-card-title class="username">
                    Bienvenido,
                    <br />
                    {{ username }}
                </v-card-title>
            </v-col>
            <v-col cols="auto" class="menu-col">
                <v-menu offset-y>
                    <template v-slot:activator="{ props }">
                        <v-btn icon v-bind="props" class="menu-button">
                            <v-icon class="menu-icon">mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click.stop="">
                            <v-list-item-title>Opción 1</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click.stop="">
                            <v-list-item-title>Opción 2</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click.stop="">
                            <v-list-item-title>Opción 3</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </v-row>
    </v-card>
</template>


<script>
export default {
    name: 'WelcomeBanner',
    props: {
        username: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
            default: 'https://placehold.co/50x50',
        },
    },
}
</script>

<style scoped>
.welcome-banner {
    border-radius: 55px;
    background-color: #3D3C37;
    color: white;
    text-align: left;
    width: 500px;
    height: 70px;
    margin-bottom: 20px;
}

.profile-col {
    display: flex;
    align-items: center; /* Alinea verticalmente la imagen y el nombre */
    margin-left: 30px;
}

.profile-image {
    width: 50px;
    height: 50px;
    margin-right: 10px; /* Espacio entre la imagen y el nombre */
    border-radius: 50%;
    border: solid #FF9500 2px;
}

.username {
    white-space: normal;
    font-size: 13pt;
    margin: 0; /* Asegúrate de que no haya margen adicional */
}

.menu-col {
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
}

.menu-button {
    margin-right: 20px;
    background-color: transparent;
    box-shadow: none;
    border: none;
}

.menu-icon {
    color: white;
    transition: color 0.3s;
}

.menu-button:hover .menu-icon {
    color: #FF9500;
}
</style>
