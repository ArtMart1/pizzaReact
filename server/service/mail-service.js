const nodemailer = require('nodemailer');
const { google } = require('googleapis');

class MailService {
  constructor() {
    // Создаём OAuth2 клиент для авторизации
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.OAUTH_CLIENT_ID,
      process.env.OAUTH_CLIENT_SECRET,
      process.env.OAUTH_REDIRECT_URI,
    );
    this.oAuth2Client.setCredentials({
      refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });
  }

  async createTransporter() {
    const accessToken = await this.oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_USER,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
      secure: false,
    });
  }

  async sendActivationMail(to, link) {
    try {
      const transporter = await this.createTransporter();

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: to,
        subject: 'Активация аккаунта на ' + process.env.API_URL,
        text: '',
        html: `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>`,
      });

      console.log('Activation email sent successfully');
    } catch (error) {
      console.error('Failed to send activation email:', error);
    }
  }
}

module.exports = new MailService();
