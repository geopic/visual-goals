<template>
  <div id="home">
    <div id="home-heading">
      <button id="home-heading-icon" title="Edit title">📝</button>
      <div id="home-heading-main-amend" ref="heading">
        <h1
          ref="goal-heading"
          class="yes-display"
          @click="toggleHeadingView"
        >{{ siteData.goal.name }}</h1>
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

    Array.from((this.$refs.heading as HTMLElement).children).forEach(child => {
      child.classList.toggle('no-display');
      child.classList.toggle('yes-display');
    });

    const targInput = this.$refs.goalInput as HTMLInputElement;

    if (e.type === 'click') {
      // Focus on input field when it is made visible
      targInput.focus();
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

.yes-display {
  @include flex-center;
}

#home {
  #home-heading {
    @include flex-center;
    height: 50px;

    #home-heading-icon {
      @include flex-center;
      background-color: $header-bg-color;
      border: 3px solid transparent;
      cursor: pointer;
      font-size: 26px;
      height: 100%;
      padding: 0px 10px;
      user-select: none;
    }

    #home-heading-main-amend {
      height: 100%;
      text-align: center;
      width: 100%;

      h1 {
        cursor: pointer;
        height: 100%;
        padding: 10px 20px;

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
      }

      input {
        font-size: 20px;
        height: 100%;
        width: 96%;
      }
    }
  }

  #home-day-display {
    margin: 0px auto;
  }

  @media all and (min-width: $medquery-min-width-01) {
    #home-day-display {
      @include flex-center;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
    }
  }
}
</style>
