<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { login } from '../lib/api';

const router = useRouter();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
    const res = await login(email.value, password.value);
    if (!res.token) return; 
    
    localStorage.setItem('token', res.token);
    router.push('/');
}
</script>

<template>
    <div class="container p">
        <div class="login">
            <div class="login__container">
                <div class="login__title">
                    <h1 class="login__title__text">
                        Login
                    </h1>
                </div>
                <div class="login__form">
                    <div class="login__form__container">
                        <div class="login__form__input">
                            <q-input
                                v-model="email"
                                label="Email"
                                type="email"
                                filled
                                dense
                                class="q-mb-md"
                            />
                        </div>
                        <div class="login__form__input">
                            <q-input
                                v-model="password"
                                label="Password"
                                type="password"
                                filled
                                dense
                                class="q-mb-md"
                            />
                        </div>
                        <div class="login__form__button">
                            <q-btn
                                label="Login"
                                color="primary"
                                @click="handleLogin"
                            />
                        </div>
                        <!-- You dont have an account yet ? -->
                        <div class="login__form__button">
                            <q-btn
                                label="No account yet ?"
                                color="primary"
                                @click="() => router.push('/register')"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
    &__container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__title {
        &__text {
            font-size: 2.5rem;
            font-weight: 700;
        }
    }

    &__form {
        &__container {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        &__input {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        &__button {
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>