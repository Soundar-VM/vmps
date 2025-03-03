import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiCheckMark } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { GrLinkPrevious } from "react-icons/gr";
import OtpInput from "react-otp-input";
import { Tabs } from "radix-ui";
import "./signup.css";
import signUpToggle from "../store/signUpToggle";

function SignUp() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSet, setEmailSet] = useState(false);
  const [otpHide, setOtpHide] = useState(true);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState("");
  const { signUpStatus, signUpStatusToggle } = signUpToggle();
  const [countDownTime, setCountDownTime] = useState({
    minutes: 0,
    seconds: 0,
  });
  const [isCounting, setIsCounting] = useState(false);

  const otpResponse = async () => {
    await axios
      .post("https://myhitech.digitalmantraaz.com/api/verfiy-otp", {
        email,
        otp,
      })
      .then((otp) => {
        console.log(otp);
        setEmailSet(true);
        setOtpHide(true)
        
        if(otp.status==200){
          console.log("helllo");
          
        }
        setOtpError(otp.data.message);
      })
      .catch((error) => {
        console.log("Error verifying OTP:", error);
        setOtpError(error.response.data.message);
      });
  };

  useEffect(() => {
    if (otp.length == 6) {
      setOtpSent(true);
      setOtpError("please wait...");
      otpResponse();
    } else {
      setOtpError("");
      setOtpSent(false);
    }
  }, [otp]);

  useEffect(() => {
    if (!isCounting) return;

    const interval = setInterval(() => {
      setCountDownTime((prevTime) => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(interval);
          setIsCounting(false);
          setEmailSet(false);
          return { minutes: 0, seconds: 0 };
        }

        const newSeconds = prevTime.seconds === 0 ? 59 : prevTime.seconds - 1;
        const newMinutes =
          prevTime.seconds === 0 ? prevTime.minutes - 1 : prevTime.minutes;

        return { minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCounting]);

  async function sendVerifyCode() {
    setOtp("");
    setOtpSent("");
    try {
      const response = await axios.post(
        "https://myhitech.digitalmantraaz.com/api/verfiy-mail",
        { email }
      );
      const responseData = response.data;

      if (responseData.success) {
        setCountDownTime({ minutes: 0, seconds: 10 });
        setIsCounting(true);
        setEmailSet(true);
        setOtpHide(false);
        setEmailError("");
      } else {
        setEmailSet(false);
        setEmailError(responseData.message);
      }
    } catch (error) {
      setEmailError(error.response.data.message);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();


  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) 


  return (
    <div
      className="p-5 fixed top-16 right-0 h-full bg-black w-100 z-3"
      style={{ display: signUpStatus ? "block" : "none" }}
    >
      <div className="flex justify-between mb-2">
        <button onClick={signUpStatusToggle}>
          <GrLinkPrevious />
        </button>
        <h1 className="text-[20px] mb-5">Register</h1>
      </div>

      {/* <h1 className="text-[22px] mb-5">Contact Details</h1> */}
<form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* <label htmlFor="name" className="pb-2 block">
        Name
        </label> */}
        <input placeholder="Name" id="name" {...register("name",{ required: true })} />
        {errors.name && <span className="error">Name is manditory</span>}

        <div className="grid grid-cols-2 gap-4">
          <div>
            {/* <label htmlFor="phone1" className="pb-2 block">
              Phone Number
            </label> */}
            <input placeholder="Phone Number *" id="phone1" {...register("phone1",{ required: true })} />
          </div>
          <div>
            {/* <label htmlFor="phone2" className="pb-2 block">
              Alternate No
            </label> */}
            <input placeholder="Phone Number" id="phone2" {...register("phone2",{ required: true })} />
          </div>
        </div>
        {errors.phone1 && <span className="error">* Phone Number is manditory</span>}

        {/* <label>Email ID</label> */}
        <div>
          <div className="flex shadow-sm">
            <input
              type="text"
              placeholder="Email ID"
              disabled={emailSet}
              {...register("email",{ required: true })}
              className="block w-full !border-e-0 !rounded-tr-none !rounded-br-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button
              type="button"
              disabled={emailSet}
              className={`px-2 bg-${otpError ? "red" : "blue"}-600 text-white hover:bg-${otpError ? "blue" : "red"}-700 disabled:opacity-50 h-[36px]`}
              onClick={sendVerifyCode}
            >
              {otpError?<GiCheckMark />:"Verify"}
            </button>
          </div>
          {errors.email && <span className="error">Email is manditory</span>}
        </div>
        {/* {errors.email && <span className="error">Email is required</span>} */}
        <span className="text-start !mb-0 text-red-500 font-bold">{emailError}</span>
        <p className="text-start mb-1 text-green-600" style={{ display: isCounting ? "block" : "none" }}>
          OTP has been sent (Resend OTP in {countDownTime.minutes}:
          {countDownTime.seconds < 10
            ? `0${countDownTime.seconds}`
            : countDownTime.seconds}
          )
        </p>
        {otpHide ? (
          ""
        ) : (
          <div className="mt-0">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={{ justifyContent: "center" }}
              renderSeparator={<span className="error">&nbsp;&nbsp;</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{ width: "2rem", textAlign: "center" }}
                  type="number"
                />
              )}
            />
            <p className="text-center text-green-600 text-[15px]">
              {otpSent ? "" : "Enter OTP"}
            </p>
          </div>
        )}
        <p className="text-center text-yellow-600 text-[15px]">{otpError}</p>
        {/* <hr className="my-5"/> */}
      {/* <h1 className="text-[22px] mb-5">Contact Details</h1> */}

      {/* <label htmlFor="address1" className="pb-2 block">
        Address
      </label> */}
      <textarea id="address" placeholder="Address" {...register("address", { required: "Address is Manditory" })}></textarea>
      {errors.address && <span className="error">Address is required</span>}
      <div className="grid grid-cols-2 gap-4">
        <div>
          {/* <label htmlFor="pincode" className="pb-2 block">
            Pincode
          </label> */}
          <input id="pincode" placeholder="Pincode" {...register("pincode",{ required: true })} />
          {errors.pincode && <span className="error">Pincode is required</span>}
        </div>
        <div>
          {/* <label htmlFor="country" className="pb-2 block">
            State
          </label> */}
          <input id="State" placeholder="State" {...register("State",{ required: true })} />
          {errors.State && <span className="error">State is required</span>}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "center",
        }}
      >
       
        <button className="bg-green-600 px-3 py-2 green" style={{borderRadius:"none"}} type="submit">Register</button>
      </div>
      </form>
        <p className="text-center mt-4 text-gray-500">Already have account? / <span className="text-green-500">Login Here</span></p>
    </div>
  );
}

export default SignUp;
