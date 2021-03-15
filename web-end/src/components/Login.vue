<template>
  <q-page class="bg-orange-1 window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row ">
        <h5 class="text-h5 text-orange-4 q-my-md">Login</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input square filled clearable v-model="email" type="email" label="Email"/>
              <q-input square filed clearable v-model="password" type="password" label="Password"/>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="orange-6" size="lg" class="full-width" label="Login" />              </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
name: "Login.vue"
}
</script>

<style scoped>

</style>
