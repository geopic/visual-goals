<template>
  <div class="day-display">
    <h1>{{ formattedDate }}</h1>
    <div class="day-display-btns" style="display: none;">
      <button type="button" id="good-btn">Good</button>
      <button type="button" id="bad-btn">Bad</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { format } from 'date-fns';

@Component
export default class DayDisplay extends Vue {
  @Prop() date!: string;

  formattedDate = format(new Date(this.date), 'iii. do LLL yyyy');
}
</script>

<style lang="scss" scoped>
.day-display {
  border: 1px solid rgba(0, 0, 0, 0.1);
  flex: 0 0 20%;
  padding: 10px 5px;
  text-align: center;
  user-select: none;

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.4);
    color: #eee;
    cursor: pointer;
    transition: color 200ms;
  }

  h1 {
    font-size: 14px;
  }

  .day-display-btns {
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    padding: 10px 5px;
  }

  @media all and (min-width: $medquery-min-width-01) {
    h1 {
      font-size: 16px;
    }
  }

  @media all and (min-width: $medquery-min-width-02) {
    h1 {
      font-size: 18px;
    }
  }

  @media all and (min-width: $medquery-min-width-03) {
    h1 {
      font-size: 20px;
    }
  }
}
</style>
