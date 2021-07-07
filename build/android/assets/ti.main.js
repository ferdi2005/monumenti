'use strict';

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          } });

      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2020 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * This script is used to load ACA (Axway Crash Analytics).
 * This allows ACA to be the first module to load on startup.
 */
Promise.resolve().then(function () {return /*#__PURE__*/_interopNamespace(require('com.appcelerator.aca'));}).catch(e => {// No need to notify of ACA load failure.
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2020 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/* eslint-disable quote-props */

/* globals OS_ANDROID, OS_IOS */
// Add global constants.

Object.defineProperties(commonjsGlobal, {
  'OS_ANDROID': {
    value: true,
    writable: false },

  'OS_IOS': {
    value: false,
    writable: false },

  OS_VERSION_MAJOR: {
    value: Ti.Platform.versionMajor,
    writable: false },

  OS_VERSION_MINOR: {
    value: Ti.Platform.versionMinor,
    writable: false },

  OS_VERSION_PATCH: {
    value: Ti.Platform.versionPatch,
    writable: false } });



// Copyright Node.js contributors. All rights reserved.
const kNodeModulesRE = /^(.*)[\\/]node_modules[\\/]/;
const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom');
const isBuffer = Symbol.for('titanium.buffer.isBuffer');
const colorRegExp = /\u001b\[\d\d?m/g; // eslint-disable-line no-control-regex

function removeColors(str) {
  return str.replace(colorRegExp, '');
}
function isError(e) {
  // An error could be an instance of Error while not being a native error
  // or could be from a different realm and not be instance of Error but still
  // be a native error.
  return isNativeError(e) || e instanceof Error;
}
let getStructuredStack;

class StackTraceError extends Error {}

StackTraceError.prepareStackTrace = (err, trace) => trace;

StackTraceError.stackTraceLimit = Infinity;
function isInsideNodeModules() {
  if (getStructuredStack === undefined) {
    getStructuredStack = () => new StackTraceError().stack;
  }

  let stack = getStructuredStack(); // stack is only an array on v8, try to convert manually if string

  if (typeof stack === 'string') {
    const stackFrames = [];
    const lines = stack.split(/\n/);

    for (const line of lines) {
      const lineInfo = line.match(/(.*)@(.*):(\d+):(\d+)/);

      if (lineInfo) {
        const filename = lineInfo[2].replace('file://', '');
        stackFrames.push({
          getFileName: () => filename });

      }
    }

    stack = stackFrames;
  } // Iterate over all stack frames and look for the first one not coming
  // from inside Node.js itself:


  if (Array.isArray(stack)) {
    for (const frame of stack) {
      const filename = frame.getFileName(); // If a filename does not start with / or contain \,
      // it's likely from Node.js core.

      if (!/^\/|\\/.test(filename)) {
        continue;
      }

      return kNodeModulesRE.test(filename);
    }
  }

  return false;
}
function join(output, separator) {
  let str = '';

  if (output.length !== 0) {
    const lastIndex = output.length - 1;

    for (let i = 0; i < lastIndex; i++) {
      // It is faster not to use a template string here
      str += output[i];
      str += separator;
    }

    str += output[lastIndex];
  }

  return str;
}
function uncurryThis(f) {
  return function () {
    return f.call.apply(f, arguments);
  };
}
const ALL_PROPERTIES = 0;
const ONLY_ENUMERABLE = 2;
const propertyFilter = {
  ALL_PROPERTIES,
  ONLY_ENUMERABLE };

function getOwnNonIndexProperties(obj, filter) {
  const props = [];
  const keys = filter === ONLY_ENUMERABLE ? Object.keys(obj) : Object.getOwnPropertyNames(obj);

  for (var i = 0; i < keys.length; ++i) {
    const key = keys[i];

    if (!isAllDigits(key)) {
      props.push(key);
    }
  }

  return props;
}

function isAllDigits(s) {
  if (s.length === 0) {
    return false;
  }

  for (var i = 0; i < s.length; ++i) {
    const code = s.charCodeAt(i);

    if (code < 48 || code > 57) {
      return false;
    }
  }

  return true;
}

// Copyright Node.js contributors. All rights reserved.
const TypedArrayPrototype = Object.getPrototypeOf(Uint8Array.prototype);
const TypedArrayProto_toStringTag = uncurryThis(Object.getOwnPropertyDescriptor(TypedArrayPrototype, Symbol.toStringTag).get);

function isObject(value) {
  return typeof value === 'object';
}

function isFunction(value) {
  return typeof value === 'function';
}

function checkPrototype(value, name) {
  return Object.prototype.toString.call(value) === `[object ${name}]`;
}

function isAnyArrayBuffer(value) {
  if (isArrayBuffer(value)) {
    return true;
  }

  return isSharedArrayBuffer(value);
}
function isArgumentsObject(value) {
  return isObject(value) && checkPrototype(value, 'Arguments');
}
function isArrayBuffer(value) {
  return isObject(value) && checkPrototype(value, 'ArrayBuffer');
} // Cached to make sure no userland code can tamper with it.

const isArrayBufferView = ArrayBuffer.isView;
function isAsyncFunction(value) {
  return isFunction(value) && checkPrototype(value, 'AsyncFunction');
}
function isBigInt64Array(value) {
  return TypedArrayProto_toStringTag(value) === 'BigInt64Array';
}
function isBigUint64Array(value) {
  return TypedArrayProto_toStringTag(value) === 'BigUint64Array';
}
function isBooleanObject(value) {
  return isObject(value) && checkPrototype(value, 'Boolean');
}
function isBoxedPrimitive(value) {
  if (!isObject(value)) {
    return false;
  }

  return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) // || isBigIntObject(value)
  || isSymbolObject(value);
}
function isDataView(value) {
  return isObject(value) && checkPrototype(value, 'DataView');
}
function isDate(value) {
  return isObject(value) && checkPrototype(value, 'Date');
} // @todo isExternal

function isFloat32Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Float32Array';
}
function isFloat64Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Float64Array';
}
function isGeneratorFunction(value) {
  return isFunction(value) && checkPrototype(value, 'GeneratorFunction');
}
function isGeneratorObject(value) {
  return isObject(value) && checkPrototype(value, 'Generator');
}
function isInt8Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Int8Array';
}
function isInt16Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Int16Array';
}
function isInt32Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Int32Array';
}
function isMap(value) {
  return isObject(value) && checkPrototype(value, 'Map');
}
function isMapIterator(value) {
  if (typeof value !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype && prototype[Symbol.toStringTag] === 'Map Iterator';
} // @todo isModuleNamespaceObject

function isNativeError(value) {
  // if not an instance of an Error, definitely not a native error
  if (!(value instanceof Error)) {
    return false;
  }

  if (!value || !value.constructor) {
    return false;
  }

  return ['Error', 'EvalError', 'RangeError', 'ReferenceError', 'SyntaxError', 'TypeError', 'URIError'].includes(value.constructor.name);
}
function isNumberObject(value) {
  return isObject(value) && checkPrototype(value, 'Number');
}
function isPromise(value) {
  return isObject(value) && checkPrototype(value, 'Promise');
} // @todo isProxy

function isRegExp(value) {
  return isObject(value) && checkPrototype(value, 'RegExp');
}
function isSet(value) {
  return isObject(value) && checkPrototype(value, 'Set');
}
function isSetIterator(value) {
  if (typeof value !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);
  return prototype && prototype[Symbol.toStringTag] === 'Set Iterator';
}
function isSharedArrayBuffer(value) {
  if (!global.SharedArrayBuffer) {
    return false;
  }

  return isObject(value) && checkPrototype(value, 'SharedArrayBuffer');
}
function isStringObject(value) {
  return isObject(value) && checkPrototype(value, 'String');
}
function isSymbolObject(value) {
  return isObject(value) && checkPrototype(value, 'Symbol');
}
function isTypedArray(value) {
  const isBuiltInTypedArray = TypedArrayProto_toStringTag(value) !== undefined;

  if (isBuiltInTypedArray) {
    return true;
  }

  return value[isBuffer] === true;
}
function isUint8Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Uint8Array';
}
function isUint8ClampedArray(value) {
  return TypedArrayProto_toStringTag(value) === 'Uint8ClampedArray';
}
function isUint16Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Uint16Array';
}
function isUint32Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Uint32Array';
}
function isWeakMap(value) {
  return isObject(value) && checkPrototype(value, 'WeakMap');
}
function isWeakSet(value) {
  return isObject(value) && checkPrototype(value, 'WeakSet');
} // @todo isWebAssemblyCompiledModule

var types = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isAnyArrayBuffer: isAnyArrayBuffer,
  isArgumentsObject: isArgumentsObject,
  isArrayBuffer: isArrayBuffer,
  isArrayBufferView: isArrayBufferView,
  isAsyncFunction: isAsyncFunction,
  isBigInt64Array: isBigInt64Array,
  isBigUint64Array: isBigUint64Array,
  isBooleanObject: isBooleanObject,
  isBoxedPrimitive: isBoxedPrimitive,
  isDataView: isDataView,
  isDate: isDate,
  isFloat32Array: isFloat32Array,
  isFloat64Array: isFloat64Array,
  isGeneratorFunction: isGeneratorFunction,
  isGeneratorObject: isGeneratorObject,
  isInt8Array: isInt8Array,
  isInt16Array: isInt16Array,
  isInt32Array: isInt32Array,
  isMap: isMap,
  isMapIterator: isMapIterator,
  isNativeError: isNativeError,
  isNumberObject: isNumberObject,
  isPromise: isPromise,
  isRegExp: isRegExp,
  isSet: isSet,
  isSetIterator: isSetIterator,
  isSharedArrayBuffer: isSharedArrayBuffer,
  isStringObject: isStringObject,
  isSymbolObject: isSymbolObject,
  isTypedArray: isTypedArray,
  isUint8Array: isUint8Array,
  isUint8ClampedArray: isUint8ClampedArray,
  isUint16Array: isUint16Array,
  isUint32Array: isUint32Array,
  isWeakMap: isWeakMap,
  isWeakSet: isWeakSet });


// Copyright Node.js contributors. All rights reserved.
let error;

function lazyError() {
  if (!error) {
    // @fixme rollup cannot handle lazy loaded modules, maybe move to webpack?
    // error = require('./errors').codes.ERR_INTERNAL_ASSERTION;
    error = codes.ERR_INTERNAL_ASSERTION;
  }

  return error;
}

function assert(value, message) {
  if (!value) {
    const ERR_INTERNAL_ASSERTION = lazyError();
    throw new ERR_INTERNAL_ASSERTION(message);
  }
}

function fail(message) {
  const ERR_INTERNAL_ASSERTION = lazyError();
  throw new ERR_INTERNAL_ASSERTION(message);
}

assert.fail = fail;

// Copyright Node.js contributors. All rights reserved.
const messages = new Map();
const codes = {}; // @todo implement this once needed

class SystemError extends Error {} // Utility function for registering the error codes.


function E(sym, val, def, ...otherClasses) {
  // Special case for SystemError that formats the error message differently
  // The SystemErrors only have SystemError as their base classes.
  messages.set(sym, val);

  if (def === SystemError) {
    throw new Error('Node compatible SystemError not yet implemented.');
  } else {
    def = makeNodeErrorWithCode(def, sym);
  }

  if (otherClasses.length !== 0) {
    otherClasses.forEach(clazz => {
      def[clazz.name] = makeNodeErrorWithCode(clazz, sym);
    });
  }

  codes[sym] = def;
}

function makeNodeErrorWithCode(Base, key) {
  return class NodeError extends Base {
    constructor(...args) {
      super();
      const message = getMessage(key, args, this);
      Object.defineProperty(this, 'message', {
        value: message,
        enumerable: false,
        writable: true,
        configurable: true });

      addCodeToName(this, super.name, key);
    }

    get code() {
      return key;
    }

    set code(value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true });

    }

    toString() {
      return `${this.name} [${key}]: ${this.message}`;
    }};


}

function getMessage(key, args, self) {
  const msg = messages.get(key);
  /*
  // @fixme rollup cannot handle lazy loaded modules, maybe move to webpack?
  if (assert === undefined) {
  	assert = require('./internal/assert');
  }
  */

  if (typeof msg === 'function') {
    assert(msg.length <= args.length, // Default options do not count.
    `Code: ${key}; The provided arguments length (${args.length}) does not ` + `match the required ones (${msg.length}).`);
    return msg.apply(self, args);
  }

  const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
  assert(expectedLength === args.length, `Code: ${key}; The provided arguments length (${args.length}) does not ` + `match the required ones (${expectedLength}).`);

  if (args.length === 0) {
    return msg;
  }

  args.unshift(msg);
  return format.apply(null, args); // @fixme rollup cannot handle lazy loaded modules, maybe move to webpack?
  // return lazyInternalUtilInspect().format.apply(null, args);
}

