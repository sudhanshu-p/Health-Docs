const express = require('express');
const app = express();
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

// app.set('view engine','ejs')

app.get('/', requiresAuth(), (req, res)=> {
  res.sendFile(__dirname + '/form.html');
})

app.get('/qrcode', (req, res)=> {
  res.sendFile(__dirname + '/qrcode.html');
})



// app.get('/profile', requiresAuth(), (req, res)=> {
//     res.sendFile(__dirname + '/form.html');
// // })

// app.get('/', (req, res)=> {
//   res.sendFile(req.oidc.isAuthenticated() ? './form.html' : 'Not Logged In');
// })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})