import { create } from "zustand";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const getLoginEmail = () => cookies.get("userCookieEmail") || null;
console.log(getLoginEmail);


const userLoginStatus = create((set) => ({
  loginStatus: !!getLoginEmail(), 
  setLoginStatus: () => set((state) => ({ loginStatus: !state.loginStatus })),
  loginUserEmail: getLoginEmail()||null,
  
  setLogin: (email) => {
    cookies.set("userCookieEmail", email, { path: "/" });
    set({ loginStatus: true, loginUserEmail: email });
  },

  logout: () => {
    cookies.remove("userCookieEmail", { path: "/" });
    set({ loginStatus: false, loginUserEmail: null });
  },
}));

export default userLoginStatus;
