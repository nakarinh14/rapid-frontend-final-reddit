<template>
  <q-card flat bordered class="subredditCard">
    <create-subreadit-modal :prompt="modal" :toggle-modal="toggleModal" />
    <q-card-section class="subredditCardHeader text-white">
      <span class="text-h6">About Community</span>
    </q-card-section>
    <q-card-section>
      <span>{{ subreadit.description }} </span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <span>Created by
        <router-link
          :to="`/user/${subreadit.creator}`"
          tag="b"
          class="direct"
        >
          {{ subreadit.creator }}
        </router-link>
      </span>
    </q-card-section>
    <div v-if="!loading">
      <q-item clickable @click="toggleModal()">
        <q-item-section avatar>
          <q-icon name="add_box" style="font-size: 2.5em; color: #ff7d1a"></q-icon>
        </q-item-section>
        <q-item-section style="font-weight: 700; color: #0e6bcf">Create new community</q-item-section>
      </q-item>
    </div>
  </q-card>
</template>

<script>
import CreateSubreaditModal from 'components/CreateSubreaditModal'
export default {
  name: 'SubredditBlockInfo',
  components: { CreateSubreaditModal },
  props: ['subreadit'],
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
  },
  methods: {
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
.direct {
  cursor: pointer;
}
.direct:hover {
  text-decoration: underline;
}
</style>
