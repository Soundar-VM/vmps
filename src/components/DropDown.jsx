import * as React from "react";
import { DropdownMenu } from "radix-ui";
import {
	ChevronRightIcon,
} from "@radix-ui/react-icons";
import AvatarDemo from './AvatarDemo';
import profileToggle from "../store/profileToggle";
import myorder from "../store/myorder";
import userLoginStatus from "../store/userLoginStatus";
import loginOffcanvas from "../store/loginOffcanvas";
import cartToggle from "../store/cartToggle";
import theme from "../store/theme";
import profile from "../store/profile";
import address from "../store/address";

const DropDown = () => {
    const {themeStatus,setTheme}= theme();
    const {cartStatusToggle,cartStatus}= cartToggle();
    const {loginOffcanvasStatusToggle,loginOffcanvasStatus} = loginOffcanvas();
	const {orderStatus,toggleMyorderStatus}= myorder();
    const {profileStatuss,toggleProfile}= profile();
	const {addressStatus,toggleAddressStatus}= address();
    const {profileStatus,toggleProfileStatus}= profileToggle();
    const {loginStatus,logout}=userLoginStatus();

	const handleProfileClick = () => {
		if (loginStatus) {
			if (!profileStatuss) {
				cartStatus && cartStatusToggle();
				toggleProfile(true);
				toggleMyorderStatus(false);
				toggleAddressStatus(false);
				!profileStatus&&toggleProfileStatus(true);
			}
		} else {
			cartStatus && cartStatusToggle();
			loginOffcanvasStatusToggle();
		}
	};
	const handleAddressClick = () => {
		if (loginStatus) {
		  if (!addressStatus) {
			cartStatus && cartStatusToggle();
			console.log(profileStatus);
			
			// Batch state updates together
			toggleAddressStatus(true);
			if (!profileStatus) toggleProfileStatus(true);
			toggleProfile(false);
			toggleMyorderStatus(false);
		  }
		} else {
		  cartStatus && cartStatusToggle();
		  
		  if (!loginOffcanvasStatus) {
			loginOffcanvasStatusToggle();
		  }
		}
	  };
	  
	const handleOrderClick = () => {
		if (loginStatus) {
			if (!orderStatus) {
				cartStatus && cartStatusToggle();
				toggleMyorderStatus(true);
				!profileStatus&&toggleProfileStatus(true);
				  toggleAddressStatus(false);
				  toggleProfile(false);
			}
		  } else {
			cartStatus && cartStatusToggle();
			loginOffcanvasStatusToggle();
		  }
	};

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					className="inline-flex size-[35px] items-center justify-center text-violet11 outline-none"
					aria-label="Customise options"
				>
					<AvatarDemo/>
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className="min-w-[100px] bg-black p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
					sideOffset={5}
				>
					<DropdownMenu.Item className="group relative flex h-[35px] select-none items-center  pl-[25px] pr-[5px] text-[15px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1" onClick={handleProfileClick}>Profile</DropdownMenu.Item>
		<DropdownMenu.Item className="group relative flex h-[35px] select-none items-center  pl-[25px] pr-[5px] text-[15px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1" onClick={handleOrderClick}>My Orders</DropdownMenu.Item>
					<DropdownMenu.Item className="group relative flex h-[35px] select-none items-center  pl-[25px] pr-[5px] text-[15px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1" onClick={handleAddressClick}>My Address</DropdownMenu.Item>
					
					<DropdownMenu.Sub>
						<DropdownMenu.SubTrigger className="group relative flex h-[35px] select-none items-center  pl-[25px] pr-[5px] text-[15px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:data-[state=open]:bg-violet9 data-[state=open]:bg-violet4 data-[disabled]:text-mauve8 data-[highlighted]:data-[state=open]:text-violet1 data-[highlighted]:text-violet1 data-[state=open]:text-violet11">
							Change Theme
							<div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
								<ChevronRightIcon />
							</div>
						</DropdownMenu.SubTrigger>
						<DropdownMenu.Portal>
							<DropdownMenu.SubContent
								className="min-w-[220px] rounded-md bg-black p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
								sideOffset={2}
								alignOffset={-5}
							>
								<DropdownMenu.Item className="group relative flex h-[35px] select-none items-center  pl-[25px] pr-[5px] text-[15px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1" onClick={()=>setTheme('dark')}>
									Dark
								</DropdownMenu.Item>
								<DropdownMenu.Item className="relative flex h-[35px] select-none items-center  pl-[25px] pr-[5px] text-[15px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1" onClick={()=>setTheme('light')}>
									Light
								</DropdownMenu.Item>
							</DropdownMenu.SubContent>
						</DropdownMenu.Portal>
					</DropdownMenu.Sub>

					<DropdownMenu.Separator className="m-[5px] h-px bg-gray-500" />
                    
                    {loginStatus?<DropdownMenu.Item className="group relative flex h-[35px] select-none items-center  pl-[25px] pr-[5px] text-[15px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1" onClick={() => {
  if (loginStatus) {
    logout();
    toggleProfileStatus(false);
  }
}}>
						Logout
						
					</DropdownMenu.Item>:<DropdownMenu.Item className="group relative flex h-[35px] select-none items-center  pl-[25px] pr-[5px] text-[15px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1" onClick={()=>{!(loginOffcanvasStatus)?loginOffcanvasStatusToggle():null;(cartStatus)?cartStatusToggle():null}}>
						Login
						
					</DropdownMenu.Item>}
                    
                    

					
                 

					
					

					<DropdownMenu.Arrow className="fill-white" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

export default DropDown;