function addCodeToName(err, name, code) {
  // Add the error code to the name to include it in the stack trace.
  err.name = `${name} [${code}]`; // Access the stack to generate the error message including the error code
  // from the name.
  // @fixme: This only works on V8/Android, iOS/JSC has a different Error structure.
  // should we try to make errors behave the same across platforms?
  // eslint-disable-next-line no-unused-expressions

  err.stack; // Reset the name to the actual name.

  if (name === 'SystemError') {
    Object.defineProperty(err, 'name', {
      value: name,
      enumerable: false,
      writable: true,
      configurable: true });

  } else {
    delete err.name;
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS', // Using a default argument here is important so the argument is not counted
// towards `Function#length`.
(name = undefined) => {
  if (name) {
    return `"${name}" is outside of buffer bounds`;
  }

  return 'Attempt to access memory outside buffer bounds';
}, RangeError);
E('ERR_INTERNAL_ASSERTION', message => {
  const suffix = 'This is caused by either a bug in Titanium ' + 'or incorrect usage of Titanium internals.\n' + 'Please open an issue with this stack trace at ' + 'https://jira.appcelerator.org\n';
  return message === undefined ? suffix : `${message}\n${suffix}`;
}, Error);
E('ERR_INVALID_ARG_TYPE', (name, expected, actual) => {
  assert(typeof name === 'string', '\'name\' must be a string'); // determiner: 'must be' or 'must not be'

  let determiner;

  if (typeof expected === 'string' && expected.startsWith('not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  let msg;

  if (name.endsWith(' argument')) {
    // For cases like 'first argument'
    msg = `The ${name} ${determiner} ${oneOf(expected, 'type')}`;
  } else {
    const type = name.includes('.') ? 'property' : 'argument';
    msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, 'type')}`;
  } // TODO(BridgeAR): Improve the output by showing `null` and similar.


  msg += `. Received type ${typeof actual}`;
  return msg;
}, TypeError);
let maxStack_ErrorName;
let maxStack_ErrorMessage;
/**
 * Returns true if `err.name` and `err.message` are equal to engine-specific
 * values indicating max call stack size has been exceeded.
 * "Maximum call stack size exceeded" in V8.
 *
 * @param {Error} err The error to check
 * @returns {boolean}
 */

function isStackOverflowError(err) {
  if (maxStack_ErrorMessage === undefined) {
    try {
      function overflowStack() {
        overflowStack();
      }

      overflowStack();
    } catch (e) {
      maxStack_ErrorMessage = e.message;
      maxStack_ErrorName = e.name;
    }
  }

  return err.name === maxStack_ErrorName && err.message === maxStack_ErrorMessage;
}

function oneOf(expected, thing) {
  assert(typeof thing === 'string', '`thing` has to be of type string');

  if (Array.isArray(expected)) {
    const len = expected.length;
    assert(len > 0, 'At least one expected value needs to be specified');
    expected = expected.map(i => String(i));

    if (len > 2) {
      return `one of ${thing} ${expected.slice(0, len - 1).join(', ')}, or ` + expected[len - 1];
    } else if (len === 2) {
      return `one of ${thing} ${expected[0]} or ${expected[1]}`;
    } else {
      return `of ${thing} ${expected[0]}`;
    }
  } else {
    return `of ${thing} ${String(expected)}`;
  }
}

class FastBuffer extends Uint8Array {}
/**
 * loop over input, every 2 characters, parse as an int
 * basically each two characters are a "byte" or an 8-bit uint
 * we append them all together to form a single buffer holding all the values
 * @param {string} value string we're encoding in hex
 * @returns {integer[]} array of encoded bytes
 */

function stringToHexBytes(value) {
  const length = value.length / 2;
  const byteArray = [];

  for (let i = 0; i < length; i++) {
    const numericValue = parseInt(value.substr(i * 2, 2), 16);

    if (!Number.isNaN(numericValue)) {
      // drop bad hex characters
      byteArray.push(numericValue);
    }
  }

  return byteArray;
}

// as a result it is *much* slower to read/write values
// because we need to go across the JS/Native boundary per-byte!
// We also need to use a Proxy to handle intercepting set/get of indices to redirect to the underlying Ti.Buffer

class SlowBuffer {
  /**
   * Constructs a new buffer.
   *
   * Primarily used internally in this module together with `newBuffer` to
   * create a new Buffer instance wrapping a Ti.Buffer.
   *
   * Also supports the deprecated Buffer() constructors which are safe
   * to use outside of this module.
   *
   * @param {Ti.Buffer} tiBuffer the underlying data/bytes
   * @param {integer} [start=0] start offset of array/buffer
   * @param {integer} [length] length of the underlying array/buffer to wrap
   */
  constructor(tiBuffer, start = 0, length = tiBuffer.length - start) {
    Object.defineProperties(this, {
      byteOffset: {
        value: start },

      length: {
        value: length },

      _tiBuffer: {
        value: tiBuffer } });


  }
  /**
   * Wraps creation of a Buffer instance inside a Proxy so we can handle array index access
   * @param {Ti.Buffer} tiBuffer the underlying data/bytes
   * @param {integer} [start=0] start offset of array/buffer
   * @param {integer} [length] length of the underlying array/buffer to wrap
   * @returns {Buffer} wrapped inside a Proxy
   */


  static fromTiBuffer(tiBuffer, start, length) {
    return new Proxy(new SlowBuffer(tiBuffer, start, length), arrayIndexHandler); // eslint-disable-line security/detect-new-buffer
  }

  static fromString(value, encoding) {
    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError(`Unknown encoding: ${encoding}`);
    }

    encoding = encoding.toLowerCase();

    if (encoding === 'base64') {
      const blob = Ti.Utils.base64decode(value);
      const blobStream = Ti.Stream.createStream({
        source: blob,
        mode: Ti.Stream.MODE_READ });

      const buffer = Ti.Stream.readAll(blobStream);
      blobStream.close();
      return SlowBuffer.fromTiBuffer(buffer);
    }

    if (encoding === 'hex') {
      const bytes = stringToHexBytes(value);
      const length = bytes.length;
      const tiBuffer = Ti.createBuffer({
        length });


      for (let i = 0; i < length; i++) {
        tiBuffer[i] = bytes[i] & 0xFF; // mask to one byte
      }

      return SlowBuffer.fromTiBuffer(tiBuffer);
    }

    const tiBuffer = Ti.createBuffer({
      value: value,
      type: getTiCodecCharset(encoding) });

    return SlowBuffer.fromTiBuffer(tiBuffer);
  } // This is a method we should get by extending Uint8Array, so really should only be overriden on a "SlowBuffer" that wraps Ti.Buffer


  get buffer() {
    // Get the slice of the array from byteOffset to length
    return Uint8Array.from(this).buffer;
  }

  _slice(offset, length) {
    return SlowBuffer.fromTiBuffer(this._tiBuffer, offset, length);
  }

  _fill(value, offset, end, encoding) {
    const valueType = typeof value;

    if (valueType === 'string') {
      const bufToFillWith = SlowBuffer.fromString(value, encoding);
      const fillBufLength = bufToFillWith.length;

      if (fillBufLength === 0) {
        throw new Error('no valid fill data');
      } // If the buffer length === 1, we can just do this._tiBuffer.fill(value, offset, end);


      if (fillBufLength === 1) {
        this._tiBuffer.fill(bufToFillWith._tiBuffer[0], offset, end);

        return this;
      } // multiple byte fill!


      const length = end - offset;

      for (let i = 0; i < length; i++) {
        // TODO: Do we need to account for byteOffset here (on `this`, not on the buffer we just created)?
        const fillChar = bufToFillWith._tiBuffer[i % fillBufLength];
        this._tiBuffer[i + offset] = fillChar;
      }

      return this;
    } // if the value is a number (or a buffer with a single byte) we can use tiBuffer.fill();


    this._tiBuffer.fill(value, offset, end);
  }

  getAdjustedIndex(index) {
    return getAdjustedIndex(this, index);
  }

  setAdjustedIndex(index, value) {
    return setAdjustedIndex(this, index, value);
  } // This is a method we should get by extending Uint8Array, so really should only be overriden on a "SlowBuffer" that wraps Ti.Buffer


  set(src, offset = 0) {
    const numBytes = src.length; // check src.length + offset doesn't go beyond our length!
    // FIXME: Re-enable
    // checkOffset(this, offset, numBytes);
    // copy src values into this buffer starting at offset

    for (let i = 0; i < numBytes; i++) {
      setAdjustedIndex(this, i + offset, src[i]);
    }
  }
  /**
   * Provides a conversion method for interacting with Ti APIs that require a Ti.Buffer
   * @returns {Ti.Buffer} the underlying Ti.Buffer backing this Buffer instance
   */


  toTiBuffer() {
    if (this.length === this._tiBuffer.length && this.byteOffset === 0) {
      return this._tiBuffer;
    }

    return this._tiBuffer.clone(this.byteOffset, this.length);
  }}

// Use a Proxy to hack array style index accessors

const arrayIndexHandler = {
  get(target, propKey, receiver) {
    if (typeof propKey === 'string') {
      const num = Number(propKey);

      if (Number.isSafeInteger(num)) {
        return getAdjustedIndex(target, num);
      }
    } else if (propKey === isBuffer) {
      return true;
    }

    return Reflect.get(target, propKey, receiver);
  },

  set(target, propKey, value, receiver) {
    if (typeof propKey === 'string') {
      const num = Number(propKey);

      if (Number.isSafeInteger(num)) {
        setAdjustedIndex(target, num, value);
        return true;
      }
    }

    return Reflect.set(target, propKey, value, receiver);
  },

  has(target, key) {
    if (typeof key === 'string') {
      const num = Number(key);

      if (Number.isSafeInteger(num)) {
        // ensure it's a positive "safe" integer within the range of the buffer
        return num >= 0 && num < target._tiBuffer.length;
      }
    }

    return key in target;
  } };



function getAdjustedIndex(buf, index) {
  if (index < 0) {
    return undefined;
  } // Wrapping Ti.Buffer?


  if (buf._tiBuffer) {
    if (index >= buf._tiBuffer.length) {
      return undefined;
    }

    return buf._tiBuffer[index + buf.byteOffset];
  } // Raw TypedArray/ArrayBuffer
  // FIXME: do we need to account for byteOffset here?


  return buf[index];
}

function setAdjustedIndex(buf, index, value) {
  if (index < 0) {
    return;
  } // Wrapping Ti.Buffer?


  if (buf._tiBuffer) {
    if (index < buf._tiBuffer.length) {
      buf._tiBuffer[index + buf.byteOffset] = value;
    }

    return;
  } // Raw TypedArray/ArrayBuffer
  // FIXME: do we need to account for byteOffset here?


  buf[index] = value;
} // https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings


const TI_CODEC_MAP = new Map();
TI_CODEC_MAP.set('utf-8', Ti.Codec.CHARSET_UTF8);
TI_CODEC_MAP.set('utf8', Ti.Codec.CHARSET_UTF8);
TI_CODEC_MAP.set('utf-16le', Ti.Codec.CHARSET_UTF16LE);
TI_CODEC_MAP.set('utf16le', Ti.Codec.CHARSET_UTF16LE);
TI_CODEC_MAP.set('ucs2', Ti.Codec.CHARSET_UTF16LE);
TI_CODEC_MAP.set('ucs-2', Ti.Codec.CHARSET_UTF16LE);
TI_CODEC_MAP.set('latin1', Ti.Codec.CHARSET_ISO_LATIN_1);
TI_CODEC_MAP.set('binary', Ti.Codec.CHARSET_ISO_LATIN_1);
TI_CODEC_MAP.set('ascii', Ti.Codec.CHARSET_ASCII);
/**
 * @param {string} encoding desired encoding name
 * @returns {integer} Ti.Codec constant that maps to the encoding
 */

function getTiCodecCharset(encoding) {
  return TI_CODEC_MAP.get(encoding);
}

/**
 * This implementation of Buffer uses a Ti.Buffer internally to back it.
 * This is likley an order of magnitude slower than using a variant that extends Uint8Array!
 * I think if we're not already wrapping a Ti.Buffer, it may be better to have two implementations
 * and, like browserify, just extend Uint8Array for any Buffers we need to read/write a lot
 * and then add a simple conversion method to turn it into a Ti.Buffer when needed.
 *
 * The Ti.Buffer impl has to go through the binding layer for reading/writing every byte.
 * If we anticipate the Buffer staying on the JS side, I'm willing to bet that the Uint8Array
 * the JS engine provides would be *way* faster.
 *
 * Also note that both Ti.Buffer and Node's Buffer were created before the JS engines had typed arrays
 * (and Uint8Array in particular) as a means of encapsulating a byte array. We should consider accepting
 * a Uint8Array in any of our APIs that take a Ti.Buffer and eventually deprecating/removing Ti.Buffer.
 */
const {
  ALL_PROPERTIES: ALL_PROPERTIES$1,
  ONLY_ENUMERABLE: ONLY_ENUMERABLE$1 } =
propertyFilter;
const VALID_ENCODINGS = ['hex', 'utf8', 'utf-8', 'ascii', 'latin1', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le']; // Used to cheat for read/writes of doubles

const doubleArray = new Float64Array(1);
const uint8DoubleArray = new Uint8Array(doubleArray.buffer); // Used to cheat to read/write floats

const floatArray = new Float32Array(1);
const uint8FloatArray = new Uint8Array(floatArray.buffer); // Node.js does some very weird stuff here

FastBuffer.prototype.constructor = Buffer$1; // new FastBuffer() calls Buffer function?

Buffer$1.prototype = FastBuffer.prototype; // Then it hijacks Buffer's prototype to point at FastBuffer's?!
// Does this effectively mean Buffer extends Uint8Array, because FastBuffer did? This fails for me
// How the hell can we make it happy? We really want to extend Uint8Array if we can
// addBufferPrototypeMethods(Buffer.prototype); // Here's where it hangs some of the methods

Buffer$1.poolSize = 8192;
/**
 * Constructs a new buffer.
 *
 * Primarily used internally in this module together with `newBuffer` to
 * create a new Buffer instance wrapping a Ti.Buffer.
 *
 * Also supports the deprecated Buffer() constructors which are safe
 * to use outside of this module.
 *
 * @param {integer[]|Buffer|integer|string|Ti.Buffer} arg the underlying data/bytes
 * @param {string|integer} encodingOrOffset encoding of the string, or start offset of array/buffer
 * @param {integer} length length of the underlying array/buffer to wrap
 * @returns {Buffer}
 */

function Buffer$1(arg, encodingOrOffset, length) {
  if (arg === undefined) {
    return;
  }

  if (typeof arg !== 'object' || arg.apiName !== 'Ti.Buffer') {
    showFlaggedDeprecation();

    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new TypeError(`The "string" argument must be of type "string". Received type ${typeof arg}`);
      }

      return Buffer$1.alloc(arg);
    }

    return Buffer$1.from(arg, encodingOrOffset, length);
  } // The slow case - we're wrapping a Ti.Buffer


  return SlowBuffer.fromTiBuffer(arg, encodingOrOffset, length);
}
/**
 * @param {integer[]|Buffer|string} value value we're wrapping
 * @param {string|integer} encodingOrOffset encoding of the string, or start offset of array/buffer
 * @param {integer} length length of the underlying array/buffer to wrap
 * @returns {Buffer}
 */


Buffer$1.from = function (value, encodingOrOffset, length) {
  const valueType = typeof value;

  if (valueType === 'string') {
    return fromString(value, encodingOrOffset);
  } else if (valueType === 'object') {
    if (isAnyArrayBuffer(value)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }

    if (Array.isArray(value) || value instanceof Uint8Array) {
      return fromArray(value);
    }

    if (Buffer$1.isBuffer(value)) {
      return fromBuffer(value);
    } // We want to limit the use of SlowBuffers to only when we're wrapping a Ti.Buffer, hopefully!


    if (value.apiName && value.apiName === 'Ti.Buffer') {
      return SlowBuffer.fromTiBuffer(value);
    }
  }

  throw new TypeError('The \'value\' argument must be one of type: \'string\', \'Array\', \'Buffer\', \'Ti.Buffer\'');
};
/**
 * @param {ArrayBuffer} obj ArrayBuffer to wrap
 * @param {number} [byteOffset=0] byte offste to begin
 * @param {number} [length] length to wrap
 * @returns {Buffer}
 */


function fromArrayBuffer(obj, byteOffset, length) {
  // Convert byteOffset to integer
  if (byteOffset === undefined) {
    byteOffset = 0;
  } else {
    byteOffset = +byteOffset;

    if (Number.isNaN(byteOffset)) {
      byteOffset = 0;
    }
  }

  const maxLength = obj.byteLength - byteOffset;

  if (maxLength < 0) {
    throw new codes.ERR_BUFFER_OUT_OF_BOUNDS('offset');
  }

  if (length === undefined) {
    length = maxLength;
  } else {
    // Convert length to non-negative integer.
    length = +length;

    if (length > 0) {
      if (length > maxLength) {
        throw new codes.ERR_BUFFER_OUT_OF_BOUNDS('length');
      }
    } else {
      length = 0;
    }
  }

  return new FastBuffer(obj, byteOffset, length);
}
/**
 * @param {string} value value to wrap
 * @param {string} [encoding='utf8'] character encoding
 * @returns {Buffer}
 */


function fromString(value, encoding = 'utf8') {
  if (!Buffer$1.isEncoding(encoding)) {
    throw new TypeError(`Unknown encoding: ${encoding}`);
  }

  encoding = encoding.toLowerCase();

  if (encoding === 'base64') {
    const blob = Ti.Utils.base64decode(value);
    return new FastBuffer(blob.toArrayBuffer());
  }

  if (encoding === 'hex') {
    return fromArray(stringToHexBytes(value));
  } // Convert the SlowBuffer to a fast buffer by just copying bytes recursively here


  return fromBuffer(SlowBuffer.fromString(value, encoding));
}
/**
 * @param {integer[]|Uint8Array|array} value values to wrap
 * @returns {Buffer}
 */


function fromArray(value) {
  const length = value.length;

  if (length === 0) {
    return new FastBuffer();
  }

  return new FastBuffer(value);
}
/**
 * Ideally this should only be used when we're copying a SlowBuffer into a new FastBuffer
 * @param {Buffer} value buffer to copy
 * @returns {Buffer}
 */


function fromBuffer(value) {
  const length = value.length;

  if (length === 0) {
    return new FastBuffer();
  }

  const buffer = Buffer$1.allocUnsafe(length);
  value.copy(buffer, 0, 0, length);
  return buffer;
}

Object.setPrototypeOf(Buffer$1, Uint8Array); // What is this doing?! Making Buffer.prototype point at Uint8Array now

/**
 * 0 is returned if target is the same as buf
 * 1 is returned if target should come before buf when sorted.
 * -1 is returned if target should come after buf when sorted.
 * @param {Buffer} target Buffer to compare against
 * @param {integer} [targetStart=0] index to start in target
 * @param {integer} [targetEnd=target.length] index to end in target
 * @param {integer} [sourceStart=0] index to start in this Buffer
 * @param {integer} [sourceEnd=this.length] index to end in this Buffer
 * @returns {integer}
 */

Buffer$1.prototype.compare = function (target, targetStart, targetEnd, sourceStart, sourceEnd) {
  if (!Buffer$1.isBuffer(target)) {
    throw new TypeError(`The "target" argument must be one of type Buffer or Uint8Array. Received type ${typeof buf1}`);
  }

  if (targetStart === undefined) {
    targetStart = 0;
  }

  if (sourceStart === undefined) {
    sourceStart = 0;
  }

  if (targetEnd === undefined) {
    targetEnd = target.length;
  }

  if (sourceEnd === undefined) {
    sourceEnd = this.length;
  } // ERR_OUT_OF_RANGE is thrown if targetStart < 0, sourceStart < 0, targetEnd > target.byteLength, or sourceEnd > source.byteLength


  if (targetStart < 0 || sourceStart < 0 || targetEnd > target.length || sourceEnd > this.length) {
    throw new RangeError('Index out of range'); // FIXME: set "code" to ERR_INDEX_OUT_OF_RANGE
  } // Use slices to make the loop easier


  const source = this.slice(sourceStart, sourceEnd);
  const sourceLength = source.length;
  const dest = target.slice(targetStart, targetEnd);
  const destLength = dest.length;
  const length = Math.min(sourceLength, destLength);

  for (let i = 0; i < length; i++) {
    const targetValue = dest.getAdjustedIndex(i);
    const sourceValue = source.getAdjustedIndex(i);

    if (targetValue !== sourceValue) {
      // No match! Return 1 or -1 based on what is greater!
      if (sourceValue < targetValue) {
        return -1;
      }

      return 1;
    }
  } // sort based on length!


  if (sourceLength < destLength) {
    return -1;
  }

  if (sourceLength > destLength) {
    return 1;
  }

  return 0;
};
/**
 * Copies from this to target
 * @param {Buffer} target destination we're copying into
 * @param {integer} [targetStart=0] start index to copy into in destination Buffer
 * @param {integer} [sourceStart=0] start index to copy from within `this`
 * @param {integer} [sourceEnd=this.length] end index to copy from within `this`
 * @returns {integer} number of bytes copied
 */


Buffer$1.prototype.copy = function (target, targetStart, sourceStart, sourceEnd) {
  if (targetStart === undefined) {
    targetStart = 0;
  }

  if (sourceStart === undefined) {
    sourceStart = 0;
  }

  if (sourceEnd === undefined) {
    sourceEnd = this.length;
  }

  if (sourceStart === sourceEnd) {
    return 0;
  }

  if (target.length === 0 || this.length === 0) {
    return 0;
  } // TODO: check for out of bounds?


  let length = sourceEnd - sourceStart; // Cap length to remaining bytes in target!

  const remaining = target.length - targetStart;

  if (length > remaining) {
    sourceEnd = sourceStart + remaining;
    length = remaining;
  } // Determine actual number of bytes we'll copy, constrain by source buffer length as well as target (above)


  let numBytes = length;
  const sourceLen = this.length - sourceStart;

  if (numBytes > sourceLen) {
    numBytes = sourceLen;
  } // TODO: handle overlap when target === this!
  // TODO: Do we need to take target byteOffset into account here?


  let source = this;

  if (sourceStart !== 0 || sourceEnd < source.length) {
    source = new Uint8Array(this.buffer, this.byteOffset + sourceStart, numBytes);
  }

  target.set(source, targetStart);
  return numBytes;
};
/**
 * Creates and returns an iterator of [index, byte] pairs from the contents of buf.
 * @returns {Iterator}
 */
// TODO: Is this only necessary for SlowBuffer?


Buffer$1.prototype.entries = function () {
  const buffer = this;
  let nextIndex = 0;
  const end = this.length;
  const entryIterator = {
    next: function () {
      if (nextIndex < end) {
        const result = {
          value: [nextIndex, buffer.getAdjustedIndex(nextIndex)],
          done: false };

        nextIndex++;
        return result;
      }

      return {
        value: undefined,
        done: true };

    },
    [Symbol.iterator]: function () {
      return this;
    } };

  return entryIterator;
};

Buffer$1.prototype.equals = function (otherBuffer) {
  if (!Buffer$1.isBuffer(otherBuffer)) {
    throw new TypeError('argument must be a Buffer');
  }

  if (otherBuffer === this) {
    return true;
  }

  return this.compare(otherBuffer) === 0;
};
/**
 * @param {string|Buffer|UInt8Array|integer} value The value with which to fill `buf`.
 * @param {integer} [offset=0] Number of bytes to skip before starting to fill `buf`
 * @param {integer} [end] Where to stop filling buf (not inclusive). `buf.length` by default
 * @param {string} [encoding='utf8'] The encoding for `value` if `value` is a string.
 * @returns {this}
 */


Buffer$1.prototype.fill = function (value, offset, end, encoding) {
  const offsetType = typeof offset;

  if (offsetType === 'undefined') {
    // value supplied
    offset = 0;
    end = this.length;
    encoding = 'utf8';
  } else if (offsetType === 'string') {
    // value, encoding supplied
    encoding = offset;
    offset = 0;
    end = this.length;
  } else if (typeof end === 'string') {
    // value, offset, encoding supplied
    encoding = end;
    end = this.length;
  }

  this._fill(value, offset, end, encoding);

  return this;
};

const TypedArrayPrototype$1 = Object.getPrototypeOf(Uint8Array.prototype);
const TypedArrayProto_byteLength = Object.getOwnPropertyDescriptor(TypedArrayPrototype$1, 'byteLength').get;
const TypedArrayFill = TypedArrayPrototype$1.fill;

Buffer$1.prototype._fill = function (value, offset, end, encoding) {
  if (typeof value === 'number') {
    // OOB check
    const byteLen = TypedArrayProto_byteLength.call(this);
    const fillLength = end - offset;

    if (offset > end || fillLength + offset > byteLen) {
      throw new codes.ERR_BUFFER_OUT_OF_BOUNDS();
    }

    TypedArrayFill.call(this, value, offset, end);
  } else {
    const bufToFillWith = SlowBuffer.fromString(value, encoding);
    const fillBufLength = bufToFillWith.length;

    if (fillBufLength === 0) {
      throw new Error('no valid fill data');
    }

    if (fillBufLength === 1) {
      TypedArrayFill.call(this, bufToFillWith._tiBuffer[0], offset, end);
      return this;
    } // multiple byte fill!


    const length = end - offset;

    for (let i = 0; i < length; i++) {
      // TODO: Do we need to account for byteOffset here (on `this`, not on the buffer we just created)?
      const fillChar = bufToFillWith._tiBuffer[i % fillBufLength];
      this.setAdjustedIndex(i + offset, fillChar);
    }
  }
};

Buffer$1.prototype.includes = function (value, byteOffset, encoding) {
  return this.indexOf(value, byteOffset, encoding) !== -1;
};
/**
 * @param {string|Buffer|integer} value What to search for
 * @param {integer} [byteOffset=0] Where to begin searching in buf. If negative, then offset is calculated from the end of buf
 * @param {string} [encoding='utf8'] If value is a string, this is the encoding used to determine the binary representation of the string that will be searched for in buf
 * @returns {integer} The index of the first occurrence of value in buf, or -1 if buf does not contain value.
 */


Buffer$1.prototype.indexOf = function (value, byteOffset, encoding) {
  if (this.length === 0) {
    // empty buffer? can't find anything!
    return -1;
  } // if byteOffset is undefined, make it 0


  if (typeof byteOffset === 'undefined') {
    byteOffset = 0;
  } else if (typeof byteOffset === 'string') {
    // if it's a string, that's actually encoding
    encoding = byteOffset;
    byteOffset = 0;
  } // if we don't have an encoding yet, use utf8


  if (typeof encoding !== 'string') {
    encoding = 'utf8';
  }

  if (byteOffset < 0) {
    // convert negative indices
    byteOffset = this.length + byteOffset;

    if (byteOffset < 0) {
      // still negative? start at 0
      byteOffset = 0;
    }
  } else if (byteOffset >= this.length) {
    return -1; // can't find past end of buffer!
  }

  if (typeof value === 'number') {
    value &= 0xFF; // clamp to 255
    // This is a simpler case, we have a single byte we need to search for
    // so just loop through and try to find it

    return indexOf(this, value, byteOffset);
  } // coerce a string to a Buffer


  if (typeof value === 'string') {
    value = fromString(value, encoding);
  } // value is now a Buffer...


  const matchLength = value.length;

  if (matchLength === 0) {
    return -1; // never find empty value!
  }

  if (matchLength === 1) {
    // simple case, match one byte!
    return indexOf(this, value[0], byteOffset);
  }

  let currentIndex = byteOffset;
  const thisLength = this.length;

  if (matchLength > thisLength) {
    return -1; // can't match if the value is longer than this Buffer!
  } // FIXME: Can we rewrite this in a less funky way?
  // FIXME: Can stop earlier based on matchLength!


  firstMatch: while (currentIndex < thisLength) {
    // eslint-disable-line no-labels
    // match first byte!
    let firstByteMatch = indexOf(this, value[0], currentIndex);

    if (firstByteMatch === -1) {
      // couldn't even match the very first byte, so no match overall!
      return -1;
    } // ok, we found the first byte, now we need to see if the next consecutive bytes match!


    for (let x = 1; x < matchLength; x++) {
      if (firstByteMatch + x >= thisLength) {
        currentIndex = firstByteMatch + 1; // move past our first match

        continue firstMatch; // eslint-disable-line no-labels
      }

      if (this[firstByteMatch + x] !== value[x]) {
        // didn't match!
        currentIndex = firstByteMatch + 1; // move past our first match

        continue firstMatch; // eslint-disable-line no-labels
      }
    }

    return firstByteMatch; // the rest matched, hurray!
  }

  return -1;
};

Buffer$1.prototype.keys = function () {
  let nextIndex = 0;
  const end = this.length;
  const myIterator = {
    next: function () {
      if (nextIndex < end) {
        const result = {
          value: nextIndex,
          done: false };

        nextIndex++;
        return result;
      }

      return {
        value: undefined,
        done: true };

    },
    [Symbol.iterator]: function () {
      return this;
    } };

  return myIterator;
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 8
 * @returns {double} Reads a 64-bit double from buf at the specified offset with specified endian format
 */


Buffer$1.prototype.readDoubleBE = function (offset = 0) {
  checkOffset(this, offset, 8); // Node cheats and uses a Float64Array and UInt8Array backed by the same buffer
  // so basically it reads in the bytes stuffing them into Uint8Array, then returns the value from the Float64Array
  // FIXME: This assumes LE system byteOrder

  uint8DoubleArray[7] = this[offset++];
  uint8DoubleArray[6] = this[offset++];
  uint8DoubleArray[5] = this[offset++];
  uint8DoubleArray[4] = this[offset++];
  uint8DoubleArray[3] = this[offset++];
  uint8DoubleArray[2] = this[offset++];
  uint8DoubleArray[1] = this[offset++];
  uint8DoubleArray[0] = this[offset++];
  return doubleArray[0];
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 8
 * @returns {double} Reads a 64-bit double from buf at the specified offset with specified endian format
 */


Buffer$1.prototype.readDoubleLE = function (offset = 0) {
  checkOffset(this, offset, 8); // Node cheats and uses a Float64Array and UInt8Array backed by the same buffer
  // so basically it reads in the bytes stuffing them into Uint8Array, then returns the value from the Float64Array
  // FIXME: This assumes LE system byteOrder

  uint8DoubleArray[0] = this[offset++];
  uint8DoubleArray[1] = this[offset++];
  uint8DoubleArray[2] = this[offset++];
  uint8DoubleArray[3] = this[offset++];
  uint8DoubleArray[4] = this[offset++];
  uint8DoubleArray[5] = this[offset++];
  uint8DoubleArray[6] = this[offset++];
  uint8DoubleArray[7] = this[offset++];
  return doubleArray[0];
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 4
 * @returns {float} Reads a 32-bit float from buf at the specified offset with specified endian format
 */


Buffer$1.prototype.readFloatBE = function (offset = 0) {
  checkOffset(this, offset, 4); // Node cheats and uses a Float32Array and UInt8Array backed by the same buffer
  // so basically it reads in the bytes stuffing them into Uint8Array, then returns the value from the Float32Array
  // FIXME: This assumes LE system byteOrder

  uint8FloatArray[3] = this[offset++];
  uint8FloatArray[2] = this[offset++];
  uint8FloatArray[1] = this[offset++];
  uint8FloatArray[0] = this[offset++];
  return floatArray[0];
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 4
 * @returns {float} Reads a 32-bit float from buf at the specified offset with specified endian format
 */


Buffer$1.prototype.readFloatLE = function (offset = 0) {
  checkOffset(this, offset, 4); // Node cheats and uses a Float32Array and UInt8Array backed by the same buffer
  // so basically it reads in the bytes stuffing them into Uint8Array, then returns the value from the Float32Array
  // FIXME: This assumes LE system byteOrder

  uint8FloatArray[0] = this[offset++];
  uint8FloatArray[1] = this[offset++];
  uint8FloatArray[2] = this[offset++];
  uint8FloatArray[3] = this[offset++];
  return floatArray[0];
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 1.
 * @returns {integer}
 */


Buffer$1.prototype.readInt8 = function (offset = 0) {
  const unsignedValue = this.readUInt8(offset);
  return unsignedToSigned(unsignedValue, 1);
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 2.
 * @returns {integer}
 */


Buffer$1.prototype.readInt16BE = function (offset) {
  const unsignedValue = this.readUInt16BE(offset);
  return unsignedToSigned(unsignedValue, 2);
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 2.
 * @returns {integer}
 */


Buffer$1.prototype.readInt16LE = function (offset = 0) {
  const unsignedValue = this.readUInt16LE(offset);
  return unsignedToSigned(unsignedValue, 2);
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 4.
 * @returns {integer}
 */


Buffer$1.prototype.readInt32BE = function (offset = 0) {
  const unsignedValue = this.readUInt32BE(offset);
  return unsignedToSigned(unsignedValue, 4);
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 4.
 * @returns {integer}
 */


Buffer$1.prototype.readInt32LE = function (offset = 0) {
  const unsignedValue = this.readUInt32LE(offset);
  return unsignedToSigned(unsignedValue, 4);
};
/**
 * Reads byteLength number of bytes from buf at the specified offset and interprets the result as a two's complement signed value. Supports up to 48 bits of accuracy.
 * @param {integer} offset Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - byteLength.
 * @param {integer} byteLength umber of bytes to read. Must satisfy 0 < byteLength <= 6.
 * @returns {integer}
 */


Buffer$1.prototype.readIntBE = function (offset, byteLength) {
  const unsignedValue = this.readUIntBE(offset, byteLength);
  return unsignedToSigned(unsignedValue, byteLength);
};
/**
 * Reads byteLength number of bytes from buf at the specified offset and interprets the result as a two's complement signed value. Supports up to 48 bits of accuracy.
 * @param {integer} offset Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - byteLength.
 * @param {integer} byteLength umber of bytes to read. Must satisfy 0 < byteLength <= 6.
 * @returns {integer}
 */


Buffer$1.prototype.readIntLE = function (offset, byteLength) {
  const unsignedValue = this.readUIntLE(offset, byteLength);
  return unsignedToSigned(unsignedValue, byteLength);
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 1.
 * @returns {integer}
 */


Buffer$1.prototype.readUInt8 = function (offset = 0) {
  checkOffset(this, offset, 1);
  return this[offset];
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 2.
 * @returns {integer}
 */


Buffer$1.prototype.readUInt16BE = function (offset = 0) {
  checkOffset(this, offset, 2); // first byte shifted and OR'd with second byte

  return this[offset] << 8 | this[offset + 1];
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 2.
 * @returns {integer}
 */


Buffer$1.prototype.readUInt16LE = function (offset = 0) {
  checkOffset(this, offset, 2); // first byte OR'd with second byte shifted

  return this[offset] | this[offset + 1] << 8;
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 4.
 * @returns {integer}
 */


Buffer$1.prototype.readUInt32BE = function (offset = 0) {
  checkOffset(this, offset, 4);
  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]); // rather than shifting by << 24, multiply the first byte and add it in so we don't retain the "sign bit"
  // (because bit-wise operators assume a 32-bit number)
};
/**
 * @param {integer} [offset=0] Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - 4.
 * @returns {integer}
 */


Buffer$1.prototype.readUInt32LE = function (offset = 0) {
  checkOffset(this, offset, 4);
  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000; // rather than shifting by << 24, multiply the last byte and add it in so we don't retain the "sign bit"
};
/**
 * @param {integer} offset Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - byteLength.
 * @param {integer} byteLength Number of bytes to read. Must satisfy 0 < byteLength <= 6.
 * @returns {integer}
 */


Buffer$1.prototype.readUIntBE = function (offset, byteLength) {
  if (byteLength <= 0 || byteLength > 6) {
    throw new RangeError('Index out of range');
  }

  checkOffset(this, offset, byteLength);
  let result = 0;
  let multiplier = 1; // we use a multipler for each byte
  // we're doing the same loop as #readUIntLE, just backwards!

  for (let i = byteLength - 1; i >= 0; i--) {
    result += this.getAdjustedIndex(offset + i) * multiplier;
    multiplier *= 0x100; // move multiplier to next byte
  }

  return result;
};
/**
 * @param {integer} offset Number of bytes to skip before starting to read. Must satisfy 0 <= offset <= buf.length - byteLength.
 * @param {integer} byteLength Number of bytes to read. Must satisfy 0 < byteLength <= 6.
 * @returns {integer}
 */


Buffer$1.prototype.readUIntLE = function (offset, byteLength) {
  if (byteLength <= 0 || byteLength > 6) {
    throw new RangeError('Index out of range');
  }

  checkOffset(this, offset, byteLength);
  let result = 0;
  let multiplier = 1; // we use a multipler for each byte

  for (let i = 0; i < byteLength; i++) {
    result += this.getAdjustedIndex(offset + i) * multiplier;
    multiplier *= 0x100; // move multiplier to next byte
  }

  return result;
};
/**
 * @param {integer} [start=0] Where the new `Buffer` will start.
 * @param {integer} [end=this.length] Where the new Buffer will end (not inclusive). Default: `buf.length`.
 * @returns {Buffer}
 */


Buffer$1.prototype.slice = function (start, end) {
  const thisLength = this.length;

  if (typeof start === 'undefined') {
    start = 0;
  } else if (start < 0) {
    start = thisLength + start;

    if (start < 0) {
      // if this is still negative, use 0 (that matches Node)
      start = 0;
    }
  }

  if (typeof end === 'undefined') {
    end = thisLength;
  } else if (end < 0) {
    end = thisLength + end;
  } // Specifying end greater than buf.length will return the same result as that of end equal to buf.length.


  if (end > thisLength) {
    end = thisLength;
  } // What if end is less than start?


  let length = end - start;

  if (length <= 0) {
    length = 0; // return empty view of Buffer! retain byte offset, set length to 0
  } // Wrap the same ArrayBuffer object but specify the start/end to "crop" with


  return this._slice(this.byteOffset + start, length);
};

Buffer$1.prototype._slice = function (offset, length) {
  return new FastBuffer(this.buffer, offset, length);
};
/**
 * @param {integer} [start=0] Where the new `Buffer` will start.
 * @param {integer} [end=this.length] Where the new Buffer will end (not inclusive). Default: `buf.length`.
 * @returns {Buffer}
 */


Buffer$1.prototype.subarray = function (start, end) {
  return this.slice(start, end);
};
/**
 * Interprets buf as an array of unsigned 16-bit integers and swaps the byte order in-place.
 * Throws ERR_INVALID_BUFFER_SIZE if buf.length is not a multiple of 2.
 * @returns {Buffer}
 */


Buffer$1.prototype.swap16 = function () {
  const length = this.length;

  if (length % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }

  for (let i = 0; i < length; i += 2) {
    const first = this.getAdjustedIndex(i);
    const second = this.getAdjustedIndex(i + 1);
    this.setAdjustedIndex(i, second);
    this.setAdjustedIndex(i + 1, first);
  }

  return this;
};
/**
 * Interprets buf as an array of unsigned 32-bit integers and swaps the byte order in-place.
 * Throws ERR_INVALID_BUFFER_SIZE if buf.length is not a multiple of 4.
 * @returns {Buffer}
 */


Buffer$1.prototype.swap32 = function () {
  const length = this.length;

  if (length % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }

  for (let i = 0; i < length; i += 4) {
    const first = this.getAdjustedIndex(i);
    const second = this.getAdjustedIndex(i + 1);
    const third = this.getAdjustedIndex(i + 2);
    const fourth = this.getAdjustedIndex(i + 3);
    this.setAdjustedIndex(i, fourth);
    this.setAdjustedIndex(i + 1, third);
    this.setAdjustedIndex(i + 2, second);
    this.setAdjustedIndex(i + 3, first);
  }

  return this;
};
/**
 * Interprets buf as an array of unsigned 64-bit integers and swaps the byte order in-place.
 * Throws ERR_INVALID_BUFFER_SIZE if buf.length is not a multiple of 8.
 * @returns {Buffer}
 */


Buffer$1.prototype.swap64 = function () {
  const length = this.length;

  if (length % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }

  for (let i = 0; i < length; i += 8) {
    const first = this.getAdjustedIndex(i);
    const second = this.getAdjustedIndex(i + 1);
    const third = this.getAdjustedIndex(i + 2);
    const fourth = this.getAdjustedIndex(i + 3);
    const fifth = this.getAdjustedIndex(i + 4);
    const sixth = this.getAdjustedIndex(i + 5);
    const seventh = this.getAdjustedIndex(i + 6);
    const eighth = this.getAdjustedIndex(i + 7);
    this.setAdjustedIndex(i, eighth);
    this.setAdjustedIndex(i + 1, seventh);
    this.setAdjustedIndex(i + 2, sixth);
    this.setAdjustedIndex(i + 3, fifth);
    this.setAdjustedIndex(i + 4, fourth);
    this.setAdjustedIndex(i + 5, third);
    this.setAdjustedIndex(i + 6, second);
    this.setAdjustedIndex(i + 7, first);
  }

  return this;
};
/**
 * @returns {object}
 */


Buffer$1.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    // Take advantage of slice working on "Array-like" objects (just like `arguments`)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#Array-like_objects
    data: [].slice.call(this) };

};
/**
 * @param {string} [encoding='utf8'] The character encoding to use
 * @param {integer} [start=0] The byte offset to start decoding at
 * @param {integer} [end] The byte offset to stop decoding at (not inclusive). `buf.length` default
 * @returns {string}
 */


Buffer$1.prototype.toString = function (encoding, start, end) {
  // fast case of no args
  if (arguments.length === 0) {
    return this.toTiBuffer().toString();
  }

  const length = this.length;

  if (start >= length) {
    return ''; // start is past end of buffer, return empty string
  }

  if (start < 0 || typeof start !== 'number') {
    start = 0;
  }

  if (end > length || typeof end !== 'number') {
    // no end specified, or past end of buffer, use length of buffer
    end = length;
  } // else keep end as passed in


  if (end <= start) {
    return ''; // if end is before start return empty string
  } // If start !== 0 and end !== length, maybe we should do a Buffer.subarray/slice over the range and call toString() on that?


  if (start !== 0 || end !== length) {
    return this.slice(start, end).toString(encoding);
  } // base case, start is 0, end is length


  if (encoding === undefined) {
    encoding = 'utf8';
  } else {
    encoding = encoding.toLowerCase(); // Throw if bad encoding!

    if (!Buffer$1.isEncoding(encoding)) {
      throw new TypeError(`Unknown encoding: ${encoding}`);
    }
  }

  if (encoding === 'utf8' || encoding === 'utf-8') {
    return this.toTiBuffer().toString(); // we return utf-8 by default natively
  }

  if (encoding === 'base64') {
    return Ti.Utils.base64encode(this.toTiBuffer().toBlob()).toString();
  }

  if (encoding === 'hex') {
    return this.hexSlice(0, length);
  }

  if (encoding === 'latin1' || encoding === 'binary') {
    let latin1String = '';

    for (let i = 0; i < length; i++) {
      // each one is a "byte"
      latin1String += String.fromCharCode(this.getAdjustedIndex(i));
    }

    return latin1String;
  }

  if (encoding === 'ascii') {
    let ascii = '';

    for (let i = 0; i < length; i++) {
      // we store bytes (8-bit), but ascii is 7-bit. Node "masks" the last bit off, so let's do the same
      ascii += String.fromCharCode(this.getAdjustedIndex(i) & 0x7F);
    }

    return ascii;
  } // UCS2/UTF16


  return this.ucs2Slice(0, length);
};

Buffer$1.prototype.getAdjustedIndex = function (index) {
  return this[index];
};

Buffer$1.prototype.setAdjustedIndex = function (index, value) {
  return this[index] = value;
};

Buffer$1.prototype.hexSlice = function (start, end) {
  let hexStr = '';

  for (let i = start; i < end; i++) {
    // each one is a "byte"
    let hex = (this.getAdjustedIndex(i) & 0xff).toString(16);
    hex = hex.length === 1 ? '0' + hex : hex;
    hexStr += hex;
  }

  return hexStr;
};

Buffer$1.prototype.ucs2Slice = function (start, end) {
  let out = '';
  let i = start;

  while (i < end) {
    // utf-16/ucs-2 is 2-bytes per character
    const byte1 = this.getAdjustedIndex(i++);
    const byte2 = this.getAdjustedIndex(i++);
    const code_unit = (byte2 << 8) + byte1; // we mash together the two bytes

    out += String.fromCodePoint(code_unit);
  }

  return out;
};
/**
 * Provides a conversion method for interacting with Ti APIs that require a Ti.Buffer
 * @returns {Ti.Buffer} the underlying Ti.Buffer backing this Buffer instance
 */


Buffer$1.prototype.toTiBuffer = function () {
  const tiBuffer = Ti.createBuffer({
    length: this.length });

  copyBuffer(this, tiBuffer, 0, this.length);
  return tiBuffer;
};
/**
 * @param {Buffer} src source Buffer we're copying from
 * @param {Ti.Buffer} dest destination Ti.Buffer we're copying into
 * @param {integer} offset start offset we're copying to in destination
 * @param {integer} length number of bytes to copy
 * @returns {integer} actual number of bytes copied
 */


function copyBuffer(src, dest, offset, length) {
  const srcLength = src.length;
  const destLength = dest.length;
  let i = 0;

  for (; i < length; i++) {
    const destIndex = i + offset; // are we trying to write past end of destination? Or read past end of source? Stop!

    if (destIndex >= destLength || i >= srcLength) {
      break;
    }

    dest[destIndex] = src[i];
  }

  return i;
}
/**
 * Creates and returns an iterator for buf values (bytes)
 * @returns {Iterator}
 */
// TODO: Move to SlowBuffer?


Buffer$1.prototype.values = function () {
  const buffer = this;
  let nextIndex = 0;
  const end = this.length;
  const myIterator = {
    next: function () {
      if (nextIndex < end) {
        const result = {
          value: buffer.getAdjustedIndex(nextIndex),
          done: false };

        nextIndex++;
        return result;
      }

      return {
        value: undefined,
        done: true };

    },
    [Symbol.iterator]: function () {
      return this;
    } };

  return myIterator;
};
/**
 * Called when buffer is used in a for..of loop. Delegates to #values()
 * @returns {Iterator}
 */
// TODO: Move to SlowBuffer?


Buffer$1.prototype[Symbol.iterator] = function () {
  return this.values();
};
/**
 * Writes string to buf at offset according to the character encoding in encoding.
 * The length parameter is the number of bytes to write. If buf did not contain enough space to
 * fit the entire string, only part of string will be written. However, partially encoded
 * characters will not be written.
 * @param {string} string String to write to `buf`.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write string
 * @param {integer} [length=buf.length - offset] Number of bytes to write
 * @param {string} [encoding='utf8'] The character encoding of string
 * @returns {integer}
 */


Buffer$1.prototype.write = function (string, offset, length, encoding) {
  if (typeof offset === 'string') {
    encoding = offset;
    offset = 0;
    length = this.length;
  } else if (typeof length === 'string') {
    encoding = length;
    length = this.length - offset;
  } else {
    // we cap `length` at the length of our buffer
    const remaining = this.length - offset;

    if (length > remaining) {
      length = remaining;
    }
  }

  encoding = encoding || 'utf8'; // so we need to convert `remaining` bytes of our string into a byte array/buffer

  const src = fromString(string, encoding); // FIXME: Can we let it know to only convert `remaining` bytes?
  // then stick that into our buffer starting at `offset`!

  return src.copy(this, offset, 0, length);
};

Buffer$1.prototype.writeDoubleBE = function (value, offset = 0) {
  checkOffset(this, offset, 8);
  doubleArray[0] = value;
  this.setAdjustedIndex(offset++, uint8DoubleArray[7]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[6]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[5]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[4]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[3]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[2]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[1]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[0]);
  return offset; // at this point, we should have already added 8 to offset
};

Buffer$1.prototype.writeDoubleLE = function (value, offset = 0) {
  checkOffset(this, offset, 8);
  doubleArray[0] = value;
  this.setAdjustedIndex(offset++, uint8DoubleArray[0]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[1]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[2]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[3]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[4]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[5]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[6]);
  this.setAdjustedIndex(offset++, uint8DoubleArray[7]);
  return offset; // at this point, we should have already added 8 to offset
};

Buffer$1.prototype.writeFloatBE = function (value, offset = 0) {
  checkOffset(this, offset, 4);
  floatArray[0] = value;
  this.setAdjustedIndex(offset++, uint8FloatArray[3]);
  this.setAdjustedIndex(offset++, uint8FloatArray[2]);
  this.setAdjustedIndex(offset++, uint8FloatArray[1]);
  this.setAdjustedIndex(offset++, uint8FloatArray[0]);
  return offset; // at this point, we should have already added 4 to offset
};

Buffer$1.prototype.writeFloatLE = function (value, offset = 0) {
  checkOffset(this, offset, 4);
  floatArray[0] = value;
  this.setAdjustedIndex(offset++, uint8FloatArray[0]);
  this.setAdjustedIndex(offset++, uint8FloatArray[1]);
  this.setAdjustedIndex(offset++, uint8FloatArray[2]);
  this.setAdjustedIndex(offset++, uint8FloatArray[3]);
  return offset; // at this point, we should have already added 4 to offset
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 1.
 * @returns {integer}
 */


Buffer$1.prototype.writeInt8 = function (value, offset = 0) {
  checkOffset(this, offset, 1);
  checkValue(value, -128, 127);

  if (value >= 0) {
    // just write it normally
    this.setAdjustedIndex(offset, value);
  } else {
    // convert from signed to 2's complement bits
    this.setAdjustedIndex(offset, 0xFF + value + 1); // max value, plus the negative number, add one
  }

  return offset + 1;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 2.
 * @returns {integer}
 */


Buffer$1.prototype.writeInt16BE = function (value, offset = 0) {
  checkOffset(this, offset, 2);
  checkValue(value, -32768, 32767);
  this.setAdjustedIndex(offset, value >>> 8); // just shift over a byte

  this.setAdjustedIndex(offset + 1, value & 0xFF); // mask to first byte

  return offset + 2;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 2.
 * @returns {integer}
 */


Buffer$1.prototype.writeInt16LE = function (value, offset = 0) {
  checkOffset(this, offset, 2);
  checkValue(value, -32768, 32767);
  this.setAdjustedIndex(offset, value & 0xFF);
  this.setAdjustedIndex(offset + 1, value >>> 8);
  return offset + 2;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 4.
 * @returns {integer}
 */


Buffer$1.prototype.writeInt32BE = function (value, offset = 0) {
  checkOffset(this, offset, 4);
  checkValue(value, -2147483648, 2147483647);
  this.setAdjustedIndex(offset, value >>> 24);
  this.setAdjustedIndex(offset + 1, value >>> 16);
  this.setAdjustedIndex(offset + 2, value >>> 8);
  this.setAdjustedIndex(offset + 3, value & 0xFF);
  return offset + 4;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 4.
 * @returns {integer}
 */


Buffer$1.prototype.writeInt32LE = function (value, offset = 0) {
  checkOffset(this, offset, 4);
  checkValue(value, -2147483648, 2147483647);
  this.setAdjustedIndex(offset, value & 0xFF);
  this.setAdjustedIndex(offset + 1, value >>> 8);
  this.setAdjustedIndex(offset + 2, value >>> 16);
  this.setAdjustedIndex(offset + 3, value >>> 24);
  return offset + 4;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} offset Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - byteLength.
 * @param {integer} byteLength Number of bytes to write. Must satisfy 0 < byteLength <= 6.
 * @returns {integer}
 */


Buffer$1.prototype.writeIntBE = function (value, offset, byteLength) {
  if (byteLength <= 0 || byteLength > 6) {
    throw new RangeError('Index out of range');
  }

  checkOffset(this, offset, byteLength);
  const minMaxBase = Math.pow(2, 8 * byteLength - 1);
  checkValue(value, -minMaxBase, minMaxBase - 1);

  if (value < 0) {
    value = minMaxBase * 2 + value;
  }

  let multiplier = 1;

  for (let i = byteLength - 1; i >= 0; i--) {
    let byteValue = value / multiplier & 0xFF;
    this.setAdjustedIndex(offset + i, byteValue);
    multiplier *= 0x100;
  }

  return offset + byteLength;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} offset Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - byteLength.
 * @param {integer} byteLength Number of bytes to write. Must satisfy 0 < byteLength <= 6.
 * @returns {integer}
 */


Buffer$1.prototype.writeIntLE = function (value, offset, byteLength) {
  if (byteLength <= 0 || byteLength > 6) {
    throw new RangeError('Index out of range');
  }

  checkOffset(this, offset, byteLength);
  const minMaxBase = Math.pow(2, 8 * byteLength - 1);
  checkValue(value, -minMaxBase, minMaxBase - 1);

  if (value < 0) {
    value = minMaxBase * 2 + value;
  }

  let multiplier = 1;

  for (let i = 0; i < byteLength; i++) {
    let byteValue = value / multiplier & 0xFF;
    this.setAdjustedIndex(offset + i, byteValue);
    multiplier *= 0X100;
  }

  return offset + byteLength;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 1.
 * @returns {integer}
 */


Buffer$1.prototype.writeUInt8 = function (value, offset = 0) {
  checkOffset(this, offset, 1);
  checkValue(value, 0, 255);
  this.setAdjustedIndex(offset, value);
  return offset + 1;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 2.
 * @returns {integer}
 */


Buffer$1.prototype.writeUInt16BE = function (value, offset = 0) {
  checkOffset(this, offset, 2);
  checkValue(value, 0, 65535);
  this.setAdjustedIndex(offset, value >>> 8);
  this.setAdjustedIndex(offset + 1, value & 0xff);
  return offset + 2;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 2.
 * @returns {integer}
 */


Buffer$1.prototype.writeUInt16LE = function (value, offset = 0) {
  checkOffset(this, offset, 2);
  checkValue(value, 0, 65535);
  this.setAdjustedIndex(offset, value & 0xff);
  this.setAdjustedIndex(offset + 1, value >>> 8);
  return offset + 2;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 4.
 * @returns {integer}
 */


Buffer$1.prototype.writeUInt32BE = function (value, offset = 0) {
  checkOffset(this, offset, 4);
  checkValue(value, 0, 4294967295);
  this.setAdjustedIndex(offset, value >>> 24);
  this.setAdjustedIndex(offset + 1, value >>> 16);
  this.setAdjustedIndex(offset + 2, value >>> 8);
  this.setAdjustedIndex(offset + 3, value & 0xff);
  return offset + 4;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} [offset=0] Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - 4.
 * @returns {integer}
 */


Buffer$1.prototype.writeUInt32LE = function (value, offset = 0) {
  checkOffset(this, offset, 4);
  checkValue(value, 0, 4294967295);
  this.setAdjustedIndex(offset, value & 0xff);
  this.setAdjustedIndex(offset + 1, value >>> 8);
  this.setAdjustedIndex(offset + 2, value >>> 16);
  this.setAdjustedIndex(offset + 3, value >>> 24);
  return offset + 4;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} offset Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - byteLength.
 * @param {integer} byteLength Number of bytes to write. Must satisfy 0 < byteLength <= 6.
 * @returns {integer}
 */


Buffer$1.prototype.writeUIntBE = function (value, offset, byteLength) {
  if (byteLength <= 0 || byteLength > 6) {
    throw new RangeError('Index out of range');
  }

  checkOffset(this, offset, byteLength);
  checkValue(value, 0, Math.pow(2, 8 * byteLength) - 1);
  let multiplier = 1;

  for (let i = byteLength - 1; i >= 0; i--) {
    let byteValue = value / multiplier & 0xFF;
    this.setAdjustedIndex(offset + i, byteValue);
    multiplier *= 0X100;
  }

  return offset + byteLength;
};
/**
 * @param {integer} value Number to be written to buf.
 * @param {integer} offset Number of bytes to skip before starting to write. Must satisfy 0 <= offset <= buf.length - byteLength.
 * @param {integer} byteLength Number of bytes to write. Must satisfy 0 < byteLength <= 6.
 * @returns {integer}
 */


Buffer$1.prototype.writeUIntLE = function (value, offset, byteLength) {
  if (byteLength <= 0 || byteLength > 6) {
    throw new RangeError('Index out of range');
  }

  checkOffset(this, offset, byteLength);
  checkValue(value, 0, Math.pow(2, 8 * byteLength) - 1);
  let multiplier = 1;

  for (let i = 0; i < byteLength; i++) {
    let byteValue = value / multiplier & 0xFF;
    this.setAdjustedIndex(offset + i, byteValue);
    multiplier *= 0X100;
  }

  return offset + byteLength;
}; // TODO: Implement remaining instance methods:
// buf.lastIndexOf(value[, byteOffset][, encoding])
// buf.readBigInt64BE([offset])
// buf.readBigInt64LE([offset])
// buf.readBigUInt64BE([offset])
// buf.readBigUInt64LE([offset])
// buf.writeBigInt64BE(value[, offset])
// buf.writeBigInt64LE(value[, offset])
// buf.writeBigUInt64BE(value[, offset])
// buf.writeBigUInt64LE(value[, offset])
// FIXME: We need to minimize using a backing Ti.Buffer whenever possible, because
// going back and forth across the bridge for every byte is *very* expensive
// Ideally we should have a "SlowBuffer" that is used when we explicitly wrap a Ti.Buffer
// So that writes are passed through. Otherwise we should avoid using one at all costs
// i.e. when we do Buffer.concat and are only doing reads - why do we need a Ti.Buffer?
// Can we have Ti.Buffer really just wrap a Uint8Array and add it's own methods?


Buffer$1.allocUnsafe = function (length) {
  return new FastBuffer(length);
};

Buffer$1.allocUnsafeSlow = function (length) {
  return Buffer$1.allocUnsafe(length);
};

Buffer$1.alloc = function (length, fill = 0, encoding = 'utf8') {
  const buf = Buffer$1.allocUnsafe(length);

  if (fill !== 0) {
    buf.fill(fill, encoding);
  }

  return buf;
};
/**
 * @param {string|Buffer|TypedArray|DataView|ArrayBuffer|SharedArrayBuffer} string original string
 * @param {string} [encoding='utf8'] encoding whose byte length we need to grab
 * @returns {integer}
 */


Buffer$1.byteLength = function (string, encoding = 'utf8') {
  if (typeof string !== 'string') {
    if (Buffer$1.isBuffer(string)) {
      return string.length; // return Buffer's length
    }

    return string.byteLength; // TypedArray, ArrayBuffer, SharedArrayBuffer, DataView
  }

  let length = string.length;

  switch (encoding.toLowerCase()) {
    case 'utf8':
    case 'utf-8':
      return utf8ByteLength(string);

    case 'latin1':
    case 'binary':
    case 'ascii':
      return length;

    case 'ucs-2':
    case 'ucs2':
    case 'utf16le':
    case 'utf16-le':
      return 2 * length;

    case 'hex':
      return length / 2;

    case 'base64':
      // Subtract up to two padding chars from end of string!
      if (length > 1 && string.charAt(length - 1) === '=') {
        length--;
      }

      if (length > 1 && string.charAt(length - 1) === '=') {
        length--;
      }

      return Math.floor(length * 3 / 4);
    // drop fractional value
  }

  return utf8ByteLength(string);
};

Buffer$1.compare = function (buf1, buf2) {
  if (!Buffer$1.isBuffer(buf1)) {
    throw new TypeError(`The "buf1" argument must be one of type Buffer or Uint8Array. Received type ${typeof buf1}`);
  } // TODO: Wrap UInt8Array args in buffers?


  return buf1.compare(buf2);
};
/**
 * @param {Buffer[]|UInt8Array[]} list list of Buffers to concatenate
 * @param {integer} [totalLength] Total length of the Buffer instances in list when concatenated.
 * @returns {Buffer}
 */


Buffer$1.concat = function (list, totalLength) {
  if (!Array.isArray(list)) {
    throw new TypeError('list argument must be an Array');
  }

  if (list.length === 0) {
    return new FastBuffer(); // one empty Buffer!
  } // allocate one Buffer of `totalLength`? Cap at totalLength?


  if (totalLength === undefined) {
    totalLength = 0; // generate the total length from each buffer's length?

    for (let i = 0; i < list.length; i++) {
      totalLength += list[i].length;
    }
  }

  const result = Buffer$1.allocUnsafe(totalLength);
  let position = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    buf.copy(result, position);
    position += buf.length;

    if (position >= totalLength) {
      break;
    }
  }

  return result;
};
/**
 * @param {string} encoding possible encoding name
 * @returns {boolean}
 */


Buffer$1.isEncoding = function (encoding) {
  if (typeof encoding !== 'string') {
    return false;
  }

  return VALID_ENCODINGS.includes(encoding.toLowerCase());
};
/**
 * @param {*} obj possible Buffer instance
 * @returns {boolean}
 */


Buffer$1.isBuffer = function (obj) {
  return obj !== null && obj !== undefined && (obj instanceof Buffer$1 || obj[isBuffer] === true);
};

let INSPECT_MAX_BYTES = 50; // Override how buffers are presented by util.inspect().

Buffer$1.prototype[customInspectSymbol] = function (recurseTimes, ctx) {
  const max = INSPECT_MAX_BYTES;
  const actualMax = Math.min(max, this.length);
  const remaining = this.length - max;
  let str = this.slice(0, actualMax).toString('hex').replace(/(.{2})/g, '$1 ').trim();

  if (remaining > 0) {
    str += ` ... ${remaining} more byte${remaining > 1 ? 's' : ''}`;
  } // Inspect special properties as well, if possible.


  if (ctx) {
    let extras = false;
    const filter = ctx.showHidden ? ALL_PROPERTIES$1 : ONLY_ENUMERABLE$1;
    const obj = getOwnNonIndexProperties(this, filter).reduce((obj, key) => {
      extras = true;
      obj[key] = this[key];
      return obj;
    }, Object.create(null));

    if (extras) {
      if (this.length !== 0) {
        str += ', ';
      } // '[Object: null prototype] {'.length === 26
      // This is guarded with a test.


      str += inspect(obj, { ...ctx,
        breakLength: Infinity,
        compact: true }).
      slice(27, -2);
    }
  }

  return `<${this.constructor.name} ${str}>`;
};

Buffer$1.prototype.inspect = Buffer$1.prototype[customInspectSymbol]; // HACK: ArrayBuffer.isView returns true for Node Buffer, but false for us. Until we can extend Uint8Array, we need to hack this sniffing method

const ArrayBufferIsView = ArrayBuffer.isView;

ArrayBuffer.isView = function (thing) {
  return ArrayBufferIsView(thing) || thing instanceof Buffer$1;
};

Object.setPrototypeOf(SlowBuffer.prototype, Buffer$1.prototype);
Object.setPrototypeOf(SlowBuffer, Buffer$1);
var BufferModule = {
  Buffer: Buffer$1,
  // TODO: Implement transcode()!
  transcode: (_source, _fromEncoding, _toEncoding) => {},
  INSPECT_MAX_BYTES: 50,
  kMaxLength: 2147483647,
  kStringMaxLength: 1073741799,
  constants: {
    MAX_LENGTH: 2147483647,
    MAX_STRING_LENGTH: 1073741799 } };


/**
 * Searches a Buffer for the index of a single byte.
 * @param {Buffer} buffer buffer to search
 * @param {integer} singleByte byte we're looking for
 * @param {integer} offset start offset we search at
 * @returns {integer}
 */

function indexOf(buffer, singleByte, offset) {
  const length = buffer.length;

  for (let i = offset; i < length; i++) {
    if (buffer.getAdjustedIndex(i) === singleByte) {
      return i;
    }
  }

  return -1;
}
/**
 * This function explicitly avoids bitwise operations because JS assumes 32-bit sequences for those.
 * It's possible we may be able to use them when byteLength < 4 if that's faster.
 *
 * @param {integer} unsignedValue value before converting back to signed
 * @param {integer} byteLength number of bytes
 * @returns {integer} the signed value that is represented by the unsigned value's bytes
 */


function unsignedToSigned(unsignedValue, byteLength) {
  const bitLength = byteLength * 8;
  const maxPositiveValue = Math.pow(2, bitLength - 1);

  if (unsignedValue < maxPositiveValue) {
    return unsignedValue;
  }

  const maxUnsignedValue = Math.pow(2, bitLength);
  unsignedValue -= maxUnsignedValue;
  return unsignedValue;
}
/**
 * @param {string} string utf-8 string
 * @returns {integer}
 */


function utf8ByteLength(string) {
  // Just convert to a Ti.Buffer and let it tell us the length
  const buf = Ti.createBuffer({
    value: string,
    type: Ti.Codec.CHARSET_UTF8 });

  const length = buf.length;
  buf.release(); // release the buffer since we just needed the length

  return length;
}
/**
 * Throws a RangeError if offset is out of bounds
 * @param {Buffer} buffer buffer we're operating on
 * @param {integer} offset user supplied offset
 * @param {integer} byteLength number of bytes needed in range
 * @throws {RangeError}
 */


function checkOffset(buffer, offset, byteLength) {
  const endOffset = buffer.length - byteLength;

  if (offset < 0 || offset > endOffset) {
    throw new RangeError(`The value of "offset" is out of range. It must be >= 0 and <= ${endOffset}. Received ${offset}`);
  }
}
/**
 * @param {integer} value user-supplied value
 * @param {integer} min minimum valid value
 * @param {integer} max maximum valid value
 * @throws {RangeError}
 */


function checkValue(value, min, max) {
  if (value < min || value > max) {
    throw new RangeError(`The value of "value" is out of range. It must be >= ${min} and <= ${max}. Received ${value}`);
  }
}

let bufferWarningAlreadyEmitted = false;
let nodeModulesCheckCounter = 0;
const bufferWarning = 'Buffer() is deprecated due to security and usability ' + 'issues. Please use the Buffer.alloc(), ' + 'Buffer.allocUnsafe(), or Buffer.from() methods instead.';

function showFlaggedDeprecation() {
  if (bufferWarningAlreadyEmitted || ++nodeModulesCheckCounter > 10000 || isInsideNodeModules()) {
    // We don't emit a warning, because we either:
    // - Already did so, or
    // - Already checked too many times whether a call is coming
    //   from node_modules and want to stop slowing down things, or
    // - The code is inside `node_modules`.
    return;
  }

  process.emitWarning(bufferWarning, 'DeprecationWarning', 'DEP0005');
  bufferWarningAlreadyEmitted = true;
}

// Copyright Node.js contributors. All rights reserved.
const {
  ALL_PROPERTIES: ALL_PROPERTIES$2,
  ONLY_ENUMERABLE: ONLY_ENUMERABLE$2 } =
propertyFilter;
const BooleanPrototype = Boolean.prototype;
const DatePrototype = Date.prototype;
const ErrorPrototype = Error.prototype;
const NumberPrototype = Number.prototype;
const MapPrototype = Map.prototype;
const RegExpPrototype = RegExp.prototype;
const StringPrototype = String.prototype;
const SetPrototype = Set.prototype;
const SymbolPrototype = Symbol.prototype;
const isIos = ['ipad', 'iphone'].includes("android");
const {
  ERR_INVALID_ARG_TYPE } =
codes;
const hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);
const propertyIsEnumerable = uncurryThis(Object.prototype.propertyIsEnumerable);
let hexSlice = uncurryThis(BufferModule.Buffer.prototype.hexSlice);
const builtInObjects = new Set(Object.getOwnPropertyNames(global).filter(e => /^([A-Z][a-z]+)+$/.test(e)));
const inspectDefaultOptions = Object.seal({
  showHidden: false,
  depth: 2,
  colors: false,
  customInspect: true,
  showProxy: false,
  maxArrayLength: 100,
  breakLength: 80,
  compact: 3,
  sorted: false,
  getters: false });

const kObjectType = 0;
const kArrayType = 1;
const kArrayExtrasType = 2;
/* eslint-disable no-control-regex */

const strEscapeSequencesRegExp = /[\x00-\x1f\x27\x5c]/;
const strEscapeSequencesReplacer = /[\x00-\x1f\x27\x5c]/g;
const strEscapeSequencesRegExpSingle = /[\x00-\x1f\x5c]/;
const strEscapeSequencesReplacerSingle = /[\x00-\x1f\x5c]/g;
/* eslint-enable no-control-regex */

const keyStrRegExp = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
const numberRegExp = /^(0|[1-9][0-9]*)$/;
const nodeModulesRegExp = /[/\\]node_modules[/\\](.+?)(?=[/\\])/g;
const kMinLineLength = 16; // Constants to map the iterator state.

const kWeak = 0;
const kIterator = 1;
const kMapEntries = 2; // Escaped special characters. Use empty strings to fill up unused entries.

/* eslint-disable quotes */

const meta = ['\\u0000', '\\u0001', '\\u0002', '\\u0003', '\\u0004', '\\u0005', '\\u0006', '\\u0007', '\\b', '\\t', '\\n', '\\u000b', '\\f', '\\r', '\\u000e', '\\u000f', '\\u0010', '\\u0011', '\\u0012', '\\u0013', '\\u0014', '\\u0015', '\\u0016', '\\u0017', '\\u0018', '\\u0019', '\\u001a', '\\u001b', '\\u001c', '\\u001d', '\\u001e', '\\u001f', '', '', '', '', '', '', '', "\\'", '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '\\\\'];
/* eslint-enable quotes */

function getUserOptions(ctx) {
  const obj = {
    stylize: ctx.stylize };


  for (const key of Object.keys(inspectDefaultOptions)) {
    obj[key] = ctx[key];
  }

  if (ctx.userOptions === undefined) {
    return obj;
  }

  return { ...obj,
    ...ctx.userOptions };

}
/**
 * Echos the value of any input. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {any} value The value to print out.
 * @param {Object} opts Optional options object that alters the output.
 * @return {string} The string representation of `value`
 */


function inspect(value, opts) {
  // Default options
  const ctx = {
    budget: {},
    indentationLvl: 0,
    seen: [],
    currentDepth: 0,
    stylize: stylizeNoColor,
    showHidden: inspectDefaultOptions.showHidden,
    depth: inspectDefaultOptions.depth,
    colors: inspectDefaultOptions.colors,
    customInspect: inspectDefaultOptions.customInspect,
    showProxy: inspectDefaultOptions.showProxy,
    maxArrayLength: inspectDefaultOptions.maxArrayLength,
    breakLength: inspectDefaultOptions.breakLength,
    compact: inspectDefaultOptions.compact,
    sorted: inspectDefaultOptions.sorted,
    getters: inspectDefaultOptions.getters };


  if (arguments.length > 1) {
    // Legacy...
    if (arguments.length > 2) {
      if (arguments[2] !== undefined) {
        ctx.depth = arguments[2];
      }

      if (arguments.length > 3 && arguments[3] !== undefined) {
        ctx.colors = arguments[3];
      }
    } // Set user-specified options


    if (typeof opts === 'boolean') {
      ctx.showHidden = opts;
    } else if (opts) {
      const optKeys = Object.keys(opts);

      for (const key of optKeys) {
        // TODO(BridgeAR): Find a solution what to do about stylize. Either make
        // this function public or add a new API with a similar or better
        // functionality.
        if (hasOwnProperty(inspectDefaultOptions, key) || key === 'stylize') {
          ctx[key] = opts[key];
        } else if (ctx.userOptions === undefined) {
          // This is required to pass through the actual user input.
          ctx.userOptions = opts;
        }
      }
    }
  }

  if (ctx.colors) {
    ctx.stylize = stylizeWithColor;
  }

  if (ctx.maxArrayLength === null) {
    ctx.maxArrayLength = Infinity;
  }

  return formatValue(ctx, value, 0);
}
inspect.custom = customInspectSymbol;
Object.defineProperty(inspect, 'defaultOptions', {
  get() {
    return inspectDefaultOptions;
  },

  set(options) {
    if (options === null || typeof options !== 'object') {
      throw new ERR_INVALID_ARG_TYPE('options', 'Object', options);
    }

    Object.assign(inspectDefaultOptions, options);
  } });

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = Object.assign(Object.create(null), {
  bold: [1, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  white: [37, 39],
  grey: [90, 39],
  black: [30, 39],
  blue: [34, 39],
  cyan: [36, 39],
  green: [32, 39],
  magenta: [35, 39],
  red: [31, 39],
  yellow: [33, 39] });
// Don't use 'blue' not visible on cmd.exe

inspect.styles = Object.assign(Object.create(null), {
  special: 'cyan',
  number: 'yellow',
  bigint: 'yellow',
  boolean: 'yellow',
  undefined: 'grey',
  null: 'bold',
  string: 'green',
  symbol: 'green',
  date: 'magenta',
  // "name": intentionally not styling
  regexp: 'red',
  module: 'underline' });


function addQuotes(str, quotes) {
  if (quotes === -1) {
    return `"${str}"`;
  }

  if (quotes === -2) {
    return `\`${str}\``;
  }

  return `'${str}'`;
}

const escapeFn = str => meta[str.charCodeAt(0)]; // Escape control characters, single quotes and the backslash.
// This is similar to JSON stringify escaping.


function strEscape(str) {
  let escapeTest = strEscapeSequencesRegExp;
  let escapeReplace = strEscapeSequencesReplacer;
  let singleQuote = 39; // Check for double quotes. If not present, do not escape single quotes and
  // instead wrap the text in double quotes. If double quotes exist, check for
  // backticks. If they do not exist, use those as fallback instead of the
  // double quotes.
  // eslint-disable-next-line quotes

  if (str.includes("'")) {
    // This invalidates the charCode and therefore can not be matched for
    // anymore.
    if (!str.includes('"')) {
      singleQuote = -1;
    } else if (!str.includes('`') && !str.includes('${')) {
      singleQuote = -2;
    }

    if (singleQuote !== 39) {
      escapeTest = strEscapeSequencesRegExpSingle;
      escapeReplace = strEscapeSequencesReplacerSingle;
    }
  } // Some magic numbers that worked out fine while benchmarking with v8 6.0


  if (str.length < 5000 && !escapeTest.test(str)) {
    return addQuotes(str, singleQuote);
  }

  if (str.length > 100) {
    str = str.replace(escapeReplace, escapeFn);
    return addQuotes(str, singleQuote);
  }

  let result = '';
  let last = 0;
  const lastIndex = str.length;

  for (let i = 0; i < lastIndex; i++) {
    const point = str.charCodeAt(i);

    if (point === singleQuote || point === 92 || point < 32) {
      if (last === i) {
        result += meta[point];
      } else {
        result += `${str.slice(last, i)}${meta[point]}`;
      }

      last = i + 1;
    }
  }

  if (last !== lastIndex) {
    result += str.slice(last);
  }

  return addQuotes(result, singleQuote);
}

function stylizeWithColor(str, styleType) {
  const style = inspect.styles[styleType];

  if (style !== undefined) {
    const color = inspect.colors[style];
    return `\u001b[${color[0]}m${str}\u001b[${color[1]}m`;
  }

  return str;
}

function stylizeNoColor(str) {
  return str;
} // Return a new empty array to push in the results of the default formatter.


function getEmptyFormatArray() {
  return [];
}

function getConstructorName(obj, _ctx) {
  let firstProto; // const tmp = obj;

  while (obj) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, 'constructor');

    if (descriptor !== undefined && typeof descriptor.value === 'function' && descriptor.value.name !== '') {
      return descriptor.value.name;
    }

    obj = Object.getPrototypeOf(obj);

    if (firstProto === undefined) {
      firstProto = obj;
    }
  }

  if (firstProto === null) {
    return null;
  }
  /*
   @todo this calls into native, can we replace this somehow?
  return `${internalGetConstructorName(tmp)} <${inspect(firstProto, {
  	...ctx,
  	customInspect: false
  })}>`;
  */


  return null;
}

