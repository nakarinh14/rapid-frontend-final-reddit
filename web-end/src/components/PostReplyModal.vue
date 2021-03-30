<template>
  <q-dialog :value="prompt" @input="toggleModal()">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Replying to a post</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model.trim="commentBody" autofocus autogrow />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Reply" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'PostReplyModal',
  props: { prompt: Boolean, toggleModal: Function },
  data () {
    return {
      commentBody: ''
    }
  }
}
</script>

<style scoped>

</style>
