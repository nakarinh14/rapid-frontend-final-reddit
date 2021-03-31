<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <div class="row content-center items-center title-bar">
        <q-icon name="bed" style="font-size: 2.5em; color: #FF6F00"></q-icon>
        <span class="text-grey-7 home-title">Home</span>
      </div>
      <div class="inner-container fit row wrap justify-center items-start content-start" style="max-width: 900px;">
        <div class="col">
          <post-preview
            class="post-preview"
            v-for="(post, idx) in posts"
            :key="idx"
            :author="post.user.displayName"
            :group="post.subreadit"
            :title="post.title"
            :content="post.caption"
            :karma="post.karma"
            :comment_freq="post.comments_freq"
            :user-votes="post.user_upvotes"
            :time_from_now="post.created"
            :bordered="true"
            :id="idx"
          />
          <div v-if="loading">
            <post-placeholder
              style="margin-bottom: 15px"
              v-for="n in 6"
              :key="n"
            />
          </div>
        </div>
        <div class="col-4 suggestion">
          <SubredditSuggestions/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PostPreview from 'components/PostPreview'
import SubredditSuggestions from 'components/SubredditSuggestions'
import * as PostService from '../services/PostService'
import PostPlaceholder from 'components/PostPlaceholder'

export default {
  name: 'HomeView',
  components: { PostPlaceholder, SubredditSuggestions, PostPreview },
  data () {
    return {
      posts: [],
      postRef: null,
      loading: true
    }
  },
  created () {
    this.postRef = PostService.getRefForPosts()
    this.postRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        this.loading = false
        this.posts = snapshot.val()
      }
    })
  }
  // beforeDestroy () {
  //   if (this.postRef) {
  //     this.postRef.off()
  //   }
  // }
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
  font-size: 32px;
  margin-left: 10px
}
.title-bar {
  margin: 10px;
}
.suggestion {
  margin-left: 30px;
}
</style>
