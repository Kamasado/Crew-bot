const fs = require("fs");

const config = JSON.parse(fs.readFileSync(__basedir + "/bot_config.json"));
const helpers = require(__basedir + "/commands/helpers");
const user = require(__basedir + "/userModel");

const errmsg = helpers.error(
  "Sintaxis incorrecta",
  `Uso: **${config.prefix}quest take** <**@mención** | **id**> <**cantidad**>`
);

function valid(arg) {
  if (arg.length !== 2) {
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
  const quests = arg[1];

  if (discordId === "error") {
    msg.channel.send(errmsg);
    return;
  }

  user.findOne({ discordId }).then(u => {
    if (u.quests < quests) {
      const error = helpers.error(
        "Misión imposible",
        "No se puede disminuir el numero de quests por debajo de 0"
      );
      msg.channel.send(error);
    } else {
      user
        .findOneAndUpdate({ discordId }, { $inc: { quests: -quests } })
        .then(u => {
          const success = helpers.success(
            "Numero de quests modificado",
            `Se ha disminuido el numero de quests completadas en **${quests}** para el perfil de <@${discordId}>`
          );
          msg.channel.send(success);
        })
        .catch(err => {
          const error = helpers.error(
            "Ha ocurrido un error",
            "Por favor contacta con <@173843781748129792> y reporta el bug."
          );
          msg.channel.send(error);
        });
    }
  });
};