function getPrefix(constructor, tag, fallback) {
  if (constructor === null) {
    if (tag !== '') {
      return `[${fallback}: null prototype] [${tag}] `;
    }

    return `[${fallback}: null prototype] `;
  }

  if (tag !== '' && constructor !== tag) {
    return `${constructor} [${tag}] `;
  }

  return `${constructor} `;
} // Look up the keys of the object.


function getKeys(value, showHidden) {
  let keys;
  const symbols = Object.getOwnPropertySymbols(value);

  if (showHidden) {
    keys = Object.getOwnPropertyNames(value);

    if (symbols.length !== 0) {
      keys.push(...symbols);
    }
  } else {
    // This might throw if `value` is a Module Namespace Object from an
    // unevaluated module, but we don't want to perform the actual type
    // check because it's expensive.
    // TODO(devsnek): track https://github.com/tc39/ecma262/issues/1209
    // and modify this logic as needed.
    try {
      keys = Object.keys(value);
    } catch (err) {
      // @fixme how to du isModuleNamespaceObject?

      /*
      assert(isNativeError(err) && err.name === 'ReferenceError' &&
      			 isModuleNamespaceObject(value));
      */
      keys = Object.getOwnPropertyNames(value);
    }

    if (symbols.length !== 0) {
      keys.push(...symbols.filter(key => propertyIsEnumerable(value, key)));
    }
  }

  return keys;
}

function getCtxStyle(value, constructor, tag) {
  let fallback = '';

  if (constructor === null) {
    fallback = 'Object';
  }

  return getPrefix(constructor, tag, fallback);
}

function findTypedConstructor(value) {
  for (const [check, clazz] of [[isUint8Array, Uint8Array], [isUint8ClampedArray, Uint8ClampedArray], [isUint16Array, Uint16Array], [isUint32Array, Uint32Array], [isInt8Array, Int8Array], [isInt16Array, Int16Array], [isInt32Array, Int32Array], [isFloat32Array, Float32Array], [isFloat64Array, Float64Array]]) {
    if (check(value)) {
      return clazz;
    }
  }
}

let lazyNullPrototypeCache; // Creates a subclass and name
// the constructor as `${clazz} : null prototype`

function clazzWithNullPrototype(clazz, name) {
  if (lazyNullPrototypeCache === undefined) {
    lazyNullPrototypeCache = new Map();
  } else {
    const cachedClass = lazyNullPrototypeCache.get(clazz);

    if (cachedClass !== undefined) {
      return cachedClass;
    }
  }

  class NullPrototype extends clazz {
    get [Symbol.toStringTag]() {
      return '';
    }}



  Object.defineProperty(NullPrototype.prototype.constructor, 'name', {
    value: `[${name}: null prototype]` });

  lazyNullPrototypeCache.set(clazz, NullPrototype);
  return NullPrototype;
}

function noPrototypeIterator(ctx, value, recurseTimes) {
  let newVal;

  if (isSet(value)) {
    const clazz = clazzWithNullPrototype(Set, 'Set');
    newVal = new clazz(SetPrototype.values(value));
  } else if (isMap(value)) {
    const clazz = clazzWithNullPrototype(Map, 'Map');
    newVal = new clazz(MapPrototype.entries(value));
  } else if (Array.isArray(value)) {
    const clazz = clazzWithNullPrototype(Array, 'Array');
    newVal = new clazz(value.length);
  } else if (isTypedArray(value)) {
    const constructor = findTypedConstructor(value);
    const clazz = clazzWithNullPrototype(constructor, constructor.name);
    newVal = new clazz(value);
  }

  if (newVal !== undefined) {
    Object.defineProperties(newVal, Object.getOwnPropertyDescriptors(value));
    return formatRaw(ctx, newVal, recurseTimes);
  }
}

function formatValue(ctx, value, recurseTimes, typedArray) {
  // Primitive types cannot have properties.
  if (typeof value !== 'object' && typeof value !== 'function') {
    return formatPrimitive(ctx.stylize, value, ctx);
  }

  if (value === null) {
    return ctx.stylize('null', 'null');
  } // Memorize the context for custom inspection on proxies.


  const context = value;
  /*
  @fixme check for proxies
  // Always check for proxies to prevent side effects and to prevent triggering
  // any proxy handlers.
  const proxy = getProxyDetails(value);
  if (proxy !== undefined) {
  	if (ctx.showProxy) {
  		return formatProxy(ctx, proxy, recurseTimes);
  	}
  	value = proxy[0];
  }
  */
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it.

  if (ctx.customInspect) {
    const maybeCustom = value[customInspectSymbol];

    if (typeof maybeCustom === 'function' // Filter out the util module, its inspect function is special.
    && maybeCustom !== inspect // Also filter out any prototype objects using the circular check.
    && !(value.constructor && value.constructor.prototype === value)) {
      // This makes sure the recurseTimes are reported as before while using
      // a counter internally.
      const depth = ctx.depth === null ? null : ctx.depth - recurseTimes;
      const ret = maybeCustom.call(context, depth, getUserOptions(ctx)); // If the custom inspection method returned `this`, don't go into
      // infinite recursion.

      if (ret !== context) {
        if (typeof ret !== 'string') {
          return formatValue(ctx, ret, recurseTimes);
        }

        return ret.replace(/\n/g, `\n${' '.repeat(ctx.indentationLvl)}`);
      }
    }
  } // Using an array here is actually better for the average case than using
  // a Set. `seen` will only check for the depth and will never grow too large.


  if (ctx.seen.includes(value)) {
    let index = 1;

    if (ctx.circular === undefined) {
      ctx.circular = new Map([[value, index]]);
    } else {
      index = ctx.circular.get(value);

      if (index === undefined) {
        index = ctx.circular.size + 1;
        ctx.circular.set(value, index);
      }
    }

    return ctx.stylize(`[Circular *${index}]`, 'special');
  }

  return formatRaw(ctx, value, recurseTimes, typedArray);
}

function formatRaw(ctx, value, recurseTimes, typedArray) {
  let keys;
  const constructor = getConstructorName(value);
  let tag = value[Symbol.toStringTag]; // Only list the tag in case it's non-enumerable / not an own property.
  // Otherwise we'd print this twice.

  if (typeof tag !== 'string' || tag !== '' && (ctx.showHidden ? hasOwnProperty : propertyIsEnumerable)(value, Symbol.toStringTag)) {
    tag = '';
  }

  let base = '';
  let formatter = getEmptyFormatArray;
  let braces;
  let noIterator = true;
  let i = 0;
  const filter = ctx.showHidden ? ALL_PROPERTIES$2 : ONLY_ENUMERABLE$2;
  let extrasType = kObjectType; // Iterators and the rest are split to reduce checks.

  if (value[Symbol.iterator]) {
    noIterator = false;

    if (Array.isArray(value)) {
      keys = getOwnNonIndexProperties(value, filter); // Only set the constructor for non ordinary ("Array [...]") arrays.

      const prefix = getPrefix(constructor, tag, 'Array');
      braces = [`${prefix === 'Array ' ? '' : prefix}[`, ']'];

      if (value.length === 0 && keys.length === 0) {
        return `${braces[0]}]`;
      }

      extrasType = kArrayExtrasType;
      formatter = formatArray;
    } else if (isSet(value)) {
      keys = getKeys(value, ctx.showHidden);
      const prefix = getPrefix(constructor, tag, 'Set');

      if (value.size === 0 && keys.length === 0) {
        return `${prefix}{}`;
      }

      braces = [`${prefix}{`, '}'];
      formatter = formatSet;
    } else if (isMap(value)) {
      keys = getKeys(value, ctx.showHidden);
      const prefix = getPrefix(constructor, tag, 'Map');

      if (value.size === 0 && keys.length === 0) {
        return `${prefix}{}`;
      }

      braces = [`${prefix}{`, '}'];
      formatter = formatMap;
    } else if (isTypedArray(value)) {
      keys = getOwnNonIndexProperties(value, filter);
      const prefix = constructor !== null ? getPrefix(constructor, tag) : getPrefix(constructor, tag, findTypedConstructor(value).name);
      braces = [`${prefix}[`, ']'];

      if (value.length === 0 && keys.length === 0 && !ctx.showHidden) {
        return `${braces[0]}]`;
      }

      formatter = formatTypedArray;
      extrasType = kArrayExtrasType;
    } else if (isMapIterator(value)) {
      keys = getKeys(value, ctx.showHidden);
      braces = getIteratorBraces('Map', tag);
      formatter = formatIterator;
    } else if (isSetIterator(value)) {
      keys = getKeys(value, ctx.showHidden);
      braces = getIteratorBraces('Set', tag);
      formatter = formatIterator;
    } else {
      noIterator = true;
    }
  }

  if (noIterator) {
    keys = getKeys(value, ctx.showHidden);
    braces = ['{', '}'];

    if (constructor === 'Object') {
      if (isArgumentsObject(value)) {
        braces[0] = '[Arguments] {';
      } else if (tag !== '') {
        braces[0] = `${getPrefix(constructor, tag, 'Object')}{`;
      }

      if (keys.length === 0) {
        return `${braces[0]}}`;
      }
    } else if (typeof value === 'function') {
      base = getFunctionBase(value, constructor, tag);

      if (keys.length === 0) {
        return ctx.stylize(base, 'special');
      }
    } else if (isRegExp(value)) {
      // Make RegExps say that they are RegExps
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regExp = constructor !== null ? value : new RegExp(value);
      base = RegExpPrototype.toString.call(regExp);
      const prefix = getPrefix(constructor, tag, 'RegExp');

      if (prefix !== 'RegExp ') {
        base = `${prefix}${base}`;
      }

      if (keys.length === 0 || recurseTimes > ctx.depth && ctx.depth !== null) {
        return ctx.stylize(base, 'regexp');
      }
    } else if (isDate(value)) {
      // Make dates with properties first say the date
      base = Number.isNaN(DatePrototype.getTime.call(value)) ? DatePrototype.toString.call(value) : DatePrototype.toISOString.call(value);
      const prefix = getPrefix(constructor, tag, 'Date');

      if (prefix !== 'Date ') {
        base = `${prefix}${base}`;
      }

      if (keys.length === 0) {
        return ctx.stylize(base, 'date');
      }
    } else if (isError(value)) {
      base = formatError(value, constructor, tag, ctx);

      if (keys.length === 0) {
        return base;
      } else if (isIos) {
        const nativeErrorProps = ['line', 'column', 'sourceURL'];

        if (keys.every(key => nativeErrorProps.includes(key))) {
          return base;
        }
      }
    } else if (isAnyArrayBuffer(value)) {
      // Fast path for ArrayBuffer and SharedArrayBuffer.
      // Can't do the same for DataView because it has a non-primitive
      // .buffer property that we need to recurse for.
      const arrayType = isArrayBuffer(value) ? 'ArrayBuffer' : 'SharedArrayBuffer';
      const prefix = getPrefix(constructor, tag, arrayType);

      if (typedArray === undefined) {
        formatter = formatArrayBuffer;
      } else if (keys.length === 0) {
        return `${prefix}{ byteLength: ${formatNumber(ctx.stylize, value.byteLength)} }`;
      }

      braces[0] = `${prefix}{`;
      keys.unshift('byteLength');
    } else if (isDataView(value)) {
      braces[0] = `${getPrefix(constructor, tag, 'DataView')}{`; // .buffer goes last, it's not a primitive like the others.

      keys.unshift('byteLength', 'byteOffset', 'buffer');
    } else if (isPromise(value)) {
      braces[0] = `${getPrefix(constructor, tag, 'Promise')}{`;
      formatter = formatPromise;
    } else if (isWeakSet(value)) {
      braces[0] = `${getPrefix(constructor, tag, 'WeakSet')}{`;
      formatter = ctx.showHidden ? formatWeakSet : formatWeakCollection;
    } else if (isWeakMap(value)) {
      braces[0] = `${getPrefix(constructor, tag, 'WeakMap')}{`;
      formatter = ctx.showHidden ? formatWeakMap : formatWeakCollection;
      /*
       * @fixme how to do isModuleNamespaceObject?
      } else if (isModuleNamespaceObject(value)) {
      	braces[0] = `[${tag}] {`;
      	formatter = formatNamespaceObject;
      */
    } else if (isBoxedPrimitive(value)) {
      base = getBoxedBase(value, ctx, keys, constructor, tag);

      if (keys.length === 0) {
        return base;
      }
    } else {
      // The input prototype got manipulated. Special handle these. We have to
      // rebuild the information so we are able to display everything.
      if (constructor === null) {
        const specialIterator = noPrototypeIterator(ctx, value, recurseTimes);

        if (specialIterator) {
          return specialIterator;
        }
      }

      if (isMapIterator(value)) {
        braces = getIteratorBraces('Map', tag);
        formatter = formatIterator;
      } else if (isSetIterator(value)) {
        braces = getIteratorBraces('Set', tag);
        formatter = formatIterator; // Handle other regular objects again.
      } else {
        if (keys.length === 0) {
          return `${getCtxStyle(value, constructor, tag)}{}`;
        }

        braces[0] = `${getCtxStyle(value, constructor, tag)}{`;
      }
    }
  }

  if (recurseTimes > ctx.depth && ctx.depth !== null) {
    let constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);

    if (constructor !== null) {
      constructorName = `[${constructorName}]`;
    }

    return ctx.stylize(constructorName, 'special');
  }

  recurseTimes += 1;
  ctx.seen.push(value);
  ctx.currentDepth = recurseTimes;
  let output;
  const indentationLvl = ctx.indentationLvl;

  try {
    output = formatter(ctx, value, recurseTimes, keys, braces);

    for (i = 0; i < keys.length; i++) {
      output.push(formatProperty(ctx, value, recurseTimes, keys[i], extrasType));
    }
  } catch (err) {
    const constructorName = getCtxStyle(value, constructor, tag).slice(0, -1);
    return handleMaxCallStackSize(ctx, err, constructorName, indentationLvl);
  }

  if (ctx.circular !== undefined) {
    const index = ctx.circular.get(value);

    if (index !== undefined) {
      const reference = ctx.stylize(`<ref *${index}>`, 'special'); // Add reference always to the very beginning of the output.

      if (ctx.compact !== true) {
        base = base === '' ? reference : `${reference} ${base}`;
      } else {
        braces[0] = `${reference} ${braces[0]}`;
      }
    }
  }

  ctx.seen.pop();

  if (ctx.sorted) {
    const comparator = ctx.sorted === true ? undefined : ctx.sorted;

    if (extrasType === kObjectType) {
      output = output.sort(comparator);
    } else if (keys.length > 1) {
      const sorted = output.slice(output.length - keys.length).sort(comparator);
      output.splice(output.length - keys.length, keys.length, ...sorted);
    }
  }

  const res = reduceToSingleString(ctx, output, base, braces, extrasType, recurseTimes, value);
  const budget = ctx.budget[ctx.indentationLvl] || 0;
  const newLength = budget + res.length;
  ctx.budget[ctx.indentationLvl] = newLength; // If any indentationLvl exceeds this limit, limit further inspecting to the
  // minimum. Otherwise the recursive algorithm might continue inspecting the
  // object even though the maximum string size (~2 ** 28 on 32 bit systems and
  // ~2 ** 30 on 64 bit systems) exceeded. The actual output is not limited at
  // exactly 2 ** 27 but a bit higher. This depends on the object shape.
  // This limit also makes sure that huge objects don't block the event loop
  // significantly.

  if (newLength > 2 ** 27) {
    ctx.depth = -1;
  }

  return res;
}

function getIteratorBraces(type, tag) {
  if (tag !== `${type} Iterator`) {
    if (tag !== '') {
      tag += '] [';
    }

    tag += `${type} Iterator`;
  }

  return [`[${tag}] {`, '}'];
}

function getBoxedBase(value, ctx, keys, constructor, tag) {
  let fn;
  let type;

  if (isNumberObject(value)) {
    fn = NumberPrototype;
    type = 'Number';
  } else if (isStringObject(value)) {
    fn = StringPrototype;
    type = 'String'; // For boxed Strings, we have to remove the 0-n indexed entries,
    // since they just noisy up the output and are redundant
    // Make boxed primitive Strings look like such

    keys.splice(0, value.length);
  } else if (isBooleanObject(value)) {
    fn = BooleanPrototype;
    type = 'Boolean';
  } else {
    fn = SymbolPrototype;
    type = 'Symbol';
  }

  let base = `[${type}`;

  if (type !== constructor) {
    if (constructor === null) {
      base += ' (null prototype)';
    } else {
      base += ` (${constructor})`;
    }
  }

  base += `: ${formatPrimitive(stylizeNoColor, fn.valueOf(value), ctx)}]`;

  if (tag !== '' && tag !== constructor) {
    base += ` [${tag}]`;
  }

  if (keys.length !== 0 || ctx.stylize === stylizeNoColor) {
    return base;
  }

  return ctx.stylize(base, type.toLowerCase());
}

function getFunctionBase(value, constructor, tag) {
  let type = 'Function';

  if (isGeneratorFunction(value)) {
    type = `Generator${type}`;
  }

  if (isAsyncFunction(value)) {
    type = `Async${type}`;
  }

  let base = `[${type}`;

  if (constructor === null) {
    base += ' (null prototype)';
  }

  if (value.name === '') {
    base += ' (anonymous)';
  } else {
    base += `: ${value.name}`;
  }

  base += ']';

  if (constructor !== type && constructor !== null) {
    base += ` ${constructor}`;
  }

  if (tag !== '' && constructor !== tag) {
    base += ` [${tag}]`;
  }

  return base;
}

function formatError(err, constructor, tag, ctx) {
  let stack = err.stack || ErrorPrototype.toString.call(err); // try to normalize JavaScriptCore stack to match v8

  if (isIos) {
    const lines = stack.split('\n');
    stack = `${err.name}: ${err.message}`;

    if (lines.length > 0) {
      stack += lines.map(stackLine => {
        const atSymbolIndex = stackLine.indexOf('@');
        const source = stackLine.slice(atSymbolIndex + 1);
        const sourcePattern = /(.*):(\d+):(\d+)/;
        let symbolName = 'unknown';

        if (atSymbolIndex !== -1) {
          symbolName = stackLine.slice(0, atSymbolIndex);
        }

        const sourceMatch = source.match(sourcePattern);

        if (sourceMatch) {
          let filePath = sourceMatch[1];
          const lineNumber = sourceMatch[2];
          const column = sourceMatch[3];

          if (filePath.startsWith('file:')) {
            filePath = filePath.replace(`file://${Ti.Filesystem.resourcesDirectory}`, '');
          }

          return `\n    at ${symbolName} (${filePath}:${lineNumber}:${column})`;
        } else {
          return `\n    at ${symbolName} (${source})`;
        }
      }).join('');
    }
  } // A stack trace may contain arbitrary data. Only manipulate the output
  // for "regular errors" (errors that "look normal") for now.


  const name = err.name || 'Error';
  let len = name.length;

  if (constructor === null || name.endsWith('Error') && stack.startsWith(name) && (stack.length === len || stack[len] === ':' || stack[len] === '\n')) {
    let fallback = 'Error';

    if (constructor === null) {
      const start = stack.match(/^([A-Z][a-z_ A-Z0-9[\]()-]+)(?::|\n {4}at)/) || stack.match(/^([a-z_A-Z0-9-]*Error)$/);
      fallback = start && start[1] || '';
      len = fallback.length;
      fallback = fallback || 'Error';
    }

    const prefix = getPrefix(constructor, tag, fallback).slice(0, -1);

    if (name !== prefix) {
      if (prefix.includes(name)) {
        if (len === 0) {
          stack = `${prefix}: ${stack}`;
        } else {
          stack = `${prefix}${stack.slice(len)}`;
        }
      } else {
        stack = `${prefix} [${name}]${stack.slice(len)}`;
      }
    }
  } // Ignore the error message if it's contained in the stack.


  let pos = err.message && stack.indexOf(err.message) || -1;

  if (pos !== -1) {
    pos += err.message.length;
  } // Wrap the error in brackets in case it has no stack trace.


  let stackStart = stack.indexOf('\n    at', pos);

  if (stackStart === -1) {
    stack = `[${stack}]`;
  } else if (ctx.colors) {
    // Highlight userland code and node modules.
    let newStack = stack.slice(0, stackStart);
    const lines = stack.slice(stackStart + 1).split('\n');

    for (const line of lines) {
      // This adds underscores to all node_modules to quickly identify them.
      let nodeModule;
      newStack += '\n';
      let pos = 0;

      while (nodeModule = nodeModulesRegExp.exec(line)) {
        // '/node_modules/'.length === 14
        newStack += line.slice(pos, nodeModule.index + 14);
        newStack += ctx.stylize(nodeModule[1], 'module');
        pos = nodeModule.index + nodeModule[0].length;
      }

      newStack += pos === 0 ? line : line.slice(pos);
    }

    stack = newStack;
  } // The message and the stack have to be indented as well!


  if (ctx.indentationLvl !== 0) {
    const indentation = ' '.repeat(ctx.indentationLvl);
    stack = stack.replace(/\n/g, `\n${indentation}`);
  }

  return stack;
}

function formatPromise(ctx, _value, _recurseTimes) {
  // Node calls into native to get promise details which we can't do
  return [ctx.stylize('<unknown>', 'special')];
}

