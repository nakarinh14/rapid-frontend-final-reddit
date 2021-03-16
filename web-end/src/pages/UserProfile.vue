<template>
  <q-page>
    <div class="container column items-start justify-start content-center">
      <div class="inner-container">
        <div class="row content-center items-center title-bar">
          <q-icon name="account_circle" style="font-size: 2.5em; color: #FF6F00"></q-icon>
          <span class="text-grey-7 user-title">not_a_crazy_person</span>
        </div>
        <q-tabs
          v-model="tab"
          align="left"
          inline-label
          indicator-color="orange"
          class="bg-blue-6 text-white shadow-2"
        >
          <q-tab name="posts" icon="mail" label="Posts" />
          <q-tab name="comments" icon="comment" label="Comments" />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          animated
          keep-alive
        >
<!--      // Might need to find a way to lazy load with q-tab-panel for performance -->
          <q-tab-panel name="posts">
            <user-posts />
          </q-tab-panel>
          <q-tab-panel name="comments">
            <user-comments />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import UserPosts from 'components/UserPosts.vue'
import UserComments from 'components/UserComments'
export default {
  name: 'UserProfile',
  components: { UserComments, UserPosts },
  data: function () {
    return {
      tab: 'posts'
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
.user-title {
  font-weight: 600;
  font-size: 22px;
  margin-left: 10px
}
.title-bar {
  margin-bottom: 10px;
}
</style>
