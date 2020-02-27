<template>
  <div class="day-display" @click="toggleDayView">
    <div class="day-display-main">
      <h1>{{ formattedDate }}</h1>
    </div>
    <div class="day-display-options" style="display: none;">
      <h1>[Here be options]</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';

@Component
export default class DayDisplay extends Vue {
  @Prop() date!: Date;

  formattedDate = format(this.date, 'iii. do LLL yyyy');

  /**
   * Toggle between 'main' or 'options' view for component on click.
   */
  toggleDayView() {
    const el = this.$el as HTMLElement;

    for (const child of Array.from(el.children)) {
      if (child.hasAttribute('style')) {
        child.removeAttribute('style');
      } else {
        child.setAttribute('style', 'display: none;');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.day-display {
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex: 0 0 25%;
  text-align: center;
  user-select: none;

  & > * {
    padding: 10px 5px;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.12);
    color: #eee;
    transition: background-color 50ms;
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }

  .day-display-main,
  .day-display-options {
    h1 {
      font-size: 18px;
    }

    @media all and (min-width: $medquery-min-width-01) {
      h1 {
        font-size: 20px;
      }
    }

    @media all and (min-width: $medquery-min-width-02) {
      h1 {
        font-size: 22px;
      }
    }

    @media all and (min-width: $medquery-min-width-03) {
      h1 {
        font-size: 24px;
      }
    }
  }
}
</style>
