<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Expense Tracker</v-toolbar-title>
      <v-app-bar-nav-icon
        class="ml-auto"
        v-if="!drawer"
        @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="mt-4 mx-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">
        Made by Maciej Pędzich, 2020
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
}
</script>
