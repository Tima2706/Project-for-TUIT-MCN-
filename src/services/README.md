```
api url /organization/bank-details

fayllar url prefix dan kelib chiqib yaratiladi
bu seris api organiztaionService.ts faylga yoziladi
```


# Example
```js
export const organiztionCreateUser = (id: number, data: UpdateUserRequest) => {
  return $http.post(`organization/users/${id}`, data)
}
```
