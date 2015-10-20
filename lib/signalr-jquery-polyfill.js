var objectAssign = require('./object-assign');
var request = require('superagent-bluebird-promise');

module.exports = objectAssign(function(subject){

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
}, 
{
  ajax : function(options, data){
         var promise = request.get(options.url)
          .then((res) => {
             options.success(res.body);
          },(error) => {
             options.error(error.body);
          });
          return {
            abort : function(reason){
              return promise.cancel(reason);
            }
          }
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

    return { 
      resolve, 
      reject, 
      promise: () => {
          var p = {
              done : (fn) => {
                promise.done(fn);
                return p;
              },
              fail : (fn) => {
                promise.catch(fn);
                return p;
              },
              then : () => {
                promise.then(fn);
                return p;
              }
          };
          return p;
      }, 
      resolveWith : (data) => {
        return resolve(data);
      }, rejectWith : (data) => {
        return reject(data);
      } 
    };
  },
  support: {
    cors: true
  }
});


