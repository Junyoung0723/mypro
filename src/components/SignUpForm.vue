<template>
  <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation>
    <input-duplicate-check
      ref="id"
      v-model="form.UserID"
      label="아이디"
      prepend-icon="mdi-account"
      :rules="rules.id()"
      :cbCheck="cbCheckId"
    />
    <input-password
      label="비밀번호"
      v-model="form.UserPwd"
      prepend-icon="mdi-lock"
      :rules="rules.password()"
    />
    <input-password
      label="비밀번호 확인"
      v-model="confirmPw"
      prepend-icon="mdi-lock"
      :rules="[rules.matchValue(form.UserPwd)]"
    />
    <v-text-field
      label="이름"
      v-model="form.UserName"
      prepend-icon="mdi-card-account-details-outline"
      :rules="rules.name()"
    />

    <input-duplicate-check
      ref="email"
      v-model="form.UserEmail"
      label="이메일"
      prepend-icon="mdi-email"
      :rules="rules.email()"
      :cbCheck="cbCheckEmail"
    />
    <v-btn type="submit" block color="primary" :loading="isLoading"
      >회원가입</v-btn
    >
  </v-form>
</template>
<script>
import validateRules from "../util/validateRules";
import InputDuplicateCheck from "./InputDuplicateCheck.vue";
import InputPassword from "./InputPassword.vue";
export default {
  components: { InputDuplicateCheck, InputPassword },
  name: "SignUpForm",
  props: {
    cbCheckId: {
      type: Function,
      default: null,
    },
    cbCheckEmail: {
      type: Function,
      default: null,
    },
    isLoading: Boolean,
  },
  data() {
    return {
      valid: true,
      form: {
        UserID: "",
        UserEmail: "",
        UserPwd: "",
        UserName: "",
      },
      confirmPw: "",
    };
  },
  computed: {
    rules: () => validateRules,
  },
  methods: {
    async save() {
      this.$refs.form.validate();
      await await this.$nextTick();
      if (!this.valid) return;
      if (!this.$refs.id.validate()) return;
      if (!this.$refs.email.validate()) return;

      this.$emit("onSave", this.form);
    },
  },
};
</script>
