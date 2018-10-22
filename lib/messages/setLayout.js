'use strict';

const MCSMessage = require('./MCSMessage');

class SetLayout extends MCSMessage {
  constructor(source_id, media_id, layout_id, params) {
    super();
    this.body.source_id = source_id;
    this.body.media_id = media_id;
    this.body.layout_id = layout_id;
    this.body.params = params;
  }
}

module.exports = SetLayout;
