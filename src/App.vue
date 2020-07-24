<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <router-link to="/" tag="div">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/categories" tag="div">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-label</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Categories</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-spacer ></v-spacer>
        <v-list-item
          link
          href="https://github.com/maciejpedzich/expense-tracker"
          target="_blank">
          <v-list-item-action>
            <v-icon>mdi-memory</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Source code</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click.stop="showContactInfo">
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
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        v-if="!drawer"
        @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="mx-10 my-4">
      <v-dialog v-model="contactDialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Contact</v-card-title>
          <v-card-text>
            Email address:
            <a href="mailto:contact@maciejpedzi.ch">
              contact@maciejpedzi.ch
            </a>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="contactDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  data () {
    return {
      drawer: null,
      contactDialog: false
    }
  },
  methods: {
    showContactInfo () {
      if (
        ['xs', 'sm'].includes(this.$vuetify.breakpoint.name)
      ) this.drawer = false

      this.contactDialog = true
    }
  }
}
</script>
