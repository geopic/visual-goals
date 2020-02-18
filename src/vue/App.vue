<template>
  <div id="app">
    <header>
      <div id="site-title">{{ siteTitle }}</div>
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <div id="site-credits">{{ siteTitle }} &copy; 2020</div>
      <div id="site-github-repo">
        <a href="https://github.com/geopic/visual-goals">GitHub repository</a>
      </div>
      <button type="button" @click="deleteSiteData">Delete site data</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '@/common/props';

@Component
export default class App extends Vue {
  siteTitle = props.site.name;

  deleteSiteData() {
    if (window.confirm('Are you sure you wish to delete all site data?')) {
      this.$store.commit('deleteData');
    }
  }
}
</script>

<style lang="scss"></style>
