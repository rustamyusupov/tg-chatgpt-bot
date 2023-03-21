import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';

dotenv.config();
const bot = new Telegraf(process.env.TELEGRAM_KEY ?? '');

bot.start(ctx => {
  ctx.reply('Hi!');
});

bot.command('echo', ctx => {
  const message = ctx.message.text;
  ctx.reply(message);
});

bot.launch();
