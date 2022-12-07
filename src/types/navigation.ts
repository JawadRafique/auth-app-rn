export type AppStackParamList = {
    "Welcome": undefined,
    "Login": undefined,
    "Signup": undefined
}

export interface RootStackParamList extends AppStackParamList{
    
}

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }