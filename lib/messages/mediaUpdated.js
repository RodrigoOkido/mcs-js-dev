'use strict';

const MCSMessage = require('./MCSMessage');

class MediaUpdated extends MCSMessage {
  constructor(media_id) {
    super();
    this.body.media_id = media_id;
  }
}

module.exports = MediaUpdated;
