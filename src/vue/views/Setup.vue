<template>
  <div id="setup">
    <form @submit.prevent="initData" method="post">
      <div class="form-section">
        <label for="goal-name">
          <h1>1. Define a goal</h1>
        </label>
        <input
          type="text"
          name="goal-name"
          id="goal-name"
          placeholder="Define your goal here..."
        />
      </div>
      <div class="form-section">
        <label for="goal-start-date">
          <h1>2. Set the starting date</h1>
        </label>
        <input
          type="date"
          name="goal-start-date"
          id="goal-start-date"
          :value="today"
        />
      </div>
      <div class="form-section">
        <label for="goal-end-date">
          <h1>3. Set the ending date</h1>
        </label>
        <input
          type="date"
          name="goal-end-date"
          id="goal-end-date"
          :value="defaultEndDate"
          :min="today"
        />
      </div>
      <div class="form-section">
        <button type="submit">Get started!</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { SiteData } from '@/common/types';
import utils from '@/common/utils';
import { addDays, format } from 'date-fns';

@Component
export default class Setup extends Vue {
  today = format(new Date(), 'yyyy-MM-dd');
  defaultEndDate = format(addDays(new Date(this.today), 14), 'yyyy-MM-dd');

  /**
   * Create data via form submit event.
   */
  initData(e: Event) {
    const targ = e.target as HTMLFormElement;
    const data: SiteData = {
      goal: { name: '', startDate: '', endDate: '' },
      entries: {}
    };

    Array.from(targ.querySelectorAll('input[name]')).forEach(input => {
      const inp = input as HTMLInputElement;
      if (/name|title/i.test(inp.name) && inp.value === '') {
        inp.value = 'Think of a goal title';
      }
      if (/name|title/i.test(inp.name)) {
        data.goal.name = inp.value.trim();
      } else if (/start/i.test(inp.name)) {
        data.goal.startDate = inp.value.trim();
      } else if (/end/i.test(inp.name)) {
        data.goal.endDate = inp.value.trim();
      }
    });

    utils.saveDataToLS(data);
    this.$router.go(0);
  }
}
</script>

<style lang="scss" scoped>
#setup {
  form {
    .form-section {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-bottom: 10px;

      label {
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 10px 0px;
        margin-bottom: 10px;
        text-align: center;
        width: 100%;
      }

      input {
        font-size: 20px;
        padding: 10px;
        width: 100%;
      }

      button {
        background-color: lightgreen;
        border: 3px solid white;
        cursor: pointer;
        padding: 10px 20px;

        &:hover {
          background-color: #6fe96f;
        }

        &:active {
          background-color: #42d142;
          border-color: lightgreen;
        }
      }
    }
  }
}
</style>
