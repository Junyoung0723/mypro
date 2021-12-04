<template>
  <div id="app">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ dialogTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="ID"
                    v-model="contactInfo.contactId"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="음식 이름"
                    v-model="contactInfo.foodname"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="가격"
                    v-model="contactInfo.price"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="등록일"
                    v-model="contactInfo.register_date"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="btnClick($event)"
              >취소</v-btn
            >
            <v-btn color="blue darken-1" text @click="btnClick($event)"
              >확인</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.contactId }}</td>
          <td>{{ row.item.foodname }}</td>
          <td>{{ row.item.price }}</td>
          <td>{{ row.item.register_date }}</td>
          <td class="text-xs-right">
            <v-btn color="primary" v-on:click.native="updateContact(row.item)"
              >수정</v-btn
            >
            <v-btn color="primary" v-on:click.native="deleteContact(row.item)"
              >삭제</v-btn
            >
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      urlinfo: "http://localhost:8000/contacts",
      contactInfo: {
        _id: null,
        contactId: null,
        foodname: null,
        price: null,
        register_date: null,
      },
      dialog: false,
      dialogTitle: null,

      headers: [
        { text: "번호", align: "left", value: "contactId" },
        { text: "음식 이름", align: "left", value: "foodname" },
        { text: "가격", align: "left", value: "price" },
        { text: "등록일", align: "left", value: "register_date" },
        { text: "관리", align: "left", value: "" },
      ],
      items: [],
    };
  },
  created() {
    axios
      .get(this.urlinfo) //서버에 요청하기
      .then((res) => {
        console.log(res.data); //성공시
        this.items = res.data;
      })
      .catch((err) => {
        alert("에러 발생: " + err); //에러 발생
      });
  },
  methods: {
    addContact() {
      this.dialog = true;
      this.dialogTitle = "추가";
      this.contactInfo.register_date = Date.now();
    },
    updateContact(data) {
      this.dialog = true;
      this.dialogTitle = "수정";
      this.contactInfo.contactId = data.contactId;
      this.contactInfo.foodname = data.foodname;
      this.contactInfo.price = data.price;
      this.contactInfo.register_date = data.register_date;
    },
    deleteContact(data) {
      this.dialog = true;
      this.dialogTitle = "삭제";
      this.contactInfo.contactId = data.contactId;
      console.log("deleteContact : " + data);
    },

    btnClick($event) {
      this.dialog = false;
      if ($event.target.innerHTML == "확인") {
        if (this.dialogTitle == "추가") {
          axios
            .post(this.urlinfo, {
              contactId: this.contactInfo.contactId,
              foodname: this.contactInfo.foodname,
              price: this.contactInfo.price,
              //, register_date:this.contactInfo.register_date
            })
            .then(() => {
              axios
                .get(this.urlinfo) //서버에 요청하기
                .then((res) => {
                  //console.log(res.data); //성공시
                  this.items = res.data;
                  alert("연락처 추가 성공");
                })
                .catch((err) => {
                  alert("에러 발생: " + err); //에러 발생
                });
            })
            .catch((err) => {
              alert("에러 발생: " + err); //에러 발생
            });
        } else if (this.dialogTitle == "수정") {
          //alert("입력된 정보 : " + "이메일 : " + this.contactInfo.email + " 패스워드 : " + this.contactInfo.password);
          axios
            .put(this.urlinfo + "/" + this.contactInfo.contactId, {
              contactId: this.contactInfo.contactId,
              name: this.contactInfo.name,
              email: this.contactInfo.email,
              gender: this.contactInfo.gender,
              phone: this.contactInfo.phone,
              register_date: this.contactInfo.register_date,
            })
            .then(() => {
              axios
                .get(this.urlinfo) //서버에 요청하기
                .then((res) => {
                  //console.log(res.data); //성공시
                  this.items = res.data;
                  alert("업데이트 성공");
                })
                .catch((err) => {
                  alert("에러 발생: " + err); //에러 발생
                });
            })
            .catch((err) => {
              alert("에러 발생: " + err); //에러 발생
            });
        } else {
          axios
            .delete(this.urlinfo + "/" + this.contactInfo.contactId, {
              data: { contactId: this.contactInfo.contactId },
            })
            .then((result) => {
              console.log("삭제 후" + result); //성공시
              axios
                .get(this.urlinfo) //서버에 요청하기
                .then((res) => {
                  this.items = res.data;
                  alert("삭제 성공");
                })
                .catch((err) => {
                  alert(" 삭제 후 데이터 가져오는 중 에러 발생: " + err); //에러 발생
                });
            })
            .catch((err) => {
              alert("에러 발생: " + err);
            });
        }
      }
      this.contactInfo.contactId = null;
      this.contactInfo.foodname = null;
      this.contactInfo.price = null;
      this.contactInfo.register_date = null;
    },
  },
};
</script>
<style scoped>
div {
  margin: 0 5px 0 5px;
}
</style>
