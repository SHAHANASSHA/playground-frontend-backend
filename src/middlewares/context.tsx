import { createContext } from "react";

export const GlobalContext = createContext<{
 user: UserType,
 setUser: React.Dispatch<React.SetStateAction<UserType>>
}>(null!);