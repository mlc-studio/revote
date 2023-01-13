<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { register } from '../lib/api';

const router = useRouter();

const email = ref('');
const password = ref('');
const username = ref('');

const handleRegister = async () => {
    const res = await register(email.value, username.value, password.value);
    
    if(!res) return;

    router.push('/login');
}
</script>

<template>
    <div class="container p">
        <div class="register">
            <div class="register__container">
                <div class="register__title">
                    <h1 class="register__title__text">
                        Register
                    </h1>
                </div>
                <div class="register__form">
                    <div class="register__form__container">
                        <div class="register__form__input">
                            <q-input
                                v-model="email"
                                label="Email"
                                type="email"
                                filled
                                dense
                                class="q-mb-md"
                            />
                        </div>
                        <div class="register__form__input">
                            <q-input
                                v-model="username"
                                label="Username"
                                type="text"
                                filled
                                dense
                                class="q-mb-md"
                            />
                        </div>
                        <div class="register__form__input">
                            <q-input
                                v-model="password"
                                label="Password"
                                type="password"
                                filled
                                dense
                                class="q-mb-md"
                            />
                        </div>
                        <div class="register__form__button">
                            <q-btn
                                label="Register"
                                color="primary"
                                @click="handleRegister"
                            />
                        </div>
                        <!-- Already have account ? -->
                        <div class="register__form__button">
                            <q-btn
                                label="Already have account ?"
                                color="primary"
                                @click="() => router.push('/login')"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.register {
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