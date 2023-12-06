import { $http } from '~/services/baseHttp'


export const getNoteList = async () => {
    return await $http.get('/note')
}
export const deleteNoteId = (id: string) => {
    return $http.delete(`/note/${id}`)
}

export const createNote = async (form: any) => {
    return await $http.post("/note", form);
};
export const updateNote = async ( form: any) => {
    return await $http.put(`/note`, form);
};
