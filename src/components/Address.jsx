import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrLinkPrevious } from "react-icons/gr";
import { useForm } from 'react-hook-form';
import profileToggle from "../store/profileToggle.js";
import userLoginStatus from "../store/userLoginStatus";
import address from "../store/address.js";

function Address() {
    const { toggleProfileStatus } = profileToggle();
    const { loginUserEmail } = userLoginStatus();
    const {addressStatus,toggleAddressStatus} = address();
    const [userAddress, setUserAddress] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
        getUserAddress();
    }, []);

    const getUserAddress = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post("https://myhitech.digitalmantraaz.com/api/getuser", { email: loginUserEmail });
            if (response.data && response.data.data) {
                setUserAddress(response.data.data);
                setIsEditing(false);
            } else {
                setIsEditing(true);
            }
        } catch (error) {
            console.error("Error fetching user address:", error);
            setError("Failed to fetch address. Please try again.");
            setIsEditing(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userAddress) {
            setValue("name", userAddress.name || "");
            setValue("phone", userAddress.phone || "");
            setValue("altphone", userAddress.altphone || "");
            setValue("address", userAddress.address || "");
            setValue("pincode", userAddress.pincode || "");
            setValue("state", userAddress.state || "Tamil Nadu");
        }
    }, [userAddress, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("https://myhitech.digitalmantraaz.com/api/register", { ...data, email: loginUserEmail });
            if (response.status === 200) {
                setUserAddress(data);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Update failed", error);
            setError("Failed to update address. Please try again.");
        }
    };

    return (
        <>
            <div className="flex justify-between mb-2">
                <button onClick={() =>{toggleAddressStatus(false);toggleProfileStatus(false);} }>
                    <GrLinkPrevious />
                </button>
                <h1 className="text-[20px] mb-5">My Address</h1>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : !isEditing && userAddress && Object.values(userAddress).some(value => value)? (
                <div id="storeaddress" className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <div className="p-4 border border-gray-300 rounded-lg bg-white">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">Saved Address</h2>
                        <p className="text-gray-600"><strong>Name:</strong> {userAddress?.name}</p>
                        <p className="text-gray-600"><strong>Phone:</strong> {userAddress?.phone}</p>
                        <p className="text-gray-600"><strong>Alternate Phone:</strong> {userAddress?.altphone}</p>
                        <p className="text-gray-600"><strong>Address:</strong> {userAddress?.address}</p>
                        <p className="text-gray-600"><strong>Pincode:</strong> {userAddress?.pincode}</p>
                        <p className="text-gray-600"><strong>State:</strong> {userAddress?.state}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => setIsEditing(true)}>
                            Edit Address
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <input placeholder="Name" {...register("name", { required: "Name is required" })} />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Phone Number *" {...register("phone", { required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Invalid phone number" } })} />
                        <input placeholder="Alternate Number" {...register("altphone")} />
                    </div>
                    {errors.phone && <span className="error">{errors.phone.message}</span>}

                    <textarea placeholder="Delivery Address" {...register("address", { required: "Address is required" })}></textarea>
                    {errors.address && <span className="error">{errors.address.message}</span>}

                    <div className="grid grid-cols-2 gap-4">
                        <input type="number" placeholder="Delivery Pincode" {...register("pincode", { required: "Pincode is required" })} />
                        <input type="text" placeholder="Delivery State" {...register("state", { required: "State is required" })} />
                    </div>
                    {errors.pincode && <span className="error">{errors.pincode.message}</span>}
                    {errors.state && <span className="error">{errors.state.message}</span>}

                    <div className="flex justify-center mt-4">
                        <button className="bg-green-600 text-white px-3 py-2 rounded-md" type="submit">Save Address</button>
                        <button className="bg-gray-500 text-white px-3 py-2 rounded-md ml-4" onClick={() => setIsEditing(false)} type="button">Cancel</button>
                    </div>
                </form>
            )}
        </>
    );
}

export default Address;
