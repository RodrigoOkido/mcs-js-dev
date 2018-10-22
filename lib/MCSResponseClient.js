'use strict';

const MCSBaseClient = require('./MCSBaseClient');

const JoinedMessage = require('./messages/joined');
const LeftMessage = require('./messages/left');
const PublishedAndSubscribed = require('./messages/publishedAndSubscribed');
const UnpublishedAndUnsubscribed =
  require('./messages/unpublishedAndUnsubscribed');
const LayoutSet = require('./messages/layoutSet');
const VideoFloorSet = require('./messages/videoFloorSet');

/**
 * This class represents a client in server's context. It is used to
 * send/receive data from a single client
 * @extends module:mcs-js.MCSBaseClient
 * @memberof module:mcs-js
 * @fires {@link module:mcs-js#event:join join}
 */
class MCSResponseClient extends MCSBaseClient {
  /**
   * Create a client for the Media Control Server given an existent connection
   * @param {external:WebSocket} [ws] An existent WebSocket connection
   */
  constructor (ws) {
    super(ws);
    this._id = ws && ws.req && ws.req.headers ?
      ws.req.headers['sec-websocket-key'] : null;
  }

  /**
   * Return the current client's ID
   * @return {String} The id of this client
   */
  get id () {
    return this._id;
  }

  /**
   * {@link module:mcs-js#event:join Join} response for MCS room
   * @param  {String} userId The id of the user
   */
  joined (userId) {
    if (!userId || typeof(userId) !== 'string') {
      throw (new Error('invalid userId'));
    }

    var joinedMessage = new JoinedMessage(userId);
    if (joinedMessage) {
      this.send(joinedMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:left Leave} response for MCS room
   */
  left() {
    var leftMessage = new LeftMessage();
    if (leftMessage) {
      this.send(leftMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:publishAndSubscribe PublishAndSubscribe}
   *  response for MCS room
   * @param  {String} mediaId The media's unique id in media server's context
   * @param  {String} sdp The Session Descriptor for this media session
   */
  publishedAndSubscribed(mediaId, sdp) {
    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error ('Error : Invalid Media ID');
    }

    if (!sdp || typeof(sdp) !== 'string') {
      throw new Error ('Error : Invalid SDP');
    }

    var pubedAndSubedMessage = new PublishedAndSubscribed(mediaId, sdp);
    if (pubedAndSubedMessage) {
      this.send(pubedAndSubedMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:unpublishedAndUnsubscribed
   *  UnpublishAndUnsubscribe} response for MCS room
   */
  unpublishedAndUnsubscribed() {
    var unpubedAndUnsubedMessage = new UnpublishedAndUnsubscribed();
    if(unpubedAndUnsubedMessage) {
      this.send(unpubedAndUnsubedMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:setVideoFloor
   *  SetVideoFloor} response for MCS room
   */
  videoFloorSet(sourceId, mediaId, floorId, params) {
    if (!sourceId || typeof(sourceId) !== 'string') {
      throw new Error('Error : Invalid sourceId');
    }

    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : Invalid mediaId');
    }

    if (!floorId || typeof(floorId) !== 'string') {
      throw new Error('Error : Invalid floor id');
    }

    var videoFloorSetMessage =
      new VideoFloorSet(sourceId, mediaId, floorId, params);
    if (videoFloorSetMessage) {
      this.send(videoFloorSetMessage);
    }
  }

  /**
   * {@link module:mcs-js#event:layoutSet
   *  SetLayout} response for MCS room
   */
  layoutSet(sourceId, mediaId, layoutId, params) {
    if (!sourceId || typeof(sourceId) !== 'string') {
      throw new Error('Error : Invalid sourceId');
    }

    if (!mediaId || typeof(mediaId) !== 'string') {
      throw new Error('Error : Invalid mediaId');
    }

    if (!layoutId || typeof(layoutId) !== 'string') {
      throw new Error('Error : Invalid layout id');
    }

    var layoutSetMessage = new LayoutSet(sourceId, mediaId, layoutId, params);
    if (layoutSetMessage) {
      this.send(layoutSetMessage);
    }
  }

}

/**
 * @ignore
 */
MCSResponseClient.prototype.send; // jshint ignore:line

/**
 * @ignore
 */
MCSResponseClient.prototype.createConnection; // jshint ignore:line

module.exports = MCSResponseClient;
