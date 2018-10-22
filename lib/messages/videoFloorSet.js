'use strict';

const SetVideoFloorMessage = require('./setVideoFloor');

class VideoFloorSet extends SetVideoFloorMessage {
  constructor(source_id, media_id, layout_id, params) {
    super(source_id, media_id, layout_id, params);
  }
}

module.exports = VideoFloorSet;
