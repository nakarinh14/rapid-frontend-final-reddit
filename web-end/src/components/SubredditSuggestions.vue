<template>
  <q-card flat bordered class="subredditCard">
    <q-card-section class="subredditCardHeader text-white">
      <span class="text-h6">Communities</span>
    </q-card-section>
    <div v-for="(sub,subID) in subs" :key="subID">
      <q-item clickable :to="`/subreadit/${sub.name}`">
        <q-item-section avatar>
          <q-avatar>
            <img :src=placeholderImg />
          </q-avatar>
        </q-item-section>
        <q-item-section style="font-weight: 500">{{ sub.name }}</q-item-section>
      </q-item>
      <q-separator/>
    </div>
    <div v-if="loading">
      <subreddit-suggestion-placeholder
        v-for="n in 6"
        :key="n"
      />
    </div>
  </q-card>
</template>

<script>

import * as SubredditService from '../services/SubredditService.js'
import SubredditSuggestionPlaceholder from 'components/SubredditSuggestionPlaceholder'

export default {
  name: 'SubredditSuggestions',
  components: { SubredditSuggestionPlaceholder },
  data () {
    return {
      placeholderImg: 'https://www.resorgs.org.nz/wp-content/uploads/2018/11/logo-placeholder.jpeg',
      subs: [],
      subreaditRef: null,
      loading: true
    }
  },
  created () {
    this.fetchSubreadits()
  },
  methods: {
    fetchSubreadits () {
      this.subreaditRef = SubredditService.getRefForSubreddits()
      this.subreaditRef.on('value', (snapshot) => {
        if (snapshot.exists()) {
          this.loading = false
          this.subs = snapshot.val()
        }
      })
    }
  }
}
</script>

<style scoped>
.subredditCard {
  width: 100%;
}
.subredditCardHeader {
  background-color: #FF6F00;
}
</style>
