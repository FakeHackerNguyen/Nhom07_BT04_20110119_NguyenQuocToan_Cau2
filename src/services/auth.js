import realm from '../databases/models/User';

export const signUp = ({email, password}) => {
  const users = realm.objects('User');

  return new Promise((resolve, reject) => {});
};
