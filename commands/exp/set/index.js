const fs = require("fs");

const config = JSON.parse(fs.readFileSync(__basedir + "/bot_config.json"));
const helpers = require(__basedir + "/commands/helpers");
const user = require(__basedir + "/userModel");

const errmsg = helpers.error(
  "Sintaxis incorrecta",
  `Uso: **${config.prefix}exp set** <**@mención** | **id**> <**exp**>`
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
  const exp = arg[1];

  if (discordId === "error") {
    msg.channel.send(errmsg);
    return;
  }

  user.findOne({ discordId }).then(u => {
    if (exp < 0) {
      const error = helpers.error(
        "Misión imposible",
        "No se puede establecer la experiencia a un número negativo."
      );
      msg.channel.send(error);
    } else {
      user
        .findOneAndUpdate({ discordId }, { exp })
        .then(u => {
          const success = helpers.success(
            "Experiencia cambiada",
            `Se ha establecido la experiencia a **${exp}pt${
              exp != 1 ? "s" : ""
            }** al perfil de <@${discordId}>`
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
