'use strict';

const MCSBaseClient = require('./MCSBaseClient');

const JoinMessage = require('./messages/join');
const LeaveMessage = require('./messages/leave');
const PublishAndSubscribeMessage = require('./messages/publishAndSubscribe');
const UnpublishAndUnsubscribeMessage =
  require('./messages/unpublishAndUnsubscribe');

const SetLayoutMessage = require('./messages/setLayout');
const SetVideoFloorMessage = require('./messages/setVideoFloor');
const UpdateMediaMessage = require('./messages/updateMedia');

/**
 * This class handles connection to Media Control Server application
 * @extends module:mcs-js.MCSBaseClient
 * @memberof module:mcs-js
 * @fires {@link module:mcs-js#event:joined joined}
 */
class MCSClient extends MCSBaseClient {
  /**
   * Create a client for the Media Control Server specified by the given URI
   * @param  {String}   uri      The WebSocket URI of the Media Control Server
   */
  constructor (uri) {
    super();
    this.createConnection(uri);
  }

  /**
   * Join MCS room
   * @param  {String}   roomId  The id of the room
   * @param  {String}   username The name of this user
   * @param  {Object}   params   Additional parameters
   */
  join (roomId, username, params) {
    if (!roomId || typeof(roomId) !== 'string') {
      throw new Error('Error : Invalid roomId');
    }

    if(!username || typeof(username) !== 'string') {
      throw new Error('Error : Invalid username');
    }

    var joinMessage = new JoinMessage(roomId, username, params);
    if (joinMessage) {
      this.send(joinMessage);
    }
  }

  /**
   * Publish stream to Media Control Server and subscribe to the media specified
   * by the mediaId
   * @param  {String}   sourceId The source where user is subscribing to
   * @param  {String}   mediaId The id of the media where user is subscribing to
   * @param  {String}   type    The type of media/stream that user is going to
   *   use to comunicate with the server (WEBRTC or RTP)
   * @param  {module:mcs-js#PublishAndSubscribeParams}   params
   *   Additional parameters
   */
  publishAndSubscribe (sourceId, mediaId, type, params) {
    if (!sourceId || typeof(sourceId) !== 'string') {
      throw new Error('Error : Invalid sourceId');
    }

    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : Invalid mediaId');
    }

    if (!type || typeof(type) !== 'string') {
      throw new Error('Error : Invalid media type');
    }

    var pubAndSubMessage =
      new PublishAndSubscribeMessage(sourceId, mediaId, type, params);
    if (pubAndSubMessage) {
      this.send(pubAndSubMessage);
    }

  }

  /**
   * Stop publishing and subscribing to/from the stream given by mediaId
   * @param  {String}   mediaId The id of the media that it is unsubcribing to
   * @param  {Object}   [params]   Additional parameters
   */
  unpublishAndUnsubscribe (mediaId, params) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : Invalid mediaId');
    }

    var unpubAndUnsubMessage =
      new UnpublishAndUnsubscribeMessage(mediaId, params);
    if (unpubAndUnsubMessage) {
      this.send(unpubAndUnsubMessage);
    }
  }

  /**
   * Leave a room of Media Control Server
   * @param  {String}   roomId The id of the room
   * @param  {Object}   params   Additional parameters
   */
  leave (roomId, params) {
    if (!roomId || typeof(roomId) !== 'string') {
      throw new Error('Invalid roomId');
    }

    var leaveMessage = new LeaveMessage(roomId, params);
    if (leaveMessage) {
      this.send(leaveMessage);
    }
  }

  /**
   * Set the layout of the given media/source
   * Works for MCU medias only
   * @param  {String}   sourceId The source which owns the media
   * @param  {String}   mediaId The id of the media to have it's layout set
   * @param  {String}   layoutId The id of the layout (0, 1 or 2)
   * @param  {module:mcs-js#SetLayoutParams}   params
   *   Additional parameters
   */
  setLayout (sourceId, mediaId, layoutId, params) {
    if (!sourceId || typeof(sourceId) !== 'string') {
      throw new Error('Error : Invalid sourceId');
    }

    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : Invalid mediaId');
    }

    if (!layoutId || typeof(layoutId) !== 'string') {
      throw new Error('Error : Invalid layout id');
    }

    var setLayoutMessage =
      new SetLayoutMessage(sourceId, mediaId, layoutId, params);
    if (setLayoutMessage) {
      this.send(setLayoutMessage);
    }
  }

  /**
   * Set the the video floor of the given media/source
   * @param  {String}   sourceId The source which owns the media
   * @param  {String}   mediaId The id of the media to have it's video floor set
   * @param  {String}   floorId The id of the floor
   * @param  {module:mcs-js#SetVideoFloorParams}   params
   *   Additional parameters
   */
  setVideoFloor (sourceId, mediaId, floorId, params) {
    if (!sourceId || typeof(sourceId) !== 'string') {
      throw new Error('Error : Invalid sourceId');
    }

    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : Invalid mediaId');
    }

    if (!floorId || typeof(floorId) !== 'string') {
      throw new Error('Error : Invalid floor id');
    }

    var setVideoFloorMessage =
      new SetVideoFloorMessage(sourceId, mediaId, floorId, params);
    if (setVideoFloorMessage) {
      this.send(setVideoFloorMessage);
    }
  }

  /**
   * Set the the video floor of the given media/source
   * @param  {String}   sourceId The source which owns the media
   * @param  {String}   mediaId The unique id of the media. Note: this is not
   * the same id used in publish and subscribe methods calls, but the id the
   * id in the MCS Server context (returned in the pub/sub calls)
   * @param  {String}   floorId The id of the floor
   * @param  {module:mcs-js#PublishAndSubscribeParams}   params
   *   Parameters to be updated
   */
  updateMedia (mediaId, params) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : Invalid mediaId');
    }

    if (!params || typeof(params) !== 'object') {
      throw new Error('Error : Invalid params');
    }

    var updateMediaMessage =
      new UpdateMediaMessage(mediaId, params);
    if (updateMediaMessage) {
      this.send(updateMediaMessage);
    }
  }
}

/**
 * @ignore
 */
MCSClient.prototype.send;

/**
 * @ignore
 */
MCSClient.prototype.createConnection;

module.exports = MCSClient;
