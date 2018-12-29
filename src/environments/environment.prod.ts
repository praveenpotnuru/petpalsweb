import { EnvironmentConfig } from "./i.config";

export const environment: EnvironmentConfig = {
    production: false,
    apiURL: "http://app.petpals.love/staging/api/",
    defaultCountryId: 24,
    apiEndPoints: {
        signin: "MobileAccount/Login",
        signOut: "MobileAccount/LogOut",
        searchPets: "Utils/SearchPets",
        petDetails: "Utils/GetPetDetails",
        getPetTypes: "Utils/GetAllPetTypes",
        getBreeds: "Utils/GetBreedListByString",
        getCities: "Utils/GetCityListByCountry",
        getAreaList: "Utils/GetAreaListByCity",
        userTypes: "Utils/GetAllUserTypes",
        countryList: "Utils/GetAllCountryList",
        uploadFile: "Utils/UploadFile",
        register: "MobileAccount/Register",
        forgotPassword: "MobileAccount/ForgotPassword"
    }

};
