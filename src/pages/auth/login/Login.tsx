
import React, { useState, ChangeEvent } from "react";
// import GoogleOAuthButton from "./Google";
import AW_API from '@appwrite/api';
import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import GoogleOAuthButton from "./Google";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const {auth, setAuth} = useAuth()

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async() => {
    try {
      const res:any =  await AW_API.loginDaredevilAccount(formData.email, formData.password)
      console.log(res);
      
      const account = await AW_API.getAccount()

      console.log(account);
      
      if(res.current){
        setAuth({user:{id:account.$id, name:account.name, email:account.email, joined_at:account.createdAt}})
        console.log(auth);
        
        navigate('/dashboard/home')
      }
      
    } catch (error) {
      
    }
    console.log("Form Data:", formData);

  };

  return (
    <div>
     
      <Input
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      >
        Email
      </Input>
      <Input
        name="password"
        value={formData.password}
        onChange={handleInputChange}
      >
        Password
      </Input>
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
};

export default Login;
