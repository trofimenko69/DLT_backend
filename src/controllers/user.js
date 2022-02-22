import { User } from '../models';

async function getUsers() {
  const users = await User.findAll();
  return users.map((user) => user.publish('dates'));
}

export {
  getUsers,
};
