<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <unauthorize-modal
        :prompt="unAuthModalVisible"
        :toggle-modal="() => {this.unAuthModalVisible = !this.unAuthModalVisible}"
      />
      <comment-reply-modal
        :prompt="commentModalVisible"
        :post-id="post.id"
        :post-title="post.title"
        :subreadit="post.subreadit"
        :comment-path="commentPath"
        :toggle-modal="toggleCommentModal"
        :on-create="refreshPost"
      />
      <div class="inner-container">
        <post-preview
          :id="post.id"
          :author="post.user.displayName"
          :group="post.subreadit"
          :title="post.title"
          :content="post.caption"
          :karma="post.karma"
          :comment_freq="post.comments_freq"
          :time_from_now="post.created"
          :subreadit="post.subreadit"
          :user-votes="post.user_upvotes"
          :on-create-comment="refreshPost"
        />
        <q-separator />
        <div class="comment-section">
          <recursive-nested-collapse
            v-for="comment in comments"
            :key="comment.id"
            :id="comment.id"
            :author="comment.comment.user.displayName"
            :content="comment.comment.body"
            :karma="comment.comment.upvotes"
            :time_from_now="comment.comment.timestamp"
            :data="comment.comments"
            :user-upvotes="comment.comment.user_upvotes"
            :path="`${comment.id}`"
            :reply_onclick="toggleCommentModal"
            :on-update="refreshPost"
          />
          <div v-if="loading">
            <comment-placeholder
              style="margin-bottom: 8px"
              v-for="n in 6"
              :key="n"
            />
          </div>
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
import CommentPlaceholder from 'components/CommentPlaceholder'
import CommentReplyModal from 'components/CommentReplyModal'
import UnauthorizeModal from 'components/UnauthorizeModal'

export default {
  name: 'PostView',
  components: { UnauthorizeModal, CommentReplyModal, CommentPlaceholder, RecursiveNestedCollapse, PostPreview },
  data: function () {
    return {
      post: {},
      comments: {},
      loading: true,
      commentModalVisible: false,
      commentPath: '',
      unAuthModalVisible: false
    }
  },
  mounted () {
    this.refreshPost()
    this.addPostListener()
  },
  computed: {
    currentPostId () {
      return this.$route.params.id
    },
    user () {
      return this.$store.getters['auth/getUser']
    }
  },
  methods: {
    addPostListener () {
      try {
        getPostById(this.currentPostId).on('value', result => {
          const fetchedPost = result.val()
          fetchedPost.id = this.currentPostId
          this.post = fetchedPost
        })
      } catch (err) {
        console.error(err)
      }
    },
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
      ]).finally(() => { this.loading = false })
    },
    toggleCommentModal (visible, commentPath = '') {
      if (this.user) {
        this.commentPath = commentPath
        this.commentModalVisible = visible == null ? !this.commentModalVisible : visible
      } else {
        this.unAuthModalVisible = true
      }
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
