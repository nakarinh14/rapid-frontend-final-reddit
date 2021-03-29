<template>
  <div>
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
      :time_from_now="post.created"
      :bordered="true"
      :id="idx"
    />
  </div>
</template>

<script>
import PostPreview from 'components/PostPreview'

export default {
  name: 'UserPosts',
  components: { PostPreview },
  props: ['posts']
}
</script>

<style scoped>
.post-preview {
  margin-bottom: 12px;
}
</style>
