/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
"use strict";

import $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const rustplus = $root.rustplus = (() => {

    /**
     * Namespace rustplus.
     * @exports rustplus
     * @namespace
     */
    const rustplus = {};

    rustplus.Vector2 = (function() {

        /**
         * Properties of a Vector2.
         * @typedef {Object} rustplus.Vector2.$Properties
         * @property {number|null} [x] Vector2 x
         * @property {number|null} [y] Vector2 y
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a Vector2.
         * @memberof rustplus
         * @interface IVector2
         * @augments rustplus.Vector2.$Properties
         * @deprecated Use rustplus.Vector2.$Properties instead.
         */

        /**
         * Shape of a Vector2.
         * @typedef {rustplus.Vector2.$Properties} rustplus.Vector2.$Shape
         */

        /**
         * Constructs a new Vector2.
         * @memberof rustplus
         * @classdesc Represents a Vector2.
         * @constructor
         * @param {rustplus.Vector2.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function Vector2(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vector2 x.
         * @member {number} x
         * @memberof rustplus.Vector2
         * @instance
         */
        Vector2.prototype.x = 0;

        /**
         * Vector2 y.
         * @member {number} y
         * @memberof rustplus.Vector2
         * @instance
         */
        Vector2.prototype.y = 0;

        /**
         * Creates a new Vector2 instance using the specified properties.
         * @function create
         * @memberof rustplus.Vector2
         * @static
         * @param {rustplus.Vector2.$Properties=} [properties] Properties to set
         * @returns {rustplus.Vector2} Vector2 instance
         * @type {{
         *   (properties: rustplus.Vector2.$Shape): rustplus.Vector2 & rustplus.Vector2.$Shape;
         *   (properties?: rustplus.Vector2.$Properties): rustplus.Vector2;
         * }}
         */
        Vector2.create = function create(properties) {
            return new Vector2(properties);
        };

        /**
         * Encodes the specified Vector2 message. Does not implicitly {@link rustplus.Vector2.verify|verify} messages.
         * @function encode
         * @memberof rustplus.Vector2
         * @static
         * @param {rustplus.Vector2.$Properties} message Vector2 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector2.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Vector2 message, length delimited. Does not implicitly {@link rustplus.Vector2.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.Vector2
         * @static
         * @param {rustplus.Vector2.$Properties} message Vector2 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector2.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vector2 message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.Vector2
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.Vector2 & rustplus.Vector2.$Shape} Vector2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector2.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.Vector2();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 5)
                            break;
                        message.x = reader.float();
                        continue;
                    }
                case 2: {
                        if (wireType !== 5)
                            break;
                        message.y = reader.float();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes a Vector2 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.Vector2
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.Vector2 & rustplus.Vector2.$Shape} Vector2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector2.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vector2 message.
         * @function verify
         * @memberof rustplus.Vector2
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vector2.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            return null;
        };

        /**
         * Creates a Vector2 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.Vector2
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.Vector2} Vector2
         */
        Vector2.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.Vector2)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.Vector2();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            return message;
        };

        /**
         * Creates a plain object from a Vector2 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.Vector2
         * @static
         * @param {rustplus.Vector2} message Vector2
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vector2.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            return object;
        };

        /**
         * Converts this Vector2 to JSON.
         * @function toJSON
         * @memberof rustplus.Vector2
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vector2.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Vector2
         * @function getTypeUrl
         * @memberof rustplus.Vector2
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Vector2.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.Vector2";
        };

        return Vector2;
    })();

    rustplus.Vector3 = (function() {

        /**
         * Properties of a Vector3.
         * @typedef {Object} rustplus.Vector3.$Properties
         * @property {number|null} [x] Vector3 x
         * @property {number|null} [y] Vector3 y
         * @property {number|null} [z] Vector3 z
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a Vector3.
         * @memberof rustplus
         * @interface IVector3
         * @augments rustplus.Vector3.$Properties
         * @deprecated Use rustplus.Vector3.$Properties instead.
         */

        /**
         * Shape of a Vector3.
         * @typedef {rustplus.Vector3.$Properties} rustplus.Vector3.$Shape
         */

        /**
         * Constructs a new Vector3.
         * @memberof rustplus
         * @classdesc Represents a Vector3.
         * @constructor
         * @param {rustplus.Vector3.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function Vector3(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vector3 x.
         * @member {number} x
         * @memberof rustplus.Vector3
         * @instance
         */
        Vector3.prototype.x = 0;

        /**
         * Vector3 y.
         * @member {number} y
         * @memberof rustplus.Vector3
         * @instance
         */
        Vector3.prototype.y = 0;

        /**
         * Vector3 z.
         * @member {number} z
         * @memberof rustplus.Vector3
         * @instance
         */
        Vector3.prototype.z = 0;

        /**
         * Creates a new Vector3 instance using the specified properties.
         * @function create
         * @memberof rustplus.Vector3
         * @static
         * @param {rustplus.Vector3.$Properties=} [properties] Properties to set
         * @returns {rustplus.Vector3} Vector3 instance
         * @type {{
         *   (properties: rustplus.Vector3.$Shape): rustplus.Vector3 & rustplus.Vector3.$Shape;
         *   (properties?: rustplus.Vector3.$Properties): rustplus.Vector3;
         * }}
         */
        Vector3.create = function create(properties) {
            return new Vector3(properties);
        };

        /**
         * Encodes the specified Vector3 message. Does not implicitly {@link rustplus.Vector3.verify|verify} messages.
         * @function encode
         * @memberof rustplus.Vector3
         * @static
         * @param {rustplus.Vector3.$Properties} message Vector3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector3.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link rustplus.Vector3.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.Vector3
         * @static
         * @param {rustplus.Vector3.$Properties} message Vector3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector3.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vector3 message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.Vector3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.Vector3 & rustplus.Vector3.$Shape} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector3.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.Vector3();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 5)
                            break;
                        message.x = reader.float();
                        continue;
                    }
                case 2: {
                        if (wireType !== 5)
                            break;
                        message.y = reader.float();
                        continue;
                    }
                case 3: {
                        if (wireType !== 5)
                            break;
                        message.z = reader.float();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes a Vector3 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.Vector3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.Vector3 & rustplus.Vector3.$Shape} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector3.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vector3 message.
         * @function verify
         * @memberof rustplus.Vector3
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vector3.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            return null;
        };

        /**
         * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.Vector3
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.Vector3} Vector3
         */
        Vector3.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.Vector3)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.Vector3();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            return message;
        };

        /**
         * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.Vector3
         * @static
         * @param {rustplus.Vector3} message Vector3
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vector3.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            return object;
        };

        /**
         * Converts this Vector3 to JSON.
         * @function toJSON
         * @memberof rustplus.Vector3
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vector3.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Vector3
         * @function getTypeUrl
         * @memberof rustplus.Vector3
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Vector3.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.Vector3";
        };

        return Vector3;
    })();

    rustplus.Vector4 = (function() {

        /**
         * Properties of a Vector4.
         * @typedef {Object} rustplus.Vector4.$Properties
         * @property {number|null} [x] Vector4 x
         * @property {number|null} [y] Vector4 y
         * @property {number|null} [z] Vector4 z
         * @property {number|null} [w] Vector4 w
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a Vector4.
         * @memberof rustplus
         * @interface IVector4
         * @augments rustplus.Vector4.$Properties
         * @deprecated Use rustplus.Vector4.$Properties instead.
         */

        /**
         * Shape of a Vector4.
         * @typedef {rustplus.Vector4.$Properties} rustplus.Vector4.$Shape
         */

        /**
         * Constructs a new Vector4.
         * @memberof rustplus
         * @classdesc Represents a Vector4.
         * @constructor
         * @param {rustplus.Vector4.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function Vector4(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Vector4 x.
         * @member {number} x
         * @memberof rustplus.Vector4
         * @instance
         */
        Vector4.prototype.x = 0;

        /**
         * Vector4 y.
         * @member {number} y
         * @memberof rustplus.Vector4
         * @instance
         */
        Vector4.prototype.y = 0;

        /**
         * Vector4 z.
         * @member {number} z
         * @memberof rustplus.Vector4
         * @instance
         */
        Vector4.prototype.z = 0;

        /**
         * Vector4 w.
         * @member {number} w
         * @memberof rustplus.Vector4
         * @instance
         */
        Vector4.prototype.w = 0;

        /**
         * Creates a new Vector4 instance using the specified properties.
         * @function create
         * @memberof rustplus.Vector4
         * @static
         * @param {rustplus.Vector4.$Properties=} [properties] Properties to set
         * @returns {rustplus.Vector4} Vector4 instance
         * @type {{
         *   (properties: rustplus.Vector4.$Shape): rustplus.Vector4 & rustplus.Vector4.$Shape;
         *   (properties?: rustplus.Vector4.$Properties): rustplus.Vector4;
         * }}
         */
        Vector4.create = function create(properties) {
            return new Vector4(properties);
        };

        /**
         * Encodes the specified Vector4 message. Does not implicitly {@link rustplus.Vector4.verify|verify} messages.
         * @function encode
         * @memberof rustplus.Vector4
         * @static
         * @param {rustplus.Vector4.$Properties} message Vector4 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector4.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            if (message.w != null && Object.hasOwnProperty.call(message, "w"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.w);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Vector4 message, length delimited. Does not implicitly {@link rustplus.Vector4.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.Vector4
         * @static
         * @param {rustplus.Vector4.$Properties} message Vector4 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Vector4.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Vector4 message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.Vector4
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.Vector4 & rustplus.Vector4.$Shape} Vector4
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector4.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.Vector4();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 5)
                            break;
                        message.x = reader.float();
                        continue;
                    }
                case 2: {
                        if (wireType !== 5)
                            break;
                        message.y = reader.float();
                        continue;
                    }
                case 3: {
                        if (wireType !== 5)
                            break;
                        message.z = reader.float();
                        continue;
                    }
                case 4: {
                        if (wireType !== 5)
                            break;
                        message.w = reader.float();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes a Vector4 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.Vector4
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.Vector4 & rustplus.Vector4.$Shape} Vector4
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Vector4.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Vector4 message.
         * @function verify
         * @memberof rustplus.Vector4
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Vector4.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            if (message.w != null && message.hasOwnProperty("w"))
                if (typeof message.w !== "number")
                    return "w: number expected";
            return null;
        };

        /**
         * Creates a Vector4 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.Vector4
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.Vector4} Vector4
         */
        Vector4.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.Vector4)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.Vector4();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            if (object.w != null)
                message.w = Number(object.w);
            return message;
        };

        /**
         * Creates a plain object from a Vector4 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.Vector4
         * @static
         * @param {rustplus.Vector4} message Vector4
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Vector4.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
                object.w = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            if (message.w != null && message.hasOwnProperty("w"))
                object.w = options.json && !isFinite(message.w) ? String(message.w) : message.w;
            return object;
        };

        /**
         * Converts this Vector4 to JSON.
         * @function toJSON
         * @memberof rustplus.Vector4
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Vector4.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Vector4
         * @function getTypeUrl
         * @memberof rustplus.Vector4
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Vector4.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.Vector4";
        };

        return Vector4;
    })();

    rustplus.Half3 = (function() {

        /**
         * Properties of a Half3.
         * @typedef {Object} rustplus.Half3.$Properties
         * @property {number|null} [x] Half3 x
         * @property {number|null} [y] Half3 y
         * @property {number|null} [z] Half3 z
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a Half3.
         * @memberof rustplus
         * @interface IHalf3
         * @augments rustplus.Half3.$Properties
         * @deprecated Use rustplus.Half3.$Properties instead.
         */

        /**
         * Shape of a Half3.
         * @typedef {rustplus.Half3.$Properties} rustplus.Half3.$Shape
         */

        /**
         * Constructs a new Half3.
         * @memberof rustplus
         * @classdesc Represents a Half3.
         * @constructor
         * @param {rustplus.Half3.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function Half3(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Half3 x.
         * @member {number} x
         * @memberof rustplus.Half3
         * @instance
         */
        Half3.prototype.x = 0;

        /**
         * Half3 y.
         * @member {number} y
         * @memberof rustplus.Half3
         * @instance
         */
        Half3.prototype.y = 0;

        /**
         * Half3 z.
         * @member {number} z
         * @memberof rustplus.Half3
         * @instance
         */
        Half3.prototype.z = 0;

        /**
         * Creates a new Half3 instance using the specified properties.
         * @function create
         * @memberof rustplus.Half3
         * @static
         * @param {rustplus.Half3.$Properties=} [properties] Properties to set
         * @returns {rustplus.Half3} Half3 instance
         * @type {{
         *   (properties: rustplus.Half3.$Shape): rustplus.Half3 & rustplus.Half3.$Shape;
         *   (properties?: rustplus.Half3.$Properties): rustplus.Half3;
         * }}
         */
        Half3.create = function create(properties) {
            return new Half3(properties);
        };

        /**
         * Encodes the specified Half3 message. Does not implicitly {@link rustplus.Half3.verify|verify} messages.
         * @function encode
         * @memberof rustplus.Half3
         * @static
         * @param {rustplus.Half3.$Properties} message Half3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Half3.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.x != null && Object.hasOwnProperty.call(message, "x"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.x);
            if (message.y != null && Object.hasOwnProperty.call(message, "y"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.y);
            if (message.z != null && Object.hasOwnProperty.call(message, "z"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.z);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Half3 message, length delimited. Does not implicitly {@link rustplus.Half3.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.Half3
         * @static
         * @param {rustplus.Half3.$Properties} message Half3 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Half3.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Half3 message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.Half3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.Half3 & rustplus.Half3.$Shape} Half3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Half3.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.Half3();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 5)
                            break;
                        message.x = reader.float();
                        continue;
                    }
                case 2: {
                        if (wireType !== 5)
                            break;
                        message.y = reader.float();
                        continue;
                    }
                case 3: {
                        if (wireType !== 5)
                            break;
                        message.z = reader.float();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes a Half3 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.Half3
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.Half3 & rustplus.Half3.$Shape} Half3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Half3.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Half3 message.
         * @function verify
         * @memberof rustplus.Half3
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Half3.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.x != null && message.hasOwnProperty("x"))
                if (typeof message.x !== "number")
                    return "x: number expected";
            if (message.y != null && message.hasOwnProperty("y"))
                if (typeof message.y !== "number")
                    return "y: number expected";
            if (message.z != null && message.hasOwnProperty("z"))
                if (typeof message.z !== "number")
                    return "z: number expected";
            return null;
        };

        /**
         * Creates a Half3 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.Half3
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.Half3} Half3
         */
        Half3.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.Half3)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.Half3();
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.z != null)
                message.z = Number(object.z);
            return message;
        };

        /**
         * Creates a plain object from a Half3 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.Half3
         * @static
         * @param {rustplus.Half3} message Half3
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Half3.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.x = 0;
                object.y = 0;
                object.z = 0;
            }
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.z != null && message.hasOwnProperty("z"))
                object.z = options.json && !isFinite(message.z) ? String(message.z) : message.z;
            return object;
        };

        /**
         * Converts this Half3 to JSON.
         * @function toJSON
         * @memberof rustplus.Half3
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Half3.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Half3
         * @function getTypeUrl
         * @memberof rustplus.Half3
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Half3.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.Half3";
        };

        return Half3;
    })();

    rustplus.Color = (function() {

        /**
         * Properties of a Color.
         * @typedef {Object} rustplus.Color.$Properties
         * @property {number|null} [r] Color r
         * @property {number|null} [g] Color g
         * @property {number|null} [b] Color b
         * @property {number|null} [a] Color a
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a Color.
         * @memberof rustplus
         * @interface IColor
         * @augments rustplus.Color.$Properties
         * @deprecated Use rustplus.Color.$Properties instead.
         */

        /**
         * Shape of a Color.
         * @typedef {rustplus.Color.$Properties} rustplus.Color.$Shape
         */

        /**
         * Constructs a new Color.
         * @memberof rustplus
         * @classdesc Represents a Color.
         * @constructor
         * @param {rustplus.Color.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function Color(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Color r.
         * @member {number} r
         * @memberof rustplus.Color
         * @instance
         */
        Color.prototype.r = 0;

        /**
         * Color g.
         * @member {number} g
         * @memberof rustplus.Color
         * @instance
         */
        Color.prototype.g = 0;

        /**
         * Color b.
         * @member {number} b
         * @memberof rustplus.Color
         * @instance
         */
        Color.prototype.b = 0;

        /**
         * Color a.
         * @member {number} a
         * @memberof rustplus.Color
         * @instance
         */
        Color.prototype.a = 0;

        /**
         * Creates a new Color instance using the specified properties.
         * @function create
         * @memberof rustplus.Color
         * @static
         * @param {rustplus.Color.$Properties=} [properties] Properties to set
         * @returns {rustplus.Color} Color instance
         * @type {{
         *   (properties: rustplus.Color.$Shape): rustplus.Color & rustplus.Color.$Shape;
         *   (properties?: rustplus.Color.$Properties): rustplus.Color;
         * }}
         */
        Color.create = function create(properties) {
            return new Color(properties);
        };

        /**
         * Encodes the specified Color message. Does not implicitly {@link rustplus.Color.verify|verify} messages.
         * @function encode
         * @memberof rustplus.Color
         * @static
         * @param {rustplus.Color.$Properties} message Color message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Color.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.r != null && Object.hasOwnProperty.call(message, "r"))
                writer.uint32(/* id 1, wireType 5 =*/13).float(message.r);
            if (message.g != null && Object.hasOwnProperty.call(message, "g"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.g);
            if (message.b != null && Object.hasOwnProperty.call(message, "b"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.b);
            if (message.a != null && Object.hasOwnProperty.call(message, "a"))
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.a);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Color message, length delimited. Does not implicitly {@link rustplus.Color.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.Color
         * @static
         * @param {rustplus.Color.$Properties} message Color message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Color.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Color message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.Color
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.Color & rustplus.Color.$Shape} Color
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Color.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.Color();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 5)
                            break;
                        message.r = reader.float();
                        continue;
                    }
                case 2: {
                        if (wireType !== 5)
                            break;
                        message.g = reader.float();
                        continue;
                    }
                case 3: {
                        if (wireType !== 5)
                            break;
                        message.b = reader.float();
                        continue;
                    }
                case 4: {
                        if (wireType !== 5)
                            break;
                        message.a = reader.float();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes a Color message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.Color
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.Color & rustplus.Color.$Shape} Color
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Color.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Color message.
         * @function verify
         * @memberof rustplus.Color
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Color.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.r != null && message.hasOwnProperty("r"))
                if (typeof message.r !== "number")
                    return "r: number expected";
            if (message.g != null && message.hasOwnProperty("g"))
                if (typeof message.g !== "number")
                    return "g: number expected";
            if (message.b != null && message.hasOwnProperty("b"))
                if (typeof message.b !== "number")
                    return "b: number expected";
            if (message.a != null && message.hasOwnProperty("a"))
                if (typeof message.a !== "number")
                    return "a: number expected";
            return null;
        };

        /**
         * Creates a Color message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.Color
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.Color} Color
         */
        Color.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.Color)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.Color();
            if (object.r != null)
                message.r = Number(object.r);
            if (object.g != null)
                message.g = Number(object.g);
            if (object.b != null)
                message.b = Number(object.b);
            if (object.a != null)
                message.a = Number(object.a);
            return message;
        };

        /**
         * Creates a plain object from a Color message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.Color
         * @static
         * @param {rustplus.Color} message Color
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Color.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.r = 0;
                object.g = 0;
                object.b = 0;
                object.a = 0;
            }
            if (message.r != null && message.hasOwnProperty("r"))
                object.r = options.json && !isFinite(message.r) ? String(message.r) : message.r;
            if (message.g != null && message.hasOwnProperty("g"))
                object.g = options.json && !isFinite(message.g) ? String(message.g) : message.g;
            if (message.b != null && message.hasOwnProperty("b"))
                object.b = options.json && !isFinite(message.b) ? String(message.b) : message.b;
            if (message.a != null && message.hasOwnProperty("a"))
                object.a = options.json && !isFinite(message.a) ? String(message.a) : message.a;
            return object;
        };

        /**
         * Converts this Color to JSON.
         * @function toJSON
         * @memberof rustplus.Color
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Color.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Color
         * @function getTypeUrl
         * @memberof rustplus.Color
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Color.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.Color";
        };

        return Color;
    })();

    rustplus.Ray = (function() {

        /**
         * Properties of a Ray.
         * @typedef {Object} rustplus.Ray.$Properties
         * @property {rustplus.Vector3.$Properties|null} [origin] Ray origin
         * @property {rustplus.Vector3.$Properties|null} [direction] Ray direction
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a Ray.
         * @memberof rustplus
         * @interface IRay
         * @augments rustplus.Ray.$Properties
         * @deprecated Use rustplus.Ray.$Properties instead.
         */

        /**
         * Shape of a Ray.
         * @typedef {rustplus.Ray.$Properties} rustplus.Ray.$Shape
         */

        /**
         * Constructs a new Ray.
         * @memberof rustplus
         * @classdesc Represents a Ray.
         * @constructor
         * @param {rustplus.Ray.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function Ray(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Ray origin.
         * @member {rustplus.Vector3.$Properties|null|undefined} origin
         * @memberof rustplus.Ray
         * @instance
         */
        Ray.prototype.origin = null;

        /**
         * Ray direction.
         * @member {rustplus.Vector3.$Properties|null|undefined} direction
         * @memberof rustplus.Ray
         * @instance
         */
        Ray.prototype.direction = null;

        /**
         * Creates a new Ray instance using the specified properties.
         * @function create
         * @memberof rustplus.Ray
         * @static
         * @param {rustplus.Ray.$Properties=} [properties] Properties to set
         * @returns {rustplus.Ray} Ray instance
         * @type {{
         *   (properties: rustplus.Ray.$Shape): rustplus.Ray & rustplus.Ray.$Shape;
         *   (properties?: rustplus.Ray.$Properties): rustplus.Ray;
         * }}
         */
        Ray.create = function create(properties) {
            return new Ray(properties);
        };

        /**
         * Encodes the specified Ray message. Does not implicitly {@link rustplus.Ray.verify|verify} messages.
         * @function encode
         * @memberof rustplus.Ray
         * @static
         * @param {rustplus.Ray.$Properties} message Ray message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ray.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.origin != null && Object.hasOwnProperty.call(message, "origin"))
                $root.rustplus.Vector3.encode(message.origin, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.direction != null && Object.hasOwnProperty.call(message, "direction"))
                $root.rustplus.Vector3.encode(message.direction, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified Ray message, length delimited. Does not implicitly {@link rustplus.Ray.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.Ray
         * @static
         * @param {rustplus.Ray.$Properties} message Ray message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Ray.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Ray message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.Ray
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.Ray & rustplus.Ray.$Shape} Ray
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ray.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.Ray();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.origin = $root.rustplus.Vector3.decode(reader, reader.uint32(), undefined, _depth + 1, message.origin);
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.direction = $root.rustplus.Vector3.decode(reader, reader.uint32(), undefined, _depth + 1, message.direction);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes a Ray message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.Ray
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.Ray & rustplus.Ray.$Shape} Ray
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Ray.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Ray message.
         * @function verify
         * @memberof rustplus.Ray
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Ray.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.origin != null && message.hasOwnProperty("origin")) {
                let error = $root.rustplus.Vector3.verify(message.origin, _depth + 1);
                if (error)
                    return "origin." + error;
            }
            if (message.direction != null && message.hasOwnProperty("direction")) {
                let error = $root.rustplus.Vector3.verify(message.direction, _depth + 1);
                if (error)
                    return "direction." + error;
            }
            return null;
        };

        /**
         * Creates a Ray message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.Ray
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.Ray} Ray
         */
        Ray.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.Ray)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.Ray();
            if (object.origin != null) {
                if (typeof object.origin !== "object")
                    throw TypeError(".rustplus.Ray.origin: object expected");
                message.origin = $root.rustplus.Vector3.fromObject(object.origin, _depth + 1);
            }
            if (object.direction != null) {
                if (typeof object.direction !== "object")
                    throw TypeError(".rustplus.Ray.direction: object expected");
                message.direction = $root.rustplus.Vector3.fromObject(object.direction, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a Ray message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.Ray
         * @static
         * @param {rustplus.Ray} message Ray
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Ray.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.origin = null;
                object.direction = null;
            }
            if (message.origin != null && message.hasOwnProperty("origin"))
                object.origin = $root.rustplus.Vector3.toObject(message.origin, options);
            if (message.direction != null && message.hasOwnProperty("direction"))
                object.direction = $root.rustplus.Vector3.toObject(message.direction, options);
            return object;
        };

        /**
         * Converts this Ray to JSON.
         * @function toJSON
         * @memberof rustplus.Ray
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Ray.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for Ray
         * @function getTypeUrl
         * @memberof rustplus.Ray
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        Ray.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.Ray";
        };

        return Ray;
    })();

    rustplus.ClanActionResult = (function() {

        /**
         * Properties of a ClanActionResult.
         * @typedef {Object} rustplus.ClanActionResult.$Properties
         * @property {number} requestId ClanActionResult requestId
         * @property {number} result ClanActionResult result
         * @property {boolean} hasClanInfo ClanActionResult hasClanInfo
         * @property {rustplus.ClanInfo.$Properties|null} [clanInfo] ClanActionResult clanInfo
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a ClanActionResult.
         * @memberof rustplus
         * @interface IClanActionResult
         * @augments rustplus.ClanActionResult.$Properties
         * @deprecated Use rustplus.ClanActionResult.$Properties instead.
         */

        /**
         * Shape of a ClanActionResult.
         * @typedef {rustplus.ClanActionResult.$Properties} rustplus.ClanActionResult.$Shape
         */

        /**
         * Constructs a new ClanActionResult.
         * @memberof rustplus
         * @classdesc Represents a ClanActionResult.
         * @constructor
         * @param {rustplus.ClanActionResult.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function ClanActionResult(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClanActionResult requestId.
         * @member {number} requestId
         * @memberof rustplus.ClanActionResult
         * @instance
         */
        ClanActionResult.prototype.requestId = 0;

        /**
         * ClanActionResult result.
         * @member {number} result
         * @memberof rustplus.ClanActionResult
         * @instance
         */
        ClanActionResult.prototype.result = 0;

        /**
         * ClanActionResult hasClanInfo.
         * @member {boolean} hasClanInfo
         * @memberof rustplus.ClanActionResult
         * @instance
         */
        ClanActionResult.prototype.hasClanInfo = false;

        /**
         * ClanActionResult clanInfo.
         * @member {rustplus.ClanInfo.$Properties|null|undefined} clanInfo
         * @memberof rustplus.ClanActionResult
         * @instance
         */
        ClanActionResult.prototype.clanInfo = null;

        /**
         * Creates a new ClanActionResult instance using the specified properties.
         * @function create
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {rustplus.ClanActionResult.$Properties=} [properties] Properties to set
         * @returns {rustplus.ClanActionResult} ClanActionResult instance
         * @type {{
         *   (properties: rustplus.ClanActionResult.$Shape): rustplus.ClanActionResult & rustplus.ClanActionResult.$Shape;
         *   (properties?: rustplus.ClanActionResult.$Properties): rustplus.ClanActionResult;
         * }}
         */
        ClanActionResult.create = function create(properties) {
            return new ClanActionResult(properties);
        };

        /**
         * Encodes the specified ClanActionResult message. Does not implicitly {@link rustplus.ClanActionResult.verify|verify} messages.
         * @function encode
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {rustplus.ClanActionResult.$Properties} message ClanActionResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClanActionResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.requestId);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.result);
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.hasClanInfo);
            if (message.clanInfo != null && Object.hasOwnProperty.call(message, "clanInfo"))
                $root.rustplus.ClanInfo.encode(message.clanInfo, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified ClanActionResult message, length delimited. Does not implicitly {@link rustplus.ClanActionResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {rustplus.ClanActionResult.$Properties} message ClanActionResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClanActionResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClanActionResult message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.ClanActionResult & rustplus.ClanActionResult.$Shape} ClanActionResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClanActionResult.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanActionResult();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.requestId = reader.int32();
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.result = reader.int32();
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        message.hasClanInfo = reader.bool();
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        message.clanInfo = $root.rustplus.ClanInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.clanInfo);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("requestId"))
                throw $util.ProtocolError("missing required 'requestId'", { instance: message });
            if (!message.hasOwnProperty("result"))
                throw $util.ProtocolError("missing required 'result'", { instance: message });
            if (!message.hasOwnProperty("hasClanInfo"))
                throw $util.ProtocolError("missing required 'hasClanInfo'", { instance: message });
            return message;
        };

        /**
         * Decodes a ClanActionResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.ClanActionResult & rustplus.ClanActionResult.$Shape} ClanActionResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClanActionResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClanActionResult message.
         * @function verify
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClanActionResult.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.requestId))
                return "requestId: integer expected";
            if (!$util.isInteger(message.result))
                return "result: integer expected";
            if (typeof message.hasClanInfo !== "boolean")
                return "hasClanInfo: boolean expected";
            if (message.clanInfo != null && message.hasOwnProperty("clanInfo")) {
                let error = $root.rustplus.ClanInfo.verify(message.clanInfo, _depth + 1);
                if (error)
                    return "clanInfo." + error;
            }
            return null;
        };

        /**
         * Creates a ClanActionResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.ClanActionResult} ClanActionResult
         */
        ClanActionResult.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.ClanActionResult)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.ClanActionResult();
            if (object.requestId != null)
                message.requestId = object.requestId | 0;
            if (object.result != null)
                message.result = object.result | 0;
            if (object.hasClanInfo != null)
                message.hasClanInfo = Boolean(object.hasClanInfo);
            if (object.clanInfo != null) {
                if (typeof object.clanInfo !== "object")
                    throw TypeError(".rustplus.ClanActionResult.clanInfo: object expected");
                message.clanInfo = $root.rustplus.ClanInfo.fromObject(object.clanInfo, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a ClanActionResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {rustplus.ClanActionResult} message ClanActionResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClanActionResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.requestId = 0;
                object.result = 0;
                object.hasClanInfo = false;
                object.clanInfo = null;
            }
            if (message.requestId != null && message.hasOwnProperty("requestId"))
                object.requestId = message.requestId;
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = message.result;
            if (message.hasClanInfo != null && message.hasOwnProperty("hasClanInfo"))
                object.hasClanInfo = message.hasClanInfo;
            if (message.clanInfo != null && message.hasOwnProperty("clanInfo"))
                object.clanInfo = $root.rustplus.ClanInfo.toObject(message.clanInfo, options);
            return object;
        };

        /**
         * Converts this ClanActionResult to JSON.
         * @function toJSON
         * @memberof rustplus.ClanActionResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClanActionResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for ClanActionResult
         * @function getTypeUrl
         * @memberof rustplus.ClanActionResult
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        ClanActionResult.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.ClanActionResult";
        };

        return ClanActionResult;
    })();

    rustplus.ClanInfo = (function() {

        /**
         * Properties of a ClanInfo.
         * @typedef {Object} rustplus.ClanInfo.$Properties
         * @property {number|Long} clanId ClanInfo clanId
         * @property {string} name ClanInfo name
         * @property {number|Long} created ClanInfo created
         * @property {number|Long} creator ClanInfo creator
         * @property {string|null} [motd] ClanInfo motd
         * @property {number|Long|null} [motdTimestamp] ClanInfo motdTimestamp
         * @property {number|Long|null} [motdAuthor] ClanInfo motdAuthor
         * @property {Uint8Array|null} [logo] ClanInfo logo
         * @property {number|null} [color] ClanInfo color
         * @property {Array.<rustplus.ClanInfo.Role.$Properties>|null} [roles] ClanInfo roles
         * @property {Array.<rustplus.ClanInfo.Member.$Properties>|null} [members] ClanInfo members
         * @property {Array.<rustplus.ClanInfo.Invite.$Properties>|null} [invites] ClanInfo invites
         * @property {number|null} [maxMemberCount] ClanInfo maxMemberCount
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a ClanInfo.
         * @memberof rustplus
         * @interface IClanInfo
         * @augments rustplus.ClanInfo.$Properties
         * @deprecated Use rustplus.ClanInfo.$Properties instead.
         */

        /**
         * Shape of a ClanInfo.
         * @typedef {rustplus.ClanInfo.$Properties} rustplus.ClanInfo.$Shape
         */

        /**
         * Constructs a new ClanInfo.
         * @memberof rustplus
         * @classdesc Represents a ClanInfo.
         * @constructor
         * @param {rustplus.ClanInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function ClanInfo(properties) {
            this.roles = [];
            this.members = [];
            this.invites = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClanInfo clanId.
         * @member {number|Long} clanId
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.clanId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ClanInfo name.
         * @member {string} name
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.name = "";

        /**
         * ClanInfo created.
         * @member {number|Long} created
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.created = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ClanInfo creator.
         * @member {number|Long} creator
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.creator = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ClanInfo motd.
         * @member {string} motd
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.motd = "";

        /**
         * ClanInfo motdTimestamp.
         * @member {number|Long} motdTimestamp
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.motdTimestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ClanInfo motdAuthor.
         * @member {number|Long} motdAuthor
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.motdAuthor = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * ClanInfo logo.
         * @member {Uint8Array} logo
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.logo = $util.newBuffer([]);

        /**
         * ClanInfo color.
         * @member {number} color
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.color = 0;

        /**
         * ClanInfo roles.
         * @member {Array.<rustplus.ClanInfo.Role.$Properties>} roles
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.roles = $util.emptyArray;

        /**
         * ClanInfo members.
         * @member {Array.<rustplus.ClanInfo.Member.$Properties>} members
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.members = $util.emptyArray;

        /**
         * ClanInfo invites.
         * @member {Array.<rustplus.ClanInfo.Invite.$Properties>} invites
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.invites = $util.emptyArray;

        /**
         * ClanInfo maxMemberCount.
         * @member {number} maxMemberCount
         * @memberof rustplus.ClanInfo
         * @instance
         */
        ClanInfo.prototype.maxMemberCount = 0;

        /**
         * Creates a new ClanInfo instance using the specified properties.
         * @function create
         * @memberof rustplus.ClanInfo
         * @static
         * @param {rustplus.ClanInfo.$Properties=} [properties] Properties to set
         * @returns {rustplus.ClanInfo} ClanInfo instance
         * @type {{
         *   (properties: rustplus.ClanInfo.$Shape): rustplus.ClanInfo & rustplus.ClanInfo.$Shape;
         *   (properties?: rustplus.ClanInfo.$Properties): rustplus.ClanInfo;
         * }}
         */
        ClanInfo.create = function create(properties) {
            return new ClanInfo(properties);
        };

        /**
         * Encodes the specified ClanInfo message. Does not implicitly {@link rustplus.ClanInfo.verify|verify} messages.
         * @function encode
         * @memberof rustplus.ClanInfo
         * @static
         * @param {rustplus.ClanInfo.$Properties} message ClanInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClanInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.clanId);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            writer.uint32(/* id 3, wireType 0 =*/24).int64(message.created);
            writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.creator);
            if (message.motd != null && Object.hasOwnProperty.call(message, "motd"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.motd);
            if (message.motdTimestamp != null && Object.hasOwnProperty.call(message, "motdTimestamp"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.motdTimestamp);
            if (message.motdAuthor != null && Object.hasOwnProperty.call(message, "motdAuthor"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.motdAuthor);
            if (message.logo != null && Object.hasOwnProperty.call(message, "logo"))
                writer.uint32(/* id 8, wireType 2 =*/66).bytes(message.logo);
            if (message.color != null && Object.hasOwnProperty.call(message, "color"))
                writer.uint32(/* id 9, wireType 0 =*/72).sint32(message.color);
            if (message.roles != null && message.roles.length)
                for (let i = 0; i < message.roles.length; ++i)
                    $root.rustplus.ClanInfo.Role.encode(message.roles[i], writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.members != null && message.members.length)
                for (let i = 0; i < message.members.length; ++i)
                    $root.rustplus.ClanInfo.Member.encode(message.members[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.invites != null && message.invites.length)
                for (let i = 0; i < message.invites.length; ++i)
                    $root.rustplus.ClanInfo.Invite.encode(message.invites[i], writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.maxMemberCount != null && Object.hasOwnProperty.call(message, "maxMemberCount"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.maxMemberCount);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified ClanInfo message, length delimited. Does not implicitly {@link rustplus.ClanInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.ClanInfo
         * @static
         * @param {rustplus.ClanInfo.$Properties} message ClanInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClanInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClanInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.ClanInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.ClanInfo & rustplus.ClanInfo.$Shape} ClanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClanInfo.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanInfo();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.clanId = reader.int64();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.name = reader.string();
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        message.created = reader.int64();
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.creator = reader.uint64();
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        message.motd = reader.string();
                        continue;
                    }
                case 6: {
                        if (wireType !== 0)
                            break;
                        message.motdTimestamp = reader.int64();
                        continue;
                    }
                case 7: {
                        if (wireType !== 0)
                            break;
                        message.motdAuthor = reader.uint64();
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.logo = reader.bytes();
                        continue;
                    }
                case 9: {
                        if (wireType !== 0)
                            break;
                        message.color = reader.sint32();
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        if (!(message.roles && message.roles.length))
                            message.roles = [];
                        message.roles.push($root.rustplus.ClanInfo.Role.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                case 11: {
                        if (wireType !== 2)
                            break;
                        if (!(message.members && message.members.length))
                            message.members = [];
                        message.members.push($root.rustplus.ClanInfo.Member.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                case 12: {
                        if (wireType !== 2)
                            break;
                        if (!(message.invites && message.invites.length))
                            message.invites = [];
                        message.invites.push($root.rustplus.ClanInfo.Invite.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                case 13: {
                        if (wireType !== 0)
                            break;
                        message.maxMemberCount = reader.int32();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("clanId"))
                throw $util.ProtocolError("missing required 'clanId'", { instance: message });
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("created"))
                throw $util.ProtocolError("missing required 'created'", { instance: message });
            if (!message.hasOwnProperty("creator"))
                throw $util.ProtocolError("missing required 'creator'", { instance: message });
            return message;
        };

        /**
         * Decodes a ClanInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.ClanInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.ClanInfo & rustplus.ClanInfo.$Shape} ClanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClanInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClanInfo message.
         * @function verify
         * @memberof rustplus.ClanInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClanInfo.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.clanId) && !(message.clanId && $util.isInteger(message.clanId.low) && $util.isInteger(message.clanId.high)))
                return "clanId: integer|Long expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isInteger(message.created) && !(message.created && $util.isInteger(message.created.low) && $util.isInteger(message.created.high)))
                return "created: integer|Long expected";
            if (!$util.isInteger(message.creator) && !(message.creator && $util.isInteger(message.creator.low) && $util.isInteger(message.creator.high)))
                return "creator: integer|Long expected";
            if (message.motd != null && message.hasOwnProperty("motd"))
                if (!$util.isString(message.motd))
                    return "motd: string expected";
            if (message.motdTimestamp != null && message.hasOwnProperty("motdTimestamp"))
                if (!$util.isInteger(message.motdTimestamp) && !(message.motdTimestamp && $util.isInteger(message.motdTimestamp.low) && $util.isInteger(message.motdTimestamp.high)))
                    return "motdTimestamp: integer|Long expected";
            if (message.motdAuthor != null && message.hasOwnProperty("motdAuthor"))
                if (!$util.isInteger(message.motdAuthor) && !(message.motdAuthor && $util.isInteger(message.motdAuthor.low) && $util.isInteger(message.motdAuthor.high)))
                    return "motdAuthor: integer|Long expected";
            if (message.logo != null && message.hasOwnProperty("logo"))
                if (!(message.logo && typeof message.logo.length === "number" || $util.isString(message.logo)))
                    return "logo: buffer expected";
            if (message.color != null && message.hasOwnProperty("color"))
                if (!$util.isInteger(message.color))
                    return "color: integer expected";
            if (message.roles != null && message.hasOwnProperty("roles")) {
                if (!Array.isArray(message.roles))
                    return "roles: array expected";
                for (let i = 0; i < message.roles.length; ++i) {
                    let error = $root.rustplus.ClanInfo.Role.verify(message.roles[i], _depth + 1);
                    if (error)
                        return "roles." + error;
                }
            }
            if (message.members != null && message.hasOwnProperty("members")) {
                if (!Array.isArray(message.members))
                    return "members: array expected";
                for (let i = 0; i < message.members.length; ++i) {
                    let error = $root.rustplus.ClanInfo.Member.verify(message.members[i], _depth + 1);
                    if (error)
                        return "members." + error;
                }
            }
            if (message.invites != null && message.hasOwnProperty("invites")) {
                if (!Array.isArray(message.invites))
                    return "invites: array expected";
                for (let i = 0; i < message.invites.length; ++i) {
                    let error = $root.rustplus.ClanInfo.Invite.verify(message.invites[i], _depth + 1);
                    if (error)
                        return "invites." + error;
                }
            }
            if (message.maxMemberCount != null && message.hasOwnProperty("maxMemberCount"))
                if (!$util.isInteger(message.maxMemberCount))
                    return "maxMemberCount: integer expected";
            return null;
        };

        /**
         * Creates a ClanInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.ClanInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.ClanInfo} ClanInfo
         */
        ClanInfo.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.ClanInfo)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.ClanInfo();
            if (object.clanId != null)
                if ($util.Long)
                    (message.clanId = $util.Long.fromValue(object.clanId)).unsigned = false;
                else if (typeof object.clanId === "string")
                    message.clanId = parseInt(object.clanId, 10);
                else if (typeof object.clanId === "number")
                    message.clanId = object.clanId;
                else if (typeof object.clanId === "object")
                    message.clanId = new $util.LongBits(object.clanId.low >>> 0, object.clanId.high >>> 0).toNumber();
            if (object.name != null)
                message.name = String(object.name);
            if (object.created != null)
                if ($util.Long)
                    (message.created = $util.Long.fromValue(object.created)).unsigned = false;
                else if (typeof object.created === "string")
                    message.created = parseInt(object.created, 10);
                else if (typeof object.created === "number")
                    message.created = object.created;
                else if (typeof object.created === "object")
                    message.created = new $util.LongBits(object.created.low >>> 0, object.created.high >>> 0).toNumber();
            if (object.creator != null)
                if ($util.Long)
                    (message.creator = $util.Long.fromValue(object.creator)).unsigned = true;
                else if (typeof object.creator === "string")
                    message.creator = parseInt(object.creator, 10);
                else if (typeof object.creator === "number")
                    message.creator = object.creator;
                else if (typeof object.creator === "object")
                    message.creator = new $util.LongBits(object.creator.low >>> 0, object.creator.high >>> 0).toNumber(true);
            if (object.motd != null)
                message.motd = String(object.motd);
            if (object.motdTimestamp != null)
                if ($util.Long)
                    (message.motdTimestamp = $util.Long.fromValue(object.motdTimestamp)).unsigned = false;
                else if (typeof object.motdTimestamp === "string")
                    message.motdTimestamp = parseInt(object.motdTimestamp, 10);
                else if (typeof object.motdTimestamp === "number")
                    message.motdTimestamp = object.motdTimestamp;
                else if (typeof object.motdTimestamp === "object")
                    message.motdTimestamp = new $util.LongBits(object.motdTimestamp.low >>> 0, object.motdTimestamp.high >>> 0).toNumber();
            if (object.motdAuthor != null)
                if ($util.Long)
                    (message.motdAuthor = $util.Long.fromValue(object.motdAuthor)).unsigned = true;
                else if (typeof object.motdAuthor === "string")
                    message.motdAuthor = parseInt(object.motdAuthor, 10);
                else if (typeof object.motdAuthor === "number")
                    message.motdAuthor = object.motdAuthor;
                else if (typeof object.motdAuthor === "object")
                    message.motdAuthor = new $util.LongBits(object.motdAuthor.low >>> 0, object.motdAuthor.high >>> 0).toNumber(true);
            if (object.logo != null)
                if (typeof object.logo === "string")
                    $util.base64.decode(object.logo, message.logo = $util.newBuffer($util.base64.length(object.logo)), 0);
                else if (object.logo.length >= 0)
                    message.logo = object.logo;
            if (object.color != null)
                message.color = object.color | 0;
            if (object.roles) {
                if (!Array.isArray(object.roles))
                    throw TypeError(".rustplus.ClanInfo.roles: array expected");
                message.roles = Array(object.roles.length);
                for (let i = 0; i < object.roles.length; ++i) {
                    if (typeof object.roles[i] !== "object")
                        throw TypeError(".rustplus.ClanInfo.roles: object expected");
                    message.roles[i] = $root.rustplus.ClanInfo.Role.fromObject(object.roles[i], _depth + 1);
                }
            }
            if (object.members) {
                if (!Array.isArray(object.members))
                    throw TypeError(".rustplus.ClanInfo.members: array expected");
                message.members = Array(object.members.length);
                for (let i = 0; i < object.members.length; ++i) {
                    if (typeof object.members[i] !== "object")
                        throw TypeError(".rustplus.ClanInfo.members: object expected");
                    message.members[i] = $root.rustplus.ClanInfo.Member.fromObject(object.members[i], _depth + 1);
                }
            }
            if (object.invites) {
                if (!Array.isArray(object.invites))
                    throw TypeError(".rustplus.ClanInfo.invites: array expected");
                message.invites = Array(object.invites.length);
                for (let i = 0; i < object.invites.length; ++i) {
                    if (typeof object.invites[i] !== "object")
                        throw TypeError(".rustplus.ClanInfo.invites: object expected");
                    message.invites[i] = $root.rustplus.ClanInfo.Invite.fromObject(object.invites[i], _depth + 1);
                }
            }
            if (object.maxMemberCount != null)
                message.maxMemberCount = object.maxMemberCount | 0;
            return message;
        };

        /**
         * Creates a plain object from a ClanInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.ClanInfo
         * @static
         * @param {rustplus.ClanInfo} message ClanInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClanInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.roles = [];
                object.members = [];
                object.invites = [];
            }
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.clanId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.clanId = options.longs === String ? "0" : 0;
                object.name = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.created = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.created = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.creator = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.creator = options.longs === String ? "0" : 0;
                object.motd = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.motdTimestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.motdTimestamp = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.motdAuthor = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.motdAuthor = options.longs === String ? "0" : 0;
                if (options.bytes === String)
                    object.logo = "";
                else {
                    object.logo = [];
                    if (options.bytes !== Array)
                        object.logo = $util.newBuffer(object.logo);
                }
                object.color = 0;
                object.maxMemberCount = 0;
            }
            if (message.clanId != null && message.hasOwnProperty("clanId"))
                if (typeof message.clanId === "number")
                    object.clanId = options.longs === String ? String(message.clanId) : message.clanId;
                else
                    object.clanId = options.longs === String ? $util.Long.prototype.toString.call(message.clanId) : options.longs === Number ? new $util.LongBits(message.clanId.low >>> 0, message.clanId.high >>> 0).toNumber() : message.clanId;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.created != null && message.hasOwnProperty("created"))
                if (typeof message.created === "number")
                    object.created = options.longs === String ? String(message.created) : message.created;
                else
                    object.created = options.longs === String ? $util.Long.prototype.toString.call(message.created) : options.longs === Number ? new $util.LongBits(message.created.low >>> 0, message.created.high >>> 0).toNumber() : message.created;
            if (message.creator != null && message.hasOwnProperty("creator"))
                if (typeof message.creator === "number")
                    object.creator = options.longs === String ? String(message.creator) : message.creator;
                else
                    object.creator = options.longs === String ? $util.Long.prototype.toString.call(message.creator) : options.longs === Number ? new $util.LongBits(message.creator.low >>> 0, message.creator.high >>> 0).toNumber(true) : message.creator;
            if (message.motd != null && message.hasOwnProperty("motd"))
                object.motd = message.motd;
            if (message.motdTimestamp != null && message.hasOwnProperty("motdTimestamp"))
                if (typeof message.motdTimestamp === "number")
                    object.motdTimestamp = options.longs === String ? String(message.motdTimestamp) : message.motdTimestamp;
                else
                    object.motdTimestamp = options.longs === String ? $util.Long.prototype.toString.call(message.motdTimestamp) : options.longs === Number ? new $util.LongBits(message.motdTimestamp.low >>> 0, message.motdTimestamp.high >>> 0).toNumber() : message.motdTimestamp;
            if (message.motdAuthor != null && message.hasOwnProperty("motdAuthor"))
                if (typeof message.motdAuthor === "number")
                    object.motdAuthor = options.longs === String ? String(message.motdAuthor) : message.motdAuthor;
                else
                    object.motdAuthor = options.longs === String ? $util.Long.prototype.toString.call(message.motdAuthor) : options.longs === Number ? new $util.LongBits(message.motdAuthor.low >>> 0, message.motdAuthor.high >>> 0).toNumber(true) : message.motdAuthor;
            if (message.logo != null && message.hasOwnProperty("logo"))
                object.logo = options.bytes === String ? $util.base64.encode(message.logo, 0, message.logo.length) : options.bytes === Array ? Array.prototype.slice.call(message.logo) : message.logo;
            if (message.color != null && message.hasOwnProperty("color"))
                object.color = message.color;
            if (message.roles && message.roles.length) {
                object.roles = Array(message.roles.length);
                for (let j = 0; j < message.roles.length; ++j)
                    object.roles[j] = $root.rustplus.ClanInfo.Role.toObject(message.roles[j], options);
            }
            if (message.members && message.members.length) {
                object.members = Array(message.members.length);
                for (let j = 0; j < message.members.length; ++j)
                    object.members[j] = $root.rustplus.ClanInfo.Member.toObject(message.members[j], options);
            }
            if (message.invites && message.invites.length) {
                object.invites = Array(message.invites.length);
                for (let j = 0; j < message.invites.length; ++j)
                    object.invites[j] = $root.rustplus.ClanInfo.Invite.toObject(message.invites[j], options);
            }
            if (message.maxMemberCount != null && message.hasOwnProperty("maxMemberCount"))
                object.maxMemberCount = message.maxMemberCount;
            return object;
        };

        /**
         * Converts this ClanInfo to JSON.
         * @function toJSON
         * @memberof rustplus.ClanInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClanInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for ClanInfo
         * @function getTypeUrl
         * @memberof rustplus.ClanInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        ClanInfo.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.ClanInfo";
        };

        ClanInfo.Role = (function() {

            /**
             * Properties of a Role.
             * @typedef {Object} rustplus.ClanInfo.Role.$Properties
             * @property {number} roleId Role roleId
             * @property {number} rank Role rank
             * @property {string} name Role name
             * @property {boolean} canSetMotd Role canSetMotd
             * @property {boolean} canSetLogo Role canSetLogo
             * @property {boolean} canInvite Role canInvite
             * @property {boolean} canKick Role canKick
             * @property {boolean} canPromote Role canPromote
             * @property {boolean} canDemote Role canDemote
             * @property {boolean} canSetPlayerNotes Role canSetPlayerNotes
             * @property {boolean} canAccessLogs Role canAccessLogs
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a Role.
             * @memberof rustplus.ClanInfo
             * @interface IRole
             * @augments rustplus.ClanInfo.Role.$Properties
             * @deprecated Use rustplus.ClanInfo.Role.$Properties instead.
             */

            /**
             * Shape of a Role.
             * @typedef {rustplus.ClanInfo.Role.$Properties} rustplus.ClanInfo.Role.$Shape
             */

            /**
             * Constructs a new Role.
             * @memberof rustplus.ClanInfo
             * @classdesc Represents a Role.
             * @constructor
             * @param {rustplus.ClanInfo.Role.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Role(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Role roleId.
             * @member {number} roleId
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.roleId = 0;

            /**
             * Role rank.
             * @member {number} rank
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.rank = 0;

            /**
             * Role name.
             * @member {string} name
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.name = "";

            /**
             * Role canSetMotd.
             * @member {boolean} canSetMotd
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.canSetMotd = false;

            /**
             * Role canSetLogo.
             * @member {boolean} canSetLogo
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.canSetLogo = false;

            /**
             * Role canInvite.
             * @member {boolean} canInvite
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.canInvite = false;

            /**
             * Role canKick.
             * @member {boolean} canKick
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.canKick = false;

            /**
             * Role canPromote.
             * @member {boolean} canPromote
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.canPromote = false;

            /**
             * Role canDemote.
             * @member {boolean} canDemote
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.canDemote = false;

            /**
             * Role canSetPlayerNotes.
             * @member {boolean} canSetPlayerNotes
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.canSetPlayerNotes = false;

            /**
             * Role canAccessLogs.
             * @member {boolean} canAccessLogs
             * @memberof rustplus.ClanInfo.Role
             * @instance
             */
            Role.prototype.canAccessLogs = false;

            /**
             * Creates a new Role instance using the specified properties.
             * @function create
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {rustplus.ClanInfo.Role.$Properties=} [properties] Properties to set
             * @returns {rustplus.ClanInfo.Role} Role instance
             * @type {{
             *   (properties: rustplus.ClanInfo.Role.$Shape): rustplus.ClanInfo.Role & rustplus.ClanInfo.Role.$Shape;
             *   (properties?: rustplus.ClanInfo.Role.$Properties): rustplus.ClanInfo.Role;
             * }}
             */
            Role.create = function create(properties) {
                return new Role(properties);
            };

            /**
             * Encodes the specified Role message. Does not implicitly {@link rustplus.ClanInfo.Role.verify|verify} messages.
             * @function encode
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {rustplus.ClanInfo.Role.$Properties} message Role message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Role.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.roleId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.rank);
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.name);
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.canSetMotd);
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.canSetLogo);
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.canInvite);
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.canKick);
                writer.uint32(/* id 8, wireType 0 =*/64).bool(message.canPromote);
                writer.uint32(/* id 9, wireType 0 =*/72).bool(message.canDemote);
                writer.uint32(/* id 10, wireType 0 =*/80).bool(message.canSetPlayerNotes);
                writer.uint32(/* id 11, wireType 0 =*/88).bool(message.canAccessLogs);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Role message, length delimited. Does not implicitly {@link rustplus.ClanInfo.Role.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {rustplus.ClanInfo.Role.$Properties} message Role message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Role.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Role message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.ClanInfo.Role & rustplus.ClanInfo.Role.$Shape} Role
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Role.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanInfo.Role();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.roleId = reader.int32();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.rank = reader.int32();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            message.name = reader.string();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            message.canSetMotd = reader.bool();
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            message.canSetLogo = reader.bool();
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            message.canInvite = reader.bool();
                            continue;
                        }
                    case 7: {
                            if (wireType !== 0)
                                break;
                            message.canKick = reader.bool();
                            continue;
                        }
                    case 8: {
                            if (wireType !== 0)
                                break;
                            message.canPromote = reader.bool();
                            continue;
                        }
                    case 9: {
                            if (wireType !== 0)
                                break;
                            message.canDemote = reader.bool();
                            continue;
                        }
                    case 10: {
                            if (wireType !== 0)
                                break;
                            message.canSetPlayerNotes = reader.bool();
                            continue;
                        }
                    case 11: {
                            if (wireType !== 0)
                                break;
                            message.canAccessLogs = reader.bool();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("roleId"))
                    throw $util.ProtocolError("missing required 'roleId'", { instance: message });
                if (!message.hasOwnProperty("rank"))
                    throw $util.ProtocolError("missing required 'rank'", { instance: message });
                if (!message.hasOwnProperty("name"))
                    throw $util.ProtocolError("missing required 'name'", { instance: message });
                if (!message.hasOwnProperty("canSetMotd"))
                    throw $util.ProtocolError("missing required 'canSetMotd'", { instance: message });
                if (!message.hasOwnProperty("canSetLogo"))
                    throw $util.ProtocolError("missing required 'canSetLogo'", { instance: message });
                if (!message.hasOwnProperty("canInvite"))
                    throw $util.ProtocolError("missing required 'canInvite'", { instance: message });
                if (!message.hasOwnProperty("canKick"))
                    throw $util.ProtocolError("missing required 'canKick'", { instance: message });
                if (!message.hasOwnProperty("canPromote"))
                    throw $util.ProtocolError("missing required 'canPromote'", { instance: message });
                if (!message.hasOwnProperty("canDemote"))
                    throw $util.ProtocolError("missing required 'canDemote'", { instance: message });
                if (!message.hasOwnProperty("canSetPlayerNotes"))
                    throw $util.ProtocolError("missing required 'canSetPlayerNotes'", { instance: message });
                if (!message.hasOwnProperty("canAccessLogs"))
                    throw $util.ProtocolError("missing required 'canAccessLogs'", { instance: message });
                return message;
            };

            /**
             * Decodes a Role message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.ClanInfo.Role & rustplus.ClanInfo.Role.$Shape} Role
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Role.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Role message.
             * @function verify
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Role.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.roleId))
                    return "roleId: integer expected";
                if (!$util.isInteger(message.rank))
                    return "rank: integer expected";
                if (!$util.isString(message.name))
                    return "name: string expected";
                if (typeof message.canSetMotd !== "boolean")
                    return "canSetMotd: boolean expected";
                if (typeof message.canSetLogo !== "boolean")
                    return "canSetLogo: boolean expected";
                if (typeof message.canInvite !== "boolean")
                    return "canInvite: boolean expected";
                if (typeof message.canKick !== "boolean")
                    return "canKick: boolean expected";
                if (typeof message.canPromote !== "boolean")
                    return "canPromote: boolean expected";
                if (typeof message.canDemote !== "boolean")
                    return "canDemote: boolean expected";
                if (typeof message.canSetPlayerNotes !== "boolean")
                    return "canSetPlayerNotes: boolean expected";
                if (typeof message.canAccessLogs !== "boolean")
                    return "canAccessLogs: boolean expected";
                return null;
            };

            /**
             * Creates a Role message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.ClanInfo.Role} Role
             */
            Role.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.ClanInfo.Role)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.ClanInfo.Role();
                if (object.roleId != null)
                    message.roleId = object.roleId | 0;
                if (object.rank != null)
                    message.rank = object.rank | 0;
                if (object.name != null)
                    message.name = String(object.name);
                if (object.canSetMotd != null)
                    message.canSetMotd = Boolean(object.canSetMotd);
                if (object.canSetLogo != null)
                    message.canSetLogo = Boolean(object.canSetLogo);
                if (object.canInvite != null)
                    message.canInvite = Boolean(object.canInvite);
                if (object.canKick != null)
                    message.canKick = Boolean(object.canKick);
                if (object.canPromote != null)
                    message.canPromote = Boolean(object.canPromote);
                if (object.canDemote != null)
                    message.canDemote = Boolean(object.canDemote);
                if (object.canSetPlayerNotes != null)
                    message.canSetPlayerNotes = Boolean(object.canSetPlayerNotes);
                if (object.canAccessLogs != null)
                    message.canAccessLogs = Boolean(object.canAccessLogs);
                return message;
            };

            /**
             * Creates a plain object from a Role message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {rustplus.ClanInfo.Role} message Role
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Role.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.roleId = 0;
                    object.rank = 0;
                    object.name = "";
                    object.canSetMotd = false;
                    object.canSetLogo = false;
                    object.canInvite = false;
                    object.canKick = false;
                    object.canPromote = false;
                    object.canDemote = false;
                    object.canSetPlayerNotes = false;
                    object.canAccessLogs = false;
                }
                if (message.roleId != null && message.hasOwnProperty("roleId"))
                    object.roleId = message.roleId;
                if (message.rank != null && message.hasOwnProperty("rank"))
                    object.rank = message.rank;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.canSetMotd != null && message.hasOwnProperty("canSetMotd"))
                    object.canSetMotd = message.canSetMotd;
                if (message.canSetLogo != null && message.hasOwnProperty("canSetLogo"))
                    object.canSetLogo = message.canSetLogo;
                if (message.canInvite != null && message.hasOwnProperty("canInvite"))
                    object.canInvite = message.canInvite;
                if (message.canKick != null && message.hasOwnProperty("canKick"))
                    object.canKick = message.canKick;
                if (message.canPromote != null && message.hasOwnProperty("canPromote"))
                    object.canPromote = message.canPromote;
                if (message.canDemote != null && message.hasOwnProperty("canDemote"))
                    object.canDemote = message.canDemote;
                if (message.canSetPlayerNotes != null && message.hasOwnProperty("canSetPlayerNotes"))
                    object.canSetPlayerNotes = message.canSetPlayerNotes;
                if (message.canAccessLogs != null && message.hasOwnProperty("canAccessLogs"))
                    object.canAccessLogs = message.canAccessLogs;
                return object;
            };

            /**
             * Converts this Role to JSON.
             * @function toJSON
             * @memberof rustplus.ClanInfo.Role
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Role.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Role
             * @function getTypeUrl
             * @memberof rustplus.ClanInfo.Role
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Role.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.ClanInfo.Role";
            };

            return Role;
        })();

        ClanInfo.Member = (function() {

            /**
             * Properties of a Member.
             * @typedef {Object} rustplus.ClanInfo.Member.$Properties
             * @property {number|Long} steamId Member steamId
             * @property {number} roleId Member roleId
             * @property {number|Long} joined Member joined
             * @property {number|Long} lastSeen Member lastSeen
             * @property {string|null} [notes] Member notes
             * @property {boolean|null} [online] Member online
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a Member.
             * @memberof rustplus.ClanInfo
             * @interface IMember
             * @augments rustplus.ClanInfo.Member.$Properties
             * @deprecated Use rustplus.ClanInfo.Member.$Properties instead.
             */

            /**
             * Shape of a Member.
             * @typedef {rustplus.ClanInfo.Member.$Properties} rustplus.ClanInfo.Member.$Shape
             */

            /**
             * Constructs a new Member.
             * @memberof rustplus.ClanInfo
             * @classdesc Represents a Member.
             * @constructor
             * @param {rustplus.ClanInfo.Member.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Member(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Member steamId.
             * @member {number|Long} steamId
             * @memberof rustplus.ClanInfo.Member
             * @instance
             */
            Member.prototype.steamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Member roleId.
             * @member {number} roleId
             * @memberof rustplus.ClanInfo.Member
             * @instance
             */
            Member.prototype.roleId = 0;

            /**
             * Member joined.
             * @member {number|Long} joined
             * @memberof rustplus.ClanInfo.Member
             * @instance
             */
            Member.prototype.joined = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Member lastSeen.
             * @member {number|Long} lastSeen
             * @memberof rustplus.ClanInfo.Member
             * @instance
             */
            Member.prototype.lastSeen = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Member notes.
             * @member {string} notes
             * @memberof rustplus.ClanInfo.Member
             * @instance
             */
            Member.prototype.notes = "";

            /**
             * Member online.
             * @member {boolean} online
             * @memberof rustplus.ClanInfo.Member
             * @instance
             */
            Member.prototype.online = false;

            /**
             * Creates a new Member instance using the specified properties.
             * @function create
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {rustplus.ClanInfo.Member.$Properties=} [properties] Properties to set
             * @returns {rustplus.ClanInfo.Member} Member instance
             * @type {{
             *   (properties: rustplus.ClanInfo.Member.$Shape): rustplus.ClanInfo.Member & rustplus.ClanInfo.Member.$Shape;
             *   (properties?: rustplus.ClanInfo.Member.$Properties): rustplus.ClanInfo.Member;
             * }}
             */
            Member.create = function create(properties) {
                return new Member(properties);
            };

            /**
             * Encodes the specified Member message. Does not implicitly {@link rustplus.ClanInfo.Member.verify|verify} messages.
             * @function encode
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {rustplus.ClanInfo.Member.$Properties} message Member message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Member.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.steamId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.roleId);
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.joined);
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.lastSeen);
                if (message.notes != null && Object.hasOwnProperty.call(message, "notes"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.notes);
                if (message.online != null && Object.hasOwnProperty.call(message, "online"))
                    writer.uint32(/* id 6, wireType 0 =*/48).bool(message.online);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Member message, length delimited. Does not implicitly {@link rustplus.ClanInfo.Member.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {rustplus.ClanInfo.Member.$Properties} message Member message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Member.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Member message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.ClanInfo.Member & rustplus.ClanInfo.Member.$Shape} Member
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Member.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanInfo.Member();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.steamId = reader.uint64();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.roleId = reader.int32();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            message.joined = reader.int64();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            message.lastSeen = reader.int64();
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            message.notes = reader.string();
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            message.online = reader.bool();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("steamId"))
                    throw $util.ProtocolError("missing required 'steamId'", { instance: message });
                if (!message.hasOwnProperty("roleId"))
                    throw $util.ProtocolError("missing required 'roleId'", { instance: message });
                if (!message.hasOwnProperty("joined"))
                    throw $util.ProtocolError("missing required 'joined'", { instance: message });
                if (!message.hasOwnProperty("lastSeen"))
                    throw $util.ProtocolError("missing required 'lastSeen'", { instance: message });
                return message;
            };

            /**
             * Decodes a Member message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.ClanInfo.Member & rustplus.ClanInfo.Member.$Shape} Member
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Member.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Member message.
             * @function verify
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Member.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.steamId) && !(message.steamId && $util.isInteger(message.steamId.low) && $util.isInteger(message.steamId.high)))
                    return "steamId: integer|Long expected";
                if (!$util.isInteger(message.roleId))
                    return "roleId: integer expected";
                if (!$util.isInteger(message.joined) && !(message.joined && $util.isInteger(message.joined.low) && $util.isInteger(message.joined.high)))
                    return "joined: integer|Long expected";
                if (!$util.isInteger(message.lastSeen) && !(message.lastSeen && $util.isInteger(message.lastSeen.low) && $util.isInteger(message.lastSeen.high)))
                    return "lastSeen: integer|Long expected";
                if (message.notes != null && message.hasOwnProperty("notes"))
                    if (!$util.isString(message.notes))
                        return "notes: string expected";
                if (message.online != null && message.hasOwnProperty("online"))
                    if (typeof message.online !== "boolean")
                        return "online: boolean expected";
                return null;
            };

            /**
             * Creates a Member message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.ClanInfo.Member} Member
             */
            Member.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.ClanInfo.Member)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.ClanInfo.Member();
                if (object.steamId != null)
                    if ($util.Long)
                        (message.steamId = $util.Long.fromValue(object.steamId)).unsigned = true;
                    else if (typeof object.steamId === "string")
                        message.steamId = parseInt(object.steamId, 10);
                    else if (typeof object.steamId === "number")
                        message.steamId = object.steamId;
                    else if (typeof object.steamId === "object")
                        message.steamId = new $util.LongBits(object.steamId.low >>> 0, object.steamId.high >>> 0).toNumber(true);
                if (object.roleId != null)
                    message.roleId = object.roleId | 0;
                if (object.joined != null)
                    if ($util.Long)
                        (message.joined = $util.Long.fromValue(object.joined)).unsigned = false;
                    else if (typeof object.joined === "string")
                        message.joined = parseInt(object.joined, 10);
                    else if (typeof object.joined === "number")
                        message.joined = object.joined;
                    else if (typeof object.joined === "object")
                        message.joined = new $util.LongBits(object.joined.low >>> 0, object.joined.high >>> 0).toNumber();
                if (object.lastSeen != null)
                    if ($util.Long)
                        (message.lastSeen = $util.Long.fromValue(object.lastSeen)).unsigned = false;
                    else if (typeof object.lastSeen === "string")
                        message.lastSeen = parseInt(object.lastSeen, 10);
                    else if (typeof object.lastSeen === "number")
                        message.lastSeen = object.lastSeen;
                    else if (typeof object.lastSeen === "object")
                        message.lastSeen = new $util.LongBits(object.lastSeen.low >>> 0, object.lastSeen.high >>> 0).toNumber();
                if (object.notes != null)
                    message.notes = String(object.notes);
                if (object.online != null)
                    message.online = Boolean(object.online);
                return message;
            };

            /**
             * Creates a plain object from a Member message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {rustplus.ClanInfo.Member} message Member
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Member.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.steamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.steamId = options.longs === String ? "0" : 0;
                    object.roleId = 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.joined = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.joined = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.lastSeen = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.lastSeen = options.longs === String ? "0" : 0;
                    object.notes = "";
                    object.online = false;
                }
                if (message.steamId != null && message.hasOwnProperty("steamId"))
                    if (typeof message.steamId === "number")
                        object.steamId = options.longs === String ? String(message.steamId) : message.steamId;
                    else
                        object.steamId = options.longs === String ? $util.Long.prototype.toString.call(message.steamId) : options.longs === Number ? new $util.LongBits(message.steamId.low >>> 0, message.steamId.high >>> 0).toNumber(true) : message.steamId;
                if (message.roleId != null && message.hasOwnProperty("roleId"))
                    object.roleId = message.roleId;
                if (message.joined != null && message.hasOwnProperty("joined"))
                    if (typeof message.joined === "number")
                        object.joined = options.longs === String ? String(message.joined) : message.joined;
                    else
                        object.joined = options.longs === String ? $util.Long.prototype.toString.call(message.joined) : options.longs === Number ? new $util.LongBits(message.joined.low >>> 0, message.joined.high >>> 0).toNumber() : message.joined;
                if (message.lastSeen != null && message.hasOwnProperty("lastSeen"))
                    if (typeof message.lastSeen === "number")
                        object.lastSeen = options.longs === String ? String(message.lastSeen) : message.lastSeen;
                    else
                        object.lastSeen = options.longs === String ? $util.Long.prototype.toString.call(message.lastSeen) : options.longs === Number ? new $util.LongBits(message.lastSeen.low >>> 0, message.lastSeen.high >>> 0).toNumber() : message.lastSeen;
                if (message.notes != null && message.hasOwnProperty("notes"))
                    object.notes = message.notes;
                if (message.online != null && message.hasOwnProperty("online"))
                    object.online = message.online;
                return object;
            };

            /**
             * Converts this Member to JSON.
             * @function toJSON
             * @memberof rustplus.ClanInfo.Member
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Member.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Member
             * @function getTypeUrl
             * @memberof rustplus.ClanInfo.Member
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Member.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.ClanInfo.Member";
            };

            return Member;
        })();

        ClanInfo.Invite = (function() {

            /**
             * Properties of an Invite.
             * @typedef {Object} rustplus.ClanInfo.Invite.$Properties
             * @property {number|Long} steamId Invite steamId
             * @property {number|Long} recruiter Invite recruiter
             * @property {number|Long} timestamp Invite timestamp
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of an Invite.
             * @memberof rustplus.ClanInfo
             * @interface IInvite
             * @augments rustplus.ClanInfo.Invite.$Properties
             * @deprecated Use rustplus.ClanInfo.Invite.$Properties instead.
             */

            /**
             * Shape of an Invite.
             * @typedef {rustplus.ClanInfo.Invite.$Properties} rustplus.ClanInfo.Invite.$Shape
             */

            /**
             * Constructs a new Invite.
             * @memberof rustplus.ClanInfo
             * @classdesc Represents an Invite.
             * @constructor
             * @param {rustplus.ClanInfo.Invite.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Invite(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Invite steamId.
             * @member {number|Long} steamId
             * @memberof rustplus.ClanInfo.Invite
             * @instance
             */
            Invite.prototype.steamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Invite recruiter.
             * @member {number|Long} recruiter
             * @memberof rustplus.ClanInfo.Invite
             * @instance
             */
            Invite.prototype.recruiter = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Invite timestamp.
             * @member {number|Long} timestamp
             * @memberof rustplus.ClanInfo.Invite
             * @instance
             */
            Invite.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new Invite instance using the specified properties.
             * @function create
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {rustplus.ClanInfo.Invite.$Properties=} [properties] Properties to set
             * @returns {rustplus.ClanInfo.Invite} Invite instance
             * @type {{
             *   (properties: rustplus.ClanInfo.Invite.$Shape): rustplus.ClanInfo.Invite & rustplus.ClanInfo.Invite.$Shape;
             *   (properties?: rustplus.ClanInfo.Invite.$Properties): rustplus.ClanInfo.Invite;
             * }}
             */
            Invite.create = function create(properties) {
                return new Invite(properties);
            };

            /**
             * Encodes the specified Invite message. Does not implicitly {@link rustplus.ClanInfo.Invite.verify|verify} messages.
             * @function encode
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {rustplus.ClanInfo.Invite.$Properties} message Invite message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Invite.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.steamId);
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.recruiter);
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Invite message, length delimited. Does not implicitly {@link rustplus.ClanInfo.Invite.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {rustplus.ClanInfo.Invite.$Properties} message Invite message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Invite.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Invite message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.ClanInfo.Invite & rustplus.ClanInfo.Invite.$Shape} Invite
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Invite.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanInfo.Invite();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.steamId = reader.uint64();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.recruiter = reader.uint64();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            message.timestamp = reader.int64();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("steamId"))
                    throw $util.ProtocolError("missing required 'steamId'", { instance: message });
                if (!message.hasOwnProperty("recruiter"))
                    throw $util.ProtocolError("missing required 'recruiter'", { instance: message });
                if (!message.hasOwnProperty("timestamp"))
                    throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
                return message;
            };

            /**
             * Decodes an Invite message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.ClanInfo.Invite & rustplus.ClanInfo.Invite.$Shape} Invite
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Invite.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Invite message.
             * @function verify
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Invite.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.steamId) && !(message.steamId && $util.isInteger(message.steamId.low) && $util.isInteger(message.steamId.high)))
                    return "steamId: integer|Long expected";
                if (!$util.isInteger(message.recruiter) && !(message.recruiter && $util.isInteger(message.recruiter.low) && $util.isInteger(message.recruiter.high)))
                    return "recruiter: integer|Long expected";
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates an Invite message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.ClanInfo.Invite} Invite
             */
            Invite.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.ClanInfo.Invite)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.ClanInfo.Invite();
                if (object.steamId != null)
                    if ($util.Long)
                        (message.steamId = $util.Long.fromValue(object.steamId)).unsigned = true;
                    else if (typeof object.steamId === "string")
                        message.steamId = parseInt(object.steamId, 10);
                    else if (typeof object.steamId === "number")
                        message.steamId = object.steamId;
                    else if (typeof object.steamId === "object")
                        message.steamId = new $util.LongBits(object.steamId.low >>> 0, object.steamId.high >>> 0).toNumber(true);
                if (object.recruiter != null)
                    if ($util.Long)
                        (message.recruiter = $util.Long.fromValue(object.recruiter)).unsigned = true;
                    else if (typeof object.recruiter === "string")
                        message.recruiter = parseInt(object.recruiter, 10);
                    else if (typeof object.recruiter === "number")
                        message.recruiter = object.recruiter;
                    else if (typeof object.recruiter === "object")
                        message.recruiter = new $util.LongBits(object.recruiter.low >>> 0, object.recruiter.high >>> 0).toNumber(true);
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an Invite message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {rustplus.ClanInfo.Invite} message Invite
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Invite.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.steamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.steamId = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.recruiter = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.recruiter = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                }
                if (message.steamId != null && message.hasOwnProperty("steamId"))
                    if (typeof message.steamId === "number")
                        object.steamId = options.longs === String ? String(message.steamId) : message.steamId;
                    else
                        object.steamId = options.longs === String ? $util.Long.prototype.toString.call(message.steamId) : options.longs === Number ? new $util.LongBits(message.steamId.low >>> 0, message.steamId.high >>> 0).toNumber(true) : message.steamId;
                if (message.recruiter != null && message.hasOwnProperty("recruiter"))
                    if (typeof message.recruiter === "number")
                        object.recruiter = options.longs === String ? String(message.recruiter) : message.recruiter;
                    else
                        object.recruiter = options.longs === String ? $util.Long.prototype.toString.call(message.recruiter) : options.longs === Number ? new $util.LongBits(message.recruiter.low >>> 0, message.recruiter.high >>> 0).toNumber(true) : message.recruiter;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this Invite to JSON.
             * @function toJSON
             * @memberof rustplus.ClanInfo.Invite
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Invite.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Invite
             * @function getTypeUrl
             * @memberof rustplus.ClanInfo.Invite
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Invite.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.ClanInfo.Invite";
            };

            return Invite;
        })();

        return ClanInfo;
    })();

    rustplus.ClanLog = (function() {

        /**
         * Properties of a ClanLog.
         * @typedef {Object} rustplus.ClanLog.$Properties
         * @property {number|Long} clanId ClanLog clanId
         * @property {Array.<rustplus.ClanLog.Entry.$Properties>|null} [logEntries] ClanLog logEntries
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a ClanLog.
         * @memberof rustplus
         * @interface IClanLog
         * @augments rustplus.ClanLog.$Properties
         * @deprecated Use rustplus.ClanLog.$Properties instead.
         */

        /**
         * Shape of a ClanLog.
         * @typedef {rustplus.ClanLog.$Properties} rustplus.ClanLog.$Shape
         */

        /**
         * Constructs a new ClanLog.
         * @memberof rustplus
         * @classdesc Represents a ClanLog.
         * @constructor
         * @param {rustplus.ClanLog.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function ClanLog(properties) {
            this.logEntries = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClanLog clanId.
         * @member {number|Long} clanId
         * @memberof rustplus.ClanLog
         * @instance
         */
        ClanLog.prototype.clanId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ClanLog logEntries.
         * @member {Array.<rustplus.ClanLog.Entry.$Properties>} logEntries
         * @memberof rustplus.ClanLog
         * @instance
         */
        ClanLog.prototype.logEntries = $util.emptyArray;

        /**
         * Creates a new ClanLog instance using the specified properties.
         * @function create
         * @memberof rustplus.ClanLog
         * @static
         * @param {rustplus.ClanLog.$Properties=} [properties] Properties to set
         * @returns {rustplus.ClanLog} ClanLog instance
         * @type {{
         *   (properties: rustplus.ClanLog.$Shape): rustplus.ClanLog & rustplus.ClanLog.$Shape;
         *   (properties?: rustplus.ClanLog.$Properties): rustplus.ClanLog;
         * }}
         */
        ClanLog.create = function create(properties) {
            return new ClanLog(properties);
        };

        /**
         * Encodes the specified ClanLog message. Does not implicitly {@link rustplus.ClanLog.verify|verify} messages.
         * @function encode
         * @memberof rustplus.ClanLog
         * @static
         * @param {rustplus.ClanLog.$Properties} message ClanLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClanLog.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.clanId);
            if (message.logEntries != null && message.logEntries.length)
                for (let i = 0; i < message.logEntries.length; ++i)
                    $root.rustplus.ClanLog.Entry.encode(message.logEntries[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified ClanLog message, length delimited. Does not implicitly {@link rustplus.ClanLog.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.ClanLog
         * @static
         * @param {rustplus.ClanLog.$Properties} message ClanLog message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClanLog.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClanLog message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.ClanLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.ClanLog & rustplus.ClanLog.$Shape} ClanLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClanLog.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanLog();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.clanId = reader.int64();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (!(message.logEntries && message.logEntries.length))
                            message.logEntries = [];
                        message.logEntries.push($root.rustplus.ClanLog.Entry.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("clanId"))
                throw $util.ProtocolError("missing required 'clanId'", { instance: message });
            return message;
        };

        /**
         * Decodes a ClanLog message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.ClanLog
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.ClanLog & rustplus.ClanLog.$Shape} ClanLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClanLog.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClanLog message.
         * @function verify
         * @memberof rustplus.ClanLog
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClanLog.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.clanId) && !(message.clanId && $util.isInteger(message.clanId.low) && $util.isInteger(message.clanId.high)))
                return "clanId: integer|Long expected";
            if (message.logEntries != null && message.hasOwnProperty("logEntries")) {
                if (!Array.isArray(message.logEntries))
                    return "logEntries: array expected";
                for (let i = 0; i < message.logEntries.length; ++i) {
                    let error = $root.rustplus.ClanLog.Entry.verify(message.logEntries[i], _depth + 1);
                    if (error)
                        return "logEntries." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ClanLog message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.ClanLog
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.ClanLog} ClanLog
         */
        ClanLog.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.ClanLog)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.ClanLog();
            if (object.clanId != null)
                if ($util.Long)
                    (message.clanId = $util.Long.fromValue(object.clanId)).unsigned = false;
                else if (typeof object.clanId === "string")
                    message.clanId = parseInt(object.clanId, 10);
                else if (typeof object.clanId === "number")
                    message.clanId = object.clanId;
                else if (typeof object.clanId === "object")
                    message.clanId = new $util.LongBits(object.clanId.low >>> 0, object.clanId.high >>> 0).toNumber();
            if (object.logEntries) {
                if (!Array.isArray(object.logEntries))
                    throw TypeError(".rustplus.ClanLog.logEntries: array expected");
                message.logEntries = Array(object.logEntries.length);
                for (let i = 0; i < object.logEntries.length; ++i) {
                    if (typeof object.logEntries[i] !== "object")
                        throw TypeError(".rustplus.ClanLog.logEntries: object expected");
                    message.logEntries[i] = $root.rustplus.ClanLog.Entry.fromObject(object.logEntries[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ClanLog message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.ClanLog
         * @static
         * @param {rustplus.ClanLog} message ClanLog
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClanLog.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.logEntries = [];
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.clanId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.clanId = options.longs === String ? "0" : 0;
            if (message.clanId != null && message.hasOwnProperty("clanId"))
                if (typeof message.clanId === "number")
                    object.clanId = options.longs === String ? String(message.clanId) : message.clanId;
                else
                    object.clanId = options.longs === String ? $util.Long.prototype.toString.call(message.clanId) : options.longs === Number ? new $util.LongBits(message.clanId.low >>> 0, message.clanId.high >>> 0).toNumber() : message.clanId;
            if (message.logEntries && message.logEntries.length) {
                object.logEntries = Array(message.logEntries.length);
                for (let j = 0; j < message.logEntries.length; ++j)
                    object.logEntries[j] = $root.rustplus.ClanLog.Entry.toObject(message.logEntries[j], options);
            }
            return object;
        };

        /**
         * Converts this ClanLog to JSON.
         * @function toJSON
         * @memberof rustplus.ClanLog
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClanLog.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for ClanLog
         * @function getTypeUrl
         * @memberof rustplus.ClanLog
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        ClanLog.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.ClanLog";
        };

        ClanLog.Entry = (function() {

            /**
             * Properties of an Entry.
             * @typedef {Object} rustplus.ClanLog.Entry.$Properties
             * @property {number|Long} timestamp Entry timestamp
             * @property {string} eventKey Entry eventKey
             * @property {string|null} [arg1] Entry arg1
             * @property {string|null} [arg2] Entry arg2
             * @property {string|null} [arg3] Entry arg3
             * @property {string|null} [arg4] Entry arg4
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of an Entry.
             * @memberof rustplus.ClanLog
             * @interface IEntry
             * @augments rustplus.ClanLog.Entry.$Properties
             * @deprecated Use rustplus.ClanLog.Entry.$Properties instead.
             */

            /**
             * Shape of an Entry.
             * @typedef {rustplus.ClanLog.Entry.$Properties} rustplus.ClanLog.Entry.$Shape
             */

            /**
             * Constructs a new Entry.
             * @memberof rustplus.ClanLog
             * @classdesc Represents an Entry.
             * @constructor
             * @param {rustplus.ClanLog.Entry.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Entry(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Entry timestamp.
             * @member {number|Long} timestamp
             * @memberof rustplus.ClanLog.Entry
             * @instance
             */
            Entry.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Entry eventKey.
             * @member {string} eventKey
             * @memberof rustplus.ClanLog.Entry
             * @instance
             */
            Entry.prototype.eventKey = "";

            /**
             * Entry arg1.
             * @member {string} arg1
             * @memberof rustplus.ClanLog.Entry
             * @instance
             */
            Entry.prototype.arg1 = "";

            /**
             * Entry arg2.
             * @member {string} arg2
             * @memberof rustplus.ClanLog.Entry
             * @instance
             */
            Entry.prototype.arg2 = "";

            /**
             * Entry arg3.
             * @member {string} arg3
             * @memberof rustplus.ClanLog.Entry
             * @instance
             */
            Entry.prototype.arg3 = "";

            /**
             * Entry arg4.
             * @member {string} arg4
             * @memberof rustplus.ClanLog.Entry
             * @instance
             */
            Entry.prototype.arg4 = "";

            /**
             * Creates a new Entry instance using the specified properties.
             * @function create
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {rustplus.ClanLog.Entry.$Properties=} [properties] Properties to set
             * @returns {rustplus.ClanLog.Entry} Entry instance
             * @type {{
             *   (properties: rustplus.ClanLog.Entry.$Shape): rustplus.ClanLog.Entry & rustplus.ClanLog.Entry.$Shape;
             *   (properties?: rustplus.ClanLog.Entry.$Properties): rustplus.ClanLog.Entry;
             * }}
             */
            Entry.create = function create(properties) {
                return new Entry(properties);
            };

            /**
             * Encodes the specified Entry message. Does not implicitly {@link rustplus.ClanLog.Entry.verify|verify} messages.
             * @function encode
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {rustplus.ClanLog.Entry.$Properties} message Entry message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Entry.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.timestamp);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.eventKey);
                if (message.arg1 != null && Object.hasOwnProperty.call(message, "arg1"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.arg1);
                if (message.arg2 != null && Object.hasOwnProperty.call(message, "arg2"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.arg2);
                if (message.arg3 != null && Object.hasOwnProperty.call(message, "arg3"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.arg3);
                if (message.arg4 != null && Object.hasOwnProperty.call(message, "arg4"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.arg4);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Entry message, length delimited. Does not implicitly {@link rustplus.ClanLog.Entry.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {rustplus.ClanLog.Entry.$Properties} message Entry message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Entry.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Entry message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.ClanLog.Entry & rustplus.ClanLog.Entry.$Shape} Entry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Entry.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanLog.Entry();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.timestamp = reader.int64();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            message.eventKey = reader.string();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            message.arg1 = reader.string();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            message.arg2 = reader.string();
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            message.arg3 = reader.string();
                            continue;
                        }
                    case 6: {
                            if (wireType !== 2)
                                break;
                            message.arg4 = reader.string();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("timestamp"))
                    throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
                if (!message.hasOwnProperty("eventKey"))
                    throw $util.ProtocolError("missing required 'eventKey'", { instance: message });
                return message;
            };

            /**
             * Decodes an Entry message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.ClanLog.Entry & rustplus.ClanLog.Entry.$Shape} Entry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Entry.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Entry message.
             * @function verify
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Entry.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
                if (!$util.isString(message.eventKey))
                    return "eventKey: string expected";
                if (message.arg1 != null && message.hasOwnProperty("arg1"))
                    if (!$util.isString(message.arg1))
                        return "arg1: string expected";
                if (message.arg2 != null && message.hasOwnProperty("arg2"))
                    if (!$util.isString(message.arg2))
                        return "arg2: string expected";
                if (message.arg3 != null && message.hasOwnProperty("arg3"))
                    if (!$util.isString(message.arg3))
                        return "arg3: string expected";
                if (message.arg4 != null && message.hasOwnProperty("arg4"))
                    if (!$util.isString(message.arg4))
                        return "arg4: string expected";
                return null;
            };

            /**
             * Creates an Entry message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.ClanLog.Entry} Entry
             */
            Entry.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.ClanLog.Entry)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.ClanLog.Entry();
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                if (object.eventKey != null)
                    message.eventKey = String(object.eventKey);
                if (object.arg1 != null)
                    message.arg1 = String(object.arg1);
                if (object.arg2 != null)
                    message.arg2 = String(object.arg2);
                if (object.arg3 != null)
                    message.arg3 = String(object.arg3);
                if (object.arg4 != null)
                    message.arg4 = String(object.arg4);
                return message;
            };

            /**
             * Creates a plain object from an Entry message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {rustplus.ClanLog.Entry} message Entry
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Entry.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                    object.eventKey = "";
                    object.arg1 = "";
                    object.arg2 = "";
                    object.arg3 = "";
                    object.arg4 = "";
                }
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                if (message.eventKey != null && message.hasOwnProperty("eventKey"))
                    object.eventKey = message.eventKey;
                if (message.arg1 != null && message.hasOwnProperty("arg1"))
                    object.arg1 = message.arg1;
                if (message.arg2 != null && message.hasOwnProperty("arg2"))
                    object.arg2 = message.arg2;
                if (message.arg3 != null && message.hasOwnProperty("arg3"))
                    object.arg3 = message.arg3;
                if (message.arg4 != null && message.hasOwnProperty("arg4"))
                    object.arg4 = message.arg4;
                return object;
            };

            /**
             * Converts this Entry to JSON.
             * @function toJSON
             * @memberof rustplus.ClanLog.Entry
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Entry.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Entry
             * @function getTypeUrl
             * @memberof rustplus.ClanLog.Entry
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Entry.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.ClanLog.Entry";
            };

            return Entry;
        })();

        return ClanLog;
    })();

    rustplus.ClanInvitations = (function() {

        /**
         * Properties of a ClanInvitations.
         * @typedef {Object} rustplus.ClanInvitations.$Properties
         * @property {Array.<rustplus.ClanInvitations.Invitation.$Properties>|null} [invitations] ClanInvitations invitations
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of a ClanInvitations.
         * @memberof rustplus
         * @interface IClanInvitations
         * @augments rustplus.ClanInvitations.$Properties
         * @deprecated Use rustplus.ClanInvitations.$Properties instead.
         */

        /**
         * Shape of a ClanInvitations.
         * @typedef {rustplus.ClanInvitations.$Properties} rustplus.ClanInvitations.$Shape
         */

        /**
         * Constructs a new ClanInvitations.
         * @memberof rustplus
         * @classdesc Represents a ClanInvitations.
         * @constructor
         * @param {rustplus.ClanInvitations.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function ClanInvitations(properties) {
            this.invitations = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClanInvitations invitations.
         * @member {Array.<rustplus.ClanInvitations.Invitation.$Properties>} invitations
         * @memberof rustplus.ClanInvitations
         * @instance
         */
        ClanInvitations.prototype.invitations = $util.emptyArray;

        /**
         * Creates a new ClanInvitations instance using the specified properties.
         * @function create
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {rustplus.ClanInvitations.$Properties=} [properties] Properties to set
         * @returns {rustplus.ClanInvitations} ClanInvitations instance
         * @type {{
         *   (properties: rustplus.ClanInvitations.$Shape): rustplus.ClanInvitations & rustplus.ClanInvitations.$Shape;
         *   (properties?: rustplus.ClanInvitations.$Properties): rustplus.ClanInvitations;
         * }}
         */
        ClanInvitations.create = function create(properties) {
            return new ClanInvitations(properties);
        };

        /**
         * Encodes the specified ClanInvitations message. Does not implicitly {@link rustplus.ClanInvitations.verify|verify} messages.
         * @function encode
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {rustplus.ClanInvitations.$Properties} message ClanInvitations message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClanInvitations.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.invitations != null && message.invitations.length)
                for (let i = 0; i < message.invitations.length; ++i)
                    $root.rustplus.ClanInvitations.Invitation.encode(message.invitations[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified ClanInvitations message, length delimited. Does not implicitly {@link rustplus.ClanInvitations.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {rustplus.ClanInvitations.$Properties} message ClanInvitations message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClanInvitations.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClanInvitations message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.ClanInvitations & rustplus.ClanInvitations.$Shape} ClanInvitations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClanInvitations.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanInvitations();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if (!(message.invitations && message.invitations.length))
                            message.invitations = [];
                        message.invitations.push($root.rustplus.ClanInvitations.Invitation.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes a ClanInvitations message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.ClanInvitations & rustplus.ClanInvitations.$Shape} ClanInvitations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClanInvitations.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClanInvitations message.
         * @function verify
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClanInvitations.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.invitations != null && message.hasOwnProperty("invitations")) {
                if (!Array.isArray(message.invitations))
                    return "invitations: array expected";
                for (let i = 0; i < message.invitations.length; ++i) {
                    let error = $root.rustplus.ClanInvitations.Invitation.verify(message.invitations[i], _depth + 1);
                    if (error)
                        return "invitations." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ClanInvitations message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.ClanInvitations} ClanInvitations
         */
        ClanInvitations.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.ClanInvitations)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.ClanInvitations();
            if (object.invitations) {
                if (!Array.isArray(object.invitations))
                    throw TypeError(".rustplus.ClanInvitations.invitations: array expected");
                message.invitations = Array(object.invitations.length);
                for (let i = 0; i < object.invitations.length; ++i) {
                    if (typeof object.invitations[i] !== "object")
                        throw TypeError(".rustplus.ClanInvitations.invitations: object expected");
                    message.invitations[i] = $root.rustplus.ClanInvitations.Invitation.fromObject(object.invitations[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ClanInvitations message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {rustplus.ClanInvitations} message ClanInvitations
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClanInvitations.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.invitations = [];
            if (message.invitations && message.invitations.length) {
                object.invitations = Array(message.invitations.length);
                for (let j = 0; j < message.invitations.length; ++j)
                    object.invitations[j] = $root.rustplus.ClanInvitations.Invitation.toObject(message.invitations[j], options);
            }
            return object;
        };

        /**
         * Converts this ClanInvitations to JSON.
         * @function toJSON
         * @memberof rustplus.ClanInvitations
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClanInvitations.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for ClanInvitations
         * @function getTypeUrl
         * @memberof rustplus.ClanInvitations
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        ClanInvitations.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.ClanInvitations";
        };

        ClanInvitations.Invitation = (function() {

            /**
             * Properties of an Invitation.
             * @typedef {Object} rustplus.ClanInvitations.Invitation.$Properties
             * @property {number|Long} clanId Invitation clanId
             * @property {number|Long} recruiter Invitation recruiter
             * @property {number|Long} timestamp Invitation timestamp
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of an Invitation.
             * @memberof rustplus.ClanInvitations
             * @interface IInvitation
             * @augments rustplus.ClanInvitations.Invitation.$Properties
             * @deprecated Use rustplus.ClanInvitations.Invitation.$Properties instead.
             */

            /**
             * Shape of an Invitation.
             * @typedef {rustplus.ClanInvitations.Invitation.$Properties} rustplus.ClanInvitations.Invitation.$Shape
             */

            /**
             * Constructs a new Invitation.
             * @memberof rustplus.ClanInvitations
             * @classdesc Represents an Invitation.
             * @constructor
             * @param {rustplus.ClanInvitations.Invitation.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Invitation(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Invitation clanId.
             * @member {number|Long} clanId
             * @memberof rustplus.ClanInvitations.Invitation
             * @instance
             */
            Invitation.prototype.clanId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Invitation recruiter.
             * @member {number|Long} recruiter
             * @memberof rustplus.ClanInvitations.Invitation
             * @instance
             */
            Invitation.prototype.recruiter = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Invitation timestamp.
             * @member {number|Long} timestamp
             * @memberof rustplus.ClanInvitations.Invitation
             * @instance
             */
            Invitation.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Creates a new Invitation instance using the specified properties.
             * @function create
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {rustplus.ClanInvitations.Invitation.$Properties=} [properties] Properties to set
             * @returns {rustplus.ClanInvitations.Invitation} Invitation instance
             * @type {{
             *   (properties: rustplus.ClanInvitations.Invitation.$Shape): rustplus.ClanInvitations.Invitation & rustplus.ClanInvitations.Invitation.$Shape;
             *   (properties?: rustplus.ClanInvitations.Invitation.$Properties): rustplus.ClanInvitations.Invitation;
             * }}
             */
            Invitation.create = function create(properties) {
                return new Invitation(properties);
            };

            /**
             * Encodes the specified Invitation message. Does not implicitly {@link rustplus.ClanInvitations.Invitation.verify|verify} messages.
             * @function encode
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {rustplus.ClanInvitations.Invitation.$Properties} message Invitation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Invitation.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.clanId);
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.recruiter);
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Invitation message, length delimited. Does not implicitly {@link rustplus.ClanInvitations.Invitation.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {rustplus.ClanInvitations.Invitation.$Properties} message Invitation message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Invitation.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Invitation message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.ClanInvitations.Invitation & rustplus.ClanInvitations.Invitation.$Shape} Invitation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Invitation.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.ClanInvitations.Invitation();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.clanId = reader.int64();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.recruiter = reader.uint64();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            message.timestamp = reader.int64();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("clanId"))
                    throw $util.ProtocolError("missing required 'clanId'", { instance: message });
                if (!message.hasOwnProperty("recruiter"))
                    throw $util.ProtocolError("missing required 'recruiter'", { instance: message });
                if (!message.hasOwnProperty("timestamp"))
                    throw $util.ProtocolError("missing required 'timestamp'", { instance: message });
                return message;
            };

            /**
             * Decodes an Invitation message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.ClanInvitations.Invitation & rustplus.ClanInvitations.Invitation.$Shape} Invitation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Invitation.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Invitation message.
             * @function verify
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Invitation.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.clanId) && !(message.clanId && $util.isInteger(message.clanId.low) && $util.isInteger(message.clanId.high)))
                    return "clanId: integer|Long expected";
                if (!$util.isInteger(message.recruiter) && !(message.recruiter && $util.isInteger(message.recruiter.low) && $util.isInteger(message.recruiter.high)))
                    return "recruiter: integer|Long expected";
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
                return null;
            };

            /**
             * Creates an Invitation message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.ClanInvitations.Invitation} Invitation
             */
            Invitation.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.ClanInvitations.Invitation)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.ClanInvitations.Invitation();
                if (object.clanId != null)
                    if ($util.Long)
                        (message.clanId = $util.Long.fromValue(object.clanId)).unsigned = false;
                    else if (typeof object.clanId === "string")
                        message.clanId = parseInt(object.clanId, 10);
                    else if (typeof object.clanId === "number")
                        message.clanId = object.clanId;
                    else if (typeof object.clanId === "object")
                        message.clanId = new $util.LongBits(object.clanId.low >>> 0, object.clanId.high >>> 0).toNumber();
                if (object.recruiter != null)
                    if ($util.Long)
                        (message.recruiter = $util.Long.fromValue(object.recruiter)).unsigned = true;
                    else if (typeof object.recruiter === "string")
                        message.recruiter = parseInt(object.recruiter, 10);
                    else if (typeof object.recruiter === "number")
                        message.recruiter = object.recruiter;
                    else if (typeof object.recruiter === "object")
                        message.recruiter = new $util.LongBits(object.recruiter.low >>> 0, object.recruiter.high >>> 0).toNumber(true);
                if (object.timestamp != null)
                    if ($util.Long)
                        (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                    else if (typeof object.timestamp === "string")
                        message.timestamp = parseInt(object.timestamp, 10);
                    else if (typeof object.timestamp === "number")
                        message.timestamp = object.timestamp;
                    else if (typeof object.timestamp === "object")
                        message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
                return message;
            };

            /**
             * Creates a plain object from an Invitation message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {rustplus.ClanInvitations.Invitation} message Invitation
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Invitation.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.clanId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.clanId = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.recruiter = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.recruiter = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.timestamp = options.longs === String ? "0" : 0;
                }
                if (message.clanId != null && message.hasOwnProperty("clanId"))
                    if (typeof message.clanId === "number")
                        object.clanId = options.longs === String ? String(message.clanId) : message.clanId;
                    else
                        object.clanId = options.longs === String ? $util.Long.prototype.toString.call(message.clanId) : options.longs === Number ? new $util.LongBits(message.clanId.low >>> 0, message.clanId.high >>> 0).toNumber() : message.clanId;
                if (message.recruiter != null && message.hasOwnProperty("recruiter"))
                    if (typeof message.recruiter === "number")
                        object.recruiter = options.longs === String ? String(message.recruiter) : message.recruiter;
                    else
                        object.recruiter = options.longs === String ? $util.Long.prototype.toString.call(message.recruiter) : options.longs === Number ? new $util.LongBits(message.recruiter.low >>> 0, message.recruiter.high >>> 0).toNumber(true) : message.recruiter;
                if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                    if (typeof message.timestamp === "number")
                        object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                    else
                        object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
                return object;
            };

            /**
             * Converts this Invitation to JSON.
             * @function toJSON
             * @memberof rustplus.ClanInvitations.Invitation
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Invitation.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Invitation
             * @function getTypeUrl
             * @memberof rustplus.ClanInvitations.Invitation
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Invitation.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.ClanInvitations.Invitation";
            };

            return Invitation;
        })();

        return ClanInvitations;
    })();

    /**
     * AppEntityType enum.
     * @name rustplus.AppEntityType
     * @enum {number}
     * @property {number} Switch=1 Switch value
     * @property {number} Alarm=2 Alarm value
     * @property {number} StorageMonitor=3 StorageMonitor value
     */
    rustplus.AppEntityType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "Switch"] = 1;
        values[valuesById[2] = "Alarm"] = 2;
        values[valuesById[3] = "StorageMonitor"] = 3;
        return values;
    })();

    /**
     * AppMarkerType enum.
     * @name rustplus.AppMarkerType
     * @enum {number}
     * @property {number} Undefined=0 Undefined value
     * @property {number} Player=1 Player value
     * @property {number} Explosion=2 Explosion value
     * @property {number} VendingMachine=3 VendingMachine value
     * @property {number} CH47=4 CH47 value
     * @property {number} CargoShip=5 CargoShip value
     * @property {number} Crate=6 Crate value
     * @property {number} GenericRadius=7 GenericRadius value
     * @property {number} PatrolHelicopter=8 PatrolHelicopter value
     */
    rustplus.AppMarkerType = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Undefined"] = 0;
        values[valuesById[1] = "Player"] = 1;
        values[valuesById[2] = "Explosion"] = 2;
        values[valuesById[3] = "VendingMachine"] = 3;
        values[valuesById[4] = "CH47"] = 4;
        values[valuesById[5] = "CargoShip"] = 5;
        values[valuesById[6] = "Crate"] = 6;
        values[valuesById[7] = "GenericRadius"] = 7;
        values[valuesById[8] = "PatrolHelicopter"] = 8;
        return values;
    })();

    rustplus.AppRequest = (function() {

        /**
         * Properties of an AppRequest.
         * @typedef {Object} rustplus.AppRequest.$Properties
         * @property {number} seq AppRequest seq
         * @property {number|Long} playerId AppRequest playerId
         * @property {number} playerToken AppRequest playerToken
         * @property {number|null} [entityId] AppRequest entityId
         * @property {rustplus.AppEmpty.$Properties|null} [getInfo] AppRequest getInfo
         * @property {rustplus.AppEmpty.$Properties|null} [getTime] AppRequest getTime
         * @property {rustplus.AppEmpty.$Properties|null} [getMap] AppRequest getMap
         * @property {rustplus.AppEmpty.$Properties|null} [getTeamInfo] AppRequest getTeamInfo
         * @property {rustplus.AppEmpty.$Properties|null} [getTeamChat] AppRequest getTeamChat
         * @property {rustplus.AppSendMessage.$Properties|null} [sendTeamMessage] AppRequest sendTeamMessage
         * @property {rustplus.AppEmpty.$Properties|null} [getEntityInfo] AppRequest getEntityInfo
         * @property {rustplus.AppSetEntityValue.$Properties|null} [setEntityValue] AppRequest setEntityValue
         * @property {rustplus.AppEmpty.$Properties|null} [checkSubscription] AppRequest checkSubscription
         * @property {rustplus.AppFlag.$Properties|null} [setSubscription] AppRequest setSubscription
         * @property {rustplus.AppEmpty.$Properties|null} [getMapMarkers] AppRequest getMapMarkers
         * @property {rustplus.AppPromoteToLeader.$Properties|null} [promoteToLeader] AppRequest promoteToLeader
         * @property {rustplus.AppEmpty.$Properties|null} [getClanInfo] AppRequest getClanInfo
         * @property {rustplus.AppSendMessage.$Properties|null} [setClanMotd] AppRequest setClanMotd
         * @property {rustplus.AppEmpty.$Properties|null} [getClanChat] AppRequest getClanChat
         * @property {rustplus.AppSendMessage.$Properties|null} [sendClanMessage] AppRequest sendClanMessage
         * @property {rustplus.AppGetNexusAuth.$Properties|null} [getNexusAuth] AppRequest getNexusAuth
         * @property {rustplus.AppCameraSubscribe.$Properties|null} [cameraSubscribe] AppRequest cameraSubscribe
         * @property {rustplus.AppEmpty.$Properties|null} [cameraUnsubscribe] AppRequest cameraUnsubscribe
         * @property {rustplus.AppCameraInput.$Properties|null} [cameraInput] AppRequest cameraInput
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppRequest.
         * @memberof rustplus
         * @interface IAppRequest
         * @augments rustplus.AppRequest.$Properties
         * @deprecated Use rustplus.AppRequest.$Properties instead.
         */

        /**
         * Shape of an AppRequest.
         * @typedef {rustplus.AppRequest.$Properties} rustplus.AppRequest.$Shape
         */

        /**
         * Constructs a new AppRequest.
         * @memberof rustplus
         * @classdesc Represents an AppRequest.
         * @constructor
         * @param {rustplus.AppRequest.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppRequest seq.
         * @member {number} seq
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.seq = 0;

        /**
         * AppRequest playerId.
         * @member {number|Long} playerId
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * AppRequest playerToken.
         * @member {number} playerToken
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.playerToken = 0;

        /**
         * AppRequest entityId.
         * @member {number} entityId
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.entityId = 0;

        /**
         * AppRequest getInfo.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getInfo
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getInfo = null;

        /**
         * AppRequest getTime.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getTime
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getTime = null;

        /**
         * AppRequest getMap.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getMap
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getMap = null;

        /**
         * AppRequest getTeamInfo.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getTeamInfo
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getTeamInfo = null;

        /**
         * AppRequest getTeamChat.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getTeamChat
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getTeamChat = null;

        /**
         * AppRequest sendTeamMessage.
         * @member {rustplus.AppSendMessage.$Properties|null|undefined} sendTeamMessage
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.sendTeamMessage = null;

        /**
         * AppRequest getEntityInfo.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getEntityInfo
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getEntityInfo = null;

        /**
         * AppRequest setEntityValue.
         * @member {rustplus.AppSetEntityValue.$Properties|null|undefined} setEntityValue
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.setEntityValue = null;

        /**
         * AppRequest checkSubscription.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} checkSubscription
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.checkSubscription = null;

        /**
         * AppRequest setSubscription.
         * @member {rustplus.AppFlag.$Properties|null|undefined} setSubscription
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.setSubscription = null;

        /**
         * AppRequest getMapMarkers.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getMapMarkers
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getMapMarkers = null;

        /**
         * AppRequest promoteToLeader.
         * @member {rustplus.AppPromoteToLeader.$Properties|null|undefined} promoteToLeader
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.promoteToLeader = null;

        /**
         * AppRequest getClanInfo.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getClanInfo
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getClanInfo = null;

        /**
         * AppRequest setClanMotd.
         * @member {rustplus.AppSendMessage.$Properties|null|undefined} setClanMotd
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.setClanMotd = null;

        /**
         * AppRequest getClanChat.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} getClanChat
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getClanChat = null;

        /**
         * AppRequest sendClanMessage.
         * @member {rustplus.AppSendMessage.$Properties|null|undefined} sendClanMessage
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.sendClanMessage = null;

        /**
         * AppRequest getNexusAuth.
         * @member {rustplus.AppGetNexusAuth.$Properties|null|undefined} getNexusAuth
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.getNexusAuth = null;

        /**
         * AppRequest cameraSubscribe.
         * @member {rustplus.AppCameraSubscribe.$Properties|null|undefined} cameraSubscribe
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.cameraSubscribe = null;

        /**
         * AppRequest cameraUnsubscribe.
         * @member {rustplus.AppEmpty.$Properties|null|undefined} cameraUnsubscribe
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.cameraUnsubscribe = null;

        /**
         * AppRequest cameraInput.
         * @member {rustplus.AppCameraInput.$Properties|null|undefined} cameraInput
         * @memberof rustplus.AppRequest
         * @instance
         */
        AppRequest.prototype.cameraInput = null;

        /**
         * Creates a new AppRequest instance using the specified properties.
         * @function create
         * @memberof rustplus.AppRequest
         * @static
         * @param {rustplus.AppRequest.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppRequest} AppRequest instance
         * @type {{
         *   (properties: rustplus.AppRequest.$Shape): rustplus.AppRequest & rustplus.AppRequest.$Shape;
         *   (properties?: rustplus.AppRequest.$Properties): rustplus.AppRequest;
         * }}
         */
        AppRequest.create = function create(properties) {
            return new AppRequest(properties);
        };

        /**
         * Encodes the specified AppRequest message. Does not implicitly {@link rustplus.AppRequest.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppRequest
         * @static
         * @param {rustplus.AppRequest.$Properties} message AppRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seq);
            writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.playerId);
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.playerToken);
            if (message.entityId != null && Object.hasOwnProperty.call(message, "entityId"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.entityId);
            if (message.getInfo != null && Object.hasOwnProperty.call(message, "getInfo"))
                $root.rustplus.AppEmpty.encode(message.getInfo, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.getTime != null && Object.hasOwnProperty.call(message, "getTime"))
                $root.rustplus.AppEmpty.encode(message.getTime, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.getMap != null && Object.hasOwnProperty.call(message, "getMap"))
                $root.rustplus.AppEmpty.encode(message.getMap, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.getTeamInfo != null && Object.hasOwnProperty.call(message, "getTeamInfo"))
                $root.rustplus.AppEmpty.encode(message.getTeamInfo, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.getTeamChat != null && Object.hasOwnProperty.call(message, "getTeamChat"))
                $root.rustplus.AppEmpty.encode(message.getTeamChat, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.sendTeamMessage != null && Object.hasOwnProperty.call(message, "sendTeamMessage"))
                $root.rustplus.AppSendMessage.encode(message.sendTeamMessage, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.getEntityInfo != null && Object.hasOwnProperty.call(message, "getEntityInfo"))
                $root.rustplus.AppEmpty.encode(message.getEntityInfo, writer.uint32(/* id 14, wireType 2 =*/114).fork()).ldelim();
            if (message.setEntityValue != null && Object.hasOwnProperty.call(message, "setEntityValue"))
                $root.rustplus.AppSetEntityValue.encode(message.setEntityValue, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
            if (message.checkSubscription != null && Object.hasOwnProperty.call(message, "checkSubscription"))
                $root.rustplus.AppEmpty.encode(message.checkSubscription, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.setSubscription != null && Object.hasOwnProperty.call(message, "setSubscription"))
                $root.rustplus.AppFlag.encode(message.setSubscription, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.getMapMarkers != null && Object.hasOwnProperty.call(message, "getMapMarkers"))
                $root.rustplus.AppEmpty.encode(message.getMapMarkers, writer.uint32(/* id 18, wireType 2 =*/146).fork()).ldelim();
            if (message.promoteToLeader != null && Object.hasOwnProperty.call(message, "promoteToLeader"))
                $root.rustplus.AppPromoteToLeader.encode(message.promoteToLeader, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
            if (message.getClanInfo != null && Object.hasOwnProperty.call(message, "getClanInfo"))
                $root.rustplus.AppEmpty.encode(message.getClanInfo, writer.uint32(/* id 21, wireType 2 =*/170).fork()).ldelim();
            if (message.setClanMotd != null && Object.hasOwnProperty.call(message, "setClanMotd"))
                $root.rustplus.AppSendMessage.encode(message.setClanMotd, writer.uint32(/* id 22, wireType 2 =*/178).fork()).ldelim();
            if (message.getClanChat != null && Object.hasOwnProperty.call(message, "getClanChat"))
                $root.rustplus.AppEmpty.encode(message.getClanChat, writer.uint32(/* id 23, wireType 2 =*/186).fork()).ldelim();
            if (message.sendClanMessage != null && Object.hasOwnProperty.call(message, "sendClanMessage"))
                $root.rustplus.AppSendMessage.encode(message.sendClanMessage, writer.uint32(/* id 24, wireType 2 =*/194).fork()).ldelim();
            if (message.getNexusAuth != null && Object.hasOwnProperty.call(message, "getNexusAuth"))
                $root.rustplus.AppGetNexusAuth.encode(message.getNexusAuth, writer.uint32(/* id 25, wireType 2 =*/202).fork()).ldelim();
            if (message.cameraSubscribe != null && Object.hasOwnProperty.call(message, "cameraSubscribe"))
                $root.rustplus.AppCameraSubscribe.encode(message.cameraSubscribe, writer.uint32(/* id 30, wireType 2 =*/242).fork()).ldelim();
            if (message.cameraUnsubscribe != null && Object.hasOwnProperty.call(message, "cameraUnsubscribe"))
                $root.rustplus.AppEmpty.encode(message.cameraUnsubscribe, writer.uint32(/* id 31, wireType 2 =*/250).fork()).ldelim();
            if (message.cameraInput != null && Object.hasOwnProperty.call(message, "cameraInput"))
                $root.rustplus.AppCameraInput.encode(message.cameraInput, writer.uint32(/* id 32, wireType 2 =*/258).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppRequest message, length delimited. Does not implicitly {@link rustplus.AppRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppRequest
         * @static
         * @param {rustplus.AppRequest.$Properties} message AppRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppRequest message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppRequest & rustplus.AppRequest.$Shape} AppRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppRequest.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppRequest();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.seq = reader.uint32();
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.playerId = reader.uint64();
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        message.playerToken = reader.int32();
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.entityId = reader.uint32();
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.getInfo = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getInfo);
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.getTime = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getTime);
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        message.getMap = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getMap);
                        continue;
                    }
                case 11: {
                        if (wireType !== 2)
                            break;
                        message.getTeamInfo = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getTeamInfo);
                        continue;
                    }
                case 12: {
                        if (wireType !== 2)
                            break;
                        message.getTeamChat = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getTeamChat);
                        continue;
                    }
                case 13: {
                        if (wireType !== 2)
                            break;
                        message.sendTeamMessage = $root.rustplus.AppSendMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.sendTeamMessage);
                        continue;
                    }
                case 14: {
                        if (wireType !== 2)
                            break;
                        message.getEntityInfo = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getEntityInfo);
                        continue;
                    }
                case 15: {
                        if (wireType !== 2)
                            break;
                        message.setEntityValue = $root.rustplus.AppSetEntityValue.decode(reader, reader.uint32(), undefined, _depth + 1, message.setEntityValue);
                        continue;
                    }
                case 16: {
                        if (wireType !== 2)
                            break;
                        message.checkSubscription = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.checkSubscription);
                        continue;
                    }
                case 17: {
                        if (wireType !== 2)
                            break;
                        message.setSubscription = $root.rustplus.AppFlag.decode(reader, reader.uint32(), undefined, _depth + 1, message.setSubscription);
                        continue;
                    }
                case 18: {
                        if (wireType !== 2)
                            break;
                        message.getMapMarkers = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getMapMarkers);
                        continue;
                    }
                case 20: {
                        if (wireType !== 2)
                            break;
                        message.promoteToLeader = $root.rustplus.AppPromoteToLeader.decode(reader, reader.uint32(), undefined, _depth + 1, message.promoteToLeader);
                        continue;
                    }
                case 21: {
                        if (wireType !== 2)
                            break;
                        message.getClanInfo = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getClanInfo);
                        continue;
                    }
                case 22: {
                        if (wireType !== 2)
                            break;
                        message.setClanMotd = $root.rustplus.AppSendMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.setClanMotd);
                        continue;
                    }
                case 23: {
                        if (wireType !== 2)
                            break;
                        message.getClanChat = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.getClanChat);
                        continue;
                    }
                case 24: {
                        if (wireType !== 2)
                            break;
                        message.sendClanMessage = $root.rustplus.AppSendMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.sendClanMessage);
                        continue;
                    }
                case 25: {
                        if (wireType !== 2)
                            break;
                        message.getNexusAuth = $root.rustplus.AppGetNexusAuth.decode(reader, reader.uint32(), undefined, _depth + 1, message.getNexusAuth);
                        continue;
                    }
                case 30: {
                        if (wireType !== 2)
                            break;
                        message.cameraSubscribe = $root.rustplus.AppCameraSubscribe.decode(reader, reader.uint32(), undefined, _depth + 1, message.cameraSubscribe);
                        continue;
                    }
                case 31: {
                        if (wireType !== 2)
                            break;
                        message.cameraUnsubscribe = $root.rustplus.AppEmpty.decode(reader, reader.uint32(), undefined, _depth + 1, message.cameraUnsubscribe);
                        continue;
                    }
                case 32: {
                        if (wireType !== 2)
                            break;
                        message.cameraInput = $root.rustplus.AppCameraInput.decode(reader, reader.uint32(), undefined, _depth + 1, message.cameraInput);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("seq"))
                throw $util.ProtocolError("missing required 'seq'", { instance: message });
            if (!message.hasOwnProperty("playerId"))
                throw $util.ProtocolError("missing required 'playerId'", { instance: message });
            if (!message.hasOwnProperty("playerToken"))
                throw $util.ProtocolError("missing required 'playerToken'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppRequest & rustplus.AppRequest.$Shape} AppRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppRequest message.
         * @function verify
         * @memberof rustplus.AppRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppRequest.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.seq))
                return "seq: integer expected";
            if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                return "playerId: integer|Long expected";
            if (!$util.isInteger(message.playerToken))
                return "playerToken: integer expected";
            if (message.entityId != null && message.hasOwnProperty("entityId"))
                if (!$util.isInteger(message.entityId))
                    return "entityId: integer expected";
            if (message.getInfo != null && message.hasOwnProperty("getInfo")) {
                let error = $root.rustplus.AppEmpty.verify(message.getInfo, _depth + 1);
                if (error)
                    return "getInfo." + error;
            }
            if (message.getTime != null && message.hasOwnProperty("getTime")) {
                let error = $root.rustplus.AppEmpty.verify(message.getTime, _depth + 1);
                if (error)
                    return "getTime." + error;
            }
            if (message.getMap != null && message.hasOwnProperty("getMap")) {
                let error = $root.rustplus.AppEmpty.verify(message.getMap, _depth + 1);
                if (error)
                    return "getMap." + error;
            }
            if (message.getTeamInfo != null && message.hasOwnProperty("getTeamInfo")) {
                let error = $root.rustplus.AppEmpty.verify(message.getTeamInfo, _depth + 1);
                if (error)
                    return "getTeamInfo." + error;
            }
            if (message.getTeamChat != null && message.hasOwnProperty("getTeamChat")) {
                let error = $root.rustplus.AppEmpty.verify(message.getTeamChat, _depth + 1);
                if (error)
                    return "getTeamChat." + error;
            }
            if (message.sendTeamMessage != null && message.hasOwnProperty("sendTeamMessage")) {
                let error = $root.rustplus.AppSendMessage.verify(message.sendTeamMessage, _depth + 1);
                if (error)
                    return "sendTeamMessage." + error;
            }
            if (message.getEntityInfo != null && message.hasOwnProperty("getEntityInfo")) {
                let error = $root.rustplus.AppEmpty.verify(message.getEntityInfo, _depth + 1);
                if (error)
                    return "getEntityInfo." + error;
            }
            if (message.setEntityValue != null && message.hasOwnProperty("setEntityValue")) {
                let error = $root.rustplus.AppSetEntityValue.verify(message.setEntityValue, _depth + 1);
                if (error)
                    return "setEntityValue." + error;
            }
            if (message.checkSubscription != null && message.hasOwnProperty("checkSubscription")) {
                let error = $root.rustplus.AppEmpty.verify(message.checkSubscription, _depth + 1);
                if (error)
                    return "checkSubscription." + error;
            }
            if (message.setSubscription != null && message.hasOwnProperty("setSubscription")) {
                let error = $root.rustplus.AppFlag.verify(message.setSubscription, _depth + 1);
                if (error)
                    return "setSubscription." + error;
            }
            if (message.getMapMarkers != null && message.hasOwnProperty("getMapMarkers")) {
                let error = $root.rustplus.AppEmpty.verify(message.getMapMarkers, _depth + 1);
                if (error)
                    return "getMapMarkers." + error;
            }
            if (message.promoteToLeader != null && message.hasOwnProperty("promoteToLeader")) {
                let error = $root.rustplus.AppPromoteToLeader.verify(message.promoteToLeader, _depth + 1);
                if (error)
                    return "promoteToLeader." + error;
            }
            if (message.getClanInfo != null && message.hasOwnProperty("getClanInfo")) {
                let error = $root.rustplus.AppEmpty.verify(message.getClanInfo, _depth + 1);
                if (error)
                    return "getClanInfo." + error;
            }
            if (message.setClanMotd != null && message.hasOwnProperty("setClanMotd")) {
                let error = $root.rustplus.AppSendMessage.verify(message.setClanMotd, _depth + 1);
                if (error)
                    return "setClanMotd." + error;
            }
            if (message.getClanChat != null && message.hasOwnProperty("getClanChat")) {
                let error = $root.rustplus.AppEmpty.verify(message.getClanChat, _depth + 1);
                if (error)
                    return "getClanChat." + error;
            }
            if (message.sendClanMessage != null && message.hasOwnProperty("sendClanMessage")) {
                let error = $root.rustplus.AppSendMessage.verify(message.sendClanMessage, _depth + 1);
                if (error)
                    return "sendClanMessage." + error;
            }
            if (message.getNexusAuth != null && message.hasOwnProperty("getNexusAuth")) {
                let error = $root.rustplus.AppGetNexusAuth.verify(message.getNexusAuth, _depth + 1);
                if (error)
                    return "getNexusAuth." + error;
            }
            if (message.cameraSubscribe != null && message.hasOwnProperty("cameraSubscribe")) {
                let error = $root.rustplus.AppCameraSubscribe.verify(message.cameraSubscribe, _depth + 1);
                if (error)
                    return "cameraSubscribe." + error;
            }
            if (message.cameraUnsubscribe != null && message.hasOwnProperty("cameraUnsubscribe")) {
                let error = $root.rustplus.AppEmpty.verify(message.cameraUnsubscribe, _depth + 1);
                if (error)
                    return "cameraUnsubscribe." + error;
            }
            if (message.cameraInput != null && message.hasOwnProperty("cameraInput")) {
                let error = $root.rustplus.AppCameraInput.verify(message.cameraInput, _depth + 1);
                if (error)
                    return "cameraInput." + error;
            }
            return null;
        };

        /**
         * Creates an AppRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppRequest} AppRequest
         */
        AppRequest.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppRequest)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppRequest();
            if (object.seq != null)
                message.seq = object.seq >>> 0;
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = true;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber(true);
            if (object.playerToken != null)
                message.playerToken = object.playerToken | 0;
            if (object.entityId != null)
                message.entityId = object.entityId >>> 0;
            if (object.getInfo != null) {
                if (typeof object.getInfo !== "object")
                    throw TypeError(".rustplus.AppRequest.getInfo: object expected");
                message.getInfo = $root.rustplus.AppEmpty.fromObject(object.getInfo, _depth + 1);
            }
            if (object.getTime != null) {
                if (typeof object.getTime !== "object")
                    throw TypeError(".rustplus.AppRequest.getTime: object expected");
                message.getTime = $root.rustplus.AppEmpty.fromObject(object.getTime, _depth + 1);
            }
            if (object.getMap != null) {
                if (typeof object.getMap !== "object")
                    throw TypeError(".rustplus.AppRequest.getMap: object expected");
                message.getMap = $root.rustplus.AppEmpty.fromObject(object.getMap, _depth + 1);
            }
            if (object.getTeamInfo != null) {
                if (typeof object.getTeamInfo !== "object")
                    throw TypeError(".rustplus.AppRequest.getTeamInfo: object expected");
                message.getTeamInfo = $root.rustplus.AppEmpty.fromObject(object.getTeamInfo, _depth + 1);
            }
            if (object.getTeamChat != null) {
                if (typeof object.getTeamChat !== "object")
                    throw TypeError(".rustplus.AppRequest.getTeamChat: object expected");
                message.getTeamChat = $root.rustplus.AppEmpty.fromObject(object.getTeamChat, _depth + 1);
            }
            if (object.sendTeamMessage != null) {
                if (typeof object.sendTeamMessage !== "object")
                    throw TypeError(".rustplus.AppRequest.sendTeamMessage: object expected");
                message.sendTeamMessage = $root.rustplus.AppSendMessage.fromObject(object.sendTeamMessage, _depth + 1);
            }
            if (object.getEntityInfo != null) {
                if (typeof object.getEntityInfo !== "object")
                    throw TypeError(".rustplus.AppRequest.getEntityInfo: object expected");
                message.getEntityInfo = $root.rustplus.AppEmpty.fromObject(object.getEntityInfo, _depth + 1);
            }
            if (object.setEntityValue != null) {
                if (typeof object.setEntityValue !== "object")
                    throw TypeError(".rustplus.AppRequest.setEntityValue: object expected");
                message.setEntityValue = $root.rustplus.AppSetEntityValue.fromObject(object.setEntityValue, _depth + 1);
            }
            if (object.checkSubscription != null) {
                if (typeof object.checkSubscription !== "object")
                    throw TypeError(".rustplus.AppRequest.checkSubscription: object expected");
                message.checkSubscription = $root.rustplus.AppEmpty.fromObject(object.checkSubscription, _depth + 1);
            }
            if (object.setSubscription != null) {
                if (typeof object.setSubscription !== "object")
                    throw TypeError(".rustplus.AppRequest.setSubscription: object expected");
                message.setSubscription = $root.rustplus.AppFlag.fromObject(object.setSubscription, _depth + 1);
            }
            if (object.getMapMarkers != null) {
                if (typeof object.getMapMarkers !== "object")
                    throw TypeError(".rustplus.AppRequest.getMapMarkers: object expected");
                message.getMapMarkers = $root.rustplus.AppEmpty.fromObject(object.getMapMarkers, _depth + 1);
            }
            if (object.promoteToLeader != null) {
                if (typeof object.promoteToLeader !== "object")
                    throw TypeError(".rustplus.AppRequest.promoteToLeader: object expected");
                message.promoteToLeader = $root.rustplus.AppPromoteToLeader.fromObject(object.promoteToLeader, _depth + 1);
            }
            if (object.getClanInfo != null) {
                if (typeof object.getClanInfo !== "object")
                    throw TypeError(".rustplus.AppRequest.getClanInfo: object expected");
                message.getClanInfo = $root.rustplus.AppEmpty.fromObject(object.getClanInfo, _depth + 1);
            }
            if (object.setClanMotd != null) {
                if (typeof object.setClanMotd !== "object")
                    throw TypeError(".rustplus.AppRequest.setClanMotd: object expected");
                message.setClanMotd = $root.rustplus.AppSendMessage.fromObject(object.setClanMotd, _depth + 1);
            }
            if (object.getClanChat != null) {
                if (typeof object.getClanChat !== "object")
                    throw TypeError(".rustplus.AppRequest.getClanChat: object expected");
                message.getClanChat = $root.rustplus.AppEmpty.fromObject(object.getClanChat, _depth + 1);
            }
            if (object.sendClanMessage != null) {
                if (typeof object.sendClanMessage !== "object")
                    throw TypeError(".rustplus.AppRequest.sendClanMessage: object expected");
                message.sendClanMessage = $root.rustplus.AppSendMessage.fromObject(object.sendClanMessage, _depth + 1);
            }
            if (object.getNexusAuth != null) {
                if (typeof object.getNexusAuth !== "object")
                    throw TypeError(".rustplus.AppRequest.getNexusAuth: object expected");
                message.getNexusAuth = $root.rustplus.AppGetNexusAuth.fromObject(object.getNexusAuth, _depth + 1);
            }
            if (object.cameraSubscribe != null) {
                if (typeof object.cameraSubscribe !== "object")
                    throw TypeError(".rustplus.AppRequest.cameraSubscribe: object expected");
                message.cameraSubscribe = $root.rustplus.AppCameraSubscribe.fromObject(object.cameraSubscribe, _depth + 1);
            }
            if (object.cameraUnsubscribe != null) {
                if (typeof object.cameraUnsubscribe !== "object")
                    throw TypeError(".rustplus.AppRequest.cameraUnsubscribe: object expected");
                message.cameraUnsubscribe = $root.rustplus.AppEmpty.fromObject(object.cameraUnsubscribe, _depth + 1);
            }
            if (object.cameraInput != null) {
                if (typeof object.cameraInput !== "object")
                    throw TypeError(".rustplus.AppRequest.cameraInput: object expected");
                message.cameraInput = $root.rustplus.AppCameraInput.fromObject(object.cameraInput, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppRequest
         * @static
         * @param {rustplus.AppRequest} message AppRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seq = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.playerToken = 0;
                object.entityId = 0;
                object.getInfo = null;
                object.getTime = null;
                object.getMap = null;
                object.getTeamInfo = null;
                object.getTeamChat = null;
                object.sendTeamMessage = null;
                object.getEntityInfo = null;
                object.setEntityValue = null;
                object.checkSubscription = null;
                object.setSubscription = null;
                object.getMapMarkers = null;
                object.promoteToLeader = null;
                object.getClanInfo = null;
                object.setClanMotd = null;
                object.getClanChat = null;
                object.sendClanMessage = null;
                object.getNexusAuth = null;
                object.cameraSubscribe = null;
                object.cameraUnsubscribe = null;
                object.cameraInput = null;
            }
            if (message.seq != null && message.hasOwnProperty("seq"))
                object.seq = message.seq;
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber(true) : message.playerId;
            if (message.playerToken != null && message.hasOwnProperty("playerToken"))
                object.playerToken = message.playerToken;
            if (message.entityId != null && message.hasOwnProperty("entityId"))
                object.entityId = message.entityId;
            if (message.getInfo != null && message.hasOwnProperty("getInfo"))
                object.getInfo = $root.rustplus.AppEmpty.toObject(message.getInfo, options);
            if (message.getTime != null && message.hasOwnProperty("getTime"))
                object.getTime = $root.rustplus.AppEmpty.toObject(message.getTime, options);
            if (message.getMap != null && message.hasOwnProperty("getMap"))
                object.getMap = $root.rustplus.AppEmpty.toObject(message.getMap, options);
            if (message.getTeamInfo != null && message.hasOwnProperty("getTeamInfo"))
                object.getTeamInfo = $root.rustplus.AppEmpty.toObject(message.getTeamInfo, options);
            if (message.getTeamChat != null && message.hasOwnProperty("getTeamChat"))
                object.getTeamChat = $root.rustplus.AppEmpty.toObject(message.getTeamChat, options);
            if (message.sendTeamMessage != null && message.hasOwnProperty("sendTeamMessage"))
                object.sendTeamMessage = $root.rustplus.AppSendMessage.toObject(message.sendTeamMessage, options);
            if (message.getEntityInfo != null && message.hasOwnProperty("getEntityInfo"))
                object.getEntityInfo = $root.rustplus.AppEmpty.toObject(message.getEntityInfo, options);
            if (message.setEntityValue != null && message.hasOwnProperty("setEntityValue"))
                object.setEntityValue = $root.rustplus.AppSetEntityValue.toObject(message.setEntityValue, options);
            if (message.checkSubscription != null && message.hasOwnProperty("checkSubscription"))
                object.checkSubscription = $root.rustplus.AppEmpty.toObject(message.checkSubscription, options);
            if (message.setSubscription != null && message.hasOwnProperty("setSubscription"))
                object.setSubscription = $root.rustplus.AppFlag.toObject(message.setSubscription, options);
            if (message.getMapMarkers != null && message.hasOwnProperty("getMapMarkers"))
                object.getMapMarkers = $root.rustplus.AppEmpty.toObject(message.getMapMarkers, options);
            if (message.promoteToLeader != null && message.hasOwnProperty("promoteToLeader"))
                object.promoteToLeader = $root.rustplus.AppPromoteToLeader.toObject(message.promoteToLeader, options);
            if (message.getClanInfo != null && message.hasOwnProperty("getClanInfo"))
                object.getClanInfo = $root.rustplus.AppEmpty.toObject(message.getClanInfo, options);
            if (message.setClanMotd != null && message.hasOwnProperty("setClanMotd"))
                object.setClanMotd = $root.rustplus.AppSendMessage.toObject(message.setClanMotd, options);
            if (message.getClanChat != null && message.hasOwnProperty("getClanChat"))
                object.getClanChat = $root.rustplus.AppEmpty.toObject(message.getClanChat, options);
            if (message.sendClanMessage != null && message.hasOwnProperty("sendClanMessage"))
                object.sendClanMessage = $root.rustplus.AppSendMessage.toObject(message.sendClanMessage, options);
            if (message.getNexusAuth != null && message.hasOwnProperty("getNexusAuth"))
                object.getNexusAuth = $root.rustplus.AppGetNexusAuth.toObject(message.getNexusAuth, options);
            if (message.cameraSubscribe != null && message.hasOwnProperty("cameraSubscribe"))
                object.cameraSubscribe = $root.rustplus.AppCameraSubscribe.toObject(message.cameraSubscribe, options);
            if (message.cameraUnsubscribe != null && message.hasOwnProperty("cameraUnsubscribe"))
                object.cameraUnsubscribe = $root.rustplus.AppEmpty.toObject(message.cameraUnsubscribe, options);
            if (message.cameraInput != null && message.hasOwnProperty("cameraInput"))
                object.cameraInput = $root.rustplus.AppCameraInput.toObject(message.cameraInput, options);
            return object;
        };

        /**
         * Converts this AppRequest to JSON.
         * @function toJSON
         * @memberof rustplus.AppRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppRequest
         * @function getTypeUrl
         * @memberof rustplus.AppRequest
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppRequest.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppRequest";
        };

        return AppRequest;
    })();

    rustplus.AppMessage = (function() {

        /**
         * Properties of an AppMessage.
         * @typedef {Object} rustplus.AppMessage.$Properties
         * @property {rustplus.AppResponse.$Properties|null} [response] AppMessage response
         * @property {rustplus.AppBroadcast.$Properties|null} [broadcast] AppMessage broadcast
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppMessage.
         * @memberof rustplus
         * @interface IAppMessage
         * @augments rustplus.AppMessage.$Properties
         * @deprecated Use rustplus.AppMessage.$Properties instead.
         */

        /**
         * Shape of an AppMessage.
         * @typedef {rustplus.AppMessage.$Properties} rustplus.AppMessage.$Shape
         */

        /**
         * Constructs a new AppMessage.
         * @memberof rustplus
         * @classdesc Represents an AppMessage.
         * @constructor
         * @param {rustplus.AppMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppMessage response.
         * @member {rustplus.AppResponse.$Properties|null|undefined} response
         * @memberof rustplus.AppMessage
         * @instance
         */
        AppMessage.prototype.response = null;

        /**
         * AppMessage broadcast.
         * @member {rustplus.AppBroadcast.$Properties|null|undefined} broadcast
         * @memberof rustplus.AppMessage
         * @instance
         */
        AppMessage.prototype.broadcast = null;

        /**
         * Creates a new AppMessage instance using the specified properties.
         * @function create
         * @memberof rustplus.AppMessage
         * @static
         * @param {rustplus.AppMessage.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppMessage} AppMessage instance
         * @type {{
         *   (properties: rustplus.AppMessage.$Shape): rustplus.AppMessage & rustplus.AppMessage.$Shape;
         *   (properties?: rustplus.AppMessage.$Properties): rustplus.AppMessage;
         * }}
         */
        AppMessage.create = function create(properties) {
            return new AppMessage(properties);
        };

        /**
         * Encodes the specified AppMessage message. Does not implicitly {@link rustplus.AppMessage.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppMessage
         * @static
         * @param {rustplus.AppMessage.$Properties} message AppMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.response != null && Object.hasOwnProperty.call(message, "response"))
                $root.rustplus.AppResponse.encode(message.response, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.broadcast != null && Object.hasOwnProperty.call(message, "broadcast"))
                $root.rustplus.AppBroadcast.encode(message.broadcast, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppMessage message, length delimited. Does not implicitly {@link rustplus.AppMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppMessage
         * @static
         * @param {rustplus.AppMessage.$Properties} message AppMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppMessage message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppMessage & rustplus.AppMessage.$Shape} AppMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppMessage.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.response = $root.rustplus.AppResponse.decode(reader, reader.uint32(), undefined, _depth + 1, message.response);
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.broadcast = $root.rustplus.AppBroadcast.decode(reader, reader.uint32(), undefined, _depth + 1, message.broadcast);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppMessage & rustplus.AppMessage.$Shape} AppMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppMessage message.
         * @function verify
         * @memberof rustplus.AppMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppMessage.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.response != null && message.hasOwnProperty("response")) {
                let error = $root.rustplus.AppResponse.verify(message.response, _depth + 1);
                if (error)
                    return "response." + error;
            }
            if (message.broadcast != null && message.hasOwnProperty("broadcast")) {
                let error = $root.rustplus.AppBroadcast.verify(message.broadcast, _depth + 1);
                if (error)
                    return "broadcast." + error;
            }
            return null;
        };

        /**
         * Creates an AppMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppMessage} AppMessage
         */
        AppMessage.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppMessage)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppMessage();
            if (object.response != null) {
                if (typeof object.response !== "object")
                    throw TypeError(".rustplus.AppMessage.response: object expected");
                message.response = $root.rustplus.AppResponse.fromObject(object.response, _depth + 1);
            }
            if (object.broadcast != null) {
                if (typeof object.broadcast !== "object")
                    throw TypeError(".rustplus.AppMessage.broadcast: object expected");
                message.broadcast = $root.rustplus.AppBroadcast.fromObject(object.broadcast, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppMessage
         * @static
         * @param {rustplus.AppMessage} message AppMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.response = null;
                object.broadcast = null;
            }
            if (message.response != null && message.hasOwnProperty("response"))
                object.response = $root.rustplus.AppResponse.toObject(message.response, options);
            if (message.broadcast != null && message.hasOwnProperty("broadcast"))
                object.broadcast = $root.rustplus.AppBroadcast.toObject(message.broadcast, options);
            return object;
        };

        /**
         * Converts this AppMessage to JSON.
         * @function toJSON
         * @memberof rustplus.AppMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppMessage
         * @function getTypeUrl
         * @memberof rustplus.AppMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppMessage.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppMessage";
        };

        return AppMessage;
    })();

    rustplus.AppResponse = (function() {

        /**
         * Properties of an AppResponse.
         * @typedef {Object} rustplus.AppResponse.$Properties
         * @property {number} seq AppResponse seq
         * @property {rustplus.AppSuccess.$Properties|null} [success] AppResponse success
         * @property {rustplus.AppError.$Properties|null} [error] AppResponse error
         * @property {rustplus.AppInfo.$Properties|null} [info] AppResponse info
         * @property {rustplus.AppTime.$Properties|null} [time] AppResponse time
         * @property {rustplus.AppMap.$Properties|null} [map] AppResponse map
         * @property {rustplus.AppTeamInfo.$Properties|null} [teamInfo] AppResponse teamInfo
         * @property {rustplus.AppTeamChat.$Properties|null} [teamChat] AppResponse teamChat
         * @property {rustplus.AppEntityInfo.$Properties|null} [entityInfo] AppResponse entityInfo
         * @property {rustplus.AppFlag.$Properties|null} [flag] AppResponse flag
         * @property {rustplus.AppMapMarkers.$Properties|null} [mapMarkers] AppResponse mapMarkers
         * @property {rustplus.AppClanInfo.$Properties|null} [clanInfo] AppResponse clanInfo
         * @property {rustplus.AppClanChat.$Properties|null} [clanChat] AppResponse clanChat
         * @property {rustplus.AppNexusAuth.$Properties|null} [nexusAuth] AppResponse nexusAuth
         * @property {rustplus.AppCameraInfo.$Properties|null} [cameraSubscribeInfo] AppResponse cameraSubscribeInfo
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppResponse.
         * @memberof rustplus
         * @interface IAppResponse
         * @augments rustplus.AppResponse.$Properties
         * @deprecated Use rustplus.AppResponse.$Properties instead.
         */

        /**
         * Shape of an AppResponse.
         * @typedef {rustplus.AppResponse.$Properties} rustplus.AppResponse.$Shape
         */

        /**
         * Constructs a new AppResponse.
         * @memberof rustplus
         * @classdesc Represents an AppResponse.
         * @constructor
         * @param {rustplus.AppResponse.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppResponse(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppResponse seq.
         * @member {number} seq
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.seq = 0;

        /**
         * AppResponse success.
         * @member {rustplus.AppSuccess.$Properties|null|undefined} success
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.success = null;

        /**
         * AppResponse error.
         * @member {rustplus.AppError.$Properties|null|undefined} error
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.error = null;

        /**
         * AppResponse info.
         * @member {rustplus.AppInfo.$Properties|null|undefined} info
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.info = null;

        /**
         * AppResponse time.
         * @member {rustplus.AppTime.$Properties|null|undefined} time
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.time = null;

        /**
         * AppResponse map.
         * @member {rustplus.AppMap.$Properties|null|undefined} map
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.map = null;

        /**
         * AppResponse teamInfo.
         * @member {rustplus.AppTeamInfo.$Properties|null|undefined} teamInfo
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.teamInfo = null;

        /**
         * AppResponse teamChat.
         * @member {rustplus.AppTeamChat.$Properties|null|undefined} teamChat
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.teamChat = null;

        /**
         * AppResponse entityInfo.
         * @member {rustplus.AppEntityInfo.$Properties|null|undefined} entityInfo
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.entityInfo = null;

        /**
         * AppResponse flag.
         * @member {rustplus.AppFlag.$Properties|null|undefined} flag
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.flag = null;

        /**
         * AppResponse mapMarkers.
         * @member {rustplus.AppMapMarkers.$Properties|null|undefined} mapMarkers
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.mapMarkers = null;

        /**
         * AppResponse clanInfo.
         * @member {rustplus.AppClanInfo.$Properties|null|undefined} clanInfo
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.clanInfo = null;

        /**
         * AppResponse clanChat.
         * @member {rustplus.AppClanChat.$Properties|null|undefined} clanChat
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.clanChat = null;

        /**
         * AppResponse nexusAuth.
         * @member {rustplus.AppNexusAuth.$Properties|null|undefined} nexusAuth
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.nexusAuth = null;

        /**
         * AppResponse cameraSubscribeInfo.
         * @member {rustplus.AppCameraInfo.$Properties|null|undefined} cameraSubscribeInfo
         * @memberof rustplus.AppResponse
         * @instance
         */
        AppResponse.prototype.cameraSubscribeInfo = null;

        /**
         * Creates a new AppResponse instance using the specified properties.
         * @function create
         * @memberof rustplus.AppResponse
         * @static
         * @param {rustplus.AppResponse.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppResponse} AppResponse instance
         * @type {{
         *   (properties: rustplus.AppResponse.$Shape): rustplus.AppResponse & rustplus.AppResponse.$Shape;
         *   (properties?: rustplus.AppResponse.$Properties): rustplus.AppResponse;
         * }}
         */
        AppResponse.create = function create(properties) {
            return new AppResponse(properties);
        };

        /**
         * Encodes the specified AppResponse message. Does not implicitly {@link rustplus.AppResponse.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppResponse
         * @static
         * @param {rustplus.AppResponse.$Properties} message AppResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppResponse.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.seq);
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
                $root.rustplus.AppSuccess.encode(message.success, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.rustplus.AppError.encode(message.error, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                $root.rustplus.AppInfo.encode(message.info, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.time != null && Object.hasOwnProperty.call(message, "time"))
                $root.rustplus.AppTime.encode(message.time, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.map != null && Object.hasOwnProperty.call(message, "map"))
                $root.rustplus.AppMap.encode(message.map, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.teamInfo != null && Object.hasOwnProperty.call(message, "teamInfo"))
                $root.rustplus.AppTeamInfo.encode(message.teamInfo, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.teamChat != null && Object.hasOwnProperty.call(message, "teamChat"))
                $root.rustplus.AppTeamChat.encode(message.teamChat, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.entityInfo != null && Object.hasOwnProperty.call(message, "entityInfo"))
                $root.rustplus.AppEntityInfo.encode(message.entityInfo, writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
            if (message.flag != null && Object.hasOwnProperty.call(message, "flag"))
                $root.rustplus.AppFlag.encode(message.flag, writer.uint32(/* id 12, wireType 2 =*/98).fork()).ldelim();
            if (message.mapMarkers != null && Object.hasOwnProperty.call(message, "mapMarkers"))
                $root.rustplus.AppMapMarkers.encode(message.mapMarkers, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.clanInfo != null && Object.hasOwnProperty.call(message, "clanInfo"))
                $root.rustplus.AppClanInfo.encode(message.clanInfo, writer.uint32(/* id 15, wireType 2 =*/122).fork()).ldelim();
            if (message.clanChat != null && Object.hasOwnProperty.call(message, "clanChat"))
                $root.rustplus.AppClanChat.encode(message.clanChat, writer.uint32(/* id 16, wireType 2 =*/130).fork()).ldelim();
            if (message.nexusAuth != null && Object.hasOwnProperty.call(message, "nexusAuth"))
                $root.rustplus.AppNexusAuth.encode(message.nexusAuth, writer.uint32(/* id 17, wireType 2 =*/138).fork()).ldelim();
            if (message.cameraSubscribeInfo != null && Object.hasOwnProperty.call(message, "cameraSubscribeInfo"))
                $root.rustplus.AppCameraInfo.encode(message.cameraSubscribeInfo, writer.uint32(/* id 20, wireType 2 =*/162).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppResponse message, length delimited. Does not implicitly {@link rustplus.AppResponse.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppResponse
         * @static
         * @param {rustplus.AppResponse.$Properties} message AppResponse message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppResponse.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppResponse message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppResponse & rustplus.AppResponse.$Shape} AppResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppResponse.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppResponse();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.seq = reader.uint32();
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        message.success = $root.rustplus.AppSuccess.decode(reader, reader.uint32(), undefined, _depth + 1, message.success);
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        message.error = $root.rustplus.AppError.decode(reader, reader.uint32(), undefined, _depth + 1, message.error);
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        message.info = $root.rustplus.AppInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.info);
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        message.time = $root.rustplus.AppTime.decode(reader, reader.uint32(), undefined, _depth + 1, message.time);
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.map = $root.rustplus.AppMap.decode(reader, reader.uint32(), undefined, _depth + 1, message.map);
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.teamInfo = $root.rustplus.AppTeamInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.teamInfo);
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        message.teamChat = $root.rustplus.AppTeamChat.decode(reader, reader.uint32(), undefined, _depth + 1, message.teamChat);
                        continue;
                    }
                case 11: {
                        if (wireType !== 2)
                            break;
                        message.entityInfo = $root.rustplus.AppEntityInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.entityInfo);
                        continue;
                    }
                case 12: {
                        if (wireType !== 2)
                            break;
                        message.flag = $root.rustplus.AppFlag.decode(reader, reader.uint32(), undefined, _depth + 1, message.flag);
                        continue;
                    }
                case 13: {
                        if (wireType !== 2)
                            break;
                        message.mapMarkers = $root.rustplus.AppMapMarkers.decode(reader, reader.uint32(), undefined, _depth + 1, message.mapMarkers);
                        continue;
                    }
                case 15: {
                        if (wireType !== 2)
                            break;
                        message.clanInfo = $root.rustplus.AppClanInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.clanInfo);
                        continue;
                    }
                case 16: {
                        if (wireType !== 2)
                            break;
                        message.clanChat = $root.rustplus.AppClanChat.decode(reader, reader.uint32(), undefined, _depth + 1, message.clanChat);
                        continue;
                    }
                case 17: {
                        if (wireType !== 2)
                            break;
                        message.nexusAuth = $root.rustplus.AppNexusAuth.decode(reader, reader.uint32(), undefined, _depth + 1, message.nexusAuth);
                        continue;
                    }
                case 20: {
                        if (wireType !== 2)
                            break;
                        message.cameraSubscribeInfo = $root.rustplus.AppCameraInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.cameraSubscribeInfo);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("seq"))
                throw $util.ProtocolError("missing required 'seq'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppResponse message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppResponse
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppResponse & rustplus.AppResponse.$Shape} AppResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppResponse.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppResponse message.
         * @function verify
         * @memberof rustplus.AppResponse
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppResponse.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.seq))
                return "seq: integer expected";
            if (message.success != null && message.hasOwnProperty("success")) {
                let error = $root.rustplus.AppSuccess.verify(message.success, _depth + 1);
                if (error)
                    return "success." + error;
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                let error = $root.rustplus.AppError.verify(message.error, _depth + 1);
                if (error)
                    return "error." + error;
            }
            if (message.info != null && message.hasOwnProperty("info")) {
                let error = $root.rustplus.AppInfo.verify(message.info, _depth + 1);
                if (error)
                    return "info." + error;
            }
            if (message.time != null && message.hasOwnProperty("time")) {
                let error = $root.rustplus.AppTime.verify(message.time, _depth + 1);
                if (error)
                    return "time." + error;
            }
            if (message.map != null && message.hasOwnProperty("map")) {
                let error = $root.rustplus.AppMap.verify(message.map, _depth + 1);
                if (error)
                    return "map." + error;
            }
            if (message.teamInfo != null && message.hasOwnProperty("teamInfo")) {
                let error = $root.rustplus.AppTeamInfo.verify(message.teamInfo, _depth + 1);
                if (error)
                    return "teamInfo." + error;
            }
            if (message.teamChat != null && message.hasOwnProperty("teamChat")) {
                let error = $root.rustplus.AppTeamChat.verify(message.teamChat, _depth + 1);
                if (error)
                    return "teamChat." + error;
            }
            if (message.entityInfo != null && message.hasOwnProperty("entityInfo")) {
                let error = $root.rustplus.AppEntityInfo.verify(message.entityInfo, _depth + 1);
                if (error)
                    return "entityInfo." + error;
            }
            if (message.flag != null && message.hasOwnProperty("flag")) {
                let error = $root.rustplus.AppFlag.verify(message.flag, _depth + 1);
                if (error)
                    return "flag." + error;
            }
            if (message.mapMarkers != null && message.hasOwnProperty("mapMarkers")) {
                let error = $root.rustplus.AppMapMarkers.verify(message.mapMarkers, _depth + 1);
                if (error)
                    return "mapMarkers." + error;
            }
            if (message.clanInfo != null && message.hasOwnProperty("clanInfo")) {
                let error = $root.rustplus.AppClanInfo.verify(message.clanInfo, _depth + 1);
                if (error)
                    return "clanInfo." + error;
            }
            if (message.clanChat != null && message.hasOwnProperty("clanChat")) {
                let error = $root.rustplus.AppClanChat.verify(message.clanChat, _depth + 1);
                if (error)
                    return "clanChat." + error;
            }
            if (message.nexusAuth != null && message.hasOwnProperty("nexusAuth")) {
                let error = $root.rustplus.AppNexusAuth.verify(message.nexusAuth, _depth + 1);
                if (error)
                    return "nexusAuth." + error;
            }
            if (message.cameraSubscribeInfo != null && message.hasOwnProperty("cameraSubscribeInfo")) {
                let error = $root.rustplus.AppCameraInfo.verify(message.cameraSubscribeInfo, _depth + 1);
                if (error)
                    return "cameraSubscribeInfo." + error;
            }
            return null;
        };

        /**
         * Creates an AppResponse message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppResponse
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppResponse} AppResponse
         */
        AppResponse.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppResponse)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppResponse();
            if (object.seq != null)
                message.seq = object.seq >>> 0;
            if (object.success != null) {
                if (typeof object.success !== "object")
                    throw TypeError(".rustplus.AppResponse.success: object expected");
                message.success = $root.rustplus.AppSuccess.fromObject(object.success, _depth + 1);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".rustplus.AppResponse.error: object expected");
                message.error = $root.rustplus.AppError.fromObject(object.error, _depth + 1);
            }
            if (object.info != null) {
                if (typeof object.info !== "object")
                    throw TypeError(".rustplus.AppResponse.info: object expected");
                message.info = $root.rustplus.AppInfo.fromObject(object.info, _depth + 1);
            }
            if (object.time != null) {
                if (typeof object.time !== "object")
                    throw TypeError(".rustplus.AppResponse.time: object expected");
                message.time = $root.rustplus.AppTime.fromObject(object.time, _depth + 1);
            }
            if (object.map != null) {
                if (typeof object.map !== "object")
                    throw TypeError(".rustplus.AppResponse.map: object expected");
                message.map = $root.rustplus.AppMap.fromObject(object.map, _depth + 1);
            }
            if (object.teamInfo != null) {
                if (typeof object.teamInfo !== "object")
                    throw TypeError(".rustplus.AppResponse.teamInfo: object expected");
                message.teamInfo = $root.rustplus.AppTeamInfo.fromObject(object.teamInfo, _depth + 1);
            }
            if (object.teamChat != null) {
                if (typeof object.teamChat !== "object")
                    throw TypeError(".rustplus.AppResponse.teamChat: object expected");
                message.teamChat = $root.rustplus.AppTeamChat.fromObject(object.teamChat, _depth + 1);
            }
            if (object.entityInfo != null) {
                if (typeof object.entityInfo !== "object")
                    throw TypeError(".rustplus.AppResponse.entityInfo: object expected");
                message.entityInfo = $root.rustplus.AppEntityInfo.fromObject(object.entityInfo, _depth + 1);
            }
            if (object.flag != null) {
                if (typeof object.flag !== "object")
                    throw TypeError(".rustplus.AppResponse.flag: object expected");
                message.flag = $root.rustplus.AppFlag.fromObject(object.flag, _depth + 1);
            }
            if (object.mapMarkers != null) {
                if (typeof object.mapMarkers !== "object")
                    throw TypeError(".rustplus.AppResponse.mapMarkers: object expected");
                message.mapMarkers = $root.rustplus.AppMapMarkers.fromObject(object.mapMarkers, _depth + 1);
            }
            if (object.clanInfo != null) {
                if (typeof object.clanInfo !== "object")
                    throw TypeError(".rustplus.AppResponse.clanInfo: object expected");
                message.clanInfo = $root.rustplus.AppClanInfo.fromObject(object.clanInfo, _depth + 1);
            }
            if (object.clanChat != null) {
                if (typeof object.clanChat !== "object")
                    throw TypeError(".rustplus.AppResponse.clanChat: object expected");
                message.clanChat = $root.rustplus.AppClanChat.fromObject(object.clanChat, _depth + 1);
            }
            if (object.nexusAuth != null) {
                if (typeof object.nexusAuth !== "object")
                    throw TypeError(".rustplus.AppResponse.nexusAuth: object expected");
                message.nexusAuth = $root.rustplus.AppNexusAuth.fromObject(object.nexusAuth, _depth + 1);
            }
            if (object.cameraSubscribeInfo != null) {
                if (typeof object.cameraSubscribeInfo !== "object")
                    throw TypeError(".rustplus.AppResponse.cameraSubscribeInfo: object expected");
                message.cameraSubscribeInfo = $root.rustplus.AppCameraInfo.fromObject(object.cameraSubscribeInfo, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppResponse message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppResponse
         * @static
         * @param {rustplus.AppResponse} message AppResponse
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppResponse.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.seq = 0;
                object.success = null;
                object.error = null;
                object.info = null;
                object.time = null;
                object.map = null;
                object.teamInfo = null;
                object.teamChat = null;
                object.entityInfo = null;
                object.flag = null;
                object.mapMarkers = null;
                object.clanInfo = null;
                object.clanChat = null;
                object.nexusAuth = null;
                object.cameraSubscribeInfo = null;
            }
            if (message.seq != null && message.hasOwnProperty("seq"))
                object.seq = message.seq;
            if (message.success != null && message.hasOwnProperty("success"))
                object.success = $root.rustplus.AppSuccess.toObject(message.success, options);
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = $root.rustplus.AppError.toObject(message.error, options);
            if (message.info != null && message.hasOwnProperty("info"))
                object.info = $root.rustplus.AppInfo.toObject(message.info, options);
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = $root.rustplus.AppTime.toObject(message.time, options);
            if (message.map != null && message.hasOwnProperty("map"))
                object.map = $root.rustplus.AppMap.toObject(message.map, options);
            if (message.teamInfo != null && message.hasOwnProperty("teamInfo"))
                object.teamInfo = $root.rustplus.AppTeamInfo.toObject(message.teamInfo, options);
            if (message.teamChat != null && message.hasOwnProperty("teamChat"))
                object.teamChat = $root.rustplus.AppTeamChat.toObject(message.teamChat, options);
            if (message.entityInfo != null && message.hasOwnProperty("entityInfo"))
                object.entityInfo = $root.rustplus.AppEntityInfo.toObject(message.entityInfo, options);
            if (message.flag != null && message.hasOwnProperty("flag"))
                object.flag = $root.rustplus.AppFlag.toObject(message.flag, options);
            if (message.mapMarkers != null && message.hasOwnProperty("mapMarkers"))
                object.mapMarkers = $root.rustplus.AppMapMarkers.toObject(message.mapMarkers, options);
            if (message.clanInfo != null && message.hasOwnProperty("clanInfo"))
                object.clanInfo = $root.rustplus.AppClanInfo.toObject(message.clanInfo, options);
            if (message.clanChat != null && message.hasOwnProperty("clanChat"))
                object.clanChat = $root.rustplus.AppClanChat.toObject(message.clanChat, options);
            if (message.nexusAuth != null && message.hasOwnProperty("nexusAuth"))
                object.nexusAuth = $root.rustplus.AppNexusAuth.toObject(message.nexusAuth, options);
            if (message.cameraSubscribeInfo != null && message.hasOwnProperty("cameraSubscribeInfo"))
                object.cameraSubscribeInfo = $root.rustplus.AppCameraInfo.toObject(message.cameraSubscribeInfo, options);
            return object;
        };

        /**
         * Converts this AppResponse to JSON.
         * @function toJSON
         * @memberof rustplus.AppResponse
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppResponse.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppResponse
         * @function getTypeUrl
         * @memberof rustplus.AppResponse
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppResponse.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppResponse";
        };

        return AppResponse;
    })();

    rustplus.AppBroadcast = (function() {

        /**
         * Properties of an AppBroadcast.
         * @typedef {Object} rustplus.AppBroadcast.$Properties
         * @property {rustplus.AppTeamChanged.$Properties|null} [teamChanged] AppBroadcast teamChanged
         * @property {rustplus.AppNewTeamMessage.$Properties|null} [teamMessage] AppBroadcast teamMessage
         * @property {rustplus.AppEntityChanged.$Properties|null} [entityChanged] AppBroadcast entityChanged
         * @property {rustplus.AppClanChanged.$Properties|null} [clanChanged] AppBroadcast clanChanged
         * @property {rustplus.AppNewClanMessage.$Properties|null} [clanMessage] AppBroadcast clanMessage
         * @property {rustplus.AppCameraRays.$Properties|null} [cameraRays] AppBroadcast cameraRays
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppBroadcast.
         * @memberof rustplus
         * @interface IAppBroadcast
         * @augments rustplus.AppBroadcast.$Properties
         * @deprecated Use rustplus.AppBroadcast.$Properties instead.
         */

        /**
         * Shape of an AppBroadcast.
         * @typedef {rustplus.AppBroadcast.$Properties} rustplus.AppBroadcast.$Shape
         */

        /**
         * Constructs a new AppBroadcast.
         * @memberof rustplus
         * @classdesc Represents an AppBroadcast.
         * @constructor
         * @param {rustplus.AppBroadcast.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppBroadcast(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppBroadcast teamChanged.
         * @member {rustplus.AppTeamChanged.$Properties|null|undefined} teamChanged
         * @memberof rustplus.AppBroadcast
         * @instance
         */
        AppBroadcast.prototype.teamChanged = null;

        /**
         * AppBroadcast teamMessage.
         * @member {rustplus.AppNewTeamMessage.$Properties|null|undefined} teamMessage
         * @memberof rustplus.AppBroadcast
         * @instance
         */
        AppBroadcast.prototype.teamMessage = null;

        /**
         * AppBroadcast entityChanged.
         * @member {rustplus.AppEntityChanged.$Properties|null|undefined} entityChanged
         * @memberof rustplus.AppBroadcast
         * @instance
         */
        AppBroadcast.prototype.entityChanged = null;

        /**
         * AppBroadcast clanChanged.
         * @member {rustplus.AppClanChanged.$Properties|null|undefined} clanChanged
         * @memberof rustplus.AppBroadcast
         * @instance
         */
        AppBroadcast.prototype.clanChanged = null;

        /**
         * AppBroadcast clanMessage.
         * @member {rustplus.AppNewClanMessage.$Properties|null|undefined} clanMessage
         * @memberof rustplus.AppBroadcast
         * @instance
         */
        AppBroadcast.prototype.clanMessage = null;

        /**
         * AppBroadcast cameraRays.
         * @member {rustplus.AppCameraRays.$Properties|null|undefined} cameraRays
         * @memberof rustplus.AppBroadcast
         * @instance
         */
        AppBroadcast.prototype.cameraRays = null;

        /**
         * Creates a new AppBroadcast instance using the specified properties.
         * @function create
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {rustplus.AppBroadcast.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppBroadcast} AppBroadcast instance
         * @type {{
         *   (properties: rustplus.AppBroadcast.$Shape): rustplus.AppBroadcast & rustplus.AppBroadcast.$Shape;
         *   (properties?: rustplus.AppBroadcast.$Properties): rustplus.AppBroadcast;
         * }}
         */
        AppBroadcast.create = function create(properties) {
            return new AppBroadcast(properties);
        };

        /**
         * Encodes the specified AppBroadcast message. Does not implicitly {@link rustplus.AppBroadcast.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {rustplus.AppBroadcast.$Properties} message AppBroadcast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppBroadcast.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.teamChanged != null && Object.hasOwnProperty.call(message, "teamChanged"))
                $root.rustplus.AppTeamChanged.encode(message.teamChanged, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.teamMessage != null && Object.hasOwnProperty.call(message, "teamMessage"))
                $root.rustplus.AppNewTeamMessage.encode(message.teamMessage, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.entityChanged != null && Object.hasOwnProperty.call(message, "entityChanged"))
                $root.rustplus.AppEntityChanged.encode(message.entityChanged, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.clanChanged != null && Object.hasOwnProperty.call(message, "clanChanged"))
                $root.rustplus.AppClanChanged.encode(message.clanChanged, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.clanMessage != null && Object.hasOwnProperty.call(message, "clanMessage"))
                $root.rustplus.AppNewClanMessage.encode(message.clanMessage, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.cameraRays != null && Object.hasOwnProperty.call(message, "cameraRays"))
                $root.rustplus.AppCameraRays.encode(message.cameraRays, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppBroadcast message, length delimited. Does not implicitly {@link rustplus.AppBroadcast.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {rustplus.AppBroadcast.$Properties} message AppBroadcast message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppBroadcast.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppBroadcast message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppBroadcast & rustplus.AppBroadcast.$Shape} AppBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppBroadcast.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppBroadcast();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 4: {
                        if (wireType !== 2)
                            break;
                        message.teamChanged = $root.rustplus.AppTeamChanged.decode(reader, reader.uint32(), undefined, _depth + 1, message.teamChanged);
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        message.teamMessage = $root.rustplus.AppNewTeamMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.teamMessage);
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        message.entityChanged = $root.rustplus.AppEntityChanged.decode(reader, reader.uint32(), undefined, _depth + 1, message.entityChanged);
                        continue;
                    }
                case 7: {
                        if (wireType !== 2)
                            break;
                        message.clanChanged = $root.rustplus.AppClanChanged.decode(reader, reader.uint32(), undefined, _depth + 1, message.clanChanged);
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.clanMessage = $root.rustplus.AppNewClanMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.clanMessage);
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        message.cameraRays = $root.rustplus.AppCameraRays.decode(reader, reader.uint32(), undefined, _depth + 1, message.cameraRays);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppBroadcast message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppBroadcast & rustplus.AppBroadcast.$Shape} AppBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppBroadcast.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppBroadcast message.
         * @function verify
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppBroadcast.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.teamChanged != null && message.hasOwnProperty("teamChanged")) {
                let error = $root.rustplus.AppTeamChanged.verify(message.teamChanged, _depth + 1);
                if (error)
                    return "teamChanged." + error;
            }
            if (message.teamMessage != null && message.hasOwnProperty("teamMessage")) {
                let error = $root.rustplus.AppNewTeamMessage.verify(message.teamMessage, _depth + 1);
                if (error)
                    return "teamMessage." + error;
            }
            if (message.entityChanged != null && message.hasOwnProperty("entityChanged")) {
                let error = $root.rustplus.AppEntityChanged.verify(message.entityChanged, _depth + 1);
                if (error)
                    return "entityChanged." + error;
            }
            if (message.clanChanged != null && message.hasOwnProperty("clanChanged")) {
                let error = $root.rustplus.AppClanChanged.verify(message.clanChanged, _depth + 1);
                if (error)
                    return "clanChanged." + error;
            }
            if (message.clanMessage != null && message.hasOwnProperty("clanMessage")) {
                let error = $root.rustplus.AppNewClanMessage.verify(message.clanMessage, _depth + 1);
                if (error)
                    return "clanMessage." + error;
            }
            if (message.cameraRays != null && message.hasOwnProperty("cameraRays")) {
                let error = $root.rustplus.AppCameraRays.verify(message.cameraRays, _depth + 1);
                if (error)
                    return "cameraRays." + error;
            }
            return null;
        };

        /**
         * Creates an AppBroadcast message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppBroadcast} AppBroadcast
         */
        AppBroadcast.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppBroadcast)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppBroadcast();
            if (object.teamChanged != null) {
                if (typeof object.teamChanged !== "object")
                    throw TypeError(".rustplus.AppBroadcast.teamChanged: object expected");
                message.teamChanged = $root.rustplus.AppTeamChanged.fromObject(object.teamChanged, _depth + 1);
            }
            if (object.teamMessage != null) {
                if (typeof object.teamMessage !== "object")
                    throw TypeError(".rustplus.AppBroadcast.teamMessage: object expected");
                message.teamMessage = $root.rustplus.AppNewTeamMessage.fromObject(object.teamMessage, _depth + 1);
            }
            if (object.entityChanged != null) {
                if (typeof object.entityChanged !== "object")
                    throw TypeError(".rustplus.AppBroadcast.entityChanged: object expected");
                message.entityChanged = $root.rustplus.AppEntityChanged.fromObject(object.entityChanged, _depth + 1);
            }
            if (object.clanChanged != null) {
                if (typeof object.clanChanged !== "object")
                    throw TypeError(".rustplus.AppBroadcast.clanChanged: object expected");
                message.clanChanged = $root.rustplus.AppClanChanged.fromObject(object.clanChanged, _depth + 1);
            }
            if (object.clanMessage != null) {
                if (typeof object.clanMessage !== "object")
                    throw TypeError(".rustplus.AppBroadcast.clanMessage: object expected");
                message.clanMessage = $root.rustplus.AppNewClanMessage.fromObject(object.clanMessage, _depth + 1);
            }
            if (object.cameraRays != null) {
                if (typeof object.cameraRays !== "object")
                    throw TypeError(".rustplus.AppBroadcast.cameraRays: object expected");
                message.cameraRays = $root.rustplus.AppCameraRays.fromObject(object.cameraRays, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppBroadcast message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {rustplus.AppBroadcast} message AppBroadcast
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppBroadcast.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.teamChanged = null;
                object.teamMessage = null;
                object.entityChanged = null;
                object.clanChanged = null;
                object.clanMessage = null;
                object.cameraRays = null;
            }
            if (message.teamChanged != null && message.hasOwnProperty("teamChanged"))
                object.teamChanged = $root.rustplus.AppTeamChanged.toObject(message.teamChanged, options);
            if (message.teamMessage != null && message.hasOwnProperty("teamMessage"))
                object.teamMessage = $root.rustplus.AppNewTeamMessage.toObject(message.teamMessage, options);
            if (message.entityChanged != null && message.hasOwnProperty("entityChanged"))
                object.entityChanged = $root.rustplus.AppEntityChanged.toObject(message.entityChanged, options);
            if (message.clanChanged != null && message.hasOwnProperty("clanChanged"))
                object.clanChanged = $root.rustplus.AppClanChanged.toObject(message.clanChanged, options);
            if (message.clanMessage != null && message.hasOwnProperty("clanMessage"))
                object.clanMessage = $root.rustplus.AppNewClanMessage.toObject(message.clanMessage, options);
            if (message.cameraRays != null && message.hasOwnProperty("cameraRays"))
                object.cameraRays = $root.rustplus.AppCameraRays.toObject(message.cameraRays, options);
            return object;
        };

        /**
         * Converts this AppBroadcast to JSON.
         * @function toJSON
         * @memberof rustplus.AppBroadcast
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppBroadcast.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppBroadcast
         * @function getTypeUrl
         * @memberof rustplus.AppBroadcast
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppBroadcast.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppBroadcast";
        };

        return AppBroadcast;
    })();

    rustplus.AppEmpty = (function() {

        /**
         * Properties of an AppEmpty.
         * @typedef {Object} rustplus.AppEmpty.$Properties
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppEmpty.
         * @memberof rustplus
         * @interface IAppEmpty
         * @augments rustplus.AppEmpty.$Properties
         * @deprecated Use rustplus.AppEmpty.$Properties instead.
         */

        /**
         * Shape of an AppEmpty.
         * @typedef {rustplus.AppEmpty.$Properties} rustplus.AppEmpty.$Shape
         */

        /**
         * Constructs a new AppEmpty.
         * @memberof rustplus
         * @classdesc Represents an AppEmpty.
         * @constructor
         * @param {rustplus.AppEmpty.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppEmpty(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new AppEmpty instance using the specified properties.
         * @function create
         * @memberof rustplus.AppEmpty
         * @static
         * @param {rustplus.AppEmpty.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppEmpty} AppEmpty instance
         * @type {{
         *   (properties: rustplus.AppEmpty.$Shape): rustplus.AppEmpty & rustplus.AppEmpty.$Shape;
         *   (properties?: rustplus.AppEmpty.$Properties): rustplus.AppEmpty;
         * }}
         */
        AppEmpty.create = function create(properties) {
            return new AppEmpty(properties);
        };

        /**
         * Encodes the specified AppEmpty message. Does not implicitly {@link rustplus.AppEmpty.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppEmpty
         * @static
         * @param {rustplus.AppEmpty.$Properties} message AppEmpty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppEmpty.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppEmpty message, length delimited. Does not implicitly {@link rustplus.AppEmpty.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppEmpty
         * @static
         * @param {rustplus.AppEmpty.$Properties} message AppEmpty message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppEmpty.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppEmpty message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppEmpty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppEmpty & rustplus.AppEmpty.$Shape} AppEmpty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppEmpty.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppEmpty();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                reader.skipType(tag & 7, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppEmpty message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppEmpty
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppEmpty & rustplus.AppEmpty.$Shape} AppEmpty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppEmpty.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppEmpty message.
         * @function verify
         * @memberof rustplus.AppEmpty
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppEmpty.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            return null;
        };

        /**
         * Creates an AppEmpty message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppEmpty
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppEmpty} AppEmpty
         */
        AppEmpty.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppEmpty)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            return new $root.rustplus.AppEmpty();
        };

        /**
         * Creates a plain object from an AppEmpty message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppEmpty
         * @static
         * @param {rustplus.AppEmpty} message AppEmpty
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppEmpty.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this AppEmpty to JSON.
         * @function toJSON
         * @memberof rustplus.AppEmpty
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppEmpty.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppEmpty
         * @function getTypeUrl
         * @memberof rustplus.AppEmpty
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppEmpty.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppEmpty";
        };

        return AppEmpty;
    })();

    rustplus.AppSendMessage = (function() {

        /**
         * Properties of an AppSendMessage.
         * @typedef {Object} rustplus.AppSendMessage.$Properties
         * @property {string} message AppSendMessage message
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppSendMessage.
         * @memberof rustplus
         * @interface IAppSendMessage
         * @augments rustplus.AppSendMessage.$Properties
         * @deprecated Use rustplus.AppSendMessage.$Properties instead.
         */

        /**
         * Shape of an AppSendMessage.
         * @typedef {rustplus.AppSendMessage.$Properties} rustplus.AppSendMessage.$Shape
         */

        /**
         * Constructs a new AppSendMessage.
         * @memberof rustplus
         * @classdesc Represents an AppSendMessage.
         * @constructor
         * @param {rustplus.AppSendMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppSendMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppSendMessage message.
         * @member {string} message
         * @memberof rustplus.AppSendMessage
         * @instance
         */
        AppSendMessage.prototype.message = "";

        /**
         * Creates a new AppSendMessage instance using the specified properties.
         * @function create
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {rustplus.AppSendMessage.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppSendMessage} AppSendMessage instance
         * @type {{
         *   (properties: rustplus.AppSendMessage.$Shape): rustplus.AppSendMessage & rustplus.AppSendMessage.$Shape;
         *   (properties?: rustplus.AppSendMessage.$Properties): rustplus.AppSendMessage;
         * }}
         */
        AppSendMessage.create = function create(properties) {
            return new AppSendMessage(properties);
        };

        /**
         * Encodes the specified AppSendMessage message. Does not implicitly {@link rustplus.AppSendMessage.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {rustplus.AppSendMessage.$Properties} message AppSendMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppSendMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.message);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppSendMessage message, length delimited. Does not implicitly {@link rustplus.AppSendMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {rustplus.AppSendMessage.$Properties} message AppSendMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppSendMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppSendMessage message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppSendMessage & rustplus.AppSendMessage.$Shape} AppSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppSendMessage.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppSendMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.message = reader.string();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("message"))
                throw $util.ProtocolError("missing required 'message'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppSendMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppSendMessage & rustplus.AppSendMessage.$Shape} AppSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppSendMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppSendMessage message.
         * @function verify
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppSendMessage.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isString(message.message))
                return "message: string expected";
            return null;
        };

        /**
         * Creates an AppSendMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppSendMessage} AppSendMessage
         */
        AppSendMessage.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppSendMessage)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppSendMessage();
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an AppSendMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {rustplus.AppSendMessage} message AppSendMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppSendMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.message = "";
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this AppSendMessage to JSON.
         * @function toJSON
         * @memberof rustplus.AppSendMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppSendMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppSendMessage
         * @function getTypeUrl
         * @memberof rustplus.AppSendMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppSendMessage.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppSendMessage";
        };

        return AppSendMessage;
    })();

    rustplus.AppSetEntityValue = (function() {

        /**
         * Properties of an AppSetEntityValue.
         * @typedef {Object} rustplus.AppSetEntityValue.$Properties
         * @property {boolean} value AppSetEntityValue value
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppSetEntityValue.
         * @memberof rustplus
         * @interface IAppSetEntityValue
         * @augments rustplus.AppSetEntityValue.$Properties
         * @deprecated Use rustplus.AppSetEntityValue.$Properties instead.
         */

        /**
         * Shape of an AppSetEntityValue.
         * @typedef {rustplus.AppSetEntityValue.$Properties} rustplus.AppSetEntityValue.$Shape
         */

        /**
         * Constructs a new AppSetEntityValue.
         * @memberof rustplus
         * @classdesc Represents an AppSetEntityValue.
         * @constructor
         * @param {rustplus.AppSetEntityValue.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppSetEntityValue(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppSetEntityValue value.
         * @member {boolean} value
         * @memberof rustplus.AppSetEntityValue
         * @instance
         */
        AppSetEntityValue.prototype.value = false;

        /**
         * Creates a new AppSetEntityValue instance using the specified properties.
         * @function create
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {rustplus.AppSetEntityValue.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppSetEntityValue} AppSetEntityValue instance
         * @type {{
         *   (properties: rustplus.AppSetEntityValue.$Shape): rustplus.AppSetEntityValue & rustplus.AppSetEntityValue.$Shape;
         *   (properties?: rustplus.AppSetEntityValue.$Properties): rustplus.AppSetEntityValue;
         * }}
         */
        AppSetEntityValue.create = function create(properties) {
            return new AppSetEntityValue(properties);
        };

        /**
         * Encodes the specified AppSetEntityValue message. Does not implicitly {@link rustplus.AppSetEntityValue.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {rustplus.AppSetEntityValue.$Properties} message AppSetEntityValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppSetEntityValue.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.value);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppSetEntityValue message, length delimited. Does not implicitly {@link rustplus.AppSetEntityValue.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {rustplus.AppSetEntityValue.$Properties} message AppSetEntityValue message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppSetEntityValue.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppSetEntityValue message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppSetEntityValue & rustplus.AppSetEntityValue.$Shape} AppSetEntityValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppSetEntityValue.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppSetEntityValue();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.value = reader.bool();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("value"))
                throw $util.ProtocolError("missing required 'value'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppSetEntityValue message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppSetEntityValue & rustplus.AppSetEntityValue.$Shape} AppSetEntityValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppSetEntityValue.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppSetEntityValue message.
         * @function verify
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppSetEntityValue.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (typeof message.value !== "boolean")
                return "value: boolean expected";
            return null;
        };

        /**
         * Creates an AppSetEntityValue message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppSetEntityValue} AppSetEntityValue
         */
        AppSetEntityValue.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppSetEntityValue)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppSetEntityValue();
            if (object.value != null)
                message.value = Boolean(object.value);
            return message;
        };

        /**
         * Creates a plain object from an AppSetEntityValue message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {rustplus.AppSetEntityValue} message AppSetEntityValue
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppSetEntityValue.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.value = false;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this AppSetEntityValue to JSON.
         * @function toJSON
         * @memberof rustplus.AppSetEntityValue
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppSetEntityValue.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppSetEntityValue
         * @function getTypeUrl
         * @memberof rustplus.AppSetEntityValue
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppSetEntityValue.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppSetEntityValue";
        };

        return AppSetEntityValue;
    })();

    rustplus.AppPromoteToLeader = (function() {

        /**
         * Properties of an AppPromoteToLeader.
         * @typedef {Object} rustplus.AppPromoteToLeader.$Properties
         * @property {number|Long} steamId AppPromoteToLeader steamId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppPromoteToLeader.
         * @memberof rustplus
         * @interface IAppPromoteToLeader
         * @augments rustplus.AppPromoteToLeader.$Properties
         * @deprecated Use rustplus.AppPromoteToLeader.$Properties instead.
         */

        /**
         * Shape of an AppPromoteToLeader.
         * @typedef {rustplus.AppPromoteToLeader.$Properties} rustplus.AppPromoteToLeader.$Shape
         */

        /**
         * Constructs a new AppPromoteToLeader.
         * @memberof rustplus
         * @classdesc Represents an AppPromoteToLeader.
         * @constructor
         * @param {rustplus.AppPromoteToLeader.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppPromoteToLeader(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppPromoteToLeader steamId.
         * @member {number|Long} steamId
         * @memberof rustplus.AppPromoteToLeader
         * @instance
         */
        AppPromoteToLeader.prototype.steamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new AppPromoteToLeader instance using the specified properties.
         * @function create
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {rustplus.AppPromoteToLeader.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppPromoteToLeader} AppPromoteToLeader instance
         * @type {{
         *   (properties: rustplus.AppPromoteToLeader.$Shape): rustplus.AppPromoteToLeader & rustplus.AppPromoteToLeader.$Shape;
         *   (properties?: rustplus.AppPromoteToLeader.$Properties): rustplus.AppPromoteToLeader;
         * }}
         */
        AppPromoteToLeader.create = function create(properties) {
            return new AppPromoteToLeader(properties);
        };

        /**
         * Encodes the specified AppPromoteToLeader message. Does not implicitly {@link rustplus.AppPromoteToLeader.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {rustplus.AppPromoteToLeader.$Properties} message AppPromoteToLeader message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppPromoteToLeader.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.steamId);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppPromoteToLeader message, length delimited. Does not implicitly {@link rustplus.AppPromoteToLeader.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {rustplus.AppPromoteToLeader.$Properties} message AppPromoteToLeader message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppPromoteToLeader.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppPromoteToLeader message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppPromoteToLeader & rustplus.AppPromoteToLeader.$Shape} AppPromoteToLeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppPromoteToLeader.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppPromoteToLeader();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.steamId = reader.uint64();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("steamId"))
                throw $util.ProtocolError("missing required 'steamId'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppPromoteToLeader message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppPromoteToLeader & rustplus.AppPromoteToLeader.$Shape} AppPromoteToLeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppPromoteToLeader.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppPromoteToLeader message.
         * @function verify
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppPromoteToLeader.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.steamId) && !(message.steamId && $util.isInteger(message.steamId.low) && $util.isInteger(message.steamId.high)))
                return "steamId: integer|Long expected";
            return null;
        };

        /**
         * Creates an AppPromoteToLeader message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppPromoteToLeader} AppPromoteToLeader
         */
        AppPromoteToLeader.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppPromoteToLeader)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppPromoteToLeader();
            if (object.steamId != null)
                if ($util.Long)
                    (message.steamId = $util.Long.fromValue(object.steamId)).unsigned = true;
                else if (typeof object.steamId === "string")
                    message.steamId = parseInt(object.steamId, 10);
                else if (typeof object.steamId === "number")
                    message.steamId = object.steamId;
                else if (typeof object.steamId === "object")
                    message.steamId = new $util.LongBits(object.steamId.low >>> 0, object.steamId.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from an AppPromoteToLeader message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {rustplus.AppPromoteToLeader} message AppPromoteToLeader
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppPromoteToLeader.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.steamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.steamId = options.longs === String ? "0" : 0;
            if (message.steamId != null && message.hasOwnProperty("steamId"))
                if (typeof message.steamId === "number")
                    object.steamId = options.longs === String ? String(message.steamId) : message.steamId;
                else
                    object.steamId = options.longs === String ? $util.Long.prototype.toString.call(message.steamId) : options.longs === Number ? new $util.LongBits(message.steamId.low >>> 0, message.steamId.high >>> 0).toNumber(true) : message.steamId;
            return object;
        };

        /**
         * Converts this AppPromoteToLeader to JSON.
         * @function toJSON
         * @memberof rustplus.AppPromoteToLeader
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppPromoteToLeader.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppPromoteToLeader
         * @function getTypeUrl
         * @memberof rustplus.AppPromoteToLeader
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppPromoteToLeader.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppPromoteToLeader";
        };

        return AppPromoteToLeader;
    })();

    rustplus.AppGetNexusAuth = (function() {

        /**
         * Properties of an AppGetNexusAuth.
         * @typedef {Object} rustplus.AppGetNexusAuth.$Properties
         * @property {string} appKey AppGetNexusAuth appKey
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppGetNexusAuth.
         * @memberof rustplus
         * @interface IAppGetNexusAuth
         * @augments rustplus.AppGetNexusAuth.$Properties
         * @deprecated Use rustplus.AppGetNexusAuth.$Properties instead.
         */

        /**
         * Shape of an AppGetNexusAuth.
         * @typedef {rustplus.AppGetNexusAuth.$Properties} rustplus.AppGetNexusAuth.$Shape
         */

        /**
         * Constructs a new AppGetNexusAuth.
         * @memberof rustplus
         * @classdesc Represents an AppGetNexusAuth.
         * @constructor
         * @param {rustplus.AppGetNexusAuth.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppGetNexusAuth(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppGetNexusAuth appKey.
         * @member {string} appKey
         * @memberof rustplus.AppGetNexusAuth
         * @instance
         */
        AppGetNexusAuth.prototype.appKey = "";

        /**
         * Creates a new AppGetNexusAuth instance using the specified properties.
         * @function create
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {rustplus.AppGetNexusAuth.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppGetNexusAuth} AppGetNexusAuth instance
         * @type {{
         *   (properties: rustplus.AppGetNexusAuth.$Shape): rustplus.AppGetNexusAuth & rustplus.AppGetNexusAuth.$Shape;
         *   (properties?: rustplus.AppGetNexusAuth.$Properties): rustplus.AppGetNexusAuth;
         * }}
         */
        AppGetNexusAuth.create = function create(properties) {
            return new AppGetNexusAuth(properties);
        };

        /**
         * Encodes the specified AppGetNexusAuth message. Does not implicitly {@link rustplus.AppGetNexusAuth.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {rustplus.AppGetNexusAuth.$Properties} message AppGetNexusAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppGetNexusAuth.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.appKey);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppGetNexusAuth message, length delimited. Does not implicitly {@link rustplus.AppGetNexusAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {rustplus.AppGetNexusAuth.$Properties} message AppGetNexusAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppGetNexusAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppGetNexusAuth message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppGetNexusAuth & rustplus.AppGetNexusAuth.$Shape} AppGetNexusAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppGetNexusAuth.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppGetNexusAuth();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.appKey = reader.string();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("appKey"))
                throw $util.ProtocolError("missing required 'appKey'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppGetNexusAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppGetNexusAuth & rustplus.AppGetNexusAuth.$Shape} AppGetNexusAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppGetNexusAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppGetNexusAuth message.
         * @function verify
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppGetNexusAuth.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isString(message.appKey))
                return "appKey: string expected";
            return null;
        };

        /**
         * Creates an AppGetNexusAuth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppGetNexusAuth} AppGetNexusAuth
         */
        AppGetNexusAuth.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppGetNexusAuth)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppGetNexusAuth();
            if (object.appKey != null)
                message.appKey = String(object.appKey);
            return message;
        };

        /**
         * Creates a plain object from an AppGetNexusAuth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {rustplus.AppGetNexusAuth} message AppGetNexusAuth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppGetNexusAuth.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.appKey = "";
            if (message.appKey != null && message.hasOwnProperty("appKey"))
                object.appKey = message.appKey;
            return object;
        };

        /**
         * Converts this AppGetNexusAuth to JSON.
         * @function toJSON
         * @memberof rustplus.AppGetNexusAuth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppGetNexusAuth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppGetNexusAuth
         * @function getTypeUrl
         * @memberof rustplus.AppGetNexusAuth
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppGetNexusAuth.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppGetNexusAuth";
        };

        return AppGetNexusAuth;
    })();

    rustplus.AppSuccess = (function() {

        /**
         * Properties of an AppSuccess.
         * @typedef {Object} rustplus.AppSuccess.$Properties
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppSuccess.
         * @memberof rustplus
         * @interface IAppSuccess
         * @augments rustplus.AppSuccess.$Properties
         * @deprecated Use rustplus.AppSuccess.$Properties instead.
         */

        /**
         * Shape of an AppSuccess.
         * @typedef {rustplus.AppSuccess.$Properties} rustplus.AppSuccess.$Shape
         */

        /**
         * Constructs a new AppSuccess.
         * @memberof rustplus
         * @classdesc Represents an AppSuccess.
         * @constructor
         * @param {rustplus.AppSuccess.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppSuccess(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new AppSuccess instance using the specified properties.
         * @function create
         * @memberof rustplus.AppSuccess
         * @static
         * @param {rustplus.AppSuccess.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppSuccess} AppSuccess instance
         * @type {{
         *   (properties: rustplus.AppSuccess.$Shape): rustplus.AppSuccess & rustplus.AppSuccess.$Shape;
         *   (properties?: rustplus.AppSuccess.$Properties): rustplus.AppSuccess;
         * }}
         */
        AppSuccess.create = function create(properties) {
            return new AppSuccess(properties);
        };

        /**
         * Encodes the specified AppSuccess message. Does not implicitly {@link rustplus.AppSuccess.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppSuccess
         * @static
         * @param {rustplus.AppSuccess.$Properties} message AppSuccess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppSuccess.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppSuccess message, length delimited. Does not implicitly {@link rustplus.AppSuccess.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppSuccess
         * @static
         * @param {rustplus.AppSuccess.$Properties} message AppSuccess message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppSuccess.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppSuccess message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppSuccess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppSuccess & rustplus.AppSuccess.$Shape} AppSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppSuccess.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppSuccess();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                reader.skipType(tag & 7, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppSuccess message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppSuccess
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppSuccess & rustplus.AppSuccess.$Shape} AppSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppSuccess.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppSuccess message.
         * @function verify
         * @memberof rustplus.AppSuccess
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppSuccess.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            return null;
        };

        /**
         * Creates an AppSuccess message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppSuccess
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppSuccess} AppSuccess
         */
        AppSuccess.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppSuccess)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            return new $root.rustplus.AppSuccess();
        };

        /**
         * Creates a plain object from an AppSuccess message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppSuccess
         * @static
         * @param {rustplus.AppSuccess} message AppSuccess
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppSuccess.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this AppSuccess to JSON.
         * @function toJSON
         * @memberof rustplus.AppSuccess
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppSuccess.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppSuccess
         * @function getTypeUrl
         * @memberof rustplus.AppSuccess
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppSuccess.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppSuccess";
        };

        return AppSuccess;
    })();

    rustplus.AppError = (function() {

        /**
         * Properties of an AppError.
         * @typedef {Object} rustplus.AppError.$Properties
         * @property {string} error AppError error
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppError.
         * @memberof rustplus
         * @interface IAppError
         * @augments rustplus.AppError.$Properties
         * @deprecated Use rustplus.AppError.$Properties instead.
         */

        /**
         * Shape of an AppError.
         * @typedef {rustplus.AppError.$Properties} rustplus.AppError.$Shape
         */

        /**
         * Constructs a new AppError.
         * @memberof rustplus
         * @classdesc Represents an AppError.
         * @constructor
         * @param {rustplus.AppError.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppError(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppError error.
         * @member {string} error
         * @memberof rustplus.AppError
         * @instance
         */
        AppError.prototype.error = "";

        /**
         * Creates a new AppError instance using the specified properties.
         * @function create
         * @memberof rustplus.AppError
         * @static
         * @param {rustplus.AppError.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppError} AppError instance
         * @type {{
         *   (properties: rustplus.AppError.$Shape): rustplus.AppError & rustplus.AppError.$Shape;
         *   (properties?: rustplus.AppError.$Properties): rustplus.AppError;
         * }}
         */
        AppError.create = function create(properties) {
            return new AppError(properties);
        };

        /**
         * Encodes the specified AppError message. Does not implicitly {@link rustplus.AppError.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppError
         * @static
         * @param {rustplus.AppError.$Properties} message AppError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppError.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.error);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppError message, length delimited. Does not implicitly {@link rustplus.AppError.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppError
         * @static
         * @param {rustplus.AppError.$Properties} message AppError message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppError.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppError message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppError & rustplus.AppError.$Shape} AppError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppError.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppError();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.error = reader.string();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("error"))
                throw $util.ProtocolError("missing required 'error'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppError message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppError
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppError & rustplus.AppError.$Shape} AppError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppError.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppError message.
         * @function verify
         * @memberof rustplus.AppError
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppError.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isString(message.error))
                return "error: string expected";
            return null;
        };

        /**
         * Creates an AppError message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppError
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppError} AppError
         */
        AppError.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppError)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppError();
            if (object.error != null)
                message.error = String(object.error);
            return message;
        };

        /**
         * Creates a plain object from an AppError message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppError
         * @static
         * @param {rustplus.AppError} message AppError
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppError.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.error = "";
            if (message.error != null && message.hasOwnProperty("error"))
                object.error = message.error;
            return object;
        };

        /**
         * Converts this AppError to JSON.
         * @function toJSON
         * @memberof rustplus.AppError
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppError.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppError
         * @function getTypeUrl
         * @memberof rustplus.AppError
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppError.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppError";
        };

        return AppError;
    })();

    rustplus.AppFlag = (function() {

        /**
         * Properties of an AppFlag.
         * @typedef {Object} rustplus.AppFlag.$Properties
         * @property {boolean} value AppFlag value
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppFlag.
         * @memberof rustplus
         * @interface IAppFlag
         * @augments rustplus.AppFlag.$Properties
         * @deprecated Use rustplus.AppFlag.$Properties instead.
         */

        /**
         * Shape of an AppFlag.
         * @typedef {rustplus.AppFlag.$Properties} rustplus.AppFlag.$Shape
         */

        /**
         * Constructs a new AppFlag.
         * @memberof rustplus
         * @classdesc Represents an AppFlag.
         * @constructor
         * @param {rustplus.AppFlag.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppFlag(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppFlag value.
         * @member {boolean} value
         * @memberof rustplus.AppFlag
         * @instance
         */
        AppFlag.prototype.value = false;

        /**
         * Creates a new AppFlag instance using the specified properties.
         * @function create
         * @memberof rustplus.AppFlag
         * @static
         * @param {rustplus.AppFlag.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppFlag} AppFlag instance
         * @type {{
         *   (properties: rustplus.AppFlag.$Shape): rustplus.AppFlag & rustplus.AppFlag.$Shape;
         *   (properties?: rustplus.AppFlag.$Properties): rustplus.AppFlag;
         * }}
         */
        AppFlag.create = function create(properties) {
            return new AppFlag(properties);
        };

        /**
         * Encodes the specified AppFlag message. Does not implicitly {@link rustplus.AppFlag.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppFlag
         * @static
         * @param {rustplus.AppFlag.$Properties} message AppFlag message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppFlag.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).bool(message.value);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppFlag message, length delimited. Does not implicitly {@link rustplus.AppFlag.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppFlag
         * @static
         * @param {rustplus.AppFlag.$Properties} message AppFlag message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppFlag.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppFlag message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppFlag
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppFlag & rustplus.AppFlag.$Shape} AppFlag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppFlag.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppFlag();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.value = reader.bool();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("value"))
                throw $util.ProtocolError("missing required 'value'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppFlag message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppFlag
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppFlag & rustplus.AppFlag.$Shape} AppFlag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppFlag.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppFlag message.
         * @function verify
         * @memberof rustplus.AppFlag
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppFlag.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (typeof message.value !== "boolean")
                return "value: boolean expected";
            return null;
        };

        /**
         * Creates an AppFlag message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppFlag
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppFlag} AppFlag
         */
        AppFlag.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppFlag)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppFlag();
            if (object.value != null)
                message.value = Boolean(object.value);
            return message;
        };

        /**
         * Creates a plain object from an AppFlag message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppFlag
         * @static
         * @param {rustplus.AppFlag} message AppFlag
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppFlag.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.value = false;
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this AppFlag to JSON.
         * @function toJSON
         * @memberof rustplus.AppFlag
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppFlag.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppFlag
         * @function getTypeUrl
         * @memberof rustplus.AppFlag
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppFlag.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppFlag";
        };

        return AppFlag;
    })();

    rustplus.AppInfo = (function() {

        /**
         * Properties of an AppInfo.
         * @typedef {Object} rustplus.AppInfo.$Properties
         * @property {string} name AppInfo name
         * @property {string} headerImage AppInfo headerImage
         * @property {string} url AppInfo url
         * @property {string} map AppInfo map
         * @property {number} mapSize AppInfo mapSize
         * @property {number} wipeTime AppInfo wipeTime
         * @property {number} players AppInfo players
         * @property {number} maxPlayers AppInfo maxPlayers
         * @property {number} queuedPlayers AppInfo queuedPlayers
         * @property {number|null} [seed] AppInfo seed
         * @property {number|null} [salt] AppInfo salt
         * @property {string|null} [logoImage] AppInfo logoImage
         * @property {string|null} [nexus] AppInfo nexus
         * @property {number|null} [nexusId] AppInfo nexusId
         * @property {string|null} [nexusZone] AppInfo nexusZone
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppInfo.
         * @memberof rustplus
         * @interface IAppInfo
         * @augments rustplus.AppInfo.$Properties
         * @deprecated Use rustplus.AppInfo.$Properties instead.
         */

        /**
         * Shape of an AppInfo.
         * @typedef {rustplus.AppInfo.$Properties} rustplus.AppInfo.$Shape
         */

        /**
         * Constructs a new AppInfo.
         * @memberof rustplus
         * @classdesc Represents an AppInfo.
         * @constructor
         * @param {rustplus.AppInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppInfo name.
         * @member {string} name
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.name = "";

        /**
         * AppInfo headerImage.
         * @member {string} headerImage
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.headerImage = "";

        /**
         * AppInfo url.
         * @member {string} url
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.url = "";

        /**
         * AppInfo map.
         * @member {string} map
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.map = "";

        /**
         * AppInfo mapSize.
         * @member {number} mapSize
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.mapSize = 0;

        /**
         * AppInfo wipeTime.
         * @member {number} wipeTime
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.wipeTime = 0;

        /**
         * AppInfo players.
         * @member {number} players
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.players = 0;

        /**
         * AppInfo maxPlayers.
         * @member {number} maxPlayers
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.maxPlayers = 0;

        /**
         * AppInfo queuedPlayers.
         * @member {number} queuedPlayers
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.queuedPlayers = 0;

        /**
         * AppInfo seed.
         * @member {number} seed
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.seed = 0;

        /**
         * AppInfo salt.
         * @member {number} salt
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.salt = 0;

        /**
         * AppInfo logoImage.
         * @member {string} logoImage
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.logoImage = "";

        /**
         * AppInfo nexus.
         * @member {string} nexus
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.nexus = "";

        /**
         * AppInfo nexusId.
         * @member {number} nexusId
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.nexusId = 0;

        /**
         * AppInfo nexusZone.
         * @member {string} nexusZone
         * @memberof rustplus.AppInfo
         * @instance
         */
        AppInfo.prototype.nexusZone = "";

        /**
         * Creates a new AppInfo instance using the specified properties.
         * @function create
         * @memberof rustplus.AppInfo
         * @static
         * @param {rustplus.AppInfo.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppInfo} AppInfo instance
         * @type {{
         *   (properties: rustplus.AppInfo.$Shape): rustplus.AppInfo & rustplus.AppInfo.$Shape;
         *   (properties?: rustplus.AppInfo.$Properties): rustplus.AppInfo;
         * }}
         */
        AppInfo.create = function create(properties) {
            return new AppInfo(properties);
        };

        /**
         * Encodes the specified AppInfo message. Does not implicitly {@link rustplus.AppInfo.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppInfo
         * @static
         * @param {rustplus.AppInfo.$Properties} message AppInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.headerImage);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.url);
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.map);
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.mapSize);
            writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.wipeTime);
            writer.uint32(/* id 7, wireType 0 =*/56).uint32(message.players);
            writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.maxPlayers);
            writer.uint32(/* id 9, wireType 0 =*/72).uint32(message.queuedPlayers);
            if (message.seed != null && Object.hasOwnProperty.call(message, "seed"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.seed);
            if (message.salt != null && Object.hasOwnProperty.call(message, "salt"))
                writer.uint32(/* id 11, wireType 0 =*/88).uint32(message.salt);
            if (message.logoImage != null && Object.hasOwnProperty.call(message, "logoImage"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.logoImage);
            if (message.nexus != null && Object.hasOwnProperty.call(message, "nexus"))
                writer.uint32(/* id 13, wireType 2 =*/106).string(message.nexus);
            if (message.nexusId != null && Object.hasOwnProperty.call(message, "nexusId"))
                writer.uint32(/* id 14, wireType 0 =*/112).int32(message.nexusId);
            if (message.nexusZone != null && Object.hasOwnProperty.call(message, "nexusZone"))
                writer.uint32(/* id 15, wireType 2 =*/122).string(message.nexusZone);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppInfo message, length delimited. Does not implicitly {@link rustplus.AppInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppInfo
         * @static
         * @param {rustplus.AppInfo.$Properties} message AppInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppInfo & rustplus.AppInfo.$Shape} AppInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppInfo.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppInfo();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.name = reader.string();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.headerImage = reader.string();
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.url = reader.string();
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        message.map = reader.string();
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        message.mapSize = reader.uint32();
                        continue;
                    }
                case 6: {
                        if (wireType !== 0)
                            break;
                        message.wipeTime = reader.uint32();
                        continue;
                    }
                case 7: {
                        if (wireType !== 0)
                            break;
                        message.players = reader.uint32();
                        continue;
                    }
                case 8: {
                        if (wireType !== 0)
                            break;
                        message.maxPlayers = reader.uint32();
                        continue;
                    }
                case 9: {
                        if (wireType !== 0)
                            break;
                        message.queuedPlayers = reader.uint32();
                        continue;
                    }
                case 10: {
                        if (wireType !== 0)
                            break;
                        message.seed = reader.uint32();
                        continue;
                    }
                case 11: {
                        if (wireType !== 0)
                            break;
                        message.salt = reader.uint32();
                        continue;
                    }
                case 12: {
                        if (wireType !== 2)
                            break;
                        message.logoImage = reader.string();
                        continue;
                    }
                case 13: {
                        if (wireType !== 2)
                            break;
                        message.nexus = reader.string();
                        continue;
                    }
                case 14: {
                        if (wireType !== 0)
                            break;
                        message.nexusId = reader.int32();
                        continue;
                    }
                case 15: {
                        if (wireType !== 2)
                            break;
                        message.nexusZone = reader.string();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("headerImage"))
                throw $util.ProtocolError("missing required 'headerImage'", { instance: message });
            if (!message.hasOwnProperty("url"))
                throw $util.ProtocolError("missing required 'url'", { instance: message });
            if (!message.hasOwnProperty("map"))
                throw $util.ProtocolError("missing required 'map'", { instance: message });
            if (!message.hasOwnProperty("mapSize"))
                throw $util.ProtocolError("missing required 'mapSize'", { instance: message });
            if (!message.hasOwnProperty("wipeTime"))
                throw $util.ProtocolError("missing required 'wipeTime'", { instance: message });
            if (!message.hasOwnProperty("players"))
                throw $util.ProtocolError("missing required 'players'", { instance: message });
            if (!message.hasOwnProperty("maxPlayers"))
                throw $util.ProtocolError("missing required 'maxPlayers'", { instance: message });
            if (!message.hasOwnProperty("queuedPlayers"))
                throw $util.ProtocolError("missing required 'queuedPlayers'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppInfo & rustplus.AppInfo.$Shape} AppInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppInfo message.
         * @function verify
         * @memberof rustplus.AppInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppInfo.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isString(message.headerImage))
                return "headerImage: string expected";
            if (!$util.isString(message.url))
                return "url: string expected";
            if (!$util.isString(message.map))
                return "map: string expected";
            if (!$util.isInteger(message.mapSize))
                return "mapSize: integer expected";
            if (!$util.isInteger(message.wipeTime))
                return "wipeTime: integer expected";
            if (!$util.isInteger(message.players))
                return "players: integer expected";
            if (!$util.isInteger(message.maxPlayers))
                return "maxPlayers: integer expected";
            if (!$util.isInteger(message.queuedPlayers))
                return "queuedPlayers: integer expected";
            if (message.seed != null && message.hasOwnProperty("seed"))
                if (!$util.isInteger(message.seed))
                    return "seed: integer expected";
            if (message.salt != null && message.hasOwnProperty("salt"))
                if (!$util.isInteger(message.salt))
                    return "salt: integer expected";
            if (message.logoImage != null && message.hasOwnProperty("logoImage"))
                if (!$util.isString(message.logoImage))
                    return "logoImage: string expected";
            if (message.nexus != null && message.hasOwnProperty("nexus"))
                if (!$util.isString(message.nexus))
                    return "nexus: string expected";
            if (message.nexusId != null && message.hasOwnProperty("nexusId"))
                if (!$util.isInteger(message.nexusId))
                    return "nexusId: integer expected";
            if (message.nexusZone != null && message.hasOwnProperty("nexusZone"))
                if (!$util.isString(message.nexusZone))
                    return "nexusZone: string expected";
            return null;
        };

        /**
         * Creates an AppInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppInfo} AppInfo
         */
        AppInfo.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppInfo)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppInfo();
            if (object.name != null)
                message.name = String(object.name);
            if (object.headerImage != null)
                message.headerImage = String(object.headerImage);
            if (object.url != null)
                message.url = String(object.url);
            if (object.map != null)
                message.map = String(object.map);
            if (object.mapSize != null)
                message.mapSize = object.mapSize >>> 0;
            if (object.wipeTime != null)
                message.wipeTime = object.wipeTime >>> 0;
            if (object.players != null)
                message.players = object.players >>> 0;
            if (object.maxPlayers != null)
                message.maxPlayers = object.maxPlayers >>> 0;
            if (object.queuedPlayers != null)
                message.queuedPlayers = object.queuedPlayers >>> 0;
            if (object.seed != null)
                message.seed = object.seed >>> 0;
            if (object.salt != null)
                message.salt = object.salt >>> 0;
            if (object.logoImage != null)
                message.logoImage = String(object.logoImage);
            if (object.nexus != null)
                message.nexus = String(object.nexus);
            if (object.nexusId != null)
                message.nexusId = object.nexusId | 0;
            if (object.nexusZone != null)
                message.nexusZone = String(object.nexusZone);
            return message;
        };

        /**
         * Creates a plain object from an AppInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppInfo
         * @static
         * @param {rustplus.AppInfo} message AppInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.name = "";
                object.headerImage = "";
                object.url = "";
                object.map = "";
                object.mapSize = 0;
                object.wipeTime = 0;
                object.players = 0;
                object.maxPlayers = 0;
                object.queuedPlayers = 0;
                object.seed = 0;
                object.salt = 0;
                object.logoImage = "";
                object.nexus = "";
                object.nexusId = 0;
                object.nexusZone = "";
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.headerImage != null && message.hasOwnProperty("headerImage"))
                object.headerImage = message.headerImage;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.map != null && message.hasOwnProperty("map"))
                object.map = message.map;
            if (message.mapSize != null && message.hasOwnProperty("mapSize"))
                object.mapSize = message.mapSize;
            if (message.wipeTime != null && message.hasOwnProperty("wipeTime"))
                object.wipeTime = message.wipeTime;
            if (message.players != null && message.hasOwnProperty("players"))
                object.players = message.players;
            if (message.maxPlayers != null && message.hasOwnProperty("maxPlayers"))
                object.maxPlayers = message.maxPlayers;
            if (message.queuedPlayers != null && message.hasOwnProperty("queuedPlayers"))
                object.queuedPlayers = message.queuedPlayers;
            if (message.seed != null && message.hasOwnProperty("seed"))
                object.seed = message.seed;
            if (message.salt != null && message.hasOwnProperty("salt"))
                object.salt = message.salt;
            if (message.logoImage != null && message.hasOwnProperty("logoImage"))
                object.logoImage = message.logoImage;
            if (message.nexus != null && message.hasOwnProperty("nexus"))
                object.nexus = message.nexus;
            if (message.nexusId != null && message.hasOwnProperty("nexusId"))
                object.nexusId = message.nexusId;
            if (message.nexusZone != null && message.hasOwnProperty("nexusZone"))
                object.nexusZone = message.nexusZone;
            return object;
        };

        /**
         * Converts this AppInfo to JSON.
         * @function toJSON
         * @memberof rustplus.AppInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppInfo
         * @function getTypeUrl
         * @memberof rustplus.AppInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppInfo.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppInfo";
        };

        return AppInfo;
    })();

    rustplus.AppTime = (function() {

        /**
         * Properties of an AppTime.
         * @typedef {Object} rustplus.AppTime.$Properties
         * @property {number} dayLengthMinutes AppTime dayLengthMinutes
         * @property {number} timeScale AppTime timeScale
         * @property {number} sunrise AppTime sunrise
         * @property {number} sunset AppTime sunset
         * @property {number} time AppTime time
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppTime.
         * @memberof rustplus
         * @interface IAppTime
         * @augments rustplus.AppTime.$Properties
         * @deprecated Use rustplus.AppTime.$Properties instead.
         */

        /**
         * Shape of an AppTime.
         * @typedef {rustplus.AppTime.$Properties} rustplus.AppTime.$Shape
         */

        /**
         * Constructs a new AppTime.
         * @memberof rustplus
         * @classdesc Represents an AppTime.
         * @constructor
         * @param {rustplus.AppTime.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppTime(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppTime dayLengthMinutes.
         * @member {number} dayLengthMinutes
         * @memberof rustplus.AppTime
         * @instance
         */
        AppTime.prototype.dayLengthMinutes = 0;

        /**
         * AppTime timeScale.
         * @member {number} timeScale
         * @memberof rustplus.AppTime
         * @instance
         */
        AppTime.prototype.timeScale = 0;

        /**
         * AppTime sunrise.
         * @member {number} sunrise
         * @memberof rustplus.AppTime
         * @instance
         */
        AppTime.prototype.sunrise = 0;

        /**
         * AppTime sunset.
         * @member {number} sunset
         * @memberof rustplus.AppTime
         * @instance
         */
        AppTime.prototype.sunset = 0;

        /**
         * AppTime time.
         * @member {number} time
         * @memberof rustplus.AppTime
         * @instance
         */
        AppTime.prototype.time = 0;

        /**
         * Creates a new AppTime instance using the specified properties.
         * @function create
         * @memberof rustplus.AppTime
         * @static
         * @param {rustplus.AppTime.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppTime} AppTime instance
         * @type {{
         *   (properties: rustplus.AppTime.$Shape): rustplus.AppTime & rustplus.AppTime.$Shape;
         *   (properties?: rustplus.AppTime.$Properties): rustplus.AppTime;
         * }}
         */
        AppTime.create = function create(properties) {
            return new AppTime(properties);
        };

        /**
         * Encodes the specified AppTime message. Does not implicitly {@link rustplus.AppTime.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppTime
         * @static
         * @param {rustplus.AppTime.$Properties} message AppTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTime.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.dayLengthMinutes);
            writer.uint32(/* id 2, wireType 5 =*/21).float(message.timeScale);
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.sunrise);
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.sunset);
            writer.uint32(/* id 5, wireType 5 =*/45).float(message.time);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppTime message, length delimited. Does not implicitly {@link rustplus.AppTime.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppTime
         * @static
         * @param {rustplus.AppTime.$Properties} message AppTime message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTime.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppTime message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppTime & rustplus.AppTime.$Shape} AppTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTime.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppTime();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 5)
                            break;
                        message.dayLengthMinutes = reader.float();
                        continue;
                    }
                case 2: {
                        if (wireType !== 5)
                            break;
                        message.timeScale = reader.float();
                        continue;
                    }
                case 3: {
                        if (wireType !== 5)
                            break;
                        message.sunrise = reader.float();
                        continue;
                    }
                case 4: {
                        if (wireType !== 5)
                            break;
                        message.sunset = reader.float();
                        continue;
                    }
                case 5: {
                        if (wireType !== 5)
                            break;
                        message.time = reader.float();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("dayLengthMinutes"))
                throw $util.ProtocolError("missing required 'dayLengthMinutes'", { instance: message });
            if (!message.hasOwnProperty("timeScale"))
                throw $util.ProtocolError("missing required 'timeScale'", { instance: message });
            if (!message.hasOwnProperty("sunrise"))
                throw $util.ProtocolError("missing required 'sunrise'", { instance: message });
            if (!message.hasOwnProperty("sunset"))
                throw $util.ProtocolError("missing required 'sunset'", { instance: message });
            if (!message.hasOwnProperty("time"))
                throw $util.ProtocolError("missing required 'time'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppTime message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppTime
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppTime & rustplus.AppTime.$Shape} AppTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTime.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppTime message.
         * @function verify
         * @memberof rustplus.AppTime
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppTime.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (typeof message.dayLengthMinutes !== "number")
                return "dayLengthMinutes: number expected";
            if (typeof message.timeScale !== "number")
                return "timeScale: number expected";
            if (typeof message.sunrise !== "number")
                return "sunrise: number expected";
            if (typeof message.sunset !== "number")
                return "sunset: number expected";
            if (typeof message.time !== "number")
                return "time: number expected";
            return null;
        };

        /**
         * Creates an AppTime message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppTime
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppTime} AppTime
         */
        AppTime.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppTime)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppTime();
            if (object.dayLengthMinutes != null)
                message.dayLengthMinutes = Number(object.dayLengthMinutes);
            if (object.timeScale != null)
                message.timeScale = Number(object.timeScale);
            if (object.sunrise != null)
                message.sunrise = Number(object.sunrise);
            if (object.sunset != null)
                message.sunset = Number(object.sunset);
            if (object.time != null)
                message.time = Number(object.time);
            return message;
        };

        /**
         * Creates a plain object from an AppTime message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppTime
         * @static
         * @param {rustplus.AppTime} message AppTime
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppTime.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.dayLengthMinutes = 0;
                object.timeScale = 0;
                object.sunrise = 0;
                object.sunset = 0;
                object.time = 0;
            }
            if (message.dayLengthMinutes != null && message.hasOwnProperty("dayLengthMinutes"))
                object.dayLengthMinutes = options.json && !isFinite(message.dayLengthMinutes) ? String(message.dayLengthMinutes) : message.dayLengthMinutes;
            if (message.timeScale != null && message.hasOwnProperty("timeScale"))
                object.timeScale = options.json && !isFinite(message.timeScale) ? String(message.timeScale) : message.timeScale;
            if (message.sunrise != null && message.hasOwnProperty("sunrise"))
                object.sunrise = options.json && !isFinite(message.sunrise) ? String(message.sunrise) : message.sunrise;
            if (message.sunset != null && message.hasOwnProperty("sunset"))
                object.sunset = options.json && !isFinite(message.sunset) ? String(message.sunset) : message.sunset;
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = options.json && !isFinite(message.time) ? String(message.time) : message.time;
            return object;
        };

        /**
         * Converts this AppTime to JSON.
         * @function toJSON
         * @memberof rustplus.AppTime
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppTime.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppTime
         * @function getTypeUrl
         * @memberof rustplus.AppTime
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppTime.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppTime";
        };

        return AppTime;
    })();

    rustplus.AppMap = (function() {

        /**
         * Properties of an AppMap.
         * @typedef {Object} rustplus.AppMap.$Properties
         * @property {number} width AppMap width
         * @property {number} height AppMap height
         * @property {Uint8Array} jpgImage AppMap jpgImage
         * @property {number} oceanMargin AppMap oceanMargin
         * @property {Array.<rustplus.AppMap.Monument.$Properties>|null} [monuments] AppMap monuments
         * @property {string|null} [background] AppMap background
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppMap.
         * @memberof rustplus
         * @interface IAppMap
         * @augments rustplus.AppMap.$Properties
         * @deprecated Use rustplus.AppMap.$Properties instead.
         */

        /**
         * Shape of an AppMap.
         * @typedef {rustplus.AppMap.$Properties} rustplus.AppMap.$Shape
         */

        /**
         * Constructs a new AppMap.
         * @memberof rustplus
         * @classdesc Represents an AppMap.
         * @constructor
         * @param {rustplus.AppMap.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppMap(properties) {
            this.monuments = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppMap width.
         * @member {number} width
         * @memberof rustplus.AppMap
         * @instance
         */
        AppMap.prototype.width = 0;

        /**
         * AppMap height.
         * @member {number} height
         * @memberof rustplus.AppMap
         * @instance
         */
        AppMap.prototype.height = 0;

        /**
         * AppMap jpgImage.
         * @member {Uint8Array} jpgImage
         * @memberof rustplus.AppMap
         * @instance
         */
        AppMap.prototype.jpgImage = $util.newBuffer([]);

        /**
         * AppMap oceanMargin.
         * @member {number} oceanMargin
         * @memberof rustplus.AppMap
         * @instance
         */
        AppMap.prototype.oceanMargin = 0;

        /**
         * AppMap monuments.
         * @member {Array.<rustplus.AppMap.Monument.$Properties>} monuments
         * @memberof rustplus.AppMap
         * @instance
         */
        AppMap.prototype.monuments = $util.emptyArray;

        /**
         * AppMap background.
         * @member {string} background
         * @memberof rustplus.AppMap
         * @instance
         */
        AppMap.prototype.background = "";

        /**
         * Creates a new AppMap instance using the specified properties.
         * @function create
         * @memberof rustplus.AppMap
         * @static
         * @param {rustplus.AppMap.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppMap} AppMap instance
         * @type {{
         *   (properties: rustplus.AppMap.$Shape): rustplus.AppMap & rustplus.AppMap.$Shape;
         *   (properties?: rustplus.AppMap.$Properties): rustplus.AppMap;
         * }}
         */
        AppMap.create = function create(properties) {
            return new AppMap(properties);
        };

        /**
         * Encodes the specified AppMap message. Does not implicitly {@link rustplus.AppMap.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppMap
         * @static
         * @param {rustplus.AppMap.$Properties} message AppMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppMap.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.width);
            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.height);
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.jpgImage);
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.oceanMargin);
            if (message.monuments != null && message.monuments.length)
                for (let i = 0; i < message.monuments.length; ++i)
                    $root.rustplus.AppMap.Monument.encode(message.monuments[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.background != null && Object.hasOwnProperty.call(message, "background"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.background);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppMap message, length delimited. Does not implicitly {@link rustplus.AppMap.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppMap
         * @static
         * @param {rustplus.AppMap.$Properties} message AppMap message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppMap.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppMap message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppMap & rustplus.AppMap.$Shape} AppMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppMap.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppMap();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.width = reader.uint32();
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.height = reader.uint32();
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.jpgImage = reader.bytes();
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.oceanMargin = reader.int32();
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if (!(message.monuments && message.monuments.length))
                            message.monuments = [];
                        message.monuments.push($root.rustplus.AppMap.Monument.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                case 6: {
                        if (wireType !== 2)
                            break;
                        message.background = reader.string();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("width"))
                throw $util.ProtocolError("missing required 'width'", { instance: message });
            if (!message.hasOwnProperty("height"))
                throw $util.ProtocolError("missing required 'height'", { instance: message });
            if (!message.hasOwnProperty("jpgImage"))
                throw $util.ProtocolError("missing required 'jpgImage'", { instance: message });
            if (!message.hasOwnProperty("oceanMargin"))
                throw $util.ProtocolError("missing required 'oceanMargin'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppMap message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppMap
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppMap & rustplus.AppMap.$Shape} AppMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppMap.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppMap message.
         * @function verify
         * @memberof rustplus.AppMap
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppMap.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.width))
                return "width: integer expected";
            if (!$util.isInteger(message.height))
                return "height: integer expected";
            if (!(message.jpgImage && typeof message.jpgImage.length === "number" || $util.isString(message.jpgImage)))
                return "jpgImage: buffer expected";
            if (!$util.isInteger(message.oceanMargin))
                return "oceanMargin: integer expected";
            if (message.monuments != null && message.hasOwnProperty("monuments")) {
                if (!Array.isArray(message.monuments))
                    return "monuments: array expected";
                for (let i = 0; i < message.monuments.length; ++i) {
                    let error = $root.rustplus.AppMap.Monument.verify(message.monuments[i], _depth + 1);
                    if (error)
                        return "monuments." + error;
                }
            }
            if (message.background != null && message.hasOwnProperty("background"))
                if (!$util.isString(message.background))
                    return "background: string expected";
            return null;
        };

        /**
         * Creates an AppMap message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppMap
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppMap} AppMap
         */
        AppMap.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppMap)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppMap();
            if (object.width != null)
                message.width = object.width >>> 0;
            if (object.height != null)
                message.height = object.height >>> 0;
            if (object.jpgImage != null)
                if (typeof object.jpgImage === "string")
                    $util.base64.decode(object.jpgImage, message.jpgImage = $util.newBuffer($util.base64.length(object.jpgImage)), 0);
                else if (object.jpgImage.length >= 0)
                    message.jpgImage = object.jpgImage;
            if (object.oceanMargin != null)
                message.oceanMargin = object.oceanMargin | 0;
            if (object.monuments) {
                if (!Array.isArray(object.monuments))
                    throw TypeError(".rustplus.AppMap.monuments: array expected");
                message.monuments = Array(object.monuments.length);
                for (let i = 0; i < object.monuments.length; ++i) {
                    if (typeof object.monuments[i] !== "object")
                        throw TypeError(".rustplus.AppMap.monuments: object expected");
                    message.monuments[i] = $root.rustplus.AppMap.Monument.fromObject(object.monuments[i], _depth + 1);
                }
            }
            if (object.background != null)
                message.background = String(object.background);
            return message;
        };

        /**
         * Creates a plain object from an AppMap message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppMap
         * @static
         * @param {rustplus.AppMap} message AppMap
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppMap.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.monuments = [];
            if (options.defaults) {
                object.width = 0;
                object.height = 0;
                if (options.bytes === String)
                    object.jpgImage = "";
                else {
                    object.jpgImage = [];
                    if (options.bytes !== Array)
                        object.jpgImage = $util.newBuffer(object.jpgImage);
                }
                object.oceanMargin = 0;
                object.background = "";
            }
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = message.width;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = message.height;
            if (message.jpgImage != null && message.hasOwnProperty("jpgImage"))
                object.jpgImage = options.bytes === String ? $util.base64.encode(message.jpgImage, 0, message.jpgImage.length) : options.bytes === Array ? Array.prototype.slice.call(message.jpgImage) : message.jpgImage;
            if (message.oceanMargin != null && message.hasOwnProperty("oceanMargin"))
                object.oceanMargin = message.oceanMargin;
            if (message.monuments && message.monuments.length) {
                object.monuments = Array(message.monuments.length);
                for (let j = 0; j < message.monuments.length; ++j)
                    object.monuments[j] = $root.rustplus.AppMap.Monument.toObject(message.monuments[j], options);
            }
            if (message.background != null && message.hasOwnProperty("background"))
                object.background = message.background;
            return object;
        };

        /**
         * Converts this AppMap to JSON.
         * @function toJSON
         * @memberof rustplus.AppMap
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppMap.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppMap
         * @function getTypeUrl
         * @memberof rustplus.AppMap
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppMap.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppMap";
        };

        AppMap.Monument = (function() {

            /**
             * Properties of a Monument.
             * @typedef {Object} rustplus.AppMap.Monument.$Properties
             * @property {string} token Monument token
             * @property {number} x Monument x
             * @property {number} y Monument y
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a Monument.
             * @memberof rustplus.AppMap
             * @interface IMonument
             * @augments rustplus.AppMap.Monument.$Properties
             * @deprecated Use rustplus.AppMap.Monument.$Properties instead.
             */

            /**
             * Shape of a Monument.
             * @typedef {rustplus.AppMap.Monument.$Properties} rustplus.AppMap.Monument.$Shape
             */

            /**
             * Constructs a new Monument.
             * @memberof rustplus.AppMap
             * @classdesc Represents a Monument.
             * @constructor
             * @param {rustplus.AppMap.Monument.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Monument(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Monument token.
             * @member {string} token
             * @memberof rustplus.AppMap.Monument
             * @instance
             */
            Monument.prototype.token = "";

            /**
             * Monument x.
             * @member {number} x
             * @memberof rustplus.AppMap.Monument
             * @instance
             */
            Monument.prototype.x = 0;

            /**
             * Monument y.
             * @member {number} y
             * @memberof rustplus.AppMap.Monument
             * @instance
             */
            Monument.prototype.y = 0;

            /**
             * Creates a new Monument instance using the specified properties.
             * @function create
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {rustplus.AppMap.Monument.$Properties=} [properties] Properties to set
             * @returns {rustplus.AppMap.Monument} Monument instance
             * @type {{
             *   (properties: rustplus.AppMap.Monument.$Shape): rustplus.AppMap.Monument & rustplus.AppMap.Monument.$Shape;
             *   (properties?: rustplus.AppMap.Monument.$Properties): rustplus.AppMap.Monument;
             * }}
             */
            Monument.create = function create(properties) {
                return new Monument(properties);
            };

            /**
             * Encodes the specified Monument message. Does not implicitly {@link rustplus.AppMap.Monument.verify|verify} messages.
             * @function encode
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {rustplus.AppMap.Monument.$Properties} message Monument message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Monument.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.x);
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.y);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Monument message, length delimited. Does not implicitly {@link rustplus.AppMap.Monument.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {rustplus.AppMap.Monument.$Properties} message Monument message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Monument.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Monument message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.AppMap.Monument & rustplus.AppMap.Monument.$Shape} Monument
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Monument.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppMap.Monument();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 2)
                                break;
                            message.token = reader.string();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 5)
                                break;
                            message.x = reader.float();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 5)
                                break;
                            message.y = reader.float();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("token"))
                    throw $util.ProtocolError("missing required 'token'", { instance: message });
                if (!message.hasOwnProperty("x"))
                    throw $util.ProtocolError("missing required 'x'", { instance: message });
                if (!message.hasOwnProperty("y"))
                    throw $util.ProtocolError("missing required 'y'", { instance: message });
                return message;
            };

            /**
             * Decodes a Monument message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.AppMap.Monument & rustplus.AppMap.Monument.$Shape} Monument
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Monument.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Monument message.
             * @function verify
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Monument.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isString(message.token))
                    return "token: string expected";
                if (typeof message.x !== "number")
                    return "x: number expected";
                if (typeof message.y !== "number")
                    return "y: number expected";
                return null;
            };

            /**
             * Creates a Monument message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.AppMap.Monument} Monument
             */
            Monument.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.AppMap.Monument)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.AppMap.Monument();
                if (object.token != null)
                    message.token = String(object.token);
                if (object.x != null)
                    message.x = Number(object.x);
                if (object.y != null)
                    message.y = Number(object.y);
                return message;
            };

            /**
             * Creates a plain object from a Monument message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {rustplus.AppMap.Monument} message Monument
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Monument.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.token = "";
                    object.x = 0;
                    object.y = 0;
                }
                if (message.token != null && message.hasOwnProperty("token"))
                    object.token = message.token;
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                return object;
            };

            /**
             * Converts this Monument to JSON.
             * @function toJSON
             * @memberof rustplus.AppMap.Monument
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Monument.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Monument
             * @function getTypeUrl
             * @memberof rustplus.AppMap.Monument
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Monument.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.AppMap.Monument";
            };

            return Monument;
        })();

        return AppMap;
    })();

    rustplus.AppEntityInfo = (function() {

        /**
         * Properties of an AppEntityInfo.
         * @typedef {Object} rustplus.AppEntityInfo.$Properties
         * @property {rustplus.AppEntityType} type AppEntityInfo type
         * @property {rustplus.AppEntityPayload.$Properties} payload AppEntityInfo payload
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppEntityInfo.
         * @memberof rustplus
         * @interface IAppEntityInfo
         * @augments rustplus.AppEntityInfo.$Properties
         * @deprecated Use rustplus.AppEntityInfo.$Properties instead.
         */

        /**
         * Shape of an AppEntityInfo.
         * @typedef {rustplus.AppEntityInfo.$Properties} rustplus.AppEntityInfo.$Shape
         */

        /**
         * Constructs a new AppEntityInfo.
         * @memberof rustplus
         * @classdesc Represents an AppEntityInfo.
         * @constructor
         * @param {rustplus.AppEntityInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppEntityInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppEntityInfo type.
         * @member {rustplus.AppEntityType} type
         * @memberof rustplus.AppEntityInfo
         * @instance
         */
        AppEntityInfo.prototype.type = 1;

        /**
         * AppEntityInfo payload.
         * @member {rustplus.AppEntityPayload.$Properties} payload
         * @memberof rustplus.AppEntityInfo
         * @instance
         */
        AppEntityInfo.prototype.payload = null;

        /**
         * Creates a new AppEntityInfo instance using the specified properties.
         * @function create
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {rustplus.AppEntityInfo.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppEntityInfo} AppEntityInfo instance
         * @type {{
         *   (properties: rustplus.AppEntityInfo.$Shape): rustplus.AppEntityInfo & rustplus.AppEntityInfo.$Shape;
         *   (properties?: rustplus.AppEntityInfo.$Properties): rustplus.AppEntityInfo;
         * }}
         */
        AppEntityInfo.create = function create(properties) {
            return new AppEntityInfo(properties);
        };

        /**
         * Encodes the specified AppEntityInfo message. Does not implicitly {@link rustplus.AppEntityInfo.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {rustplus.AppEntityInfo.$Properties} message AppEntityInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppEntityInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            $root.rustplus.AppEntityPayload.encode(message.payload, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppEntityInfo message, length delimited. Does not implicitly {@link rustplus.AppEntityInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {rustplus.AppEntityInfo.$Properties} message AppEntityInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppEntityInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppEntityInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppEntityInfo & rustplus.AppEntityInfo.$Shape} AppEntityInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppEntityInfo.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppEntityInfo();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.type = reader.int32();
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.payload = $root.rustplus.AppEntityPayload.decode(reader, reader.uint32(), undefined, _depth + 1, message.payload);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            if (!message.hasOwnProperty("payload"))
                throw $util.ProtocolError("missing required 'payload'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppEntityInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppEntityInfo & rustplus.AppEntityInfo.$Shape} AppEntityInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppEntityInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppEntityInfo message.
         * @function verify
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppEntityInfo.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 1:
            case 2:
            case 3:
                break;
            }
            {
                let error = $root.rustplus.AppEntityPayload.verify(message.payload, _depth + 1);
                if (error)
                    return "payload." + error;
            }
            return null;
        };

        /**
         * Creates an AppEntityInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppEntityInfo} AppEntityInfo
         */
        AppEntityInfo.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppEntityInfo)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppEntityInfo();
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "Switch":
            case 1:
                message.type = 1;
                break;
            case "Alarm":
            case 2:
                message.type = 2;
                break;
            case "StorageMonitor":
            case 3:
                message.type = 3;
                break;
            }
            if (object.payload != null) {
                if (typeof object.payload !== "object")
                    throw TypeError(".rustplus.AppEntityInfo.payload: object expected");
                message.payload = $root.rustplus.AppEntityPayload.fromObject(object.payload, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppEntityInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {rustplus.AppEntityInfo} message AppEntityInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppEntityInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.type = options.enums === String ? "Switch" : 1;
                object.payload = null;
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.rustplus.AppEntityType[message.type] === undefined ? message.type : $root.rustplus.AppEntityType[message.type] : message.type;
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = $root.rustplus.AppEntityPayload.toObject(message.payload, options);
            return object;
        };

        /**
         * Converts this AppEntityInfo to JSON.
         * @function toJSON
         * @memberof rustplus.AppEntityInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppEntityInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppEntityInfo
         * @function getTypeUrl
         * @memberof rustplus.AppEntityInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppEntityInfo.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppEntityInfo";
        };

        return AppEntityInfo;
    })();

    rustplus.AppEntityPayload = (function() {

        /**
         * Properties of an AppEntityPayload.
         * @typedef {Object} rustplus.AppEntityPayload.$Properties
         * @property {boolean|null} [value] AppEntityPayload value
         * @property {Array.<rustplus.AppEntityPayload.Item.$Properties>|null} [items] AppEntityPayload items
         * @property {number|null} [capacity] AppEntityPayload capacity
         * @property {boolean|null} [hasProtection] AppEntityPayload hasProtection
         * @property {number|null} [protectionExpiry] AppEntityPayload protectionExpiry
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppEntityPayload.
         * @memberof rustplus
         * @interface IAppEntityPayload
         * @augments rustplus.AppEntityPayload.$Properties
         * @deprecated Use rustplus.AppEntityPayload.$Properties instead.
         */

        /**
         * Shape of an AppEntityPayload.
         * @typedef {rustplus.AppEntityPayload.$Properties} rustplus.AppEntityPayload.$Shape
         */

        /**
         * Constructs a new AppEntityPayload.
         * @memberof rustplus
         * @classdesc Represents an AppEntityPayload.
         * @constructor
         * @param {rustplus.AppEntityPayload.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppEntityPayload(properties) {
            this.items = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppEntityPayload value.
         * @member {boolean} value
         * @memberof rustplus.AppEntityPayload
         * @instance
         */
        AppEntityPayload.prototype.value = false;

        /**
         * AppEntityPayload items.
         * @member {Array.<rustplus.AppEntityPayload.Item.$Properties>} items
         * @memberof rustplus.AppEntityPayload
         * @instance
         */
        AppEntityPayload.prototype.items = $util.emptyArray;

        /**
         * AppEntityPayload capacity.
         * @member {number} capacity
         * @memberof rustplus.AppEntityPayload
         * @instance
         */
        AppEntityPayload.prototype.capacity = 0;

        /**
         * AppEntityPayload hasProtection.
         * @member {boolean} hasProtection
         * @memberof rustplus.AppEntityPayload
         * @instance
         */
        AppEntityPayload.prototype.hasProtection = false;

        /**
         * AppEntityPayload protectionExpiry.
         * @member {number} protectionExpiry
         * @memberof rustplus.AppEntityPayload
         * @instance
         */
        AppEntityPayload.prototype.protectionExpiry = 0;

        /**
         * Creates a new AppEntityPayload instance using the specified properties.
         * @function create
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {rustplus.AppEntityPayload.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppEntityPayload} AppEntityPayload instance
         * @type {{
         *   (properties: rustplus.AppEntityPayload.$Shape): rustplus.AppEntityPayload & rustplus.AppEntityPayload.$Shape;
         *   (properties?: rustplus.AppEntityPayload.$Properties): rustplus.AppEntityPayload;
         * }}
         */
        AppEntityPayload.create = function create(properties) {
            return new AppEntityPayload(properties);
        };

        /**
         * Encodes the specified AppEntityPayload message. Does not implicitly {@link rustplus.AppEntityPayload.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {rustplus.AppEntityPayload.$Properties} message AppEntityPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppEntityPayload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.value);
            if (message.items != null && message.items.length)
                for (let i = 0; i < message.items.length; ++i)
                    $root.rustplus.AppEntityPayload.Item.encode(message.items[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.capacity != null && Object.hasOwnProperty.call(message, "capacity"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.capacity);
            if (message.hasProtection != null && Object.hasOwnProperty.call(message, "hasProtection"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.hasProtection);
            if (message.protectionExpiry != null && Object.hasOwnProperty.call(message, "protectionExpiry"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.protectionExpiry);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppEntityPayload message, length delimited. Does not implicitly {@link rustplus.AppEntityPayload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {rustplus.AppEntityPayload.$Properties} message AppEntityPayload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppEntityPayload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppEntityPayload message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppEntityPayload & rustplus.AppEntityPayload.$Shape} AppEntityPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppEntityPayload.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppEntityPayload();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.value = reader.bool();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.rustplus.AppEntityPayload.Item.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        message.capacity = reader.int32();
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.hasProtection = reader.bool();
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        message.protectionExpiry = reader.uint32();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppEntityPayload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppEntityPayload & rustplus.AppEntityPayload.$Shape} AppEntityPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppEntityPayload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppEntityPayload message.
         * @function verify
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppEntityPayload.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.value != null && message.hasOwnProperty("value"))
                if (typeof message.value !== "boolean")
                    return "value: boolean expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (let i = 0; i < message.items.length; ++i) {
                    let error = $root.rustplus.AppEntityPayload.Item.verify(message.items[i], _depth + 1);
                    if (error)
                        return "items." + error;
                }
            }
            if (message.capacity != null && message.hasOwnProperty("capacity"))
                if (!$util.isInteger(message.capacity))
                    return "capacity: integer expected";
            if (message.hasProtection != null && message.hasOwnProperty("hasProtection"))
                if (typeof message.hasProtection !== "boolean")
                    return "hasProtection: boolean expected";
            if (message.protectionExpiry != null && message.hasOwnProperty("protectionExpiry"))
                if (!$util.isInteger(message.protectionExpiry))
                    return "protectionExpiry: integer expected";
            return null;
        };

        /**
         * Creates an AppEntityPayload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppEntityPayload} AppEntityPayload
         */
        AppEntityPayload.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppEntityPayload)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppEntityPayload();
            if (object.value != null)
                message.value = Boolean(object.value);
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".rustplus.AppEntityPayload.items: array expected");
                message.items = Array(object.items.length);
                for (let i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".rustplus.AppEntityPayload.items: object expected");
                    message.items[i] = $root.rustplus.AppEntityPayload.Item.fromObject(object.items[i], _depth + 1);
                }
            }
            if (object.capacity != null)
                message.capacity = object.capacity | 0;
            if (object.hasProtection != null)
                message.hasProtection = Boolean(object.hasProtection);
            if (object.protectionExpiry != null)
                message.protectionExpiry = object.protectionExpiry >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an AppEntityPayload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {rustplus.AppEntityPayload} message AppEntityPayload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppEntityPayload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (options.defaults) {
                object.value = false;
                object.capacity = 0;
                object.hasProtection = false;
                object.protectionExpiry = 0;
            }
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            if (message.items && message.items.length) {
                object.items = Array(message.items.length);
                for (let j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.rustplus.AppEntityPayload.Item.toObject(message.items[j], options);
            }
            if (message.capacity != null && message.hasOwnProperty("capacity"))
                object.capacity = message.capacity;
            if (message.hasProtection != null && message.hasOwnProperty("hasProtection"))
                object.hasProtection = message.hasProtection;
            if (message.protectionExpiry != null && message.hasOwnProperty("protectionExpiry"))
                object.protectionExpiry = message.protectionExpiry;
            return object;
        };

        /**
         * Converts this AppEntityPayload to JSON.
         * @function toJSON
         * @memberof rustplus.AppEntityPayload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppEntityPayload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppEntityPayload
         * @function getTypeUrl
         * @memberof rustplus.AppEntityPayload
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppEntityPayload.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppEntityPayload";
        };

        AppEntityPayload.Item = (function() {

            /**
             * Properties of an Item.
             * @typedef {Object} rustplus.AppEntityPayload.Item.$Properties
             * @property {number} itemId Item itemId
             * @property {number} quantity Item quantity
             * @property {boolean} itemIsBlueprint Item itemIsBlueprint
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of an Item.
             * @memberof rustplus.AppEntityPayload
             * @interface IItem
             * @augments rustplus.AppEntityPayload.Item.$Properties
             * @deprecated Use rustplus.AppEntityPayload.Item.$Properties instead.
             */

            /**
             * Shape of an Item.
             * @typedef {rustplus.AppEntityPayload.Item.$Properties} rustplus.AppEntityPayload.Item.$Shape
             */

            /**
             * Constructs a new Item.
             * @memberof rustplus.AppEntityPayload
             * @classdesc Represents an Item.
             * @constructor
             * @param {rustplus.AppEntityPayload.Item.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Item(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Item itemId.
             * @member {number} itemId
             * @memberof rustplus.AppEntityPayload.Item
             * @instance
             */
            Item.prototype.itemId = 0;

            /**
             * Item quantity.
             * @member {number} quantity
             * @memberof rustplus.AppEntityPayload.Item
             * @instance
             */
            Item.prototype.quantity = 0;

            /**
             * Item itemIsBlueprint.
             * @member {boolean} itemIsBlueprint
             * @memberof rustplus.AppEntityPayload.Item
             * @instance
             */
            Item.prototype.itemIsBlueprint = false;

            /**
             * Creates a new Item instance using the specified properties.
             * @function create
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {rustplus.AppEntityPayload.Item.$Properties=} [properties] Properties to set
             * @returns {rustplus.AppEntityPayload.Item} Item instance
             * @type {{
             *   (properties: rustplus.AppEntityPayload.Item.$Shape): rustplus.AppEntityPayload.Item & rustplus.AppEntityPayload.Item.$Shape;
             *   (properties?: rustplus.AppEntityPayload.Item.$Properties): rustplus.AppEntityPayload.Item;
             * }}
             */
            Item.create = function create(properties) {
                return new Item(properties);
            };

            /**
             * Encodes the specified Item message. Does not implicitly {@link rustplus.AppEntityPayload.Item.verify|verify} messages.
             * @function encode
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {rustplus.AppEntityPayload.Item.$Properties} message Item message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Item.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.itemId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.quantity);
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.itemIsBlueprint);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Item message, length delimited. Does not implicitly {@link rustplus.AppEntityPayload.Item.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {rustplus.AppEntityPayload.Item.$Properties} message Item message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Item.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Item message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.AppEntityPayload.Item & rustplus.AppEntityPayload.Item.$Shape} Item
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Item.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppEntityPayload.Item();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.itemId = reader.int32();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.quantity = reader.int32();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            message.itemIsBlueprint = reader.bool();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("itemId"))
                    throw $util.ProtocolError("missing required 'itemId'", { instance: message });
                if (!message.hasOwnProperty("quantity"))
                    throw $util.ProtocolError("missing required 'quantity'", { instance: message });
                if (!message.hasOwnProperty("itemIsBlueprint"))
                    throw $util.ProtocolError("missing required 'itemIsBlueprint'", { instance: message });
                return message;
            };

            /**
             * Decodes an Item message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.AppEntityPayload.Item & rustplus.AppEntityPayload.Item.$Shape} Item
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Item.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Item message.
             * @function verify
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Item.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.itemId))
                    return "itemId: integer expected";
                if (!$util.isInteger(message.quantity))
                    return "quantity: integer expected";
                if (typeof message.itemIsBlueprint !== "boolean")
                    return "itemIsBlueprint: boolean expected";
                return null;
            };

            /**
             * Creates an Item message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.AppEntityPayload.Item} Item
             */
            Item.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.AppEntityPayload.Item)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.AppEntityPayload.Item();
                if (object.itemId != null)
                    message.itemId = object.itemId | 0;
                if (object.quantity != null)
                    message.quantity = object.quantity | 0;
                if (object.itemIsBlueprint != null)
                    message.itemIsBlueprint = Boolean(object.itemIsBlueprint);
                return message;
            };

            /**
             * Creates a plain object from an Item message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {rustplus.AppEntityPayload.Item} message Item
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Item.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.itemId = 0;
                    object.quantity = 0;
                    object.itemIsBlueprint = false;
                }
                if (message.itemId != null && message.hasOwnProperty("itemId"))
                    object.itemId = message.itemId;
                if (message.quantity != null && message.hasOwnProperty("quantity"))
                    object.quantity = message.quantity;
                if (message.itemIsBlueprint != null && message.hasOwnProperty("itemIsBlueprint"))
                    object.itemIsBlueprint = message.itemIsBlueprint;
                return object;
            };

            /**
             * Converts this Item to JSON.
             * @function toJSON
             * @memberof rustplus.AppEntityPayload.Item
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Item.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Item
             * @function getTypeUrl
             * @memberof rustplus.AppEntityPayload.Item
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Item.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.AppEntityPayload.Item";
            };

            return Item;
        })();

        return AppEntityPayload;
    })();

    rustplus.AppTeamInfo = (function() {

        /**
         * Properties of an AppTeamInfo.
         * @typedef {Object} rustplus.AppTeamInfo.$Properties
         * @property {number|Long} leaderSteamId AppTeamInfo leaderSteamId
         * @property {Array.<rustplus.AppTeamInfo.Member.$Properties>|null} [members] AppTeamInfo members
         * @property {Array.<rustplus.AppTeamInfo.Note.$Properties>|null} [mapNotes] AppTeamInfo mapNotes
         * @property {Array.<rustplus.AppTeamInfo.Note.$Properties>|null} [leaderMapNotes] AppTeamInfo leaderMapNotes
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppTeamInfo.
         * @memberof rustplus
         * @interface IAppTeamInfo
         * @augments rustplus.AppTeamInfo.$Properties
         * @deprecated Use rustplus.AppTeamInfo.$Properties instead.
         */

        /**
         * Shape of an AppTeamInfo.
         * @typedef {rustplus.AppTeamInfo.$Properties} rustplus.AppTeamInfo.$Shape
         */

        /**
         * Constructs a new AppTeamInfo.
         * @memberof rustplus
         * @classdesc Represents an AppTeamInfo.
         * @constructor
         * @param {rustplus.AppTeamInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppTeamInfo(properties) {
            this.members = [];
            this.mapNotes = [];
            this.leaderMapNotes = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppTeamInfo leaderSteamId.
         * @member {number|Long} leaderSteamId
         * @memberof rustplus.AppTeamInfo
         * @instance
         */
        AppTeamInfo.prototype.leaderSteamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * AppTeamInfo members.
         * @member {Array.<rustplus.AppTeamInfo.Member.$Properties>} members
         * @memberof rustplus.AppTeamInfo
         * @instance
         */
        AppTeamInfo.prototype.members = $util.emptyArray;

        /**
         * AppTeamInfo mapNotes.
         * @member {Array.<rustplus.AppTeamInfo.Note.$Properties>} mapNotes
         * @memberof rustplus.AppTeamInfo
         * @instance
         */
        AppTeamInfo.prototype.mapNotes = $util.emptyArray;

        /**
         * AppTeamInfo leaderMapNotes.
         * @member {Array.<rustplus.AppTeamInfo.Note.$Properties>} leaderMapNotes
         * @memberof rustplus.AppTeamInfo
         * @instance
         */
        AppTeamInfo.prototype.leaderMapNotes = $util.emptyArray;

        /**
         * Creates a new AppTeamInfo instance using the specified properties.
         * @function create
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {rustplus.AppTeamInfo.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppTeamInfo} AppTeamInfo instance
         * @type {{
         *   (properties: rustplus.AppTeamInfo.$Shape): rustplus.AppTeamInfo & rustplus.AppTeamInfo.$Shape;
         *   (properties?: rustplus.AppTeamInfo.$Properties): rustplus.AppTeamInfo;
         * }}
         */
        AppTeamInfo.create = function create(properties) {
            return new AppTeamInfo(properties);
        };

        /**
         * Encodes the specified AppTeamInfo message. Does not implicitly {@link rustplus.AppTeamInfo.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {rustplus.AppTeamInfo.$Properties} message AppTeamInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTeamInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.leaderSteamId);
            if (message.members != null && message.members.length)
                for (let i = 0; i < message.members.length; ++i)
                    $root.rustplus.AppTeamInfo.Member.encode(message.members[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.mapNotes != null && message.mapNotes.length)
                for (let i = 0; i < message.mapNotes.length; ++i)
                    $root.rustplus.AppTeamInfo.Note.encode(message.mapNotes[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.leaderMapNotes != null && message.leaderMapNotes.length)
                for (let i = 0; i < message.leaderMapNotes.length; ++i)
                    $root.rustplus.AppTeamInfo.Note.encode(message.leaderMapNotes[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppTeamInfo message, length delimited. Does not implicitly {@link rustplus.AppTeamInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {rustplus.AppTeamInfo.$Properties} message AppTeamInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTeamInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppTeamInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppTeamInfo & rustplus.AppTeamInfo.$Shape} AppTeamInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTeamInfo.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppTeamInfo();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.leaderSteamId = reader.uint64();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (!(message.members && message.members.length))
                            message.members = [];
                        message.members.push($root.rustplus.AppTeamInfo.Member.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if (!(message.mapNotes && message.mapNotes.length))
                            message.mapNotes = [];
                        message.mapNotes.push($root.rustplus.AppTeamInfo.Note.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        if (!(message.leaderMapNotes && message.leaderMapNotes.length))
                            message.leaderMapNotes = [];
                        message.leaderMapNotes.push($root.rustplus.AppTeamInfo.Note.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("leaderSteamId"))
                throw $util.ProtocolError("missing required 'leaderSteamId'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppTeamInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppTeamInfo & rustplus.AppTeamInfo.$Shape} AppTeamInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTeamInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppTeamInfo message.
         * @function verify
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppTeamInfo.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.leaderSteamId) && !(message.leaderSteamId && $util.isInteger(message.leaderSteamId.low) && $util.isInteger(message.leaderSteamId.high)))
                return "leaderSteamId: integer|Long expected";
            if (message.members != null && message.hasOwnProperty("members")) {
                if (!Array.isArray(message.members))
                    return "members: array expected";
                for (let i = 0; i < message.members.length; ++i) {
                    let error = $root.rustplus.AppTeamInfo.Member.verify(message.members[i], _depth + 1);
                    if (error)
                        return "members." + error;
                }
            }
            if (message.mapNotes != null && message.hasOwnProperty("mapNotes")) {
                if (!Array.isArray(message.mapNotes))
                    return "mapNotes: array expected";
                for (let i = 0; i < message.mapNotes.length; ++i) {
                    let error = $root.rustplus.AppTeamInfo.Note.verify(message.mapNotes[i], _depth + 1);
                    if (error)
                        return "mapNotes." + error;
                }
            }
            if (message.leaderMapNotes != null && message.hasOwnProperty("leaderMapNotes")) {
                if (!Array.isArray(message.leaderMapNotes))
                    return "leaderMapNotes: array expected";
                for (let i = 0; i < message.leaderMapNotes.length; ++i) {
                    let error = $root.rustplus.AppTeamInfo.Note.verify(message.leaderMapNotes[i], _depth + 1);
                    if (error)
                        return "leaderMapNotes." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AppTeamInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppTeamInfo} AppTeamInfo
         */
        AppTeamInfo.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppTeamInfo)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppTeamInfo();
            if (object.leaderSteamId != null)
                if ($util.Long)
                    (message.leaderSteamId = $util.Long.fromValue(object.leaderSteamId)).unsigned = true;
                else if (typeof object.leaderSteamId === "string")
                    message.leaderSteamId = parseInt(object.leaderSteamId, 10);
                else if (typeof object.leaderSteamId === "number")
                    message.leaderSteamId = object.leaderSteamId;
                else if (typeof object.leaderSteamId === "object")
                    message.leaderSteamId = new $util.LongBits(object.leaderSteamId.low >>> 0, object.leaderSteamId.high >>> 0).toNumber(true);
            if (object.members) {
                if (!Array.isArray(object.members))
                    throw TypeError(".rustplus.AppTeamInfo.members: array expected");
                message.members = Array(object.members.length);
                for (let i = 0; i < object.members.length; ++i) {
                    if (typeof object.members[i] !== "object")
                        throw TypeError(".rustplus.AppTeamInfo.members: object expected");
                    message.members[i] = $root.rustplus.AppTeamInfo.Member.fromObject(object.members[i], _depth + 1);
                }
            }
            if (object.mapNotes) {
                if (!Array.isArray(object.mapNotes))
                    throw TypeError(".rustplus.AppTeamInfo.mapNotes: array expected");
                message.mapNotes = Array(object.mapNotes.length);
                for (let i = 0; i < object.mapNotes.length; ++i) {
                    if (typeof object.mapNotes[i] !== "object")
                        throw TypeError(".rustplus.AppTeamInfo.mapNotes: object expected");
                    message.mapNotes[i] = $root.rustplus.AppTeamInfo.Note.fromObject(object.mapNotes[i], _depth + 1);
                }
            }
            if (object.leaderMapNotes) {
                if (!Array.isArray(object.leaderMapNotes))
                    throw TypeError(".rustplus.AppTeamInfo.leaderMapNotes: array expected");
                message.leaderMapNotes = Array(object.leaderMapNotes.length);
                for (let i = 0; i < object.leaderMapNotes.length; ++i) {
                    if (typeof object.leaderMapNotes[i] !== "object")
                        throw TypeError(".rustplus.AppTeamInfo.leaderMapNotes: object expected");
                    message.leaderMapNotes[i] = $root.rustplus.AppTeamInfo.Note.fromObject(object.leaderMapNotes[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AppTeamInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {rustplus.AppTeamInfo} message AppTeamInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppTeamInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults) {
                object.members = [];
                object.mapNotes = [];
                object.leaderMapNotes = [];
            }
            if (options.defaults)
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.leaderSteamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.leaderSteamId = options.longs === String ? "0" : 0;
            if (message.leaderSteamId != null && message.hasOwnProperty("leaderSteamId"))
                if (typeof message.leaderSteamId === "number")
                    object.leaderSteamId = options.longs === String ? String(message.leaderSteamId) : message.leaderSteamId;
                else
                    object.leaderSteamId = options.longs === String ? $util.Long.prototype.toString.call(message.leaderSteamId) : options.longs === Number ? new $util.LongBits(message.leaderSteamId.low >>> 0, message.leaderSteamId.high >>> 0).toNumber(true) : message.leaderSteamId;
            if (message.members && message.members.length) {
                object.members = Array(message.members.length);
                for (let j = 0; j < message.members.length; ++j)
                    object.members[j] = $root.rustplus.AppTeamInfo.Member.toObject(message.members[j], options);
            }
            if (message.mapNotes && message.mapNotes.length) {
                object.mapNotes = Array(message.mapNotes.length);
                for (let j = 0; j < message.mapNotes.length; ++j)
                    object.mapNotes[j] = $root.rustplus.AppTeamInfo.Note.toObject(message.mapNotes[j], options);
            }
            if (message.leaderMapNotes && message.leaderMapNotes.length) {
                object.leaderMapNotes = Array(message.leaderMapNotes.length);
                for (let j = 0; j < message.leaderMapNotes.length; ++j)
                    object.leaderMapNotes[j] = $root.rustplus.AppTeamInfo.Note.toObject(message.leaderMapNotes[j], options);
            }
            return object;
        };

        /**
         * Converts this AppTeamInfo to JSON.
         * @function toJSON
         * @memberof rustplus.AppTeamInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppTeamInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppTeamInfo
         * @function getTypeUrl
         * @memberof rustplus.AppTeamInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppTeamInfo.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppTeamInfo";
        };

        AppTeamInfo.Member = (function() {

            /**
             * Properties of a Member.
             * @typedef {Object} rustplus.AppTeamInfo.Member.$Properties
             * @property {number|Long} steamId Member steamId
             * @property {string} name Member name
             * @property {number} x Member x
             * @property {number} y Member y
             * @property {boolean} isOnline Member isOnline
             * @property {number} spawnTime Member spawnTime
             * @property {boolean} isAlive Member isAlive
             * @property {number} deathTime Member deathTime
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a Member.
             * @memberof rustplus.AppTeamInfo
             * @interface IMember
             * @augments rustplus.AppTeamInfo.Member.$Properties
             * @deprecated Use rustplus.AppTeamInfo.Member.$Properties instead.
             */

            /**
             * Shape of a Member.
             * @typedef {rustplus.AppTeamInfo.Member.$Properties} rustplus.AppTeamInfo.Member.$Shape
             */

            /**
             * Constructs a new Member.
             * @memberof rustplus.AppTeamInfo
             * @classdesc Represents a Member.
             * @constructor
             * @param {rustplus.AppTeamInfo.Member.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Member(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Member steamId.
             * @member {number|Long} steamId
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             */
            Member.prototype.steamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Member name.
             * @member {string} name
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             */
            Member.prototype.name = "";

            /**
             * Member x.
             * @member {number} x
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             */
            Member.prototype.x = 0;

            /**
             * Member y.
             * @member {number} y
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             */
            Member.prototype.y = 0;

            /**
             * Member isOnline.
             * @member {boolean} isOnline
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             */
            Member.prototype.isOnline = false;

            /**
             * Member spawnTime.
             * @member {number} spawnTime
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             */
            Member.prototype.spawnTime = 0;

            /**
             * Member isAlive.
             * @member {boolean} isAlive
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             */
            Member.prototype.isAlive = false;

            /**
             * Member deathTime.
             * @member {number} deathTime
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             */
            Member.prototype.deathTime = 0;

            /**
             * Creates a new Member instance using the specified properties.
             * @function create
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {rustplus.AppTeamInfo.Member.$Properties=} [properties] Properties to set
             * @returns {rustplus.AppTeamInfo.Member} Member instance
             * @type {{
             *   (properties: rustplus.AppTeamInfo.Member.$Shape): rustplus.AppTeamInfo.Member & rustplus.AppTeamInfo.Member.$Shape;
             *   (properties?: rustplus.AppTeamInfo.Member.$Properties): rustplus.AppTeamInfo.Member;
             * }}
             */
            Member.create = function create(properties) {
                return new Member(properties);
            };

            /**
             * Encodes the specified Member message. Does not implicitly {@link rustplus.AppTeamInfo.Member.verify|verify} messages.
             * @function encode
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {rustplus.AppTeamInfo.Member.$Properties} message Member message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Member.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.steamId);
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.x);
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.y);
                writer.uint32(/* id 5, wireType 0 =*/40).bool(message.isOnline);
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.spawnTime);
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.isAlive);
                writer.uint32(/* id 8, wireType 0 =*/64).uint32(message.deathTime);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Member message, length delimited. Does not implicitly {@link rustplus.AppTeamInfo.Member.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {rustplus.AppTeamInfo.Member.$Properties} message Member message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Member.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Member message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.AppTeamInfo.Member & rustplus.AppTeamInfo.Member.$Shape} Member
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Member.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppTeamInfo.Member();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.steamId = reader.uint64();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 2)
                                break;
                            message.name = reader.string();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 5)
                                break;
                            message.x = reader.float();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 5)
                                break;
                            message.y = reader.float();
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            message.isOnline = reader.bool();
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            message.spawnTime = reader.uint32();
                            continue;
                        }
                    case 7: {
                            if (wireType !== 0)
                                break;
                            message.isAlive = reader.bool();
                            continue;
                        }
                    case 8: {
                            if (wireType !== 0)
                                break;
                            message.deathTime = reader.uint32();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("steamId"))
                    throw $util.ProtocolError("missing required 'steamId'", { instance: message });
                if (!message.hasOwnProperty("name"))
                    throw $util.ProtocolError("missing required 'name'", { instance: message });
                if (!message.hasOwnProperty("x"))
                    throw $util.ProtocolError("missing required 'x'", { instance: message });
                if (!message.hasOwnProperty("y"))
                    throw $util.ProtocolError("missing required 'y'", { instance: message });
                if (!message.hasOwnProperty("isOnline"))
                    throw $util.ProtocolError("missing required 'isOnline'", { instance: message });
                if (!message.hasOwnProperty("spawnTime"))
                    throw $util.ProtocolError("missing required 'spawnTime'", { instance: message });
                if (!message.hasOwnProperty("isAlive"))
                    throw $util.ProtocolError("missing required 'isAlive'", { instance: message });
                if (!message.hasOwnProperty("deathTime"))
                    throw $util.ProtocolError("missing required 'deathTime'", { instance: message });
                return message;
            };

            /**
             * Decodes a Member message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.AppTeamInfo.Member & rustplus.AppTeamInfo.Member.$Shape} Member
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Member.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Member message.
             * @function verify
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Member.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.steamId) && !(message.steamId && $util.isInteger(message.steamId.low) && $util.isInteger(message.steamId.high)))
                    return "steamId: integer|Long expected";
                if (!$util.isString(message.name))
                    return "name: string expected";
                if (typeof message.x !== "number")
                    return "x: number expected";
                if (typeof message.y !== "number")
                    return "y: number expected";
                if (typeof message.isOnline !== "boolean")
                    return "isOnline: boolean expected";
                if (!$util.isInteger(message.spawnTime))
                    return "spawnTime: integer expected";
                if (typeof message.isAlive !== "boolean")
                    return "isAlive: boolean expected";
                if (!$util.isInteger(message.deathTime))
                    return "deathTime: integer expected";
                return null;
            };

            /**
             * Creates a Member message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.AppTeamInfo.Member} Member
             */
            Member.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.AppTeamInfo.Member)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.AppTeamInfo.Member();
                if (object.steamId != null)
                    if ($util.Long)
                        (message.steamId = $util.Long.fromValue(object.steamId)).unsigned = true;
                    else if (typeof object.steamId === "string")
                        message.steamId = parseInt(object.steamId, 10);
                    else if (typeof object.steamId === "number")
                        message.steamId = object.steamId;
                    else if (typeof object.steamId === "object")
                        message.steamId = new $util.LongBits(object.steamId.low >>> 0, object.steamId.high >>> 0).toNumber(true);
                if (object.name != null)
                    message.name = String(object.name);
                if (object.x != null)
                    message.x = Number(object.x);
                if (object.y != null)
                    message.y = Number(object.y);
                if (object.isOnline != null)
                    message.isOnline = Boolean(object.isOnline);
                if (object.spawnTime != null)
                    message.spawnTime = object.spawnTime >>> 0;
                if (object.isAlive != null)
                    message.isAlive = Boolean(object.isAlive);
                if (object.deathTime != null)
                    message.deathTime = object.deathTime >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a Member message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {rustplus.AppTeamInfo.Member} message Member
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Member.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, true);
                        object.steamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.steamId = options.longs === String ? "0" : 0;
                    object.name = "";
                    object.x = 0;
                    object.y = 0;
                    object.isOnline = false;
                    object.spawnTime = 0;
                    object.isAlive = false;
                    object.deathTime = 0;
                }
                if (message.steamId != null && message.hasOwnProperty("steamId"))
                    if (typeof message.steamId === "number")
                        object.steamId = options.longs === String ? String(message.steamId) : message.steamId;
                    else
                        object.steamId = options.longs === String ? $util.Long.prototype.toString.call(message.steamId) : options.longs === Number ? new $util.LongBits(message.steamId.low >>> 0, message.steamId.high >>> 0).toNumber(true) : message.steamId;
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                if (message.isOnline != null && message.hasOwnProperty("isOnline"))
                    object.isOnline = message.isOnline;
                if (message.spawnTime != null && message.hasOwnProperty("spawnTime"))
                    object.spawnTime = message.spawnTime;
                if (message.isAlive != null && message.hasOwnProperty("isAlive"))
                    object.isAlive = message.isAlive;
                if (message.deathTime != null && message.hasOwnProperty("deathTime"))
                    object.deathTime = message.deathTime;
                return object;
            };

            /**
             * Converts this Member to JSON.
             * @function toJSON
             * @memberof rustplus.AppTeamInfo.Member
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Member.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Member
             * @function getTypeUrl
             * @memberof rustplus.AppTeamInfo.Member
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Member.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.AppTeamInfo.Member";
            };

            return Member;
        })();

        AppTeamInfo.Note = (function() {

            /**
             * Properties of a Note.
             * @typedef {Object} rustplus.AppTeamInfo.Note.$Properties
             * @property {number} type Note type
             * @property {number} x Note x
             * @property {number} y Note y
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a Note.
             * @memberof rustplus.AppTeamInfo
             * @interface INote
             * @augments rustplus.AppTeamInfo.Note.$Properties
             * @deprecated Use rustplus.AppTeamInfo.Note.$Properties instead.
             */

            /**
             * Shape of a Note.
             * @typedef {rustplus.AppTeamInfo.Note.$Properties} rustplus.AppTeamInfo.Note.$Shape
             */

            /**
             * Constructs a new Note.
             * @memberof rustplus.AppTeamInfo
             * @classdesc Represents a Note.
             * @constructor
             * @param {rustplus.AppTeamInfo.Note.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Note(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Note type.
             * @member {number} type
             * @memberof rustplus.AppTeamInfo.Note
             * @instance
             */
            Note.prototype.type = 0;

            /**
             * Note x.
             * @member {number} x
             * @memberof rustplus.AppTeamInfo.Note
             * @instance
             */
            Note.prototype.x = 0;

            /**
             * Note y.
             * @member {number} y
             * @memberof rustplus.AppTeamInfo.Note
             * @instance
             */
            Note.prototype.y = 0;

            /**
             * Creates a new Note instance using the specified properties.
             * @function create
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {rustplus.AppTeamInfo.Note.$Properties=} [properties] Properties to set
             * @returns {rustplus.AppTeamInfo.Note} Note instance
             * @type {{
             *   (properties: rustplus.AppTeamInfo.Note.$Shape): rustplus.AppTeamInfo.Note & rustplus.AppTeamInfo.Note.$Shape;
             *   (properties?: rustplus.AppTeamInfo.Note.$Properties): rustplus.AppTeamInfo.Note;
             * }}
             */
            Note.create = function create(properties) {
                return new Note(properties);
            };

            /**
             * Encodes the specified Note message. Does not implicitly {@link rustplus.AppTeamInfo.Note.verify|verify} messages.
             * @function encode
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {rustplus.AppTeamInfo.Note.$Properties} message Note message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Note.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.x);
                writer.uint32(/* id 4, wireType 5 =*/37).float(message.y);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Note message, length delimited. Does not implicitly {@link rustplus.AppTeamInfo.Note.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {rustplus.AppTeamInfo.Note.$Properties} message Note message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Note.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Note message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.AppTeamInfo.Note & rustplus.AppTeamInfo.Note.$Shape} Note
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Note.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppTeamInfo.Note();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.type = reader.int32();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 5)
                                break;
                            message.x = reader.float();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 5)
                                break;
                            message.y = reader.float();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("type"))
                    throw $util.ProtocolError("missing required 'type'", { instance: message });
                if (!message.hasOwnProperty("x"))
                    throw $util.ProtocolError("missing required 'x'", { instance: message });
                if (!message.hasOwnProperty("y"))
                    throw $util.ProtocolError("missing required 'y'", { instance: message });
                return message;
            };

            /**
             * Decodes a Note message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.AppTeamInfo.Note & rustplus.AppTeamInfo.Note.$Shape} Note
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Note.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Note message.
             * @function verify
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Note.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
                if (typeof message.x !== "number")
                    return "x: number expected";
                if (typeof message.y !== "number")
                    return "y: number expected";
                return null;
            };

            /**
             * Creates a Note message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.AppTeamInfo.Note} Note
             */
            Note.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.AppTeamInfo.Note)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.AppTeamInfo.Note();
                if (object.type != null)
                    message.type = object.type | 0;
                if (object.x != null)
                    message.x = Number(object.x);
                if (object.y != null)
                    message.y = Number(object.y);
                return message;
            };

            /**
             * Creates a plain object from a Note message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {rustplus.AppTeamInfo.Note} message Note
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Note.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.type = 0;
                    object.x = 0;
                    object.y = 0;
                }
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = message.type;
                if (message.x != null && message.hasOwnProperty("x"))
                    object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
                if (message.y != null && message.hasOwnProperty("y"))
                    object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
                return object;
            };

            /**
             * Converts this Note to JSON.
             * @function toJSON
             * @memberof rustplus.AppTeamInfo.Note
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Note.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Note
             * @function getTypeUrl
             * @memberof rustplus.AppTeamInfo.Note
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Note.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.AppTeamInfo.Note";
            };

            return Note;
        })();

        return AppTeamInfo;
    })();

    rustplus.AppTeamMessage = (function() {

        /**
         * Properties of an AppTeamMessage.
         * @typedef {Object} rustplus.AppTeamMessage.$Properties
         * @property {number|Long} steamId AppTeamMessage steamId
         * @property {string} name AppTeamMessage name
         * @property {string} message AppTeamMessage message
         * @property {string} color AppTeamMessage color
         * @property {number} time AppTeamMessage time
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppTeamMessage.
         * @memberof rustplus
         * @interface IAppTeamMessage
         * @augments rustplus.AppTeamMessage.$Properties
         * @deprecated Use rustplus.AppTeamMessage.$Properties instead.
         */

        /**
         * Shape of an AppTeamMessage.
         * @typedef {rustplus.AppTeamMessage.$Properties} rustplus.AppTeamMessage.$Shape
         */

        /**
         * Constructs a new AppTeamMessage.
         * @memberof rustplus
         * @classdesc Represents an AppTeamMessage.
         * @constructor
         * @param {rustplus.AppTeamMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppTeamMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppTeamMessage steamId.
         * @member {number|Long} steamId
         * @memberof rustplus.AppTeamMessage
         * @instance
         */
        AppTeamMessage.prototype.steamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * AppTeamMessage name.
         * @member {string} name
         * @memberof rustplus.AppTeamMessage
         * @instance
         */
        AppTeamMessage.prototype.name = "";

        /**
         * AppTeamMessage message.
         * @member {string} message
         * @memberof rustplus.AppTeamMessage
         * @instance
         */
        AppTeamMessage.prototype.message = "";

        /**
         * AppTeamMessage color.
         * @member {string} color
         * @memberof rustplus.AppTeamMessage
         * @instance
         */
        AppTeamMessage.prototype.color = "";

        /**
         * AppTeamMessage time.
         * @member {number} time
         * @memberof rustplus.AppTeamMessage
         * @instance
         */
        AppTeamMessage.prototype.time = 0;

        /**
         * Creates a new AppTeamMessage instance using the specified properties.
         * @function create
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {rustplus.AppTeamMessage.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppTeamMessage} AppTeamMessage instance
         * @type {{
         *   (properties: rustplus.AppTeamMessage.$Shape): rustplus.AppTeamMessage & rustplus.AppTeamMessage.$Shape;
         *   (properties?: rustplus.AppTeamMessage.$Properties): rustplus.AppTeamMessage;
         * }}
         */
        AppTeamMessage.create = function create(properties) {
            return new AppTeamMessage(properties);
        };

        /**
         * Encodes the specified AppTeamMessage message. Does not implicitly {@link rustplus.AppTeamMessage.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {rustplus.AppTeamMessage.$Properties} message AppTeamMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTeamMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.steamId);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.color);
            writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.time);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppTeamMessage message, length delimited. Does not implicitly {@link rustplus.AppTeamMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {rustplus.AppTeamMessage.$Properties} message AppTeamMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTeamMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppTeamMessage message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppTeamMessage & rustplus.AppTeamMessage.$Shape} AppTeamMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTeamMessage.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppTeamMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.steamId = reader.uint64();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.name = reader.string();
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.message = reader.string();
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        message.color = reader.string();
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        message.time = reader.uint32();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("steamId"))
                throw $util.ProtocolError("missing required 'steamId'", { instance: message });
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("message"))
                throw $util.ProtocolError("missing required 'message'", { instance: message });
            if (!message.hasOwnProperty("color"))
                throw $util.ProtocolError("missing required 'color'", { instance: message });
            if (!message.hasOwnProperty("time"))
                throw $util.ProtocolError("missing required 'time'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppTeamMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppTeamMessage & rustplus.AppTeamMessage.$Shape} AppTeamMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTeamMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppTeamMessage message.
         * @function verify
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppTeamMessage.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.steamId) && !(message.steamId && $util.isInteger(message.steamId.low) && $util.isInteger(message.steamId.high)))
                return "steamId: integer|Long expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isString(message.message))
                return "message: string expected";
            if (!$util.isString(message.color))
                return "color: string expected";
            if (!$util.isInteger(message.time))
                return "time: integer expected";
            return null;
        };

        /**
         * Creates an AppTeamMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppTeamMessage} AppTeamMessage
         */
        AppTeamMessage.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppTeamMessage)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppTeamMessage();
            if (object.steamId != null)
                if ($util.Long)
                    (message.steamId = $util.Long.fromValue(object.steamId)).unsigned = true;
                else if (typeof object.steamId === "string")
                    message.steamId = parseInt(object.steamId, 10);
                else if (typeof object.steamId === "number")
                    message.steamId = object.steamId;
                else if (typeof object.steamId === "object")
                    message.steamId = new $util.LongBits(object.steamId.low >>> 0, object.steamId.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            if (object.message != null)
                message.message = String(object.message);
            if (object.color != null)
                message.color = String(object.color);
            if (object.time != null)
                message.time = object.time >>> 0;
            return message;
        };

        /**
         * Creates a plain object from an AppTeamMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {rustplus.AppTeamMessage} message AppTeamMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppTeamMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.steamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.steamId = options.longs === String ? "0" : 0;
                object.name = "";
                object.message = "";
                object.color = "";
                object.time = 0;
            }
            if (message.steamId != null && message.hasOwnProperty("steamId"))
                if (typeof message.steamId === "number")
                    object.steamId = options.longs === String ? String(message.steamId) : message.steamId;
                else
                    object.steamId = options.longs === String ? $util.Long.prototype.toString.call(message.steamId) : options.longs === Number ? new $util.LongBits(message.steamId.low >>> 0, message.steamId.high >>> 0).toNumber(true) : message.steamId;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.color != null && message.hasOwnProperty("color"))
                object.color = message.color;
            if (message.time != null && message.hasOwnProperty("time"))
                object.time = message.time;
            return object;
        };

        /**
         * Converts this AppTeamMessage to JSON.
         * @function toJSON
         * @memberof rustplus.AppTeamMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppTeamMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppTeamMessage
         * @function getTypeUrl
         * @memberof rustplus.AppTeamMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppTeamMessage.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppTeamMessage";
        };

        return AppTeamMessage;
    })();

    rustplus.AppTeamChat = (function() {

        /**
         * Properties of an AppTeamChat.
         * @typedef {Object} rustplus.AppTeamChat.$Properties
         * @property {Array.<rustplus.AppTeamMessage.$Properties>|null} [messages] AppTeamChat messages
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppTeamChat.
         * @memberof rustplus
         * @interface IAppTeamChat
         * @augments rustplus.AppTeamChat.$Properties
         * @deprecated Use rustplus.AppTeamChat.$Properties instead.
         */

        /**
         * Shape of an AppTeamChat.
         * @typedef {rustplus.AppTeamChat.$Properties} rustplus.AppTeamChat.$Shape
         */

        /**
         * Constructs a new AppTeamChat.
         * @memberof rustplus
         * @classdesc Represents an AppTeamChat.
         * @constructor
         * @param {rustplus.AppTeamChat.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppTeamChat(properties) {
            this.messages = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppTeamChat messages.
         * @member {Array.<rustplus.AppTeamMessage.$Properties>} messages
         * @memberof rustplus.AppTeamChat
         * @instance
         */
        AppTeamChat.prototype.messages = $util.emptyArray;

        /**
         * Creates a new AppTeamChat instance using the specified properties.
         * @function create
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {rustplus.AppTeamChat.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppTeamChat} AppTeamChat instance
         * @type {{
         *   (properties: rustplus.AppTeamChat.$Shape): rustplus.AppTeamChat & rustplus.AppTeamChat.$Shape;
         *   (properties?: rustplus.AppTeamChat.$Properties): rustplus.AppTeamChat;
         * }}
         */
        AppTeamChat.create = function create(properties) {
            return new AppTeamChat(properties);
        };

        /**
         * Encodes the specified AppTeamChat message. Does not implicitly {@link rustplus.AppTeamChat.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {rustplus.AppTeamChat.$Properties} message AppTeamChat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTeamChat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.messages != null && message.messages.length)
                for (let i = 0; i < message.messages.length; ++i)
                    $root.rustplus.AppTeamMessage.encode(message.messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppTeamChat message, length delimited. Does not implicitly {@link rustplus.AppTeamChat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {rustplus.AppTeamChat.$Properties} message AppTeamChat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTeamChat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppTeamChat message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppTeamChat & rustplus.AppTeamChat.$Shape} AppTeamChat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTeamChat.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppTeamChat();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if (!(message.messages && message.messages.length))
                            message.messages = [];
                        message.messages.push($root.rustplus.AppTeamMessage.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppTeamChat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppTeamChat & rustplus.AppTeamChat.$Shape} AppTeamChat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTeamChat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppTeamChat message.
         * @function verify
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppTeamChat.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.messages != null && message.hasOwnProperty("messages")) {
                if (!Array.isArray(message.messages))
                    return "messages: array expected";
                for (let i = 0; i < message.messages.length; ++i) {
                    let error = $root.rustplus.AppTeamMessage.verify(message.messages[i], _depth + 1);
                    if (error)
                        return "messages." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AppTeamChat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppTeamChat} AppTeamChat
         */
        AppTeamChat.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppTeamChat)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppTeamChat();
            if (object.messages) {
                if (!Array.isArray(object.messages))
                    throw TypeError(".rustplus.AppTeamChat.messages: array expected");
                message.messages = Array(object.messages.length);
                for (let i = 0; i < object.messages.length; ++i) {
                    if (typeof object.messages[i] !== "object")
                        throw TypeError(".rustplus.AppTeamChat.messages: object expected");
                    message.messages[i] = $root.rustplus.AppTeamMessage.fromObject(object.messages[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AppTeamChat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {rustplus.AppTeamChat} message AppTeamChat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppTeamChat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.messages = [];
            if (message.messages && message.messages.length) {
                object.messages = Array(message.messages.length);
                for (let j = 0; j < message.messages.length; ++j)
                    object.messages[j] = $root.rustplus.AppTeamMessage.toObject(message.messages[j], options);
            }
            return object;
        };

        /**
         * Converts this AppTeamChat to JSON.
         * @function toJSON
         * @memberof rustplus.AppTeamChat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppTeamChat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppTeamChat
         * @function getTypeUrl
         * @memberof rustplus.AppTeamChat
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppTeamChat.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppTeamChat";
        };

        return AppTeamChat;
    })();

    rustplus.AppMarker = (function() {

        /**
         * Properties of an AppMarker.
         * @typedef {Object} rustplus.AppMarker.$Properties
         * @property {number} id AppMarker id
         * @property {rustplus.AppMarkerType} type AppMarker type
         * @property {number} x AppMarker x
         * @property {number} y AppMarker y
         * @property {number|Long|null} [steamId] AppMarker steamId
         * @property {number|null} [rotation] AppMarker rotation
         * @property {number|null} [radius] AppMarker radius
         * @property {rustplus.Vector4.$Properties|null} [color1] AppMarker color1
         * @property {rustplus.Vector4.$Properties|null} [color2] AppMarker color2
         * @property {number|null} [alpha] AppMarker alpha
         * @property {string|null} [name] AppMarker name
         * @property {boolean|null} [outOfStock] AppMarker outOfStock
         * @property {Array.<rustplus.AppMarker.SellOrder.$Properties>|null} [sellOrders] AppMarker sellOrders
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppMarker.
         * @memberof rustplus
         * @interface IAppMarker
         * @augments rustplus.AppMarker.$Properties
         * @deprecated Use rustplus.AppMarker.$Properties instead.
         */

        /**
         * Shape of an AppMarker.
         * @typedef {rustplus.AppMarker.$Properties} rustplus.AppMarker.$Shape
         */

        /**
         * Constructs a new AppMarker.
         * @memberof rustplus
         * @classdesc Represents an AppMarker.
         * @constructor
         * @param {rustplus.AppMarker.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppMarker(properties) {
            this.sellOrders = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppMarker id.
         * @member {number} id
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.id = 0;

        /**
         * AppMarker type.
         * @member {rustplus.AppMarkerType} type
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.type = 0;

        /**
         * AppMarker x.
         * @member {number} x
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.x = 0;

        /**
         * AppMarker y.
         * @member {number} y
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.y = 0;

        /**
         * AppMarker steamId.
         * @member {number|Long} steamId
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.steamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * AppMarker rotation.
         * @member {number} rotation
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.rotation = 0;

        /**
         * AppMarker radius.
         * @member {number} radius
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.radius = 0;

        /**
         * AppMarker color1.
         * @member {rustplus.Vector4.$Properties|null|undefined} color1
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.color1 = null;

        /**
         * AppMarker color2.
         * @member {rustplus.Vector4.$Properties|null|undefined} color2
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.color2 = null;

        /**
         * AppMarker alpha.
         * @member {number} alpha
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.alpha = 0;

        /**
         * AppMarker name.
         * @member {string} name
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.name = "";

        /**
         * AppMarker outOfStock.
         * @member {boolean} outOfStock
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.outOfStock = false;

        /**
         * AppMarker sellOrders.
         * @member {Array.<rustplus.AppMarker.SellOrder.$Properties>} sellOrders
         * @memberof rustplus.AppMarker
         * @instance
         */
        AppMarker.prototype.sellOrders = $util.emptyArray;

        /**
         * Creates a new AppMarker instance using the specified properties.
         * @function create
         * @memberof rustplus.AppMarker
         * @static
         * @param {rustplus.AppMarker.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppMarker} AppMarker instance
         * @type {{
         *   (properties: rustplus.AppMarker.$Shape): rustplus.AppMarker & rustplus.AppMarker.$Shape;
         *   (properties?: rustplus.AppMarker.$Properties): rustplus.AppMarker;
         * }}
         */
        AppMarker.create = function create(properties) {
            return new AppMarker(properties);
        };

        /**
         * Encodes the specified AppMarker message. Does not implicitly {@link rustplus.AppMarker.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppMarker
         * @static
         * @param {rustplus.AppMarker.$Properties} message AppMarker message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppMarker.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.x);
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.y);
            if (message.steamId != null && Object.hasOwnProperty.call(message, "steamId"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.steamId);
            if (message.rotation != null && Object.hasOwnProperty.call(message, "rotation"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.rotation);
            if (message.radius != null && Object.hasOwnProperty.call(message, "radius"))
                writer.uint32(/* id 7, wireType 5 =*/61).float(message.radius);
            if (message.color1 != null && Object.hasOwnProperty.call(message, "color1"))
                $root.rustplus.Vector4.encode(message.color1, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
            if (message.color2 != null && Object.hasOwnProperty.call(message, "color2"))
                $root.rustplus.Vector4.encode(message.color2, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
            if (message.alpha != null && Object.hasOwnProperty.call(message, "alpha"))
                writer.uint32(/* id 10, wireType 5 =*/85).float(message.alpha);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.name);
            if (message.outOfStock != null && Object.hasOwnProperty.call(message, "outOfStock"))
                writer.uint32(/* id 12, wireType 0 =*/96).bool(message.outOfStock);
            if (message.sellOrders != null && message.sellOrders.length)
                for (let i = 0; i < message.sellOrders.length; ++i)
                    $root.rustplus.AppMarker.SellOrder.encode(message.sellOrders[i], writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppMarker message, length delimited. Does not implicitly {@link rustplus.AppMarker.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppMarker
         * @static
         * @param {rustplus.AppMarker.$Properties} message AppMarker message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppMarker.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppMarker message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppMarker
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppMarker & rustplus.AppMarker.$Shape} AppMarker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppMarker.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppMarker();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.id = reader.uint32();
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.type = reader.int32();
                        continue;
                    }
                case 3: {
                        if (wireType !== 5)
                            break;
                        message.x = reader.float();
                        continue;
                    }
                case 4: {
                        if (wireType !== 5)
                            break;
                        message.y = reader.float();
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        message.steamId = reader.uint64();
                        continue;
                    }
                case 6: {
                        if (wireType !== 5)
                            break;
                        message.rotation = reader.float();
                        continue;
                    }
                case 7: {
                        if (wireType !== 5)
                            break;
                        message.radius = reader.float();
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        message.color1 = $root.rustplus.Vector4.decode(reader, reader.uint32(), undefined, _depth + 1, message.color1);
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        message.color2 = $root.rustplus.Vector4.decode(reader, reader.uint32(), undefined, _depth + 1, message.color2);
                        continue;
                    }
                case 10: {
                        if (wireType !== 5)
                            break;
                        message.alpha = reader.float();
                        continue;
                    }
                case 11: {
                        if (wireType !== 2)
                            break;
                        message.name = reader.string();
                        continue;
                    }
                case 12: {
                        if (wireType !== 0)
                            break;
                        message.outOfStock = reader.bool();
                        continue;
                    }
                case 13: {
                        if (wireType !== 2)
                            break;
                        if (!(message.sellOrders && message.sellOrders.length))
                            message.sellOrders = [];
                        message.sellOrders.push($root.rustplus.AppMarker.SellOrder.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("type"))
                throw $util.ProtocolError("missing required 'type'", { instance: message });
            if (!message.hasOwnProperty("x"))
                throw $util.ProtocolError("missing required 'x'", { instance: message });
            if (!message.hasOwnProperty("y"))
                throw $util.ProtocolError("missing required 'y'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppMarker message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppMarker
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppMarker & rustplus.AppMarker.$Shape} AppMarker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppMarker.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppMarker message.
         * @function verify
         * @memberof rustplus.AppMarker
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppMarker.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.id))
                return "id: integer expected";
            switch (message.type) {
            default:
                return "type: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                break;
            }
            if (typeof message.x !== "number")
                return "x: number expected";
            if (typeof message.y !== "number")
                return "y: number expected";
            if (message.steamId != null && message.hasOwnProperty("steamId"))
                if (!$util.isInteger(message.steamId) && !(message.steamId && $util.isInteger(message.steamId.low) && $util.isInteger(message.steamId.high)))
                    return "steamId: integer|Long expected";
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                if (typeof message.rotation !== "number")
                    return "rotation: number expected";
            if (message.radius != null && message.hasOwnProperty("radius"))
                if (typeof message.radius !== "number")
                    return "radius: number expected";
            if (message.color1 != null && message.hasOwnProperty("color1")) {
                let error = $root.rustplus.Vector4.verify(message.color1, _depth + 1);
                if (error)
                    return "color1." + error;
            }
            if (message.color2 != null && message.hasOwnProperty("color2")) {
                let error = $root.rustplus.Vector4.verify(message.color2, _depth + 1);
                if (error)
                    return "color2." + error;
            }
            if (message.alpha != null && message.hasOwnProperty("alpha"))
                if (typeof message.alpha !== "number")
                    return "alpha: number expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.outOfStock != null && message.hasOwnProperty("outOfStock"))
                if (typeof message.outOfStock !== "boolean")
                    return "outOfStock: boolean expected";
            if (message.sellOrders != null && message.hasOwnProperty("sellOrders")) {
                if (!Array.isArray(message.sellOrders))
                    return "sellOrders: array expected";
                for (let i = 0; i < message.sellOrders.length; ++i) {
                    let error = $root.rustplus.AppMarker.SellOrder.verify(message.sellOrders[i], _depth + 1);
                    if (error)
                        return "sellOrders." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AppMarker message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppMarker
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppMarker} AppMarker
         */
        AppMarker.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppMarker)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppMarker();
            if (object.id != null)
                message.id = object.id >>> 0;
            switch (object.type) {
            default:
                if (typeof object.type === "number") {
                    message.type = object.type;
                    break;
                }
                break;
            case "Undefined":
            case 0:
                message.type = 0;
                break;
            case "Player":
            case 1:
                message.type = 1;
                break;
            case "Explosion":
            case 2:
                message.type = 2;
                break;
            case "VendingMachine":
            case 3:
                message.type = 3;
                break;
            case "CH47":
            case 4:
                message.type = 4;
                break;
            case "CargoShip":
            case 5:
                message.type = 5;
                break;
            case "Crate":
            case 6:
                message.type = 6;
                break;
            case "GenericRadius":
            case 7:
                message.type = 7;
                break;
            case "PatrolHelicopter":
            case 8:
                message.type = 8;
                break;
            }
            if (object.x != null)
                message.x = Number(object.x);
            if (object.y != null)
                message.y = Number(object.y);
            if (object.steamId != null)
                if ($util.Long)
                    (message.steamId = $util.Long.fromValue(object.steamId)).unsigned = true;
                else if (typeof object.steamId === "string")
                    message.steamId = parseInt(object.steamId, 10);
                else if (typeof object.steamId === "number")
                    message.steamId = object.steamId;
                else if (typeof object.steamId === "object")
                    message.steamId = new $util.LongBits(object.steamId.low >>> 0, object.steamId.high >>> 0).toNumber(true);
            if (object.rotation != null)
                message.rotation = Number(object.rotation);
            if (object.radius != null)
                message.radius = Number(object.radius);
            if (object.color1 != null) {
                if (typeof object.color1 !== "object")
                    throw TypeError(".rustplus.AppMarker.color1: object expected");
                message.color1 = $root.rustplus.Vector4.fromObject(object.color1, _depth + 1);
            }
            if (object.color2 != null) {
                if (typeof object.color2 !== "object")
                    throw TypeError(".rustplus.AppMarker.color2: object expected");
                message.color2 = $root.rustplus.Vector4.fromObject(object.color2, _depth + 1);
            }
            if (object.alpha != null)
                message.alpha = Number(object.alpha);
            if (object.name != null)
                message.name = String(object.name);
            if (object.outOfStock != null)
                message.outOfStock = Boolean(object.outOfStock);
            if (object.sellOrders) {
                if (!Array.isArray(object.sellOrders))
                    throw TypeError(".rustplus.AppMarker.sellOrders: array expected");
                message.sellOrders = Array(object.sellOrders.length);
                for (let i = 0; i < object.sellOrders.length; ++i) {
                    if (typeof object.sellOrders[i] !== "object")
                        throw TypeError(".rustplus.AppMarker.sellOrders: object expected");
                    message.sellOrders[i] = $root.rustplus.AppMarker.SellOrder.fromObject(object.sellOrders[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AppMarker message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppMarker
         * @static
         * @param {rustplus.AppMarker} message AppMarker
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppMarker.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.sellOrders = [];
            if (options.defaults) {
                object.id = 0;
                object.type = options.enums === String ? "Undefined" : 0;
                object.x = 0;
                object.y = 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.steamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.steamId = options.longs === String ? "0" : 0;
                object.rotation = 0;
                object.radius = 0;
                object.color1 = null;
                object.color2 = null;
                object.alpha = 0;
                object.name = "";
                object.outOfStock = false;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.rustplus.AppMarkerType[message.type] === undefined ? message.type : $root.rustplus.AppMarkerType[message.type] : message.type;
            if (message.x != null && message.hasOwnProperty("x"))
                object.x = options.json && !isFinite(message.x) ? String(message.x) : message.x;
            if (message.y != null && message.hasOwnProperty("y"))
                object.y = options.json && !isFinite(message.y) ? String(message.y) : message.y;
            if (message.steamId != null && message.hasOwnProperty("steamId"))
                if (typeof message.steamId === "number")
                    object.steamId = options.longs === String ? String(message.steamId) : message.steamId;
                else
                    object.steamId = options.longs === String ? $util.Long.prototype.toString.call(message.steamId) : options.longs === Number ? new $util.LongBits(message.steamId.low >>> 0, message.steamId.high >>> 0).toNumber(true) : message.steamId;
            if (message.rotation != null && message.hasOwnProperty("rotation"))
                object.rotation = options.json && !isFinite(message.rotation) ? String(message.rotation) : message.rotation;
            if (message.radius != null && message.hasOwnProperty("radius"))
                object.radius = options.json && !isFinite(message.radius) ? String(message.radius) : message.radius;
            if (message.color1 != null && message.hasOwnProperty("color1"))
                object.color1 = $root.rustplus.Vector4.toObject(message.color1, options);
            if (message.color2 != null && message.hasOwnProperty("color2"))
                object.color2 = $root.rustplus.Vector4.toObject(message.color2, options);
            if (message.alpha != null && message.hasOwnProperty("alpha"))
                object.alpha = options.json && !isFinite(message.alpha) ? String(message.alpha) : message.alpha;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.outOfStock != null && message.hasOwnProperty("outOfStock"))
                object.outOfStock = message.outOfStock;
            if (message.sellOrders && message.sellOrders.length) {
                object.sellOrders = Array(message.sellOrders.length);
                for (let j = 0; j < message.sellOrders.length; ++j)
                    object.sellOrders[j] = $root.rustplus.AppMarker.SellOrder.toObject(message.sellOrders[j], options);
            }
            return object;
        };

        /**
         * Converts this AppMarker to JSON.
         * @function toJSON
         * @memberof rustplus.AppMarker
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppMarker.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppMarker
         * @function getTypeUrl
         * @memberof rustplus.AppMarker
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppMarker.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppMarker";
        };

        AppMarker.SellOrder = (function() {

            /**
             * Properties of a SellOrder.
             * @typedef {Object} rustplus.AppMarker.SellOrder.$Properties
             * @property {number} itemId SellOrder itemId
             * @property {number} quantity SellOrder quantity
             * @property {number} currencyId SellOrder currencyId
             * @property {number} costPerItem SellOrder costPerItem
             * @property {number} amountInStock SellOrder amountInStock
             * @property {boolean} itemIsBlueprint SellOrder itemIsBlueprint
             * @property {boolean} currencyIsBlueprint SellOrder currencyIsBlueprint
             * @property {number|null} [itemCondition] SellOrder itemCondition
             * @property {number|null} [itemConditionMax] SellOrder itemConditionMax
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of a SellOrder.
             * @memberof rustplus.AppMarker
             * @interface ISellOrder
             * @augments rustplus.AppMarker.SellOrder.$Properties
             * @deprecated Use rustplus.AppMarker.SellOrder.$Properties instead.
             */

            /**
             * Shape of a SellOrder.
             * @typedef {rustplus.AppMarker.SellOrder.$Properties} rustplus.AppMarker.SellOrder.$Shape
             */

            /**
             * Constructs a new SellOrder.
             * @memberof rustplus.AppMarker
             * @classdesc Represents a SellOrder.
             * @constructor
             * @param {rustplus.AppMarker.SellOrder.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function SellOrder(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * SellOrder itemId.
             * @member {number} itemId
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.itemId = 0;

            /**
             * SellOrder quantity.
             * @member {number} quantity
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.quantity = 0;

            /**
             * SellOrder currencyId.
             * @member {number} currencyId
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.currencyId = 0;

            /**
             * SellOrder costPerItem.
             * @member {number} costPerItem
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.costPerItem = 0;

            /**
             * SellOrder amountInStock.
             * @member {number} amountInStock
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.amountInStock = 0;

            /**
             * SellOrder itemIsBlueprint.
             * @member {boolean} itemIsBlueprint
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.itemIsBlueprint = false;

            /**
             * SellOrder currencyIsBlueprint.
             * @member {boolean} currencyIsBlueprint
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.currencyIsBlueprint = false;

            /**
             * SellOrder itemCondition.
             * @member {number} itemCondition
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.itemCondition = 0;

            /**
             * SellOrder itemConditionMax.
             * @member {number} itemConditionMax
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             */
            SellOrder.prototype.itemConditionMax = 0;

            /**
             * Creates a new SellOrder instance using the specified properties.
             * @function create
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {rustplus.AppMarker.SellOrder.$Properties=} [properties] Properties to set
             * @returns {rustplus.AppMarker.SellOrder} SellOrder instance
             * @type {{
             *   (properties: rustplus.AppMarker.SellOrder.$Shape): rustplus.AppMarker.SellOrder & rustplus.AppMarker.SellOrder.$Shape;
             *   (properties?: rustplus.AppMarker.SellOrder.$Properties): rustplus.AppMarker.SellOrder;
             * }}
             */
            SellOrder.create = function create(properties) {
                return new SellOrder(properties);
            };

            /**
             * Encodes the specified SellOrder message. Does not implicitly {@link rustplus.AppMarker.SellOrder.verify|verify} messages.
             * @function encode
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {rustplus.AppMarker.SellOrder.$Properties} message SellOrder message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SellOrder.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.itemId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.quantity);
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.currencyId);
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.costPerItem);
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.amountInStock);
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.itemIsBlueprint);
                writer.uint32(/* id 7, wireType 0 =*/56).bool(message.currencyIsBlueprint);
                if (message.itemCondition != null && Object.hasOwnProperty.call(message, "itemCondition"))
                    writer.uint32(/* id 8, wireType 5 =*/69).float(message.itemCondition);
                if (message.itemConditionMax != null && Object.hasOwnProperty.call(message, "itemConditionMax"))
                    writer.uint32(/* id 9, wireType 5 =*/77).float(message.itemConditionMax);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified SellOrder message, length delimited. Does not implicitly {@link rustplus.AppMarker.SellOrder.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {rustplus.AppMarker.SellOrder.$Properties} message SellOrder message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SellOrder.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a SellOrder message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.AppMarker.SellOrder & rustplus.AppMarker.SellOrder.$Shape} SellOrder
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SellOrder.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppMarker.SellOrder();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.itemId = reader.int32();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.quantity = reader.int32();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 0)
                                break;
                            message.currencyId = reader.int32();
                            continue;
                        }
                    case 4: {
                            if (wireType !== 0)
                                break;
                            message.costPerItem = reader.int32();
                            continue;
                        }
                    case 5: {
                            if (wireType !== 0)
                                break;
                            message.amountInStock = reader.int32();
                            continue;
                        }
                    case 6: {
                            if (wireType !== 0)
                                break;
                            message.itemIsBlueprint = reader.bool();
                            continue;
                        }
                    case 7: {
                            if (wireType !== 0)
                                break;
                            message.currencyIsBlueprint = reader.bool();
                            continue;
                        }
                    case 8: {
                            if (wireType !== 5)
                                break;
                            message.itemCondition = reader.float();
                            continue;
                        }
                    case 9: {
                            if (wireType !== 5)
                                break;
                            message.itemConditionMax = reader.float();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("itemId"))
                    throw $util.ProtocolError("missing required 'itemId'", { instance: message });
                if (!message.hasOwnProperty("quantity"))
                    throw $util.ProtocolError("missing required 'quantity'", { instance: message });
                if (!message.hasOwnProperty("currencyId"))
                    throw $util.ProtocolError("missing required 'currencyId'", { instance: message });
                if (!message.hasOwnProperty("costPerItem"))
                    throw $util.ProtocolError("missing required 'costPerItem'", { instance: message });
                if (!message.hasOwnProperty("amountInStock"))
                    throw $util.ProtocolError("missing required 'amountInStock'", { instance: message });
                if (!message.hasOwnProperty("itemIsBlueprint"))
                    throw $util.ProtocolError("missing required 'itemIsBlueprint'", { instance: message });
                if (!message.hasOwnProperty("currencyIsBlueprint"))
                    throw $util.ProtocolError("missing required 'currencyIsBlueprint'", { instance: message });
                return message;
            };

            /**
             * Decodes a SellOrder message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.AppMarker.SellOrder & rustplus.AppMarker.SellOrder.$Shape} SellOrder
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SellOrder.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a SellOrder message.
             * @function verify
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SellOrder.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.itemId))
                    return "itemId: integer expected";
                if (!$util.isInteger(message.quantity))
                    return "quantity: integer expected";
                if (!$util.isInteger(message.currencyId))
                    return "currencyId: integer expected";
                if (!$util.isInteger(message.costPerItem))
                    return "costPerItem: integer expected";
                if (!$util.isInteger(message.amountInStock))
                    return "amountInStock: integer expected";
                if (typeof message.itemIsBlueprint !== "boolean")
                    return "itemIsBlueprint: boolean expected";
                if (typeof message.currencyIsBlueprint !== "boolean")
                    return "currencyIsBlueprint: boolean expected";
                if (message.itemCondition != null && message.hasOwnProperty("itemCondition"))
                    if (typeof message.itemCondition !== "number")
                        return "itemCondition: number expected";
                if (message.itemConditionMax != null && message.hasOwnProperty("itemConditionMax"))
                    if (typeof message.itemConditionMax !== "number")
                        return "itemConditionMax: number expected";
                return null;
            };

            /**
             * Creates a SellOrder message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.AppMarker.SellOrder} SellOrder
             */
            SellOrder.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.AppMarker.SellOrder)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.AppMarker.SellOrder();
                if (object.itemId != null)
                    message.itemId = object.itemId | 0;
                if (object.quantity != null)
                    message.quantity = object.quantity | 0;
                if (object.currencyId != null)
                    message.currencyId = object.currencyId | 0;
                if (object.costPerItem != null)
                    message.costPerItem = object.costPerItem | 0;
                if (object.amountInStock != null)
                    message.amountInStock = object.amountInStock | 0;
                if (object.itemIsBlueprint != null)
                    message.itemIsBlueprint = Boolean(object.itemIsBlueprint);
                if (object.currencyIsBlueprint != null)
                    message.currencyIsBlueprint = Boolean(object.currencyIsBlueprint);
                if (object.itemCondition != null)
                    message.itemCondition = Number(object.itemCondition);
                if (object.itemConditionMax != null)
                    message.itemConditionMax = Number(object.itemConditionMax);
                return message;
            };

            /**
             * Creates a plain object from a SellOrder message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {rustplus.AppMarker.SellOrder} message SellOrder
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SellOrder.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.itemId = 0;
                    object.quantity = 0;
                    object.currencyId = 0;
                    object.costPerItem = 0;
                    object.amountInStock = 0;
                    object.itemIsBlueprint = false;
                    object.currencyIsBlueprint = false;
                    object.itemCondition = 0;
                    object.itemConditionMax = 0;
                }
                if (message.itemId != null && message.hasOwnProperty("itemId"))
                    object.itemId = message.itemId;
                if (message.quantity != null && message.hasOwnProperty("quantity"))
                    object.quantity = message.quantity;
                if (message.currencyId != null && message.hasOwnProperty("currencyId"))
                    object.currencyId = message.currencyId;
                if (message.costPerItem != null && message.hasOwnProperty("costPerItem"))
                    object.costPerItem = message.costPerItem;
                if (message.amountInStock != null && message.hasOwnProperty("amountInStock"))
                    object.amountInStock = message.amountInStock;
                if (message.itemIsBlueprint != null && message.hasOwnProperty("itemIsBlueprint"))
                    object.itemIsBlueprint = message.itemIsBlueprint;
                if (message.currencyIsBlueprint != null && message.hasOwnProperty("currencyIsBlueprint"))
                    object.currencyIsBlueprint = message.currencyIsBlueprint;
                if (message.itemCondition != null && message.hasOwnProperty("itemCondition"))
                    object.itemCondition = options.json && !isFinite(message.itemCondition) ? String(message.itemCondition) : message.itemCondition;
                if (message.itemConditionMax != null && message.hasOwnProperty("itemConditionMax"))
                    object.itemConditionMax = options.json && !isFinite(message.itemConditionMax) ? String(message.itemConditionMax) : message.itemConditionMax;
                return object;
            };

            /**
             * Converts this SellOrder to JSON.
             * @function toJSON
             * @memberof rustplus.AppMarker.SellOrder
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SellOrder.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for SellOrder
             * @function getTypeUrl
             * @memberof rustplus.AppMarker.SellOrder
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            SellOrder.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.AppMarker.SellOrder";
            };

            return SellOrder;
        })();

        return AppMarker;
    })();

    rustplus.AppMapMarkers = (function() {

        /**
         * Properties of an AppMapMarkers.
         * @typedef {Object} rustplus.AppMapMarkers.$Properties
         * @property {Array.<rustplus.AppMarker.$Properties>|null} [markers] AppMapMarkers markers
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppMapMarkers.
         * @memberof rustplus
         * @interface IAppMapMarkers
         * @augments rustplus.AppMapMarkers.$Properties
         * @deprecated Use rustplus.AppMapMarkers.$Properties instead.
         */

        /**
         * Shape of an AppMapMarkers.
         * @typedef {rustplus.AppMapMarkers.$Properties} rustplus.AppMapMarkers.$Shape
         */

        /**
         * Constructs a new AppMapMarkers.
         * @memberof rustplus
         * @classdesc Represents an AppMapMarkers.
         * @constructor
         * @param {rustplus.AppMapMarkers.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppMapMarkers(properties) {
            this.markers = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppMapMarkers markers.
         * @member {Array.<rustplus.AppMarker.$Properties>} markers
         * @memberof rustplus.AppMapMarkers
         * @instance
         */
        AppMapMarkers.prototype.markers = $util.emptyArray;

        /**
         * Creates a new AppMapMarkers instance using the specified properties.
         * @function create
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {rustplus.AppMapMarkers.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppMapMarkers} AppMapMarkers instance
         * @type {{
         *   (properties: rustplus.AppMapMarkers.$Shape): rustplus.AppMapMarkers & rustplus.AppMapMarkers.$Shape;
         *   (properties?: rustplus.AppMapMarkers.$Properties): rustplus.AppMapMarkers;
         * }}
         */
        AppMapMarkers.create = function create(properties) {
            return new AppMapMarkers(properties);
        };

        /**
         * Encodes the specified AppMapMarkers message. Does not implicitly {@link rustplus.AppMapMarkers.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {rustplus.AppMapMarkers.$Properties} message AppMapMarkers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppMapMarkers.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.markers != null && message.markers.length)
                for (let i = 0; i < message.markers.length; ++i)
                    $root.rustplus.AppMarker.encode(message.markers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppMapMarkers message, length delimited. Does not implicitly {@link rustplus.AppMapMarkers.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {rustplus.AppMapMarkers.$Properties} message AppMapMarkers message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppMapMarkers.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppMapMarkers message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppMapMarkers & rustplus.AppMapMarkers.$Shape} AppMapMarkers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppMapMarkers.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppMapMarkers();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if (!(message.markers && message.markers.length))
                            message.markers = [];
                        message.markers.push($root.rustplus.AppMarker.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppMapMarkers message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppMapMarkers & rustplus.AppMapMarkers.$Shape} AppMapMarkers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppMapMarkers.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppMapMarkers message.
         * @function verify
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppMapMarkers.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.markers != null && message.hasOwnProperty("markers")) {
                if (!Array.isArray(message.markers))
                    return "markers: array expected";
                for (let i = 0; i < message.markers.length; ++i) {
                    let error = $root.rustplus.AppMarker.verify(message.markers[i], _depth + 1);
                    if (error)
                        return "markers." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AppMapMarkers message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppMapMarkers} AppMapMarkers
         */
        AppMapMarkers.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppMapMarkers)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppMapMarkers();
            if (object.markers) {
                if (!Array.isArray(object.markers))
                    throw TypeError(".rustplus.AppMapMarkers.markers: array expected");
                message.markers = Array(object.markers.length);
                for (let i = 0; i < object.markers.length; ++i) {
                    if (typeof object.markers[i] !== "object")
                        throw TypeError(".rustplus.AppMapMarkers.markers: object expected");
                    message.markers[i] = $root.rustplus.AppMarker.fromObject(object.markers[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AppMapMarkers message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {rustplus.AppMapMarkers} message AppMapMarkers
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppMapMarkers.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.markers = [];
            if (message.markers && message.markers.length) {
                object.markers = Array(message.markers.length);
                for (let j = 0; j < message.markers.length; ++j)
                    object.markers[j] = $root.rustplus.AppMarker.toObject(message.markers[j], options);
            }
            return object;
        };

        /**
         * Converts this AppMapMarkers to JSON.
         * @function toJSON
         * @memberof rustplus.AppMapMarkers
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppMapMarkers.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppMapMarkers
         * @function getTypeUrl
         * @memberof rustplus.AppMapMarkers
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppMapMarkers.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppMapMarkers";
        };

        return AppMapMarkers;
    })();

    rustplus.AppClanInfo = (function() {

        /**
         * Properties of an AppClanInfo.
         * @typedef {Object} rustplus.AppClanInfo.$Properties
         * @property {rustplus.ClanInfo.$Properties|null} [clanInfo] AppClanInfo clanInfo
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppClanInfo.
         * @memberof rustplus
         * @interface IAppClanInfo
         * @augments rustplus.AppClanInfo.$Properties
         * @deprecated Use rustplus.AppClanInfo.$Properties instead.
         */

        /**
         * Shape of an AppClanInfo.
         * @typedef {rustplus.AppClanInfo.$Properties} rustplus.AppClanInfo.$Shape
         */

        /**
         * Constructs a new AppClanInfo.
         * @memberof rustplus
         * @classdesc Represents an AppClanInfo.
         * @constructor
         * @param {rustplus.AppClanInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppClanInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppClanInfo clanInfo.
         * @member {rustplus.ClanInfo.$Properties|null|undefined} clanInfo
         * @memberof rustplus.AppClanInfo
         * @instance
         */
        AppClanInfo.prototype.clanInfo = null;

        /**
         * Creates a new AppClanInfo instance using the specified properties.
         * @function create
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {rustplus.AppClanInfo.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppClanInfo} AppClanInfo instance
         * @type {{
         *   (properties: rustplus.AppClanInfo.$Shape): rustplus.AppClanInfo & rustplus.AppClanInfo.$Shape;
         *   (properties?: rustplus.AppClanInfo.$Properties): rustplus.AppClanInfo;
         * }}
         */
        AppClanInfo.create = function create(properties) {
            return new AppClanInfo(properties);
        };

        /**
         * Encodes the specified AppClanInfo message. Does not implicitly {@link rustplus.AppClanInfo.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {rustplus.AppClanInfo.$Properties} message AppClanInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppClanInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clanInfo != null && Object.hasOwnProperty.call(message, "clanInfo"))
                $root.rustplus.ClanInfo.encode(message.clanInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppClanInfo message, length delimited. Does not implicitly {@link rustplus.AppClanInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {rustplus.AppClanInfo.$Properties} message AppClanInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppClanInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppClanInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppClanInfo & rustplus.AppClanInfo.$Shape} AppClanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppClanInfo.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppClanInfo();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.clanInfo = $root.rustplus.ClanInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.clanInfo);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppClanInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppClanInfo & rustplus.AppClanInfo.$Shape} AppClanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppClanInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppClanInfo message.
         * @function verify
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppClanInfo.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.clanInfo != null && message.hasOwnProperty("clanInfo")) {
                let error = $root.rustplus.ClanInfo.verify(message.clanInfo, _depth + 1);
                if (error)
                    return "clanInfo." + error;
            }
            return null;
        };

        /**
         * Creates an AppClanInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppClanInfo} AppClanInfo
         */
        AppClanInfo.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppClanInfo)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppClanInfo();
            if (object.clanInfo != null) {
                if (typeof object.clanInfo !== "object")
                    throw TypeError(".rustplus.AppClanInfo.clanInfo: object expected");
                message.clanInfo = $root.rustplus.ClanInfo.fromObject(object.clanInfo, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppClanInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {rustplus.AppClanInfo} message AppClanInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppClanInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.clanInfo = null;
            if (message.clanInfo != null && message.hasOwnProperty("clanInfo"))
                object.clanInfo = $root.rustplus.ClanInfo.toObject(message.clanInfo, options);
            return object;
        };

        /**
         * Converts this AppClanInfo to JSON.
         * @function toJSON
         * @memberof rustplus.AppClanInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppClanInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppClanInfo
         * @function getTypeUrl
         * @memberof rustplus.AppClanInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppClanInfo.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppClanInfo";
        };

        return AppClanInfo;
    })();

    rustplus.AppClanMessage = (function() {

        /**
         * Properties of an AppClanMessage.
         * @typedef {Object} rustplus.AppClanMessage.$Properties
         * @property {number|Long} steamId AppClanMessage steamId
         * @property {string} name AppClanMessage name
         * @property {string} message AppClanMessage message
         * @property {number|Long} time AppClanMessage time
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppClanMessage.
         * @memberof rustplus
         * @interface IAppClanMessage
         * @augments rustplus.AppClanMessage.$Properties
         * @deprecated Use rustplus.AppClanMessage.$Properties instead.
         */

        /**
         * Shape of an AppClanMessage.
         * @typedef {rustplus.AppClanMessage.$Properties} rustplus.AppClanMessage.$Shape
         */

        /**
         * Constructs a new AppClanMessage.
         * @memberof rustplus
         * @classdesc Represents an AppClanMessage.
         * @constructor
         * @param {rustplus.AppClanMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppClanMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppClanMessage steamId.
         * @member {number|Long} steamId
         * @memberof rustplus.AppClanMessage
         * @instance
         */
        AppClanMessage.prototype.steamId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * AppClanMessage name.
         * @member {string} name
         * @memberof rustplus.AppClanMessage
         * @instance
         */
        AppClanMessage.prototype.name = "";

        /**
         * AppClanMessage message.
         * @member {string} message
         * @memberof rustplus.AppClanMessage
         * @instance
         */
        AppClanMessage.prototype.message = "";

        /**
         * AppClanMessage time.
         * @member {number|Long} time
         * @memberof rustplus.AppClanMessage
         * @instance
         */
        AppClanMessage.prototype.time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new AppClanMessage instance using the specified properties.
         * @function create
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {rustplus.AppClanMessage.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppClanMessage} AppClanMessage instance
         * @type {{
         *   (properties: rustplus.AppClanMessage.$Shape): rustplus.AppClanMessage & rustplus.AppClanMessage.$Shape;
         *   (properties?: rustplus.AppClanMessage.$Properties): rustplus.AppClanMessage;
         * }}
         */
        AppClanMessage.create = function create(properties) {
            return new AppClanMessage(properties);
        };

        /**
         * Encodes the specified AppClanMessage message. Does not implicitly {@link rustplus.AppClanMessage.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {rustplus.AppClanMessage.$Properties} message AppClanMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppClanMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.steamId);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            writer.uint32(/* id 4, wireType 0 =*/32).int64(message.time);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppClanMessage message, length delimited. Does not implicitly {@link rustplus.AppClanMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {rustplus.AppClanMessage.$Properties} message AppClanMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppClanMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppClanMessage message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppClanMessage & rustplus.AppClanMessage.$Shape} AppClanMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppClanMessage.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppClanMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.steamId = reader.uint64();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.name = reader.string();
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.message = reader.string();
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.time = reader.int64();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("steamId"))
                throw $util.ProtocolError("missing required 'steamId'", { instance: message });
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("message"))
                throw $util.ProtocolError("missing required 'message'", { instance: message });
            if (!message.hasOwnProperty("time"))
                throw $util.ProtocolError("missing required 'time'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppClanMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppClanMessage & rustplus.AppClanMessage.$Shape} AppClanMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppClanMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppClanMessage message.
         * @function verify
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppClanMessage.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.steamId) && !(message.steamId && $util.isInteger(message.steamId.low) && $util.isInteger(message.steamId.high)))
                return "steamId: integer|Long expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isString(message.message))
                return "message: string expected";
            if (!$util.isInteger(message.time) && !(message.time && $util.isInteger(message.time.low) && $util.isInteger(message.time.high)))
                return "time: integer|Long expected";
            return null;
        };

        /**
         * Creates an AppClanMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppClanMessage} AppClanMessage
         */
        AppClanMessage.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppClanMessage)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppClanMessage();
            if (object.steamId != null)
                if ($util.Long)
                    (message.steamId = $util.Long.fromValue(object.steamId)).unsigned = true;
                else if (typeof object.steamId === "string")
                    message.steamId = parseInt(object.steamId, 10);
                else if (typeof object.steamId === "number")
                    message.steamId = object.steamId;
                else if (typeof object.steamId === "object")
                    message.steamId = new $util.LongBits(object.steamId.low >>> 0, object.steamId.high >>> 0).toNumber(true);
            if (object.name != null)
                message.name = String(object.name);
            if (object.message != null)
                message.message = String(object.message);
            if (object.time != null)
                if ($util.Long)
                    (message.time = $util.Long.fromValue(object.time)).unsigned = false;
                else if (typeof object.time === "string")
                    message.time = parseInt(object.time, 10);
                else if (typeof object.time === "number")
                    message.time = object.time;
                else if (typeof object.time === "object")
                    message.time = new $util.LongBits(object.time.low >>> 0, object.time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from an AppClanMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {rustplus.AppClanMessage} message AppClanMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppClanMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.steamId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.steamId = options.longs === String ? "0" : 0;
                object.name = "";
                object.message = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.time = options.longs === String ? "0" : 0;
            }
            if (message.steamId != null && message.hasOwnProperty("steamId"))
                if (typeof message.steamId === "number")
                    object.steamId = options.longs === String ? String(message.steamId) : message.steamId;
                else
                    object.steamId = options.longs === String ? $util.Long.prototype.toString.call(message.steamId) : options.longs === Number ? new $util.LongBits(message.steamId.low >>> 0, message.steamId.high >>> 0).toNumber(true) : message.steamId;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.time != null && message.hasOwnProperty("time"))
                if (typeof message.time === "number")
                    object.time = options.longs === String ? String(message.time) : message.time;
                else
                    object.time = options.longs === String ? $util.Long.prototype.toString.call(message.time) : options.longs === Number ? new $util.LongBits(message.time.low >>> 0, message.time.high >>> 0).toNumber() : message.time;
            return object;
        };

        /**
         * Converts this AppClanMessage to JSON.
         * @function toJSON
         * @memberof rustplus.AppClanMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppClanMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppClanMessage
         * @function getTypeUrl
         * @memberof rustplus.AppClanMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppClanMessage.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppClanMessage";
        };

        return AppClanMessage;
    })();

    rustplus.AppClanChat = (function() {

        /**
         * Properties of an AppClanChat.
         * @typedef {Object} rustplus.AppClanChat.$Properties
         * @property {Array.<rustplus.AppClanMessage.$Properties>|null} [messages] AppClanChat messages
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppClanChat.
         * @memberof rustplus
         * @interface IAppClanChat
         * @augments rustplus.AppClanChat.$Properties
         * @deprecated Use rustplus.AppClanChat.$Properties instead.
         */

        /**
         * Shape of an AppClanChat.
         * @typedef {rustplus.AppClanChat.$Properties} rustplus.AppClanChat.$Shape
         */

        /**
         * Constructs a new AppClanChat.
         * @memberof rustplus
         * @classdesc Represents an AppClanChat.
         * @constructor
         * @param {rustplus.AppClanChat.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppClanChat(properties) {
            this.messages = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppClanChat messages.
         * @member {Array.<rustplus.AppClanMessage.$Properties>} messages
         * @memberof rustplus.AppClanChat
         * @instance
         */
        AppClanChat.prototype.messages = $util.emptyArray;

        /**
         * Creates a new AppClanChat instance using the specified properties.
         * @function create
         * @memberof rustplus.AppClanChat
         * @static
         * @param {rustplus.AppClanChat.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppClanChat} AppClanChat instance
         * @type {{
         *   (properties: rustplus.AppClanChat.$Shape): rustplus.AppClanChat & rustplus.AppClanChat.$Shape;
         *   (properties?: rustplus.AppClanChat.$Properties): rustplus.AppClanChat;
         * }}
         */
        AppClanChat.create = function create(properties) {
            return new AppClanChat(properties);
        };

        /**
         * Encodes the specified AppClanChat message. Does not implicitly {@link rustplus.AppClanChat.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppClanChat
         * @static
         * @param {rustplus.AppClanChat.$Properties} message AppClanChat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppClanChat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.messages != null && message.messages.length)
                for (let i = 0; i < message.messages.length; ++i)
                    $root.rustplus.AppClanMessage.encode(message.messages[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppClanChat message, length delimited. Does not implicitly {@link rustplus.AppClanChat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppClanChat
         * @static
         * @param {rustplus.AppClanChat.$Properties} message AppClanChat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppClanChat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppClanChat message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppClanChat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppClanChat & rustplus.AppClanChat.$Shape} AppClanChat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppClanChat.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppClanChat();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if (!(message.messages && message.messages.length))
                            message.messages = [];
                        message.messages.push($root.rustplus.AppClanMessage.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppClanChat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppClanChat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppClanChat & rustplus.AppClanChat.$Shape} AppClanChat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppClanChat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppClanChat message.
         * @function verify
         * @memberof rustplus.AppClanChat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppClanChat.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.messages != null && message.hasOwnProperty("messages")) {
                if (!Array.isArray(message.messages))
                    return "messages: array expected";
                for (let i = 0; i < message.messages.length; ++i) {
                    let error = $root.rustplus.AppClanMessage.verify(message.messages[i], _depth + 1);
                    if (error)
                        return "messages." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AppClanChat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppClanChat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppClanChat} AppClanChat
         */
        AppClanChat.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppClanChat)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppClanChat();
            if (object.messages) {
                if (!Array.isArray(object.messages))
                    throw TypeError(".rustplus.AppClanChat.messages: array expected");
                message.messages = Array(object.messages.length);
                for (let i = 0; i < object.messages.length; ++i) {
                    if (typeof object.messages[i] !== "object")
                        throw TypeError(".rustplus.AppClanChat.messages: object expected");
                    message.messages[i] = $root.rustplus.AppClanMessage.fromObject(object.messages[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AppClanChat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppClanChat
         * @static
         * @param {rustplus.AppClanChat} message AppClanChat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppClanChat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.messages = [];
            if (message.messages && message.messages.length) {
                object.messages = Array(message.messages.length);
                for (let j = 0; j < message.messages.length; ++j)
                    object.messages[j] = $root.rustplus.AppClanMessage.toObject(message.messages[j], options);
            }
            return object;
        };

        /**
         * Converts this AppClanChat to JSON.
         * @function toJSON
         * @memberof rustplus.AppClanChat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppClanChat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppClanChat
         * @function getTypeUrl
         * @memberof rustplus.AppClanChat
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppClanChat.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppClanChat";
        };

        return AppClanChat;
    })();

    rustplus.AppNexusAuth = (function() {

        /**
         * Properties of an AppNexusAuth.
         * @typedef {Object} rustplus.AppNexusAuth.$Properties
         * @property {string} serverId AppNexusAuth serverId
         * @property {number} playerToken AppNexusAuth playerToken
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppNexusAuth.
         * @memberof rustplus
         * @interface IAppNexusAuth
         * @augments rustplus.AppNexusAuth.$Properties
         * @deprecated Use rustplus.AppNexusAuth.$Properties instead.
         */

        /**
         * Shape of an AppNexusAuth.
         * @typedef {rustplus.AppNexusAuth.$Properties} rustplus.AppNexusAuth.$Shape
         */

        /**
         * Constructs a new AppNexusAuth.
         * @memberof rustplus
         * @classdesc Represents an AppNexusAuth.
         * @constructor
         * @param {rustplus.AppNexusAuth.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppNexusAuth(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppNexusAuth serverId.
         * @member {string} serverId
         * @memberof rustplus.AppNexusAuth
         * @instance
         */
        AppNexusAuth.prototype.serverId = "";

        /**
         * AppNexusAuth playerToken.
         * @member {number} playerToken
         * @memberof rustplus.AppNexusAuth
         * @instance
         */
        AppNexusAuth.prototype.playerToken = 0;

        /**
         * Creates a new AppNexusAuth instance using the specified properties.
         * @function create
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {rustplus.AppNexusAuth.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppNexusAuth} AppNexusAuth instance
         * @type {{
         *   (properties: rustplus.AppNexusAuth.$Shape): rustplus.AppNexusAuth & rustplus.AppNexusAuth.$Shape;
         *   (properties?: rustplus.AppNexusAuth.$Properties): rustplus.AppNexusAuth;
         * }}
         */
        AppNexusAuth.create = function create(properties) {
            return new AppNexusAuth(properties);
        };

        /**
         * Encodes the specified AppNexusAuth message. Does not implicitly {@link rustplus.AppNexusAuth.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {rustplus.AppNexusAuth.$Properties} message AppNexusAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppNexusAuth.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.serverId);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.playerToken);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppNexusAuth message, length delimited. Does not implicitly {@link rustplus.AppNexusAuth.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {rustplus.AppNexusAuth.$Properties} message AppNexusAuth message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppNexusAuth.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppNexusAuth message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppNexusAuth & rustplus.AppNexusAuth.$Shape} AppNexusAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppNexusAuth.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppNexusAuth();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.serverId = reader.string();
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.playerToken = reader.int32();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("serverId"))
                throw $util.ProtocolError("missing required 'serverId'", { instance: message });
            if (!message.hasOwnProperty("playerToken"))
                throw $util.ProtocolError("missing required 'playerToken'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppNexusAuth message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppNexusAuth & rustplus.AppNexusAuth.$Shape} AppNexusAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppNexusAuth.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppNexusAuth message.
         * @function verify
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppNexusAuth.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isString(message.serverId))
                return "serverId: string expected";
            if (!$util.isInteger(message.playerToken))
                return "playerToken: integer expected";
            return null;
        };

        /**
         * Creates an AppNexusAuth message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppNexusAuth} AppNexusAuth
         */
        AppNexusAuth.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppNexusAuth)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppNexusAuth();
            if (object.serverId != null)
                message.serverId = String(object.serverId);
            if (object.playerToken != null)
                message.playerToken = object.playerToken | 0;
            return message;
        };

        /**
         * Creates a plain object from an AppNexusAuth message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {rustplus.AppNexusAuth} message AppNexusAuth
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppNexusAuth.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.serverId = "";
                object.playerToken = 0;
            }
            if (message.serverId != null && message.hasOwnProperty("serverId"))
                object.serverId = message.serverId;
            if (message.playerToken != null && message.hasOwnProperty("playerToken"))
                object.playerToken = message.playerToken;
            return object;
        };

        /**
         * Converts this AppNexusAuth to JSON.
         * @function toJSON
         * @memberof rustplus.AppNexusAuth
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppNexusAuth.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppNexusAuth
         * @function getTypeUrl
         * @memberof rustplus.AppNexusAuth
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppNexusAuth.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppNexusAuth";
        };

        return AppNexusAuth;
    })();

    rustplus.AppTeamChanged = (function() {

        /**
         * Properties of an AppTeamChanged.
         * @typedef {Object} rustplus.AppTeamChanged.$Properties
         * @property {number|Long} playerId AppTeamChanged playerId
         * @property {rustplus.AppTeamInfo.$Properties} teamInfo AppTeamChanged teamInfo
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppTeamChanged.
         * @memberof rustplus
         * @interface IAppTeamChanged
         * @augments rustplus.AppTeamChanged.$Properties
         * @deprecated Use rustplus.AppTeamChanged.$Properties instead.
         */

        /**
         * Shape of an AppTeamChanged.
         * @typedef {rustplus.AppTeamChanged.$Properties} rustplus.AppTeamChanged.$Shape
         */

        /**
         * Constructs a new AppTeamChanged.
         * @memberof rustplus
         * @classdesc Represents an AppTeamChanged.
         * @constructor
         * @param {rustplus.AppTeamChanged.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppTeamChanged(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppTeamChanged playerId.
         * @member {number|Long} playerId
         * @memberof rustplus.AppTeamChanged
         * @instance
         */
        AppTeamChanged.prototype.playerId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * AppTeamChanged teamInfo.
         * @member {rustplus.AppTeamInfo.$Properties} teamInfo
         * @memberof rustplus.AppTeamChanged
         * @instance
         */
        AppTeamChanged.prototype.teamInfo = null;

        /**
         * Creates a new AppTeamChanged instance using the specified properties.
         * @function create
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {rustplus.AppTeamChanged.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppTeamChanged} AppTeamChanged instance
         * @type {{
         *   (properties: rustplus.AppTeamChanged.$Shape): rustplus.AppTeamChanged & rustplus.AppTeamChanged.$Shape;
         *   (properties?: rustplus.AppTeamChanged.$Properties): rustplus.AppTeamChanged;
         * }}
         */
        AppTeamChanged.create = function create(properties) {
            return new AppTeamChanged(properties);
        };

        /**
         * Encodes the specified AppTeamChanged message. Does not implicitly {@link rustplus.AppTeamChanged.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {rustplus.AppTeamChanged.$Properties} message AppTeamChanged message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTeamChanged.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.playerId);
            $root.rustplus.AppTeamInfo.encode(message.teamInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppTeamChanged message, length delimited. Does not implicitly {@link rustplus.AppTeamChanged.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {rustplus.AppTeamChanged.$Properties} message AppTeamChanged message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppTeamChanged.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppTeamChanged message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppTeamChanged & rustplus.AppTeamChanged.$Shape} AppTeamChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTeamChanged.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppTeamChanged();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.playerId = reader.uint64();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.teamInfo = $root.rustplus.AppTeamInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.teamInfo);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("playerId"))
                throw $util.ProtocolError("missing required 'playerId'", { instance: message });
            if (!message.hasOwnProperty("teamInfo"))
                throw $util.ProtocolError("missing required 'teamInfo'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppTeamChanged message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppTeamChanged & rustplus.AppTeamChanged.$Shape} AppTeamChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppTeamChanged.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppTeamChanged message.
         * @function verify
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppTeamChanged.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.playerId) && !(message.playerId && $util.isInteger(message.playerId.low) && $util.isInteger(message.playerId.high)))
                return "playerId: integer|Long expected";
            {
                let error = $root.rustplus.AppTeamInfo.verify(message.teamInfo, _depth + 1);
                if (error)
                    return "teamInfo." + error;
            }
            return null;
        };

        /**
         * Creates an AppTeamChanged message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppTeamChanged} AppTeamChanged
         */
        AppTeamChanged.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppTeamChanged)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppTeamChanged();
            if (object.playerId != null)
                if ($util.Long)
                    (message.playerId = $util.Long.fromValue(object.playerId)).unsigned = true;
                else if (typeof object.playerId === "string")
                    message.playerId = parseInt(object.playerId, 10);
                else if (typeof object.playerId === "number")
                    message.playerId = object.playerId;
                else if (typeof object.playerId === "object")
                    message.playerId = new $util.LongBits(object.playerId.low >>> 0, object.playerId.high >>> 0).toNumber(true);
            if (object.teamInfo != null) {
                if (typeof object.teamInfo !== "object")
                    throw TypeError(".rustplus.AppTeamChanged.teamInfo: object expected");
                message.teamInfo = $root.rustplus.AppTeamInfo.fromObject(object.teamInfo, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppTeamChanged message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {rustplus.AppTeamChanged} message AppTeamChanged
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppTeamChanged.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.playerId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.playerId = options.longs === String ? "0" : 0;
                object.teamInfo = null;
            }
            if (message.playerId != null && message.hasOwnProperty("playerId"))
                if (typeof message.playerId === "number")
                    object.playerId = options.longs === String ? String(message.playerId) : message.playerId;
                else
                    object.playerId = options.longs === String ? $util.Long.prototype.toString.call(message.playerId) : options.longs === Number ? new $util.LongBits(message.playerId.low >>> 0, message.playerId.high >>> 0).toNumber(true) : message.playerId;
            if (message.teamInfo != null && message.hasOwnProperty("teamInfo"))
                object.teamInfo = $root.rustplus.AppTeamInfo.toObject(message.teamInfo, options);
            return object;
        };

        /**
         * Converts this AppTeamChanged to JSON.
         * @function toJSON
         * @memberof rustplus.AppTeamChanged
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppTeamChanged.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppTeamChanged
         * @function getTypeUrl
         * @memberof rustplus.AppTeamChanged
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppTeamChanged.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppTeamChanged";
        };

        return AppTeamChanged;
    })();

    rustplus.AppNewTeamMessage = (function() {

        /**
         * Properties of an AppNewTeamMessage.
         * @typedef {Object} rustplus.AppNewTeamMessage.$Properties
         * @property {rustplus.AppTeamMessage.$Properties} message AppNewTeamMessage message
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppNewTeamMessage.
         * @memberof rustplus
         * @interface IAppNewTeamMessage
         * @augments rustplus.AppNewTeamMessage.$Properties
         * @deprecated Use rustplus.AppNewTeamMessage.$Properties instead.
         */

        /**
         * Shape of an AppNewTeamMessage.
         * @typedef {rustplus.AppNewTeamMessage.$Properties} rustplus.AppNewTeamMessage.$Shape
         */

        /**
         * Constructs a new AppNewTeamMessage.
         * @memberof rustplus
         * @classdesc Represents an AppNewTeamMessage.
         * @constructor
         * @param {rustplus.AppNewTeamMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppNewTeamMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppNewTeamMessage message.
         * @member {rustplus.AppTeamMessage.$Properties} message
         * @memberof rustplus.AppNewTeamMessage
         * @instance
         */
        AppNewTeamMessage.prototype.message = null;

        /**
         * Creates a new AppNewTeamMessage instance using the specified properties.
         * @function create
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {rustplus.AppNewTeamMessage.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppNewTeamMessage} AppNewTeamMessage instance
         * @type {{
         *   (properties: rustplus.AppNewTeamMessage.$Shape): rustplus.AppNewTeamMessage & rustplus.AppNewTeamMessage.$Shape;
         *   (properties?: rustplus.AppNewTeamMessage.$Properties): rustplus.AppNewTeamMessage;
         * }}
         */
        AppNewTeamMessage.create = function create(properties) {
            return new AppNewTeamMessage(properties);
        };

        /**
         * Encodes the specified AppNewTeamMessage message. Does not implicitly {@link rustplus.AppNewTeamMessage.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {rustplus.AppNewTeamMessage.$Properties} message AppNewTeamMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppNewTeamMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            $root.rustplus.AppTeamMessage.encode(message.message, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppNewTeamMessage message, length delimited. Does not implicitly {@link rustplus.AppNewTeamMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {rustplus.AppNewTeamMessage.$Properties} message AppNewTeamMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppNewTeamMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppNewTeamMessage message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppNewTeamMessage & rustplus.AppNewTeamMessage.$Shape} AppNewTeamMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppNewTeamMessage.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppNewTeamMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.message = $root.rustplus.AppTeamMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.message);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("message"))
                throw $util.ProtocolError("missing required 'message'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppNewTeamMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppNewTeamMessage & rustplus.AppNewTeamMessage.$Shape} AppNewTeamMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppNewTeamMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppNewTeamMessage message.
         * @function verify
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppNewTeamMessage.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            {
                let error = $root.rustplus.AppTeamMessage.verify(message.message, _depth + 1);
                if (error)
                    return "message." + error;
            }
            return null;
        };

        /**
         * Creates an AppNewTeamMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppNewTeamMessage} AppNewTeamMessage
         */
        AppNewTeamMessage.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppNewTeamMessage)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppNewTeamMessage();
            if (object.message != null) {
                if (typeof object.message !== "object")
                    throw TypeError(".rustplus.AppNewTeamMessage.message: object expected");
                message.message = $root.rustplus.AppTeamMessage.fromObject(object.message, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppNewTeamMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {rustplus.AppNewTeamMessage} message AppNewTeamMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppNewTeamMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.message = null;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = $root.rustplus.AppTeamMessage.toObject(message.message, options);
            return object;
        };

        /**
         * Converts this AppNewTeamMessage to JSON.
         * @function toJSON
         * @memberof rustplus.AppNewTeamMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppNewTeamMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppNewTeamMessage
         * @function getTypeUrl
         * @memberof rustplus.AppNewTeamMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppNewTeamMessage.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppNewTeamMessage";
        };

        return AppNewTeamMessage;
    })();

    rustplus.AppEntityChanged = (function() {

        /**
         * Properties of an AppEntityChanged.
         * @typedef {Object} rustplus.AppEntityChanged.$Properties
         * @property {number} entityId AppEntityChanged entityId
         * @property {rustplus.AppEntityPayload.$Properties} payload AppEntityChanged payload
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppEntityChanged.
         * @memberof rustplus
         * @interface IAppEntityChanged
         * @augments rustplus.AppEntityChanged.$Properties
         * @deprecated Use rustplus.AppEntityChanged.$Properties instead.
         */

        /**
         * Shape of an AppEntityChanged.
         * @typedef {rustplus.AppEntityChanged.$Properties} rustplus.AppEntityChanged.$Shape
         */

        /**
         * Constructs a new AppEntityChanged.
         * @memberof rustplus
         * @classdesc Represents an AppEntityChanged.
         * @constructor
         * @param {rustplus.AppEntityChanged.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppEntityChanged(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppEntityChanged entityId.
         * @member {number} entityId
         * @memberof rustplus.AppEntityChanged
         * @instance
         */
        AppEntityChanged.prototype.entityId = 0;

        /**
         * AppEntityChanged payload.
         * @member {rustplus.AppEntityPayload.$Properties} payload
         * @memberof rustplus.AppEntityChanged
         * @instance
         */
        AppEntityChanged.prototype.payload = null;

        /**
         * Creates a new AppEntityChanged instance using the specified properties.
         * @function create
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {rustplus.AppEntityChanged.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppEntityChanged} AppEntityChanged instance
         * @type {{
         *   (properties: rustplus.AppEntityChanged.$Shape): rustplus.AppEntityChanged & rustplus.AppEntityChanged.$Shape;
         *   (properties?: rustplus.AppEntityChanged.$Properties): rustplus.AppEntityChanged;
         * }}
         */
        AppEntityChanged.create = function create(properties) {
            return new AppEntityChanged(properties);
        };

        /**
         * Encodes the specified AppEntityChanged message. Does not implicitly {@link rustplus.AppEntityChanged.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {rustplus.AppEntityChanged.$Properties} message AppEntityChanged message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppEntityChanged.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.entityId);
            $root.rustplus.AppEntityPayload.encode(message.payload, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppEntityChanged message, length delimited. Does not implicitly {@link rustplus.AppEntityChanged.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {rustplus.AppEntityChanged.$Properties} message AppEntityChanged message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppEntityChanged.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppEntityChanged message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppEntityChanged & rustplus.AppEntityChanged.$Shape} AppEntityChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppEntityChanged.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppEntityChanged();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.entityId = reader.uint32();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.payload = $root.rustplus.AppEntityPayload.decode(reader, reader.uint32(), undefined, _depth + 1, message.payload);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("entityId"))
                throw $util.ProtocolError("missing required 'entityId'", { instance: message });
            if (!message.hasOwnProperty("payload"))
                throw $util.ProtocolError("missing required 'payload'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppEntityChanged message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppEntityChanged & rustplus.AppEntityChanged.$Shape} AppEntityChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppEntityChanged.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppEntityChanged message.
         * @function verify
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppEntityChanged.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.entityId))
                return "entityId: integer expected";
            {
                let error = $root.rustplus.AppEntityPayload.verify(message.payload, _depth + 1);
                if (error)
                    return "payload." + error;
            }
            return null;
        };

        /**
         * Creates an AppEntityChanged message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppEntityChanged} AppEntityChanged
         */
        AppEntityChanged.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppEntityChanged)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppEntityChanged();
            if (object.entityId != null)
                message.entityId = object.entityId >>> 0;
            if (object.payload != null) {
                if (typeof object.payload !== "object")
                    throw TypeError(".rustplus.AppEntityChanged.payload: object expected");
                message.payload = $root.rustplus.AppEntityPayload.fromObject(object.payload, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppEntityChanged message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {rustplus.AppEntityChanged} message AppEntityChanged
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppEntityChanged.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.entityId = 0;
                object.payload = null;
            }
            if (message.entityId != null && message.hasOwnProperty("entityId"))
                object.entityId = message.entityId;
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = $root.rustplus.AppEntityPayload.toObject(message.payload, options);
            return object;
        };

        /**
         * Converts this AppEntityChanged to JSON.
         * @function toJSON
         * @memberof rustplus.AppEntityChanged
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppEntityChanged.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppEntityChanged
         * @function getTypeUrl
         * @memberof rustplus.AppEntityChanged
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppEntityChanged.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppEntityChanged";
        };

        return AppEntityChanged;
    })();

    rustplus.AppClanChanged = (function() {

        /**
         * Properties of an AppClanChanged.
         * @typedef {Object} rustplus.AppClanChanged.$Properties
         * @property {rustplus.ClanInfo.$Properties|null} [clanInfo] AppClanChanged clanInfo
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppClanChanged.
         * @memberof rustplus
         * @interface IAppClanChanged
         * @augments rustplus.AppClanChanged.$Properties
         * @deprecated Use rustplus.AppClanChanged.$Properties instead.
         */

        /**
         * Shape of an AppClanChanged.
         * @typedef {rustplus.AppClanChanged.$Properties} rustplus.AppClanChanged.$Shape
         */

        /**
         * Constructs a new AppClanChanged.
         * @memberof rustplus
         * @classdesc Represents an AppClanChanged.
         * @constructor
         * @param {rustplus.AppClanChanged.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppClanChanged(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppClanChanged clanInfo.
         * @member {rustplus.ClanInfo.$Properties|null|undefined} clanInfo
         * @memberof rustplus.AppClanChanged
         * @instance
         */
        AppClanChanged.prototype.clanInfo = null;

        /**
         * Creates a new AppClanChanged instance using the specified properties.
         * @function create
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {rustplus.AppClanChanged.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppClanChanged} AppClanChanged instance
         * @type {{
         *   (properties: rustplus.AppClanChanged.$Shape): rustplus.AppClanChanged & rustplus.AppClanChanged.$Shape;
         *   (properties?: rustplus.AppClanChanged.$Properties): rustplus.AppClanChanged;
         * }}
         */
        AppClanChanged.create = function create(properties) {
            return new AppClanChanged(properties);
        };

        /**
         * Encodes the specified AppClanChanged message. Does not implicitly {@link rustplus.AppClanChanged.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {rustplus.AppClanChanged.$Properties} message AppClanChanged message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppClanChanged.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.clanInfo != null && Object.hasOwnProperty.call(message, "clanInfo"))
                $root.rustplus.ClanInfo.encode(message.clanInfo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppClanChanged message, length delimited. Does not implicitly {@link rustplus.AppClanChanged.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {rustplus.AppClanChanged.$Properties} message AppClanChanged message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppClanChanged.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppClanChanged message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppClanChanged & rustplus.AppClanChanged.$Shape} AppClanChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppClanChanged.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppClanChanged();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.clanInfo = $root.rustplus.ClanInfo.decode(reader, reader.uint32(), undefined, _depth + 1, message.clanInfo);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            return message;
        };

        /**
         * Decodes an AppClanChanged message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppClanChanged & rustplus.AppClanChanged.$Shape} AppClanChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppClanChanged.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppClanChanged message.
         * @function verify
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppClanChanged.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.clanInfo != null && message.hasOwnProperty("clanInfo")) {
                let error = $root.rustplus.ClanInfo.verify(message.clanInfo, _depth + 1);
                if (error)
                    return "clanInfo." + error;
            }
            return null;
        };

        /**
         * Creates an AppClanChanged message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppClanChanged} AppClanChanged
         */
        AppClanChanged.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppClanChanged)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppClanChanged();
            if (object.clanInfo != null) {
                if (typeof object.clanInfo !== "object")
                    throw TypeError(".rustplus.AppClanChanged.clanInfo: object expected");
                message.clanInfo = $root.rustplus.ClanInfo.fromObject(object.clanInfo, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppClanChanged message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {rustplus.AppClanChanged} message AppClanChanged
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppClanChanged.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.clanInfo = null;
            if (message.clanInfo != null && message.hasOwnProperty("clanInfo"))
                object.clanInfo = $root.rustplus.ClanInfo.toObject(message.clanInfo, options);
            return object;
        };

        /**
         * Converts this AppClanChanged to JSON.
         * @function toJSON
         * @memberof rustplus.AppClanChanged
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppClanChanged.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppClanChanged
         * @function getTypeUrl
         * @memberof rustplus.AppClanChanged
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppClanChanged.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppClanChanged";
        };

        return AppClanChanged;
    })();

    rustplus.AppNewClanMessage = (function() {

        /**
         * Properties of an AppNewClanMessage.
         * @typedef {Object} rustplus.AppNewClanMessage.$Properties
         * @property {number|Long} clanId AppNewClanMessage clanId
         * @property {rustplus.AppClanMessage.$Properties} message AppNewClanMessage message
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppNewClanMessage.
         * @memberof rustplus
         * @interface IAppNewClanMessage
         * @augments rustplus.AppNewClanMessage.$Properties
         * @deprecated Use rustplus.AppNewClanMessage.$Properties instead.
         */

        /**
         * Shape of an AppNewClanMessage.
         * @typedef {rustplus.AppNewClanMessage.$Properties} rustplus.AppNewClanMessage.$Shape
         */

        /**
         * Constructs a new AppNewClanMessage.
         * @memberof rustplus
         * @classdesc Represents an AppNewClanMessage.
         * @constructor
         * @param {rustplus.AppNewClanMessage.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppNewClanMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppNewClanMessage clanId.
         * @member {number|Long} clanId
         * @memberof rustplus.AppNewClanMessage
         * @instance
         */
        AppNewClanMessage.prototype.clanId = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * AppNewClanMessage message.
         * @member {rustplus.AppClanMessage.$Properties} message
         * @memberof rustplus.AppNewClanMessage
         * @instance
         */
        AppNewClanMessage.prototype.message = null;

        /**
         * Creates a new AppNewClanMessage instance using the specified properties.
         * @function create
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {rustplus.AppNewClanMessage.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppNewClanMessage} AppNewClanMessage instance
         * @type {{
         *   (properties: rustplus.AppNewClanMessage.$Shape): rustplus.AppNewClanMessage & rustplus.AppNewClanMessage.$Shape;
         *   (properties?: rustplus.AppNewClanMessage.$Properties): rustplus.AppNewClanMessage;
         * }}
         */
        AppNewClanMessage.create = function create(properties) {
            return new AppNewClanMessage(properties);
        };

        /**
         * Encodes the specified AppNewClanMessage message. Does not implicitly {@link rustplus.AppNewClanMessage.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {rustplus.AppNewClanMessage.$Properties} message AppNewClanMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppNewClanMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.clanId);
            $root.rustplus.AppClanMessage.encode(message.message, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppNewClanMessage message, length delimited. Does not implicitly {@link rustplus.AppNewClanMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {rustplus.AppNewClanMessage.$Properties} message AppNewClanMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppNewClanMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppNewClanMessage message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppNewClanMessage & rustplus.AppNewClanMessage.$Shape} AppNewClanMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppNewClanMessage.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppNewClanMessage();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.clanId = reader.int64();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.message = $root.rustplus.AppClanMessage.decode(reader, reader.uint32(), undefined, _depth + 1, message.message);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("clanId"))
                throw $util.ProtocolError("missing required 'clanId'", { instance: message });
            if (!message.hasOwnProperty("message"))
                throw $util.ProtocolError("missing required 'message'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppNewClanMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppNewClanMessage & rustplus.AppNewClanMessage.$Shape} AppNewClanMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppNewClanMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppNewClanMessage message.
         * @function verify
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppNewClanMessage.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.clanId) && !(message.clanId && $util.isInteger(message.clanId.low) && $util.isInteger(message.clanId.high)))
                return "clanId: integer|Long expected";
            {
                let error = $root.rustplus.AppClanMessage.verify(message.message, _depth + 1);
                if (error)
                    return "message." + error;
            }
            return null;
        };

        /**
         * Creates an AppNewClanMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppNewClanMessage} AppNewClanMessage
         */
        AppNewClanMessage.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppNewClanMessage)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppNewClanMessage();
            if (object.clanId != null)
                if ($util.Long)
                    (message.clanId = $util.Long.fromValue(object.clanId)).unsigned = false;
                else if (typeof object.clanId === "string")
                    message.clanId = parseInt(object.clanId, 10);
                else if (typeof object.clanId === "number")
                    message.clanId = object.clanId;
                else if (typeof object.clanId === "object")
                    message.clanId = new $util.LongBits(object.clanId.low >>> 0, object.clanId.high >>> 0).toNumber();
            if (object.message != null) {
                if (typeof object.message !== "object")
                    throw TypeError(".rustplus.AppNewClanMessage.message: object expected");
                message.message = $root.rustplus.AppClanMessage.fromObject(object.message, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppNewClanMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {rustplus.AppNewClanMessage} message AppNewClanMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppNewClanMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.clanId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.clanId = options.longs === String ? "0" : 0;
                object.message = null;
            }
            if (message.clanId != null && message.hasOwnProperty("clanId"))
                if (typeof message.clanId === "number")
                    object.clanId = options.longs === String ? String(message.clanId) : message.clanId;
                else
                    object.clanId = options.longs === String ? $util.Long.prototype.toString.call(message.clanId) : options.longs === Number ? new $util.LongBits(message.clanId.low >>> 0, message.clanId.high >>> 0).toNumber() : message.clanId;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = $root.rustplus.AppClanMessage.toObject(message.message, options);
            return object;
        };

        /**
         * Converts this AppNewClanMessage to JSON.
         * @function toJSON
         * @memberof rustplus.AppNewClanMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppNewClanMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppNewClanMessage
         * @function getTypeUrl
         * @memberof rustplus.AppNewClanMessage
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppNewClanMessage.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppNewClanMessage";
        };

        return AppNewClanMessage;
    })();

    rustplus.AppCameraSubscribe = (function() {

        /**
         * Properties of an AppCameraSubscribe.
         * @typedef {Object} rustplus.AppCameraSubscribe.$Properties
         * @property {string} cameraId AppCameraSubscribe cameraId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppCameraSubscribe.
         * @memberof rustplus
         * @interface IAppCameraSubscribe
         * @augments rustplus.AppCameraSubscribe.$Properties
         * @deprecated Use rustplus.AppCameraSubscribe.$Properties instead.
         */

        /**
         * Shape of an AppCameraSubscribe.
         * @typedef {rustplus.AppCameraSubscribe.$Properties} rustplus.AppCameraSubscribe.$Shape
         */

        /**
         * Constructs a new AppCameraSubscribe.
         * @memberof rustplus
         * @classdesc Represents an AppCameraSubscribe.
         * @constructor
         * @param {rustplus.AppCameraSubscribe.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppCameraSubscribe(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppCameraSubscribe cameraId.
         * @member {string} cameraId
         * @memberof rustplus.AppCameraSubscribe
         * @instance
         */
        AppCameraSubscribe.prototype.cameraId = "";

        /**
         * Creates a new AppCameraSubscribe instance using the specified properties.
         * @function create
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {rustplus.AppCameraSubscribe.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppCameraSubscribe} AppCameraSubscribe instance
         * @type {{
         *   (properties: rustplus.AppCameraSubscribe.$Shape): rustplus.AppCameraSubscribe & rustplus.AppCameraSubscribe.$Shape;
         *   (properties?: rustplus.AppCameraSubscribe.$Properties): rustplus.AppCameraSubscribe;
         * }}
         */
        AppCameraSubscribe.create = function create(properties) {
            return new AppCameraSubscribe(properties);
        };

        /**
         * Encodes the specified AppCameraSubscribe message. Does not implicitly {@link rustplus.AppCameraSubscribe.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {rustplus.AppCameraSubscribe.$Properties} message AppCameraSubscribe message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppCameraSubscribe.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.cameraId);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppCameraSubscribe message, length delimited. Does not implicitly {@link rustplus.AppCameraSubscribe.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {rustplus.AppCameraSubscribe.$Properties} message AppCameraSubscribe message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppCameraSubscribe.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppCameraSubscribe message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppCameraSubscribe & rustplus.AppCameraSubscribe.$Shape} AppCameraSubscribe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppCameraSubscribe.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppCameraSubscribe();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.cameraId = reader.string();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("cameraId"))
                throw $util.ProtocolError("missing required 'cameraId'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppCameraSubscribe message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppCameraSubscribe & rustplus.AppCameraSubscribe.$Shape} AppCameraSubscribe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppCameraSubscribe.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppCameraSubscribe message.
         * @function verify
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppCameraSubscribe.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isString(message.cameraId))
                return "cameraId: string expected";
            return null;
        };

        /**
         * Creates an AppCameraSubscribe message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppCameraSubscribe} AppCameraSubscribe
         */
        AppCameraSubscribe.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppCameraSubscribe)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppCameraSubscribe();
            if (object.cameraId != null)
                message.cameraId = String(object.cameraId);
            return message;
        };

        /**
         * Creates a plain object from an AppCameraSubscribe message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {rustplus.AppCameraSubscribe} message AppCameraSubscribe
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppCameraSubscribe.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.cameraId = "";
            if (message.cameraId != null && message.hasOwnProperty("cameraId"))
                object.cameraId = message.cameraId;
            return object;
        };

        /**
         * Converts this AppCameraSubscribe to JSON.
         * @function toJSON
         * @memberof rustplus.AppCameraSubscribe
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppCameraSubscribe.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppCameraSubscribe
         * @function getTypeUrl
         * @memberof rustplus.AppCameraSubscribe
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppCameraSubscribe.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppCameraSubscribe";
        };

        return AppCameraSubscribe;
    })();

    rustplus.AppCameraInput = (function() {

        /**
         * Properties of an AppCameraInput.
         * @typedef {Object} rustplus.AppCameraInput.$Properties
         * @property {number} buttons AppCameraInput buttons
         * @property {rustplus.Vector2.$Properties} mouseDelta AppCameraInput mouseDelta
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppCameraInput.
         * @memberof rustplus
         * @interface IAppCameraInput
         * @augments rustplus.AppCameraInput.$Properties
         * @deprecated Use rustplus.AppCameraInput.$Properties instead.
         */

        /**
         * Shape of an AppCameraInput.
         * @typedef {rustplus.AppCameraInput.$Properties} rustplus.AppCameraInput.$Shape
         */

        /**
         * Constructs a new AppCameraInput.
         * @memberof rustplus
         * @classdesc Represents an AppCameraInput.
         * @constructor
         * @param {rustplus.AppCameraInput.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppCameraInput(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppCameraInput buttons.
         * @member {number} buttons
         * @memberof rustplus.AppCameraInput
         * @instance
         */
        AppCameraInput.prototype.buttons = 0;

        /**
         * AppCameraInput mouseDelta.
         * @member {rustplus.Vector2.$Properties} mouseDelta
         * @memberof rustplus.AppCameraInput
         * @instance
         */
        AppCameraInput.prototype.mouseDelta = null;

        /**
         * Creates a new AppCameraInput instance using the specified properties.
         * @function create
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {rustplus.AppCameraInput.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppCameraInput} AppCameraInput instance
         * @type {{
         *   (properties: rustplus.AppCameraInput.$Shape): rustplus.AppCameraInput & rustplus.AppCameraInput.$Shape;
         *   (properties?: rustplus.AppCameraInput.$Properties): rustplus.AppCameraInput;
         * }}
         */
        AppCameraInput.create = function create(properties) {
            return new AppCameraInput(properties);
        };

        /**
         * Encodes the specified AppCameraInput message. Does not implicitly {@link rustplus.AppCameraInput.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {rustplus.AppCameraInput.$Properties} message AppCameraInput message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppCameraInput.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.buttons);
            $root.rustplus.Vector2.encode(message.mouseDelta, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppCameraInput message, length delimited. Does not implicitly {@link rustplus.AppCameraInput.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {rustplus.AppCameraInput.$Properties} message AppCameraInput message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppCameraInput.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppCameraInput message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppCameraInput & rustplus.AppCameraInput.$Shape} AppCameraInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppCameraInput.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppCameraInput();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.buttons = reader.int32();
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.mouseDelta = $root.rustplus.Vector2.decode(reader, reader.uint32(), undefined, _depth + 1, message.mouseDelta);
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("buttons"))
                throw $util.ProtocolError("missing required 'buttons'", { instance: message });
            if (!message.hasOwnProperty("mouseDelta"))
                throw $util.ProtocolError("missing required 'mouseDelta'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppCameraInput message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppCameraInput & rustplus.AppCameraInput.$Shape} AppCameraInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppCameraInput.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppCameraInput message.
         * @function verify
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppCameraInput.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.buttons))
                return "buttons: integer expected";
            {
                let error = $root.rustplus.Vector2.verify(message.mouseDelta, _depth + 1);
                if (error)
                    return "mouseDelta." + error;
            }
            return null;
        };

        /**
         * Creates an AppCameraInput message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppCameraInput} AppCameraInput
         */
        AppCameraInput.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppCameraInput)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppCameraInput();
            if (object.buttons != null)
                message.buttons = object.buttons | 0;
            if (object.mouseDelta != null) {
                if (typeof object.mouseDelta !== "object")
                    throw TypeError(".rustplus.AppCameraInput.mouseDelta: object expected");
                message.mouseDelta = $root.rustplus.Vector2.fromObject(object.mouseDelta, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from an AppCameraInput message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {rustplus.AppCameraInput} message AppCameraInput
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppCameraInput.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.buttons = 0;
                object.mouseDelta = null;
            }
            if (message.buttons != null && message.hasOwnProperty("buttons"))
                object.buttons = message.buttons;
            if (message.mouseDelta != null && message.hasOwnProperty("mouseDelta"))
                object.mouseDelta = $root.rustplus.Vector2.toObject(message.mouseDelta, options);
            return object;
        };

        /**
         * Converts this AppCameraInput to JSON.
         * @function toJSON
         * @memberof rustplus.AppCameraInput
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppCameraInput.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppCameraInput
         * @function getTypeUrl
         * @memberof rustplus.AppCameraInput
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppCameraInput.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppCameraInput";
        };

        return AppCameraInput;
    })();

    rustplus.AppCameraInfo = (function() {

        /**
         * Properties of an AppCameraInfo.
         * @typedef {Object} rustplus.AppCameraInfo.$Properties
         * @property {number} width AppCameraInfo width
         * @property {number} height AppCameraInfo height
         * @property {number} nearPlane AppCameraInfo nearPlane
         * @property {number} farPlane AppCameraInfo farPlane
         * @property {number} controlFlags AppCameraInfo controlFlags
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppCameraInfo.
         * @memberof rustplus
         * @interface IAppCameraInfo
         * @augments rustplus.AppCameraInfo.$Properties
         * @deprecated Use rustplus.AppCameraInfo.$Properties instead.
         */

        /**
         * Shape of an AppCameraInfo.
         * @typedef {rustplus.AppCameraInfo.$Properties} rustplus.AppCameraInfo.$Shape
         */

        /**
         * Constructs a new AppCameraInfo.
         * @memberof rustplus
         * @classdesc Represents an AppCameraInfo.
         * @constructor
         * @param {rustplus.AppCameraInfo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppCameraInfo(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppCameraInfo width.
         * @member {number} width
         * @memberof rustplus.AppCameraInfo
         * @instance
         */
        AppCameraInfo.prototype.width = 0;

        /**
         * AppCameraInfo height.
         * @member {number} height
         * @memberof rustplus.AppCameraInfo
         * @instance
         */
        AppCameraInfo.prototype.height = 0;

        /**
         * AppCameraInfo nearPlane.
         * @member {number} nearPlane
         * @memberof rustplus.AppCameraInfo
         * @instance
         */
        AppCameraInfo.prototype.nearPlane = 0;

        /**
         * AppCameraInfo farPlane.
         * @member {number} farPlane
         * @memberof rustplus.AppCameraInfo
         * @instance
         */
        AppCameraInfo.prototype.farPlane = 0;

        /**
         * AppCameraInfo controlFlags.
         * @member {number} controlFlags
         * @memberof rustplus.AppCameraInfo
         * @instance
         */
        AppCameraInfo.prototype.controlFlags = 0;

        /**
         * Creates a new AppCameraInfo instance using the specified properties.
         * @function create
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {rustplus.AppCameraInfo.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppCameraInfo} AppCameraInfo instance
         * @type {{
         *   (properties: rustplus.AppCameraInfo.$Shape): rustplus.AppCameraInfo & rustplus.AppCameraInfo.$Shape;
         *   (properties?: rustplus.AppCameraInfo.$Properties): rustplus.AppCameraInfo;
         * }}
         */
        AppCameraInfo.create = function create(properties) {
            return new AppCameraInfo(properties);
        };

        /**
         * Encodes the specified AppCameraInfo message. Does not implicitly {@link rustplus.AppCameraInfo.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {rustplus.AppCameraInfo.$Properties} message AppCameraInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppCameraInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.width);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.height);
            writer.uint32(/* id 3, wireType 5 =*/29).float(message.nearPlane);
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.farPlane);
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.controlFlags);
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppCameraInfo message, length delimited. Does not implicitly {@link rustplus.AppCameraInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {rustplus.AppCameraInfo.$Properties} message AppCameraInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppCameraInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppCameraInfo message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppCameraInfo & rustplus.AppCameraInfo.$Shape} AppCameraInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppCameraInfo.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppCameraInfo();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        message.width = reader.int32();
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.height = reader.int32();
                        continue;
                    }
                case 3: {
                        if (wireType !== 5)
                            break;
                        message.nearPlane = reader.float();
                        continue;
                    }
                case 4: {
                        if (wireType !== 5)
                            break;
                        message.farPlane = reader.float();
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        message.controlFlags = reader.int32();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("width"))
                throw $util.ProtocolError("missing required 'width'", { instance: message });
            if (!message.hasOwnProperty("height"))
                throw $util.ProtocolError("missing required 'height'", { instance: message });
            if (!message.hasOwnProperty("nearPlane"))
                throw $util.ProtocolError("missing required 'nearPlane'", { instance: message });
            if (!message.hasOwnProperty("farPlane"))
                throw $util.ProtocolError("missing required 'farPlane'", { instance: message });
            if (!message.hasOwnProperty("controlFlags"))
                throw $util.ProtocolError("missing required 'controlFlags'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppCameraInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppCameraInfo & rustplus.AppCameraInfo.$Shape} AppCameraInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppCameraInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppCameraInfo message.
         * @function verify
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppCameraInfo.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (!$util.isInteger(message.width))
                return "width: integer expected";
            if (!$util.isInteger(message.height))
                return "height: integer expected";
            if (typeof message.nearPlane !== "number")
                return "nearPlane: number expected";
            if (typeof message.farPlane !== "number")
                return "farPlane: number expected";
            if (!$util.isInteger(message.controlFlags))
                return "controlFlags: integer expected";
            return null;
        };

        /**
         * Creates an AppCameraInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppCameraInfo} AppCameraInfo
         */
        AppCameraInfo.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppCameraInfo)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppCameraInfo();
            if (object.width != null)
                message.width = object.width | 0;
            if (object.height != null)
                message.height = object.height | 0;
            if (object.nearPlane != null)
                message.nearPlane = Number(object.nearPlane);
            if (object.farPlane != null)
                message.farPlane = Number(object.farPlane);
            if (object.controlFlags != null)
                message.controlFlags = object.controlFlags | 0;
            return message;
        };

        /**
         * Creates a plain object from an AppCameraInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {rustplus.AppCameraInfo} message AppCameraInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppCameraInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.width = 0;
                object.height = 0;
                object.nearPlane = 0;
                object.farPlane = 0;
                object.controlFlags = 0;
            }
            if (message.width != null && message.hasOwnProperty("width"))
                object.width = message.width;
            if (message.height != null && message.hasOwnProperty("height"))
                object.height = message.height;
            if (message.nearPlane != null && message.hasOwnProperty("nearPlane"))
                object.nearPlane = options.json && !isFinite(message.nearPlane) ? String(message.nearPlane) : message.nearPlane;
            if (message.farPlane != null && message.hasOwnProperty("farPlane"))
                object.farPlane = options.json && !isFinite(message.farPlane) ? String(message.farPlane) : message.farPlane;
            if (message.controlFlags != null && message.hasOwnProperty("controlFlags"))
                object.controlFlags = message.controlFlags;
            return object;
        };

        /**
         * Converts this AppCameraInfo to JSON.
         * @function toJSON
         * @memberof rustplus.AppCameraInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppCameraInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppCameraInfo
         * @function getTypeUrl
         * @memberof rustplus.AppCameraInfo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppCameraInfo.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppCameraInfo";
        };

        return AppCameraInfo;
    })();

    rustplus.AppCameraRays = (function() {

        /**
         * Properties of an AppCameraRays.
         * @typedef {Object} rustplus.AppCameraRays.$Properties
         * @property {number} verticalFov AppCameraRays verticalFov
         * @property {number} sampleOffset AppCameraRays sampleOffset
         * @property {Uint8Array} rayData AppCameraRays rayData
         * @property {number} distance AppCameraRays distance
         * @property {Array.<rustplus.AppCameraRays.Entity.$Properties>|null} [entities] AppCameraRays entities
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */

        /**
         * Properties of an AppCameraRays.
         * @memberof rustplus
         * @interface IAppCameraRays
         * @augments rustplus.AppCameraRays.$Properties
         * @deprecated Use rustplus.AppCameraRays.$Properties instead.
         */

        /**
         * Shape of an AppCameraRays.
         * @typedef {rustplus.AppCameraRays.$Properties} rustplus.AppCameraRays.$Shape
         */

        /**
         * Constructs a new AppCameraRays.
         * @memberof rustplus
         * @classdesc Represents an AppCameraRays.
         * @constructor
         * @param {rustplus.AppCameraRays.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
         */
        function AppCameraRays(properties) {
            this.entities = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AppCameraRays verticalFov.
         * @member {number} verticalFov
         * @memberof rustplus.AppCameraRays
         * @instance
         */
        AppCameraRays.prototype.verticalFov = 0;

        /**
         * AppCameraRays sampleOffset.
         * @member {number} sampleOffset
         * @memberof rustplus.AppCameraRays
         * @instance
         */
        AppCameraRays.prototype.sampleOffset = 0;

        /**
         * AppCameraRays rayData.
         * @member {Uint8Array} rayData
         * @memberof rustplus.AppCameraRays
         * @instance
         */
        AppCameraRays.prototype.rayData = $util.newBuffer([]);

        /**
         * AppCameraRays distance.
         * @member {number} distance
         * @memberof rustplus.AppCameraRays
         * @instance
         */
        AppCameraRays.prototype.distance = 0;

        /**
         * AppCameraRays entities.
         * @member {Array.<rustplus.AppCameraRays.Entity.$Properties>} entities
         * @memberof rustplus.AppCameraRays
         * @instance
         */
        AppCameraRays.prototype.entities = $util.emptyArray;

        /**
         * Creates a new AppCameraRays instance using the specified properties.
         * @function create
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {rustplus.AppCameraRays.$Properties=} [properties] Properties to set
         * @returns {rustplus.AppCameraRays} AppCameraRays instance
         * @type {{
         *   (properties: rustplus.AppCameraRays.$Shape): rustplus.AppCameraRays & rustplus.AppCameraRays.$Shape;
         *   (properties?: rustplus.AppCameraRays.$Properties): rustplus.AppCameraRays;
         * }}
         */
        AppCameraRays.create = function create(properties) {
            return new AppCameraRays(properties);
        };

        /**
         * Encodes the specified AppCameraRays message. Does not implicitly {@link rustplus.AppCameraRays.verify|verify} messages.
         * @function encode
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {rustplus.AppCameraRays.$Properties} message AppCameraRays message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppCameraRays.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 5 =*/13).float(message.verticalFov);
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sampleOffset);
            writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.rayData);
            writer.uint32(/* id 4, wireType 5 =*/37).float(message.distance);
            if (message.entities != null && message.entities.length)
                for (let i = 0; i < message.entities.length; ++i)
                    $root.rustplus.AppCameraRays.Entity.encode(message.entities[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified AppCameraRays message, length delimited. Does not implicitly {@link rustplus.AppCameraRays.verify|verify} messages.
         * @function encodeDelimited
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {rustplus.AppCameraRays.$Properties} message AppCameraRays message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AppCameraRays.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AppCameraRays message from the specified reader or buffer.
         * @function decode
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {rustplus.AppCameraRays & rustplus.AppCameraRays.$Shape} AppCameraRays
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppCameraRays.decode = function decode(reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw Error("max depth exceeded");
            let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppCameraRays();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.uint32();
                if (tag === _end) {
                    _end = undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 5)
                            break;
                        message.verticalFov = reader.float();
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.sampleOffset = reader.int32();
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        message.rayData = reader.bytes();
                        continue;
                    }
                case 4: {
                        if (wireType !== 5)
                            break;
                        message.distance = reader.float();
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        if (!(message.entities && message.entities.length))
                            message.entities = [];
                        message.entities.push($root.rustplus.AppCameraRays.Entity.decode(reader, reader.uint32(), undefined, _depth + 1));
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                $util.makeProp(message, "$unknowns", false);
                (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
            }
            if (_end !== undefined)
                throw Error("missing end group");
            if (!message.hasOwnProperty("verticalFov"))
                throw $util.ProtocolError("missing required 'verticalFov'", { instance: message });
            if (!message.hasOwnProperty("sampleOffset"))
                throw $util.ProtocolError("missing required 'sampleOffset'", { instance: message });
            if (!message.hasOwnProperty("rayData"))
                throw $util.ProtocolError("missing required 'rayData'", { instance: message });
            if (!message.hasOwnProperty("distance"))
                throw $util.ProtocolError("missing required 'distance'", { instance: message });
            return message;
        };

        /**
         * Decodes an AppCameraRays message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {rustplus.AppCameraRays & rustplus.AppCameraRays.$Shape} AppCameraRays
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AppCameraRays.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AppCameraRays message.
         * @function verify
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AppCameraRays.verify = function verify(message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (typeof message.verticalFov !== "number")
                return "verticalFov: number expected";
            if (!$util.isInteger(message.sampleOffset))
                return "sampleOffset: integer expected";
            if (!(message.rayData && typeof message.rayData.length === "number" || $util.isString(message.rayData)))
                return "rayData: buffer expected";
            if (typeof message.distance !== "number")
                return "distance: number expected";
            if (message.entities != null && message.hasOwnProperty("entities")) {
                if (!Array.isArray(message.entities))
                    return "entities: array expected";
                for (let i = 0; i < message.entities.length; ++i) {
                    let error = $root.rustplus.AppCameraRays.Entity.verify(message.entities[i], _depth + 1);
                    if (error)
                        return "entities." + error;
                }
            }
            return null;
        };

        /**
         * Creates an AppCameraRays message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {rustplus.AppCameraRays} AppCameraRays
         */
        AppCameraRays.fromObject = function fromObject(object, _depth) {
            if (object instanceof $root.rustplus.AppCameraRays)
                return object;
            if (_depth === undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw Error("max depth exceeded");
            let message = new $root.rustplus.AppCameraRays();
            if (object.verticalFov != null)
                message.verticalFov = Number(object.verticalFov);
            if (object.sampleOffset != null)
                message.sampleOffset = object.sampleOffset | 0;
            if (object.rayData != null)
                if (typeof object.rayData === "string")
                    $util.base64.decode(object.rayData, message.rayData = $util.newBuffer($util.base64.length(object.rayData)), 0);
                else if (object.rayData.length >= 0)
                    message.rayData = object.rayData;
            if (object.distance != null)
                message.distance = Number(object.distance);
            if (object.entities) {
                if (!Array.isArray(object.entities))
                    throw TypeError(".rustplus.AppCameraRays.entities: array expected");
                message.entities = Array(object.entities.length);
                for (let i = 0; i < object.entities.length; ++i) {
                    if (typeof object.entities[i] !== "object")
                        throw TypeError(".rustplus.AppCameraRays.entities: object expected");
                    message.entities[i] = $root.rustplus.AppCameraRays.Entity.fromObject(object.entities[i], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from an AppCameraRays message. Also converts values to other types if specified.
         * @function toObject
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {rustplus.AppCameraRays} message AppCameraRays
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AppCameraRays.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.entities = [];
            if (options.defaults) {
                object.verticalFov = 0;
                object.sampleOffset = 0;
                if (options.bytes === String)
                    object.rayData = "";
                else {
                    object.rayData = [];
                    if (options.bytes !== Array)
                        object.rayData = $util.newBuffer(object.rayData);
                }
                object.distance = 0;
            }
            if (message.verticalFov != null && message.hasOwnProperty("verticalFov"))
                object.verticalFov = options.json && !isFinite(message.verticalFov) ? String(message.verticalFov) : message.verticalFov;
            if (message.sampleOffset != null && message.hasOwnProperty("sampleOffset"))
                object.sampleOffset = message.sampleOffset;
            if (message.rayData != null && message.hasOwnProperty("rayData"))
                object.rayData = options.bytes === String ? $util.base64.encode(message.rayData, 0, message.rayData.length) : options.bytes === Array ? Array.prototype.slice.call(message.rayData) : message.rayData;
            if (message.distance != null && message.hasOwnProperty("distance"))
                object.distance = options.json && !isFinite(message.distance) ? String(message.distance) : message.distance;
            if (message.entities && message.entities.length) {
                object.entities = Array(message.entities.length);
                for (let j = 0; j < message.entities.length; ++j)
                    object.entities[j] = $root.rustplus.AppCameraRays.Entity.toObject(message.entities[j], options);
            }
            return object;
        };

        /**
         * Converts this AppCameraRays to JSON.
         * @function toJSON
         * @memberof rustplus.AppCameraRays
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AppCameraRays.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for AppCameraRays
         * @function getTypeUrl
         * @memberof rustplus.AppCameraRays
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        AppCameraRays.getTypeUrl = function getTypeUrl(prefix) {
            if (prefix === undefined)
                prefix = "type.googleapis.com";
            return prefix + "/rustplus.AppCameraRays";
        };

        /**
         * EntityType enum.
         * @name rustplus.AppCameraRays.EntityType
         * @enum {number}
         * @property {number} Tree=1 Tree value
         * @property {number} Player=2 Player value
         */
        AppCameraRays.EntityType = (function() {
            const valuesById = {}, values = Object.create(valuesById);
            values[valuesById[1] = "Tree"] = 1;
            values[valuesById[2] = "Player"] = 2;
            return values;
        })();

        AppCameraRays.Entity = (function() {

            /**
             * Properties of an Entity.
             * @typedef {Object} rustplus.AppCameraRays.Entity.$Properties
             * @property {number} entityId Entity entityId
             * @property {rustplus.AppCameraRays.EntityType} type Entity type
             * @property {rustplus.Vector3.$Properties} position Entity position
             * @property {rustplus.Vector3.$Properties} rotation Entity rotation
             * @property {rustplus.Vector3.$Properties} size Entity size
             * @property {string|null} [name] Entity name
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */

            /**
             * Properties of an Entity.
             * @memberof rustplus.AppCameraRays
             * @interface IEntity
             * @augments rustplus.AppCameraRays.Entity.$Properties
             * @deprecated Use rustplus.AppCameraRays.Entity.$Properties instead.
             */

            /**
             * Shape of an Entity.
             * @typedef {rustplus.AppCameraRays.Entity.$Properties} rustplus.AppCameraRays.Entity.$Shape
             */

            /**
             * Constructs a new Entity.
             * @memberof rustplus.AppCameraRays
             * @classdesc Represents an Entity.
             * @constructor
             * @param {rustplus.AppCameraRays.Entity.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding
             */
            function Entity(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Entity entityId.
             * @member {number} entityId
             * @memberof rustplus.AppCameraRays.Entity
             * @instance
             */
            Entity.prototype.entityId = 0;

            /**
             * Entity type.
             * @member {rustplus.AppCameraRays.EntityType} type
             * @memberof rustplus.AppCameraRays.Entity
             * @instance
             */
            Entity.prototype.type = 1;

            /**
             * Entity position.
             * @member {rustplus.Vector3.$Properties} position
             * @memberof rustplus.AppCameraRays.Entity
             * @instance
             */
            Entity.prototype.position = null;

            /**
             * Entity rotation.
             * @member {rustplus.Vector3.$Properties} rotation
             * @memberof rustplus.AppCameraRays.Entity
             * @instance
             */
            Entity.prototype.rotation = null;

            /**
             * Entity size.
             * @member {rustplus.Vector3.$Properties} size
             * @memberof rustplus.AppCameraRays.Entity
             * @instance
             */
            Entity.prototype.size = null;

            /**
             * Entity name.
             * @member {string} name
             * @memberof rustplus.AppCameraRays.Entity
             * @instance
             */
            Entity.prototype.name = "";

            /**
             * Creates a new Entity instance using the specified properties.
             * @function create
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {rustplus.AppCameraRays.Entity.$Properties=} [properties] Properties to set
             * @returns {rustplus.AppCameraRays.Entity} Entity instance
             * @type {{
             *   (properties: rustplus.AppCameraRays.Entity.$Shape): rustplus.AppCameraRays.Entity & rustplus.AppCameraRays.Entity.$Shape;
             *   (properties?: rustplus.AppCameraRays.Entity.$Properties): rustplus.AppCameraRays.Entity;
             * }}
             */
            Entity.create = function create(properties) {
                return new Entity(properties);
            };

            /**
             * Encodes the specified Entity message. Does not implicitly {@link rustplus.AppCameraRays.Entity.verify|verify} messages.
             * @function encode
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {rustplus.AppCameraRays.Entity.$Properties} message Entity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Entity.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.entityId);
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                $root.rustplus.Vector3.encode(message.position, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                $root.rustplus.Vector3.encode(message.rotation, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                $root.rustplus.Vector3.encode(message.size, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 6, wireType 2 =*/50).string(message.name);
                if (message.$unknowns != null && Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Entity message, length delimited. Does not implicitly {@link rustplus.AppCameraRays.Entity.verify|verify} messages.
             * @function encodeDelimited
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {rustplus.AppCameraRays.Entity.$Properties} message Entity message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Entity.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Entity message from the specified reader or buffer.
             * @function decode
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {rustplus.AppCameraRays.Entity & rustplus.AppCameraRays.Entity.$Shape} Entity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Entity.decode = function decode(reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw Error("max depth exceeded");
                let end = length === undefined ? reader.len : reader.pos + length, message = _target || new $root.rustplus.AppCameraRays.Entity();
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.uint32();
                    if (tag === _end) {
                        _end = undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            message.entityId = reader.uint32();
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            message.type = reader.int32();
                            continue;
                        }
                    case 3: {
                            if (wireType !== 2)
                                break;
                            message.position = $root.rustplus.Vector3.decode(reader, reader.uint32(), undefined, _depth + 1, message.position);
                            continue;
                        }
                    case 4: {
                            if (wireType !== 2)
                                break;
                            message.rotation = $root.rustplus.Vector3.decode(reader, reader.uint32(), undefined, _depth + 1, message.rotation);
                            continue;
                        }
                    case 5: {
                            if (wireType !== 2)
                                break;
                            message.size = $root.rustplus.Vector3.decode(reader, reader.uint32(), undefined, _depth + 1, message.size);
                            continue;
                        }
                    case 6: {
                            if (wireType !== 2)
                                break;
                            message.name = reader.string();
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.buf.slice(start, reader.pos));
                }
                if (_end !== undefined)
                    throw Error("missing end group");
                if (!message.hasOwnProperty("entityId"))
                    throw $util.ProtocolError("missing required 'entityId'", { instance: message });
                if (!message.hasOwnProperty("type"))
                    throw $util.ProtocolError("missing required 'type'", { instance: message });
                if (!message.hasOwnProperty("position"))
                    throw $util.ProtocolError("missing required 'position'", { instance: message });
                if (!message.hasOwnProperty("rotation"))
                    throw $util.ProtocolError("missing required 'rotation'", { instance: message });
                if (!message.hasOwnProperty("size"))
                    throw $util.ProtocolError("missing required 'size'", { instance: message });
                return message;
            };

            /**
             * Decodes an Entity message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {rustplus.AppCameraRays.Entity & rustplus.AppCameraRays.Entity.$Shape} Entity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Entity.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Entity message.
             * @function verify
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Entity.verify = function verify(message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (!$util.isInteger(message.entityId))
                    return "entityId: integer expected";
                switch (message.type) {
                default:
                    return "type: enum value expected";
                case 1:
                case 2:
                    break;
                }
                {
                    let error = $root.rustplus.Vector3.verify(message.position, _depth + 1);
                    if (error)
                        return "position." + error;
                }
                {
                    let error = $root.rustplus.Vector3.verify(message.rotation, _depth + 1);
                    if (error)
                        return "rotation." + error;
                }
                {
                    let error = $root.rustplus.Vector3.verify(message.size, _depth + 1);
                    if (error)
                        return "size." + error;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                return null;
            };

            /**
             * Creates an Entity message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {rustplus.AppCameraRays.Entity} Entity
             */
            Entity.fromObject = function fromObject(object, _depth) {
                if (object instanceof $root.rustplus.AppCameraRays.Entity)
                    return object;
                if (_depth === undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw Error("max depth exceeded");
                let message = new $root.rustplus.AppCameraRays.Entity();
                if (object.entityId != null)
                    message.entityId = object.entityId >>> 0;
                switch (object.type) {
                default:
                    if (typeof object.type === "number") {
                        message.type = object.type;
                        break;
                    }
                    break;
                case "Tree":
                case 1:
                    message.type = 1;
                    break;
                case "Player":
                case 2:
                    message.type = 2;
                    break;
                }
                if (object.position != null) {
                    if (typeof object.position !== "object")
                        throw TypeError(".rustplus.AppCameraRays.Entity.position: object expected");
                    message.position = $root.rustplus.Vector3.fromObject(object.position, _depth + 1);
                }
                if (object.rotation != null) {
                    if (typeof object.rotation !== "object")
                        throw TypeError(".rustplus.AppCameraRays.Entity.rotation: object expected");
                    message.rotation = $root.rustplus.Vector3.fromObject(object.rotation, _depth + 1);
                }
                if (object.size != null) {
                    if (typeof object.size !== "object")
                        throw TypeError(".rustplus.AppCameraRays.Entity.size: object expected");
                    message.size = $root.rustplus.Vector3.fromObject(object.size, _depth + 1);
                }
                if (object.name != null)
                    message.name = String(object.name);
                return message;
            };

            /**
             * Creates a plain object from an Entity message. Also converts values to other types if specified.
             * @function toObject
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {rustplus.AppCameraRays.Entity} message Entity
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Entity.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.entityId = 0;
                    object.type = options.enums === String ? "Tree" : 1;
                    object.position = null;
                    object.rotation = null;
                    object.size = null;
                    object.name = "";
                }
                if (message.entityId != null && message.hasOwnProperty("entityId"))
                    object.entityId = message.entityId;
                if (message.type != null && message.hasOwnProperty("type"))
                    object.type = options.enums === String ? $root.rustplus.AppCameraRays.EntityType[message.type] === undefined ? message.type : $root.rustplus.AppCameraRays.EntityType[message.type] : message.type;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = $root.rustplus.Vector3.toObject(message.position, options);
                if (message.rotation != null && message.hasOwnProperty("rotation"))
                    object.rotation = $root.rustplus.Vector3.toObject(message.rotation, options);
                if (message.size != null && message.hasOwnProperty("size"))
                    object.size = $root.rustplus.Vector3.toObject(message.size, options);
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                return object;
            };

            /**
             * Converts this Entity to JSON.
             * @function toJSON
             * @memberof rustplus.AppCameraRays.Entity
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Entity.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Entity
             * @function getTypeUrl
             * @memberof rustplus.AppCameraRays.Entity
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Entity.getTypeUrl = function getTypeUrl(prefix) {
                if (prefix === undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/rustplus.AppCameraRays.Entity";
            };

            return Entity;
        })();

        return AppCameraRays;
    })();

    return rustplus;
})();

export default $root;
