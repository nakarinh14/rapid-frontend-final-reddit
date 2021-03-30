<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf">
      <q-header reveal elevated style="background-color: #E65100">
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-btn :ripple="false" flat style="font-size: 18px;" icon="auto_stories" to="/" no-caps>
            <q-toolbar-title>read-it</q-toolbar-title>
          </q-btn>
          <q-space />
          <div v-if="user">
            <q-btn flat round dense icon="circle_notifications" style="font-size: 16px; margin-right: 10px" />
            <q-btn flat round dense icon="account_circle" style="font-size: 16px;">
              <q-menu>
                <div class="column no-wrap q-pa-md">
                  <div class="column items-center">
                    <div class="text-h6 q-mb-md">{{ user.displayName }}</div>
                    <div class="text-subtitle1 q-mt-md q-mb-xs" style="font-size: 15px">
                      {{ user.email }}
                    </div>
                  </div>
                  <div class="column" style="margin-top: 10px">
                    <q-btn
                      @click="() => this.$router.push( {path: `/user/${user.displayName}`})"
                      color="primary"
                      label="Profile"
                      size="sm"
                      v-close-popup
                    />
                    <q-btn
                      @click="signOut()"
                      style="margin-top: 10px"
                      color="red"
                      label="Logout"
                      size="sm"
                      v-close-popup
                    />
                  </div>
                </div>
              </q-menu>
            </q-btn>
          </div>
          <div v-else>
            <q-btn unelevated color="primary" style="font-size: 13px; margin-right: 10px" to="/login">Sign In</q-btn>
            <q-btn unelevated color="secondary" style="font-size: 13px; margin-right: 10px" to="/register">Sign up</q-btn>
          </div>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { firebase } from './firebase'
import 'firebase/auth'

export default {
  name: 'App',
  methods: {
    signOut () {
      firebase.auth().signOut()
    }
  },
  computed: {
    user () {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
<style>
html { height: 100% }
body {
  min-height: 100%;
  background: #fafafa
}
</style>
