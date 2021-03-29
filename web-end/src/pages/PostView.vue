<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <div class="inner-container">
        <post-preview
          :author="post.user.displayName"
          :group="post.subreadit"
          :title="post.title"
          :content="post.caption"
          :karma="post.karma"
          :comment_freq="post.comments_freq"
          :time_from_now="post.created"
        />
        <q-separator />
        <div class="comment-section">
          <recursive-nested-collapse
            v-for="comment in comments"
            :key="comment.id"
            :author="comment.comment.user.displayName"
            :content="comment.comment.body"
            :karma="comment.comment.upvotes"
            :time_from_now="comment.comment.timestamp"
            :data="comment.comments"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import RecursiveNestedCollapse from 'components/RecursiveNestedCollapse'
import PostPreview from 'components/PostPreview'
import { getCommentsForPost } from '../services/CommentService'
import { getPostById } from 'src/services/PostService'

export default {
  name: 'PostView',
  components: { RecursiveNestedCollapse, PostPreview },
  data: function () {
    return {
      post: {},
      comments: {}
    }
  },
  created () {
    this.refreshPost()
  },
  computed: {
    currentPostId () {
      return this.$route.params.id
    }
  },
  methods: {
    async fetchPost () {
      try {
        const result = await getPostById(this.currentPostId).get()
        const fetchedPost = result.val()
        fetchedPost.id = this.currentPostId
        this.post = fetchedPost
      } catch (err) {
        console.log(err)
      }
    },
    async fetchComments () {
      try {
        this.comments = await getCommentsForPost(this.currentPostId).get()
      } catch (err) {
        console.log(err)
      }
    },
    refreshPost () {
      return Promise.all([
        this.fetchPost(),
        this.fetchComments()
      ])
    }
  }
}
</script>

<style scoped>
.comment-section {
  margin-top: 20px;
  width: 100%;
}
.inner-container {
  background-color: #ffffff;
  width: 100%;
  max-width: 1000px;
}
.container{
  background-color: #fafafa;
  margin-top: 30px
}
</style>
