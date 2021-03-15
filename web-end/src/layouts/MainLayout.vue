<template>
  <q-layout view="lHh Lpr lFf">
      <q-page class="bg-orange-1 window-height window-width row justify-center items-center">
        <div class="column">
          <q-card-section class="bg-orange-8" style="height: 80px">
            <q-img class="label"
                   src="https://www.vectorico.com/download/social_media/Reddit-Icon.png"
                   spinner-color="white"
                   style="max-height: 100%; max-width:15%; left: 130px ;"
            />
          </q-card-section>

          <div class="row">
            <q-card square bordered style="width: 350px" class="q-pa-lg shadow-1">
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
                <q-btn unelevated size="lg" color="orange-4" class="full-width text-white" label="Sign Up" />
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Back to Login</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  // components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
