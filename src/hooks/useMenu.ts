import { useQuery } from 'react-query';
import { fetchMenus } from '../api/getMenus';
import useAuthStore from '../store/useStore'; // Adjust the path as necessary

export const useMenus = () => {
  const token = useAuthStore((state) => state.token);
  return useQuery(['menus', token], () => fetchMenus(token!), {
    enabled: !!token, 
  });
};