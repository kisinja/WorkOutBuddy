import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, loading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    };

    return (
        <form className='login' onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label htmlFor="">Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" disabled={loading}>Log In</button>

            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login;