<template>
  <div id="home">
    <template>
      <section>
        <h1>Goal: {{ siteData['goal-name'] }}</h1>
        <DayDisplay
          v-for="day of daysBetween"
          :key="daysBetween.indexOf(day)"
          :date="day"
        />
      </section>
      <h1>Start date: {{ siteData['goal-start-date'] }}</h1>
      <h2>End date: {{ siteData['goal-end-date'] }}</h2>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import utils from '@/common/utils';
import DayDisplay from '@/vue/components/DayDisplay.vue';
import { eachDayOfInterval } from 'date-fns';

@Component({
  components: {
    DayDisplay
  }
})
export default class Home extends Vue {
  daysBetween: Date[] = [];
  siteData = utils.loadDataFromLS();

  created() {
    if (this.siteData) {
      this.daysBetween = eachDayOfInterval({
        start: new Date(this.siteData['goal-start-date']),
        end: new Date(this.siteData['goal-end-date'])
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
}
</style>
