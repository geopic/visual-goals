<template>
  <div id="home">
    <div id="home-heading">
      <h1>Goal: {{ siteData['goal-name'] }}</h1>
    </div>
    <div id="home-day-display">
      <DayDisplay v-for="day of daysBetween" :key="daysBetween.indexOf(day)" :date="day" />
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
    align-items: stretch;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0px auto;
  }

  @media all and (min-width: $medquery-min-width-03) {
    #home-day-display {
      flex-direction: row;
    }
  }
}
</style>
