<template>
  <div id="home">
    <div id="home-heading">
      <h1>Goal: {{ siteData['goal-name'] }}</h1>
    </div>
    <div id="home-day-display">
      <DayDisplay
        v-for="day of daysBetween"
        :key="daysBetween.indexOf(day)"
        :date="day"
      />
    </div>
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
  #home-heading {
    background-color: limegreen;
    padding: 10px 5px;
    text-align: center;
  }

  #home-day-display {
    background-color: #4e6d4e;
    border: 1px dotted white;
    border-bottom: 0px;
    border-top: 0px;
    color: #eaeaea;
    height: 420px;
    margin: 0px auto;
    overflow-y: scroll;
    padding: 10px 5px;
    width: 80%;
  }
}
</style>
