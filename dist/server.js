require("source-map-support").install(),module.exports=function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){function t(){if(!o){o=!0;var e=["[Deprecation Warning] Running Node Monkey with 'augmentConsole' enabled.","This is strongly discouraged and will be removed in the v1.0.0 release.","See here for more info: https://github.com/jwarkentin/node-monkey/releases/tag/v1.0.0-rc.1"].join(" ");i.local.warn(e),i.remote.warn(e)}}var n=process.NODE_ENV,r=this.options=w["default"].merge({server:{server:null,host:"0.0.0.0",port:R,silent:!1,bufferSize:50,attachOnStart:!0,disableLocalOutput:!1},client:{showCallerInfo:"production"!==n,convertStyles:!0},ssh:{enabled:!1,host:"0.0.0.0",port:R+1,title:"Node Monkey on "+d["default"].hostname(),prompt:"[Node Monkey] {@username}@"+d["default"].hostname()+":"},dataDir:null},e);this.msgBuffer=[],this.BUNYAN_STREAM=(0,N["default"])(this),this._attached=!1,this._typeHandlers={},this._createLocal(),this._createRemote(),this._setupCmdMan(),this._setupUserManager(),this._setupServer(),this._setupSSH(),r.server.attachOnStart&&this.attachConsole();var i=this,o=!1;console.local=w["default"].mapValues(this.local,function(e,n){var r=function(){return t(),e.apply(console,arguments)};return Object.defineProperty(r,"name",{value:n}),r}),console.remote=w["default"].mapValues(this.remote,function(e,n){var r=function(){return t(),e.apply(console,arguments)};return Object.defineProperty(r,"name",{value:n}),r})}var o=n(1),s=r(o),a=n(2),u=r(a),l=n(10),c=r(l),f=n(3),d=r(f),h=n(4),p=r(h),m=n(5),v=r(m),y=n(29),_=r(y),g=(n(6),n(7)),w=r(g),b=n(8),M=r(b),S=n(9),C=r(S),x=n(12),N=r(x),j=n(15),F=r(j),O=n(17),E=r(O),A=n(22),k=r(A),I=n(19),q=r(I),L=n(26),P=r(L),R=50500,U=w["default"].mapValues(console),D=new _["default"],T=["log","info","warn","error","dir"],z=new RegExp("(Console|Object)\\.("+T.join("|")+")"),J=new RegExp("Logger\\..+bunyan"),H=new RegExp("Object\\.("+T.join("|")+")"),B=0;w["default"].assign(i.prototype,{_getServerProtocol:function(e){return e._events&&e._events.tlsClientError?"https":"http"},getServerPaths:function(){var e=v["default"].normalize(__dirname+"/../dist");return{basePath:e,client:"monkey.js",index:"index.html"}},_displayServerWelcome:function(){if(!this.options.server.silent){var e=this.options.server.server;if(e.listening){var t=this._getServerProtocol(e),n=e.address(),r=n.address,i=n.port;this.local.log("Node Monkey listening at "+t+"://"+r+":"+i)}else e.on("listening",this._displayServerWelcome.bind(this))}},_setupCmdMan:function(){this._cmdMan=new q["default"];var e=this.cmdMan=this._cmdMan.bindI({write:function(e,t){console.log(e)},writeLn:function(e,t){console.log(e)},error:function(e,t){console.error(e)},prompt:function(e,t,n){"function"==typeof t&&(n=t,t=void 0),t||(t={}),console.warn("Prompt not implemented")}});this.addCmd=e.addCmd,this.runCmd=e.runCmd},_setupUserManager:function(){var e=this.options.dataDir,t=this.userManager=new P["default"]({userFile:e?e+"/users.json":void 0,silent:this.options.server.silent});this.cmdMan.addCmd("showusers",function(e,n,r){t.getUsers().then(function(e){n.writeLn((0,c["default"])(e).join("\n")),r()})}),this.cmdMan.addCmd("adduser",function(e,n,r){var i=e.args,o=i._[0];return o?void n.prompt("Password: ",{hideInput:!0},function(e,i){n.writeLn(),n.prompt("Again: ",{hideInput:!0},function(e,s){n.writeLn(),i===s?t.createUser(o,i).then(function(){return n.write("Created user '"+o+"'")})["catch"](n.error).then(r):(n.error("Passwords do not match"),r())})}):(n.error("You must specify a username"),r())}),this.cmdMan.addCmd("deluser",function(e,n,r){var i=e.args,o=i._[0];return o?void t.deleteUser(o).then(function(){return n.write("Deleted user '"+o+"'")})["catch"](n.error).then(r):(n.error("You must specify a username"),r())}),this.cmdMan.addCmd("passwd",function(e,n,r){var i=(e.args,e.username);n.prompt("Current password: ",{hideInput:!0},function(e,o){n.writeLn(),t.verifyUser(i,o).then(function(e){e?n.prompt("Password: ",{hideInput:!0},function(e,o){n.writeLn(),n.prompt("Again: ",{hideInput:!0},function(e,s){n.writeLn(),o===s?t.setPassword(i,o).then(function(){return n.write("Updated password for "+i)})["catch"](n.error).then(r):(n.error("Passwords do not match"),r())})}):(n.error("Incorrect password"),r())})})})},_setupServer:function(){var e=this.options,t=e.server.server;if(!t){var n=(0,F["default"])({name:"Node Monkey"});t=this.options.server.server=n.server;var r=e.server,i=r.host,o=r.port;n.listen(o,i)}this._displayServerWelcome(),this.serverApp=t,this.remoteClients=(0,E["default"])({server:t.server||t,userManager:this.userManager,onAuth:this._sendMessages.bind(this),clientSettings:e.client})},_setupSSH:function(){var e=this.options.ssh;if(e.enabled){var t=this.options.dataDir;if(!t)throw new Error("Options 'dataDir' is required to enable SSH");var n=p["default"].readdirSync(t),r=/\.key$/,i=[],o=!0,s=!1,a=void 0;try{for(var l,c=(0,u["default"])(n);!(o=(l=c.next()).done);o=!0){var f=l.value;r.test(f)&&i.push(t+"/"+f)}}catch(d){s=!0,a=d}finally{try{!o&&c["return"]&&c["return"]()}finally{if(s)throw a}}if(!i.length){console.log("No SSH host key found. Generating new host key...");var h=(0,M["default"])();p["default"].writeFileSync(t+"/rsa.key",h["private"]),p["default"].writeFileSync(t+"/rsa.key.pub",h["public"]),i=[t+"/rsa.key"]}this.SSHMan=new k["default"]({monkey:this,cmdManager:this._cmdMan,userManager:this.userManager,silent:this.options.server.silent,host:e.host,port:e.port,title:w["default"].result(e,"title"),prompt:w["default"].result(e,"prompt"),hostKeys:i})}},_getCallerInfo:function(){if(this.options.client.showCallerInfo){var e=(new Error).stack.toString().split("\n"),t=e.find(function(e,t,n){return t>0&&(z.test(e)||!J.test(e)&&J.test(n[t-1]))});if(t||(t=e[6]),t){var n=t.match(/at (.*) \((.*):(.*):(.*)\)/)||t.match(/at ()(.*):(.*):(.*)/),r={caller:n[1].replace(H,"Console.$1"),file:n[2],line:parseInt(n[3]),column:parseInt(n[4])};return r}}},_sendMessage:function(e){this.msgBuffer.push({method:e.method,args:e.args,callerInfo:e.callerInfo||this._getCallerInfo()}),this.msgBuffer.length>this.options.server.bufferSize&&this.msgBuffer.shift(),this._sendMessages()},_sendMessages:function(){var e=this.remoteClients;w["default"].size(e.adapter.rooms.authed)&&(w["default"].each(this.msgBuffer,function(t){e.to("authed").emit("console",C["default"].decycle(t))}),this.msgBuffer=[])},_createLocal:function(){this.local=U},_createRemote:function(){var e=this,t=this,n=this.remote={};T.forEach(function(r){e.remote[r]=function(){t._sendMessage({method:r,args:Array.prototype.slice.call(arguments)})},Object.defineProperty(n[r],"name",{value:r})})},attachConsole:function(e){var t=this;if(!this._attached){B||T.forEach(function(e){console[e]=function(){D.emit.apply(D,[e].concat(Array.prototype.slice.call(arguments)))},Object.defineProperty(console[e],"name",{value:e})}),++B;var n=this,r=this.options.server;e=void 0!==e?e:r.disableLocalOutput,w["default"].each(this.remote,function(r,i){var o=t._typeHandlers[i]=function(){r.apply(n.remote,arguments),e||n.local[i].apply(console,arguments)};D.on(i,o)}),this._attached=!0}},detachConsole:function(){var e=this;(0,s["default"])(console,this.local),this._attached=!1,--B,T.forEach(function(t){D.removeListener(t,e._typeHandlers[t]),delete e._typeHandlers[t]})}});var K={},V=R-1;e.exports=function(e){var t=arguments.length<=1||void 0===arguments[1]?"default":arguments[1];if("string"==typeof e&&(t=e,e=void 0),!K[t]){e||(e={});var n=w["default"].get(e,"server.port");n?V=+n:(w["default"].set(e,"server.port",++V),w["default"].set(e,"ssh.port",++V)),K[t]=new i(e)}return K[t]},e.exports.NodeMonkey=i},function(e,t){e.exports=require("babel-runtime/core-js/object/assign")},function(e,t){e.exports=require("babel-runtime/core-js/get-iterator")},function(e,t){e.exports=require("os")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("child_process")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("keypair")},function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _keys=__webpack_require__(10),_keys2=_interopRequireDefault(_keys),_typeof2=__webpack_require__(11),_typeof3=_interopRequireDefault(_typeof2),origJSON=global.JSON,JSON={};module.exports=JSON,"function"!=typeof JSON.decycle&&(JSON.decycle=function(e,t){var n=[],r=[];return function i(e,o){var s,a;return void 0!==t&&(e=t(e)),"object"!==("undefined"==typeof e?"undefined":(0,_typeof3["default"])(e))||null===e||e instanceof Boolean||e instanceof Date||e instanceof Number||e instanceof RegExp||e instanceof String?e:(s=n.indexOf(e),s>=0?{$ref:r[s]}:(n.push(e),r.push(o),Array.isArray(e)?(a=[],e.forEach(function(e,t){a[t]=i(e,o+"["+t+"]")})):(a={},(0,_keys2["default"])(e).forEach(function(t){a[t]=i(e[t],o+"["+JSON.stringify(t)+"]")})),a))}(e,"$")}),"function"!=typeof JSON.retrocycle&&(JSON.retrocycle=function retrocycle($){var px=/^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;return function rez(value){value&&"object"===("undefined"==typeof value?"undefined":(0,_typeof3["default"])(value))&&(Array.isArray(value)?value.forEach(function(element,i){if("object"===("undefined"==typeof element?"undefined":(0,_typeof3["default"])(element))&&null!==element){var path=element.$ref;"string"==typeof path&&px.test(path)?value[i]=eval(path):rez(element)}}):(0,_keys2["default"])(value).forEach(function(name){var item=value[name];if("object"===("undefined"==typeof item?"undefined":(0,_typeof3["default"])(item))&&null!==item){var path=item.$ref;"string"==typeof path&&px.test(path)?value[name]=eval(path):rez(item)}}))}($),$}),JSON=origJSON},function(e,t){e.exports=require("babel-runtime/core-js/object/keys")},function(e,t){e.exports=require("babel-runtime/helpers/typeof")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(13),o=r(i),s=10,a=20,u=30,l=40,c=50,f=60,d={trace:s,debug:a,info:u,warn:l,error:c,fatal:f},h=o["default"].invert(d);t["default"]=function(e){return{write:function(t){t=JSON.parse(t);var n=t.src;e._sendMessage({method:h[t.level]||"info",args:[t.msg,t],callerInfo:n&&{caller:n.func||"anonymous",file:n.file,line:n.line,column:0}})}}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),o=r(i),s=n(14),a=r(s);t["default"]=(0,o["default"])({parseCommand:function(e){var t=/"(.*?)"|'(.*?)'|`(.*?)`|([^\s"]+)/gi,n=[],r=void 0;do r=t.exec(e),null!==r&&n.push(r[1]||r[2]||r[3]||r[4]);while(null!==r);return n}},a["default"])},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(11),o=r(i);e.exports={isObject:function(e){var t="undefined"==typeof e?"undefined":(0,o["default"])(e);return!!e&&("object"==t||"function"==t)},invert:function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[e[n]]=n);return t}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(16),o=r(i);t["default"]=function(e){var t=o["default"].createServer();return t.pre(o["default"].pre.userAgentConnection()),t.use(o["default"].gzipResponse()),t.use(o["default"].CORS({credentials:!0})),t.get(/.*/,o["default"].serveStatic({directory:__dirname,"default":"index.html"})),t}},function(e,t){e.exports=require("restify")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){var t=0,n={},r={writeLn:null,write:function(t,n){t&&e.emit("console",{method:"log",args:[t]})},error:function(t,n){t&&e.emit("console",{method:"error",args:[t]})},prompt:function(r,i,o){"function"==typeof i&&(o=i,i=void 0),i||(i={});var s=t++;e.emit("prompt",s,r,i),n[s]=o}};return r.writeLn=r.write,e.on("promptResponse",function(e,t){n[e]&&n[e](null,t)}),new c["default"](r)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(7),s=r(o),a=n(18),u=r(a),l=n(19),c=r(l);t["default"]=function(e){var t=void 0,n=void 0,r=e.userManager;return"function"==typeof e.server?t=(0,u["default"])(e.server):(t=(0,u["default"])(),t.attach(e.server)),n=t.of("/nm"),n.on("connection",function(t){var n=null;t.emit("settings",e.clientSettings),t.emit("auth"),t.on("auth",function(n){r.verifyUser(n.username,n.password).then(function(r){t.emit("authResponse",r,r?void 0:"Incorrect password"),r&&(t.username=n.username,t.join("authed"),e.onAuth&&e.onAuth(t))})["catch"](function(e){t.emit("authResponse",!1,e)})}),t.on("cmd",function(e,r){return t.username?(n||(n=i(t)),void n.runCmd(r,t.username).then(function(n){t.emit("cmdResponse",e,null,n)})["catch"](function(n){t.emit("cmdResponse",e,n&&n.message||n,null)})):void t.emit("cmdResponse",e,"You are not authorized to run commands")})}),s["default"].each(e.handlers,function(e,n){t.on(n,e)}),n}},function(e,t){e.exports=require("socket.io")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(){this.commands={}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(20),s=r(o),a=n(1),u=r(a),l=n(7),c=r(l),f=n(13),d=r(f),h=n(21),p=r(h);(0,u["default"])(i.prototype,{addCmd:function(e,t,n){if(this.commands[e])throw new Error("'"+e+"' is already registered as a command");"function"==typeof t&&(n=t,t={}),this.commands[e]={opts:t,exec:n}},bindI:function(e){var t=this,n=c["default"].mapValues(this);return(0,u["default"])(n,c["default"].mapValues(this.constructor.prototype,function(n,r){return n instanceof Function?"runCmd"===r?n.bind(t,e):n.bind(t):n})),n},runCmd:function(e,t,n){var r=this;return new s["default"](function(i,o){var s=d["default"].parseCommand(t),a=s[0],u=r.commands[a];if(!n)return o("Missing user context for command '"+a+"'");if(!u)return o("Command not found: '"+a+"'");var l=(0,p["default"])(s.slice(1));u.exec({args:l,username:n},{write:e.write,writeLn:e.writeLn,error:e.error,prompt:e.prompt},i)})}}),t["default"]=i},function(e,t){e.exports=require("babel-runtime/core-js/promise")},function(e,t){e.exports=require("minimist")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){this.options=e=(0,h["default"])({host:"127.0.0.1",port:50501,title:"Node Monkey",prompt:"Node Monkey:",silent:!1},e),this.clients={},this.clientId=1,this.server=y["default"].Server({hostKeys:e.hostKeys.map(function(e){return m["default"].readFileSync(e)})},this.onClient.bind(this));var t=this.options.monkey;this.server.listen(e.port,e.host,function(){e.silent||t.local.log("SSH listening on "+this.address().port)})}function o(e){this.options=e,this.client=e.client,this.cmdMan=null,this.userManager=e.userManager,this.session=null,this.stream=null,this.term=null,this.ptyInfo=null,this.title=e.title,this.promptTxt=e.prompt+" ",this.inputActive=!1,this.cmdHistory=[],this.username=null,this.client.on("authentication",this.onAuth.bind(this)),this.client.on("ready",this.onReady.bind(this)),this.client.on("end",this.onClose.bind(this))}Object.defineProperty(t,"__esModule",{value:!0});var s=n(23),a=r(s),u=n(10),l=r(u),c=n(2),f=r(c),d=n(1),h=r(d),p=n(4),m=r(p),v=n(24),y=r(v),_=n(25),g=r(_),w=n(19);r(w);(0,h["default"])(i.prototype,{shutdown:function(){var e=this.clients,t=!0,n=!1,r=void 0;try{for(var i,o=(0,f["default"])(e);!(t=(i=o.next()).done);t=!0){var s=i.value;s.write("\nShutting down"),s.close()}}catch(a){n=!0,r=a}finally{try{!t&&o["return"]&&o["return"]()}finally{if(n)throw r}}},onClient:function(e){var t=this,n=n++;this.clients[n]=new o({client:e,cmdManager:this.options.cmdManager,userManager:this.options.userManager,title:this.options.title,prompt:this.options.prompt,onClose:function(){return delete t.clients[n]}})}}),(0,h["default"])(o.prototype,{_initCmdMan:function(){var e=this,t={writeLn:null,write:function(t,n){n||(n={}),t||(t=""),n.bold?e.term.bold(t):e.term(t),n.newline&&e.term.nextLine()},error:function(t,n){n||(n={}),e.term.red(t),n.newline&&e.term.nextLine()},prompt:function(){var t=arguments.length<=0||void 0===arguments[0]?"":arguments[0],n=arguments[1],r=arguments[2];"function"==typeof n&&(r=n,n=void 0),n||(n={});var i={};n.hideInput&&(i.echo=!1),e.term(t),e.term.inputField(i,r)}};t.writeLn=function(e,n){n||(n={}),n.newline=!0,t.write(e,n)},this.cmdMan=this.options.cmdManager.bindI(t)},write:function(e,t){t||(t={}),this.term&&(t.style?this.term[style](e):this.term(e))},close:function(){this.stream&&this.stream.end(),this.onClose()},onAuth:function(e){var t=this;"password"==e.method?this.userManager.verifyUser(e.username,e.password).then(function(n){n?(t.username=e.username,e.accept()):e.reject()})["catch"](function(t){e.reject()}):"publickey"==e.method?e.reject():e.reject()},onReady:function(){var e=this;this.client.on("session",function(t,n){e.session=t(),e.session.once("pty",function(t,n,r){e.ptyInfo=r,t&&t()}).on("window-change",e.onWindowChange.bind(e)).once("shell",function(t,n){e.stream=t(),e._initCmdMan(),e._initStream(),e._initTerm()})})},onWindowChange:function(e,t,n){var r=this.stream;(0,h["default"])(this.ptyInfo,n),r&&(r.rows=n.rows,r.columns=n.cols,r.emit("resize")),e&&e()},onClose:function b(){var b=this.options.onClose;b&&b()},onKey:function(e,t,n){"CTRL_L"===e?this.clearScreen():"CTRL_D"===e&&(this.term.nextLine(),this.close())},_initStream:function(){var e=this,t=this.stream;t.name=this.title,t.rows=this.ptyInfo.rows||24,t.columns=this.ptyInfo.cols||80,t.isTTY=!0,t.setRawMode=function(){},t.on("error",function(e){console.error("SSH stream error:",e.message)}),t.stdout.getWindowSize=function(){return[e.ptyInfo.cols,e.ptyInfo.rows]}},_initTerm:function(){var e=this.stream,t=this.term=g["default"].createTerminal({stdin:e.stdin,stdout:e.stdout,stderr:e.stderr,generic:this.ptyInfo.term,appName:this.title});t.options.crlf=!0,t.on("key",this.onKey.bind(this)),t.windowTitle(this._interpolate(this.title)),this.clearScreen()},_interpolate:function(e){for(var t=/{@(.+?)}/g,n={username:this.username},r=void 0;r=t.exec(e);)n[r[1]]&&(e=e.replace(r[0],n[r[1]]));return e},clearScreen:function(){this.term.clear(),this.prompt()},prompt:function(){var e=this,t=this.term;t.windowTitle(this._interpolate(this.title)),t.bold(this._interpolate(this.promptTxt)),this.inputActive||(this.inputActive=!0,t.inputField({history:this.cmdHistory,autoComplete:(0,l["default"])(this.cmdMan.commands),autoCompleteMenu:!0},function(n,r){e.inputActive=!1," "!==r[0]&&e.cmdHistory.push(r),t.nextLine(),"exit"===r?e.close():"clear"===r?e.clearScreen():r?e.cmdMan.runCmd(r,e.username).then(function(t){"string"!=typeof t&&(t=(0,a["default"])(t,null,"  ")),e.term(t),e.term.nextLine(),e.prompt()})["catch"](function(t){"string"!=typeof t&&(t=t.message||(0,a["default"])(t,null,"  ")),e.term.red.error(t),e.term.nextLine(),e.prompt()}):e.prompt()}))}}),t["default"]=i},function(e,t){e.exports=require("babel-runtime/core-js/json/stringify")},function(e,t){e.exports=require("ssh2")},function(e,t){e.exports=require("terminal-kit")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){return _?new Buffer(e,t):Buffer.from(e,t)}function o(e){this.userFile=e.userFile,this.userFileCache=null,this.userFileCreated=!1,e.silent||this.getUsers().then(function(e){var t=(0,h["default"])(e);t.length?1===t.length&&"guest"===t[0]&&console.warn("[WARN] No users detected. You can login with default user 'guest' and password 'guest' when prompted.\nThis user will be disabled when you create a user account.\n"):"production"===process.env.NODE_ENV?console.warn("No users have been created and you are running in production mode so you will not be able to login.\n"):console.warn("It seems there are no users and you are not running in production mode so you will not be able to login. This is probably a bug. Please report it!\n")})}Object.defineProperty(t,"__esModule",{value:!0});var s=n(20),a=r(s),u=n(23),l=r(u),c=n(1),f=r(c),d=n(10),h=r(d),p=n(4),m=r(p),v=n(27),y=r(v),_=!1;try{Buffer.from("","base64")}catch(g){_=!0}(0,f["default"])(o.prototype,{_readFile:function(){var e=this;if(this.userFileCache)return this.userFileCache;try{if(!this.userFile){var t=new Error("No user file specified");throw t.code="ENOENT",t}return this.userFileCache=JSON.parse(m["default"].readFileSync(this.userFile)),this.userFileCreated=!0,setTimeout(function(){e.userFileCache=null},5e3),this.userFileCache}catch(t){if("ENOENT"===t.code)return"production"===process.env.NODE_ENV?{}:{guest:{password:"c2NyeXB0AAEAAAABAAAAAZS+vE1+zh4nY6vN21zM3dIzpJVImr8OrK0iJoA+iUPk7WIdo3RhgeATzWENocd7gKNbEKVgq6LbXqrmVjLtnYy5FXyfRCtEtmjUuj19AqcW"}};throw t}},_writeFile:function(e){this.userFileCache=null,m["default"].writeFileSync(this.userFile,(0,l["default"])(e,null,"  ")),this.userFileCreated=!0},_hashPassword:function(e){return y["default"].kdfSync(e.normalize("NFKC"),{N:1,r:1,p:1}).toString("base64")},_verifyPassword:function(e,t){return y["default"].verifyKdfSync(i(e,"base64"),t.normalize("NFKC"))},createUser:function(e,t){var n=this;return new a["default"](function(r,i){if(!n.userFile)return i(new Error("No user file found. Did you forget to set the 'dataDir' option?"));var o=n._readFile();return o[e]?i(new Error("User '"+e+"' already exists")):(n.userFileCreated||delete o.guest,o[e]={password:n._hashPassword(t)},n._writeFile(o),void r())})},deleteUser:function(e){var t=this;return new a["default"](function(n,r){if(!t.userFile)return r(new Error("No user file found. Did you forget to set the 'dataDir' option?"));var i=t._readFile();return i[e]?t.userFileCreated?(delete i[e],t._writeFile(i),void n()):r(new Error("User file has not been created")):r(new Error("User '"+e+"' does not exist"))})},setPassword:function(e,t){var n=this;return new a["default"](function(r,i){if(!n.userFile)return i(new Error("No user file found. Did you forget to set the 'dataDir' option?"));var o=n._readFile();o[e].password=n._hashPassword(t),n._writeFile(o),r()})},getUsers:function(){var e=this;return new a["default"](function(t,n){t(e._readFile())})},getUserData:function(e){var t=this;return new a["default"](function(n,r){var i=t._readFile();return i[e]?void n(i[e]):r(new Error("User '"+e+"' does not exist"))})},verifyUser:function(e,t){var n=this;return new a["default"](function(r,i){n.getUserData(e).then(function(e){r(n._verifyPassword(e.password,t))})["catch"](i)})}}),t["default"]=o},function(e,t){e.exports=require("scrypt")},,function(e,t){e.exports=require("events")}]);
//# sourceMappingURL=server.js.map