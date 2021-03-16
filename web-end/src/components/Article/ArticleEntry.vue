<template>
  <q-item class="column" clickable>
    <div class="row">
      <!-- Article Title and info -->
      <q-item-section class="col">
        <q-item-label lines="1">
          <span class="text-h6">{{article.title}}</span>
        </q-item-label>

        <q-item-label lines="1" class="text-grey">
          <router-link @click.native.stop :to="'/r/' + article.subreddit">
            r/{{article.subreddit}}
          </router-link>
          <span>．Posted by </span>
          <router-link @click.native.stop :to="'/u/' + article.postedBy">
            u/{{article.postedBy}}
          </router-link>
          <span> on {{article.postedTime | formatDate}}</span>
        </q-item-label>

<!--        Comment and Share button-->
        <q-item-label lines="1" class="text-grey text-weight-bold">
          <q-btn class="q-ml-sm" dense flat size="xs" icon="chat_bubble" :label="'' + article.comments + ' Comments'" />
          <q-btn @click.stop="shareClicked" class="q-ml-sm" dense flat size="xs" icon="share" label="Share" />
        </q-item-label>

      </q-item-section>
    </div>
  </q-item>
</template>

<script>
export default {
  name: 'ArticleEntry.vue'
}
</script>

<style scoped>

</style>
