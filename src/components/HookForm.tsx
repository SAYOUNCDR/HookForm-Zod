import { useForm } from "react-hook-form"
import "../styles/HookForm.css";
export const HookForm = () => {
    type Gender = "male" | "female" | "other";

    type FormData = {
        firstname: string;
        email: string;
        password: string;
        gender: Gender;
        age: number;
        terms: boolean;
    };
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log("Data", data);
    }
    return (
        <>
            <h2>React Hook form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label >First Name</label>
                    <input {...register("firstname", {
                        required: "Enter Valid first name",
                        maxLength: {
                            value: 20,
                            message: "First name should be less than 20 charactres"
                        },
                        minLength: {
                            value: 2,
                            message: "First name should be more than 2 characters"
                        },
                        pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "First name cannot contain numbers"
                        },
                        validate: (value) => {
                            if (value.toLowerCase() === "admin") {
                                return "First name 'Admin' is not allowed";
                            }
                            return true;
                        }
                    })} type="text" placeholder='Enter Your Name' />

                    {errors.firstname?.message && <span className='error'>{errors.firstname.message}</span>}
                </div>

                <div className='form-group'>
                    <label>Email</label>
                    <input {...register("email", {
                        required: "Enter Valid Email",
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter Valid Email"
                        }
                    })} type="email" placeholder='Enter Your Email' />

                    {errors.email?.message && <span className='error'>{errors.email.message}</span>}
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input {...register("password", {
                        required: "Enter Valid Password",
                        minLength: {
                            value: 6,
                            message: "Password should be at least 6 characters"
                        },
                        validate: (value) => {
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return true;
                        }
                    })} type="password" placeholder='Enter Your Password' />

                    {errors.password?.message && <span className='error'>{errors.password.message}</span>}
                </div>

                <div className='form-group'>
                    <label>Gender</label>
                    <select {...register("gender", {
                        required: "Select Your Gender",
                        validate: (value) => {
                            if (["male", "female", "other"].includes(value)) {
                                return true;
                            }
                            return "Invalid gender";
                        }
                    })}>
                        <option value="">Select one</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    {errors.gender?.message && <span className='error'>{errors.gender.message}</span>}
                </div>

                <div className='form-group'>
                    <label>Age</label>
                    <input {...register("age", {
                        required: "Enter Valid Age",
                        min: {
                            value: 18,
                            message: "Age must be at least 18"
                        },
                        validate: (value) => {
                            if (value < 0) {
                                return "Age must be a positive number";
                            }
                            return true;
                        }
                    })} type="number" placeholder='Enter Your Age' />

                    {errors.age?.message && <span className='error'>{errors.age.message}</span>}
                </div>


                <input type="checkbox" id="newsletter" {...register("terms", {
                    required: "You must accept the terms and conditions",
                })} />
                <label htmlFor="newsletter" className='cbox'>Terms and Conditions</label>
                {errors.terms?.message && <span className='error'>{errors.terms.message}</span>}

                <div className='form-group'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}
