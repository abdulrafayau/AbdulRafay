import { useState, useEffect } from 'react';
import { DB, AuthAPI } from '../data/store';

export function useStore(key) {
  const [data, setData] = useState(() => DB.get(key));

  useEffect(() => {
    const unsub = DB.subscribe((e) => {
      if (e.detail.key === key) setData(DB.get(key));
    });

    const handleStorage = (e) => {
      if (e.key === `portfolio_${key}`) {
        setData(DB.get(key));
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      unsub();
      window.removeEventListener('storage', handleStorage);
    };
  }, [key]);

  return data;
}

export function useAuth() {
  const [isAuth, setIsAuth] = useState(AuthAPI.isLoggedIn());

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuth(AuthAPI.isLoggedIn());
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  return isAuth;
}
