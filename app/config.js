const googleAuth = require('./Intro2Astro-fc288f39a1b9.json')

let sheetID, subject;

if (process.env.NODE_ENV === 'development') {
  sheetID = '16y7Czdv889XfX_Tpk3Oe92EPdPWheho9PM0i5MiLrCU';
  subject = 'sarah@zooniverse.org';
}

module.exports = {
  googleAuth: googleAuth,
  sheetID: sheetID,
  subject: subject
};