<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <div class="inner-container">
        <div class="row content-center items-center title-bar">
          <q-icon name="account_circle" style="font-size: 2.5em; color: #FF6F00"></q-icon>
          <span class="text-grey-7 user-title">{{ currentUsername }}</span>
        </div>
        <q-tabs
          v-model="tab"
          align="left"
          inline-label
          indicator-color="orange"
          class="bg-blue-6 text-white shadow-2"
        >
          <q-tab name="posts" icon="mail" label="Posts" />
          <q-tab name="comments" icon="comment" label="Comments" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          keep-alive
        >
<!--      // Might need to find a way to lazy load with q-tab-panel for performance -->
          <q-tab-panel name="posts">
            <user-posts :posts="userPosts"/>
            <div v-if="loading">
              <post-placeholder
                style="margin-bottom: 15px"
                v-for="n in 4"
                :key="n"
              />
            </div>
          </q-tab-panel>
          <q-tab-panel name="comments">
            <user-comments :comments="userComments" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserPosts from 'components/UserPosts.vue'
import UserComments from 'components/UserComments'
import { getCommentsForUser } from 'src/services/CommentService'
import * as PostService from 'src/services/PostService'
import PostPlaceholder from 'components/PostPlaceholder'
export default {
  name: 'UserProfile',
  components: { PostPlaceholder, UserComments, UserPosts },
  data: function () {
    return {
      tab: 'posts',
      userComments: {},
      userPosts: {},
      loading: true
    }
  },
  created () {
    Promise.all([this.fetchUserComments(), this.fetchUserPosts()])
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    async fetchUserComments () {
      try {
        this.userComments = await getCommentsForUser(this.currentUsername).get()
      } catch (err) {
        console.log(err)
      }
    },
    async fetchUserPosts () {
      const snapshot = await PostService.getRefForPosts().get()
      if (snapshot.exists()) {
        const data = snapshot.val()
        this.userPosts = Object.keys(data)
          .filter(key => data[key].user.displayName === this.currentUsername)
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
    }
  },
  computed: {
    currentUsername () {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.inner-container {
  background-color: #fafafa;
  width: 100%;
  max-width: 725px;
  margin-top: 25px;
}
.container{
  background-color: #fafafa;
}
.user-title {
  font-weight: 600;
  font-size: 22px;
  margin-left: 10px
}
.title-bar {
  margin-bottom: 10px;
}
</style>
