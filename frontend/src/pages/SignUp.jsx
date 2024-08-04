import { useState } from 'react';
import { useSignUp } from '../hooks/useSignUp';

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { error, loading, signUp } = useSignUp();

    const BASE_URL = 'http://localhost:8930/api/auth/signup';

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signUp(email, password);
    };

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3 className='font-bold'>Sign Up</h3>

            <label htmlFor="">Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" disabled={loading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default SignUp;