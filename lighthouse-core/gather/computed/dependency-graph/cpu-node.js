/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Node = require('./node');

class CPUNode extends Node {
  /**
   * @param {!TraceEvent} parentEvent
   * @param {!Array<TraceEvent>=} childEvents
   */
  constructor(parentEvent, childEvents = []) {
    const nodeId = `${parentEvent.tid}.${parentEvent.ts}`;
    super(nodeId);

    this._event = parentEvent;
    this._childEvents = childEvents;
  }

  /**
   * @return {string}
   */
  get type() {
    return Node.TYPES.CPU;
  }

  /**
   * @return {number}
   */
  get startTime() {
    return this._event.ts;
  }

  /**
   * @return {number}
   */
  get endTime() {
    return this._event.ts + this._event.dur;
  }

  /**
   * @return {!TraceEvent}
   */
  get event() {
    return this._event;
  }

  /**
   * @return {!TraceEvent}
   */
  get childEvents() {
    return this._childEvents;
  }

  /**
   * @return {boolean}
   */
  didPerformLayout() {
    return this._children.some(evt => evt.name === 'Layout');
  }

  /**
   * @return {!CPUNode}
   */
  cloneWithoutRelationships() {
    return new CPUNode(this._event, this._children);
  }
}

module.exports = CPUNode;