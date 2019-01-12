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

  msg.channel.send("rude pong");
};
