import { $http } from '~/services/baseHttp'


export const getProjectList = async (params: any) => {
    return await $http.get('practical-work', {params})
}
export const deleteProjectId = (id: string) => {
    return $http.delete(`practical-work/${id}`)
}

export const createProject = async (form: any) => {
    return await $http.post("/practical-work", form);
};
export const updateProject = async ( form: any) => {
    return await $http.put(`/practical-work`, form);
};
