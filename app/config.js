const googleAuth = require('./Intro2Astro-fc288f39a1b9.json')

let sheetID;

if (process.env.NODE_ENV === 'development') {
  sheetID = '1xkhHDDrRu3gqJrnhnIPu2L4HHFOHF-g8G_rGjQmKYPI';
}

module.exports = { sheetID: sheetID, googleAuth: googleAuth };