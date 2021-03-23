<template>
  <q-card flat bordered class="subredditCard">
    <q-card-section class="subredditCardHeader text-white">
      <span class="text-h6">Communities</span>
    </q-card-section>
    <div v-for="(sub,subID) in subreddits" :key="subID">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src=placeholderImg />
          </q-avatar>
        </q-item-section>
        <q-item-section style="font-weight: 500">{{sub.name}}</q-item-section>
      </q-item>
      <q-separator/>
    </div>
  </q-card>
</template>

<script>

import * as SubredditService from '../services/SubredditService.js'

export default {
  name: 'SubredditSuggestions',
  data () {
    return {
      placeholderImg: 'https://www.resorgs.org.nz/wp-content/uploads/2018/11/logo-placeholder.jpeg'
    }
  },
  computed: {
    subreddits () {
      const subredditRef = SubredditService.getRefForSubreddits()
      console.log(subredditRef)
      return subredditRef.on('value', (snapshot) => {
        snapshot.val()
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
