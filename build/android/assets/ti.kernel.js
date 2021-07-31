(function () {
  'use strict';

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


  function join(separator, paths) {
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
      resolved = (global.process ? process.cwd() : '/') + separator + resolved;
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


  function format(separator, pathObject) {
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
      return join(this.sep, paths);
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
      return format(this.sep, pathObject);
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
      return join(this.sep, paths);
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
      return format(this.sep, pathObject);
    },
    toNamespacedPath: function (filepath) {
      return filepath; // no-op
    } };

  const path = PosixPath;
  path.win32 = Win32Path;
  path.posix = PosixPath;

  /**
   * Appcelerator Titanium Mobile
   * Copyright (c) 2011-Present by Appcelerator, Inc. All Rights Reserved.
   * Licensed under the terms of the Apache Public License
   * Please see the LICENSE included with this distribution for details.
   */

  /**
   * Generates a wrapped invoker function for a specific API
   * This lets us pass in context-specific data to a function
   * defined in an API namespace (i.e. on a module)
   *
   * We use this for create methods, and other APIs that take
   * a KrollInvocation object as their first argument in Java
   *
   * For example, an invoker for a "create" method might look
   * something like this:
   *
   *     function createView(sourceUrl, options) {
   *         var view = new View(options);
   *         view.sourceUrl = sourceUrl;
   *         return view;
   *     }
   *
   * And the corresponding invoker for app.js would look like:
   *
   *     UI.createView = function() {
   *         return createView("app://app.js", arguments[0]);
   *     }
   *
   * wrapperAPI: The scope specific API (module) wrapper
   * realAPI: The actual module implementation
   * apiName: The top level API name of the root module
   * invocationAPI: The actual API to generate an invoker for
   * scopeVars: A map that is passed into each invoker
   */

  /**
   * @param {object} wrapperAPI e.g. TitaniumWrapper
   * @param {object} realAPI e.g. Titanium
   * @param {string} apiName e.g. 'Titanium'
   * @param {object} invocationAPI details on the api we're wrapping
   * @param {string} invocationAPI.namespace the namespace of the proxy where method hangs (w/o 'Ti.' prefix) e.g. 'Filesystem' or 'UI.Android'
   * @param {string} invocationAPI.api the method name e.g. 'openFile' or 'createSearchView'
   * @param {object} scopeVars holder for context specific values (basically just wraps sourceUrl)
   * @param {string} scopeVars.sourceUrl source URL of js file entry point
   * @param {Module} [scopeVars.module] module
   */
  function genInvoker(wrapperAPI, realAPI, apiName, invocationAPI, scopeVars) {
    let apiNamespace = wrapperAPI;
    const namespace = invocationAPI.namespace;

    if (namespace !== apiName) {
      const names = namespace.split('.');

      for (const name of names) {
        let api; // Create a module wrapper only if it hasn't been wrapped already.

        if (Object.prototype.hasOwnProperty.call(apiNamespace, name)) {
          api = apiNamespace[name];
        } else {
          function SandboxAPI() {
            const proto = Object.getPrototypeOf(this);
            Object.defineProperty(this, '_events', {
              get: function () {
                return proto._events;
              },
              set: function (value) {
                proto._events = value;
              } });

          }

          SandboxAPI.prototype = apiNamespace[name];
          api = new SandboxAPI();
          apiNamespace[name] = api;
        }

        apiNamespace = api;
        realAPI = realAPI[name];
      }
    }

    let delegate = realAPI[invocationAPI.api]; // These invokers form a call hierarchy so we need to
    // provide a way back to the actual root Titanium / actual impl.

    while (delegate.__delegate__) {
      delegate = delegate.__delegate__;
    }

    apiNamespace[invocationAPI.api] = createInvoker(realAPI, delegate, scopeVars);
  }

  var genInvoker_1 = genInvoker;
  /**
   * Creates and returns a single invoker function that wraps
   * a delegate function, thisObj, and scopeVars
   * @param {object} thisObj The `this` object to use when invoking the `delegate` function
   * @param {function} delegate The function to wrap/delegate to under the hood
   * @param {object} scopeVars The scope variables to splice into the arguments when calling the delegate
   * @param {string} scopeVars.sourceUrl the only real relevent scope variable!
   * @return {function}
   */

  function createInvoker(thisObj, delegate, scopeVars) {
    const urlInvoker = function invoker(...args) {
      // eslint-disable-line func-style
      args.splice(0, 0, invoker.__scopeVars__);
      return delegate.apply(invoker.__thisObj__, args);
    };

    urlInvoker.__delegate__ = delegate;
    urlInvoker.__thisObj__ = thisObj;
    urlInvoker.__scopeVars__ = scopeVars;
    return urlInvoker;
  }

  var createInvoker_1 = createInvoker;
  var invoker = {
    genInvoker: genInvoker_1,
    createInvoker: createInvoker_1 };


  /**
   * Appcelerator Titanium Mobile
   * Copyright (c) 2011-Present by Appcelerator, Inc. All Rights Reserved.
   * Licensed under the terms of the Apache Public License
   * Please see the LICENSE included with this distribution for details.
   */

  function bootstrap$2(global, kroll) {
    const assets = kroll.binding('assets');
    const Script = kroll.binding('evals').Script;
    /**
     * The loaded index.json file from the app. Used to store the encrypted JS assets'
     * filenames/offsets.
     */

    let fileIndex; // FIXME: fix file name parity between platforms

    const INDEX_JSON = 'index.json';

    class Module {
      /**
       * [Module description]
       * @param {string} id      module id
       * @param {Module} parent  parent module
       */
      constructor(id, parent) {
        this.id = id;
        this.exports = {};
        this.parent = parent;
        this.filename = null;
        this.loaded = false;
        this.wrapperCache = {};
        this.isService = false; // toggled on if this module is the service entry point
      }
      /**
       * Attempts to load the module. If no file is found
       * with the provided name an exception will be thrown.
       * Once the contents of the file are read, it is run
       * in the current context. A sandbox is created by
       * executing the code inside a wrapper function.
       * This provides a speed boost vs creating a new context.
       *
       * @param  {String} filename [description]
       * @param  {String} source   [description]
       * @returns {void}
       */


      load(filename, source) {
        if (this.loaded) {
          throw new Error('Module already loaded.');
        }

        this.filename = filename;
        this.path = path.dirname(filename);
        this.paths = this.nodeModulesPaths(this.path);

        if (!source) {
          source = assets.readAsset(`Resources${filename}`);
        } // Stick it in the cache


        Module.cache[this.filename] = this;

        this._runScript(source, this.filename);

        this.loaded = true;
      }
      /**
       * Generates a context-specific module wrapper, and wraps
       * each invocation API in an external (3rd party) module
       * See invoker.js for more info
       * @param  {object} externalModule native module proxy
       * @param  {string} sourceUrl      the current js file url
       * @return {object}                wrapper around the externalModule
       */


      createModuleWrapper(externalModule, sourceUrl) {
        // The module wrapper forwards on using the original as a prototype
        function ModuleWrapper() {}

        ModuleWrapper.prototype = externalModule;
        const wrapper = new ModuleWrapper();

        {
          // Android-specific portion!
          // Here we take the APIs defined in the bootstrap.js
          // and effectively lazily hook them
          // We explicitly guard the code so iOS doesn't even use/include the referenced invoker.js import
          const invocationAPIs = externalModule.invocationAPIs || [];

          for (const api of invocationAPIs) {
            const delegate = externalModule[api];

            if (!delegate) {
              continue;
            }

            wrapper[api] = invoker.createInvoker(externalModule, delegate, new kroll.ScopeVars({
              sourceUrl }));

          }
        }

        wrapper.addEventListener = function (...args) {
          externalModule.addEventListener.apply(externalModule, args);
        };

        wrapper.removeEventListener = function (...args) {
          externalModule.removeEventListener.apply(externalModule, args);
        };

        wrapper.fireEvent = function (...args) {
          externalModule.fireEvent.apply(externalModule, args);
        };

        return wrapper;
      }
      /**
       * Takes a CommonJS module and uses it to extend an existing external/native module. The exports are added to the external module.
       * @param  {Object} externalModule The external/native module we're extending
       * @param  {String} id             module id
       */


      extendModuleWithCommonJs(externalModule, id) {
        if (!kroll.isExternalCommonJsModule(id)) {
          return;
        } // Load under fake name, or the commonjs side of the native module gets cached in place of the native module!
        // See TIMOB-24932


        const fakeId = `${id}.commonjs`;
        const jsModule = new Module(fakeId, this);
        jsModule.load(fakeId, kroll.getExternalCommonJsModule(id));

        if (jsModule.exports) {
          console.trace(`Extending native module '${id}' with the CommonJS module that was packaged with it.`);
          kroll.extend(externalModule, jsModule.exports);
        }
      }
      /**
       * Loads a native / external (3rd party) module
       * @param  {String} id              module id
       * @param  {object} externalBinding external binding object
       * @return {Object}                 The exported module
       */


      loadExternalModule(id, externalBinding) {
        // try to get the cached module...
        let externalModule = Module.cache[id];

        if (!externalModule) {
          // iOS and Android differ quite a bit here.
          // With ios, we should already have the native module loaded
          // There's no special "bootstrap.js" file packaged within it
          // On Android, we load a bootstrap.js bundled with the module
          {
            // This is the process for Android, first grab the bootstrap source
            const source = externalBinding.bootstrap; // Load the native module's bootstrap JS

            const module = new Module(id, this);
            module.load(`${id}/bootstrap.js`, source); // Bootstrap and load the module using the native bindings

            const result = module.exports.bootstrap(externalBinding); // Cache the external module instance after it's been modified by it's bootstrap script

            externalModule = result;
          }
        }

        if (!externalModule) {
          console.trace(`Unable to load external module: ${id}`);
          return null;
        } // cache the loaded native module (before we extend it)


        Module.cache[id] = externalModule; // We cache each context-specific module wrapper
        // on the parent module, rather than in the Module.cache

        let wrapper = this.wrapperCache[id];

        if (wrapper) {
          return wrapper;
        }

        const sourceUrl = `app://${this.filename}`; // FIXME: If this.filename starts with '/', we need to drop it, I think?

        wrapper = this.createModuleWrapper(externalModule, sourceUrl); // Then we "extend" the API/module using any shipped JS code (assets/<module.id>.js)

        this.extendModuleWithCommonJs(wrapper, id);
        this.wrapperCache[id] = wrapper;
        return wrapper;
      } // See https://nodejs.org/api/modules.html#modules_all_together

      /**
       * Require another module as a child of this module.
       * This parent module's path is used as the base for relative paths
       * when loading the child. Returns the exports object
       * of the child module.
       *
       * @param  {String} request  The path to the requested module
       * @return {Object}          The loaded module
       */


      require(request) {
        // 2. If X begins with './' or '/' or '../'
        const start = request.substring(0, 2); // hack up the start of the string to check relative/absolute/"naked" module id

        if (start === './' || start === '..') {
          const loaded = this.loadAsFileOrDirectory(path.normalize(this.path + '/' + request));

          if (loaded) {
            return loaded.exports;
          } // Root/absolute path (internally when reading the file, we prepend "Resources/" as root dir)

        } else if (request.substring(0, 1) === '/') {
          const loaded = this.loadAsFileOrDirectory(path.normalize(request));

          if (loaded) {
            return loaded.exports;
          }
        } else {
          // Despite being step 1 in Node.JS psuedo-code, we moved it down here because we don't allow native modules
          // to start with './', '..' or '/' - so this avoids a lot of misses on requires starting that way
          // 1. If X is a core module,
          let loaded = this.loadCoreModule(request);

          if (loaded) {
            // a. return the core module
            // b. STOP
            return loaded;
          } // Look for CommonJS module


          if (request.indexOf('/') === -1) {
            // For CommonJS we need to look for module.id/module.id.js first...
            const filename = `/${request}/${request}.js`; // Only look for this _exact file_. DO NOT APPEND .js or .json to it!

            if (this.filenameExists(filename)) {
              loaded = this.loadJavascriptText(filename);

              if (loaded) {
                return loaded.exports;
              }
            } // Then try module.id as directory


            loaded = this.loadAsDirectory(`/${request}`);

            if (loaded) {
              return loaded.exports;
            }
          } // Allow looking through node_modules
          // 3. LOAD_NODE_MODULES(X, dirname(Y))


          loaded = this.loadNodeModules(request, this.paths);

          if (loaded) {
            return loaded.exports;
          } // Fallback to old Titanium behavior of assuming it's actually an absolute path
          // We'd like to warn users about legacy style require syntax so they can update, but the new syntax is not backwards compatible.
          // So for now, let's just be quite about it. In future versions of the SDK (7.0?) we should warn (once 5.x is end of life so backwards compat is not necessary)
          // eslint-disable-next-line max-len
          // console.warn(`require called with un-prefixed module id: ${request}, should be a core or CommonJS module. Falling back to old Ti behavior and assuming it's an absolute path: /${request}`);


          loaded = this.loadAsFileOrDirectory(path.normalize(`/${request}`));

          if (loaded) {
            return loaded.exports;
          }
        } // 4. THROW "not found"


        throw new Error(`Requested module not found: ${request}`); // TODO Set 'code' property to 'MODULE_NOT_FOUND' to match Node?
      }
      /**
       * Loads the core module if it exists. If not, returns null.
       *
       * @param  {String}  id The request module id
       * @return {Object}    true if the module id matches a native or CommonJS module id, (or it's first path segment does).
       */


      loadCoreModule(id) {
        // skip bad ids, relative ids, absolute ids. "native"/"core" modules should be of form "module.id" or "module.id/sub.file.js"
        if (!id || id.startsWith('.') || id.startsWith('/')) {
          return null;
        } // check if we have a cached copy of the wrapper


        if (this.wrapperCache[id]) {
          return this.wrapperCache[id];
        }

        const parts = id.split('/');
        const externalBinding = kroll.externalBinding(parts[0]);

        if (externalBinding) {
          if (parts.length === 1) {
            // This is the "root" of an external module. It can look like:
            // request("com.example.mymodule")
            // We can load and return it right away (caching occurs in the called function).
            return this.loadExternalModule(parts[0], externalBinding);
          } // Could be a sub-module (CommonJS) of an external native module.
          // We allow that since TIMOB-9730.


          if (kroll.isExternalCommonJsModule(parts[0])) {
            const externalCommonJsContents = kroll.getExternalCommonJsModule(id);

            if (externalCommonJsContents) {
              // found it
              // FIXME Re-use loadAsJavaScriptText?
              const module = new Module(id, this);
              module.load(id, externalCommonJsContents);
              return module.exports;
            }
          }
        }

        return null; // failed to load
      }
      /**
       * Attempts to load a node module by id from the starting path
       * @param  {string} moduleId       The path of the module to load.
       * @param  {string[]} dirs       paths to search
       * @return {Module|null}      The module, if loaded. null if not.
       */


      loadNodeModules(moduleId, dirs) {
        // 2. for each DIR in DIRS:
        for (const dir of dirs) {
          // a. LOAD_AS_FILE(DIR/X)
          // b. LOAD_AS_DIRECTORY(DIR/X)
          const mod = this.loadAsFileOrDirectory(path.join(dir, moduleId));

          if (mod) {
            return mod;
          }
        }

        return null;
      }
      /**
       * Determine the set of paths to search for node_modules
       * @param  {string} startDir       The starting directory
       * @return {string[]}              The array of paths to search
       */


      nodeModulesPaths(startDir) {
        // Make sure we have an absolute path to start with
        startDir = path.resolve(startDir); // Return early if we are at root, this avoids doing a pointless loop
        // and also returning an array with duplicate entries
        // e.g. ["/node_modules", "/node_modules"]

        if (startDir === '/') {
          return ['/node_modules'];
        } // 1. let PARTS = path split(START)


        const parts = startDir.split('/'); // 2. let I = count of PARTS - 1

        let i = parts.length - 1; // 3. let DIRS = []

        const dirs = []; // 4. while I >= 0,

        while (i >= 0) {
          // a. if PARTS[I] = "node_modules" CONTINUE
          if (parts[i] === 'node_modules' || parts[i] === '') {
            i -= 1;
            continue;
          } // b. DIR = path join(PARTS[0 .. I] + "node_modules")


          const dir = path.join(parts.slice(0, i + 1).join('/'), 'node_modules'); // c. DIRS = DIRS + DIR

          dirs.push(dir); // d. let I = I - 1

          i -= 1;
        } // Always add /node_modules to the search path


        dirs.push('/node_modules');
        return dirs;
      }
      /**
       * Attempts to load a given path as a file or directory.
       * @param  {string} normalizedPath The path of the module to load.
       * @return {Module|null} The loaded module. null if unable to load.
       */


      loadAsFileOrDirectory(normalizedPath) {
        // a. LOAD_AS_FILE(Y + X)
        let loaded = this.loadAsFile(normalizedPath);

        if (loaded) {
          return loaded;
        } // b. LOAD_AS_DIRECTORY(Y + X)


        loaded = this.loadAsDirectory(normalizedPath);

        if (loaded) {
          return loaded;
        }

        return null;
      }
      /**
       * Loads a given file as a Javascript file, returning the module.exports.
       * @param  {string} filename File we're attempting to load
       * @return {Module} the loaded module
       */


      loadJavascriptText(filename) {
        // Look in the cache!
        if (Module.cache[filename]) {
          return Module.cache[filename];
        }

        const module = new Module(filename, this);
        module.load(filename);
        return module;
      }
      /**
       * Loads a JSON file by reading it's contents, doing a JSON.parse and returning the parsed object.
       *
       * @param  {String} filename File we're attempting to load
       * @return {Module} The loaded module instance
       */


      loadJavascriptObject(filename) {
        // Look in the cache!
        if (Module.cache[filename]) {
          return Module.cache[filename];
        }

        const module = new Module(filename, this);
        module.filename = filename;
        module.path = path.dirname(filename);
        const source = assets.readAsset(`Resources${filename}`); // Stick it in the cache

        Module.cache[filename] = module;
        module.exports = JSON.parse(source);
        module.loaded = true;
        return module;
      }
      /**
       * Attempts to load a file by it's full filename according to NodeJS rules.
       *
       * @param  {string} id The filename
       * @return {Module|null} Module instance if loaded, null if not found.
       */


      loadAsFile(id) {
        // 1. If X is a file, load X as JavaScript text.  STOP
        let filename = id;

        if (this.filenameExists(filename)) {
          // If the file has a .json extension, load as JavascriptObject
          if (filename.length > 5 && filename.slice(-4) === 'json') {
            return this.loadJavascriptObject(filename);
          }

          return this.loadJavascriptText(filename);
        } // 2. If X.js is a file, load X.js as JavaScript text.  STOP


        filename = id + '.js';

        if (this.filenameExists(filename)) {
          return this.loadJavascriptText(filename);
        } // 3. If X.json is a file, parse X.json to a JavaScript Object.  STOP


        filename = id + '.json';

        if (this.filenameExists(filename)) {
          return this.loadJavascriptObject(filename);
        } // failed to load anything!


        return null;
      }
      /**
       * Attempts to load a directory according to NodeJS rules.
       *
       * @param  {string} id The directory name
       * @return {Module|null} Loaded module, null if not found.
       */


      loadAsDirectory(id) {
        // 1. If X/package.json is a file,
        let filename = path.resolve(id, 'package.json');

        if (this.filenameExists(filename)) {
          // a. Parse X/package.json, and look for "main" field.
          const object = this.loadJavascriptObject(filename);

          if (object && object.exports && object.exports.main) {
            // b. let M = X + (json main field)
            const m = path.resolve(id, object.exports.main); // c. LOAD_AS_FILE(M)

            return this.loadAsFileOrDirectory(m);
          }
        } // 2. If X/index.js is a file, load X/index.js as JavaScript text.  STOP


        filename = path.resolve(id, 'index.js');

        if (this.filenameExists(filename)) {
          return this.loadJavascriptText(filename);
        } // 3. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP


        filename = path.resolve(id, 'index.json');

        if (this.filenameExists(filename)) {
          return this.loadJavascriptObject(filename);
        }

        return null;
      }
      /**
       * Setup a sandbox and run the module's script inside it.
       * Returns the result of the executed script.
       * @param  {String} source   [description]
       * @param  {String} filename [description]
       * @return {*}          [description]
       */


      _runScript(source, filename) {
        const self = this;

        function require(path) {
          return self.require(path);
        }

        require.main = Module.main; // This "first time" run is really only for app.js, AFAICT, and needs
        // an activity. If app was restarted for Service only, we don't want
        // to go this route. So added currentActivity check. (bill)

        if (self.id === '.' && !this.isService) {
          global.require = require; // check if we have an inspector binding...

          const inspector = kroll.binding('inspector');

          if (inspector) {
            // If debugger is enabled, load app.js and pause right before we execute it
            const inspectorWrapper = inspector.callAndPauseOnStart;

            if (inspectorWrapper) {
              // FIXME Why can't we do normal Module.wrap(source) here?
              // I get "Uncaught TypeError: Cannot read property 'createTabGroup' of undefined" for "Ti.UI.createTabGroup();"
              // Not sure why app.js is special case and can't be run under normal self-invoking wrapping function that gets passed in global/kroll/Ti/etc
              // Instead, let's use a slightly modified version of callAndPauseOnStart:
              // It will compile the source as-is, schedule a pause and then run the source.
              return inspectorWrapper(source, filename);
            }
          } // run app.js "normally" (i.e. not under debugger/inspector)


          return Script.runInThisContext(source, filename, true);
        } // In V8, we treat external modules the same as native modules.  First, we wrap the
        // module code and then run it in the current context.  This will allow external modules to
        // access globals as mentioned in TIMOB-11752. This will also help resolve startup slowness that
        // occurs as a result of creating a new context during startup in TIMOB-12286.


        source = Module.wrap(source);
        const f = Script.runInThisContext(source, filename, true);
        return f(this.exports, require, this, filename, path.dirname(filename), Titanium, Ti, global, kroll);
      }
      /**
       * Look up a filename in the app's index.json file
       * @param  {String} filename the file we're looking for
       * @return {Boolean}         true if the filename exists in the index.json
       */


      filenameExists(filename) {
        filename = 'Resources' + filename; // When we actually look for files, assume "Resources/" is the root

        if (!fileIndex) {
          const json = assets.readAsset(INDEX_JSON);
          fileIndex = JSON.parse(json);
        }

        return fileIndex && filename in fileIndex;
      }}



    Module.cache = [];
    Module.main = null;
    Module.wrapper = ['(function (exports, require, module, __filename, __dirname, Titanium, Ti, global, kroll) {', '\n});'];

    Module.wrap = function (script) {
      return Module.wrapper[0] + script + Module.wrapper[1];
    };
    /**
     * [runModule description]
     * @param  {String} source            JS Source code
     * @param  {String} filename          Filename of the module
     * @param  {Titanium.Service|null|Titanium.Android.Activity} activityOrService [description]
     * @return {Module}                   The loaded Module
     */


    Module.runModule = function (source, filename, activityOrService) {
      let id = filename;

      if (!Module.main) {
        id = '.';
      }

      const module = new Module(id, null); // FIXME: I don't know why instanceof for Titanium.Service works here!
      // On Android, it's an apiname of Ti.Android.Service
      // On iOS, we don't yet pass in the value, but we do set Ti.App.currentService property beforehand!
      // Can we remove the preload stuff in KrollBridge.m to pass along the service instance into this like we do on Andorid?

      module.isService = activityOrService instanceof Titanium.Service;

      {
        if (module.isService) {
          Object.defineProperty(Ti.Android, 'currentService', {
            value: activityOrService,
            writable: false,
            configurable: true });

        } else {
          Object.defineProperty(Ti.Android, 'currentService', {
            value: null,
            writable: false,
            configurable: true });

        }
      }

      if (!Module.main) {
        Module.main = module;
      }

      filename = filename.replace('Resources/', '/'); // normalize back to absolute paths (which really are relative to Resources under the hood)

      module.load(filename, source);

      {
        Object.defineProperty(Ti.Android, 'currentService', {
          value: null,
          writable: false,
          configurable: true });

      }

      return module;
    };

    return Module;
  }

  /**
   * This hangs the Proxy type off Ti namespace. It also generates a hidden _properties object
   * that is used to store property values on the JS side for java Proxies.
   * Basically these get/set methods are fallbacks for when a Java proxy doesn't have a native method to handle getting/setting the property.
   * (see Proxy.h/ProxyBindingV8.cpp.fm for more info)
   * @param {object} tiBinding the underlying 'Titanium' native binding (see KrollBindings::initTitanium)
   * @param {object} Ti the global.Titanium object
   */
  function ProxyBootstrap(tiBinding, Ti) {
    const Proxy = tiBinding.Proxy;
    Ti.Proxy = Proxy;

    Proxy.defineProperties = function (proxyPrototype, names) {
      const properties = {};
      const len = names.length;

      for (let i = 0; i < len; ++i) {
        const name = names[i];
        properties[name] = {
          get: function () {
            // eslint-disable-line no-loop-func
            return this.getProperty(name);
          },
          set: function (value) {
            // eslint-disable-line no-loop-func
            this.setPropertyAndFire(name, value);
          },
          enumerable: true };

      }

      Object.defineProperties(proxyPrototype, properties);
    };

    Object.defineProperty(Proxy.prototype, 'getProperty', {
      value: function (property) {
        return this._properties[property];
      },
      enumerable: false });

    Object.defineProperty(Proxy.prototype, 'setProperty', {
      value: function (property, value) {
        return this._properties[property] = value;
      },
      enumerable: false });

    Object.defineProperty(Proxy.prototype, 'setPropertiesAndFire', {
      value: function (properties) {
        const ownNames = Object.getOwnPropertyNames(properties);
        const len = ownNames.length;
        const changes = [];

        for (let i = 0; i < len; ++i) {
          const property = ownNames[i];
          const value = properties[property];

          if (!property) {
            continue;
          }

          const oldValue = this._properties[property];
          this._properties[property] = value;

          if (value !== oldValue) {
            changes.push([property, oldValue, value]);
          }
        }

        if (changes.length > 0) {
          this.onPropertiesChanged(changes);
        }
      },
      enumerable: false });

  }

  /* globals OS_ANDROID,OS_IOS */
  function bootstrap$1(global, kroll) {
    {
      const tiBinding = kroll.binding('Titanium');
      const Ti = tiBinding.Titanium;

      const bootstrap = kroll.NativeModule.require('bootstrap'); // The bootstrap defines lazy namespace property tree **and**
      // sets up special APIs that get wrapped to pass along sourceUrl via a KrollInvocation object


      bootstrap.bootstrap(Ti);
      bootstrap.defineLazyBinding(Ti, 'API'); // Basically does the same thing iOS does for API module (lazy property getter)
      // Here, we go through all the specially marked APIs to generate the wrappers to pass in the sourceUrl
      // TODO: This is all insane, and we should just bake it into the Proxy conversion stuff to grab and pass along sourceUrl
      // Rather than carry it all over the place like this!
      // We already need to generate a KrollInvocation object to wrap the sourceUrl!

      function TitaniumWrapper(context) {
        const sourceUrl = this.sourceUrl = context.sourceUrl;
        const scopeVars = new kroll.ScopeVars({
          sourceUrl });

        Ti.bindInvocationAPIs(this, scopeVars);
      }

      TitaniumWrapper.prototype = Ti;
      Ti.Wrapper = TitaniumWrapper; // -----------------------------------------------------------------------
      // This loops through all known APIs that require an
      // Invocation object and wraps them so we can pass a
      // source URL as the first argument

      Ti.bindInvocationAPIs = function (wrapperTi, scopeVars) {
        for (const api of Ti.invocationAPIs) {
          // separate each invoker into it's own private scope
          invoker.genInvoker(wrapperTi, Ti, 'Titanium', api, scopeVars);
        }
      };

      ProxyBootstrap(tiBinding, Ti);
      return new TitaniumWrapper({
        // Even though the entry point is really ti://kroll.js, that will break resolution of urls under the covers!
        // So basically just assume app.js as the relative file base
        sourceUrl: 'app://app.js' });

    }
  }

  // Copyright Joyent, Inc. and other Node contributors.
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.
  // Modifications Copyright 2011-Present Appcelerator, Inc.
  function EventEmitterBootstrap(global, kroll) {
    const TAG = 'EventEmitter';
    const EventEmitter = kroll.EventEmitter;
    const isArray = Array.isArray; // By default EventEmitters will print a warning if more than
    // 10 listeners are added to it. This is a useful default which
    // helps finding memory leaks.

    Object.defineProperty(EventEmitter.prototype, 'callHandler', {
      value: function (handler, type, data) {
        // kroll.log(TAG, "calling event handler: type:" + type + ", data: " + data + ", handler: " + handler);
        var handled = false,
        cancelBubble = data.cancelBubble,
        event;

        if (handler.listener && handler.listener.call) {
          // Create event object, copy any custom event data, and set the "type" and "source" properties.
          event = {
            type: type,
            source: this };

          kroll.extend(event, data);

          if (handler.self && event.source == handler.self.view) {
            // eslint-disable-line eqeqeq
            event.source = handler.self;
          }

          handler.listener.call(this, event); // The "cancelBubble" property may be reset in the handler.

          if (event.cancelBubble !== cancelBubble) {
            cancelBubble = event.cancelBubble;
          }

          handled = true;
        } else if (kroll.DBG) {
          kroll.log(TAG, 'handler for event \'' + type + '\' is ' + typeof handler.listener + ' and cannot be called.');
        } // Bubble the events to the parent view if needed.


        if (data.bubbles && !cancelBubble) {
          handled = this._fireSyncEventToParent(type, data) || handled;
        }

        return handled;
      },
      enumerable: false });

    Object.defineProperty(EventEmitter.prototype, 'emit', {
      value: function (type) {
        var handled = false,
        data = arguments[1],
        handler,
        listeners; // Set the "bubbles" and "cancelBubble" properties for event data.

        if (data !== null && typeof data === 'object') {
          data.bubbles = !!data.bubbles;
          data.cancelBubble = !!data.cancelBubble;
        } else {
          data = {
            bubbles: false,
            cancelBubble: false };

        }

        if (this._hasJavaListener) {
          this._onEventFired(type, data);
        }

        if (!this._events || !this._events[type] || !this.callHandler) {
          if (data.bubbles && !data.cancelBubble) {
            handled = this._fireSyncEventToParent(type, data);
          }

          return handled;
        }

        handler = this._events[type];

        if (typeof handler.listener === 'function') {
          handled = this.callHandler(handler, type, data);
        } else if (isArray(handler)) {
          listeners = handler.slice();

          for (var i = 0, l = listeners.length; i < l; i++) {
            handled = this.callHandler(listeners[i], type, data) || handled;
          }
        } else if (data.bubbles && !data.cancelBubble) {
          handled = this._fireSyncEventToParent(type, data);
        }

        return handled;
      },
      enumerable: false });
    // Titanium compatibility

    Object.defineProperty(EventEmitter.prototype, 'fireEvent', {
      value: EventEmitter.prototype.emit,
      enumerable: false,
      writable: true });

    Object.defineProperty(EventEmitter.prototype, 'fireSyncEvent', {
      value: EventEmitter.prototype.emit,
      enumerable: false });
    // EventEmitter is defined in src/node_events.cc
    // EventEmitter.prototype.emit() is also defined there.

    Object.defineProperty(EventEmitter.prototype, 'addListener', {
      value: function (type, listener, view) {
        if (typeof listener !== 'function') {
          throw new Error('addListener only takes instances of Function. The listener for event "' + type + '" is "' + typeof listener + '"');
        }

        if (!this._events) {
          this._events = {};
        }

        var id; // Setup ID first so we can pass count in to "listenerAdded"

        if (!this._events[type]) {
          id = 0;
        } else if (isArray(this._events[type])) {
          id = this._events[type].length;
        } else {
          id = 1;
        }

        var listenerWrapper = {};
        listenerWrapper.listener = listener;
        listenerWrapper.self = view;

        if (!this._events[type]) {
          // Optimize the case of one listener. Don't need the extra array object.
          this._events[type] = listenerWrapper;
        } else if (isArray(this._events[type])) {
          // If we've already got an array, just append.
          this._events[type].push(listenerWrapper);
        } else {
          // Adding the second element, need to change to array.
          this._events[type] = [this._events[type], listenerWrapper];
        } // Notify the Java proxy if this is the first listener added.


        if (id === 0) {
          this._hasListenersForEventType(type, true);
        }

        return id;
      },
      enumerable: false });
    // The JavaObject prototype will provide a version of this
    // that delegates back to the Java proxy. Non-Java versions
    // of EventEmitter don't care, so this no op is called instead.

    Object.defineProperty(EventEmitter.prototype, '_listenerForEvent', {
      value: function () {},
      enumerable: false });

    Object.defineProperty(EventEmitter.prototype, 'on', {
      value: EventEmitter.prototype.addListener,
      enumerable: false });
    // Titanium compatibility

    Object.defineProperty(EventEmitter.prototype, 'addEventListener', {
      value: EventEmitter.prototype.addListener,
      enumerable: false,
      writable: true });

    Object.defineProperty(EventEmitter.prototype, 'once', {
      value: function (type, listener) {
        var self = this;

        function g() {
          self.removeListener(type, g);
          listener.apply(this, arguments);
        }

        g.listener = listener;
        self.on(type, g);
        return this;
      },
      enumerable: false });

    Object.defineProperty(EventEmitter.prototype, 'removeListener', {
      value: function (type, listener) {
        if (typeof listener !== 'function') {
          throw new Error('removeListener only takes instances of Function');
        } // does not use listeners(), so no side effect of creating _events[type]


        if (!this._events || !this._events[type]) {
          return this;
        }

        var list = this._events[type];
        var count = 0;

        if (isArray(list)) {
          var position = -1; // Also support listener indexes / ids

          if (typeof listener === 'number') {
            position = listener;

            if (position > list.length || position < 0) {
              return this;
            }
          } else {
            for (var i = 0, length = list.length; i < length; i++) {
              if (list[i].listener === listener) {
                position = i;
                break;
              }
            }
          }

          if (position < 0) {
            return this;
          }

          list.splice(position, 1);

          if (list.length === 0) {
            delete this._events[type];
          }

          count = list.length;
        } else if (list.listener === listener || listener == 0) {
          // eslint-disable-line eqeqeq
          delete this._events[type];
        } else {
          return this;
        }

        if (count === 0) {
          this._hasListenersForEventType(type, false);
        }

        return this;
      },
      enumerable: false });

    Object.defineProperty(EventEmitter.prototype, 'removeEventListener', {
      value: EventEmitter.prototype.removeListener,
      enumerable: false,
      writable: true });

    Object.defineProperty(EventEmitter.prototype, 'removeAllListeners', {
      value: function (type) {
        // does not use listeners(), so no side effect of creating _events[type]
        if (type && this._events && this._events[type]) {
          this._events[type] = null;

          this._hasListenersForEventType(type, false);
        }

        return this;
      },
      enumerable: false });

    Object.defineProperty(EventEmitter.prototype, 'listeners', {
      value: function (type) {
        if (!this._events) {
          this._events = {};
        }

        if (!this._events[type]) {
          this._events[type] = [];
        }

        if (!isArray(this._events[type])) {
          this._events[type] = [this._events[type]];
        }

        return this._events[type];
      },
      enumerable: false });

    return EventEmitter;
  }

  /**
   * This is used by Android to require "baked-in" source.
   * SDK and module builds will bake in the raw source as c strings, and this will wrap
   * loading that code in via kroll.NativeModule.require(<id>)
   * For more information, see the bootstrap.js.ejs template.
   */
  function NativeModuleBootstrap(global, kroll) {
    const Script = kroll.binding('evals').Script;
    const runInThisContext = Script.runInThisContext;

    function NativeModule(id) {
      this.filename = id + '.js';
      this.id = id;
      this.exports = {};
      this.loaded = false;
    }
    /**
     * This should be an object with string keys (baked in module ids) -> string values (source of the baked in js code)
     */


    NativeModule._source = kroll.binding('natives');
    NativeModule._cache = {};

    NativeModule.require = function (id) {
      if (id === 'native_module') {
        return NativeModule;
      }

      if (id === 'invoker') {
        return invoker; // Android native modules use a bootstrap.js file that assumes there's a builtin 'invoker'
      }

      const cached = NativeModule.getCached(id);

      if (cached) {
        return cached.exports;
      }

      if (!NativeModule.exists(id)) {
        throw new Error('No such native module ' + id);
      }

      const nativeModule = new NativeModule(id);
      nativeModule.compile();
      nativeModule.cache();
      return nativeModule.exports;
    };

    NativeModule.getCached = function (id) {
      return NativeModule._cache[id];
    };

    NativeModule.exists = function (id) {
      return id in NativeModule._source;
    };

    NativeModule.getSource = function (id) {
      return NativeModule._source[id];
    };

    NativeModule.wrap = function (script) {
      return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
    };

    NativeModule.wrapper = ['(function (exports, require, module, __filename, __dirname, Titanium, Ti, global, kroll) {', '\n});'];

    NativeModule.prototype.compile = function () {
      let source = NativeModule.getSource(this.id);
      source = NativeModule.wrap(source); // All native modules have their filename prefixed with ti:/

      const filename = `ti:/${this.filename}`;
      const fn = runInThisContext(source, filename, true);
      fn(this.exports, NativeModule.require, this, this.filename, null, global.Ti, global.Ti, global, kroll);
      this.loaded = true;
    };

    NativeModule.prototype.cache = function () {
      NativeModule._cache[this.id] = this;
    };

    return NativeModule;
  }

  // This is the file each platform loads on boot *before* we launch ti.main.js to insert all our shims/extensions
  /**
   * main bootstrapping function
   * @param {object} global the global object
   * @param {object} kroll; the kroll module/binding
   * @return {void}       [description]
   */

  function bootstrap(global, kroll) {
    // Works identical to Object.hasOwnProperty, except
    // also works if the given object does not have the method
    // on its prototype or it has been masked.
    function hasOwnProperty(object, property) {
      return Object.hasOwnProperty.call(object, property);
    }

    kroll.extend = function (thisObject, otherObject) {
      if (!otherObject) {
        // extend with what?!  denied!
        return;
      }

      for (var name in otherObject) {
        if (hasOwnProperty(otherObject, name)) {
          thisObject[name] = otherObject[name];
        }
      }

      return thisObject;
    };
    /**
     * This is used to shuttle the sourceUrl around to APIs that may need to
     * resolve relative paths based on the invoking file.
     * (see KrollInvocation.java for more)
     * @param {object} vars key/value pairs to store
     * @param {string} vars.sourceUrl the source URL of the file calling the API
     * @constructor
     * @returns {ScopeVars}
     */


    function ScopeVars(vars) {
      if (!vars) {
        return this;
      }

      const keys = Object.keys(vars);
      const length = keys.length;

      for (var i = 0; i < length; ++i) {
        const key = keys[i];
        this[key] = vars[key];
      }
    }

    function startup() {
      global.global = global; // hang the global object off itself

      global.kroll = kroll; // hang our special under the hood kroll object off the global

      {
        kroll.ScopeVars = ScopeVars; // external module bootstrap.js expects to call kroll.NativeModule.require directly to load in their own source
        // and to refer to the baked in "bootstrap.js" for the SDK and "invoker.js" to hang lazy APIs/wrap api calls to pass in scope vars

        kroll.NativeModule = NativeModuleBootstrap(global, kroll); // Android uses it's own EventEmitter impl, and it's baked right into the proxy class chain
        // It assumes it can call back into java proxies to alert when listeners are added/removed
        // FIXME: Get it to use the events.js impl in the node extension, and get iOS to bake that into it's proxies as well!

        EventEmitterBootstrap(global, kroll);
      }

      global.Ti = global.Titanium = bootstrap$1(global, kroll);
      global.Module = bootstrap$2(global, kroll);
    }

    startup();
  }

  return bootstrap;

})();