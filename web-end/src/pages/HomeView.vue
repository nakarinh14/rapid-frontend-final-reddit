<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <div class="inner-container fit row wrap justify-start items-start content-start" style="overflow: hidden">
        <div class="row content-center items-center title-bar">
          <q-icon name="bed" style="font-size: 2.5em; color: #FF6F00"></q-icon>
          <span class="text-grey-7 home-title">Home</span>
        </div>
        <post-preview
          class="post-preview"
          v-for="post in posts"
          :key="post.content"
          :group="post.group"
          :author="post.author"
          :title="post.title"
          :content="post.content"
          :karma="post.karma"
          :comment_freq="post.comment_freq"
          :bordered="true"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import PostPreview from 'components/PostPreview'

export default {
  name: 'HomeView',
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
          comment_freq: '1000'
        },
        2: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000'
        },
        3: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000'
        },
        4: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000'
        },
        5: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000'
        },
        6: {
          group: 'r/movie',
          author: 'some_crazy_guy',
          title: 'This is awesome post',
          content: 'This is a really awesome post',
          karma: '10',
          comment_freq: '1000'
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
  max-width: 725px;
  margin-top: 25px;
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
  margin-bottom: 10px;
}
</style>
