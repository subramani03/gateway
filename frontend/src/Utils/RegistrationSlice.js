import { createSlice } from "@reduxjs/toolkit";

const RegistrationSlice = createSlice({
    name:'Registration',
    initialState:false,
    reducers:{
        openRegistration:()=>{
            return false;
        },
        CloseRegistration:()=>{
            return true;
        }
    }
});

export const {openRegistration,CloseRegistration}=RegistrationSlice.actions;
export default RegistrationSlice.reducer;