function formatProperty(ctx, value, recurseTimes, key, type) {
  let name, str;
  let extra = ' ';
  const desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key],
    enumerable: true };


  if (desc.value !== undefined) {
    const diff = type !== kObjectType || ctx.compact !== true ? 2 : 3;
    ctx.indentationLvl += diff;
    str = formatValue(ctx, desc.value, recurseTimes);

    if (diff === 3) {
      const len = ctx.colors ? removeColors(str).length : str.length;

      if (ctx.breakLength < len) {
        extra = `\n${' '.repeat(ctx.indentationLvl)}`;
      }
    }

    ctx.indentationLvl -= diff;
  } else if (desc.get !== undefined) {
    const label = desc.set !== undefined ? 'Getter/Setter' : 'Getter';
    const s = ctx.stylize;
    const sp = 'special';

    if (ctx.getters && (ctx.getters === true || ctx.getters === 'get' && desc.set === undefined || ctx.getters === 'set' && desc.set !== undefined)) {
      try {
        const tmp = value[key];
        ctx.indentationLvl += 2;

        if (tmp === null) {
          str = `${s(`[${label}:`, sp)} ${s('null', 'null')}${s(']', sp)}`;
        } else if (typeof tmp === 'object') {
          str = `${s(`[${label}]`, sp)} ${formatValue(ctx, tmp, recurseTimes)}`;
        } else {
          const primitive = formatPrimitive(s, tmp, ctx);
          str = `${s(`[${label}:`, sp)} ${primitive}${s(']', sp)}`;
        }

        ctx.indentationLvl -= 2;
      } catch (err) {
        const message = `<Inspection threw (${err.message})>`;
        str = `${s(`[${label}:`, sp)} ${message}${s(']', sp)}`;
      }
    } else {
      str = ctx.stylize(`[${label}]`, sp);
    }
  } else if (desc.set !== undefined) {
    str = ctx.stylize('[Setter]', 'special');
  } else {
    str = ctx.stylize('undefined', 'undefined');
  }

  if (type === kArrayType) {
    return str;
  }

  if (typeof key === 'symbol') {
    const tmp = key.toString().replace(strEscapeSequencesReplacer, escapeFn);
    name = `[${ctx.stylize(tmp, 'symbol')}]`;
  } else if (desc.enumerable === false) {
    name = `[${key.replace(strEscapeSequencesReplacer, escapeFn)}]`;
  } else if (keyStrRegExp.test(key)) {
    name = ctx.stylize(key, 'name');
  } else {
    name = ctx.stylize(strEscape(key), 'string');
  }

  return `${name}:${extra}${str}`;
}

function groupArrayElements(ctx, output, value) {
  let totalLength = 0;
  let maxLength = 0;
  let i = 0;
  let outputLength = output.length;

  if (ctx.maxArrayLength < output.length) {
    // This makes sure the "... n more items" part is not taken into account.
    outputLength--;
  }

  const separatorSpace = 2; // Add 1 for the space and 1 for the separator.

  const dataLen = new Array(outputLength); // Calculate the total length of all output entries and the individual max
  // entries length of all output entries. We have to remove colors first,
  // otherwise the length would not be calculated properly.

  for (; i < outputLength; i++) {
    const len = ctx.colors ? removeColors(output[i]).length : output[i].length;
    dataLen[i] = len;
    totalLength += len + separatorSpace;

    if (maxLength < len) {
      maxLength = len;
    }
  } // Add two to `maxLength` as we add a single whitespace character plus a comma
  // in-between two entries.


  const actualMax = maxLength + separatorSpace; // Check if at least three entries fit next to each other and prevent grouping
  // of arrays that contains entries of very different length (i.e., if a single
  // entry is longer than 1/5 of all other entries combined). Otherwise the
  // space in-between small entries would be enormous.

  if (actualMax * 3 + ctx.indentationLvl < ctx.breakLength && (totalLength / actualMax > 5 || maxLength <= 6)) {
    const approxCharHeights = 2.5;
    const averageBias = Math.sqrt(actualMax - totalLength / output.length);
    const biasedMax = Math.max(actualMax - 3 - averageBias, 1); // Dynamically check how many columns seem possible.

    const columns = Math.min( // Ideally a square should be drawn. We expect a character to be about 2.5
    // times as high as wide. This is the area formula to calculate a square
    // which contains n rectangles of size `actualMax * approxCharHeights`.
    // Divide that by `actualMax` to receive the correct number of columns.
    // The added bias increases the columns for short entries.
    Math.round(Math.sqrt(approxCharHeights * biasedMax * outputLength) / biasedMax), // Do not exceed the breakLength.
    Math.floor((ctx.breakLength - ctx.indentationLvl) / actualMax), // Limit array grouping for small `compact` modes as the user requested
    // minimal grouping.
    ctx.compact * 4, // Limit the columns to a maximum of fifteen.
    15); // Return with the original output if no grouping should happen.

    if (columns <= 1) {
      return output;
    }

    const tmp = [];
    const maxLineLength = [];

    for (let i = 0; i < columns; i++) {
      let lineMaxLength = 0;

      for (let j = i; j < output.length; j += columns) {
        if (dataLen[j] > lineMaxLength) {
          lineMaxLength = dataLen[j];
        }
      }

      lineMaxLength += separatorSpace;
      maxLineLength[i] = lineMaxLength;
    }

    let order = 'padStart';

    if (value !== undefined) {
      for (let i = 0; i < output.length; i++) {
        if (typeof value[i] !== 'number') {
          order = 'padEnd';
          break;
        }
      }
    } // Each iteration creates a single line of grouped entries.


    for (let i = 0; i < outputLength; i += columns) {
      // The last lines may contain less entries than columns.
      const max = Math.min(i + columns, outputLength);
      let str = '';
      let j = i;

      for (; j < max - 1; j++) {
        // Calculate extra color padding in case it's active. This has to be
        // done line by line as some lines might contain more colors than
        // others.
        const padding = maxLineLength[j - i] + output[j].length - dataLen[j];
        str += `${output[j]}, `[order](padding, ' ');
      }

      if (order === 'padStart') {
        const padding = maxLineLength[j - i] + output[j].length - dataLen[j] - separatorSpace;
        str += output[j].padStart(padding, ' ');
      } else {
        str += output[j];
      }

      tmp.push(str);
    }

    if (ctx.maxArrayLength < output.length) {
      tmp.push(output[outputLength]);
    }

    output = tmp;
  }

  return output;
}

function handleMaxCallStackSize(ctx, err, constructorName, indentationLvl) {
  if (isStackOverflowError(err)) {
    ctx.seen.pop();
    ctx.indentationLvl = indentationLvl;
    return ctx.stylize(`[${constructorName}: Inspection interrupted 'prematurely. Maximum call stack size exceeded.]`, 'special');
  }

  throw err;
}

function formatNumber(fn, value) {
  // Format -0 as '-0'. Checking `value === -0` won't distinguish 0 from -0.
  return fn(Object.is(value, -0) ? '-0' : `${value}`, 'number');
}

function formatBigInt(fn, value) {
  return fn(`${value}n`, 'bigint');
}

function formatPrimitive(fn, value, ctx) {
  if (typeof value === 'string') {
    if (ctx.compact !== true && value.length > kMinLineLength && value.length > ctx.breakLength - ctx.indentationLvl - 4) {
      return value.split(/\n/).map(line => fn(strEscape(line), 'string')).join(` +\n${' '.repeat(ctx.indentationLvl + 2)}`);
    }

    return fn(strEscape(value), 'string');
  }

  if (typeof value === 'number') {
    return formatNumber(fn, value);
  }
  /*
  if (typeof value === 'bigint') {
  	return formatBigInt(fn, value);
  }
  */


  if (typeof value === 'boolean') {
    return fn(`${value}`, 'boolean');
  }

  if (typeof value === 'undefined') {
    return fn('undefined', 'undefined');
  } // es6 symbol primitive


  return fn(SymbolPrototype.toString.call(value), 'symbol');
} // The array is sparse and/or has extra keys


function formatSpecialArray(ctx, value, recurseTimes, maxLength, output, i) {
  const keys = Object.keys(value);
  let index = i;

  for (; i < keys.length && output.length < maxLength; i++) {
    const key = keys[i];
    const tmp = +key; // Arrays can only have up to 2^32 - 1 entries

    if (tmp > 2 ** 32 - 2) {
      break;
    }

    if (`${index}` !== key) {
      if (!numberRegExp.test(key)) {
        break;
      }

      const emptyItems = tmp - index;
      const ending = emptyItems > 1 ? 's' : '';
      const message = `<${emptyItems} empty item${ending}>`;
      output.push(ctx.stylize(message, 'undefined'));
      index = tmp;

      if (output.length === maxLength) {
        break;
      }
    }

    output.push(formatProperty(ctx, value, recurseTimes, key, kArrayType));
    index++;
  }

  const remaining = value.length - index;

  if (output.length !== maxLength) {
    if (remaining > 0) {
      const ending = remaining > 1 ? 's' : '';
      const message = `<${remaining} empty item${ending}>`;
      output.push(ctx.stylize(message, 'undefined'));
    }
  } else if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? 's' : ''}`);
  }

  return output;
}

function formatArrayBuffer(ctx, value) {
  const buffer = new Uint8Array(value);
  /*
  // @fixme rollup cannot handle lazy loaded modules, maybe move to webpack?
  if (hexSlice === undefined) {
  	hexSlice = uncurryThis(require('../../buffer').default.Buffer.prototype.hexSlice);
  }
  */

  let str = hexSlice(buffer, 0, Math.min(ctx.maxArrayLength, buffer.length)).replace(/(.{2})/g, '$1 ').trim();
  const remaining = buffer.length - ctx.maxArrayLength;

  if (remaining > 0) {
    str += ` ... ${remaining} more byte${remaining > 1 ? 's' : ''}`;
  }

  return [`${ctx.stylize('[Uint8Contents]', 'special')}: <${str}>`];
}

function formatArray(ctx, value, recurseTimes) {
  const valLen = value.length;
  const len = Math.min(Math.max(0, ctx.maxArrayLength), valLen);
  const remaining = valLen - len;
  const output = [];

  for (var i = 0; i < len; i++) {
    // Special handle sparse arrays.
    if (!hasOwnProperty(value, i)) {
      return formatSpecialArray(ctx, value, recurseTimes, len, output, i);
    }

    output.push(formatProperty(ctx, value, recurseTimes, i, kArrayType));
  }

  if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? 's' : ''}`);
  }

  return output;
}

function formatTypedArray(ctx, value, recurseTimes) {
  const maxLength = Math.min(Math.max(0, ctx.maxArrayLength), value.length);
  const remaining = value.length - maxLength;
  const output = new Array(maxLength);
  const elementFormatter = value.length > 0 && typeof value[0] === 'number' ? formatNumber : formatBigInt;

  for (let i = 0; i < maxLength; ++i) {
    output[i] = elementFormatter(ctx.stylize, value[i]);
  }

  if (remaining > 0) {
    output[maxLength] = `... ${remaining} more item${remaining > 1 ? 's' : ''}`;
  }

  if (ctx.showHidden) {
    // .buffer goes last, it's not a primitive like the others.
    ctx.indentationLvl += 2;

    for (const key of ['BYTES_PER_ELEMENT', 'length', 'byteLength', 'byteOffset', 'buffer']) {
      const str = formatValue(ctx, value[key], recurseTimes, true);
      output.push(`[${key}]: ${str}`);
    }

    ctx.indentationLvl -= 2;
  }

  return output;
}

function formatSet(ctx, value, recurseTimes) {
  const output = [];
  ctx.indentationLvl += 2;

  for (const v of value) {
    output.push(formatValue(ctx, v, recurseTimes));
  }

  ctx.indentationLvl -= 2; // With `showHidden`, `length` will display as a hidden property for
  // arrays. For consistency's sake, do the same for `size`, even though this
  // property isn't selected by Object.getOwnPropertyNames().

  if (ctx.showHidden) {
    output.push(`[size]: ${ctx.stylize(`${value.size}`, 'number')}`);
  }

  return output;
}

function formatMap(ctx, value, recurseTimes) {
  const output = [];
  ctx.indentationLvl += 2;

  for (const [k, v] of value) {
    output.push(`${formatValue(ctx, k, recurseTimes)} => ${formatValue(ctx, v, recurseTimes)}`);
  }

  ctx.indentationLvl -= 2; // See comment in formatSet

  if (ctx.showHidden) {
    output.push(`[size]: ${ctx.stylize(`${value.size}`, 'number')}`);
  }

  return output;
}

function formatSetIterInner(ctx, recurseTimes, entries, state) {
  const maxArrayLength = Math.max(ctx.maxArrayLength, 0);
  const maxLength = Math.min(maxArrayLength, entries.length);
  let output = new Array(maxLength);
  ctx.indentationLvl += 2;

  for (var i = 0; i < maxLength; i++) {
    output[i] = formatValue(ctx, entries[i], recurseTimes);
  }

  ctx.indentationLvl -= 2;

  if (state === kWeak && !ctx.sorted) {
    // Sort all entries to have a halfway reliable output (if more entries than
    // retrieved ones exist, we can not reliably return the same output) if the
    // output is not sorted anyway.
    output = output.sort();
  }

  const remaining = entries.length - maxLength;

  if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? 's' : ''}`);
  }

  return output;
}

function formatMapIterInner(ctx, recurseTimes, entries, state) {
  const maxArrayLength = Math.max(ctx.maxArrayLength, 0); // Entries exist as [key1, val1, key2, val2, ...]

  const len = entries.length / 2;
  const remaining = len - maxArrayLength;
  const maxLength = Math.min(maxArrayLength, len);
  let output = new Array(maxLength);
  let i = 0;
  ctx.indentationLvl += 2;

  if (state === kWeak) {
    for (; i < maxLength; i++) {
      const pos = i * 2;
      output[i] = `${formatValue(ctx, entries[pos], recurseTimes)}` + ` => ${formatValue(ctx, entries[pos + 1], recurseTimes)}`;
    } // Sort all entries to have a halfway reliable output (if more entries than
    // retrieved ones exist, we can not reliably return the same output) if the
    // output is not sorted anyway.


    if (!ctx.sorted) {
      output = output.sort();
    }
  } else {
    for (; i < maxLength; i++) {
      const pos = i * 2;
      const res = [formatValue(ctx, entries[pos], recurseTimes), formatValue(ctx, entries[pos + 1], recurseTimes)];
      output[i] = reduceToSingleString(ctx, res, '', ['[', ']'], kArrayExtrasType, recurseTimes);
    }
  }

  ctx.indentationLvl -= 2;

  if (remaining > 0) {
    output.push(`... ${remaining} more item${remaining > 1 ? 's' : ''}`);
  }

  return output;
}

function formatWeakCollection(ctx) {
  return [ctx.stylize('<items unknown>', 'special')];
}

function formatWeakSet(ctx, _value, _recurseTimes) {
  // Node calls into native to get a preview of actual values which we can't do
  return formatWeakCollection(ctx);
}

function formatWeakMap(ctx, _value, _recurseTimes) {
  // Node calls into native to get a preview of actual values which we can't do
  return formatWeakCollection(ctx);
}

function formatIterator(ctx, value, recurseTimes, _keys, braces) {
  const entries = [];
  let isKeyValue = false;
  let result = value.next();

  while (!result.done) {
    const currentEntry = result.value;
    entries.push(currentEntry);

    if (currentEntry[0] !== currentEntry[1]) {
      isKeyValue = true;
    }

    result = value.next();
  }

  if (isKeyValue) {
    // Mark entry iterators as such.
    braces[0] = braces[0].replace(/ Iterator] {$/, ' Entries] {');
    return formatMapIterInner(ctx, recurseTimes, entries, kMapEntries);
  }

  return formatSetIterInner(ctx, recurseTimes, entries, kIterator);
}

function isBelowBreakLength(ctx, output, start, base) {
  // Each entry is separated by at least a comma. Thus, we start with a total
  // length of at least `output.length`. In addition, some cases have a
  // whitespace in-between each other that is added to the total as well.
  let totalLength = output.length + start;

  if (totalLength + output.length > ctx.breakLength) {
    return false;
  }

  for (var i = 0; i < output.length; i++) {
    if (ctx.colors) {
      totalLength += removeColors(output[i]).length;
    } else {
      totalLength += output[i].length;
    }

    if (totalLength > ctx.breakLength) {
      return false;
    }
  } // Do not line up properties on the same line if `base` contains line breaks.


  return base === '' || !base.includes('\n');
}

function reduceToSingleString(ctx, output, base, braces, extrasType, recurseTimes, value) {
  if (ctx.compact !== true) {
    if (typeof ctx.compact === 'number' && ctx.compact >= 1) {
      // Memorize the original output length. In case the the output is grouped,
      // prevent lining up the entries on a single line.
      const entries = output.length; // Group array elements together if the array contains at least six
      // separate entries.

      if (extrasType === kArrayExtrasType && entries > 6) {
        output = groupArrayElements(ctx, output, value);
      } // `ctx.currentDepth` is set to the most inner depth of the currently
      // inspected object part while `recurseTimes` is the actual current depth
      // that is inspected.
      //
      // Example:
      //
      // const a = { first: [ 1, 2, 3 ], second: { inner: [ 1, 2, 3 ] } }
      //
      // The deepest depth of `a` is 2 (a.second.inner) and `a.first` has a max
      // depth of 1.
      //
      // Consolidate all entries of the local most inner depth up to
      // `ctx.compact`, as long as the properties are smaller than
      // `ctx.breakLength`.


      if (ctx.currentDepth - recurseTimes < ctx.compact && entries === output.length) {
        // Line up all entries on a single line in case the entries do not
        // exceed `breakLength`. Add 10 as constant to start next to all other
        // factors that may reduce `breakLength`.
        const start = output.length + ctx.indentationLvl + braces[0].length + base.length + 10;

        if (isBelowBreakLength(ctx, output, start, base)) {
          return `${base ? `${base} ` : ''}${braces[0]} ${join(output, ', ')} ${braces[1]}`;
        }
      }
    } // Line up each entry on an individual line.


    const indentation = `\n${' '.repeat(ctx.indentationLvl)}`;
    return `${base ? `${base} ` : ''}${braces[0]}${indentation}  ` + `${join(output, `,${indentation}  `)}${indentation}${braces[1]}`;
  } // Line up all entries on a single line in case the entries do not exceed
  // `breakLength`.


  if (isBelowBreakLength(ctx, output, 0, base)) {
    return `${braces[0]}${base ? ` ${base}` : ''} ${join(output, ', ')} ` + braces[1];
  }

  const indentation = ' '.repeat(ctx.indentationLvl); // If the opening "brace" is too large, like in the case of "Set {",
  // we need to force the first item to be on the next line or the
  // items will not line up correctly.

  const ln = base === '' && braces[0].length === 1 ? ' ' : `${base ? ` ${base}` : ''}\n${indentation}  `; // Line up each entry on an individual line.

  return `${braces[0]}${ln}${join(output, `,\n${indentation}  `)} ${braces[1]}`;
}

function format(...args) {
  return formatWithOptions(undefined, ...args);
}

const firstErrorLine = error => error.message.split('\n')[0];

let CIRCULAR_ERROR_MESSAGE;

function tryStringify(arg) {
  try {
    return JSON.stringify(arg);
  } catch (err) {
    // Populate the circular error message lazily
    if (!CIRCULAR_ERROR_MESSAGE) {
      try {
        const a = {};
        a.a = a;
        JSON.stringify(a);
      } catch (e) {
        CIRCULAR_ERROR_MESSAGE = firstErrorLine(e);
      }
    }

    if (err.name === 'TypeError' && firstErrorLine(err) === CIRCULAR_ERROR_MESSAGE) {
      return '[Circular]';
    }

    throw err;
  }
}
/* eslint-disable max-depth */


function formatWithOptions(inspectOptions, ...args) {
  const first = args[0];
  let a = 0;
  let str = '';
  let join = '';

  if (typeof first === 'string') {
    if (args.length === 1) {
      return first;
    }

    let tempStr;
    let lastPos = 0;

    for (var i = 0; i < first.length - 1; i++) {
      if (first.charCodeAt(i) === 37) {
        // '%'
        const nextChar = first.charCodeAt(++i);

        if (a + 1 !== args.length) {
          switch (nextChar) {
            case 115:
              // 's'
              const tempArg = args[++a];

              if (typeof tempArg === 'number') {
                tempStr = formatNumber(stylizeNoColor, tempArg);
                /*
                } else if (typeof tempArg === 'bigint') {
                	tempStr = `${tempArg}n`;
                */
              } else {
                let constr;

                if (typeof tempArg !== 'object' || tempArg === null || typeof tempArg.toString === 'function' && (hasOwnProperty(tempArg, 'toString') // A direct own property on the constructor prototype in
                // case the constructor is not an built-in object.
                || (constr = tempArg.constructor) && !builtInObjects.has(constr.name) && constr.prototype && hasOwnProperty(constr.prototype, 'toString'))) {
                  tempStr = String(tempArg);
                } else {
                  tempStr = inspect(tempArg, { ...inspectOptions,
                    compact: 3,
                    colors: false,
                    depth: 0 });

                }
              }

              break;

            case 106:
              // 'j'
              tempStr = tryStringify(args[++a]);
              break;

            case 100:
              // 'd'
              const tempNum = args[++a];
              /*
              if (typeof tempNum === 'bigint') {
              	tempStr = `${tempNum}n`;
              } else
              */

              if (typeof tempNum === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = formatNumber(stylizeNoColor, Number(tempNum));
              }

              break;

            case 79:
              // 'O'
              tempStr = inspect(args[++a], inspectOptions);
              break;

            case 111:
              // 'o'
              {
                tempStr = inspect(args[++a], { ...inspectOptions,
                  showHidden: true,
                  showProxy: true,
                  depth: 4 });

                break;
              }

            case 105:
              // 'i'
              const tempInteger = args[++a];
              /*
              if (typeof tempInteger === 'bigint') {
              	tempStr = `${tempInteger}n`;
              } else */

              if (typeof tempInteger === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = formatNumber(stylizeNoColor, parseInt(tempInteger));
              }

              break;

            case 102:
              // 'f'
              const tempFloat = args[++a];

              if (typeof tempFloat === 'symbol') {
                tempStr = 'NaN';
              } else {
                tempStr = formatNumber(stylizeNoColor, parseFloat(tempFloat));
              }

              break;

            case 37:
              // '%'
              str += first.slice(lastPos, i);
              lastPos = i + 1;
              continue;

            default:
              // Any other character is not a correct placeholder
              continue;}


          if (lastPos !== i - 1) {
            str += first.slice(lastPos, i - 1);
          }

          str += tempStr;
          lastPos = i + 1;
        } else if (nextChar === 37) {
          str += first.slice(lastPos, i);
          lastPos = i + 1;
        }
      }
    }

    if (lastPos !== 0) {
      a++;
      join = ' ';

      if (lastPos < first.length) {
        str += first.slice(lastPos);
      }
    }
  }

  while (a < args.length) {
    const value = args[a];
    str += join;
    str += typeof value !== 'string' ? inspect(value, inspectOptions) : value;
    join = ' ';
    a++;
  }

  return str;
}
/* eslint-enable max-depth */

function noop() {}

function logTime(self, label, logData) {
  label = `${label}`;

  const startTime = self._times.get(label);

  if (!startTime) {
    process.emitWarning(`Label "${label}" does not exist`);
    return true;
  }

  const duration = Date.now() - startTime;

  if (logData) {
    self.log(`${label}: ${duration}ms`, ...logData);
  } else {
    self.log(`${label}: ${duration}ms`);
  }

  return false;
}

const kColorInspectOptions = {
  colors: true };

const kNoColorInspectOptions = {};
let tableWarned; // boolean flag for one-time warning about console.table not being implemented
// Make a function that can serve as the callback passed to `stream.write()`.

function createWriteErrorHandler(stream) {
  return err => {
    // This conditional evaluates to true if and only if there was an error
    // that was not already emitted (which happens when the _write callback
    // is invoked asynchronously).
    if (err !== null && !stream._writableState.errorEmitted) {
      // If there was an error, it will be emitted on `stream` as
      // an `error` event. Adding a `once` listener will keep that error
      // from becoming an uncaught exception, but since the handler is
      // removed after the event, non-console.* writes won't be affected.
      // we are only adding noop if there is no one else listening for 'error'
      if (stream.listenerCount('error') === 0) {
        stream.once('error', noop);
      }
    }
  };
}

class Console {
  constructor(options, stderr, ignoreErrors) {
    if (options && options.apiName === 'Ti.API') {
      // Passing in Ti.API module where we retain log levels
      this._apiModule = options;
    } else {
      // Node.JS streams
      if (!options || typeof options.write === 'function') {
        // no args, or first arg is a stream
        options = {
          stdout: options,
          stderr,
          ignoreErrors };

      }

      this._stdout = options.stdout; // TODO: enforce has write function?

      this._stderr = options.stderr || this._stdout;
      this._ignoreErrors = options.ignoreErrors !== false;

      if (this._ignoreErrors) {
        this._stdoutErrorHandler = createWriteErrorHandler(this._stdout);
        this._stderrErrorHandler = createWriteErrorHandler(this._stderr);
      }

      this._colorMode = options.colorMode || 'auto'; // TODO: enforce boolean or 'auto'

      this._inspectOptions = options.inspectOptions; // TODO: enforce undefined or typeof 'object'
    }

    this._times = new Map();
    this._counts = new Map();
    this._groupIndent = '';
  }

  _writeToConsole(level, string) {
    if (this._groupIndent.length !== 0) {
      if (string.includes('\n')) {
        string = string.replace(/\n/g, `\n${this._groupIndent}`);
      }

      string = this._groupIndent + string;
    } // Support wrapping Ti.API (which retains log level)


    if (this._apiModule) {
      this._apiModule[level](string);
    } else {
      // Support Node.JS streams like stdout/stderr which don't have log levels
      const useStdErr = level === 'warn' || level === 'error' || level === 'trace';
      const stream = useStdErr ? this._stderr : this._stdout;

      if (this._ignoreErrors === false) {
        return stream.write(string);
      } // There may be an error occurring synchronously (e.g. for files or TTYs
      // on POSIX systems) or asynchronously (e.g. pipes on POSIX systems), so
      // handle both situations.


      try {
        // Add and later remove a noop error handler to catch synchronous errors.
        if (stream.listenerCount('error') === 0) {
          stream.once('error', noop);
        }

        const errorHandler = useStdErr ? this._stderrErrorHandler : this._stdoutErrorHandler;
        stream.write(string, errorHandler);
      } catch (e) {
        // Console is a debugging utility, so it swallowing errors is not desirable
        // even in edge cases such as low stack space.
        if (isStackOverflowError(e)) {
          throw e;
        } // Sorry, there's no proper way to pass along the error here.

      } finally {
        stream.removeListener && stream.removeListener('error', noop);
      }
    }
  }

  info(...args) {
    this._writeToConsole('info', formatWithOptions(kColorInspectOptions, ...args));
  }

  warn(...args) {
    this._writeToConsole('warn', formatWithOptions(kNoColorInspectOptions, ...args));
  }

  error(...args) {
    this._writeToConsole('error', formatWithOptions(kNoColorInspectOptions, ...args));
  }

  debug(...args) {
    this._writeToConsole('debug', formatWithOptions(kColorInspectOptions, ...args));
  }

  trace(...args) {
    this._writeToConsole('trace', formatWithOptions(kColorInspectOptions, ...args));
  }

  clear() {} // no-op


  group(...data) {
    if (data.length > 0) {
      this.log(...data);
    }

    this._groupIndent += '  ';
  }

  groupEnd() {
    this._groupIndent = this._groupIndent.slice(0, this._groupIndent.length - 2);
  }

  dir(obj, options) {
    this._writeToConsole('info', inspect(obj, {
      customInspect: false,
      ...options }));

  }

  assert(value, ...args) {
    if (!value) {
      args[0] = `Assertion failed${args.length === 0 ? '' : `: ${args[0]}`}`;
      this.warn(...args); // The arguments will be formatted in warn() again
    }
  }

  count(label = 'default') {
    // Ensures that label is a string, and only things that can be
    // coerced to strings. e.g. Symbol is not allowed
    label = `${label}`;

    let count = this._counts.get(label);

    if (count === undefined) {
      count = 1;
    } else {
      count++;
    }

    this._counts.set(label, count);

    this.log(`${label}: ${count}`);
  }

  countReset(label = 'default') {
    if (!this._counts.has(label)) {
      process.emitWarning(`Count for '${label}' does not exist`);
      return;
    }

    this._counts.delete(`${label}`);
  }

  time(label = 'default') {
    label = `${label}`;

    if (this._times.has(label)) {
      process.emitWarning(`Label ${label}" already exists`);
      return;
    }

    this._times.set(label, Date.now());
  }

  timeEnd(label = 'default') {
    const warned = logTime(this, label);

    if (!warned) {
      this._times.delete(label);
    }
  }

  timeLog(label = 'default', ...logData) {
    logTime(this, label, logData);
  } // TODO: implement console.table()


  table() {
    if (!tableWarned) {
      tableWarned = true;
      process.emitWarning('"console.table" is not yet implemented in Titanium!');
    }
  }}



Console.prototype.log = Console.prototype.info; // Treat log as alias to info

Console.prototype.dirxml = Console.prototype.log; // Treat dirxml as alias to log

