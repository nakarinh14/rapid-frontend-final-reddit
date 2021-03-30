<template>
   <q-page class="bg-orange-1 row justify-center items-center">
      <div class="column">
        <div class="row ">
          <h6 class="text-h5 text-orange-4 q-my-md">Login</h6>
        </div>
        <div class="row">
          <q-card square bordered style="width: 100%" class="q-pa-lg shadow-1">
            <q-card-section>
              <q-form class="q-gutter-md">
                <q-input square clearable v-model="email" type="email" label="Email"/>
                <q-input square clearable v-model="password" type="password" label="Password"/>
              </q-form>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn @click="onClickLogin()" unelevated color="orange-6" size="lg" class="full-width" label="Login" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-page>
</template>

<script>
import { firebase } from '../firebase'
import 'firebase/auth'
export default {
  name: 'Login.vue',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async onClickLogin () {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        console.log(firebase.auth().currentUser)
        await this.$router.replace({ path: '/' })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
