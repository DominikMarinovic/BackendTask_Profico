import nodemailer, { TransportOptions } from 'nodemailer';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'XOAUTH2',
    user: process.env.MAIL,
    pass: process.env.PASSWORD_JOKES,
  },
} as TransportOptions);

export const sendEmailWithJoke = async (mailOptions: IMailOptions) => {
  transporter.verify((error, success) => {
    if (error) {
      console.log('err', error);
    } else {
      console.log('Ready for messages:', success);
    }
  });
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
