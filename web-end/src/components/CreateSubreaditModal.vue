<template>
  <q-dialog :value="prompt" @input="toggleModal()">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Creating a community</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model.trim="name" label="Community Name" autofocus autogrow />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model.trim="description" label="Description" autogrow />
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn @click="createdSubreddit()" flat label="Create" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { addNewSubreddit } from 'src/services/SubredditService'

export default {
  name: 'CreateSubreaditModal',
  props: { prompt: Boolean, toggleModal: Function },
  data () {
    return {
      name: '',
      description: ''
    }
  },
  methods: {
    createdSubreddit () {
      addNewSubreddit(this.name, this.user, this.description)
    }
  },
  computed: {
    user () {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style scoped>

</style>
