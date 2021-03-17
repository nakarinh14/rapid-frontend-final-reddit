<template>
  <div id="q-app">
    <q-layout view="lHh lpr lFf">
      <q-header reveal elevated style="background-color: #E65100">
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" />
          <q-btn :ripple="false" flat style="font-size: 18px;" icon="auto_stories" to="/" no-caps>
            <q-toolbar-title>read-it</q-toolbar-title>
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
