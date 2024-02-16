import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('login') === 'true');
  const navigate = useNavigate();
  const [product1,setproduct1]=useState([])
 console.log("product1",product1)


  const login = () => {
    localStorage.setItem('login', 'true');
    setIsLogin(true);
  
  };

  const logout = () => {
    localStorage.setItem('login', 'false');
    setIsLogin(false);
     
      navigate('/');
  };
  
  const setproductAuth=(product)=>{
   setproduct1(product)
  }

  

 

  return (
    <AuthContext.Provider value={{ isLogin, login, logout,setproductAuth,product1 }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
