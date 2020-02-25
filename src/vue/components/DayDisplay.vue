<template>
  <div class="day-display">
    <h1>{{ formattedDate }}</h1>
    <div class="day-display-btns">
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
  text-align: center;

  .day-display-btns {
    align-items: center;
    display: flex;
    justify-content: space-evenly;
    padding: 10px 5px;
  }
}
</style>
