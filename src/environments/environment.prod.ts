import { EnvironmentConfig } from "./i.config";

export const environment : EnvironmentConfig = {
  production: false,
  apiURL: "http://app.petpals.love/staging/api/",
    apiEndPoints: {
        signin: "MobileAccount/Login",
        signOut: "MobileAccount/LogOut",
        searchPets:"Utils/SearchPets",
        petDetails:"Utils/GetPetDetails"
    }

};
