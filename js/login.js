const tokenLogin = localStorage.getItem('token')
if (tokenLogin != null) {
  location.replace('/glozin.html')
}

function checkInputEmail (email) {
  const myEmail = document.getElementById('notice')
  //   const myButton = document.getElementById('but')

  ;('use strict')
  // تعبير عادي للتحقق من أن النص يحتوي فقط على أحرف
  var inputEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

  if (!inputEmail.test(email)) {
    myEmail.textContent = 'Email is invaild'
    myEmail.style.color = 'red'
    return false
  } else {
    myEmail.textContent = null
    myEmail.style.color = null
    return true
  }
}
function checkInputPassword (loginUserPassword) {
  const myPasswor = document.getElementById('passwordText')
  //   const myButton = document.getElementById('but')

  ;('use strict')
  // تعبير عادي للتحقق من أن النص يحتوي فقط على أحرف
  var inputPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

  if (!inputPassword.test(loginUserPassword)) {
    myPasswor.textContent = 'Password is invaild'
    myPasswor.style.color = 'red'
    return false
  } else {
    myPasswor.textContent = null
    myPasswor.style.color = null
    return true
  }
}

function checkInput () {
  const loginUserEmail = document.getElementById('inputEmail').value
  const loginUserPassword = document.getElementById('inputPassword').value
  const isEmail = checkInputEmail(loginUserEmail)
  const isPassword = checkInputPassword(loginUserPassword)
  if (isEmail && isPassword) {
    loginData(loginUserEmail, loginUserPassword)
  }
  console.log(loginUserPassword)
}

function loginData (loginUserEmail, loginUserPassword) {
  let myRequest = new XMLHttpRequest()
  myRequest.open('POST', 'https://worker.daysofiman.com/api/auth-user/login')
  myRequest.setRequestHeader('Content-type', 'application/json')
  //   myRequest.setRequestHeader('Authorization', 'YOUR_API_KEY')

  myRequest.send(
    JSON.stringify({
      loginId: loginUserEmail,
      password: loginUserPassword
      // loginId: 'tarekshelkhalbasatnen@gmail.com',
      // password: 'AAbbcc12345@@'
    })
  )
  myRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 201) {
      let jsData = JSON.parse(this.responseText)
      localStorage.setItem('token', jsData.data.token)
      location.replace('/glozin.html')
    } else if (this.readyState == 4 && this.status == 401) {
      let jsErorr = JSON.parse(this.responseText)
      console.log(jsErorr)
      myErorr = document.getElementById('textErorr')
      myErorr.textContent = jsErorr.message
      myErorr.style.color = 'red'
    }
  }
}
