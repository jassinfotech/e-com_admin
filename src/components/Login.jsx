import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../App.css';
import { BASE_URL } from '../helperFile';

function Login() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    })

    const [passwordshow, setPasswordshow] = useState(false)

    const toglepassword = () => {
        setPasswordshow(!passwordshow);
    }
    const handleChange = e => {
        const { name, value } = e.target

        switch (name) {
            case 'username':
                errors.username =
                    value.length < 5
                        ? 'username is not valid!'
                        : false;
                break;
            case 'password':
                errors.password =
                    value.length < 5
                        ? 'Password must be at least 5 characters long!'
                        : false;
                break;
            default:
                break;
        }
        setUser({
            ...user,
            [name]: value
        })
    }

    const submit = async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user.username, password: user.password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("login", data);
                if (data.status === 'success') {
                    localStorage.setItem('token', data.token);
                    navigate('/Dashboard');
                }
                else {

                }
            } else {
                console.error('API request failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    return (
        <div className='logig_body'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-3 col-md-3 mx-auto mt-55">
                        <div className="card card-body">
                            <h4 className="card-title">Login Admin</h4>
                            <div className="form-horizontal mt-4">

                                <div className="form-group mb-3">
                                    <label for="example-email">Email <span className="help"> </span></label>
                                    <input type="email" id="username" name="username" value={user.username} onChange={handleChange} placeholder="username" className="form-control" />
                                    {errors.username.length > 0 && <p className='error dark:text-red-600 pt-2'>{errors.username}</p>}
                                </div>
                                <div className="form-group mb-3">
                                    <label>Password</label>
                                    <input type={passwordshow ? "text" : "password"} class="form-control" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
                                    {/* <span class="absolute inset-y-0 inline-flex mb-2 right-4 mt-3" onClick={toglepassword}> {passwordshow ? <> <i class="fas fa-eye-slash dark:text-white"></i> </> : <i class="far fa-eye dark:text-white"></i>}
                                </span> */}
                                    {errors.password.length > 2 &&
                                        <p className='error'>{errors.password}</p>}
                                </div>
                                <button className="btn btn-success text-white" onClick={submit}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login