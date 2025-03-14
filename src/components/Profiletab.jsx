import React from 'react';
import { GrLinkPrevious } from "react-icons/gr";
import profileToggle from "../store/profileToggle.js";
import profile from '../store/profile.js';

function Profiletab() {
    const {profileStatus,toggleProfileStatus}= profileToggle();
    const {profileStatuss,toggleProfile}= profile();
  return (
    <div >
          <div className="flex justify-between mb-2">
                  <button onClick={() =>{toggleProfileStatus(false);toggleProfile(false);}}>
                    <GrLinkPrevious />
                  </button>
        <h1 className="text-[20px] mb-5">My Profile</h1>
        </div>
        
    </div>

  )
}

export default Profiletab