module.exports = {
  
  /**
   * URL encode an object
   * 
   * http://stackoverflow.com/a/1714899
   * 
   * @param {Object}
   * @return {String}
   */
  urlEncode: function(obj){
    var str = [];
    for(var p in obj){
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  },
  
  /**
   * Get a query parameter by name
   * 
   * http://stackoverflow.com/a/5158301
   */
  getParameterByName: function(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },
  
  /**
   * Iterate over data asynchronously in series.
   * 
   * iterator is passed (item, next). Pass anything to the next method to
   * cancel iteration. Whatever is passed to next will be passed to the finished
   * callback method. The finished callback is called with nothing if iteration
   * completes normally.
   * 
   * @param {Array} list
   * @param {Function} iterator function(item, next)
   * @param {Function} finished function(cancel)
   */
  asyncEach: function(data, iterator, callback){
    function nextCall(i){
    	if(i === data.length){
      	setTimeout(callback);
      } else {
      	iterator(data[i], function(cancel){
        	if(typeof cancel === 'undefined'){
          	setTimeout(function(){
            	nextCall(++i);
            });
          } else {
          	setTimeout(function(){
            	callback(cancel);
            });
          }
        });
      }
    }
    nextCall(0);
  }
  
};