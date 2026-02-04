// import { useAppSelector } from "../hooks";
// import { useLoginMutation, useLogoutMutation } from "../api/authApi";

// export const useAuth = () => {
//   const auth = useAppSelector((state) => state.auth);
//   const [login, { isLoading: loginLoading }] = useLoginMutation();
//   const [logout, { isLoading: logoutLoading }] = useLogoutMutation();

//   return {
//     ...auth,
//     login,
//     logout,
//     isLoading: loginLoading || logoutLoading,
//   };
// };
