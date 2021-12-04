const rules = {
  require({ label }) {
    return (v) => !!v || `[${label}] 필수 입력입니다.`;
  },
  min({ label, len = 3 }) {
    return (v) =>
      v ? v.length >= len || `[${label}] ${len}자 이상 입력하세요` : true;
  },
  alphaNum() {
    return (v) =>
      v ? /^[a-zA-Z0-0]+$/.test(v) || `영어와 숫자만 입력하세요` : true;
  },
  pattern({ label, pattern }) {
    return (v) =>
      v ? pattern.test(v) || `[${label}] 형식에 맞게 입력하세요` : true;
  },
  matchValue(origin) {
    return (v) => origin === v || "비밀번호가 일치하지 않습니다.";
  },
  id(options) {
    const defaultOption = {
      label: "아이디",
      len: 3,
      require: true,
    };
    const opt = Object.assign(defaultOption, options);
    const arr = [];
    if (opt.required) {
      arr.push(rules.require(opt));
    }
    arr.push(rules.min(opt));
    arr.push(rules.alphaNum());
    return arr;
  },
  name(options) {
    const defaultOption = {
      label: "이름",
      len: 2,
      require: true,
    };
    const opt = Object.assign(defaultOption, options);
    const arr = [];
    if (opt.required) {
      arr.push(rules.require(opt));
    }
    arr.push(rules.min(opt));
    return arr;
  },
  email(options) {
    const defaultOption = {
      label: "이메일",
      require: true,
      pattern: /.+@.+\..+/,
    };
    const opt = Object.assign(defaultOption, options);
    const arr = [];
    if (opt.required) {
      arr.push(rules.require(opt));
    }
    arr.push(rules.pattern(opt));
    return arr;
  },
  password(options) {
    const defaultOption = {
      label: "비밀번호",
      require: true,
      len: 6,
      pattern: /^.*(?=^.{6,}$)(?=.*\d)(?=.*[a-zA-Z]).*$/,
    };
    const opt = Object.assign(defaultOption, options);
    const arr = [];
    if (opt.required) {
      arr.push(rules.require(opt));
    }
    arr.push(rules.min(opt));
    arr.push(rules.pattern(opt));
    return arr;
  },
};

module.exports = rules;
