import { useQuery } from 'react-query';

import { dadiduApi } from '@/apis/dadiduApi';
import { Data } from '@/users/types/user';

const getAllUsers = async () => {
	const users = await dadiduApi.get<Data>('/api/users/getall');
	return users.data.rspData;
};

export const useUsers = () => {
	const usersQuery = useQuery(['users'], getAllUsers);

	return {
		usersQuery
	};
};
