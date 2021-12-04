<template>
  <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10">
      <v-toolbar>
        <v-toolbar-title>회원가입</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <sign-up-form
          :cbCheckId="checkId"
          :cbCheckEmail="checkEmail"
          @onSave="save"
          :isLoading="isLoading"
        />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import SignUpForm from "../../components/SignUpForm.vue";
export default {
  components: { SignUpForm },
  name: "Join",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async checkId(id) {
      console.log(id);
      return { cnt: 0 };
    },
    async checkEmail(email) {
      console.log(email);
      return { cnt: 0 };
    },
    async save(form) {
      console.log("save", form);
      this.isLoading = true;
      this.isLoading = false;
    },
  },
};
</script>
<style></style>
