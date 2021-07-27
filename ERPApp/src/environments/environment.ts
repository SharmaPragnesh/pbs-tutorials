// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

////// How to Implement new environment
// https://codinglatte.com/posts/angular/environment-variables-angular/
// ng build --configuration=beta
export const environment = {
  production: false,
  timeSpanMedium: 5000,
  timeSpanLarge: 7000,
  pageSize: 10,
  UploadFileSize: 104857600,
  GoogleClientId: "981659961080-9qeq7ra4kt6k47t9k1lnfbvrjrglom5l.apps.googleusercontent.com",
  FacebookClientId: "1046651368784150",
  CbId: '1e7f20aa-73c3-4a41-b529-ba02f82cfcdd', //https://www.cookiebot.com/en/
  Timeout: 60,
  ShowConsoleLogs: false,
  ShowTimerLogs: false,
  // apiURL: 'https://uninoter.salesoptimizer.eu/api'
  apiURL: 'https://uninoter.salesoptimizer.eu/api',
  erpApiURL: 'http://localhost:64904',
  // erpApiURL: 'https://test-pssplerp-webapi.azurewebsites.net',
  webshipperapiURL: 'https://milcom.api.webshipper.io/v2',
  webshipperDotNetapiURL: 'http://localhost:64121',
  // apiURL: 'http://10.0.0.103:8164'
  // apiURL: 'http://localhost:52947/api'
 clientId: 'c8a20593-c899-450e-aba9-dde0107d355c',
  redirectUri: 'http://localhost:4200'
};
////// For Set the Variable Values
//https://pumpingco.de/blog/environment-variables-angular-docker/

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
