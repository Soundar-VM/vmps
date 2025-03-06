import React,{useEffect} from "react";
import { Avatar ,Tooltip } from "radix-ui";
import Cookies from "universal-cookie";
import userLoginStatus from "../store/userLoginStatus";
import './avatar.css'
import { IoPerson } from "react-icons/io5";


const AvatarDemo = () => {
	const {loginStatus,loginUserEmail}=userLoginStatus();
	
return(

	<div>
		<Tooltip.Root>
		<Tooltip.Trigger>
		<Avatar.Root className="inline-flex size-[35px] select-none items-center justify-center overflow-hidden rounded-full align-middle me-4">
			<Avatar.Fallback className="leading-1 flex size-full items-center justify-center text-[20px] bg-black font-medium text-violet11">
			{ loginStatus?loginUserEmail.slice(0,2):<IoPerson />}	
			</Avatar.Fallback>
		</Avatar.Root>
			
		</Tooltip.Trigger>	

		<Tooltip.Content side="top">
			Logged in as {loginStatus?loginUserEmail:''}
			<Tooltip.Arrow />
		</Tooltip.Content>
	</Tooltip.Root>
	
	</div>

);
}
	

export default AvatarDemo;
