<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <div class="row content-center items-center title-bar">
        <q-icon name="bed" style="font-size: 2.5em; color: #FF6F00"></q-icon>
        <span class="text-grey-7 home-title">Home</span>
      </div>
      <div class="inner-container fit row wrap justify-start items-start content-start">
        <div class="col">
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
            :id="idx"
          />
        </div>
        <div class="col-3 suggestion">
          <SubredditSuggestions/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import PostPreview from 'components/PostPreview'
import { DateTime } from 'luxon'
import SubredditSuggestions from 'components/SubredditSuggestions'

export default {
  name: 'HomeView',
  components: { SubredditSuggestions, PostPreview },
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
