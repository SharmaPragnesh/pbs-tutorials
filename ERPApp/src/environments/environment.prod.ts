////// How to Implement new environment
// https://codinglatte.com/posts/angular/environment-variables-angular/
// ng build --configuration=beta
export const environment = {
  production: window["env"]["production"] || true,
  timeSpanMedium: window["env"]["timeSpanMedium"] || 5000,
  timeSpanLarge: window["env"]["timeSpanLarge"] || 7000,
  pageSize: window["env"]["pageSize"] || 20,
  GoogleClientId: window["env"]["GoogleClientId"] || "981659961080-9qeq7ra4kt6k47t9k1lnfbvrjrglom5l.apps.googleusercontent.com",
  FacebookClientId: window["env"]["FacebookClientId"] || "227118115749667",
  Timeout: window["env"]["Timeout"] || 60,
  ShowConsoleLogs: window["env"]["ShowConsoleLogs"] || false,
  ShowTimerLogs: window["env"]["ShowTimerLogs"] || false,
  apiURL: window["env"]["apiURL"] || 'https://uninoter.softinform.dk/api',
  webshipperapiURL: 'https://milcom.api.webshipper.io/v2',
  // apiURL: 'https://test2.marketsoft.info/api'
  // apiURL: 'https://uninoterapi.salesoptimizer.eu'
  // apiURL: 'http://10.0.0.103:8164'
  clientId: 'ed4d96ad-bec0-4394-9616-c965ef651405',
  redirectUri: 'https://test-pssplerp-webapp.azurewebsites.net/'
};
////// For Set the Variable Values
//https://pumpingco.de/blog/environment-variables-angular-docker/