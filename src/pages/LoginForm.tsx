import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, registration } from '../redux/authSlice';
import { AppDispatch, RootState } from '../redux/store';
import { IUser } from '../models/response/IUser';
import UserService from '../services/UserService';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isActivated = useSelector((state: RootState) => state.auth.user.isActivated);

  const handleLogin = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleRegistration = async () => {
    try {
      await dispatch(registration({ email, password })).unwrap();
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {}
  };
  if (isAuth) {
    return (
      <div className="content">
        <button onClick={handleLogout}>Выйти</button>
        <div>{isActivated ? 'Аккаунт активирован' : 'Активируйте аккаунт'}</div>
        <button onClick={getUsers}>Получить пользователей</button>
        <ul>
          {users.map((user) => {
            return <li key={user.email}>{user.email}</li>;
          })}
        </ul>
      </div>
    );
  }
  return (
    <>
      <input
        onChange={(event) => setEmail(event.target.value)}
        value={email}
        type="text"
        placeholder="email"
      />
      <input
        onChange={(event) => setPassword(event.target.value)}
        value={password}
        type="password"
        placeholder="password"
      />
      <button onClick={handleLogin}>Вход</button>
      <button onClick={handleRegistration}>Регистрация</button>
    </>
  );
};

export default LoginForm;
