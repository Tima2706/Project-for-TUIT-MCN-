import { $http } from '~/services/baseHttp'


export const getEmployee = async (params: any) => {
    return await $http.get('employees', {params})
}
