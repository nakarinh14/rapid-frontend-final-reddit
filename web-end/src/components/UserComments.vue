<template>
  <div>
    <comment-preview
      class="comment-preview"
      v-for="(comment, idx) in comments"
      :key="idx"
      :group="comment.group"
      :author="comment.author"
      :title="comment.title"
      :content="comment.content"
      :karma="comment.karma"
      :comment_freq="comment.comment_freq"
      :time_from_now="comment.timestamp.toRelative()"
      :bordered="true"
    />
  </div>
</template>

<script>
import CommentPreview from 'components/CommentPreview'
import { DateTime } from 'luxon'
// Trigger a fetch API here once mounted, with input of user's uid
export default {
  name: 'UserComments',
  components: { CommentPreview },
  data: function () {
    return {
      comments: {
        1: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome comment',
          content: 'This is a really awesome comment',
          karma: '10',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        },
        2: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome comment',
          content: 'This is a really awesome comment',
          karma: '10',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        },
        3: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome comment',
          content: 'This is a really awesome comment',
          karma: '10',
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
        }
      }
    }
  }
}
</script>

<style scoped>
.comment-preview {
  margin-bottom: 12px;
}
</style>
