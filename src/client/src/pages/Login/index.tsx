import { Wrapper, Form, InputGroup, Label, InputField, Button } from './index.style';
import { useState, FormEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { login } from '../../store/user/thunks';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/Layout';

const Login = () => {
  const dispatch = useDispatch();
  const { userReducer } = useSelector((state: RootState) => state);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(login(loginData));

    setLoginData({
      username: '',
      password: ''
    });
  };

  useEffect(() => {}, []);

  if (userReducer.authenticated) return <Redirect to="/" />;
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">Username:</Label>
          <InputField value={loginData.username} type="text" placeholder="Username" name="username" onChange={(e) => setLoginData((prevState) => ({ ...prevState, username: e.target.value }))} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password:</Label>
          <InputField value={loginData.password} type="password" placeholder="password" name="password" onChange={(e) => setLoginData((prevState) => ({ ...prevState, password: e.target.value }))} />
        </InputGroup>
        <Button type="submit">{userReducer.loading ? 'loading' : 'Login'}</Button>
      </Form>
    </Wrapper>
  );
};

export default Login;
