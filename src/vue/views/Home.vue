<template>
  <div id="home">
    <div id="home-heading">
      <div id="home-heading-main-amend">
        <h1 @click="toggleHeadingView" v-if="showGoalName">
          Goal: {{ siteData.goal.name }}
        </h1>
        <input
          type="text"
          :value="siteData.goal.name"
          @keypress="toggleHeadingView"
          @blur="toggleHeadingView"
          v-else
        />
      </div>
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
import { SiteData } from '../../common/types';

@Component({
  components: {
    DayDisplay
  }
})
export default class Home extends Vue {
  showGoalName = true;
  daysBetween: Date[] = [];
  siteData = utils.loadDataFromLS();

  created() {
    if (this.siteData) {
      this.daysBetween = eachDayOfInterval({
        start: new Date(this.siteData.goal.startDate),
        end: new Date(this.siteData.goal.endDate)
      });
    }
  }

  /**
   * Toggle between 'main' or 'amend' view for page heading.
   */
  toggleHeadingView(e: Event) {
    if (e.type === 'keypress' && (e as KeyboardEvent).key !== 'Enter') {
      return;
    }

    this.showGoalName = !this.showGoalName;

    // Save new heading from input field
    if (e.type === 'keypress') {
      const targ = e.target as HTMLInputElement;
      const newSiteData = this.siteData as SiteData;
      newSiteData.goal.name = targ.value;
      utils.saveDataToLS(newSiteData);
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  #home-heading {
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;

    & > * {
      padding: 10px 5px;
    }

    #home-heading-main-amend {
      h1 {
        cursor: pointer;
      }
    }
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
