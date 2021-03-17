<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <div class="inner-container">
        <post-preview
          :group="post.group"
          :author="post.author"
          :title="post.title"
          :content="post.content"
          :karma="post.karma"
          :comment_freq="post.comment_freq"
          :time_from_now="post.timestamp.toRelative()"
        />
        <q-separator />
        <div class="comment-section">
          <recursive-nested-collapse
            v-for="comment in comments"
            :key="comment.id"
            :author="comment.author"
            :content="comment.content"
            :karma="comment.karma"
            :time_from_now="comment.timestamp.toRelative()"
            :data="comment.comments"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
// Use $route or something to retrieve the id for url param here
import RecursiveNestedCollapse from 'components/RecursiveNestedCollapse'
import PostPreview from 'components/PostPreview'
import { DateTime } from 'luxon'

export default {
  name: 'PostView',
  components: { RecursiveNestedCollapse, PostPreview },
  data: function () {
    return {
      post: {
        group: 'r/movie',
        author: 'some_crazy_guy',
        title: 'This is awesome post',
        content: 'This is a really awesome post',
        karma: '10',
        comment_freq: '1000',
        timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day')
      },
      comments: {
        1: {
          author: 'some guy 1',
          content: 'This is a great way of dealing this',
          karma: 11,
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day'),
          comments: {
            3: {
              author: 'some guy 2',
              content: 'This is a great way of dealing this',
              like: 12,
              timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day'),
              comments: {
                3: {
                  author: 'some guy 2',
                  content: 'This is a great way of dealing this',
                  timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day'),
                  karma: 12
                }
              }
            },
            4: {
              author: 'some guy 2',
              content: 'This is a great way of dealing this',
              timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day'),
              karma: 12
            }
          }
        },
        2: {
          author: 'some guy 3',
          content: 'This is a great way of dealing this',
          karma: 13,
          timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day'),
          comments: {
            4: {
              author: 'some guy 4',
              content: 'This is a great way of dealing this',
              timestamp: DateTime.now().minus({ weeks: 1 }).endOf('day'),
              karma: 14
            }
          }
        }
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
