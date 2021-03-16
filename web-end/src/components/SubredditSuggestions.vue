<template>
  <q-card flat bordered class="subredditCard">
    <q-card-section class="subredditCardHeader text-white">
      <span class="text-h6">Subreddits</span>
    </q-card-section>
    <div v-for="(sub,idx) in subreddits" :key="idx">
      <q-item clickable v-ripple>
        <q-item-section avatar>
          <q-avatar>
            <img :src="sub.avatar"/>
          </q-avatar>
        </q-item-section>
        <q-item-section style="font-weight: 500">{{sub.name}}</q-item-section>
      </q-item>
      <q-separator/>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'SubredditSuggestions',
  data: function () {
    return {
      subreddits: {
        1: {
          name: 'r/subreddit',
          avatar: 'https://pbs.twimg.com/profile_images/1333471260483801089/OtTAJXEZ_400x400.jpg'
        },
        2: {
          name: 'r/nba',
          avatar: 'https://cdn.vox-cdn.com/thumbor/3uaXC6RFYD7K9k6jq3wFVgBKe6o=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13189327/1_Squinting_JR_Smith.png'
        },
        3: {
          name: 'r/wallstreetbets',
          avatar: 'https://vmsseaglescall.org/wp-content/uploads/2019/10/Screen-Shot-2019-10-25-at-11.22.36-AM.png'
        },
        4: {
          name: 'r/dota2',
          avatar: 'https://pbs.twimg.com/profile_images/1148484652358746112/UdJALHjZ_400x400.png'
        },
        5: {
          name: 'r/teamliquid',
          avatar: 'https://pbs.twimg.com/media/EAGZiwPXkAA42ge.jpg'
        }
      }
    }
  }
}
</script>

<style scoped>
.subredditCard {
  width: 100%;
}
.subredditCardHeader {
  background-color: #FF6F00;
}
</style>
