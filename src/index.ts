import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_KEY ?? '');
const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openai = new OpenAIApi(configuration);

bot.start(ctx => {
  ctx.reply('Hi!');
});

bot.on(message('text'), async ctx => {
  const prompt = ctx.message.text;
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 1000,
    temperature: 0.5,
  });
  await ctx.reply(completion.data.choices[0].text ?? '');
});

bot.command('echo', ctx => {
  const message = ctx.message.text;
  ctx.reply(message);
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
