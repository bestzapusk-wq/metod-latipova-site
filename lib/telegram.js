// Отправляет текстовое сообщение через Telegram Bot API.
// Токен берётся из переменной окружения и никогда не уходит на клиент —
// эта функция вызывается только из pages/api/*, то есть на сервере.

export async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

  if (!token || !chatId) {
    throw new Error(
      "Не заданы TELEGRAM_BOT_TOKEN / TELEGRAM_ADMIN_CHAT_ID в .env.local"
    );
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });

  const data = await res.json();

  if (!data.ok) {
    throw new Error(`Telegram API error: ${JSON.stringify(data)}`);
  }

  return data;
}
