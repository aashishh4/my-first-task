import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

function Login() {

  const { login ,setproductAuth} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const[productapi,setproductapi]=useState([])
  // console.log('isLoading', isLoading)
  console.log("productapi",productapi)
  const navigate = useNavigate();



  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submit(values);
    },
  });

  // const product = [
  //   {
  //     "id": 1,
  //     "product_name": "Heather Leavesley: Journaling for Higher Self-Ebook",
  //     "product_slug": "heather-leavesley-journaling-for-higher-self",
  //     "pdf_link": "https://heyzine.com/flip-book/3c9face667.html"
  //   },
  //   {
  //     "id": 2,
  //     "product_name": "IFS Beyond the Therapy Room",
  //     "product_slug": "ifs-beyond-the-therapy-room",
  //     "pdf_link": "https://heyzine.com/flip-book/10cd58e6f8.html"
  //   }];

  

  function submit(values) {
    const obj = {
      email: values.email,
      password: values.password,
    };
    setIsLoading(true);
    axios
      .post('http://144.126.210.187:8088/api/login-user', obj)
      .then((res) => {
   

        // setproductAuth(product);
        // localStorage.setItem('Book-Details', JSON.stringify(product));
        if (res.data.status === true) {
          const productData = res.data.data.product;
      setproductapi(productData);
      setproductAuth(productData);
      localStorage.setItem("Product-Api", JSON.stringify(productData));
          setIsLoading(false);
          toast.success("Login Sucessfully")
          setTimeout(() => {
            login();
            navigate('/bookpage');
          }, 2000);
        } else {
          toast.error(res?.data?.message);
          setIsLoading(false)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.error('Login failed', error);
        toast.error(error?.data?.message);

      })
      ;
  }

  return (
    <>
      <div className="MainLogo">
        <img src="logoas.svg" alt="Logo" />
      </div>
      <div className="LoginPage">
        <h1>Log in</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="LoginInput">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div id='errormsg' style={{ color: 'red' }}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="LoginInput">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div id='errormsg' style={{ color: 'red' }}>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="LoginInput">
            <button type="submit">Login</button>


          </div>
        </form>
        {isLoading && <div className='Loading'><div className="loader">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div></div>}

        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
