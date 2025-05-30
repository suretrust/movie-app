import { useNavigate, useSearchParams } from 'react-router';
import { useState, type FormEvent } from 'react';
import { DEFAULT_PAGE_PATH } from '../constants';
import { PageHeader } from './PageHeader';
import { Input } from './styled/Input';
import { FormGroup } from './styled/Form';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

const Button = styled.button`
  display: block;
  width: 100px;
  height: 43px;
  margin-left: 1rem;
  color: var(--color-black);
  border: none;
  border-radius: 4px;
  background-color: var(--color-yellow);
  font-size: 1rem;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
`;

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');

  const fromPage = params.get('redirectTo') || DEFAULT_PAGE_PATH;

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    login(trimmedEmail);
    navigate(fromPage, { replace: true });
  };

  return (
    <PageHeader title='login'>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </FormGroup>
        <Button type='submit'>Login</Button>
      </form>
    </PageHeader>
  );
};
