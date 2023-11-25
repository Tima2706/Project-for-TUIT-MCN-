export interface TeamsDtoTeamsDto {
  id: string;
  name: string;
  organizationId: string;
  organizationName: string;
  watcher: boolean
  employeeGroups: [
    {
      delete: boolean;
      employeeId: string;
      groupId: string;
      leader: boolean;
      id: string;
      employeeInfo: {
        firstName: string;
        lastName: string;
        middleName: string;
        photoUrl: string;
        userName: string;
      }
    }
  ]

}

export interface TeamsDtoForm {
  id: string;
  name: string;
  organizationId: string;
  watcher: boolean
  employeeGroups: [
    {
      delete: boolean;
      employeeId: string;
      groupId: string;
      leader: boolean;
      id: string;
      employeeInfo: {
        firstName: string;
        lastName: string;
        middleName: string;
        photoUrl: string;
        userName: string;
      }
    }
  ]

}
