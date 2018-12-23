export interface EnvironmentConfig {
    production: boolean;
    apiURL: string;
    apiEndPoints: {
        signin: string;
        signOut:string;
        searchPets:string;
        petDetails:String;
        getPetTypes:string;
        getBreeds:string;
        getCities:string;
        getAreaList:string;
        userTypes:string;
        countryList:string;
        uploadFile:string;
    }

}