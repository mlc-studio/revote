<script setup>
import { ref, onMounted } from 'vue';

import Header from '../components/home/Header.vue';
import Revote from '../components/home/Revote.vue';

import { getRevotes, addRevote, getMe } from '../lib/api';

const revotes = ref([]);
const show = ref(false);

const user = ref({});

const title = ref('');
const description = ref('');

onMounted(async () => {
  var res = await getRevotes();
  revotes.value = res.revotes;
  var res = await getMe();
  user.value = res;
});

const handleAddRevote = async () => {
  var res = await addRevote(title.value, description.value);
  if (!res) return;

  var res = await getRevotes();
  revotes.value = res.revotes;
  show.value = false;
  title.value = '';
  description.value = '';
}

</script>

<template>
  <div class="container p">
    <Header />
    <h1 class="header-title">
      Welcome
      <br>
      <span class="username">{{ user.username }}</span>! 👋
    </h1>
    <div class="list">
      <div class="list__container">
        <Revote v-for="revote of revotes" :key="revote._id" :data="revote" :user="user._id" />
      </div>
    </div>
    <div class="modal-add">
      <q-btn
        class="modal-add__button"
        color="primary"
        icon="add"
        @click="show = true"
      />
      <q-dialog v-model="show" maximized>
        <div class="add-revote">
          <div class="add-revote__container">
            <div class="add-revote__title">
              <h1 class="add-revote__title__text">
                Add a revote
              </h1>
              <q-btn
                class="add-revote__title__close"
                color="primary"
                icon="close"
                @click="show = false"
              />
            </div>
            <div class="add-revote__form">
              <div class="add-revote__form__container">
                <div class="add-revote__form__input">
                  <q-input
                    v-model="title"
                    label="Title"
                    filled
                    dense
                    class="q-mb-md"
                  />
                </div>
                <div class="add-revote__form__input">
                  <q-input
                    v-model="description"
                    label="Description"
                    filled
                    dense
                    class="q-mb-md"
                  />
                </div>
                <div class="add-revote__form__button">
                  <q-btn
                    label="Add"
                    color="primary"
                    @click="handleAddRevote"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-title {
  margin-top: 30px;

  font-size: 2.5rem;
  font-weight: 700;
  
  line-height: 1.3;
}

.username {
  text-transform: capitalize;
  color: $primary;
}

.list {
  margin-top: 30px;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.modal-add {
  position: fixed;
  bottom: 20px;
  right: 20px;

  &__button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}

.add-revote {
  display: flex;
  align-items: center;
  &__container {
    width: 90%;

    display: flex;
    flex-direction: column;
    gap: 20px;

    margin: 0 auto;
    padding: 20px;

    border-radius: 10px;

    background-color: white;

  }

  &__title {
    display: flex;
    justify-content: space-between;
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
      width: 100%;
    }

    &__button {
      width: 100%;
    }
  }
}
</style>
