// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl:"http://Desktop-laevf06:8080/api",
//apiUrl:"http://attendmeSpark.ap-south-1.elasticbeanstalk.com/api",
  //apiUrl:"http://localhost:8080/api",
  //legalEntityAPIUrl:"http://localhost:4201/api",
 //legalEntityAPIUrl:"http://Desktop-laevf06:4201/api"

    //apiUrl: "http://192.168.0.7:4202/api",
    //legalEntityAPIUrl: "http://attendme-legalentity.ap-south-1.elasticbeanstalk.com/api",
    //mobileRestAPI: "http://attendme-android.ap-south-1.elasticbeanstalk.com/api"

 //legalEntityAPIUrl: "http://attendme-alphatest.ap-south-1.elasticbeanstalk.com/api"
 
        apiUrl: "http://192.168.0.7:4202/api",
        legalEntityAPIUrl: "http://192.168.0.7:4201/api",
        mobileRestAPI: "http://192.168.0.7:5000/api"

   //apiUrl: "http://192.168.0.99:4201/api",
   //legalEntityAPIUrl: "http://192.168.0.99:4201/api",
   //mobileRestAPI: "http://192.168.0.99:5000/api"

  // Demo instance (ubuntu)

  //apiUrl: "http://ec2-52-66-245-42.ap-south-1.compute.amazonaws.com:4202/api",
  //legalEntityAPIUrl: "http://ec2-52-66-245-42.ap-south-1.compute.amazonaws.com:4201/api",
  //mobileRestAPI: "http://ec2-52-66-245-42.ap-south-1.compute.amazonaws.com:5000/api"

  // AWS Demo Istance

      //apiUrl: "http://ec2-13-235-108-50.ap-south-1.compute.amazonaws.com:4202/api",
      //legalEntityAPIUrl: "http://ec2-13-235-108-50.ap-south-1.compute.amazonaws.com:4201/api",
      //mobileRestAPI: "http://ec2-13-235-108-50.ap-south-1.compute.amazonaws.com:5000/api"

  //AWS new demo (AWS Beanstalk)  instance
      
  //apiUrl: "http://demo-le.attendme.in/api",
  //legalEntityAPIUrl: "http://demo-le.attendme.in/api",
  //mobileRestAPI: "http://demo-android.attendme.in/api"    

  // AWS New Production Instance (https)

    //apiUrl: "https://attendme-le.attendme.in/api",
    //legalEntityAPIUrl: "https://attendme-le.attendme.in/api",
    //mobileRestAPI: "https://attendme-android.attendme.in/api"

};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
