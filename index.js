require('dotenv').config()
const { Telegraf } = require('telegraf')
const cron = require('node-cron');
const bot = new Telegraf(process.env.BOT_TOKEN);


bot.telegram.setMyCommands([
    {command: "/start", description: 'start bot'},
    {command: "/help", description: 'help command'},
    {command: '/about', description: 'about bot'}
]);

cron.schedule('0 9 * * *',()=>{
    sendMess()
});

function sendMess(){
    bot.telegram.sendMessage(process.env.CHAT_ID, 'Your cat mood for today:')
    bot.telegram.sendAnimation(process.env.CHAT_ID, {url:'https://cataas.com/cat/gif'})
}

bot.hears('/getCat', async ctx => {
    sendMess()
})
bot.command(["about", "ABOUT"], async ctx => await ctx.reply("Cat bot created to cheer you up:)"));
bot.help(async ctx => {
    return await ctx.reply(
        `/help - list of commands.\r\n/about - about this bot.\r\n/start - start this bot.\r\n/getCat - getting cat`)
})
bot.start( async ctx => await ctx.reply('Hi there, do you wanna know which cat you are today?) if you are ready launch the command /getCat'))

bot.launch()