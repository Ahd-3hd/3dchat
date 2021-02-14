import { Wrapper, Form, InputGroup, Label, InputField, Button } from './index.style';
import { useState, useEffect, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { login } from '../../store/user/thunks';

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
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="username">Username:</Label>
          <InputField type="text" placeholder="Username" name="username" onChange={(e) => setLoginData((prevState) => ({ ...prevState, username: e.target.value }))} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password:</Label>
          <InputField type="password" placeholder="password" name="password" onChange={(e) => setLoginData((prevState) => ({ ...prevState, password: e.target.value }))} />
        </InputGroup>
        <Button type="submit">{userReducer.loading ? 'loading' : 'Login'}</Button>
      </Form>
    </Wrapper>
  );
};

export default Login;
