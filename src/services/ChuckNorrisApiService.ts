import axios from 'axios';
import { sendEmailWithJoke } from './email';
import env from '../../config/env.config';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

interface IData {
  type: string;
  value: string;
}

export const sendEmail = async (email: string): Promise<string> => {
  try {
    const jokeRes = await axios.get<IData>(
      'https://api.chucknorris.io/jokes/random',
    );

    const message = `Joke of the day: \n \n${jokeRes.data.value}`;

    const mailOptions: IMailOptions = {
      from: env.mail,
      to: email,
      subject: 'Chuck Norris Joke',
      text: message,
    };
    sendEmailWithJoke(mailOptions);
    return jokeRes.data.value;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
