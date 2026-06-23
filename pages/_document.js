import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <title>Метод Латипова</title>
          <meta name="description" content="Личный кабинет — курсы и материалы" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          {/* Официальный SDK Telegram Web App — даёт доступ к данным юзера, теме, кнопкам */}
          <script src="https://telegram.org/js/telegram-web-app.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
