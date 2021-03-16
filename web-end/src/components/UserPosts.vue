<template>
  <div>
    <post-preview
      class="post-preview"
      v-for="(post, idx) in posts"
      :key="idx"
      :group="post.group"
      :author="post.author"
      :title="post.title"
      :content="post.content"
      :karma="post.karma"
      :comment_freq="post.comment_freq"
      :time_from_now="post.timestamp.toRelative()"
      :bordered="true"
    />
  </div>
</template>

<script>
import PostPreview from 'components/PostPreview'
import { DateTime } from 'luxon'

// Trigger a fetch API here once mounted, with input of user's uid
export default {
  name: 'UserPosts',
  components: { PostPreview },
  data: function () {
    return {
      posts: {
        1: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        },
        2: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        },
        3: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        },
        4: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        },
        5: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        },
        6: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        }
      }
    }
  }
}
</script>

<style scoped>
.post-preview {
  margin-bottom: 12px;
}
</style>
