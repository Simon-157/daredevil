import { Account, User } from 'appwrite';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  // Additional user properties
}

export const getAuthenticatedUser = (): Promise<UserInfo> => {
  return new Promise((resolve, reject) => {
    const account = new Account();

    account.get()
      .then((response: User) => {
        const user: UserInfo = {
          id: response.$id,
          name: response.name,
          email: response.email,
          // Additional user properties
        };

        resolve(user);
      })
      .catch((error:Error) => {
        reject(error);
      });
  });
};


