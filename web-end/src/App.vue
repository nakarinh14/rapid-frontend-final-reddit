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
          <q-btn flat round dense icon="circle_notifications" style="font-size: 16px; margin-right: 10px" />
          <q-btn flat round dense icon="account_circle" style="font-size: 16px;">
            <q-menu>
              <div class="column no-wrap q-pa-md">
                <div class="column items-center">
                  <div class="text-h6 q-mb-md">i_am_a_user</div>
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs" style="font-size: 15px">iamuser@gmail.com</div>
                </div>
                <div class="column" style="margin-top: 10px">
                  <q-btn
                    color="primary"
                    label="Profile"
                    size="sm"
                    v-close-popup
                  />
                  <q-btn
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
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
html { height: 100% }
body {
  min-height: 100%;
  background: #fafafa
}
</style>
