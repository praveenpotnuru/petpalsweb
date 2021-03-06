export interface EnvironmentConfig {
    production: boolean;
    apiURL: string;
    defaultCountryId: number;
    apiEndPoints: {
        signin: string;
        signOut: string;
        searchPets: string;
        petDetails: string;
        getPetTypes: string;
        getBreeds: string;
        getCities: string;
        getAreaList: string;
        userTypes: string;
        countryList: string;
        uploadFile: string;
        register: string;
        forgotPassword: string;
        myrequests: string;
        withdrawrequests: string;
        myPets: string;
        addToFavourites: string;
        deletePet: string;
        savePet: string;
        updatePet: string;
        myPetDetails: string;
        boardingRequest: string;
        addWalkerRequest:string;
        addTrainingRequest:string;
        addRescuerRequest:string;
        addAdoptionRequest:string;
        addSpaRequest:string;
        addCabRequest:string;
        addVolunteersRequest:string;
        contactus:string;
        updateprofile:string;
        getMyProfile:string;
        getPetNews:string;
        getBoardingRequestDetails:string;
    }

}