<script setup>

import { ref } from 'vue';

const dropdownItems = ref([
  {
    name: 'Top Week',
    value: 'top-week',
  },
  {
    name: 'New Revotes',
    value: 'new-revotes',
  },
]);
const dropdownOpen = ref(false);

const dropdownValue = ref('top-week');

const dropdownChange = (value) => {
  dropdownValue.value = value;
  dropdownOpen.value = false;
};

const dropdownToggle = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
</script>

<template>
  <header class="header">
    <div class="header__container">
        <div class="header__top">
            <div class="header__dropdown">
                <div class="header__dropdown__display">
                    <div class="header__dropdown__display__value" @click="dropdownToggle">
                        {{ dropdownItems.find((item) => item.value === dropdownValue).name }}
                    </div>
                    <div class="header__dropdown__display__icon">
                        <q-icon name="expand_more" />
                    </div>
                    <div v-if="dropdownOpen" class="header__dropdown__display__list">
                        <q-list>
                            <q-item v-for="item in dropdownItems" :key="item.value" clickable @click="dropdownChange(item.value)">
                                <q-item-section>{{ item.name }}</q-item-section>
                            </q-item>
                        </q-list>                        
                    </div>
                </div>
            </div>
            <div class="header__profile">
                <q-icon name="smart_toy" class="header__profile__icon" />
            </div>
        </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>

.header {
    margin-bottom: 25px;
    padding-bottom: 15px;

    background-color: #fff;

    border-bottom: 1px solid #e5e5e5;
}

.header__container {
    display: flex;
    flex-direction: column;
}

.header__top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex: 1;
}

.header__dropdown {
    flex: 1;

    &__display {
        display: flex;
        align-items: center;
        gap: 5px;

        &__value {
            font-size: 24px;
            font-weight: 700;
        }

        &__icon {
            font-size: 24px;
        }
    }
}

.header__profile {
    width: 35px;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 6px;

    background-color: $primary;

    border-radius: 5px;

    &__icon {
        color: #fff;

        font-size: 24px;
    }
}

</style>