Console.prototype.groupCollapsed = Console.prototype.group;
const globalConsole = new Console(Ti.API);
globalConsole.Console = Console;
global.console = globalConsole;

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2020 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/* globals OS_ANDROID */
{
  Date.prototype.toLocaleDateString = function () {
    const properties = Intl.DateTimeFormat._makeTiCreationPropertiesFrom(arguments);

    const oldOptions = properties.options;

    if (!oldOptions || !oldOptions.dateStyle && !oldOptions.month && !oldOptions.day && !oldOptions.year) {
      const defaultOptions = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric' };

      properties.options = Object.assign(defaultOptions, oldOptions);
    }

    const formatter = new Intl.DateTimeFormat(properties.locale, properties.options);
    return formatter.format(this);
  };

  Date.prototype.toLocaleTimeString = function () {
    const properties = Intl.DateTimeFormat._makeTiCreationPropertiesFrom(arguments);

    const oldOptions = properties.options;

    if (!oldOptions || !oldOptions.timeStyle && !oldOptions.hour && !oldOptions.minute && !oldOptions.second) {
      const defaultOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric' };

      properties.options = Object.assign(defaultOptions, oldOptions);
    }

    const formatter = new Intl.DateTimeFormat(properties.locale, properties.options);
    return formatter.format(this);
  };

  Date.prototype.toLocaleString = function () {
    const properties = Intl.DateTimeFormat._makeTiCreationPropertiesFrom(arguments);

    const oldOptions = properties.options;
    let hasOption = false;

    if (oldOptions) {
      hasOption = !!oldOptions.dateStyle || !!oldOptions.timeStyle || !!oldOptions.weekday || !!oldOptions.month || !!oldOptions.day || !!oldOptions.year || !!oldOptions.hour || !!oldOptions.minute || !!oldOptions.second;
    }

    if (!hasOption) {
      const defaultOptions = {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric' };

      properties.options = Object.assign(defaultOptions, oldOptions);
    }

    const formatter = new Intl.DateTimeFormat(properties.locale, properties.options);
    return formatter.format(this);
  };
}

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2018 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
// Add a toJSON() method to all Error objects needed to output non-enumerable properties.
// The JSON.stringify() will automatically call this method if it exists to provide custom output.
// Notes:
// - In V8, all Error properties are not enumerable. We need this or else stringify() will return "{}".
// - In JavaScriptCore, only the "stack" property is not enumerable. We want to reveal this.
if (typeof Error.prototype.toJSON !== 'function') {
  Error.prototype.toJSON = function () {
    var properties = {};
    Object.getOwnPropertyNames(this).forEach(function (name) {
      properties[name] = this[name];
    }, this);
    return properties;
  };
}

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2020 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/* globals OS_ANDROID */

/**
 * Generates a "creation" properties dictionary for Titanium's Collator, DateTimeFormat, and NumberFormat proxies
 * from the given Intl type's constructor arguments.
 * @param {Object[]} args
 * The arguments array that was passed into Intl Collator, DateTimeFormat, or NumberFormat type's constructor.
 * @param {Function} supportedFormatLocalesFunction Reference to a supportedLocalesOf() function.
 * @return {Object} Returns a properties dictionary to be passed into a Titanium proxy's constructor.
 */

function makeTiFormatCreationPropertiesFrom(args, supportedFormatLocalesFunction) {
  const properties = {};

  if (args.length >= 1) {
    if (typeof args[0] === 'string') {
      properties.locale = args[0];
    } else if (Array.isArray(args[0])) {
      const supportedLocales = supportedFormatLocalesFunction(args[0]);

      if (supportedLocales.length > 0) {
        properties.locale = supportedLocales[0];
      }
    }
  }

  if (args.length >= 2 && typeof args[1] === 'object') {
    properties.options = args[1];
  }

  return properties;
} // Add "Intl" APIs missing on Android.


{
  // Set up an "Intl.Collator" type which wraps our undocumented "Ti.Locale.Collator" proxy.
  function TiCollator() {
    const properties = makeTiFormatCreationPropertiesFrom(arguments, Ti.Locale.getSupportedCollatorLocales);
    const collator = new Ti.Locale.Collator(properties);
    collator.compare = collator.compare.bind(collator);
    return collator;
  }

  TiCollator.supportedLocalesOf = Ti.Locale.getSupportedCollatorLocales; // Set up an "Intl.DateTimeFormat" type which wraps our undocumented "Ti.Locale.DateTimeFormat" proxy.

  function TiDateTimeFormat() {
    const properties = makeTiFormatCreationPropertiesFrom(arguments, Ti.Locale.getSupportedDateTimeFormatLocales);
    return new Ti.Locale.DateTimeFormat(properties);
  }

  TiDateTimeFormat._makeTiCreationPropertiesFrom = args => {
    return makeTiFormatCreationPropertiesFrom(args, Ti.Locale.getSupportedDateTimeFormatLocales);
  };

  TiDateTimeFormat.supportedLocalesOf = Ti.Locale.getSupportedDateTimeFormatLocales; // Set up an "Intl.NumberFormat" type which wraps our undocumented "Ti.Locale.NumberFormat" proxy.

  function TiNumberFormat() {
    const properties = makeTiFormatCreationPropertiesFrom(arguments, Ti.Locale.getSupportedNumberFormatLocales);
    return new Ti.Locale.NumberFormat(properties);
  }

  TiNumberFormat.supportedLocalesOf = Ti.Locale.getSupportedNumberFormatLocales; // Make our custom "Intl" module available globally.

  commonjsGlobal.Intl = {
    Collator: TiCollator,
    DateTimeFormat: TiDateTimeFormat,
    NumberFormat: TiNumberFormat,
    getCanonicalLocales: Ti.Locale.getCanonicalLocales };

}

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2020 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/* globals OS_ANDROID */
{
  Number.prototype.toLocaleString = function () {
    const formatter = new Intl.NumberFormat(...arguments);
    return formatter.format(this.valueOf());
  };
}

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2020 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/* globals OS_ANDROID */
{
  String.prototype.localeCompare = function (compareString, locales, options) {
    const collator = new Intl.Collator(locales, options);
    return collator.compare(this, compareString);
  };

  String.prototype.toLocaleLowerCase = function (locale) {
    return Ti.Locale.makeLowerCase(this, locale);
  };

  String.prototype.toLocaleUpperCase = function (locale) {
    return Ti.Locale.makeUpperCase(this, locale);
  };
}

/**
 * This file is used to hijack the standard require to allow for JS
 * implementations of "core" modules.
 *
 * You add a binding from the "core" module id to the under the hood JS
 * implementation. We then intercept require calls to handle requests for these modules
 * and lazily load the file.
 */

/**
 * Used by @function bindObjectToCoreModuleId
 * @type {map<string, object>}
 */
const bindings = new Map();
/**
 * Used by @function redirectCoreModuleIdToPath
 * @type {map<string, string>}
 */

const redirects = new Map();
/**
 * Does the request look like a typical core module? (no '.' or '/' characters)
 * @param {string} path original require path/id
 * @returns {boolean}
 */

function isHijackableModuleId(path) {
  if (!path || path.length < 1) {
    return false;
  }

  const firstChar = path.charAt(0);
  return firstChar !== '.' && firstChar !== '/';
} // Hack require to point to this as a core module "binding"


const originalRequire = global.require; // This works for iOS as-is, and also intercepts the call on Android for ti.main.js (the first file executed)

global.require = function (moduleId) {
  if (bindings.has(moduleId)) {
    return bindings.get(moduleId);
  }

  if (redirects.has(moduleId)) {
    moduleId = redirects.get(moduleId);
  }

  return originalRequire(moduleId);
};

{
  // ... but we still need to hack it when requiring from other files for Android
  const originalModuleRequire = global.Module.prototype.require;

  global.Module.prototype.require = function (path, context) {
    if (bindings.has(path)) {
      return bindings.get(path);
    }

    if (redirects.has(path)) {
      path = redirects.get(path);
    }

    return originalModuleRequire.call(this, path, context);
  };
}
/**
 * Registers a binding from a short module id to an already loaded/constructed object/value to export for that core module id
 *
 * @param {string} moduleId the module id to "hijack"
 * @param {*} binding an already constructured value/object to return
 */


function register(moduleId, binding) {
  if (!isHijackableModuleId(moduleId)) {
    throw new Error(`Cannot register for relative/absolute file paths; no leading '.' or '/' allowed (was given ${moduleId})`);
  }

  if (redirects.has(moduleId)) {
    Ti.API.warn(`Another binding has already registered for module id: '${moduleId}', it will be overwritten...`);
    redirects.delete(moduleId);
  } else if (bindings.has(moduleId)) {
    Ti.API.warn(`Another binding has already registered for module id: '${moduleId}', it will be overwritten...`);
  }

  bindings.set(moduleId, binding);
}
/**
 * Registers a binding from a short module id to the full under the hood filepath if given a string.
 * This allows for lazy instantiation of the module on-demand
 *
 * @param {string} moduleId the module id to "hijack"
 * @param {string} filepath the full filepath to require under the hood.
 *                              This should be an already resolved absolute path,
 *                              as otherwise the context of the call could change what gets loaded!
 */

function redirect(moduleId, filepath) {
  if (!isHijackableModuleId(moduleId)) {
    throw new Error(`Cannot register for relative/absolute file paths; no leading '.' or '/' allowed (was given ${moduleId})`);
  }

  if (bindings.has(moduleId)) {
    Ti.API.warn(`Another binding has already registered for module id: '${moduleId}', it will be overwritten...`);
    bindings.delete(moduleId);
  } else if (redirects.has(moduleId)) {
    Ti.API.warn(`Another binding has already registered for module id: '${moduleId}', it will be overwritten...`);
  }

  redirects.set(moduleId, filepath);
}
const binding = {
  register,
  redirect };

global.binding = binding;

// Load all JavaScript extensions/polyfills
register('console', globalConsole);

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2019-Present by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */

/* globals OS_IOS, OS_VERSION_MAJOR */
const buffer = Ti.createBuffer({
  value: '' });

const blob = buffer.toBlob();
// https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer


blob.constructor.prototype.arrayBuffer = function () {
  return new Promise((resolve, reject) => {
    let buf;

    try {
      buf = this.toArrayBuffer();
    } catch (err) {
      return reject(err);
    }

    resolve(buf);
  });
};

/**
 * This script is used at runtime for Ti.UI.fetchSemanticColor - as well as at build time by both iOS/Android.
 * It provides a common interface for handling colors and converting to necessary string forms.
 */

const HEX_3_REGEX = /^#?([a-f\d])([a-f\d])([a-f\d])$/i; // i.e. #0F3

const HEX_4_REGEX = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i; // i.e. #0F38

const HEX_6_REGEX = /^#?([a-f\d]){6}$/i; // i.e. #00FF33

const HEX_8_REGEX = /^#?([a-f\d]){8}$/i; // i.e. #00FF3388

/**
 * @param {number} integer in range of 0-255
 * @returns {string} 2-character hex string value
 */

function paddedHex(integer) {
  const str = integer.toString(16);

  if (str.length === 1) {
    return `0${str}`;
  }

  return str;
}

class Color {
  /**
   * @param {number} r red value in range 0-255
   * @param {number} g green value in range 0-255
   * @param {number} b blue value in range 0-255
   * @param {number} [a=1.0] alpha value in range 0.0-1.0
   */
  constructor(r, g, b, a = 1.0) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = a;
  }
  /**
   * indicates if this is a fully opaque color (alpha is 1.0 or was undefined)
   * @returns {boolean}
   */


  isOpaque() {
    return this.alpha === 1.0;
  }
  /**
   * Converts the alpha value into equivalent hex string value properly.
   * @returns {string}
   */


  alphaHex() {
    // need to round to avoid nonsensical values like '7f.8' for a 0.5 alpha
    return paddedHex(Math.round(this.alpha * 255.0));
  }
  /**
   * Discards any alpha value. To be used internally, not external api. Does not provide leading '#' symbol.
   * @returns {string}
   */


  _toRGBHexString() {
    return `${paddedHex(this.r)}${paddedHex(this.g)}${paddedHex(this.b)}`;
  }
  /**
   * Used by CSS.
   * Converts this color to a hex string with leading '#' symbol and 6- or 8-
   * hexadecimal characters (depending on if alpha is 1.0)
   * @returns {string}
   */


  toRGBAHexString() {
    if (this.isOpaque()) {
      return `#${this._toRGBHexString()}`;
    }

    return `#${this._toRGBHexString()}${this.alphaHex()}`;
  }
  /**
   * Used by Android/iOS
   * Converts this color to a hex string with leading '#' symbol and 6- or 8-
   * hexadecimal characters (depending on if alpha is 1.0). Alpha is the first entry (if there is alpha.)
   * @returns {string}
   */


  toARGBHexString() {
    if (this.isOpaque()) {
      return `#${this._toRGBHexString()}`;
    }

    return `#${this.alphaHex()}${this._toRGBHexString()}`;
  }
  /**
   * For commonality with native iOS TiColor proxy. Produces an AARRGGBB (or RRGGBB if full alpha) hex string
   * @returns {string}
   */


  toHex() {
    return this.toARGBHexString();
  }
  /**
   * Converts this color to an rgba expression. This expression is more consistent across platforms.
   * (whereas iOS/Android differ in expecttaiosn for hex strings.)
   * @returns {string}
   */


  toRGBAString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha.toFixed(3)})`;
  }
  /**
   * @returns {Color}
   */


  static fallback() {
    return new Color(0, 0, 0); // return black to match native impl in iOS
  }
  /**
   * The supplied hex string MUST be in form '#000000' (i.e. leading pound symbol, 6 hex characters after)
   * @param {string} hex hexadecimal color string
   * @param {number} [alpha] alpha value
   * @returns {Color}
   */


  static fromHex6String(hex, alpha) {
    const startIndex = hex.startsWith('#') ? 1 : 0;
    const r = parseInt(hex.substr(startIndex, 2), 16);
    const g = parseInt(hex.substr(startIndex + 2, 2), 16);
    const b = parseInt(hex.substr(startIndex + 4, 2), 16);
    return new Color(r, g, b, alpha);
  }
  /**
   * The supplied hex string MUST be in form '#00000000' (i.e. leading pound symbol, 8 hex characters after)
   * @param {string} hex hexadecimal color string
   * @returns {Color}
   */


  static fromHex8String(hex) {
    const startIndex = hex.startsWith('#') ? 1 : 0;
    const alpha = parseInt(hex.substr(startIndex, 2), 16); // alpha is now 0-255

    const r = parseInt(hex.substr(startIndex + 2, 2), 16);
    const g = parseInt(hex.substr(startIndex + 4, 2), 16);
    const b = parseInt(hex.substr(startIndex + 6, 2), 16);
    return new Color(r, g, b, alpha / 255.0); // convert to 0.0-1.0 (percent)
  }
  /**
   * Note that the hex value can contain alpha, but must follow the CSS standard of #RRGGBBAA (NOT the Android standard of #AARRGGBB)
   * @param {string|object} entry possible hex string or an object
   * @param {string|number} [hex.alpha] alpha value in percent (0.0-100.0) when hex is an object
  	 * @param {string} [hex.color] hex string for the base color when hex is an object
   * @returns {Color}
   * @throws if entry has both an explicit alpha value AND a hex string containing an alpha value
   */


  static fromSemanticColorsEntry(entry) {
    let color = entry;
    let alpha = 1.0;
    let hadAlpha = false;

    if (Object.prototype.hasOwnProperty.call(entry, 'alpha')) {
      alpha = parseFloat(entry.alpha) / 100.0; // convert from 0-100 range to 0-1 range

      hadAlpha = true;
      color = entry.color; // if it has an alpha property assume it has a color property too!
    } // expand the shorter hex string forms to 6 or 8 digits


    if (color.length === 3) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      color = color.replace(HEX_3_REGEX, (m, r, g, b) => r + r + g + g + b + b);
    } else if (color.length === 4) {
      // Expand shorthand form (e.g. "03F8") to full form (e.g. "0033FF88")
      color = color.replace(HEX_4_REGEX, (m, a, r, g, b) => a + a + r + r + g + g + b + b);
    }

    if (HEX_6_REGEX.exec(color)) {
      return Color.fromHex6String(color, alpha);
    }

    if (HEX_8_REGEX.exec(color)) {
      if (hadAlpha) {
        throw new Error(`Color ${entry} had an explicit alpha value AND a hex value containing alpha. Use one or the other.`);
      }

      return Color.fromHex8String(color);
    } // uh-oh, something is up!


    return Color.fallback();
  }}



var color = Color;

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2019-2020 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */
// Ti.UI within this file, we must call kroll.binding to get the Titanium
// namespace that is passed in with require and that deal with the .UI
// namespace that is on that directly.

const UI = kroll.binding('Titanium').Titanium.UI; // Make our read-only constants
// TODO: Remove in SDK 10, DEPRECATED in 9.1.0

Object.defineProperty(UI, 'SEMANTIC_COLOR_TYPE_LIGHT', {
  value: 'light',
  writable: false });

Object.defineProperty(UI, 'SEMANTIC_COLOR_TYPE_DARK', {
  value: 'dark',
  writable: false });

Object.defineProperty(UI, 'semanticColorType', {
  get: () => {
    // TODO: Guard against ios < 13 and Android api < 29?
    // Assume "light" mode unless we explicitly know it's dark
    if (Ti.UI.userInterfaceStyle === Ti.UI.USER_INTERFACE_STYLE_DARK) {
      return UI.SEMANTIC_COLOR_TYPE_DARK;
    }

    return UI.SEMANTIC_COLOR_TYPE_LIGHT;
  } });
// on Android/iOS < 13, we need to roll our own fetchSemanticColor impl
// on iOS 13+, we have a native version

{

  let colorset;

  UI.fetchSemanticColor = function fetchSemanticColor(colorName) {
    if (!colorset) {
      try {
        const colorsetFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'semantic.colors.json');

        if (colorsetFile.exists()) {
          colorset = JSON.parse(colorsetFile.read().text);
        }
      } catch (error) {
        // We should probably throw an Error here (or return a fallback color!)
        console.error('Failed to load colors file \'semantic.colors.json\'');
        return color.fallback().toHex();
      }
    }

    try {
      if (!colorset[colorName]) {
        if (true) {
          // if it's not in the semantic colors and we're on Android, it may be a Ti.Android.R.color value
          const systemColorId = Ti.Android.R.color[colorName];

          if (systemColorId) {
            const resourceColor = Ti.UI.Android.getColorResource(systemColorId);

            if (resourceColor) {
              return resourceColor.toHex();
            }
          }
        }

        return color.fallback().toHex();
      }

      const entry = colorset[colorName][UI.semanticColorType];
      const colorObj = color.fromSemanticColorsEntry(entry); // For now, return a string on iOS < 13, Android so we can pass the result directly to the UI property we want to set
      // Otherwise we need to modify the Android APIs to accept fake/real Ti.UI.Color instances and convert it to it's own internal
      // Color representation

      return colorObj.toRGBAString(); // If there's an entry, use the more exact rgba function over 8-char ARGB hex. Hard to convert things like 75% alpha properly.
    } catch (error) {
      console.error(`Failed to lookup color for ${colorName}`);
    }

    return color.fallback().toHex();
  };
}

/**
 * @param {EventEmitter} emitter the EventEmitter instance to use to register for it's events
 * @param {string} eventName the name of the event to register for
 * @param {function} listener the listener callback/function to invoke when the event is emitted
 * @param {boolean} prepend whether to prepend or append the listener
 * @returns {EventEmitter}
 */
function _addListener(emitter, eventName, listener, prepend) {
  if (!emitter._eventsToListeners) {
    // no events/listeners registered
    emitter._eventsToListeners = {}; // initialize it
  } // if there's someone listening to 'newListener' events, emit that **before** we add the listener (to avoid infinite recursion)


  if (emitter._eventsToListeners.newListener) {
    emitter.emit('newListener', eventName, listener);
  }

  const eventListeners = emitter._eventsToListeners[eventName] || [];

  if (prepend) {
    eventListeners.unshift(listener);
  } else {
    eventListeners.push(listener);
  }

  emitter._eventsToListeners[eventName] = eventListeners; // Check max listeners and spit out warning if >

  const max = emitter.getMaxListeners();
  const length = eventListeners.length;

  if (max > 0 && length > max) {
    const w = new Error(`Possible EventEmitter memory leak detected. ${length} ${eventName} listeners added. Use emitter.setMaxListeners() to increase limit`);
    w.name = 'MaxListenersExceededWarning';
    w.emitter = emitter;
    w.type = eventName;
    w.count = length;
    process.emitWarning(w);
  }

  return emitter;
}

function onceWrap(emitter, eventName, listener) {
  function wrapper(...args) {
    this.emitter.removeListener(this.eventName, this.wrappedFunc); // remove ourselves

    this.listener.apply(this.emitter, args); // then forward the event callback
  } // we have to use bind with a custom 'this', because events fire with 'this' pointing at the emitter


  const wrapperThis = {
    emitter,
    eventName,
    listener };

  const bound = wrapper.bind(wrapperThis); // bind to force "this" to refer to our custom object tracking the wrapper/emitter/listener

  bound.listener = listener; // have to add listener property for "unwrapping"

  wrapperThis.wrappedFunc = bound;
  return bound;
} // many consumers make use of this via util.inherits, which does not chain constructor calls!
// so we need to be aware that _eventsToListeners maye be null/undefined on instances, and check in methods before accessing it


class EventEmitter {
  constructor() {
    this._eventsToListeners = {};
    this._maxListeners = undefined;
  }

  addListener(eventName, listener) {
    return _addListener(this, eventName, listener, false);
  }

  on(eventName, listener) {
    return this.addListener(eventName, listener);
  }

  prependListener(eventName, listener) {
    return _addListener(this, eventName, listener, true);
  }

  once(eventName, listener) {
    this.on(eventName, onceWrap(this, eventName, listener));
  }

  prependOnceListener(eventName, listener) {
    this.prependListener(eventName, onceWrap(this, eventName, listener));
  }

  removeListener(eventName, listener) {
    if (!this._eventsToListeners) {
      // no events/listeners registered
      return this;
    }

    const eventListeners = this._eventsToListeners[eventName] || [];
    const length = eventListeners.length;
    let foundIndex = -1;
    let unwrappedListener; // Need to search LIFO, and need to handle wrapped functions (once wrappers)

    for (let i = length - 1; i >= 0; i--) {
      if (eventListeners[i] === listener || eventListeners[i].listener === listener) {
        foundIndex = i;
        unwrappedListener = eventListeners[i].listener;
        break;
      }
    }

    if (foundIndex !== -1) {
      if (length === 1) {
        // length was 1 and we want to remove last entry, so delete the event type from our listener mapping now!
        delete this._eventsToListeners[eventName];
      } else {
        // we had 2+ listeners, so store array without this given listener
        eventListeners.splice(foundIndex, 1); // modifies in place, no need to assign to this.listeners[eventName]
      } // Don't emit if there's no listeners for 'removeListener' type!


      if (this._eventsToListeners.removeListener) {
        this.emit('removeListener', eventName, unwrappedListener || listener);
      }
    }

    return this;
  }

  off(eventName, listener) {
    return this.removeListener(eventName, listener);
  }

  emit(eventName, ...args) {
    if (!this._eventsToListeners) {
      // no events/listeners registered
      return false;
    }

    const eventListeners = this._eventsToListeners[eventName] || [];

    for (const listener of eventListeners.slice()) {
      // must operate on copy because listeners ,ay get remove as side-effect of calling
      listener.call(this, ...args);
    }

    return eventListeners.length !== 0;
  }

  listenerCount(eventName) {
    if (!this._eventsToListeners) {
      // no events/listeners registered
      return 0;
    }

    const eventListeners = this._eventsToListeners[eventName] || [];
    return eventListeners.length;
  }

  eventNames() {
    return Object.getOwnPropertyNames(this._eventsToListeners || {});
  }

  listeners(eventName) {
    if (!this._eventsToListeners) {
      // no events/listeners registered
      return [];
    } // Need to "unwrap" once wrappers!


    const raw = this._eventsToListeners[eventName] || [];
    return raw.map(l => l.listener || l); // here we unwrap the once wrapper if there is one or fall back to listener function
  }

  rawListeners(eventName) {
    if (!this._eventsToListeners) {
      // no events/listeners registered
      return [];
    }

    return (this._eventsToListeners[eventName] || []).slice(0); // return a copy
  }

  getMaxListeners() {
    return this._maxListeners || EventEmitter.defaultMaxListeners;
  }

  setMaxListeners(n) {
    this._maxListeners = n; // TODO: Type check n, make sure >= 0 (o equals no limit)

    return this;
  }

  removeAllListeners(eventName) {
    if (!this._eventsToListeners) {
      // no events/listeners registered
      this._eventsToListeners = {}; // initialize it
    }

    if (!this._eventsToListeners.removeListener) {
      // no need to emit! we can just wipe!
      if (eventName === undefined) {
        // remove every type!
        this._eventsToListeners = {};
      } else {
        // remove specific type
        delete this._eventsToListeners[eventName];
      }

      return this;
    } // yuck, we'll have to emit 'removeListener' events as we go


    if (eventName === undefined) {
      // Remove all types (but do 'removeListener' last!)
      const names = Object.keys(this._eventsToListeners).filter(name => name !== 'removeListener');
      names.forEach(name => this.removeAllListeners(name));
      this.removeAllListeners('removeListener');
      this._eventsToListeners = {};
    } else {
      // remove listeners for one type, back to front (Last-in, first-out, except where prepend f-ed it up)
      const listeners = this._eventsToListeners[eventName] || [];

      for (let i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(eventName, listeners[i]);
      }
    }

    return this;
  }}


EventEmitter.defaultMaxListeners = 10;

EventEmitter.listenerCount = function (emitter, eventName) {
  return emitter.listenerCount(eventName);
};

EventEmitter.EventEmitter = EventEmitter;

/**
 * @param  {*} arg passed in argument value
 * @param  {string} name name of the argument
 * @param  {string} typename i.e. 'string', 'Function' (value is compared to typeof after lowercasing)
 * @return {void}
 * @throws {TypeError}
 */
function assertArgumentType(arg, name, typename) {
  const type = typeof arg;

  if (type !== typename.toLowerCase()) {
    throw new TypeError(`The "${name}" argument must be of type ${typename}. Received type ${type}`);
  }
}

const startTime = Date.now();
/**
 * This function 'standardizes' the reported architectures to the equivalents reported by Node.js
 * node values: 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390', 's390x', 'x32', and 'x64'.
 * iOS values: "arm64", "armv7", "x86_64", "i386", "Unknown"
 * Android values: "armeabi", "armeabi-v7a", "arm64-v8a", "x86", "x86_64", "mips", "mips64", "unknown"
 * Windows values: "x64", "ia64", "ARM", "x86", "unknown"
 * @param {string} original original architecture reported by Ti.Platform
 * @returns {string}
 */

function standardizeArch(original) {
  switch (original) {
    // coerce 'armv7', 'armeabi', 'armeabi-v7a', 'ARM' -> 'arm'
    // 'armeabi' is a dead ABI for Android, removed in NDK r17
    case 'armv7':
    case 'armeabi':
    case 'armeabi-v7a':
    case 'ARM':
      return 'arm';
    // coerce 'arm64-v8a' -> 'arm64'

    case 'arm64-v8a':
      return 'arm64';
    // coerce 'i386', 'x86' -> 'ia32'

    case 'i386':
    case 'x86':
      return 'ia32';
    // coerce 'x86_64', 'ia64', 'x64' -> 'x64'

    case 'x86_64':
    case 'ia64':
      return 'x64';
    // coerce 'mips64' -> 'mips' // 'mips' and 'mips64' are dead ABIs for Android, removed in NDK r17

    case 'mips64':
      return 'mips';
    // coerce 'Unknown' -> 'unknown'

    case 'Unknown':
      return 'unknown';

    default:
      return original;}

}

const process$1 = new EventEmitter();

process$1.abort = () => {}; // TODO: Do we have equivalent of forcibly killing the process? We have restart, but I think we just want a no-op stub here


process$1.arch = standardizeArch(Ti.Platform.architecture);
process$1.argv = []; // TODO: What makes sense here? path to titanium cli for first arg? path to ti.main/app.js for second?

Object.defineProperty(process$1, 'argv0', {
  value: '',
  // TODO: Path to .app on iOS?
  writable: false,
  enumerable: true,
  configurable: false });


process$1.binding = () => {
  throw new Error('process.binding is unsupported and not user-facing API');
};

process$1.channel = undefined;

process$1.chdir = () => {
  throw new Error('process.chdir is unsupported');
};

process$1.config = {};
process$1.connected = false;

process$1.cpuUsage = () => {
  // FIXME: Can we look at OS.cpus to get this data?
  return {
    user: 0,
    system: 0 };

};

process$1.cwd = () => __dirname;

Object.defineProperty(process$1, 'debugPort', {
  get: function () {
    let value = 0; // default to 0

    try {
      if ("android" === 'android') {
        const assets = kroll.binding('assets');
        const json = assets.readAsset('deploy.json');

        if (json) {
          const deployData = JSON.parse(json);

          if (deployData.debuggerPort !== -1) {
            // -1 means not set (not in debug mode)
            value = deployData.debuggerPort;
          }
        }
      }
    } catch (error) {} // ignore
    // overwrite this getter with static value


    Object.defineProperty(this, 'debugPort', {
      value: value,
      writable: true,
      enumerable: true,
      configurable: true });

    return value;
  },
  enumerable: true,
  configurable: true });


process$1.disconnect = () => {}; // no-op


process$1.dlopen = () => {
  throw new Error('process.dlopen is not supported');
};

process$1.emitWarning = function (warning, options, code, ctor) {
  // eslint-disable-line no-unused-vars
  let type;
  let detail;

  if (typeof options === 'string') {
    type = options;
  } else if (typeof options === 'object') {
    type = options.type;
    code = options.code;
    detail = options.detail;
  }

  if (typeof warning === 'string') {
    // TODO: make use of `ctor` arg for limiting stack traces? Can only really be used on V8
    // set stack trace limit to 0, then call Error.captureStackTrace(warning, ctor);
    warning = new Error(warning);
    warning.name = type || 'Warning';

    if (code !== undefined) {
      warning.code = code;
    }

    if (detail !== undefined) {
      warning.detail = detail;
    }
  } // TODO: Throw TypeError if not an instanceof Error at this point!


  const isDeprecation = warning.name === 'DeprecationWarning';

  if (isDeprecation && process$1.noDeprecation) {
    return; // ignore
  }

  if (isDeprecation && process$1.throwDeprecation) {
    throw warning;
  }

  this.emit('warning', warning);
};

function loadEnvJson() {
  try {
    const jsonFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, '_env_.json');

    if (jsonFile.exists()) {
      return JSON.parse(jsonFile.read().text);
    }
  } catch (error) {
    Ti.API.error(`Failed to read "_env_.json". Reason: ${error.message}`);
  }

  return {};
}

Object.defineProperty(process$1, 'env', {
  get: function () {
    delete this.env;
    return this.env = loadEnvJson();
  },
  enumerable: true,
  configurable: true });

process$1.execArgv = [];
process$1.execPath = ''; // FIXME: What makes sense here? Path to titanium CLI here?

process$1.exit = () => {
  throw new Error('process.exit is not supported');
};

process$1.exitCode = undefined;
process$1.noDeprecation = false;
process$1.pid = 0; // FIXME: Should we try and adopt 'ipad'/'iphone' to 'darwin'? or 'ios'?

process$1.platform = "android";
process$1.ppid = 0; // TODO: Add release property (Object)
// TODO: Can we expose stdout/stderr/stdin natively?
// Don't wrap console.log/error because technically global console wraps process.stdout/stderr (or should)

process$1.stderr = {
  isTTY: false,
  writable: true,
  write: (chunk, encoding, callback) => {
    Ti.API.error(chunk);

    if (callback) {
      callback();
    }

    return true;
  } };

process$1.stdout = {
  isTTY: false,
  writable: true,
  write: (chunk, encoding, callback) => {
    Ti.API.info(chunk);

    if (callback) {
      callback();
    }

    return true;
  } };

process$1.title = Ti.App.name;
process$1.throwDeprecation = false;
process$1.traceDeprecation = false;

process$1.umask = () => 0; // just always return 0


process$1.uptime = () => {
  const diffMs = Date.now() - startTime;
  return diffMs / 1000.0; // convert to "seconds" with fractions
};

process$1.version = "9.3.2";
process$1.versions = {
  modules: '',
  // TODO: Report module api version (for current platform!)
  v8: '',
  // TODO: report android's v8 version (if on Android!)
  jsc: '' // TODO: report javascriptcore version for iOS/WIndows?
  // TODO: Report ios/Android/Windows platform versions?
};

process$1[Symbol.toStringTag] = 'process';
global.process = process$1; // handle spitting out warnings

const WARNING_PREFIX = `(titanium:${process$1.pid}) `;
process$1.on('warning', warning => {
  const isDeprecation = warning.name === 'DeprecationWarning'; // if we're not doing deprecations, ignore!

  if (isDeprecation && process$1.noDeprecation) {
    return;
  } // TODO: Check process.traceDeprecation and if set, include stack trace in message!


  let msg = WARNING_PREFIX;

  if (warning.code !== undefined) {
    msg += `[${warning.code}] `;
  }

  if (warning.toString) {
    msg += warning.toString();
  }

  if (warning.detail) {
    msg += `\n${warning.detail}`;
  }

  console.error(msg);
});
let uncaughtExceptionCallback = null;

process$1.hasUncaughtExceptionCaptureCallback = () => uncaughtExceptionCallback !== null;

process$1.setUncaughtExceptionCaptureCallback = fn => {
  if (fn === null) {
    uncaughtExceptionCallback = null;
    return;
  }

  assertArgumentType(fn, 'fn', 'function');

  if (uncaughtExceptionCallback !== null) {
    throw new Error('`process.setUncaughtExceptionCaptureCallback()` was called while a capture callback was already active');
  }

  uncaughtExceptionCallback = fn;
};

Ti.App.addEventListener('uncaughtException', function (event) {
  // Create an Error instance that wraps the data from the event
  // ideally we'd just forward along the original Error!
  const error = new Error(event.message);
  error.stack = event.backtrace;
  error.fileName = event.sourceName;
  error.lineNumber = event.line;
  error.columnNumber = event.lineOffset;

  if (process$1.hasUncaughtExceptionCaptureCallback()) {
    return uncaughtExceptionCallback(error);
  } // otherwise forward the event!


  process$1.emit('uncaughtException', error);
});
// JS engine should be able to optimize easier

class CallbackWithArgs {
  constructor(func, args) {
    this.func = func;
    this.args = args;
  }

  run() {
    if (this.args) {
      this.func.apply(null, this.args);
    } else {
      this.fun();
    }
  }}

// nextTick vs setImmediate should be handled in a semi-smart way
// Basically nextTick needs to drain the full queue (and can cause infinite loops if nextTick callback calls nextTick!)
// Then we should go through the "immediate" queue
// http://plafer.github.io/2015/09/08/nextTick-vs-setImmediate/


const tickQueue = [];
const immediateQueue = [];
let drainingTickQueue = false;
let drainQueuesTimeout = null;
/**
 * Iteratively runs all "ticks" until there are no more.
 * This can cause infinite recursion if a tick schedules another forever.
 */

function drainTickQueue() {
  if (drainingTickQueue) {
    return;
  }

  drainingTickQueue = true;

  while (tickQueue.length) {
    const tick = tickQueue.shift();
    tick.run();
  }

  drainingTickQueue = false;
}

function drainQueues() {
  // drain the full tick queue first...
  drainTickQueue(); // tick queue should be empty!

  const immediatesRemaining = processImmediateQueue();

  if (immediatesRemaining !== 0) {
    // re-schedule draining our queues, as we have at least one more "immediate" to handle
    drainQueuesTimeout = setTimeout(drainQueues, 0);
  } else {
    drainQueuesTimeout = null;
  }
}
/**
 * Attempts to process "immediates" (in a much more leisurely way than ticks)
 * We give a 100ms window to run them in before re-scheduling the timeout to process them again.
 * If any ticks are added during invocation of immediate, we drain the tick queue fully before
 * proceeding to next immediate (if we still have time in our window).
 * @returns {number} number of remaining immediates to be processed
 */


function processImmediateQueue() {
  const immediateDeadline = Date.now() + 100; // give us up to 100ms to process immediates

  while (immediateQueue.length && Date.now() < immediateDeadline) {
    const immediate = immediateQueue.shift();
    immediate.run();

    if (tickQueue.length > 0) {
      // they added a tick! drain the tick queue before we do anything else (this *may* eat up our deadline/window to process any more immediates)
      drainTickQueue();
    }
  }

  return immediateQueue.length;
}

process$1.nextTick = function (callback, ...args) {
  assertArgumentType(callback, 'callback', 'function');
  tickQueue.push(new CallbackWithArgs(callback, args));

  if (!drainQueuesTimeout) {
    drainQueuesTimeout = setTimeout(drainQueues, 0);
  }
};

global.setImmediate = function (callback, ...args) {
  assertArgumentType(callback, 'callback', 'function');
  const immediate = new CallbackWithArgs(callback, args);
  immediateQueue.push(immediate);

  if (!drainQueuesTimeout) {
    drainQueuesTimeout = setTimeout(drainQueues, 0);
  }

  return immediate;
};

global.clearImmediate = function (immediate) {
  const index = immediateQueue.indexOf(immediate);

  if (index !== -1) {
    immediateQueue.splice(index, 1);
  }
};

const FORWARD_SLASH = 47; // '/'

const BACKWARD_SLASH = 92; // '\\'

/**
 * Is this [a-zA-Z]?
 * @param  {number}  charCode value from String.charCodeAt()
 * @return {Boolean}          [description]
 */

function isWindowsDeviceName(charCode) {
  return charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122;
}
/**
 * [isAbsolute description]
 * @param  {boolean} isPosix whether this impl is for POSIX or not
 * @param  {string} filepath   input file path
 * @return {Boolean}          [description]
 */


function isAbsolute(isPosix, filepath) {
  assertArgumentType(filepath, 'path', 'string');
  const length = filepath.length; // empty string special case

  if (length === 0) {
    return false;
  }

  const firstChar = filepath.charCodeAt(0);

  if (firstChar === FORWARD_SLASH) {
    return true;
  } // we already did our checks for posix


  if (isPosix) {
    return false;
  } // win32 from here on out


  if (firstChar === BACKWARD_SLASH) {
    return true;
  }

  if (length > 2 && isWindowsDeviceName(firstChar) && filepath.charAt(1) === ':') {
    const thirdChar = filepath.charAt(2);
    return thirdChar === '/' || thirdChar === '\\';
  }

  return false;
}
/**
 * [dirname description]
 * @param  {string} separator  platform-specific file separator
 * @param  {string} filepath   input file path
 * @return {string}            [description]
 */


function dirname(separator, filepath) {
  assertArgumentType(filepath, 'path', 'string');
  const length = filepath.length;

  if (length === 0) {
    return '.';
  } // ignore trailing separator


  let fromIndex = length - 1;
  const hadTrailing = filepath.endsWith(separator);

  if (hadTrailing) {
    fromIndex--;
  }

  const foundIndex = filepath.lastIndexOf(separator, fromIndex); // no separators

  if (foundIndex === -1) {
    // handle special case of root windows paths
    if (length >= 2 && separator === '\\' && filepath.charAt(1) === ':') {
      const firstChar = filepath.charCodeAt(0);

      if (isWindowsDeviceName(firstChar)) {
        return filepath; // it's a root windows path
      }
    }

    return '.';
  } // only found root separator


  if (foundIndex === 0) {
    return separator; // if it was '/', return that
  } // Handle special case of '//something'


  if (foundIndex === 1 && separator === '/' && filepath.charAt(0) === '/') {
    return '//';
  }

  return filepath.slice(0, foundIndex);
}
/**
 * [extname description]
 * @param  {string} separator  platform-specific file separator
 * @param  {string} filepath   input file path
 * @return {string}            [description]
 */


function extname(separator, filepath) {
  assertArgumentType(filepath, 'path', 'string');
  const index = filepath.lastIndexOf('.');

  if (index === -1 || index === 0) {
    return '';
  } // ignore trailing separator


  let endIndex = filepath.length;

  if (filepath.endsWith(separator)) {
    endIndex--;
  }

  return filepath.slice(index, endIndex);
}

function lastIndexWin32Separator(filepath, index) {
  for (let i = index; i >= 0; i--) {
    const char = filepath.charCodeAt(i);

    if (char === BACKWARD_SLASH || char === FORWARD_SLASH) {
      return i;
    }
  }

  return -1;
}
/**
 * [basename description]
 * @param  {string} separator  platform-specific file separator
 * @param  {string} filepath   input file path
 * @param  {string} [ext]      file extension to drop if it exists
 * @return {string}            [description]
 */


function basename(separator, filepath, ext) {
  assertArgumentType(filepath, 'path', 'string');

  if (ext !== undefined) {
    assertArgumentType(ext, 'ext', 'string');
  }

  const length = filepath.length;

  if (length === 0) {
    return '';
  }

  const isPosix = separator === '/';
  let endIndex = length; // drop trailing separator (if there is one)

  const lastCharCode = filepath.charCodeAt(length - 1);

  if (lastCharCode === FORWARD_SLASH || !isPosix && lastCharCode === BACKWARD_SLASH) {
    endIndex--;
  } // Find last occurence of separator


  let lastIndex = -1;

  if (isPosix) {
    lastIndex = filepath.lastIndexOf(separator, endIndex - 1);
  } else {
    // On win32, handle *either* separator!
    lastIndex = lastIndexWin32Separator(filepath, endIndex - 1); // handle special case of root path like 'C:' or 'C:\\'

    if ((lastIndex === 2 || lastIndex === -1) && filepath.charAt(1) === ':' && isWindowsDeviceName(filepath.charCodeAt(0))) {
      return '';
    }
  } // Take from last occurrence of separator to end of string (or beginning to end if not found)


  const base = filepath.slice(lastIndex + 1, endIndex); // drop trailing extension (if specified)

  if (ext === undefined) {
    return base;
  }

  return base.endsWith(ext) ? base.slice(0, base.length - ext.length) : base;
}
/**
 * The `path.normalize()` method normalizes the given path, resolving '..' and '.' segments.
 *
 * When multiple, sequential path segment separation characters are found (e.g.
 * / on POSIX and either \ or / on Windows), they are replaced by a single
 * instance of the platform-specific path segment separator (/ on POSIX and \
 * on Windows). Trailing separators are preserved.
 *
 * If the path is a zero-length string, '.' is returned, representing the
 * current working directory.
 *
 * @param  {string} separator  platform-specific file separator
 * @param  {string} filepath  input file path
 * @return {string} [description]
 */


function normalize(separator, filepath) {
  assertArgumentType(filepath, 'path', 'string');

  if (filepath.length === 0) {
    return '.';
  } // Windows can handle '/' or '\\' and both should be turned into separator


  const isWindows = separator === '\\';

  if (isWindows) {
    filepath = filepath.replace(/\//g, separator);
  }

  const hadLeading = filepath.startsWith(separator); // On Windows, need to handle UNC paths (\\host-name\\resource\\dir) special to retain leading double backslash

  const isUNC = hadLeading && isWindows && filepath.length > 2 && filepath.charAt(1) === '\\';
  const hadTrailing = filepath.endsWith(separator);
  const parts = filepath.split(separator);
  const result = [];

  for (const segment of parts) {
    if (segment.length !== 0 && segment !== '.') {
      if (segment === '..') {
        result.pop(); // FIXME: What if this goes above root? Should we throw an error?
      } else {
        result.push(segment);
      }
    }
  }

  let normalized = hadLeading ? separator : '';
  normalized += result.join(separator);

  if (hadTrailing) {
    normalized += separator;
  }

  if (isUNC) {
    normalized = '\\' + normalized;
  }

  return normalized;
}
/**
 * [assertSegment description]
 * @param  {*} segment [description]
 * @return {void}         [description]
 */


function assertSegment(segment) {
  if (typeof segment !== 'string') {
    throw new TypeError(`Path must be a string. Received ${segment}`);
  }
}
/**
 * The `path.join()` method joins all given path segments together using the
 * platform-specific separator as a delimiter, then normalizes the resulting path.
 * Zero-length path segments are ignored. If the joined path string is a zero-
 * length string then '.' will be returned, representing the current working directory.
 * @param  {string} separator platform-specific file separator
 * @param  {string[]} paths [description]
 * @return {string}       The joined filepath
 */


function join$1(separator, paths) {
  const result = []; // naive impl: just join all the paths with separator

  for (const segment of paths) {
    assertSegment(segment);

    if (segment.length !== 0) {
      result.push(segment);
    }
  }

  return normalize(separator, result.join(separator));
}
/**
 * The `path.resolve()` method resolves a sequence of paths or path segments into an absolute path.
 *
 * @param  {string} separator platform-specific file separator
 * @param  {string[]} paths [description]
 * @return {string}       [description]
 */


function resolve(separator, paths) {
  let resolved = '';
  let hitRoot = false;
  const isPosix = separator === '/'; // go from right to left until we hit absolute path/root

  for (let i = paths.length - 1; i >= 0; i--) {
    const segment = paths[i];
    assertSegment(segment);

    if (segment.length === 0) {
      continue; // skip empty
    }

    resolved = segment + separator + resolved; // prepend new segment

    if (isAbsolute(isPosix, segment)) {
      // have we backed into an absolute path?
      hitRoot = true;
      break;
    }
  } // if we didn't hit root, prepend cwd


  if (!hitRoot) {
    resolved = process.cwd() + separator + resolved;
  }

  const normalized = normalize(separator, resolved);

  if (normalized.charAt(normalized.length - 1) === separator) {
    // FIXME: Handle UNC paths on Windows as well, so we don't trim trailing separator on something like '\\\\host-name\\resource\\'
    // Don't remove trailing separator if this is root path on windows!
    if (!isPosix && normalized.length === 3 && normalized.charAt(1) === ':' && isWindowsDeviceName(normalized.charCodeAt(0))) {
      return normalized;
    } // otherwise trim trailing separator


    return normalized.slice(0, normalized.length - 1);
  }

  return normalized;
}
/**
 * The `path.relative()` method returns the relative path `from` from to `to` based
 * on the current working directory. If from and to each resolve to the same
 * path (after calling `path.resolve()` on each), a zero-length string is returned.
 *
 * If a zero-length string is passed as `from` or `to`, the current working directory
 * will be used instead of the zero-length strings.
 *
 * @param  {string} separator platform-specific file separator
 * @param  {string} from [description]
 * @param  {string} to   [description]
 * @return {string}      [description]
 */


function relative(separator, from, to) {
  assertArgumentType(from, 'from', 'string');
  assertArgumentType(to, 'to', 'string');

  if (from === to) {
    return '';
  }

  from = resolve(separator, [from]);
  to = resolve(separator, [to]);

  if (from === to) {
    return '';
  } // we now have two absolute paths,
  // lets "go up" from `from` until we reach common base dir of `to`
  // const originalFrom = from;


  let upCount = 0;
  let remainingPath = '';

  while (true) {
    if (to.startsWith(from)) {
      // match! record rest...?
      remainingPath = to.slice(from.length);
      break;
    } // FIXME: Break/throw if we hit bad edge case of no common root!


    from = dirname(separator, from);
    upCount++;
  } // remove leading separator from remainingPath if there is any


  if (remainingPath.length > 0) {
    remainingPath = remainingPath.slice(1);
  }

  return ('..' + separator).repeat(upCount) + remainingPath;
}
/**
 * The `path.parse()` method returns an object whose properties represent
 * significant elements of the path. Trailing directory separators are ignored,
 * see `path.sep`.
 *
 * The returned object will have the following properties:
 *
 * - dir <string>
 * - root <string>
 * - base <string>
 * - name <string>
 * - ext <string>
 * @param  {string} separator platform-specific file separator
 * @param  {string} filepath [description]
 * @return {object}
 */


function parse(separator, filepath) {
  assertArgumentType(filepath, 'path', 'string');
  const result = {
    root: '',
    dir: '',
    base: '',
    ext: '',
    name: '' };

  const length = filepath.length;

  if (length === 0) {
    return result;
  } // Cheat and just call our other methods for dirname/basename/extname?


  result.base = basename(separator, filepath);
  result.ext = extname(separator, result.base);
  const baseLength = result.base.length;
  result.name = result.base.slice(0, baseLength - result.ext.length);
  const toSubtract = baseLength === 0 ? 0 : baseLength + 1;
  result.dir = filepath.slice(0, filepath.length - toSubtract); // drop trailing separator!

  const firstCharCode = filepath.charCodeAt(0); // both win32 and POSIX return '/' root

  if (firstCharCode === FORWARD_SLASH) {
    result.root = '/';
    return result;
  } // we're done with POSIX...


  if (separator === '/') {
    return result;
  } // for win32...


  if (firstCharCode === BACKWARD_SLASH) {
    // FIXME: Handle UNC paths like '\\\\host-name\\resource\\file_path'
    // need to retain '\\\\host-name\\resource\\' as root in that case!
    result.root = '\\';
    return result;
  } // check for C: style root


  if (length > 1 && isWindowsDeviceName(firstCharCode) && filepath.charAt(1) === ':') {
    if (length > 2) {
      // is it like C:\\?
      const thirdCharCode = filepath.charCodeAt(2);

      if (thirdCharCode === FORWARD_SLASH || thirdCharCode === BACKWARD_SLASH) {
        result.root = filepath.slice(0, 3);
        return result;
      }
    } // nope, just C:, no trailing separator


    result.root = filepath.slice(0, 2);
  }

  return result;
}
/**
 * The `path.format()` method returns a path string from an object. This is the
 * opposite of `path.parse()`.
 *
 * @param  {string} separator platform-specific file separator
 * @param  {object} pathObject object of format returned by `path.parse()`
 * @param  {string} pathObject.dir directory name
 * @param  {string} pathObject.root file root dir, ignored if `pathObject.dir` is provided
 * @param  {string} pathObject.base file basename
 * @param  {string} pathObject.name basename minus extension, ignored if `pathObject.base` exists
 * @param  {string} pathObject.ext file extension, ignored if `pathObject.base` exists
 * @return {string}
 */


function format$1(separator, pathObject) {
  assertArgumentType(pathObject, 'pathObject', 'object');
  const base = pathObject.base || `${pathObject.name || ''}${pathObject.ext || ''}`; // append base to root if `dir` wasn't specified, or if
  // dir is the root

  if (!pathObject.dir || pathObject.dir === pathObject.root) {
    return `${pathObject.root || ''}${base}`;
  } // combine dir + / + base


  return `${pathObject.dir}${separator}${base}`;
}
/**
 * On Windows systems only, returns an equivalent namespace-prefixed path for
 * the given path. If path is not a string, path will be returned without modifications.
 * See https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#namespaces
 * @param  {string} filepath [description]
 * @return {string}          [description]
 */


function toNamespacedPath(filepath) {
  if (typeof filepath !== 'string') {
    return filepath;
  }

  if (filepath.length === 0) {
    return '';
  }

  const resolvedPath = resolve('\\', [filepath]);
  const length = resolvedPath.length;

  if (length < 2) {
    // need '\\\\' or 'C:' minimum
    return filepath;
  }

  const firstCharCode = resolvedPath.charCodeAt(0); // if start with '\\\\', prefix with UNC root, drop the slashes

  if (firstCharCode === BACKWARD_SLASH && resolvedPath.charAt(1) === '\\') {
    // return as-is if it's an aready long path ('\\\\?\\' or '\\\\.\\' prefix)
    if (length >= 3) {
      const thirdChar = resolvedPath.charAt(2);

      if (thirdChar === '?' || thirdChar === '.') {
        return filepath;
      }
    }

    return '\\\\?\\UNC\\' + resolvedPath.slice(2);
  } else if (isWindowsDeviceName(firstCharCode) && resolvedPath.charAt(1) === ':') {
    return '\\\\?\\' + resolvedPath;
  }

  return filepath;
}

const Win32Path = {
  sep: '\\',
  delimiter: ';',
  basename: function (filepath, ext) {
    return basename(this.sep, filepath, ext);
  },
  normalize: function (filepath) {
    return normalize(this.sep, filepath);
  },
  join: function (...paths) {
    return join$1(this.sep, paths);
  },
  extname: function (filepath) {
    return extname(this.sep, filepath);
  },
  dirname: function (filepath) {
    return dirname(this.sep, filepath);
  },
  isAbsolute: function (filepath) {
    return isAbsolute(false, filepath);
  },
  relative: function (from, to) {
    return relative(this.sep, from, to);
  },
  resolve: function (...paths) {
    return resolve(this.sep, paths);
  },
  parse: function (filepath) {
    return parse(this.sep, filepath);
  },
  format: function (pathObject) {
    return format$1(this.sep, pathObject);
  },
  toNamespacedPath: toNamespacedPath };

const PosixPath = {
  sep: '/',
  delimiter: ':',
  basename: function (filepath, ext) {
    return basename(this.sep, filepath, ext);
  },
  normalize: function (filepath) {
    return normalize(this.sep, filepath);
  },
  join: function (...paths) {
    return join$1(this.sep, paths);
  },
  extname: function (filepath) {
    return extname(this.sep, filepath);
  },
  dirname: function (filepath) {
    return dirname(this.sep, filepath);
  },
  isAbsolute: function (filepath) {
    return isAbsolute(true, filepath);
  },
  relative: function (from, to) {
    return relative(this.sep, from, to);
  },
  resolve: function (...paths) {
    return resolve(this.sep, paths);
  },
  parse: function (filepath) {
    return parse(this.sep, filepath);
  },
  format: function (pathObject) {
    return format$1(this.sep, pathObject);
  },
  toNamespacedPath: function (filepath) {
    return filepath; // no-op
  } };

const path = PosixPath;
path.win32 = Win32Path;
path.posix = PosixPath;

const PosixConstants = {
  UV_UDP_REUSEADDR: 4,
  dlopen: {},
  errno: {
    E2BIG: 7,
    EACCES: 13,
    EADDRINUSE: 48,
    EADDRNOTAVAIL: 49,
    EAFNOSUPPORT: 47,
    EAGAIN: 35,
    EALREADY: 37,
    EBADF: 9,
    EBADMSG: 94,
    EBUSY: 16,
    ECANCELED: 89,
    ECHILD: 10,
    ECONNABORTED: 53,
    ECONNREFUSED: 61,
    ECONNRESET: 54,
    EDEADLK: 11,
    EDESTADDRREQ: 39,
    EDOM: 33,
    EDQUOT: 69,
    EEXIST: 17,
    EFAULT: 14,
    EFBIG: 27,
    EHOSTUNREACH: 65,
    EIDRM: 90,
    EILSEQ: 92,
    EINPROGRESS: 36,
    EINTR: 4,
    EINVAL: 22,
    EIO: 5,
    EISCONN: 56,
    EISDIR: 21,
    ELOOP: 62,
    EMFILE: 24,
    EMLINK: 31,
    EMSGSIZE: 40,
    EMULTIHOP: 95,
    ENAMETOOLONG: 63,
    ENETDOWN: 50,
    ENETRESET: 52,
    ENETUNREACH: 51,
    ENFILE: 23,
    ENOBUFS: 55,
    ENODATA: 96,
    ENODEV: 19,
    ENOENT: 2,
    ENOEXEC: 8,
    ENOLCK: 77,
    ENOLINK: 97,
    ENOMEM: 12,
    ENOMSG: 91,
    ENOPROTOOPT: 42,
    ENOSPC: 28,
    ENOSR: 98,
    ENOSTR: 99,
    ENOSYS: 78,
    ENOTCONN: 57,
    ENOTDIR: 20,
    ENOTEMPTY: 66,
    ENOTSOCK: 38,
    ENOTSUP: 45,
    ENOTTY: 25,
    ENXIO: 6,
    EOPNOTSUPP: 102,
    EOVERFLOW: 84,
    EPERM: 1,
    EPIPE: 32,
    EPROTO: 100,
    EPROTONOSUPPORT: 43,
    EPROTOTYPE: 41,
    ERANGE: 34,
    EROFS: 30,
    ESPIPE: 29,
    ESRCH: 3,
    ESTALE: 70,
    ETIME: 101,
    ETIMEDOUT: 60,
    ETXTBSY: 26,
    EWOULDBLOCK: 35,
    EXDEV: 18 },

  signals: {
    SIGHUP: 1,
    SIGINT: 2,
    SIGQUIT: 3,
    SIGILL: 4,
    SIGTRAP: 5,
    SIGABRT: 6,
    SIGIOT: 6,
    SIGBUS: 10,
    SIGFPE: 8,
    SIGKILL: 9,
    SIGUSR1: 30,
    SIGSEGV: 11,
    SIGUSR2: 31,
    SIGPIPE: 13,
    SIGALRM: 14,
    SIGTERM: 15,
    SIGCHLD: 20,
    SIGCONT: 19,
    SIGSTOP: 17,
    SIGTSTP: 18,
    SIGTTIN: 21,
    SIGTTOU: 22,
    SIGURG: 16,
    SIGXCPU: 24,
    SIGXFSZ: 25,
    SIGVTALRM: 26,
    SIGPROF: 27,
    SIGWINCH: 28,
    SIGIO: 23,
    SIGINFO: 29,
    SIGSYS: 12 },

  priority: {
    PRIORITY_LOW: 19,
    PRIORITY_BELOW_NORMAL: 10,
    PRIORITY_NORMAL: 0,
    PRIORITY_ABOVE_NORMAL: -7,
    PRIORITY_HIGH: -14,
    PRIORITY_HIGHEST: -20 } };

// default implementations

const OS = {
  EOL: '\n',
  arch: () => process.arch,
  constants: PosixConstants,
  cpus: () => {
    const count = Ti.Platform.processorCount;
    const array = [];

    for (let i = 0; i < count; i++) {
      array.push({
        model: 'unknown',
        speed: 0,
        times: {
          user: 0,
          nice: 0,
          sys: 0,
          idle: 0,
          irq: 0 } });


    }

    return array;
  },
  endianness: () => {
    // TODO: Cache the value!
    const result = Ti.Codec.getNativeByteOrder();

    if (result === Ti.Codec.LITTLE_ENDIAN) {
      return 'LE';
    }

    return 'BE';
  },
  freemem: () => Ti.Platform.availableMemory,
  getPriority: () => 0,
  // fake it
  homedir: () => Ti.Filesystem.applicationDataDirectory,
  // fake it
  hostname: () => Ti.Platform.address,
  // fake it
  loadavg: () => [0, 0, 0],
  // fake it
  networkInterfaces: () => {},
  // FIXME: What do we do here? We might be able to piece some of this together using Ti.Platform.netmask, Ti.Platform.address
  platform: () => process.platform,
  release: () => Ti.Platform.version,
  setPriority: () => {},
  // no-op, fake it

  /**
   * The `os.tmpdir()` method returns a string specifying the operating system's default directory for temporary files.
   * @return {string} [description]
   */
  tmpdir: () => Ti.Filesystem.tempDirectory,

  /**
   * The `os.totalmem()` method returns the total amount of system memory in bytes as an integer.
   * @return {integer} [description]
   */
  totalmem: () => Ti.Platform.totalMemory,
  type: () => 'Unknown',
  // overridden per-platform at bottom

  /**
   * The `os.uptime()` method returns the system uptime in number of seconds.
   * @return {integer} [description]
   */
  uptime: () => Ti.Platform.uptime,
  userInfo: () => {
    // fake it!
    return {
      uid: -1,
      gid: -1,
      username: Ti.Platform.username,
      homedir: Ti.Filesystem.applicationDataDirectory,
      shell: null };

  } };
// On specific platforms, override implementations because we don't have them
// yet and need to fake it, or to hack them
// I'm also doing this in blocks to assign implementations that don't need to consult platform
// type at runtime (hopefully speeding up execution at runtime)

{
  OS.cpus = () => Ti.Platform.cpus();

  OS.type = () => 'Linux';
}

const tty = {
  isatty: () => false,
  ReadStream: () => {
    throw new Error('tty.ReadStream is not implemented');
  },
  WriteStream: () => {
    throw new Error('tty.WriteStream is not implemented');
  } };


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const util = {
  format,
  formatWithOptions,
  inspect,
  isArray: Array.isArray,
  isBoolean: value => typeof value === 'boolean',
  isBuffer: BufferModule.Buffer.isBuffer,
  isFunction: value => typeof value === 'function',
  isNull: value => value === null,
  isNullOrUndefined: value => value === undefined || value === null,
  isNumber: value => typeof value === 'number',
  isObject: value => value !== null && typeof value === 'object',
  isPrimitive: value => typeof value !== 'object' && typeof value !== 'function' || value === null,
  isString: value => typeof value === 'string',
  isSymbol: value => typeof value === 'symbol',
  isUndefined: value => value === undefined,
  isRegExp: isRegExp,
  isDate: isDate,
  isError: e => Object.prototype.toString.call(e) === '[object Error]' || e instanceof Error,
  log: string => {
    const date = new Date();
    const time = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`; // Produces output like: "21 Feb 10:04:23 - message"

    console.log(`${date.getDate()} ${MONTHS[date.getMonth()]} ${time} - ${string}`);
  },
  print: (...args) => console.log(args.join('')),
  // FIXME: Shouldn't add trailing newline like console.log does!
  puts: (...args) => console.log(args.join('\n')),
  error: (...args) => console.error(args.join('\n')),
  debug: string => console.error(`DEBUG: ${string}`),
  types };

