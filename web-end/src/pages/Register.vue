<template>
  <q-page  class="bg-orange-1 row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:500px;">
          <q-card-section class="bg-orange-8" style="height: 100px">
            <q-img class="label"
                   src="https://www.vectorico.com/download/social_media/Reddit-Icon.png"
                   spinner-color="white"
                   style="max-height: 100%; max-width:20%; left: 110px ;"
            />
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
          <q-card-actions class="q-px-lg">
            <q-btn @click="onClickRegister()" unelevated size="lg" color="orange-4" class="full-width text-white" label="Sign Up" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">Back to Login</p>
          </q-card-section>
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
      email: ''
    }
  },
  methods: {
    async onClickRegister () {
      try {
        await registerNewUser(this.email, this.password, this.username)
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
