// require("dotenv").config();
// const mysql = require("mysql");

// function createDatabase() {
//   let instance = null;
//   return {
//     getInstance: function () {
//       if (instance == null) {
//         const config = {
//           host: process.env.DB_HOST,
//           user: process.env.DB_USER,
//           database: process.env.DB_DATABASE,
//           password: process.env.DB_PASSWORD,
//         };
//         const pool = mysql.createPool(config);
//         instance = pool.promise();
//       }
//       return instance;
//     },
//   };
// }
// module.exports = createDatabase().getInstance();

var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(3000, "0.0.0.0", function () {
  console.log("Server running at http://192.168.219.103:3000"); // 서버주소는 자신의 IP로 수정할 것
});

// MySql 데이터베이스 연결 설정(자신의 데이터베이스 설정내용을 수정할 것)
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dkssud12",
  database: "mydb",
  port: 3306,
});

//회원가입 처리
app.post("/user/join", function (req, res) {
  console.log(req.body);
  var userEmail = req.body.userEmail;
  var userPwd = req.body.userPwd;
  var userName = req.body.userName;

  //데이터 삽입을 수행하는 sql문
  var sql = "INSERT INTO Users (UserEmail, UserPwd, UserName) VALUES (?, ?, ?)";
  var params = [userEmail, userPwd, userName];

  //sql문에서 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.
  connection.query(sql, params, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다";

    if (err) {
      console.log(err);
    } else {
      resultCode = 200;
      message = "회원가입에 성공했습니다.";
    }

    // 통신에 성공하면 json객체를 클라이언트 쪽으로 전송한다.
    res.json({
      code: resultCode,
      message: message,
    });
  });
});

//로그인 처리
app.post("/user/login", function (req, res) {
  var userEmail = req.body.userEmail;
  var userPwd = req.body.userPwd;
  var sql = "select * from Users where UserEmail = ?";

  connection.query(sql, userEmail, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다";

    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        resultCode = 204;
        message = "존재하지 않는 계정입니다!";
      } else if (userPwd !== result[0].UserPwd) {
        resultCode = 204;
        message = "비밀번호가 틀렸습니다!";
      } else {
        resultCode = 200;
        message = "로그인 성공! " + result[0].UserName + "님 환영합니다!";
      }
    }

    res.json({
      code: resultCode,
      message: message,
    });
  });
});

//Person select 처리
app.post("/person/search", function (req, res) {
  var name = req.body.name;
  var hobby = req.body.hobby;
  var sql = "select * from person";

  connection.query(sql, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다";

    if (err) {
      console.log(err);
    } else {
      if (result.length === 0) {
        resultCode = 204;
        message = "데이터가 존재하지 않습니다!";
      } else {
        resultCode = 200;
        searchMessage = result;

        console.log(searchMessage);
      }
    }

    res.json({
      code: resultCode,
      searchMessage: searchMessage,
    });
  });
});

//Person insert 처리
app.post("/person/insert", function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  var hobby = req.body.hobby;

  //데이터 삽입을 수행하는 sql문
  var sql = "INSERT INTO person (name, hobby) VALUES (?, ?)";
  var params = [name, hobby];

  //sql문에서 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.
  connection.query(sql, params, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다";

    if (err) {
      console.log(err);
    } else {
      resultCode = 200;
      message = "Person에 insert 성공했습니다.";
      console.log(message);
    }

    // 통신에 성공하면 json객체를 클라이언트 쪽으로 전송한다.
    res.json({
      code: resultCode,
      message: message,
    });
  });
});

//Person update 처리
app.post("/person/update", function (req, res) {
  console.log(req.body);
  var id = req.body.id;
  var name = req.body.name;
  var hobby = req.body.hobby;

  //데이터 수정을 수행하는 sql문
  var sql = "UPDATE Person SET name= ?, hobby = ? where (id = ?)";
  var params = [name, hobby, id];

  //sql문에서 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.
  connection.query(sql, params, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다";

    if (err) {
      console.log(err);
    } else {
      resultCode = 200;
      message = "Person에 update에 성공했습니다.";
      console.log(message);
    }

    // 통신에 성공하면 json객체를 클라이언트 쪽으로 전송한다.
    res.json({
      code: resultCode,
      message: message,
    });
  });
});

//Person delete 처리
app.post("/person/delete", function (req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var sql = "DELETE FROM Person where (id = ? and name = ?)";
  var params = [id, name];

  //sql문에서 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.
  connection.query(sql, params, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다";

    if (err) {
      console.log(err);
    } else {
      resultCode = 200;
      message = "Person에 delete 성공했습니다.";
      console.log(message);
    }

    // 통신에 성공하면 json객체를 클라이언트 쪽으로 전송한다.
    res.json({
      code: resultCode,
      message: message,
    });
  });
});

//Payment pay 처리
app.post("/payment/pay", function (req, res) {
  var contactId = req.body.contactId;
  var foodname = req.body.foodname;
  var price = req.body.price;
  var sql = "PAY FROM PAYMENT where (contactId = ? and foodname = ? )";
  var params = [contactId, foodname];

  //sql문에서 ?는 두번째 매개변수로 넘겨진 params의 값으로 치환된다.
  connection.query(sql, params, function (err, result) {
    var resultCode = 404;
    var message = "에러가 발생했습니다";

    if (err) {
      console.log(err);
    } else {
      resultCode = 200;
      message = "Person에 delete 성공했습니다.";
      console.log(message);
    }

    // 통신에 성공하면 json객체를 클라이언트 쪽으로 전송한다.
    res.json({
      code: resultCode,
      message: message,
    });
  });
});
