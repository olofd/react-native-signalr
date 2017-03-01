import jQuery from 'jquery-deferred';
import jqueryFunction from './jquery-function';
import ajax from './ajax';

module.exports = jQuery.extend(
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
    }
  }
);
