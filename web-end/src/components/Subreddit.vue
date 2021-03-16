<template>
  <!--  <q-toolbar class="bg-orange-8 text-white">-->
  <!--    <q-avatar @click="linkToHome" class="cursor-pointer">-->
  <!--      <img src="https://www.vectorico.com/download/social_media/Reddit-Icon.png" />-->
  <!--    </q-avatar>-->

  <!--    <q-toolbar-title @click="linkToHome" class="cursor-pointer">-->
  <!--      Reddit-->
  <!--    </q-toolbar-title>-->

  <!--    <q-input @keydown.enter.prevent="submitSearch" class="q-ml-xl" style="width: 400px" dark clearable outlined dense standout v-model="searchText" label="Search" :maxlength="searchTermMaxLen" />-->
  <!--    <q-space />-->
  <!--  </q-toolbar>-->

  <q-list dark bordered separator class="bg-grey-10 rounded-borders">
    <q-infinite-scroll @load="loadMoreArticles" :offset="250" ref="infiniteScroll">
      <ArticleEntry
        v-for="article in articles"
        :key="article.articleID"
        :article="article"
        @click.native="articleClicked(article)"
      />
    </q-infinite-scroll>

    <!-- Error Indicator -->
    <q-banner v-if="errOccurred" class="text-white bg-red">
      Error fetching the article list, please try again.
    </q-banner>

    <!-- Empty Indicator -->
    <q-item v-if="!loading && articles.length == 0 && !errOccurred" class="column">
      <div class="q-ma-lg">
        <div class="text-h3 q-mb-md">Wow, such empty!</div>
        <div class="text-h6">{{emptyText}}</div>
      </div>
    </q-item>
  </q-list>

</template>

<script>
export default {
name: "Subreddit.vue"
}
</script>

<style scoped>

</style>
