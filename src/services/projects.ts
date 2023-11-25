import { $http } from '~/services/baseHttp'


export const getProjectList = async (params: any) => {
    return await $http.get('projects', {params})
}
export const deleteProjectId = (id: string) => {
    return $http.delete(`projects/${id}`)
}

export const createProject = async (form: any) => {
    return await $http.post("/projects", form);
};
export const updateProject = async (id: string, form: any) => {
    return await $http.put(`/projects/${id}`, form);
};
