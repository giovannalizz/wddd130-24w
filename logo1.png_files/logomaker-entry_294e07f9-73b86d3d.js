(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{507:function(e,t,r){(function(t){var s,n,i,o=r(61),a=r(57);o.isBrowser?s=window.XMLHttpRequest:(n=r(663),i=r(256));var u=o.merge;function c(){}function p(e){"use strict";this._requestQueue=[],this._requestsOutstanding=[],this._rejectedAuths=[],this._authCallback=e,this._isActive=!0,this._waitingForAuthentication=!1,this._needsInitialAuthentication=!!e,this._currentAuthId=o.generateUuid(),this._https=n,this._XMLHttpRequest=s,this._handlesRedirects=void 0!==s,this._maxOutstanding=5}Object.defineProperties(p.prototype,{isActive:{get:function(){"use strict";return this._isActive},set:function(e){"use strict";this._isActive!==e&&(this._isActive=e,e||(this._authValue=void 0,this._checkQueue()))}},crossOriginCredentials:{get:function(){"use strict";return this._withCredentials},set:function(e){"use strict";this._withCredentials=e}},maxOutstanding:{get:function(){"use strict";return this._maxOutstanding},set:function(e){"use strict";this._maxOutstanding=e,this._checkQueue()}},handlesRedirects:{get:function(){"use strict";return this._handlesRedirects}}}),p.prototype._forceXhr=function(e,t){"use strict";this._https=void 0,this._XMLHttpRequest=e||s||r(678),this._handlesRedirects=!t},p.StreamProvider=c,p.prototype.setAdditionalHeaders=function(e){"use strict";this._additionalHeaders=e||{}},p.prototype.setAdditionalNodeOptions=function(e){"use strict";this._additionalNodeOptions=e},p.prototype.setApiKey=function(e){"use strict";this._apiKey=e},p.prototype.setTimeout=function(e){"use strict";this._timeout=e},p.prototype.setAuthToken=function(e){"use strict";e?(this._authValue="Bearer "+e,this.resume()):(this._authValue=void 0,this._currentAuthId=o.generateUuid())},p.prototype.resume=function(){"use strict";this._currentAuthId=o.generateUuid(),this._waitingForAuthentication=!1,this._checkQueue()},p.prototype.setRequestHooks=function(e,t){"use strict";this._beforeHook=e,this._afterHook=t},p.prototype.invoke=function(e,r,s,n,i,c){"use strict";var p=(i=i||{}).responseType;if("buffer"===p){if("function"!=typeof t)throw new a(a.INVALID_PARAMS,"No Buffer class")}else if("blob"===p){if("function"!=typeof Blob)throw new a(a.INVALID_PARAMS,"No Blob class")}else if(p&&"text"!==p&&"json"!==p&&"arraybuffer"!==p)throw new a(a.INVALID_PARAMS,"Unsupported response type");s=u({},s,this._additionalHeaders),this._apiKey&&(s["x-api-key"]=this._apiKey);var d={method:e,href:r,headers:s,callback:c,body:n,options:i},h=i.reuseRequestDesc;if(h){if(this._requestQueue.indexOf(h)>=0||this._requestsOutstanding.indexOf(h)>=0)throw new a(a.INVALID_PARAMS,"Request descriptor still in use.");d=o.merge(h,d)}return this._doRequest(d),d},p.prototype._doRequest=function(e){"use strict";var r,s,n,p=this,d=0,h=[],f=e.body,l=e.options.responseType;function _(t,r,n){t&&o.log("["+e.id+"] callbackError: "+t),s&&s.end();var i=p._requestsOutstanding.indexOf(e);i>=0&&p._requestsOutstanding.splice(i,1);var u=n||e.callback;u&&(e.callback=void 0,t&&(t.clientRequest=e.clientRequest,t.xhr=e.xhr),t&&t.code!==a.SERVICE_IS_INACTIVE&&!p._isActive?t=new a(a.SERVICE_IS_INACTIVE,"Service is now inactive",t):e.timedOut&&(t=new a(a.TIMED_OUT,"timed out request",t)),u(t,r)),p._isActive&&p._checkQueue()}if(!this._isActive)return _(new a(a.SERVICE_IS_INACTIVE,"Network request in inactive state"));function v(t){t.pipe(n),t.on("error",function(t){var r=e.callback;return p.abort(e),_(new a(a.TERMINATED_INPUTSTREAM,"Input stream terminated abnormally",t),void 0,r)})}if(this._waitingForAuthentication||this._requestsOutstanding.length>=this._maxOutstanding||e.options.noSoonerThen||this._needsInitialAuthentication)this._requestQueue.push(e),this._needsInitialAuthentication&&(this._needsInitialAuthentication=!1,p._authFail()),this._waitingForAuthentication||this._checkQueue();else{var m=e.headers;if(null===m.Authorization)delete m.Authorization;else{if(!this._allowAuthTokenToBeSentInsecurely_DONT_USE_THIS_IN_PRODUCTION&&0!==e.href.indexOf("https:"))return _(new a(a.INVALID_PARAMS,"Must not send auth token over unsecured connection"));this._authValue&&(m.Authorization=this._authValue)}if(this._currentAuthId&&(e.authId=this._currentAuthId),this._beforeHook&&this._beforeHook(e),e.id=o.generateUuid(),e.startTime=(new Date).valueOf(),m["X-Request-Id"]=e.id,this._https){this._requestsOutstanding.push(e);var I=i.parse(e.href),g=u({},this._additionalNodeOptions,I);g.method=e.method||"GET",g.headers=m,o.log("["+e.id+"] "+g.method+" "+e.href),n=this._https.request(g,function(r){var n=!1,i=!1,u=p._requestsOutstanding.indexOf(e);if(u<0)p._checkQueue();else{e.response=r;var c=(new Date).valueOf()-e.startTime;if(o.log("["+e.id+"] "+r.statusCode+" ("+c+"ms)"),401===r.statusCode&&p._authCallback)p._requestsOutstanding.splice(u,1),p._requestQueue.unshift(e),p._authFail(e),o.consumeStream(r);else{var d=e.progress;200===r.statusCode||201===r.statusCode||202===r.statusCode?r.on("data",function(e){e.length&&d&&d(e.length),!s&&e&&h.push(e)}):o.consumeStream(r),r.once("end",function(){i=!0;var s=p._requestsOutstanding.indexOf(e);if(!(s<0||(p._requestsOutstanding.splice(s,1),p._checkQueue(),n))){if(n=!0,r.response=t.concat(h),"arraybuffer"===l)r.response=new ArrayBuffer(r.response);else if("text"===l)r.response=r.response.toString();else if("json"===l)try{var o=r.response.toString();r.response=JSON.parse(o)}catch(e){r.response=null}return _(void 0,r)}}),r.once("close",function(){if(!i&&!n)return n=!0,_(new a(a.NETWORK_ERROR,"incomplete response"))})}}}),e.clientRequest=n,n.once("error",_),p._timeout&&n.setTimeout(p._timeout,function(){e.timedOut=!0,n.abort()}),e.bytesSent=0,e.bytesReported=0,n.once("end",function(){if(e.progress){var t=e.bytesSent-e.bytesReported;t>0&&(e.progress(t),e.bytesReported+=t)}});var A=n.write;if(n.write=function(t){var r=t&&t.length;return r&&(e.bytesSent+=r),A.call(n,t,function(){e.progress&&t&&(e.progress(r),e.bytesReported+=r)})},f instanceof c)if(f.getStream)v(f.getStream());else f.getStreamAsync&&f.getStreamAsync(function(t,r){if(t){var s=e.callback;return p.abort(e),_(new a(a.TERMINATED_INPUTSTREAM,"Error creating input stream",t),void 0,s)}v(r)});else if(f instanceof t)n.write(f),n.end();else if(f instanceof ArrayBuffer)n.write(new t(new Int8Array(f))),n.end();else if("string"==typeof f)n.write(new t(f,"utf8")),n.end();else{if(f)return _(new a(a.INVALID_PARAMS,"Invalid data type"));n.end()}this._afterHook&&this._afterHook(e,n)}else{var T;for(T in"function"==typeof t&&f instanceof t&&(e.body=f=new Int8Array(f)),this._requestsOutstanding.push(e),o.log("["+e.id+"] "+e.method+" "+e.href),(r=new this._XMLHttpRequest).open(e.method,e.href,!0),this._withCredentials&&(r.withCredentials=!0),r.responseType=l,r.onreadystatechange=function(){var t=e.progress;if(t&&r.response){var s=r.response.length;t(s-d),d=s}if(4===r.readyState){if(0===r.status)return _(new a(a.UNEXPECTED,"XHR failure"));var n=p._requestsOutstanding.indexOf(e);if(n<0)p._checkQueue();else{var i=(new Date).valueOf()-e.startTime;if(o.log("["+e.id+"] "+r.status+" ("+i+"ms)"),p._requestsOutstanding.splice(n,1),401!==r.status||!p._authCallback)return e.xhr=r,e.response=r,r.statusCode=r.status,r.headers=o.parseHeaders(r.getAllResponseHeaders()),t&&f&&t(f.length||f.size),_(void 0,r);p._requestQueue.unshift(e),p._authFail(e),p._checkQueue()}}},m)m.hasOwnProperty(T)&&r.setRequestHeader(T,m[T]);e.xhr=r,p._timeout&&(r.timeout=p._timeout,r.ontimeout=function(){e.timedOut=!0,r.abort()}),f?r.send(f):r.send(),this._afterHook&&this._afterHook(e,r)}}},p.prototype._authFail=function(e){"use strict";if(this._authCallback){var t=e?e.authId:this._currentAuthId;if(-1!==this._rejectedAuths.indexOf(t))return;return this._authValue=null,this._waitingForAuthentication=!0,this._rejectedAuths.unshift(t)>this._maxOutstanding&&(this._rejectedAuths.length=this._maxOutstanding),this._authCallback(this)}},p.prototype._checkQueue=function(){"use strict";if(!this._isActive){var e=this._requestsOutstanding;this._requestsOutstanding=[],e.forEach(function(e){e.xhr&&e.xhr.abort(),e.clientRequest&&e.clientRequest.abort();var t=e.callback;if(t)return e.callback=void 0,t(new a(a.SERVICE_IS_INACTIVE,"Network request in inactive state"))});var t=this._requestQueue;return this._requestQueue=[],t.forEach(function(e){var t=e.callback;if(t)return e.callback=void 0,t(new a(a.SERVICE_IS_INACTIVE,"Network request in inactive state"))}),void(this._checkQueueTimerId&&(clearTimeout(this._checkQueueTimerId),this._checkQueueTimerId=void 0,this._checkQueueTimerWhen=void 0))}for(var r,s=Date.now(),n=s+3e5,i=0;!(this._waitingForAuthentication||this._requestsOutstanding.length>=this._maxOutstanding||i>=this._requestQueue.length);){var o=this._requestQueue[i];(r=o.options.noSoonerThen||s)&&r>n&&(r=o.options.noSoonerThen=n),r<=s?(this._requestQueue.splice(i,1),o.options.noSoonerThen=void 0,this._doRequest(o)):i++}if(!this._waitingForAuthentication&&this._requestsOutstanding.length<this._maxOutstanding&&this._requestQueue.length>0){var u,c,p=this._requestQueue.length;for(c=0;c<p;c++)(r=this._requestQueue[c].options.noSoonerThen)&&r>n&&(r=this._requestQueue[c].options.noSoonerThen=n),r&&(u=u&&u<r?u:r);if(u&&(!this._checkQueueTimerWhen||this._checkQueueTimerWhen>u)){this._checkQueueTimerId&&clearTimeout(this._checkQueueTimerId),this._checkQueueTimerWhen=u;var d=this;this._checkQueueTimerId=setTimeout(function(){d._checkQueueTimerWhen=void 0,d._checkQueueTimerId=void 0,d._checkQueue()},u-s)}}},p.prototype.abort=function(e){"use strict";var t=this._requestQueue.indexOf(e);t>=0?this._requestQueue.splice(t,1):(t=this._requestsOutstanding.indexOf(e))>=0&&(this._requestsOutstanding.splice(t,1),e.callback=void 0,e.xhr&&e.xhr.abort(),e.clientRequest&&e.clientRequest.abort(),this._checkQueue())},p.prototype.abortAllWithToken=function(e){"use strict";if(e){var t;for(t=0;t<this._requestQueue.length;++t)this._requestQueue[t].token===e&&(this._requestQueue.splice(t,1),--t);for(t=0;t<this._requestsOutstanding.length;++t)if(this._requestsOutstanding[t].token===e){var r=this._requestsOutstanding[t];this._requestsOutstanding.splice(t,1),--t,r.callback=void 0,r.xhr&&r.xhr.abort(),r.clientRequest&&r.clientRequest.abort()}this._checkQueue()}},e.exports=p}).call(this,r(96).Buffer)},517:function(e,t,r){var s=r(57),n=s.networkError,i=s.unexpectedResponse,o=r(61),a=o.merge,u=o.appendPathElements,c=r(507),p=r(518),d=r(256);function h(e,t){"use strict";this._service=e,this._server=t,t&&(this._endPoint=o.endPointOf(t)),this.SYNC_ASYNC_DEFAULT_DELAY=5,this.ASYNC_DEFAULT_DELAY=1,this.DEFAULT_POLL_DELAY=10,this._maxRedirects=5,this._authenticationWhitelist=[],this._assetInfoCache={},this._assetIdResolutionTemplate=null}h.StreamProvider=c.StreamProvider,Object.defineProperties(h.prototype,{maxRedirects:{get:function(){"use strict";return this._maxRedirects},set:function(e){"use strict";if("number"!=typeof e)throw new s(s.INVALID_PARAMS,"Expecting a number.");this._maxRedirects=Math.floor(e)}},authenticationWhitelist:{get:function(){"use strict";return this._authenticationWhitelist},set:function(e){"use strict";if(!Array.isArray(e))throw new s(s.INVALID_PARAMS,"Expecting an array.");this._authenticationWhitelist=e}}}),h.prototype.isValidHref=function(e){"use strict";var t=o.endPointOf(e);return!t||t===this._endPoint},h.prototype.isDomainOnWhitelist=function(e){"use strict";var t=o.parseURI(e).authority;if(!t||0===t.length)return!0;var r,s=t.length,n=this._authenticationWhitelist.length;for(r=0;r<n;r++){var i=this._authenticationWhitelist[r],a=i.length;if((s>a?t.slice(-a):t)===i)return!0}return!1},h.prototype.getAsset=function(e,t,r,s){"use strict";return this._getAsset(e,t,r,void 0,s)},h.prototype._getAsset=function(e,t,r,u,c){"use strict";if(!(e=this._resolveUrl(e)))return c(new s(s.WRONG_ENDPOINT,"Wrong endpoint: "+e));var p=u,d={};"string"==typeof t?d["If-None-Match"]=t:a(d,t);var h,f=this,l=0;function _(e,t){if(e)return c(n("Error downloading an asset",e,t));var r=t.statusCode;if(200===r)c(void 0,t);else if(304===r)c(void 0,t);else if(301===r||302===r||303===r||307===r)if(!f._service.handlesRedirects&&f.maxRedirects)if(l<f.maxRedirects){var s=t.headers.location;s?h(s):c(i("Missing location header in redirect response",e,t))}else c(i("Too many redirects",e,t));else c(i("Unexpected response getting an asset",e,t));else c(i("Unexpected response getting an asset",e,t))}return(p=(h=function(t){var s={responseType:r};return t&&(l++,s.reuseRequestDesc=p,f.isDomainOnWhitelist(t)||(d.Authorization=null)),f._service.invoke("GET",t||e,d,void 0,s,_)})()).progress=o.noOp,p},h.prototype.getAssetAsType=function(e,t,r,s){"use strict";return this._getAssetAsType(e,t,r,void 0,s)},h.prototype._getAssetAsType=function(e,t,r,s,n){"use strict";return this._getAsset(e,r,t,s,function(e,t){if(e)return n(e);if(200===t.statusCode){var r=t.response||t.responseText;n(void 0,r,t.headers.etag,t)}else 304===t.statusCode?n(void 0,null,t.headers.etag,t):n(i("Unexpected response getting asset",e,t))})},h.prototype._getResourcePathFromHref=function(e,t){"use strict";return this._service.invoke("HEAD",e,{},void 0,void 0,function(e,r){if(e)return t(e);if(200===r.statusCode){var s=r.headers.link;if(s){var n=p.parse(s).get("rel","http://ns.adobe.com/ccapi/path");if(n&&n[0]&&n[0].uri)return t(void 0,n[0].uri)}}return t(i("Unexpected response trying to retrieve path to asset.",void 0,r))})};h.prototype.getCachedAssetInfo=function(e,t){"use strict";var r=this._infoForAssetId(e);if(r)return t(void 0,r);if(this._awaitInfoForAssetId(e,t)){var n,a=this,u=function(r){var u=o.expandURITemplate(r,{asset_id:e});if(!(u=a._resolveUrl(u)))return t(new s(s.WRONG_ENDPOINT,"Wrong endpoint: "+u));if(n)var c={reuseRequestDesc:n};return n=a._service.invoke("HEAD",u,{},void 0,c,function(t,r){if(t)return a._cacheInfoForAssetId(e,t);var n=r.statusCode;if(200===n){var o={},u=r.headers["content-location"],c=r.headers.link;if(c){var h=p.parse(c),f=h.get("rel","primary");return f&&(o.primaryTemplate=u?d.parse(f[0].uri,u).href:f[0].uri),(f=h.get("rel","http://ns.adobe.com/ccapi/manifest2"))?o.manifestTemplate=u?d.parse(f[0].uri,u).href:f[0].uri:(f=h.get("rel","http://ns.adobe.com/ccapi/manifest"))&&(o.manifestTemplate=u?d.parse(f[0].uri,u).href:f[0].uri),(f=h.get("rel","http://ns.adobe.com/ccapi/component"))&&(o.componentTemplate=u?d.parse(f[0].uri,u).href:f[0].uri),(f=h.get("rel","version-history"))&&(o.versionHistory=u?d.parse(f[0].uri,u).href:f[0].uri),(f=h.get("rel","rendition"))&&(o.renditionTemplates=u?d.parse(f[0].uri,u).href:f),a._cacheInfoForAssetId(e,void 0,o)}}return 404===n?a._cacheInfoForAssetId(e,new s(s.ASSET_NOT_FOUND,"Asset not found",t,r)):a._cacheInfoForAssetId(e,i("Unable to resolve asset id.",t,r))})};if(this._assetIdResolutionTemplate)return u(this._assetIdResolutionTemplate);var c=a._resolveUrl("/");return n=a._service.invoke("GET",c,{},void 0,{responseType:"text"},function(e,r){if(e)return t(e);if(200===r.statusCode){var n=r.responseText||r.response;try{var i=JSON.parse(n),o=i._links?i._links["http://ns.adobe.com/ccapi/resolve/id"]:void 0;if(o)return a._assetIdResolutionTemplate=o.href,u(a._assetIdResolutionTemplate)}catch(e){var c=new s(s.INVALID_DATA,"Invalid JSON returned by server",e);return c.response=r,t(c)}}return a._assetIdResolutionTemplate?void 0:((c=new s(s.UNEXPECTED_RESPONSE,"Unable to retrieve asset id resolution link from root resource.")).response=r,t(c))})}},h.prototype.registerLinks=function(e){"use strict";e=e._links||e;var t={};t.assetId="urn:aaid:faux:"+o.generateUuid();var r=e.primary;return r&&(t.primaryTemplate=r.href),(r=e["http://ns.adobe.com/ccapi/manifest"])&&(t.manifestTemplate=r.href),(r=e["http://ns.adobe.com/ccapi/manifest2"])&&(t.manifestTemplate=r.href),(r=e["http://ns.adobe.com/ccapi/component"])&&(t.componentTemplate=r.href),(r=e["version-history"])&&(t.versionHistory=r.href),(r=e.rendition)&&(t.renditionTemplates=[{rel:"rendition",uri:r.href}]),this._assetInfoCache[t.assetId]=t,t.assetId},h.prototype._infoForAssetId=function(e){"use strict";var t=this._assetInfoCache[e];if(t&&!t.callbacks)return t},h.prototype._awaitInfoForAssetId=function(e,t){"use strict";var r=this._assetInfoCache[e];return r?(r.callbacks.push(t),!1):((r={}).assetId=e,r.callbacks=[t],this._assetInfoCache[e]=r,!0)},h.prototype._cacheInfoForAssetId=function(e,t,r){"use strict";var s=this._assetInfoCache[e];if(s){if(t){var n=s.callbacks;this._assetInfoCache[e]=void 0;for(var i=0;i<n.length;i++)n[i](t)}}else!t&&r&&(this._assetInfoCache[e]=s={});if(!t&&r&&(s.assetId||(s.assetId=e),s.primaryTemplate=r.primaryTemplate,s.manifestTemplate=r.manifestTemplate,s.componentTemplate=r.componentTemplate,s.versionHistory=r.versionHistory,s.renditionTemplates=r.renditionTemplates,s.callbacks)){for(i=0;i<s.callbacks.length;i++)s.callbacks[i](void 0,s);s.callbacks=void 0}},h.prototype._resolveUrl=function(e){"use strict";return o.endPointOf(e)?e:u(this._server,e)},h.prototype._makeRelativeUrl=function(e){"use strict";if(o.endPointOf(e)){var t=o.parseURI(e);(t.scheme||t.authority)&&(e=t.path,t.query&&(e+="?"+t.query),t.fragment&&(e+="#"+t.fragment))}return e},h.prototype._parseAsyncResponse=function(e){"use strict";var t=e.responseText||e.response;if(!t)throw new s(s.INVALID_DATA,"No body data.");var r={},n=t.indexOf("\n");if(-1===n)throw new s(s.INVALID_DATA,"Could not find status line.");var i=t.slice(0,13===t.charCodeAt(n-1)?n-1:n).split(" ");if(r.statusCode=parseInt(i[1],10),!r.statusCode)throw new s(s.INVALID_DATA,"Could not find status code.");i.length>2&&(r.statusText=i[2]);var a=t.search(/\r?\n\r?\n/);-1===a&&(a=t.length);var u=t.slice(n+1,a);r.headers=o.parseHeaders(u);var c="\r"===t.charAt(a)?a+4:a+2;return r.response=t.slice(c),r},h.prototype._pollForAsyncResponse=function(e,t,r,s){"use strict";var a=this,u=Date.now()+1e3*t,c={responseType:"text",reuseRequestDesc:r,noSoonerThen:u};o.log("asynchronous request - polling"),r=this._service.invoke("GET",e,void 0,void 0,c,function(t,u){if(t)return s(n("Error polling for an asynchronous reponse",t,u));var c=u.statusCode;if(202===c){o.log("asynchronous request - not yet ready");var p=u.headers["retry-after"];p&&(p=parseInt(p,10)),a._pollForAsyncResponse(e,p||a.DEFAULT_POLL_DELAY,r,s)}else if(200===c){o.log("asynchronous request - success");try{u=a._parseAsyncResponse(u)}catch(e){return s(i("Error parsing response body.",e,u))}200===(c=u.statusCode)||201===c||204===c?s(void 0,u):s(i("Unexpected response polling for an asynchronous response",t,u))}else o.log("asynchronous request - error"),s(i("Unexpected response polling for an asynchronous response",t,u))})},h.prototype._handle202Response=function(e,t,r,s){"use strict";var n,o=e.responseText||e.response;try{n=JSON.parse(o)}catch(t){return s(i("Error parsing 202 response body.",t,e))}var a=n.href;if(!a)return s(i("202 response missing an href.",void 0,e));var u=e.headers["retry-after"];u=u?parseInt(u,10):r,this._pollForAsyncResponse(this._resolveUrl(a),u,t,s)},e.exports=h},679:function(e,t,r){var s=r(517),n=r(57),i=n.networkError,o=n.unexpectedResponse,a=r(341),u=r(61),c=r(518),p="If-Match";function d(e,t){"use strict";if(s.call(this,e,t),!this._endPoint)throw new n(n.INVALID_PARAMS,"Could not determine endpoint from: "+t);this.authenticationWhitelist=["adobe.com","adobe.io","fotolia.net"]}d.prototype=Object.create(s.prototype),d.prototype.name="AdobeStorageSession",d.StreamProvider=s.StreamProvider,d.prototype.publishComposite=function(e,t,r,s,i,o){"use strict";var a={};return e?t?(s&&(null!==s.originURL&&(a.originURL=s.originURL),null!==s.manageUIURL&&(a.manageUIURL=s.manageUIURL),null!==s.licenseType&&(a.licenseType=s.licenseType),null!==s.licenseUrl&&(a.licenseUrl=s.licenseUrl),null!==s.attributionURL&&(a.attributionURL=s.attributionURL),null!==s.attributionName&&(a.attributionName=s.attributionName)),r&&(null!==r.artworkComponentId&&(a.artworkComponentId=r.artworkComponentId),null!==r.title&&(a.title=r.title),null!==r.alias&&(a.alias=r.alias),null!==r.tags&&(a.tags=r.tags),null!==r.description&&(a.description=r.description),null!==r.categoryId&&(a.categoryId=r.categoryId),null!==r.subCategoryIds&&(a.subCategoryIds=r.subCategoryIds),null!==r.creatorIds&&(a.creatorIds=r.creatorIds),null!==r.undiscoverable&&(a.undiscoverable=r.undiscoverable),null!==r.isPrivate&&(a.private=r.isPrivate),null!==r.custom&&(a.custom=r.custom)),null!==i&&(a.creatorTool=i),this._invokeOperation("publish",{href:e},{href:t},a,function(e,t,r){var s;return r&&(s=r.result),o(e,s)})):o(new n(n.INVALID_PARAMS),"CP Target URI cannot be null."):o(new n(n.INVALID_PARAMS),"Source Href cannot be null.")},d.prototype.getCollection=function(e,t,r){"use strict";if(!(e=this._resolveUrl(e)))return r(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+e));var s;e+="?order=asc&orderby=name";var a={};t&&(a["If-None-Match"]=t);var u,c=this;return u=this._service.invoke("GET",e,a,void 0,{responseType:"text"},function t(n,p){return n?r(i("Error retrieving a collection",n,p)):200===p.statusCode?c._parseAndAppendJSONResponse(p,s,"children",function(n,i){if(n)return r(n);var o=p.headers["x-children-next-start"];if(o){s=i;var d=e+"&start="+o;return c._service.invoke("GET",d,a,void 0,{resuseRequestDesc:u,responseType:"text"},t)}return r(void 0,i,p.headers.etag,p.headers)}):304===p.statusCode?r(void 0,null,p.headers.etag,p.headers):r(o("Unexpected status code while getting a collection",void 0,p))})},d.prototype.pagedGetCollection=function(e,t,r,s,a,u,c,p){"use strict";if(!(e=this._resolveUrl(e)))return p(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+e));e+=function(e,t,r,s){"use strict";var n=[],i="";return t&&n.push("order="+t),e&&n.push("orderBy="+e),r&&n.push("start="+r),s&&n.push("limit="+s),n.length>0&&(i="?"+n.join("&")),i}(r,s,a,u);var d={};t&&(d["If-None-Match"]=t);var h=this;return this._service.invoke("GET",e,d,void 0,{responseType:"text"},function(e,t){return e?p(i("Error retrieving a collection",e,t)):200===t.statusCode?h._parseAndAppendJSONResponse(t,c,"children",function(e,r){return p(e,r,t.headers.etag,t.headers)}):304===t.statusCode?p(void 0,null,t.headers.etag,t.headers):p(o("Unexpected status code while getting a collection",void 0,t))})},d.prototype.getComponent=function(e,t,r){"use strict";var s=this,i={},o=this.getComponentHref(e,e.version,function(e,a){if(e)return r(e);var u=s._resolveUrl(a);return u?(o=o||i,s._getAsset(u,void 0,t,o,r)):r(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+a))});return o||i},d.prototype.getRenditionOfComponent=function(e,t,r,s,i){"use strict";var o=this,a={},u=this.getComponentRenditionHref(e,e.version,r,function(e,r){if(e)return i(e);var c=o._resolveUrl(r);return c?(u=u||a,o._getAsset(c,{accept:t},s,u,i)):i(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+r))});return u||a},d.prototype.pagedGetCompositeVersions=function(e,t,r,s,a,u,c){"use strict";var p=this,d={},h=this._getPagedCompositeVersionsHref(e,t,r,s,a,function(e,t){if(e)return c(e);var r=p._resolveUrl(t);if(!r)return c(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+t));var s={responseType:"text",reuseRequestDesc:h||d};return p._service.invoke("GET",r,{},void 0,s,function(e,t){return e?c(i("Error retrieving version history",e,t)):200===t.statusCode?p._parseAndAppendJSONResponse(t,u,"children",c):c(o("Unexpected status code while getting a version history",void 0,t))})});return h||d},d.prototype.getCompositeManifest=function(e,t,r,s){"use strict";var i=this,o={},a=this.getCompositeManifestHref(e,t,function(e,t){if(e)return s(e);var u=i._resolveUrl(t);return u?(a=a||o,i._getAssetAsType(u,"text",r,a,s)):s(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+t))});return a||o},d.prototype.headRequest=function(e,t){"use strict";return this._service.invoke("HEAD",e,{},void 0,void 0,function(e,r){return e?t(e):t(void 0,r)})},d.prototype.remixComposite=function(e,t,r,s,n,i){"use strict";var o={compositeId:s};n&&(o.creatorTool=n);var a={href:e};return t&&(a.authorization=t),this._invokeOperation("remix",a,{href:r},o,function(e,t,r){var s;return r&&(s=r.result),i(e,s)})},d.prototype.createComposite=function(e,t,r,s){"use strict";var a=this,c=u.ensureRelativeHrefStartsWithSlash(t);c=u.escapeURLPath(c);var p=this._resolveUrl(c);if(!p)return s(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+p));if("+dcx"!==r.substr(r.length-"+dcx".length))return s(new n(n.INVALID_PARAMS),'composite type must end in "+dcx"');var d,h,f,l=(d=p,h=function(e,t){if(e)return s(e);var r=t.statusCode,u=t.headers["x-resource-urn"];if(201===r&&u)return s(void 0,t,u);if(409!==r)return s(o("Unexpected response creating composite",e,t));var c={reuseRequestDesc:l};a._service.invoke("HEAD",p,void 0,void 0,c,function(e,r){if(e)return s(i("Error creating composite",e,r));var a=r.headers["content-type"];return a?"+dcx"!==a.substr(a.length-4,4)?s(new n(n.FILE_EXISTS_IN_CLOUD,"Cannot overwrite file at "+p)):(u=r.headers["x-resource-urn"],200===r.statusCode&&u?s(new n(n.ALREADY_EXISTS,"Composite already exists at "+p),t,u):s(o("Unexpected response creating composite",e,r))):s(o("Missing Content-Type header.",e,r))})},f={"Content-Type":r},a._service.invoke("PUT",d,f,void 0,void 0,function(e,t){return e?h(i("Error creating composite",e,t)):h(void 0,t)}));return l},d.prototype.deleteComposite=function(e,t){"use strict";if(!e.assetId)throw new n(n.INVALID_PARAMS,"Component must be part of a branch of a bound composite.");var r=this,s={},a=this.getCachedAssetInfo(e.assetId,function(e,c){if(e)return e.code===n.ASSET_NOT_FOUND&&(e=new n(n.COMPOSITE_NOT_FOUND,"CompositeNotFound",e)),t(e);if(!c.primaryTemplate)return t(new n(n.UNEXPECTED_RESPONSE,"Primary resource URI is missing."));var p=u.expandURITemplate(c.primaryTemplate),d=r._resolveUrl(p);if(!d)return t(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+p));d+="?recursive=true&invocation_mode=sync,async";var h={reuseRequestDesc:a=a||s};r._service.invoke("DELETE",d,{"If-Match":"*"},void 0,h,function(e,s){if(e)return t(i("Error deleting composite directory",e,s));var n=s.statusCode;return 200===n||204===n||404===n?t(void 0,s):202===n?r._handle202Response(s,a,r.SYNC_ASYNC_DEFAULT_DELAY,t):t(o("Unexpected response deleting composite directory",e,s))})});return a||s},d.prototype.archiveComposite=function(e,t){"use strict";if(!e.assetId)throw new n(n.INVALID_PARAMS,"Component must be part of a branch of a bound composite.");var r=this,s={},a=this.getCachedAssetInfo(e.assetId,function(e,c){if(e)return e.code===n.ASSET_NOT_FOUND&&(e=new n(n.COMPOSITE_NOT_FOUND,"CompositeNotFound",e)),t(e);if(!c.primaryTemplate)return t(new n(n.UNEXPECTED_RESPONSE,"Primary resource URI is missing."));var p=u.expandURITemplate(c.primaryTemplate);if(!(p=r._resolveUrl(p)))return t(new n(n.WRONG_ENDPOINT,"Wrong endpoint: "+p));var d={reuseRequestDesc:a=a||s};r._service.invoke("HEAD",p,void 0,void 0,d,function(s,u){if(s)return t(e);var c;if(u.headers&&(c=u.headers["content-location"]),!c)return t(new n(n.UNEXPECTED_RESPONSE,"Missing content location."));var p={"Content-Type":"application/vnd.adobe.directory+json",Link:"<"+(c=r._makeRelativeUrl(c))+">;rel=self"},h=c.split("/");if(!h||0===h.length)return t(new n(n.UNEXPECTED_RESPONSE,"Invalid content location format."));var f=h[h.length-1],l=r._resolveUrl("/archive/"+f)+"?invocation_mode=sync,async";a=r._service.invoke("PUT",l,p,void 0,d,function(e,s){if(e)return t(i("Error archiving composite directory",e,s));var n=s.statusCode;return 200===n||204===n||404===n?t(void 0,s):202===n?r._handle202Response(s,a,r.SYNC_ASYNC_DEFAULT_DELAY,t):t(o("Unexpected response archiving composite directory",e,s))})})});return a||s},d.prototype.leaveSharedComposite=function(e,t){"use strict";if(e.collaborationType!==a.COLLABORATION.SHARED_WITH_USER)throw new n(n.INVALID_STATE,"Composite's collaboration type must be sharedWithUser.");return this.deleteComposite(e,t)},d.prototype.uploadDataForComponentId=function(e,t,r,s,a,u,c,d){"use strict";var h=this,f={};if(r&&!this.isProperAssetId(r))return d(new n(n.INVALID_STATE,"Composite asset id has invalid format."));var l=this._getComponentHref(r,e,void 0,function(e,r){if(e)return d(e);var _=r;a&&(_+="&intermediates=false"),_=h._resolveUrl(_);var v={"Content-Type":t};function m(e,t){e?delete v[p]:v[p]="*";var r={reuseRequestDesc:l=l||f};(l=h._service.invoke("PUT",_,v,c,r,function(e,r){if(e)return t(i("Error uploading component",e,r));var s=r.statusCode;if(200===s||201===s||204===s){var a;try{a=JSON.parse(r.responseText||r.response)}catch(s){return(e=new n(n.INVALID_DATA,"Invalid JSON returned by server",s)).response=r,t(e,r,a)}return t(void 0,r,a)}return 507===s?((e=new n(n.EXCEEDS_QUOTA,"Exceeds quota",e)).response=r,t(e)):((e=o("Unexpected response uploading component",e)).response=r,t(e))})).token=u}m(s,function(e,t,r){if(e){if(!(t=e.response))return d(e);var n=t.statusCode;return 404!==n&&409!==n&&412!==n?d(e):void m(!s,d)}return d(void 0,t,r)})});return l||f},d.prototype.copyAssetToComponentId=function(e,t,r,s,a,u,c,d){"use strict";var h=this._makeRelativeUrl(c);if(!h)return d(new n(n.WRONG_ENDPOINT,"Cannot copy asset: "+c));var f=this,l={};if(r&&!this.isProperAssetId(r))return d(new n(n.INVALID_STATE,"Composite asset id has invalid format."));var _=this._getComponentHref(r,e,void 0,function(e,r){if(e)return d(e);var c=r+"&invocation_mode=sync,async";a&&(c+="&intermediates=false"),c=f._resolveUrl(c);var v={reuseRequestDesc:_=_||l,responseType:"text"},m={};function I(e,t,r){return e?delete m[p]:m[p]="*",(_=f._service.invoke("PUT",c,m,void 0,v,function(e,s){if(e)return r(i("Error uploading component",e,s));var n=s.statusCode;return 200===n||201===n||204===n?r(void 0,s,t):202!==n?r(o("Unexpected response copying a component asset",e,s),s,t):void f._handle202Response(s,_,f.SYNC_ASYNC_DEFAULT_DELAY,function(e,s){return r(e,s,t)})})).token=u,_}t&&(m["Content-Type"]=t),m.Link="<"+h+">;rel=source";var g=function(e,t,r){var i;if(e){if(!(t=e.response))return d(e);var o=t.statusCode;return r||404!==o&&409!==o&&412!==o?507===o?((e=new n(n.EXCEEDS_QUOTA,"Exceeds quota",e)).response=t,d(e)):d(e):void I(!s,!0,g)}try{i=JSON.parse(t.responseText||t.response)}catch(r){return(e=new n(n.INVALID_DATA,"Invalid JSON returned by server",r)).response=t,d(e)}return d(void 0,t,i)};_=I(s,!0,g)});return _||l},d.prototype.updateManifest=function(e,t,r,s){"use strict";var a=this,u={},c=this.getBranchManifestHref(e,void 0,function(p,d){if(p)return s(p);var h={"Content-Type":"application/vnd.adobe.dcx-manifest+json"},f=e.manifestEtag;function l(e,r,s){e?h["If-Match"]="*":f&&r&&(h["If-Match"]=f);var p={reuseRequestDesc:c=c||u},l=a._resolveUrl(d);a._service.invoke("PUT",l,h,t,p,function(e,t){if(e)return s(i("Error updating manifest",e,t));var r=t.statusCode;return!t.headers.etag||200!==r&&201!==r&&204!==r?412===r||409===r?((e=new n(n.UPDATE_CONFLICT,"Manifest has been changed")).response=t,s(e)):s(o("Unexpected response updating manifest",e,t)):s(void 0,t)})}l(r,!0,function(e,t,n){return e?(t=e.response)&&409===t.statusCode&&r?void l(!r,!1,s):s(e):s(void 0,t,n)})});return c||u},d.prototype.getCompositeManifestHref=function(e,t,r){"use strict";if(!e.assetId)throw new n(n.INVALID_PARAMS,"Composite must be bound.");if(!this.isProperAssetId(e.assetId))throw new n(n.INVALID_STATE,"Composite asset id has invalid format.");return this._getAssetManifestHref(e.assetId,t,r)},d.prototype.getBranchManifestHref=function(e,t,r){"use strict";if(!e.compositeAssetId)throw new n(n.INVALID_PARAMS,"Composite must be bound.");if(!this.isProperAssetId(e.compositeAssetId))throw new n(n.INVALID_STATE,"Composite asset id has invalid format.");return this._getAssetManifestHref(e.compositeAssetId,t,r)},d.prototype.getComponentHref=function(e,t,r){"use strict";var s=e._owner;if(!s||!s.compositeAssetId)throw new n(n.INVALID_STATE,"Component must be part of a branch of a bound composite.");if(!this.isProperAssetId(s.compositeAssetId))throw new n(n.INVALID_STATE,"Composite asset id has invalid format.");if(s._core){var i=s._core._getSourceAssetInfoOfComponent(e);if(i)return this._getComponentHref(i.compositeAssetId,i.componentId,i.componentVersion,r)}return this._getComponentHref(s.compositeAssetId,e.id,t,r)},d.prototype._getComponentHref=function(e,t,r,s){"use strict";return this.getCachedAssetInfo(e,function(e,i){if(e)return e.code===n.ASSET_NOT_FOUND&&(e=new n(n.COMPOSITE_NOT_FOUND,"CompositeNotFound",e)),s(e);if(!i.componentTemplate)return s(new n(n.UNEXPECTED_RESPONSE,"Component URI template is missing."));var o={component_id:t};void 0!==r&&(o.version=r);var a=u.expandURITemplate(i.componentTemplate,o);return a?s(void 0,a):s(new n(n.UNEXPECTED_RESPONSE,"An error occurred when attempting expand manifest URI template."))})},d.prototype.getComponentRenditionHref=function(e,t,r,s){"use strict";var i=e._owner;if(!i||!i.compositeAssetId)throw new n(n.INVALID_STATE,"Component must be part of a branch of a bound composite.");if(!this.isProperAssetId(i.compositeAssetId))throw new n(n.INVALID_STATE,"Composite asset id has invalid format.");if(i._core&&i._core._getSourceAssetInfoOfComponent(e))throw new n(n.INVALID_STATE,"Getting a rendition of a source href not implemented.");r||(r="full");var o={version:t,size:r};if(e.assetId)return this.getCachedAssetInfo(e.assetId,function(e,t){if(e)return e.code===n.ASSET_NOT_FOUND&&(e=new n(n.COMPOSITE_NOT_FOUND,"CompositeNotFound",e)),s(e);if(t.renditionTemplates&&t.renditionTemplates[0]&&t.renditionTemplates[0].uri){var r=u.expandURITemplate(t.renditionTemplates[0].uri,o);return s(void 0,r)}return s(new n(n.UNEXPECTED_RESPONSE,"Rendition URI template is missing."))});var a=this,p={},d=this._getComponentHref(i.compositeAssetId,e.id,t,function(t,r){if(t)return s(t);var n={reuseRequestDesc:d=d||p};return r=a._resolveUrl(r),a._service.invoke("HEAD",r,{},void 0,n,function(t,n){if(t)return s(t);if(200===n.statusCode){var i={},p=n.headers.link;if(p){var d=c.parse(p),h=d.get("rel","primary");h&&(i.primaryTemplate=h[0].uri),(h=d.get("rel","rendition"))&&(i.renditionTemplates=h)}return e.assetId=i.assetId=n.headers["x-resource-urn"],a._cacheInfoForAssetId(i.assetId,void 0,i),r=u.expandURITemplate(i.renditionTemplates[0].uri,o),s(void 0,r)}})});return d||p},d.prototype.isProperAssetId=function(e){"use strict";return e.startsWith("urn:aaid:")},d.prototype._getAssetManifestHref=function(e,t,r){"use strict";return this.getCachedAssetInfo(e,function(e,s){if(e)return e.code===n.ASSET_NOT_FOUND&&(e=new n(n.COMPOSITE_NOT_FOUND,"CompositeNotFound",e)),r(e);if(!s.manifestTemplate)return r(new n(n.UNEXPECTED_RESPONSE,"Manifest URI template is missing."));var i={};t&&(i.version=t);var o=u.expandURITemplate(s.manifestTemplate,i);return o?r(void 0,o):r(new n(n.UNEXPECTED_RESPONSE,"An error occurred when attempting expand manifest URI template."))})},d.prototype._invokeOperation=function(e,t,r,s,a){"use strict";var c=this,p=this._resolveUrl("/ops");p+="?invocation_mode=sync,async";var d={op:e,id:u.generateUuid(),target:r,source:t};s&&(d.value=s),u.log("[invoke operation]: "+JSON.stringify(d,void 0,2));var h=function(e,t){var r;if(e)return(t=e.response)&&507===t.statusCode?((e=new n(n.EXCEEDS_QUOTA,"Exceeds quota",e)).response=t,a(e)):a(e);try{r=JSON.parse(t.responseText||t.response)}catch(r){return(e=new n(n.INVALID_DATA,"Invalid JSON returned by server",r)).response=t,a(e)}return r.error?((e=new n(n.UNEXPECTED_RESPONSE,"Error in operation result: "+JSON.stringify(r.error,void 0,2))).response=t,a(e)):a(void 0,t,r)},f=c._service.invoke("POST",p,{"Content-Type":"application/vnd.adobe.asset-operation+json"},JSON.stringify(d),{responseType:"text"},function(t,r){if(t)return h(i("Error invoking operation "+e,t,r));var s=r.statusCode;200===s||201===s||204===s?h(void 0,r):202===s?c._handle202Response(r,f,c.SYNC_ASYNC_DEFAULT_DELAY,function(e,t){h(e,t)}):h(o("Unexpected response for operation "+e,t,r),r)});return f},d.prototype._getPagedCompositeVersionsHref=function(e,t,r,s,i,o){"use strict";var a=e.assetId;if(!a)throw new n(n.INVALID_PARAMS,"Composite must be bound.");if(!this.isProperAssetId(a))throw new n(n.INVALID_STATE,"Composite asset id has invalid format.");return this.getCachedAssetInfo(a,function(e,a){if(e)return e.code===n.ASSET_NOT_FOUND&&(e=new n(n.COMPOSITE_NOT_FOUND,"CompositeNotFound",e)),o(e);if(!a.versionHistory)return o(new n(n.UNEXPECTED_RESPONSE,"Version history URI template is missing."));var c={};s&&(c.order=s),r&&(c.orderby=r),i&&(c.start=i),t&&(c.limit=t);var p=u.expandURITemplate(a.versionHistory,c);return p?o(void 0,p):o(new n(n.UNEXPECTED_RESPONSE,"An error occurred when attempting expand version history URI template."))})},d.prototype._parseAndAppendJSONResponse=function(e,t,r,s){"use strict";var i,o=e.responseText||e.response;try{i=JSON.parse(o)}catch(t){var a=new n(n.INVALID_DATA,"Invalid JSON returned by server",t);return a.response=e,s(a)}return t&&(i[r]=t[r].concat(i[r])),s(void 0,i)},e.exports=d},683:function(e,t){function r(){"use strict";this._originURL=null,this._manageUIURL=null,this._licenseType=null,this._licenseUrl=null,this._attributionURL=null,this._attributionName=null}Object.defineProperties(r.prototype,{originURL:{get:function(){"use strict";return this._originURL},set:function(e){"use strict";this._originURL=e}},manageUIURL:{get:function(){"use strict";return this._manageUIURL},set:function(e){"use strict";this._manageUIURL=e}},licenseType:{get:function(){"use strict";return this._licenseType},set:function(e){"use strict";this._licenseType=e}},licenseUrl:{get:function(){"use strict";return this._licenseUrl},set:function(e){"use strict";this._licenseUrl=e}},attributionURL:{get:function(){"use strict";return this._attributionURL},set:function(e){"use strict";this._attributionURL=e}},attributionName:{get:function(){"use strict";return this._attributionName},set:function(e){"use strict";this._attributionName=e}}}),e.exports=r}}]);
//# sourceMappingURL=logomaker-entry_294e07f9-73b86d3d.js.map