<template>
  <div class="container column items-start justify-start content-center">
    <div class="inner-container">
      <PostPreview
        :group="post.group"
        :author="post.author"
        :title="post.title"
        :content="post.content"
        :karma="post.karma"
        :comment_freq="post.comment_freq"
      />
      <q-separator />
      <div class="comment-section">
        <recursive-nested-collapse
          v-for="comment in comments"
          :key="comment.id"
          :author="comment.author"
          :content="comment.content"
          :data="comment.comments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RecursiveNestedCollapse from 'components/RecursiveNestedCollapse'
import PostPreview from 'components/PostPreview'

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
        comment_freq: '1000'
      },
      comments: {
        1: {
          author: 'some guy 1',
          content: 'This is a great way of dealing this',
          like: 11,
          comments: {
            3: {
              author: 'some guy 2',
              content: 'This is a great way of dealing this',
              like: 12,
              comments: {
                3: {
                  author: 'some guy 2',
                  content: 'This is a great way of dealing this',
                  like: 12
                }
              }
            },
            4: {
              author: 'some guy 2',
              content: 'This is a great way of dealing this',
              like: 12
            }
          }
        },
        2: {
          author: 'some guy 3',
          content: 'This is a great way of dealing this',
          like: 13,
          comments: {
            4: {
              author: 'some guy 4',
              content: 'This is a great way of dealing this',
              like: 14
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
  max-width: 725px;
}
.container{
  background-color: #fafafa;
}
</style>
