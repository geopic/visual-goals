<template>
  <div id="home">
    <template v-if="dataExists"></template>
    <template v-else>
      <form @submit.prevent="initData" method="post">
        <div class="form-section">
          <h1>1. Define a goal</h1>
          <input type="text" name="goal-name" />
        </div>
        <div class="form-section">
          <h1>2. Set the starting date</h1>
          <input type="date" name="goal-start-date" />
        </div>
        <div class="form-section">
          <h1>3. Set the ending date</h1>
          <input type="date" name="goal-end-date" />
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

@Component
export default class Home extends Vue {
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
