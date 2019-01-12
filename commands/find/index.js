const fs = require("fs");

const config = JSON.parse(fs.readFileSync(__basedir + "/bot_config.json"));
const helpers = require(__basedir + "/commands/helpers");
const user = require(__basedir + "/userModel");

const errmsg = helpers.error(
  "Sintaxis incorrecta",
  `Uso: **${config.prefix}find** <**@mención** | **id**>`
);

function valid(arg) {
  if (arg.length !== 1) {
    return false;
  }

  return true;
}

module.exports = (arg, msg) => {
  if (!valid(arg)) {
    msg.channel.send(errmsg);
    return;
  }

  const discordId = helpers.parseMention(arg[0]);

  user.findOne({ discordId }, (err, u) => {
    // if user not registered ->
    if (!u) {
      const author = msg.client.users.get(discordId);
      let embed = helpers
        .embed()
        .setAuthor(author.username, author.avatarURL)
        .addField(
          "¡El usuario no está registrado!",
          "Contacta con un <@&530454438008061962> para comenzar."
        );
      msg.channel.send(embed);
      return;
    }

    // send registered user profile
    const author = msg.client.users.get(discordId);

    let profile = helpers
      .profile(u, msg)
      .setAuthor(author.username, author.avatarURL);
    msg.channel.send(profile);
  });
};
