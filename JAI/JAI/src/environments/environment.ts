// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBi08sG07_qo-UjaXvBRSzLeyBaGNosRVo",
    authDomain: "jai-handball.firebaseapp.com",
    databaseURL: "https://jai-handball.firebaseio.com/",
    projectId: "jai-handball",
    storageBucket: "jai-handball.appspot.com",
    messagingSenderId: "652379343440"
  },
  maps: {
    apiKey: 'AIzaSyBS7rSdqQLrPGSe4smc0Roz4nhrocm_744'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
