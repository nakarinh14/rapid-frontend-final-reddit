<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <q-card flat class="subredditCard transparent" style="margin-top: 20px">
        <div>
          <q-item>
            <q-item-section avatar>
              <q-icon name="explore" style="font-size: 3.5em; color: #FF6F00"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                <span class="text-grey-7 home-title">{{ subreaditName }} Community</span>
              </q-item-label>
              <q-item-label caption>
                <span class="text-grey-7 title-caption"> {{ subreadit.description }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-card>
      <div class="inner-container fit row wrap justify-center items-start content-start"  style="max-width: 900px;">
        <div class="col">
          <div v-if="user" >
            <q-card flat class="my-card">
              <q-card-section>
                <div class="row">
                  <span class="text-grey-7" style="font-weight: 600">Create a new post.</span>
                  <q-space />
                  <q-btn flat text-color="primary" label="Post" />
                </div>
                <q-input v-model.trim="newPostTitle" label="Title"/>
                <q-input autogrow v-model.trim="newPostBody" label="Body Content"/>
              </q-card-section>
            </q-card>
          </div>
          <post-preview
            class="post-preview text-left"
            v-for="(post, idx) in posts"
            :key="idx"
            :author="post.user.displayName"
            :group="post.subreadit"
            :title="post.title"
            :content="post.caption"
            :karma="post.karma"
            :comment_freq="post.comments_freq"
            :time_from_now="post.created"
            :bordered="true"
            :id="idx"
          />
        </div>
        <div class="col-4 suggestion">
          <SubredditBlockInfo :subreadit="subreadit"/>
          <div style="margin-top: 30px">
<!--            Switching subreddit in subredditview got some trouble, will fix later-->
            <SubredditSuggestions/>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PostPreview from 'components/PostPreview'
import * as PostService from 'src/services/PostService'
import { getRefForSubreddit } from '../services/SubredditService'
import SubredditBlockInfo from 'components/SubredditBlockInfo'
import SubredditSuggestions from 'components/SubredditSuggestions'

export default {
  name: 'Subreddit.vue',
  components: { SubredditBlockInfo, PostPreview, SubredditSuggestions },
  data: function () {
    return {
      posts: {},
      postRef: null,
      subreadit: {},
      newPostTitle: '',
      newPostBody: ''
    }
  },
  created () {
    Promise.all([this.fetchSubreaditPosts(), this.fetchSubreaditInfo()])
      .catch((err) => { console.log(err) })
  },
  methods: {
    async fetchSubreaditPosts () {
      const snapshot = await PostService.getRefForPosts().get()
      if (snapshot.exists()) {
        const data = snapshot.val()
        this.posts = Object.keys(data)
          .filter(key => data[key].subreadit === this.subreaditName)
          .sort((a, b) => {
            if (data[a].created > data[b].created) return -1
            else if (data[a].created < data[b].created) return 1
            return 0
          })
          .reduce((obj, key) => {
            obj[key] = data[key]
            obj[key].id = key
            return obj
          }, {})
      }
    },
    async fetchSubreaditInfo () {
      const subreaditInfo = await getRefForSubreddit(this.subreaditName).get()
      if (subreaditInfo.exists()) {
        this.subreadit = subreaditInfo.val()
        console.log(this.subreadit)
      }
    }
  },
  computed: {
    subreaditName () {
      return this.$route.params.name
    },
    user () {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style scoped>
.inner-container {
  background-color: #fafafa;
  width: 100%;
  max-width: 1000px;
}
.container{
  background-color: #fafafa;
}
.post-preview {
  margin-bottom: 12px;
}
.home-title {
  font-weight: 600;
  font-size: 29px;
}
.title-caption{
  font-size: 19px;
}
.my-card {
  width: 100%;
  max-width: 725px
}
.suggestion {
  margin-left: 30px;
}
</style>
