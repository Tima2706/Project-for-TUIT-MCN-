import { $http } from '~/services/baseHttp'


export const getTeamList = async (params: any) => {
  return await $http.get('groups', {params})
}
export const deleteTeamId = (id: string) => {
  return $http.delete(`groups/${id}`)
}

export const createTeam = async (form: any) => {
  return await $http.post("/groups", form);
};
export const updateTeamId = async (id: string, form: any) => {
  return await $http.put(`/groups/${id}`, form);
};
