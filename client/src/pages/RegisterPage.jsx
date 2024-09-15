import { Form, Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from "react";
import './../styles/register.css';
import { ToastContainer, toast } from 'react-toastify';
import { UserContext } from "../UserContext";
import 'react-toastify/dist/ReactToastify.css';

export default function RegiserPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);




    async function registetUser(ev) {
        ev.preventDefault();
        try {

            const data = new FormData();
            data.append('profilePic', profilePicture);

            const responsePic = await axios.post('/upload-profile-pic', data);
            console.log(responsePic.data.fileUrl)

            const fileUrl = responsePic.data.fileUrl;


            const res = await axios.post('/register', {
                name, email, password, fileUrl
            });

            console.log(res);

            const userResponse = await axios.post('/login', { email, password }, { withCredentials: true })
            setUser(userResponse.data);




            toast.success('Registration successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });
            setRedirect(true);


        } catch (e) {

            toast.error('Registration failed. Please try again later', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",

            });

            console.log(e);
        }




    }




    var readURL = async function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.getElementsByClassName('profile-pic')[0].src = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);

            setProfilePicture(input.files[0]);




        }
    }
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registetUser} encType="multipart/form-data">
                    <div className="row">
                        <div className="small-12 medium-2 large-2 columns flex justify-center">
                            <div className="circle">
                                <img className="profile-pic" onClick={() => { document.getElementsByClassName("file-upload")[0].click(); }} src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" />

                            </div>
                            <div className="p-image">
                                <input className="file-upload" onChange={(e) => readURL(e.target)} type="file" name="profilePic" accept="image/*" />
                            </div>

                        </div>
                    </div>
                    <input type="text" placeholder="John Doe"
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder="you@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary mt-2">Register</button>
                    <div className="text-center text-gray-500">
                        If you already have an account <Link className="underline text-black" to={'/login'}>Login here</Link>
                    </div>
                </form>
            </div>

        </div>
    );

}