/**
 * @param {Function} constructor subclass
 * @param {Function} superConstructor base class
 * @returns {void}
 */

util.inherits = function (constructor, superConstructor) {
  assertArgumentType(constructor, 'constructor', 'Function');
  assertArgumentType(superConstructor, 'superConstructor', 'Function');
  assertArgumentType(superConstructor.prototype, 'superConstructor.prototype', 'Object');
  Object.defineProperty(constructor, 'super_', {
    value: superConstructor });

  Object.setPrototypeOf(constructor.prototype, superConstructor.prototype);
};
/**
 * @param {Function} original original function to wrap which is expected to have a final callback argument
 * @returns {Function} function that returns a Promise
 */


util.promisify = function (original) {
  assertArgumentType(original, 'original', 'Function');

  function wrapped(...args) {
    return new Promise((resolve, reject) => {
      original.call(this, ...args, (err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  } // TODO: Copy properties from original to wrapped
  // TODO: hook prototype chain up from wrapped to original
  // TODO: Support custom promisify hooks


  return wrapped;
};
/**
 * @param {Function} original original function to convert from async/Promise return value to a callback style
 * @returns {Function} wrapped function
 */


util.callbackify = function (original) {
  assertArgumentType(original, 'original', 'Function');

  function wrapped(...args) {
    const callback = args.pop();
    const promise = original.apply(this, args);
    promise.then(result => {
      // eslint-disable-line promise/always-return
      callback(null, result); // eslint-disable-line promise/no-callback-in-promise
    }).catch(err => {
      if (!err) {
        const wrappedError = new Error('Promise was rejected with falsy value');
        wrappedError.reason = err;
        err = wrappedError;
      }

      callback(err); // eslint-disable-line promise/no-callback-in-promise
    });
  }

  return wrapped;
};
/**
 * @param {Function} func function to deprecate/wrap
 * @param {string} string message to give when deprecation warning is emitted
 * @param {string} code deprecation code to use to group warnings
 * @returns {Function} wrapped function
 */


util.deprecate = function (func, string, code) {
  // eslint-disable-line no-unused-vars
  if (process.noDeprecation) {
    return func; // skip the wrapping!
  } // TODO: Support `code` argument by tracking a map of codes we've warned about


  function wrapped(...args) {
    let warned = false;

    if (!warned) {
      process.emitWarning(string, 'DeprecationWarning');
      warned = true;
    }

    return func.apply(this, args);
  }

  return wrapped;
}; // TODO: Support debuglog? What is our equivalent of process.env('NODE_DEBUG')?


const noop$1 = () => {};

util.debuglog = () => {
  return noop$1;
};

const DEFAULT_MESSAGES = {
  deepStrictEqual: 'Expected values to be strictly deep-equal:',
  strictEqual: 'Expected values to be strictly equal:',
  deepEqual: 'Expected values to be loosely deep-equal:',
  equal: 'Expected values to be loosely equal:',
  notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
  notStrictEqual: 'Expected "actual" to be strictly unequal to:',
  notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
  notEqual: 'Expected "actual" to be loosely unequal to:' };
// Fake enums to use internally

const COMPARE_TYPE = {
  Object: 0,
  Map: 1,
  Set: 2 };

const STRICTNESS = {
  Strict: 0,
  Loose: 1 };


class AssertionError extends Error {
  constructor(options) {
    let {
      actual,
      expected,
      message,
      operator } =
    options;

    if (!message) {
      // FIXME: Generate the rest of the message with diff of actual/expected!
      message = `${DEFAULT_MESSAGES[operator]}\n\n`;
    }

    super(message);
    this.actual = actual;
    this.expected = expected;
    this.operator = operator;
    this.generatedMessage = !message;
    this.name = 'AssertionError [ERR_ASSERTION]';
    this.code = 'ERR_ASSERTION';
  }}

// TODO: Can we define AssertStrict and AssertLoose as subclasses of a base Assert class
// that class holds impls for shared methods, subclasses override specific
// comparisons used (Object.is vs ===)?


const assert$1 = (value, message) => assert$1.ok(value, message);

assert$1.AssertionError = AssertionError;

assert$1.ok = (...args) => {
  const value = args[0];

  if (value) {
    return;
  }

  let message = args[1];
  let generatedMessage = false; // Check if value (1st arg) was not supplied!
  // Have to use ugly hack on args definition to do so

  if (args.length === 0) {
    message = 'No value argument passed to `assert.ok()`';
    generatedMessage = true;
  } else if (message == null) {
    // eslint-disable-line no-eq-null,eqeqeq
    // TODO: generate rest of the message. Node actually reads the input file! The hacked browserify does not do this
    // It treates ok failing like `value == true` failing
    message = 'The expression evaluated to a falsy value:\n\n';
    generatedMessage = true;
  } else if (message instanceof Error) {
    throw message;
  }

  const err = new AssertionError({
    actual: value,
    expected: true,
    message,
    operator: '==' });

  err.generatedMessage = generatedMessage;
  throw err;
};

function throwError(obj) {
  // If message is an Error object, throw that instead!
  if (obj.message instanceof Error) {
    throw obj.message;
  }

  throw new AssertionError(obj);
}

assert$1.equal = (actual, expected, message) => {
  if (actual == expected) {
    // eslint-disable-line eqeqeq
    return;
  }

  throwError({
    actual,
    expected,
    message,
    operator: 'equal' });

};

assert$1.strictEqual = (actual, expected, message) => {
  if (Object.is(actual, expected)) {
    // provides SameValue comparison for us
    return;
  }

  throwError({
    actual,
    expected,
    message,
    operator: 'strictEqual' });

};

assert$1.notEqual = (actual, expected, message) => {
  if (actual != expected) {
    // eslint-disable-line eqeqeq
    return;
  }

  throwError({
    actual,
    expected,
    message,
    operator: 'notEqual' });

};

assert$1.notStrictEqual = (actual, expected, message) => {
  if (!Object.is(actual, expected)) {
    // provides SameValue comparison for us
    return;
  }

  throwError({
    actual,
    expected,
    message,
    operator: 'notStrictEqual' });

};

const isPrimitive = value => {
  return typeof value !== 'object' && typeof value !== 'function' || value === null;
};
/**
 * @param {Map} actual map we are comparing
 * @param {Map} expected map we're comparing against
 * @param {STRICTNESS.Loose|strictness.Strict} strictness how to compare
 * @param {object} references memoized references to objects in the deepEqual hierarchy
 * @returns {boolean}
 */


function compareMaps(actual, expected, strictness, references) {
  const looseChecks = new Set(); // keep track of objects we need to test more extensively than using #get()/#has()

  for (const [key, value] of actual) {
    if (typeof key === 'object' && key !== null) {
      // non-null object. We need to do our own checking, not use get()/has()
      looseChecks.add(key);
    } else {
      // handle "primitives"
      if (expected.has(key) && deepEqual(value, expected.get(key), strictness, references)) {
        // yay! a nice easy match - both key and value matched exactly - move on
        continue;
      }

      if (strictness === STRICTNESS.Strict) {
        // if we didn't match key/value perfectly in strict mode, fail right away
        return false;
      } // ok, so it didn't match key/value perfectly - but we're in loose mode, so fall back to try again


      looseChecks.add(key);
    }
  }

  if (looseChecks.size === 0) {
    // no loose ends to tie up, everything matched
    return true;
  } // only go through the second Map once!


  for (const [expectedKey, expectedValue] of expected) {
    // if it's not a non-null object in strict mode, fail!
    // (i.e. if it's a primitive that failed a match, don't fall back to more loosely match it)
    // Note that this shouldn't ever happen since we should be returning false immediately above
    if (strictness === STRICTNESS.Strict && !(typeof expectedKey === 'object' && expectedKey !== null)) {
      return false;
    } // otherwise, test it // TODO: Wish we could use #find() like on an Array, but Set doesn't have it!


    let found = false;

    for (const key of looseChecks) {
      // if both key and value matches
      if (deepEqual(key, expectedKey, strictness, references) && deepEqual(actual.get(key), expectedValue, strictness, references)) {
        found = true;
        looseChecks.delete(key); // remove from our looseChecks Set since we already matched it

        break;
      }
    } // if not found, we failed to match


    if (!found) {
      return false;
    }
  } // did we leave un-matched keys? if so, fail


  return looseChecks.size === 0;
}
/**
 * @param {Set} actual map we are comparing
 * @param {Set} expected map we're comparing against
 * @param {strictness.Loose|strictness.Strict} strictness how to compare
 * @param {object} references memoized references to objects in the deepEqual hierarchy
 * @returns {boolean}
 */


function compareSets(actual, expected, strictness, references) {
  const looseChecks = new Set(); // keep track of values we need to test more extensively than using #has()

  for (const value of actual) {
    if (typeof value === 'object' && value !== null) {
      // non-null object. We need to do our own checking, not use has()
      looseChecks.add(value);
    } else if (!expected.has(value)) {
      // FIXME: has does "same-value-zero" check, which is like Object.is except for -0/+0 being considered equal
      // so may need to special case that here, that'd have to be in an else below (since has will return true here)
      if (strictness === STRICTNESS.Strict) {
        // failed "same-value" match for primitive in strict mode, so fail right away
        return false;
      } // When doing loose check, we need to fall back to looser check than #has(), so we can't just return false immediately here
      // add to set of values to check more thoroughly


      looseChecks.add(value);
    }
  }

  if (looseChecks.size === 0) {
    // no loose ends to tie up, everything matched
    return true;
  } // Try to whittle down the loose checks set to be empty...
  // only go through the second Set once!


  for (const expectedValue of expected) {
    // if it's not a non-null object in strict mode, fail!
    // (i.e. if it's a primitive that failed a match, don't fall back to more loosely match it)
    // Note that this shouldn't ever happen since we should be returning false immediately above
    if (strictness === STRICTNESS.Strict && !(typeof expectedValue === 'object' && expectedValue !== null)) {
      return false;
    }

    let found = false;

    for (const object of looseChecks) {
      if (deepEqual(object, expectedValue, strictness, references)) {
        found = true; // found a match!

        looseChecks.delete(object); // remove from our looseChecks Set since we matched it

        break;
      }
    } // if not found, we failed to match


    if (!found) {
      return false;
    }
  } // did we leave un-matched values? if so, fail


  return looseChecks.size === 0;
}
/**
 * @param {*} actual value we are comparing
 * @param {*} expected values we're comparing against
 * @param {STRICTNESS.Strict|STRICTNESS.Loose} strictness how strict a comparison to do
 * @param {object} [references] optional object to keep track of circular references in the hierarchy
 * @param {Map<object,number>} [references.actual] mapping from objects visited (on `actual`) to their depth
 * @param {Map<object,number>} [references.expected] mapping from objects visited (on `expected`) to their depth
 * @param {number} [references.depth] The current depth of the hierarchy
 * @returns {boolean}
 */


function deepEqual(actual, expected, strictness, references) {
  // if primitives, compare using Object.is
  // This handles: null, undefined, number, string, boolean
  if (isPrimitive(actual) && isPrimitive(expected)) {
    if (strictness === STRICTNESS.Strict) {
      return Object.is(actual, expected);
    } else {
      return actual == expected; // eslint-disable-line eqeqeq
    }
  } // Now we have various objects/functions:
  // Date, Error, RegExp, Array, Map, Set, Object, Function, Arrow functions, WeakMap, DataView, ArrayBuffer, WeakSet, typed arrays
  // notably, this includes "boxed" primitives created by new Boolean(false), new String('value'), Symbol('whatever'), etc
  // Type tags of objects should be the same


  const actualTag = Object.prototype.toString.call(actual);
  const expectedTag = Object.prototype.toString.call(expected);

  if (actualTag !== expectedTag) {
    return false;
  } // [[Prototype]] of objects are compared using the Strict Equality Comparison.


  if (strictness === STRICTNESS.Strict) {
    // don't check prototype when doing "loose"
    const actualPrototype = Object.getPrototypeOf(actual);
    const expectedPrototype = Object.getPrototypeOf(expected);

    if (actualPrototype !== expectedPrototype) {
      return false;
    }
  }

  let comparison = COMPARE_TYPE.Object;

  if (util.types.isRegExp(actual)) {
    // RegExp source and flags should match
    if (!util.types.isRegExp(expected) || actual.flags !== expected.flags || actual.source !== expected.source) {
      return false;
    } // continue on to check properties...

  } else if (util.types.isDate(actual)) {
    // Date's underlying time should match
    if (!util.types.isDate(expected) || actual.getTime() !== expected.getTime()) {
      return false;
    } // continue on to check properties...

  } else if (actual instanceof Error) {
    // Error's name and message must match
    if (!(expected instanceof Error) || actual.name !== expected.name || actual.message !== expected.message) {
      return false;
    } // continue on to check properties...

  } else if (Array.isArray(actual)) {
    // if array lengths differ, quick fail
    if (!Array.isArray(expected) || actual.length !== expected.length) {
      return false;
    } // continue on to check properties...

  } else if (util.types.isBoxedPrimitive(actual)) {
    if (!util.types.isBoxedPrimitive(expected)) {
      return false;
    } // check that they're the same type of wrapped primitive and then call the relevant valueOf() for that type to compare them!


    if (util.types.isNumberObject(actual) && (!util.types.isNumberObject(expected) || !Object.is(Number.prototype.valueOf.call(actual), Number.prototype.valueOf.call(expected)))) {
      return false;
    } else if (util.types.isStringObject(actual) && (!util.types.isStringObject(expected) || String.prototype.valueOf.call(actual) !== String.prototype.valueOf.call(expected))) {
      return false;
    } else if (util.types.isBooleanObject(actual) && (!util.types.isBooleanObject(expected) || Boolean.prototype.valueOf.call(actual) !== Boolean.prototype.valueOf.call(expected))) {
      return false; // FIXME: Uncomment when we support BigInt cross-platform!
      // } else if (util.types.isBigIntObject(actual)
      // 	&& (!util.types.isBigIntObject(expected)
      // 		|| BigInt.prototype.valueOf.call(actual) !== BigInt.prototype.valueOf.call(expected))) {
      // 	return false;
    } else if (util.types.isSymbolObject(actual) && (!util.types.isSymbolObject(expected) || Symbol.prototype.valueOf.call(actual) !== Symbol.prototype.valueOf.call(expected))) {
      return false;
    } // continue on to check properties...

  } else if (util.types.isSet(actual)) {
    if (!util.types.isSet(expected) || actual.size !== expected.size) {
      return false;
    }

    comparison = COMPARE_TYPE.Set; // continue on to check properties...
  } else if (util.types.isMap(actual)) {
    if (!util.types.isMap(expected) || actual.size !== expected.size) {
      return false;
    }

    comparison = COMPARE_TYPE.Map; // continue on to check properties...
  } // Now iterate over properties and compare them!


  const actualKeys = Object.keys(actual); // for an array, this will return the indices that have values

  const expectedKeys = Object.keys(expected); // and it just magically works
  // Must have same number of properties

  if (actualKeys.length !== expectedKeys.length) {
    return false;
  } // Are they the same keys? If one is missing, then no, fail right away


  if (!actualKeys.every(key => Object.prototype.hasOwnProperty.call(expected, key))) {
    return false;
  } // Don't check own symbols when doing "loose"


  if (strictness === STRICTNESS.Strict) {
    const actualSymbols = Object.getOwnPropertySymbols(actual);
    const expectedSymbols = Object.getOwnPropertySymbols(expected); // Must have same number of symbols

    if (actualSymbols.length !== expectedSymbols.length) {
      return false;
    }

    if (actualSymbols.length > 0) {
      // Have to filter them down to enumerable symbols!
      for (const key of actualSymbols) {
        const actualIsEnumerable = Object.prototype.propertyIsEnumerable.call(actual, key);
        const expectedIsEnumerable = Object.prototype.propertyIsEnumerable.call(expected, key);

        if (actualIsEnumerable !== expectedIsEnumerable) {
          return false; // they differ on whetehr symbol is enumerable, fail!
        } else if (actualIsEnumerable) {
          // it's enumerable, add to keys to check
          actualKeys.push(key);
          expectedKeys.push(key);
        }
      }
    }
  } // Avoid circular references!
  // Record map from objects to depth in the hierarchy


  if (references === undefined) {
    references = {
      actual: new Map(),
      expected: new Map(),
      depth: 0 };

  } else {
    // see if we've already recorded these objects.
    // if so, make sure they refer to same depth in object hierarchy
    const memoizedActual = references.actual.get(actual);

    if (memoizedActual !== undefined) {
      const memoizedExpected = references.expected.get(expected);

      if (memoizedExpected !== undefined) {
        return memoizedActual === memoizedExpected;
      }
    }

    references.depth++;
  } // store the object -> depth mapping


  references.actual.set(actual, references.depth);
  references.expected.set(expected, references.depth); // When comparing Maps/Sets, compare elements before custom properties

  let result = true;

  if (comparison === COMPARE_TYPE.Set) {
    result = compareSets(actual, expected, strictness, references);
  } else if (comparison === COMPARE_TYPE.Map) {
    result = compareMaps(actual, expected, strictness, references);
  }

  if (result) {
    // Now loop over keys and compare them to each other!
    for (const key of actualKeys) {
      if (!deepEqual(actual[key], expected[key], strictness, references)) {
        result = false;
        break;
      }
    }
  } // wipe the object to depth mapping for these objects now


  references.actual.delete(actual);
  references.expected.delete(expected);
  return result;
}

assert$1.deepStrictEqual = (actual, expected, message) => {
  if (!deepEqual(actual, expected, STRICTNESS.Strict)) {
    throwError({
      actual,
      expected,
      message,
      operator: 'deepStrictEqual' });

  }
};

assert$1.notDeepStrictEqual = (actual, expected, message) => {
  if (deepEqual(actual, expected, STRICTNESS.Strict)) {
    throwError({
      actual,
      expected,
      message,
      operator: 'notDeepStrictEqual' });

  }
};

assert$1.deepEqual = (actual, expected, message) => {
  if (!deepEqual(actual, expected, STRICTNESS.Loose)) {
    throwError({
      actual,
      expected,
      message,
      operator: 'deepEqual' });

  }
};

assert$1.notDeepEqual = (actual, expected, message) => {
  if (deepEqual(actual, expected, STRICTNESS.Loose)) {
    throwError({
      actual,
      expected,
      message,
      operator: 'notDeepEqual' });

  }
};

assert$1.fail = (message = 'Failed') => throwError({
  message });


const NO_EXCEPTION = {};

function execute(fn) {
  assertArgumentType(fn, 'fn', 'Function');

  try {
    fn();
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION;
}

function isPromiseLike(fn) {
  return util.types.isPromise(fn) || fn && typeof fn === 'object' && typeof fn.then === 'function';
}

async function executePromise(fn) {
  let promise;
  const fnType = typeof fn;

  if (fnType === 'function') {
    promise = fn();

    if (!isPromiseLike(promise)) {
      throw new TypeError(`Expected instanceof Promise to be returned from the "fn" function but got ${typeof promise}`);
    }
  } else {
    if (!isPromiseLike(fn)) {
      throw new TypeError(`The "fn" argument must be of type Function or Promise. Received type ${fnType}`);
    }

    promise = fn;
  }

  try {
    await promise;
  } catch (e) {
    return e;
  }

  return NO_EXCEPTION;
}

assert$1.throws = (fn, error, message) => {
  const actual = execute(fn);

  if (actual === NO_EXCEPTION) {
    // FIXME: append message if not null
    throwError({
      actual: undefined,
      expected: error,
      message: 'Missing expected exception.',
      operator: 'throws' });

    return;
  } // They didn't specify how to validate, so just roll with it


  if (!error) {
    return;
  }

  if (!checkError(actual, error, message)) {
    throw actual; // throw the Error it did generate
  }
};

assert$1.rejects = async function (asyncFn, error, message) {
  const actual = await executePromise(asyncFn);

  if (actual === NO_EXCEPTION) {
    // FIXME: append message if not null
    throwError({
      actual: undefined,
      expected: error,
      message: 'Missing expected exception.',
      operator: 'rejects' });

    return;
  } // They didn't specify how to validate, so just roll with it


  if (!error) {
    return;
  }

  if (!checkError(actual, error, message)) {
    throw actual; // throw the Error it did generate
  }
};

assert$1.doesNotThrow = (fn, error, message) => {
  const actual = execute(fn); // no Error, just return

  if (actual === NO_EXCEPTION) {
    return;
  } // They didn't specify how to validate, so just re-throw


  if (!error) {
    throw actual;
  } // If error matches expected, throw an AssertionError


  if (checkError(actual, error)) {
    throwError({
      actual,
      expected: error,
      operator: 'doesNotThrow',
      message: `Got unwanted exception${message ? ': ' + message : '.'}` });

    return;
  } // doesn't match, re-throw


  throw actual;
};

assert$1.doesNotReject = async function (fn, error, message) {
  const actual = await executePromise(fn); // no Error, just return

  if (actual === NO_EXCEPTION) {
    return;
  } // They didn't specify how to validate, so just re-throw


  if (!error) {
    throw actual;
  } // If error matches expected, throw an AssertionError


  if (checkError(actual, error)) {
    throwError({
      actual,
      expected: error,
      operator: 'doesNotThrow',
      message: `Got unwanted exception${message ? ': ' + message : '.'}` });

    return;
  } // doesn't match, re-throw


  throw actual;
};
/**
 * @param {Error} actual the actual Error generated by the wrapped function/block
 * @param {object|RegExp|Function|Error|Class} expected The value to test against the Error
 * @param {string} [message] custom message to append
 * @returns {boolean} true if the Error matches the expected value/object
 */


function checkError(actual, expected, message) {
  // What we do here depends on what `expected` is:
  // function - call it to validate
  // object - test properties against actual
  // Regexp - test against actual.toString()
  // Error type - check type matches
  // Error instance - compare properties
  if (typeof expected === 'object') {
    if (util.types.isRegExp(expected)) {
      return expected.test(actual); // does the error match the RegExp expression? if so, pass
    } // Test properties (`expected` is either a generic Object or an Error instance)


    const keys = Object.keys(expected); // If we're testing against an instance of an Error, we need to hack in name/message properties.

    if (expected instanceof Error) {
      keys.unshift('name', 'message'); // we want to compare name and message, but they're not set as enumerable on Error
    }

    for (const key of keys) {
      if (!deepEqual(actual[key], expected[key], STRICTNESS.Strict)) {
        if (!message) {
          // generate a meaningful message! Cheat by treating like equality check of values
          // then steal the message it generated
          try {
            throwError({
              actual: actual[key],
              expected: expected[key],
              operator: 'deepStrictEqual' });

          } catch (err) {
            message = err.message;
          }
        }

        throwError({
          actual,
          expected,
          message,
          operator: 'throws' });

        return false;
      }
    }

    return true; // They all matched, pass!
  } else if (typeof expected === 'function') {
    // if `expected` is a "type" and actual is an instance of that type, then pass
    if (expected.prototype != null && actual instanceof expected) {
      // eslint-disable-line no-eq-null,eqeqeq
      return true;
    } // If `expected` is a subclass of Error but `actual` wasn't an instance of it (above), fail


    if (Object.prototype.isPrototypeOf.call(Error, expected)) {
      return false;
    } // ok, let's assume what's left is that `expected` was a validation function,
    // so call it with empty `this` and single argument of the actual error we received


    return expected.call({}, actual);
  }

  return false;
}

assert$1.ifError = value => {
  if (value === null || value === undefined) {
    return;
  }

  throwError({
    actual: value,
    expected: null,
    message: `ifError got unwanted exception: ${value}`,
    operator: 'ifError' });

}; // Create "strict" copy which overrides "loose" methods to call strict equivalents


assert$1.strict = (value, message) => assert$1.ok(value, message); // "Copy" methods from assert to assert.strict!


Object.assign(assert$1.strict, assert$1); // Override the "loose" methods to point to the strict ones

assert$1.strict.deepEqual = assert$1.deepStrictEqual;
assert$1.strict.notDeepEqual = assert$1.notDeepStrictEqual;
assert$1.strict.equal = assert$1.strictEqual;
assert$1.strict.notEqual = assert$1.notStrictEqual; // hang strict off itself

assert$1.strict.strict = assert$1.strict;

/**
 * @param {string} [encoding='utf8'] The character encoding the `StringDecoder` will use.
 */
function StringDecoder(encoding = 'utf8') {
  this.encoding = encoding.toLowerCase();

  switch (this.encoding) {
    case 'utf8':
    case 'utf-8':
      this._impl = new Utf8StringDecoder();
      break;

    case 'ucs2':
    case 'ucs-2':
    case 'utf16-le':
    case 'utf16le':
      this._impl = new Utf16StringDecoder();
      break;

    case 'base64':
      this._impl = new Base64StringDecoder();
      break;

    default:
      this._impl = new StringDecoderImpl(this.encoding);
      break;}

}
/**
 * Returns any remaining input stored in the internal buffer as a string.
 * Bytes representing incomplete UTF-8 and UTF-16 characters will be replaced with substitution
 * characters appropriate for the character encoding.
 *
 * If the buffer argument is provided, one final call to stringDecoder.write() is performed before returning the remaining input.
 * @param {Buffer} [buffer] containing the bytes to decode.
 * @returns {string}
 */


StringDecoder.prototype.end = function end(buffer) {
  return this._impl.end(buffer);
};
/**
 * Returns a decoded string, ensuring that any incomplete multibyte characters at the end of the Buffer, or
 * TypedArray, or DataView are omitted from the returned string and stored in an internal buffer for the
 * next call to stringDecoder.write() or stringDecoder.end().
 * @param {Buffer|TypedArray|DataView} buffer containing the bytes to decode.
 * @returns {string}
 */


StringDecoder.prototype.write = function write(buffer) {
  if (typeof buffer === 'string') {
    return buffer;
  } // empty string for empty buffer


  if (buffer.length === 0) {
    return '';
  }

  return this._impl.write(buffer);
};
/**
 * This is the base class. We override parts of it for certain encodings. For ascii/hex/binary/latin1 the impl is super-easy
 */


class StringDecoderImpl {
  constructor(encoding = 'utf8') {
    this.encoding = encoding;
    this.byteCount = 0;
    this.charLength = 1;
  } // the actual underlying implementation!


  end(buffer) {
    if (buffer && buffer.length !== 0) {
      return this.write(buffer);
    }

    return '';
  }

  write(buffer) {
    if (buffer && buffer.length !== 0) {
      return buffer.toString(this.encoding); // single byte character encodings are a cinch
    }

    return ''; // no buffer, or empty
  }}

// For multi-byte encodings, let's implement some base logic...


class MultiByteStringDecoderImpl extends StringDecoderImpl {
  constructor(encoding, bytesPerChar) {
    super(encoding);
    this.incomplete = Buffer.allocUnsafe(bytesPerChar); // temporary incomplete character buffer
  }
  /**
   * @typedef {Object} IncompleteCharObject
   * @property {integer} bytesNeeded bytes missing to complete the character
   * @property {integer} charLength bytes expected to complete the character
   * @property {integer} index location in the buffer where the character starts
   */

  /**
   * Given a Buffer, sees if we have an incomplete "character" at the end of it.
   * Returns info on that:
   * - bytesNeeded: 0-3, number of bytes still remaining
   * - charLength: expected number of bytes for the incomplete character
   * - index: index in the buffer where the incomplete character begins
   * @param {Buffer} _buffer Buffer we are checking to see if it has an incompelte "character" at the end
   * @returns {IncompleteCharObject}
   */


  _checkIncompleteBytes(_buffer) {
    throw new Error('subclasses must override!');
  }

  _incompleteEnd() {
    throw new Error('subclasses must override!');
  }

  _incompleteBufferEmptied() {
    // typically we reset byte count back to 0 and character length to 1
    this.byteCount = 0;
    this.charLength = 1;
  }

  end(buffer) {
    let result = super.end(buffer);

    if (this.byteCount !== 0) {
      // we have incomplete characters!
      result += this._incompleteEnd();
    }

    this._incompleteBufferEmptied(); // reset our internals to "wipe" the incomplete buffer


    return result;
  }

  write(buffer) {
    // first let's see if we had some multi-byte character we didn't finish...
    let char = '';

    if (this.byteCount !== 0) {
      // we still needed some bytes to finish the character
      // How many bytes do we still need? charLength - bytes we received
      const left = this.charLength - this.byteCount; // need 4, have 1? then we have 3 "left"

      const bytesCopied = Math.min(left, buffer.length); // copy up to that many bytes
      // copy bytes from `buffer` to our incomplete buffer

      buffer.copy(this.incomplete, this.byteCount, 0, bytesCopied);
      this.byteCount += bytesCopied; // record how many more bytes we copied...

      if (bytesCopied < left) {
        // still need more bytes to complete!
        return '';
      } // we were able to complete, yay!
      // grab the character we completed


      char = this.incomplete.slice(0, this.charLength).toString(this.encoding); // reset our counters

      this._incompleteBufferEmptied(); // do we have any bytes left in this buffer?


      if (bytesCopied === buffer.length) {
        return char; // if not, return the character we finished!
      } // we still have more bytes, so slice the buffer up


      buffer = buffer.slice(bytesCopied, buffer.length);
    } // check this buffer to see if it indicates we need more bytes?


    const incompleteCharData = this._checkIncompleteBytes(buffer);

    if (incompleteCharData.bytesNeeded === 0) {
      return char + buffer.toString(this.encoding); // no incomplete bytes, return any character we completed plus the buffer
    } // ok so the buffer holds an incomplete character at it's end


    this.charLength = incompleteCharData.charLength; // record how many bytes we need for the 'character'

    const incompleteCharIndex = incompleteCharData.index; // this is the index of the multibyte character that is incomplete
    // copy from index of incomplete character to end of buffer

    const bytesToCopy = buffer.length - incompleteCharIndex;
    buffer.copy(this.incomplete, 0, incompleteCharIndex, buffer.length);
    this.byteCount = bytesToCopy; // record how many bytes we actually copied

    if (bytesToCopy < buffer.length) {
      // buffer had bytes before the incomplete character
      // so smush any character we may have completed with any complete characters in the buffer
      return char + buffer.toString(this.encoding, 0, incompleteCharIndex);
    }

    return char; // any now-completed character that was previously incomplete, possibly empty
  }}



class Utf8StringDecoder extends MultiByteStringDecoderImpl {
  constructor() {
    super('utf8', 4);
  }

  _checkIncompleteBytes(buffer) {
    const length = buffer.length; // FIXME: In Node, they check the last character first!
    // And they rely on Buffer#toString() to handle injecting the '\ufffd' character for busted multi-byte sequences!
    // iOS apparently just returns undefined in that special case and
    // Android differs here because we don't work backwards from the last char
    // Can we cheat here and...
    // see https://github.com/nodejs/string_decoder/blob/master/lib/string_decoder.js#L173-L198
    // - if we see a multi-byte character start, validate the next characters are continuation chars
    // - if they're not replace the sequence with '\ufffd', treat like that multi-byte character was "completed"
    // Note that even if we do hack this, if there's some invalid multi-byte UTF-8 in the buffer that isn't at the last 3 bytes
    // then we're at the mercy of the JS engine/platform code for handling that
    // Here's someone's hack there: https://gist.github.com/oleganza/997155
    // if buffer.length >= 3, check 3rd to last byte

    if (length >= 3) {
      let charLength = checkCharLengthForUTF8(buffer[length - 3]);

      if (charLength === 4) {
        return {
          bytesNeeded: 1,
          // we have 3 last bytes, need 4th
          index: length - 3,
          charLength: 4 };

      }
    } // if buffer.length >= 2, check 2nd to last byte


    if (length >= 2) {
      let charLength = checkCharLengthForUTF8(buffer[length - 2]);

      if (charLength >= 3) {
        return {
          bytesNeeded: charLength - 2,
          // we have 2 bytes of whatever we need
          index: length - 2,
          charLength };

      }
    } // if buffer.length >= 1, check last byte


    if (length >= 1) {
      let charLength = checkCharLengthForUTF8(buffer[length - 1]);

      if (charLength >= 2) {
        return {
          bytesNeeded: charLength - 1,
          // we have 1 byte of whatever we need
          index: length - 1,
          charLength };

      }
    } // base case, no bytes needed - ends on complete character


    return {
      bytesNeeded: 0,
      index: length - 1,
      charLength: 1 };

  }

  _incompleteEnd() {
    return '\ufffd'; // we replace the missing character with a special utf8 char
  }}



class Utf16StringDecoder extends MultiByteStringDecoderImpl {
  constructor() {
    super('utf16le', 4);
  }

  _checkIncompleteBytes(buffer) {
    const length = buffer.length;
    const modulo = length % 2; // ok, we have a multiple of 2 bytes

    if (modulo === 0) {
      // is the last byte a leading/high surrogate?
      const byte = buffer[buffer.length - 1];

      if (byte >= 0xD8 && byte <= 0xDB) {
        return {
          bytesNeeded: 2,
          charLength: 4,
          index: length - 2 };

      } // we're good, not a surrogate, so we have our needed 2 bytes


      return {
        bytesNeeded: 0,
        charLength: 2 };

    } // ok we have 1 byte left over, assume we need 2 to form the character


    return {
      bytesNeeded: 1,
      index: length - 1,
      charLength: 2 };

  }

  _incompleteEnd() {
    // Just write out the last N bytes, hopefully the engine can handle it for us?
    return this.incomplete.toString('utf16le', 0, this.byteCount);
  }}



class Base64StringDecoder extends MultiByteStringDecoderImpl {
  constructor() {
    super('base64', 3);
    this.charLength = 3; // always 3!
  }

  _checkIncompleteBytes(buffer) {
    const length = buffer.length;
    const modulo = length % 3; // base64 needs 3 bytes always, so if we have that many (or a multiple), we have a complete buffer

    if (modulo === 0) {
      return {
        bytesNeeded: 0,
        charLength: 3 };

    } // ok we have 1 or 2 bytes left over


    return {
      bytesNeeded: 3 - modulo,
      // always need 3, so if we have 1 left over -> need 2
      index: length - modulo,
      charLength: 3 // always need 3
    };

  }

  _incompleteBufferEmptied() {
    this.byteCount = 0;
    this.charLength = 3; // always 3!
  }

  _incompleteEnd() {
    // Just write out the last N bytes, it should insert the '=' placeholders
    // it's not really 'missing'/'incomplete', just needs placeholder insertion
    return this.incomplete.toString('base64', 0, this.byteCount);
  }}



function checkCharLengthForUTF8(byte) {
  // 11110XXX => 1110 => 0x1E
  if (byte >> 3 === 0x1E) {
    return 4;
  } // 1110XXXX => 1110 => 0x1E


  if (byte >> 4 === 0x0E) {
    return 3;
  } // 110XXXXX => 110 => 0x06


  if (byte >> 5 === 0x06) {
    return 2;
  }

  return 1;
}

var StringDecoder$1 = {
  StringDecoder };


const printedWarnings = {};

function oneTimeWarning(key, msg) {
  if (!printedWarnings[key]) {
    console.warn(msg);
    printedWarnings[key] = true;
  }
}
/**
 * Prints a one-time warning message that we do not support the given API and performs an effective no-op
 * @param {string} moduleName name of the module/object
 * @param {string} name name of the function.property we don't support
 * @returns {Function} no-op function
 */


function unsupportedNoop(moduleName, name) {
  return () => {
    const fqn = `${moduleName}.${name}`;
    oneTimeWarning(fqn, `"${fqn}" is not supported yet on Titanium and uses a no-op fallback.`);
    return undefined;
  };
}
/**
 * @param {string} moduleName name of the module/object
 * @param {string} name name of the function.property we don't support
 * @param {Function} callback async callback we call in a quick setTimeout
 */


function asyncUnsupportedNoop(moduleName, name, callback) {
  callback = maybeCallback(callback); // enforce we have a valid callback

  unsupportedNoop(moduleName, name)();
  setTimeout(callback, 1);
} // Used to choose the buffer/chunk size when pumping bytes during copies


const COPY_FILE_CHUNK_SIZE = 8092; // what should we use here?
// Keep track of integer -> FileStream mappings

const fileDescriptors = new Map();
let fileDescriptorCount = 4; // global counter used to report file descriptor integers
// Map file system access flags to Ti.Filesystem.MODE_* constants

const FLAGS_TO_TI_MODE = new Map();
FLAGS_TO_TI_MODE.set('a', Ti.Filesystem.MODE_APPEND);
FLAGS_TO_TI_MODE.set('ax', Ti.Filesystem.MODE_APPEND);
FLAGS_TO_TI_MODE.set('a+', Ti.Filesystem.MODE_APPEND);
FLAGS_TO_TI_MODE.set('ax+', Ti.Filesystem.MODE_APPEND);
FLAGS_TO_TI_MODE.set('as+', Ti.Filesystem.MODE_APPEND);
FLAGS_TO_TI_MODE.set('r', Ti.Filesystem.MODE_READ);
FLAGS_TO_TI_MODE.set('r+', Ti.Filesystem.MODE_READ);
FLAGS_TO_TI_MODE.set('rs+', Ti.Filesystem.MODE_READ);
FLAGS_TO_TI_MODE.set('w', Ti.Filesystem.MODE_WRITE);
FLAGS_TO_TI_MODE.set('wx', Ti.Filesystem.MODE_WRITE);
FLAGS_TO_TI_MODE.set('w+', Ti.Filesystem.MODE_WRITE);
FLAGS_TO_TI_MODE.set('wx+', Ti.Filesystem.MODE_WRITE); // Common errors

const permissionDenied = (syscall, path) => makeError('EACCES', 'permission denied', -13, syscall, path);

const noSuchFile = (syscall, path) => makeError('ENOENT', 'no such file or directory', -2, syscall, path);

const fileAlreadyExists = (syscall, path) => makeError('EEXIST', 'file already exists', -17, syscall, path);

const notADirectory = (syscall, path) => makeError('ENOTDIR', 'not a directory', -20, syscall, path);

const directoryNotEmpty = (syscall, path) => makeError('ENOTEMPTY', 'directory not empty', -66, syscall, path);

const illegalOperationOnADirectory = (syscall, path) => makeError('EISDIR', 'illegal operation on a directory', -21, syscall, path);

const fs = {
  constants: {
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFBLK: 24576,
    S_IFIFO: 4096,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    O_CREAT: 512,
    O_EXCL: 2048,
    O_NOCTTY: 131072,
    O_TRUNC: 1024,
    O_APPEND: 8,
    O_DIRECTORY: 1048576,
    O_NOFOLLOW: 256,
    O_SYNC: 128,
    O_DSYNC: 4194304,
    O_SYMLINK: 2097152,
    O_NONBLOCK: 4,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_COPYFILE_EXCL: 1,
    COPYFILE_EXCL: 1 } };



class Stats {
  constructor(path) {
    this._file = null;
    this.dev = 0;
    this.ino = 0;
    this.mode = 0;
    this.nlink = 0;
    this.uid = 0;
    this.gid = 0;
    this.rdev = 0;
    this.size = 0;
    this.blksize = 4096; // FIXME: https://stackoverflow.com/questions/1315311/what-is-the-block-size-of-the-iphone-filesystem

    this.blocks = 0;
    this.atimeMs = this.mtimeMs = this.ctimeMs = this.birthtimeMs = 0;
    this.atime = this.mtime = this.ctime = this.birthtime = new Date(0);

    if (path) {
      this._file = getTiFileFromPathLikeValue(path); // TODO: use lazy getters here?

      this.ctime = this.birthtime = this._file.createdAt();
      this.atime = this.mtime = this._file.modifiedAt();
      this.atimeMs = this.atime.getTime();
      this.birthtimeMs = this.birthtime.getTime();
      this.ctimeMs = this.ctime.getTime();
      this.mtimeMs = this.mtime.getTime();
      this.size = this._file.size;
      this.blocks = Math.ceil(this.size / this.blksize); // TODO: Can we fake out the mode based on the readonly/writable/executable properties?
    }
  }

  isFile() {
    return this._file.isFile();
  }

  isDirectory() {
    return this._file.isDirectory();
  }

  isBlockDevice() {
    return false;
  }

  isCharacterDevice() {
    return false;
  }

  isSymbolicLink() {
    return this._file.symbolicLink;
  }

  isFIFO() {
    return false;
  }

  isSocket() {
    return false;
  }}



fs.Stats = Stats;

class ReadStream {}

fs.ReadStream = ReadStream;

class WriteStream {}

fs.WriteStream = WriteStream;
/**
 * @callback statsCallback
 * @param {Error} err - Error if one occurred
 * @param {fs.Stats} stats - file stats
 */

/**
 * @param {string|URL|Buffer} path file path
 * @param {integer} [mode=fs.constants.F_OK] accessibility mode/check
 * @param {function} callback async callback
 */

fs.access = function (path, mode, callback) {
  if (typeof mode === 'function') {
    callback = mode;
    mode = fs.constants.F_OK;
  }

  callback = maybeCallback(callback);
  setTimeout(() => {
    try {
      fs.accessSync(path, mode);
    } catch (e) {
      callback(e);
      return;
    }

    callback();
  }, 1);
};
/**
 * @param {string|URL|Buffer} path file path
 * @param {integer} [mode=fs.constants.F_OK] accessibility mode/check
 */


fs.accessSync = function (path, mode = fs.constants.F_OK) {
  // F_OK is just whether file exists or not, no permissions check
  // R_OK is read check
  // W_OK is write check
  // X_OK is execute check (acts like F_OK on Windows)
  const fileHandle = getTiFileFromPathLikeValue(path);

  if (!fileHandle.exists()) {
    throw noSuchFile('access', path);
  } // TODO: We have no means of testing if a file is readable. It's assumed all files that exist under the app are?


  if (mode & fs.constants.W_OK && !fileHandle.writable) {
    throw permissionDenied('access', path);
  }

  if (mode & fs.constants.X_OK && !fileHandle.executable && fileHandle.isFile()) {
    throw permissionDenied('access', path);
  }
};
/**
 * Asynchronously append data to a file, creating the file if it does not yet exist. data can be a string or a Buffer.
 * @param {string|Buffer|URL|FileStream} file filepath to file
 * @param {string|Buffer} data data to append to file
 * @param {object|string} [options] options
 * @param {string} [options.encoding='utf8'] encoding to use
 * @param {integer} [options.mode=0o666] mode to create file, if not created
 * @param {string} [options.flag='a'] file system flag
 * @param {Function} callback function to call back with error if failed
 */


fs.appendFile = (file, data, options, callback) => {
  callback = maybeCallback(callback || options);
  options = mergeDefaultOptions(options, {
    encoding: 'utf8',
    mode: 0o666,
    flag: 'a' });

  fs.writeFile(file, data, options, callback);
};
/**
 * Synchronously append data to a file, creating the file if it does not yet exist. data can be a string or a Buffer.
 * @param {string|Buffer|URL|FileStream} file filepath to file
 * @param {string|Buffer} data data to append to file
 * @param {object|string} [options] options
 * @param {string} [options.encoding='utf8'] encoding to use
 * @param {integer} [options.mode=0o666] mode to create file, if not created
 * @param {string} [options.flag='a'] file system flag
 */


fs.appendFileSync = (file, data, options) => {
  options = mergeDefaultOptions(options, {
    encoding: 'utf8',
    mode: 0o666,
    flag: 'a' });

  fs.writeFileSync(file, data, options); // TODO: Use Ti.Filesystem.File.append() instead?
};

fs.chmod = (path, mode, callback) => asyncUnsupportedNoop('fs', 'chmod', callback);

fs.chmodSync = unsupportedNoop('fs', 'chmodSync');

fs.chown = (path, uid, gid, callback) => asyncUnsupportedNoop('fs', 'chown', callback);

fs.chownSync = unsupportedNoop('fs', 'chownSync');
/**
 * Callback for functions that can only throw errors
 *
 * @callback errorCallback
 * @param {Error} [err] - Error thrown
 */

/**
 * @param {integer} fd file descriptor
 * @param {errorCallback} callback callback function
 */

fs.close = (fd, callback) => {
  callback = maybeCallback(callback);
  setTimeout(() => {
    try {
      fs.closeSync(fd);
    } catch (e) {
      callback(e);
      return;
    }

    callback();
  }, 1);
};
/**
 * @param {integer} fd file descriptor
 */


fs.closeSync = fd => {
  const stream = streamForDescriptor(fd);
  stream.close();
}; // Rather than use a hack to wrap sync version in setTimeout, use actual async APIs!

/**
 * @param {string|Buffer|URL} src source filename to copy
 * @param {string|Buffer|URL} dest destination filename of the copy operation
 * @param {number} [flags=0] modifiers for copy operation
 * @param {errorCallback} callback callback called at end of operation
 */


fs.copyFile = function (src, dest, flags, callback) {
  if (typeof flags === 'function') {
    callback = flags;
    flags = 0;
  }

  callback = maybeCallback(callback); // FIXME: I don't know why, but changing this to use Ti.Filesystem.openStream(mode, path) fails (at least on iOS)

  const srcFile = Ti.Filesystem.getFile(src);
  const srcStream = srcFile.open(Ti.Filesystem.MODE_READ);
  const destFile = Ti.Filesystem.getFile(dest);
  const destStream = destFile.open(Ti.Filesystem.MODE_WRITE);
  pipe(srcStream, destStream, callback);
};
/**
 * @param {string|Buffer|URL} src source filename to copy
 * @param {string|Buffer|URL} dest destination filename of the copy operation
 * @param {number} [flags=0] modifiers for copy operation
 */


fs.copyFileSync = function (src, dest, flags = 0) {
  const srcFile = Ti.Filesystem.getFile(src);

  if (flags === fs.constants.COPYFILE_EXCL && fs.existsSync(dest)) {
    throw fileAlreadyExists('copyFile', dest);
  }

  if (!srcFile.copy(dest)) {
    throw new Error(`Unable to copy ${src} to ${dest}`); // FIXME: What error should we give?
  }
}; // TODO: fs.createReadStream(path, options)
// /**
//  * @param {string|Buffer|URL} path path like
//  * @param {string|object} [options] options, if a string, it's the encoding
//  * @param {string} [options.flags='r'] See support of file system flags.
//  * @param {string} [options.encoding=null] encoding
//  * @param {integer} [options.fd=null] file descriptor, if specified, `path` is ignored
//  * @param {integer} [options.mode=0o666] permissions to set if file is created
//  * @param {boolean} [options.autoClose=true] if false, file descriptor will not be closed; if true even on error it will be closed
//  * @param {integer} [options.start] start index of range of bytes to read from file
//  * @param {integer} [options.end=Infinity] end index of range of bytes to read from file
//  * @param {integer} [options.highWaterMark=64 * 1024]
//  * @returns {fs.ReadStream}
//  */
// fs.createReadStream = (path, options) => {
// 	options = mergeDefaultOptions(options, { flags: 'r', encoding: null, fd: null, mode: 0o666, autoClose: true, end: Infinity, highWaterMark: 64 * 1024 });
// 	// FIXME: If options.fd, use that in place of path!
// 	const tiFile = getTiFileFromPathLikeValue(path);
// };
// TODO: fs.createWriteStream(path, options)

/**
 * @callback existsCallback
 * @param {boolean} exists - whether path exists
 */

/**
 * @param {string} path path to check
 * @param {existsCallback} callback callback function
 * @returns {void}
 */


fs.exists = function (path, callback) {
  callback = maybeCallback(callback);
  setTimeout(() => {
    callback(fs.existsSync(path));
  }, 1);
};
/**
 * @param {string} path path to check
 * @returns {boolean} whether a file or directory exists at that path
 */


fs.existsSync = function (path) {
  try {
    fs.accessSync(path);
    return true;
  } catch (e) {
    return false;
  }
};

fs.fchmod = (fd, mode, callback) => asyncUnsupportedNoop('fs', 'fchmod', callback);

fs.fchmodSync = unsupportedNoop('fs', 'fchmodSync');

fs.fchown = (fd, uid, gid, callback) => asyncUnsupportedNoop('fs', 'fchown', callback);

fs.fchownSync = unsupportedNoop('fs', 'fchownSync');

fs.fdatasync = (fd, callback) => asyncUnsupportedNoop('fs', 'fdatasync', callback);

fs.fdatasyncSync = unsupportedNoop('fs', 'fdatasyncSync');
/**
 * @param {integer} fd file descriptor
 * @param {object} [options] options
 * @param {boolean} [options.bigint] whether stat values should be bigint
 * @param {function} callback async callback function
 */

fs.fstat = (fd, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  callback = maybeCallback(callback);
  setTimeout(() => {
    let stats;

    try {
      stats = fs.fstatSync(fd, options);
    } catch (e) {
      callback(e);
      return;
    }

    callback(null, stats);
  }, 1);
};
/**
 * @param {integer} fd file descriptor
 * @param {object} [_options] options
 * @param {boolean} [_options.bigint] whether stat values should be bigint
 * @returns {fs.Stats} stats for file descriptor
 */


fs.fstatSync = (fd, _options) => {
  const path = pathForFileDescriptor(fd);
  return fs.statSync(path);
}; // TODO: Add versions of these APIs:
// fs.fsync(fd, callback)
// fs.fsyncSync(fd)
// fs.ftruncate(fd[, len], callback)
// fs.ftruncateSync(fd[, len])
// fs.futimes(fd, atime, mtime, callback)
// fs.futimesSync(fd, atime, mtime)
// fs.lchmod(path, mode, callback)
// fs.lchmodSync(path, mode)
// fs.lchown(path, uid, gid, callback)
// fs.lchownSync(path, uid, gid)
// fs.link(existingPath, newPath, callback)
// fs.linkSync(existingPath, newPath)
// FIXME: If symbolic link we need to follow link to target to get stats! Our API doesn't support that!


fs.lstat = (path, options, callback) => fs.stat(path, options, callback);

fs.lstatSync = (path, options) => fs.statSync(path, options);
/**
 * @param {string|Buffer|URL} path file path
 * @param {string|object} [options] options
 * @param {boolean} [options.recursive=false] recursivley create dirs?
 * @param {integer} [options.mode=0o777] permissions
 * @param {errorCallback} callback async callback
 */


fs.mkdir = (path, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {
      recursive: false,
      mode: 0o777 };

  }

  callback = maybeCallback(callback);
  setTimeout(() => {
    try {
      fs.mkdirSync(path, options);
    } catch (e) {
      callback(e);
      return;
    }

    callback(null);
  }, 1);
};
/**
 * @param {string|Buffer|URL} path file path
 * @param {string|object} [options] options
 * @param {boolean} [options.recursive=false] recursivley create dirs?
 * @param {integer} [options.mode=0o777] permissions
 */


fs.mkdirSync = (path, options) => {
  const tiFile = getTiFileFromPathLikeValue(path);

  if (typeof options === 'number') {
    options = {
      recursive: false,
      mode: options };

  } else {
    options = mergeDefaultOptions(options, {
      recursive: false,
      mode: 0o777 });

  }

  if (!tiFile.createDirectory(options.recursive) && !options.recursive) {
    if (tiFile.exists()) {
      // already existed!
      throw fileAlreadyExists('mkdir', path);
    } // We failed, probably because we didn't ask for recursive and parent doesn't exist, so reproduce node's error


    throw noSuchFile('mkdir', path);
  }
};
/**
 * @callback tempDirCallback
 * @param {Error} err - Error if one occurred
 * @param {string} folder - generated folder name
 */

/**
 * @param {string} prefix directory name prefix
 * @param {string|object} [options] options
 * @param {string} [options.encoding='utf-8'] prefix encoding
 * @param {tempDirCallback} callback async callback
 */


fs.mkdtemp = (prefix, options, callback) => {
  assertArgumentType(prefix, 'prefix', 'string');

  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  callback = maybeCallback(callback);
  options = mergeDefaultOptions(options, {
    encoding: 'utf-8' });
  // try to be all async

  const tryMkdtemp = () => {
    const generated = randomCharacters(6, options.encoding); // generate six random characters

    const path = `${prefix}${generated}`;
    fs.mkdir(path, 0o700, err => {
      if (err) {
        if (err.code === 'EEXIST') {
          // retry!
          setTimeout(tryMkdtemp, 1);
          return;
        } // bubble up error


        callback(err);
        return;
      } // succeeded! Hurray!


      callback(null, path);
    });
  };

  setTimeout(tryMkdtemp, 1);
};
/**
 * Creates a unique temporary directory.
 * @param {string} prefix directory name prefix
 * @param {string|object} [options] options
 * @param {string} [options.encoding='utf-8'] prefix encoding
 * @returns {string} path to created directory
 */


fs.mkdtempSync = (prefix, options) => {
  assertArgumentType(prefix, 'prefix', 'string');
  options = mergeDefaultOptions(options, {
    encoding: 'utf-8' });

  let retryCount = 0;
  const MAX_RETRIES = 100;

  while (retryCount < MAX_RETRIES) {
    const generated = randomCharacters(6, options.encoding); // generate six random characters

    const path = `${prefix}${generated}`;

    try {
      fs.mkdirSync(path, 0o700); // don't try recursive

      return path;
    } catch (e) {
      if (e.code !== 'EEXIST') {
        throw e; // bubble up error
      } // name was not unique, so retry


      retryCount++;
    }
  }

  throw new Error(`Failed to create a unique directory name with prefix ${prefix}`);
};
/**
 * @callback fileDescriptorCallback
 * @param {Error} err - Error if one occurred
 * @param {integer} fileDescriptor - generated file descriptor
 */

/**
 * @param {string|Buffer|URL} path path to file
 * @param {string} [flags='r'] file system access flags
 * @param {integer} [mode=0o666] file mode to use when creating file
 * @param {fileDescriptorCallback} callback async callback
 */


fs.open = (path, flags, mode, callback) => {
  // flags and mode are optional, we need to handle if not supplied!
  if (typeof flags === 'function') {
    callback = flags;
    flags = 'r';
    mode = 0o666;
  } else if (typeof mode === 'function') {
    callback = mode;
    mode = 0o666;
  }

  callback = maybeCallback(callback);
  setTimeout(() => {
    let fileDescriptor;

    try {
      fileDescriptor = fs.openSync(path, flags, mode);
    } catch (e) {
      callback(e);
      return;
    }

    callback(null, fileDescriptor);
  }, 1);
};
/**
 * @param {string|Buffer|URL} path path to file
 * @param {string} [flags='r'] file system access flags
 * @param {integer} [_mode=0o666] file mode to use when creating file
 * @returns {integer}
 */


fs.openSync = (path, flags = 'r', _mode = 0o666) => {
  const tiFile = getTiFileFromPathLikeValue(path);

  if (!tiFile.exists()) {
    // TODO: Support creating file with specific mode
    oneTimeWarning('fs.openSync.mode', 'fs.openSync\'s mode parameter is unsupported in Titanium and will be ignored');

    if (!tiFile.createFile()) {
      // Oh crap, we failed to create the file. why?
      if (!tiFile.parent.exists()) {
        // parent does not exist!
        throw noSuchFile('open', path);
      }

      throw new Error(`failed to create file at path ${path}`);
    }
  } else if (flags) {
    // file/dir exists...
    if ((flags.charAt(0) === 'w' || flags.charAt(0) === 'a') && tiFile.isDirectory()) {
      // If user is trying to write or append and it's a directory, fail
      throw illegalOperationOnADirectory('open', path);
    }

    if (flags.length > 1 && flags.charAt(1) === 'x') {
      // If user has "exclusive" flag on, fail if file already exists
      throw fileAlreadyExists('open', path);
    }
  }

  const tiMode = FLAGS_TO_TI_MODE.get(flags);

  if (tiMode === undefined) {
    // TODO: Make use of common error type/code for this once we have internal/errors.js
    const err = new TypeError(`The value "${String(flags)}" is invalid for option "flags"`);
    err.code = 'ERR_INVALID_OPT_VALUE';
    throw err;
  }

  return createFileDescriptor(path, tiFile.open(tiMode));
};
/**
 * @callback readCallback
 * @param {Error} err - Error if one occurred
 * @param {integer} bytesRead - number of bytes read
 * @param {Buffer} buffer buffer
 */

/**
 * @param {integer} fd file descriptor
 * @param {Buffer|Ti.Buffer} buffer buffer to read into
 * @param {integer} offset the offset in the buffer to start writing at.
 * @param {integer} length integer specifying the number of bytes to read.
 * @param {integer} position where to begin reading from in the file
 * @param {readCallback} callback async callback
 */


fs.read = (fd, buffer, offset, length, position, callback) => {
  callback = maybeCallback(callback);
  const tiFileStream = streamForDescriptor(fd);

  if (!Buffer.isBuffer(buffer)) {
    buffer = Buffer.from(buffer);
  } // FIXME: Allow using position argument!


  if (position !== null) {
    oneTimeWarning('fs.readSync.position', 'fs.readSync\'s position argument is unsupported by Titanium and will be treated as null');
  }

  tiFileStream.read(buffer.toTiBuffer(), offset, length, readObj => {
    if (!readObj.success) {
      callback(new Error(readObj.error));
      return;
    }

    callback(null, readObj.bytesProcessed, buffer);
  });
};
/**
 * @param {integer} fd file descriptor
 * @param {Buffer|Ti.Buffer} buffer buffer to read into
 * @param {integer} offset the offset in the buffer to start writing at.
 * @param {integer} length integer specifying the number of bytes to read.
 * @param {integer} _position where to begin reading from in the file
 * @returns {integer} bytes read
 */


fs.readSync = (fd, buffer, offset, length, _position) => {
  const fileStream = streamForDescriptor(fd);

  if (!Buffer.isBuffer(buffer)) {
    buffer = Buffer.from(buffer);
  } // FIXME: Allow using position argument!


  if (_position !== null) {
    oneTimeWarning('fs.readSync.position', 'fs.readSync\'s position argument is unsupported by Titanium and will be treated as null');
  }

  return fileStream.read(buffer.toTiBuffer(), offset, length);
};
/**
 * @callback filesCallback
 * @param {Error} err - Error if one occurred
 * @param {string[]|Buffer[]|fs.Dirent[]} files - file listing
 */

/**
 * @param {string} path directory to list
 * @param {string|object} [options] optional options
 * @param {string} [options.encoding='utf8'] encoding to use for filenames, if `'buffer'`, returns `Buffer` objects
 * @param {boolean} [options.withFileTypes=false] if true, returns `fs.Dirent` objects
 * @param {filesCallback} callback async callback
 */


fs.readdir = (path, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  callback = maybeCallback(callback);
  setTimeout(() => {
    let result;

    try {
      result = fs.readdirSync(path, options);
    } catch (e) {
      callback(e);
      return;
    }

    callback(null, result);
  }, 1);
};
/**
 * @param {string} filepath directory to list
 * @param {string|object} [options] optional options
 * @param {string} [options.encoding='utf8'] encoding to use for filenames, if `'buffer'`, returns `Buffer` objects
 * @param {boolean} [options.withFileTypes=false] if true, returns `fs.Dirent` objects
 * @returns {string[]|Buffer[]|fs.Dirent[]}
 */


fs.readdirSync = (filepath, options) => {
  const file = getTiFileFromPathLikeValue(filepath);

  if (!file.exists()) {
    throw noSuchFile('scandir', filepath);
  }

  if (!file.isDirectory()) {
    throw notADirectory('scandir', filepath);
  }

  options = mergeDefaultOptions(options, {
    encoding: 'utf-8',
    withFileTypes: false });

  const listing = file.getDirectoryListing();

  if (options.withFileTypes === true) {
    // TODO: if options.withFileTypes === true, return fs.Dirent objects
    oneTimeWarning('fs.readdir\'s options.withFileTypes is unsupported by Titanium and strings will be returned');
  } else if (options.encoding === 'buffer') {
    return listing.map(name => Buffer.from(name));
  }

  return listing;
};
/**
 * @callback readFilePostOpenCallback
 * @param {Error} err - Error if one occurred
 * @param {Ti.Buffer} buffer
 */

/**
 * @param {integer} fileDescriptor file descriptor
 * @param {readFilePostOpenCallback} callback async callback
 */


function readFilePostOpen(fileDescriptor, callback) {
  callback = maybeCallback(callback);
  fs.fstat(fileDescriptor, (err, stats) => {
    if (err) {
      callback(err);
      return;
    }

    const fileSize = stats.size; // Create a Ti.Buffer to read into

    const buffer = Ti.createBuffer({
      length: fileSize });
    // Use Ti.Stream.readAll(sourceStream, buffer, callback) which spins off a separate thread to read in while loop!

    const sourceStream = streamForDescriptor(fileDescriptor);
    Ti.Stream.readAll(sourceStream, buffer, readAllObj => {
      if (!readAllObj.success) {
        callback(new Error(readAllObj.error));
        return;
      }

      callback(null, buffer);
    });
  });
}
/**
 * @callback readFileCallback
 * @param {Error} err - Error if one occurred
 * @param {string|Buffer} data
 */

/**
 * Asynchronously read entire contents of file
 * @param {string|Buffer|URL|integer} path filename or file descriptor
 * @param {object|string} [options] options
 * @param {string} [options.encoding=null] encoding to use
 * @param {string} [options.flag='r'] file system flag
 * @param {readFileCallback} callback async callback
 */


fs.readFile = (path, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {
      encoding: null,
      flag: 'r' };

  } else {
    options = mergeDefaultOptions(options, {
      encoding: null,
      flag: 'r' });

  }

  callback = maybeCallback(callback);
  const wasFileDescriptor = typeof path === 'number';
  let fileDescriptor = path; // may be overriden later

  /**
   * @param {Error} err possible Error
   * @param {Ti.Buffer} buffer Ti.Buffer instance
   */

  const handleBuffer = (err, buffer) => {
    if (err) {
      callback(err);
      return;
    } // fs.closeSync if it was not originally a file descriptor


    if (!wasFileDescriptor) {
      fs.closeSync(fileDescriptor);
    } // TODO: trim buffer if we didn't read full size?


    callback(null, encodeBuffer(options.encoding, buffer));
  };

  if (!wasFileDescriptor) {
    fs.open(path, options.flag, (err, fd) => {
      if (err) {
        callback(err);
        return;
      }

      fileDescriptor = fd;
      readFilePostOpen(fd, handleBuffer);
    });
  } else {
    readFilePostOpen(path, handleBuffer);
  }
};
/**
 * Returns the contents of the path.
 * @param {string|Buffer|URL|integer} path path to file
 * @param {object|string} [options] options
 * @param {string} [options.encoding=null] encoding to use
 * @param {string} [options.flag='r'] file system flag
 * @returns {string|Buffer} string if encoding is specified, otherwise Buffer
 */


fs.readFileSync = (path, options) => {
  options = mergeDefaultOptions(options, {
    encoding: null,
    flag: 'r' });

  const wasFileDescriptor = typeof path === 'number';
  const fileDescriptor = wasFileDescriptor ? path : fs.openSync(path, options.flag); // use default mode

  const tiFileStream = streamForDescriptor(fileDescriptor); // Just use our own API that reads full stream in

  const buffer = Ti.Stream.readAll(tiFileStream); // fs.closeSync if it was not originally a file descriptor

  if (!wasFileDescriptor) {
    fs.closeSync(fileDescriptor);
  } // TODO: trim buffer if we didn't read full size?


  return encodeBuffer(options.encoding, buffer);
}; // TODO: fs.readlink(path[, options], callback)
// TODO: fs.readlinkSync(path[, options])

/**
 * @callback realpathCallback
 * @param {Error} err - Error if one occurred
 * @param {string|Buffer} resolvedPath the resolved path
 */

/**
 * @param {string|Buffer|URL} filepath original filepath
 * @param {object} [options] optiosn object
 * @param {string} [options.encoding='utf8'] encoding used for returned object. If 'buffer", we'll return a Buffer in palce of a string
 * @param {realpathCallback} callback async callback
 */


fs.realpath = (filepath, options, callback) => {
  callback = maybeCallback(callback || options);
  options = mergeDefaultOptions(options, {
    encoding: 'utf8' });

  setTimeout(() => {
    // FIXME: This assumes no symlinks, which we really don't have full support for in our SDK anyways.
    const result = path.normalize(filepath);
    fs.exists(result, resultExists => {
      if (resultExists) {
        if (options.encoding === 'buffer') {
          return callback(null, Buffer.from(result));
        }

        return callback(null, result);
      } // this path doesn't exist, try each segment until we find first that doesn't


      const segments = result.split(path.sep); // FIXME: Drop last segment as we already know the full path doesn't exist?

      let partialFilePath = '';
      let index = 0; // handle typical case of empty first segment so we don't need to do an async setTimeout to get to first real case

      if (segments[index].length === 0) {
        index++;
      }

      setTimeout(tryPath, 1);

      function tryPath() {
        if (index >= segments.length) {
          // don't run past end of segments, throw error for resolved path
          return callback(noSuchFile(result));
        } // grab next segment


        const segment = segments[index++];

        if (segment.length === 0) {
          // if it's an empty segment...
          // try again at next index
          return setTimeout(tryPath, 1);
        } // normal case


        partialFilePath += path.sep + segment; // check if path up to this point exists...

        fs.exists(partialFilePath, partialExists => {
          if (!partialExists) {
            // nope, throw the Error
            return callback(noSuchFile('lstat', partialFilePath));
          } // try again at next depth of dir tree


          setTimeout(tryPath, 1);
        });
      }
    });
  }, 1);
};

fs.realpath.native = (path, options, callback) => {
  fs.realpath(path, options, callback);
};
/**
 * @param {string|Buffer|URL} filepath original filepath
 * @param {object} [options] options object
 * @param {string} [options.encoding='utf8'] encoding used for returned object. If 'buffer", we'll return a Buffer in palce of a string
 * @returns {string|Buffer}
 */


fs.realpathSync = (filepath, options) => {
  options = mergeDefaultOptions(options, {
    encoding: 'utf8' });
  // FIXME: This assumes no symlinks, which we really don't have full support for in our SDK anyways.

  const result = path.normalize(filepath);

  if (!fs.existsSync(result)) {
    // this path doesn't exist, try each segment until we find first that doesn't
    const segments = result.split(path.sep);
    let partialFilePath = '';

    for (const segment of segments) {
      if (segment.length === 0) {
        continue;
      }

      partialFilePath += path.sep + segment;

      if (!fs.existsSync(partialFilePath)) {
        throw noSuchFile('lstat', partialFilePath);
      }
    }
  }

  if (options.encoding === 'buffer') {
    return Buffer.from(result);
  }

  return result;
};

fs.realpathSync.native = (path, options) => {
  fs.realpathSync(path, options);
};
/**
 * @param {string|Buffer|URL} oldPath source filepath
 * @param {string|Buffer|URL} newPath destination filepath
 * @param {errorCallback} callback async callback
 */


fs.rename = (oldPath, newPath, callback) => {
  callback = maybeCallback(callback);
  setTimeout(() => {
    try {
      fs.renameSync(oldPath, newPath);
    } catch (e) {
      callback(e);
      return;
    }

    callback();
  }, 1);
};
/**
 * @param {string|Buffer|URL} oldPath source filepath
 * @param {string|Buffer|URL} newPath destination filepath
 */


fs.renameSync = (oldPath, newPath) => {
  const tiFile = getTiFileFromPathLikeValue(oldPath); // src doesn't actually exist?

  if (!tiFile.exists()) {
    const err = noSuchFile('rename', oldPath);
    err.message = `${err.message} -> '${newPath}'`;
    err.dest = newPath;
    throw err;
  }

  const destFile = getTiFileFromPathLikeValue(newPath);

  if (destFile.isDirectory()) {
    // dest is a directory that already exists
    const err = illegalOperationOnADirectory('rename', oldPath);
    err.message = `${err.message} -> '${newPath}'`;
    err.dest = newPath;
    throw err;
  }

  let tempPath;

  if (destFile.isFile()) {
    // destination file exists, we should overwrite
    // Our APIs will fail if we try, so first let's make a backup copy and delete the the original
    tempPath = path.join(fs.mkdtempSync(path.join(Ti.Filesystem.tempDirectory, 'rename-')), path.basename(newPath));
    destFile.move(tempPath);
  }

  let success = false;

  try {
    success = tiFile.move(newPath);
  } finally {
    if (tempPath) {
      // we temporarily copied the existing destination to back it up...
      if (success) {
        // move worked, so we can wipe it away whenever...
        fs.unlink(tempPath, _err => {});
      } else {
        // move it back, because we failed!
        const tmpFile = getTiFileFromPathLikeValue(tempPath);
        tmpFile.move(newPath);
      }
    }
  }
};
/**
 * @param {string|Buffer|URL} path file path
 * @param {errorCallback} callback async callback
 */


fs.rmdir = (path, callback) => {
  callback = maybeCallback(callback);
  setTimeout(() => {
    try {
      fs.rmdirSync(path);
    } catch (e) {
      callback(e);
      return;
    }

    callback();
  }, 1);
};
/**
 * @param {string|Buffer|URL} path file path
 */


fs.rmdirSync = path => {
  const tiFile = getTiFileFromPathLikeValue(path);

  if (!tiFile.deleteDirectory(false)) {
    // do not delete contents!
    // we failed to delete, but why?
    // does it exist?
    if (!tiFile.exists()) {
      throw noSuchFile('rmdir', path);
    } // is it a file?


    if (tiFile.isFile()) {
      throw notADirectory('rmdir', path);
    } // is it not empty?


    const subFiles = tiFile.getDirectoryListing();

    if (subFiles && subFiles.length > 0) {
      throw directoryNotEmpty('rmdir', path);
    }
  }
};
/**
 * @param {string|Buffer|URL} path file path
 * @param {object} [options] options
 * @param {boolean} [options.bigint] whether stat values should be bigint
 * @param {statsCallback} callback async callback
 */


fs.stat = (path, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  callback = maybeCallback(callback);
  setTimeout(() => {
    callback(null, new fs.Stats(path));
  }, 1);
};
/**
 * @param {string|Buffer|URL|integer} path filepath or file descriptor
 * @param {object} [_options] options
 * @param {boolean} [_options.bigint] whether stat values should be bigint
 * @returns {fs.Stats}
 */


fs.statSync = (path, _options) => new fs.Stats(path);

fs.symlink = (target, path, type, callback) => asyncUnsupportedNoop('fs', 'symlink', callback);

fs.symlinkSync = unsupportedNoop('fs', 'symlinkSync');
/**
 * @param {string} path file path
 * @param {integer} [len=0] bytes to trim to
 * @param {errorCallback} callback async callback
 */

fs.truncate = (path, len, callback) => {
  callback = maybeCallback(callback || len);

  if (typeof len !== 'number') {
    len = 0;
  }

  if (len <= 0) {
    fs.writeFile(path, '', callback); // empty the file

    return;
  } // we have to retain some of the file!
  // yuck, so let's read what we need to retain, then overwrite file with it


  fs.open(path, (err, fd) => {
    if (err) {
      return callback(err);
    }

    const buffer = Buffer.alloc(len);
    fs.read(fd, buffer, 0, len, null, (err, bytesRead, buffer) => {
      if (err) {
        fs.closeSync(fd);
        return callback(err);
      }

      fs.close(fd, err => {
        if (err) {
          return callback(err);
        }

        fs.writeFile(path, buffer, callback);
      });
    });
  });
};
/**
 * @param {string} path file path
 * @param {integer} [len=0] bytes to trim to
 */


fs.truncateSync = (path, len = 0) => {
  if (len <= 0) {
    // empty the file
    fs.writeFileSync(path, '');
    return;
  } // we have to retain some of the file!
  // yuck, so let's read what we need to retain, then overwrite file with it


  const fd = fs.openSync(path);
  const buffer = Buffer.alloc(len);
  fs.readSync(fd, buffer, 0, len, null);
  fs.closeSync(fd);
  fs.writeFileSync(path, buffer);
};
/**
 * @param {string|Buffer|URL} path file path
 * @param {errorCallback} callback async callback
 */


fs.unlink = (path, callback) => {
  callback = maybeCallback(callback);
  setTimeout(() => {
    try {
      fs.unlinkSync(path);
    } catch (err) {
      callback(err);
      return;
    }

    callback();
  }, 1);
};
/**
 * @param {string|Buffer|URL} path file path
 * @returns {undefined}
 */


fs.unlinkSync = path => {
  const tiFile = getTiFileFromPathLikeValue(path);

  if (!tiFile.deleteFile()) {
    // we failed, but why?
    if (!tiFile.exists()) {
      throw noSuchFile('unlink', path);
    }

    if (tiFile.isDirectory()) {
      throw illegalOperationOnADirectory('unlink', path);
    }
  }
};

fs.unwatchFile = unsupportedNoop('fs', 'unwatchFile');

fs.utimes = (path, atime, mtime, callback) => asyncUnsupportedNoop('fs', 'utimes', callback);

fs.utimesSync = unsupportedNoop('fs', 'utimesSync');
fs.watch = unsupportedNoop('fs', 'watch');
fs.watchFile = unsupportedNoop('fs', 'watchFile');
/**
 * @param {string|Buffer|URL|integer} file file path or descriptor
 * @param {string|Buffer|TypedArray|DataView} data data to write
 * @param {object|string} [options] options, encoding if string
 * @param {string|null} [options.encoding='utf-8'] options
 * @param {object} [options.mode=0o666] options
 * @param {object} [options.flag='w'] options
 * @param {errorCallback} callback async callback
 */

fs.writeFile = (file, data, options, callback) => {
  callback = maybeCallback(callback || options);
  options = mergeDefaultOptions(options, {
    encoding: 'utf8',
    mode: 0o666,
    flag: 'w' });
  // Turn into file descriptor

  const wasFileDescriptor = typeof file === 'number';
  let fileDescriptor = file; // may be overriden later

  const finish = err => {
    if (err) {
      callback(err);
      return;
    }

    if (wasFileDescriptor) {
      callback();
      return;
    } // fs.close if it was not originally a file descriptor


    fs.close(fileDescriptor, callback);
  };

  if (!wasFileDescriptor) {
    fs.open(file, options.flag, options.mode, (err, fd) => {
      if (err) {
        callback(err);
        return;
      }

      fileDescriptor = fd;
      fs.write(fileDescriptor, data, finish);
    });
  } else {
    fs.write(fileDescriptor, data, finish);
  }
};
/**
 * @param {string|Buffer|URL|integer} file file path or descriptor
 * @param {string|Buffer|TypedArray|DataView} data data to write
 * @param {object|string} [options] options, encoding if string
 * @param {string} [options.encoding='utf-8'] options
 * @param {object} [options.mode=0o666] options
 * @param {object} [options.flag='w'] options
 */


fs.writeFileSync = (file, data, options) => {
  options = mergeDefaultOptions(options, {
    encoding: 'utf8',
    mode: 0o666,
    flag: 'w' });
  // Turn into file descriptor

  const wasFileDescriptor = typeof file === 'number';
  const fileDescriptor = wasFileDescriptor ? file : fs.openSync(file, options.flag, options.mode); // if data is a string, make it a buffer first

  if (!Buffer.isBuffer(data)) {
    data = Buffer.from('' + data, options.encoding); // force data to be a string, handles case where it's undefined and writes 'undefined' to file!
  }

  fs.writeSync(fileDescriptor, data); // close if user didn't give us file descriptor

  if (!wasFileDescriptor) {
    fs.closeSync(fileDescriptor);
  }
};
/**
 * @callback writeTiFileStreamCallback
 * @param {Error} err - Error if one occurred
 * @param {integer} written - bytes written
 */

/**
 * @param {Ti.Filesystem.FileStream} tiFileStream file stream
 * @param {Buffer} buffer buffer we're writing
 * @param {writeTiFileStreamCallback} callback async callback
 */


function writeTiFileStream(tiFileStream, buffer, callback) {
  callback = maybeCallback(callback);
  Ti.Stream.write(tiFileStream, buffer.toTiBuffer(), writeObj => {
    if (!writeObj.success) {
      callback(new Error(writeObj.error));
      return;
    }

    callback(null, writeObj.bytesProcessed);
  });
}
/**
 * @param {integer} fd file descriptor
 * @param {string|Buffer} buffer contents to write: Buffer or string
 * @param {integer} [offset] offset within Buffer to write; OR offset from the beginning of the file where this data should be written (if string)
 * @param {string|integer} [length] length of bytes to write if Buffer; OR expected string encoding
 * @param {writeCallback|integer} [position] offset from the beginning of the file where this data should be written (if Buffer); OR async callback if string
 * @param {writeCallback} [callback] async callback (if Buffer)
 */


fs.write = (fd, buffer, offset, length, position, callback) => {
  const isBuffer = Buffer.isBuffer(buffer);

  if (isBuffer) {
    writeBuffer(fd, buffer, offset, length, position, callback);
  } else {
    writeString(fd, buffer, offset, length, position);
  }
};
/**
 * @param {integer} fd file descriptor
 * @param {string|Buffer} buffer contents to write
 * @param {integer} [offset] offset from the beginning of the file where this data should be written
 * @param {string|integer} [length]  expected string encoding
 * @param {integer} [position] position
 * @returns {integer} number of bytes written
 */


fs.writeSync = (fd, buffer, offset, length, position) => {
  const isBuffer = Buffer.isBuffer(buffer);

  if (isBuffer) {
    return writeBufferSync(fd, buffer, offset, length);
  }

  return writeStringSync(fd, buffer, offset, length);
}; // TODO: Add FileHandle class to match Node's wrapper for file descriptors. Re-purpose our own wrapper?
// TODO: Add the fs.promises API!
// TODO: Define fs.Dirent class, which can simply wrap a Ti.Filesystem.File (and is very similar to fs.Stats!)
// Helper functions
// --------------------------------------------------------

/**
 * Tracks the pairing of the number we use to represent the file externally, the filepath it's pointing at, and the stream pointing at it.
 */


class FileDescriptor {
  constructor(number, path, stream) {
    this.path = path;
    this.number = number;
    this.stream = stream;
  }}


/**
 * @param {Ti.IOStream} srcStream input stream we're reading from
 * @param {Ti.IOStream} destStream output stream we're writing to
 * @param {errorCallback} callback async callback
 */


function pipe(srcStream, destStream, callback) {
  {
    // Android is probably better off with Ti.Stream.writeStream, less overhead back and forth the bridge
    // Though Android does support the Ti.Stream.pump/Ti.Stream.write pattern using both APIs async
    pipeViaWriteStream(srcStream, destStream, callback);
    return;
  } // iOS has some... issues with writeStream calling the callback every iteration of the loop *and* at the end
}
/**
 * @param {Ti.IOStream} srcStream input stream we're reading from
 * @param {Ti.IOStream} destStream output stream we're writing to
 * @param {errorCallback} callback async callback
 */


function pipeViaWriteStream(srcStream, destStream, callback) {
  Ti.Stream.writeStream(srcStream, destStream, COPY_FILE_CHUNK_SIZE, result => {
    if (!result.success) {
      return callback(new Error(result.error));
    } // Android will only call this at the end or error, so we can safely assume we're done here.
    // iOS will call per loop iteration, see https://jira.appcelerator.org/browse/TIMOB-27320


    callback();
  });
}
/**
 * @param {string|Buffer|URL} path file path
 * @param {Ti.Filesystem.FileStream} fileStream file stream
 * @returns {integer} file descriptor
 */


function createFileDescriptor(path, fileStream) {
  const pointer = fileDescriptorCount++; // increment global counter

  const fd = new FileDescriptor(pointer, path, fileStream);
  fileDescriptors.set(pointer, fd); // use it to refer to this file stream as the "descriptor"

  return pointer;
}
/**
 * @param {integer} fd file descriptor
 * @returns {Ti.Filesystem.FileStream} matching stream
 */


function streamForDescriptor(fd) {
  const wrapper = fileDescriptors.get(fd);
  return wrapper.stream;
}
/**
 * @param {integer} fd file descriptor
 * @returns {string} matching stream
 */


function pathForFileDescriptor(fd) {
  const wrapper = fileDescriptors.get(fd);
  return wrapper.path;
}
/**
 * Used to merge the user-supplied options with the defaults for a function. Special cases a string to be encoding.
 * @param {*} options user-supplied options
 * @param {object} defaults defaults to use
 * @return {object}
 */


function mergeDefaultOptions(options, defaults) {
  if (options === null) {
    return defaults;
  }

  const optionsType = typeof options;

  switch (optionsType) {
    case 'undefined':
    case 'function':
      return defaults;

    case 'string':
      // Use copy of defaults but with encoding set to the 'options' value!
      const merged = Object.assign({}, defaults);
      merged.encoding = options;
      return merged;

    case 'object':
      return options;

    default:
      assertArgumentType(options, 'options', 'object');
      return null;
    // should never get reached
  }
}
/**
 * Enforces that we have a valid callback function. Throws TypeError if not.
 * @param {*} cb possible callback function
 * @returns {Function}
 * @throws {TypeError}
 */


function maybeCallback(cb) {
  if (typeof cb === 'function') {
    return cb;
  }

  const err = new TypeError(`Callback must be a function. Received ${cb}`);
  err.code = 'ERR_INVALID_CALLBACK';
  throw err;
}
/**
 * returns randomly generated characters of given length 1-16
 * @param {integer} length 1 - 16
 * @param {string} [_encoding='utf8'] encoding of the string generated
 * @returns {string}
 */


function randomCharacters(length, _encoding = 'utf8') {
  // FIXME: use the encoding specified!
  return (Math.random().toString(36) + '00000000000000000').slice(2, length + 2);
}

function makeError(code, message, errno, syscall, path) {
  const error = new Error(`${code}: ${message}, ${syscall} '${path}'`);
  error.errno = errno;
  error.syscall = syscall;
  error.code = code;
  error.path = path;
  return error;
}
/**
 * @param {string} encoding what we're encoding to
 * @param {Ti.Buffer} tiBuffer Ti.Buffer instance
 * @returns {Buffer} node-compatible Buffer instance
 */


function encodeBuffer(encoding, tiBuffer) {
  switch (encoding) {
    case 'buffer':
    case null:
    case undefined:
      // In this case we're always reading a file into a Ti.Buffer
      // Wrapping Ti.Buffer is super-slow and should really only be if we're going to write to it
      // Go the faster path by converting to ArrayBuffer and wrapping that
      // TODO: Explicitly release the blob after conversion?
      return Buffer.from(tiBuffer.toBlob().toArrayBuffer());

    default:
      // here' were converting to a string based on encoding. Internally our faster Buffer impl still delegates to Ti.Buffer in most cases
      // so I don't think there's much benefit from converting to ArrayBuffer first
      return Buffer.from(tiBuffer).toString(encoding);}

}
/**
 * @param {string|Buffer|URL} path file path
 * @return {Ti.Filesystem.File}
 */


function getTiFileFromPathLikeValue(path) {
  // This is a hack that is likely to work in most cases?
  // Basically assumes Buffer is holding a utf-8 string filename/path
  // Node just copies the bytes from the buffer as-is on the native side and adds a null terminator
  if (Buffer.isBuffer(path)) {
    path = path.toString(); // assumes utf-8 string
  } // FIXME: Handle URLs! We don't have an URL shim yet, so no way to handle those yet


  assertArgumentType(path, 'path', 'string');
  return Ti.Filesystem.getFile(path);
}
/**
 * @callback writeBufferCallback
 * @param {Error} err - Error if one occurred
 * @param {integer} written - bytes written
 * @param {Buffer} buffer - original Buffer being written
 */

/**
 * @param {integer} fd file descriptor
 * @param {Buffer} buffer contents to write
 * @param {integer} [offset] offset within Buffer to write
 * @param {integer} [length] length of bytes to write if Buffer
 * @param {integer} [position] offset from the beginning of the file where this data should be written
 * @param {writeBufferCallback} callback async callback
 */


function writeBuffer(fd, buffer, offset, length, position, callback) {
  callback = maybeCallback(callback || position || length || offset);

  if (typeof offset !== 'number') {
    offset = 0;
  }

  if (typeof length !== 'number') {
    length = buffer.length - offset;
  }

  if (typeof position !== 'number') {
    position = null;
  } // ok now what?


  const tiFileStream = streamForDescriptor(fd); // Make use of the buffer slice that's specified by offset/length

  if (offset !== 0 || length !== buffer.length) {
    buffer = buffer.slice(offset, length);
  } // TODO: Support use of position argument. I assume we'd need a way to add a method to move to stream position somehow


  writeTiFileStream(tiFileStream, buffer, (err, bytesProcessed) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null, bytesProcessed, buffer);
  });
}
/**
 * @param {integer} fd file descriptor
 * @param {Buffer} buffer contents to write
 * @param {integer} [offset] offset within Buffer to write
 * @param {integer} [length] length of bytes to write if Buffer
 * @param {integer} [position] offset from the beginning of the file where this data should be written
 * @returns {integer} number of bytes written
 */


function writeBufferSync(fd, buffer, offset, length, position) {
  if (typeof offset !== 'number') {
    offset = 0;
  }

  if (typeof length !== 'number') {
    length = buffer.length - offset;
  }


  const tiFileStream = streamForDescriptor(fd); // Make use of the buffer slice that's specified by offset/length

  if (offset !== 0 || length !== buffer.length) {
    buffer = buffer.slice(offset, length);
  } // TODO: Support use of position argument. I assume we'd need a way to add a method to move to stream position somehow


  return tiFileStream.write(buffer.toTiBuffer());
}
/**
 * @callback writeStringCallback
 * @param {Error} err - Error if one occurred
 * @param {integer} written - bytes written
 * @param {string} string - original string being written
 */

/**
 * @param {integer} fd file descriptor
 * @param {string} string contents to write
 * @param {integer} [position] offset from the beginning of the file where this data should be written
 * @param {string} [encoding='utf8'] expected string encoding
 * @param {writeStringCallback} [callback] async callback
 */


function writeString(fd, string, position, encoding, callback) {
  callback = maybeCallback(callback || encoding || position); // position could be: number, function (callback)

  if (typeof position !== 'number') {
    position = null;
  } // encoding could be: function (callback) or string


  if (typeof encoding !== 'string') {
    encoding = 'utf8';
  }

  const tiFileStream = streamForDescriptor(fd);
  string += ''; // coerce to string

  const buffer = Buffer.from(string, encoding); // TODO: Support use of position argument. I assume we'd need a way to add a method to move to stream position somehow

  writeTiFileStream(tiFileStream, buffer, (err, bytesProcessed) => {
    if (err) {
      callback(err);
      return;
    }

    callback(null, bytesProcessed, string);
  });
}
/**
 * @param {integer} fd file descriptor
 * @param {string} string contents to write
 * @param {integer} [position] offset from the beginning of the file where this data should be written
 * @param {string} [encoding='utf8'] expected string encoding
 * @returns {integer} number of bytes written
 */


function writeStringSync(fd, string, position, encoding) {

  if (typeof encoding !== 'string') {
    encoding = 'utf8';
  }

  const tiFileStream = streamForDescriptor(fd);
  string += ''; // coerce to string

  const buffer = Buffer.from(string, encoding); // TODO: Support use of position argument. I assume we'd need a way to add a method to move to stream position somehow

  return tiFileStream.write(buffer.toTiBuffer());
}

function Stream(_opts) {
  // FIXME: Can't call EventEmitter as a function!
  this._eventsToListeners = {};
  this._maxListeners = undefined; // EventEmitter.call(this, opts);
  // TODO: Provide more than an empty class?
}

Object.setPrototypeOf(Stream.prototype, EventEmitter.prototype);
Object.setPrototypeOf(Stream, EventEmitter); // Use util.inherits?

function Readable(options) {
  if (!(this instanceof Readable)) {
    return new Readable(options);
  } // TODO: readableState?


  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') {
      this._read = options.read;
    }

    if (typeof options.destroy === 'function') {
      this._destroy = options.destroy;
    }
  }

  Stream.call(this);
}

