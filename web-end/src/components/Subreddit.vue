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
      <div class="inner-container fit row wrap justify-start items-start content-start">
        <div class="col">
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
      </div>
    </div>
  </q-page>
</template>

<script>
import PostPreview from 'components/PostPreview'
import * as PostService from 'src/services/PostService'
import { getRefForSubreddit } from '../services/SubredditService'

export default {
  name: 'Subreddit.vue',
  components: { PostPreview },
  data: function () {
    return {
      posts: {},
      postRef: null,
      subreadit: {}
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
</style>
