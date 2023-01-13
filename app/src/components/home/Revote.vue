<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getVotes, doVote, deleteRevote } from '../../lib/api';

const router = useRouter();

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  user: {
    type: String,
    default: '',
  },
});

const voteCount = ref(0);

onMounted(() => {
  getCountVote();
});

const getCountVote = async () => {
  const res = await getVotes(props.data._id);
  voteCount.value = res.votes;
}

const handleVote = async (upOrDown) => {
  await doVote(props.data._id, upOrDown);
  getCountVote();
}

const handleDeleteRevote = async () => {
  await deleteRevote(props.data._id);
  router.go();
}

</script>

<template>
    <div class="revote">
          <div class="revote__container">
            <div class="revote__contents">
              <h3 class="revote__title">
                {{ props.data.title }}
              </h3>
              <p class="revote__description">
                {{ props.data.description }}
              </p>
            </div>
            <div class="revote__vote">
              <div class="revote__vote__container">
                <div class="revote__vote__up">
                  <q-icon name="arrow_upward" @click="handleVote(true)" />
                </div>
                <div class="revote__vote__count">
                  {{ voteCount }}
                </div>
                <div class="revote__vote__down">
                  <q-icon name="arrow_downward" @click="handleVote(false)" />
                </div>
              </div>
            </div>
            <div class="username">
              by <span>{{ props.data.user.username }}</span>
            </div>
            <div class="admin" v-if="props.user === props.data.user._id">
              <q-btn
                color="primary"
                icon="delete"
                @click="handleDeleteRevote"
              />
            </div>
          </div>
        </div>
</template>

<style lang="scss" scoped>

.username {
  width: 100%;

  font-size: 0.75rem;
  font-weight: 400;
  color: #999;

  span {
    font-weight: 700;
    color: $primary;
  }
}

.revote {
  &__container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;

    padding: 20px;

    background-color: #fff;

    border-radius: 5px;

    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
  }

  &__contents {
    flex: 1;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;

    color: $primary;
  }

  &__description {
    margin-top: 10px;

    font-size: 1rem;
    font-weight: 400;
  }

  &__vote__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  &__vote__up {
    font-size: 1rem;
  }

  &__vote__count {
    font-size: 1rem;
    font-weight: 700;
  }

  &__vote__down {
    font-size: 1rem;
  }
}
</style>