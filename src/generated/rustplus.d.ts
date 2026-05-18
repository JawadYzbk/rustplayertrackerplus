import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace rustplus. */
export namespace rustplus {

    /**
     * Properties of a Vector2.
     * @deprecated Use rustplus.Vector2.$Properties instead.
     */
    interface IVector2 extends rustplus.Vector2.$Properties {
    }

    /** Represents a Vector2. */
    class Vector2 {

        /**
         * Constructs a new Vector2.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.Vector2.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** Vector2 x. */
        x: number;

        /** Vector2 y. */
        y: number;

        /**
         * Creates a new Vector2 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vector2 instance
         */
        static create(properties: rustplus.Vector2.$Shape): rustplus.Vector2 & rustplus.Vector2.$Shape;
        static create(properties?: rustplus.Vector2.$Properties): rustplus.Vector2;

        /**
         * Encodes the specified Vector2 message. Does not implicitly {@link rustplus.Vector2.verify|verify} messages.
         * @param message Vector2 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.Vector2.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vector2 message, length delimited. Does not implicitly {@link rustplus.Vector2.verify|verify} messages.
         * @param message Vector2 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.Vector2.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vector2 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.Vector2 & rustplus.Vector2.$Shape} Vector2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.Vector2 & rustplus.Vector2.$Shape;

        /**
         * Decodes a Vector2 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.Vector2 & rustplus.Vector2.$Shape} Vector2
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.Vector2 & rustplus.Vector2.$Shape;

        /**
         * Verifies a Vector2 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vector2 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vector2
         */
        static fromObject(object: { [k: string]: any }): rustplus.Vector2;

        /**
         * Creates a plain object from a Vector2 message. Also converts values to other types if specified.
         * @param message Vector2
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.Vector2, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vector2 to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Vector2
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Vector2 {

        /** Properties of a Vector2. */
        interface $Properties {

            /** Vector2 x */
            x?: (number|null);

            /** Vector2 y */
            y?: (number|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Vector2. */
        type $Shape = rustplus.Vector2.$Properties;
    }

    /**
     * Properties of a Vector3.
     * @deprecated Use rustplus.Vector3.$Properties instead.
     */
    interface IVector3 extends rustplus.Vector3.$Properties {
    }

    /** Represents a Vector3. */
    class Vector3 {

        /**
         * Constructs a new Vector3.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.Vector3.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** Vector3 x. */
        x: number;

        /** Vector3 y. */
        y: number;

        /** Vector3 z. */
        z: number;

        /**
         * Creates a new Vector3 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vector3 instance
         */
        static create(properties: rustplus.Vector3.$Shape): rustplus.Vector3 & rustplus.Vector3.$Shape;
        static create(properties?: rustplus.Vector3.$Properties): rustplus.Vector3;

        /**
         * Encodes the specified Vector3 message. Does not implicitly {@link rustplus.Vector3.verify|verify} messages.
         * @param message Vector3 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.Vector3.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vector3 message, length delimited. Does not implicitly {@link rustplus.Vector3.verify|verify} messages.
         * @param message Vector3 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.Vector3.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vector3 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.Vector3 & rustplus.Vector3.$Shape} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.Vector3 & rustplus.Vector3.$Shape;

        /**
         * Decodes a Vector3 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.Vector3 & rustplus.Vector3.$Shape} Vector3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.Vector3 & rustplus.Vector3.$Shape;

        /**
         * Verifies a Vector3 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vector3 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vector3
         */
        static fromObject(object: { [k: string]: any }): rustplus.Vector3;

        /**
         * Creates a plain object from a Vector3 message. Also converts values to other types if specified.
         * @param message Vector3
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.Vector3, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vector3 to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Vector3
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Vector3 {

        /** Properties of a Vector3. */
        interface $Properties {

            /** Vector3 x */
            x?: (number|null);

            /** Vector3 y */
            y?: (number|null);

            /** Vector3 z */
            z?: (number|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Vector3. */
        type $Shape = rustplus.Vector3.$Properties;
    }

    /**
     * Properties of a Vector4.
     * @deprecated Use rustplus.Vector4.$Properties instead.
     */
    interface IVector4 extends rustplus.Vector4.$Properties {
    }

    /** Represents a Vector4. */
    class Vector4 {

        /**
         * Constructs a new Vector4.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.Vector4.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** Vector4 x. */
        x: number;

        /** Vector4 y. */
        y: number;

        /** Vector4 z. */
        z: number;

        /** Vector4 w. */
        w: number;

        /**
         * Creates a new Vector4 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Vector4 instance
         */
        static create(properties: rustplus.Vector4.$Shape): rustplus.Vector4 & rustplus.Vector4.$Shape;
        static create(properties?: rustplus.Vector4.$Properties): rustplus.Vector4;

        /**
         * Encodes the specified Vector4 message. Does not implicitly {@link rustplus.Vector4.verify|verify} messages.
         * @param message Vector4 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.Vector4.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Vector4 message, length delimited. Does not implicitly {@link rustplus.Vector4.verify|verify} messages.
         * @param message Vector4 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.Vector4.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Vector4 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.Vector4 & rustplus.Vector4.$Shape} Vector4
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.Vector4 & rustplus.Vector4.$Shape;

        /**
         * Decodes a Vector4 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.Vector4 & rustplus.Vector4.$Shape} Vector4
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.Vector4 & rustplus.Vector4.$Shape;

        /**
         * Verifies a Vector4 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Vector4 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Vector4
         */
        static fromObject(object: { [k: string]: any }): rustplus.Vector4;

        /**
         * Creates a plain object from a Vector4 message. Also converts values to other types if specified.
         * @param message Vector4
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.Vector4, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Vector4 to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Vector4
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Vector4 {

        /** Properties of a Vector4. */
        interface $Properties {

            /** Vector4 x */
            x?: (number|null);

            /** Vector4 y */
            y?: (number|null);

            /** Vector4 z */
            z?: (number|null);

            /** Vector4 w */
            w?: (number|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Vector4. */
        type $Shape = rustplus.Vector4.$Properties;
    }

    /**
     * Properties of a Half3.
     * @deprecated Use rustplus.Half3.$Properties instead.
     */
    interface IHalf3 extends rustplus.Half3.$Properties {
    }

    /** Represents a Half3. */
    class Half3 {

        /**
         * Constructs a new Half3.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.Half3.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** Half3 x. */
        x: number;

        /** Half3 y. */
        y: number;

        /** Half3 z. */
        z: number;

        /**
         * Creates a new Half3 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Half3 instance
         */
        static create(properties: rustplus.Half3.$Shape): rustplus.Half3 & rustplus.Half3.$Shape;
        static create(properties?: rustplus.Half3.$Properties): rustplus.Half3;

        /**
         * Encodes the specified Half3 message. Does not implicitly {@link rustplus.Half3.verify|verify} messages.
         * @param message Half3 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.Half3.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Half3 message, length delimited. Does not implicitly {@link rustplus.Half3.verify|verify} messages.
         * @param message Half3 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.Half3.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Half3 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.Half3 & rustplus.Half3.$Shape} Half3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.Half3 & rustplus.Half3.$Shape;

        /**
         * Decodes a Half3 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.Half3 & rustplus.Half3.$Shape} Half3
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.Half3 & rustplus.Half3.$Shape;

        /**
         * Verifies a Half3 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Half3 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Half3
         */
        static fromObject(object: { [k: string]: any }): rustplus.Half3;

        /**
         * Creates a plain object from a Half3 message. Also converts values to other types if specified.
         * @param message Half3
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.Half3, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Half3 to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Half3
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Half3 {

        /** Properties of a Half3. */
        interface $Properties {

            /** Half3 x */
            x?: (number|null);

            /** Half3 y */
            y?: (number|null);

            /** Half3 z */
            z?: (number|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Half3. */
        type $Shape = rustplus.Half3.$Properties;
    }

    /**
     * Properties of a Color.
     * @deprecated Use rustplus.Color.$Properties instead.
     */
    interface IColor extends rustplus.Color.$Properties {
    }

    /** Represents a Color. */
    class Color {

        /**
         * Constructs a new Color.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.Color.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** Color r. */
        r: number;

        /** Color g. */
        g: number;

        /** Color b. */
        b: number;

        /** Color a. */
        a: number;

        /**
         * Creates a new Color instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Color instance
         */
        static create(properties: rustplus.Color.$Shape): rustplus.Color & rustplus.Color.$Shape;
        static create(properties?: rustplus.Color.$Properties): rustplus.Color;

        /**
         * Encodes the specified Color message. Does not implicitly {@link rustplus.Color.verify|verify} messages.
         * @param message Color message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.Color.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Color message, length delimited. Does not implicitly {@link rustplus.Color.verify|verify} messages.
         * @param message Color message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.Color.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Color message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.Color & rustplus.Color.$Shape} Color
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.Color & rustplus.Color.$Shape;

        /**
         * Decodes a Color message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.Color & rustplus.Color.$Shape} Color
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.Color & rustplus.Color.$Shape;

        /**
         * Verifies a Color message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Color message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Color
         */
        static fromObject(object: { [k: string]: any }): rustplus.Color;

        /**
         * Creates a plain object from a Color message. Also converts values to other types if specified.
         * @param message Color
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.Color, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Color to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Color
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Color {

        /** Properties of a Color. */
        interface $Properties {

            /** Color r */
            r?: (number|null);

            /** Color g */
            g?: (number|null);

            /** Color b */
            b?: (number|null);

            /** Color a */
            a?: (number|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Color. */
        type $Shape = rustplus.Color.$Properties;
    }

    /**
     * Properties of a Ray.
     * @deprecated Use rustplus.Ray.$Properties instead.
     */
    interface IRay extends rustplus.Ray.$Properties {
    }

    /** Represents a Ray. */
    class Ray {

        /**
         * Constructs a new Ray.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.Ray.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** Ray origin. */
        origin?: (rustplus.Vector3.$Properties|null);

        /** Ray direction. */
        direction?: (rustplus.Vector3.$Properties|null);

        /**
         * Creates a new Ray instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Ray instance
         */
        static create(properties: rustplus.Ray.$Shape): rustplus.Ray & rustplus.Ray.$Shape;
        static create(properties?: rustplus.Ray.$Properties): rustplus.Ray;

        /**
         * Encodes the specified Ray message. Does not implicitly {@link rustplus.Ray.verify|verify} messages.
         * @param message Ray message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.Ray.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Ray message, length delimited. Does not implicitly {@link rustplus.Ray.verify|verify} messages.
         * @param message Ray message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.Ray.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Ray message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.Ray & rustplus.Ray.$Shape} Ray
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.Ray & rustplus.Ray.$Shape;

        /**
         * Decodes a Ray message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.Ray & rustplus.Ray.$Shape} Ray
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.Ray & rustplus.Ray.$Shape;

        /**
         * Verifies a Ray message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Ray message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Ray
         */
        static fromObject(object: { [k: string]: any }): rustplus.Ray;

        /**
         * Creates a plain object from a Ray message. Also converts values to other types if specified.
         * @param message Ray
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.Ray, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Ray to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for Ray
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace Ray {

        /** Properties of a Ray. */
        interface $Properties {

            /** Ray origin */
            origin?: (rustplus.Vector3.$Properties|null);

            /** Ray direction */
            direction?: (rustplus.Vector3.$Properties|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a Ray. */
        type $Shape = rustplus.Ray.$Properties;
    }

    /**
     * Properties of a ClanActionResult.
     * @deprecated Use rustplus.ClanActionResult.$Properties instead.
     */
    interface IClanActionResult extends rustplus.ClanActionResult.$Properties {
    }

    /** Represents a ClanActionResult. */
    class ClanActionResult {

        /**
         * Constructs a new ClanActionResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.ClanActionResult.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** ClanActionResult requestId. */
        requestId: number;

        /** ClanActionResult result. */
        result: number;

        /** ClanActionResult hasClanInfo. */
        hasClanInfo: boolean;

        /** ClanActionResult clanInfo. */
        clanInfo?: (rustplus.ClanInfo.$Properties|null);

        /**
         * Creates a new ClanActionResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClanActionResult instance
         */
        static create(properties: rustplus.ClanActionResult.$Shape): rustplus.ClanActionResult & rustplus.ClanActionResult.$Shape;
        static create(properties?: rustplus.ClanActionResult.$Properties): rustplus.ClanActionResult;

        /**
         * Encodes the specified ClanActionResult message. Does not implicitly {@link rustplus.ClanActionResult.verify|verify} messages.
         * @param message ClanActionResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.ClanActionResult.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClanActionResult message, length delimited. Does not implicitly {@link rustplus.ClanActionResult.verify|verify} messages.
         * @param message ClanActionResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.ClanActionResult.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClanActionResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.ClanActionResult & rustplus.ClanActionResult.$Shape} ClanActionResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanActionResult & rustplus.ClanActionResult.$Shape;

        /**
         * Decodes a ClanActionResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.ClanActionResult & rustplus.ClanActionResult.$Shape} ClanActionResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanActionResult & rustplus.ClanActionResult.$Shape;

        /**
         * Verifies a ClanActionResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClanActionResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClanActionResult
         */
        static fromObject(object: { [k: string]: any }): rustplus.ClanActionResult;

        /**
         * Creates a plain object from a ClanActionResult message. Also converts values to other types if specified.
         * @param message ClanActionResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.ClanActionResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClanActionResult to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ClanActionResult
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ClanActionResult {

        /** Properties of a ClanActionResult. */
        interface $Properties {

            /** ClanActionResult requestId */
            requestId: number;

            /** ClanActionResult result */
            result: number;

            /** ClanActionResult hasClanInfo */
            hasClanInfo: boolean;

            /** ClanActionResult clanInfo */
            clanInfo?: (rustplus.ClanInfo.$Properties|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ClanActionResult. */
        type $Shape = rustplus.ClanActionResult.$Properties;
    }

    /**
     * Properties of a ClanInfo.
     * @deprecated Use rustplus.ClanInfo.$Properties instead.
     */
    interface IClanInfo extends rustplus.ClanInfo.$Properties {
    }

    /** Represents a ClanInfo. */
    class ClanInfo {

        /**
         * Constructs a new ClanInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.ClanInfo.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** ClanInfo clanId. */
        clanId: (number|Long);

        /** ClanInfo name. */
        name: string;

        /** ClanInfo created. */
        created: (number|Long);

        /** ClanInfo creator. */
        creator: (number|Long);

        /** ClanInfo motd. */
        motd: string;

        /** ClanInfo motdTimestamp. */
        motdTimestamp: (number|Long);

        /** ClanInfo motdAuthor. */
        motdAuthor: (number|Long);

        /** ClanInfo logo. */
        logo: Uint8Array;

        /** ClanInfo color. */
        color: number;

        /** ClanInfo roles. */
        roles: rustplus.ClanInfo.Role.$Properties[];

        /** ClanInfo members. */
        members: rustplus.ClanInfo.Member.$Properties[];

        /** ClanInfo invites. */
        invites: rustplus.ClanInfo.Invite.$Properties[];

        /** ClanInfo maxMemberCount. */
        maxMemberCount: number;

        /**
         * Creates a new ClanInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClanInfo instance
         */
        static create(properties: rustplus.ClanInfo.$Shape): rustplus.ClanInfo & rustplus.ClanInfo.$Shape;
        static create(properties?: rustplus.ClanInfo.$Properties): rustplus.ClanInfo;

        /**
         * Encodes the specified ClanInfo message. Does not implicitly {@link rustplus.ClanInfo.verify|verify} messages.
         * @param message ClanInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.ClanInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClanInfo message, length delimited. Does not implicitly {@link rustplus.ClanInfo.verify|verify} messages.
         * @param message ClanInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.ClanInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClanInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.ClanInfo & rustplus.ClanInfo.$Shape} ClanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanInfo & rustplus.ClanInfo.$Shape;

        /**
         * Decodes a ClanInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.ClanInfo & rustplus.ClanInfo.$Shape} ClanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanInfo & rustplus.ClanInfo.$Shape;

        /**
         * Verifies a ClanInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClanInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClanInfo
         */
        static fromObject(object: { [k: string]: any }): rustplus.ClanInfo;

        /**
         * Creates a plain object from a ClanInfo message. Also converts values to other types if specified.
         * @param message ClanInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.ClanInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClanInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ClanInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ClanInfo {

        /** Properties of a ClanInfo. */
        interface $Properties {

            /** ClanInfo clanId */
            clanId: (number|Long);

            /** ClanInfo name */
            name: string;

            /** ClanInfo created */
            created: (number|Long);

            /** ClanInfo creator */
            creator: (number|Long);

            /** ClanInfo motd */
            motd?: (string|null);

            /** ClanInfo motdTimestamp */
            motdTimestamp?: (number|Long|null);

            /** ClanInfo motdAuthor */
            motdAuthor?: (number|Long|null);

            /** ClanInfo logo */
            logo?: (Uint8Array|null);

            /** ClanInfo color */
            color?: (number|null);

            /** ClanInfo roles */
            roles?: (rustplus.ClanInfo.Role.$Properties[]|null);

