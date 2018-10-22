'use strict';

const MCSMessage = require('./MCSMessage');

class SetVideoFloor extends MCSMessage {
  constructor(source_id, media_id, floor_id, params) {
    super();
    this.body.source_id = source_id;
    this.body.media_id = media_id;
    this.body.floor_id = floor_id;
    this.body.params = params;
  }
}

module.exports = SetVideoFloor;
