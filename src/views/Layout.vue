<template>
  <v-app id="inspire">
    <Navbar />
    <router-view style="margin-top: 110px; padding: 0px !important" />
    <Footer />
  </v-app>
</template>
<script>
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      categories: [],
      activeBtn: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.v-icon {
  margin-right: 0px !important;
}
.pointercursor {
  cursor: pointer;
  height: 42px;
  width: 42px;
}
.v-menu__content {
  max-width: 40% !important;
}
</style>


