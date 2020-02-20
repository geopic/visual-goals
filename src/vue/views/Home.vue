<template>
  <div id="home">
    <template v-if="dataExists"></template>
    <template v-else>
      <form @submit.prevent="initData" method="post">
        <div class="form-section">
          <label for="goal-name">
            <h1>1. Define a goal</h1>
          </label>
          <input type="text" id="goal-name" />
        </div>
        <div class="form-section">
          <label for="goal-start-date">
            <h1>2. Set the starting date</h1>
          </label>
          <input type="date" id="goal-start-date" :value="today" />
        </div>
        <div class="form-section">
          <label for="goal-end-date">
            <h1>3. Set the ending date</h1>
          </label>
          <input
            type="date"
            id="goal-end-date"
            :value="defaultEndDate"
            :min="today"
          />
        </div>
        <div class="form-section">
          <button type="submit">Get started!</button>
        </div>
      </form>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SiteData } from '@/common/types';
import { addDays, format } from 'date-fns';

@Component
export default class Home extends Vue {
  today = format(new Date(), 'yyyy-MM-dd');
  defaultEndDate = format(addDays(new Date(this.today), 14), 'yyyy-MM-dd');

  get dataExists() {
    return this.$store.state.dataExists;
  }

  /**
   * Create data via form submit event.
   */
  initData(e: Event) {
    const targ = e.target as HTMLFormElement;
    const data: SiteData = {};
    Array.from(targ.querySelectorAll('input[name]')).forEach(input => {
      const inp = input as HTMLInputElement;
      data[inp.name] = inp.value;
    });
    this.$store.commit('saveData', data);
  }
}
</script>

<style lang="scss" scoped>
#home {
  form {
    .form-section {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
