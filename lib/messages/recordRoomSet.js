'use strict';

const MCSMessage = require('./MCSMessage');

class RecordRoomSet extends MCSMessage {
  constructor(room_id, record_status, params) {
    super();
    this.body.room_id = room_id;
    this.body.record_status = record_status;
    this.body.params = params;
  }
}

module.exports = RecordRoomSet;
