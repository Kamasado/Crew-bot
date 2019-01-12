const user = require(__basedir + "/userModel");
const fs = require("fs");

const errmsg = "Sintaxis incorrecta.";

function valid(arg) {
  return true;
}

module.exports = (arg, msg) => {
  if (!valid(arg)) {
    msg.channel.send(errmsg);
    return;
  }

  const subCommand = arg[0];
  const newArgs = arg.slice(1);
  const subCommandPath = `${__dirname}/${subCommand}`;

  // if a folder with the command name exists, run it
  fs.access(subCommandPath, fs.F_OK, err => {
    if (!err) {
      const cmdjs = require(subCommandPath);
      cmdjs(newArgs, msg);
    }
    return;
  });
};
