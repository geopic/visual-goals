<template>
  <div class="day-display">
    <h1>{{ formattedDate }}</h1>
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

<style lang="scss" scoped></style>
