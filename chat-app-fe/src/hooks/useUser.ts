import { create } from 'zustand'
import { IUser } from '../api/types/index.type';
import { axiosGet } from '../api/axios.interceptor';

type State = {
    users: IUser[]
};

type Actions = {
    getAllExceptUser: (userId: string) => void,
};

const initialState: State = { users: [] };

export const useUser = create<State & Actions>()(
    (set, get) => ({
        ...initialState,
        getAllExceptUser: async (userId: string) => {
            const users: IUser[] = await axiosGet(`/user/${userId}`)
            set({ users });
        }
    })
);