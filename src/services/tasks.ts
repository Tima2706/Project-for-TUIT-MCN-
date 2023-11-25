import { $http } from '~/services/baseHttp'


export const getTaskList = async (params: any) => {
    return await $http.get('tasks', {params})
}
// export const deleteTaskId = (id: string) => {
//     return $http.delete(`tasks/${id}`)
// }
//
// export const createTask = async (form: any) => {
//     return await $http.post("/tasks", form);
// };
// export const updateTask = async (id: string, form: any) => {
//     return await $http.put(`/tasks/${id}`, form);
// };
