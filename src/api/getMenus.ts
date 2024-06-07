import { useQuery } from "react-query";
import {useMenuStore} from "../store/useStore"

export interface MenuResponse {
    mencap: string;
    mengrp: string;
    mensub: string | null
}

const fetchMenus = async(): Promise<MenuResponse[]> => {
    const response = await fetch('http://localhost:8080/api/menus/routes');
    const data = await response.json();
    return data.payload.map((item: any) => ({
      mencap: item.mencap,
      mengrp: item.mengrp,
      mensub: item.mensub,
    }));
}

export const useFetchMenus = () => {
    const setMenus = useMenuStore((state: any) => state.setMenus)
    return useQuery <MenuResponse[], Error>('menus', fetchMenus, {
        onSuccess: (data) => {
            setMenus(data);
        }
    })
}
