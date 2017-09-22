import jQuery from 'jquery-deferred';
import jqueryFunction from './jquery-function';
import ajax from './ajax';

export default (jQuery.extend(
  jqueryFunction,
  jQuery,
  {
    defaultAjaxHeaders: null,
    ajax,
    inArray: (arr, item) => arr.indexOf(item) !== -1,
    trim: str => str && str.trim(),
    isEmptyObject: obj => !obj || Object.keys(obj).length === 0,
    makeArray: arr => [].slice.call(arr, 0),
    support: {
      cors: true
    },
    param: (source) => {
      let array = []
      for(var key in source) {
        array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]))
      }
      return array.join("&")
    }
  }
));
