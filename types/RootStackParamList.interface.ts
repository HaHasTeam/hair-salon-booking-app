export type RootStackParamList = {
  Login: string
  Register: string
}

export namespace ArtifactModel {
  export interface IListArtifacts {
    id: string
    name: string
  }
}
export interface IMutationResult {
  isPending: boolean
  isSuccess: boolean
}
export namespace IAuth {
  export interface ILoginParameters {
    email: string
    password: string
  }
  export interface IRegisterParameters {
    username: string
    email: string
    password: string
  }
  export interface ILoginResult extends IMutationResult {
    login: (data: ILoginParameters) => void
  }
  export interface IRegisterResult extends IMutationResult {
    register: (data: IRegisterParameters) => void
  }
}

export namespace IUser {
  export interface IModel {
    _id: string
    username: string
    email: string
    role: string
    gender: string
    firstName: string
    lastName: string
    phone: string
    status: string
    dob: string
    __t: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}
