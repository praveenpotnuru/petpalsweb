export interface EnvironmentConfig {
    production: boolean;
    apiURL: string;
    apiEndPoints: {
        signin: string;
        signOut:string;
        searchPets:string;
        petDetails:String
    }

}