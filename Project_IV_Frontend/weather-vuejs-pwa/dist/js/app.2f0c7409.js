(function(e){function t(t){for(var o,r,c=t[0],s=t[1],u=t[2],d=0,l=[];d<c.length;d++)r=c[d],a[r]&&l.push(a[r][0]),a[r]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);f&&f(t);while(l.length)l.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var c=n[r];0!==a[c]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},r={app:0},a={app:0},i=[];function c(e){return s.p+"js/"+({account:"account",addlocation:"addlocation",editweathercard:"editweathercard",signin:"signin",signup:"signup",splash:"splash",weathercards:"weathercards"}[e]||e)+"."+{account:"abfacbef",addlocation:"e7adbc4f",editweathercard:"18c85403",signin:"2dc5662a",signup:"17e00505",splash:"2189ce99",weathercards:"9d3820b3"}[e]+".js"}function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={account:1,addlocation:1,editweathercard:1,signin:1,signup:1,splash:1,weathercards:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var o="css/"+({account:"account",addlocation:"addlocation",editweathercard:"editweathercard",signin:"signin",signup:"signup",splash:"splash",weathercards:"weathercards"}[e]||e)+"."+{account:"ab2b2515",addlocation:"998568ce",editweathercard:"3a5c479e",signin:"bfb6f070",signup:"fc2d1362",splash:"77a575cc",weathercards:"ccf0494e"}[e]+".css",r=s.p+o,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var c=a[i],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===o||u===r))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){c=d[i],u=c.getAttribute("data-href");if(u===o||u===r)return t()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=t,l.onerror=function(t){var o=t&&t.target&&t.target.src||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");a.request=o,n(a)},l.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(l)}).then(function(){r[e]=0}));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise(function(t,n){o=a[e]=[t,n]});t.push(o[2]=i);var u,d=document.getElementsByTagName("head")[0],l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e),u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+o+": "+r+")");i.type=o,i.request=r,n[1](i)}a[e]=void 0}};var f=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,d.appendChild(l)}return Promise.all(t)},s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],d=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var f=d;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2856:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var o=n("2b0e"),r=n("d247"),a=n.n(r),i=n("e192"),c=n.n(i),s=n("bc3a"),u=n.n(s),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},l=[],f={name:"App",created:function(){this.$http.interceptors.response.use(void 0,function(e){return new Promise(function(t,n){throw 401===e.status&&e.config&&!e.config.__isRetryRequest&&this.$store.dispatch(logout),e})})}},h=f,p=(n("5c0b"),n("2877")),g=Object(p["a"])(h,d,l,!1,null,null,null);g.options.__file="App.vue";var m=g.exports,v=n("8c4f"),w=(n("7f7f"),n("7514"),n("2f62")),b=n("2b27"),y=n.n(b);o["a"].use(w["a"]);var L=new w["a"].Store({state:{status:"",token:y.a.get("token")||"",user:{},username:"",savedLocations:localStorage.getItem("savedLocations")?JSON.parse(localStorage.getItem("savedLocations")):[]},getters:{getAllLocations:function(e){return e.savedLocations},getLocationById:function(e){return function(t){return e.savedLocations.find(function(e){return e.name===t})}},getToken:function(e){return e.token},isLoggedIn:function(e){return!!e.token},authStatus:function(e){return e.status},loggedInUser:function(e){return e.user},loggedUsername:function(e){return e.username}},actions:{addWeatherLocation:function(e,t){var n=e.commit;n("saveNewLocation",t)},updateSavedLocations:function(e,t){var n=e.commit;n("overwriteLocationOrder",t)},updateWeatherData:function(e,t){var n=e.commit;n("overwriteWeatherData",t)},deleteWeatherData:function(e,t){var n=e.commit;n("deleteWeatherData",t)},login:function(e,t){var n=e.commit;return new Promise(function(e,o){n("authRequest"),u()({url:"https://projectivapi20190112011952.azurewebsites.net/api/Auth/login",data:t,method:"POST"}).then(function(t){console.log(t);var o=t.data.token,r=t.data.user;console.log("TRYING TO SAVE TOKEN: "+o),y.a.set("token",o,{expires:1}),console.log("TOKEN SAVE COMPLETE"),n("authSuccess",o,r),n("saveUsername",t.data.userName),e(t)}).catch(function(e){n("authError"),alert("Username or password is wrong"),y.a.remove("token"),o(e)})})},register:function(e,t){var n=e.commit;return new Promise(function(e,o){n("authRequest"),u()({url:"https://projectivapi20190112011952.azurewebsites.net/api/Auth/register",data:t,method:"POST"}).then(function(t){var o=t.data.token,r=t.data.user;y.a.set("token",o,"1d","/app"),n("authSuccess",o,r),e(t)}).catch(function(e){n("authError",e),console.log(e),alert("There was an error creating your account"),y.a.remove("token"),o(e)})})},logout:function(e){var t=e.commit;return new Promise(function(e){t("logout"),y.a.remove("token"),e()}).catch(function(e){console.log(e)})}},mutations:{saveNewLocation:function(e,t){e.savedLocations.push(t),localStorage.setItem("savedLocations",JSON.stringify(e.savedLocations))},overwriteLocationOrder:function(e,t){e.savedLocations=t,localStorage.setItem("savedLocations",JSON.stringify(e.savedLocations))},overwriteWeatherData:function(e,t){var n=new Array(t);e.savedLocations=e.savedLocations.map(function(e){return n.find(function(t){return t.id===e.id})||e}),localStorage.setItem("savedLocations",JSON.stringify(e.savedLocations))},deleteWeatherData:function(e,t){e.savedLocations=e.savedLocations.filter(function(e){return e.id!==t}),localStorage.setItem("savedLocations",JSON.stringify(e.savedLocations))},saveUsername:function(e,t){e.username=t},authRequest:function(e){e.status="loading"},authSuccess:function(e,t,n){e.status="success",e.token=t,e.user=n},authError:function(e){e.status="error"},logout:function(e){e.status="",e.token=""}}});o["a"].use(v["a"]);var S=new v["a"]({mode:"history",base:"/",routes:[{path:"/",name:"splash",component:function(){return n.e("splash").then(n.bind(null,"8f75"))}},{path:"/signin",name:"signin",component:function(){return n.e("signin").then(n.bind(null,"54e2"))}},{path:"/signup",name:"signup",component:function(){return n.e("signup").then(n.bind(null,"5c9c"))}},{path:"/weathercards",name:"weathercards",component:function(){return n.e("weathercards").then(n.bind(null,"df17"))},meta:{requiresAuth:!0}},{path:"/editweathercard/:LocationId",name:"editweathercard",component:function(){return n.e("editweathercard").then(n.bind(null,"0027"))},meta:{requiresAuth:!0}},{path:"/addlocation",name:"addlocation",component:function(){return n.e("addlocation").then(n.bind(null,"5d4f"))},meta:{requiresAuth:!0}},{path:"/account",name:"account",component:function(){return n.e("account").then(n.bind(null,"77be"))},meta:{requiresAuth:!0}}]});S.beforeEach(function(e,t,n){if(e.matched.some(function(e){return e.meta.requiresAuth})){if(L.getters.isLoggedIn)return void n();n("/signin")}else n()});var k=S,O=n("9483");Object(O["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},cached:function(){console.log("Content has been cached for offline use.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}}),o["a"].use(a.a,{mapboxgl:c.a}),o["a"].prototype.$http=u.a,o["a"].config.productionTip=!1,new o["a"]({router:k,store:L,render:function(e){return e(m)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var o=n("2856"),r=n.n(o);r.a}});
//# sourceMappingURL=app.2f0c7409.js.map