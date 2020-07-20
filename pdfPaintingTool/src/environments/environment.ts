// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:4201',
  pdfFileUpload: 'http://localhost:4201/api/pdf-upload',
  mergePdfFile: 'http://localhost:4201/api/merge-pdf',
  headers: 'http://localhost:4201/api/get-headers',
  footers: 'http://localhost:4201/api/get-footers',
  stamps: 'http://localhost:4201/api/get-stamps'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