util.inherits(Readable, Stream);

Readable.prototype._destroy = function (err, cb) {
  cb(err);
};

Readable.prototype._read = function (_n) {
  throw new Error('method not implemented: _read()');
};

function Writable(options) {
  const isDuplex = this instanceof Duplex;

  if (!isDuplex && !(this instanceof Writable)) {
    return new Writable(options);
  }

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') {
      this._write = options.write;
    }

    if (typeof options.writev === 'function') {
      this._writev = options.writev;
    }

    if (typeof options.destroy === 'function') {
      this._destroy = options.destroy;
    }

    if (typeof options.final === 'function') {
      this._final = options.final;
    }
  }

  Stream.call(this);
}

util.inherits(Writable, Stream);

function Duplex(options) {
  if (!(this instanceof Duplex)) {
    return new Duplex(options);
  }

  Readable.call(this, options);
  Writable.call(this, options); // TODO: Provide more than an empty class!

  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) {
      this.readable = false;
    }

    if (options.writable === false) {
      this.writable = false;
    }

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false; // this.once('end', onend);
    }
  }
}

util.inherits(Duplex, Readable); // Copy Writable methods to Duplex (basically the odd double-inheritance)

const writableMethods = Object.keys(Writable.prototype);

for (let i = 0; i < writableMethods.length; i++) {
  const method = writableMethods;

  if (!Duplex.prototype[method]) {
    Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) {
    return new Transform(options);
  }

  Duplex.call(this, options); // TODO: Provide more than an empty class!

  if (options) {
    if (typeof options.transform === 'function') {
      this._transform = options.transform;
    }

    if (typeof options.flush === 'function') {
      this._flush = options.flush;
    }
  } // When the writable side finishes, then flush out anything remaining.
  // this.on('prefinish', prefinish);

}

