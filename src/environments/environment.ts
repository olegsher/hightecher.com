// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyBp4YWndShpxXVeYDJjZ16rDgnSWQuV9k4'
  },
  urls: {
    server: 'https://ht-users.herokuapp.com',
    registerUser: 'https://ht-users.herokuapp.com/',
    notificationTime: 'https://ht-users.herokuapp.com/user-data/notification/time',
    name: 'https://ht-users.herokuapp.com/user-data/name',
    location: 'https://ht-users.herokuapp.com/user-data/location',
    notificationWays: 'https://ht-users.herokuapp.com/user-data/notification/ways',
    email: 'https://ht-users.herokuapp.com/user-data/email',
    phone: 'https://ht-users.herokuapp.com/user-data/phone',
    skills: 'https://ht-users.herokuapp.com/user-data/skills',
    profile: 'https://ht-users.herokuapp.com/user/profile'

    apiKey: 'AIzaSyCRvlEGovUviGm7WL3P4KpB-htf784sU_o',
    // authDomain: 'hig-project-2061a.firebaseapp.com',
    // databaseURL: 'https://hig-project-2061a.firebaseio.com',
    // projectId: 'hig-project-2061a',
    // storageBucket: 'hig-project-2061a.appspot.com',
    // messagingSenderId: '759112626721',
    // appId: '1:759112626721:web:8ead678eb5c0183f'
 
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