            /** ClanInfo members */
            members?: (rustplus.ClanInfo.Member.$Properties[]|null);

            /** ClanInfo invites */
            invites?: (rustplus.ClanInfo.Invite.$Properties[]|null);

            /** ClanInfo maxMemberCount */
            maxMemberCount?: (number|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ClanInfo. */
        type $Shape = rustplus.ClanInfo.$Properties;

        /**
         * Properties of a Role.
         * @deprecated Use rustplus.ClanInfo.Role.$Properties instead.
         */
        interface IRole extends rustplus.ClanInfo.Role.$Properties {
        }

        /** Represents a Role. */
        class Role {

            /**
             * Constructs a new Role.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.ClanInfo.Role.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Role roleId. */
            roleId: number;

            /** Role rank. */
            rank: number;

            /** Role name. */
            name: string;

            /** Role canSetMotd. */
            canSetMotd: boolean;

            /** Role canSetLogo. */
            canSetLogo: boolean;

            /** Role canInvite. */
            canInvite: boolean;

            /** Role canKick. */
            canKick: boolean;

            /** Role canPromote. */
            canPromote: boolean;

            /** Role canDemote. */
            canDemote: boolean;

            /** Role canSetPlayerNotes. */
            canSetPlayerNotes: boolean;

            /** Role canAccessLogs. */
            canAccessLogs: boolean;

            /**
             * Creates a new Role instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Role instance
             */
            static create(properties: rustplus.ClanInfo.Role.$Shape): rustplus.ClanInfo.Role & rustplus.ClanInfo.Role.$Shape;
            static create(properties?: rustplus.ClanInfo.Role.$Properties): rustplus.ClanInfo.Role;

            /**
             * Encodes the specified Role message. Does not implicitly {@link rustplus.ClanInfo.Role.verify|verify} messages.
             * @param message Role message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.ClanInfo.Role.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Role message, length delimited. Does not implicitly {@link rustplus.ClanInfo.Role.verify|verify} messages.
             * @param message Role message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.ClanInfo.Role.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Role message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.ClanInfo.Role & rustplus.ClanInfo.Role.$Shape} Role
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanInfo.Role & rustplus.ClanInfo.Role.$Shape;

            /**
             * Decodes a Role message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.ClanInfo.Role & rustplus.ClanInfo.Role.$Shape} Role
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanInfo.Role & rustplus.ClanInfo.Role.$Shape;

            /**
             * Verifies a Role message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Role message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Role
             */
            static fromObject(object: { [k: string]: any }): rustplus.ClanInfo.Role;

            /**
             * Creates a plain object from a Role message. Also converts values to other types if specified.
             * @param message Role
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.ClanInfo.Role, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Role to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Role
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Role {

            /** Properties of a Role. */
            interface $Properties {

                /** Role roleId */
                roleId: number;

                /** Role rank */
                rank: number;

                /** Role name */
                name: string;

                /** Role canSetMotd */
                canSetMotd: boolean;

                /** Role canSetLogo */
                canSetLogo: boolean;

                /** Role canInvite */
                canInvite: boolean;

                /** Role canKick */
                canKick: boolean;

                /** Role canPromote */
                canPromote: boolean;

                /** Role canDemote */
                canDemote: boolean;

                /** Role canSetPlayerNotes */
                canSetPlayerNotes: boolean;

                /** Role canAccessLogs */
                canAccessLogs: boolean;

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Role. */
            type $Shape = rustplus.ClanInfo.Role.$Properties;
        }

        /**
         * Properties of a Member.
         * @deprecated Use rustplus.ClanInfo.Member.$Properties instead.
         */
        interface IMember extends rustplus.ClanInfo.Member.$Properties {
        }

        /** Represents a Member. */
        class Member {

            /**
             * Constructs a new Member.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.ClanInfo.Member.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Member steamId. */
            steamId: (number|Long);

            /** Member roleId. */
            roleId: number;

            /** Member joined. */
            joined: (number|Long);

            /** Member lastSeen. */
            lastSeen: (number|Long);

            /** Member notes. */
            notes: string;

            /** Member online. */
            online: boolean;

            /**
             * Creates a new Member instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Member instance
             */
            static create(properties: rustplus.ClanInfo.Member.$Shape): rustplus.ClanInfo.Member & rustplus.ClanInfo.Member.$Shape;
            static create(properties?: rustplus.ClanInfo.Member.$Properties): rustplus.ClanInfo.Member;

            /**
             * Encodes the specified Member message. Does not implicitly {@link rustplus.ClanInfo.Member.verify|verify} messages.
             * @param message Member message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.ClanInfo.Member.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Member message, length delimited. Does not implicitly {@link rustplus.ClanInfo.Member.verify|verify} messages.
             * @param message Member message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.ClanInfo.Member.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Member message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.ClanInfo.Member & rustplus.ClanInfo.Member.$Shape} Member
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanInfo.Member & rustplus.ClanInfo.Member.$Shape;

            /**
             * Decodes a Member message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.ClanInfo.Member & rustplus.ClanInfo.Member.$Shape} Member
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanInfo.Member & rustplus.ClanInfo.Member.$Shape;

            /**
             * Verifies a Member message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Member message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Member
             */
            static fromObject(object: { [k: string]: any }): rustplus.ClanInfo.Member;

            /**
             * Creates a plain object from a Member message. Also converts values to other types if specified.
             * @param message Member
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.ClanInfo.Member, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Member to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Member
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Member {

            /** Properties of a Member. */
            interface $Properties {

                /** Member steamId */
                steamId: (number|Long);

                /** Member roleId */
                roleId: number;

                /** Member joined */
                joined: (number|Long);

                /** Member lastSeen */
                lastSeen: (number|Long);

                /** Member notes */
                notes?: (string|null);

                /** Member online */
                online?: (boolean|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Member. */
            type $Shape = rustplus.ClanInfo.Member.$Properties;
        }

        /**
         * Properties of an Invite.
         * @deprecated Use rustplus.ClanInfo.Invite.$Properties instead.
         */
        interface IInvite extends rustplus.ClanInfo.Invite.$Properties {
        }

        /** Represents an Invite. */
        class Invite {

            /**
             * Constructs a new Invite.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.ClanInfo.Invite.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Invite steamId. */
            steamId: (number|Long);

            /** Invite recruiter. */
            recruiter: (number|Long);

            /** Invite timestamp. */
            timestamp: (number|Long);

            /**
             * Creates a new Invite instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Invite instance
             */
            static create(properties: rustplus.ClanInfo.Invite.$Shape): rustplus.ClanInfo.Invite & rustplus.ClanInfo.Invite.$Shape;
            static create(properties?: rustplus.ClanInfo.Invite.$Properties): rustplus.ClanInfo.Invite;

            /**
             * Encodes the specified Invite message. Does not implicitly {@link rustplus.ClanInfo.Invite.verify|verify} messages.
             * @param message Invite message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.ClanInfo.Invite.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Invite message, length delimited. Does not implicitly {@link rustplus.ClanInfo.Invite.verify|verify} messages.
             * @param message Invite message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.ClanInfo.Invite.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Invite message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.ClanInfo.Invite & rustplus.ClanInfo.Invite.$Shape} Invite
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanInfo.Invite & rustplus.ClanInfo.Invite.$Shape;

            /**
             * Decodes an Invite message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.ClanInfo.Invite & rustplus.ClanInfo.Invite.$Shape} Invite
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanInfo.Invite & rustplus.ClanInfo.Invite.$Shape;

            /**
             * Verifies an Invite message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Invite message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Invite
             */
            static fromObject(object: { [k: string]: any }): rustplus.ClanInfo.Invite;

            /**
             * Creates a plain object from an Invite message. Also converts values to other types if specified.
             * @param message Invite
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.ClanInfo.Invite, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Invite to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Invite
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Invite {

            /** Properties of an Invite. */
            interface $Properties {

                /** Invite steamId */
                steamId: (number|Long);

                /** Invite recruiter */
                recruiter: (number|Long);

                /** Invite timestamp */
                timestamp: (number|Long);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Invite. */
            type $Shape = rustplus.ClanInfo.Invite.$Properties;
        }
    }

    /**
     * Properties of a ClanLog.
     * @deprecated Use rustplus.ClanLog.$Properties instead.
     */
    interface IClanLog extends rustplus.ClanLog.$Properties {
    }

    /** Represents a ClanLog. */
    class ClanLog {

        /**
         * Constructs a new ClanLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.ClanLog.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** ClanLog clanId. */
        clanId: (number|Long);

        /** ClanLog logEntries. */
        logEntries: rustplus.ClanLog.Entry.$Properties[];

        /**
         * Creates a new ClanLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClanLog instance
         */
        static create(properties: rustplus.ClanLog.$Shape): rustplus.ClanLog & rustplus.ClanLog.$Shape;
        static create(properties?: rustplus.ClanLog.$Properties): rustplus.ClanLog;

        /**
         * Encodes the specified ClanLog message. Does not implicitly {@link rustplus.ClanLog.verify|verify} messages.
         * @param message ClanLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.ClanLog.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClanLog message, length delimited. Does not implicitly {@link rustplus.ClanLog.verify|verify} messages.
         * @param message ClanLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.ClanLog.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClanLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.ClanLog & rustplus.ClanLog.$Shape} ClanLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanLog & rustplus.ClanLog.$Shape;

        /**
         * Decodes a ClanLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.ClanLog & rustplus.ClanLog.$Shape} ClanLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanLog & rustplus.ClanLog.$Shape;

        /**
         * Verifies a ClanLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClanLog message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClanLog
         */
        static fromObject(object: { [k: string]: any }): rustplus.ClanLog;

        /**
         * Creates a plain object from a ClanLog message. Also converts values to other types if specified.
         * @param message ClanLog
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.ClanLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClanLog to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ClanLog
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ClanLog {

        /** Properties of a ClanLog. */
        interface $Properties {

            /** ClanLog clanId */
            clanId: (number|Long);

            /** ClanLog logEntries */
            logEntries?: (rustplus.ClanLog.Entry.$Properties[]|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ClanLog. */
        type $Shape = rustplus.ClanLog.$Properties;

        /**
         * Properties of an Entry.
         * @deprecated Use rustplus.ClanLog.Entry.$Properties instead.
         */
        interface IEntry extends rustplus.ClanLog.Entry.$Properties {
        }

        /** Represents an Entry. */
        class Entry {

            /**
             * Constructs a new Entry.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.ClanLog.Entry.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Entry timestamp. */
            timestamp: (number|Long);

            /** Entry eventKey. */
            eventKey: string;

            /** Entry arg1. */
            arg1: string;

            /** Entry arg2. */
            arg2: string;

            /** Entry arg3. */
            arg3: string;

            /** Entry arg4. */
            arg4: string;

            /**
             * Creates a new Entry instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Entry instance
             */
            static create(properties: rustplus.ClanLog.Entry.$Shape): rustplus.ClanLog.Entry & rustplus.ClanLog.Entry.$Shape;
            static create(properties?: rustplus.ClanLog.Entry.$Properties): rustplus.ClanLog.Entry;

            /**
             * Encodes the specified Entry message. Does not implicitly {@link rustplus.ClanLog.Entry.verify|verify} messages.
             * @param message Entry message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.ClanLog.Entry.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Entry message, length delimited. Does not implicitly {@link rustplus.ClanLog.Entry.verify|verify} messages.
             * @param message Entry message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.ClanLog.Entry.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Entry message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.ClanLog.Entry & rustplus.ClanLog.Entry.$Shape} Entry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanLog.Entry & rustplus.ClanLog.Entry.$Shape;

            /**
             * Decodes an Entry message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.ClanLog.Entry & rustplus.ClanLog.Entry.$Shape} Entry
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanLog.Entry & rustplus.ClanLog.Entry.$Shape;

            /**
             * Verifies an Entry message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Entry message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Entry
             */
            static fromObject(object: { [k: string]: any }): rustplus.ClanLog.Entry;

            /**
             * Creates a plain object from an Entry message. Also converts values to other types if specified.
             * @param message Entry
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.ClanLog.Entry, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Entry to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Entry
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Entry {

            /** Properties of an Entry. */
            interface $Properties {

                /** Entry timestamp */
                timestamp: (number|Long);

                /** Entry eventKey */
                eventKey: string;

                /** Entry arg1 */
                arg1?: (string|null);

                /** Entry arg2 */
                arg2?: (string|null);

                /** Entry arg3 */
                arg3?: (string|null);

                /** Entry arg4 */
                arg4?: (string|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Entry. */
            type $Shape = rustplus.ClanLog.Entry.$Properties;
        }
    }

    /**
     * Properties of a ClanInvitations.
     * @deprecated Use rustplus.ClanInvitations.$Properties instead.
     */
    interface IClanInvitations extends rustplus.ClanInvitations.$Properties {
    }

    /** Represents a ClanInvitations. */
    class ClanInvitations {

        /**
         * Constructs a new ClanInvitations.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.ClanInvitations.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** ClanInvitations invitations. */
        invitations: rustplus.ClanInvitations.Invitation.$Properties[];

        /**
         * Creates a new ClanInvitations instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClanInvitations instance
         */
        static create(properties: rustplus.ClanInvitations.$Shape): rustplus.ClanInvitations & rustplus.ClanInvitations.$Shape;
        static create(properties?: rustplus.ClanInvitations.$Properties): rustplus.ClanInvitations;

        /**
         * Encodes the specified ClanInvitations message. Does not implicitly {@link rustplus.ClanInvitations.verify|verify} messages.
         * @param message ClanInvitations message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.ClanInvitations.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClanInvitations message, length delimited. Does not implicitly {@link rustplus.ClanInvitations.verify|verify} messages.
         * @param message ClanInvitations message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.ClanInvitations.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClanInvitations message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.ClanInvitations & rustplus.ClanInvitations.$Shape} ClanInvitations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanInvitations & rustplus.ClanInvitations.$Shape;

        /**
         * Decodes a ClanInvitations message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.ClanInvitations & rustplus.ClanInvitations.$Shape} ClanInvitations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanInvitations & rustplus.ClanInvitations.$Shape;

        /**
         * Verifies a ClanInvitations message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClanInvitations message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClanInvitations
         */
        static fromObject(object: { [k: string]: any }): rustplus.ClanInvitations;

        /**
         * Creates a plain object from a ClanInvitations message. Also converts values to other types if specified.
         * @param message ClanInvitations
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.ClanInvitations, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClanInvitations to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for ClanInvitations
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace ClanInvitations {

        /** Properties of a ClanInvitations. */
        interface $Properties {

            /** ClanInvitations invitations */
            invitations?: (rustplus.ClanInvitations.Invitation.$Properties[]|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a ClanInvitations. */
        type $Shape = rustplus.ClanInvitations.$Properties;

        /**
         * Properties of an Invitation.
         * @deprecated Use rustplus.ClanInvitations.Invitation.$Properties instead.
         */
        interface IInvitation extends rustplus.ClanInvitations.Invitation.$Properties {
        }

        /** Represents an Invitation. */
        class Invitation {

            /**
             * Constructs a new Invitation.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.ClanInvitations.Invitation.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Invitation clanId. */
            clanId: (number|Long);

            /** Invitation recruiter. */
            recruiter: (number|Long);

            /** Invitation timestamp. */
            timestamp: (number|Long);

            /**
             * Creates a new Invitation instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Invitation instance
             */
            static create(properties: rustplus.ClanInvitations.Invitation.$Shape): rustplus.ClanInvitations.Invitation & rustplus.ClanInvitations.Invitation.$Shape;
            static create(properties?: rustplus.ClanInvitations.Invitation.$Properties): rustplus.ClanInvitations.Invitation;

            /**
             * Encodes the specified Invitation message. Does not implicitly {@link rustplus.ClanInvitations.Invitation.verify|verify} messages.
             * @param message Invitation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.ClanInvitations.Invitation.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Invitation message, length delimited. Does not implicitly {@link rustplus.ClanInvitations.Invitation.verify|verify} messages.
             * @param message Invitation message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.ClanInvitations.Invitation.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Invitation message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.ClanInvitations.Invitation & rustplus.ClanInvitations.Invitation.$Shape} Invitation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.ClanInvitations.Invitation & rustplus.ClanInvitations.Invitation.$Shape;

            /**
             * Decodes an Invitation message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.ClanInvitations.Invitation & rustplus.ClanInvitations.Invitation.$Shape} Invitation
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.ClanInvitations.Invitation & rustplus.ClanInvitations.Invitation.$Shape;

            /**
             * Verifies an Invitation message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Invitation message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Invitation
             */
            static fromObject(object: { [k: string]: any }): rustplus.ClanInvitations.Invitation;

            /**
             * Creates a plain object from an Invitation message. Also converts values to other types if specified.
             * @param message Invitation
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.ClanInvitations.Invitation, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Invitation to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Invitation
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Invitation {

            /** Properties of an Invitation. */
            interface $Properties {

                /** Invitation clanId */
                clanId: (number|Long);

                /** Invitation recruiter */
                recruiter: (number|Long);

                /** Invitation timestamp */
                timestamp: (number|Long);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Invitation. */
            type $Shape = rustplus.ClanInvitations.Invitation.$Properties;
        }
    }

    /** AppEntityType enum. */
    enum AppEntityType {

        /** Switch value */
        Switch = 1,

        /** Alarm value */
        Alarm = 2,

        /** StorageMonitor value */
        StorageMonitor = 3
    }

    /** AppMarkerType enum. */
    enum AppMarkerType {

        /** Undefined value */
        Undefined = 0,

        /** Player value */
        Player = 1,

        /** Explosion value */
        Explosion = 2,

        /** VendingMachine value */
        VendingMachine = 3,

        /** CH47 value */
        CH47 = 4,

        /** CargoShip value */
        CargoShip = 5,

        /** Crate value */
        Crate = 6,

        /** GenericRadius value */
        GenericRadius = 7,

        /** PatrolHelicopter value */
        PatrolHelicopter = 8
    }

    /**
     * Properties of an AppRequest.
     * @deprecated Use rustplus.AppRequest.$Properties instead.
     */
    interface IAppRequest extends rustplus.AppRequest.$Properties {
    }

    /** Represents an AppRequest. */
    class AppRequest {

        /**
         * Constructs a new AppRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppRequest.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppRequest seq. */
        seq: number;

        /** AppRequest playerId. */
        playerId: (number|Long);

        /** AppRequest playerToken. */
        playerToken: number;

        /** AppRequest entityId. */
        entityId: number;

        /** AppRequest getInfo. */
        getInfo?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest getTime. */
        getTime?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest getMap. */
        getMap?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest getTeamInfo. */
        getTeamInfo?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest getTeamChat. */
        getTeamChat?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest sendTeamMessage. */
        sendTeamMessage?: (rustplus.AppSendMessage.$Properties|null);

        /** AppRequest getEntityInfo. */
        getEntityInfo?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest setEntityValue. */
        setEntityValue?: (rustplus.AppSetEntityValue.$Properties|null);

        /** AppRequest checkSubscription. */
        checkSubscription?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest setSubscription. */
        setSubscription?: (rustplus.AppFlag.$Properties|null);

        /** AppRequest getMapMarkers. */
        getMapMarkers?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest promoteToLeader. */
        promoteToLeader?: (rustplus.AppPromoteToLeader.$Properties|null);

        /** AppRequest getClanInfo. */
        getClanInfo?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest setClanMotd. */
        setClanMotd?: (rustplus.AppSendMessage.$Properties|null);

        /** AppRequest getClanChat. */
        getClanChat?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest sendClanMessage. */
        sendClanMessage?: (rustplus.AppSendMessage.$Properties|null);

        /** AppRequest getNexusAuth. */
        getNexusAuth?: (rustplus.AppGetNexusAuth.$Properties|null);

        /** AppRequest cameraSubscribe. */
        cameraSubscribe?: (rustplus.AppCameraSubscribe.$Properties|null);

        /** AppRequest cameraUnsubscribe. */
        cameraUnsubscribe?: (rustplus.AppEmpty.$Properties|null);

        /** AppRequest cameraInput. */
        cameraInput?: (rustplus.AppCameraInput.$Properties|null);

        /**
         * Creates a new AppRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppRequest instance
         */
        static create(properties: rustplus.AppRequest.$Shape): rustplus.AppRequest & rustplus.AppRequest.$Shape;
        static create(properties?: rustplus.AppRequest.$Properties): rustplus.AppRequest;

        /**
         * Encodes the specified AppRequest message. Does not implicitly {@link rustplus.AppRequest.verify|verify} messages.
         * @param message AppRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppRequest message, length delimited. Does not implicitly {@link rustplus.AppRequest.verify|verify} messages.
         * @param message AppRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppRequest.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppRequest & rustplus.AppRequest.$Shape} AppRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppRequest & rustplus.AppRequest.$Shape;

        /**
         * Decodes an AppRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppRequest & rustplus.AppRequest.$Shape} AppRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppRequest & rustplus.AppRequest.$Shape;

        /**
         * Verifies an AppRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppRequest
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppRequest;

        /**
         * Creates a plain object from an AppRequest message. Also converts values to other types if specified.
         * @param message AppRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppRequest to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppRequest
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppRequest {

        /** Properties of an AppRequest. */
        interface $Properties {

            /** AppRequest seq */
            seq: number;

            /** AppRequest playerId */
            playerId: (number|Long);

            /** AppRequest playerToken */
            playerToken: number;

            /** AppRequest entityId */
            entityId?: (number|null);

            /** AppRequest getInfo */
            getInfo?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest getTime */
            getTime?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest getMap */
            getMap?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest getTeamInfo */
            getTeamInfo?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest getTeamChat */
            getTeamChat?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest sendTeamMessage */
            sendTeamMessage?: (rustplus.AppSendMessage.$Properties|null);

            /** AppRequest getEntityInfo */
            getEntityInfo?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest setEntityValue */
            setEntityValue?: (rustplus.AppSetEntityValue.$Properties|null);

            /** AppRequest checkSubscription */
            checkSubscription?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest setSubscription */
            setSubscription?: (rustplus.AppFlag.$Properties|null);

            /** AppRequest getMapMarkers */
            getMapMarkers?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest promoteToLeader */
            promoteToLeader?: (rustplus.AppPromoteToLeader.$Properties|null);

            /** AppRequest getClanInfo */
            getClanInfo?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest setClanMotd */
            setClanMotd?: (rustplus.AppSendMessage.$Properties|null);

            /** AppRequest getClanChat */
            getClanChat?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest sendClanMessage */
            sendClanMessage?: (rustplus.AppSendMessage.$Properties|null);

            /** AppRequest getNexusAuth */
            getNexusAuth?: (rustplus.AppGetNexusAuth.$Properties|null);

            /** AppRequest cameraSubscribe */
            cameraSubscribe?: (rustplus.AppCameraSubscribe.$Properties|null);

            /** AppRequest cameraUnsubscribe */
            cameraUnsubscribe?: (rustplus.AppEmpty.$Properties|null);

            /** AppRequest cameraInput */
            cameraInput?: (rustplus.AppCameraInput.$Properties|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppRequest. */
        type $Shape = rustplus.AppRequest.$Properties;
    }

    /**
     * Properties of an AppMessage.
     * @deprecated Use rustplus.AppMessage.$Properties instead.
     */
    interface IAppMessage extends rustplus.AppMessage.$Properties {
    }

    /** Represents an AppMessage. */
    class AppMessage {

        /**
         * Constructs a new AppMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppMessage.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppMessage response. */
        response?: (rustplus.AppResponse.$Properties|null);

        /** AppMessage broadcast. */
        broadcast?: (rustplus.AppBroadcast.$Properties|null);

        /**
         * Creates a new AppMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppMessage instance
         */
        static create(properties: rustplus.AppMessage.$Shape): rustplus.AppMessage & rustplus.AppMessage.$Shape;
        static create(properties?: rustplus.AppMessage.$Properties): rustplus.AppMessage;

        /**
         * Encodes the specified AppMessage message. Does not implicitly {@link rustplus.AppMessage.verify|verify} messages.
         * @param message AppMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppMessage message, length delimited. Does not implicitly {@link rustplus.AppMessage.verify|verify} messages.
         * @param message AppMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppMessage & rustplus.AppMessage.$Shape} AppMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppMessage & rustplus.AppMessage.$Shape;

        /**
         * Decodes an AppMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppMessage & rustplus.AppMessage.$Shape} AppMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppMessage & rustplus.AppMessage.$Shape;

        /**
         * Verifies an AppMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppMessage
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppMessage;

        /**
         * Creates a plain object from an AppMessage message. Also converts values to other types if specified.
         * @param message AppMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppMessage {

        /** Properties of an AppMessage. */
        interface $Properties {

            /** AppMessage response */
            response?: (rustplus.AppResponse.$Properties|null);

            /** AppMessage broadcast */
            broadcast?: (rustplus.AppBroadcast.$Properties|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppMessage. */
        type $Shape = rustplus.AppMessage.$Properties;
    }

    /**
     * Properties of an AppResponse.
     * @deprecated Use rustplus.AppResponse.$Properties instead.
     */
    interface IAppResponse extends rustplus.AppResponse.$Properties {
    }

    /** Represents an AppResponse. */
    class AppResponse {

        /**
         * Constructs a new AppResponse.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppResponse.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppResponse seq. */
        seq: number;

        /** AppResponse success. */
        success?: (rustplus.AppSuccess.$Properties|null);

        /** AppResponse error. */
        error?: (rustplus.AppError.$Properties|null);

        /** AppResponse info. */
        info?: (rustplus.AppInfo.$Properties|null);

        /** AppResponse time. */
        time?: (rustplus.AppTime.$Properties|null);

        /** AppResponse map. */
        map?: (rustplus.AppMap.$Properties|null);

        /** AppResponse teamInfo. */
        teamInfo?: (rustplus.AppTeamInfo.$Properties|null);

        /** AppResponse teamChat. */
        teamChat?: (rustplus.AppTeamChat.$Properties|null);

        /** AppResponse entityInfo. */
        entityInfo?: (rustplus.AppEntityInfo.$Properties|null);

        /** AppResponse flag. */
        flag?: (rustplus.AppFlag.$Properties|null);

        /** AppResponse mapMarkers. */
        mapMarkers?: (rustplus.AppMapMarkers.$Properties|null);

        /** AppResponse clanInfo. */
        clanInfo?: (rustplus.AppClanInfo.$Properties|null);

        /** AppResponse clanChat. */
        clanChat?: (rustplus.AppClanChat.$Properties|null);

        /** AppResponse nexusAuth. */
        nexusAuth?: (rustplus.AppNexusAuth.$Properties|null);

        /** AppResponse cameraSubscribeInfo. */
        cameraSubscribeInfo?: (rustplus.AppCameraInfo.$Properties|null);

        /**
         * Creates a new AppResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppResponse instance
         */
        static create(properties: rustplus.AppResponse.$Shape): rustplus.AppResponse & rustplus.AppResponse.$Shape;
        static create(properties?: rustplus.AppResponse.$Properties): rustplus.AppResponse;

        /**
         * Encodes the specified AppResponse message. Does not implicitly {@link rustplus.AppResponse.verify|verify} messages.
         * @param message AppResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppResponse message, length delimited. Does not implicitly {@link rustplus.AppResponse.verify|verify} messages.
         * @param message AppResponse message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppResponse.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppResponse message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppResponse & rustplus.AppResponse.$Shape} AppResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppResponse & rustplus.AppResponse.$Shape;

        /**
         * Decodes an AppResponse message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppResponse & rustplus.AppResponse.$Shape} AppResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppResponse & rustplus.AppResponse.$Shape;

        /**
         * Verifies an AppResponse message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppResponse message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppResponse
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppResponse;

        /**
         * Creates a plain object from an AppResponse message. Also converts values to other types if specified.
         * @param message AppResponse
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppResponse to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppResponse
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppResponse {

        /** Properties of an AppResponse. */
        interface $Properties {

            /** AppResponse seq */
            seq: number;

            /** AppResponse success */
            success?: (rustplus.AppSuccess.$Properties|null);

            /** AppResponse error */
            error?: (rustplus.AppError.$Properties|null);

            /** AppResponse info */
            info?: (rustplus.AppInfo.$Properties|null);

            /** AppResponse time */
            time?: (rustplus.AppTime.$Properties|null);

            /** AppResponse map */
            map?: (rustplus.AppMap.$Properties|null);

            /** AppResponse teamInfo */
            teamInfo?: (rustplus.AppTeamInfo.$Properties|null);

            /** AppResponse teamChat */
            teamChat?: (rustplus.AppTeamChat.$Properties|null);

            /** AppResponse entityInfo */
            entityInfo?: (rustplus.AppEntityInfo.$Properties|null);

            /** AppResponse flag */
            flag?: (rustplus.AppFlag.$Properties|null);

            /** AppResponse mapMarkers */
            mapMarkers?: (rustplus.AppMapMarkers.$Properties|null);

            /** AppResponse clanInfo */
            clanInfo?: (rustplus.AppClanInfo.$Properties|null);

            /** AppResponse clanChat */
            clanChat?: (rustplus.AppClanChat.$Properties|null);

            /** AppResponse nexusAuth */
            nexusAuth?: (rustplus.AppNexusAuth.$Properties|null);

            /** AppResponse cameraSubscribeInfo */
            cameraSubscribeInfo?: (rustplus.AppCameraInfo.$Properties|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppResponse. */
        type $Shape = rustplus.AppResponse.$Properties;
    }

    /**
     * Properties of an AppBroadcast.
     * @deprecated Use rustplus.AppBroadcast.$Properties instead.
     */
    interface IAppBroadcast extends rustplus.AppBroadcast.$Properties {
    }

    /** Represents an AppBroadcast. */
    class AppBroadcast {

        /**
         * Constructs a new AppBroadcast.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppBroadcast.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppBroadcast teamChanged. */
        teamChanged?: (rustplus.AppTeamChanged.$Properties|null);

        /** AppBroadcast teamMessage. */
        teamMessage?: (rustplus.AppNewTeamMessage.$Properties|null);

        /** AppBroadcast entityChanged. */
        entityChanged?: (rustplus.AppEntityChanged.$Properties|null);

        /** AppBroadcast clanChanged. */
        clanChanged?: (rustplus.AppClanChanged.$Properties|null);

        /** AppBroadcast clanMessage. */
        clanMessage?: (rustplus.AppNewClanMessage.$Properties|null);

        /** AppBroadcast cameraRays. */
        cameraRays?: (rustplus.AppCameraRays.$Properties|null);

        /**
         * Creates a new AppBroadcast instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppBroadcast instance
         */
        static create(properties: rustplus.AppBroadcast.$Shape): rustplus.AppBroadcast & rustplus.AppBroadcast.$Shape;
        static create(properties?: rustplus.AppBroadcast.$Properties): rustplus.AppBroadcast;

        /**
         * Encodes the specified AppBroadcast message. Does not implicitly {@link rustplus.AppBroadcast.verify|verify} messages.
         * @param message AppBroadcast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppBroadcast.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppBroadcast message, length delimited. Does not implicitly {@link rustplus.AppBroadcast.verify|verify} messages.
         * @param message AppBroadcast message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppBroadcast.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppBroadcast message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppBroadcast & rustplus.AppBroadcast.$Shape} AppBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppBroadcast & rustplus.AppBroadcast.$Shape;

        /**
         * Decodes an AppBroadcast message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppBroadcast & rustplus.AppBroadcast.$Shape} AppBroadcast
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppBroadcast & rustplus.AppBroadcast.$Shape;

        /**
         * Verifies an AppBroadcast message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppBroadcast message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppBroadcast
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppBroadcast;

        /**
         * Creates a plain object from an AppBroadcast message. Also converts values to other types if specified.
         * @param message AppBroadcast
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppBroadcast, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppBroadcast to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppBroadcast
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppBroadcast {

        /** Properties of an AppBroadcast. */
        interface $Properties {

            /** AppBroadcast teamChanged */
            teamChanged?: (rustplus.AppTeamChanged.$Properties|null);

            /** AppBroadcast teamMessage */
            teamMessage?: (rustplus.AppNewTeamMessage.$Properties|null);

            /** AppBroadcast entityChanged */
            entityChanged?: (rustplus.AppEntityChanged.$Properties|null);

            /** AppBroadcast clanChanged */
            clanChanged?: (rustplus.AppClanChanged.$Properties|null);

            /** AppBroadcast clanMessage */
            clanMessage?: (rustplus.AppNewClanMessage.$Properties|null);

            /** AppBroadcast cameraRays */
            cameraRays?: (rustplus.AppCameraRays.$Properties|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppBroadcast. */
        type $Shape = rustplus.AppBroadcast.$Properties;
    }

    /**
     * Properties of an AppEmpty.
     * @deprecated Use rustplus.AppEmpty.$Properties instead.
     */
    interface IAppEmpty extends rustplus.AppEmpty.$Properties {
    }

    /** Represents an AppEmpty. */
    class AppEmpty {

        /**
         * Constructs a new AppEmpty.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppEmpty.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new AppEmpty instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppEmpty instance
         */
        static create(properties: rustplus.AppEmpty.$Shape): rustplus.AppEmpty & rustplus.AppEmpty.$Shape;
        static create(properties?: rustplus.AppEmpty.$Properties): rustplus.AppEmpty;

        /**
         * Encodes the specified AppEmpty message. Does not implicitly {@link rustplus.AppEmpty.verify|verify} messages.
         * @param message AppEmpty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppEmpty.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppEmpty message, length delimited. Does not implicitly {@link rustplus.AppEmpty.verify|verify} messages.
         * @param message AppEmpty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppEmpty.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppEmpty message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppEmpty & rustplus.AppEmpty.$Shape} AppEmpty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppEmpty & rustplus.AppEmpty.$Shape;

        /**
         * Decodes an AppEmpty message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppEmpty & rustplus.AppEmpty.$Shape} AppEmpty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppEmpty & rustplus.AppEmpty.$Shape;

        /**
         * Verifies an AppEmpty message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppEmpty message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppEmpty
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppEmpty;

        /**
         * Creates a plain object from an AppEmpty message. Also converts values to other types if specified.
         * @param message AppEmpty
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppEmpty, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppEmpty to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppEmpty
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppEmpty {

        /** Properties of an AppEmpty. */
        interface $Properties {

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppEmpty. */
        type $Shape = rustplus.AppEmpty.$Properties;
    }

    /**
     * Properties of an AppSendMessage.
     * @deprecated Use rustplus.AppSendMessage.$Properties instead.
     */
    interface IAppSendMessage extends rustplus.AppSendMessage.$Properties {
    }

    /** Represents an AppSendMessage. */
    class AppSendMessage {

        /**
         * Constructs a new AppSendMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppSendMessage.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppSendMessage message. */
        message: string;

        /**
         * Creates a new AppSendMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppSendMessage instance
         */
        static create(properties: rustplus.AppSendMessage.$Shape): rustplus.AppSendMessage & rustplus.AppSendMessage.$Shape;
        static create(properties?: rustplus.AppSendMessage.$Properties): rustplus.AppSendMessage;

        /**
         * Encodes the specified AppSendMessage message. Does not implicitly {@link rustplus.AppSendMessage.verify|verify} messages.
         * @param message AppSendMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppSendMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppSendMessage message, length delimited. Does not implicitly {@link rustplus.AppSendMessage.verify|verify} messages.
         * @param message AppSendMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppSendMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppSendMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppSendMessage & rustplus.AppSendMessage.$Shape} AppSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppSendMessage & rustplus.AppSendMessage.$Shape;

        /**
         * Decodes an AppSendMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppSendMessage & rustplus.AppSendMessage.$Shape} AppSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppSendMessage & rustplus.AppSendMessage.$Shape;

        /**
         * Verifies an AppSendMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppSendMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppSendMessage
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppSendMessage;

        /**
         * Creates a plain object from an AppSendMessage message. Also converts values to other types if specified.
         * @param message AppSendMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppSendMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppSendMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppSendMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppSendMessage {

        /** Properties of an AppSendMessage. */
        interface $Properties {

            /** AppSendMessage message */
            message: string;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppSendMessage. */
        type $Shape = rustplus.AppSendMessage.$Properties;
    }

    /**
     * Properties of an AppSetEntityValue.
     * @deprecated Use rustplus.AppSetEntityValue.$Properties instead.
     */
    interface IAppSetEntityValue extends rustplus.AppSetEntityValue.$Properties {
    }

    /** Represents an AppSetEntityValue. */
    class AppSetEntityValue {

        /**
         * Constructs a new AppSetEntityValue.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppSetEntityValue.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppSetEntityValue value. */
        value: boolean;

        /**
         * Creates a new AppSetEntityValue instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppSetEntityValue instance
         */
        static create(properties: rustplus.AppSetEntityValue.$Shape): rustplus.AppSetEntityValue & rustplus.AppSetEntityValue.$Shape;
        static create(properties?: rustplus.AppSetEntityValue.$Properties): rustplus.AppSetEntityValue;

        /**
         * Encodes the specified AppSetEntityValue message. Does not implicitly {@link rustplus.AppSetEntityValue.verify|verify} messages.
         * @param message AppSetEntityValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppSetEntityValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppSetEntityValue message, length delimited. Does not implicitly {@link rustplus.AppSetEntityValue.verify|verify} messages.
         * @param message AppSetEntityValue message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppSetEntityValue.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppSetEntityValue message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppSetEntityValue & rustplus.AppSetEntityValue.$Shape} AppSetEntityValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppSetEntityValue & rustplus.AppSetEntityValue.$Shape;

        /**
         * Decodes an AppSetEntityValue message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppSetEntityValue & rustplus.AppSetEntityValue.$Shape} AppSetEntityValue
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppSetEntityValue & rustplus.AppSetEntityValue.$Shape;

        /**
         * Verifies an AppSetEntityValue message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppSetEntityValue message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppSetEntityValue
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppSetEntityValue;

        /**
         * Creates a plain object from an AppSetEntityValue message. Also converts values to other types if specified.
         * @param message AppSetEntityValue
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppSetEntityValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppSetEntityValue to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppSetEntityValue
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppSetEntityValue {

        /** Properties of an AppSetEntityValue. */
        interface $Properties {

            /** AppSetEntityValue value */
            value: boolean;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppSetEntityValue. */
        type $Shape = rustplus.AppSetEntityValue.$Properties;
    }

    /**
     * Properties of an AppPromoteToLeader.
     * @deprecated Use rustplus.AppPromoteToLeader.$Properties instead.
     */
    interface IAppPromoteToLeader extends rustplus.AppPromoteToLeader.$Properties {
    }

    /** Represents an AppPromoteToLeader. */
    class AppPromoteToLeader {

        /**
         * Constructs a new AppPromoteToLeader.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppPromoteToLeader.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppPromoteToLeader steamId. */
        steamId: (number|Long);

        /**
         * Creates a new AppPromoteToLeader instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppPromoteToLeader instance
         */
        static create(properties: rustplus.AppPromoteToLeader.$Shape): rustplus.AppPromoteToLeader & rustplus.AppPromoteToLeader.$Shape;
        static create(properties?: rustplus.AppPromoteToLeader.$Properties): rustplus.AppPromoteToLeader;

        /**
         * Encodes the specified AppPromoteToLeader message. Does not implicitly {@link rustplus.AppPromoteToLeader.verify|verify} messages.
         * @param message AppPromoteToLeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppPromoteToLeader.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppPromoteToLeader message, length delimited. Does not implicitly {@link rustplus.AppPromoteToLeader.verify|verify} messages.
         * @param message AppPromoteToLeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppPromoteToLeader.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppPromoteToLeader message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppPromoteToLeader & rustplus.AppPromoteToLeader.$Shape} AppPromoteToLeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppPromoteToLeader & rustplus.AppPromoteToLeader.$Shape;

        /**
         * Decodes an AppPromoteToLeader message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppPromoteToLeader & rustplus.AppPromoteToLeader.$Shape} AppPromoteToLeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppPromoteToLeader & rustplus.AppPromoteToLeader.$Shape;

        /**
         * Verifies an AppPromoteToLeader message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppPromoteToLeader message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppPromoteToLeader
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppPromoteToLeader;

        /**
         * Creates a plain object from an AppPromoteToLeader message. Also converts values to other types if specified.
         * @param message AppPromoteToLeader
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppPromoteToLeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppPromoteToLeader to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppPromoteToLeader
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppPromoteToLeader {

        /** Properties of an AppPromoteToLeader. */
        interface $Properties {

            /** AppPromoteToLeader steamId */
            steamId: (number|Long);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppPromoteToLeader. */
        type $Shape = rustplus.AppPromoteToLeader.$Properties;
    }

    /**
     * Properties of an AppGetNexusAuth.
     * @deprecated Use rustplus.AppGetNexusAuth.$Properties instead.
     */
    interface IAppGetNexusAuth extends rustplus.AppGetNexusAuth.$Properties {
    }

    /** Represents an AppGetNexusAuth. */
    class AppGetNexusAuth {

        /**
         * Constructs a new AppGetNexusAuth.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppGetNexusAuth.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppGetNexusAuth appKey. */
        appKey: string;

        /**
         * Creates a new AppGetNexusAuth instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppGetNexusAuth instance
         */
        static create(properties: rustplus.AppGetNexusAuth.$Shape): rustplus.AppGetNexusAuth & rustplus.AppGetNexusAuth.$Shape;
        static create(properties?: rustplus.AppGetNexusAuth.$Properties): rustplus.AppGetNexusAuth;

        /**
         * Encodes the specified AppGetNexusAuth message. Does not implicitly {@link rustplus.AppGetNexusAuth.verify|verify} messages.
         * @param message AppGetNexusAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppGetNexusAuth.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppGetNexusAuth message, length delimited. Does not implicitly {@link rustplus.AppGetNexusAuth.verify|verify} messages.
         * @param message AppGetNexusAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppGetNexusAuth.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppGetNexusAuth message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppGetNexusAuth & rustplus.AppGetNexusAuth.$Shape} AppGetNexusAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppGetNexusAuth & rustplus.AppGetNexusAuth.$Shape;

        /**
         * Decodes an AppGetNexusAuth message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppGetNexusAuth & rustplus.AppGetNexusAuth.$Shape} AppGetNexusAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppGetNexusAuth & rustplus.AppGetNexusAuth.$Shape;

        /**
         * Verifies an AppGetNexusAuth message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppGetNexusAuth message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppGetNexusAuth
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppGetNexusAuth;

        /**
         * Creates a plain object from an AppGetNexusAuth message. Also converts values to other types if specified.
         * @param message AppGetNexusAuth
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppGetNexusAuth, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppGetNexusAuth to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppGetNexusAuth
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppGetNexusAuth {

        /** Properties of an AppGetNexusAuth. */
        interface $Properties {

            /** AppGetNexusAuth appKey */
            appKey: string;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppGetNexusAuth. */
        type $Shape = rustplus.AppGetNexusAuth.$Properties;
    }

    /**
     * Properties of an AppSuccess.
     * @deprecated Use rustplus.AppSuccess.$Properties instead.
     */
    interface IAppSuccess extends rustplus.AppSuccess.$Properties {
    }

    /** Represents an AppSuccess. */
    class AppSuccess {

        /**
         * Constructs a new AppSuccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppSuccess.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /**
         * Creates a new AppSuccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppSuccess instance
         */
        static create(properties: rustplus.AppSuccess.$Shape): rustplus.AppSuccess & rustplus.AppSuccess.$Shape;
        static create(properties?: rustplus.AppSuccess.$Properties): rustplus.AppSuccess;

        /**
         * Encodes the specified AppSuccess message. Does not implicitly {@link rustplus.AppSuccess.verify|verify} messages.
         * @param message AppSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppSuccess.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppSuccess message, length delimited. Does not implicitly {@link rustplus.AppSuccess.verify|verify} messages.
         * @param message AppSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppSuccess.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppSuccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppSuccess & rustplus.AppSuccess.$Shape} AppSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppSuccess & rustplus.AppSuccess.$Shape;

        /**
         * Decodes an AppSuccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppSuccess & rustplus.AppSuccess.$Shape} AppSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppSuccess & rustplus.AppSuccess.$Shape;

        /**
         * Verifies an AppSuccess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppSuccess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppSuccess
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppSuccess;

        /**
         * Creates a plain object from an AppSuccess message. Also converts values to other types if specified.
         * @param message AppSuccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppSuccess to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppSuccess
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppSuccess {

        /** Properties of an AppSuccess. */
        interface $Properties {

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppSuccess. */
        type $Shape = rustplus.AppSuccess.$Properties;
    }

    /**
     * Properties of an AppError.
     * @deprecated Use rustplus.AppError.$Properties instead.
     */
    interface IAppError extends rustplus.AppError.$Properties {
    }

    /** Represents an AppError. */
    class AppError {

        /**
         * Constructs a new AppError.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppError.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppError error. */
        error: string;

        /**
         * Creates a new AppError instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppError instance
         */
        static create(properties: rustplus.AppError.$Shape): rustplus.AppError & rustplus.AppError.$Shape;
        static create(properties?: rustplus.AppError.$Properties): rustplus.AppError;

        /**
         * Encodes the specified AppError message. Does not implicitly {@link rustplus.AppError.verify|verify} messages.
         * @param message AppError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppError.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppError message, length delimited. Does not implicitly {@link rustplus.AppError.verify|verify} messages.
         * @param message AppError message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppError.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppError message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppError & rustplus.AppError.$Shape} AppError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppError & rustplus.AppError.$Shape;

        /**
         * Decodes an AppError message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppError & rustplus.AppError.$Shape} AppError
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppError & rustplus.AppError.$Shape;

        /**
         * Verifies an AppError message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppError message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppError
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppError;

        /**
         * Creates a plain object from an AppError message. Also converts values to other types if specified.
         * @param message AppError
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppError, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppError to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppError
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppError {

        /** Properties of an AppError. */
        interface $Properties {

            /** AppError error */
            error: string;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppError. */
        type $Shape = rustplus.AppError.$Properties;
    }

    /**
     * Properties of an AppFlag.
     * @deprecated Use rustplus.AppFlag.$Properties instead.
     */
    interface IAppFlag extends rustplus.AppFlag.$Properties {
    }

    /** Represents an AppFlag. */
    class AppFlag {

        /**
         * Constructs a new AppFlag.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppFlag.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppFlag value. */
        value: boolean;

        /**
         * Creates a new AppFlag instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppFlag instance
         */
        static create(properties: rustplus.AppFlag.$Shape): rustplus.AppFlag & rustplus.AppFlag.$Shape;
        static create(properties?: rustplus.AppFlag.$Properties): rustplus.AppFlag;

        /**
         * Encodes the specified AppFlag message. Does not implicitly {@link rustplus.AppFlag.verify|verify} messages.
         * @param message AppFlag message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppFlag.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppFlag message, length delimited. Does not implicitly {@link rustplus.AppFlag.verify|verify} messages.
         * @param message AppFlag message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppFlag.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppFlag message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppFlag & rustplus.AppFlag.$Shape} AppFlag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppFlag & rustplus.AppFlag.$Shape;

        /**
         * Decodes an AppFlag message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppFlag & rustplus.AppFlag.$Shape} AppFlag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppFlag & rustplus.AppFlag.$Shape;

        /**
         * Verifies an AppFlag message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppFlag message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppFlag
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppFlag;

        /**
         * Creates a plain object from an AppFlag message. Also converts values to other types if specified.
         * @param message AppFlag
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppFlag, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppFlag to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppFlag
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppFlag {

        /** Properties of an AppFlag. */
        interface $Properties {

            /** AppFlag value */
            value: boolean;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppFlag. */
        type $Shape = rustplus.AppFlag.$Properties;
    }

    /**
     * Properties of an AppInfo.
     * @deprecated Use rustplus.AppInfo.$Properties instead.
     */
    interface IAppInfo extends rustplus.AppInfo.$Properties {
    }

    /** Represents an AppInfo. */
    class AppInfo {

        /**
         * Constructs a new AppInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppInfo.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppInfo name. */
        name: string;

        /** AppInfo headerImage. */
        headerImage: string;

        /** AppInfo url. */
        url: string;

        /** AppInfo map. */
        map: string;

        /** AppInfo mapSize. */
        mapSize: number;

        /** AppInfo wipeTime. */
        wipeTime: number;

        /** AppInfo players. */
        players: number;

        /** AppInfo maxPlayers. */
        maxPlayers: number;

        /** AppInfo queuedPlayers. */
        queuedPlayers: number;

        /** AppInfo seed. */
        seed: number;

        /** AppInfo salt. */
        salt: number;

        /** AppInfo logoImage. */
        logoImage: string;

        /** AppInfo nexus. */
        nexus: string;

        /** AppInfo nexusId. */
        nexusId: number;

        /** AppInfo nexusZone. */
        nexusZone: string;

        /**
         * Creates a new AppInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppInfo instance
         */
        static create(properties: rustplus.AppInfo.$Shape): rustplus.AppInfo & rustplus.AppInfo.$Shape;
        static create(properties?: rustplus.AppInfo.$Properties): rustplus.AppInfo;

        /**
         * Encodes the specified AppInfo message. Does not implicitly {@link rustplus.AppInfo.verify|verify} messages.
         * @param message AppInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppInfo message, length delimited. Does not implicitly {@link rustplus.AppInfo.verify|verify} messages.
         * @param message AppInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppInfo & rustplus.AppInfo.$Shape} AppInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppInfo & rustplus.AppInfo.$Shape;

        /**
         * Decodes an AppInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppInfo & rustplus.AppInfo.$Shape} AppInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppInfo & rustplus.AppInfo.$Shape;

        /**
         * Verifies an AppInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppInfo
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppInfo;

        /**
         * Creates a plain object from an AppInfo message. Also converts values to other types if specified.
         * @param message AppInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppInfo {

        /** Properties of an AppInfo. */
        interface $Properties {

            /** AppInfo name */
            name: string;

            /** AppInfo headerImage */
            headerImage: string;

            /** AppInfo url */
            url: string;

            /** AppInfo map */
            map: string;

            /** AppInfo mapSize */
            mapSize: number;

            /** AppInfo wipeTime */
            wipeTime: number;

            /** AppInfo players */
            players: number;

            /** AppInfo maxPlayers */
            maxPlayers: number;

            /** AppInfo queuedPlayers */
            queuedPlayers: number;

            /** AppInfo seed */
            seed?: (number|null);

            /** AppInfo salt */
            salt?: (number|null);

            /** AppInfo logoImage */
            logoImage?: (string|null);

            /** AppInfo nexus */
            nexus?: (string|null);

            /** AppInfo nexusId */
            nexusId?: (number|null);

            /** AppInfo nexusZone */
            nexusZone?: (string|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppInfo. */
        type $Shape = rustplus.AppInfo.$Properties;
    }

    /**
     * Properties of an AppTime.
     * @deprecated Use rustplus.AppTime.$Properties instead.
     */
    interface IAppTime extends rustplus.AppTime.$Properties {
    }

    /** Represents an AppTime. */
    class AppTime {

        /**
         * Constructs a new AppTime.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppTime.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppTime dayLengthMinutes. */
        dayLengthMinutes: number;

        /** AppTime timeScale. */
        timeScale: number;

        /** AppTime sunrise. */
        sunrise: number;

        /** AppTime sunset. */
        sunset: number;

        /** AppTime time. */
        time: number;

        /**
         * Creates a new AppTime instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppTime instance
         */
        static create(properties: rustplus.AppTime.$Shape): rustplus.AppTime & rustplus.AppTime.$Shape;
        static create(properties?: rustplus.AppTime.$Properties): rustplus.AppTime;

        /**
         * Encodes the specified AppTime message. Does not implicitly {@link rustplus.AppTime.verify|verify} messages.
         * @param message AppTime message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppTime.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppTime message, length delimited. Does not implicitly {@link rustplus.AppTime.verify|verify} messages.
         * @param message AppTime message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppTime.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppTime message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppTime & rustplus.AppTime.$Shape} AppTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppTime & rustplus.AppTime.$Shape;

        /**
         * Decodes an AppTime message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppTime & rustplus.AppTime.$Shape} AppTime
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppTime & rustplus.AppTime.$Shape;

        /**
         * Verifies an AppTime message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppTime message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppTime
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppTime;

        /**
         * Creates a plain object from an AppTime message. Also converts values to other types if specified.
         * @param message AppTime
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppTime, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppTime to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppTime
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppTime {

        /** Properties of an AppTime. */
        interface $Properties {

            /** AppTime dayLengthMinutes */
            dayLengthMinutes: number;

            /** AppTime timeScale */
            timeScale: number;

            /** AppTime sunrise */
            sunrise: number;

            /** AppTime sunset */
            sunset: number;

            /** AppTime time */
            time: number;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppTime. */
        type $Shape = rustplus.AppTime.$Properties;
    }

    /**
     * Properties of an AppMap.
     * @deprecated Use rustplus.AppMap.$Properties instead.
     */
    interface IAppMap extends rustplus.AppMap.$Properties {
    }

    /** Represents an AppMap. */
    class AppMap {

        /**
         * Constructs a new AppMap.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppMap.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppMap width. */
        width: number;

        /** AppMap height. */
        height: number;

        /** AppMap jpgImage. */
        jpgImage: Uint8Array;

        /** AppMap oceanMargin. */
        oceanMargin: number;

        /** AppMap monuments. */
        monuments: rustplus.AppMap.Monument.$Properties[];

        /** AppMap background. */
        background: string;

        /**
         * Creates a new AppMap instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppMap instance
         */
        static create(properties: rustplus.AppMap.$Shape): rustplus.AppMap & rustplus.AppMap.$Shape;
        static create(properties?: rustplus.AppMap.$Properties): rustplus.AppMap;

        /**
         * Encodes the specified AppMap message. Does not implicitly {@link rustplus.AppMap.verify|verify} messages.
         * @param message AppMap message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppMap.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppMap message, length delimited. Does not implicitly {@link rustplus.AppMap.verify|verify} messages.
         * @param message AppMap message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppMap.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppMap message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppMap & rustplus.AppMap.$Shape} AppMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppMap & rustplus.AppMap.$Shape;

        /**
         * Decodes an AppMap message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppMap & rustplus.AppMap.$Shape} AppMap
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppMap & rustplus.AppMap.$Shape;

        /**
         * Verifies an AppMap message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppMap message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppMap
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppMap;

        /**
         * Creates a plain object from an AppMap message. Also converts values to other types if specified.
         * @param message AppMap
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppMap, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppMap to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppMap
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppMap {

        /** Properties of an AppMap. */
        interface $Properties {

            /** AppMap width */
            width: number;

            /** AppMap height */
            height: number;

            /** AppMap jpgImage */
            jpgImage: Uint8Array;

            /** AppMap oceanMargin */
            oceanMargin: number;

            /** AppMap monuments */
            monuments?: (rustplus.AppMap.Monument.$Properties[]|null);

            /** AppMap background */
            background?: (string|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppMap. */
        type $Shape = rustplus.AppMap.$Properties;

        /**
         * Properties of a Monument.
         * @deprecated Use rustplus.AppMap.Monument.$Properties instead.
         */
        interface IMonument extends rustplus.AppMap.Monument.$Properties {
        }

        /** Represents a Monument. */
        class Monument {

            /**
             * Constructs a new Monument.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.AppMap.Monument.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Monument token. */
            token: string;

            /** Monument x. */
            x: number;

            /** Monument y. */
            y: number;

            /**
             * Creates a new Monument instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Monument instance
             */
            static create(properties: rustplus.AppMap.Monument.$Shape): rustplus.AppMap.Monument & rustplus.AppMap.Monument.$Shape;
            static create(properties?: rustplus.AppMap.Monument.$Properties): rustplus.AppMap.Monument;

            /**
             * Encodes the specified Monument message. Does not implicitly {@link rustplus.AppMap.Monument.verify|verify} messages.
             * @param message Monument message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.AppMap.Monument.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Monument message, length delimited. Does not implicitly {@link rustplus.AppMap.Monument.verify|verify} messages.
             * @param message Monument message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.AppMap.Monument.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Monument message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.AppMap.Monument & rustplus.AppMap.Monument.$Shape} Monument
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppMap.Monument & rustplus.AppMap.Monument.$Shape;

            /**
             * Decodes a Monument message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.AppMap.Monument & rustplus.AppMap.Monument.$Shape} Monument
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppMap.Monument & rustplus.AppMap.Monument.$Shape;

            /**
             * Verifies a Monument message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Monument message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Monument
             */
            static fromObject(object: { [k: string]: any }): rustplus.AppMap.Monument;

            /**
             * Creates a plain object from a Monument message. Also converts values to other types if specified.
             * @param message Monument
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.AppMap.Monument, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Monument to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Monument
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Monument {

            /** Properties of a Monument. */
            interface $Properties {

                /** Monument token */
                token: string;

                /** Monument x */
                x: number;

                /** Monument y */
                y: number;

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Monument. */
            type $Shape = rustplus.AppMap.Monument.$Properties;
        }
    }

    /**
     * Properties of an AppEntityInfo.
     * @deprecated Use rustplus.AppEntityInfo.$Properties instead.
     */
    interface IAppEntityInfo extends rustplus.AppEntityInfo.$Properties {
    }

    /** Represents an AppEntityInfo. */
    class AppEntityInfo {

        /**
         * Constructs a new AppEntityInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppEntityInfo.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppEntityInfo type. */
        type: rustplus.AppEntityType;

        /** AppEntityInfo payload. */
        payload: rustplus.AppEntityPayload.$Properties;

        /**
         * Creates a new AppEntityInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppEntityInfo instance
         */
        static create(properties: rustplus.AppEntityInfo.$Shape): rustplus.AppEntityInfo & rustplus.AppEntityInfo.$Shape;
        static create(properties?: rustplus.AppEntityInfo.$Properties): rustplus.AppEntityInfo;

        /**
         * Encodes the specified AppEntityInfo message. Does not implicitly {@link rustplus.AppEntityInfo.verify|verify} messages.
         * @param message AppEntityInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppEntityInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppEntityInfo message, length delimited. Does not implicitly {@link rustplus.AppEntityInfo.verify|verify} messages.
         * @param message AppEntityInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppEntityInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppEntityInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppEntityInfo & rustplus.AppEntityInfo.$Shape} AppEntityInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppEntityInfo & rustplus.AppEntityInfo.$Shape;

        /**
         * Decodes an AppEntityInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppEntityInfo & rustplus.AppEntityInfo.$Shape} AppEntityInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppEntityInfo & rustplus.AppEntityInfo.$Shape;

        /**
         * Verifies an AppEntityInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppEntityInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppEntityInfo
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppEntityInfo;

        /**
         * Creates a plain object from an AppEntityInfo message. Also converts values to other types if specified.
         * @param message AppEntityInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppEntityInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppEntityInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppEntityInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppEntityInfo {

        /** Properties of an AppEntityInfo. */
        interface $Properties {

            /** AppEntityInfo type */
            type: rustplus.AppEntityType;

            /** AppEntityInfo payload */
            payload: rustplus.AppEntityPayload.$Properties;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppEntityInfo. */
        type $Shape = rustplus.AppEntityInfo.$Properties;
    }

    /**
     * Properties of an AppEntityPayload.
     * @deprecated Use rustplus.AppEntityPayload.$Properties instead.
     */
    interface IAppEntityPayload extends rustplus.AppEntityPayload.$Properties {
    }

    /** Represents an AppEntityPayload. */
    class AppEntityPayload {

        /**
         * Constructs a new AppEntityPayload.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppEntityPayload.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppEntityPayload value. */
        value: boolean;

        /** AppEntityPayload items. */
        items: rustplus.AppEntityPayload.Item.$Properties[];

        /** AppEntityPayload capacity. */
        capacity: number;

        /** AppEntityPayload hasProtection. */
        hasProtection: boolean;

        /** AppEntityPayload protectionExpiry. */
        protectionExpiry: number;

        /**
         * Creates a new AppEntityPayload instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppEntityPayload instance
         */
        static create(properties: rustplus.AppEntityPayload.$Shape): rustplus.AppEntityPayload & rustplus.AppEntityPayload.$Shape;
        static create(properties?: rustplus.AppEntityPayload.$Properties): rustplus.AppEntityPayload;

        /**
         * Encodes the specified AppEntityPayload message. Does not implicitly {@link rustplus.AppEntityPayload.verify|verify} messages.
         * @param message AppEntityPayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppEntityPayload.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppEntityPayload message, length delimited. Does not implicitly {@link rustplus.AppEntityPayload.verify|verify} messages.
         * @param message AppEntityPayload message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppEntityPayload.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppEntityPayload message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppEntityPayload & rustplus.AppEntityPayload.$Shape} AppEntityPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppEntityPayload & rustplus.AppEntityPayload.$Shape;

        /**
         * Decodes an AppEntityPayload message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppEntityPayload & rustplus.AppEntityPayload.$Shape} AppEntityPayload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppEntityPayload & rustplus.AppEntityPayload.$Shape;

        /**
         * Verifies an AppEntityPayload message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppEntityPayload message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppEntityPayload
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppEntityPayload;

        /**
         * Creates a plain object from an AppEntityPayload message. Also converts values to other types if specified.
         * @param message AppEntityPayload
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppEntityPayload, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppEntityPayload to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppEntityPayload
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppEntityPayload {

        /** Properties of an AppEntityPayload. */
        interface $Properties {

            /** AppEntityPayload value */
            value?: (boolean|null);

            /** AppEntityPayload items */
            items?: (rustplus.AppEntityPayload.Item.$Properties[]|null);

            /** AppEntityPayload capacity */
            capacity?: (number|null);

            /** AppEntityPayload hasProtection */
            hasProtection?: (boolean|null);

            /** AppEntityPayload protectionExpiry */
            protectionExpiry?: (number|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppEntityPayload. */
        type $Shape = rustplus.AppEntityPayload.$Properties;

        /**
         * Properties of an Item.
         * @deprecated Use rustplus.AppEntityPayload.Item.$Properties instead.
         */
        interface IItem extends rustplus.AppEntityPayload.Item.$Properties {
        }

        /** Represents an Item. */
        class Item {

            /**
             * Constructs a new Item.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.AppEntityPayload.Item.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Item itemId. */
            itemId: number;

            /** Item quantity. */
            quantity: number;

            /** Item itemIsBlueprint. */
            itemIsBlueprint: boolean;

            /**
             * Creates a new Item instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Item instance
             */
            static create(properties: rustplus.AppEntityPayload.Item.$Shape): rustplus.AppEntityPayload.Item & rustplus.AppEntityPayload.Item.$Shape;
            static create(properties?: rustplus.AppEntityPayload.Item.$Properties): rustplus.AppEntityPayload.Item;

            /**
             * Encodes the specified Item message. Does not implicitly {@link rustplus.AppEntityPayload.Item.verify|verify} messages.
             * @param message Item message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.AppEntityPayload.Item.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Item message, length delimited. Does not implicitly {@link rustplus.AppEntityPayload.Item.verify|verify} messages.
             * @param message Item message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.AppEntityPayload.Item.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Item message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.AppEntityPayload.Item & rustplus.AppEntityPayload.Item.$Shape} Item
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppEntityPayload.Item & rustplus.AppEntityPayload.Item.$Shape;

            /**
             * Decodes an Item message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.AppEntityPayload.Item & rustplus.AppEntityPayload.Item.$Shape} Item
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppEntityPayload.Item & rustplus.AppEntityPayload.Item.$Shape;

            /**
             * Verifies an Item message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Item message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Item
             */
            static fromObject(object: { [k: string]: any }): rustplus.AppEntityPayload.Item;

            /**
             * Creates a plain object from an Item message. Also converts values to other types if specified.
             * @param message Item
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.AppEntityPayload.Item, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Item to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Item
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Item {

            /** Properties of an Item. */
            interface $Properties {

                /** Item itemId */
                itemId: number;

                /** Item quantity */
                quantity: number;

                /** Item itemIsBlueprint */
                itemIsBlueprint: boolean;

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Item. */
            type $Shape = rustplus.AppEntityPayload.Item.$Properties;
        }
    }

    /**
     * Properties of an AppTeamInfo.
     * @deprecated Use rustplus.AppTeamInfo.$Properties instead.
     */
    interface IAppTeamInfo extends rustplus.AppTeamInfo.$Properties {
    }

    /** Represents an AppTeamInfo. */
    class AppTeamInfo {

        /**
         * Constructs a new AppTeamInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppTeamInfo.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppTeamInfo leaderSteamId. */
        leaderSteamId: (number|Long);

        /** AppTeamInfo members. */
        members: rustplus.AppTeamInfo.Member.$Properties[];

        /** AppTeamInfo mapNotes. */
        mapNotes: rustplus.AppTeamInfo.Note.$Properties[];

        /** AppTeamInfo leaderMapNotes. */
        leaderMapNotes: rustplus.AppTeamInfo.Note.$Properties[];

        /**
         * Creates a new AppTeamInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppTeamInfo instance
         */
        static create(properties: rustplus.AppTeamInfo.$Shape): rustplus.AppTeamInfo & rustplus.AppTeamInfo.$Shape;
        static create(properties?: rustplus.AppTeamInfo.$Properties): rustplus.AppTeamInfo;

        /**
         * Encodes the specified AppTeamInfo message. Does not implicitly {@link rustplus.AppTeamInfo.verify|verify} messages.
         * @param message AppTeamInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppTeamInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppTeamInfo message, length delimited. Does not implicitly {@link rustplus.AppTeamInfo.verify|verify} messages.
         * @param message AppTeamInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppTeamInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppTeamInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppTeamInfo & rustplus.AppTeamInfo.$Shape} AppTeamInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppTeamInfo & rustplus.AppTeamInfo.$Shape;

        /**
         * Decodes an AppTeamInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppTeamInfo & rustplus.AppTeamInfo.$Shape} AppTeamInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppTeamInfo & rustplus.AppTeamInfo.$Shape;

        /**
         * Verifies an AppTeamInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppTeamInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppTeamInfo
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppTeamInfo;

        /**
         * Creates a plain object from an AppTeamInfo message. Also converts values to other types if specified.
         * @param message AppTeamInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppTeamInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppTeamInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppTeamInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppTeamInfo {

        /** Properties of an AppTeamInfo. */
        interface $Properties {

            /** AppTeamInfo leaderSteamId */
            leaderSteamId: (number|Long);

            /** AppTeamInfo members */
            members?: (rustplus.AppTeamInfo.Member.$Properties[]|null);

            /** AppTeamInfo mapNotes */
            mapNotes?: (rustplus.AppTeamInfo.Note.$Properties[]|null);

            /** AppTeamInfo leaderMapNotes */
            leaderMapNotes?: (rustplus.AppTeamInfo.Note.$Properties[]|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppTeamInfo. */
        type $Shape = rustplus.AppTeamInfo.$Properties;

        /**
         * Properties of a Member.
         * @deprecated Use rustplus.AppTeamInfo.Member.$Properties instead.
         */
        interface IMember extends rustplus.AppTeamInfo.Member.$Properties {
        }

        /** Represents a Member. */
        class Member {

            /**
             * Constructs a new Member.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.AppTeamInfo.Member.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Member steamId. */
            steamId: (number|Long);

            /** Member name. */
            name: string;

            /** Member x. */
            x: number;

            /** Member y. */
            y: number;

            /** Member isOnline. */
            isOnline: boolean;

            /** Member spawnTime. */
            spawnTime: number;

            /** Member isAlive. */
            isAlive: boolean;

            /** Member deathTime. */
            deathTime: number;

            /**
             * Creates a new Member instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Member instance
             */
            static create(properties: rustplus.AppTeamInfo.Member.$Shape): rustplus.AppTeamInfo.Member & rustplus.AppTeamInfo.Member.$Shape;
            static create(properties?: rustplus.AppTeamInfo.Member.$Properties): rustplus.AppTeamInfo.Member;

            /**
             * Encodes the specified Member message. Does not implicitly {@link rustplus.AppTeamInfo.Member.verify|verify} messages.
             * @param message Member message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.AppTeamInfo.Member.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Member message, length delimited. Does not implicitly {@link rustplus.AppTeamInfo.Member.verify|verify} messages.
             * @param message Member message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.AppTeamInfo.Member.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Member message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.AppTeamInfo.Member & rustplus.AppTeamInfo.Member.$Shape} Member
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppTeamInfo.Member & rustplus.AppTeamInfo.Member.$Shape;

            /**
             * Decodes a Member message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.AppTeamInfo.Member & rustplus.AppTeamInfo.Member.$Shape} Member
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppTeamInfo.Member & rustplus.AppTeamInfo.Member.$Shape;

            /**
             * Verifies a Member message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Member message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Member
             */
            static fromObject(object: { [k: string]: any }): rustplus.AppTeamInfo.Member;

            /**
             * Creates a plain object from a Member message. Also converts values to other types if specified.
             * @param message Member
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.AppTeamInfo.Member, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Member to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Member
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Member {

            /** Properties of a Member. */
            interface $Properties {

                /** Member steamId */
                steamId: (number|Long);

                /** Member name */
                name: string;

                /** Member x */
                x: number;

                /** Member y */
                y: number;

                /** Member isOnline */
                isOnline: boolean;

                /** Member spawnTime */
                spawnTime: number;

                /** Member isAlive */
                isAlive: boolean;

                /** Member deathTime */
                deathTime: number;

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Member. */
            type $Shape = rustplus.AppTeamInfo.Member.$Properties;
        }

        /**
         * Properties of a Note.
         * @deprecated Use rustplus.AppTeamInfo.Note.$Properties instead.
         */
        interface INote extends rustplus.AppTeamInfo.Note.$Properties {
        }

        /** Represents a Note. */
        class Note {

            /**
             * Constructs a new Note.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.AppTeamInfo.Note.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Note type. */
            type: number;

            /** Note x. */
            x: number;

            /** Note y. */
            y: number;

            /**
             * Creates a new Note instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Note instance
             */
            static create(properties: rustplus.AppTeamInfo.Note.$Shape): rustplus.AppTeamInfo.Note & rustplus.AppTeamInfo.Note.$Shape;
            static create(properties?: rustplus.AppTeamInfo.Note.$Properties): rustplus.AppTeamInfo.Note;

            /**
             * Encodes the specified Note message. Does not implicitly {@link rustplus.AppTeamInfo.Note.verify|verify} messages.
             * @param message Note message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.AppTeamInfo.Note.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Note message, length delimited. Does not implicitly {@link rustplus.AppTeamInfo.Note.verify|verify} messages.
             * @param message Note message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.AppTeamInfo.Note.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Note message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.AppTeamInfo.Note & rustplus.AppTeamInfo.Note.$Shape} Note
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppTeamInfo.Note & rustplus.AppTeamInfo.Note.$Shape;

            /**
             * Decodes a Note message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.AppTeamInfo.Note & rustplus.AppTeamInfo.Note.$Shape} Note
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppTeamInfo.Note & rustplus.AppTeamInfo.Note.$Shape;

            /**
             * Verifies a Note message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Note message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Note
             */
            static fromObject(object: { [k: string]: any }): rustplus.AppTeamInfo.Note;

            /**
             * Creates a plain object from a Note message. Also converts values to other types if specified.
             * @param message Note
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.AppTeamInfo.Note, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Note to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Note
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Note {

            /** Properties of a Note. */
            interface $Properties {

                /** Note type */
                type: number;

                /** Note x */
                x: number;

                /** Note y */
                y: number;

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Note. */
            type $Shape = rustplus.AppTeamInfo.Note.$Properties;
        }
    }

    /**
     * Properties of an AppTeamMessage.
     * @deprecated Use rustplus.AppTeamMessage.$Properties instead.
     */
    interface IAppTeamMessage extends rustplus.AppTeamMessage.$Properties {
    }

    /** Represents an AppTeamMessage. */
    class AppTeamMessage {

        /**
         * Constructs a new AppTeamMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppTeamMessage.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppTeamMessage steamId. */
        steamId: (number|Long);

        /** AppTeamMessage name. */
        name: string;

        /** AppTeamMessage message. */
        message: string;

        /** AppTeamMessage color. */
        color: string;

        /** AppTeamMessage time. */
        time: number;

        /**
         * Creates a new AppTeamMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppTeamMessage instance
         */
        static create(properties: rustplus.AppTeamMessage.$Shape): rustplus.AppTeamMessage & rustplus.AppTeamMessage.$Shape;
        static create(properties?: rustplus.AppTeamMessage.$Properties): rustplus.AppTeamMessage;

        /**
         * Encodes the specified AppTeamMessage message. Does not implicitly {@link rustplus.AppTeamMessage.verify|verify} messages.
         * @param message AppTeamMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppTeamMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppTeamMessage message, length delimited. Does not implicitly {@link rustplus.AppTeamMessage.verify|verify} messages.
         * @param message AppTeamMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppTeamMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppTeamMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppTeamMessage & rustplus.AppTeamMessage.$Shape} AppTeamMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppTeamMessage & rustplus.AppTeamMessage.$Shape;

        /**
         * Decodes an AppTeamMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppTeamMessage & rustplus.AppTeamMessage.$Shape} AppTeamMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppTeamMessage & rustplus.AppTeamMessage.$Shape;

        /**
         * Verifies an AppTeamMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppTeamMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppTeamMessage
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppTeamMessage;

        /**
         * Creates a plain object from an AppTeamMessage message. Also converts values to other types if specified.
         * @param message AppTeamMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppTeamMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppTeamMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppTeamMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppTeamMessage {

        /** Properties of an AppTeamMessage. */
        interface $Properties {

            /** AppTeamMessage steamId */
            steamId: (number|Long);

            /** AppTeamMessage name */
            name: string;

            /** AppTeamMessage message */
            message: string;

            /** AppTeamMessage color */
            color: string;

            /** AppTeamMessage time */
            time: number;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppTeamMessage. */
        type $Shape = rustplus.AppTeamMessage.$Properties;
    }

    /**
     * Properties of an AppTeamChat.
     * @deprecated Use rustplus.AppTeamChat.$Properties instead.
     */
    interface IAppTeamChat extends rustplus.AppTeamChat.$Properties {
    }

    /** Represents an AppTeamChat. */
    class AppTeamChat {

        /**
         * Constructs a new AppTeamChat.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppTeamChat.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppTeamChat messages. */
        messages: rustplus.AppTeamMessage.$Properties[];

        /**
         * Creates a new AppTeamChat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppTeamChat instance
         */
        static create(properties: rustplus.AppTeamChat.$Shape): rustplus.AppTeamChat & rustplus.AppTeamChat.$Shape;
        static create(properties?: rustplus.AppTeamChat.$Properties): rustplus.AppTeamChat;

        /**
         * Encodes the specified AppTeamChat message. Does not implicitly {@link rustplus.AppTeamChat.verify|verify} messages.
         * @param message AppTeamChat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppTeamChat.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppTeamChat message, length delimited. Does not implicitly {@link rustplus.AppTeamChat.verify|verify} messages.
         * @param message AppTeamChat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppTeamChat.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppTeamChat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppTeamChat & rustplus.AppTeamChat.$Shape} AppTeamChat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppTeamChat & rustplus.AppTeamChat.$Shape;

        /**
         * Decodes an AppTeamChat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppTeamChat & rustplus.AppTeamChat.$Shape} AppTeamChat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppTeamChat & rustplus.AppTeamChat.$Shape;

        /**
         * Verifies an AppTeamChat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppTeamChat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppTeamChat
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppTeamChat;

        /**
         * Creates a plain object from an AppTeamChat message. Also converts values to other types if specified.
         * @param message AppTeamChat
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppTeamChat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppTeamChat to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppTeamChat
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppTeamChat {

        /** Properties of an AppTeamChat. */
        interface $Properties {

            /** AppTeamChat messages */
            messages?: (rustplus.AppTeamMessage.$Properties[]|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppTeamChat. */
        type $Shape = rustplus.AppTeamChat.$Properties;
    }

    /**
     * Properties of an AppMarker.
     * @deprecated Use rustplus.AppMarker.$Properties instead.
     */
    interface IAppMarker extends rustplus.AppMarker.$Properties {
    }

    /** Represents an AppMarker. */
    class AppMarker {

        /**
         * Constructs a new AppMarker.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppMarker.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppMarker id. */
        id: number;

        /** AppMarker type. */
        type: rustplus.AppMarkerType;

        /** AppMarker x. */
        x: number;

        /** AppMarker y. */
        y: number;

        /** AppMarker steamId. */
        steamId: (number|Long);

        /** AppMarker rotation. */
        rotation: number;

        /** AppMarker radius. */
        radius: number;

        /** AppMarker color1. */
        color1?: (rustplus.Vector4.$Properties|null);

        /** AppMarker color2. */
        color2?: (rustplus.Vector4.$Properties|null);

        /** AppMarker alpha. */
        alpha: number;

        /** AppMarker name. */
        name: string;

        /** AppMarker outOfStock. */
        outOfStock: boolean;

        /** AppMarker sellOrders. */
        sellOrders: rustplus.AppMarker.SellOrder.$Properties[];

        /**
         * Creates a new AppMarker instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppMarker instance
         */
        static create(properties: rustplus.AppMarker.$Shape): rustplus.AppMarker & rustplus.AppMarker.$Shape;
        static create(properties?: rustplus.AppMarker.$Properties): rustplus.AppMarker;

        /**
         * Encodes the specified AppMarker message. Does not implicitly {@link rustplus.AppMarker.verify|verify} messages.
         * @param message AppMarker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppMarker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppMarker message, length delimited. Does not implicitly {@link rustplus.AppMarker.verify|verify} messages.
         * @param message AppMarker message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppMarker.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppMarker message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppMarker & rustplus.AppMarker.$Shape} AppMarker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppMarker & rustplus.AppMarker.$Shape;

        /**
         * Decodes an AppMarker message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppMarker & rustplus.AppMarker.$Shape} AppMarker
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppMarker & rustplus.AppMarker.$Shape;

        /**
         * Verifies an AppMarker message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppMarker message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppMarker
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppMarker;

        /**
         * Creates a plain object from an AppMarker message. Also converts values to other types if specified.
         * @param message AppMarker
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppMarker, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppMarker to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppMarker
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppMarker {

        /** Properties of an AppMarker. */
        interface $Properties {

            /** AppMarker id */
            id: number;

            /** AppMarker type */
            type: rustplus.AppMarkerType;

            /** AppMarker x */
            x: number;

            /** AppMarker y */
            y: number;

            /** AppMarker steamId */
            steamId?: (number|Long|null);

            /** AppMarker rotation */
            rotation?: (number|null);

            /** AppMarker radius */
            radius?: (number|null);

            /** AppMarker color1 */
            color1?: (rustplus.Vector4.$Properties|null);

            /** AppMarker color2 */
            color2?: (rustplus.Vector4.$Properties|null);

            /** AppMarker alpha */
            alpha?: (number|null);

            /** AppMarker name */
            name?: (string|null);

            /** AppMarker outOfStock */
            outOfStock?: (boolean|null);

            /** AppMarker sellOrders */
            sellOrders?: (rustplus.AppMarker.SellOrder.$Properties[]|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppMarker. */
        type $Shape = rustplus.AppMarker.$Properties;

        /**
         * Properties of a SellOrder.
         * @deprecated Use rustplus.AppMarker.SellOrder.$Properties instead.
         */
        interface ISellOrder extends rustplus.AppMarker.SellOrder.$Properties {
        }

        /** Represents a SellOrder. */
        class SellOrder {

            /**
             * Constructs a new SellOrder.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.AppMarker.SellOrder.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** SellOrder itemId. */
            itemId: number;

            /** SellOrder quantity. */
            quantity: number;

            /** SellOrder currencyId. */
            currencyId: number;

            /** SellOrder costPerItem. */
            costPerItem: number;

            /** SellOrder amountInStock. */
            amountInStock: number;

            /** SellOrder itemIsBlueprint. */
            itemIsBlueprint: boolean;

            /** SellOrder currencyIsBlueprint. */
            currencyIsBlueprint: boolean;

            /** SellOrder itemCondition. */
            itemCondition: number;

            /** SellOrder itemConditionMax. */
            itemConditionMax: number;

            /**
             * Creates a new SellOrder instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SellOrder instance
             */
            static create(properties: rustplus.AppMarker.SellOrder.$Shape): rustplus.AppMarker.SellOrder & rustplus.AppMarker.SellOrder.$Shape;
            static create(properties?: rustplus.AppMarker.SellOrder.$Properties): rustplus.AppMarker.SellOrder;

            /**
             * Encodes the specified SellOrder message. Does not implicitly {@link rustplus.AppMarker.SellOrder.verify|verify} messages.
             * @param message SellOrder message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.AppMarker.SellOrder.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified SellOrder message, length delimited. Does not implicitly {@link rustplus.AppMarker.SellOrder.verify|verify} messages.
             * @param message SellOrder message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.AppMarker.SellOrder.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SellOrder message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.AppMarker.SellOrder & rustplus.AppMarker.SellOrder.$Shape} SellOrder
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppMarker.SellOrder & rustplus.AppMarker.SellOrder.$Shape;

            /**
             * Decodes a SellOrder message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.AppMarker.SellOrder & rustplus.AppMarker.SellOrder.$Shape} SellOrder
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppMarker.SellOrder & rustplus.AppMarker.SellOrder.$Shape;

            /**
             * Verifies a SellOrder message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a SellOrder message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns SellOrder
             */
            static fromObject(object: { [k: string]: any }): rustplus.AppMarker.SellOrder;

            /**
             * Creates a plain object from a SellOrder message. Also converts values to other types if specified.
             * @param message SellOrder
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.AppMarker.SellOrder, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this SellOrder to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for SellOrder
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace SellOrder {

            /** Properties of a SellOrder. */
            interface $Properties {

                /** SellOrder itemId */
                itemId: number;

                /** SellOrder quantity */
                quantity: number;

                /** SellOrder currencyId */
                currencyId: number;

                /** SellOrder costPerItem */
                costPerItem: number;

                /** SellOrder amountInStock */
                amountInStock: number;

                /** SellOrder itemIsBlueprint */
                itemIsBlueprint: boolean;

                /** SellOrder currencyIsBlueprint */
                currencyIsBlueprint: boolean;

                /** SellOrder itemCondition */
                itemCondition?: (number|null);

                /** SellOrder itemConditionMax */
                itemConditionMax?: (number|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a SellOrder. */
            type $Shape = rustplus.AppMarker.SellOrder.$Properties;
        }
    }

    /**
     * Properties of an AppMapMarkers.
     * @deprecated Use rustplus.AppMapMarkers.$Properties instead.
     */
    interface IAppMapMarkers extends rustplus.AppMapMarkers.$Properties {
    }

    /** Represents an AppMapMarkers. */
    class AppMapMarkers {

        /**
         * Constructs a new AppMapMarkers.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppMapMarkers.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppMapMarkers markers. */
        markers: rustplus.AppMarker.$Properties[];

        /**
         * Creates a new AppMapMarkers instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppMapMarkers instance
         */
        static create(properties: rustplus.AppMapMarkers.$Shape): rustplus.AppMapMarkers & rustplus.AppMapMarkers.$Shape;
        static create(properties?: rustplus.AppMapMarkers.$Properties): rustplus.AppMapMarkers;

        /**
         * Encodes the specified AppMapMarkers message. Does not implicitly {@link rustplus.AppMapMarkers.verify|verify} messages.
         * @param message AppMapMarkers message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppMapMarkers.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppMapMarkers message, length delimited. Does not implicitly {@link rustplus.AppMapMarkers.verify|verify} messages.
         * @param message AppMapMarkers message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppMapMarkers.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppMapMarkers message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppMapMarkers & rustplus.AppMapMarkers.$Shape} AppMapMarkers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppMapMarkers & rustplus.AppMapMarkers.$Shape;

        /**
         * Decodes an AppMapMarkers message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppMapMarkers & rustplus.AppMapMarkers.$Shape} AppMapMarkers
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppMapMarkers & rustplus.AppMapMarkers.$Shape;

        /**
         * Verifies an AppMapMarkers message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppMapMarkers message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppMapMarkers
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppMapMarkers;

        /**
         * Creates a plain object from an AppMapMarkers message. Also converts values to other types if specified.
         * @param message AppMapMarkers
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppMapMarkers, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppMapMarkers to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppMapMarkers
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppMapMarkers {

        /** Properties of an AppMapMarkers. */
        interface $Properties {

            /** AppMapMarkers markers */
            markers?: (rustplus.AppMarker.$Properties[]|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppMapMarkers. */
        type $Shape = rustplus.AppMapMarkers.$Properties;
    }

    /**
     * Properties of an AppClanInfo.
     * @deprecated Use rustplus.AppClanInfo.$Properties instead.
     */
    interface IAppClanInfo extends rustplus.AppClanInfo.$Properties {
    }

    /** Represents an AppClanInfo. */
    class AppClanInfo {

        /**
         * Constructs a new AppClanInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppClanInfo.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppClanInfo clanInfo. */
        clanInfo?: (rustplus.ClanInfo.$Properties|null);

        /**
         * Creates a new AppClanInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppClanInfo instance
         */
        static create(properties: rustplus.AppClanInfo.$Shape): rustplus.AppClanInfo & rustplus.AppClanInfo.$Shape;
        static create(properties?: rustplus.AppClanInfo.$Properties): rustplus.AppClanInfo;

        /**
         * Encodes the specified AppClanInfo message. Does not implicitly {@link rustplus.AppClanInfo.verify|verify} messages.
         * @param message AppClanInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppClanInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppClanInfo message, length delimited. Does not implicitly {@link rustplus.AppClanInfo.verify|verify} messages.
         * @param message AppClanInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppClanInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppClanInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppClanInfo & rustplus.AppClanInfo.$Shape} AppClanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppClanInfo & rustplus.AppClanInfo.$Shape;

        /**
         * Decodes an AppClanInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppClanInfo & rustplus.AppClanInfo.$Shape} AppClanInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppClanInfo & rustplus.AppClanInfo.$Shape;

        /**
         * Verifies an AppClanInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppClanInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppClanInfo
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppClanInfo;

        /**
         * Creates a plain object from an AppClanInfo message. Also converts values to other types if specified.
         * @param message AppClanInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppClanInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppClanInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppClanInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppClanInfo {

        /** Properties of an AppClanInfo. */
        interface $Properties {

            /** AppClanInfo clanInfo */
            clanInfo?: (rustplus.ClanInfo.$Properties|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppClanInfo. */
        type $Shape = rustplus.AppClanInfo.$Properties;
    }

    /**
     * Properties of an AppClanMessage.
     * @deprecated Use rustplus.AppClanMessage.$Properties instead.
     */
    interface IAppClanMessage extends rustplus.AppClanMessage.$Properties {
    }

    /** Represents an AppClanMessage. */
    class AppClanMessage {

        /**
         * Constructs a new AppClanMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppClanMessage.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppClanMessage steamId. */
        steamId: (number|Long);

        /** AppClanMessage name. */
        name: string;

        /** AppClanMessage message. */
        message: string;

        /** AppClanMessage time. */
        time: (number|Long);

        /**
         * Creates a new AppClanMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppClanMessage instance
         */
        static create(properties: rustplus.AppClanMessage.$Shape): rustplus.AppClanMessage & rustplus.AppClanMessage.$Shape;
        static create(properties?: rustplus.AppClanMessage.$Properties): rustplus.AppClanMessage;

        /**
         * Encodes the specified AppClanMessage message. Does not implicitly {@link rustplus.AppClanMessage.verify|verify} messages.
         * @param message AppClanMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppClanMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppClanMessage message, length delimited. Does not implicitly {@link rustplus.AppClanMessage.verify|verify} messages.
         * @param message AppClanMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppClanMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppClanMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppClanMessage & rustplus.AppClanMessage.$Shape} AppClanMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppClanMessage & rustplus.AppClanMessage.$Shape;

        /**
         * Decodes an AppClanMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppClanMessage & rustplus.AppClanMessage.$Shape} AppClanMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppClanMessage & rustplus.AppClanMessage.$Shape;

        /**
         * Verifies an AppClanMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppClanMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppClanMessage
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppClanMessage;

        /**
         * Creates a plain object from an AppClanMessage message. Also converts values to other types if specified.
         * @param message AppClanMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppClanMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppClanMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppClanMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppClanMessage {

        /** Properties of an AppClanMessage. */
        interface $Properties {

            /** AppClanMessage steamId */
            steamId: (number|Long);

            /** AppClanMessage name */
            name: string;

            /** AppClanMessage message */
            message: string;

            /** AppClanMessage time */
            time: (number|Long);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppClanMessage. */
        type $Shape = rustplus.AppClanMessage.$Properties;
    }

    /**
     * Properties of an AppClanChat.
     * @deprecated Use rustplus.AppClanChat.$Properties instead.
     */
    interface IAppClanChat extends rustplus.AppClanChat.$Properties {
    }

    /** Represents an AppClanChat. */
    class AppClanChat {

        /**
         * Constructs a new AppClanChat.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppClanChat.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppClanChat messages. */
        messages: rustplus.AppClanMessage.$Properties[];

        /**
         * Creates a new AppClanChat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppClanChat instance
         */
        static create(properties: rustplus.AppClanChat.$Shape): rustplus.AppClanChat & rustplus.AppClanChat.$Shape;
        static create(properties?: rustplus.AppClanChat.$Properties): rustplus.AppClanChat;

        /**
         * Encodes the specified AppClanChat message. Does not implicitly {@link rustplus.AppClanChat.verify|verify} messages.
         * @param message AppClanChat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppClanChat.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppClanChat message, length delimited. Does not implicitly {@link rustplus.AppClanChat.verify|verify} messages.
         * @param message AppClanChat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppClanChat.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppClanChat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppClanChat & rustplus.AppClanChat.$Shape} AppClanChat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppClanChat & rustplus.AppClanChat.$Shape;

        /**
         * Decodes an AppClanChat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppClanChat & rustplus.AppClanChat.$Shape} AppClanChat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppClanChat & rustplus.AppClanChat.$Shape;

        /**
         * Verifies an AppClanChat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppClanChat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppClanChat
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppClanChat;

        /**
         * Creates a plain object from an AppClanChat message. Also converts values to other types if specified.
         * @param message AppClanChat
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppClanChat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppClanChat to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppClanChat
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppClanChat {

        /** Properties of an AppClanChat. */
        interface $Properties {

            /** AppClanChat messages */
            messages?: (rustplus.AppClanMessage.$Properties[]|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppClanChat. */
        type $Shape = rustplus.AppClanChat.$Properties;
    }

    /**
     * Properties of an AppNexusAuth.
     * @deprecated Use rustplus.AppNexusAuth.$Properties instead.
     */
    interface IAppNexusAuth extends rustplus.AppNexusAuth.$Properties {
    }

    /** Represents an AppNexusAuth. */
    class AppNexusAuth {

        /**
         * Constructs a new AppNexusAuth.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppNexusAuth.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppNexusAuth serverId. */
        serverId: string;

        /** AppNexusAuth playerToken. */
        playerToken: number;

        /**
         * Creates a new AppNexusAuth instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppNexusAuth instance
         */
        static create(properties: rustplus.AppNexusAuth.$Shape): rustplus.AppNexusAuth & rustplus.AppNexusAuth.$Shape;
        static create(properties?: rustplus.AppNexusAuth.$Properties): rustplus.AppNexusAuth;

        /**
         * Encodes the specified AppNexusAuth message. Does not implicitly {@link rustplus.AppNexusAuth.verify|verify} messages.
         * @param message AppNexusAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppNexusAuth.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppNexusAuth message, length delimited. Does not implicitly {@link rustplus.AppNexusAuth.verify|verify} messages.
         * @param message AppNexusAuth message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppNexusAuth.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppNexusAuth message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppNexusAuth & rustplus.AppNexusAuth.$Shape} AppNexusAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppNexusAuth & rustplus.AppNexusAuth.$Shape;

        /**
         * Decodes an AppNexusAuth message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppNexusAuth & rustplus.AppNexusAuth.$Shape} AppNexusAuth
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppNexusAuth & rustplus.AppNexusAuth.$Shape;

        /**
         * Verifies an AppNexusAuth message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppNexusAuth message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppNexusAuth
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppNexusAuth;

        /**
         * Creates a plain object from an AppNexusAuth message. Also converts values to other types if specified.
         * @param message AppNexusAuth
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppNexusAuth, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppNexusAuth to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppNexusAuth
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppNexusAuth {

        /** Properties of an AppNexusAuth. */
        interface $Properties {

            /** AppNexusAuth serverId */
            serverId: string;

            /** AppNexusAuth playerToken */
            playerToken: number;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppNexusAuth. */
        type $Shape = rustplus.AppNexusAuth.$Properties;
    }

    /**
     * Properties of an AppTeamChanged.
     * @deprecated Use rustplus.AppTeamChanged.$Properties instead.
     */
    interface IAppTeamChanged extends rustplus.AppTeamChanged.$Properties {
    }

    /** Represents an AppTeamChanged. */
    class AppTeamChanged {

        /**
         * Constructs a new AppTeamChanged.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppTeamChanged.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppTeamChanged playerId. */
        playerId: (number|Long);

        /** AppTeamChanged teamInfo. */
        teamInfo: rustplus.AppTeamInfo.$Properties;

        /**
         * Creates a new AppTeamChanged instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppTeamChanged instance
         */
        static create(properties: rustplus.AppTeamChanged.$Shape): rustplus.AppTeamChanged & rustplus.AppTeamChanged.$Shape;
        static create(properties?: rustplus.AppTeamChanged.$Properties): rustplus.AppTeamChanged;

        /**
         * Encodes the specified AppTeamChanged message. Does not implicitly {@link rustplus.AppTeamChanged.verify|verify} messages.
         * @param message AppTeamChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppTeamChanged.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppTeamChanged message, length delimited. Does not implicitly {@link rustplus.AppTeamChanged.verify|verify} messages.
         * @param message AppTeamChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppTeamChanged.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppTeamChanged message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppTeamChanged & rustplus.AppTeamChanged.$Shape} AppTeamChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppTeamChanged & rustplus.AppTeamChanged.$Shape;

        /**
         * Decodes an AppTeamChanged message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppTeamChanged & rustplus.AppTeamChanged.$Shape} AppTeamChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppTeamChanged & rustplus.AppTeamChanged.$Shape;

        /**
         * Verifies an AppTeamChanged message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppTeamChanged message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppTeamChanged
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppTeamChanged;

        /**
         * Creates a plain object from an AppTeamChanged message. Also converts values to other types if specified.
         * @param message AppTeamChanged
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppTeamChanged, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppTeamChanged to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppTeamChanged
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppTeamChanged {

        /** Properties of an AppTeamChanged. */
        interface $Properties {

            /** AppTeamChanged playerId */
            playerId: (number|Long);

            /** AppTeamChanged teamInfo */
            teamInfo: rustplus.AppTeamInfo.$Properties;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppTeamChanged. */
        type $Shape = rustplus.AppTeamChanged.$Properties;
    }

    /**
     * Properties of an AppNewTeamMessage.
     * @deprecated Use rustplus.AppNewTeamMessage.$Properties instead.
     */
    interface IAppNewTeamMessage extends rustplus.AppNewTeamMessage.$Properties {
    }

    /** Represents an AppNewTeamMessage. */
    class AppNewTeamMessage {

        /**
         * Constructs a new AppNewTeamMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppNewTeamMessage.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppNewTeamMessage message. */
        message: rustplus.AppTeamMessage.$Properties;

        /**
         * Creates a new AppNewTeamMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppNewTeamMessage instance
         */
        static create(properties: rustplus.AppNewTeamMessage.$Shape): rustplus.AppNewTeamMessage & rustplus.AppNewTeamMessage.$Shape;
        static create(properties?: rustplus.AppNewTeamMessage.$Properties): rustplus.AppNewTeamMessage;

        /**
         * Encodes the specified AppNewTeamMessage message. Does not implicitly {@link rustplus.AppNewTeamMessage.verify|verify} messages.
         * @param message AppNewTeamMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppNewTeamMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppNewTeamMessage message, length delimited. Does not implicitly {@link rustplus.AppNewTeamMessage.verify|verify} messages.
         * @param message AppNewTeamMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppNewTeamMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppNewTeamMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppNewTeamMessage & rustplus.AppNewTeamMessage.$Shape} AppNewTeamMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppNewTeamMessage & rustplus.AppNewTeamMessage.$Shape;

        /**
         * Decodes an AppNewTeamMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppNewTeamMessage & rustplus.AppNewTeamMessage.$Shape} AppNewTeamMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppNewTeamMessage & rustplus.AppNewTeamMessage.$Shape;

        /**
         * Verifies an AppNewTeamMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppNewTeamMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppNewTeamMessage
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppNewTeamMessage;

        /**
         * Creates a plain object from an AppNewTeamMessage message. Also converts values to other types if specified.
         * @param message AppNewTeamMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppNewTeamMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppNewTeamMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppNewTeamMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppNewTeamMessage {

        /** Properties of an AppNewTeamMessage. */
        interface $Properties {

            /** AppNewTeamMessage message */
            message: rustplus.AppTeamMessage.$Properties;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppNewTeamMessage. */
        type $Shape = rustplus.AppNewTeamMessage.$Properties;
    }

    /**
     * Properties of an AppEntityChanged.
     * @deprecated Use rustplus.AppEntityChanged.$Properties instead.
     */
    interface IAppEntityChanged extends rustplus.AppEntityChanged.$Properties {
    }

    /** Represents an AppEntityChanged. */
    class AppEntityChanged {

        /**
         * Constructs a new AppEntityChanged.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppEntityChanged.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppEntityChanged entityId. */
        entityId: number;

        /** AppEntityChanged payload. */
        payload: rustplus.AppEntityPayload.$Properties;

        /**
         * Creates a new AppEntityChanged instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppEntityChanged instance
         */
        static create(properties: rustplus.AppEntityChanged.$Shape): rustplus.AppEntityChanged & rustplus.AppEntityChanged.$Shape;
        static create(properties?: rustplus.AppEntityChanged.$Properties): rustplus.AppEntityChanged;

        /**
         * Encodes the specified AppEntityChanged message. Does not implicitly {@link rustplus.AppEntityChanged.verify|verify} messages.
         * @param message AppEntityChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppEntityChanged.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppEntityChanged message, length delimited. Does not implicitly {@link rustplus.AppEntityChanged.verify|verify} messages.
         * @param message AppEntityChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppEntityChanged.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppEntityChanged message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppEntityChanged & rustplus.AppEntityChanged.$Shape} AppEntityChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppEntityChanged & rustplus.AppEntityChanged.$Shape;

        /**
         * Decodes an AppEntityChanged message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppEntityChanged & rustplus.AppEntityChanged.$Shape} AppEntityChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppEntityChanged & rustplus.AppEntityChanged.$Shape;

        /**
         * Verifies an AppEntityChanged message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppEntityChanged message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppEntityChanged
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppEntityChanged;

        /**
         * Creates a plain object from an AppEntityChanged message. Also converts values to other types if specified.
         * @param message AppEntityChanged
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppEntityChanged, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppEntityChanged to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppEntityChanged
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppEntityChanged {

        /** Properties of an AppEntityChanged. */
        interface $Properties {

            /** AppEntityChanged entityId */
            entityId: number;

            /** AppEntityChanged payload */
            payload: rustplus.AppEntityPayload.$Properties;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppEntityChanged. */
        type $Shape = rustplus.AppEntityChanged.$Properties;
    }

    /**
     * Properties of an AppClanChanged.
     * @deprecated Use rustplus.AppClanChanged.$Properties instead.
     */
    interface IAppClanChanged extends rustplus.AppClanChanged.$Properties {
    }

    /** Represents an AppClanChanged. */
    class AppClanChanged {

        /**
         * Constructs a new AppClanChanged.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppClanChanged.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppClanChanged clanInfo. */
        clanInfo?: (rustplus.ClanInfo.$Properties|null);

        /**
         * Creates a new AppClanChanged instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppClanChanged instance
         */
        static create(properties: rustplus.AppClanChanged.$Shape): rustplus.AppClanChanged & rustplus.AppClanChanged.$Shape;
        static create(properties?: rustplus.AppClanChanged.$Properties): rustplus.AppClanChanged;

        /**
         * Encodes the specified AppClanChanged message. Does not implicitly {@link rustplus.AppClanChanged.verify|verify} messages.
         * @param message AppClanChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppClanChanged.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppClanChanged message, length delimited. Does not implicitly {@link rustplus.AppClanChanged.verify|verify} messages.
         * @param message AppClanChanged message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppClanChanged.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppClanChanged message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppClanChanged & rustplus.AppClanChanged.$Shape} AppClanChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppClanChanged & rustplus.AppClanChanged.$Shape;

        /**
         * Decodes an AppClanChanged message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppClanChanged & rustplus.AppClanChanged.$Shape} AppClanChanged
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppClanChanged & rustplus.AppClanChanged.$Shape;

        /**
         * Verifies an AppClanChanged message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppClanChanged message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppClanChanged
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppClanChanged;

        /**
         * Creates a plain object from an AppClanChanged message. Also converts values to other types if specified.
         * @param message AppClanChanged
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppClanChanged, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppClanChanged to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppClanChanged
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppClanChanged {

        /** Properties of an AppClanChanged. */
        interface $Properties {

            /** AppClanChanged clanInfo */
            clanInfo?: (rustplus.ClanInfo.$Properties|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppClanChanged. */
        type $Shape = rustplus.AppClanChanged.$Properties;
    }

    /**
     * Properties of an AppNewClanMessage.
     * @deprecated Use rustplus.AppNewClanMessage.$Properties instead.
     */
    interface IAppNewClanMessage extends rustplus.AppNewClanMessage.$Properties {
    }

    /** Represents an AppNewClanMessage. */
    class AppNewClanMessage {

        /**
         * Constructs a new AppNewClanMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppNewClanMessage.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppNewClanMessage clanId. */
        clanId: (number|Long);

        /** AppNewClanMessage message. */
        message: rustplus.AppClanMessage.$Properties;

        /**
         * Creates a new AppNewClanMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppNewClanMessage instance
         */
        static create(properties: rustplus.AppNewClanMessage.$Shape): rustplus.AppNewClanMessage & rustplus.AppNewClanMessage.$Shape;
        static create(properties?: rustplus.AppNewClanMessage.$Properties): rustplus.AppNewClanMessage;

        /**
         * Encodes the specified AppNewClanMessage message. Does not implicitly {@link rustplus.AppNewClanMessage.verify|verify} messages.
         * @param message AppNewClanMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppNewClanMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppNewClanMessage message, length delimited. Does not implicitly {@link rustplus.AppNewClanMessage.verify|verify} messages.
         * @param message AppNewClanMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppNewClanMessage.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppNewClanMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppNewClanMessage & rustplus.AppNewClanMessage.$Shape} AppNewClanMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppNewClanMessage & rustplus.AppNewClanMessage.$Shape;

        /**
         * Decodes an AppNewClanMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppNewClanMessage & rustplus.AppNewClanMessage.$Shape} AppNewClanMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppNewClanMessage & rustplus.AppNewClanMessage.$Shape;

        /**
         * Verifies an AppNewClanMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppNewClanMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppNewClanMessage
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppNewClanMessage;

        /**
         * Creates a plain object from an AppNewClanMessage message. Also converts values to other types if specified.
         * @param message AppNewClanMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppNewClanMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppNewClanMessage to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppNewClanMessage
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppNewClanMessage {

        /** Properties of an AppNewClanMessage. */
        interface $Properties {

            /** AppNewClanMessage clanId */
            clanId: (number|Long);

            /** AppNewClanMessage message */
            message: rustplus.AppClanMessage.$Properties;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppNewClanMessage. */
        type $Shape = rustplus.AppNewClanMessage.$Properties;
    }

    /**
     * Properties of an AppCameraSubscribe.
     * @deprecated Use rustplus.AppCameraSubscribe.$Properties instead.
     */
    interface IAppCameraSubscribe extends rustplus.AppCameraSubscribe.$Properties {
    }

    /** Represents an AppCameraSubscribe. */
    class AppCameraSubscribe {

        /**
         * Constructs a new AppCameraSubscribe.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppCameraSubscribe.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppCameraSubscribe cameraId. */
        cameraId: string;

        /**
         * Creates a new AppCameraSubscribe instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppCameraSubscribe instance
         */
        static create(properties: rustplus.AppCameraSubscribe.$Shape): rustplus.AppCameraSubscribe & rustplus.AppCameraSubscribe.$Shape;
        static create(properties?: rustplus.AppCameraSubscribe.$Properties): rustplus.AppCameraSubscribe;

        /**
         * Encodes the specified AppCameraSubscribe message. Does not implicitly {@link rustplus.AppCameraSubscribe.verify|verify} messages.
         * @param message AppCameraSubscribe message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppCameraSubscribe.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppCameraSubscribe message, length delimited. Does not implicitly {@link rustplus.AppCameraSubscribe.verify|verify} messages.
         * @param message AppCameraSubscribe message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppCameraSubscribe.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppCameraSubscribe message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppCameraSubscribe & rustplus.AppCameraSubscribe.$Shape} AppCameraSubscribe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppCameraSubscribe & rustplus.AppCameraSubscribe.$Shape;

        /**
         * Decodes an AppCameraSubscribe message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppCameraSubscribe & rustplus.AppCameraSubscribe.$Shape} AppCameraSubscribe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppCameraSubscribe & rustplus.AppCameraSubscribe.$Shape;

        /**
         * Verifies an AppCameraSubscribe message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppCameraSubscribe message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppCameraSubscribe
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppCameraSubscribe;

        /**
         * Creates a plain object from an AppCameraSubscribe message. Also converts values to other types if specified.
         * @param message AppCameraSubscribe
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppCameraSubscribe, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppCameraSubscribe to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppCameraSubscribe
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppCameraSubscribe {

        /** Properties of an AppCameraSubscribe. */
        interface $Properties {

            /** AppCameraSubscribe cameraId */
            cameraId: string;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppCameraSubscribe. */
        type $Shape = rustplus.AppCameraSubscribe.$Properties;
    }

    /**
     * Properties of an AppCameraInput.
     * @deprecated Use rustplus.AppCameraInput.$Properties instead.
     */
    interface IAppCameraInput extends rustplus.AppCameraInput.$Properties {
    }

    /** Represents an AppCameraInput. */
    class AppCameraInput {

        /**
         * Constructs a new AppCameraInput.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppCameraInput.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppCameraInput buttons. */
        buttons: number;

        /** AppCameraInput mouseDelta. */
        mouseDelta: rustplus.Vector2.$Properties;

        /**
         * Creates a new AppCameraInput instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppCameraInput instance
         */
        static create(properties: rustplus.AppCameraInput.$Shape): rustplus.AppCameraInput & rustplus.AppCameraInput.$Shape;
        static create(properties?: rustplus.AppCameraInput.$Properties): rustplus.AppCameraInput;

        /**
         * Encodes the specified AppCameraInput message. Does not implicitly {@link rustplus.AppCameraInput.verify|verify} messages.
         * @param message AppCameraInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppCameraInput.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppCameraInput message, length delimited. Does not implicitly {@link rustplus.AppCameraInput.verify|verify} messages.
         * @param message AppCameraInput message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppCameraInput.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppCameraInput message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppCameraInput & rustplus.AppCameraInput.$Shape} AppCameraInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppCameraInput & rustplus.AppCameraInput.$Shape;

        /**
         * Decodes an AppCameraInput message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppCameraInput & rustplus.AppCameraInput.$Shape} AppCameraInput
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppCameraInput & rustplus.AppCameraInput.$Shape;

        /**
         * Verifies an AppCameraInput message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppCameraInput message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppCameraInput
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppCameraInput;

        /**
         * Creates a plain object from an AppCameraInput message. Also converts values to other types if specified.
         * @param message AppCameraInput
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppCameraInput, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppCameraInput to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppCameraInput
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppCameraInput {

        /** Properties of an AppCameraInput. */
        interface $Properties {

            /** AppCameraInput buttons */
            buttons: number;

            /** AppCameraInput mouseDelta */
            mouseDelta: rustplus.Vector2.$Properties;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppCameraInput. */
        type $Shape = rustplus.AppCameraInput.$Properties;
    }

    /**
     * Properties of an AppCameraInfo.
     * @deprecated Use rustplus.AppCameraInfo.$Properties instead.
     */
    interface IAppCameraInfo extends rustplus.AppCameraInfo.$Properties {
    }

    /** Represents an AppCameraInfo. */
    class AppCameraInfo {

        /**
         * Constructs a new AppCameraInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppCameraInfo.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppCameraInfo width. */
        width: number;

        /** AppCameraInfo height. */
        height: number;

        /** AppCameraInfo nearPlane. */
        nearPlane: number;

        /** AppCameraInfo farPlane. */
        farPlane: number;

        /** AppCameraInfo controlFlags. */
        controlFlags: number;

        /**
         * Creates a new AppCameraInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppCameraInfo instance
         */
        static create(properties: rustplus.AppCameraInfo.$Shape): rustplus.AppCameraInfo & rustplus.AppCameraInfo.$Shape;
        static create(properties?: rustplus.AppCameraInfo.$Properties): rustplus.AppCameraInfo;

        /**
         * Encodes the specified AppCameraInfo message. Does not implicitly {@link rustplus.AppCameraInfo.verify|verify} messages.
         * @param message AppCameraInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppCameraInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppCameraInfo message, length delimited. Does not implicitly {@link rustplus.AppCameraInfo.verify|verify} messages.
         * @param message AppCameraInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppCameraInfo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppCameraInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppCameraInfo & rustplus.AppCameraInfo.$Shape} AppCameraInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppCameraInfo & rustplus.AppCameraInfo.$Shape;

        /**
         * Decodes an AppCameraInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppCameraInfo & rustplus.AppCameraInfo.$Shape} AppCameraInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppCameraInfo & rustplus.AppCameraInfo.$Shape;

        /**
         * Verifies an AppCameraInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppCameraInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppCameraInfo
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppCameraInfo;

        /**
         * Creates a plain object from an AppCameraInfo message. Also converts values to other types if specified.
         * @param message AppCameraInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppCameraInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppCameraInfo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppCameraInfo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppCameraInfo {

        /** Properties of an AppCameraInfo. */
        interface $Properties {

            /** AppCameraInfo width */
            width: number;

            /** AppCameraInfo height */
            height: number;

            /** AppCameraInfo nearPlane */
            nearPlane: number;

            /** AppCameraInfo farPlane */
            farPlane: number;

            /** AppCameraInfo controlFlags */
            controlFlags: number;

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppCameraInfo. */
        type $Shape = rustplus.AppCameraInfo.$Properties;
    }

    /**
     * Properties of an AppCameraRays.
     * @deprecated Use rustplus.AppCameraRays.$Properties instead.
     */
    interface IAppCameraRays extends rustplus.AppCameraRays.$Properties {
    }

    /** Represents an AppCameraRays. */
    class AppCameraRays {

        /**
         * Constructs a new AppCameraRays.
         * @param [properties] Properties to set
         */
        constructor(properties?: rustplus.AppCameraRays.$Properties);

        /** Unknown fields preserved while decoding */
        $unknowns?: Uint8Array[];

        /** AppCameraRays verticalFov. */
        verticalFov: number;

        /** AppCameraRays sampleOffset. */
        sampleOffset: number;

        /** AppCameraRays rayData. */
        rayData: Uint8Array;

        /** AppCameraRays distance. */
        distance: number;

        /** AppCameraRays entities. */
        entities: rustplus.AppCameraRays.Entity.$Properties[];

        /**
         * Creates a new AppCameraRays instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AppCameraRays instance
         */
        static create(properties: rustplus.AppCameraRays.$Shape): rustplus.AppCameraRays & rustplus.AppCameraRays.$Shape;
        static create(properties?: rustplus.AppCameraRays.$Properties): rustplus.AppCameraRays;

        /**
         * Encodes the specified AppCameraRays message. Does not implicitly {@link rustplus.AppCameraRays.verify|verify} messages.
         * @param message AppCameraRays message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: rustplus.AppCameraRays.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AppCameraRays message, length delimited. Does not implicitly {@link rustplus.AppCameraRays.verify|verify} messages.
         * @param message AppCameraRays message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: rustplus.AppCameraRays.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AppCameraRays message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {rustplus.AppCameraRays & rustplus.AppCameraRays.$Shape} AppCameraRays
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppCameraRays & rustplus.AppCameraRays.$Shape;

        /**
         * Decodes an AppCameraRays message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {rustplus.AppCameraRays & rustplus.AppCameraRays.$Shape} AppCameraRays
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppCameraRays & rustplus.AppCameraRays.$Shape;

        /**
         * Verifies an AppCameraRays message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AppCameraRays message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AppCameraRays
         */
        static fromObject(object: { [k: string]: any }): rustplus.AppCameraRays;

        /**
         * Creates a plain object from an AppCameraRays message. Also converts values to other types if specified.
         * @param message AppCameraRays
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: rustplus.AppCameraRays, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AppCameraRays to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for AppCameraRays
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace AppCameraRays {

        /** Properties of an AppCameraRays. */
        interface $Properties {

            /** AppCameraRays verticalFov */
            verticalFov: number;

            /** AppCameraRays sampleOffset */
            sampleOffset: number;

            /** AppCameraRays rayData */
            rayData: Uint8Array;

            /** AppCameraRays distance */
            distance: number;

            /** AppCameraRays entities */
            entities?: (rustplus.AppCameraRays.Entity.$Properties[]|null);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];
        }

        /** Shape of an AppCameraRays. */
        type $Shape = rustplus.AppCameraRays.$Properties;

        /** EntityType enum. */
        enum EntityType {

            /** Tree value */
            Tree = 1,

            /** Player value */
            Player = 2
        }

        /**
         * Properties of an Entity.
         * @deprecated Use rustplus.AppCameraRays.Entity.$Properties instead.
         */
        interface IEntity extends rustplus.AppCameraRays.Entity.$Properties {
        }

        /** Represents an Entity. */
        class Entity {

            /**
             * Constructs a new Entity.
             * @param [properties] Properties to set
             */
            constructor(properties?: rustplus.AppCameraRays.Entity.$Properties);

            /** Unknown fields preserved while decoding */
            $unknowns?: Uint8Array[];

            /** Entity entityId. */
            entityId: number;

            /** Entity type. */
            type: rustplus.AppCameraRays.EntityType;

            /** Entity position. */
            position: rustplus.Vector3.$Properties;

            /** Entity rotation. */
            rotation: rustplus.Vector3.$Properties;

            /** Entity size. */
            size: rustplus.Vector3.$Properties;

            /** Entity name. */
            name: string;

            /**
             * Creates a new Entity instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Entity instance
             */
            static create(properties: rustplus.AppCameraRays.Entity.$Shape): rustplus.AppCameraRays.Entity & rustplus.AppCameraRays.Entity.$Shape;
            static create(properties?: rustplus.AppCameraRays.Entity.$Properties): rustplus.AppCameraRays.Entity;

            /**
             * Encodes the specified Entity message. Does not implicitly {@link rustplus.AppCameraRays.Entity.verify|verify} messages.
             * @param message Entity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: rustplus.AppCameraRays.Entity.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Entity message, length delimited. Does not implicitly {@link rustplus.AppCameraRays.Entity.verify|verify} messages.
             * @param message Entity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: rustplus.AppCameraRays.Entity.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Entity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {rustplus.AppCameraRays.Entity & rustplus.AppCameraRays.Entity.$Shape} Entity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): rustplus.AppCameraRays.Entity & rustplus.AppCameraRays.Entity.$Shape;

            /**
             * Decodes an Entity message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {rustplus.AppCameraRays.Entity & rustplus.AppCameraRays.Entity.$Shape} Entity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): rustplus.AppCameraRays.Entity & rustplus.AppCameraRays.Entity.$Shape;

            /**
             * Verifies an Entity message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Entity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Entity
             */
            static fromObject(object: { [k: string]: any }): rustplus.AppCameraRays.Entity;

            /**
             * Creates a plain object from an Entity message. Also converts values to other types if specified.
             * @param message Entity
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: rustplus.AppCameraRays.Entity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Entity to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Entity
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Entity {

            /** Properties of an Entity. */
            interface $Properties {

                /** Entity entityId */
                entityId: number;

                /** Entity type */
                type: rustplus.AppCameraRays.EntityType;

                /** Entity position */
                position: rustplus.Vector3.$Properties;

                /** Entity rotation */
                rotation: rustplus.Vector3.$Properties;

                /** Entity size */
                size: rustplus.Vector3.$Properties;

                /** Entity name */
                name?: (string|null);

                /** Unknown fields preserved while decoding */
                $unknowns?: Uint8Array[];
            }

            /** Shape of an Entity. */
            type $Shape = rustplus.AppCameraRays.Entity.$Properties;
        }
    }
}
