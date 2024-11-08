import React from 'react';
import {  signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
 
function Logout() {
    const navigate = useNavigate();
 
    const handleLogout = () => {              
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
 
    return(
        <>
            <nav> 
                <div>
                    <button class="bg-red-800" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}
 
export default Logout