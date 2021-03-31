<template>
  <q-dialog :value="prompt" @input="toggleModal()">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Replying to a comment</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model.trim="commentBody" autofocus autogrow />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Reply" v-on:click="createComment()" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { addComment } from 'src/services/CommentService'

export default {
  name: 'CommentReplyModal',
  props: {
    prompt: Boolean,
    toggleModal: Function,
    commentPath: String,
    postId: String,
    postTitle: String,
    subreadit: String,
    onCreate: Function
  },
  data () {
    return {
      commentBody: ''
    }
  },
  methods: {
    async createComment () {
      await addComment(
        this.postId,
        this.commentBody,
        this.$store.getters['auth/getUser'],
        this.commentPath,
        this.postTitle,
        this.subreadit
      )
      this.onCreate()
    }
  }
}
</script>

<style scoped>

</style>
