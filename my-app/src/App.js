import React from "react"
import SignIn from "./SignInSide";
import SignUp from "./SignUpSide";
import Profile from "./Profile"
import HomePage from "./homepage";
import Event from "./Event";

import CommunitySignUp from "./CommunitySignUp"
import CommunitySignIn from "./CommunitySignIn"
import CommunityHomePage from "./CommunityHomePage";

import EntryPage from "./EntryPage";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
                <Routes>    
                    <Route path="/" element={<EntryPage />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/homePage" element={<HomePage />} />
                    <Route path="/event" element={<Event />} />

                    <Route path="/CommunitySignUp" element={<CommunitySignUp />} />
                    <Route path="/CommunitySignIn" element={<CommunitySignIn />} />
                    <Route path="/CommunityHomePage" element={<CommunityHomePage />} />

                </Routes>
        </BrowserRouter>


    );

}

export default App;