util.inherits(Transform, Duplex);
Stream.Stream = Stream; // legacy compat

Stream.Transform = Transform;
Stream.Readable = Readable;
Stream.Writable = Writable;
Stream.Duplex = Duplex; // Stream.PassThrough = PassThrough;

// Load all the node compatible core modules
register('path', path);
register('os', OS);
register('tty', tty);
register('util', util);
register('assert', assert$1);
register('events', EventEmitter);
register('buffer', BufferModule);
register('string_decoder', StringDecoder$1);
register('fs', fs);
register('stream', Stream); // Register require('buffer').Buffer as global

global.Buffer = BufferModule.Buffer;

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2018 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * Description:
 * This script loads all JavaScript files ending with the name "*.bootstrap.js" and then executes them.
 * The main intention of this feature is to allow JavaScript files to kick-off functionality or
 * display UI to the end-user before the "app.js" gets loaded. This feature is the CommonJS
 * equivalent to Titanium's Android module onAppCreate() or iOS module load() features.
 *
 * Use-Cases:
 * - Automatically kick-off analytics functionality on app startup.
 * - Ensure "Google Play Services" is installed/updated on app startup on Android.
 */

/**
 * Attempts to load all bootstraps from a "bootstrap.json" file created by the app build system.
 * This is an optional feature and is the fastest method of acquiring boostraps configured for the app.
 * This JSON file, if provided, must be in the same directory as this script.
 * @returns {string[]}
 * Returns an array of require() compatible strings if bootstraps were successfully loaded from JSON.
 * Returns an empty array if JSON file was found, but no bootstraps were configured for the app.
 * Returns null if JSON file was not found.
 */
function fetchScriptsFromJson() {
  const JSON_FILE_NAME = 'bootstrap.json';

  try {
    const jsonFile = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, `ti.internal/${JSON_FILE_NAME}`);

    if (jsonFile.exists()) {
      const settings = JSON.parse(jsonFile.read().text);

      if (Array.isArray(settings.scripts)) {
        return settings.scripts;
      }

      return [];
    }
  } catch (error) {
    Ti.API.error(`Failed to read "${JSON_FILE_NAME}". Reason: ${error.message}`);
  }

  return null;
}
/**
 * Recursively searches the "Resources" directory for all "*.bootstrap.js" files.
 * @returns {Array.<string>}
 * Returns an array of require() compatible strings for each bootstrap found in the search.
 * Returns an empty array if no bootstrap files were found.
 */


function fetchScriptsFromResourcesDirectory() {
  const resourceDirectory = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory);
  const resourceDirectoryPathLength = resourceDirectory.nativePath.length;
  const bootstrapScripts = [];

  function loadFrom(file) {
    if (file) {
      if (file.isDirectory()) {
        // This is a directory. Recursively look for bootstrap files under it.
        const fileNameArray = file.getDirectoryListing();

        if (fileNameArray) {
          for (let index = 0; index < fileNameArray.length; index++) {
            loadFrom(Ti.Filesystem.getFile(file.nativePath, fileNameArray[index]));
          }
        }
      } else if (file.name.search(/.bootstrap.js$/) >= 0) {
        // This is a bootstrap file.
        // Convert its path to something loadable via require() and add it to the array.
        let bootstrapPath = file.nativePath;
        bootstrapPath = bootstrapPath.substr(resourceDirectoryPathLength, bootstrapPath.length - resourceDirectoryPathLength - '.js'.length);
        bootstrapScripts.push(bootstrapPath);
      }
    }
  }

  loadFrom(resourceDirectory);
  return bootstrapScripts;
}
/**
 * Non-blocking function which loads and executes all bootstrap scripts configured for the app.
 * @param {function} finished Callback to be invoked once all bootstraps have finished executing. Cannot be null.
 */


function loadAsync(finished) {
  // Acquire an array of all bootstrap scripts included with the app.
  // - For best performance, attempt to fetch scripts via an optional JSON file created by the build system.
  // - If JSON file not found (will return null), then search "Resources" directory for bootstrap files.
  let bootstrapScripts = fetchScriptsFromJson();

  if (!bootstrapScripts) {
    bootstrapScripts = fetchScriptsFromResourcesDirectory();
  } // Do not continue if no bootstraps were found.


  if (!bootstrapScripts || bootstrapScripts.length <= 0) {
    finished();
    return;
  } // Sort the bootstraps so that they'll be loaded in a consistent order between platforms.


  bootstrapScripts.sort(); // Loads all bootstrap scripts found.

  function loadBootstrapScripts(finished) {
    let bootstrapIndex = 0;

    function doLoad() {
      // Attempt to load all bootstrap scripts.
      while (bootstrapIndex < bootstrapScripts.length) {
        // Load the next bootstrap.
        const fileName = bootstrapScripts[bootstrapIndex];

        const bootstrap = require(fileName); // eslint-disable-line security/detect-non-literal-require
        // Invoke the bootstrap's execute() method if it has one. (This is optional.)
        // We must wait for the given callback to be invoked before loading the next script.
        // Note: This is expected to be used to display UI to the end-user.


        if (bootstrap.execute) {
          bootstrap.execute(onBootstrapExecutionFinished);
          return;
        } // We're done with the current bootstrap. Time to load the next one.


        bootstrapIndex++;
      } // Invoke given callback to inform caller that all loading is done.


      finished();
    }

    function onBootstrapExecutionFinished() {
      // Last bootstrap has finished execution. Time to load the next one.
      // Note: Add a tiny delay so whatever UI the last bootstrap loaded has time to close.
      bootstrapIndex++;
      setTimeout(() => doLoad(), 1);
    }

    doLoad();
  } // We've finished loading/executing all bootstrap scripts.
  // Inform caller by invoking the callback given to loadAsync().


  loadBootstrapScripts(finished);
}

/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2018 by Axway, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * This script is loaded on app startup on all platforms. It is used to do the following:
 * - Provide consistent startup behavior between platforms, such as logging Titanium version.
 * - Load Titanium's core JavaScript extensions shared by all platforms.
 * - Provide "*.bootstrap.js" script support. (Similar to native module onAppCreate()/load() support.)
 * - Load the app developer's main "app.js" script after doing all of the above.
 */

Ti.API.info(`${Ti.App.name} ${Ti.App.version} (Powered by Titanium ${"9.3.2"}.${"f5f8f67867"})`); // Load JS language polyfills
loadAsync(function () {
  // We've finished loading/executing all bootstrap scripts.
  // We can now proceed to run the main "app.js" script.
  require('./app'); // This event is to be fired after "app.js" execution. Reasons:
  // - Allow system to queue startup related events until "app.js" has had a chance to add listeners.
  // - For Alloy apps, we now know that Alloy has been initialized and its globals were added.


  Ti.App.fireEvent('started');
});