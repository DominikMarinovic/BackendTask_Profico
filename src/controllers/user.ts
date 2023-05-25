import db from '../../models';
import bcrypt from 'bcrypt';
import validator from 'validator';

export interface IUser {
  id: string;
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class UserControllers {
  createUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<object> => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const user: IUser = await db.Users.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hash,
      });

      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  getAllUsers = async () => {
    try {
      const users: IUser = await db.Users.findAll({ raw: true });
      console.log('All users:', users);
      return users;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  getUserById = async (id: string) => {
    try {
      const user: IUser = await db.Users.findOne({ where: { id } });
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  getUserByEmail = async (email: string) => {
    try {
      const user: IUser = await db.Users.findOne({ where: { email } });
      return user;
    } catch (err) {
      console.log(err);
    }
  };

  validateUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    if (
      !(
        Boolean(firstName) &&
        Boolean(lastName) &&
        Boolean(email) &&
        Boolean(password)
      )
    ) {
      console.log('All fiels are required!');
      return false;
    } else if (!validator.isEmail(email)) {
      console.log('Invalid Email! Please enter valid email');
      return false;
    }
    return true;
  };
}

export default new UserControllers();
