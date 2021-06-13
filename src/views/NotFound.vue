<template>
  <div class="notfound">
    <h1>404 Not Found</h1>
    <div class="notfound-content">
      <div>
        <router-link to="/games">Back to games</router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .notfound {
    font-family: Classic, sans-serif;
    letter-spacing: 2px;

    h1 {
      text-align: center;
      font-size: 3rem;
    }

    .notfound-content {
      max-width: 790px;
      margin: 0 auto;

      div {
        margin: 50px 0px;
        text-align: center;
      }
    }
  }
</style>
