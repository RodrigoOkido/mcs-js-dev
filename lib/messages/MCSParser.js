'use strict';
var MCSMessage = require('./MCSMessage');

class MCSParser {
  /**
   * Parse an stringyfied message into {@link module:mcs-js.MCSMessage
   *  MCSMessage}
   * @param  {String} message Input message
   * @return {@link module:mcs-js.MCSMessage MCSMessage}
   */
  static parse(message) {
    var pMessage = JSON.parse(message);
    return new MCSMessage(pMessage.name || pMessage._name, pMessage.body);
  }

  static stringify(message) {
    return JSON.stringify(message);
  }
}

module.exports = MCSParser;
