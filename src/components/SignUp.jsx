import React ,{useState,useeffect}from "react";
import { useForm } from "react-hook-form";
import { GrLinkPrevious } from "react-icons/gr";
import OtpInput from 'react-otp-input';
import { Tabs } from "radix-ui";
import './SignUp.css';
import signUpToggle from "../store/signUpToggle";

 function SignUp() {
     const [otp, setOtp] = useState('');
     const { signUpStatus,signUpStatusToggle } = signUpToggle();
     console.log(signUpStatus);
     

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

//   console.log(watch("example")); x

  return (
    <div className=" py-2 fixed top-16 right-0 h-full bg-black w-[95%]" style={{maxWidth:"350px",display:signUpStatus?"block":"none",zIndex:"999"}}>
      <div className="flex justify-between py-2 mb-2 px-5">
            <button onClick={signUpStatusToggle}>
             <GrLinkPrevious />
            </button>
        <h3>Signup</h3>
      </div>

      <Tabs.Root className="TabsRoot" defaultValue="tab1">
		
			
		<Tabs.Content className="TabsContent" value="tab1">
			<h1 className="text-[22px] mb-5">
				Contact Details
			</h1>
            
               <div className="p-3">
               <label htmlFor="username" className="pb-2 block">Username</label>
                <input placeholder="Username" id="username" {...register("username")} />
                     {errors.username && <span>This field is required</span>}
                <div className="grid grid-cols-2 gap-4">
                    <div className="phone-1">
                        <label htmlFor="phone1" className="pb-2 block">phone number</label>
                        <input placeholder="" id="phone1" {...register("phone1")} />
                    </div>
                    <div className="phone-1">
                        <label htmlFor="phone2" className="pb-2 block">Alternate No</label>
                        <input placeholder="" id="phone2" {...register("phone2")} />
                    </div>
                    
                </div>
                    {errors.phone1 && <span>This field is required</span>}
                    <label  >Email ID</label>
                    <div>
                        <label htmlFor="email hs-trailing-button-add-on" className="pb-2 block sr-only">Label</label>
                        <div class="flex rounded-lg shadow-sm">
                        <input type="text" id="hs-trailing-button-add-on" placeholder="email"  {...register("email")} name="hs-trailing-button-add-on" className="block w-full !border-e-0 !rounded-tr-none !rounded-br-none" />
                        <button type="button" className="p-2 inline-flex justify-center items-center text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none h-50" style={{height:"37px"}}>
                            Verify
                        </button>
                        </div>
                    </div>
                    {/* <input /> */}
                    {errors.email && <span>This field is required</span>}
                    <div style={{display:"none"}}>
                    <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>&nbsp;&nbsp;</span>}
                            renderInput={(props) => <input {...props} style={{width:"2rem",textAlign:"center"}}/>}
                            
                            />

                    </div>
               </div>
                    
        
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="tab2">
                    <p className="Text">
                        Address Details
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="pincode" className="pb-2 block">Pincode</label>
                    <input  id="pincode" {...register("pincode")} />
                    {errors.username && <span>Pincode is required</span>}
                    </div>
                    <div>
                        <label htmlFor="country" className="pb-2 block">Country</label>
                    <input  id="country" {...register("country")} />
                    {errors.username && <span>Country is required</span>}
                    </div>
                </div> 
                        <label htmlFor="address1" className="pb-2 block">Permanent Address</label>
                    <textarea id="address1" {...register("address1")}></textarea>
                        {/* <label htmlFor="address2">Alternate Address</label>
                    <textarea placeholder="Alternate Address" id="address2" {...register("address2")}></textarea> */}
                
                    {errors.phone1 && <span>This field is required</span>}
                   
                    <div
                        style={{ display: "flex", marginTop: 20, justifyContent: "flex-end" }}
                    >
                        <button className="Button green">Submit</button>
                    </div>
                </Tabs.Content>
        <Tabs.List className="TabsList" aria-label="Manage your account">
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
