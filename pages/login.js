import React, { useState } from 'react'
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch'
import { login } from '../utils/auth'

const loginUrl = '/api/login';

const Login = () => {
  const [passData, setPassData] = useState({ pass: '', error: '' });

  const router = useRouter();
  const { pathname } = router.query;

  async function handleSubmit(event) {
    event.preventDefault();
    setPassData(Object.assign({}, passData, { error: '' }));

    const { pass } = passData;

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pass }),
      });

      if (response.status === 200) {
        const { token } = await response.json();
        await login({ token, pathname });
      } else {
        console.log('Login failed.');
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      const { response } = error;
      setPassData(
        Object.assign({}, passData, {
          error: response ? response.statusText : error.message,
        })
      );
    }
  }

  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="pass">pass</label>

          <input
            type="text"
            id="pass"
            name="pass"
            value={passData.pass}
            onChange={event =>
              setPassData(
                Object.assign({}, passData, { pass: event.target.value })
              )
            }
          />

          <button type="submit">Login</button>

          {passData.error && <p className="error">Error: {passData.error}</p>}
        </form>
      </div>
      <style jsx>{`
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form {
          display: flex;
          flex-flow: column;
        }
        label {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
      `}</style>
    </>
  )
};

export default Login;