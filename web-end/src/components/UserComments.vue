<template>
  <div>
    <comment-preview
      class="comment-preview"
      v-for="(comment, idx) in comments"
      :key="idx"
      :group="comment.post_subreadit"
      :author="comment.user.displayName"
      :title="comment.post_title"
      :content="comment.body"
      :karma="comment.upvotes"
      :time_from_now="comment.timestamp"
      :bordered="true"
    />
  </div>
</template>

<script>
import CommentPreview from 'components/CommentPreview'
// Trigger a fetch API here once mounted, with input of user's uid
export default {
  name: 'UserComments',
  components: { CommentPreview },
  props: ['comments']
}
</script>

<style scoped>
.comment-preview {
  margin-bottom: 12px;
}
</style>
