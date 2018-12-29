import { EnvironmentConfig } from "./i.config";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: EnvironmentConfig = {
    production: false,
    apiURL: "http://app.petpals.love/staging/api/",
    defaultCountryId:24,
    apiEndPoints: {
        signin: "MobileAccount/Login",
        signOut: "MobileAccount/LogOut",
        searchPets:"Utils/SearchPets",
        petDetails:"Utils/GetPetDetails",
        getPetTypes:"Utils/GetAllPetTypes",
        getBreeds:"Utils/GetBreedListByString",
        getCities:"Utils/GetCityListByCountry",
        getAreaList:"Utils/GetAreaListByCity",
        userTypes:"Utils/GetAllUserTypes",
        countryList:"Utils/GetAllCountryList",
        uploadFile:"Utils/UploadFile",
        register:"MobileAccount/Register",
        forgotPassword:"MobileAccount/ForgotPassword"

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
