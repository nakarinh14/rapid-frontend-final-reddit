<template>
  <q-dialog :value="prompt" @input="toggleModal()">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">You aren't signed in</div>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="Sign In" v-on:click="() => $router.push({path: '/login'})" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'UnauthorizeModal',
  props: {
    prompt: Boolean,
    toggleModal: Function
  }
}
</script>

<style scoped>

</style>
