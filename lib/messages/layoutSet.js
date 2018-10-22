'use strict';

const SetLayoutMessage = require('./setLayout');

class LayoutSet extends SetLayoutMessage {
  constructor(source_id, media_id, layout_id, params) {
    super(source_id, media_id, layout_id, params);
  }
}

module.exports = LayoutSet;
