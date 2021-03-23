<template>
  <q-page>
    <!--    Header-->
    <div class="text-h6 text-black q-mt-md q-ml-lg">
      Welcome to <span class="text-blue">r/Test</span>!
    </div>

    <!--    Sort/CreatePost Bar-->
    <div style="width: 40%" class="q-pt-md q-pl-md q-pr-md text-black">
      <q-list dark bordered class="bg-grey-6 rounded-borders" >
        <q-item class="q-mt-sm q-mb-sm" >
          <div class="q-gutter-sm ">
            <q-radio dark v-model="sortBy" val="hot" label="Hot" />
            <q-radio dark v-model="sortBy" val="new" label="New" />
            <q-radio dark v-model="sortBy" val="old" label="Old" />
          </div>
          <template >
            <q-input @click="createPost('text')" class="col q-ml-lg q-mr-sm" dark clearable outlined dense standout label="Create Post" />
            <q-btn @click="createPost('image')" flat round color="grey" icon="insert_photo">
              <q-tooltip>Create Image Post</q-tooltip>
            </q-btn>
            <q-btn @click="createPost('link')" flat round color="grey" icon="insert_link">
              <q-tooltip>Create Link Post</q-tooltip>
            </q-btn>
          </template>
        </q-item>
      </q-list>
    </div>
    <!--    List of articles-->
    <div class="row items-start justify-start" align="center">
      <div class="col">
        <post-preview
          class="post-preview text-left"
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
    </div>
  </q-page>
</template>

<script>
import { DateTime } from 'luxon'
import PostPreview from 'components/PostPreview'

export default {
  name: 'Subreddit.vue',
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

</style>
