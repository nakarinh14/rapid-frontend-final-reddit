<template>
  <div>
<!--    Header-->
    <q-toolbar class="bg-orange-8 text-white">
      <q-avatar @click="linkToHome" class="cursor-pointer">
        <img src="https://www.vectorico.com/download/social_media/Reddit-Icon.png" />
      </q-avatar>

      <q-toolbar-title @click="linkToHome" class="cursor-pointer">
        Reddit
      </q-toolbar-title>

      <q-input @keydown.enter.prevent="submitSearch" class="q-ml-xl" style="width: 400px" dark clearable outlined dense standout v-model="searchText" label="Search" :maxlength="searchTermMaxLen" />
      <q-space />
    </q-toolbar>
    <div class="text-h6 text-black q-mt-md q-ml-lg">
      Welcome to <span class="text-blue">r/Test</span>!
  </div>

<!--    Sort/CreatePost Bar-->
    <div class="q-pt-md q-pl-md q-pr-md text-black">
      <q-list dark bordered class="bg-grey-5 rounded-borders">
        <q-item class="q-mt-sm q-mb-sm">
          <div class="q-gutter-sm">
            <q-radio dark v-model="sortBy" val="hot" label="Hot" />
            <q-radio dark v-model="sortBy" val="new" label="New" />
            <q-radio dark v-model="sortBy" val="old" label="Old" />
          </div>
          <template >
            <q-input @click="createPost('text')" class="col q-ml-lg q-mr-sm" dark clearable outlined dense standout label="Create Post" />
            <q-btn @click="createPost('image')" flat round color="grey" icon="insert_photo">
              <q-tooltip>Create Image Post</q-tooltip>
            </q-btn>
            <q-btn @click="createPost('link')" flat round color="grey" icon="insert_link">
              <q-tooltip>Create Link Post</q-tooltip>
            </q-btn>
          </template>
        </q-item>
      </q-list>
    </div>

    <!--    List of articles-->
    <q-list bordered separator class="bg-grey-3 rounded-borders">
      <q-infinite-scroll @load="loadMoreArticles" :offset="250" ref="infiniteScroll">
        <q-item v-for="article in articles" :key="article.articleID" class="column" clickable>
          <div class="row">
            <!-- Article Title and info -->
            <q-item-section class="col">
              <q-item-label lines="1">
                <span class="text-h6 text-black">{{article.title}}</span>
              </q-item-label>
              <q-item-label lines="1" class="text-grey">
                <router-link @click.native.stop :to="'/r/' + article.subreddit">
                  r/{{article.subreddit}}
                </router-link>
                <span>．Posted by </span>
                <router-link @click.native.stop :to="'/u/' + article.postedBy">
                  u/{{article.postedBy}}
                </router-link>
                <span> on {{article.postedTime | formatDate}}</span>
              </q-item-label>

              <!--        Comment and Share button-->
              <q-item-label lines="1" class="text-grey text-weight-bold">
                <q-btn class="q-ml-sm" dense flat size="xs" icon="chat_bubble" :label="'' + article.comments + ' Comments'" />
                <q-btn @click.stop="shareClicked" class="q-ml-sm" dense flat size="xs" icon="share" label="Share" />
              </q-item-label>

              <q-space/>
            </q-item-section>
          </div>
        </q-item>
      </q-infinite-scroll>
    </q-list>
  </div>
</template>

<script>
// import ArticleEntry from 'components/Article/ArticleEntry'

const articles = [
  {
    articleID: 1,
    title: 'This is a test',
    subreddit: 'thisisasubreddit',
    postedBy: 'theguy',
    postedTime: '2021-03-16 9:44:23 am',
    comments: 56
  },
  {
    articleID: 2,
    title: 'This is a test',
    subreddit: 'thisisasubreddit',
    postedBy: 'theguy',
    postedTime: '2021-03-16 9:44:23 am',
    comments: 56
  },
  {
    articleID: 2,
    title: 'This is a test',
    subreddit: 'thisisasubreddit',
    postedBy: 'theguy',
    postedTime: '2021-03-16 9:44:23 am',
    comments: 56
  },
  {
    articleID: 3,
    title: 'This is a test',
    subreddit: 'thisisasubreddit',
    postedBy: 'theguy',
    postedTime: '2021-03-16 9:44:23 am',
    comments: 56
  },
  {
    articleID: 4,
    title: 'This is a test',
    subreddit: 'thisisasubreddit',
    postedBy: 'theguy',
    postedTime: '2021-03-16 9:44:23 am',
    comments: 56
  },
  {
    articleID: 5,
    title: 'This is a test',
    subreddit: 'thisisasubreddit',
    postedBy: 'theguy',
    postedTime: '2021-03-16 9:44:23 am',
    comments: 56
  }]
export default {
  name: 'MainLayout',
  // components: { ArticleEntry },
  data () {
    return {
      articles,
      leftDrawerOpen: false
    }
  }
  // props: {
  //   articles
  // }
}
</script>
