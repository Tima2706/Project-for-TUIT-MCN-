import { $http } from '~/services/baseHttp'


export const getNoteList = async () => {
    return await $http.get('/notes')
}
export const deleteNoteId = (id: string) => {
    return $http.delete(`/notes/${id}`)
}

export const createNote = async (form: any) => {
    return await $http.post("/notes", form);
};
export const updateNote = async ( form: any) => {
    return await $http.put(`/notes`, form);
};
