import * as dotenv from 'dotenv';

dotenv.config();

interface IEnv {
  accessToken: string;
  mail: string;
}

const env: IEnv = {
  accessToken: <string>process.env.ACCESS_TOKEN_SECRET,
  mail: <string>process.env.MAIL,
};

export default env;
