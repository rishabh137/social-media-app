import { NavLink } from "react-router-dom";
import { useState } from "react";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";

import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullname: "",
        password: "",
    });

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async ({ email, username, fullname, password }) => {
            try {
                const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, username, fullname, password })
                })

                const data = await res.json()
                if (res.status === 201) {
                    toast.success("Account created successfully");
                    return data;
                } else {
                    throw new Error(data.error || "Unknown server error");
                }

            } catch (error) {
                toast.error(error.message)
            }
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData)
        setFormData({ email: "", username: "", fullname: "", password: "" })
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
            <div className='flex-1 hidden lg:flex items-center  justify-center'>
                <h1 className=' lg:w-2/3 fill-white' style={{ fontSize: "30rem" }}>T</h1>
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <h1 className='w-24 lg:hidden fill-white text-8xl'>T</h1>
                    <h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            required={true}
                            autoComplete="off"
                            type='email'
                            className='grow'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                    <div className='flex gap-4 flex-wrap'>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <FaUser />
                            <input
                                required={true}
                                autoComplete="off"
                                type='text'
                                className='grow '
                                placeholder='Username'
                                name='username'
                                onChange={handleInputChange}
                                value={formData.username}
                            />
                        </label>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <MdDriveFileRenameOutline />
                            <input
                                required={true}
                                autoComplete="off"
                                type='text'
                                className='grow'
                                placeholder='Full Name'
                                name='fullname'
                                onChange={handleInputChange}
                                value={formData.fullname}
                            />
                        </label>
                    </div>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdPassword />
                        <input
                            required={true}
                            autoComplete="off"
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className='btn rounded-full btn-primary text-white'>
                        {isPending ? "Loading..." : "Sign up"}
                    </button>
                    {isError && <p className='text-red-500'>{error.message}</p>}
                </form>
                <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
                    <p className='text-white text-lg'>Already have an account?</p>
                    <NavLink to='/login'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
                    </NavLink>
                </div>
            </div>
        </div >
    );
};
export default SignUpPage;