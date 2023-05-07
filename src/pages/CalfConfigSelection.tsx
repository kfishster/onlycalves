import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  CalfUser,
  UserStatus,
  setUserStatus,
  setUsers,
} from "../store/usersSlice";
import { fetchUsers } from "../utils/apiConnector";
import { NavLink, useNavigate } from "react-router-dom";
import { newUser } from "../store/configSlice";
import { appInsightsTracking } from "../utils/appInsights";

const makeRandomString = (length: number) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

const CalfConfigSelection = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const users = useAppSelector((state) => state.users.users);
  const usersStatus = useAppSelector((state) => state.users.userStatus);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchUsers();

      if ("error" in users) {
        dispatch(setUserStatus(UserStatus.Error));
      } else {
        dispatch(setUsers(users));
      }
    };

    getUsers();
  }, [dispatch]);

  const createNewUser = () => {
    const newUserId = makeRandomString(10);
    dispatch(newUser(newUserId));
    navigate(`/calfConfig/${newUserId}`);
  };

  const usersList = (users: CalfUser[]) => {
    return (
      <div className="flex flex-col gap-4 items-center">
        <div className="w-full md:w-1/2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {users.map((user) => (
            <>
              <NavLink to={`/calfConfig/${user.userId}`}>
                <div className="flex w-full px-4 py-2 justify-center font-medium text-left border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                  {user.nickname}
                </div>
              </NavLink>
            </>
          ))}
        </div>
        <button
          onClick={createNewUser}
          className="flex justify-center flex-row items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          New User
        </button>
      </div>

      //   <div className="flex flex-col gap-4 items-center">
      //     {users.map((user) => (
      //       <>
      //         <NavLink to={`/calfConfig/${user.userId}`}>
      //           <div className="flex flex-row items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      //             {user.nickname}
      //           </div>
      //         </NavLink>
      //       </>
      //     ))}

      //   </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <p>Add or edit your winning calf by adding pictures and descriptions</p>
      {usersStatus === UserStatus.Loading && <div>Loading...</div>}
      {usersStatus === UserStatus.Ready && usersList(users)}
    </div>
  );
};

export default appInsightsTracking("CalfConfigSelection", CalfConfigSelection);
