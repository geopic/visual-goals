<template>
  <div id="home">
    <div id="home-heading">
      <div id="home-heading-main-amend" ref="heading">
        <h1 ref="goal-heading" @click="toggleHeadingView">Goal: {{ siteData.goal.name }}</h1>
        <input
          type="text"
          class="no-display"
          ref="goalInput"
          :value="siteData.goal.name"
          @keypress="toggleHeadingView"
          @blur="toggleHeadingView"
        />
      </div>
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
import { SiteData } from '../../common/types';

@Component({
  components: {
    DayDisplay
  }
})
export default class Home extends Vue {
  daysBetween: Date[] = [];
  siteData = utils.loadDataFromLS();
  editingHeader = false;

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
    // Only accept 'submit' action via enter key
    if (e.type === 'keypress' && (e as KeyboardEvent).key !== 'Enter') {
      return;
    }

    // Avoid losing focus when the user clicks out of the input field w/out 'submit' action
    if (e.type === 'blur' && !this.editingHeader) {
      return;
    }

    this.editingHeader = true;

    Array.from((this.$refs.heading as HTMLElement).children).forEach(child =>
      child.classList.toggle('no-display')
    );

    const targInput = this.$refs.goalInput as HTMLInputElement;

    if (e.type === 'click') {
      // Focus on input field when it is made visible
      targInput.focus();
      targInput.select();
    } else if (e.type === 'keypress') {
      // Save new heading from input field
      const newSiteData = this.siteData as SiteData;
      newSiteData.goal.name = targInput.value;
      utils.saveDataToLS(newSiteData);

      this.editingHeader = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.no-display {
  display: none;
}

#home {
  #home-heading {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    height: 50px;
    justify-content: center;

    #home-heading-main-amend {
      height: 100%;

      h1 {
        cursor: pointer;
        padding: 10px 20px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      input {
        font-size: 20px;
        height: 100%;
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
