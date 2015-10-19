window.document = window.document || {};

var Promise = require('bluebird');

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

var objectAssign = function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;
 
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (Object.getOwnPropertySymbols) {
      symbols = Object.getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};
function fakeQuery(subject){

  let events = subject.events || {};

  if (subject && subject === subject.window)
    return {
      0: subject,
      load: (handler)=> subject.addEventListener('load', handler, false),
      bind: (event, handler)=> subject.addEventListener(event, handler, false),
      unbind: (event, handler)=> subject.removeEventListener(event, handler, false)
    }

  return {
    0: subject,

    unbind(event, handler){
      let handlers = events[event] || [];

      if (handler){
        let idx = handlers.indexOf(handler);
        if (idx !== -1) handlers.splice(idx, 1)
      }
      else handlers = []

      events[event] = handlers
    subject.events = events;

    },
    bind(event, handler){
      let current = events[event] || [];
      events[event] = current.concat(handler)
      subject.events = events;
    },
    triggerHandler(event, args){
      let handlers = events[event] || [];
      handlers.forEach(fn => {
        args = [{ type: event }].concat(args || []);

       fn.apply(this, args) 
      })
    }
  }
}

window.jQuery = objectAssign(fakeQuery, {
  ajax : function(options, data){
            return fetch(options.url).then(function(res){
                options.success(res._bodyText);
            }).catch((error) => { 
                options.error(res._bodyText);
            });
  },
  each: (arr, cb) => arr.forEach((v, i)=> cb(i, v)),
  inArray : function(arr, item){
    return arr.indexOf(item) !== -1;
  },
  noop(){},
  isFunction: o => typeof o === 'function',
  isArray: arr => Array.isArray(arr),
  type: obj => typeof obj,
  trim: str => str && str.trim(),
  extend: (...args) => objectAssign(...args),
  each: function(arr, cb)  {
    if(Array.isArray(arr)){
        return arr.forEach((v, i)=> cb(i, v));
    }else{
        return Object.keys(arr).forEach((key) => {
            let value = arr[key];
            cb.call(value, key, value);
        })
    }
  },
  isEmptyObject: obj => !obj || Object.keys(obj).length === 0,
  makeArray: arr => [].slice.call(arr, 0),
  Deferred(){
    var resolve, reject;
    var promise = new Promise(function() {
      resolve = arguments[0];
      reject = arguments[1];
    });

    return { resolve, reject, promise: () => promise, 
      resolveWith : (data) => {
        resolve(data);
    }, rejectWith : (data) => {
        reject(data);
      } 
    };
  },
  support: {
    cors: ('withCredentials' in new XMLHttpRequest())
  }
});

window.document.readyState = "complete";
window.navigator.userAgent = "react-native";
