import './App.css'
import {useForm} from "react-hook-form"
function App() {

  type FormData = {
  firstname: string;
  email: string;
  password: string;
  gender: string;
  age: number;
  terms: boolean;
};
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  
  const onSubmit = (data: any) => {
    console.log("Data", data);
  }
  return (
    <>
      <h2>React Hook form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label >First Name</label>
          <input {...register("firstname", {
            required: "Enter Valid first name"
          })} type="text" placeholder='Enter Your Name' />

          {errors.firstname?.message && <span className='error'>{errors.firstname.message}</span>}
        </div>

        <div className='form-group'>
          <label>Email</label>
          <input {...register("email")} type="email" placeholder='Enter Your Email' />
        </div>

        <div className='form-group'>
          <label>Password</label>
          <input {...register("password")}type="password" placeholder='Enter Your Password' />
        </div>

        <div className='form-group'>
          <label>Gender</label>
          <select {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className='form-group'>
          <label>Age</label>
          <input {...register("age")} type="number" placeholder='Enter Your Age' />
        </div>

        
        <input type="checkbox" id="newsletter" {...register("terms")} />
        <label htmlFor="newsletter" className='cbox'>Terms and Conditions</label>
        

        <div className='form-group'>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default App
