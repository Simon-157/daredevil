import React, { useState, ChangeEvent } from "react";
// import GoogleOAuthButton from "./Google";
import AW_API from '@appwrite/api';
import Button from "@components/button/Button";
import Input from "@components/input/Input";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    username: "",
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
      const res:any = await AW_API.createDaredevilAccount(formData.username, formData.email, formData.password)
      console.log(res);
      if(res.status){
        alert('account created')
        navigate('/login')

      }
      
    } catch (error) {
      console.log(error);
      
    }
    console.log("Form Data:", formData);

  };

  return (
    <div>
      {/* <GoogleOAuthButton /> */}
      <Input
      placeholder = "username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
      >
        Username
      </Input>
      <Input
      placeholder = "email"
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
      <Button onClick={handleSubmit}>Register</Button>
    </div>
  );
};

export default Register;
