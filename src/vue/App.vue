<template>
  <div id="app">
    <header>
      <div id="site-title">{{ siteTitle }}</div>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <div id="site-credits-and-repo">
        <div id="site-credits">{{ siteTitle }} &copy; 2020</div>
        <div id="site-github-repo">
          <a href="https://github.com/geopic/visual-goals">GitHub repository</a>
        </div>
      </div>
      <button type="button" @click="deleteSiteData">Delete site data</button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import props from '@/common/props';
import utils from '@/common/utils';

@Component
export default class App extends Vue {
  siteTitle = props.site.name;

  deleteSiteData() {
    if (
      window.confirm('Are you sure you wish to delete all site data?') &&
      utils.loadDataFromLS()
    ) {
      utils.clearDataFromLS();
      this.$router.go(0);
    }
  }
}
</script>

<style lang="scss">
#app {
  align-items: start;
  display: grid;
  grid-template-rows: 50px auto 40px;
  height: 100vh;

  & > * {
    height: 100%;
  }

  header {
    align-items: center;
    background-color: $header-bg-color;
    display: flex;
    font-size: 24px;
    justify-content: space-around;

    #site-title {
      text-align: center;
    }

    @media all and (min-width: $medquery-min-width-01) {
      font-size: 26px;
    }

    @media all and (min-width: $medquery-min-width-02) {
      font-size: 28px;
    }

    @media all and (min-width: $medquery-min-width-03) {
      font-size: 30px;
    }
  }

  footer {
    align-items: stretch;
    display: flex;
    font-size: 14px;
    justify-content: space-between;

    #site-credits-and-repo {
      align-items: center;
      display: flex;
      flex: 0 1 70%;
      flex-direction: column;
      justify-content: center;
    }

    button {
      background-color: #ffc7c7;
      border: 3px solid white;
      cursor: pointer;
      flex: 0 1 30%;
      height: 100%;

      &:hover {
        background-color: #f5adad;
      }

      &:active {
        background-color: #f59c9c;
        border-color: lightpink;
      }
    }

    @media all and (min-width: $medquery-min-width-01) {
      font-size: 16px;

      #site-credits-and-repo {
        flex-direction: row;
        justify-content: space-evenly;
      }
    }

    @media all and (min-width: $medquery-min-width-02) {
      font-size: 18px;
    }

    @media all and (min-width: $medquery-min-width-04) {
      #site-credits-and-repo {
        flex: 0 1 80%;
      }

      button {
        flex: 0 1 20%;
      }
    }
  }

  @media all and (min-width: $medquery-min-width-01) {
    grid-template-rows: 55px auto 40px;
  }

  @media all and (min-width: $medquery-min-width-02) {
    grid-template-rows: 60px auto 40px;
  }

  @media all and (min-width: $medquery-min-width-03) {
    grid-template-rows: 70px auto 40px;
  }

  @media all and (min-width: $medquery-min-width-04) {
    margin: 0px auto;
    width: $medquery-min-width-04;
  }
}
</style>
