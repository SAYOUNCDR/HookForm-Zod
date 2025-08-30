import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import "../styles/HookForm.css";
import { z } from "zod"

export const HookFormZod = () => {

    const formSchema = z.object({
        firstname: z.string()
            .min(2, "First name should be more than 2 characters")
            .max(20, "First name should be less than 20 characters")
            .regex(/^[A-Za-z]+$/, "First name cannot contain numbers")
            .refine((val) => val.toLowerCase() !== "admin", "First name 'Admin' is not allowed"),

        email: z.string()
            .min(1, "Enter Valid Email"),

        password: z.string()
            .min(6, "Password should be at least 6 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),


        gender: z.string().min(1, "Select Your Gender").refine(
            (val) => ["male", "female", "other"].includes(val),
            "Invalid gender selection"
        ),

        age: z.number({
            message: "Enter Valid Age",
        }).min(18, "Age must be at least 18"),

        terms: z.boolean().refine((val) => val === true, "You must accept the terms and conditions")
    });

    type FormData = z.infer<typeof formSchema>;

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });

    const onSubmit = (data: FormData) => {
        console.log("Data", data);
    }

    return (
        <>
            <h2>React Hook form Zod</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <label>First Name</label>
                    <input
                        {...register("firstname")}
                        type="text"
                        placeholder='Enter Your Name'
                    />
                    {errors.firstname?.message && <span className='error'>{errors.firstname.message}</span>}
                </div>

                <div className='form-group'>
                    <label>Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder='Enter Your Email'
                    />
                    {errors.email?.message && <span className='error'>{errors.email.message}</span>}
                </div>

                <div className='form-group'>
                    <label>Password</label>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder='Enter Your Password'
                    />
                    {errors.password?.message && <span className='error'>{errors.password.message}</span>}
                </div>

                <div className='form-group'>
                    <label>Gender</label>
                    <select {...register("gender")}>
                        <option value="">Select one</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender?.message && <span className='error'>{errors.gender.message}</span>}
                </div>

                <div className='form-group'>
                    <label>Age</label>
                    <input
                        {...register("age", { valueAsNumber: true })}
                        type="number"
                        placeholder='Enter Your Age'
                    />
                    {errors.age?.message && <span className='error'>{errors.age.message}</span>}
                </div>

                <input
                    type="checkbox"
                    id="newsletter"
                    {...register("terms")}
                />
                <label htmlFor="newsletter" className='cbox'>Terms and Conditions</label>
                {errors.terms?.message && <span className='error'>{errors.terms.message}</span>}

                <div className='form-group'>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}