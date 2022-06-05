module.exports = {
  name: "hello-there",
    description: "Replies with General Kenobi",
    category: 'General',
  execute(message, args) {
      message.channel.send("https://c.tenor.com/QFSdaXEwtBAAAAAC/hello-there-general-kenobi.gif");
  },
};