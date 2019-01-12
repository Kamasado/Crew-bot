const fs = require("fs");

const config = JSON.parse(fs.readFileSync(__basedir + "/bot_config.json"));
const helpers = require(__basedir + "/commands/helpers");
const user = require(__basedir + "/userModel");

const errmsg = helpers.error(
  "Sintaxis incorrecta",
  `Uso: **${config.prefix}me**`
);

function valid(arg) {
  if (arg.length !== 0) {
    return false;
  }

  return true;
}

module.exports = (arg, msg) => {
  if (!valid(arg)) {
    msg.channel.send(errmsg);
    return;
  }

  const id = msg.author.id;

  user.findOne({ discordId: id }, (err, u) => {
    // if user not registered ->
    if (!u) {
      let embed = helpers
        .embed()
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .addField(
          "¡No estas registrado!",
          "Contacta con un <@&530454438008061962> para comenzar."
        );
      msg.channel.send(embed);
      return;
    }

    // send registered user profile
    let profile = helpers.profile(u, msg);
    msg.channel.send(profile);
  });
};
