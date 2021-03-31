<template>
  <q-card flat bordered class="subredditCard">
    <create-subreadit-modal :prompt="modal" :toggle-modal="toggleModal" />
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
    <div v-if="!loading">
      <q-item clickable @click="toggleModal()">
        <q-item-section avatar>
          <q-icon name="add_box" style="font-size: 2.5em; color: #ff7d1a"></q-icon>
        </q-item-section>
        <q-item-section style="font-weight: 700; color: #0e6bcf">Create new community</q-item-section>
      </q-item>
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
import CreateSubreaditModal from 'components/CreateSubreaditModal'

export default {
  name: 'SubredditSuggestions',
  components: { CreateSubreaditModal, SubredditSuggestionPlaceholder },
  data () {
    return {
      placeholderImg: 'https://www.resorgs.org.nz/wp-content/uploads/2018/11/logo-placeholder.jpeg',
      subs: [],
      subreaditRef: null,
      loading: true,
      modal: false
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
          this.subs = snapshot.val()
        }
        this.loading = false
      })
    },
    toggleModal (visible) {
      this.modal = visible == null ? !this.modal : visible
      console.log(this.modal)
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
