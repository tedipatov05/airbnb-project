import { Link } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

export default function RegiserPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function registetUser(ev){
        ev.preventDefault();
        axios.post('/register', {
            name, email, password
        });
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registetUser}>
                    <input type="text" placeholder="John Doe" 
                    value={name} 
                    onChange={ev => setName(ev.target.value)}/>
                    <input type="email" placeholder="you@email.com" 
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="password" 
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Register</button>
                    <div className="text-center text-gray-500">
                        If you already have an account <Link className="underline text-black" to={'/login'}>Login here</Link>
                    </div>
                </form>
            </div>

        </div>
    );

}