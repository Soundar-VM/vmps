import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { GrLinkPrevious } from "react-icons/gr";
import OtpInput from "react-otp-input";
import { Tabs } from "radix-ui";
import "./SignUp.css";
import signUpToggle from "../store/signUpToggle";

function SignUp() {
  const [email, setEmail] = useState("");
  const [emailSet, setEmailSet] = useState(false);
  const [otp, setOtp] = useState("");
  const { signUpStatus, signUpStatusToggle } = signUpToggle();

  const [countDownTime, setCountDownTime] = useState({ minutes: 0, seconds: 0 });
  const [otpExpireTime, setOtpExpireTime] = useState(null);
  const intervalRef = useRef(null);

  const updateCountdown = useCallback(() => {
    if (!otpExpireTime) return;

    const now = new Date().getTime();
    const timeDifference = otpExpireTime - now;

    if (timeDifference <= 0) {
      clearInterval(intervalRef.current);
    //   setCountDownTime({ minutes: 0, seconds: 0 });
      setEmailSet(false);
      setEmail('');
      return;
    }

    setCountDownTime({
      minutes: Math.floor((timeDifference / 1000 / 60) % 60),
      seconds: Math.floor((timeDifference / 1000) % 60),
    });
  }, [otpExpireTime]);

  useEffect(() => {
    if (!otpExpireTime) return;

    intervalRef.current = setInterval(updateCountdown, 1000);
    return () => clearInterval(intervalRef.current);
  }, [otpExpireTime, updateCountdown]);

  async function sendVerifyCode() {
    setEmailSet(true);
    try {
      const response = await axios.post(
        "https://myhitech.digitalmantraaz.com/api/verfiy-mail",
        { email }
      );
      const responseData = response.data;

      if (responseData.success) {
        const expireTime = new Date().getTime() + 10 * 1000; // 1 minute countdown
        setOtpExpireTime(expireTime);
      } else {
        setEmailSet(false);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setEmailSet(false);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div
      className="py-2 fixed top-16 right-0 h-full bg-black w-100 z-3"
      style={{ display: signUpStatus ? "block" : "none" }}
    >
      <div className="flex justify-between py-2 mb-2 px-5">
        <button onClick={signUpStatusToggle}>
          <GrLinkPrevious />
        </button>
        <h3>Signup</h3>
      </div>

      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.Content className="TabsContent" value="tab1">
          <h1 className="text-[22px] mb-5">Contact Details</h1>

          <div className="p-3">
            <label htmlFor="username" className="pb-2 block">
              Username
            </label>
            <input placeholder="Username" id="username" {...register("username")} />
            {errors.username && <span>This field is required</span>}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone1" className="pb-2 block">
                  Phone Number
                </label>
                <input placeholder="" id="phone1" {...register("phone1")} />
              </div>
              <div>
                <label htmlFor="phone2" className="pb-2 block">
                  Alternate No
                </label>
                <input placeholder="" id="phone2" {...register("phone2")} />
              </div>
            </div>
            {errors.phone1 && <span>This field is required</span>}

            <label>Email ID</label>
            <div>
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="text"
                  placeholder="email"
                  disabled={emailSet}
                  {...register("email")}
                  className="block w-full !border-e-0 !rounded-tr-none !rounded-br-none"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <button
                  type="button"
                  disabled={emailSet}
                  className="p-2 bg-blue-600 text-white rounded-e-md hover:bg-blue-700 disabled:opacity-50"
                  onClick={sendVerifyCode}
                >
                  Verify
                </button>
              </div>
            </div>
            {errors.email && <span>This field is required</span>}

            {emailSet && (
              <div>
                <p className="text-end mb-1 text-green-600">
                  OTP has been sent (expires in {countDownTime.minutes}:{countDownTime.seconds})
                </p>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>&nbsp;&nbsp;</span>}
                  renderInput={(props) => (
                    <input {...props} style={{ width: "2rem", textAlign: "center" }} />
                  )}
                />
              </div>
            )}
          </div>
        </Tabs.Content>

        <Tabs.Content className="TabsContent" value="tab2">
          <p className="Text">Address Details</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="pincode" className="pb-2 block">
                Pincode
              </label>
              <input id="pincode" {...register("pincode")} />
              {errors.pincode && <span>Pincode is required</span>}
            </div>
            <div>
              <label htmlFor="country" className="pb-2 block">
                Country
              </label>
              <input id="country" {...register("country")} />
              {errors.country && <span>Country is required</span>}
            </div>
          </div>

          <label htmlFor="address1" className="pb-2 block">
            Permanent Address
          </label>
          <textarea id="address1" {...register("address1")}></textarea>

          <div style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}>
            <button className="Button green">Submit</button>
          </div>
        </Tabs.Content>

        <Tabs.List className="TabsList">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Account
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            Password
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
}

export default SignUp;
