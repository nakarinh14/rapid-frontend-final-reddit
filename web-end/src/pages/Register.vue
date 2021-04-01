<template>
  <q-page  class="bg-orange-1 row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:500px;">
          <q-card-section class="bg-orange-8" style="height: 100px">
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl q-pb-lg">
              <q-input square clearable v-model="email" type="email" label="Email">
                <template v-slot:prepend>
                  <q-icon name="email" />
                </template>
              </q-input>
              <q-input square clearable v-model="username" type="username" label="Username">
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
              <q-input square clearable v-model="password" type="password" label="Password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-section>
            <span class="text-red-4"> {{errorMessage}}</span>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn :loading="loading" @click="onClickRegister()" unelevated size="lg" color="orange-4" class="full-width text-white" label="Sign Up" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { registerNewUser } from 'src/services/AuthService'
export default {
  name: 'Register.vue',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      errorMessage: '',
      loading: false
    }
  },
  methods: {
    async onClickRegister () {
      if (!this.loading) {
        try {
          this.loading = true
          this.errorMessage = ''
          await registerNewUser(this.email, this.password, this.username)
          window.location.href = `${window.location.origin}`
        } catch (err) {
          console.log(err)
          this.errorMessage = err
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
