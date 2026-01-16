var Tv=Object.defineProperty;var Th=t=>{throw TypeError(t)};var zv=(t,e,n)=>e in t?Tv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ee=(t,e,n)=>zv(t,typeof e!="symbol"?e+"":e,n),yc=(t,e,n)=>e.has(t)||Th("Cannot "+n);var Z=(t,e,n)=>(yc(t,e,"read from private field"),n?n.call(t):e.get(t)),Lt=(t,e,n)=>e.has(t)?Th("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,n),Qe=(t,e,n,s)=>(yc(t,e,"write to private field"),s?s.call(t,n):e.set(t,n),n),os=(t,e,n)=>(yc(t,e,"access private method"),n);function Iv(t,e){for(var n=0;n<e.length;n++){const s=e[n];if(typeof s!="string"&&!Array.isArray(s)){for(const r in s)if(r!=="default"&&!(r in t)){const i=Object.getOwnPropertyDescriptor(s,r);i&&Object.defineProperty(t,r,i.get?i:{enumerable:!0,get:()=>s[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();var Fv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Gd(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var bx={exports:{}},$l={},wx={exports:{}},ye={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Io=Symbol.for("react.element"),Rv=Symbol.for("react.portal"),Lv=Symbol.for("react.fragment"),Bv=Symbol.for("react.strict_mode"),$v=Symbol.for("react.profiler"),Uv=Symbol.for("react.provider"),Wv=Symbol.for("react.context"),Vv=Symbol.for("react.forward_ref"),Hv=Symbol.for("react.suspense"),Yv=Symbol.for("react.memo"),Kv=Symbol.for("react.lazy"),zh=Symbol.iterator;function Gv(t){return t===null||typeof t!="object"?null:(t=zh&&t[zh]||t["@@iterator"],typeof t=="function"?t:null)}var kx={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},jx=Object.assign,Sx={};function ci(t,e,n){this.props=t,this.context=e,this.refs=Sx,this.updater=n||kx}ci.prototype.isReactComponent={};ci.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};ci.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function _x(){}_x.prototype=ci.prototype;function qd(t,e,n){this.props=t,this.context=e,this.refs=Sx,this.updater=n||kx}var Xd=qd.prototype=new _x;Xd.constructor=qd;jx(Xd,ci.prototype);Xd.isPureReactComponent=!0;var Ih=Array.isArray,Nx=Object.prototype.hasOwnProperty,Qd={current:null},Cx={key:!0,ref:!0,__self:!0,__source:!0};function Ex(t,e,n){var s,r={},i=null,o=null;if(e!=null)for(s in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)Nx.call(e,s)&&!Cx.hasOwnProperty(s)&&(r[s]=e[s]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var c=Array(a),u=0;u<a;u++)c[u]=arguments[u+2];r.children=c}if(t&&t.defaultProps)for(s in a=t.defaultProps,a)r[s]===void 0&&(r[s]=a[s]);return{$$typeof:Io,type:t,key:i,ref:o,props:r,_owner:Qd.current}}function qv(t,e){return{$$typeof:Io,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Zd(t){return typeof t=="object"&&t!==null&&t.$$typeof===Io}function Xv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Fh=/\/+/g;function vc(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Xv(""+t.key):e.toString(36)}function Oa(t,e,n,s,r){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Io:case Rv:o=!0}}if(o)return o=t,r=r(o),t=s===""?"."+vc(o,0):s,Ih(r)?(n="",t!=null&&(n=t.replace(Fh,"$&/")+"/"),Oa(r,e,n,"",function(u){return u})):r!=null&&(Zd(r)&&(r=qv(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Fh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,s=s===""?".":s+":",Ih(t))for(var a=0;a<t.length;a++){i=t[a];var c=s+vc(i,a);o+=Oa(i,e,n,c,r)}else if(c=Gv(t),typeof c=="function")for(t=c.call(t),a=0;!(i=t.next()).done;)i=i.value,c=s+vc(i,a++),o+=Oa(i,e,n,c,r);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function qo(t,e,n){if(t==null)return t;var s=[],r=0;return Oa(t,s,"","",function(i){return e.call(n,i,r++)}),s}function Qv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Ft={current:null},Ta={transition:null},Zv={ReactCurrentDispatcher:Ft,ReactCurrentBatchConfig:Ta,ReactCurrentOwner:Qd};function Mx(){throw Error("act(...) is not supported in production builds of React.")}ye.Children={map:qo,forEach:function(t,e,n){qo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return qo(t,function(){e++}),e},toArray:function(t){return qo(t,function(e){return e})||[]},only:function(t){if(!Zd(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ye.Component=ci;ye.Fragment=Lv;ye.Profiler=$v;ye.PureComponent=qd;ye.StrictMode=Bv;ye.Suspense=Hv;ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Zv;ye.act=Mx;ye.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var s=jx({},t.props),r=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Qd.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(c in e)Nx.call(e,c)&&!Cx.hasOwnProperty(c)&&(s[c]=e[c]===void 0&&a!==void 0?a[c]:e[c])}var c=arguments.length-2;if(c===1)s.children=n;else if(1<c){a=Array(c);for(var u=0;u<c;u++)a[u]=arguments[u+2];s.children=a}return{$$typeof:Io,type:t.type,key:r,ref:i,props:s,_owner:o}};ye.createContext=function(t){return t={$$typeof:Wv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Uv,_context:t},t.Consumer=t};ye.createElement=Ex;ye.createFactory=function(t){var e=Ex.bind(null,t);return e.type=t,e};ye.createRef=function(){return{current:null}};ye.forwardRef=function(t){return{$$typeof:Vv,render:t}};ye.isValidElement=Zd;ye.lazy=function(t){return{$$typeof:Kv,_payload:{_status:-1,_result:t},_init:Qv}};ye.memo=function(t,e){return{$$typeof:Yv,type:t,compare:e===void 0?null:e}};ye.startTransition=function(t){var e=Ta.transition;Ta.transition={};try{t()}finally{Ta.transition=e}};ye.unstable_act=Mx;ye.useCallback=function(t,e){return Ft.current.useCallback(t,e)};ye.useContext=function(t){return Ft.current.useContext(t)};ye.useDebugValue=function(){};ye.useDeferredValue=function(t){return Ft.current.useDeferredValue(t)};ye.useEffect=function(t,e){return Ft.current.useEffect(t,e)};ye.useId=function(){return Ft.current.useId()};ye.useImperativeHandle=function(t,e,n){return Ft.current.useImperativeHandle(t,e,n)};ye.useInsertionEffect=function(t,e){return Ft.current.useInsertionEffect(t,e)};ye.useLayoutEffect=function(t,e){return Ft.current.useLayoutEffect(t,e)};ye.useMemo=function(t,e){return Ft.current.useMemo(t,e)};ye.useReducer=function(t,e,n){return Ft.current.useReducer(t,e,n)};ye.useRef=function(t){return Ft.current.useRef(t)};ye.useState=function(t){return Ft.current.useState(t)};ye.useSyncExternalStore=function(t,e,n){return Ft.current.useSyncExternalStore(t,e,n)};ye.useTransition=function(){return Ft.current.useTransition()};ye.version="18.3.1";wx.exports=ye;var E=wx.exports;const Px=Gd(E),Jv=Iv({__proto__:null,default:Px},[E]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var eb=E,tb=Symbol.for("react.element"),nb=Symbol.for("react.fragment"),sb=Object.prototype.hasOwnProperty,rb=eb.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ib={key:!0,ref:!0,__self:!0,__source:!0};function Dx(t,e,n){var s,r={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(s in e)sb.call(e,s)&&!ib.hasOwnProperty(s)&&(r[s]=e[s]);if(t&&t.defaultProps)for(s in e=t.defaultProps,e)r[s]===void 0&&(r[s]=e[s]);return{$$typeof:tb,type:t,key:i,ref:o,props:r,_owner:rb.current}}$l.Fragment=nb;$l.jsx=Dx;$l.jsxs=Dx;bx.exports=$l;var l=bx.exports,yu={},Ax={exports:{}},Jt={},Ox={exports:{}},Tx={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(z,M){var T=z.length;z.push(M);e:for(;0<T;){var I=T-1>>>1,R=z[I];if(0<r(R,M))z[I]=M,z[T]=R,T=I;else break e}}function n(z){return z.length===0?null:z[0]}function s(z){if(z.length===0)return null;var M=z[0],T=z.pop();if(T!==M){z[0]=T;e:for(var I=0,R=z.length,B=R>>>1;I<B;){var K=2*(I+1)-1,se=z[K],ce=K+1,ge=z[ce];if(0>r(se,T))ce<R&&0>r(ge,se)?(z[I]=ge,z[ce]=T,I=ce):(z[I]=se,z[K]=T,I=K);else if(ce<R&&0>r(ge,T))z[I]=ge,z[ce]=T,I=ce;else break e}}return M}function r(z,M){var T=z.sortIndex-M.sortIndex;return T!==0?T:z.id-M.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var c=[],u=[],d=1,f=null,h=3,m=!1,g=!1,x=!1,v=typeof setTimeout=="function"?setTimeout:null,b=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(z){for(var M=n(u);M!==null;){if(M.callback===null)s(u);else if(M.startTime<=z)s(u),M.sortIndex=M.expirationTime,e(c,M);else break;M=n(u)}}function _(z){if(x=!1,y(z),!g)if(n(c)!==null)g=!0,$(j);else{var M=n(u);M!==null&&D(_,M.startTime-z)}}function j(z,M){g=!1,x&&(x=!1,b(w),w=-1),m=!0;var T=h;try{for(y(M),f=n(c);f!==null&&(!(f.expirationTime>M)||z&&!P());){var I=f.callback;if(typeof I=="function"){f.callback=null,h=f.priorityLevel;var R=I(f.expirationTime<=M);M=t.unstable_now(),typeof R=="function"?f.callback=R:f===n(c)&&s(c),y(M)}else s(c);f=n(c)}if(f!==null)var B=!0;else{var K=n(u);K!==null&&D(_,K.startTime-M),B=!1}return B}finally{f=null,h=T,m=!1}}var N=!1,C=null,w=-1,k=5,S=-1;function P(){return!(t.unstable_now()-S<k)}function O(){if(C!==null){var z=t.unstable_now();S=z;var M=!0;try{M=C(!0,z)}finally{M?A():(N=!1,C=null)}}else N=!1}var A;if(typeof p=="function")A=function(){p(O)};else if(typeof MessageChannel<"u"){var U=new MessageChannel,L=U.port2;U.port1.onmessage=O,A=function(){L.postMessage(null)}}else A=function(){v(O,0)};function $(z){C=z,N||(N=!0,A())}function D(z,M){w=v(function(){z(t.unstable_now())},M)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(z){z.callback=null},t.unstable_continueExecution=function(){g||m||(g=!0,$(j))},t.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):k=0<z?Math.floor(1e3/z):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(c)},t.unstable_next=function(z){switch(h){case 1:case 2:case 3:var M=3;break;default:M=h}var T=h;h=M;try{return z()}finally{h=T}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(z,M){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var T=h;h=z;try{return M()}finally{h=T}},t.unstable_scheduleCallback=function(z,M,T){var I=t.unstable_now();switch(typeof T=="object"&&T!==null?(T=T.delay,T=typeof T=="number"&&0<T?I+T:I):T=I,z){case 1:var R=-1;break;case 2:R=250;break;case 5:R=1073741823;break;case 4:R=1e4;break;default:R=5e3}return R=T+R,z={id:d++,callback:M,priorityLevel:z,startTime:T,expirationTime:R,sortIndex:-1},T>I?(z.sortIndex=T,e(u,z),n(c)===null&&z===n(u)&&(x?(b(w),w=-1):x=!0,D(_,T-I))):(z.sortIndex=R,e(c,z),g||m||(g=!0,$(j))),z},t.unstable_shouldYield=P,t.unstable_wrapCallback=function(z){var M=h;return function(){var T=h;h=M;try{return z.apply(this,arguments)}finally{h=T}}}})(Tx);Ox.exports=Tx;var ob=Ox.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ab=E,Zt=ob;function G(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var zx=new Set,ro={};function xr(t,e){Jr(t,e),Jr(t+"Capture",e)}function Jr(t,e){for(ro[t]=e,t=0;t<e.length;t++)zx.add(e[t])}var Qn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),vu=Object.prototype.hasOwnProperty,lb=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Rh={},Lh={};function cb(t){return vu.call(Lh,t)?!0:vu.call(Rh,t)?!1:lb.test(t)?Lh[t]=!0:(Rh[t]=!0,!1)}function ub(t,e,n,s){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return s?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function db(t,e,n,s){if(e===null||typeof e>"u"||ub(t,e,n,s))return!0;if(s)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Rt(t,e,n,s,r,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=s,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var vt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){vt[t]=new Rt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];vt[e]=new Rt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){vt[t]=new Rt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){vt[t]=new Rt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){vt[t]=new Rt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){vt[t]=new Rt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){vt[t]=new Rt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){vt[t]=new Rt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){vt[t]=new Rt(t,5,!1,t.toLowerCase(),null,!1,!1)});var Jd=/[\-:]([a-z])/g;function ef(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Jd,ef);vt[e]=new Rt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Jd,ef);vt[e]=new Rt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Jd,ef);vt[e]=new Rt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){vt[t]=new Rt(t,1,!1,t.toLowerCase(),null,!1,!1)});vt.xlinkHref=new Rt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){vt[t]=new Rt(t,1,!1,t.toLowerCase(),null,!0,!0)});function tf(t,e,n,s){var r=vt.hasOwnProperty(e)?vt[e]:null;(r!==null?r.type!==0:s||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(db(e,n,r,s)&&(n=null),s||r===null?cb(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,s=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,s?t.setAttributeNS(s,e,n):t.setAttribute(e,n))))}var ss=ab.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Xo=Symbol.for("react.element"),Er=Symbol.for("react.portal"),Mr=Symbol.for("react.fragment"),nf=Symbol.for("react.strict_mode"),bu=Symbol.for("react.profiler"),Ix=Symbol.for("react.provider"),Fx=Symbol.for("react.context"),sf=Symbol.for("react.forward_ref"),wu=Symbol.for("react.suspense"),ku=Symbol.for("react.suspense_list"),rf=Symbol.for("react.memo"),cs=Symbol.for("react.lazy"),Rx=Symbol.for("react.offscreen"),Bh=Symbol.iterator;function xi(t){return t===null||typeof t!="object"?null:(t=Bh&&t[Bh]||t["@@iterator"],typeof t=="function"?t:null)}var Ye=Object.assign,bc;function zi(t){if(bc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);bc=e&&e[1]||""}return`
`+bc+t}var wc=!1;function kc(t,e){if(!t||wc)return"";wc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var s=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){s=u}t.call(e.prototype)}else{try{throw Error()}catch(u){s=u}t()}}catch(u){if(u&&s&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),i=s.stack.split(`
`),o=r.length-1,a=i.length-1;1<=o&&0<=a&&r[o]!==i[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==i[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==i[a]){var c=`
`+r[o].replace(" at new "," at ");return t.displayName&&c.includes("<anonymous>")&&(c=c.replace("<anonymous>",t.displayName)),c}while(1<=o&&0<=a);break}}}finally{wc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?zi(t):""}function fb(t){switch(t.tag){case 5:return zi(t.type);case 16:return zi("Lazy");case 13:return zi("Suspense");case 19:return zi("SuspenseList");case 0:case 2:case 15:return t=kc(t.type,!1),t;case 11:return t=kc(t.type.render,!1),t;case 1:return t=kc(t.type,!0),t;default:return""}}function ju(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Mr:return"Fragment";case Er:return"Portal";case bu:return"Profiler";case nf:return"StrictMode";case wu:return"Suspense";case ku:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Fx:return(t.displayName||"Context")+".Consumer";case Ix:return(t._context.displayName||"Context")+".Provider";case sf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case rf:return e=t.displayName||null,e!==null?e:ju(t.type)||"Memo";case cs:e=t._payload,t=t._init;try{return ju(t(e))}catch{}}return null}function hb(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ju(e);case 8:return e===nf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Ts(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Lx(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function pb(t){var e=Lx(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),s=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){s=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return s},setValue:function(o){s=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Qo(t){t._valueTracker||(t._valueTracker=pb(t))}function Bx(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),s="";return t&&(s=Lx(t)?t.checked?"true":"false":t.value),t=s,t!==n?(e.setValue(t),!0):!1}function Za(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Su(t,e){var n=e.checked;return Ye({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function $h(t,e){var n=e.defaultValue==null?"":e.defaultValue,s=e.checked!=null?e.checked:e.defaultChecked;n=Ts(e.value!=null?e.value:n),t._wrapperState={initialChecked:s,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function $x(t,e){e=e.checked,e!=null&&tf(t,"checked",e,!1)}function _u(t,e){$x(t,e);var n=Ts(e.value),s=e.type;if(n!=null)s==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(s==="submit"||s==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Nu(t,e.type,n):e.hasOwnProperty("defaultValue")&&Nu(t,e.type,Ts(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Uh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var s=e.type;if(!(s!=="submit"&&s!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Nu(t,e,n){(e!=="number"||Za(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ii=Array.isArray;function Vr(t,e,n,s){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&s&&(t[n].defaultSelected=!0)}else{for(n=""+Ts(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,s&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Cu(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(G(91));return Ye({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Wh(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(G(92));if(Ii(n)){if(1<n.length)throw Error(G(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Ts(n)}}function Ux(t,e){var n=Ts(e.value),s=Ts(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),s!=null&&(t.defaultValue=""+s)}function Vh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Wx(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Eu(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Wx(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Zo,Vx=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,s,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,s,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Zo=Zo||document.createElement("div"),Zo.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Zo.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function io(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Vi={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},mb=["Webkit","ms","Moz","O"];Object.keys(Vi).forEach(function(t){mb.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Vi[e]=Vi[t]})});function Hx(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Vi.hasOwnProperty(t)&&Vi[t]?(""+e).trim():e+"px"}function Yx(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var s=n.indexOf("--")===0,r=Hx(n,e[n],s);n==="float"&&(n="cssFloat"),s?t.setProperty(n,r):t[n]=r}}var gb=Ye({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Mu(t,e){if(e){if(gb[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(G(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(G(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(G(61))}if(e.style!=null&&typeof e.style!="object")throw Error(G(62))}}function Pu(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Du=null;function of(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Au=null,Hr=null,Yr=null;function Hh(t){if(t=Lo(t)){if(typeof Au!="function")throw Error(G(280));var e=t.stateNode;e&&(e=Yl(e),Au(t.stateNode,t.type,e))}}function Kx(t){Hr?Yr?Yr.push(t):Yr=[t]:Hr=t}function Gx(){if(Hr){var t=Hr,e=Yr;if(Yr=Hr=null,Hh(t),e)for(t=0;t<e.length;t++)Hh(e[t])}}function qx(t,e){return t(e)}function Xx(){}var jc=!1;function Qx(t,e,n){if(jc)return t(e,n);jc=!0;try{return qx(t,e,n)}finally{jc=!1,(Hr!==null||Yr!==null)&&(Xx(),Gx())}}function oo(t,e){var n=t.stateNode;if(n===null)return null;var s=Yl(n);if(s===null)return null;n=s[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(t=t.type,s=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!s;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(G(231,e,typeof n));return n}var Ou=!1;if(Qn)try{var yi={};Object.defineProperty(yi,"passive",{get:function(){Ou=!0}}),window.addEventListener("test",yi,yi),window.removeEventListener("test",yi,yi)}catch{Ou=!1}function xb(t,e,n,s,r,i,o,a,c){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(d){this.onError(d)}}var Hi=!1,Ja=null,el=!1,Tu=null,yb={onError:function(t){Hi=!0,Ja=t}};function vb(t,e,n,s,r,i,o,a,c){Hi=!1,Ja=null,xb.apply(yb,arguments)}function bb(t,e,n,s,r,i,o,a,c){if(vb.apply(this,arguments),Hi){if(Hi){var u=Ja;Hi=!1,Ja=null}else throw Error(G(198));el||(el=!0,Tu=u)}}function yr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Zx(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Yh(t){if(yr(t)!==t)throw Error(G(188))}function wb(t){var e=t.alternate;if(!e){if(e=yr(t),e===null)throw Error(G(188));return e!==t?null:t}for(var n=t,s=e;;){var r=n.return;if(r===null)break;var i=r.alternate;if(i===null){if(s=r.return,s!==null){n=s;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===n)return Yh(r),t;if(i===s)return Yh(r),e;i=i.sibling}throw Error(G(188))}if(n.return!==s.return)n=r,s=i;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,s=i;break}if(a===s){o=!0,s=r,n=i;break}a=a.sibling}if(!o){for(a=i.child;a;){if(a===n){o=!0,n=i,s=r;break}if(a===s){o=!0,s=i,n=r;break}a=a.sibling}if(!o)throw Error(G(189))}}if(n.alternate!==s)throw Error(G(190))}if(n.tag!==3)throw Error(G(188));return n.stateNode.current===n?t:e}function Jx(t){return t=wb(t),t!==null?e0(t):null}function e0(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=e0(t);if(e!==null)return e;t=t.sibling}return null}var t0=Zt.unstable_scheduleCallback,Kh=Zt.unstable_cancelCallback,kb=Zt.unstable_shouldYield,jb=Zt.unstable_requestPaint,Je=Zt.unstable_now,Sb=Zt.unstable_getCurrentPriorityLevel,af=Zt.unstable_ImmediatePriority,n0=Zt.unstable_UserBlockingPriority,tl=Zt.unstable_NormalPriority,_b=Zt.unstable_LowPriority,s0=Zt.unstable_IdlePriority,Ul=null,On=null;function Nb(t){if(On&&typeof On.onCommitFiberRoot=="function")try{On.onCommitFiberRoot(Ul,t,void 0,(t.current.flags&128)===128)}catch{}}var wn=Math.clz32?Math.clz32:Mb,Cb=Math.log,Eb=Math.LN2;function Mb(t){return t>>>=0,t===0?32:31-(Cb(t)/Eb|0)|0}var Jo=64,ea=4194304;function Fi(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function nl(t,e){var n=t.pendingLanes;if(n===0)return 0;var s=0,r=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?s=Fi(a):(i&=o,i!==0&&(s=Fi(i)))}else o=n&~r,o!==0?s=Fi(o):i!==0&&(s=Fi(i));if(s===0)return 0;if(e!==0&&e!==s&&!(e&r)&&(r=s&-s,i=e&-e,r>=i||r===16&&(i&4194240)!==0))return e;if(s&4&&(s|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=s;0<e;)n=31-wn(e),r=1<<n,s|=t[n],e&=~r;return s}function Pb(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Db(t,e){for(var n=t.suspendedLanes,s=t.pingedLanes,r=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-wn(i),a=1<<o,c=r[o];c===-1?(!(a&n)||a&s)&&(r[o]=Pb(a,e)):c<=e&&(t.expiredLanes|=a),i&=~a}}function zu(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function r0(){var t=Jo;return Jo<<=1,!(Jo&4194240)&&(Jo=64),t}function Sc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Fo(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-wn(e),t[e]=n}function Ab(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var s=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-wn(n),i=1<<r;e[r]=0,s[r]=-1,t[r]=-1,n&=~i}}function lf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var s=31-wn(n),r=1<<s;r&e|t[s]&e&&(t[s]|=e),n&=~r}}var Ee=0;function i0(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var o0,cf,a0,l0,c0,Iu=!1,ta=[],ks=null,js=null,Ss=null,ao=new Map,lo=new Map,ds=[],Ob="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Gh(t,e){switch(t){case"focusin":case"focusout":ks=null;break;case"dragenter":case"dragleave":js=null;break;case"mouseover":case"mouseout":Ss=null;break;case"pointerover":case"pointerout":ao.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":lo.delete(e.pointerId)}}function vi(t,e,n,s,r,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:s,nativeEvent:i,targetContainers:[r]},e!==null&&(e=Lo(e),e!==null&&cf(e)),t):(t.eventSystemFlags|=s,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Tb(t,e,n,s,r){switch(e){case"focusin":return ks=vi(ks,t,e,n,s,r),!0;case"dragenter":return js=vi(js,t,e,n,s,r),!0;case"mouseover":return Ss=vi(Ss,t,e,n,s,r),!0;case"pointerover":var i=r.pointerId;return ao.set(i,vi(ao.get(i)||null,t,e,n,s,r)),!0;case"gotpointercapture":return i=r.pointerId,lo.set(i,vi(lo.get(i)||null,t,e,n,s,r)),!0}return!1}function u0(t){var e=Zs(t.target);if(e!==null){var n=yr(e);if(n!==null){if(e=n.tag,e===13){if(e=Zx(n),e!==null){t.blockedOn=e,c0(t.priority,function(){a0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function za(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Fu(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var s=new n.constructor(n.type,n);Du=s,n.target.dispatchEvent(s),Du=null}else return e=Lo(n),e!==null&&cf(e),t.blockedOn=n,!1;e.shift()}return!0}function qh(t,e,n){za(t)&&n.delete(e)}function zb(){Iu=!1,ks!==null&&za(ks)&&(ks=null),js!==null&&za(js)&&(js=null),Ss!==null&&za(Ss)&&(Ss=null),ao.forEach(qh),lo.forEach(qh)}function bi(t,e){t.blockedOn===e&&(t.blockedOn=null,Iu||(Iu=!0,Zt.unstable_scheduleCallback(Zt.unstable_NormalPriority,zb)))}function co(t){function e(r){return bi(r,t)}if(0<ta.length){bi(ta[0],t);for(var n=1;n<ta.length;n++){var s=ta[n];s.blockedOn===t&&(s.blockedOn=null)}}for(ks!==null&&bi(ks,t),js!==null&&bi(js,t),Ss!==null&&bi(Ss,t),ao.forEach(e),lo.forEach(e),n=0;n<ds.length;n++)s=ds[n],s.blockedOn===t&&(s.blockedOn=null);for(;0<ds.length&&(n=ds[0],n.blockedOn===null);)u0(n),n.blockedOn===null&&ds.shift()}var Kr=ss.ReactCurrentBatchConfig,sl=!0;function Ib(t,e,n,s){var r=Ee,i=Kr.transition;Kr.transition=null;try{Ee=1,uf(t,e,n,s)}finally{Ee=r,Kr.transition=i}}function Fb(t,e,n,s){var r=Ee,i=Kr.transition;Kr.transition=null;try{Ee=4,uf(t,e,n,s)}finally{Ee=r,Kr.transition=i}}function uf(t,e,n,s){if(sl){var r=Fu(t,e,n,s);if(r===null)Tc(t,e,s,rl,n),Gh(t,s);else if(Tb(r,t,e,n,s))s.stopPropagation();else if(Gh(t,s),e&4&&-1<Ob.indexOf(t)){for(;r!==null;){var i=Lo(r);if(i!==null&&o0(i),i=Fu(t,e,n,s),i===null&&Tc(t,e,s,rl,n),i===r)break;r=i}r!==null&&s.stopPropagation()}else Tc(t,e,s,null,n)}}var rl=null;function Fu(t,e,n,s){if(rl=null,t=of(s),t=Zs(t),t!==null)if(e=yr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Zx(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return rl=t,null}function d0(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Sb()){case af:return 1;case n0:return 4;case tl:case _b:return 16;case s0:return 536870912;default:return 16}default:return 16}}var ms=null,df=null,Ia=null;function f0(){if(Ia)return Ia;var t,e=df,n=e.length,s,r="value"in ms?ms.value:ms.textContent,i=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(s=1;s<=o&&e[n-s]===r[i-s];s++);return Ia=r.slice(t,1<s?1-s:void 0)}function Fa(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function na(){return!0}function Xh(){return!1}function en(t){function e(n,s,r,i,o){this._reactName=n,this._targetInst=r,this.type=s,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?na:Xh,this.isPropagationStopped=Xh,this}return Ye(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=na)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=na)},persist:function(){},isPersistent:na}),e}var ui={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ff=en(ui),Ro=Ye({},ui,{view:0,detail:0}),Rb=en(Ro),_c,Nc,wi,Wl=Ye({},Ro,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:hf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==wi&&(wi&&t.type==="mousemove"?(_c=t.screenX-wi.screenX,Nc=t.screenY-wi.screenY):Nc=_c=0,wi=t),_c)},movementY:function(t){return"movementY"in t?t.movementY:Nc}}),Qh=en(Wl),Lb=Ye({},Wl,{dataTransfer:0}),Bb=en(Lb),$b=Ye({},Ro,{relatedTarget:0}),Cc=en($b),Ub=Ye({},ui,{animationName:0,elapsedTime:0,pseudoElement:0}),Wb=en(Ub),Vb=Ye({},ui,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Hb=en(Vb),Yb=Ye({},ui,{data:0}),Zh=en(Yb),Kb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Gb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},qb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Xb(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=qb[t])?!!e[t]:!1}function hf(){return Xb}var Qb=Ye({},Ro,{key:function(t){if(t.key){var e=Kb[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Fa(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Gb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:hf,charCode:function(t){return t.type==="keypress"?Fa(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Fa(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Zb=en(Qb),Jb=Ye({},Wl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Jh=en(Jb),ew=Ye({},Ro,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:hf}),tw=en(ew),nw=Ye({},ui,{propertyName:0,elapsedTime:0,pseudoElement:0}),sw=en(nw),rw=Ye({},Wl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),iw=en(rw),ow=[9,13,27,32],pf=Qn&&"CompositionEvent"in window,Yi=null;Qn&&"documentMode"in document&&(Yi=document.documentMode);var aw=Qn&&"TextEvent"in window&&!Yi,h0=Qn&&(!pf||Yi&&8<Yi&&11>=Yi),ep=" ",tp=!1;function p0(t,e){switch(t){case"keyup":return ow.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function m0(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Pr=!1;function lw(t,e){switch(t){case"compositionend":return m0(e);case"keypress":return e.which!==32?null:(tp=!0,ep);case"textInput":return t=e.data,t===ep&&tp?null:t;default:return null}}function cw(t,e){if(Pr)return t==="compositionend"||!pf&&p0(t,e)?(t=f0(),Ia=df=ms=null,Pr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return h0&&e.locale!=="ko"?null:e.data;default:return null}}var uw={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function np(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!uw[t.type]:e==="textarea"}function g0(t,e,n,s){Kx(s),e=il(e,"onChange"),0<e.length&&(n=new ff("onChange","change",null,n,s),t.push({event:n,listeners:e}))}var Ki=null,uo=null;function dw(t){C0(t,0)}function Vl(t){var e=Or(t);if(Bx(e))return t}function fw(t,e){if(t==="change")return e}var x0=!1;if(Qn){var Ec;if(Qn){var Mc="oninput"in document;if(!Mc){var sp=document.createElement("div");sp.setAttribute("oninput","return;"),Mc=typeof sp.oninput=="function"}Ec=Mc}else Ec=!1;x0=Ec&&(!document.documentMode||9<document.documentMode)}function rp(){Ki&&(Ki.detachEvent("onpropertychange",y0),uo=Ki=null)}function y0(t){if(t.propertyName==="value"&&Vl(uo)){var e=[];g0(e,uo,t,of(t)),Qx(dw,e)}}function hw(t,e,n){t==="focusin"?(rp(),Ki=e,uo=n,Ki.attachEvent("onpropertychange",y0)):t==="focusout"&&rp()}function pw(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Vl(uo)}function mw(t,e){if(t==="click")return Vl(e)}function gw(t,e){if(t==="input"||t==="change")return Vl(e)}function xw(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var jn=typeof Object.is=="function"?Object.is:xw;function fo(t,e){if(jn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),s=Object.keys(e);if(n.length!==s.length)return!1;for(s=0;s<n.length;s++){var r=n[s];if(!vu.call(e,r)||!jn(t[r],e[r]))return!1}return!0}function ip(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function op(t,e){var n=ip(t);t=0;for(var s;n;){if(n.nodeType===3){if(s=t+n.textContent.length,t<=e&&s>=e)return{node:n,offset:e-t};t=s}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ip(n)}}function v0(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?v0(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function b0(){for(var t=window,e=Za();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Za(t.document)}return e}function mf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function yw(t){var e=b0(),n=t.focusedElem,s=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&v0(n.ownerDocument.documentElement,n)){if(s!==null&&mf(n)){if(e=s.start,t=s.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,i=Math.min(s.start,r);s=s.end===void 0?i:Math.min(s.end,r),!t.extend&&i>s&&(r=s,s=i,i=r),r=op(n,i);var o=op(n,s);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),i>s?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var vw=Qn&&"documentMode"in document&&11>=document.documentMode,Dr=null,Ru=null,Gi=null,Lu=!1;function ap(t,e,n){var s=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Lu||Dr==null||Dr!==Za(s)||(s=Dr,"selectionStart"in s&&mf(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Gi&&fo(Gi,s)||(Gi=s,s=il(Ru,"onSelect"),0<s.length&&(e=new ff("onSelect","select",null,e,n),t.push({event:e,listeners:s}),e.target=Dr)))}function sa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ar={animationend:sa("Animation","AnimationEnd"),animationiteration:sa("Animation","AnimationIteration"),animationstart:sa("Animation","AnimationStart"),transitionend:sa("Transition","TransitionEnd")},Pc={},w0={};Qn&&(w0=document.createElement("div").style,"AnimationEvent"in window||(delete Ar.animationend.animation,delete Ar.animationiteration.animation,delete Ar.animationstart.animation),"TransitionEvent"in window||delete Ar.transitionend.transition);function Hl(t){if(Pc[t])return Pc[t];if(!Ar[t])return t;var e=Ar[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in w0)return Pc[t]=e[n];return t}var k0=Hl("animationend"),j0=Hl("animationiteration"),S0=Hl("animationstart"),_0=Hl("transitionend"),N0=new Map,lp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Fs(t,e){N0.set(t,e),xr(e,[t])}for(var Dc=0;Dc<lp.length;Dc++){var Ac=lp[Dc],bw=Ac.toLowerCase(),ww=Ac[0].toUpperCase()+Ac.slice(1);Fs(bw,"on"+ww)}Fs(k0,"onAnimationEnd");Fs(j0,"onAnimationIteration");Fs(S0,"onAnimationStart");Fs("dblclick","onDoubleClick");Fs("focusin","onFocus");Fs("focusout","onBlur");Fs(_0,"onTransitionEnd");Jr("onMouseEnter",["mouseout","mouseover"]);Jr("onMouseLeave",["mouseout","mouseover"]);Jr("onPointerEnter",["pointerout","pointerover"]);Jr("onPointerLeave",["pointerout","pointerover"]);xr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));xr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));xr("onBeforeInput",["compositionend","keypress","textInput","paste"]);xr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));xr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));xr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ri="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),kw=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ri));function cp(t,e,n){var s=t.type||"unknown-event";t.currentTarget=n,bb(s,e,void 0,t),t.currentTarget=null}function C0(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var s=t[n],r=s.event;s=s.listeners;e:{var i=void 0;if(e)for(var o=s.length-1;0<=o;o--){var a=s[o],c=a.instance,u=a.currentTarget;if(a=a.listener,c!==i&&r.isPropagationStopped())break e;cp(r,a,u),i=c}else for(o=0;o<s.length;o++){if(a=s[o],c=a.instance,u=a.currentTarget,a=a.listener,c!==i&&r.isPropagationStopped())break e;cp(r,a,u),i=c}}}if(el)throw t=Tu,el=!1,Tu=null,t}function Te(t,e){var n=e[Vu];n===void 0&&(n=e[Vu]=new Set);var s=t+"__bubble";n.has(s)||(E0(e,t,2,!1),n.add(s))}function Oc(t,e,n){var s=0;e&&(s|=4),E0(n,t,s,e)}var ra="_reactListening"+Math.random().toString(36).slice(2);function ho(t){if(!t[ra]){t[ra]=!0,zx.forEach(function(n){n!=="selectionchange"&&(kw.has(n)||Oc(n,!1,t),Oc(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ra]||(e[ra]=!0,Oc("selectionchange",!1,e))}}function E0(t,e,n,s){switch(d0(e)){case 1:var r=Ib;break;case 4:r=Fb;break;default:r=uf}n=r.bind(null,e,n,t),r=void 0,!Ou||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),s?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Tc(t,e,n,s,r){var i=s;if(!(e&1)&&!(e&2)&&s!==null)e:for(;;){if(s===null)return;var o=s.tag;if(o===3||o===4){var a=s.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=s.return;o!==null;){var c=o.tag;if((c===3||c===4)&&(c=o.stateNode.containerInfo,c===r||c.nodeType===8&&c.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Zs(a),o===null)return;if(c=o.tag,c===5||c===6){s=i=o;continue e}a=a.parentNode}}s=s.return}Qx(function(){var u=i,d=of(n),f=[];e:{var h=N0.get(t);if(h!==void 0){var m=ff,g=t;switch(t){case"keypress":if(Fa(n)===0)break e;case"keydown":case"keyup":m=Zb;break;case"focusin":g="focus",m=Cc;break;case"focusout":g="blur",m=Cc;break;case"beforeblur":case"afterblur":m=Cc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=Qh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=Bb;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=tw;break;case k0:case j0:case S0:m=Wb;break;case _0:m=sw;break;case"scroll":m=Rb;break;case"wheel":m=iw;break;case"copy":case"cut":case"paste":m=Hb;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Jh}var x=(e&4)!==0,v=!x&&t==="scroll",b=x?h!==null?h+"Capture":null:h;x=[];for(var p=u,y;p!==null;){y=p;var _=y.stateNode;if(y.tag===5&&_!==null&&(y=_,b!==null&&(_=oo(p,b),_!=null&&x.push(po(p,_,y)))),v)break;p=p.return}0<x.length&&(h=new m(h,g,null,n,d),f.push({event:h,listeners:x}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",h&&n!==Du&&(g=n.relatedTarget||n.fromElement)&&(Zs(g)||g[Zn]))break e;if((m||h)&&(h=d.window===d?d:(h=d.ownerDocument)?h.defaultView||h.parentWindow:window,m?(g=n.relatedTarget||n.toElement,m=u,g=g?Zs(g):null,g!==null&&(v=yr(g),g!==v||g.tag!==5&&g.tag!==6)&&(g=null)):(m=null,g=u),m!==g)){if(x=Qh,_="onMouseLeave",b="onMouseEnter",p="mouse",(t==="pointerout"||t==="pointerover")&&(x=Jh,_="onPointerLeave",b="onPointerEnter",p="pointer"),v=m==null?h:Or(m),y=g==null?h:Or(g),h=new x(_,p+"leave",m,n,d),h.target=v,h.relatedTarget=y,_=null,Zs(d)===u&&(x=new x(b,p+"enter",g,n,d),x.target=y,x.relatedTarget=v,_=x),v=_,m&&g)t:{for(x=m,b=g,p=0,y=x;y;y=Sr(y))p++;for(y=0,_=b;_;_=Sr(_))y++;for(;0<p-y;)x=Sr(x),p--;for(;0<y-p;)b=Sr(b),y--;for(;p--;){if(x===b||b!==null&&x===b.alternate)break t;x=Sr(x),b=Sr(b)}x=null}else x=null;m!==null&&up(f,h,m,x,!1),g!==null&&v!==null&&up(f,v,g,x,!0)}}e:{if(h=u?Or(u):window,m=h.nodeName&&h.nodeName.toLowerCase(),m==="select"||m==="input"&&h.type==="file")var j=fw;else if(np(h))if(x0)j=gw;else{j=pw;var N=hw}else(m=h.nodeName)&&m.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(j=mw);if(j&&(j=j(t,u))){g0(f,j,n,d);break e}N&&N(t,h,u),t==="focusout"&&(N=h._wrapperState)&&N.controlled&&h.type==="number"&&Nu(h,"number",h.value)}switch(N=u?Or(u):window,t){case"focusin":(np(N)||N.contentEditable==="true")&&(Dr=N,Ru=u,Gi=null);break;case"focusout":Gi=Ru=Dr=null;break;case"mousedown":Lu=!0;break;case"contextmenu":case"mouseup":case"dragend":Lu=!1,ap(f,n,d);break;case"selectionchange":if(vw)break;case"keydown":case"keyup":ap(f,n,d)}var C;if(pf)e:{switch(t){case"compositionstart":var w="onCompositionStart";break e;case"compositionend":w="onCompositionEnd";break e;case"compositionupdate":w="onCompositionUpdate";break e}w=void 0}else Pr?p0(t,n)&&(w="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(w="onCompositionStart");w&&(h0&&n.locale!=="ko"&&(Pr||w!=="onCompositionStart"?w==="onCompositionEnd"&&Pr&&(C=f0()):(ms=d,df="value"in ms?ms.value:ms.textContent,Pr=!0)),N=il(u,w),0<N.length&&(w=new Zh(w,t,null,n,d),f.push({event:w,listeners:N}),C?w.data=C:(C=m0(n),C!==null&&(w.data=C)))),(C=aw?lw(t,n):cw(t,n))&&(u=il(u,"onBeforeInput"),0<u.length&&(d=new Zh("onBeforeInput","beforeinput",null,n,d),f.push({event:d,listeners:u}),d.data=C))}C0(f,e)})}function po(t,e,n){return{instance:t,listener:e,currentTarget:n}}function il(t,e){for(var n=e+"Capture",s=[];t!==null;){var r=t,i=r.stateNode;r.tag===5&&i!==null&&(r=i,i=oo(t,n),i!=null&&s.unshift(po(t,i,r)),i=oo(t,e),i!=null&&s.push(po(t,i,r))),t=t.return}return s}function Sr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function up(t,e,n,s,r){for(var i=e._reactName,o=[];n!==null&&n!==s;){var a=n,c=a.alternate,u=a.stateNode;if(c!==null&&c===s)break;a.tag===5&&u!==null&&(a=u,r?(c=oo(n,i),c!=null&&o.unshift(po(n,c,a))):r||(c=oo(n,i),c!=null&&o.push(po(n,c,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var jw=/\r\n?/g,Sw=/\u0000|\uFFFD/g;function dp(t){return(typeof t=="string"?t:""+t).replace(jw,`
`).replace(Sw,"")}function ia(t,e,n){if(e=dp(e),dp(t)!==e&&n)throw Error(G(425))}function ol(){}var Bu=null,$u=null;function Uu(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Wu=typeof setTimeout=="function"?setTimeout:void 0,_w=typeof clearTimeout=="function"?clearTimeout:void 0,fp=typeof Promise=="function"?Promise:void 0,Nw=typeof queueMicrotask=="function"?queueMicrotask:typeof fp<"u"?function(t){return fp.resolve(null).then(t).catch(Cw)}:Wu;function Cw(t){setTimeout(function(){throw t})}function zc(t,e){var n=e,s=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(s===0){t.removeChild(r),co(e);return}s--}else n!=="$"&&n!=="$?"&&n!=="$!"||s++;n=r}while(n);co(e)}function _s(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function hp(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var di=Math.random().toString(36).slice(2),An="__reactFiber$"+di,mo="__reactProps$"+di,Zn="__reactContainer$"+di,Vu="__reactEvents$"+di,Ew="__reactListeners$"+di,Mw="__reactHandles$"+di;function Zs(t){var e=t[An];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Zn]||n[An]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=hp(t);t!==null;){if(n=t[An])return n;t=hp(t)}return e}t=n,n=t.parentNode}return null}function Lo(t){return t=t[An]||t[Zn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Or(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(G(33))}function Yl(t){return t[mo]||null}var Hu=[],Tr=-1;function Rs(t){return{current:t}}function Ie(t){0>Tr||(t.current=Hu[Tr],Hu[Tr]=null,Tr--)}function De(t,e){Tr++,Hu[Tr]=t.current,t.current=e}var zs={},Ct=Rs(zs),Vt=Rs(!1),cr=zs;function ei(t,e){var n=t.type.contextTypes;if(!n)return zs;var s=t.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===e)return s.__reactInternalMemoizedMaskedChildContext;var r={},i;for(i in n)r[i]=e[i];return s&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Ht(t){return t=t.childContextTypes,t!=null}function al(){Ie(Vt),Ie(Ct)}function pp(t,e,n){if(Ct.current!==zs)throw Error(G(168));De(Ct,e),De(Vt,n)}function M0(t,e,n){var s=t.stateNode;if(e=e.childContextTypes,typeof s.getChildContext!="function")return n;s=s.getChildContext();for(var r in s)if(!(r in e))throw Error(G(108,hb(t)||"Unknown",r));return Ye({},n,s)}function ll(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||zs,cr=Ct.current,De(Ct,t),De(Vt,Vt.current),!0}function mp(t,e,n){var s=t.stateNode;if(!s)throw Error(G(169));n?(t=M0(t,e,cr),s.__reactInternalMemoizedMergedChildContext=t,Ie(Vt),Ie(Ct),De(Ct,t)):Ie(Vt),De(Vt,n)}var Un=null,Kl=!1,Ic=!1;function P0(t){Un===null?Un=[t]:Un.push(t)}function Pw(t){Kl=!0,P0(t)}function Ls(){if(!Ic&&Un!==null){Ic=!0;var t=0,e=Ee;try{var n=Un;for(Ee=1;t<n.length;t++){var s=n[t];do s=s(!0);while(s!==null)}Un=null,Kl=!1}catch(r){throw Un!==null&&(Un=Un.slice(t+1)),t0(af,Ls),r}finally{Ee=e,Ic=!1}}return null}var zr=[],Ir=0,cl=null,ul=0,an=[],ln=0,ur=null,Yn=1,Kn="";function Gs(t,e){zr[Ir++]=ul,zr[Ir++]=cl,cl=t,ul=e}function D0(t,e,n){an[ln++]=Yn,an[ln++]=Kn,an[ln++]=ur,ur=t;var s=Yn;t=Kn;var r=32-wn(s)-1;s&=~(1<<r),n+=1;var i=32-wn(e)+r;if(30<i){var o=r-r%5;i=(s&(1<<o)-1).toString(32),s>>=o,r-=o,Yn=1<<32-wn(e)+r|n<<r|s,Kn=i+t}else Yn=1<<i|n<<r|s,Kn=t}function gf(t){t.return!==null&&(Gs(t,1),D0(t,1,0))}function xf(t){for(;t===cl;)cl=zr[--Ir],zr[Ir]=null,ul=zr[--Ir],zr[Ir]=null;for(;t===ur;)ur=an[--ln],an[ln]=null,Kn=an[--ln],an[ln]=null,Yn=an[--ln],an[ln]=null}var Qt=null,Xt=null,Le=!1,bn=null;function A0(t,e){var n=cn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function gp(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Qt=t,Xt=_s(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Qt=t,Xt=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=ur!==null?{id:Yn,overflow:Kn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=cn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Qt=t,Xt=null,!0):!1;default:return!1}}function Yu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ku(t){if(Le){var e=Xt;if(e){var n=e;if(!gp(t,e)){if(Yu(t))throw Error(G(418));e=_s(n.nextSibling);var s=Qt;e&&gp(t,e)?A0(s,n):(t.flags=t.flags&-4097|2,Le=!1,Qt=t)}}else{if(Yu(t))throw Error(G(418));t.flags=t.flags&-4097|2,Le=!1,Qt=t}}}function xp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Qt=t}function oa(t){if(t!==Qt)return!1;if(!Le)return xp(t),Le=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Uu(t.type,t.memoizedProps)),e&&(e=Xt)){if(Yu(t))throw O0(),Error(G(418));for(;e;)A0(t,e),e=_s(e.nextSibling)}if(xp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(G(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Xt=_s(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Xt=null}}else Xt=Qt?_s(t.stateNode.nextSibling):null;return!0}function O0(){for(var t=Xt;t;)t=_s(t.nextSibling)}function ti(){Xt=Qt=null,Le=!1}function yf(t){bn===null?bn=[t]:bn.push(t)}var Dw=ss.ReactCurrentBatchConfig;function ki(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(G(309));var s=n.stateNode}if(!s)throw Error(G(147,t));var r=s,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var a=r.refs;o===null?delete a[i]:a[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(G(284));if(!n._owner)throw Error(G(290,t))}return t}function aa(t,e){throw t=Object.prototype.toString.call(e),Error(G(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function yp(t){var e=t._init;return e(t._payload)}function T0(t){function e(b,p){if(t){var y=b.deletions;y===null?(b.deletions=[p],b.flags|=16):y.push(p)}}function n(b,p){if(!t)return null;for(;p!==null;)e(b,p),p=p.sibling;return null}function s(b,p){for(b=new Map;p!==null;)p.key!==null?b.set(p.key,p):b.set(p.index,p),p=p.sibling;return b}function r(b,p){return b=Ms(b,p),b.index=0,b.sibling=null,b}function i(b,p,y){return b.index=y,t?(y=b.alternate,y!==null?(y=y.index,y<p?(b.flags|=2,p):y):(b.flags|=2,p)):(b.flags|=1048576,p)}function o(b){return t&&b.alternate===null&&(b.flags|=2),b}function a(b,p,y,_){return p===null||p.tag!==6?(p=Wc(y,b.mode,_),p.return=b,p):(p=r(p,y),p.return=b,p)}function c(b,p,y,_){var j=y.type;return j===Mr?d(b,p,y.props.children,_,y.key):p!==null&&(p.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===cs&&yp(j)===p.type)?(_=r(p,y.props),_.ref=ki(b,p,y),_.return=b,_):(_=Va(y.type,y.key,y.props,null,b.mode,_),_.ref=ki(b,p,y),_.return=b,_)}function u(b,p,y,_){return p===null||p.tag!==4||p.stateNode.containerInfo!==y.containerInfo||p.stateNode.implementation!==y.implementation?(p=Vc(y,b.mode,_),p.return=b,p):(p=r(p,y.children||[]),p.return=b,p)}function d(b,p,y,_,j){return p===null||p.tag!==7?(p=or(y,b.mode,_,j),p.return=b,p):(p=r(p,y),p.return=b,p)}function f(b,p,y){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Wc(""+p,b.mode,y),p.return=b,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Xo:return y=Va(p.type,p.key,p.props,null,b.mode,y),y.ref=ki(b,null,p),y.return=b,y;case Er:return p=Vc(p,b.mode,y),p.return=b,p;case cs:var _=p._init;return f(b,_(p._payload),y)}if(Ii(p)||xi(p))return p=or(p,b.mode,y,null),p.return=b,p;aa(b,p)}return null}function h(b,p,y,_){var j=p!==null?p.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return j!==null?null:a(b,p,""+y,_);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Xo:return y.key===j?c(b,p,y,_):null;case Er:return y.key===j?u(b,p,y,_):null;case cs:return j=y._init,h(b,p,j(y._payload),_)}if(Ii(y)||xi(y))return j!==null?null:d(b,p,y,_,null);aa(b,y)}return null}function m(b,p,y,_,j){if(typeof _=="string"&&_!==""||typeof _=="number")return b=b.get(y)||null,a(p,b,""+_,j);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Xo:return b=b.get(_.key===null?y:_.key)||null,c(p,b,_,j);case Er:return b=b.get(_.key===null?y:_.key)||null,u(p,b,_,j);case cs:var N=_._init;return m(b,p,y,N(_._payload),j)}if(Ii(_)||xi(_))return b=b.get(y)||null,d(p,b,_,j,null);aa(p,_)}return null}function g(b,p,y,_){for(var j=null,N=null,C=p,w=p=0,k=null;C!==null&&w<y.length;w++){C.index>w?(k=C,C=null):k=C.sibling;var S=h(b,C,y[w],_);if(S===null){C===null&&(C=k);break}t&&C&&S.alternate===null&&e(b,C),p=i(S,p,w),N===null?j=S:N.sibling=S,N=S,C=k}if(w===y.length)return n(b,C),Le&&Gs(b,w),j;if(C===null){for(;w<y.length;w++)C=f(b,y[w],_),C!==null&&(p=i(C,p,w),N===null?j=C:N.sibling=C,N=C);return Le&&Gs(b,w),j}for(C=s(b,C);w<y.length;w++)k=m(C,b,w,y[w],_),k!==null&&(t&&k.alternate!==null&&C.delete(k.key===null?w:k.key),p=i(k,p,w),N===null?j=k:N.sibling=k,N=k);return t&&C.forEach(function(P){return e(b,P)}),Le&&Gs(b,w),j}function x(b,p,y,_){var j=xi(y);if(typeof j!="function")throw Error(G(150));if(y=j.call(y),y==null)throw Error(G(151));for(var N=j=null,C=p,w=p=0,k=null,S=y.next();C!==null&&!S.done;w++,S=y.next()){C.index>w?(k=C,C=null):k=C.sibling;var P=h(b,C,S.value,_);if(P===null){C===null&&(C=k);break}t&&C&&P.alternate===null&&e(b,C),p=i(P,p,w),N===null?j=P:N.sibling=P,N=P,C=k}if(S.done)return n(b,C),Le&&Gs(b,w),j;if(C===null){for(;!S.done;w++,S=y.next())S=f(b,S.value,_),S!==null&&(p=i(S,p,w),N===null?j=S:N.sibling=S,N=S);return Le&&Gs(b,w),j}for(C=s(b,C);!S.done;w++,S=y.next())S=m(C,b,w,S.value,_),S!==null&&(t&&S.alternate!==null&&C.delete(S.key===null?w:S.key),p=i(S,p,w),N===null?j=S:N.sibling=S,N=S);return t&&C.forEach(function(O){return e(b,O)}),Le&&Gs(b,w),j}function v(b,p,y,_){if(typeof y=="object"&&y!==null&&y.type===Mr&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Xo:e:{for(var j=y.key,N=p;N!==null;){if(N.key===j){if(j=y.type,j===Mr){if(N.tag===7){n(b,N.sibling),p=r(N,y.props.children),p.return=b,b=p;break e}}else if(N.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===cs&&yp(j)===N.type){n(b,N.sibling),p=r(N,y.props),p.ref=ki(b,N,y),p.return=b,b=p;break e}n(b,N);break}else e(b,N);N=N.sibling}y.type===Mr?(p=or(y.props.children,b.mode,_,y.key),p.return=b,b=p):(_=Va(y.type,y.key,y.props,null,b.mode,_),_.ref=ki(b,p,y),_.return=b,b=_)}return o(b);case Er:e:{for(N=y.key;p!==null;){if(p.key===N)if(p.tag===4&&p.stateNode.containerInfo===y.containerInfo&&p.stateNode.implementation===y.implementation){n(b,p.sibling),p=r(p,y.children||[]),p.return=b,b=p;break e}else{n(b,p);break}else e(b,p);p=p.sibling}p=Vc(y,b.mode,_),p.return=b,b=p}return o(b);case cs:return N=y._init,v(b,p,N(y._payload),_)}if(Ii(y))return g(b,p,y,_);if(xi(y))return x(b,p,y,_);aa(b,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,p!==null&&p.tag===6?(n(b,p.sibling),p=r(p,y),p.return=b,b=p):(n(b,p),p=Wc(y,b.mode,_),p.return=b,b=p),o(b)):n(b,p)}return v}var ni=T0(!0),z0=T0(!1),dl=Rs(null),fl=null,Fr=null,vf=null;function bf(){vf=Fr=fl=null}function wf(t){var e=dl.current;Ie(dl),t._currentValue=e}function Gu(t,e,n){for(;t!==null;){var s=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,s!==null&&(s.childLanes|=e)):s!==null&&(s.childLanes&e)!==e&&(s.childLanes|=e),t===n)break;t=t.return}}function Gr(t,e){fl=t,vf=Fr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Wt=!0),t.firstContext=null)}function hn(t){var e=t._currentValue;if(vf!==t)if(t={context:t,memoizedValue:e,next:null},Fr===null){if(fl===null)throw Error(G(308));Fr=t,fl.dependencies={lanes:0,firstContext:t}}else Fr=Fr.next=t;return e}var Js=null;function kf(t){Js===null?Js=[t]:Js.push(t)}function I0(t,e,n,s){var r=e.interleaved;return r===null?(n.next=n,kf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Jn(t,s)}function Jn(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var us=!1;function jf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function F0(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Xn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Ns(t,e,n){var s=t.updateQueue;if(s===null)return null;if(s=s.shared,ke&2){var r=s.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),s.pending=e,Jn(t,n)}return r=s.interleaved,r===null?(e.next=e,kf(s)):(e.next=r.next,r.next=e),s.interleaved=e,Jn(t,n)}function Ra(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,lf(t,n)}}function vp(t,e){var n=t.updateQueue,s=t.alternate;if(s!==null&&(s=s.updateQueue,n===s)){var r=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?r=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?r=i=e:i=i.next=e}else r=i=e;n={baseState:s.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:s.shared,effects:s.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function hl(t,e,n,s){var r=t.updateQueue;us=!1;var i=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var c=a,u=c.next;c.next=null,o===null?i=u:o.next=u,o=c;var d=t.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==o&&(a===null?d.firstBaseUpdate=u:a.next=u,d.lastBaseUpdate=c))}if(i!==null){var f=r.baseState;o=0,d=u=c=null,a=i;do{var h=a.lane,m=a.eventTime;if((s&h)===h){d!==null&&(d=d.next={eventTime:m,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,x=a;switch(h=e,m=n,x.tag){case 1:if(g=x.payload,typeof g=="function"){f=g.call(m,f,h);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=x.payload,h=typeof g=="function"?g.call(m,f,h):g,h==null)break e;f=Ye({},f,h);break e;case 2:us=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else m={eventTime:m,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(u=d=m,c=f):d=d.next=m,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(d===null&&(c=f),r.baseState=c,r.firstBaseUpdate=u,r.lastBaseUpdate=d,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else i===null&&(r.shared.lanes=0);fr|=o,t.lanes=o,t.memoizedState=f}}function bp(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var s=t[e],r=s.callback;if(r!==null){if(s.callback=null,s=n,typeof r!="function")throw Error(G(191,r));r.call(s)}}}var Bo={},Tn=Rs(Bo),go=Rs(Bo),xo=Rs(Bo);function er(t){if(t===Bo)throw Error(G(174));return t}function Sf(t,e){switch(De(xo,e),De(go,t),De(Tn,Bo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Eu(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Eu(e,t)}Ie(Tn),De(Tn,e)}function si(){Ie(Tn),Ie(go),Ie(xo)}function R0(t){er(xo.current);var e=er(Tn.current),n=Eu(e,t.type);e!==n&&(De(go,t),De(Tn,n))}function _f(t){go.current===t&&(Ie(Tn),Ie(go))}var Be=Rs(0);function pl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Fc=[];function Nf(){for(var t=0;t<Fc.length;t++)Fc[t]._workInProgressVersionPrimary=null;Fc.length=0}var La=ss.ReactCurrentDispatcher,Rc=ss.ReactCurrentBatchConfig,dr=0,We=null,at=null,mt=null,ml=!1,qi=!1,yo=0,Aw=0;function bt(){throw Error(G(321))}function Cf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!jn(t[n],e[n]))return!1;return!0}function Ef(t,e,n,s,r,i){if(dr=i,We=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,La.current=t===null||t.memoizedState===null?Iw:Fw,t=n(s,r),qi){i=0;do{if(qi=!1,yo=0,25<=i)throw Error(G(301));i+=1,mt=at=null,e.updateQueue=null,La.current=Rw,t=n(s,r)}while(qi)}if(La.current=gl,e=at!==null&&at.next!==null,dr=0,mt=at=We=null,ml=!1,e)throw Error(G(300));return t}function Mf(){var t=yo!==0;return yo=0,t}function Mn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return mt===null?We.memoizedState=mt=t:mt=mt.next=t,mt}function pn(){if(at===null){var t=We.alternate;t=t!==null?t.memoizedState:null}else t=at.next;var e=mt===null?We.memoizedState:mt.next;if(e!==null)mt=e,at=t;else{if(t===null)throw Error(G(310));at=t,t={memoizedState:at.memoizedState,baseState:at.baseState,baseQueue:at.baseQueue,queue:at.queue,next:null},mt===null?We.memoizedState=mt=t:mt=mt.next=t}return mt}function vo(t,e){return typeof e=="function"?e(t):e}function Lc(t){var e=pn(),n=e.queue;if(n===null)throw Error(G(311));n.lastRenderedReducer=t;var s=at,r=s.baseQueue,i=n.pending;if(i!==null){if(r!==null){var o=r.next;r.next=i.next,i.next=o}s.baseQueue=r=i,n.pending=null}if(r!==null){i=r.next,s=s.baseState;var a=o=null,c=null,u=i;do{var d=u.lane;if((dr&d)===d)c!==null&&(c=c.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),s=u.hasEagerState?u.eagerState:t(s,u.action);else{var f={lane:d,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};c===null?(a=c=f,o=s):c=c.next=f,We.lanes|=d,fr|=d}u=u.next}while(u!==null&&u!==i);c===null?o=s:c.next=a,jn(s,e.memoizedState)||(Wt=!0),e.memoizedState=s,e.baseState=o,e.baseQueue=c,n.lastRenderedState=s}if(t=n.interleaved,t!==null){r=t;do i=r.lane,We.lanes|=i,fr|=i,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Bc(t){var e=pn(),n=e.queue;if(n===null)throw Error(G(311));n.lastRenderedReducer=t;var s=n.dispatch,r=n.pending,i=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do i=t(i,o.action),o=o.next;while(o!==r);jn(i,e.memoizedState)||(Wt=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,s]}function L0(){}function B0(t,e){var n=We,s=pn(),r=e(),i=!jn(s.memoizedState,r);if(i&&(s.memoizedState=r,Wt=!0),s=s.queue,Pf(W0.bind(null,n,s,t),[t]),s.getSnapshot!==e||i||mt!==null&&mt.memoizedState.tag&1){if(n.flags|=2048,bo(9,U0.bind(null,n,s,r,e),void 0,null),gt===null)throw Error(G(349));dr&30||$0(n,e,r)}return r}function $0(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=We.updateQueue,e===null?(e={lastEffect:null,stores:null},We.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function U0(t,e,n,s){e.value=n,e.getSnapshot=s,V0(e)&&H0(t)}function W0(t,e,n){return n(function(){V0(e)&&H0(t)})}function V0(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!jn(t,n)}catch{return!0}}function H0(t){var e=Jn(t,1);e!==null&&kn(e,t,1,-1)}function wp(t){var e=Mn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:vo,lastRenderedState:t},e.queue=t,t=t.dispatch=zw.bind(null,We,t),[e.memoizedState,t]}function bo(t,e,n,s){return t={tag:t,create:e,destroy:n,deps:s,next:null},e=We.updateQueue,e===null?(e={lastEffect:null,stores:null},We.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(s=n.next,n.next=t,t.next=s,e.lastEffect=t)),t}function Y0(){return pn().memoizedState}function Ba(t,e,n,s){var r=Mn();We.flags|=t,r.memoizedState=bo(1|e,n,void 0,s===void 0?null:s)}function Gl(t,e,n,s){var r=pn();s=s===void 0?null:s;var i=void 0;if(at!==null){var o=at.memoizedState;if(i=o.destroy,s!==null&&Cf(s,o.deps)){r.memoizedState=bo(e,n,i,s);return}}We.flags|=t,r.memoizedState=bo(1|e,n,i,s)}function kp(t,e){return Ba(8390656,8,t,e)}function Pf(t,e){return Gl(2048,8,t,e)}function K0(t,e){return Gl(4,2,t,e)}function G0(t,e){return Gl(4,4,t,e)}function q0(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function X0(t,e,n){return n=n!=null?n.concat([t]):null,Gl(4,4,q0.bind(null,e,t),n)}function Df(){}function Q0(t,e){var n=pn();e=e===void 0?null:e;var s=n.memoizedState;return s!==null&&e!==null&&Cf(e,s[1])?s[0]:(n.memoizedState=[t,e],t)}function Z0(t,e){var n=pn();e=e===void 0?null:e;var s=n.memoizedState;return s!==null&&e!==null&&Cf(e,s[1])?s[0]:(t=t(),n.memoizedState=[t,e],t)}function J0(t,e,n){return dr&21?(jn(n,e)||(n=r0(),We.lanes|=n,fr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Wt=!0),t.memoizedState=n)}function Ow(t,e){var n=Ee;Ee=n!==0&&4>n?n:4,t(!0);var s=Rc.transition;Rc.transition={};try{t(!1),e()}finally{Ee=n,Rc.transition=s}}function ey(){return pn().memoizedState}function Tw(t,e,n){var s=Es(t);if(n={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null},ty(t))ny(e,n);else if(n=I0(t,e,n,s),n!==null){var r=zt();kn(n,t,s,r),sy(n,e,s)}}function zw(t,e,n){var s=Es(t),r={lane:s,action:n,hasEagerState:!1,eagerState:null,next:null};if(ty(t))ny(e,r);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,a=i(o,n);if(r.hasEagerState=!0,r.eagerState=a,jn(a,o)){var c=e.interleaved;c===null?(r.next=r,kf(e)):(r.next=c.next,c.next=r),e.interleaved=r;return}}catch{}finally{}n=I0(t,e,r,s),n!==null&&(r=zt(),kn(n,t,s,r),sy(n,e,s))}}function ty(t){var e=t.alternate;return t===We||e!==null&&e===We}function ny(t,e){qi=ml=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function sy(t,e,n){if(n&4194240){var s=e.lanes;s&=t.pendingLanes,n|=s,e.lanes=n,lf(t,n)}}var gl={readContext:hn,useCallback:bt,useContext:bt,useEffect:bt,useImperativeHandle:bt,useInsertionEffect:bt,useLayoutEffect:bt,useMemo:bt,useReducer:bt,useRef:bt,useState:bt,useDebugValue:bt,useDeferredValue:bt,useTransition:bt,useMutableSource:bt,useSyncExternalStore:bt,useId:bt,unstable_isNewReconciler:!1},Iw={readContext:hn,useCallback:function(t,e){return Mn().memoizedState=[t,e===void 0?null:e],t},useContext:hn,useEffect:kp,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ba(4194308,4,q0.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ba(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ba(4,2,t,e)},useMemo:function(t,e){var n=Mn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var s=Mn();return e=n!==void 0?n(e):e,s.memoizedState=s.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},s.queue=t,t=t.dispatch=Tw.bind(null,We,t),[s.memoizedState,t]},useRef:function(t){var e=Mn();return t={current:t},e.memoizedState=t},useState:wp,useDebugValue:Df,useDeferredValue:function(t){return Mn().memoizedState=t},useTransition:function(){var t=wp(!1),e=t[0];return t=Ow.bind(null,t[1]),Mn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var s=We,r=Mn();if(Le){if(n===void 0)throw Error(G(407));n=n()}else{if(n=e(),gt===null)throw Error(G(349));dr&30||$0(s,e,n)}r.memoizedState=n;var i={value:n,getSnapshot:e};return r.queue=i,kp(W0.bind(null,s,i,t),[t]),s.flags|=2048,bo(9,U0.bind(null,s,i,n,e),void 0,null),n},useId:function(){var t=Mn(),e=gt.identifierPrefix;if(Le){var n=Kn,s=Yn;n=(s&~(1<<32-wn(s)-1)).toString(32)+n,e=":"+e+"R"+n,n=yo++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=Aw++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Fw={readContext:hn,useCallback:Q0,useContext:hn,useEffect:Pf,useImperativeHandle:X0,useInsertionEffect:K0,useLayoutEffect:G0,useMemo:Z0,useReducer:Lc,useRef:Y0,useState:function(){return Lc(vo)},useDebugValue:Df,useDeferredValue:function(t){var e=pn();return J0(e,at.memoizedState,t)},useTransition:function(){var t=Lc(vo)[0],e=pn().memoizedState;return[t,e]},useMutableSource:L0,useSyncExternalStore:B0,useId:ey,unstable_isNewReconciler:!1},Rw={readContext:hn,useCallback:Q0,useContext:hn,useEffect:Pf,useImperativeHandle:X0,useInsertionEffect:K0,useLayoutEffect:G0,useMemo:Z0,useReducer:Bc,useRef:Y0,useState:function(){return Bc(vo)},useDebugValue:Df,useDeferredValue:function(t){var e=pn();return at===null?e.memoizedState=t:J0(e,at.memoizedState,t)},useTransition:function(){var t=Bc(vo)[0],e=pn().memoizedState;return[t,e]},useMutableSource:L0,useSyncExternalStore:B0,useId:ey,unstable_isNewReconciler:!1};function yn(t,e){if(t&&t.defaultProps){e=Ye({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function qu(t,e,n,s){e=t.memoizedState,n=n(s,e),n=n==null?e:Ye({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var ql={isMounted:function(t){return(t=t._reactInternals)?yr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var s=zt(),r=Es(t),i=Xn(s,r);i.payload=e,n!=null&&(i.callback=n),e=Ns(t,i,r),e!==null&&(kn(e,t,r,s),Ra(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var s=zt(),r=Es(t),i=Xn(s,r);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=Ns(t,i,r),e!==null&&(kn(e,t,r,s),Ra(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=zt(),s=Es(t),r=Xn(n,s);r.tag=2,e!=null&&(r.callback=e),e=Ns(t,r,s),e!==null&&(kn(e,t,s,n),Ra(e,t,s))}};function jp(t,e,n,s,r,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(s,i,o):e.prototype&&e.prototype.isPureReactComponent?!fo(n,s)||!fo(r,i):!0}function ry(t,e,n){var s=!1,r=zs,i=e.contextType;return typeof i=="object"&&i!==null?i=hn(i):(r=Ht(e)?cr:Ct.current,s=e.contextTypes,i=(s=s!=null)?ei(t,r):zs),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ql,t.stateNode=e,e._reactInternals=t,s&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=i),e}function Sp(t,e,n,s){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,s),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,s),e.state!==t&&ql.enqueueReplaceState(e,e.state,null)}function Xu(t,e,n,s){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},jf(t);var i=e.contextType;typeof i=="object"&&i!==null?r.context=hn(i):(i=Ht(e)?cr:Ct.current,r.context=ei(t,i)),r.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(qu(t,e,i,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&ql.enqueueReplaceState(r,r.state,null),hl(t,n,r,s),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function ri(t,e){try{var n="",s=e;do n+=fb(s),s=s.return;while(s);var r=n}catch(i){r=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:r,digest:null}}function $c(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Qu(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Lw=typeof WeakMap=="function"?WeakMap:Map;function iy(t,e,n){n=Xn(-1,n),n.tag=3,n.payload={element:null};var s=e.value;return n.callback=function(){yl||(yl=!0,ad=s),Qu(t,e)},n}function oy(t,e,n){n=Xn(-1,n),n.tag=3;var s=t.type.getDerivedStateFromError;if(typeof s=="function"){var r=e.value;n.payload=function(){return s(r)},n.callback=function(){Qu(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){Qu(t,e),typeof s!="function"&&(Cs===null?Cs=new Set([this]):Cs.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function _p(t,e,n){var s=t.pingCache;if(s===null){s=t.pingCache=new Lw;var r=new Set;s.set(e,r)}else r=s.get(e),r===void 0&&(r=new Set,s.set(e,r));r.has(n)||(r.add(n),t=Jw.bind(null,t,e,n),e.then(t,t))}function Np(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Cp(t,e,n,s,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Xn(-1,1),e.tag=2,Ns(n,e,1))),n.lanes|=1),t)}var Bw=ss.ReactCurrentOwner,Wt=!1;function Pt(t,e,n,s){e.child=t===null?z0(e,null,n,s):ni(e,t.child,n,s)}function Ep(t,e,n,s,r){n=n.render;var i=e.ref;return Gr(e,r),s=Ef(t,e,n,s,i,r),n=Mf(),t!==null&&!Wt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,es(t,e,r)):(Le&&n&&gf(e),e.flags|=1,Pt(t,e,s,r),e.child)}function Mp(t,e,n,s,r){if(t===null){var i=n.type;return typeof i=="function"&&!Lf(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,ay(t,e,i,s,r)):(t=Va(n.type,null,s,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&r)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:fo,n(o,s)&&t.ref===e.ref)return es(t,e,r)}return e.flags|=1,t=Ms(i,s),t.ref=e.ref,t.return=e,e.child=t}function ay(t,e,n,s,r){if(t!==null){var i=t.memoizedProps;if(fo(i,s)&&t.ref===e.ref)if(Wt=!1,e.pendingProps=s=i,(t.lanes&r)!==0)t.flags&131072&&(Wt=!0);else return e.lanes=t.lanes,es(t,e,r)}return Zu(t,e,n,s,r)}function ly(t,e,n){var s=e.pendingProps,r=s.children,i=t!==null?t.memoizedState:null;if(s.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},De(Lr,Gt),Gt|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,De(Lr,Gt),Gt|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=i!==null?i.baseLanes:n,De(Lr,Gt),Gt|=s}else i!==null?(s=i.baseLanes|n,e.memoizedState=null):s=n,De(Lr,Gt),Gt|=s;return Pt(t,e,r,n),e.child}function cy(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Zu(t,e,n,s,r){var i=Ht(n)?cr:Ct.current;return i=ei(e,i),Gr(e,r),n=Ef(t,e,n,s,i,r),s=Mf(),t!==null&&!Wt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,es(t,e,r)):(Le&&s&&gf(e),e.flags|=1,Pt(t,e,n,r),e.child)}function Pp(t,e,n,s,r){if(Ht(n)){var i=!0;ll(e)}else i=!1;if(Gr(e,r),e.stateNode===null)$a(t,e),ry(e,n,s),Xu(e,n,s,r),s=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var c=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=hn(u):(u=Ht(n)?cr:Ct.current,u=ei(e,u));var d=n.getDerivedStateFromProps,f=typeof d=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==s||c!==u)&&Sp(e,o,s,u),us=!1;var h=e.memoizedState;o.state=h,hl(e,s,o,r),c=e.memoizedState,a!==s||h!==c||Vt.current||us?(typeof d=="function"&&(qu(e,n,d,s),c=e.memoizedState),(a=us||jp(e,n,a,s,h,c,u))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=s,e.memoizedState=c),o.props=s,o.state=c,o.context=u,s=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),s=!1)}else{o=e.stateNode,F0(t,e),a=e.memoizedProps,u=e.type===e.elementType?a:yn(e.type,a),o.props=u,f=e.pendingProps,h=o.context,c=n.contextType,typeof c=="object"&&c!==null?c=hn(c):(c=Ht(n)?cr:Ct.current,c=ei(e,c));var m=n.getDerivedStateFromProps;(d=typeof m=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||h!==c)&&Sp(e,o,s,c),us=!1,h=e.memoizedState,o.state=h,hl(e,s,o,r);var g=e.memoizedState;a!==f||h!==g||Vt.current||us?(typeof m=="function"&&(qu(e,n,m,s),g=e.memoizedState),(u=us||jp(e,n,u,s,h,g,c)||!1)?(d||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(s,g,c),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(s,g,c)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=s,e.memoizedState=g),o.props=s,o.state=g,o.context=c,s=u):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),s=!1)}return Ju(t,e,n,s,i,r)}function Ju(t,e,n,s,r,i){cy(t,e);var o=(e.flags&128)!==0;if(!s&&!o)return r&&mp(e,n,!1),es(t,e,i);s=e.stateNode,Bw.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:s.render();return e.flags|=1,t!==null&&o?(e.child=ni(e,t.child,null,i),e.child=ni(e,null,a,i)):Pt(t,e,a,i),e.memoizedState=s.state,r&&mp(e,n,!0),e.child}function uy(t){var e=t.stateNode;e.pendingContext?pp(t,e.pendingContext,e.pendingContext!==e.context):e.context&&pp(t,e.context,!1),Sf(t,e.containerInfo)}function Dp(t,e,n,s,r){return ti(),yf(r),e.flags|=256,Pt(t,e,n,s),e.child}var ed={dehydrated:null,treeContext:null,retryLane:0};function td(t){return{baseLanes:t,cachePool:null,transitions:null}}function dy(t,e,n){var s=e.pendingProps,r=Be.current,i=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),De(Be,r&1),t===null)return Ku(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=s.children,t=s.fallback,i?(s=e.mode,i=e.child,o={mode:"hidden",children:o},!(s&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=Zl(o,s,0,null),t=or(t,s,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=td(n),e.memoizedState=ed,t):Af(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return $w(t,e,o,s,a,r,n);if(i){i=s.fallback,o=e.mode,r=t.child,a=r.sibling;var c={mode:"hidden",children:s.children};return!(o&1)&&e.child!==r?(s=e.child,s.childLanes=0,s.pendingProps=c,e.deletions=null):(s=Ms(r,c),s.subtreeFlags=r.subtreeFlags&14680064),a!==null?i=Ms(a,i):(i=or(i,o,n,null),i.flags|=2),i.return=e,s.return=e,s.sibling=i,e.child=s,s=i,i=e.child,o=t.child.memoizedState,o=o===null?td(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=ed,s}return i=t.child,t=i.sibling,s=Ms(i,{mode:"visible",children:s.children}),!(e.mode&1)&&(s.lanes=n),s.return=e,s.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=s,e.memoizedState=null,s}function Af(t,e){return e=Zl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function la(t,e,n,s){return s!==null&&yf(s),ni(e,t.child,null,n),t=Af(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function $w(t,e,n,s,r,i,o){if(n)return e.flags&256?(e.flags&=-257,s=$c(Error(G(422))),la(t,e,o,s)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=s.fallback,r=e.mode,s=Zl({mode:"visible",children:s.children},r,0,null),i=or(i,r,o,null),i.flags|=2,s.return=e,i.return=e,s.sibling=i,e.child=s,e.mode&1&&ni(e,t.child,null,o),e.child.memoizedState=td(o),e.memoizedState=ed,i);if(!(e.mode&1))return la(t,e,o,null);if(r.data==="$!"){if(s=r.nextSibling&&r.nextSibling.dataset,s)var a=s.dgst;return s=a,i=Error(G(419)),s=$c(i,s,void 0),la(t,e,o,s)}if(a=(o&t.childLanes)!==0,Wt||a){if(s=gt,s!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(s.suspendedLanes|o)?0:r,r!==0&&r!==i.retryLane&&(i.retryLane=r,Jn(t,r),kn(s,t,r,-1))}return Rf(),s=$c(Error(G(421))),la(t,e,o,s)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=ek.bind(null,t),r._reactRetry=e,null):(t=i.treeContext,Xt=_s(r.nextSibling),Qt=e,Le=!0,bn=null,t!==null&&(an[ln++]=Yn,an[ln++]=Kn,an[ln++]=ur,Yn=t.id,Kn=t.overflow,ur=e),e=Af(e,s.children),e.flags|=4096,e)}function Ap(t,e,n){t.lanes|=e;var s=t.alternate;s!==null&&(s.lanes|=e),Gu(t.return,e,n)}function Uc(t,e,n,s,r){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:s,tail:n,tailMode:r}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=s,i.tail=n,i.tailMode=r)}function fy(t,e,n){var s=e.pendingProps,r=s.revealOrder,i=s.tail;if(Pt(t,e,s.children,n),s=Be.current,s&2)s=s&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Ap(t,n,e);else if(t.tag===19)Ap(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}s&=1}if(De(Be,s),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&pl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Uc(e,!1,r,n,i);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&pl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Uc(e,!0,n,null,i);break;case"together":Uc(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function $a(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function es(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),fr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(G(153));if(e.child!==null){for(t=e.child,n=Ms(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ms(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Uw(t,e,n){switch(e.tag){case 3:uy(e),ti();break;case 5:R0(e);break;case 1:Ht(e.type)&&ll(e);break;case 4:Sf(e,e.stateNode.containerInfo);break;case 10:var s=e.type._context,r=e.memoizedProps.value;De(dl,s._currentValue),s._currentValue=r;break;case 13:if(s=e.memoizedState,s!==null)return s.dehydrated!==null?(De(Be,Be.current&1),e.flags|=128,null):n&e.child.childLanes?dy(t,e,n):(De(Be,Be.current&1),t=es(t,e,n),t!==null?t.sibling:null);De(Be,Be.current&1);break;case 19:if(s=(n&e.childLanes)!==0,t.flags&128){if(s)return fy(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),De(Be,Be.current),s)break;return null;case 22:case 23:return e.lanes=0,ly(t,e,n)}return es(t,e,n)}var hy,nd,py,my;hy=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};nd=function(){};py=function(t,e,n,s){var r=t.memoizedProps;if(r!==s){t=e.stateNode,er(Tn.current);var i=null;switch(n){case"input":r=Su(t,r),s=Su(t,s),i=[];break;case"select":r=Ye({},r,{value:void 0}),s=Ye({},s,{value:void 0}),i=[];break;case"textarea":r=Cu(t,r),s=Cu(t,s),i=[];break;default:typeof r.onClick!="function"&&typeof s.onClick=="function"&&(t.onclick=ol)}Mu(n,s);var o;n=null;for(u in r)if(!s.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var a=r[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ro.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in s){var c=s[u];if(a=r!=null?r[u]:void 0,s.hasOwnProperty(u)&&c!==a&&(c!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||c&&c.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in c)c.hasOwnProperty(o)&&a[o]!==c[o]&&(n||(n={}),n[o]=c[o])}else n||(i||(i=[]),i.push(u,n)),n=c;else u==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,a=a?a.__html:void 0,c!=null&&a!==c&&(i=i||[]).push(u,c)):u==="children"?typeof c!="string"&&typeof c!="number"||(i=i||[]).push(u,""+c):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ro.hasOwnProperty(u)?(c!=null&&u==="onScroll"&&Te("scroll",t),i||a===c||(i=[])):(i=i||[]).push(u,c))}n&&(i=i||[]).push("style",n);var u=i;(e.updateQueue=u)&&(e.flags|=4)}};my=function(t,e,n,s){n!==s&&(e.flags|=4)};function ji(t,e){if(!Le)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var s=null;n!==null;)n.alternate!==null&&(s=n),n=n.sibling;s===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:s.sibling=null}}function wt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,s=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,s|=r.subtreeFlags&14680064,s|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,s|=r.subtreeFlags,s|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=s,t.childLanes=n,e}function Ww(t,e,n){var s=e.pendingProps;switch(xf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return wt(e),null;case 1:return Ht(e.type)&&al(),wt(e),null;case 3:return s=e.stateNode,si(),Ie(Vt),Ie(Ct),Nf(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(t===null||t.child===null)&&(oa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,bn!==null&&(ud(bn),bn=null))),nd(t,e),wt(e),null;case 5:_f(e);var r=er(xo.current);if(n=e.type,t!==null&&e.stateNode!=null)py(t,e,n,s,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!s){if(e.stateNode===null)throw Error(G(166));return wt(e),null}if(t=er(Tn.current),oa(e)){s=e.stateNode,n=e.type;var i=e.memoizedProps;switch(s[An]=e,s[mo]=i,t=(e.mode&1)!==0,n){case"dialog":Te("cancel",s),Te("close",s);break;case"iframe":case"object":case"embed":Te("load",s);break;case"video":case"audio":for(r=0;r<Ri.length;r++)Te(Ri[r],s);break;case"source":Te("error",s);break;case"img":case"image":case"link":Te("error",s),Te("load",s);break;case"details":Te("toggle",s);break;case"input":$h(s,i),Te("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!i.multiple},Te("invalid",s);break;case"textarea":Wh(s,i),Te("invalid",s)}Mu(n,i),r=null;for(var o in i)if(i.hasOwnProperty(o)){var a=i[o];o==="children"?typeof a=="string"?s.textContent!==a&&(i.suppressHydrationWarning!==!0&&ia(s.textContent,a,t),r=["children",a]):typeof a=="number"&&s.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&ia(s.textContent,a,t),r=["children",""+a]):ro.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Te("scroll",s)}switch(n){case"input":Qo(s),Uh(s,i,!0);break;case"textarea":Qo(s),Vh(s);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(s.onclick=ol)}s=r,e.updateQueue=s,s!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Wx(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof s.is=="string"?t=o.createElement(n,{is:s.is}):(t=o.createElement(n),n==="select"&&(o=t,s.multiple?o.multiple=!0:s.size&&(o.size=s.size))):t=o.createElementNS(t,n),t[An]=e,t[mo]=s,hy(t,e,!1,!1),e.stateNode=t;e:{switch(o=Pu(n,s),n){case"dialog":Te("cancel",t),Te("close",t),r=s;break;case"iframe":case"object":case"embed":Te("load",t),r=s;break;case"video":case"audio":for(r=0;r<Ri.length;r++)Te(Ri[r],t);r=s;break;case"source":Te("error",t),r=s;break;case"img":case"image":case"link":Te("error",t),Te("load",t),r=s;break;case"details":Te("toggle",t),r=s;break;case"input":$h(t,s),r=Su(t,s),Te("invalid",t);break;case"option":r=s;break;case"select":t._wrapperState={wasMultiple:!!s.multiple},r=Ye({},s,{value:void 0}),Te("invalid",t);break;case"textarea":Wh(t,s),r=Cu(t,s),Te("invalid",t);break;default:r=s}Mu(n,r),a=r;for(i in a)if(a.hasOwnProperty(i)){var c=a[i];i==="style"?Yx(t,c):i==="dangerouslySetInnerHTML"?(c=c?c.__html:void 0,c!=null&&Vx(t,c)):i==="children"?typeof c=="string"?(n!=="textarea"||c!=="")&&io(t,c):typeof c=="number"&&io(t,""+c):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(ro.hasOwnProperty(i)?c!=null&&i==="onScroll"&&Te("scroll",t):c!=null&&tf(t,i,c,o))}switch(n){case"input":Qo(t),Uh(t,s,!1);break;case"textarea":Qo(t),Vh(t);break;case"option":s.value!=null&&t.setAttribute("value",""+Ts(s.value));break;case"select":t.multiple=!!s.multiple,i=s.value,i!=null?Vr(t,!!s.multiple,i,!1):s.defaultValue!=null&&Vr(t,!!s.multiple,s.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=ol)}switch(n){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return wt(e),null;case 6:if(t&&e.stateNode!=null)my(t,e,t.memoizedProps,s);else{if(typeof s!="string"&&e.stateNode===null)throw Error(G(166));if(n=er(xo.current),er(Tn.current),oa(e)){if(s=e.stateNode,n=e.memoizedProps,s[An]=e,(i=s.nodeValue!==n)&&(t=Qt,t!==null))switch(t.tag){case 3:ia(s.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ia(s.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else s=(n.nodeType===9?n:n.ownerDocument).createTextNode(s),s[An]=e,e.stateNode=s}return wt(e),null;case 13:if(Ie(Be),s=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Le&&Xt!==null&&e.mode&1&&!(e.flags&128))O0(),ti(),e.flags|=98560,i=!1;else if(i=oa(e),s!==null&&s.dehydrated!==null){if(t===null){if(!i)throw Error(G(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(G(317));i[An]=e}else ti(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;wt(e),i=!1}else bn!==null&&(ud(bn),bn=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(s=s!==null,s!==(t!==null&&t.memoizedState!==null)&&s&&(e.child.flags|=8192,e.mode&1&&(t===null||Be.current&1?lt===0&&(lt=3):Rf())),e.updateQueue!==null&&(e.flags|=4),wt(e),null);case 4:return si(),nd(t,e),t===null&&ho(e.stateNode.containerInfo),wt(e),null;case 10:return wf(e.type._context),wt(e),null;case 17:return Ht(e.type)&&al(),wt(e),null;case 19:if(Ie(Be),i=e.memoizedState,i===null)return wt(e),null;if(s=(e.flags&128)!==0,o=i.rendering,o===null)if(s)ji(i,!1);else{if(lt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=pl(t),o!==null){for(e.flags|=128,ji(i,!1),s=o.updateQueue,s!==null&&(e.updateQueue=s,e.flags|=4),e.subtreeFlags=0,s=n,n=e.child;n!==null;)i=n,t=s,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return De(Be,Be.current&1|2),e.child}t=t.sibling}i.tail!==null&&Je()>ii&&(e.flags|=128,s=!0,ji(i,!1),e.lanes=4194304)}else{if(!s)if(t=pl(o),t!==null){if(e.flags|=128,s=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),ji(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!Le)return wt(e),null}else 2*Je()-i.renderingStartTime>ii&&n!==1073741824&&(e.flags|=128,s=!0,ji(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Je(),e.sibling=null,n=Be.current,De(Be,s?n&1|2:n&1),e):(wt(e),null);case 22:case 23:return Ff(),s=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==s&&(e.flags|=8192),s&&e.mode&1?Gt&1073741824&&(wt(e),e.subtreeFlags&6&&(e.flags|=8192)):wt(e),null;case 24:return null;case 25:return null}throw Error(G(156,e.tag))}function Vw(t,e){switch(xf(e),e.tag){case 1:return Ht(e.type)&&al(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return si(),Ie(Vt),Ie(Ct),Nf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return _f(e),null;case 13:if(Ie(Be),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(G(340));ti()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Ie(Be),null;case 4:return si(),null;case 10:return wf(e.type._context),null;case 22:case 23:return Ff(),null;case 24:return null;default:return null}}var ca=!1,jt=!1,Hw=typeof WeakSet=="function"?WeakSet:Set,oe=null;function Rr(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(s){qe(t,e,s)}else n.current=null}function sd(t,e,n){try{n()}catch(s){qe(t,e,s)}}var Op=!1;function Yw(t,e){if(Bu=sl,t=b0(),mf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var s=n.getSelection&&n.getSelection();if(s&&s.rangeCount!==0){n=s.anchorNode;var r=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,a=-1,c=-1,u=0,d=0,f=t,h=null;t:for(;;){for(var m;f!==n||r!==0&&f.nodeType!==3||(a=o+r),f!==i||s!==0&&f.nodeType!==3||(c=o+s),f.nodeType===3&&(o+=f.nodeValue.length),(m=f.firstChild)!==null;)h=f,f=m;for(;;){if(f===t)break t;if(h===n&&++u===r&&(a=o),h===i&&++d===s&&(c=o),(m=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=m}n=a===-1||c===-1?null:{start:a,end:c}}else n=null}n=n||{start:0,end:0}}else n=null;for($u={focusedElem:t,selectionRange:n},sl=!1,oe=e;oe!==null;)if(e=oe,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,oe=t;else for(;oe!==null;){e=oe;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var x=g.memoizedProps,v=g.memoizedState,b=e.stateNode,p=b.getSnapshotBeforeUpdate(e.elementType===e.type?x:yn(e.type,x),v);b.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(G(163))}}catch(_){qe(e,e.return,_)}if(t=e.sibling,t!==null){t.return=e.return,oe=t;break}oe=e.return}return g=Op,Op=!1,g}function Xi(t,e,n){var s=e.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var r=s=s.next;do{if((r.tag&t)===t){var i=r.destroy;r.destroy=void 0,i!==void 0&&sd(e,n,i)}r=r.next}while(r!==s)}}function Xl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var s=n.create;n.destroy=s()}n=n.next}while(n!==e)}}function rd(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function gy(t){var e=t.alternate;e!==null&&(t.alternate=null,gy(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[An],delete e[mo],delete e[Vu],delete e[Ew],delete e[Mw])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function xy(t){return t.tag===5||t.tag===3||t.tag===4}function Tp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||xy(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function id(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ol));else if(s!==4&&(t=t.child,t!==null))for(id(t,e,n),t=t.sibling;t!==null;)id(t,e,n),t=t.sibling}function od(t,e,n){var s=t.tag;if(s===5||s===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(s!==4&&(t=t.child,t!==null))for(od(t,e,n),t=t.sibling;t!==null;)od(t,e,n),t=t.sibling}var xt=null,vn=!1;function as(t,e,n){for(n=n.child;n!==null;)yy(t,e,n),n=n.sibling}function yy(t,e,n){if(On&&typeof On.onCommitFiberUnmount=="function")try{On.onCommitFiberUnmount(Ul,n)}catch{}switch(n.tag){case 5:jt||Rr(n,e);case 6:var s=xt,r=vn;xt=null,as(t,e,n),xt=s,vn=r,xt!==null&&(vn?(t=xt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):xt.removeChild(n.stateNode));break;case 18:xt!==null&&(vn?(t=xt,n=n.stateNode,t.nodeType===8?zc(t.parentNode,n):t.nodeType===1&&zc(t,n),co(t)):zc(xt,n.stateNode));break;case 4:s=xt,r=vn,xt=n.stateNode.containerInfo,vn=!0,as(t,e,n),xt=s,vn=r;break;case 0:case 11:case 14:case 15:if(!jt&&(s=n.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){r=s=s.next;do{var i=r,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&sd(n,e,o),r=r.next}while(r!==s)}as(t,e,n);break;case 1:if(!jt&&(Rr(n,e),s=n.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=n.memoizedProps,s.state=n.memoizedState,s.componentWillUnmount()}catch(a){qe(n,e,a)}as(t,e,n);break;case 21:as(t,e,n);break;case 22:n.mode&1?(jt=(s=jt)||n.memoizedState!==null,as(t,e,n),jt=s):as(t,e,n);break;default:as(t,e,n)}}function zp(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Hw),e.forEach(function(s){var r=tk.bind(null,t,s);n.has(s)||(n.add(s),s.then(r,r))})}}function xn(t,e){var n=e.deletions;if(n!==null)for(var s=0;s<n.length;s++){var r=n[s];try{var i=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:xt=a.stateNode,vn=!1;break e;case 3:xt=a.stateNode.containerInfo,vn=!0;break e;case 4:xt=a.stateNode.containerInfo,vn=!0;break e}a=a.return}if(xt===null)throw Error(G(160));yy(i,o,r),xt=null,vn=!1;var c=r.alternate;c!==null&&(c.return=null),r.return=null}catch(u){qe(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)vy(e,t),e=e.sibling}function vy(t,e){var n=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(xn(e,t),_n(t),s&4){try{Xi(3,t,t.return),Xl(3,t)}catch(x){qe(t,t.return,x)}try{Xi(5,t,t.return)}catch(x){qe(t,t.return,x)}}break;case 1:xn(e,t),_n(t),s&512&&n!==null&&Rr(n,n.return);break;case 5:if(xn(e,t),_n(t),s&512&&n!==null&&Rr(n,n.return),t.flags&32){var r=t.stateNode;try{io(r,"")}catch(x){qe(t,t.return,x)}}if(s&4&&(r=t.stateNode,r!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,a=t.type,c=t.updateQueue;if(t.updateQueue=null,c!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&$x(r,i),Pu(a,o);var u=Pu(a,i);for(o=0;o<c.length;o+=2){var d=c[o],f=c[o+1];d==="style"?Yx(r,f):d==="dangerouslySetInnerHTML"?Vx(r,f):d==="children"?io(r,f):tf(r,d,f,u)}switch(a){case"input":_u(r,i);break;case"textarea":Ux(r,i);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!i.multiple;var m=i.value;m!=null?Vr(r,!!i.multiple,m,!1):h!==!!i.multiple&&(i.defaultValue!=null?Vr(r,!!i.multiple,i.defaultValue,!0):Vr(r,!!i.multiple,i.multiple?[]:"",!1))}r[mo]=i}catch(x){qe(t,t.return,x)}}break;case 6:if(xn(e,t),_n(t),s&4){if(t.stateNode===null)throw Error(G(162));r=t.stateNode,i=t.memoizedProps;try{r.nodeValue=i}catch(x){qe(t,t.return,x)}}break;case 3:if(xn(e,t),_n(t),s&4&&n!==null&&n.memoizedState.isDehydrated)try{co(e.containerInfo)}catch(x){qe(t,t.return,x)}break;case 4:xn(e,t),_n(t);break;case 13:xn(e,t),_n(t),r=t.child,r.flags&8192&&(i=r.memoizedState!==null,r.stateNode.isHidden=i,!i||r.alternate!==null&&r.alternate.memoizedState!==null||(zf=Je())),s&4&&zp(t);break;case 22:if(d=n!==null&&n.memoizedState!==null,t.mode&1?(jt=(u=jt)||d,xn(e,t),jt=u):xn(e,t),_n(t),s&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!d&&t.mode&1)for(oe=t,d=t.child;d!==null;){for(f=oe=d;oe!==null;){switch(h=oe,m=h.child,h.tag){case 0:case 11:case 14:case 15:Xi(4,h,h.return);break;case 1:Rr(h,h.return);var g=h.stateNode;if(typeof g.componentWillUnmount=="function"){s=h,n=h.return;try{e=s,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(x){qe(s,n,x)}}break;case 5:Rr(h,h.return);break;case 22:if(h.memoizedState!==null){Fp(f);continue}}m!==null?(m.return=h,oe=m):Fp(f)}d=d.sibling}e:for(d=null,f=t;;){if(f.tag===5){if(d===null){d=f;try{r=f.stateNode,u?(i=r.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=f.stateNode,c=f.memoizedProps.style,o=c!=null&&c.hasOwnProperty("display")?c.display:null,a.style.display=Hx("display",o))}catch(x){qe(t,t.return,x)}}}else if(f.tag===6){if(d===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(x){qe(t,t.return,x)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;d===f&&(d=null),f=f.return}d===f&&(d=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:xn(e,t),_n(t),s&4&&zp(t);break;case 21:break;default:xn(e,t),_n(t)}}function _n(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(xy(n)){var s=n;break e}n=n.return}throw Error(G(160))}switch(s.tag){case 5:var r=s.stateNode;s.flags&32&&(io(r,""),s.flags&=-33);var i=Tp(t);od(t,i,r);break;case 3:case 4:var o=s.stateNode.containerInfo,a=Tp(t);id(t,a,o);break;default:throw Error(G(161))}}catch(c){qe(t,t.return,c)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Kw(t,e,n){oe=t,by(t)}function by(t,e,n){for(var s=(t.mode&1)!==0;oe!==null;){var r=oe,i=r.child;if(r.tag===22&&s){var o=r.memoizedState!==null||ca;if(!o){var a=r.alternate,c=a!==null&&a.memoizedState!==null||jt;a=ca;var u=jt;if(ca=o,(jt=c)&&!u)for(oe=r;oe!==null;)o=oe,c=o.child,o.tag===22&&o.memoizedState!==null?Rp(r):c!==null?(c.return=o,oe=c):Rp(r);for(;i!==null;)oe=i,by(i),i=i.sibling;oe=r,ca=a,jt=u}Ip(t)}else r.subtreeFlags&8772&&i!==null?(i.return=r,oe=i):Ip(t)}}function Ip(t){for(;oe!==null;){var e=oe;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:jt||Xl(5,e);break;case 1:var s=e.stateNode;if(e.flags&4&&!jt)if(n===null)s.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:yn(e.type,n.memoizedProps);s.componentDidUpdate(r,n.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&bp(e,i,s);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}bp(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var c=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":c.autoFocus&&n.focus();break;case"img":c.src&&(n.src=c.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var d=u.memoizedState;if(d!==null){var f=d.dehydrated;f!==null&&co(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(G(163))}jt||e.flags&512&&rd(e)}catch(h){qe(e,e.return,h)}}if(e===t){oe=null;break}if(n=e.sibling,n!==null){n.return=e.return,oe=n;break}oe=e.return}}function Fp(t){for(;oe!==null;){var e=oe;if(e===t){oe=null;break}var n=e.sibling;if(n!==null){n.return=e.return,oe=n;break}oe=e.return}}function Rp(t){for(;oe!==null;){var e=oe;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Xl(4,e)}catch(c){qe(e,n,c)}break;case 1:var s=e.stateNode;if(typeof s.componentDidMount=="function"){var r=e.return;try{s.componentDidMount()}catch(c){qe(e,r,c)}}var i=e.return;try{rd(e)}catch(c){qe(e,i,c)}break;case 5:var o=e.return;try{rd(e)}catch(c){qe(e,o,c)}}}catch(c){qe(e,e.return,c)}if(e===t){oe=null;break}var a=e.sibling;if(a!==null){a.return=e.return,oe=a;break}oe=e.return}}var Gw=Math.ceil,xl=ss.ReactCurrentDispatcher,Of=ss.ReactCurrentOwner,dn=ss.ReactCurrentBatchConfig,ke=0,gt=null,nt=null,yt=0,Gt=0,Lr=Rs(0),lt=0,wo=null,fr=0,Ql=0,Tf=0,Qi=null,$t=null,zf=0,ii=1/0,Bn=null,yl=!1,ad=null,Cs=null,ua=!1,gs=null,vl=0,Zi=0,ld=null,Ua=-1,Wa=0;function zt(){return ke&6?Je():Ua!==-1?Ua:Ua=Je()}function Es(t){return t.mode&1?ke&2&&yt!==0?yt&-yt:Dw.transition!==null?(Wa===0&&(Wa=r0()),Wa):(t=Ee,t!==0||(t=window.event,t=t===void 0?16:d0(t.type)),t):1}function kn(t,e,n,s){if(50<Zi)throw Zi=0,ld=null,Error(G(185));Fo(t,n,s),(!(ke&2)||t!==gt)&&(t===gt&&(!(ke&2)&&(Ql|=n),lt===4&&fs(t,yt)),Yt(t,s),n===1&&ke===0&&!(e.mode&1)&&(ii=Je()+500,Kl&&Ls()))}function Yt(t,e){var n=t.callbackNode;Db(t,e);var s=nl(t,t===gt?yt:0);if(s===0)n!==null&&Kh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=s&-s,t.callbackPriority!==e){if(n!=null&&Kh(n),e===1)t.tag===0?Pw(Lp.bind(null,t)):P0(Lp.bind(null,t)),Nw(function(){!(ke&6)&&Ls()}),n=null;else{switch(i0(s)){case 1:n=af;break;case 4:n=n0;break;case 16:n=tl;break;case 536870912:n=s0;break;default:n=tl}n=Ey(n,wy.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function wy(t,e){if(Ua=-1,Wa=0,ke&6)throw Error(G(327));var n=t.callbackNode;if(qr()&&t.callbackNode!==n)return null;var s=nl(t,t===gt?yt:0);if(s===0)return null;if(s&30||s&t.expiredLanes||e)e=bl(t,s);else{e=s;var r=ke;ke|=2;var i=jy();(gt!==t||yt!==e)&&(Bn=null,ii=Je()+500,ir(t,e));do try{Qw();break}catch(a){ky(t,a)}while(!0);bf(),xl.current=i,ke=r,nt!==null?e=0:(gt=null,yt=0,e=lt)}if(e!==0){if(e===2&&(r=zu(t),r!==0&&(s=r,e=cd(t,r))),e===1)throw n=wo,ir(t,0),fs(t,s),Yt(t,Je()),n;if(e===6)fs(t,s);else{if(r=t.current.alternate,!(s&30)&&!qw(r)&&(e=bl(t,s),e===2&&(i=zu(t),i!==0&&(s=i,e=cd(t,i))),e===1))throw n=wo,ir(t,0),fs(t,s),Yt(t,Je()),n;switch(t.finishedWork=r,t.finishedLanes=s,e){case 0:case 1:throw Error(G(345));case 2:qs(t,$t,Bn);break;case 3:if(fs(t,s),(s&130023424)===s&&(e=zf+500-Je(),10<e)){if(nl(t,0)!==0)break;if(r=t.suspendedLanes,(r&s)!==s){zt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Wu(qs.bind(null,t,$t,Bn),e);break}qs(t,$t,Bn);break;case 4:if(fs(t,s),(s&4194240)===s)break;for(e=t.eventTimes,r=-1;0<s;){var o=31-wn(s);i=1<<o,o=e[o],o>r&&(r=o),s&=~i}if(s=r,s=Je()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*Gw(s/1960))-s,10<s){t.timeoutHandle=Wu(qs.bind(null,t,$t,Bn),s);break}qs(t,$t,Bn);break;case 5:qs(t,$t,Bn);break;default:throw Error(G(329))}}}return Yt(t,Je()),t.callbackNode===n?wy.bind(null,t):null}function cd(t,e){var n=Qi;return t.current.memoizedState.isDehydrated&&(ir(t,e).flags|=256),t=bl(t,e),t!==2&&(e=$t,$t=n,e!==null&&ud(e)),t}function ud(t){$t===null?$t=t:$t.push.apply($t,t)}function qw(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var s=0;s<n.length;s++){var r=n[s],i=r.getSnapshot;r=r.value;try{if(!jn(i(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function fs(t,e){for(e&=~Tf,e&=~Ql,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-wn(e),s=1<<n;t[n]=-1,e&=~s}}function Lp(t){if(ke&6)throw Error(G(327));qr();var e=nl(t,0);if(!(e&1))return Yt(t,Je()),null;var n=bl(t,e);if(t.tag!==0&&n===2){var s=zu(t);s!==0&&(e=s,n=cd(t,s))}if(n===1)throw n=wo,ir(t,0),fs(t,e),Yt(t,Je()),n;if(n===6)throw Error(G(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,qs(t,$t,Bn),Yt(t,Je()),null}function If(t,e){var n=ke;ke|=1;try{return t(e)}finally{ke=n,ke===0&&(ii=Je()+500,Kl&&Ls())}}function hr(t){gs!==null&&gs.tag===0&&!(ke&6)&&qr();var e=ke;ke|=1;var n=dn.transition,s=Ee;try{if(dn.transition=null,Ee=1,t)return t()}finally{Ee=s,dn.transition=n,ke=e,!(ke&6)&&Ls()}}function Ff(){Gt=Lr.current,Ie(Lr)}function ir(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,_w(n)),nt!==null)for(n=nt.return;n!==null;){var s=n;switch(xf(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&al();break;case 3:si(),Ie(Vt),Ie(Ct),Nf();break;case 5:_f(s);break;case 4:si();break;case 13:Ie(Be);break;case 19:Ie(Be);break;case 10:wf(s.type._context);break;case 22:case 23:Ff()}n=n.return}if(gt=t,nt=t=Ms(t.current,null),yt=Gt=e,lt=0,wo=null,Tf=Ql=fr=0,$t=Qi=null,Js!==null){for(e=0;e<Js.length;e++)if(n=Js[e],s=n.interleaved,s!==null){n.interleaved=null;var r=s.next,i=n.pending;if(i!==null){var o=i.next;i.next=r,s.next=o}n.pending=s}Js=null}return t}function ky(t,e){do{var n=nt;try{if(bf(),La.current=gl,ml){for(var s=We.memoizedState;s!==null;){var r=s.queue;r!==null&&(r.pending=null),s=s.next}ml=!1}if(dr=0,mt=at=We=null,qi=!1,yo=0,Of.current=null,n===null||n.return===null){lt=1,wo=e,nt=null;break}e:{var i=t,o=n.return,a=n,c=e;if(e=yt,a.flags|=32768,c!==null&&typeof c=="object"&&typeof c.then=="function"){var u=c,d=a,f=d.tag;if(!(d.mode&1)&&(f===0||f===11||f===15)){var h=d.alternate;h?(d.updateQueue=h.updateQueue,d.memoizedState=h.memoizedState,d.lanes=h.lanes):(d.updateQueue=null,d.memoizedState=null)}var m=Np(o);if(m!==null){m.flags&=-257,Cp(m,o,a,i,e),m.mode&1&&_p(i,u,e),e=m,c=u;var g=e.updateQueue;if(g===null){var x=new Set;x.add(c),e.updateQueue=x}else g.add(c);break e}else{if(!(e&1)){_p(i,u,e),Rf();break e}c=Error(G(426))}}else if(Le&&a.mode&1){var v=Np(o);if(v!==null){!(v.flags&65536)&&(v.flags|=256),Cp(v,o,a,i,e),yf(ri(c,a));break e}}i=c=ri(c,a),lt!==4&&(lt=2),Qi===null?Qi=[i]:Qi.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var b=iy(i,c,e);vp(i,b);break e;case 1:a=c;var p=i.type,y=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Cs===null||!Cs.has(y)))){i.flags|=65536,e&=-e,i.lanes|=e;var _=oy(i,a,e);vp(i,_);break e}}i=i.return}while(i!==null)}_y(n)}catch(j){e=j,nt===n&&n!==null&&(nt=n=n.return);continue}break}while(!0)}function jy(){var t=xl.current;return xl.current=gl,t===null?gl:t}function Rf(){(lt===0||lt===3||lt===2)&&(lt=4),gt===null||!(fr&268435455)&&!(Ql&268435455)||fs(gt,yt)}function bl(t,e){var n=ke;ke|=2;var s=jy();(gt!==t||yt!==e)&&(Bn=null,ir(t,e));do try{Xw();break}catch(r){ky(t,r)}while(!0);if(bf(),ke=n,xl.current=s,nt!==null)throw Error(G(261));return gt=null,yt=0,lt}function Xw(){for(;nt!==null;)Sy(nt)}function Qw(){for(;nt!==null&&!kb();)Sy(nt)}function Sy(t){var e=Cy(t.alternate,t,Gt);t.memoizedProps=t.pendingProps,e===null?_y(t):nt=e,Of.current=null}function _y(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Vw(n,e),n!==null){n.flags&=32767,nt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{lt=6,nt=null;return}}else if(n=Ww(n,e,Gt),n!==null){nt=n;return}if(e=e.sibling,e!==null){nt=e;return}nt=e=t}while(e!==null);lt===0&&(lt=5)}function qs(t,e,n){var s=Ee,r=dn.transition;try{dn.transition=null,Ee=1,Zw(t,e,n,s)}finally{dn.transition=r,Ee=s}return null}function Zw(t,e,n,s){do qr();while(gs!==null);if(ke&6)throw Error(G(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(G(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(Ab(t,i),t===gt&&(nt=gt=null,yt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||ua||(ua=!0,Ey(tl,function(){return qr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=dn.transition,dn.transition=null;var o=Ee;Ee=1;var a=ke;ke|=4,Of.current=null,Yw(t,n),vy(n,t),yw($u),sl=!!Bu,$u=Bu=null,t.current=n,Kw(n),jb(),ke=a,Ee=o,dn.transition=i}else t.current=n;if(ua&&(ua=!1,gs=t,vl=r),i=t.pendingLanes,i===0&&(Cs=null),Nb(n.stateNode),Yt(t,Je()),e!==null)for(s=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],s(r.value,{componentStack:r.stack,digest:r.digest});if(yl)throw yl=!1,t=ad,ad=null,t;return vl&1&&t.tag!==0&&qr(),i=t.pendingLanes,i&1?t===ld?Zi++:(Zi=0,ld=t):Zi=0,Ls(),null}function qr(){if(gs!==null){var t=i0(vl),e=dn.transition,n=Ee;try{if(dn.transition=null,Ee=16>t?16:t,gs===null)var s=!1;else{if(t=gs,gs=null,vl=0,ke&6)throw Error(G(331));var r=ke;for(ke|=4,oe=t.current;oe!==null;){var i=oe,o=i.child;if(oe.flags&16){var a=i.deletions;if(a!==null){for(var c=0;c<a.length;c++){var u=a[c];for(oe=u;oe!==null;){var d=oe;switch(d.tag){case 0:case 11:case 15:Xi(8,d,i)}var f=d.child;if(f!==null)f.return=d,oe=f;else for(;oe!==null;){d=oe;var h=d.sibling,m=d.return;if(gy(d),d===u){oe=null;break}if(h!==null){h.return=m,oe=h;break}oe=m}}}var g=i.alternate;if(g!==null){var x=g.child;if(x!==null){g.child=null;do{var v=x.sibling;x.sibling=null,x=v}while(x!==null)}}oe=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,oe=o;else e:for(;oe!==null;){if(i=oe,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Xi(9,i,i.return)}var b=i.sibling;if(b!==null){b.return=i.return,oe=b;break e}oe=i.return}}var p=t.current;for(oe=p;oe!==null;){o=oe;var y=o.child;if(o.subtreeFlags&2064&&y!==null)y.return=o,oe=y;else e:for(o=p;oe!==null;){if(a=oe,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Xl(9,a)}}catch(j){qe(a,a.return,j)}if(a===o){oe=null;break e}var _=a.sibling;if(_!==null){_.return=a.return,oe=_;break e}oe=a.return}}if(ke=r,Ls(),On&&typeof On.onPostCommitFiberRoot=="function")try{On.onPostCommitFiberRoot(Ul,t)}catch{}s=!0}return s}finally{Ee=n,dn.transition=e}}return!1}function Bp(t,e,n){e=ri(n,e),e=iy(t,e,1),t=Ns(t,e,1),e=zt(),t!==null&&(Fo(t,1,e),Yt(t,e))}function qe(t,e,n){if(t.tag===3)Bp(t,t,n);else for(;e!==null;){if(e.tag===3){Bp(e,t,n);break}else if(e.tag===1){var s=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Cs===null||!Cs.has(s))){t=ri(n,t),t=oy(e,t,1),e=Ns(e,t,1),t=zt(),e!==null&&(Fo(e,1,t),Yt(e,t));break}}e=e.return}}function Jw(t,e,n){var s=t.pingCache;s!==null&&s.delete(e),e=zt(),t.pingedLanes|=t.suspendedLanes&n,gt===t&&(yt&n)===n&&(lt===4||lt===3&&(yt&130023424)===yt&&500>Je()-zf?ir(t,0):Tf|=n),Yt(t,e)}function Ny(t,e){e===0&&(t.mode&1?(e=ea,ea<<=1,!(ea&130023424)&&(ea=4194304)):e=1);var n=zt();t=Jn(t,e),t!==null&&(Fo(t,e,n),Yt(t,n))}function ek(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Ny(t,n)}function tk(t,e){var n=0;switch(t.tag){case 13:var s=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:s=t.stateNode;break;default:throw Error(G(314))}s!==null&&s.delete(e),Ny(t,n)}var Cy;Cy=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Vt.current)Wt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Wt=!1,Uw(t,e,n);Wt=!!(t.flags&131072)}else Wt=!1,Le&&e.flags&1048576&&D0(e,ul,e.index);switch(e.lanes=0,e.tag){case 2:var s=e.type;$a(t,e),t=e.pendingProps;var r=ei(e,Ct.current);Gr(e,n),r=Ef(null,e,s,t,r,n);var i=Mf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Ht(s)?(i=!0,ll(e)):i=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,jf(e),r.updater=ql,e.stateNode=r,r._reactInternals=e,Xu(e,s,t,n),e=Ju(null,e,s,!0,i,n)):(e.tag=0,Le&&i&&gf(e),Pt(null,e,r,n),e=e.child),e;case 16:s=e.elementType;e:{switch($a(t,e),t=e.pendingProps,r=s._init,s=r(s._payload),e.type=s,r=e.tag=sk(s),t=yn(s,t),r){case 0:e=Zu(null,e,s,t,n);break e;case 1:e=Pp(null,e,s,t,n);break e;case 11:e=Ep(null,e,s,t,n);break e;case 14:e=Mp(null,e,s,yn(s.type,t),n);break e}throw Error(G(306,s,""))}return e;case 0:return s=e.type,r=e.pendingProps,r=e.elementType===s?r:yn(s,r),Zu(t,e,s,r,n);case 1:return s=e.type,r=e.pendingProps,r=e.elementType===s?r:yn(s,r),Pp(t,e,s,r,n);case 3:e:{if(uy(e),t===null)throw Error(G(387));s=e.pendingProps,i=e.memoizedState,r=i.element,F0(t,e),hl(e,s,null,n);var o=e.memoizedState;if(s=o.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){r=ri(Error(G(423)),e),e=Dp(t,e,s,n,r);break e}else if(s!==r){r=ri(Error(G(424)),e),e=Dp(t,e,s,n,r);break e}else for(Xt=_s(e.stateNode.containerInfo.firstChild),Qt=e,Le=!0,bn=null,n=z0(e,null,s,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ti(),s===r){e=es(t,e,n);break e}Pt(t,e,s,n)}e=e.child}return e;case 5:return R0(e),t===null&&Ku(e),s=e.type,r=e.pendingProps,i=t!==null?t.memoizedProps:null,o=r.children,Uu(s,r)?o=null:i!==null&&Uu(s,i)&&(e.flags|=32),cy(t,e),Pt(t,e,o,n),e.child;case 6:return t===null&&Ku(e),null;case 13:return dy(t,e,n);case 4:return Sf(e,e.stateNode.containerInfo),s=e.pendingProps,t===null?e.child=ni(e,null,s,n):Pt(t,e,s,n),e.child;case 11:return s=e.type,r=e.pendingProps,r=e.elementType===s?r:yn(s,r),Ep(t,e,s,r,n);case 7:return Pt(t,e,e.pendingProps,n),e.child;case 8:return Pt(t,e,e.pendingProps.children,n),e.child;case 12:return Pt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(s=e.type._context,r=e.pendingProps,i=e.memoizedProps,o=r.value,De(dl,s._currentValue),s._currentValue=o,i!==null)if(jn(i.value,o)){if(i.children===r.children&&!Vt.current){e=es(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var a=i.dependencies;if(a!==null){o=i.child;for(var c=a.firstContext;c!==null;){if(c.context===s){if(i.tag===1){c=Xn(-1,n&-n),c.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var d=u.pending;d===null?c.next=c:(c.next=d.next,d.next=c),u.pending=c}}i.lanes|=n,c=i.alternate,c!==null&&(c.lanes|=n),Gu(i.return,n,e),a.lanes|=n;break}c=c.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(G(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Gu(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Pt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,s=e.pendingProps.children,Gr(e,n),r=hn(r),s=s(r),e.flags|=1,Pt(t,e,s,n),e.child;case 14:return s=e.type,r=yn(s,e.pendingProps),r=yn(s.type,r),Mp(t,e,s,r,n);case 15:return ay(t,e,e.type,e.pendingProps,n);case 17:return s=e.type,r=e.pendingProps,r=e.elementType===s?r:yn(s,r),$a(t,e),e.tag=1,Ht(s)?(t=!0,ll(e)):t=!1,Gr(e,n),ry(e,s,r),Xu(e,s,r,n),Ju(null,e,s,!0,t,n);case 19:return fy(t,e,n);case 22:return ly(t,e,n)}throw Error(G(156,e.tag))};function Ey(t,e){return t0(t,e)}function nk(t,e,n,s){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function cn(t,e,n,s){return new nk(t,e,n,s)}function Lf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function sk(t){if(typeof t=="function")return Lf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===sf)return 11;if(t===rf)return 14}return 2}function Ms(t,e){var n=t.alternate;return n===null?(n=cn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Va(t,e,n,s,r,i){var o=2;if(s=t,typeof t=="function")Lf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Mr:return or(n.children,r,i,e);case nf:o=8,r|=8;break;case bu:return t=cn(12,n,e,r|2),t.elementType=bu,t.lanes=i,t;case wu:return t=cn(13,n,e,r),t.elementType=wu,t.lanes=i,t;case ku:return t=cn(19,n,e,r),t.elementType=ku,t.lanes=i,t;case Rx:return Zl(n,r,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ix:o=10;break e;case Fx:o=9;break e;case sf:o=11;break e;case rf:o=14;break e;case cs:o=16,s=null;break e}throw Error(G(130,t==null?t:typeof t,""))}return e=cn(o,n,e,r),e.elementType=t,e.type=s,e.lanes=i,e}function or(t,e,n,s){return t=cn(7,t,s,e),t.lanes=n,t}function Zl(t,e,n,s){return t=cn(22,t,s,e),t.elementType=Rx,t.lanes=n,t.stateNode={isHidden:!1},t}function Wc(t,e,n){return t=cn(6,t,null,e),t.lanes=n,t}function Vc(t,e,n){return e=cn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function rk(t,e,n,s,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Sc(0),this.expirationTimes=Sc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Sc(0),this.identifierPrefix=s,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Bf(t,e,n,s,r,i,o,a,c){return t=new rk(t,e,n,a,c),e===1?(e=1,i===!0&&(e|=8)):e=0,i=cn(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:s,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},jf(i),t}function ik(t,e,n){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Er,key:s==null?null:""+s,children:t,containerInfo:e,implementation:n}}function My(t){if(!t)return zs;t=t._reactInternals;e:{if(yr(t)!==t||t.tag!==1)throw Error(G(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Ht(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(G(171))}if(t.tag===1){var n=t.type;if(Ht(n))return M0(t,n,e)}return e}function Py(t,e,n,s,r,i,o,a,c){return t=Bf(n,s,!0,t,r,i,o,a,c),t.context=My(null),n=t.current,s=zt(),r=Es(n),i=Xn(s,r),i.callback=e??null,Ns(n,i,r),t.current.lanes=r,Fo(t,r,s),Yt(t,s),t}function Jl(t,e,n,s){var r=e.current,i=zt(),o=Es(r);return n=My(n),e.context===null?e.context=n:e.pendingContext=n,e=Xn(i,o),e.payload={element:t},s=s===void 0?null:s,s!==null&&(e.callback=s),t=Ns(r,e,o),t!==null&&(kn(t,r,o,i),Ra(t,r,o)),o}function wl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function $p(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function $f(t,e){$p(t,e),(t=t.alternate)&&$p(t,e)}function ok(){return null}var Dy=typeof reportError=="function"?reportError:function(t){console.error(t)};function Uf(t){this._internalRoot=t}ec.prototype.render=Uf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(G(409));Jl(t,e,null,null)};ec.prototype.unmount=Uf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;hr(function(){Jl(null,t,null,null)}),e[Zn]=null}};function ec(t){this._internalRoot=t}ec.prototype.unstable_scheduleHydration=function(t){if(t){var e=l0();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ds.length&&e!==0&&e<ds[n].priority;n++);ds.splice(n,0,t),n===0&&u0(t)}};function Wf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function tc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Up(){}function ak(t,e,n,s,r){if(r){if(typeof s=="function"){var i=s;s=function(){var u=wl(o);i.call(u)}}var o=Py(e,s,t,0,null,!1,!1,"",Up);return t._reactRootContainer=o,t[Zn]=o.current,ho(t.nodeType===8?t.parentNode:t),hr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof s=="function"){var a=s;s=function(){var u=wl(c);a.call(u)}}var c=Bf(t,0,!1,null,null,!1,!1,"",Up);return t._reactRootContainer=c,t[Zn]=c.current,ho(t.nodeType===8?t.parentNode:t),hr(function(){Jl(e,c,n,s)}),c}function nc(t,e,n,s,r){var i=n._reactRootContainer;if(i){var o=i;if(typeof r=="function"){var a=r;r=function(){var c=wl(o);a.call(c)}}Jl(e,o,t,r)}else o=ak(n,e,t,r,s);return wl(o)}o0=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Fi(e.pendingLanes);n!==0&&(lf(e,n|1),Yt(e,Je()),!(ke&6)&&(ii=Je()+500,Ls()))}break;case 13:hr(function(){var s=Jn(t,1);if(s!==null){var r=zt();kn(s,t,1,r)}}),$f(t,1)}};cf=function(t){if(t.tag===13){var e=Jn(t,134217728);if(e!==null){var n=zt();kn(e,t,134217728,n)}$f(t,134217728)}};a0=function(t){if(t.tag===13){var e=Es(t),n=Jn(t,e);if(n!==null){var s=zt();kn(n,t,e,s)}$f(t,e)}};l0=function(){return Ee};c0=function(t,e){var n=Ee;try{return Ee=t,e()}finally{Ee=n}};Au=function(t,e,n){switch(e){case"input":if(_u(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var s=n[e];if(s!==t&&s.form===t.form){var r=Yl(s);if(!r)throw Error(G(90));Bx(s),_u(s,r)}}}break;case"textarea":Ux(t,n);break;case"select":e=n.value,e!=null&&Vr(t,!!n.multiple,e,!1)}};qx=If;Xx=hr;var lk={usingClientEntryPoint:!1,Events:[Lo,Or,Yl,Kx,Gx,If]},Si={findFiberByHostInstance:Zs,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},ck={bundleType:Si.bundleType,version:Si.version,rendererPackageName:Si.rendererPackageName,rendererConfig:Si.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ss.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Jx(t),t===null?null:t.stateNode},findFiberByHostInstance:Si.findFiberByHostInstance||ok,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var da=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!da.isDisabled&&da.supportsFiber)try{Ul=da.inject(ck),On=da}catch{}}Jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=lk;Jt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Wf(e))throw Error(G(200));return ik(t,e,null,n)};Jt.createRoot=function(t,e){if(!Wf(t))throw Error(G(299));var n=!1,s="",r=Dy;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(s=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Bf(t,1,!1,null,null,n,!1,s,r),t[Zn]=e.current,ho(t.nodeType===8?t.parentNode:t),new Uf(e)};Jt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(G(188)):(t=Object.keys(t).join(","),Error(G(268,t)));return t=Jx(e),t=t===null?null:t.stateNode,t};Jt.flushSync=function(t){return hr(t)};Jt.hydrate=function(t,e,n){if(!tc(e))throw Error(G(200));return nc(null,t,e,!0,n)};Jt.hydrateRoot=function(t,e,n){if(!Wf(t))throw Error(G(405));var s=n!=null&&n.hydratedSources||null,r=!1,i="",o=Dy;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Py(e,null,t,1,n??null,r,!1,i,o),t[Zn]=e.current,ho(t),s)for(t=0;t<s.length;t++)n=s[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new ec(e)};Jt.render=function(t,e,n){if(!tc(e))throw Error(G(200));return nc(null,t,e,!1,n)};Jt.unmountComponentAtNode=function(t){if(!tc(t))throw Error(G(40));return t._reactRootContainer?(hr(function(){nc(null,null,t,!1,function(){t._reactRootContainer=null,t[Zn]=null})}),!0):!1};Jt.unstable_batchedUpdates=If;Jt.unstable_renderSubtreeIntoContainer=function(t,e,n,s){if(!tc(n))throw Error(G(200));if(t==null||t._reactInternals===void 0)throw Error(G(38));return nc(t,e,n,!1,s)};Jt.version="18.3.1-next-f1338f8080-20240426";function Ay(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ay)}catch(t){console.error(t)}}Ay(),Ax.exports=Jt;var uk=Ax.exports,Wp=uk;yu.createRoot=Wp.createRoot,yu.hydrateRoot=Wp.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ko(){return ko=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},ko.apply(this,arguments)}var xs;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(xs||(xs={}));const Vp="popstate";function dk(t){t===void 0&&(t={});function e(s,r){let{pathname:i,search:o,hash:a}=s.location;return dd("",{pathname:i,search:o,hash:a},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(s,r){return typeof r=="string"?r:kl(r)}return hk(e,n,null,t)}function Xe(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function Vf(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function fk(){return Math.random().toString(36).substr(2,8)}function Hp(t,e){return{usr:t.state,key:t.key,idx:e}}function dd(t,e,n,s){return n===void 0&&(n=null),ko({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?fi(e):e,{state:n,key:e&&e.key||s||fk()})}function kl(t){let{pathname:e="/",search:n="",hash:s=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function fi(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let s=t.indexOf("?");s>=0&&(e.search=t.substr(s),t=t.substr(0,s)),t&&(e.pathname=t)}return e}function hk(t,e,n,s){s===void 0&&(s={});let{window:r=document.defaultView,v5Compat:i=!1}=s,o=r.history,a=xs.Pop,c=null,u=d();u==null&&(u=0,o.replaceState(ko({},o.state,{idx:u}),""));function d(){return(o.state||{idx:null}).idx}function f(){a=xs.Pop;let v=d(),b=v==null?null:v-u;u=v,c&&c({action:a,location:x.location,delta:b})}function h(v,b){a=xs.Push;let p=dd(x.location,v,b);u=d()+1;let y=Hp(p,u),_=x.createHref(p);try{o.pushState(y,"",_)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;r.location.assign(_)}i&&c&&c({action:a,location:x.location,delta:1})}function m(v,b){a=xs.Replace;let p=dd(x.location,v,b);u=d();let y=Hp(p,u),_=x.createHref(p);o.replaceState(y,"",_),i&&c&&c({action:a,location:x.location,delta:0})}function g(v){let b=r.location.origin!=="null"?r.location.origin:r.location.href,p=typeof v=="string"?v:kl(v);return p=p.replace(/ $/,"%20"),Xe(b,"No window.location.(origin|href) available to create URL for href: "+p),new URL(p,b)}let x={get action(){return a},get location(){return t(r,o)},listen(v){if(c)throw new Error("A history only accepts one active listener");return r.addEventListener(Vp,f),c=v,()=>{r.removeEventListener(Vp,f),c=null}},createHref(v){return e(r,v)},createURL:g,encodeLocation(v){let b=g(v);return{pathname:b.pathname,search:b.search,hash:b.hash}},push:h,replace:m,go(v){return o.go(v)}};return x}var Yp;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Yp||(Yp={}));function pk(t,e,n){return n===void 0&&(n="/"),mk(t,e,n)}function mk(t,e,n,s){let r=typeof e=="string"?fi(e):e,i=oi(r.pathname||"/",n);if(i==null)return null;let o=Oy(t);gk(o);let a=null;for(let c=0;a==null&&c<o.length;++c){let u=Ck(i);a=_k(o[c],u)}return a}function Oy(t,e,n,s){e===void 0&&(e=[]),n===void 0&&(n=[]),s===void 0&&(s="");let r=(i,o,a)=>{let c={relativePath:a===void 0?i.path||"":a,caseSensitive:i.caseSensitive===!0,childrenIndex:o,route:i};c.relativePath.startsWith("/")&&(Xe(c.relativePath.startsWith(s),'Absolute route path "'+c.relativePath+'" nested under path '+('"'+s+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),c.relativePath=c.relativePath.slice(s.length));let u=Ps([s,c.relativePath]),d=n.concat(c);i.children&&i.children.length>0&&(Xe(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),Oy(i.children,e,d,u)),!(i.path==null&&!i.index)&&e.push({path:u,score:jk(u,i.index),routesMeta:d})};return t.forEach((i,o)=>{var a;if(i.path===""||!((a=i.path)!=null&&a.includes("?")))r(i,o);else for(let c of Ty(i.path))r(i,o,c)}),e}function Ty(t){let e=t.split("/");if(e.length===0)return[];let[n,...s]=e,r=n.endsWith("?"),i=n.replace(/\?$/,"");if(s.length===0)return r?[i,""]:[i];let o=Ty(s.join("/")),a=[];return a.push(...o.map(c=>c===""?i:[i,c].join("/"))),r&&a.push(...o),a.map(c=>t.startsWith("/")&&c===""?"/":c)}function gk(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:Sk(e.routesMeta.map(s=>s.childrenIndex),n.routesMeta.map(s=>s.childrenIndex)))}const xk=/^:[\w-]+$/,yk=3,vk=2,bk=1,wk=10,kk=-2,Kp=t=>t==="*";function jk(t,e){let n=t.split("/"),s=n.length;return n.some(Kp)&&(s+=kk),e&&(s+=vk),n.filter(r=>!Kp(r)).reduce((r,i)=>r+(xk.test(i)?yk:i===""?bk:wk),s)}function Sk(t,e){return t.length===e.length&&t.slice(0,-1).every((s,r)=>s===e[r])?t[t.length-1]-e[e.length-1]:0}function _k(t,e,n){let{routesMeta:s}=t,r={},i="/",o=[];for(let a=0;a<s.length;++a){let c=s[a],u=a===s.length-1,d=i==="/"?e:e.slice(i.length)||"/",f=fd({path:c.relativePath,caseSensitive:c.caseSensitive,end:u},d),h=c.route;if(!f)return null;Object.assign(r,f.params),o.push({params:r,pathname:Ps([i,f.pathname]),pathnameBase:Ak(Ps([i,f.pathnameBase])),route:h}),f.pathnameBase!=="/"&&(i=Ps([i,f.pathnameBase]))}return o}function fd(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,s]=Nk(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let i=r[0],o=i.replace(/(.)\/+$/,"$1"),a=r.slice(1);return{params:s.reduce((u,d,f)=>{let{paramName:h,isOptional:m}=d;if(h==="*"){let x=a[f]||"";o=i.slice(0,i.length-x.length).replace(/(.)\/+$/,"$1")}const g=a[f];return m&&!g?u[h]=void 0:u[h]=(g||"").replace(/%2F/g,"/"),u},{}),pathname:i,pathnameBase:o,pattern:t}}function Nk(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),Vf(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let s=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,c)=>(s.push({paramName:a,isOptional:c!=null}),c?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(s.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),s]}function Ck(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return Vf(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function oi(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,s=t.charAt(n);return s&&s!=="/"?null:t.slice(n)||"/"}const Ek=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Mk=t=>Ek.test(t);function Pk(t,e){e===void 0&&(e="/");let{pathname:n,search:s="",hash:r=""}=typeof t=="string"?fi(t):t,i;if(n)if(Mk(n))i=n;else{if(n.includes("//")){let o=n;n=n.replace(/\/\/+/g,"/"),Vf(!1,"Pathnames cannot have embedded double slashes - normalizing "+(o+" -> "+n))}n.startsWith("/")?i=Gp(n.substring(1),"/"):i=Gp(n,e)}else i=e;return{pathname:i,search:Ok(s),hash:Tk(r)}}function Gp(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Hc(t,e,n,s){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(s)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Dk(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function zy(t,e){let n=Dk(t);return e?n.map((s,r)=>r===n.length-1?s.pathname:s.pathnameBase):n.map(s=>s.pathnameBase)}function Iy(t,e,n,s){s===void 0&&(s=!1);let r;typeof t=="string"?r=fi(t):(r=ko({},t),Xe(!r.pathname||!r.pathname.includes("?"),Hc("?","pathname","search",r)),Xe(!r.pathname||!r.pathname.includes("#"),Hc("#","pathname","hash",r)),Xe(!r.search||!r.search.includes("#"),Hc("#","search","hash",r)));let i=t===""||r.pathname==="",o=i?"/":r.pathname,a;if(o==null)a=n;else{let f=e.length-1;if(!s&&o.startsWith("..")){let h=o.split("/");for(;h[0]==="..";)h.shift(),f-=1;r.pathname=h.join("/")}a=f>=0?e[f]:"/"}let c=Pk(r,a),u=o&&o!=="/"&&o.endsWith("/"),d=(i||o===".")&&n.endsWith("/");return!c.pathname.endsWith("/")&&(u||d)&&(c.pathname+="/"),c}const Ps=t=>t.join("/").replace(/\/\/+/g,"/"),Ak=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),Ok=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,Tk=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function zk(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const Fy=["post","put","patch","delete"];new Set(Fy);const Ik=["get",...Fy];new Set(Ik);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function jo(){return jo=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},jo.apply(this,arguments)}const sc=E.createContext(null),Ry=E.createContext(null),Bs=E.createContext(null),rc=E.createContext(null),vr=E.createContext({outlet:null,matches:[],isDataRoute:!1}),Ly=E.createContext(null);function Fk(t,e){let{relative:n}=e===void 0?{}:e;$o()||Xe(!1);let{basename:s,navigator:r}=E.useContext(Bs),{hash:i,pathname:o,search:a}=ic(t,{relative:n}),c=o;return s!=="/"&&(c=o==="/"?s:Ps([s,o])),r.createHref({pathname:c,search:a,hash:i})}function $o(){return E.useContext(rc)!=null}function $s(){return $o()||Xe(!1),E.useContext(rc).location}function By(t){E.useContext(Bs).static||E.useLayoutEffect(t)}function Ke(){let{isDataRoute:t}=E.useContext(vr);return t?Xk():Rk()}function Rk(){$o()||Xe(!1);let t=E.useContext(sc),{basename:e,future:n,navigator:s}=E.useContext(Bs),{matches:r}=E.useContext(vr),{pathname:i}=$s(),o=JSON.stringify(zy(r,n.v7_relativeSplatPath)),a=E.useRef(!1);return By(()=>{a.current=!0}),E.useCallback(function(u,d){if(d===void 0&&(d={}),!a.current)return;if(typeof u=="number"){s.go(u);return}let f=Iy(u,JSON.parse(o),i,d.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Ps([e,f.pathname])),(d.replace?s.replace:s.push)(f,d.state,d)},[e,s,o,i,t])}function ic(t,e){let{relative:n}=e===void 0?{}:e,{future:s}=E.useContext(Bs),{matches:r}=E.useContext(vr),{pathname:i}=$s(),o=JSON.stringify(zy(r,s.v7_relativeSplatPath));return E.useMemo(()=>Iy(t,JSON.parse(o),i,n==="path"),[t,o,i,n])}function Lk(t,e){return Bk(t,e)}function Bk(t,e,n,s){$o()||Xe(!1);let{navigator:r}=E.useContext(Bs),{matches:i}=E.useContext(vr),o=i[i.length-1],a=o?o.params:{};o&&o.pathname;let c=o?o.pathnameBase:"/";o&&o.route;let u=$s(),d;if(e){var f;let v=typeof e=="string"?fi(e):e;c==="/"||(f=v.pathname)!=null&&f.startsWith(c)||Xe(!1),d=v}else d=u;let h=d.pathname||"/",m=h;if(c!=="/"){let v=c.replace(/^\//,"").split("/");m="/"+h.replace(/^\//,"").split("/").slice(v.length).join("/")}let g=pk(t,{pathname:m}),x=Hk(g&&g.map(v=>Object.assign({},v,{params:Object.assign({},a,v.params),pathname:Ps([c,r.encodeLocation?r.encodeLocation(v.pathname).pathname:v.pathname]),pathnameBase:v.pathnameBase==="/"?c:Ps([c,r.encodeLocation?r.encodeLocation(v.pathnameBase).pathname:v.pathnameBase])})),i,n,s);return e&&x?E.createElement(rc.Provider,{value:{location:jo({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:xs.Pop}},x):x}function $k(){let t=qk(),e=zk(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return E.createElement(E.Fragment,null,E.createElement("h2",null,"Unexpected Application Error!"),E.createElement("h3",{style:{fontStyle:"italic"}},e),n?E.createElement("pre",{style:r},n):null,null)}const Uk=E.createElement($k,null);class Wk extends E.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?E.createElement(vr.Provider,{value:this.props.routeContext},E.createElement(Ly.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Vk(t){let{routeContext:e,match:n,children:s}=t,r=E.useContext(sc);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),E.createElement(vr.Provider,{value:e},s)}function Hk(t,e,n,s){var r;if(e===void 0&&(e=[]),n===void 0&&(n=null),s===void 0&&(s=null),t==null){var i;if(!n)return null;if(n.errors)t=n.matches;else if((i=s)!=null&&i.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,a=(r=n)==null?void 0:r.errors;if(a!=null){let d=o.findIndex(f=>f.route.id&&(a==null?void 0:a[f.route.id])!==void 0);d>=0||Xe(!1),o=o.slice(0,Math.min(o.length,d+1))}let c=!1,u=-1;if(n&&s&&s.v7_partialHydration)for(let d=0;d<o.length;d++){let f=o[d];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(u=d),f.route.id){let{loaderData:h,errors:m}=n,g=f.route.loader&&h[f.route.id]===void 0&&(!m||m[f.route.id]===void 0);if(f.route.lazy||g){c=!0,u>=0?o=o.slice(0,u+1):o=[o[0]];break}}}return o.reduceRight((d,f,h)=>{let m,g=!1,x=null,v=null;n&&(m=a&&f.route.id?a[f.route.id]:void 0,x=f.route.errorElement||Uk,c&&(u<0&&h===0?(Qk("route-fallback"),g=!0,v=null):u===h&&(g=!0,v=f.route.hydrateFallbackElement||null)));let b=e.concat(o.slice(0,h+1)),p=()=>{let y;return m?y=x:g?y=v:f.route.Component?y=E.createElement(f.route.Component,null):f.route.element?y=f.route.element:y=d,E.createElement(Vk,{match:f,routeContext:{outlet:d,matches:b,isDataRoute:n!=null},children:y})};return n&&(f.route.ErrorBoundary||f.route.errorElement||h===0)?E.createElement(Wk,{location:n.location,revalidation:n.revalidation,component:x,error:m,children:p(),routeContext:{outlet:null,matches:b,isDataRoute:!0}}):p()},null)}var $y=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}($y||{}),Uy=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(Uy||{});function Yk(t){let e=E.useContext(sc);return e||Xe(!1),e}function Kk(t){let e=E.useContext(Ry);return e||Xe(!1),e}function Gk(t){let e=E.useContext(vr);return e||Xe(!1),e}function Wy(t){let e=Gk(),n=e.matches[e.matches.length-1];return n.route.id||Xe(!1),n.route.id}function qk(){var t;let e=E.useContext(Ly),n=Kk(),s=Wy();return e!==void 0?e:(t=n.errors)==null?void 0:t[s]}function Xk(){let{router:t}=Yk($y.UseNavigateStable),e=Wy(Uy.UseNavigateStable),n=E.useRef(!1);return By(()=>{n.current=!0}),E.useCallback(function(r,i){i===void 0&&(i={}),n.current&&(typeof r=="number"?t.navigate(r):t.navigate(r,jo({fromRouteId:e},i)))},[t,e])}const qp={};function Qk(t,e,n){qp[t]||(qp[t]=!0)}function Zk(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function Ze(t){Xe(!1)}function Jk(t){let{basename:e="/",children:n=null,location:s,navigationType:r=xs.Pop,navigator:i,static:o=!1,future:a}=t;$o()&&Xe(!1);let c=e.replace(/^\/*/,"/"),u=E.useMemo(()=>({basename:c,navigator:i,static:o,future:jo({v7_relativeSplatPath:!1},a)}),[c,a,i,o]);typeof s=="string"&&(s=fi(s));let{pathname:d="/",search:f="",hash:h="",state:m=null,key:g="default"}=s,x=E.useMemo(()=>{let v=oi(d,c);return v==null?null:{location:{pathname:v,search:f,hash:h,state:m,key:g},navigationType:r}},[c,d,f,h,m,g,r]);return x==null?null:E.createElement(Bs.Provider,{value:u},E.createElement(rc.Provider,{children:n,value:x}))}function ej(t){let{children:e,location:n}=t;return Lk(hd(e),n)}new Promise(()=>{});function hd(t,e){e===void 0&&(e=[]);let n=[];return E.Children.forEach(t,(s,r)=>{if(!E.isValidElement(s))return;let i=[...e,r];if(s.type===E.Fragment){n.push.apply(n,hd(s.props.children,i));return}s.type!==Ze&&Xe(!1),!s.props.index||!s.props.children||Xe(!1);let o={id:s.props.id||i.join("-"),caseSensitive:s.props.caseSensitive,element:s.props.element,Component:s.props.Component,index:s.props.index,path:s.props.path,loader:s.props.loader,action:s.props.action,errorElement:s.props.errorElement,ErrorBoundary:s.props.ErrorBoundary,hasErrorBoundary:s.props.ErrorBoundary!=null||s.props.errorElement!=null,shouldRevalidate:s.props.shouldRevalidate,handle:s.props.handle,lazy:s.props.lazy};s.props.children&&(o.children=hd(s.props.children,i)),n.push(o)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function jl(){return jl=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},jl.apply(this,arguments)}function Vy(t,e){if(t==null)return{};var n={},s=Object.keys(t),r,i;for(i=0;i<s.length;i++)r=s[i],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function tj(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function nj(t,e){return t.button===0&&(!e||e==="_self")&&!tj(t)}function pd(t){return t===void 0&&(t=""),new URLSearchParams(typeof t=="string"||Array.isArray(t)||t instanceof URLSearchParams?t:Object.keys(t).reduce((e,n)=>{let s=t[n];return e.concat(Array.isArray(s)?s.map(r=>[n,r]):[[n,s]])},[]))}function sj(t,e){let n=pd(t);return e&&e.forEach((s,r)=>{n.has(r)||e.getAll(r).forEach(i=>{n.append(r,i)})}),n}const rj=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],ij=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],oj="6";try{window.__reactRouterVersion=oj}catch{}const aj=E.createContext({isTransitioning:!1}),lj="startTransition",Xp=Jv[lj];function cj(t){let{basename:e,children:n,future:s,window:r}=t,i=E.useRef();i.current==null&&(i.current=dk({window:r,v5Compat:!0}));let o=i.current,[a,c]=E.useState({action:o.action,location:o.location}),{v7_startTransition:u}=s||{},d=E.useCallback(f=>{u&&Xp?Xp(()=>c(f)):c(f)},[c,u]);return E.useLayoutEffect(()=>o.listen(d),[o,d]),E.useEffect(()=>Zk(s),[s]),E.createElement(Jk,{basename:e,children:n,location:a.location,navigationType:a.action,navigator:o,future:s})}const uj=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",dj=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,fj=E.forwardRef(function(e,n){let{onClick:s,relative:r,reloadDocument:i,replace:o,state:a,target:c,to:u,preventScrollReset:d,viewTransition:f}=e,h=Vy(e,rj),{basename:m}=E.useContext(Bs),g,x=!1;if(typeof u=="string"&&dj.test(u)&&(g=u,uj))try{let y=new URL(window.location.href),_=u.startsWith("//")?new URL(y.protocol+u):new URL(u),j=oi(_.pathname,m);_.origin===y.origin&&j!=null?u=j+_.search+_.hash:x=!0}catch{}let v=Fk(u,{relative:r}),b=mj(u,{replace:o,state:a,target:c,preventScrollReset:d,relative:r,viewTransition:f});function p(y){s&&s(y),y.defaultPrevented||b(y)}return E.createElement("a",jl({},h,{href:g||v,onClick:x||i?s:p,ref:n,target:c}))}),hj=E.forwardRef(function(e,n){let{"aria-current":s="page",caseSensitive:r=!1,className:i="",end:o=!1,style:a,to:c,viewTransition:u,children:d}=e,f=Vy(e,ij),h=ic(c,{relative:f.relative}),m=$s(),g=E.useContext(Ry),{navigator:x,basename:v}=E.useContext(Bs),b=g!=null&&gj(h)&&u===!0,p=x.encodeLocation?x.encodeLocation(h).pathname:h.pathname,y=m.pathname,_=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;r||(y=y.toLowerCase(),_=_?_.toLowerCase():null,p=p.toLowerCase()),_&&v&&(_=oi(_,v)||_);const j=p!=="/"&&p.endsWith("/")?p.length-1:p.length;let N=y===p||!o&&y.startsWith(p)&&y.charAt(j)==="/",C=_!=null&&(_===p||!o&&_.startsWith(p)&&_.charAt(p.length)==="/"),w={isActive:N,isPending:C,isTransitioning:b},k=N?s:void 0,S;typeof i=="function"?S=i(w):S=[i,N?"active":null,C?"pending":null,b?"transitioning":null].filter(Boolean).join(" ");let P=typeof a=="function"?a(w):a;return E.createElement(fj,jl({},f,{"aria-current":k,className:S,ref:n,style:P,to:c,viewTransition:u}),typeof d=="function"?d(w):d)});var md;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(md||(md={}));var Qp;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(Qp||(Qp={}));function pj(t){let e=E.useContext(sc);return e||Xe(!1),e}function mj(t,e){let{target:n,replace:s,state:r,preventScrollReset:i,relative:o,viewTransition:a}=e===void 0?{}:e,c=Ke(),u=$s(),d=ic(t,{relative:o});return E.useCallback(f=>{if(nj(f,n)){f.preventDefault();let h=s!==void 0?s:kl(u)===kl(d);c(t,{replace:h,state:r,preventScrollReset:i,relative:o,viewTransition:a})}},[u,c,d,s,r,n,t,i,o,a])}function Hf(t){let e=E.useRef(pd(t)),n=E.useRef(!1),s=$s(),r=E.useMemo(()=>sj(s.search,n.current?null:e.current),[s.search]),i=Ke(),o=E.useCallback((a,c)=>{const u=pd(typeof a=="function"?a(r):a);n.current=!0,i("?"+u,c)},[i,r]);return[r,o]}function gj(t,e){e===void 0&&(e={});let n=E.useContext(aj);n==null&&Xe(!1);let{basename:s}=pj(md.useViewTransitionState),r=ic(t,{relative:e.relative});if(!n.isTransitioning)return!1;let i=oi(n.currentLocation.pathname,s)||n.currentLocation.pathname,o=oi(n.nextLocation.pathname,s)||n.nextLocation.pathname;return fd(r.pathname,o)!=null||fd(r.pathname,i)!=null}const xj="Left",yj="Right",vj="Up",bj="Down",Br={delta:10,preventScrollOnSwipe:!1,rotationAngle:0,trackMouse:!1,trackTouch:!0,swipeDuration:1/0,touchEventOptions:{passive:!0}},gd={first:!0,initial:[0,0],start:0,swiping:!1,xy:[0,0]},Zp="mousemove",Jp="mouseup",wj="touchend",kj="touchmove",jj="touchstart";function Sj(t,e,n,s){return t>e?n>0?yj:xj:s>0?bj:vj}function em(t,e){if(e===0)return t;const n=Math.PI/180*e,s=t[0]*Math.cos(n)+t[1]*Math.sin(n),r=t[1]*Math.cos(n)-t[0]*Math.sin(n);return[s,r]}function _j(t,e){const n=d=>{const f="touches"in d;f&&d.touches.length>1||t((h,m)=>{m.trackMouse&&!f&&(document.addEventListener(Zp,s),document.addEventListener(Jp,o));const{clientX:g,clientY:x}=f?d.touches[0]:d,v=em([g,x],m.rotationAngle);return m.onTouchStartOrOnMouseDown&&m.onTouchStartOrOnMouseDown({event:d}),Object.assign(Object.assign(Object.assign({},h),gd),{initial:v.slice(),xy:v,start:d.timeStamp||0})})},s=d=>{t((f,h)=>{const m="touches"in d;if(m&&d.touches.length>1)return f;if(d.timeStamp-f.start>h.swipeDuration)return f.swiping?Object.assign(Object.assign({},f),{swiping:!1}):f;const{clientX:g,clientY:x}=m?d.touches[0]:d,[v,b]=em([g,x],h.rotationAngle),p=v-f.xy[0],y=b-f.xy[1],_=Math.abs(p),j=Math.abs(y),N=(d.timeStamp||0)-f.start,C=Math.sqrt(_*_+j*j)/(N||1),w=[p/(N||1),y/(N||1)],k=Sj(_,j,p,y),S=typeof h.delta=="number"?h.delta:h.delta[k.toLowerCase()]||Br.delta;if(_<S&&j<S&&!f.swiping)return f;const P={absX:_,absY:j,deltaX:p,deltaY:y,dir:k,event:d,first:f.first,initial:f.initial,velocity:C,vxvy:w};P.first&&h.onSwipeStart&&h.onSwipeStart(P),h.onSwiping&&h.onSwiping(P);let O=!1;return(h.onSwiping||h.onSwiped||h[`onSwiped${k}`])&&(O=!0),O&&h.preventScrollOnSwipe&&h.trackTouch&&d.cancelable&&d.preventDefault(),Object.assign(Object.assign({},f),{first:!1,eventData:P,swiping:!0})})},r=d=>{t((f,h)=>{let m;if(f.swiping&&f.eventData){if(d.timeStamp-f.start<h.swipeDuration){m=Object.assign(Object.assign({},f.eventData),{event:d}),h.onSwiped&&h.onSwiped(m);const g=h[`onSwiped${m.dir}`];g&&g(m)}}else h.onTap&&h.onTap({event:d});return h.onTouchEndOrOnMouseUp&&h.onTouchEndOrOnMouseUp({event:d}),Object.assign(Object.assign(Object.assign({},f),gd),{eventData:m})})},i=()=>{document.removeEventListener(Zp,s),document.removeEventListener(Jp,o)},o=d=>{i(),r(d)},a=(d,f)=>{let h=()=>{};if(d&&d.addEventListener){const m=Object.assign(Object.assign({},Br.touchEventOptions),f.touchEventOptions),g=[[jj,n,m],[kj,s,Object.assign(Object.assign({},m),f.preventScrollOnSwipe?{passive:!1}:{})],[wj,r,m]];g.forEach(([x,v,b])=>d.addEventListener(x,v,b)),h=()=>g.forEach(([x,v])=>d.removeEventListener(x,v))}return h},u={ref:d=>{d!==null&&t((f,h)=>{if(f.el===d)return f;const m={};return f.el&&f.el!==d&&f.cleanUpTouch&&(f.cleanUpTouch(),m.cleanUpTouch=void 0),h.trackTouch&&d&&(m.cleanUpTouch=a(d,h)),Object.assign(Object.assign(Object.assign({},f),{el:d}),m)})}};return e.trackMouse&&(u.onMouseDown=n),[u,a]}function Nj(t,e,n,s){return!e.trackTouch||!t.el?(t.cleanUpTouch&&t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:void 0})):t.cleanUpTouch?e.preventScrollOnSwipe!==n.preventScrollOnSwipe||e.touchEventOptions.passive!==n.touchEventOptions.passive?(t.cleanUpTouch(),Object.assign(Object.assign({},t),{cleanUpTouch:s(t.el,e)})):t:Object.assign(Object.assign({},t),{cleanUpTouch:s(t.el,e)})}function rs(t){const{trackMouse:e}=t,n=E.useRef(Object.assign({},gd)),s=E.useRef(Object.assign({},Br)),r=E.useRef(Object.assign({},s.current));r.current=Object.assign({},s.current),s.current=Object.assign(Object.assign({},Br),t);let i;for(i in Br)s.current[i]===void 0&&(s.current[i]=Br[i]);const[o,a]=E.useMemo(()=>_j(c=>n.current=c(n.current,s.current),{trackMouse:e}),[e]);return n.current=Nj(n.current,s.current,r.current,a),o}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Cj={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ej=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),le=(t,e)=>{const n=E.forwardRef(({color:s="currentColor",size:r=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:a="",children:c,...u},d)=>E.createElement("svg",{ref:d,...Cj,width:r,height:r,stroke:s,strokeWidth:o?Number(i)*24/Number(r):i,className:["lucide",`lucide-${Ej(t)}`,a].join(" "),...u},[...e.map(([f,h])=>E.createElement(f,h)),...Array.isArray(c)?c:[c]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tm=le("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us=le("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nm=le("ArrowRightLeft",[["path",{d:"m16 3 4 4-4 4",key:"1x1c3m"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"m8 21-4-4 4-4",key:"h9nckh"}],["path",{d:"M4 17h16",key:"g4d7ey"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=le("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mj=le("BarChart2",[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=le("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sm=le("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pj=le("Book",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20",key:"t4utmx"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rm=le("Briefcase",[["rect",{width:"20",height:"14",x:"2",y:"7",rx:"2",ry:"2",key:"eto64e"}],["path",{d:"M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"zwj3tp"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const im=le("Bus",[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const So=le("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dj=le("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aj=le("CheckSquare",[["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}],["path",{d:"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",key:"1jnkn4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _o=le("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dt=le("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fn=le("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=le("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hy=le("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tr=le("CreditCard",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oj=le("Delete",[["path",{d:"M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z",key:"1oy587"}],["line",{x1:"18",x2:"12",y1:"9",y2:"15",key:"1olkx5"}],["line",{x1:"12",x2:"18",y1:"9",y2:"15",key:"1n50pc"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tj=le("DownloadCloud",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M12 12v9",key:"192myk"}],["path",{d:"m8 17 4 4 4-4",key:"1ul180"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zj=le("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ij=le("EyeOff",[["path",{d:"M9.88 9.88a3 3 0 1 0 4.24 4.24",key:"1jxqfv"}],["path",{d:"M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",key:"9wicm4"}],["path",{d:"M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",key:"1jreej"}],["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fj=le("Eye",[["path",{d:"M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z",key:"rwhkz3"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rj=le("FileSpreadsheet",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M14 17h2",key:"10kma7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yy=le("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sl=le("FolderKanban",[["path",{d:"M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z",key:"1fr9dc"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M12 10v2",key:"hh53o1"}],["path",{d:"M16 10v6",key:"1d6xys"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const om=le("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=le("Gift",[["rect",{x:"3",y:"8",width:"18",height:"4",rx:"1",key:"bkv52"}],["path",{d:"M12 8v13",key:"1c76mn"}],["path",{d:"M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7",key:"6wjy6b"}],["path",{d:"M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5",key:"1ihvrl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const am=le("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lj=le("Grid3x3",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lm=le("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bj=le("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $j=le("Landmark",[["line",{x1:"3",x2:"21",y1:"22",y2:"22",key:"j8o0r"}],["line",{x1:"6",x2:"6",y1:"18",y2:"11",key:"10tf0k"}],["line",{x1:"10",x2:"10",y1:"18",y2:"11",key:"54lgf6"}],["line",{x1:"14",x2:"14",y1:"18",y2:"11",key:"380y"}],["line",{x1:"18",x2:"18",y1:"18",y2:"11",key:"1kevvc"}],["polygon",{points:"12 2 20 7 4 7",key:"jkujk7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ky=le("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uj=le("List",[["line",{x1:"8",x2:"21",y1:"6",y2:"6",key:"7ey8pc"}],["line",{x1:"8",x2:"21",y1:"12",y2:"12",key:"rjfblc"}],["line",{x1:"8",x2:"21",y1:"18",y2:"18",key:"c3b1m8"}],["line",{x1:"3",x2:"3.01",y1:"6",y2:"6",key:"1g7gq3"}],["line",{x1:"3",x2:"3.01",y1:"12",y2:"12",key:"1pjlvk"}],["line",{x1:"3",x2:"3.01",y1:"18",y2:"18",key:"28t2mc"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xr=le("Loader2",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wj=le("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gy=le("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qy=le("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vj=le("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hj=le("MinusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yj=le("MoreHorizontal",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yf=le("PenLine",[["path",{d:"M12 20h9",key:"t2du7b"}],["path",{d:"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z",key:"ymcmye"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cm=le("PieChart",[["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}],["path",{d:"M22 12A10 10 0 0 0 12 2v10z",key:"1rfc4y"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kj=le("PiggyBank",[["path",{d:"M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z",key:"uf6l00"}],["path",{d:"M2 9v1c0 1.1.9 2 2 2h1",key:"nm575m"}],["path",{d:"M16 11h0",key:"k2aug8"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const um=le("Pill",[["path",{d:"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",key:"wa1lgi"}],["path",{d:"m8.5 8.5 7 7",key:"rvfmvr"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gj=le("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=le("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yd=le("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qj=le("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kf=le("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=le("ShoppingBag",[["path",{d:"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",key:"hou9p0"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dm=le("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vd=le("Store",[["path",{d:"m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7",key:"ztvudi"}],["path",{d:"M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8",key:"1b2hhj"}],["path",{d:"M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4",key:"2ebpfo"}],["path",{d:"M2 7h20",key:"1fcdvo"}],["path",{d:"M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7",key:"jon5kx"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xj=le("Tag",[["path",{d:"M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z",key:"14b2ls"}],["path",{d:"M7 7h.01",key:"7u93v4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bd=le("Target",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const In=le("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wd=le("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qj=le("UploadCloud",[["path",{d:"M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",key:"1pljnt"}],["path",{d:"M12 12v9",key:"192myk"}],["path",{d:"m16 16-4-4-4 4",key:"119tzi"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zj=le("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ts=le("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=le("Utensils",[["path",{d:"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2",key:"cjf0a3"}],["path",{d:"M7 2v20",key:"1473qp"}],["path",{d:"M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7",key:"1ogz0v"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kd=le("Wallet",[["path",{d:"M21 12V7H5a2 2 0 0 1 0-4h14v4",key:"195gfw"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h16v-5",key:"195n9w"}],["path",{d:"M18 12a2 2 0 0 0 0 4h4v-4Z",key:"vllfpd"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=le("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Uo(t){return t+.5|0}const ys=(t,e,n)=>Math.max(Math.min(t,n),e);function Li(t){return ys(Uo(t*2.55),0,255)}function Ds(t){return ys(Uo(t*255),0,255)}function Wn(t){return ys(Uo(t/2.55)/100,0,1)}function fm(t){return ys(Uo(t*100),0,100)}const sn={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},jd=[..."0123456789ABCDEF"],Jj=t=>jd[t&15],eS=t=>jd[(t&240)>>4]+jd[t&15],ga=t=>(t&240)>>4===(t&15),tS=t=>ga(t.r)&&ga(t.g)&&ga(t.b)&&ga(t.a);function nS(t){var e=t.length,n;return t[0]==="#"&&(e===4||e===5?n={r:255&sn[t[1]]*17,g:255&sn[t[2]]*17,b:255&sn[t[3]]*17,a:e===5?sn[t[4]]*17:255}:(e===7||e===9)&&(n={r:sn[t[1]]<<4|sn[t[2]],g:sn[t[3]]<<4|sn[t[4]],b:sn[t[5]]<<4|sn[t[6]],a:e===9?sn[t[7]]<<4|sn[t[8]]:255})),n}const sS=(t,e)=>t<255?e(t):"";function rS(t){var e=tS(t)?Jj:eS;return t?"#"+e(t.r)+e(t.g)+e(t.b)+sS(t.a,e):void 0}const iS=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Xy(t,e,n){const s=e*Math.min(n,1-n),r=(i,o=(i+t/30)%12)=>n-s*Math.max(Math.min(o-3,9-o,1),-1);return[r(0),r(8),r(4)]}function oS(t,e,n){const s=(r,i=(r+t/60)%6)=>n-n*e*Math.max(Math.min(i,4-i,1),0);return[s(5),s(3),s(1)]}function aS(t,e,n){const s=Xy(t,1,.5);let r;for(e+n>1&&(r=1/(e+n),e*=r,n*=r),r=0;r<3;r++)s[r]*=1-e-n,s[r]+=e;return s}function lS(t,e,n,s,r){return t===r?(e-n)/s+(e<n?6:0):e===r?(n-t)/s+2:(t-e)/s+4}function Gf(t){const n=t.r/255,s=t.g/255,r=t.b/255,i=Math.max(n,s,r),o=Math.min(n,s,r),a=(i+o)/2;let c,u,d;return i!==o&&(d=i-o,u=a>.5?d/(2-i-o):d/(i+o),c=lS(n,s,r,d,i),c=c*60+.5),[c|0,u||0,a]}function qf(t,e,n,s){return(Array.isArray(e)?t(e[0],e[1],e[2]):t(e,n,s)).map(Ds)}function Xf(t,e,n){return qf(Xy,t,e,n)}function cS(t,e,n){return qf(aS,t,e,n)}function uS(t,e,n){return qf(oS,t,e,n)}function Qy(t){return(t%360+360)%360}function dS(t){const e=iS.exec(t);let n=255,s;if(!e)return;e[5]!==s&&(n=e[6]?Li(+e[5]):Ds(+e[5]));const r=Qy(+e[2]),i=+e[3]/100,o=+e[4]/100;return e[1]==="hwb"?s=cS(r,i,o):e[1]==="hsv"?s=uS(r,i,o):s=Xf(r,i,o),{r:s[0],g:s[1],b:s[2],a:n}}function fS(t,e){var n=Gf(t);n[0]=Qy(n[0]+e),n=Xf(n),t.r=n[0],t.g=n[1],t.b=n[2]}function hS(t){if(!t)return;const e=Gf(t),n=e[0],s=fm(e[1]),r=fm(e[2]);return t.a<255?`hsla(${n}, ${s}%, ${r}%, ${Wn(t.a)})`:`hsl(${n}, ${s}%, ${r}%)`}const hm={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},pm={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function pS(){const t={},e=Object.keys(pm),n=Object.keys(hm);let s,r,i,o,a;for(s=0;s<e.length;s++){for(o=a=e[s],r=0;r<n.length;r++)i=n[r],a=a.replace(i,hm[i]);i=parseInt(pm[o],16),t[a]=[i>>16&255,i>>8&255,i&255]}return t}let xa;function mS(t){xa||(xa=pS(),xa.transparent=[0,0,0,0]);const e=xa[t.toLowerCase()];return e&&{r:e[0],g:e[1],b:e[2],a:e.length===4?e[3]:255}}const gS=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function xS(t){const e=gS.exec(t);let n=255,s,r,i;if(e){if(e[7]!==s){const o=+e[7];n=e[8]?Li(o):ys(o*255,0,255)}return s=+e[1],r=+e[3],i=+e[5],s=255&(e[2]?Li(s):ys(s,0,255)),r=255&(e[4]?Li(r):ys(r,0,255)),i=255&(e[6]?Li(i):ys(i,0,255)),{r:s,g:r,b:i,a:n}}}function yS(t){return t&&(t.a<255?`rgba(${t.r}, ${t.g}, ${t.b}, ${Wn(t.a)})`:`rgb(${t.r}, ${t.g}, ${t.b})`)}const Yc=t=>t<=.0031308?t*12.92:Math.pow(t,1/2.4)*1.055-.055,_r=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4);function vS(t,e,n){const s=_r(Wn(t.r)),r=_r(Wn(t.g)),i=_r(Wn(t.b));return{r:Ds(Yc(s+n*(_r(Wn(e.r))-s))),g:Ds(Yc(r+n*(_r(Wn(e.g))-r))),b:Ds(Yc(i+n*(_r(Wn(e.b))-i))),a:t.a+n*(e.a-t.a)}}function ya(t,e,n){if(t){let s=Gf(t);s[e]=Math.max(0,Math.min(s[e]+s[e]*n,e===0?360:1)),s=Xf(s),t.r=s[0],t.g=s[1],t.b=s[2]}}function Zy(t,e){return t&&Object.assign(e||{},t)}function mm(t){var e={r:0,g:0,b:0,a:255};return Array.isArray(t)?t.length>=3&&(e={r:t[0],g:t[1],b:t[2],a:255},t.length>3&&(e.a=Ds(t[3]))):(e=Zy(t,{r:0,g:0,b:0,a:1}),e.a=Ds(e.a)),e}function bS(t){return t.charAt(0)==="r"?xS(t):dS(t)}class No{constructor(e){if(e instanceof No)return e;const n=typeof e;let s;n==="object"?s=mm(e):n==="string"&&(s=nS(e)||mS(e)||bS(e)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var e=Zy(this._rgb);return e&&(e.a=Wn(e.a)),e}set rgb(e){this._rgb=mm(e)}rgbString(){return this._valid?yS(this._rgb):void 0}hexString(){return this._valid?rS(this._rgb):void 0}hslString(){return this._valid?hS(this._rgb):void 0}mix(e,n){if(e){const s=this.rgb,r=e.rgb;let i;const o=n===i?.5:n,a=2*o-1,c=s.a-r.a,u=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;i=1-u,s.r=255&u*s.r+i*r.r+.5,s.g=255&u*s.g+i*r.g+.5,s.b=255&u*s.b+i*r.b+.5,s.a=o*s.a+(1-o)*r.a,this.rgb=s}return this}interpolate(e,n){return e&&(this._rgb=vS(this._rgb,e._rgb,n)),this}clone(){return new No(this.rgb)}alpha(e){return this._rgb.a=Ds(e),this}clearer(e){const n=this._rgb;return n.a*=1-e,this}greyscale(){const e=this._rgb,n=Uo(e.r*.3+e.g*.59+e.b*.11);return e.r=e.g=e.b=n,this}opaquer(e){const n=this._rgb;return n.a*=1+e,this}negate(){const e=this._rgb;return e.r=255-e.r,e.g=255-e.g,e.b=255-e.b,this}lighten(e){return ya(this._rgb,2,e),this}darken(e){return ya(this._rgb,2,-e),this}saturate(e){return ya(this._rgb,1,e),this}desaturate(e){return ya(this._rgb,1,-e),this}rotate(e){return fS(this._rgb,e),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Fn(){}const wS=(()=>{let t=0;return()=>t++})();function _e(t){return t==null}function st(t){if(Array.isArray&&Array.isArray(t))return!0;const e=Object.prototype.toString.call(t);return e.slice(0,7)==="[object"&&e.slice(-6)==="Array]"}function ve(t){return t!==null&&Object.prototype.toString.call(t)==="[object Object]"}function Et(t){return(typeof t=="number"||t instanceof Number)&&isFinite(+t)}function Nn(t,e){return Et(t)?t:e}function xe(t,e){return typeof t>"u"?e:t}const kS=(t,e)=>typeof t=="string"&&t.endsWith("%")?parseFloat(t)/100:+t/e,Jy=(t,e)=>typeof t=="string"&&t.endsWith("%")?parseFloat(t)/100*e:+t;function ze(t,e,n){if(t&&typeof t.call=="function")return t.apply(n,e)}function Ne(t,e,n,s){let r,i,o;if(st(t))for(i=t.length,r=0;r<i;r++)e.call(n,t[r],r);else if(ve(t))for(o=Object.keys(t),i=o.length,r=0;r<i;r++)e.call(n,t[o[r]],o[r])}function _l(t,e){let n,s,r,i;if(!t||!e||t.length!==e.length)return!1;for(n=0,s=t.length;n<s;++n)if(r=t[n],i=e[n],r.datasetIndex!==i.datasetIndex||r.index!==i.index)return!1;return!0}function Nl(t){if(st(t))return t.map(Nl);if(ve(t)){const e=Object.create(null),n=Object.keys(t),s=n.length;let r=0;for(;r<s;++r)e[n[r]]=Nl(t[n[r]]);return e}return t}function e1(t){return["__proto__","prototype","constructor"].indexOf(t)===-1}function jS(t,e,n,s){if(!e1(t))return;const r=e[t],i=n[t];ve(r)&&ve(i)?Co(r,i,s):e[t]=Nl(i)}function Co(t,e,n){const s=st(e)?e:[e],r=s.length;if(!ve(t))return t;n=n||{};const i=n.merger||jS;let o;for(let a=0;a<r;++a){if(o=s[a],!ve(o))continue;const c=Object.keys(o);for(let u=0,d=c.length;u<d;++u)i(c[u],t,o,n)}return t}function Ji(t,e){return Co(t,e,{merger:SS})}function SS(t,e,n){if(!e1(t))return;const s=e[t],r=n[t];ve(s)&&ve(r)?Ji(s,r):Object.prototype.hasOwnProperty.call(e,t)||(e[t]=Nl(r))}const gm={"":t=>t,x:t=>t.x,y:t=>t.y};function _S(t){const e=t.split("."),n=[];let s="";for(const r of e)s+=r,s.endsWith("\\")?s=s.slice(0,-1)+".":(n.push(s),s="");return n}function NS(t){const e=_S(t);return n=>{for(const s of e){if(s==="")break;n=n&&n[s]}return n}}function pr(t,e){return(gm[e]||(gm[e]=NS(e)))(t)}function Qf(t){return t.charAt(0).toUpperCase()+t.slice(1)}const Eo=t=>typeof t<"u",Is=t=>typeof t=="function",xm=(t,e)=>{if(t.size!==e.size)return!1;for(const n of t)if(!e.has(n))return!1;return!0};function CS(t){return t.type==="mouseup"||t.type==="click"||t.type==="contextmenu"}const Ce=Math.PI,Ue=2*Ce,ES=Ue+Ce,Cl=Number.POSITIVE_INFINITY,MS=Ce/180,ct=Ce/2,Vs=Ce/4,ym=Ce*2/3,t1=Math.log10,zn=Math.sign;function eo(t,e,n){return Math.abs(t-e)<n}function vm(t){const e=Math.round(t);t=eo(t,e,t/1e3)?e:t;const n=Math.pow(10,Math.floor(t1(t))),s=t/n;return(s<=1?1:s<=2?2:s<=5?5:10)*n}function PS(t){const e=[],n=Math.sqrt(t);let s;for(s=1;s<n;s++)t%s===0&&(e.push(s),e.push(t/s));return n===(n|0)&&e.push(n),e.sort((r,i)=>r-i).pop(),e}function DS(t){return typeof t=="symbol"||typeof t=="object"&&t!==null&&!(Symbol.toPrimitive in t||"toString"in t||"valueOf"in t)}function Mo(t){return!DS(t)&&!isNaN(parseFloat(t))&&isFinite(t)}function AS(t,e){const n=Math.round(t);return n-e<=t&&n+e>=t}function OS(t,e,n){let s,r,i;for(s=0,r=t.length;s<r;s++)i=t[s][n],isNaN(i)||(e.min=Math.min(e.min,i),e.max=Math.max(e.max,i))}function Gn(t){return t*(Ce/180)}function TS(t){return t*(180/Ce)}function bm(t){if(!Et(t))return;let e=1,n=0;for(;Math.round(t*e)/e!==t;)e*=10,n++;return n}function n1(t,e){const n=e.x-t.x,s=e.y-t.y,r=Math.sqrt(n*n+s*s);let i=Math.atan2(s,n);return i<-.5*Ce&&(i+=Ue),{angle:i,distance:r}}function Sd(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))}function zS(t,e){return(t-e+ES)%Ue-Ce}function qt(t){return(t%Ue+Ue)%Ue}function Po(t,e,n,s){const r=qt(t),i=qt(e),o=qt(n),a=qt(i-r),c=qt(o-r),u=qt(r-i),d=qt(r-o);return r===i||r===o||s&&i===o||a>c&&u<d}function St(t,e,n){return Math.max(e,Math.min(n,t))}function IS(t){return St(t,-32768,32767)}function qn(t,e,n,s=1e-6){return t>=Math.min(e,n)-s&&t<=Math.max(e,n)+s}function Zf(t,e,n){n=n||(o=>t[o]<e);let s=t.length-1,r=0,i;for(;s-r>1;)i=r+s>>1,n(i)?r=i:s=i;return{lo:r,hi:s}}const nr=(t,e,n,s)=>Zf(t,n,s?r=>{const i=t[r][e];return i<n||i===n&&t[r+1][e]===n}:r=>t[r][e]<n),FS=(t,e,n)=>Zf(t,n,s=>t[s][e]>=n);function RS(t,e,n){let s=0,r=t.length;for(;s<r&&t[s]<e;)s++;for(;r>s&&t[r-1]>n;)r--;return s>0||r<t.length?t.slice(s,r):t}const s1=["push","pop","shift","splice","unshift"];function LS(t,e){if(t._chartjs){t._chartjs.listeners.push(e);return}Object.defineProperty(t,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[e]}}),s1.forEach(n=>{const s="_onData"+Qf(n),r=t[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!1,value(...i){const o=r.apply(this,i);return t._chartjs.listeners.forEach(a=>{typeof a[s]=="function"&&a[s](...i)}),o}})})}function wm(t,e){const n=t._chartjs;if(!n)return;const s=n.listeners,r=s.indexOf(e);r!==-1&&s.splice(r,1),!(s.length>0)&&(s1.forEach(i=>{delete t[i]}),delete t._chartjs)}function r1(t){const e=new Set(t);return e.size===t.length?t:Array.from(e)}const i1=function(){return typeof window>"u"?function(t){return t()}:window.requestAnimationFrame}();function o1(t,e){let n=[],s=!1;return function(...r){n=r,s||(s=!0,i1.call(window,()=>{s=!1,t.apply(e,n)}))}}function BS(t,e){let n;return function(...s){return e?(clearTimeout(n),n=setTimeout(t,e,s)):t.apply(this,s),e}}const Jf=t=>t==="start"?"left":t==="end"?"right":"center",kt=(t,e,n)=>t==="start"?e:t==="end"?n:(e+n)/2,$S=(t,e,n,s)=>t===(s?"left":"right")?n:t==="center"?(e+n)/2:e;function US(t,e,n){const s=e.length;let r=0,i=s;if(t._sorted){const{iScale:o,vScale:a,_parsed:c}=t,u=t.dataset&&t.dataset.options?t.dataset.options.spanGaps:null,d=o.axis,{min:f,max:h,minDefined:m,maxDefined:g}=o.getUserBounds();if(m){if(r=Math.min(nr(c,d,f).lo,n?s:nr(e,d,o.getPixelForValue(f)).lo),u){const x=c.slice(0,r+1).reverse().findIndex(v=>!_e(v[a.axis]));r-=Math.max(0,x)}r=St(r,0,s-1)}if(g){let x=Math.max(nr(c,o.axis,h,!0).hi+1,n?0:nr(e,d,o.getPixelForValue(h),!0).hi+1);if(u){const v=c.slice(x-1).findIndex(b=>!_e(b[a.axis]));x+=Math.max(0,v)}i=St(x,r,s)-r}else i=s-r}return{start:r,count:i}}function WS(t){const{xScale:e,yScale:n,_scaleRanges:s}=t,r={xmin:e.min,xmax:e.max,ymin:n.min,ymax:n.max};if(!s)return t._scaleRanges=r,!0;const i=s.xmin!==e.min||s.xmax!==e.max||s.ymin!==n.min||s.ymax!==n.max;return Object.assign(s,r),i}const va=t=>t===0||t===1,km=(t,e,n)=>-(Math.pow(2,10*(t-=1))*Math.sin((t-e)*Ue/n)),jm=(t,e,n)=>Math.pow(2,-10*t)*Math.sin((t-e)*Ue/n)+1,to={linear:t=>t,easeInQuad:t=>t*t,easeOutQuad:t=>-t*(t-2),easeInOutQuad:t=>(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1),easeInCubic:t=>t*t*t,easeOutCubic:t=>(t-=1)*t*t+1,easeInOutCubic:t=>(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2),easeInQuart:t=>t*t*t*t,easeOutQuart:t=>-((t-=1)*t*t*t-1),easeInOutQuart:t=>(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2),easeInQuint:t=>t*t*t*t*t,easeOutQuint:t=>(t-=1)*t*t*t*t+1,easeInOutQuint:t=>(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2),easeInSine:t=>-Math.cos(t*ct)+1,easeOutSine:t=>Math.sin(t*ct),easeInOutSine:t=>-.5*(Math.cos(Ce*t)-1),easeInExpo:t=>t===0?0:Math.pow(2,10*(t-1)),easeOutExpo:t=>t===1?1:-Math.pow(2,-10*t)+1,easeInOutExpo:t=>va(t)?t:t<.5?.5*Math.pow(2,10*(t*2-1)):.5*(-Math.pow(2,-10*(t*2-1))+2),easeInCirc:t=>t>=1?t:-(Math.sqrt(1-t*t)-1),easeOutCirc:t=>Math.sqrt(1-(t-=1)*t),easeInOutCirc:t=>(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1),easeInElastic:t=>va(t)?t:km(t,.075,.3),easeOutElastic:t=>va(t)?t:jm(t,.075,.3),easeInOutElastic(t){return va(t)?t:t<.5?.5*km(t*2,.1125,.45):.5+.5*jm(t*2-1,.1125,.45)},easeInBack(t){return t*t*((1.70158+1)*t-1.70158)},easeOutBack(t){return(t-=1)*t*((1.70158+1)*t+1.70158)+1},easeInOutBack(t){let e=1.70158;return(t/=.5)<1?.5*(t*t*(((e*=1.525)+1)*t-e)):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:t=>1-to.easeOutBounce(1-t),easeOutBounce(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInOutBounce:t=>t<.5?to.easeInBounce(t*2)*.5:to.easeOutBounce(t*2-1)*.5+.5};function eh(t){if(t&&typeof t=="object"){const e=t.toString();return e==="[object CanvasPattern]"||e==="[object CanvasGradient]"}return!1}function Sm(t){return eh(t)?t:new No(t)}function Kc(t){return eh(t)?t:new No(t).saturate(.5).darken(.1).hexString()}const VS=["x","y","borderWidth","radius","tension"],HS=["color","borderColor","backgroundColor"];function YS(t){t.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),t.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:e=>e!=="onProgress"&&e!=="onComplete"&&e!=="fn"}),t.set("animations",{colors:{type:"color",properties:HS},numbers:{type:"number",properties:VS}}),t.describe("animations",{_fallback:"animation"}),t.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:e=>e|0}}}})}function KS(t){t.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const _m=new Map;function GS(t,e){e=e||{};const n=t+JSON.stringify(e);let s=_m.get(n);return s||(s=new Intl.NumberFormat(t,e),_m.set(n,s)),s}function th(t,e,n){return GS(e,n).format(t)}const qS={values(t){return st(t)?t:""+t},numeric(t,e,n){if(t===0)return"0";const s=this.chart.options.locale;let r,i=t;if(n.length>1){const u=Math.max(Math.abs(n[0].value),Math.abs(n[n.length-1].value));(u<1e-4||u>1e15)&&(r="scientific"),i=XS(t,n)}const o=t1(Math.abs(i)),a=isNaN(o)?1:Math.max(Math.min(-1*Math.floor(o),20),0),c={notation:r,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(c,this.options.ticks.format),th(t,s,c)}};function XS(t,e){let n=e.length>3?e[2].value-e[1].value:e[1].value-e[0].value;return Math.abs(n)>=1&&t!==Math.floor(t)&&(n=t-Math.floor(t)),n}var a1={formatters:qS};function QS(t){t.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(e,n)=>n.lineWidth,tickColor:(e,n)=>n.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:a1.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),t.route("scale.ticks","color","","color"),t.route("scale.grid","color","","borderColor"),t.route("scale.border","color","","borderColor"),t.route("scale.title","color","","color"),t.describe("scale",{_fallback:!1,_scriptable:e=>!e.startsWith("before")&&!e.startsWith("after")&&e!=="callback"&&e!=="parser",_indexable:e=>e!=="borderDash"&&e!=="tickBorderDash"&&e!=="dash"}),t.describe("scales",{_fallback:"scale"}),t.describe("scale.ticks",{_scriptable:e=>e!=="backdropPadding"&&e!=="callback",_indexable:e=>e!=="backdropPadding"})}const mr=Object.create(null),_d=Object.create(null);function no(t,e){if(!e)return t;const n=e.split(".");for(let s=0,r=n.length;s<r;++s){const i=n[s];t=t[i]||(t[i]=Object.create(null))}return t}function Gc(t,e,n){return typeof e=="string"?Co(no(t,e),n):Co(no(t,""),e)}class ZS{constructor(e,n){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,r)=>Kc(r.backgroundColor),this.hoverBorderColor=(s,r)=>Kc(r.borderColor),this.hoverColor=(s,r)=>Kc(r.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(e),this.apply(n)}set(e,n){return Gc(this,e,n)}get(e){return no(this,e)}describe(e,n){return Gc(_d,e,n)}override(e,n){return Gc(mr,e,n)}route(e,n,s,r){const i=no(this,e),o=no(this,s),a="_"+n;Object.defineProperties(i,{[a]:{value:i[n],writable:!0},[n]:{enumerable:!0,get(){const c=this[a],u=o[r];return ve(c)?Object.assign({},u,c):xe(c,u)},set(c){this[a]=c}}})}apply(e){e.forEach(n=>n(this))}}var et=new ZS({_scriptable:t=>!t.startsWith("on"),_indexable:t=>t!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[YS,KS,QS]);function JS(t){return!t||_e(t.size)||_e(t.family)?null:(t.style?t.style+" ":"")+(t.weight?t.weight+" ":"")+t.size+"px "+t.family}function Nm(t,e,n,s,r){let i=e[r];return i||(i=e[r]=t.measureText(r).width,n.push(r)),i>s&&(s=i),s}function Hs(t,e,n){const s=t.currentDevicePixelRatio,r=n!==0?Math.max(n/2,.5):0;return Math.round((e-r)*s)/s+r}function Cm(t,e){!e&&!t||(e=e||t.getContext("2d"),e.save(),e.resetTransform(),e.clearRect(0,0,t.width,t.height),e.restore())}function Nd(t,e,n,s){l1(t,e,n,s,null)}function l1(t,e,n,s,r){let i,o,a,c,u,d,f,h;const m=e.pointStyle,g=e.rotation,x=e.radius;let v=(g||0)*MS;if(m&&typeof m=="object"&&(i=m.toString(),i==="[object HTMLImageElement]"||i==="[object HTMLCanvasElement]")){t.save(),t.translate(n,s),t.rotate(v),t.drawImage(m,-m.width/2,-m.height/2,m.width,m.height),t.restore();return}if(!(isNaN(x)||x<=0)){switch(t.beginPath(),m){default:r?t.ellipse(n,s,r/2,x,0,0,Ue):t.arc(n,s,x,0,Ue),t.closePath();break;case"triangle":d=r?r/2:x,t.moveTo(n+Math.sin(v)*d,s-Math.cos(v)*x),v+=ym,t.lineTo(n+Math.sin(v)*d,s-Math.cos(v)*x),v+=ym,t.lineTo(n+Math.sin(v)*d,s-Math.cos(v)*x),t.closePath();break;case"rectRounded":u=x*.516,c=x-u,o=Math.cos(v+Vs)*c,f=Math.cos(v+Vs)*(r?r/2-u:c),a=Math.sin(v+Vs)*c,h=Math.sin(v+Vs)*(r?r/2-u:c),t.arc(n-f,s-a,u,v-Ce,v-ct),t.arc(n+h,s-o,u,v-ct,v),t.arc(n+f,s+a,u,v,v+ct),t.arc(n-h,s+o,u,v+ct,v+Ce),t.closePath();break;case"rect":if(!g){c=Math.SQRT1_2*x,d=r?r/2:c,t.rect(n-d,s-c,2*d,2*c);break}v+=Vs;case"rectRot":f=Math.cos(v)*(r?r/2:x),o=Math.cos(v)*x,a=Math.sin(v)*x,h=Math.sin(v)*(r?r/2:x),t.moveTo(n-f,s-a),t.lineTo(n+h,s-o),t.lineTo(n+f,s+a),t.lineTo(n-h,s+o),t.closePath();break;case"crossRot":v+=Vs;case"cross":f=Math.cos(v)*(r?r/2:x),o=Math.cos(v)*x,a=Math.sin(v)*x,h=Math.sin(v)*(r?r/2:x),t.moveTo(n-f,s-a),t.lineTo(n+f,s+a),t.moveTo(n+h,s-o),t.lineTo(n-h,s+o);break;case"star":f=Math.cos(v)*(r?r/2:x),o=Math.cos(v)*x,a=Math.sin(v)*x,h=Math.sin(v)*(r?r/2:x),t.moveTo(n-f,s-a),t.lineTo(n+f,s+a),t.moveTo(n+h,s-o),t.lineTo(n-h,s+o),v+=Vs,f=Math.cos(v)*(r?r/2:x),o=Math.cos(v)*x,a=Math.sin(v)*x,h=Math.sin(v)*(r?r/2:x),t.moveTo(n-f,s-a),t.lineTo(n+f,s+a),t.moveTo(n+h,s-o),t.lineTo(n-h,s+o);break;case"line":o=r?r/2:Math.cos(v)*x,a=Math.sin(v)*x,t.moveTo(n-o,s-a),t.lineTo(n+o,s+a);break;case"dash":t.moveTo(n,s),t.lineTo(n+Math.cos(v)*(r?r/2:x),s+Math.sin(v)*x);break;case!1:t.closePath();break}t.fill(),e.borderWidth>0&&t.stroke()}}function Do(t,e,n){return n=n||.5,!e||t&&t.x>e.left-n&&t.x<e.right+n&&t.y>e.top-n&&t.y<e.bottom+n}function oc(t,e){t.save(),t.beginPath(),t.rect(e.left,e.top,e.right-e.left,e.bottom-e.top),t.clip()}function ac(t){t.restore()}function e_(t,e,n,s,r){if(!e)return t.lineTo(n.x,n.y);if(r==="middle"){const i=(e.x+n.x)/2;t.lineTo(i,e.y),t.lineTo(i,n.y)}else r==="after"!=!!s?t.lineTo(e.x,n.y):t.lineTo(n.x,e.y);t.lineTo(n.x,n.y)}function t_(t,e,n,s){if(!e)return t.lineTo(n.x,n.y);t.bezierCurveTo(s?e.cp1x:e.cp2x,s?e.cp1y:e.cp2y,s?n.cp2x:n.cp1x,s?n.cp2y:n.cp1y,n.x,n.y)}function n_(t,e){e.translation&&t.translate(e.translation[0],e.translation[1]),_e(e.rotation)||t.rotate(e.rotation),e.color&&(t.fillStyle=e.color),e.textAlign&&(t.textAlign=e.textAlign),e.textBaseline&&(t.textBaseline=e.textBaseline)}function s_(t,e,n,s,r){if(r.strikethrough||r.underline){const i=t.measureText(s),o=e-i.actualBoundingBoxLeft,a=e+i.actualBoundingBoxRight,c=n-i.actualBoundingBoxAscent,u=n+i.actualBoundingBoxDescent,d=r.strikethrough?(c+u)/2:u;t.strokeStyle=t.fillStyle,t.beginPath(),t.lineWidth=r.decorationWidth||2,t.moveTo(o,d),t.lineTo(a,d),t.stroke()}}function r_(t,e){const n=t.fillStyle;t.fillStyle=e.color,t.fillRect(e.left,e.top,e.width,e.height),t.fillStyle=n}function Ao(t,e,n,s,r,i={}){const o=st(e)?e:[e],a=i.strokeWidth>0&&i.strokeColor!=="";let c,u;for(t.save(),t.font=r.string,n_(t,i),c=0;c<o.length;++c)u=o[c],i.backdrop&&r_(t,i.backdrop),a&&(i.strokeColor&&(t.strokeStyle=i.strokeColor),_e(i.strokeWidth)||(t.lineWidth=i.strokeWidth),t.strokeText(u,n,s,i.maxWidth)),t.fillText(u,n,s,i.maxWidth),s_(t,n,s,u,i),s+=Number(r.lineHeight);t.restore()}function El(t,e){const{x:n,y:s,w:r,h:i,radius:o}=e;t.arc(n+o.topLeft,s+o.topLeft,o.topLeft,1.5*Ce,Ce,!0),t.lineTo(n,s+i-o.bottomLeft),t.arc(n+o.bottomLeft,s+i-o.bottomLeft,o.bottomLeft,Ce,ct,!0),t.lineTo(n+r-o.bottomRight,s+i),t.arc(n+r-o.bottomRight,s+i-o.bottomRight,o.bottomRight,ct,0,!0),t.lineTo(n+r,s+o.topRight),t.arc(n+r-o.topRight,s+o.topRight,o.topRight,0,-ct,!0),t.lineTo(n+o.topLeft,s)}const i_=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,o_=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function a_(t,e){const n=(""+t).match(i_);if(!n||n[1]==="normal")return e*1.2;switch(t=+n[2],n[3]){case"px":return t;case"%":t/=100;break}return e*t}const l_=t=>+t||0;function nh(t,e){const n={},s=ve(e),r=s?Object.keys(e):e,i=ve(t)?s?o=>xe(t[o],t[e[o]]):o=>t[o]:()=>t;for(const o of r)n[o]=l_(i(o));return n}function c1(t){return nh(t,{top:"y",right:"x",bottom:"y",left:"x"})}function Qr(t){return nh(t,["topLeft","topRight","bottomLeft","bottomRight"])}function mn(t){const e=c1(t);return e.width=e.left+e.right,e.height=e.top+e.bottom,e}function _t(t,e){t=t||{},e=e||et.font;let n=xe(t.size,e.size);typeof n=="string"&&(n=parseInt(n,10));let s=xe(t.style,e.style);s&&!(""+s).match(o_)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const r={family:xe(t.family,e.family),lineHeight:a_(xe(t.lineHeight,e.lineHeight),n),size:n,style:s,weight:xe(t.weight,e.weight),string:""};return r.string=JS(r),r}function ba(t,e,n,s){let r,i,o;for(r=0,i=t.length;r<i;++r)if(o=t[r],o!==void 0&&o!==void 0)return o}function c_(t,e,n){const{min:s,max:r}=t,i=Jy(e,(r-s)/2),o=(a,c)=>n&&a===0?0:a+c;return{min:o(s,-Math.abs(i)),max:o(r,i)}}function br(t,e){return Object.assign(Object.create(t),e)}function sh(t,e=[""],n,s,r=()=>t[0]){const i=n||t;typeof s>"u"&&(s=h1("_fallback",t));const o={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:t,_rootScopes:i,_fallback:s,_getTarget:r,override:a=>sh([a,...t],e,i,s)};return new Proxy(o,{deleteProperty(a,c){return delete a[c],delete a._keys,delete t[0][c],!0},get(a,c){return d1(a,c,()=>x_(c,e,t,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(t[0])},has(a,c){return Mm(a).includes(c)},ownKeys(a){return Mm(a)},set(a,c,u){const d=a._storage||(a._storage=r());return a[c]=d[c]=u,delete a._keys,!0}})}function ai(t,e,n,s){const r={_cacheable:!1,_proxy:t,_context:e,_subProxy:n,_stack:new Set,_descriptors:u1(t,s),setContext:i=>ai(t,i,n,s),override:i=>ai(t.override(i),e,n,s)};return new Proxy(r,{deleteProperty(i,o){return delete i[o],delete t[o],!0},get(i,o,a){return d1(i,o,()=>d_(i,o,a))},getOwnPropertyDescriptor(i,o){return i._descriptors.allKeys?Reflect.has(t,o)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(t,o)},getPrototypeOf(){return Reflect.getPrototypeOf(t)},has(i,o){return Reflect.has(t,o)},ownKeys(){return Reflect.ownKeys(t)},set(i,o,a){return t[o]=a,delete i[o],!0}})}function u1(t,e={scriptable:!0,indexable:!0}){const{_scriptable:n=e.scriptable,_indexable:s=e.indexable,_allKeys:r=e.allKeys}=t;return{allKeys:r,scriptable:n,indexable:s,isScriptable:Is(n)?n:()=>n,isIndexable:Is(s)?s:()=>s}}const u_=(t,e)=>t?t+Qf(e):e,rh=(t,e)=>ve(e)&&t!=="adapters"&&(Object.getPrototypeOf(e)===null||e.constructor===Object);function d1(t,e,n){if(Object.prototype.hasOwnProperty.call(t,e)||e==="constructor")return t[e];const s=n();return t[e]=s,s}function d_(t,e,n){const{_proxy:s,_context:r,_subProxy:i,_descriptors:o}=t;let a=s[e];return Is(a)&&o.isScriptable(e)&&(a=f_(e,a,t,n)),st(a)&&a.length&&(a=h_(e,a,t,o.isIndexable)),rh(e,a)&&(a=ai(a,r,i&&i[e],o)),a}function f_(t,e,n,s){const{_proxy:r,_context:i,_subProxy:o,_stack:a}=n;if(a.has(t))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+t);a.add(t);let c=e(i,o||s);return a.delete(t),rh(t,c)&&(c=ih(r._scopes,r,t,c)),c}function h_(t,e,n,s){const{_proxy:r,_context:i,_subProxy:o,_descriptors:a}=n;if(typeof i.index<"u"&&s(t))return e[i.index%e.length];if(ve(e[0])){const c=e,u=r._scopes.filter(d=>d!==c);e=[];for(const d of c){const f=ih(u,r,t,d);e.push(ai(f,i,o&&o[t],a))}}return e}function f1(t,e,n){return Is(t)?t(e,n):t}const p_=(t,e)=>t===!0?e:typeof t=="string"?pr(e,t):void 0;function m_(t,e,n,s,r){for(const i of e){const o=p_(n,i);if(o){t.add(o);const a=f1(o._fallback,n,r);if(typeof a<"u"&&a!==n&&a!==s)return a}else if(o===!1&&typeof s<"u"&&n!==s)return null}return!1}function ih(t,e,n,s){const r=e._rootScopes,i=f1(e._fallback,n,s),o=[...t,...r],a=new Set;a.add(s);let c=Em(a,o,n,i||n,s);return c===null||typeof i<"u"&&i!==n&&(c=Em(a,o,i,c,s),c===null)?!1:sh(Array.from(a),[""],r,i,()=>g_(e,n,s))}function Em(t,e,n,s,r){for(;n;)n=m_(t,e,n,s,r);return n}function g_(t,e,n){const s=t._getTarget();e in s||(s[e]={});const r=s[e];return st(r)&&ve(n)?n:r||{}}function x_(t,e,n,s){let r;for(const i of e)if(r=h1(u_(i,t),n),typeof r<"u")return rh(t,r)?ih(n,s,t,r):r}function h1(t,e){for(const n of e){if(!n)continue;const s=n[t];if(typeof s<"u")return s}}function Mm(t){let e=t._keys;return e||(e=t._keys=y_(t._scopes)),e}function y_(t){const e=new Set;for(const n of t)for(const s of Object.keys(n).filter(r=>!r.startsWith("_")))e.add(s);return Array.from(e)}const v_=Number.EPSILON||1e-14,li=(t,e)=>e<t.length&&!t[e].skip&&t[e],p1=t=>t==="x"?"y":"x";function b_(t,e,n,s){const r=t.skip?e:t,i=e,o=n.skip?e:n,a=Sd(i,r),c=Sd(o,i);let u=a/(a+c),d=c/(a+c);u=isNaN(u)?0:u,d=isNaN(d)?0:d;const f=s*u,h=s*d;return{previous:{x:i.x-f*(o.x-r.x),y:i.y-f*(o.y-r.y)},next:{x:i.x+h*(o.x-r.x),y:i.y+h*(o.y-r.y)}}}function w_(t,e,n){const s=t.length;let r,i,o,a,c,u=li(t,0);for(let d=0;d<s-1;++d)if(c=u,u=li(t,d+1),!(!c||!u)){if(eo(e[d],0,v_)){n[d]=n[d+1]=0;continue}r=n[d]/e[d],i=n[d+1]/e[d],a=Math.pow(r,2)+Math.pow(i,2),!(a<=9)&&(o=3/Math.sqrt(a),n[d]=r*o*e[d],n[d+1]=i*o*e[d])}}function k_(t,e,n="x"){const s=p1(n),r=t.length;let i,o,a,c=li(t,0);for(let u=0;u<r;++u){if(o=a,a=c,c=li(t,u+1),!a)continue;const d=a[n],f=a[s];o&&(i=(d-o[n])/3,a[`cp1${n}`]=d-i,a[`cp1${s}`]=f-i*e[u]),c&&(i=(c[n]-d)/3,a[`cp2${n}`]=d+i,a[`cp2${s}`]=f+i*e[u])}}function j_(t,e="x"){const n=p1(e),s=t.length,r=Array(s).fill(0),i=Array(s);let o,a,c,u=li(t,0);for(o=0;o<s;++o)if(a=c,c=u,u=li(t,o+1),!!c){if(u){const d=u[e]-c[e];r[o]=d!==0?(u[n]-c[n])/d:0}i[o]=a?u?zn(r[o-1])!==zn(r[o])?0:(r[o-1]+r[o])/2:r[o-1]:r[o]}w_(t,r,i),k_(t,i,e)}function wa(t,e,n){return Math.max(Math.min(t,n),e)}function S_(t,e){let n,s,r,i,o,a=Do(t[0],e);for(n=0,s=t.length;n<s;++n)o=i,i=a,a=n<s-1&&Do(t[n+1],e),i&&(r=t[n],o&&(r.cp1x=wa(r.cp1x,e.left,e.right),r.cp1y=wa(r.cp1y,e.top,e.bottom)),a&&(r.cp2x=wa(r.cp2x,e.left,e.right),r.cp2y=wa(r.cp2y,e.top,e.bottom)))}function __(t,e,n,s,r){let i,o,a,c;if(e.spanGaps&&(t=t.filter(u=>!u.skip)),e.cubicInterpolationMode==="monotone")j_(t,r);else{let u=s?t[t.length-1]:t[0];for(i=0,o=t.length;i<o;++i)a=t[i],c=b_(u,a,t[Math.min(i+1,o-(s?0:1))%o],e.tension),a.cp1x=c.previous.x,a.cp1y=c.previous.y,a.cp2x=c.next.x,a.cp2y=c.next.y,u=a}e.capBezierPoints&&S_(t,n)}function oh(){return typeof window<"u"&&typeof document<"u"}function ah(t){let e=t.parentNode;return e&&e.toString()==="[object ShadowRoot]"&&(e=e.host),e}function Ml(t,e,n){let s;return typeof t=="string"?(s=parseInt(t,10),t.indexOf("%")!==-1&&(s=s/100*e.parentNode[n])):s=t,s}const lc=t=>t.ownerDocument.defaultView.getComputedStyle(t,null);function N_(t,e){return lc(t).getPropertyValue(e)}const C_=["top","right","bottom","left"];function ar(t,e,n){const s={};n=n?"-"+n:"";for(let r=0;r<4;r++){const i=C_[r];s[i]=parseFloat(t[e+"-"+i+n])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const E_=(t,e,n)=>(t>0||e>0)&&(!n||!n.shadowRoot);function M_(t,e){const n=t.touches,s=n&&n.length?n[0]:t,{offsetX:r,offsetY:i}=s;let o=!1,a,c;if(E_(r,i,t.target))a=r,c=i;else{const u=e.getBoundingClientRect();a=s.clientX-u.left,c=s.clientY-u.top,o=!0}return{x:a,y:c,box:o}}function Xs(t,e){if("native"in t)return t;const{canvas:n,currentDevicePixelRatio:s}=e,r=lc(n),i=r.boxSizing==="border-box",o=ar(r,"padding"),a=ar(r,"border","width"),{x:c,y:u,box:d}=M_(t,n),f=o.left+(d&&a.left),h=o.top+(d&&a.top);let{width:m,height:g}=e;return i&&(m-=o.width+a.width,g-=o.height+a.height),{x:Math.round((c-f)/m*n.width/s),y:Math.round((u-h)/g*n.height/s)}}function P_(t,e,n){let s,r;if(e===void 0||n===void 0){const i=t&&ah(t);if(!i)e=t.clientWidth,n=t.clientHeight;else{const o=i.getBoundingClientRect(),a=lc(i),c=ar(a,"border","width"),u=ar(a,"padding");e=o.width-u.width-c.width,n=o.height-u.height-c.height,s=Ml(a.maxWidth,i,"clientWidth"),r=Ml(a.maxHeight,i,"clientHeight")}}return{width:e,height:n,maxWidth:s||Cl,maxHeight:r||Cl}}const vs=t=>Math.round(t*10)/10;function D_(t,e,n,s){const r=lc(t),i=ar(r,"margin"),o=Ml(r.maxWidth,t,"clientWidth")||Cl,a=Ml(r.maxHeight,t,"clientHeight")||Cl,c=P_(t,e,n);let{width:u,height:d}=c;if(r.boxSizing==="content-box"){const h=ar(r,"border","width"),m=ar(r,"padding");u-=m.width+h.width,d-=m.height+h.height}return u=Math.max(0,u-i.width),d=Math.max(0,s?u/s:d-i.height),u=vs(Math.min(u,o,c.maxWidth)),d=vs(Math.min(d,a,c.maxHeight)),u&&!d&&(d=vs(u/2)),(e!==void 0||n!==void 0)&&s&&c.height&&d>c.height&&(d=c.height,u=vs(Math.floor(d*s))),{width:u,height:d}}function Pm(t,e,n){const s=e||1,r=vs(t.height*s),i=vs(t.width*s);t.height=vs(t.height),t.width=vs(t.width);const o=t.canvas;return o.style&&(n||!o.style.height&&!o.style.width)&&(o.style.height=`${t.height}px`,o.style.width=`${t.width}px`),t.currentDevicePixelRatio!==s||o.height!==r||o.width!==i?(t.currentDevicePixelRatio=s,o.height=r,o.width=i,t.ctx.setTransform(s,0,0,s,0,0),!0):!1}const A_=function(){let t=!1;try{const e={get passive(){return t=!0,!1}};oh()&&(window.addEventListener("test",null,e),window.removeEventListener("test",null,e))}catch{}return t}();function Dm(t,e){const n=N_(t,e),s=n&&n.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function Qs(t,e,n,s){return{x:t.x+n*(e.x-t.x),y:t.y+n*(e.y-t.y)}}function O_(t,e,n,s){return{x:t.x+n*(e.x-t.x),y:s==="middle"?n<.5?t.y:e.y:s==="after"?n<1?t.y:e.y:n>0?e.y:t.y}}function T_(t,e,n,s){const r={x:t.cp2x,y:t.cp2y},i={x:e.cp1x,y:e.cp1y},o=Qs(t,r,n),a=Qs(r,i,n),c=Qs(i,e,n),u=Qs(o,a,n),d=Qs(a,c,n);return Qs(u,d,n)}const z_=function(t,e){return{x(n){return t+t+e-n},setWidth(n){e=n},textAlign(n){return n==="center"?n:n==="right"?"left":"right"},xPlus(n,s){return n-s},leftForLtr(n,s){return n-s}}},I_=function(){return{x(t){return t},setWidth(t){},textAlign(t){return t},xPlus(t,e){return t+e},leftForLtr(t,e){return t}}};function Zr(t,e,n){return t?z_(e,n):I_()}function m1(t,e){let n,s;(e==="ltr"||e==="rtl")&&(n=t.canvas.style,s=[n.getPropertyValue("direction"),n.getPropertyPriority("direction")],n.setProperty("direction",e,"important"),t.prevTextDirection=s)}function g1(t,e){e!==void 0&&(delete t.prevTextDirection,t.canvas.style.setProperty("direction",e[0],e[1]))}function x1(t){return t==="angle"?{between:Po,compare:zS,normalize:qt}:{between:qn,compare:(e,n)=>e-n,normalize:e=>e}}function Am({start:t,end:e,count:n,loop:s,style:r}){return{start:t%n,end:e%n,loop:s&&(e-t+1)%n===0,style:r}}function F_(t,e,n){const{property:s,start:r,end:i}=n,{between:o,normalize:a}=x1(s),c=e.length;let{start:u,end:d,loop:f}=t,h,m;if(f){for(u+=c,d+=c,h=0,m=c;h<m&&o(a(e[u%c][s]),r,i);++h)u--,d--;u%=c,d%=c}return d<u&&(d+=c),{start:u,end:d,loop:f,style:t.style}}function y1(t,e,n){if(!n)return[t];const{property:s,start:r,end:i}=n,o=e.length,{compare:a,between:c,normalize:u}=x1(s),{start:d,end:f,loop:h,style:m}=F_(t,e,n),g=[];let x=!1,v=null,b,p,y;const _=()=>c(r,y,b)&&a(r,y)!==0,j=()=>a(i,b)===0||c(i,y,b),N=()=>x||_(),C=()=>!x||j();for(let w=d,k=d;w<=f;++w)p=e[w%o],!p.skip&&(b=u(p[s]),b!==y&&(x=c(b,r,i),v===null&&N()&&(v=a(b,r)===0?w:k),v!==null&&C()&&(g.push(Am({start:v,end:w,loop:h,count:o,style:m})),v=null),k=w,y=b));return v!==null&&g.push(Am({start:v,end:f,loop:h,count:o,style:m})),g}function v1(t,e){const n=[],s=t.segments;for(let r=0;r<s.length;r++){const i=y1(s[r],t.points,e);i.length&&n.push(...i)}return n}function R_(t,e,n,s){let r=0,i=e-1;if(n&&!s)for(;r<e&&!t[r].skip;)r++;for(;r<e&&t[r].skip;)r++;for(r%=e,n&&(i+=r);i>r&&t[i%e].skip;)i--;return i%=e,{start:r,end:i}}function L_(t,e,n,s){const r=t.length,i=[];let o=e,a=t[e],c;for(c=e+1;c<=n;++c){const u=t[c%r];u.skip||u.stop?a.skip||(s=!1,i.push({start:e%r,end:(c-1)%r,loop:s}),e=o=u.stop?c:null):(o=c,a.skip&&(e=c)),a=u}return o!==null&&i.push({start:e%r,end:o%r,loop:s}),i}function B_(t,e){const n=t.points,s=t.options.spanGaps,r=n.length;if(!r)return[];const i=!!t._loop,{start:o,end:a}=R_(n,r,i,s);if(s===!0)return Om(t,[{start:o,end:a,loop:i}],n,e);const c=a<o?a+r:a,u=!!t._fullLoop&&o===0&&a===r-1;return Om(t,L_(n,o,c,u),n,e)}function Om(t,e,n,s){return!s||!s.setContext||!n?e:$_(t,e,n,s)}function $_(t,e,n,s){const r=t._chart.getContext(),i=Tm(t.options),{_datasetIndex:o,options:{spanGaps:a}}=t,c=n.length,u=[];let d=i,f=e[0].start,h=f;function m(g,x,v,b){const p=a?-1:1;if(g!==x){for(g+=c;n[g%c].skip;)g-=p;for(;n[x%c].skip;)x+=p;g%c!==x%c&&(u.push({start:g%c,end:x%c,loop:v,style:b}),d=b,f=x%c)}}for(const g of e){f=a?f:g.start;let x=n[f%c],v;for(h=f+1;h<=g.end;h++){const b=n[h%c];v=Tm(s.setContext(br(r,{type:"segment",p0:x,p1:b,p0DataIndex:(h-1)%c,p1DataIndex:h%c,datasetIndex:o}))),U_(v,d)&&m(f,h-1,g.loop,d),x=b,d=v}f<h-1&&m(f,h-1,g.loop,d)}return u}function Tm(t){return{backgroundColor:t.backgroundColor,borderCapStyle:t.borderCapStyle,borderDash:t.borderDash,borderDashOffset:t.borderDashOffset,borderJoinStyle:t.borderJoinStyle,borderWidth:t.borderWidth,borderColor:t.borderColor}}function U_(t,e){if(!e)return!1;const n=[],s=function(r,i){return eh(i)?(n.includes(i)||n.push(i),n.indexOf(i)):i};return JSON.stringify(t,s)!==JSON.stringify(e,s)}function ka(t,e,n){return t.options.clip?t[n]:e[n]}function W_(t,e){const{xScale:n,yScale:s}=t;return n&&s?{left:ka(n,e,"left"),right:ka(n,e,"right"),top:ka(s,e,"top"),bottom:ka(s,e,"bottom")}:e}function b1(t,e){const n=e._clip;if(n.disabled)return!1;const s=W_(e,t.chartArea);return{left:n.left===!1?0:s.left-(n.left===!0?0:n.left),right:n.right===!1?t.width:s.right+(n.right===!0?0:n.right),top:n.top===!1?0:s.top-(n.top===!0?0:n.top),bottom:n.bottom===!1?t.height:s.bottom+(n.bottom===!0?0:n.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class V_{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(e,n,s,r){const i=n.listeners[r],o=n.duration;i.forEach(a=>a({chart:e,initial:n.initial,numSteps:o,currentStep:Math.min(s-n.start,o)}))}_refresh(){this._request||(this._running=!0,this._request=i1.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(e=Date.now()){let n=0;this._charts.forEach((s,r)=>{if(!s.running||!s.items.length)return;const i=s.items;let o=i.length-1,a=!1,c;for(;o>=0;--o)c=i[o],c._active?(c._total>s.duration&&(s.duration=c._total),c.tick(e),a=!0):(i[o]=i[i.length-1],i.pop());a&&(r.draw(),this._notify(r,s,e,"progress")),i.length||(s.running=!1,this._notify(r,s,e,"complete"),s.initial=!1),n+=i.length}),this._lastDate=e,n===0&&(this._running=!1)}_getAnims(e){const n=this._charts;let s=n.get(e);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},n.set(e,s)),s}listen(e,n,s){this._getAnims(e).listeners[n].push(s)}add(e,n){!n||!n.length||this._getAnims(e).items.push(...n)}has(e){return this._getAnims(e).items.length>0}start(e){const n=this._charts.get(e);n&&(n.running=!0,n.start=Date.now(),n.duration=n.items.reduce((s,r)=>Math.max(s,r._duration),0),this._refresh())}running(e){if(!this._running)return!1;const n=this._charts.get(e);return!(!n||!n.running||!n.items.length)}stop(e){const n=this._charts.get(e);if(!n||!n.items.length)return;const s=n.items;let r=s.length-1;for(;r>=0;--r)s[r].cancel();n.items=[],this._notify(e,n,Date.now(),"complete")}remove(e){return this._charts.delete(e)}}var Rn=new V_;const zm="transparent",H_={boolean(t,e,n){return n>.5?e:t},color(t,e,n){const s=Sm(t||zm),r=s.valid&&Sm(e||zm);return r&&r.valid?r.mix(s,n).hexString():e},number(t,e,n){return t+(e-t)*n}};class Y_{constructor(e,n,s,r){const i=n[s];r=ba([e.to,r,i,e.from]);const o=ba([e.from,i,r]);this._active=!0,this._fn=e.fn||H_[e.type||typeof o],this._easing=to[e.easing]||to.linear,this._start=Math.floor(Date.now()+(e.delay||0)),this._duration=this._total=Math.floor(e.duration),this._loop=!!e.loop,this._target=n,this._prop=s,this._from=o,this._to=r,this._promises=void 0}active(){return this._active}update(e,n,s){if(this._active){this._notify(!1);const r=this._target[this._prop],i=s-this._start,o=this._duration-i;this._start=s,this._duration=Math.floor(Math.max(o,e.duration)),this._total+=i,this._loop=!!e.loop,this._to=ba([e.to,n,r,e.from]),this._from=ba([e.from,r,n])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(e){const n=e-this._start,s=this._duration,r=this._prop,i=this._from,o=this._loop,a=this._to;let c;if(this._active=i!==a&&(o||n<s),!this._active){this._target[r]=a,this._notify(!0);return}if(n<0){this._target[r]=i;return}c=n/s%2,c=o&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[r]=this._fn(i,a,c)}wait(){const e=this._promises||(this._promises=[]);return new Promise((n,s)=>{e.push({res:n,rej:s})})}_notify(e){const n=e?"res":"rej",s=this._promises||[];for(let r=0;r<s.length;r++)s[r][n]()}}class w1{constructor(e,n){this._chart=e,this._properties=new Map,this.configure(n)}configure(e){if(!ve(e))return;const n=Object.keys(et.animation),s=this._properties;Object.getOwnPropertyNames(e).forEach(r=>{const i=e[r];if(!ve(i))return;const o={};for(const a of n)o[a]=i[a];(st(i.properties)&&i.properties||[r]).forEach(a=>{(a===r||!s.has(a))&&s.set(a,o)})})}_animateOptions(e,n){const s=n.options,r=G_(e,s);if(!r)return[];const i=this._createAnimations(r,s);return s.$shared&&K_(e.options.$animations,s).then(()=>{e.options=s},()=>{}),i}_createAnimations(e,n){const s=this._properties,r=[],i=e.$animations||(e.$animations={}),o=Object.keys(n),a=Date.now();let c;for(c=o.length-1;c>=0;--c){const u=o[c];if(u.charAt(0)==="$")continue;if(u==="options"){r.push(...this._animateOptions(e,n));continue}const d=n[u];let f=i[u];const h=s.get(u);if(f)if(h&&f.active()){f.update(h,d,a);continue}else f.cancel();if(!h||!h.duration){e[u]=d;continue}i[u]=f=new Y_(h,e,u,d),r.push(f)}return r}update(e,n){if(this._properties.size===0){Object.assign(e,n);return}const s=this._createAnimations(e,n);if(s.length)return Rn.add(this._chart,s),!0}}function K_(t,e){const n=[],s=Object.keys(e);for(let r=0;r<s.length;r++){const i=t[s[r]];i&&i.active()&&n.push(i.wait())}return Promise.all(n)}function G_(t,e){if(!e)return;let n=t.options;if(!n){t.options=e;return}return n.$shared&&(t.options=n=Object.assign({},n,{$shared:!1,$animations:{}})),n}function Im(t,e){const n=t&&t.options||{},s=n.reverse,r=n.min===void 0?e:0,i=n.max===void 0?e:0;return{start:s?i:r,end:s?r:i}}function q_(t,e,n){if(n===!1)return!1;const s=Im(t,n),r=Im(e,n);return{top:r.end,right:s.end,bottom:r.start,left:s.start}}function X_(t){let e,n,s,r;return ve(t)?(e=t.top,n=t.right,s=t.bottom,r=t.left):e=n=s=r=t,{top:e,right:n,bottom:s,left:r,disabled:t===!1}}function k1(t,e){const n=[],s=t._getSortedDatasetMetas(e);let r,i;for(r=0,i=s.length;r<i;++r)n.push(s[r].index);return n}function Fm(t,e,n,s={}){const r=t.keys,i=s.mode==="single";let o,a,c,u;if(e===null)return;let d=!1;for(o=0,a=r.length;o<a;++o){if(c=+r[o],c===n){if(d=!0,s.all)continue;break}u=t.values[c],Et(u)&&(i||e===0||zn(e)===zn(u))&&(e+=u)}return!d&&!s.all?0:e}function Q_(t,e){const{iScale:n,vScale:s}=e,r=n.axis==="x"?"x":"y",i=s.axis==="x"?"x":"y",o=Object.keys(t),a=new Array(o.length);let c,u,d;for(c=0,u=o.length;c<u;++c)d=o[c],a[c]={[r]:d,[i]:t[d]};return a}function qc(t,e){const n=t&&t.options.stacked;return n||n===void 0&&e.stack!==void 0}function Z_(t,e,n){return`${t.id}.${e.id}.${n.stack||n.type}`}function J_(t){const{min:e,max:n,minDefined:s,maxDefined:r}=t.getUserBounds();return{min:s?e:Number.NEGATIVE_INFINITY,max:r?n:Number.POSITIVE_INFINITY}}function eN(t,e,n){const s=t[e]||(t[e]={});return s[n]||(s[n]={})}function Rm(t,e,n,s){for(const r of e.getMatchingVisibleMetas(s).reverse()){const i=t[r.index];if(n&&i>0||!n&&i<0)return r.index}return null}function Lm(t,e){const{chart:n,_cachedMeta:s}=t,r=n._stacks||(n._stacks={}),{iScale:i,vScale:o,index:a}=s,c=i.axis,u=o.axis,d=Z_(i,o,s),f=e.length;let h;for(let m=0;m<f;++m){const g=e[m],{[c]:x,[u]:v}=g,b=g._stacks||(g._stacks={});h=b[u]=eN(r,d,x),h[a]=v,h._top=Rm(h,o,!0,s.type),h._bottom=Rm(h,o,!1,s.type);const p=h._visualValues||(h._visualValues={});p[a]=v}}function Xc(t,e){const n=t.scales;return Object.keys(n).filter(s=>n[s].axis===e).shift()}function tN(t,e){return br(t,{active:!1,dataset:void 0,datasetIndex:e,index:e,mode:"default",type:"dataset"})}function nN(t,e,n){return br(t,{active:!1,dataIndex:e,parsed:void 0,raw:void 0,element:n,index:e,mode:"default",type:"data"})}function _i(t,e){const n=t.controller.index,s=t.vScale&&t.vScale.axis;if(s){e=e||t._parsed;for(const r of e){const i=r._stacks;if(!i||i[s]===void 0||i[s][n]===void 0)return;delete i[s][n],i[s]._visualValues!==void 0&&i[s]._visualValues[n]!==void 0&&delete i[s]._visualValues[n]}}}const Qc=t=>t==="reset"||t==="none",Bm=(t,e)=>e?t:Object.assign({},t),sN=(t,e,n)=>t&&!e.hidden&&e._stacked&&{keys:k1(n,!0),values:null};class lr{constructor(e,n){this.chart=e,this._ctx=e.ctx,this.index=n,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const e=this._cachedMeta;this.configure(),this.linkScales(),e._stacked=qc(e.vScale,e),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(e){this.index!==e&&_i(this._cachedMeta),this.index=e}linkScales(){const e=this.chart,n=this._cachedMeta,s=this.getDataset(),r=(f,h,m,g)=>f==="x"?h:f==="r"?g:m,i=n.xAxisID=xe(s.xAxisID,Xc(e,"x")),o=n.yAxisID=xe(s.yAxisID,Xc(e,"y")),a=n.rAxisID=xe(s.rAxisID,Xc(e,"r")),c=n.indexAxis,u=n.iAxisID=r(c,i,o,a),d=n.vAxisID=r(c,o,i,a);n.xScale=this.getScaleForId(i),n.yScale=this.getScaleForId(o),n.rScale=this.getScaleForId(a),n.iScale=this.getScaleForId(u),n.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(e){return this.chart.scales[e]}_getOtherScale(e){const n=this._cachedMeta;return e===n.iScale?n.vScale:n.iScale}reset(){this._update("reset")}_destroy(){const e=this._cachedMeta;this._data&&wm(this._data,this),e._stacked&&_i(e)}_dataCheck(){const e=this.getDataset(),n=e.data||(e.data=[]),s=this._data;if(ve(n)){const r=this._cachedMeta;this._data=Q_(n,r)}else if(s!==n){if(s){wm(s,this);const r=this._cachedMeta;_i(r),r._parsed=[]}n&&Object.isExtensible(n)&&LS(n,this),this._syncList=[],this._data=n}}addElements(){const e=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(e.dataset=new this.datasetElementType)}buildOrUpdateElements(e){const n=this._cachedMeta,s=this.getDataset();let r=!1;this._dataCheck();const i=n._stacked;n._stacked=qc(n.vScale,n),n.stack!==s.stack&&(r=!0,_i(n),n.stack=s.stack),this._resyncElements(e),(r||i!==n._stacked)&&(Lm(this,n._parsed),n._stacked=qc(n.vScale,n))}configure(){const e=this.chart.config,n=e.datasetScopeKeys(this._type),s=e.getOptionScopes(this.getDataset(),n,!0);this.options=e.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(e,n){const{_cachedMeta:s,_data:r}=this,{iScale:i,_stacked:o}=s,a=i.axis;let c=e===0&&n===r.length?!0:s._sorted,u=e>0&&s._parsed[e-1],d,f,h;if(this._parsing===!1)s._parsed=r,s._sorted=!0,h=r;else{st(r[e])?h=this.parseArrayData(s,r,e,n):ve(r[e])?h=this.parseObjectData(s,r,e,n):h=this.parsePrimitiveData(s,r,e,n);const m=()=>f[a]===null||u&&f[a]<u[a];for(d=0;d<n;++d)s._parsed[d+e]=f=h[d],c&&(m()&&(c=!1),u=f);s._sorted=c}o&&Lm(this,h)}parsePrimitiveData(e,n,s,r){const{iScale:i,vScale:o}=e,a=i.axis,c=o.axis,u=i.getLabels(),d=i===o,f=new Array(r);let h,m,g;for(h=0,m=r;h<m;++h)g=h+s,f[h]={[a]:d||i.parse(u[g],g),[c]:o.parse(n[g],g)};return f}parseArrayData(e,n,s,r){const{xScale:i,yScale:o}=e,a=new Array(r);let c,u,d,f;for(c=0,u=r;c<u;++c)d=c+s,f=n[d],a[c]={x:i.parse(f[0],d),y:o.parse(f[1],d)};return a}parseObjectData(e,n,s,r){const{xScale:i,yScale:o}=e,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,u=new Array(r);let d,f,h,m;for(d=0,f=r;d<f;++d)h=d+s,m=n[h],u[d]={x:i.parse(pr(m,a),h),y:o.parse(pr(m,c),h)};return u}getParsed(e){return this._cachedMeta._parsed[e]}getDataElement(e){return this._cachedMeta.data[e]}applyStack(e,n,s){const r=this.chart,i=this._cachedMeta,o=n[e.axis],a={keys:k1(r,!0),values:n._stacks[e.axis]._visualValues};return Fm(a,o,i.index,{mode:s})}updateRangeFromParsed(e,n,s,r){const i=s[n.axis];let o=i===null?NaN:i;const a=r&&s._stacks[n.axis];r&&a&&(r.values=a,o=Fm(r,i,this._cachedMeta.index)),e.min=Math.min(e.min,o),e.max=Math.max(e.max,o)}getMinMax(e,n){const s=this._cachedMeta,r=s._parsed,i=s._sorted&&e===s.iScale,o=r.length,a=this._getOtherScale(e),c=sN(n,s,this.chart),u={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:f}=J_(a);let h,m;function g(){m=r[h];const x=m[a.axis];return!Et(m[e.axis])||d>x||f<x}for(h=0;h<o&&!(!g()&&(this.updateRangeFromParsed(u,e,m,c),i));++h);if(i){for(h=o-1;h>=0;--h)if(!g()){this.updateRangeFromParsed(u,e,m,c);break}}return u}getAllParsedValues(e){const n=this._cachedMeta._parsed,s=[];let r,i,o;for(r=0,i=n.length;r<i;++r)o=n[r][e.axis],Et(o)&&s.push(o);return s}getMaxOverflow(){return!1}getLabelAndValue(e){const n=this._cachedMeta,s=n.iScale,r=n.vScale,i=this.getParsed(e);return{label:s?""+s.getLabelForValue(i[s.axis]):"",value:r?""+r.getLabelForValue(i[r.axis]):""}}_update(e){const n=this._cachedMeta;this.update(e||"default"),n._clip=X_(xe(this.options.clip,q_(n.xScale,n.yScale,this.getMaxOverflow())))}update(e){}draw(){const e=this._ctx,n=this.chart,s=this._cachedMeta,r=s.data||[],i=n.chartArea,o=[],a=this._drawStart||0,c=this._drawCount||r.length-a,u=this.options.drawActiveElementsOnTop;let d;for(s.dataset&&s.dataset.draw(e,i,a,c),d=a;d<a+c;++d){const f=r[d];f.hidden||(f.active&&u?o.push(f):f.draw(e,i))}for(d=0;d<o.length;++d)o[d].draw(e,i)}getStyle(e,n){const s=n?"active":"default";return e===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(e||0,s)}getContext(e,n,s){const r=this.getDataset();let i;if(e>=0&&e<this._cachedMeta.data.length){const o=this._cachedMeta.data[e];i=o.$context||(o.$context=nN(this.getContext(),e,o)),i.parsed=this.getParsed(e),i.raw=r.data[e],i.index=i.dataIndex=e}else i=this.$context||(this.$context=tN(this.chart.getContext(),this.index)),i.dataset=r,i.index=i.datasetIndex=this.index;return i.active=!!n,i.mode=s,i}resolveDatasetElementOptions(e){return this._resolveElementOptions(this.datasetElementType.id,e)}resolveDataElementOptions(e,n){return this._resolveElementOptions(this.dataElementType.id,n,e)}_resolveElementOptions(e,n="default",s){const r=n==="active",i=this._cachedDataOpts,o=e+"-"+n,a=i[o],c=this.enableOptionSharing&&Eo(s);if(a)return Bm(a,c);const u=this.chart.config,d=u.datasetElementScopeKeys(this._type,e),f=r?[`${e}Hover`,"hover",e,""]:[e,""],h=u.getOptionScopes(this.getDataset(),d),m=Object.keys(et.elements[e]),g=()=>this.getContext(s,r,n),x=u.resolveNamedOptions(h,m,g,f);return x.$shared&&(x.$shared=c,i[o]=Object.freeze(Bm(x,c))),x}_resolveAnimations(e,n,s){const r=this.chart,i=this._cachedDataOpts,o=`animation-${n}`,a=i[o];if(a)return a;let c;if(r.options.animation!==!1){const d=this.chart.config,f=d.datasetAnimationScopeKeys(this._type,n),h=d.getOptionScopes(this.getDataset(),f);c=d.createResolver(h,this.getContext(e,s,n))}const u=new w1(r,c&&c.animations);return c&&c._cacheable&&(i[o]=Object.freeze(u)),u}getSharedOptions(e){if(e.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},e))}includeOptions(e,n){return!n||Qc(e)||this.chart._animationsDisabled}_getSharedOptions(e,n){const s=this.resolveDataElementOptions(e,n),r=this._sharedOptions,i=this.getSharedOptions(s),o=this.includeOptions(n,i)||i!==r;return this.updateSharedOptions(i,n,s),{sharedOptions:i,includeOptions:o}}updateElement(e,n,s,r){Qc(r)?Object.assign(e,s):this._resolveAnimations(n,r).update(e,s)}updateSharedOptions(e,n,s){e&&!Qc(n)&&this._resolveAnimations(void 0,n).update(e,s)}_setStyle(e,n,s,r){e.active=r;const i=this.getStyle(n,r);this._resolveAnimations(n,s,r).update(e,{options:!r&&this.getSharedOptions(i)||i})}removeHoverStyle(e,n,s){this._setStyle(e,s,"active",!1)}setHoverStyle(e,n,s){this._setStyle(e,s,"active",!0)}_removeDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!1)}_setDatasetHoverStyle(){const e=this._cachedMeta.dataset;e&&this._setStyle(e,void 0,"active",!0)}_resyncElements(e){const n=this._data,s=this._cachedMeta.data;for(const[a,c,u]of this._syncList)this[a](c,u);this._syncList=[];const r=s.length,i=n.length,o=Math.min(i,r);o&&this.parse(0,o),i>r?this._insertElements(r,i-r,e):i<r&&this._removeElements(i,r-i)}_insertElements(e,n,s=!0){const r=this._cachedMeta,i=r.data,o=e+n;let a;const c=u=>{for(u.length+=n,a=u.length-1;a>=o;a--)u[a]=u[a-n]};for(c(i),a=e;a<o;++a)i[a]=new this.dataElementType;this._parsing&&c(r._parsed),this.parse(e,n),s&&this.updateElements(i,e,n,"reset")}updateElements(e,n,s,r){}_removeElements(e,n){const s=this._cachedMeta;if(this._parsing){const r=s._parsed.splice(e,n);s._stacked&&_i(s,r)}s.data.splice(e,n)}_sync(e){if(this._parsing)this._syncList.push(e);else{const[n,s,r]=e;this[n](s,r)}this.chart._dataChanges.push([this.index,...e])}_onDataPush(){const e=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-e,e])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(e,n){n&&this._sync(["_removeElements",e,n]);const s=arguments.length-2;s&&this._sync(["_insertElements",e,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}ee(lr,"defaults",{}),ee(lr,"datasetElementType",null),ee(lr,"dataElementType",null);function rN(t,e){if(!t._cache.$bar){const n=t.getMatchingVisibleMetas(e);let s=[];for(let r=0,i=n.length;r<i;r++)s=s.concat(n[r].controller.getAllParsedValues(t));t._cache.$bar=r1(s.sort((r,i)=>r-i))}return t._cache.$bar}function iN(t){const e=t.iScale,n=rN(e,t.type);let s=e._length,r,i,o,a;const c=()=>{o===32767||o===-32768||(Eo(a)&&(s=Math.min(s,Math.abs(o-a)||s)),a=o)};for(r=0,i=n.length;r<i;++r)o=e.getPixelForValue(n[r]),c();for(a=void 0,r=0,i=e.ticks.length;r<i;++r)o=e.getPixelForTick(r),c();return s}function oN(t,e,n,s){const r=n.barThickness;let i,o;return _e(r)?(i=e.min*n.categoryPercentage,o=n.barPercentage):(i=r*s,o=1),{chunk:i/s,ratio:o,start:e.pixels[t]-i/2}}function aN(t,e,n,s){const r=e.pixels,i=r[t];let o=t>0?r[t-1]:null,a=t<r.length-1?r[t+1]:null;const c=n.categoryPercentage;o===null&&(o=i-(a===null?e.end-e.start:a-i)),a===null&&(a=i+i-o);const u=i-(i-Math.min(o,a))/2*c;return{chunk:Math.abs(a-o)/2*c/s,ratio:n.barPercentage,start:u}}function lN(t,e,n,s){const r=n.parse(t[0],s),i=n.parse(t[1],s),o=Math.min(r,i),a=Math.max(r,i);let c=o,u=a;Math.abs(o)>Math.abs(a)&&(c=a,u=o),e[n.axis]=u,e._custom={barStart:c,barEnd:u,start:r,end:i,min:o,max:a}}function j1(t,e,n,s){return st(t)?lN(t,e,n,s):e[n.axis]=n.parse(t,s),e}function $m(t,e,n,s){const r=t.iScale,i=t.vScale,o=r.getLabels(),a=r===i,c=[];let u,d,f,h;for(u=n,d=n+s;u<d;++u)h=e[u],f={},f[r.axis]=a||r.parse(o[u],u),c.push(j1(h,f,i,u));return c}function Zc(t){return t&&t.barStart!==void 0&&t.barEnd!==void 0}function cN(t,e,n){return t!==0?zn(t):(e.isHorizontal()?1:-1)*(e.min>=n?1:-1)}function uN(t){let e,n,s,r,i;return t.horizontal?(e=t.base>t.x,n="left",s="right"):(e=t.base<t.y,n="bottom",s="top"),e?(r="end",i="start"):(r="start",i="end"),{start:n,end:s,reverse:e,top:r,bottom:i}}function dN(t,e,n,s){let r=e.borderSkipped;const i={};if(!r){t.borderSkipped=i;return}if(r===!0){t.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:o,end:a,reverse:c,top:u,bottom:d}=uN(t);r==="middle"&&n&&(t.enableBorderRadius=!0,(n._top||0)===s?r=u:(n._bottom||0)===s?r=d:(i[Um(d,o,a,c)]=!0,r=u)),i[Um(r,o,a,c)]=!0,t.borderSkipped=i}function Um(t,e,n,s){return s?(t=fN(t,e,n),t=Wm(t,n,e)):t=Wm(t,e,n),t}function fN(t,e,n){return t===e?n:t===n?e:t}function Wm(t,e,n){return t==="start"?e:t==="end"?n:t}function hN(t,{inflateAmount:e},n){t.inflateAmount=e==="auto"?n===1?.33:0:e}class Ha extends lr{parsePrimitiveData(e,n,s,r){return $m(e,n,s,r)}parseArrayData(e,n,s,r){return $m(e,n,s,r)}parseObjectData(e,n,s,r){const{iScale:i,vScale:o}=e,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,u=i.axis==="x"?a:c,d=o.axis==="x"?a:c,f=[];let h,m,g,x;for(h=s,m=s+r;h<m;++h)x=n[h],g={},g[i.axis]=i.parse(pr(x,u),h),f.push(j1(pr(x,d),g,o,h));return f}updateRangeFromParsed(e,n,s,r){super.updateRangeFromParsed(e,n,s,r);const i=s._custom;i&&n===this._cachedMeta.vScale&&(e.min=Math.min(e.min,i.min),e.max=Math.max(e.max,i.max))}getMaxOverflow(){return 0}getLabelAndValue(e){const n=this._cachedMeta,{iScale:s,vScale:r}=n,i=this.getParsed(e),o=i._custom,a=Zc(o)?"["+o.start+", "+o.end+"]":""+r.getLabelForValue(i[r.axis]);return{label:""+s.getLabelForValue(i[s.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const e=this._cachedMeta;e.stack=this.getDataset().stack}update(e){const n=this._cachedMeta;this.updateElements(n.data,0,n.data.length,e)}updateElements(e,n,s,r){const i=r==="reset",{index:o,_cachedMeta:{vScale:a}}=this,c=a.getBasePixel(),u=a.isHorizontal(),d=this._getRuler(),{sharedOptions:f,includeOptions:h}=this._getSharedOptions(n,r);for(let m=n;m<n+s;m++){const g=this.getParsed(m),x=i||_e(g[a.axis])?{base:c,head:c}:this._calculateBarValuePixels(m),v=this._calculateBarIndexPixels(m,d),b=(g._stacks||{})[a.axis],p={horizontal:u,base:x.base,enableBorderRadius:!b||Zc(g._custom)||o===b._top||o===b._bottom,x:u?x.head:v.center,y:u?v.center:x.head,height:u?v.size:Math.abs(x.size),width:u?Math.abs(x.size):v.size};h&&(p.options=f||this.resolveDataElementOptions(m,e[m].active?"active":r));const y=p.options||e[m].options;dN(p,y,b,o),hN(p,y,d.ratio),this.updateElement(e[m],m,p,r)}}_getStacks(e,n){const{iScale:s}=this._cachedMeta,r=s.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),i=s.options.stacked,o=[],a=this._cachedMeta.controller.getParsed(n),c=a&&a[s.axis],u=d=>{const f=d._parsed.find(m=>m[s.axis]===c),h=f&&f[d.vScale.axis];if(_e(h)||isNaN(h))return!0};for(const d of r)if(!(n!==void 0&&u(d))&&((i===!1||o.indexOf(d.stack)===-1||i===void 0&&d.stack===void 0)&&o.push(d.stack),d.index===e))break;return o.length||o.push(void 0),o}_getStackCount(e){return this._getStacks(void 0,e).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const e=this.chart.scales,n=this.chart.options.indexAxis;return Object.keys(e).filter(s=>e[s].axis===n).shift()}_getAxis(){const e={},n=this.getFirstScaleIdForIndexAxis();for(const s of this.chart.data.datasets)e[xe(this.chart.options.indexAxis==="x"?s.xAxisID:s.yAxisID,n)]=!0;return Object.keys(e)}_getStackIndex(e,n,s){const r=this._getStacks(e,s),i=n!==void 0?r.indexOf(n):-1;return i===-1?r.length-1:i}_getRuler(){const e=this.options,n=this._cachedMeta,s=n.iScale,r=[];let i,o;for(i=0,o=n.data.length;i<o;++i)r.push(s.getPixelForValue(this.getParsed(i)[s.axis],i));const a=e.barThickness;return{min:a||iN(n),pixels:r,start:s._startPixel,end:s._endPixel,stackCount:this._getStackCount(),scale:s,grouped:e.grouped,ratio:a?1:e.categoryPercentage*e.barPercentage}}_calculateBarValuePixels(e){const{_cachedMeta:{vScale:n,_stacked:s,index:r},options:{base:i,minBarLength:o}}=this,a=i||0,c=this.getParsed(e),u=c._custom,d=Zc(u);let f=c[n.axis],h=0,m=s?this.applyStack(n,c,s):f,g,x;m!==f&&(h=m-f,m=f),d&&(f=u.barStart,m=u.barEnd-u.barStart,f!==0&&zn(f)!==zn(u.barEnd)&&(h=0),h+=f);const v=!_e(i)&&!d?i:h;let b=n.getPixelForValue(v);if(this.chart.getDataVisibility(e)?g=n.getPixelForValue(h+m):g=b,x=g-b,Math.abs(x)<o){x=cN(x,n,a)*o,f===a&&(b-=x/2);const p=n.getPixelForDecimal(0),y=n.getPixelForDecimal(1),_=Math.min(p,y),j=Math.max(p,y);b=Math.max(Math.min(b,j),_),g=b+x,s&&!d&&(c._stacks[n.axis]._visualValues[r]=n.getValueForPixel(g)-n.getValueForPixel(b))}if(b===n.getPixelForValue(a)){const p=zn(x)*n.getLineWidthForValue(a)/2;b+=p,x-=p}return{size:x,base:b,head:g,center:g+x/2}}_calculateBarIndexPixels(e,n){const s=n.scale,r=this.options,i=r.skipNull,o=xe(r.maxBarThickness,1/0);let a,c;const u=this._getAxisCount();if(n.grouped){const d=i?this._getStackCount(e):n.stackCount,f=r.barThickness==="flex"?aN(e,n,r,d*u):oN(e,n,r,d*u),h=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,m=this._getAxis().indexOf(xe(h,this.getFirstScaleIdForIndexAxis())),g=this._getStackIndex(this.index,this._cachedMeta.stack,i?e:void 0)+m;a=f.start+f.chunk*g+f.chunk/2,c=Math.min(o,f.chunk*f.ratio)}else a=s.getPixelForValue(this.getParsed(e)[s.axis],e),c=Math.min(o,n.min*n.ratio);return{base:a-c/2,head:a+c/2,center:a,size:c}}draw(){const e=this._cachedMeta,n=e.vScale,s=e.data,r=s.length;let i=0;for(;i<r;++i)this.getParsed(i)[n.axis]!==null&&!s[i].hidden&&s[i].draw(this._ctx)}}ee(Ha,"id","bar"),ee(Ha,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),ee(Ha,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});function pN(t,e,n){let s=1,r=1,i=0,o=0;if(e<Ue){const a=t,c=a+e,u=Math.cos(a),d=Math.sin(a),f=Math.cos(c),h=Math.sin(c),m=(y,_,j)=>Po(y,a,c,!0)?1:Math.max(_,_*n,j,j*n),g=(y,_,j)=>Po(y,a,c,!0)?-1:Math.min(_,_*n,j,j*n),x=m(0,u,f),v=m(ct,d,h),b=g(Ce,u,f),p=g(Ce+ct,d,h);s=(x-b)/2,r=(v-p)/2,i=-(x+b)/2,o=-(v+p)/2}return{ratioX:s,ratioY:r,offsetX:i,offsetY:o}}class Bi extends lr{constructor(e,n){super(e,n),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(e,n){const s=this.getDataset().data,r=this._cachedMeta;if(this._parsing===!1)r._parsed=s;else{let i=c=>+s[c];if(ve(s[e])){const{key:c="value"}=this._parsing;i=u=>+pr(s[u],c)}let o,a;for(o=e,a=e+n;o<a;++o)r._parsed[o]=i(o)}}_getRotation(){return Gn(this.options.rotation-90)}_getCircumference(){return Gn(this.options.circumference)}_getRotationExtents(){let e=Ue,n=-Ue;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const r=this.chart.getDatasetMeta(s).controller,i=r._getRotation(),o=r._getCircumference();e=Math.min(e,i),n=Math.max(n,i+o)}return{rotation:e,circumference:n-e}}update(e){const n=this.chart,{chartArea:s}=n,r=this._cachedMeta,i=r.data,o=this.getMaxBorderWidth()+this.getMaxOffset(i)+this.options.spacing,a=Math.max((Math.min(s.width,s.height)-o)/2,0),c=Math.min(kS(this.options.cutout,a),1),u=this._getRingWeight(this.index),{circumference:d,rotation:f}=this._getRotationExtents(),{ratioX:h,ratioY:m,offsetX:g,offsetY:x}=pN(f,d,c),v=(s.width-o)/h,b=(s.height-o)/m,p=Math.max(Math.min(v,b)/2,0),y=Jy(this.options.radius,p),_=Math.max(y*c,0),j=(y-_)/this._getVisibleDatasetWeightTotal();this.offsetX=g*y,this.offsetY=x*y,r.total=this.calculateTotal(),this.outerRadius=y-j*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-j*u,0),this.updateElements(i,0,i.length,e)}_circumference(e,n){const s=this.options,r=this._cachedMeta,i=this._getCircumference();return n&&s.animation.animateRotate||!this.chart.getDataVisibility(e)||r._parsed[e]===null||r.data[e].hidden?0:this.calculateCircumference(r._parsed[e]*i/Ue)}updateElements(e,n,s,r){const i=r==="reset",o=this.chart,a=o.chartArea,u=o.options.animation,d=(a.left+a.right)/2,f=(a.top+a.bottom)/2,h=i&&u.animateScale,m=h?0:this.innerRadius,g=h?0:this.outerRadius,{sharedOptions:x,includeOptions:v}=this._getSharedOptions(n,r);let b=this._getRotation(),p;for(p=0;p<n;++p)b+=this._circumference(p,i);for(p=n;p<n+s;++p){const y=this._circumference(p,i),_=e[p],j={x:d+this.offsetX,y:f+this.offsetY,startAngle:b,endAngle:b+y,circumference:y,outerRadius:g,innerRadius:m};v&&(j.options=x||this.resolveDataElementOptions(p,_.active?"active":r)),b+=y,this.updateElement(_,p,j,r)}}calculateTotal(){const e=this._cachedMeta,n=e.data;let s=0,r;for(r=0;r<n.length;r++){const i=e._parsed[r];i!==null&&!isNaN(i)&&this.chart.getDataVisibility(r)&&!n[r].hidden&&(s+=Math.abs(i))}return s}calculateCircumference(e){const n=this._cachedMeta.total;return n>0&&!isNaN(e)?Ue*(Math.abs(e)/n):0}getLabelAndValue(e){const n=this._cachedMeta,s=this.chart,r=s.data.labels||[],i=th(n._parsed[e],s.options.locale);return{label:r[e]||"",value:i}}getMaxBorderWidth(e){let n=0;const s=this.chart;let r,i,o,a,c;if(!e){for(r=0,i=s.data.datasets.length;r<i;++r)if(s.isDatasetVisible(r)){o=s.getDatasetMeta(r),e=o.data,a=o.controller;break}}if(!e)return 0;for(r=0,i=e.length;r<i;++r)c=a.resolveDataElementOptions(r),c.borderAlign!=="inner"&&(n=Math.max(n,c.borderWidth||0,c.hoverBorderWidth||0));return n}getMaxOffset(e){let n=0;for(let s=0,r=e.length;s<r;++s){const i=this.resolveDataElementOptions(s);n=Math.max(n,i.offset||0,i.hoverOffset||0)}return n}_getRingWeightOffset(e){let n=0;for(let s=0;s<e;++s)this.chart.isDatasetVisible(s)&&(n+=this._getRingWeight(s));return n}_getRingWeight(e){return Math.max(xe(this.chart.data.datasets[e].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}ee(Bi,"id","doughnut"),ee(Bi,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),ee(Bi,"descriptors",{_scriptable:e=>e!=="spacing",_indexable:e=>e!=="spacing"&&!e.startsWith("borderDash")&&!e.startsWith("hoverBorderDash")}),ee(Bi,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(e){const n=e.data,{labels:{pointStyle:s,textAlign:r,color:i,useBorderRadius:o,borderRadius:a}}=e.legend.options;return n.labels.length&&n.datasets.length?n.labels.map((c,u)=>{const f=e.getDatasetMeta(0).controller.getStyle(u);return{text:c,fillStyle:f.backgroundColor,fontColor:i,hidden:!e.getDataVisibility(u),lineDash:f.borderDash,lineDashOffset:f.borderDashOffset,lineJoin:f.borderJoinStyle,lineWidth:f.borderWidth,strokeStyle:f.borderColor,textAlign:r,pointStyle:s,borderRadius:o&&(a||f.borderRadius),index:u}}):[]}},onClick(e,n,s){s.chart.toggleDataVisibility(n.index),s.chart.update()}}}});class Ya extends lr{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(e){const n=this._cachedMeta,{dataset:s,data:r=[],_dataset:i}=n,o=this.chart._animationsDisabled;let{start:a,count:c}=US(n,r,o);this._drawStart=a,this._drawCount=c,WS(n)&&(a=0,c=r.length),s._chart=this.chart,s._datasetIndex=this.index,s._decimated=!!i._decimated,s.points=r;const u=this.resolveDatasetElementOptions(e);this.options.showLine||(u.borderWidth=0),u.segment=this.options.segment,this.updateElement(s,void 0,{animated:!o,options:u},e),this.updateElements(r,a,c,e)}updateElements(e,n,s,r){const i=r==="reset",{iScale:o,vScale:a,_stacked:c,_dataset:u}=this._cachedMeta,{sharedOptions:d,includeOptions:f}=this._getSharedOptions(n,r),h=o.axis,m=a.axis,{spanGaps:g,segment:x}=this.options,v=Mo(g)?g:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||i||r==="none",p=n+s,y=e.length;let _=n>0&&this.getParsed(n-1);for(let j=0;j<y;++j){const N=e[j],C=b?N:{};if(j<n||j>=p){C.skip=!0;continue}const w=this.getParsed(j),k=_e(w[m]),S=C[h]=o.getPixelForValue(w[h],j),P=C[m]=i||k?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,w,c):w[m],j);C.skip=isNaN(S)||isNaN(P)||k,C.stop=j>0&&Math.abs(w[h]-_[h])>v,x&&(C.parsed=w,C.raw=u.data[j]),f&&(C.options=d||this.resolveDataElementOptions(j,N.active?"active":r)),b||this.updateElement(N,j,C,r),_=w}}getMaxOverflow(){const e=this._cachedMeta,n=e.dataset,s=n.options&&n.options.borderWidth||0,r=e.data||[];if(!r.length)return s;const i=r[0].size(this.resolveDataElementOptions(0)),o=r[r.length-1].size(this.resolveDataElementOptions(r.length-1));return Math.max(s,i,o)/2}draw(){const e=this._cachedMeta;e.dataset.updateControlPoints(this.chart.chartArea,e.iScale.axis),super.draw()}}ee(Ya,"id","line"),ee(Ya,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),ee(Ya,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});function Ys(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class lh{constructor(e){ee(this,"options");this.options=e||{}}static override(e){Object.assign(lh.prototype,e)}init(){}formats(){return Ys()}parse(){return Ys()}format(){return Ys()}add(){return Ys()}diff(){return Ys()}startOf(){return Ys()}endOf(){return Ys()}}var mN={_date:lh};function gN(t,e,n,s){const{controller:r,data:i,_sorted:o}=t,a=r._cachedMeta.iScale,c=t.dataset&&t.dataset.options?t.dataset.options.spanGaps:null;if(a&&e===a.axis&&e!=="r"&&o&&i.length){const u=a._reversePixels?FS:nr;if(s){if(r._sharedOptions){const d=i[0],f=typeof d.getRange=="function"&&d.getRange(e);if(f){const h=u(i,e,n-f),m=u(i,e,n+f);return{lo:h.lo,hi:m.hi}}}}else{const d=u(i,e,n);if(c){const{vScale:f}=r._cachedMeta,{_parsed:h}=t,m=h.slice(0,d.lo+1).reverse().findIndex(x=>!_e(x[f.axis]));d.lo-=Math.max(0,m);const g=h.slice(d.hi).findIndex(x=>!_e(x[f.axis]));d.hi+=Math.max(0,g)}return d}}return{lo:0,hi:i.length-1}}function cc(t,e,n,s,r){const i=t.getSortedVisibleDatasetMetas(),o=n[e];for(let a=0,c=i.length;a<c;++a){const{index:u,data:d}=i[a],{lo:f,hi:h}=gN(i[a],e,o,r);for(let m=f;m<=h;++m){const g=d[m];g.skip||s(g,u,m)}}}function xN(t){const e=t.indexOf("x")!==-1,n=t.indexOf("y")!==-1;return function(s,r){const i=e?Math.abs(s.x-r.x):0,o=n?Math.abs(s.y-r.y):0;return Math.sqrt(Math.pow(i,2)+Math.pow(o,2))}}function Jc(t,e,n,s,r){const i=[];return!r&&!t.isPointInArea(e)||cc(t,n,e,function(a,c,u){!r&&!Do(a,t.chartArea,0)||a.inRange(e.x,e.y,s)&&i.push({element:a,datasetIndex:c,index:u})},!0),i}function yN(t,e,n,s){let r=[];function i(o,a,c){const{startAngle:u,endAngle:d}=o.getProps(["startAngle","endAngle"],s),{angle:f}=n1(o,{x:e.x,y:e.y});Po(f,u,d)&&r.push({element:o,datasetIndex:a,index:c})}return cc(t,n,e,i),r}function vN(t,e,n,s,r,i){let o=[];const a=xN(n);let c=Number.POSITIVE_INFINITY;function u(d,f,h){const m=d.inRange(e.x,e.y,r);if(s&&!m)return;const g=d.getCenterPoint(r);if(!(!!i||t.isPointInArea(g))&&!m)return;const v=a(e,g);v<c?(o=[{element:d,datasetIndex:f,index:h}],c=v):v===c&&o.push({element:d,datasetIndex:f,index:h})}return cc(t,n,e,u),o}function eu(t,e,n,s,r,i){return!i&&!t.isPointInArea(e)?[]:n==="r"&&!s?yN(t,e,n,r):vN(t,e,n,s,r,i)}function Vm(t,e,n,s,r){const i=[],o=n==="x"?"inXRange":"inYRange";let a=!1;return cc(t,n,e,(c,u,d)=>{c[o]&&c[o](e[n],r)&&(i.push({element:c,datasetIndex:u,index:d}),a=a||c.inRange(e.x,e.y,r))}),s&&!a?[]:i}var bN={modes:{index(t,e,n,s){const r=Xs(e,t),i=n.axis||"x",o=n.includeInvisible||!1,a=n.intersect?Jc(t,r,i,s,o):eu(t,r,i,!1,s,o),c=[];return a.length?(t.getSortedVisibleDatasetMetas().forEach(u=>{const d=a[0].index,f=u.data[d];f&&!f.skip&&c.push({element:f,datasetIndex:u.index,index:d})}),c):[]},dataset(t,e,n,s){const r=Xs(e,t),i=n.axis||"xy",o=n.includeInvisible||!1;let a=n.intersect?Jc(t,r,i,s,o):eu(t,r,i,!1,s,o);if(a.length>0){const c=a[0].datasetIndex,u=t.getDatasetMeta(c).data;a=[];for(let d=0;d<u.length;++d)a.push({element:u[d],datasetIndex:c,index:d})}return a},point(t,e,n,s){const r=Xs(e,t),i=n.axis||"xy",o=n.includeInvisible||!1;return Jc(t,r,i,s,o)},nearest(t,e,n,s){const r=Xs(e,t),i=n.axis||"xy",o=n.includeInvisible||!1;return eu(t,r,i,n.intersect,s,o)},x(t,e,n,s){const r=Xs(e,t);return Vm(t,r,"x",n.intersect,s)},y(t,e,n,s){const r=Xs(e,t);return Vm(t,r,"y",n.intersect,s)}}};const S1=["left","top","right","bottom"];function Ni(t,e){return t.filter(n=>n.pos===e)}function Hm(t,e){return t.filter(n=>S1.indexOf(n.pos)===-1&&n.box.axis===e)}function Ci(t,e){return t.sort((n,s)=>{const r=e?s:n,i=e?n:s;return r.weight===i.weight?r.index-i.index:r.weight-i.weight})}function wN(t){const e=[];let n,s,r,i,o,a;for(n=0,s=(t||[]).length;n<s;++n)r=t[n],{position:i,options:{stack:o,stackWeight:a=1}}=r,e.push({index:n,box:r,pos:i,horizontal:r.isHorizontal(),weight:r.weight,stack:o&&i+o,stackWeight:a});return e}function kN(t){const e={};for(const n of t){const{stack:s,pos:r,stackWeight:i}=n;if(!s||!S1.includes(r))continue;const o=e[s]||(e[s]={count:0,placed:0,weight:0,size:0});o.count++,o.weight+=i}return e}function jN(t,e){const n=kN(t),{vBoxMaxWidth:s,hBoxMaxHeight:r}=e;let i,o,a;for(i=0,o=t.length;i<o;++i){a=t[i];const{fullSize:c}=a.box,u=n[a.stack],d=u&&a.stackWeight/u.weight;a.horizontal?(a.width=d?d*s:c&&e.availableWidth,a.height=r):(a.width=s,a.height=d?d*r:c&&e.availableHeight)}return n}function SN(t){const e=wN(t),n=Ci(e.filter(u=>u.box.fullSize),!0),s=Ci(Ni(e,"left"),!0),r=Ci(Ni(e,"right")),i=Ci(Ni(e,"top"),!0),o=Ci(Ni(e,"bottom")),a=Hm(e,"x"),c=Hm(e,"y");return{fullSize:n,leftAndTop:s.concat(i),rightAndBottom:r.concat(c).concat(o).concat(a),chartArea:Ni(e,"chartArea"),vertical:s.concat(r).concat(c),horizontal:i.concat(o).concat(a)}}function Ym(t,e,n,s){return Math.max(t[n],e[n])+Math.max(t[s],e[s])}function _1(t,e){t.top=Math.max(t.top,e.top),t.left=Math.max(t.left,e.left),t.bottom=Math.max(t.bottom,e.bottom),t.right=Math.max(t.right,e.right)}function _N(t,e,n,s){const{pos:r,box:i}=n,o=t.maxPadding;if(!ve(r)){n.size&&(t[r]-=n.size);const f=s[n.stack]||{size:0,count:1};f.size=Math.max(f.size,n.horizontal?i.height:i.width),n.size=f.size/f.count,t[r]+=n.size}i.getPadding&&_1(o,i.getPadding());const a=Math.max(0,e.outerWidth-Ym(o,t,"left","right")),c=Math.max(0,e.outerHeight-Ym(o,t,"top","bottom")),u=a!==t.w,d=c!==t.h;return t.w=a,t.h=c,n.horizontal?{same:u,other:d}:{same:d,other:u}}function NN(t){const e=t.maxPadding;function n(s){const r=Math.max(e[s]-t[s],0);return t[s]+=r,r}t.y+=n("top"),t.x+=n("left"),n("right"),n("bottom")}function CN(t,e){const n=e.maxPadding;function s(r){const i={left:0,top:0,right:0,bottom:0};return r.forEach(o=>{i[o]=Math.max(e[o],n[o])}),i}return s(t?["left","right"]:["top","bottom"])}function $i(t,e,n,s){const r=[];let i,o,a,c,u,d;for(i=0,o=t.length,u=0;i<o;++i){a=t[i],c=a.box,c.update(a.width||e.w,a.height||e.h,CN(a.horizontal,e));const{same:f,other:h}=_N(e,n,a,s);u|=f&&r.length,d=d||h,c.fullSize||r.push(a)}return u&&$i(r,e,n,s)||d}function ja(t,e,n,s,r){t.top=n,t.left=e,t.right=e+s,t.bottom=n+r,t.width=s,t.height=r}function Km(t,e,n,s){const r=n.padding;let{x:i,y:o}=e;for(const a of t){const c=a.box,u=s[a.stack]||{placed:0,weight:1},d=a.stackWeight/u.weight||1;if(a.horizontal){const f=e.w*d,h=u.size||c.height;Eo(u.start)&&(o=u.start),c.fullSize?ja(c,r.left,o,n.outerWidth-r.right-r.left,h):ja(c,e.left+u.placed,o,f,h),u.start=o,u.placed+=f,o=c.bottom}else{const f=e.h*d,h=u.size||c.width;Eo(u.start)&&(i=u.start),c.fullSize?ja(c,i,r.top,h,n.outerHeight-r.bottom-r.top):ja(c,i,e.top+u.placed,h,f),u.start=i,u.placed+=f,i=c.right}}e.x=i,e.y=o}var un={addBox(t,e){t.boxes||(t.boxes=[]),e.fullSize=e.fullSize||!1,e.position=e.position||"top",e.weight=e.weight||0,e._layers=e._layers||function(){return[{z:0,draw(n){e.draw(n)}}]},t.boxes.push(e)},removeBox(t,e){const n=t.boxes?t.boxes.indexOf(e):-1;n!==-1&&t.boxes.splice(n,1)},configure(t,e,n){e.fullSize=n.fullSize,e.position=n.position,e.weight=n.weight},update(t,e,n,s){if(!t)return;const r=mn(t.options.layout.padding),i=Math.max(e-r.width,0),o=Math.max(n-r.height,0),a=SN(t.boxes),c=a.vertical,u=a.horizontal;Ne(t.boxes,x=>{typeof x.beforeLayout=="function"&&x.beforeLayout()});const d=c.reduce((x,v)=>v.box.options&&v.box.options.display===!1?x:x+1,0)||1,f=Object.freeze({outerWidth:e,outerHeight:n,padding:r,availableWidth:i,availableHeight:o,vBoxMaxWidth:i/2/d,hBoxMaxHeight:o/2}),h=Object.assign({},r);_1(h,mn(s));const m=Object.assign({maxPadding:h,w:i,h:o,x:r.left,y:r.top},r),g=jN(c.concat(u),f);$i(a.fullSize,m,f,g),$i(c,m,f,g),$i(u,m,f,g)&&$i(c,m,f,g),NN(m),Km(a.leftAndTop,m,f,g),m.x+=m.w,m.y+=m.h,Km(a.rightAndBottom,m,f,g),t.chartArea={left:m.left,top:m.top,right:m.left+m.w,bottom:m.top+m.h,height:m.h,width:m.w},Ne(a.chartArea,x=>{const v=x.box;Object.assign(v,t.chartArea),v.update(m.w,m.h,{left:0,top:0,right:0,bottom:0})})}};class N1{acquireContext(e,n){}releaseContext(e){return!1}addEventListener(e,n,s){}removeEventListener(e,n,s){}getDevicePixelRatio(){return 1}getMaximumSize(e,n,s,r){return n=Math.max(0,n||e.width),s=s||e.height,{width:n,height:Math.max(0,r?Math.floor(n/r):s)}}isAttached(e){return!0}updateConfig(e){}}class EN extends N1{acquireContext(e){return e&&e.getContext&&e.getContext("2d")||null}updateConfig(e){e.options.animation=!1}}const Ka="$chartjs",MN={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Gm=t=>t===null||t==="";function PN(t,e){const n=t.style,s=t.getAttribute("height"),r=t.getAttribute("width");if(t[Ka]={initial:{height:s,width:r,style:{display:n.display,height:n.height,width:n.width}}},n.display=n.display||"block",n.boxSizing=n.boxSizing||"border-box",Gm(r)){const i=Dm(t,"width");i!==void 0&&(t.width=i)}if(Gm(s))if(t.style.height==="")t.height=t.width/(e||2);else{const i=Dm(t,"height");i!==void 0&&(t.height=i)}return t}const C1=A_?{passive:!0}:!1;function DN(t,e,n){t&&t.addEventListener(e,n,C1)}function AN(t,e,n){t&&t.canvas&&t.canvas.removeEventListener(e,n,C1)}function ON(t,e){const n=MN[t.type]||t.type,{x:s,y:r}=Xs(t,e);return{type:n,chart:e,native:t,x:s!==void 0?s:null,y:r!==void 0?r:null}}function Pl(t,e){for(const n of t)if(n===e||n.contains(e))return!0}function TN(t,e,n){const s=t.canvas,r=new MutationObserver(i=>{let o=!1;for(const a of i)o=o||Pl(a.addedNodes,s),o=o&&!Pl(a.removedNodes,s);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}function zN(t,e,n){const s=t.canvas,r=new MutationObserver(i=>{let o=!1;for(const a of i)o=o||Pl(a.removedNodes,s),o=o&&!Pl(a.addedNodes,s);o&&n()});return r.observe(document,{childList:!0,subtree:!0}),r}const Oo=new Map;let qm=0;function E1(){const t=window.devicePixelRatio;t!==qm&&(qm=t,Oo.forEach((e,n)=>{n.currentDevicePixelRatio!==t&&e()}))}function IN(t,e){Oo.size||window.addEventListener("resize",E1),Oo.set(t,e)}function FN(t){Oo.delete(t),Oo.size||window.removeEventListener("resize",E1)}function RN(t,e,n){const s=t.canvas,r=s&&ah(s);if(!r)return;const i=o1((a,c)=>{const u=r.clientWidth;n(a,c),u<r.clientWidth&&n()},window),o=new ResizeObserver(a=>{const c=a[0],u=c.contentRect.width,d=c.contentRect.height;u===0&&d===0||i(u,d)});return o.observe(r),IN(t,i),o}function tu(t,e,n){n&&n.disconnect(),e==="resize"&&FN(t)}function LN(t,e,n){const s=t.canvas,r=o1(i=>{t.ctx!==null&&n(ON(i,t))},t);return DN(s,e,r),r}class BN extends N1{acquireContext(e,n){const s=e&&e.getContext&&e.getContext("2d");return s&&s.canvas===e?(PN(e,n),s):null}releaseContext(e){const n=e.canvas;if(!n[Ka])return!1;const s=n[Ka].initial;["height","width"].forEach(i=>{const o=s[i];_e(o)?n.removeAttribute(i):n.setAttribute(i,o)});const r=s.style||{};return Object.keys(r).forEach(i=>{n.style[i]=r[i]}),n.width=n.width,delete n[Ka],!0}addEventListener(e,n,s){this.removeEventListener(e,n);const r=e.$proxies||(e.$proxies={}),o={attach:TN,detach:zN,resize:RN}[n]||LN;r[n]=o(e,n,s)}removeEventListener(e,n){const s=e.$proxies||(e.$proxies={}),r=s[n];if(!r)return;({attach:tu,detach:tu,resize:tu}[n]||AN)(e,n,r),s[n]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(e,n,s,r){return D_(e,n,s,r)}isAttached(e){const n=e&&ah(e);return!!(n&&n.isConnected)}}function $N(t){return!oh()||typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas?EN:BN}class Sn{constructor(){ee(this,"x");ee(this,"y");ee(this,"active",!1);ee(this,"options");ee(this,"$animations")}tooltipPosition(e){const{x:n,y:s}=this.getProps(["x","y"],e);return{x:n,y:s}}hasValue(){return Mo(this.x)&&Mo(this.y)}getProps(e,n){const s=this.$animations;if(!n||!s)return this;const r={};return e.forEach(i=>{r[i]=s[i]&&s[i].active()?s[i]._to:this[i]}),r}}ee(Sn,"defaults",{}),ee(Sn,"defaultRoutes");function UN(t,e){const n=t.options.ticks,s=WN(t),r=Math.min(n.maxTicksLimit||s,s),i=n.major.enabled?HN(e):[],o=i.length,a=i[0],c=i[o-1],u=[];if(o>r)return YN(e,u,i,o/r),u;const d=VN(i,e,r);if(o>0){let f,h;const m=o>1?Math.round((c-a)/(o-1)):null;for(Sa(e,u,d,_e(m)?0:a-m,a),f=0,h=o-1;f<h;f++)Sa(e,u,d,i[f],i[f+1]);return Sa(e,u,d,c,_e(m)?e.length:c+m),u}return Sa(e,u,d),u}function WN(t){const e=t.options.offset,n=t._tickSize(),s=t._length/n+(e?0:1),r=t._maxLength/n;return Math.floor(Math.min(s,r))}function VN(t,e,n){const s=KN(t),r=e.length/n;if(!s)return Math.max(r,1);const i=PS(s);for(let o=0,a=i.length-1;o<a;o++){const c=i[o];if(c>r)return c}return Math.max(r,1)}function HN(t){const e=[];let n,s;for(n=0,s=t.length;n<s;n++)t[n].major&&e.push(n);return e}function YN(t,e,n,s){let r=0,i=n[0],o;for(s=Math.ceil(s),o=0;o<t.length;o++)o===i&&(e.push(t[o]),r++,i=n[r*s])}function Sa(t,e,n,s,r){const i=xe(s,0),o=Math.min(xe(r,t.length),t.length);let a=0,c,u,d;for(n=Math.ceil(n),r&&(c=r-s,n=c/Math.floor(c/n)),d=i;d<0;)a++,d=Math.round(i+a*n);for(u=Math.max(i,0);u<o;u++)u===d&&(e.push(t[u]),a++,d=Math.round(i+a*n))}function KN(t){const e=t.length;let n,s;if(e<2)return!1;for(s=t[0],n=1;n<e;++n)if(t[n]-t[n-1]!==s)return!1;return s}const GN=t=>t==="left"?"right":t==="right"?"left":t,Xm=(t,e,n)=>e==="top"||e==="left"?t[e]+n:t[e]-n,Qm=(t,e)=>Math.min(e||t,t);function Zm(t,e){const n=[],s=t.length/e,r=t.length;let i=0;for(;i<r;i+=s)n.push(t[Math.floor(i)]);return n}function qN(t,e,n){const s=t.ticks.length,r=Math.min(e,s-1),i=t._startPixel,o=t._endPixel,a=1e-6;let c=t.getPixelForTick(r),u;if(!(n&&(s===1?u=Math.max(c-i,o-c):e===0?u=(t.getPixelForTick(1)-c)/2:u=(c-t.getPixelForTick(r-1))/2,c+=r<e?u:-u,c<i-a||c>o+a)))return c}function XN(t,e){Ne(t,n=>{const s=n.gc,r=s.length/2;let i;if(r>e){for(i=0;i<r;++i)delete n.data[s[i]];s.splice(0,r)}})}function Ei(t){return t.drawTicks?t.tickLength:0}function Jm(t,e){if(!t.display)return 0;const n=_t(t.font,e),s=mn(t.padding);return(st(t.text)?t.text.length:1)*n.lineHeight+s.height}function QN(t,e){return br(t,{scale:e,type:"scale"})}function ZN(t,e,n){return br(t,{tick:n,index:e,type:"tick"})}function JN(t,e,n){let s=Jf(t);return(n&&e!=="right"||!n&&e==="right")&&(s=GN(s)),s}function e2(t,e,n,s){const{top:r,left:i,bottom:o,right:a,chart:c}=t,{chartArea:u,scales:d}=c;let f=0,h,m,g;const x=o-r,v=a-i;if(t.isHorizontal()){if(m=kt(s,i,a),ve(n)){const b=Object.keys(n)[0],p=n[b];g=d[b].getPixelForValue(p)+x-e}else n==="center"?g=(u.bottom+u.top)/2+x-e:g=Xm(t,n,e);h=a-i}else{if(ve(n)){const b=Object.keys(n)[0],p=n[b];m=d[b].getPixelForValue(p)-v+e}else n==="center"?m=(u.left+u.right)/2-v+e:m=Xm(t,n,e);g=kt(s,o,r),f=n==="left"?-ct:ct}return{titleX:m,titleY:g,maxWidth:h,rotation:f}}class hi extends Sn{constructor(e){super(),this.id=e.id,this.type=e.type,this.options=void 0,this.ctx=e.ctx,this.chart=e.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(e){this.options=e.setContext(this.getContext()),this.axis=e.axis,this._userMin=this.parse(e.min),this._userMax=this.parse(e.max),this._suggestedMin=this.parse(e.suggestedMin),this._suggestedMax=this.parse(e.suggestedMax)}parse(e,n){return e}getUserBounds(){let{_userMin:e,_userMax:n,_suggestedMin:s,_suggestedMax:r}=this;return e=Nn(e,Number.POSITIVE_INFINITY),n=Nn(n,Number.NEGATIVE_INFINITY),s=Nn(s,Number.POSITIVE_INFINITY),r=Nn(r,Number.NEGATIVE_INFINITY),{min:Nn(e,s),max:Nn(n,r),minDefined:Et(e),maxDefined:Et(n)}}getMinMax(e){let{min:n,max:s,minDefined:r,maxDefined:i}=this.getUserBounds(),o;if(r&&i)return{min:n,max:s};const a=this.getMatchingVisibleMetas();for(let c=0,u=a.length;c<u;++c)o=a[c].controller.getMinMax(this,e),r||(n=Math.min(n,o.min)),i||(s=Math.max(s,o.max));return n=i&&n>s?s:n,s=r&&n>s?n:s,{min:Nn(n,Nn(s,n)),max:Nn(s,Nn(n,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const e=this.chart.data;return this.options.labels||(this.isHorizontal()?e.xLabels:e.yLabels)||e.labels||[]}getLabelItems(e=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(e))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){ze(this.options.beforeUpdate,[this])}update(e,n,s){const{beginAtZero:r,grace:i,ticks:o}=this.options,a=o.sampleSize;this.beforeUpdate(),this.maxWidth=e,this.maxHeight=n,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=c_(this,i,r),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?Zm(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),o.display&&(o.autoSkip||o.source==="auto")&&(this.ticks=UN(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let e=this.options.reverse,n,s;this.isHorizontal()?(n=this.left,s=this.right):(n=this.top,s=this.bottom,e=!e),this._startPixel=n,this._endPixel=s,this._reversePixels=e,this._length=s-n,this._alignToPixels=this.options.alignToPixels}afterUpdate(){ze(this.options.afterUpdate,[this])}beforeSetDimensions(){ze(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){ze(this.options.afterSetDimensions,[this])}_callHooks(e){this.chart.notifyPlugins(e,this.getContext()),ze(this.options[e],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){ze(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(e){const n=this.options.ticks;let s,r,i;for(s=0,r=e.length;s<r;s++)i=e[s],i.label=ze(n.callback,[i.value,s,e],this)}afterTickToLabelConversion(){ze(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){ze(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const e=this.options,n=e.ticks,s=Qm(this.ticks.length,e.ticks.maxTicksLimit),r=n.minRotation||0,i=n.maxRotation;let o=r,a,c,u;if(!this._isVisible()||!n.display||r>=i||s<=1||!this.isHorizontal()){this.labelRotation=r;return}const d=this._getLabelSizes(),f=d.widest.width,h=d.highest.height,m=St(this.chart.width-f,0,this.maxWidth);a=e.offset?this.maxWidth/s:m/(s-1),f+6>a&&(a=m/(s-(e.offset?.5:1)),c=this.maxHeight-Ei(e.grid)-n.padding-Jm(e.title,this.chart.options.font),u=Math.sqrt(f*f+h*h),o=TS(Math.min(Math.asin(St((d.highest.height+6)/a,-1,1)),Math.asin(St(c/u,-1,1))-Math.asin(St(h/u,-1,1)))),o=Math.max(r,Math.min(i,o))),this.labelRotation=o}afterCalculateLabelRotation(){ze(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){ze(this.options.beforeFit,[this])}fit(){const e={width:0,height:0},{chart:n,options:{ticks:s,title:r,grid:i}}=this,o=this._isVisible(),a=this.isHorizontal();if(o){const c=Jm(r,n.options.font);if(a?(e.width=this.maxWidth,e.height=Ei(i)+c):(e.height=this.maxHeight,e.width=Ei(i)+c),s.display&&this.ticks.length){const{first:u,last:d,widest:f,highest:h}=this._getLabelSizes(),m=s.padding*2,g=Gn(this.labelRotation),x=Math.cos(g),v=Math.sin(g);if(a){const b=s.mirror?0:v*f.width+x*h.height;e.height=Math.min(this.maxHeight,e.height+b+m)}else{const b=s.mirror?0:x*f.width+v*h.height;e.width=Math.min(this.maxWidth,e.width+b+m)}this._calculatePadding(u,d,v,x)}}this._handleMargins(),a?(this.width=this._length=n.width-this._margins.left-this._margins.right,this.height=e.height):(this.width=e.width,this.height=this._length=n.height-this._margins.top-this._margins.bottom)}_calculatePadding(e,n,s,r){const{ticks:{align:i,padding:o},position:a}=this.options,c=this.labelRotation!==0,u=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,f=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,m=0;c?u?(h=r*e.width,m=s*n.height):(h=s*e.height,m=r*n.width):i==="start"?m=n.width:i==="end"?h=e.width:i!=="inner"&&(h=e.width/2,m=n.width/2),this.paddingLeft=Math.max((h-d+o)*this.width/(this.width-d),0),this.paddingRight=Math.max((m-f+o)*this.width/(this.width-f),0)}else{let d=n.height/2,f=e.height/2;i==="start"?(d=0,f=e.height):i==="end"&&(d=n.height,f=0),this.paddingTop=d+o,this.paddingBottom=f+o}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){ze(this.options.afterFit,[this])}isHorizontal(){const{axis:e,position:n}=this.options;return n==="top"||n==="bottom"||e==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(e){this.beforeTickToLabelConversion(),this.generateTickLabels(e);let n,s;for(n=0,s=e.length;n<s;n++)_e(e[n].label)&&(e.splice(n,1),s--,n--);this.afterTickToLabelConversion()}_getLabelSizes(){let e=this._labelSizes;if(!e){const n=this.options.ticks.sampleSize;let s=this.ticks;n<s.length&&(s=Zm(s,n)),this._labelSizes=e=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return e}_computeLabelSizes(e,n,s){const{ctx:r,_longestTextCache:i}=this,o=[],a=[],c=Math.floor(n/Qm(n,s));let u=0,d=0,f,h,m,g,x,v,b,p,y,_,j;for(f=0;f<n;f+=c){if(g=e[f].label,x=this._resolveTickFontOptions(f),r.font=v=x.string,b=i[v]=i[v]||{data:{},gc:[]},p=x.lineHeight,y=_=0,!_e(g)&&!st(g))y=Nm(r,b.data,b.gc,y,g),_=p;else if(st(g))for(h=0,m=g.length;h<m;++h)j=g[h],!_e(j)&&!st(j)&&(y=Nm(r,b.data,b.gc,y,j),_+=p);o.push(y),a.push(_),u=Math.max(y,u),d=Math.max(_,d)}XN(i,n);const N=o.indexOf(u),C=a.indexOf(d),w=k=>({width:o[k]||0,height:a[k]||0});return{first:w(0),last:w(n-1),widest:w(N),highest:w(C),widths:o,heights:a}}getLabelForValue(e){return e}getPixelForValue(e,n){return NaN}getValueForPixel(e){}getPixelForTick(e){const n=this.ticks;return e<0||e>n.length-1?null:this.getPixelForValue(n[e].value)}getPixelForDecimal(e){this._reversePixels&&(e=1-e);const n=this._startPixel+e*this._length;return IS(this._alignToPixels?Hs(this.chart,n,0):n)}getDecimalForPixel(e){const n=(e-this._startPixel)/this._length;return this._reversePixels?1-n:n}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:e,max:n}=this;return e<0&&n<0?n:e>0&&n>0?e:0}getContext(e){const n=this.ticks||[];if(e>=0&&e<n.length){const s=n[e];return s.$context||(s.$context=ZN(this.getContext(),e,s))}return this.$context||(this.$context=QN(this.chart.getContext(),this))}_tickSize(){const e=this.options.ticks,n=Gn(this.labelRotation),s=Math.abs(Math.cos(n)),r=Math.abs(Math.sin(n)),i=this._getLabelSizes(),o=e.autoSkipPadding||0,a=i?i.widest.width+o:0,c=i?i.highest.height+o:0;return this.isHorizontal()?c*s>a*r?a/s:c/r:c*r<a*s?c/s:a/r}_isVisible(){const e=this.options.display;return e!=="auto"?!!e:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(e){const n=this.axis,s=this.chart,r=this.options,{grid:i,position:o,border:a}=r,c=i.offset,u=this.isHorizontal(),f=this.ticks.length+(c?1:0),h=Ei(i),m=[],g=a.setContext(this.getContext()),x=g.display?g.width:0,v=x/2,b=function($){return Hs(s,$,x)};let p,y,_,j,N,C,w,k,S,P,O,A;if(o==="top")p=b(this.bottom),C=this.bottom-h,k=p-v,P=b(e.top)+v,A=e.bottom;else if(o==="bottom")p=b(this.top),P=e.top,A=b(e.bottom)-v,C=p+v,k=this.top+h;else if(o==="left")p=b(this.right),N=this.right-h,w=p-v,S=b(e.left)+v,O=e.right;else if(o==="right")p=b(this.left),S=e.left,O=b(e.right)-v,N=p+v,w=this.left+h;else if(n==="x"){if(o==="center")p=b((e.top+e.bottom)/2+.5);else if(ve(o)){const $=Object.keys(o)[0],D=o[$];p=b(this.chart.scales[$].getPixelForValue(D))}P=e.top,A=e.bottom,C=p+v,k=C+h}else if(n==="y"){if(o==="center")p=b((e.left+e.right)/2);else if(ve(o)){const $=Object.keys(o)[0],D=o[$];p=b(this.chart.scales[$].getPixelForValue(D))}N=p-v,w=N-h,S=e.left,O=e.right}const U=xe(r.ticks.maxTicksLimit,f),L=Math.max(1,Math.ceil(f/U));for(y=0;y<f;y+=L){const $=this.getContext(y),D=i.setContext($),z=a.setContext($),M=D.lineWidth,T=D.color,I=z.dash||[],R=z.dashOffset,B=D.tickWidth,K=D.tickColor,se=D.tickBorderDash||[],ce=D.tickBorderDashOffset;_=qN(this,y,c),_!==void 0&&(j=Hs(s,_,M),u?N=w=S=O=j:C=k=P=A=j,m.push({tx1:N,ty1:C,tx2:w,ty2:k,x1:S,y1:P,x2:O,y2:A,width:M,color:T,borderDash:I,borderDashOffset:R,tickWidth:B,tickColor:K,tickBorderDash:se,tickBorderDashOffset:ce}))}return this._ticksLength=f,this._borderValue=p,m}_computeLabelItems(e){const n=this.axis,s=this.options,{position:r,ticks:i}=s,o=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:u,padding:d,mirror:f}=i,h=Ei(s.grid),m=h+d,g=f?-d:m,x=-Gn(this.labelRotation),v=[];let b,p,y,_,j,N,C,w,k,S,P,O,A="middle";if(r==="top")N=this.bottom-g,C=this._getXAxisLabelAlignment();else if(r==="bottom")N=this.top+g,C=this._getXAxisLabelAlignment();else if(r==="left"){const L=this._getYAxisLabelAlignment(h);C=L.textAlign,j=L.x}else if(r==="right"){const L=this._getYAxisLabelAlignment(h);C=L.textAlign,j=L.x}else if(n==="x"){if(r==="center")N=(e.top+e.bottom)/2+m;else if(ve(r)){const L=Object.keys(r)[0],$=r[L];N=this.chart.scales[L].getPixelForValue($)+m}C=this._getXAxisLabelAlignment()}else if(n==="y"){if(r==="center")j=(e.left+e.right)/2-m;else if(ve(r)){const L=Object.keys(r)[0],$=r[L];j=this.chart.scales[L].getPixelForValue($)}C=this._getYAxisLabelAlignment(h).textAlign}n==="y"&&(c==="start"?A="top":c==="end"&&(A="bottom"));const U=this._getLabelSizes();for(b=0,p=a.length;b<p;++b){y=a[b],_=y.label;const L=i.setContext(this.getContext(b));w=this.getPixelForTick(b)+i.labelOffset,k=this._resolveTickFontOptions(b),S=k.lineHeight,P=st(_)?_.length:1;const $=P/2,D=L.color,z=L.textStrokeColor,M=L.textStrokeWidth;let T=C;o?(j=w,C==="inner"&&(b===p-1?T=this.options.reverse?"left":"right":b===0?T=this.options.reverse?"right":"left":T="center"),r==="top"?u==="near"||x!==0?O=-P*S+S/2:u==="center"?O=-U.highest.height/2-$*S+S:O=-U.highest.height+S/2:u==="near"||x!==0?O=S/2:u==="center"?O=U.highest.height/2-$*S:O=U.highest.height-P*S,f&&(O*=-1),x!==0&&!L.showLabelBackdrop&&(j+=S/2*Math.sin(x))):(N=w,O=(1-P)*S/2);let I;if(L.showLabelBackdrop){const R=mn(L.backdropPadding),B=U.heights[b],K=U.widths[b];let se=O-R.top,ce=0-R.left;switch(A){case"middle":se-=B/2;break;case"bottom":se-=B;break}switch(C){case"center":ce-=K/2;break;case"right":ce-=K;break;case"inner":b===p-1?ce-=K:b>0&&(ce-=K/2);break}I={left:ce,top:se,width:K+R.width,height:B+R.height,color:L.backdropColor}}v.push({label:_,font:k,textOffset:O,options:{rotation:x,color:D,strokeColor:z,strokeWidth:M,textAlign:T,textBaseline:A,translation:[j,N],backdrop:I}})}return v}_getXAxisLabelAlignment(){const{position:e,ticks:n}=this.options;if(-Gn(this.labelRotation))return e==="top"?"left":"right";let r="center";return n.align==="start"?r="left":n.align==="end"?r="right":n.align==="inner"&&(r="inner"),r}_getYAxisLabelAlignment(e){const{position:n,ticks:{crossAlign:s,mirror:r,padding:i}}=this.options,o=this._getLabelSizes(),a=e+i,c=o.widest.width;let u,d;return n==="left"?r?(d=this.right+i,s==="near"?u="left":s==="center"?(u="center",d+=c/2):(u="right",d+=c)):(d=this.right-a,s==="near"?u="right":s==="center"?(u="center",d-=c/2):(u="left",d=this.left)):n==="right"?r?(d=this.left+i,s==="near"?u="right":s==="center"?(u="center",d-=c/2):(u="left",d-=c)):(d=this.left+a,s==="near"?u="left":s==="center"?(u="center",d+=c/2):(u="right",d=this.right)):u="right",{textAlign:u,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const e=this.chart,n=this.options.position;if(n==="left"||n==="right")return{top:0,left:this.left,bottom:e.height,right:this.right};if(n==="top"||n==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:e.width}}drawBackground(){const{ctx:e,options:{backgroundColor:n},left:s,top:r,width:i,height:o}=this;n&&(e.save(),e.fillStyle=n,e.fillRect(s,r,i,o),e.restore())}getLineWidthForValue(e){const n=this.options.grid;if(!this._isVisible()||!n.display)return 0;const r=this.ticks.findIndex(i=>i.value===e);return r>=0?n.setContext(this.getContext(r)).lineWidth:0}drawGrid(e){const n=this.options.grid,s=this.ctx,r=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(e));let i,o;const a=(c,u,d)=>{!d.width||!d.color||(s.save(),s.lineWidth=d.width,s.strokeStyle=d.color,s.setLineDash(d.borderDash||[]),s.lineDashOffset=d.borderDashOffset,s.beginPath(),s.moveTo(c.x,c.y),s.lineTo(u.x,u.y),s.stroke(),s.restore())};if(n.display)for(i=0,o=r.length;i<o;++i){const c=r[i];n.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),n.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:e,ctx:n,options:{border:s,grid:r}}=this,i=s.setContext(this.getContext()),o=s.display?i.width:0;if(!o)return;const a=r.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let u,d,f,h;this.isHorizontal()?(u=Hs(e,this.left,o)-o/2,d=Hs(e,this.right,a)+a/2,f=h=c):(f=Hs(e,this.top,o)-o/2,h=Hs(e,this.bottom,a)+a/2,u=d=c),n.save(),n.lineWidth=i.width,n.strokeStyle=i.color,n.beginPath(),n.moveTo(u,f),n.lineTo(d,h),n.stroke(),n.restore()}drawLabels(e){if(!this.options.ticks.display)return;const s=this.ctx,r=this._computeLabelArea();r&&oc(s,r);const i=this.getLabelItems(e);for(const o of i){const a=o.options,c=o.font,u=o.label,d=o.textOffset;Ao(s,u,0,d,c,a)}r&&ac(s)}drawTitle(){const{ctx:e,options:{position:n,title:s,reverse:r}}=this;if(!s.display)return;const i=_t(s.font),o=mn(s.padding),a=s.align;let c=i.lineHeight/2;n==="bottom"||n==="center"||ve(n)?(c+=o.bottom,st(s.text)&&(c+=i.lineHeight*(s.text.length-1))):c+=o.top;const{titleX:u,titleY:d,maxWidth:f,rotation:h}=e2(this,c,n,a);Ao(e,s.text,0,0,i,{color:s.color,maxWidth:f,rotation:h,textAlign:JN(a,n,r),textBaseline:"middle",translation:[u,d]})}draw(e){this._isVisible()&&(this.drawBackground(),this.drawGrid(e),this.drawBorder(),this.drawTitle(),this.drawLabels(e))}_layers(){const e=this.options,n=e.ticks&&e.ticks.z||0,s=xe(e.grid&&e.grid.z,-1),r=xe(e.border&&e.border.z,0);return!this._isVisible()||this.draw!==hi.prototype.draw?[{z:n,draw:i=>{this.draw(i)}}]:[{z:s,draw:i=>{this.drawBackground(),this.drawGrid(i),this.drawTitle()}},{z:r,draw:()=>{this.drawBorder()}},{z:n,draw:i=>{this.drawLabels(i)}}]}getMatchingVisibleMetas(e){const n=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",r=[];let i,o;for(i=0,o=n.length;i<o;++i){const a=n[i];a[s]===this.id&&(!e||a.type===e)&&r.push(a)}return r}_resolveTickFontOptions(e){const n=this.options.ticks.setContext(this.getContext(e));return _t(n.font)}_maxDigits(){const e=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/e}}class _a{constructor(e,n,s){this.type=e,this.scope=n,this.override=s,this.items=Object.create(null)}isForType(e){return Object.prototype.isPrototypeOf.call(this.type.prototype,e.prototype)}register(e){const n=Object.getPrototypeOf(e);let s;s2(n)&&(s=this.register(n));const r=this.items,i=e.id,o=this.scope+"."+i;if(!i)throw new Error("class does not have id: "+e);return i in r||(r[i]=e,t2(e,o,s),this.override&&et.override(e.id,e.overrides)),o}get(e){return this.items[e]}unregister(e){const n=this.items,s=e.id,r=this.scope;s in n&&delete n[s],r&&s in et[r]&&(delete et[r][s],this.override&&delete mr[s])}}function t2(t,e,n){const s=Co(Object.create(null),[n?et.get(n):{},et.get(e),t.defaults]);et.set(e,s),t.defaultRoutes&&n2(e,t.defaultRoutes),t.descriptors&&et.describe(e,t.descriptors)}function n2(t,e){Object.keys(e).forEach(n=>{const s=n.split("."),r=s.pop(),i=[t].concat(s).join("."),o=e[n].split("."),a=o.pop(),c=o.join(".");et.route(i,r,c,a)})}function s2(t){return"id"in t&&"defaults"in t}class r2{constructor(){this.controllers=new _a(lr,"datasets",!0),this.elements=new _a(Sn,"elements"),this.plugins=new _a(Object,"plugins"),this.scales=new _a(hi,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...e){this._each("register",e)}remove(...e){this._each("unregister",e)}addControllers(...e){this._each("register",e,this.controllers)}addElements(...e){this._each("register",e,this.elements)}addPlugins(...e){this._each("register",e,this.plugins)}addScales(...e){this._each("register",e,this.scales)}getController(e){return this._get(e,this.controllers,"controller")}getElement(e){return this._get(e,this.elements,"element")}getPlugin(e){return this._get(e,this.plugins,"plugin")}getScale(e){return this._get(e,this.scales,"scale")}removeControllers(...e){this._each("unregister",e,this.controllers)}removeElements(...e){this._each("unregister",e,this.elements)}removePlugins(...e){this._each("unregister",e,this.plugins)}removeScales(...e){this._each("unregister",e,this.scales)}_each(e,n,s){[...n].forEach(r=>{const i=s||this._getRegistryForType(r);s||i.isForType(r)||i===this.plugins&&r.id?this._exec(e,i,r):Ne(r,o=>{const a=s||this._getRegistryForType(o);this._exec(e,a,o)})})}_exec(e,n,s){const r=Qf(e);ze(s["before"+r],[],s),n[e](s),ze(s["after"+r],[],s)}_getRegistryForType(e){for(let n=0;n<this._typedRegistries.length;n++){const s=this._typedRegistries[n];if(s.isForType(e))return s}return this.plugins}_get(e,n,s){const r=n.get(e);if(r===void 0)throw new Error('"'+e+'" is not a registered '+s+".");return r}}var Pn=new r2;class i2{constructor(){this._init=void 0}notify(e,n,s,r){if(n==="beforeInit"&&(this._init=this._createDescriptors(e,!0),this._notify(this._init,e,"install")),this._init===void 0)return;const i=r?this._descriptors(e).filter(r):this._descriptors(e),o=this._notify(i,e,n,s);return n==="afterDestroy"&&(this._notify(i,e,"stop"),this._notify(this._init,e,"uninstall"),this._init=void 0),o}_notify(e,n,s,r){r=r||{};for(const i of e){const o=i.plugin,a=o[s],c=[n,r,i.options];if(ze(a,c,o)===!1&&r.cancelable)return!1}return!0}invalidate(){_e(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(e){if(this._cache)return this._cache;const n=this._cache=this._createDescriptors(e);return this._notifyStateChanges(e),n}_createDescriptors(e,n){const s=e&&e.config,r=xe(s.options&&s.options.plugins,{}),i=o2(s);return r===!1&&!n?[]:l2(e,i,r,n)}_notifyStateChanges(e){const n=this._oldCache||[],s=this._cache,r=(i,o)=>i.filter(a=>!o.some(c=>a.plugin.id===c.plugin.id));this._notify(r(n,s),e,"stop"),this._notify(r(s,n),e,"start")}}function o2(t){const e={},n=[],s=Object.keys(Pn.plugins.items);for(let i=0;i<s.length;i++)n.push(Pn.getPlugin(s[i]));const r=t.plugins||[];for(let i=0;i<r.length;i++){const o=r[i];n.indexOf(o)===-1&&(n.push(o),e[o.id]=!0)}return{plugins:n,localIds:e}}function a2(t,e){return!e&&t===!1?null:t===!0?{}:t}function l2(t,{plugins:e,localIds:n},s,r){const i=[],o=t.getContext();for(const a of e){const c=a.id,u=a2(s[c],r);u!==null&&i.push({plugin:a,options:c2(t.config,{plugin:a,local:n[c]},u,o)})}return i}function c2(t,{plugin:e,local:n},s,r){const i=t.pluginScopeKeys(e),o=t.getOptionScopes(s,i);return n&&e.defaults&&o.push(e.defaults),t.createResolver(o,r,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Cd(t,e){const n=et.datasets[t]||{};return((e.datasets||{})[t]||{}).indexAxis||e.indexAxis||n.indexAxis||"x"}function u2(t,e){let n=t;return t==="_index_"?n=e:t==="_value_"&&(n=e==="x"?"y":"x"),n}function d2(t,e){return t===e?"_index_":"_value_"}function eg(t){if(t==="x"||t==="y"||t==="r")return t}function f2(t){if(t==="top"||t==="bottom")return"x";if(t==="left"||t==="right")return"y"}function Ed(t,...e){if(eg(t))return t;for(const n of e){const s=n.axis||f2(n.position)||t.length>1&&eg(t[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${t}' axis. Please provide 'axis' or 'position' option.`)}function tg(t,e,n){if(n[e+"AxisID"]===t)return{axis:e}}function h2(t,e){if(e.data&&e.data.datasets){const n=e.data.datasets.filter(s=>s.xAxisID===t||s.yAxisID===t);if(n.length)return tg(t,"x",n[0])||tg(t,"y",n[0])}return{}}function p2(t,e){const n=mr[t.type]||{scales:{}},s=e.scales||{},r=Cd(t.type,e),i=Object.create(null);return Object.keys(s).forEach(o=>{const a=s[o];if(!ve(a))return console.error(`Invalid scale configuration for scale: ${o}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${o}`);const c=Ed(o,a,h2(o,t),et.scales[a.type]),u=d2(c,r),d=n.scales||{};i[o]=Ji(Object.create(null),[{axis:c},a,d[c],d[u]])}),t.data.datasets.forEach(o=>{const a=o.type||t.type,c=o.indexAxis||Cd(a,e),d=(mr[a]||{}).scales||{};Object.keys(d).forEach(f=>{const h=u2(f,c),m=o[h+"AxisID"]||h;i[m]=i[m]||Object.create(null),Ji(i[m],[{axis:h},s[m],d[f]])})}),Object.keys(i).forEach(o=>{const a=i[o];Ji(a,[et.scales[a.type],et.scale])}),i}function M1(t){const e=t.options||(t.options={});e.plugins=xe(e.plugins,{}),e.scales=p2(t,e)}function P1(t){return t=t||{},t.datasets=t.datasets||[],t.labels=t.labels||[],t}function m2(t){return t=t||{},t.data=P1(t.data),M1(t),t}const ng=new Map,D1=new Set;function Na(t,e){let n=ng.get(t);return n||(n=e(),ng.set(t,n),D1.add(n)),n}const Mi=(t,e,n)=>{const s=pr(e,n);s!==void 0&&t.add(s)};class g2{constructor(e){this._config=m2(e),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(e){this._config.type=e}get data(){return this._config.data}set data(e){this._config.data=P1(e)}get options(){return this._config.options}set options(e){this._config.options=e}get plugins(){return this._config.plugins}update(){const e=this._config;this.clearCache(),M1(e)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(e){return Na(e,()=>[[`datasets.${e}`,""]])}datasetAnimationScopeKeys(e,n){return Na(`${e}.transition.${n}`,()=>[[`datasets.${e}.transitions.${n}`,`transitions.${n}`],[`datasets.${e}`,""]])}datasetElementScopeKeys(e,n){return Na(`${e}-${n}`,()=>[[`datasets.${e}.elements.${n}`,`datasets.${e}`,`elements.${n}`,""]])}pluginScopeKeys(e){const n=e.id,s=this.type;return Na(`${s}-plugin-${n}`,()=>[[`plugins.${n}`,...e.additionalOptionScopes||[]]])}_cachedScopes(e,n){const s=this._scopeCache;let r=s.get(e);return(!r||n)&&(r=new Map,s.set(e,r)),r}getOptionScopes(e,n,s){const{options:r,type:i}=this,o=this._cachedScopes(e,s),a=o.get(n);if(a)return a;const c=new Set;n.forEach(d=>{e&&(c.add(e),d.forEach(f=>Mi(c,e,f))),d.forEach(f=>Mi(c,r,f)),d.forEach(f=>Mi(c,mr[i]||{},f)),d.forEach(f=>Mi(c,et,f)),d.forEach(f=>Mi(c,_d,f))});const u=Array.from(c);return u.length===0&&u.push(Object.create(null)),D1.has(n)&&o.set(n,u),u}chartOptionScopes(){const{options:e,type:n}=this;return[e,mr[n]||{},et.datasets[n]||{},{type:n},et,_d]}resolveNamedOptions(e,n,s,r=[""]){const i={$shared:!0},{resolver:o,subPrefixes:a}=sg(this._resolverCache,e,r);let c=o;if(y2(o,n)){i.$shared=!1,s=Is(s)?s():s;const u=this.createResolver(e,s,a);c=ai(o,s,u)}for(const u of n)i[u]=c[u];return i}createResolver(e,n,s=[""],r){const{resolver:i}=sg(this._resolverCache,e,s);return ve(n)?ai(i,n,void 0,r):i}}function sg(t,e,n){let s=t.get(e);s||(s=new Map,t.set(e,s));const r=n.join();let i=s.get(r);return i||(i={resolver:sh(e,n),subPrefixes:n.filter(a=>!a.toLowerCase().includes("hover"))},s.set(r,i)),i}const x2=t=>ve(t)&&Object.getOwnPropertyNames(t).some(e=>Is(t[e]));function y2(t,e){const{isScriptable:n,isIndexable:s}=u1(t);for(const r of e){const i=n(r),o=s(r),a=(o||i)&&t[r];if(i&&(Is(a)||x2(a))||o&&st(a))return!0}return!1}var v2="4.5.1";const b2=["top","bottom","left","right","chartArea"];function rg(t,e){return t==="top"||t==="bottom"||b2.indexOf(t)===-1&&e==="x"}function ig(t,e){return function(n,s){return n[t]===s[t]?n[e]-s[e]:n[t]-s[t]}}function og(t){const e=t.chart,n=e.options.animation;e.notifyPlugins("afterRender"),ze(n&&n.onComplete,[t],e)}function w2(t){const e=t.chart,n=e.options.animation;ze(n&&n.onProgress,[t],e)}function A1(t){return oh()&&typeof t=="string"?t=document.getElementById(t):t&&t.length&&(t=t[0]),t&&t.canvas&&(t=t.canvas),t}const Ga={},ag=t=>{const e=A1(t);return Object.values(Ga).filter(n=>n.canvas===e).pop()};function k2(t,e,n){const s=Object.keys(t);for(const r of s){const i=+r;if(i>=e){const o=t[r];delete t[r],(n>0||i>e)&&(t[i+n]=o)}}}function j2(t,e,n,s){return!n||t.type==="mouseout"?null:s?e:t}var ls;let Wo=(ls=class{static register(...e){Pn.add(...e),lg()}static unregister(...e){Pn.remove(...e),lg()}constructor(e,n){const s=this.config=new g2(n),r=A1(e),i=ag(r);if(i)throw new Error("Canvas is already in use. Chart with ID '"+i.id+"' must be destroyed before the canvas with ID '"+i.canvas.id+"' can be reused.");const o=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||$N(r)),this.platform.updateConfig(s);const a=this.platform.acquireContext(r,o.aspectRatio),c=a&&a.canvas,u=c&&c.height,d=c&&c.width;if(this.id=wS(),this.ctx=a,this.canvas=c,this.width=d,this.height=u,this._options=o,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new i2,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=BS(f=>this.update(f),o.resizeDelay||0),this._dataChanges=[],Ga[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}Rn.listen(this,"complete",og),Rn.listen(this,"progress",w2),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:e,maintainAspectRatio:n},width:s,height:r,_aspectRatio:i}=this;return _e(e)?n&&i?i:r?s/r:null:e}get data(){return this.config.data}set data(e){this.config.data=e}get options(){return this._options}set options(e){this.config.options=e}get registry(){return Pn}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Pm(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Cm(this.canvas,this.ctx),this}stop(){return Rn.stop(this),this}resize(e,n){Rn.running(this)?this._resizeBeforeDraw={width:e,height:n}:this._resize(e,n)}_resize(e,n){const s=this.options,r=this.canvas,i=s.maintainAspectRatio&&this.aspectRatio,o=this.platform.getMaximumSize(r,e,n,i),a=s.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=o.width,this.height=o.height,this._aspectRatio=this.aspectRatio,Pm(this,a,!0)&&(this.notifyPlugins("resize",{size:o}),ze(s.onResize,[this,o],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const n=this.options.scales||{};Ne(n,(s,r)=>{s.id=r})}buildOrUpdateScales(){const e=this.options,n=e.scales,s=this.scales,r=Object.keys(s).reduce((o,a)=>(o[a]=!1,o),{});let i=[];n&&(i=i.concat(Object.keys(n).map(o=>{const a=n[o],c=Ed(o,a),u=c==="r",d=c==="x";return{options:a,dposition:u?"chartArea":d?"bottom":"left",dtype:u?"radialLinear":d?"category":"linear"}}))),Ne(i,o=>{const a=o.options,c=a.id,u=Ed(c,a),d=xe(a.type,o.dtype);(a.position===void 0||rg(a.position,u)!==rg(o.dposition))&&(a.position=o.dposition),r[c]=!0;let f=null;if(c in s&&s[c].type===d)f=s[c];else{const h=Pn.getScale(d);f=new h({id:c,type:d,ctx:this.ctx,chart:this}),s[f.id]=f}f.init(a,e)}),Ne(r,(o,a)=>{o||delete s[a]}),Ne(s,o=>{un.configure(this,o,o.options),un.addBox(this,o)})}_updateMetasets(){const e=this._metasets,n=this.data.datasets.length,s=e.length;if(e.sort((r,i)=>r.index-i.index),s>n){for(let r=n;r<s;++r)this._destroyDatasetMeta(r);e.splice(n,s-n)}this._sortedMetasets=e.slice(0).sort(ig("order","index"))}_removeUnreferencedMetasets(){const{_metasets:e,data:{datasets:n}}=this;e.length>n.length&&delete this._stacks,e.forEach((s,r)=>{n.filter(i=>i===s._dataset).length===0&&this._destroyDatasetMeta(r)})}buildOrUpdateControllers(){const e=[],n=this.data.datasets;let s,r;for(this._removeUnreferencedMetasets(),s=0,r=n.length;s<r;s++){const i=n[s];let o=this.getDatasetMeta(s);const a=i.type||this.config.type;if(o.type&&o.type!==a&&(this._destroyDatasetMeta(s),o=this.getDatasetMeta(s)),o.type=a,o.indexAxis=i.indexAxis||Cd(a,this.options),o.order=i.order||0,o.index=s,o.label=""+i.label,o.visible=this.isDatasetVisible(s),o.controller)o.controller.updateIndex(s),o.controller.linkScales();else{const c=Pn.getController(a),{datasetElementType:u,dataElementType:d}=et.datasets[a];Object.assign(c,{dataElementType:Pn.getElement(d),datasetElementType:u&&Pn.getElement(u)}),o.controller=new c(this,s),e.push(o.controller)}}return this._updateMetasets(),e}_resetElements(){Ne(this.data.datasets,(e,n)=>{this.getDatasetMeta(n).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(e){const n=this.config;n.update();const s=this._options=n.createResolver(n.chartOptionScopes(),this.getContext()),r=this._animationsDisabled=!s.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:e,cancelable:!0})===!1)return;const i=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let o=0;for(let u=0,d=this.data.datasets.length;u<d;u++){const{controller:f}=this.getDatasetMeta(u),h=!r&&i.indexOf(f)===-1;f.buildOrUpdateElements(h),o=Math.max(+f.getMaxOverflow(),o)}o=this._minPadding=s.layout.autoPadding?o:0,this._updateLayout(o),r||Ne(i,u=>{u.reset()}),this._updateDatasets(e),this.notifyPlugins("afterUpdate",{mode:e}),this._layers.sort(ig("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){Ne(this.scales,e=>{un.removeBox(this,e)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const e=this.options,n=new Set(Object.keys(this._listeners)),s=new Set(e.events);(!xm(n,s)||!!this._responsiveListeners!==e.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:e}=this,n=this._getUniformDataChanges()||[];for(const{method:s,start:r,count:i}of n){const o=s==="_removeElements"?-i:i;k2(e,r,o)}}_getUniformDataChanges(){const e=this._dataChanges;if(!e||!e.length)return;this._dataChanges=[];const n=this.data.datasets.length,s=i=>new Set(e.filter(o=>o[0]===i).map((o,a)=>a+","+o.splice(1).join(","))),r=s(0);for(let i=1;i<n;i++)if(!xm(r,s(i)))return;return Array.from(r).map(i=>i.split(",")).map(i=>({method:i[1],start:+i[2],count:+i[3]}))}_updateLayout(e){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;un.update(this,this.width,this.height,e);const n=this.chartArea,s=n.width<=0||n.height<=0;this._layers=[],Ne(this.boxes,r=>{s&&r.position==="chartArea"||(r.configure&&r.configure(),this._layers.push(...r._layers()))},this),this._layers.forEach((r,i)=>{r._idx=i}),this.notifyPlugins("afterLayout")}_updateDatasets(e){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:e,cancelable:!0})!==!1){for(let n=0,s=this.data.datasets.length;n<s;++n)this.getDatasetMeta(n).controller.configure();for(let n=0,s=this.data.datasets.length;n<s;++n)this._updateDataset(n,Is(e)?e({datasetIndex:n}):e);this.notifyPlugins("afterDatasetsUpdate",{mode:e})}}_updateDataset(e,n){const s=this.getDatasetMeta(e),r={meta:s,index:e,mode:n,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",r)!==!1&&(s.controller._update(n),r.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",r))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Rn.has(this)?this.attached&&!Rn.running(this)&&Rn.start(this):(this.draw(),og({chart:this})))}draw(){let e;if(this._resizeBeforeDraw){const{width:s,height:r}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(s,r)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const n=this._layers;for(e=0;e<n.length&&n[e].z<=0;++e)n[e].draw(this.chartArea);for(this._drawDatasets();e<n.length;++e)n[e].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(e){const n=this._sortedMetasets,s=[];let r,i;for(r=0,i=n.length;r<i;++r){const o=n[r];(!e||o.visible)&&s.push(o)}return s}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const e=this.getSortedVisibleDatasetMetas();for(let n=e.length-1;n>=0;--n)this._drawDataset(e[n]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(e){const n=this.ctx,s={meta:e,index:e.index,cancelable:!0},r=b1(this,e);this.notifyPlugins("beforeDatasetDraw",s)!==!1&&(r&&oc(n,r),e.controller.draw(),r&&ac(n),s.cancelable=!1,this.notifyPlugins("afterDatasetDraw",s))}isPointInArea(e){return Do(e,this.chartArea,this._minPadding)}getElementsAtEventForMode(e,n,s,r){const i=bN.modes[n];return typeof i=="function"?i(this,e,s,r):[]}getDatasetMeta(e){const n=this.data.datasets[e],s=this._metasets;let r=s.filter(i=>i&&i._dataset===n).pop();return r||(r={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:n&&n.order||0,index:e,_dataset:n,_parsed:[],_sorted:!1},s.push(r)),r}getContext(){return this.$context||(this.$context=br(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(e){const n=this.data.datasets[e];if(!n)return!1;const s=this.getDatasetMeta(e);return typeof s.hidden=="boolean"?!s.hidden:!n.hidden}setDatasetVisibility(e,n){const s=this.getDatasetMeta(e);s.hidden=!n}toggleDataVisibility(e){this._hiddenIndices[e]=!this._hiddenIndices[e]}getDataVisibility(e){return!this._hiddenIndices[e]}_updateVisibility(e,n,s){const r=s?"show":"hide",i=this.getDatasetMeta(e),o=i.controller._resolveAnimations(void 0,r);Eo(n)?(i.data[n].hidden=!s,this.update()):(this.setDatasetVisibility(e,s),o.update(i,{visible:s}),this.update(a=>a.datasetIndex===e?r:void 0))}hide(e,n){this._updateVisibility(e,n,!1)}show(e,n){this._updateVisibility(e,n,!0)}_destroyDatasetMeta(e){const n=this._metasets[e];n&&n.controller&&n.controller._destroy(),delete this._metasets[e]}_stop(){let e,n;for(this.stop(),Rn.remove(this),e=0,n=this.data.datasets.length;e<n;++e)this._destroyDatasetMeta(e)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:e,ctx:n}=this;this._stop(),this.config.clearCache(),e&&(this.unbindEvents(),Cm(e,n),this.platform.releaseContext(n),this.canvas=null,this.ctx=null),delete Ga[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...e){return this.canvas.toDataURL(...e)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const e=this._listeners,n=this.platform,s=(i,o)=>{n.addEventListener(this,i,o),e[i]=o},r=(i,o,a)=>{i.offsetX=o,i.offsetY=a,this._eventHandler(i)};Ne(this.options.events,i=>s(i,r))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const e=this._responsiveListeners,n=this.platform,s=(c,u)=>{n.addEventListener(this,c,u),e[c]=u},r=(c,u)=>{e[c]&&(n.removeEventListener(this,c,u),delete e[c])},i=(c,u)=>{this.canvas&&this.resize(c,u)};let o;const a=()=>{r("attach",a),this.attached=!0,this.resize(),s("resize",i),s("detach",o)};o=()=>{this.attached=!1,r("resize",i),this._stop(),this._resize(0,0),s("attach",a)},n.isAttached(this.canvas)?a():o()}unbindEvents(){Ne(this._listeners,(e,n)=>{this.platform.removeEventListener(this,n,e)}),this._listeners={},Ne(this._responsiveListeners,(e,n)=>{this.platform.removeEventListener(this,n,e)}),this._responsiveListeners=void 0}updateHoverStyle(e,n,s){const r=s?"set":"remove";let i,o,a,c;for(n==="dataset"&&(i=this.getDatasetMeta(e[0].datasetIndex),i.controller["_"+r+"DatasetHoverStyle"]()),a=0,c=e.length;a<c;++a){o=e[a];const u=o&&this.getDatasetMeta(o.datasetIndex).controller;u&&u[r+"HoverStyle"](o.element,o.datasetIndex,o.index)}}getActiveElements(){return this._active||[]}setActiveElements(e){const n=this._active||[],s=e.map(({datasetIndex:i,index:o})=>{const a=this.getDatasetMeta(i);if(!a)throw new Error("No dataset found at index "+i);return{datasetIndex:i,element:a.data[o],index:o}});!_l(s,n)&&(this._active=s,this._lastEvent=null,this._updateHoverStyles(s,n))}notifyPlugins(e,n,s){return this._plugins.notify(this,e,n,s)}isPluginEnabled(e){return this._plugins._cache.filter(n=>n.plugin.id===e).length===1}_updateHoverStyles(e,n,s){const r=this.options.hover,i=(c,u)=>c.filter(d=>!u.some(f=>d.datasetIndex===f.datasetIndex&&d.index===f.index)),o=i(n,e),a=s?e:i(e,n);o.length&&this.updateHoverStyle(o,r.mode,!1),a.length&&r.mode&&this.updateHoverStyle(a,r.mode,!0)}_eventHandler(e,n){const s={event:e,replay:n,cancelable:!0,inChartArea:this.isPointInArea(e)},r=o=>(o.options.events||this.options.events).includes(e.native.type);if(this.notifyPlugins("beforeEvent",s,r)===!1)return;const i=this._handleEvent(e,n,s.inChartArea);return s.cancelable=!1,this.notifyPlugins("afterEvent",s,r),(i||s.changed)&&this.render(),this}_handleEvent(e,n,s){const{_active:r=[],options:i}=this,o=n,a=this._getActiveElements(e,r,s,o),c=CS(e),u=j2(e,this._lastEvent,s,c);s&&(this._lastEvent=null,ze(i.onHover,[e,a,this],this),c&&ze(i.onClick,[e,a,this],this));const d=!_l(a,r);return(d||n)&&(this._active=a,this._updateHoverStyles(a,r,n)),this._lastEvent=u,d}_getActiveElements(e,n,s,r){if(e.type==="mouseout")return[];if(!s)return n;const i=this.options.hover;return this.getElementsAtEventForMode(e,i.mode,i,r)}},ee(ls,"defaults",et),ee(ls,"instances",Ga),ee(ls,"overrides",mr),ee(ls,"registry",Pn),ee(ls,"version",v2),ee(ls,"getChart",ag),ls);function lg(){return Ne(Wo.instances,t=>t._plugins.invalidate())}function S2(t,e,n){const{startAngle:s,x:r,y:i,outerRadius:o,innerRadius:a,options:c}=e,{borderWidth:u,borderJoinStyle:d}=c,f=Math.min(u/o,qt(s-n));if(t.beginPath(),t.arc(r,i,o-u/2,s+f/2,n-f/2),a>0){const h=Math.min(u/a,qt(s-n));t.arc(r,i,a+u/2,n-h/2,s+h/2,!0)}else{const h=Math.min(u/2,o*qt(s-n));if(d==="round")t.arc(r,i,h,n-Ce/2,s+Ce/2,!0);else if(d==="bevel"){const m=2*h*h,g=-m*Math.cos(n+Ce/2)+r,x=-m*Math.sin(n+Ce/2)+i,v=m*Math.cos(s+Ce/2)+r,b=m*Math.sin(s+Ce/2)+i;t.lineTo(g,x),t.lineTo(v,b)}}t.closePath(),t.moveTo(0,0),t.rect(0,0,t.canvas.width,t.canvas.height),t.clip("evenodd")}function _2(t,e,n){const{startAngle:s,pixelMargin:r,x:i,y:o,outerRadius:a,innerRadius:c}=e;let u=r/a;t.beginPath(),t.arc(i,o,a,s-u,n+u),c>r?(u=r/c,t.arc(i,o,c,n+u,s-u,!0)):t.arc(i,o,r,n+ct,s-ct),t.closePath(),t.clip()}function N2(t){return nh(t,["outerStart","outerEnd","innerStart","innerEnd"])}function C2(t,e,n,s){const r=N2(t.options.borderRadius),i=(n-e)/2,o=Math.min(i,s*e/2),a=c=>{const u=(n-Math.min(i,c))*s/2;return St(c,0,Math.min(i,u))};return{outerStart:a(r.outerStart),outerEnd:a(r.outerEnd),innerStart:St(r.innerStart,0,o),innerEnd:St(r.innerEnd,0,o)}}function Nr(t,e,n,s){return{x:n+t*Math.cos(e),y:s+t*Math.sin(e)}}function Dl(t,e,n,s,r,i){const{x:o,y:a,startAngle:c,pixelMargin:u,innerRadius:d}=e,f=Math.max(e.outerRadius+s+n-u,0),h=d>0?d+s+n+u:0;let m=0;const g=r-c;if(s){const L=d>0?d-s:0,$=f>0?f-s:0,D=(L+$)/2,z=D!==0?g*D/(D+s):g;m=(g-z)/2}const x=Math.max(.001,g*f-n/Ce)/f,v=(g-x)/2,b=c+v+m,p=r-v-m,{outerStart:y,outerEnd:_,innerStart:j,innerEnd:N}=C2(e,h,f,p-b),C=f-y,w=f-_,k=b+y/C,S=p-_/w,P=h+j,O=h+N,A=b+j/P,U=p-N/O;if(t.beginPath(),i){const L=(k+S)/2;if(t.arc(o,a,f,k,L),t.arc(o,a,f,L,S),_>0){const M=Nr(w,S,o,a);t.arc(M.x,M.y,_,S,p+ct)}const $=Nr(O,p,o,a);if(t.lineTo($.x,$.y),N>0){const M=Nr(O,U,o,a);t.arc(M.x,M.y,N,p+ct,U+Math.PI)}const D=(p-N/h+(b+j/h))/2;if(t.arc(o,a,h,p-N/h,D,!0),t.arc(o,a,h,D,b+j/h,!0),j>0){const M=Nr(P,A,o,a);t.arc(M.x,M.y,j,A+Math.PI,b-ct)}const z=Nr(C,b,o,a);if(t.lineTo(z.x,z.y),y>0){const M=Nr(C,k,o,a);t.arc(M.x,M.y,y,b-ct,k)}}else{t.moveTo(o,a);const L=Math.cos(k)*f+o,$=Math.sin(k)*f+a;t.lineTo(L,$);const D=Math.cos(S)*f+o,z=Math.sin(S)*f+a;t.lineTo(D,z)}t.closePath()}function E2(t,e,n,s,r){const{fullCircles:i,startAngle:o,circumference:a}=e;let c=e.endAngle;if(i){Dl(t,e,n,s,c,r);for(let u=0;u<i;++u)t.fill();isNaN(a)||(c=o+(a%Ue||Ue))}return Dl(t,e,n,s,c,r),t.fill(),c}function M2(t,e,n,s,r){const{fullCircles:i,startAngle:o,circumference:a,options:c}=e,{borderWidth:u,borderJoinStyle:d,borderDash:f,borderDashOffset:h,borderRadius:m}=c,g=c.borderAlign==="inner";if(!u)return;t.setLineDash(f||[]),t.lineDashOffset=h,g?(t.lineWidth=u*2,t.lineJoin=d||"round"):(t.lineWidth=u,t.lineJoin=d||"bevel");let x=e.endAngle;if(i){Dl(t,e,n,s,x,r);for(let v=0;v<i;++v)t.stroke();isNaN(a)||(x=o+(a%Ue||Ue))}g&&_2(t,e,x),c.selfJoin&&x-o>=Ce&&m===0&&d!=="miter"&&S2(t,e,x),i||(Dl(t,e,n,s,x,r),t.stroke())}class $r extends Sn{constructor(n){super();ee(this,"circumference");ee(this,"endAngle");ee(this,"fullCircles");ee(this,"innerRadius");ee(this,"outerRadius");ee(this,"pixelMargin");ee(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,n&&Object.assign(this,n)}inRange(n,s,r){const i=this.getProps(["x","y"],r),{angle:o,distance:a}=n1(i,{x:n,y:s}),{startAngle:c,endAngle:u,innerRadius:d,outerRadius:f,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],r),m=(this.options.spacing+this.options.borderWidth)/2,g=xe(h,u-c),x=Po(o,c,u)&&c!==u,v=g>=Ue||x,b=qn(a,d+m,f+m);return v&&b}getCenterPoint(n){const{x:s,y:r,startAngle:i,endAngle:o,innerRadius:a,outerRadius:c}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],n),{offset:u,spacing:d}=this.options,f=(i+o)/2,h=(a+c+d+u)/2;return{x:s+Math.cos(f)*h,y:r+Math.sin(f)*h}}tooltipPosition(n){return this.getCenterPoint(n)}draw(n){const{options:s,circumference:r}=this,i=(s.offset||0)/4,o=(s.spacing||0)/2,a=s.circular;if(this.pixelMargin=s.borderAlign==="inner"?.33:0,this.fullCircles=r>Ue?Math.floor(r/Ue):0,r===0||this.innerRadius<0||this.outerRadius<0)return;n.save();const c=(this.startAngle+this.endAngle)/2;n.translate(Math.cos(c)*i,Math.sin(c)*i);const u=1-Math.sin(Math.min(Ce,r||0)),d=i*u;n.fillStyle=s.backgroundColor,n.strokeStyle=s.borderColor,E2(n,this,d,o,a),M2(n,this,d,o,a),n.restore()}}ee($r,"id","arc"),ee($r,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),ee($r,"defaultRoutes",{backgroundColor:"backgroundColor"}),ee($r,"descriptors",{_scriptable:!0,_indexable:n=>n!=="borderDash"});function O1(t,e,n=e){t.lineCap=xe(n.borderCapStyle,e.borderCapStyle),t.setLineDash(xe(n.borderDash,e.borderDash)),t.lineDashOffset=xe(n.borderDashOffset,e.borderDashOffset),t.lineJoin=xe(n.borderJoinStyle,e.borderJoinStyle),t.lineWidth=xe(n.borderWidth,e.borderWidth),t.strokeStyle=xe(n.borderColor,e.borderColor)}function P2(t,e,n){t.lineTo(n.x,n.y)}function D2(t){return t.stepped?e_:t.tension||t.cubicInterpolationMode==="monotone"?t_:P2}function T1(t,e,n={}){const s=t.length,{start:r=0,end:i=s-1}=n,{start:o,end:a}=e,c=Math.max(r,o),u=Math.min(i,a),d=r<o&&i<o||r>a&&i>a;return{count:s,start:c,loop:e.loop,ilen:u<c&&!d?s+u-c:u-c}}function A2(t,e,n,s){const{points:r,options:i}=e,{count:o,start:a,loop:c,ilen:u}=T1(r,n,s),d=D2(i);let{move:f=!0,reverse:h}=s||{},m,g,x;for(m=0;m<=u;++m)g=r[(a+(h?u-m:m))%o],!g.skip&&(f?(t.moveTo(g.x,g.y),f=!1):d(t,x,g,h,i.stepped),x=g);return c&&(g=r[(a+(h?u:0))%o],d(t,x,g,h,i.stepped)),!!c}function O2(t,e,n,s){const r=e.points,{count:i,start:o,ilen:a}=T1(r,n,s),{move:c=!0,reverse:u}=s||{};let d=0,f=0,h,m,g,x,v,b;const p=_=>(o+(u?a-_:_))%i,y=()=>{x!==v&&(t.lineTo(d,v),t.lineTo(d,x),t.lineTo(d,b))};for(c&&(m=r[p(0)],t.moveTo(m.x,m.y)),h=0;h<=a;++h){if(m=r[p(h)],m.skip)continue;const _=m.x,j=m.y,N=_|0;N===g?(j<x?x=j:j>v&&(v=j),d=(f*d+_)/++f):(y(),t.lineTo(_,j),g=N,f=0,x=v=j),b=j}y()}function Md(t){const e=t.options,n=e.borderDash&&e.borderDash.length;return!t._decimated&&!t._loop&&!e.tension&&e.cubicInterpolationMode!=="monotone"&&!e.stepped&&!n?O2:A2}function T2(t){return t.stepped?O_:t.tension||t.cubicInterpolationMode==="monotone"?T_:Qs}function z2(t,e,n,s){let r=e._path;r||(r=e._path=new Path2D,e.path(r,n,s)&&r.closePath()),O1(t,e.options),t.stroke(r)}function I2(t,e,n,s){const{segments:r,options:i}=e,o=Md(e);for(const a of r)O1(t,i,a.style),t.beginPath(),o(t,e,a,{start:n,end:n+s-1})&&t.closePath(),t.stroke()}const F2=typeof Path2D=="function";function R2(t,e,n,s){F2&&!e.options.segment?z2(t,e,n,s):I2(t,e,n,s)}class bs extends Sn{constructor(e){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,e&&Object.assign(this,e)}updateControlPoints(e,n){const s=this.options;if((s.tension||s.cubicInterpolationMode==="monotone")&&!s.stepped&&!this._pointsUpdated){const r=s.spanGaps?this._loop:this._fullLoop;__(this._points,s,e,r,n),this._pointsUpdated=!0}}set points(e){this._points=e,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=B_(this,this.options.segment))}first(){const e=this.segments,n=this.points;return e.length&&n[e[0].start]}last(){const e=this.segments,n=this.points,s=e.length;return s&&n[e[s-1].end]}interpolate(e,n){const s=this.options,r=e[n],i=this.points,o=v1(this,{property:n,start:r,end:r});if(!o.length)return;const a=[],c=T2(s);let u,d;for(u=0,d=o.length;u<d;++u){const{start:f,end:h}=o[u],m=i[f],g=i[h];if(m===g){a.push(m);continue}const x=Math.abs((r-m[n])/(g[n]-m[n])),v=c(m,g,x,s.stepped);v[n]=e[n],a.push(v)}return a.length===1?a[0]:a}pathSegment(e,n,s){return Md(this)(e,this,n,s)}path(e,n,s){const r=this.segments,i=Md(this);let o=this._loop;n=n||0,s=s||this.points.length-n;for(const a of r)o&=i(e,this,a,{start:n,end:n+s-1});return!!o}draw(e,n,s,r){const i=this.options||{};(this.points||[]).length&&i.borderWidth&&(e.save(),R2(e,this,s,r),e.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}ee(bs,"id","line"),ee(bs,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),ee(bs,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),ee(bs,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"&&e!=="fill"});function cg(t,e,n,s){const r=t.options,{[n]:i}=t.getProps([n],s);return Math.abs(e-i)<r.radius+r.hitRadius}class qa extends Sn{constructor(n){super();ee(this,"parsed");ee(this,"skip");ee(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,n&&Object.assign(this,n)}inRange(n,s,r){const i=this.options,{x:o,y:a}=this.getProps(["x","y"],r);return Math.pow(n-o,2)+Math.pow(s-a,2)<Math.pow(i.hitRadius+i.radius,2)}inXRange(n,s){return cg(this,n,"x",s)}inYRange(n,s){return cg(this,n,"y",s)}getCenterPoint(n){const{x:s,y:r}=this.getProps(["x","y"],n);return{x:s,y:r}}size(n){n=n||this.options||{};let s=n.radius||0;s=Math.max(s,s&&n.hoverRadius||0);const r=s&&n.borderWidth||0;return(s+r)*2}draw(n,s){const r=this.options;this.skip||r.radius<.1||!Do(this,s,this.size(r)/2)||(n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.fillStyle=r.backgroundColor,Nd(n,r,this.x,this.y))}getRange(){const n=this.options||{};return n.radius+n.hitRadius}}ee(qa,"id","point"),ee(qa,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),ee(qa,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function z1(t,e){const{x:n,y:s,base:r,width:i,height:o}=t.getProps(["x","y","base","width","height"],e);let a,c,u,d,f;return t.horizontal?(f=o/2,a=Math.min(n,r),c=Math.max(n,r),u=s-f,d=s+f):(f=i/2,a=n-f,c=n+f,u=Math.min(s,r),d=Math.max(s,r)),{left:a,top:u,right:c,bottom:d}}function ws(t,e,n,s){return t?0:St(e,n,s)}function L2(t,e,n){const s=t.options.borderWidth,r=t.borderSkipped,i=c1(s);return{t:ws(r.top,i.top,0,n),r:ws(r.right,i.right,0,e),b:ws(r.bottom,i.bottom,0,n),l:ws(r.left,i.left,0,e)}}function B2(t,e,n){const{enableBorderRadius:s}=t.getProps(["enableBorderRadius"]),r=t.options.borderRadius,i=Qr(r),o=Math.min(e,n),a=t.borderSkipped,c=s||ve(r);return{topLeft:ws(!c||a.top||a.left,i.topLeft,0,o),topRight:ws(!c||a.top||a.right,i.topRight,0,o),bottomLeft:ws(!c||a.bottom||a.left,i.bottomLeft,0,o),bottomRight:ws(!c||a.bottom||a.right,i.bottomRight,0,o)}}function $2(t){const e=z1(t),n=e.right-e.left,s=e.bottom-e.top,r=L2(t,n/2,s/2),i=B2(t,n/2,s/2);return{outer:{x:e.left,y:e.top,w:n,h:s,radius:i},inner:{x:e.left+r.l,y:e.top+r.t,w:n-r.l-r.r,h:s-r.t-r.b,radius:{topLeft:Math.max(0,i.topLeft-Math.max(r.t,r.l)),topRight:Math.max(0,i.topRight-Math.max(r.t,r.r)),bottomLeft:Math.max(0,i.bottomLeft-Math.max(r.b,r.l)),bottomRight:Math.max(0,i.bottomRight-Math.max(r.b,r.r))}}}}function nu(t,e,n,s){const r=e===null,i=n===null,a=t&&!(r&&i)&&z1(t,s);return a&&(r||qn(e,a.left,a.right))&&(i||qn(n,a.top,a.bottom))}function U2(t){return t.topLeft||t.topRight||t.bottomLeft||t.bottomRight}function W2(t,e){t.rect(e.x,e.y,e.w,e.h)}function su(t,e,n={}){const s=t.x!==n.x?-e:0,r=t.y!==n.y?-e:0,i=(t.x+t.w!==n.x+n.w?e:0)-s,o=(t.y+t.h!==n.y+n.h?e:0)-r;return{x:t.x+s,y:t.y+r,w:t.w+i,h:t.h+o,radius:t.radius}}class Xa extends Sn{constructor(e){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,e&&Object.assign(this,e)}draw(e){const{inflateAmount:n,options:{borderColor:s,backgroundColor:r}}=this,{inner:i,outer:o}=$2(this),a=U2(o.radius)?El:W2;e.save(),(o.w!==i.w||o.h!==i.h)&&(e.beginPath(),a(e,su(o,n,i)),e.clip(),a(e,su(i,-n,o)),e.fillStyle=s,e.fill("evenodd")),e.beginPath(),a(e,su(i,n)),e.fillStyle=r,e.fill(),e.restore()}inRange(e,n,s){return nu(this,e,n,s)}inXRange(e,n){return nu(this,e,null,n)}inYRange(e,n){return nu(this,null,e,n)}getCenterPoint(e){const{x:n,y:s,base:r,horizontal:i}=this.getProps(["x","y","base","horizontal"],e);return{x:i?(n+r)/2:n,y:i?s:(s+r)/2}}getRange(e){return e==="x"?this.width/2:this.height/2}}ee(Xa,"id","bar"),ee(Xa,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),ee(Xa,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function V2(t,e,n){const s=t.segments,r=t.points,i=e.points,o=[];for(const a of s){let{start:c,end:u}=a;u=uc(c,u,r);const d=Pd(n,r[c],r[u],a.loop);if(!e.segments){o.push({source:a,target:d,start:r[c],end:r[u]});continue}const f=v1(e,d);for(const h of f){const m=Pd(n,i[h.start],i[h.end],h.loop),g=y1(a,r,m);for(const x of g)o.push({source:x,target:h,start:{[n]:ug(d,m,"start",Math.max)},end:{[n]:ug(d,m,"end",Math.min)}})}}return o}function Pd(t,e,n,s){if(s)return;let r=e[t],i=n[t];return t==="angle"&&(r=qt(r),i=qt(i)),{property:t,start:r,end:i}}function H2(t,e){const{x:n=null,y:s=null}=t||{},r=e.points,i=[];return e.segments.forEach(({start:o,end:a})=>{a=uc(o,a,r);const c=r[o],u=r[a];s!==null?(i.push({x:c.x,y:s}),i.push({x:u.x,y:s})):n!==null&&(i.push({x:n,y:c.y}),i.push({x:n,y:u.y}))}),i}function uc(t,e,n){for(;e>t;e--){const s=n[e];if(!isNaN(s.x)&&!isNaN(s.y))break}return e}function ug(t,e,n,s){return t&&e?s(t[n],e[n]):t?t[n]:e?e[n]:0}function I1(t,e){let n=[],s=!1;return st(t)?(s=!0,n=t):n=H2(t,e),n.length?new bs({points:n,options:{tension:0},_loop:s,_fullLoop:s}):null}function dg(t){return t&&t.fill!==!1}function Y2(t,e,n){let r=t[e].fill;const i=[e];let o;if(!n)return r;for(;r!==!1&&i.indexOf(r)===-1;){if(!Et(r))return r;if(o=t[r],!o)return!1;if(o.visible)return r;i.push(r),r=o.fill}return!1}function K2(t,e,n){const s=Q2(t);if(ve(s))return isNaN(s.value)?!1:s;let r=parseFloat(s);return Et(r)&&Math.floor(r)===r?G2(s[0],e,r,n):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function G2(t,e,n,s){return(t==="-"||t==="+")&&(n=e+n),n===e||n<0||n>=s?!1:n}function q2(t,e){let n=null;return t==="start"?n=e.bottom:t==="end"?n=e.top:ve(t)?n=e.getPixelForValue(t.value):e.getBasePixel&&(n=e.getBasePixel()),n}function X2(t,e,n){let s;return t==="start"?s=n:t==="end"?s=e.options.reverse?e.min:e.max:ve(t)?s=t.value:s=e.getBaseValue(),s}function Q2(t){const e=t.options,n=e.fill;let s=xe(n&&n.target,n);return s===void 0&&(s=!!e.backgroundColor),s===!1||s===null?!1:s===!0?"origin":s}function Z2(t){const{scale:e,index:n,line:s}=t,r=[],i=s.segments,o=s.points,a=J2(e,n);a.push(I1({x:null,y:e.bottom},s));for(let c=0;c<i.length;c++){const u=i[c];for(let d=u.start;d<=u.end;d++)eC(r,o[d],a)}return new bs({points:r,options:{}})}function J2(t,e){const n=[],s=t.getMatchingVisibleMetas("line");for(let r=0;r<s.length;r++){const i=s[r];if(i.index===e)break;i.hidden||n.unshift(i.dataset)}return n}function eC(t,e,n){const s=[];for(let r=0;r<n.length;r++){const i=n[r],{first:o,last:a,point:c}=tC(i,e,"x");if(!(!c||o&&a)){if(o)s.unshift(c);else if(t.push(c),!a)break}}t.push(...s)}function tC(t,e,n){const s=t.interpolate(e,n);if(!s)return{};const r=s[n],i=t.segments,o=t.points;let a=!1,c=!1;for(let u=0;u<i.length;u++){const d=i[u],f=o[d.start][n],h=o[d.end][n];if(qn(r,f,h)){a=r===f,c=r===h;break}}return{first:a,last:c,point:s}}class F1{constructor(e){this.x=e.x,this.y=e.y,this.radius=e.radius}pathSegment(e,n,s){const{x:r,y:i,radius:o}=this;return n=n||{start:0,end:Ue},e.arc(r,i,o,n.end,n.start,!0),!s.bounds}interpolate(e){const{x:n,y:s,radius:r}=this,i=e.angle;return{x:n+Math.cos(i)*r,y:s+Math.sin(i)*r,angle:i}}}function nC(t){const{chart:e,fill:n,line:s}=t;if(Et(n))return sC(e,n);if(n==="stack")return Z2(t);if(n==="shape")return!0;const r=rC(t);return r instanceof F1?r:I1(r,s)}function sC(t,e){const n=t.getDatasetMeta(e);return n&&t.isDatasetVisible(e)?n.dataset:null}function rC(t){return(t.scale||{}).getPointPositionForValue?oC(t):iC(t)}function iC(t){const{scale:e={},fill:n}=t,s=q2(n,e);if(Et(s)){const r=e.isHorizontal();return{x:r?s:null,y:r?null:s}}return null}function oC(t){const{scale:e,fill:n}=t,s=e.options,r=e.getLabels().length,i=s.reverse?e.max:e.min,o=X2(n,e,i),a=[];if(s.grid.circular){const c=e.getPointPositionForValue(0,i);return new F1({x:c.x,y:c.y,radius:e.getDistanceFromCenterForValue(o)})}for(let c=0;c<r;++c)a.push(e.getPointPositionForValue(c,o));return a}function ru(t,e,n){const s=nC(e),{chart:r,index:i,line:o,scale:a,axis:c}=e,u=o.options,d=u.fill,f=u.backgroundColor,{above:h=f,below:m=f}=d||{},g=r.getDatasetMeta(i),x=b1(r,g);s&&o.points.length&&(oc(t,n),aC(t,{line:o,target:s,above:h,below:m,area:n,scale:a,axis:c,clip:x}),ac(t))}function aC(t,e){const{line:n,target:s,above:r,below:i,area:o,scale:a,clip:c}=e,u=n._loop?"angle":e.axis;t.save();let d=i;i!==r&&(u==="x"?(fg(t,s,o.top),iu(t,{line:n,target:s,color:r,scale:a,property:u,clip:c}),t.restore(),t.save(),fg(t,s,o.bottom)):u==="y"&&(hg(t,s,o.left),iu(t,{line:n,target:s,color:i,scale:a,property:u,clip:c}),t.restore(),t.save(),hg(t,s,o.right),d=r)),iu(t,{line:n,target:s,color:d,scale:a,property:u,clip:c}),t.restore()}function fg(t,e,n){const{segments:s,points:r}=e;let i=!0,o=!1;t.beginPath();for(const a of s){const{start:c,end:u}=a,d=r[c],f=r[uc(c,u,r)];i?(t.moveTo(d.x,d.y),i=!1):(t.lineTo(d.x,n),t.lineTo(d.x,d.y)),o=!!e.pathSegment(t,a,{move:o}),o?t.closePath():t.lineTo(f.x,n)}t.lineTo(e.first().x,n),t.closePath(),t.clip()}function hg(t,e,n){const{segments:s,points:r}=e;let i=!0,o=!1;t.beginPath();for(const a of s){const{start:c,end:u}=a,d=r[c],f=r[uc(c,u,r)];i?(t.moveTo(d.x,d.y),i=!1):(t.lineTo(n,d.y),t.lineTo(d.x,d.y)),o=!!e.pathSegment(t,a,{move:o}),o?t.closePath():t.lineTo(n,f.y)}t.lineTo(n,e.first().y),t.closePath(),t.clip()}function iu(t,e){const{line:n,target:s,property:r,color:i,scale:o,clip:a}=e,c=V2(n,s,r);for(const{source:u,target:d,start:f,end:h}of c){const{style:{backgroundColor:m=i}={}}=u,g=s!==!0;t.save(),t.fillStyle=m,lC(t,o,a,g&&Pd(r,f,h)),t.beginPath();const x=!!n.pathSegment(t,u);let v;if(g){x?t.closePath():pg(t,s,h,r);const b=!!s.pathSegment(t,d,{move:x,reverse:!0});v=x&&b,v||pg(t,s,f,r)}t.closePath(),t.fill(v?"evenodd":"nonzero"),t.restore()}}function lC(t,e,n,s){const r=e.chart.chartArea,{property:i,start:o,end:a}=s||{};if(i==="x"||i==="y"){let c,u,d,f;i==="x"?(c=o,u=r.top,d=a,f=r.bottom):(c=r.left,u=o,d=r.right,f=a),t.beginPath(),n&&(c=Math.max(c,n.left),d=Math.min(d,n.right),u=Math.max(u,n.top),f=Math.min(f,n.bottom)),t.rect(c,u,d-c,f-u),t.clip()}}function pg(t,e,n,s){const r=e.interpolate(n,s);r&&t.lineTo(r.x,r.y)}var cC={id:"filler",afterDatasetsUpdate(t,e,n){const s=(t.data.datasets||[]).length,r=[];let i,o,a,c;for(o=0;o<s;++o)i=t.getDatasetMeta(o),a=i.dataset,c=null,a&&a.options&&a instanceof bs&&(c={visible:t.isDatasetVisible(o),index:o,fill:K2(a,o,s),chart:t,axis:i.controller.options.indexAxis,scale:i.vScale,line:a}),i.$filler=c,r.push(c);for(o=0;o<s;++o)c=r[o],!(!c||c.fill===!1)&&(c.fill=Y2(r,o,n.propagate))},beforeDraw(t,e,n){const s=n.drawTime==="beforeDraw",r=t.getSortedVisibleDatasetMetas(),i=t.chartArea;for(let o=r.length-1;o>=0;--o){const a=r[o].$filler;a&&(a.line.updateControlPoints(i,a.axis),s&&a.fill&&ru(t.ctx,a,i))}},beforeDatasetsDraw(t,e,n){if(n.drawTime!=="beforeDatasetsDraw")return;const s=t.getSortedVisibleDatasetMetas();for(let r=s.length-1;r>=0;--r){const i=s[r].$filler;dg(i)&&ru(t.ctx,i,t.chartArea)}},beforeDatasetDraw(t,e,n){const s=e.meta.$filler;!dg(s)||n.drawTime!=="beforeDatasetDraw"||ru(t.ctx,s,t.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const mg=(t,e)=>{let{boxHeight:n=e,boxWidth:s=e}=t;return t.usePointStyle&&(n=Math.min(n,e),s=t.pointStyleWidth||Math.min(s,e)),{boxWidth:s,boxHeight:n,itemHeight:Math.max(e,n)}},uC=(t,e)=>t!==null&&e!==null&&t.datasetIndex===e.datasetIndex&&t.index===e.index;class gg extends Sn{constructor(e){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,n,s){this.maxWidth=e,this.maxHeight=n,this._margins=s,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const e=this.options.labels||{};let n=ze(e.generateLabels,[this.chart],this)||[];e.filter&&(n=n.filter(s=>e.filter(s,this.chart.data))),e.sort&&(n=n.sort((s,r)=>e.sort(s,r,this.chart.data))),this.options.reverse&&n.reverse(),this.legendItems=n}fit(){const{options:e,ctx:n}=this;if(!e.display){this.width=this.height=0;return}const s=e.labels,r=_t(s.font),i=r.size,o=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=mg(s,i);let u,d;n.font=r.string,this.isHorizontal()?(u=this.maxWidth,d=this._fitRows(o,i,a,c)+10):(d=this.maxHeight,u=this._fitCols(o,r,a,c)+10),this.width=Math.min(u,e.maxWidth||this.maxWidth),this.height=Math.min(d,e.maxHeight||this.maxHeight)}_fitRows(e,n,s,r){const{ctx:i,maxWidth:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],u=this.lineWidths=[0],d=r+a;let f=e;i.textAlign="left",i.textBaseline="middle";let h=-1,m=-d;return this.legendItems.forEach((g,x)=>{const v=s+n/2+i.measureText(g.text).width;(x===0||u[u.length-1]+v+2*a>o)&&(f+=d,u[u.length-(x>0?0:1)]=0,m+=d,h++),c[x]={left:0,top:m,row:h,width:v,height:r},u[u.length-1]+=v+a}),f}_fitCols(e,n,s,r){const{ctx:i,maxHeight:o,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],u=this.columnSizes=[],d=o-e;let f=a,h=0,m=0,g=0,x=0;return this.legendItems.forEach((v,b)=>{const{itemWidth:p,itemHeight:y}=dC(s,n,i,v,r);b>0&&m+y+2*a>d&&(f+=h+a,u.push({width:h,height:m}),g+=h+a,x++,h=m=0),c[b]={left:g,top:m,col:x,width:p,height:y},h=Math.max(h,p),m+=y+a}),f+=h,u.push({width:h,height:m}),f}adjustHitBoxes(){if(!this.options.display)return;const e=this._computeTitleHeight(),{legendHitBoxes:n,options:{align:s,labels:{padding:r},rtl:i}}=this,o=Zr(i,this.left,this.width);if(this.isHorizontal()){let a=0,c=kt(s,this.left+r,this.right-this.lineWidths[a]);for(const u of n)a!==u.row&&(a=u.row,c=kt(s,this.left+r,this.right-this.lineWidths[a])),u.top+=this.top+e+r,u.left=o.leftForLtr(o.x(c),u.width),c+=u.width+r}else{let a=0,c=kt(s,this.top+e+r,this.bottom-this.columnSizes[a].height);for(const u of n)u.col!==a&&(a=u.col,c=kt(s,this.top+e+r,this.bottom-this.columnSizes[a].height)),u.top=c,u.left+=this.left+r,u.left=o.leftForLtr(o.x(u.left),u.width),c+=u.height+r}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const e=this.ctx;oc(e,this),this._draw(),ac(e)}}_draw(){const{options:e,columnSizes:n,lineWidths:s,ctx:r}=this,{align:i,labels:o}=e,a=et.color,c=Zr(e.rtl,this.left,this.width),u=_t(o.font),{padding:d}=o,f=u.size,h=f/2;let m;this.drawTitle(),r.textAlign=c.textAlign("left"),r.textBaseline="middle",r.lineWidth=.5,r.font=u.string;const{boxWidth:g,boxHeight:x,itemHeight:v}=mg(o,f),b=function(N,C,w){if(isNaN(g)||g<=0||isNaN(x)||x<0)return;r.save();const k=xe(w.lineWidth,1);if(r.fillStyle=xe(w.fillStyle,a),r.lineCap=xe(w.lineCap,"butt"),r.lineDashOffset=xe(w.lineDashOffset,0),r.lineJoin=xe(w.lineJoin,"miter"),r.lineWidth=k,r.strokeStyle=xe(w.strokeStyle,a),r.setLineDash(xe(w.lineDash,[])),o.usePointStyle){const S={radius:x*Math.SQRT2/2,pointStyle:w.pointStyle,rotation:w.rotation,borderWidth:k},P=c.xPlus(N,g/2),O=C+h;l1(r,S,P,O,o.pointStyleWidth&&g)}else{const S=C+Math.max((f-x)/2,0),P=c.leftForLtr(N,g),O=Qr(w.borderRadius);r.beginPath(),Object.values(O).some(A=>A!==0)?El(r,{x:P,y:S,w:g,h:x,radius:O}):r.rect(P,S,g,x),r.fill(),k!==0&&r.stroke()}r.restore()},p=function(N,C,w){Ao(r,w.text,N,C+v/2,u,{strikethrough:w.hidden,textAlign:c.textAlign(w.textAlign)})},y=this.isHorizontal(),_=this._computeTitleHeight();y?m={x:kt(i,this.left+d,this.right-s[0]),y:this.top+d+_,line:0}:m={x:this.left+d,y:kt(i,this.top+_+d,this.bottom-n[0].height),line:0},m1(this.ctx,e.textDirection);const j=v+d;this.legendItems.forEach((N,C)=>{r.strokeStyle=N.fontColor,r.fillStyle=N.fontColor;const w=r.measureText(N.text).width,k=c.textAlign(N.textAlign||(N.textAlign=o.textAlign)),S=g+h+w;let P=m.x,O=m.y;c.setWidth(this.width),y?C>0&&P+S+d>this.right&&(O=m.y+=j,m.line++,P=m.x=kt(i,this.left+d,this.right-s[m.line])):C>0&&O+j>this.bottom&&(P=m.x=P+n[m.line].width+d,m.line++,O=m.y=kt(i,this.top+_+d,this.bottom-n[m.line].height));const A=c.x(P);if(b(A,O,N),P=$S(k,P+g+h,y?P+S:this.right,e.rtl),p(c.x(P),O,N),y)m.x+=S+d;else if(typeof N.text!="string"){const U=u.lineHeight;m.y+=R1(N,U)+d}else m.y+=j}),g1(this.ctx,e.textDirection)}drawTitle(){const e=this.options,n=e.title,s=_t(n.font),r=mn(n.padding);if(!n.display)return;const i=Zr(e.rtl,this.left,this.width),o=this.ctx,a=n.position,c=s.size/2,u=r.top+c;let d,f=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+u,f=kt(e.align,f,this.right-h);else{const g=this.columnSizes.reduce((x,v)=>Math.max(x,v.height),0);d=u+kt(e.align,this.top,this.bottom-g-e.labels.padding-this._computeTitleHeight())}const m=kt(a,f,f+h);o.textAlign=i.textAlign(Jf(a)),o.textBaseline="middle",o.strokeStyle=n.color,o.fillStyle=n.color,o.font=s.string,Ao(o,n.text,m,d,s)}_computeTitleHeight(){const e=this.options.title,n=_t(e.font),s=mn(e.padding);return e.display?n.lineHeight+s.height:0}_getLegendItemAt(e,n){let s,r,i;if(qn(e,this.left,this.right)&&qn(n,this.top,this.bottom)){for(i=this.legendHitBoxes,s=0;s<i.length;++s)if(r=i[s],qn(e,r.left,r.left+r.width)&&qn(n,r.top,r.top+r.height))return this.legendItems[s]}return null}handleEvent(e){const n=this.options;if(!pC(e.type,n))return;const s=this._getLegendItemAt(e.x,e.y);if(e.type==="mousemove"||e.type==="mouseout"){const r=this._hoveredItem,i=uC(r,s);r&&!i&&ze(n.onLeave,[e,r,this],this),this._hoveredItem=s,s&&!i&&ze(n.onHover,[e,s,this],this)}else s&&ze(n.onClick,[e,s,this],this)}}function dC(t,e,n,s,r){const i=fC(s,t,e,n),o=hC(r,s,e.lineHeight);return{itemWidth:i,itemHeight:o}}function fC(t,e,n,s){let r=t.text;return r&&typeof r!="string"&&(r=r.reduce((i,o)=>i.length>o.length?i:o)),e+n.size/2+s.measureText(r).width}function hC(t,e,n){let s=t;return typeof e.text!="string"&&(s=R1(e,n)),s}function R1(t,e){const n=t.text?t.text.length:0;return e*n}function pC(t,e){return!!((t==="mousemove"||t==="mouseout")&&(e.onHover||e.onLeave)||e.onClick&&(t==="click"||t==="mouseup"))}var L1={id:"legend",_element:gg,start(t,e,n){const s=t.legend=new gg({ctx:t.ctx,options:n,chart:t});un.configure(t,s,n),un.addBox(t,s)},stop(t){un.removeBox(t,t.legend),delete t.legend},beforeUpdate(t,e,n){const s=t.legend;un.configure(t,s,n),s.options=n},afterUpdate(t){const e=t.legend;e.buildLabels(),e.adjustHitBoxes()},afterEvent(t,e){e.replay||t.legend.handleEvent(e.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(t,e,n){const s=e.datasetIndex,r=n.chart;r.isDatasetVisible(s)?(r.hide(s),e.hidden=!0):(r.show(s),e.hidden=!1)},onHover:null,onLeave:null,labels:{color:t=>t.chart.options.color,boxWidth:40,padding:10,generateLabels(t){const e=t.data.datasets,{labels:{usePointStyle:n,pointStyle:s,textAlign:r,color:i,useBorderRadius:o,borderRadius:a}}=t.legend.options;return t._getSortedDatasetMetas().map(c=>{const u=c.controller.getStyle(n?0:void 0),d=mn(u.borderWidth);return{text:e[c.index].label,fillStyle:u.backgroundColor,fontColor:i,hidden:!c.visible,lineCap:u.borderCapStyle,lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:u.borderColor,pointStyle:s||u.pointStyle,rotation:u.rotation,textAlign:r||u.textAlign,borderRadius:o&&(a||u.borderRadius),datasetIndex:c.index}},this)}},title:{color:t=>t.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:t=>!t.startsWith("on"),labels:{_scriptable:t=>!["generateLabels","filter","sort"].includes(t)}}};class B1 extends Sn{constructor(e){super(),this.chart=e.chart,this.options=e.options,this.ctx=e.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(e,n){const s=this.options;if(this.left=0,this.top=0,!s.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=e,this.height=this.bottom=n;const r=st(s.text)?s.text.length:1;this._padding=mn(s.padding);const i=r*_t(s.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=i:this.width=i}isHorizontal(){const e=this.options.position;return e==="top"||e==="bottom"}_drawArgs(e){const{top:n,left:s,bottom:r,right:i,options:o}=this,a=o.align;let c=0,u,d,f;return this.isHorizontal()?(d=kt(a,s,i),f=n+e,u=i-s):(o.position==="left"?(d=s+e,f=kt(a,r,n),c=Ce*-.5):(d=i-e,f=kt(a,n,r),c=Ce*.5),u=r-n),{titleX:d,titleY:f,maxWidth:u,rotation:c}}draw(){const e=this.ctx,n=this.options;if(!n.display)return;const s=_t(n.font),i=s.lineHeight/2+this._padding.top,{titleX:o,titleY:a,maxWidth:c,rotation:u}=this._drawArgs(i);Ao(e,n.text,0,0,s,{color:n.color,maxWidth:c,rotation:u,textAlign:Jf(n.align),textBaseline:"middle",translation:[o,a]})}}function mC(t,e){const n=new B1({ctx:t.ctx,options:e,chart:t});un.configure(t,n,e),un.addBox(t,n),t.titleBlock=n}var gC={id:"title",_element:B1,start(t,e,n){mC(t,n)},stop(t){const e=t.titleBlock;un.removeBox(t,e),delete t.titleBlock},beforeUpdate(t,e,n){const s=t.titleBlock;un.configure(t,s,n),s.options=n},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ui={average(t){if(!t.length)return!1;let e,n,s=new Set,r=0,i=0;for(e=0,n=t.length;e<n;++e){const a=t[e].element;if(a&&a.hasValue()){const c=a.tooltipPosition();s.add(c.x),r+=c.y,++i}}return i===0||s.size===0?!1:{x:[...s].reduce((a,c)=>a+c)/s.size,y:r/i}},nearest(t,e){if(!t.length)return!1;let n=e.x,s=e.y,r=Number.POSITIVE_INFINITY,i,o,a;for(i=0,o=t.length;i<o;++i){const c=t[i].element;if(c&&c.hasValue()){const u=c.getCenterPoint(),d=Sd(e,u);d<r&&(r=d,a=c)}}if(a){const c=a.tooltipPosition();n=c.x,s=c.y}return{x:n,y:s}}};function En(t,e){return e&&(st(e)?Array.prototype.push.apply(t,e):t.push(e)),t}function Ln(t){return(typeof t=="string"||t instanceof String)&&t.indexOf(`
`)>-1?t.split(`
`):t}function xC(t,e){const{element:n,datasetIndex:s,index:r}=e,i=t.getDatasetMeta(s).controller,{label:o,value:a}=i.getLabelAndValue(r);return{chart:t,label:o,parsed:i.getParsed(r),raw:t.data.datasets[s].data[r],formattedValue:a,dataset:i.getDataset(),dataIndex:r,datasetIndex:s,element:n}}function xg(t,e){const n=t.chart.ctx,{body:s,footer:r,title:i}=t,{boxWidth:o,boxHeight:a}=e,c=_t(e.bodyFont),u=_t(e.titleFont),d=_t(e.footerFont),f=i.length,h=r.length,m=s.length,g=mn(e.padding);let x=g.height,v=0,b=s.reduce((_,j)=>_+j.before.length+j.lines.length+j.after.length,0);if(b+=t.beforeBody.length+t.afterBody.length,f&&(x+=f*u.lineHeight+(f-1)*e.titleSpacing+e.titleMarginBottom),b){const _=e.displayColors?Math.max(a,c.lineHeight):c.lineHeight;x+=m*_+(b-m)*c.lineHeight+(b-1)*e.bodySpacing}h&&(x+=e.footerMarginTop+h*d.lineHeight+(h-1)*e.footerSpacing);let p=0;const y=function(_){v=Math.max(v,n.measureText(_).width+p)};return n.save(),n.font=u.string,Ne(t.title,y),n.font=c.string,Ne(t.beforeBody.concat(t.afterBody),y),p=e.displayColors?o+2+e.boxPadding:0,Ne(s,_=>{Ne(_.before,y),Ne(_.lines,y),Ne(_.after,y)}),p=0,n.font=d.string,Ne(t.footer,y),n.restore(),v+=g.width,{width:v,height:x}}function yC(t,e){const{y:n,height:s}=e;return n<s/2?"top":n>t.height-s/2?"bottom":"center"}function vC(t,e,n,s){const{x:r,width:i}=s,o=n.caretSize+n.caretPadding;if(t==="left"&&r+i+o>e.width||t==="right"&&r-i-o<0)return!0}function bC(t,e,n,s){const{x:r,width:i}=n,{width:o,chartArea:{left:a,right:c}}=t;let u="center";return s==="center"?u=r<=(a+c)/2?"left":"right":r<=i/2?u="left":r>=o-i/2&&(u="right"),vC(u,t,e,n)&&(u="center"),u}function yg(t,e,n){const s=n.yAlign||e.yAlign||yC(t,n);return{xAlign:n.xAlign||e.xAlign||bC(t,e,n,s),yAlign:s}}function wC(t,e){let{x:n,width:s}=t;return e==="right"?n-=s:e==="center"&&(n-=s/2),n}function kC(t,e,n){let{y:s,height:r}=t;return e==="top"?s+=n:e==="bottom"?s-=r+n:s-=r/2,s}function vg(t,e,n,s){const{caretSize:r,caretPadding:i,cornerRadius:o}=t,{xAlign:a,yAlign:c}=n,u=r+i,{topLeft:d,topRight:f,bottomLeft:h,bottomRight:m}=Qr(o);let g=wC(e,a);const x=kC(e,c,u);return c==="center"?a==="left"?g+=u:a==="right"&&(g-=u):a==="left"?g-=Math.max(d,h)+r:a==="right"&&(g+=Math.max(f,m)+r),{x:St(g,0,s.width-e.width),y:St(x,0,s.height-e.height)}}function Ca(t,e,n){const s=mn(n.padding);return e==="center"?t.x+t.width/2:e==="right"?t.x+t.width-s.right:t.x+s.left}function bg(t){return En([],Ln(t))}function jC(t,e,n){return br(t,{tooltip:e,tooltipItems:n,type:"tooltip"})}function wg(t,e){const n=e&&e.dataset&&e.dataset.tooltip&&e.dataset.tooltip.callbacks;return n?t.override(n):t}const $1={beforeTitle:Fn,title(t){if(t.length>0){const e=t[0],n=e.chart.data.labels,s=n?n.length:0;if(this&&this.options&&this.options.mode==="dataset")return e.dataset.label||"";if(e.label)return e.label;if(s>0&&e.dataIndex<s)return n[e.dataIndex]}return""},afterTitle:Fn,beforeBody:Fn,beforeLabel:Fn,label(t){if(this&&this.options&&this.options.mode==="dataset")return t.label+": "+t.formattedValue||t.formattedValue;let e=t.dataset.label||"";e&&(e+=": ");const n=t.formattedValue;return _e(n)||(e+=n),e},labelColor(t){const n=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderWidth:n.borderWidth,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(t){const n=t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex);return{pointStyle:n.pointStyle,rotation:n.rotation}},afterLabel:Fn,afterBody:Fn,beforeFooter:Fn,footer:Fn,afterFooter:Fn};function Bt(t,e,n,s){const r=t[e].call(n,s);return typeof r>"u"?$1[e].call(n,s):r}class Dd extends Sn{constructor(e){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=e.chart,this.options=e.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(e){this.options=e,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const e=this._cachedAnimations;if(e)return e;const n=this.chart,s=this.options.setContext(this.getContext()),r=s.enabled&&n.options.animation&&s.animations,i=new w1(this.chart,r);return r._cacheable&&(this._cachedAnimations=Object.freeze(i)),i}getContext(){return this.$context||(this.$context=jC(this.chart.getContext(),this,this._tooltipItems))}getTitle(e,n){const{callbacks:s}=n,r=Bt(s,"beforeTitle",this,e),i=Bt(s,"title",this,e),o=Bt(s,"afterTitle",this,e);let a=[];return a=En(a,Ln(r)),a=En(a,Ln(i)),a=En(a,Ln(o)),a}getBeforeBody(e,n){return bg(Bt(n.callbacks,"beforeBody",this,e))}getBody(e,n){const{callbacks:s}=n,r=[];return Ne(e,i=>{const o={before:[],lines:[],after:[]},a=wg(s,i);En(o.before,Ln(Bt(a,"beforeLabel",this,i))),En(o.lines,Bt(a,"label",this,i)),En(o.after,Ln(Bt(a,"afterLabel",this,i))),r.push(o)}),r}getAfterBody(e,n){return bg(Bt(n.callbacks,"afterBody",this,e))}getFooter(e,n){const{callbacks:s}=n,r=Bt(s,"beforeFooter",this,e),i=Bt(s,"footer",this,e),o=Bt(s,"afterFooter",this,e);let a=[];return a=En(a,Ln(r)),a=En(a,Ln(i)),a=En(a,Ln(o)),a}_createItems(e){const n=this._active,s=this.chart.data,r=[],i=[],o=[];let a=[],c,u;for(c=0,u=n.length;c<u;++c)a.push(xC(this.chart,n[c]));return e.filter&&(a=a.filter((d,f,h)=>e.filter(d,f,h,s))),e.itemSort&&(a=a.sort((d,f)=>e.itemSort(d,f,s))),Ne(a,d=>{const f=wg(e.callbacks,d);r.push(Bt(f,"labelColor",this,d)),i.push(Bt(f,"labelPointStyle",this,d)),o.push(Bt(f,"labelTextColor",this,d))}),this.labelColors=r,this.labelPointStyles=i,this.labelTextColors=o,this.dataPoints=a,a}update(e,n){const s=this.options.setContext(this.getContext()),r=this._active;let i,o=[];if(!r.length)this.opacity!==0&&(i={opacity:0});else{const a=Ui[s.position].call(this,r,this._eventPosition);o=this._createItems(s),this.title=this.getTitle(o,s),this.beforeBody=this.getBeforeBody(o,s),this.body=this.getBody(o,s),this.afterBody=this.getAfterBody(o,s),this.footer=this.getFooter(o,s);const c=this._size=xg(this,s),u=Object.assign({},a,c),d=yg(this.chart,s,u),f=vg(s,u,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,i={opacity:1,x:f.x,y:f.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=o,this.$context=void 0,i&&this._resolveAnimations().update(this,i),e&&s.external&&s.external.call(this,{chart:this.chart,tooltip:this,replay:n})}drawCaret(e,n,s,r){const i=this.getCaretPosition(e,s,r);n.lineTo(i.x1,i.y1),n.lineTo(i.x2,i.y2),n.lineTo(i.x3,i.y3)}getCaretPosition(e,n,s){const{xAlign:r,yAlign:i}=this,{caretSize:o,cornerRadius:a}=s,{topLeft:c,topRight:u,bottomLeft:d,bottomRight:f}=Qr(a),{x:h,y:m}=e,{width:g,height:x}=n;let v,b,p,y,_,j;return i==="center"?(_=m+x/2,r==="left"?(v=h,b=v-o,y=_+o,j=_-o):(v=h+g,b=v+o,y=_-o,j=_+o),p=v):(r==="left"?b=h+Math.max(c,d)+o:r==="right"?b=h+g-Math.max(u,f)-o:b=this.caretX,i==="top"?(y=m,_=y-o,v=b-o,p=b+o):(y=m+x,_=y+o,v=b+o,p=b-o),j=y),{x1:v,x2:b,x3:p,y1:y,y2:_,y3:j}}drawTitle(e,n,s){const r=this.title,i=r.length;let o,a,c;if(i){const u=Zr(s.rtl,this.x,this.width);for(e.x=Ca(this,s.titleAlign,s),n.textAlign=u.textAlign(s.titleAlign),n.textBaseline="middle",o=_t(s.titleFont),a=s.titleSpacing,n.fillStyle=s.titleColor,n.font=o.string,c=0;c<i;++c)n.fillText(r[c],u.x(e.x),e.y+o.lineHeight/2),e.y+=o.lineHeight+a,c+1===i&&(e.y+=s.titleMarginBottom-a)}}_drawColorBox(e,n,s,r,i){const o=this.labelColors[s],a=this.labelPointStyles[s],{boxHeight:c,boxWidth:u}=i,d=_t(i.bodyFont),f=Ca(this,"left",i),h=r.x(f),m=c<d.lineHeight?(d.lineHeight-c)/2:0,g=n.y+m;if(i.usePointStyle){const x={radius:Math.min(u,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},v=r.leftForLtr(h,u)+u/2,b=g+c/2;e.strokeStyle=i.multiKeyBackground,e.fillStyle=i.multiKeyBackground,Nd(e,x,v,b),e.strokeStyle=o.borderColor,e.fillStyle=o.backgroundColor,Nd(e,x,v,b)}else{e.lineWidth=ve(o.borderWidth)?Math.max(...Object.values(o.borderWidth)):o.borderWidth||1,e.strokeStyle=o.borderColor,e.setLineDash(o.borderDash||[]),e.lineDashOffset=o.borderDashOffset||0;const x=r.leftForLtr(h,u),v=r.leftForLtr(r.xPlus(h,1),u-2),b=Qr(o.borderRadius);Object.values(b).some(p=>p!==0)?(e.beginPath(),e.fillStyle=i.multiKeyBackground,El(e,{x,y:g,w:u,h:c,radius:b}),e.fill(),e.stroke(),e.fillStyle=o.backgroundColor,e.beginPath(),El(e,{x:v,y:g+1,w:u-2,h:c-2,radius:b}),e.fill()):(e.fillStyle=i.multiKeyBackground,e.fillRect(x,g,u,c),e.strokeRect(x,g,u,c),e.fillStyle=o.backgroundColor,e.fillRect(v,g+1,u-2,c-2))}e.fillStyle=this.labelTextColors[s]}drawBody(e,n,s){const{body:r}=this,{bodySpacing:i,bodyAlign:o,displayColors:a,boxHeight:c,boxWidth:u,boxPadding:d}=s,f=_t(s.bodyFont);let h=f.lineHeight,m=0;const g=Zr(s.rtl,this.x,this.width),x=function(w){n.fillText(w,g.x(e.x+m),e.y+h/2),e.y+=h+i},v=g.textAlign(o);let b,p,y,_,j,N,C;for(n.textAlign=o,n.textBaseline="middle",n.font=f.string,e.x=Ca(this,v,s),n.fillStyle=s.bodyColor,Ne(this.beforeBody,x),m=a&&v!=="right"?o==="center"?u/2+d:u+2+d:0,_=0,N=r.length;_<N;++_){for(b=r[_],p=this.labelTextColors[_],n.fillStyle=p,Ne(b.before,x),y=b.lines,a&&y.length&&(this._drawColorBox(n,e,_,g,s),h=Math.max(f.lineHeight,c)),j=0,C=y.length;j<C;++j)x(y[j]),h=f.lineHeight;Ne(b.after,x)}m=0,h=f.lineHeight,Ne(this.afterBody,x),e.y-=i}drawFooter(e,n,s){const r=this.footer,i=r.length;let o,a;if(i){const c=Zr(s.rtl,this.x,this.width);for(e.x=Ca(this,s.footerAlign,s),e.y+=s.footerMarginTop,n.textAlign=c.textAlign(s.footerAlign),n.textBaseline="middle",o=_t(s.footerFont),n.fillStyle=s.footerColor,n.font=o.string,a=0;a<i;++a)n.fillText(r[a],c.x(e.x),e.y+o.lineHeight/2),e.y+=o.lineHeight+s.footerSpacing}}drawBackground(e,n,s,r){const{xAlign:i,yAlign:o}=this,{x:a,y:c}=e,{width:u,height:d}=s,{topLeft:f,topRight:h,bottomLeft:m,bottomRight:g}=Qr(r.cornerRadius);n.fillStyle=r.backgroundColor,n.strokeStyle=r.borderColor,n.lineWidth=r.borderWidth,n.beginPath(),n.moveTo(a+f,c),o==="top"&&this.drawCaret(e,n,s,r),n.lineTo(a+u-h,c),n.quadraticCurveTo(a+u,c,a+u,c+h),o==="center"&&i==="right"&&this.drawCaret(e,n,s,r),n.lineTo(a+u,c+d-g),n.quadraticCurveTo(a+u,c+d,a+u-g,c+d),o==="bottom"&&this.drawCaret(e,n,s,r),n.lineTo(a+m,c+d),n.quadraticCurveTo(a,c+d,a,c+d-m),o==="center"&&i==="left"&&this.drawCaret(e,n,s,r),n.lineTo(a,c+f),n.quadraticCurveTo(a,c,a+f,c),n.closePath(),n.fill(),r.borderWidth>0&&n.stroke()}_updateAnimationTarget(e){const n=this.chart,s=this.$animations,r=s&&s.x,i=s&&s.y;if(r||i){const o=Ui[e.position].call(this,this._active,this._eventPosition);if(!o)return;const a=this._size=xg(this,e),c=Object.assign({},o,this._size),u=yg(n,e,c),d=vg(e,c,u,n);(r._to!==d.x||i._to!==d.y)&&(this.xAlign=u.xAlign,this.yAlign=u.yAlign,this.width=a.width,this.height=a.height,this.caretX=o.x,this.caretY=o.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(e){const n=this.options.setContext(this.getContext());let s=this.opacity;if(!s)return;this._updateAnimationTarget(n);const r={width:this.width,height:this.height},i={x:this.x,y:this.y};s=Math.abs(s)<.001?0:s;const o=mn(n.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;n.enabled&&a&&(e.save(),e.globalAlpha=s,this.drawBackground(i,e,r,n),m1(e,n.textDirection),i.y+=o.top,this.drawTitle(i,e,n),this.drawBody(i,e,n),this.drawFooter(i,e,n),g1(e,n.textDirection),e.restore())}getActiveElements(){return this._active||[]}setActiveElements(e,n){const s=this._active,r=e.map(({datasetIndex:a,index:c})=>{const u=this.chart.getDatasetMeta(a);if(!u)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:u.data[c],index:c}}),i=!_l(s,r),o=this._positionChanged(r,n);(i||o)&&(this._active=r,this._eventPosition=n,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(e,n,s=!0){if(n&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const r=this.options,i=this._active||[],o=this._getActiveElements(e,i,n,s),a=this._positionChanged(o,e),c=n||!_l(o,i)||a;return c&&(this._active=o,(r.enabled||r.external)&&(this._eventPosition={x:e.x,y:e.y},this.update(!0,n))),c}_getActiveElements(e,n,s,r){const i=this.options;if(e.type==="mouseout")return[];if(!r)return n.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const o=this.chart.getElementsAtEventForMode(e,i.mode,i,s);return i.reverse&&o.reverse(),o}_positionChanged(e,n){const{caretX:s,caretY:r,options:i}=this,o=Ui[i.position].call(this,e,n);return o!==!1&&(s!==o.x||r!==o.y)}}ee(Dd,"positioners",Ui);var U1={id:"tooltip",_element:Dd,positioners:Ui,afterInit(t,e,n){n&&(t.tooltip=new Dd({chart:t,options:n}))},beforeUpdate(t,e,n){t.tooltip&&t.tooltip.initialize(n)},reset(t,e,n){t.tooltip&&t.tooltip.initialize(n)},afterDraw(t){const e=t.tooltip;if(e&&e._willRender()){const n={tooltip:e};if(t.notifyPlugins("beforeTooltipDraw",{...n,cancelable:!0})===!1)return;e.draw(t.ctx),t.notifyPlugins("afterTooltipDraw",n)}},afterEvent(t,e){if(t.tooltip){const n=e.replay;t.tooltip.handleEvent(e.event,n,e.inChartArea)&&(e.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(t,e)=>e.bodyFont.size,boxWidth:(t,e)=>e.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:$1},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:t=>t!=="filter"&&t!=="itemSort"&&t!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]};const SC=(t,e,n,s)=>(typeof e=="string"?(n=t.push(e)-1,s.unshift({index:n,label:e})):isNaN(e)&&(n=null),n);function _C(t,e,n,s){const r=t.indexOf(e);if(r===-1)return SC(t,e,n,s);const i=t.lastIndexOf(e);return r!==i?n:r}const NC=(t,e)=>t===null?null:St(Math.round(t),0,e);function kg(t){const e=this.getLabels();return t>=0&&t<e.length?e[t]:t}class Ad extends hi{constructor(e){super(e),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(e){const n=this._addedLabels;if(n.length){const s=this.getLabels();for(const{index:r,label:i}of n)s[r]===i&&s.splice(r,1);this._addedLabels=[]}super.init(e)}parse(e,n){if(_e(e))return null;const s=this.getLabels();return n=isFinite(n)&&s[n]===e?n:_C(s,e,xe(n,e),this._addedLabels),NC(n,s.length-1)}determineDataLimits(){const{minDefined:e,maxDefined:n}=this.getUserBounds();let{min:s,max:r}=this.getMinMax(!0);this.options.bounds==="ticks"&&(e||(s=0),n||(r=this.getLabels().length-1)),this.min=s,this.max=r}buildTicks(){const e=this.min,n=this.max,s=this.options.offset,r=[];let i=this.getLabels();i=e===0&&n===i.length-1?i:i.slice(e,n+1),this._valueRange=Math.max(i.length-(s?0:1),1),this._startValue=this.min-(s?.5:0);for(let o=e;o<=n;o++)r.push({value:o});return r}getLabelForValue(e){return kg.call(this,e)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(e){return typeof e!="number"&&(e=this.parse(e)),e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getPixelForTick(e){const n=this.ticks;return e<0||e>n.length-1?null:this.getPixelForValue(n[e].value)}getValueForPixel(e){return Math.round(this._startValue+this.getDecimalForPixel(e)*this._valueRange)}getBasePixel(){return this.bottom}}ee(Ad,"id","category"),ee(Ad,"defaults",{ticks:{callback:kg}});function CC(t,e){const n=[],{bounds:r,step:i,min:o,max:a,precision:c,count:u,maxTicks:d,maxDigits:f,includeBounds:h}=t,m=i||1,g=d-1,{min:x,max:v}=e,b=!_e(o),p=!_e(a),y=!_e(u),_=(v-x)/(f+1);let j=vm((v-x)/g/m)*m,N,C,w,k;if(j<1e-14&&!b&&!p)return[{value:x},{value:v}];k=Math.ceil(v/j)-Math.floor(x/j),k>g&&(j=vm(k*j/g/m)*m),_e(c)||(N=Math.pow(10,c),j=Math.ceil(j*N)/N),r==="ticks"?(C=Math.floor(x/j)*j,w=Math.ceil(v/j)*j):(C=x,w=v),b&&p&&i&&AS((a-o)/i,j/1e3)?(k=Math.round(Math.min((a-o)/j,d)),j=(a-o)/k,C=o,w=a):y?(C=b?o:C,w=p?a:w,k=u-1,j=(w-C)/k):(k=(w-C)/j,eo(k,Math.round(k),j/1e3)?k=Math.round(k):k=Math.ceil(k));const S=Math.max(bm(j),bm(C));N=Math.pow(10,_e(c)?S:c),C=Math.round(C*N)/N,w=Math.round(w*N)/N;let P=0;for(b&&(h&&C!==o?(n.push({value:o}),C<o&&P++,eo(Math.round((C+P*j)*N)/N,o,jg(o,_,t))&&P++):C<o&&P++);P<k;++P){const O=Math.round((C+P*j)*N)/N;if(p&&O>a)break;n.push({value:O})}return p&&h&&w!==a?n.length&&eo(n[n.length-1].value,a,jg(a,_,t))?n[n.length-1].value=a:n.push({value:a}):(!p||w===a)&&n.push({value:w}),n}function jg(t,e,{horizontal:n,minRotation:s}){const r=Gn(s),i=(n?Math.sin(r):Math.cos(r))||.001,o=.75*e*(""+t).length;return Math.min(e/i,o)}class EC extends hi{constructor(e){super(e),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(e,n){return _e(e)||(typeof e=="number"||e instanceof Number)&&!isFinite(+e)?null:+e}handleTickRangeOptions(){const{beginAtZero:e}=this.options,{minDefined:n,maxDefined:s}=this.getUserBounds();let{min:r,max:i}=this;const o=c=>r=n?r:c,a=c=>i=s?i:c;if(e){const c=zn(r),u=zn(i);c<0&&u<0?a(0):c>0&&u>0&&o(0)}if(r===i){let c=i===0?1:Math.abs(i*.05);a(i+c),e||o(r-c)}this.min=r,this.max=i}getTickLimit(){const e=this.options.ticks;let{maxTicksLimit:n,stepSize:s}=e,r;return s?(r=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,r>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${r} ticks. Limiting to 1000.`),r=1e3)):(r=this.computeTickLimit(),n=n||11),n&&(r=Math.min(n,r)),r}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const e=this.options,n=e.ticks;let s=this.getTickLimit();s=Math.max(2,s);const r={maxTicks:s,bounds:e.bounds,min:e.min,max:e.max,precision:n.precision,step:n.stepSize,count:n.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:n.minRotation||0,includeBounds:n.includeBounds!==!1},i=this._range||this,o=CC(r,i);return e.bounds==="ticks"&&OS(o,this,"value"),e.reverse?(o.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),o}configure(){const e=this.ticks;let n=this.min,s=this.max;if(super.configure(),this.options.offset&&e.length){const r=(s-n)/Math.max(e.length-1,1)/2;n-=r,s+=r}this._startValue=n,this._endValue=s,this._valueRange=s-n}getLabelForValue(e){return th(e,this.chart.options.locale,this.options.ticks.format)}}class Od extends EC{determineDataLimits(){const{min:e,max:n}=this.getMinMax(!0);this.min=Et(e)?e:0,this.max=Et(n)?n:1,this.handleTickRangeOptions()}computeTickLimit(){const e=this.isHorizontal(),n=e?this.width:this.height,s=Gn(this.options.ticks.minRotation),r=(e?Math.sin(s):Math.cos(s))||.001,i=this._resolveTickFontOptions(0);return Math.ceil(n/Math.min(40,i.lineHeight/r))}getPixelForValue(e){return e===null?NaN:this.getPixelForDecimal((e-this._startValue)/this._valueRange)}getValueForPixel(e){return this._startValue+this.getDecimalForPixel(e)*this._valueRange}}ee(Od,"id","linear"),ee(Od,"defaults",{ticks:{callback:a1.formatters.numeric}});const dc={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},Ut=Object.keys(dc);function Sg(t,e){return t-e}function _g(t,e){if(_e(e))return null;const n=t._adapter,{parser:s,round:r,isoWeekday:i}=t._parseOpts;let o=e;return typeof s=="function"&&(o=s(o)),Et(o)||(o=typeof s=="string"?n.parse(o,s):n.parse(o)),o===null?null:(r&&(o=r==="week"&&(Mo(i)||i===!0)?n.startOf(o,"isoWeek",i):n.startOf(o,r)),+o)}function Ng(t,e,n,s){const r=Ut.length;for(let i=Ut.indexOf(t);i<r-1;++i){const o=dc[Ut[i]],a=o.steps?o.steps:Number.MAX_SAFE_INTEGER;if(o.common&&Math.ceil((n-e)/(a*o.size))<=s)return Ut[i]}return Ut[r-1]}function MC(t,e,n,s,r){for(let i=Ut.length-1;i>=Ut.indexOf(n);i--){const o=Ut[i];if(dc[o].common&&t._adapter.diff(r,s,o)>=e-1)return o}return Ut[n?Ut.indexOf(n):0]}function PC(t){for(let e=Ut.indexOf(t)+1,n=Ut.length;e<n;++e)if(dc[Ut[e]].common)return Ut[e]}function Cg(t,e,n){if(!n)t[e]=!0;else if(n.length){const{lo:s,hi:r}=Zf(n,e),i=n[s]>=e?n[s]:n[r];t[i]=!0}}function DC(t,e,n,s){const r=t._adapter,i=+r.startOf(e[0].value,s),o=e[e.length-1].value;let a,c;for(a=i;a<=o;a=+r.add(a,1,s))c=n[a],c>=0&&(e[c].major=!0);return e}function Eg(t,e,n){const s=[],r={},i=e.length;let o,a;for(o=0;o<i;++o)a=e[o],r[a]=o,s.push({value:a,major:!1});return i===0||!n?s:DC(t,s,r,n)}class Al extends hi{constructor(e){super(e),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(e,n={}){const s=e.time||(e.time={}),r=this._adapter=new mN._date(e.adapters.date);r.init(n),Ji(s.displayFormats,r.formats()),this._parseOpts={parser:s.parser,round:s.round,isoWeekday:s.isoWeekday},super.init(e),this._normalized=n.normalized}parse(e,n){return e===void 0?null:_g(this,e)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const e=this.options,n=this._adapter,s=e.time.unit||"day";let{min:r,max:i,minDefined:o,maxDefined:a}=this.getUserBounds();function c(u){!o&&!isNaN(u.min)&&(r=Math.min(r,u.min)),!a&&!isNaN(u.max)&&(i=Math.max(i,u.max))}(!o||!a)&&(c(this._getLabelBounds()),(e.bounds!=="ticks"||e.ticks.source!=="labels")&&c(this.getMinMax(!1))),r=Et(r)&&!isNaN(r)?r:+n.startOf(Date.now(),s),i=Et(i)&&!isNaN(i)?i:+n.endOf(Date.now(),s)+1,this.min=Math.min(r,i-1),this.max=Math.max(r+1,i)}_getLabelBounds(){const e=this.getLabelTimestamps();let n=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;return e.length&&(n=e[0],s=e[e.length-1]),{min:n,max:s}}buildTicks(){const e=this.options,n=e.time,s=e.ticks,r=s.source==="labels"?this.getLabelTimestamps():this._generate();e.bounds==="ticks"&&r.length&&(this.min=this._userMin||r[0],this.max=this._userMax||r[r.length-1]);const i=this.min,o=this.max,a=RS(r,i,o);return this._unit=n.unit||(s.autoSkip?Ng(n.minUnit,this.min,this.max,this._getLabelCapacity(i)):MC(this,a.length,n.minUnit,this.min,this.max)),this._majorUnit=!s.major.enabled||this._unit==="year"?void 0:PC(this._unit),this.initOffsets(r),e.reverse&&a.reverse(),Eg(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(e=>+e.value))}initOffsets(e=[]){let n=0,s=0,r,i;this.options.offset&&e.length&&(r=this.getDecimalForValue(e[0]),e.length===1?n=1-r:n=(this.getDecimalForValue(e[1])-r)/2,i=this.getDecimalForValue(e[e.length-1]),e.length===1?s=i:s=(i-this.getDecimalForValue(e[e.length-2]))/2);const o=e.length<3?.5:.25;n=St(n,0,o),s=St(s,0,o),this._offsets={start:n,end:s,factor:1/(n+1+s)}}_generate(){const e=this._adapter,n=this.min,s=this.max,r=this.options,i=r.time,o=i.unit||Ng(i.minUnit,n,s,this._getLabelCapacity(n)),a=xe(r.ticks.stepSize,1),c=o==="week"?i.isoWeekday:!1,u=Mo(c)||c===!0,d={};let f=n,h,m;if(u&&(f=+e.startOf(f,"isoWeek",c)),f=+e.startOf(f,u?"day":o),e.diff(s,n,o)>1e5*a)throw new Error(n+" and "+s+" are too far apart with stepSize of "+a+" "+o);const g=r.ticks.source==="data"&&this.getDataTimestamps();for(h=f,m=0;h<s;h=+e.add(h,a,o),m++)Cg(d,h,g);return(h===s||r.bounds==="ticks"||m===1)&&Cg(d,h,g),Object.keys(d).sort(Sg).map(x=>+x)}getLabelForValue(e){const n=this._adapter,s=this.options.time;return s.tooltipFormat?n.format(e,s.tooltipFormat):n.format(e,s.displayFormats.datetime)}format(e,n){const r=this.options.time.displayFormats,i=this._unit,o=n||r[i];return this._adapter.format(e,o)}_tickFormatFunction(e,n,s,r){const i=this.options,o=i.ticks.callback;if(o)return ze(o,[e,n,s],this);const a=i.time.displayFormats,c=this._unit,u=this._majorUnit,d=c&&a[c],f=u&&a[u],h=s[n],m=u&&f&&h&&h.major;return this._adapter.format(e,r||(m?f:d))}generateTickLabels(e){let n,s,r;for(n=0,s=e.length;n<s;++n)r=e[n],r.label=this._tickFormatFunction(r.value,n,e)}getDecimalForValue(e){return e===null?NaN:(e-this.min)/(this.max-this.min)}getPixelForValue(e){const n=this._offsets,s=this.getDecimalForValue(e);return this.getPixelForDecimal((n.start+s)*n.factor)}getValueForPixel(e){const n=this._offsets,s=this.getDecimalForPixel(e)/n.factor-n.end;return this.min+s*(this.max-this.min)}_getLabelSize(e){const n=this.options.ticks,s=this.ctx.measureText(e).width,r=Gn(this.isHorizontal()?n.maxRotation:n.minRotation),i=Math.cos(r),o=Math.sin(r),a=this._resolveTickFontOptions(0).size;return{w:s*i+a*o,h:s*o+a*i}}_getLabelCapacity(e){const n=this.options.time,s=n.displayFormats,r=s[n.unit]||s.millisecond,i=this._tickFormatFunction(e,0,Eg(this,[e],this._majorUnit),r),o=this._getLabelSize(i),a=Math.floor(this.isHorizontal()?this.width/o.w:this.height/o.h)-1;return a>0?a:1}getDataTimestamps(){let e=this._cache.data||[],n,s;if(e.length)return e;const r=this.getMatchingVisibleMetas();if(this._normalized&&r.length)return this._cache.data=r[0].controller.getAllParsedValues(this);for(n=0,s=r.length;n<s;++n)e=e.concat(r[n].controller.getAllParsedValues(this));return this._cache.data=this.normalize(e)}getLabelTimestamps(){const e=this._cache.labels||[];let n,s;if(e.length)return e;const r=this.getLabels();for(n=0,s=r.length;n<s;++n)e.push(_g(this,r[n]));return this._cache.labels=this._normalized?e:this.normalize(e)}normalize(e){return r1(e.sort(Sg))}}ee(Al,"id","time"),ee(Al,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Ea(t,e,n){let s=0,r=t.length-1,i,o,a,c;n?(e>=t[s].pos&&e<=t[r].pos&&({lo:s,hi:r}=nr(t,"pos",e)),{pos:i,time:a}=t[s],{pos:o,time:c}=t[r]):(e>=t[s].time&&e<=t[r].time&&({lo:s,hi:r}=nr(t,"time",e)),{time:i,pos:a}=t[s],{time:o,pos:c}=t[r]);const u=o-i;return u?a+(c-a)*(e-i)/u:a}class Mg extends Al{constructor(e){super(e),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const e=this._getTimestampsForTable(),n=this._table=this.buildLookupTable(e);this._minPos=Ea(n,this.min),this._tableRange=Ea(n,this.max)-this._minPos,super.initOffsets(e)}buildLookupTable(e){const{min:n,max:s}=this,r=[],i=[];let o,a,c,u,d;for(o=0,a=e.length;o<a;++o)u=e[o],u>=n&&u<=s&&r.push(u);if(r.length<2)return[{time:n,pos:0},{time:s,pos:1}];for(o=0,a=r.length;o<a;++o)d=r[o+1],c=r[o-1],u=r[o],Math.round((d+c)/2)!==u&&i.push({time:u,pos:o/(a-1)});return i}_generate(){const e=this.min,n=this.max;let s=super.getDataTimestamps();return(!s.includes(e)||!s.length)&&s.splice(0,0,e),(!s.includes(n)||s.length===1)&&s.push(n),s.sort((r,i)=>r-i)}_getTimestampsForTable(){let e=this._cache.all||[];if(e.length)return e;const n=this.getDataTimestamps(),s=this.getLabelTimestamps();return n.length&&s.length?e=this.normalize(n.concat(s)):e=n.length?n:s,e=this._cache.all=e,e}getDecimalForValue(e){return(Ea(this._table,e)-this._minPos)/this._tableRange}getValueForPixel(e){const n=this._offsets,s=this.getDecimalForPixel(e)/n.factor-n.end;return Ea(this._table,s*this._tableRange+this._minPos,!0)}}ee(Mg,"id","timeseries"),ee(Mg,"defaults",Al.defaults);const W1="label";function Pg(t,e){typeof t=="function"?t(e):t&&(t.current=e)}function AC(t,e){const n=t.options;n&&e&&Object.assign(n,e)}function V1(t,e){t.labels=e}function H1(t,e,n=W1){const s=[];t.datasets=e.map(r=>{const i=t.datasets.find(o=>o[n]===r[n]);return!i||!r.data||s.includes(i)?{...r}:(s.push(i),Object.assign(i,r),i)})}function OC(t,e=W1){const n={labels:[],datasets:[]};return V1(n,t.labels),H1(n,t.datasets,e),n}function TC(t,e){const{height:n=150,width:s=300,redraw:r=!1,datasetIdKey:i,type:o,data:a,options:c,plugins:u=[],fallbackContent:d,updateMode:f,...h}=t,m=E.useRef(null),g=E.useRef(null),x=()=>{m.current&&(g.current=new Wo(m.current,{type:o,data:OC(a,i),options:c&&{...c},plugins:u}),Pg(e,g.current))},v=()=>{Pg(e,null),g.current&&(g.current.destroy(),g.current=null)};return E.useEffect(()=>{!r&&g.current&&c&&AC(g.current,c)},[r,c]),E.useEffect(()=>{!r&&g.current&&V1(g.current.config.data,a.labels)},[r,a.labels]),E.useEffect(()=>{!r&&g.current&&a.datasets&&H1(g.current.config.data,a.datasets,i)},[r,a.datasets]),E.useEffect(()=>{g.current&&(r?(v(),setTimeout(x)):g.current.update(f))},[r,c,a.labels,a.datasets,f]),E.useEffect(()=>{g.current&&(v(),setTimeout(x))},[o]),E.useEffect(()=>(x(),()=>v()),[]),l.jsx("canvas",{ref:m,role:"img",height:n,width:s,...h,children:d})}const zC=E.forwardRef(TC);function ch(t,e){return Wo.register(e),E.forwardRef((n,s)=>l.jsx(zC,{...n,ref:s,type:t}))}const Dg=ch("line",Ya),IC=ch("bar",Ha),Cr=ch("doughnut",Bi),Td=(t,e)=>e.some(n=>t instanceof n);let Ag,Og;function FC(){return Ag||(Ag=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function RC(){return Og||(Og=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const zd=new WeakMap,ou=new WeakMap,fc=new WeakMap;function LC(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(As(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return fc.set(e,t),e}function BC(t){if(zd.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});zd.set(t,e)}let Id={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return zd.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return As(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Y1(t){Id=t(Id)}function $C(t){return RC().includes(t)?function(...e){return t.apply(Fd(this),e),As(this.request)}:function(...e){return As(t.apply(Fd(this),e))}}function UC(t){return typeof t=="function"?$C(t):(t instanceof IDBTransaction&&BC(t),Td(t,FC())?new Proxy(t,Id):t)}function As(t){if(t instanceof IDBRequest)return LC(t);if(ou.has(t))return ou.get(t);const e=UC(t);return e!==t&&(ou.set(t,e),fc.set(e,t)),e}const Fd=t=>fc.get(t);function K1(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=As(o);return s&&o.addEventListener("upgradeneeded",c=>{s(As(o.result),c.oldVersion,c.newVersion,As(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",u=>r(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}function WC(t,{blocked:e}={}){const n=indexedDB.deleteDatabase(t);return e&&n.addEventListener("blocked",s=>e(s.oldVersion,s)),As(n).then(()=>{})}const VC=["get","getKey","getAll","getAllKeys","count"],HC=["put","add","delete","clear"],au=new Map;function Tg(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(au.get(e))return au.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=HC.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||VC.includes(n)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),r&&c.done]))[0]};return au.set(e,i),i}Y1(t=>({...t,get:(e,n,s)=>Tg(e,n)||t.get(e,n,s),has:(e,n)=>!!Tg(e,n)||t.has(e,n)}));const YC=["continue","continuePrimaryKey","advance"],zg={},Rd=new WeakMap,G1=new WeakMap,KC={get(t,e){if(!YC.includes(e))return t[e];let n=zg[e];return n||(n=zg[e]=function(...s){Rd.set(this,G1.get(this)[e](...s))}),n}};async function*GC(...t){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...t)),!e)return;e=e;const n=new Proxy(e,KC);for(G1.set(n,e),fc.set(n,Fd(e));e;)yield n,e=await(Rd.get(n)||e.continue()),Rd.delete(n)}function Ig(t,e){return e===Symbol.asyncIterator&&Td(t,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&Td(t,[IDBIndex,IDBObjectStore])}Y1(t=>({...t,get(e,n,s){return Ig(e,n)?GC:t.get(e,n,s)},has(e,n){return Ig(e,n)||t.has(e,n)}}));const qC="QuickBookDB",XC=4;let $n=null,Fg=null;async function q1(t=qC){return $n&&Fg===t||($n&&($n.close(),$n=null),Fg=t,$n=await K1(t,XC,{upgrade(e,n,s,r){if(!e.objectStoreNames.contains("transactions")){const i=e.createObjectStore("transactions",{keyPath:"id",autoIncrement:!0});i.createIndex("date","date"),i.createIndex("type","type"),i.createIndex("categoryId","categoryId"),i.createIndex("personId","personId"),i.createIndex("accountId","accountId"),i.createIndex("projectId","projectId")}if(e.objectStoreNames.contains("categories")||(e.createObjectStore("categories",{keyPath:"id",autoIncrement:!0}).createIndex("type","type"),[{name:"伙食费",icon:"🍜",color:"#FF6B6B",type:"expense",group:"food"},{name:"水果",icon:"🍎",color:"#FFB6B9",type:"expense",group:"food"},{name:"餐饮",icon:"🍔",color:"#FFE66D",type:"expense",group:"food"},{name:"零食",icon:"🍪",color:"#95E1D3",type:"expense",group:"food"},{name:"饮料酒水",icon:"🥤",color:"#4ECDC4",type:"expense",group:"food"},{name:"买菜",icon:"🥬",color:"#A8D8EA",type:"expense",group:"food"},{name:"外出美食",icon:"🍱",color:"#AA96DA",type:"expense",group:"food"},{name:"早餐",icon:"🥐",color:"#FCBAD3",type:"expense",group:"food"},{name:"中餐",icon:"🍚",color:"#F38181",type:"expense",group:"food"},{name:"晚餐",icon:"🍲",color:"#FAE3D9",type:"expense",group:"food"},{name:"房租",icon:"🏠",color:"#F38181",type:"expense",group:"living"},{name:"物业费",icon:"🏢",color:"#AA96DA",type:"expense",group:"living"},{name:"水电燃气",icon:"💡",color:"#4ECDC4",type:"expense",group:"living"},{name:"电视费",icon:"📺",color:"#FFE66D",type:"expense",group:"living"},{name:"快递费",icon:"📦",color:"#95E1D3",type:"expense",group:"living"},{name:"地铁",icon:"🚇",color:"#4ECDC4",type:"expense",group:"transport"},{name:"公交",icon:"🚌",color:"#95E1D3",type:"expense",group:"transport"},{name:"打车",icon:"🚕",color:"#FFE66D",type:"expense",group:"transport"},{name:"停车",icon:"🅿️",color:"#AA96DA",type:"expense",group:"transport"},{name:"保险",icon:"🛡️",color:"#F38181",type:"expense",group:"transport"},{name:"娱乐",icon:"🎮",color:"#95E1D3",type:"expense",group:"entertainment"},{name:"购物",icon:"🛒",color:"#FFE66D",type:"expense",group:"entertainment"},{name:"工资收入",icon:"💰",color:"#4ECDC4",type:"income",group:"salary"},{name:"奖金",icon:"💸",color:"#FFE66D",type:"income",group:"salary"},{name:"兼职收入",icon:"💼",color:"#95E1D3",type:"income",group:"parttime"},{name:"理财收益",icon:"📈",color:"#FF6B6B",type:"income",group:"invest"},{name:"礼金收入",icon:"🧧",color:"#F38181",type:"income",group:"other"}].forEach(a=>{r.objectStore("categories").add(a)})),e.objectStoreNames.contains("tags")||(e.createObjectStore("tags",{keyPath:"id",autoIncrement:!0}),[{name:"日常",color:"#4ECDC4"},{name:"必要",color:"#FF6B6B"},{name:"节日",color:"#FFE66D"},{name:"冲动消费",color:"#AA96DA"}].forEach(o=>{r.objectStore("tags").add(o)})),e.objectStoreNames.contains("persons")||(e.createObjectStore("persons",{keyPath:"id",autoIncrement:!0}),[{name:"我",avatar:"👤"},{name:"家人",avatar:"👨‍👩‍👧"}].forEach(o=>{r.objectStore("persons").add(o)})),e.objectStoreNames.contains("photos")||e.createObjectStore("photos",{keyPath:"id",autoIncrement:!0}).createIndex("transactionId","transactionId"),e.objectStoreNames.contains("accounts")||(e.createObjectStore("accounts",{keyPath:"id",autoIncrement:!0}),[{name:"现金",icon:"💵",type:"cash",balance:0,color:"#4ECDC4"},{name:"银行卡",icon:"💳",type:"bank",balance:0,color:"#5C7AEA"},{name:"支付宝",icon:"📱",type:"alipay",balance:0,color:"#1677FF"},{name:"微信",icon:"💬",type:"wechat",balance:0,color:"#07C160"}].forEach(o=>{r.objectStore("accounts").add(o)})),!e.objectStoreNames.contains("budgets")){const i=e.createObjectStore("budgets",{keyPath:"id",autoIncrement:!0});i.createIndex("categoryId","categoryId"),i.createIndex("month","month")}e.objectStoreNames.contains("projects")||(e.createObjectStore("projects",{keyPath:"id",autoIncrement:!0}),[{name:"日常生活",icon:"🏠",color:"#4ECDC4",isDefault:!0},{name:"旅行",icon:"✈️",color:"#FFE66D",isDefault:!1}].forEach(o=>{r.objectStore("projects").add(o)})),e.objectStoreNames.contains("merchants")||e.createObjectStore("merchants",{keyPath:"id",autoIncrement:!0}),e.objectStoreNames.contains("recurring_rules")||e.createObjectStore("recurring_rules",{keyPath:"id",autoIncrement:!0}),e.objectStoreNames.contains("templates")||(e.createObjectStore("templates",{keyPath:"id",autoIncrement:!0}).createIndex("type","type"),[].forEach(a=>{r.objectStore("templates").add(a)}))}})),$n}function pe(){if(!$n)throw new Error("数据库未初始化");return $n}async function QC(){const e=pe().transaction(["transactions","photos","accounts"],"readwrite");await Promise.all([e.objectStore("transactions").clear(),e.objectStore("photos").clear()]);const n=e.objectStore("accounts"),s=await n.getAll();for(const r of s)r.balance=0,await n.put(r);await e.done}async function uh(){return await pe().getAll("transactions")}async function dh(t,e){return(await pe().getAll("transactions")).filter(r=>r.date>=t&&r.date<=e)}async function fh(t,e){const n=new Date(t,e-1,1).toISOString(),s=new Date(t,e,0,23,59,59).toISOString();return dh(n,s)}async function X1(t){const e=pe(),n={...t,updatedAt:Date.now(),isDeleted:0,synced:0},s=await e.add("transactions",n);return await Q1({...n}),{...n,id:s}}async function Q1(t){const e=pe(),{type:n,amount:s,accountId:r,toAccountId:i}=t;if(n==="expense"&&r){const o=await e.get("accounts",r);o&&(o.balance=(o.balance||0)-s,await e.put("accounts",o))}else if(n==="income"&&r){const o=await e.get("accounts",r);o&&(o.balance=(o.balance||0)+s,await e.put("accounts",o))}else if(n==="transfer"&&r&&i){const o=await e.get("accounts",r),a=await e.get("accounts",i);o&&(o.balance=(o.balance||0)-s,await e.put("accounts",o)),a&&(a.balance=(a.balance||0)+s,await e.put("accounts",a))}}async function ZC(t,e){const n=pe(),s=await n.get("transactions",t);if(s){await Z1(s);const r={...s,...e,updatedAt:Date.now()};return await n.put("transactions",r),await Q1(r),r}}async function Z1(t){const e=pe(),{type:n,amount:s,accountId:r,toAccountId:i}=t;if(n==="expense"&&r){const o=await e.get("accounts",r);o&&(o.balance=(o.balance||0)+s,await e.put("accounts",o))}else if(n==="income"&&r){const o=await e.get("accounts",r);o&&(o.balance=(o.balance||0)-s,await e.put("accounts",o))}else if(n==="transfer"&&r&&i){const o=await e.get("accounts",r),a=await e.get("accounts",i);o&&(o.balance=(o.balance||0)+s,await e.put("accounts",o)),a&&(a.balance=(a.balance||0)-s,await e.put("accounts",a))}}async function J1(t){const e=pe(),n=await e.get("transactions",t);n&&(await Z1(n),await e.delete("transactions",t))}async function JC(t){for(const e of t)await J1(e)}async function Rg(t,e){const n=pe();for(const s of t){const r=await n.get("transactions",s);r&&await n.put("transactions",{...r,...e,updatedAt:Date.now()})}}async function eE(t){return await pe().get("transactions",t)}async function tE(t){const e=new Date(t,0,1).toISOString(),n=new Date(t,11,31,23,59,59).toISOString();return dh(e,n)}async function hh(){return await pe().getAll("accounts")}async function pi(){return await pe().getAll("categories")}async function nE(){return await pe().getAll("tags")}async function ph(){return await pe().getAll("persons")}async function Lg(t){const e=pe(),n={...t,updatedAt:Date.now(),isDeleted:0},s=await e.add("photos",n);return{...n,id:s}}async function sE(t){await pe().delete("photos",t)}async function rE(t){return(await pe().getAll("photos")).filter(s=>s.transactionId===t)}async function iE(t,e){const n=pe(),s=new Date(t,e-1,1).toISOString(),r=new Date(t,e,0,23,59,59).toISOString(),o=(await n.getAll("transactions")).filter(u=>u.date>=s&&u.date<=r);let a=0,c=0;return o.forEach(u=>{u.type==="income"?a+=u.amount:u.type==="expense"&&(c+=u.amount)}),{income:a,expense:c,balance:a-c}}async function Bg(t,e,n="expense"){const s=pe(),r=new Date(t,e-1,1).toISOString(),i=new Date(t,e,0,23,59,59).toISOString(),o=await s.getAll("transactions"),a=await s.getAll("categories"),c=new Map(a.map(h=>[h.id,h])),u=o.filter(h=>h.date>=r&&h.date<=i&&h.type===n),d={};let f=0;return u.forEach(h=>{const m=h.categoryId;if(!d[m]){const g=c.get(m)||{id:m,name:"未知",icon:"❓",color:"#ccc"};d[m]={category:g,amount:0,count:0}}d[m].amount+=h.amount,d[m].count++,f+=h.amount}),{total:f,stats:Object.values(d).sort((h,m)=>m.amount-h.amount)}}Wo.register($r,U1,L1);function oE(){const t=Ke(),[e,n]=E.useState({today:{income:0,expense:0},week:{income:0,expense:0},month:{income:0,expense:0},year:{income:0,expense:0}}),[s,r]=E.useState({total:0,stats:[]}),[i,o]=E.useState({total:0,stats:[]}),[a,c]=E.useState({total:0,used:0,percent:0}),[u,d]=E.useState(new Date),[f,h]=E.useState(0),[m,g]=E.useState(0),[x,v]=E.useState(0),[b,p]=E.useState(!1),y=u.getFullYear(),_=u.getMonth()+1,j=`${y}-${_.toString().padStart(2,"0")}`,N=rs({onSwipedLeft:()=>w(),onSwipedRight:()=>C(),preventScrollOnSwipe:!0,trackMouse:!0,delta:50,swipeDuration:500,touchEventOptions:{passive:!1}}),C=()=>{d(new Date(u.getFullYear(),u.getMonth()-1,1))},w=()=>{d(new Date(u.getFullYear(),u.getMonth()+1,1))};E.useEffect(()=>{k()},[y,_]);const k=async()=>{try{const D=await iE(y,_),z=pe(),M=await z.getAll("accounts");let T=0,I=0;M.forEach(H=>{const Q=Number(H.balance||0);Q>=0?T+=Q:I+=Math.abs(Q)}),g(T),v(I),h(T-I);const R=await Bg(y,_,"expense"),B=await Bg(y,_,"income");r(R),o(B);const ce=(await z.getAll("budgets")).filter(H=>H.month===j).reduce((H,Q)=>H+Number(Q.amount||0),0),ge=D.expense,ue=ce>0?ge/ce*100:0;c({total:ce,used:ge,percent:ue});const Y=new Date,re=await fh(y,_),ne=re.filter(H=>new Date(H.date).toDateString()===Y.toDateString()),de=ne.filter(H=>H.type==="income").reduce((H,Q)=>H+Number(Q.amount),0),F=ne.filter(H=>H.type==="expense").reduce((H,Q)=>H+Number(Q.amount),0),V=new Date(Y);V.setDate(Y.getDate()-Y.getDay());const te=re.filter(H=>new Date(H.date)>=V),J=te.filter(H=>H.type==="income").reduce((H,Q)=>H+Number(Q.amount),0),he=te.filter(H=>H.type==="expense").reduce((H,Q)=>H+Number(Q.amount),0);n({today:{income:de,expense:F},week:{income:J,expense:he},month:{income:D.income,expense:D.expense},year:{income:D.income,expense:D.expense}})}catch(D){console.error("加载数据失败:",D)}},S=D=>new Intl.NumberFormat("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(D),P=D=>{const z=new Date;switch(D){case"today":return`${y}.${_}.${z.getDate()}`;case"week":const M=new Date(z);M.setDate(z.getDate()-z.getDay()+1);const T=new Date(M);return T.setDate(M.getDate()+6),`${M.getMonth()+1}.${M.getDate()}-${T.getMonth()+1}.${T.getDate()}`;case"month":return`${_}.1-${_}.${new Date(y,_,0).getDate()}`;case"year":return`${y}`;default:return""}},O=(D,z=20)=>{const T={Card:kd,Users:ts,Store:vd,Folder:Sl,Target:bd,Calendar:So,BarChart:xd,PieChart:cm,Globe:am,"🍜":ma,餐饮:ma,"🚌":im,交通:im,"🛒":pa,购物:pa,"🎮":om,娱乐:om,"🏠":lm,居住:lm,"📱":dm,通讯:dm,"💊":um,医疗:um,"📚":sm,教育:sm,"🍎":ma,食品酒水:ma,"🧴":pa,日用品:pa,"💰":fa,工资:fa,"🎁":ha,奖金:ha,"📈":wd,理财:wd,"💼":rm,兼职:rm,"🧧":ha,红包:ha,"💵":fa,其他收入:fa}[D]||Ky;return l.jsx(T,{size:z,strokeWidth:1.5})},A=[{icon:kd,label:"账户",color:"#FFF8E6",iconColor:"#FFB800",path:"/accounts"},{icon:ts,label:"成员统计",color:"#E8F4FD",iconColor:"#4A90E2",path:"/members"},{icon:vd,label:"商家",color:"#FFF0F6",iconColor:"#FF6B6B",path:"/statistics?tab=merchant"},{icon:Sl,label:"项目",color:"#E6F9F1",iconColor:"#4ECDC4",path:"/projects"},{icon:bd,label:"预算",color:"#F3E5F5",iconColor:"#9B59B6",path:"/budget"}],U=[{key:"today",icon:So,label:"今天",dateRange:P("today"),color:"#FFB800"},{key:"week",icon:xd,label:"本周",dateRange:P("week"),color:"#4A90E2"},{key:"month",icon:cm,label:"本月",dateRange:P("month"),color:"#FF6B6B"},{key:"year",icon:am,label:"本年",dateRange:P("year"),color:"#4ECDC4"}],L=s.stats.length>0?{labels:s.stats.map(D=>D.category.name),datasets:[{data:s.stats.map(D=>D.amount),backgroundColor:s.stats.map(D=>D.category.color),borderWidth:0,cutout:"70%"}]}:null,$={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}}};return l.jsxs("div",{className:"page home-page",...N,children:[l.jsxs("div",{className:"top-bar",children:[l.jsxs("div",{className:"book-info",children:[l.jsxs("h1",{className:"book-title",children:["我的账本 (",y,"年",_,"月)"]}),l.jsx("span",{className:"book-subtitle",children:"← 左右滑动切换月份 →"})]}),l.jsx("button",{className:"msg-btn",children:l.jsx(qy,{size:22})})]}),l.jsx("div",{className:"quick-entries-container",children:l.jsx("div",{className:"quick-entries",children:A.map((D,z)=>l.jsxs("button",{className:"quick-entry",onClick:()=>t(D.path),children:[l.jsx("div",{className:"entry-icon-wrapper",style:{backgroundColor:D.color},children:l.jsx(D.icon,{size:22,color:D.iconColor})}),l.jsx("span",{className:"entry-label",children:D.label})]},z))})}),l.jsxs("div",{className:"stats-card-container",children:[l.jsxs("div",{className:"stats-card",children:[l.jsxs("div",{className:"stats-header",children:[l.jsxs("div",{className:"stats-left",children:[l.jsx("span",{className:"stats-title",children:"账户统计"}),l.jsx("span",{className:"stats-label",children:"净资产"})]}),l.jsx("button",{className:"hide-toggle",onClick:D=>{D.stopPropagation(),p(!b)},children:b?l.jsx(Ij,{size:18}):l.jsx(Fj,{size:18})})]}),l.jsx("div",{className:"stats-amount-box",onClick:()=>t("/accounts"),children:l.jsx("span",{className:"amount",children:b?"****":S(f)})}),l.jsxs("div",{className:"stats-bottom",children:[l.jsxs("span",{className:"sub-stat",children:["总资产 ",b?"****":S(m)]}),l.jsxs("span",{className:"sub-stat",children:["总负债 ",b?"****":S(x)]})]}),l.jsx("div",{className:"stats-decoration"})]}),a.total>0&&l.jsxs("div",{className:"budget-dashboard",onClick:()=>t("/budget"),children:[l.jsxs("div",{className:"budget-dash-top",children:[l.jsx("span",{className:"b-label",children:"本月预算进度"}),l.jsxs("span",{className:"b-remain",children:["剩余 ¥",S(Math.max(0,a.total-a.used))]})]}),l.jsx("div",{className:"budget-dash-bar",children:l.jsx("div",{className:"budget-dash-fill",style:{width:`${Math.min(a.percent,100)}%`,backgroundColor:a.percent>90?"#FF5252":a.percent>70?"#FFC107":"#4CAF50"}})}),l.jsxs("div",{className:"budget-dash-bottom",children:[l.jsxs("span",{className:"b-used",children:["已用 ",a.percent.toFixed(0),"%"]}),l.jsxs("span",{className:"b-total",children:["总预算 ¥",S(a.total)]})]})]})]}),l.jsxs("div",{className:"page-content",children:[l.jsx("div",{className:"card-section time-stats",children:U.map(D=>{var z,M;return l.jsxs("div",{className:"time-stat-item clickable",onClick:()=>t(`/records?range=${D.key}`),children:[l.jsxs("div",{className:"time-stat-left",children:[l.jsx("div",{className:"time-icon-box",style:{color:D.color,backgroundColor:`${D.color}15`},children:l.jsx(D.icon,{size:20,strokeWidth:2})}),l.jsxs("div",{className:"time-info",children:[l.jsx("span",{className:"time-label",children:D.label}),l.jsx("span",{className:"time-range",children:D.dateRange})]})]}),l.jsxs("div",{className:"time-stat-right",children:[l.jsxs("div",{className:"stat-row",children:[l.jsx("span",{className:"stat-type",children:"总收入"}),l.jsx("span",{className:"stat-value income",children:S(((z=e[D.key])==null?void 0:z.income)||0)})]}),l.jsxs("div",{className:"stat-row",children:[l.jsx("span",{className:"stat-type",children:"总支出"}),l.jsx("span",{className:"stat-value expense",children:S(((M=e[D.key])==null?void 0:M.expense)||0)})]})]})]},D.key)})}),l.jsxs("div",{className:"card-section",children:[l.jsxs("div",{className:"card-header",children:[l.jsxs("span",{className:"card-title",children:[_,"月分类支出"]}),l.jsxs("div",{className:"card-summary",children:[l.jsxs("span",{children:[s.stats.length,"笔"]}),l.jsxs("span",{className:"total-expense",children:["¥ ",S(s.total)]})]})]}),l.jsxs("div",{className:"list-container",children:[s.stats.slice(0,5).map((D,z)=>l.jsxs("div",{className:"list-item",children:[l.jsx("span",{className:"rank-num",children:z+1}),l.jsx("div",{className:"category-icon-box",style:{backgroundColor:`${D.category.color}20`,color:D.category.color},children:O(D.category.name,18)}),l.jsxs("div",{className:"item-content",children:[l.jsxs("div",{className:"item-row",children:[l.jsx("span",{className:"item-name",children:D.category.name}),l.jsxs("span",{className:"item-percent",children:[D.percentage,"%"]}),l.jsxs("span",{className:"item-amount",children:["¥",S(D.amount)]})]}),l.jsx("div",{className:"progress-bg",children:l.jsx("div",{className:"progress-fill",style:{width:`${D.percentage}%`,backgroundColor:D.category.color}})})]})]},D.categoryId)),s.stats.length===0&&l.jsxs("div",{className:"empty-state",children:[l.jsx("span",{className:"empty-icon",children:"📝"}),l.jsx("p",{children:"本月暂无支出，快去记一笔吧"})]})]})]}),s.stats.length>0&&l.jsxs("div",{className:"card-section",children:[l.jsx("div",{className:"card-header",children:l.jsx("span",{className:"card-title",children:"本月支出分布"})}),l.jsxs("div",{className:"chart-container",children:[l.jsxs("div",{className:"doughnut-wrapper",children:[l.jsx(Cr,{data:L,options:$}),l.jsxs("div",{className:"chart-center-text",children:[l.jsx("span",{className:"chart-label",children:"总支出"}),l.jsx("span",{className:"chart-value",children:S(s.total)})]})]}),l.jsx("div",{className:"chart-legend-grid",children:s.stats.slice(0,4).map(D=>l.jsxs("div",{className:"legend-grid-item",children:[l.jsx("span",{className:"legend-dot",style:{backgroundColor:D.category.color}}),l.jsx("span",{className:"legend-text",children:D.category.name})]},D.categoryId))})]})]})]}),l.jsx("style",{children:`
        :root {
          --primary-brand: #FFB800; /* 随手记黄 */
          --bg-gray: #F5F6F8;
        }

        .home-page {
          padding-bottom: 90px;
          background: var(--bg-gray);
          min-height: 100vh;
        }

        /* 顶部栏 */
        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-btn, .msg-btn {
          color: #333;
          padding: 8px;
          background: none;
          border: none;
        }

        .book-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .book-title {
          font-size: 17px;
          font-weight: 600;
          color: #333;
        }

        .book-subtitle {
          font-size: 11px;
          color: #999;
          margin-top: 2px;
        }

        /* 快捷入口 */
        .quick-entries-container {
          background: #fff;
          padding-bottom: 20px;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          margin-bottom: 16px;
        }

        .quick-entries {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          padding: 24px 16px 12px;
        }

        .quick-entry {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .entry-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        
        .quick-entry:active .entry-icon-wrapper {
          transform: scale(0.95);
        }

        .entry-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        /* 统计卡片 */
        .stats-card-container {
          padding: 0 16px;
          margin-bottom: 16px;
        }

        .stats-card {
          background: linear-gradient(135deg, #3ECFC5 0%, #5AB9D6 100%);
          background-image: url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop');
          background-size: cover;
          background-position: right center;
          color: #fff;
          padding: 16px 20px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          min-height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(62, 207, 197, 0.8) 0%, rgba(90, 185, 214, 0.6) 100%);
          z-index: 1;
        }

        .stats-header {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stats-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stats-title {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
        }
        
        .stats-label {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }
        
        .stats-amount-box {
          text-align: right;
        }

        .stats-amount-box .currency {
          font-size: 16px;
          margin-right: 4px;
          font-weight: 500;
          opacity: 0.8;
          color: #F1D4A3;
        }

        .stats-amount-box .amount {
          font-size: 24px;
          font-weight: 700;
          font-family: 'DIN Alternate', sans-serif;
          letter-spacing: 0.5px;
          color: #F1D4A3;
        }

        .stats-decoration {
          position: absolute;
          right: -20px;
          bottom: -40px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(241, 212, 163, 0.1) 0%, transparent 70%);
          z-index: 1;
        }

        .hide-toggle {
          background: rgba(255,255,255,0.2);
          border: none;
          color: rgba(255,255,255,0.8);
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        .stats-amount-box {
          position: relative;
          z-index: 2;
          cursor: pointer;
          padding: 8px 0;
        }

        .stats-amount-box .amount {
          font-size: 32px;
          font-weight: 700;
          font-family: 'DIN Alternate', sans-serif;
          letter-spacing: 0.5px;
          color: #F1D4A3;
        }

        .stats-bottom {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 16px;
        }

        .sub-stat {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }
        
        /* 预算仪表盘样式 */
        .budget-dashboard {
            background: #fff;
            border-radius: 12px;
            padding: 12px 16px;
            margin-top: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .budget-dash-top {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            font-weight: 500;
            color: #333;
        }
        
        .b-remain {
            color: var(--primary-brand);
        }
        
        .budget-dash-bar {
            height: 6px;
            background: #F0F0F0;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .budget-dash-fill {
            height: 100%;
            border-radius: 3px;
            transition: width 0.3s ease;
        }
        
        .budget-dash-bottom {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #999;
        }

        /* 页面内容区 */
        .page-content {
          padding: 0 16px;
        }

        .card-section {
          background: #fff;
          border-radius: 16px;
          padding: 6px 0;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        
        .card-header {
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f9f9f9;
        }
        
        .card-title {
          font-size: 15px;
          font-weight: 600;
          color: #333;
          position: relative;
          padding-left: 10px;
        }
        
        .card-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 14px;
          background: var(--primary-brand);
          border-radius: 2px;
        }
        
        .card-summary {
          font-size: 12px;
          color: #999;
          display: flex;
          gap: 8px;
        }
        
        .total-expense {
          color: #333;
          font-weight: 500;
        }

        /* 时间统计列表 */
        .time-stat-item {
          display: flex;
          align-items: center;
          padding: 16px;
          position: relative;
        }
        
        .time-stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 56px;
          right: 0;
          height: 1px;
          background: #f9f9f9;
        }

        .time-stat-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        
        .time-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .time-info {
          display: flex;
          flex-direction: column;
        }
        
.time-label {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
        
        .time-range {
          font-size: 11px;
          color: #999;
          margin-top: 2px;
        }
        
        .time-stat-right {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .stat-row {
          font-size: 11px;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
        }
        
        .stat-value {
          font-size: 14px;
          font-weight: 500;
          font-family: 'DIN Alternate', sans-serif;
          min-width: 60px;
          text-align: right;
        }
        
        .stat-value.income { color: #FF6B6B; }
        .stat-value.expense { color: #00BFA5; }
        
        /* 分类列表 */
        .list-container {
          padding: 8px 0;
        }
        
        .list-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          gap: 12px;
        }
        
        .rank-num {
          font-size: 14px;
          color: #ccc;
          font-weight: 500;
          width: 16px;
          text-align: center;
        }
        
        .category-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .item-name {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
        
        .item-percent {
          font-size: 12px;
          color: #999;
          margin-left: auto;
          margin-right: 12px;
        }
        
        .item-amount {
          font-size: 14px;
          color: #333;
          font-weight: 600;
          width: 70px;
          text-align: right;
        }
        
        .progress-bg {
          height: 4px;
          background: #f0f0f0;
          border-radius: 2px;
          overflow: hidden;
          width: 100%;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 2px;
        }
        
        .empty-state {
          text-align: center;
          padding: 30px;
          color: #999;
          font-size: 13px;
        }
        
        .empty-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 8px;
        }

        /* 图表区域 */
        .chart-container {
          padding: 20px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .doughnut-wrapper {
          width: 120px;
          height: 120px;
          position: relative;
        }
        
        .chart-center-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .chart-label {
          font-size: 10px;
          color: #999;
        }
        
        .chart-value {
          font-size: 12px;
          font-weight: 600;
          color: #333;
        }
        
        .chart-legend-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding-left: 24px;
        }
        
        .legend-grid-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
        }
        
        .legend-text {
          font-size: 12px;
          color: #666;
        }
      `})]})}function aE(){const t=Ke(),[e]=Hf(),n=e.get("range")||"month",s=rs({onSwipedRight:()=>t(-1),trackMouse:!0,delta:50,swipeDuration:500,touchEventOptions:{passive:!1}}),r=e.get("date"),i=r?new Date(r):new Date,[o,a]=E.useState([]),[c,u]=E.useState([]),[d,f]=E.useState(!1),[h,m]=E.useState(new Set),[g,x]=E.useState([]),[v,b]=E.useState([]),[p,y]=E.useState(null),[_,j]=E.useState(!1),[N,C]=E.useState(n),[w,k]=E.useState(!1),[S,P]=E.useState(!1),O=i.getFullYear(),A=i.getMonth()+1,U=()=>{switch(n){case"today":return"今天";case"week":return"本周";case"month":return"本月";case"year":return"本年";default:return"明细"}},L=()=>{const Y=new Date;switch(n){case"today":return{start:new Date(Y.setHours(0,0,0,0)),end:new Date(Y.setHours(23,59,59,999))};case"week":const re=new Date(Y);re.setDate(Y.getDate()-Y.getDay()),re.setHours(0,0,0,0);const ne=new Date(re);return ne.setDate(re.getDate()+6),ne.setHours(23,59,59,999),{start:re,end:ne};case"month":return{start:new Date(O,A-1,1),end:new Date(O,A,0,23,59,59)};case"year":return{start:new Date(O,0,1),end:new Date(O,11,31,23,59,59)};default:return{start:new Date(O,A-1,1),end:new Date(O,A,0,23,59,59)}}};E.useEffect(()=>{$()},[n,e]);const $=async()=>{try{const{start:Y,end:re}=L(),[ne,de,F,V]=await Promise.all([dh(Y,re),pi(),nE(),ph()]);let te=ne;const J=e.get("categoryId"),he=e.get("accountId"),H=e.get("merchantId"),Q=e.get("projectId"),ae=e.get("personId");J&&(te=te.filter(fe=>String(fe.categoryId)===J)),he&&(te=te.filter(fe=>String(fe.accountId)===he||String(fe.toAccountId)===he)),H&&(te=te.filter(fe=>String(fe.merchant)===H)),H&&(te=te.filter(fe=>fe.merchant===H)),Q&&(te=te.filter(fe=>String(fe.projectId)===Q)),Q&&(te=te.filter(fe=>fe.project===Q)),ae&&(te=te.filter(fe=>String(fe.personId)===ae)),a(te.sort((fe,be)=>new Date(be.date)-new Date(fe.date))),u(de),x(F),b(V)}catch(Y){console.error("加载失败:",Y)}},D=Y=>new Intl.NumberFormat("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(Y),z=Y=>c.find(re=>re.id===Y)||{name:"未知",icon:"❓",color:"#999"},M=o.reduce((Y,re)=>{const ne=re.date;return Y[ne]||(Y[ne]=[]),Y[ne].push(re),Y},{}),T=Object.keys(M).sort((Y,re)=>new Date(re)-new Date(Y)),I=Y=>{const re=new Set(h);re.has(Y)?re.delete(Y):re.add(Y),m(re)},R=async()=>{if(h.size!==0&&confirm(`确定删除选中的 ${h.size} 条记录吗？`))try{await JC(Array.from(h)),await $(),f(!1)}catch(Y){alert("删除失败："+Y.message)}},B=async Y=>{if(h.size!==0)try{await Rg(Array.from(h),{tagId:Y}),await $(),k(!1),f(!1)}catch(re){alert("更新失败："+re.message)}},K=async Y=>{if(h.size!==0)try{await Rg(Array.from(h),{personId:Y}),await $(),P(!1),f(!1)}catch(re){alert("更新失败："+re.message)}},se=Y=>{t(`/add?edit=${Y}`)},ce=async Y=>{if(confirm("确定删除这条记录吗？"))try{await J1(Y),await $()}catch(re){alert("删除失败："+re.message)}},ge=o.filter(Y=>Y.type==="income").reduce((Y,re)=>Y+Number(re.amount),0),ue=o.filter(Y=>Y.type==="expense").reduce((Y,re)=>Y+Number(re.amount),0);return l.jsxs("div",{className:"page records-page",...s,children:[l.jsxs("div",{className:"banner-area",children:[l.jsxs("div",{className:"banner-navbar",children:[l.jsxs("button",{className:"nav-icon-btn",onClick:()=>t(-1),children:[l.jsx(fn,{size:24,color:"#fff"}),l.jsx("span",{style:{color:"#fff",fontSize:"16px",marginLeft:4},children:U()})]}),l.jsxs("div",{className:"nav-actions",children:[l.jsx("button",{className:"nav-icon-btn",children:l.jsx(So,{size:22,color:"#fff"})}),l.jsx("button",{className:"nav-icon-btn",children:l.jsx(qj,{size:22,color:"#fff"})}),d?l.jsx("button",{className:"nav-icon-btn",onClick:()=>{f(!1),m(new Set)},children:l.jsx("span",{style:{color:"#fff",fontSize:"14px"},children:"完成"})}):l.jsx("button",{className:"nav-icon-btn",onClick:()=>f(!0),children:l.jsx(Aj,{size:22,color:"#fff"})})]})]}),l.jsxs("div",{className:"banner-content",children:[l.jsxs("div",{className:"balance-section",children:[l.jsx("div",{className:"balance-label",children:"结余"}),l.jsx("div",{className:"balance-value",children:D(ge-ue)})]}),l.jsxs("div",{className:"income-expense-row",children:[l.jsxs("div",{className:"stat-item",children:[l.jsx("span",{className:"stat-label",children:"收入"}),l.jsx("span",{className:"stat-num",children:D(ge)})]}),l.jsx("div",{className:"stat-divider",children:"|"}),l.jsxs("div",{className:"stat-item",children:[l.jsx("span",{className:"stat-label",children:"支出"}),l.jsx("span",{className:"stat-num",children:D(ue)})]})]})]})]}),l.jsxs("div",{className:"filter-bar-sticky",children:[l.jsxs("div",{className:`filter-item time-filter ${_?"active":""}`,onClick:()=>j(!_),children:[l.jsx("span",{children:N==="year"?"年":N==="quarter"?"季":N==="month"?"月":N==="week"?"周":"天"}),l.jsx(Dt,{size:12,className:_?"rotate":""})]}),l.jsxs("div",{className:"filter-item",children:[l.jsx("span",{children:"分类"}),l.jsx(Dt,{size:12})]}),l.jsx("div",{className:"filter-item",children:l.jsx("span",{children:"账户"})}),l.jsxs("div",{className:"filter-item",children:[l.jsx("span",{children:"项目"}),l.jsx(Dt,{size:12})]}),l.jsxs("div",{className:"filter-item",children:[l.jsx("span",{children:"更多"}),l.jsx(Dt,{size:12})]})]}),_&&l.jsx("div",{className:"range-modal-overlay",onClick:()=>j(!1),children:l.jsx("div",{className:"range-modal",onClick:Y=>Y.stopPropagation(),children:[{key:"year",label:"年"},{key:"quarter",label:"季"},{key:"month",label:"月"},{key:"week",label:"周"},{key:"today",label:"天"}].map(Y=>l.jsx("div",{className:`range-option ${N===Y.key?"active":""}`,onClick:()=>{C(Y.key),j(!1),t(`/records?range=${Y.key}`,{replace:!0})},children:Y.label},Y.key))})}),l.jsxs("div",{className:"records-list",children:[l.jsxs("div",{className:"month-summary-header",children:[l.jsxs("div",{className:"month-date",children:[l.jsxs("span",{className:"month-val",children:[A,"月"]}),l.jsx("span",{className:"year-val",children:O})]}),l.jsxs("div",{className:"month-stats",children:[l.jsxs("div",{className:"stats-row",children:[l.jsx("span",{className:"label",children:"结余"}),l.jsx("span",{className:"val",children:D(ge-ue)}),l.jsx("div",{className:"arrow-box",children:l.jsx(Dt,{size:12,color:"#999"})})]}),l.jsxs("div",{className:"stats-detail",children:[l.jsxs("span",{children:["收入 ",D(ge)]}),l.jsx("span",{className:"divider",children:"|"}),l.jsxs("span",{children:["支出 ",D(ue)]})]})]})]}),T.map(Y=>{const re=M[Y],ne=new Date(Y).getDay(),de=["周日","周一","周二","周三","周四","周五","周六"];return l.jsxs("div",{className:"day-group",children:[l.jsx("div",{className:"day-simple-header",children:l.jsxs("span",{children:[Y.split("-")[2],"日 ",de[ne]]})}),re.map(F=>{var J;const V=z(F.categoryId),te=h.has(F.id);return l.jsxs("div",{className:`record-item ${d&&te?"selected":""}`,onClick:()=>{d?I(F.id):se(F.id)},children:[d&&l.jsx("div",{className:"selection-checkbox",children:te?l.jsx(_o,{size:16,color:"white"}):null}),l.jsx("div",{className:"category-icon",style:{backgroundColor:"#fff"},children:l.jsx("span",{style:{fontSize:"24px"},children:V.icon})}),l.jsxs("div",{className:"record-content",children:[l.jsxs("div",{className:"record-main",children:[l.jsx("span",{className:"category-name",children:V.name}),l.jsx("span",{className:`amount ${F.type}`,children:D(F.amount)})]}),l.jsx("div",{className:"record-sub",children:l.jsxs("div",{className:"sub-left",children:[F.remark&&l.jsx("span",{className:"remark",children:F.remark}),l.jsxs("div",{className:"meta-info",children:[l.jsx("span",{children:"现金"}),l.jsx("span",{children:" · "}),l.jsx("span",{children:((J=v.find(he=>he.id===F.personId))==null?void 0:J.name)||"我"}),l.jsx("span",{children:" · "}),l.jsx("span",{children:F.date.split("T")[1]})]})]})})]}),!d&&l.jsx("button",{className:"delete-btn",onClick:he=>{he.stopPropagation(),ce(F.id)},children:l.jsx(In,{size:16,color:"#ccc"})})]},F.id)})]},Y)}),o.length===0&&l.jsxs("div",{className:"empty-state",children:[l.jsx("div",{className:"empty-illustration",children:l.jsxs("svg",{width:"100",height:"100",viewBox:"0 0 100 100",fill:"none",children:[l.jsx("circle",{cx:"50",cy:"50",r:"48",fill:"#F5F5F5"}),l.jsx("rect",{x:"30",y:"30",width:"40",height:"50",rx:"4",fill:"#E0E0E0"}),l.jsx("rect",{x:"35",y:"36",width:"20",height:"4",rx:"2",fill:"#BDBDBD"}),l.jsx("rect",{x:"35",y:"44",width:"30",height:"4",rx:"2",fill:"#BDBDBD"}),l.jsx("rect",{x:"35",y:"52",width:"25",height:"4",rx:"2",fill:"#BDBDBD"}),l.jsx("path",{d:"M60 65 L70 75 L65 70",stroke:"#FFB800",strokeWidth:"3",strokeLinecap:"round"})]})}),l.jsx("p",{className:"empty-title",children:"无流水"}),l.jsx("p",{className:"empty-subtitle",children:"什么都还没有呢，快去添加吧"}),l.jsx("button",{className:"add-record-btn",onClick:()=>t("/add"),children:"记一笔"})]})]}),d&&l.jsxs("div",{className:"batch-actions",children:[l.jsxs("button",{className:"batch-btn delete",onClick:R,disabled:h.size===0,children:[l.jsx(In,{size:20}),l.jsx("span",{children:"删除"})]}),l.jsxs("button",{className:"batch-btn",onClick:()=>k(!0),disabled:h.size===0,children:[l.jsx(Xj,{size:20}),l.jsx("span",{children:"标签"})]}),l.jsxs("button",{className:"batch-btn",onClick:()=>P(!0),disabled:h.size===0,children:[l.jsx(ts,{size:20}),l.jsx("span",{children:"人员"})]})]}),w&&l.jsx("div",{className:"modal-overlay",onClick:()=>k(!1),children:l.jsxs("div",{className:"modal-content",onClick:Y=>Y.stopPropagation(),children:[l.jsx("h3",{children:"批量设置标签"}),l.jsxs("div",{className:"tag-list",children:[g.map(Y=>l.jsx("button",{className:"tag-option",onClick:()=>B(Y.id),children:Y.name},Y.id)),l.jsx("button",{className:"tag-option clear",onClick:()=>B(null),children:"清除标签"})]})]})}),S&&l.jsx("div",{className:"modal-overlay",onClick:()=>P(!1),children:l.jsxs("div",{className:"modal-content",onClick:Y=>Y.stopPropagation(),children:[l.jsx("h3",{children:"批量设置人员"}),l.jsxs("div",{className:"person-list",children:[v.map(Y=>l.jsxs("button",{className:"person-option",onClick:()=>K(Y.id),children:[Y.avatar," ",Y.name]},Y.id)),l.jsx("button",{className:"person-option clear",onClick:()=>K(null),children:"清除人员"})]})]})}),l.jsx("style",{children:`
        .records-page {
          background: #fff;
          padding-bottom: 90px;
          min-height: 100vh;
        }

        .banner-area {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 200px;
            position: relative;
            color: #fff;
            display: flex;
            flex-direction: column;
        }
        
        .banner-navbar {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            padding-top: calc(12px + var(--safe-area-top));
        }
        
        .nav-icon-btn {
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            padding: 8px;
        }
        
        .nav-actions {
            display: flex;
            gap: 8px;
        }

        .banner-content {
            position: relative;
            z-index: 2;
            padding: 0 20px;
            margin-top: 20px;
        }
        
        .balance-section {
            margin-bottom: 12px;
        }
        
        .balance-label {
            font-size: 13px;
            opacity: 0.8;
            margin-bottom: 4px;
        }
        
        .balance-value {
            font-size: 32px;
            font-weight: 500;
            font-family: 'DIN Alternate', sans-serif;
        }
        
        .income-expense-row {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            opacity: 0.9;
        }
        
        .stat-item {
            display: flex;
            gap: 4px;
        }
        
        .stat-divider { opacity: 0.5; }

        /* 筛选栏 */
        .filter-bar-sticky {
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            padding: 12px 20px;
            border-bottom: 1px solid #f5f5f5;
            box-shadow: 0 2px 5px rgba(0,0,0,0.02);
        }

        /* 针对PC端居中优化的关键：继承父元素的max-width */
        @media (min-width: 768px) {
            .filter-bar-sticky {
               max-width: 480px;
               margin: 0 auto;
               left: 50%;
               transform: translateX(-50%); /* 实际上由于是sticky，可能不需要transform，但为了保险起见 */
               /* 由于sticky是相对于父元素的，如果records-page是受限的，那么sticky也是受限的 */
               /* 这里不需要额外的 max-width，只要 records-page 是受限的即可。之前在App.css里已经限制了#root */
               /* 但是如果 filter-bar-sticky 是 fixed，就需要限制。现在是 sticky，应该跟随父流 */
               position: sticky;
               left: auto;
               transform: none;
            }
        }

        .filter-item {
            font-size: 13px;
            color: #666;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        /* 列表部分 */
        .month-summary-header {
            padding: 16px 20px;
            background: #fff;
            border-bottom: 1px solid #f9f9f9;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        
        .month-date {
            display: flex;
            flex-direction: column;
        }
        
        .month-val {
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
        
        .year-val {
            font-size: 12px;
            color: #999;
        }
        
        .month-stats {
            text-align: right;
        }
        
        .stats-row {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 6px;
            margin-bottom: 4px;
        }
        
        .stats-row .label { color: #999; font-size: 12px; }
        .stats-row .val { color: #333; font-weight: 600; font-size: 16px; }
        .arrow-box {
            background: #f5f5f5;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .stats-detail {
            font-size: 11px;
            color: #999;
            display: flex;
            gap: 6px;
            justify-content: flex-end;
        }
        
        .stats-detail .income { color: #FF6B6B; }

        /* 日分组 */
        .day-group {
            margin-bottom: 0;
        }
        
        .day-simple-header {
            padding: 8px 20px;
            font-size: 12px;
            color: #999;
            background: #fff;
        }

        .record-item {
          display: flex;
          align-items: flex-start; /* 对齐顶部 */
          padding: 12px 20px;
          gap: 12px;
          position: relative;
        }

        .record-item:active {
          background: #f9f9f9;
        }

        .record-item.selected {
          background: #FFF8E6;
        }
        
        .record-content {
            flex: 1;
            padding-bottom: 12px;
            border-bottom: 1px solid #f9f9f9;
        }

        .record-main {
             display: flex;
             justify-content: space-between;
             align-items: center;
             margin-bottom: 4px;
        }
        
        .category-name {
            font-size: 16px;
            color: #333;
            font-weight: 500;
        }
        
        .amount {
            font-size: 16px; 
            font-weight: 500;
            font-family: 'DIN Alternate', sans-serif;
        }
        
        .amount.expense { color: #333; }
        .amount.income { color: #FF6B6B; } /* 随手记收入是红色的 */ --expense实际上随手记支出是绿的？不对，随手记支出是绿色/黑色，收入是红色。这里沿用之前的 */
        .amount.expense { color: #00BB9C; } /* 随手记经典绿 */
        .amount.income { color: #FF5959; } /* 随手记红 */
        
        .record-sub {
            font-size: 11px;
            color: #999;
            display: flex;
            justify-content: space-between;
        }
        
        .sub-left {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        
        .meta-info {
            display: flex;
            gap: 4px;
            font-size: 11px;
            opacity: 0.8;
        }

        .selection-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
        }

        .selected .selection-checkbox {
          background: var(--primary);
          border-color: var(--primary);
        }

        .category-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .delete-btn {
          padding: 8px;
          opacity: 0.5;
        }
        
        /* 批量操作栏 PC端适配 */
        .batch-actions {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          display: flex;
          justify-content: space-around;
          padding: 12px 16px;
          padding-bottom: calc(12px + var(--safe-area-bottom));
          box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
          z-index: 20;
        }
        
        @media (min-width: 768px) {
           .batch-actions {
               max-width: 480px;
               left: 50%;
               transform: translateX(-50%);
           }
           .modal-overlay {
               /* 这里的overlay如果是fixed全屏，不需要max-width，但modal-content需要 */
               align-items: center; /* PC端居中显示模态框更好看 */
           }
        }

        .batch-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #666;
        }

        .batch-btn.delete { color: #FF6B6B; }
        .batch-btn:disabled { opacity: 0.3; }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
        }

        .modal-content {
          background: #fff;
          width: 80%;
          max-width: 320px;
          border-radius: 16px;
          padding: 20px;
        }

        .modal-content h3 {
          margin-bottom: 16px;
          text-align: center;
        }

        .tag-list, .person-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-option, .person-option {
          padding: 8px 12px;
          background: #f5f5f5;
          border-radius: 20px;
          font-size: 13px;
        }

        .tag-option.clear, .person-option.clear {
          background: #ffebeb;
          color: #ff4d4f;
        }

        /* 空状态样式 */
        .empty-state { 
          text-align: center; 
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .empty-illustration {
          margin-bottom: 16px;
        }

        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .empty-subtitle {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        .add-record-btn {
          margin-top: 16px;
          padding: 10px 32px;
          background: #fff;
          border: 2px solid #FFB800;
          color: #FFB800;
          border-radius: 24px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }

        /* 时间范围选择器样式 */
        .filter-item.time-filter.active span {
          color: #FFB800;
        }

        .filter-item .rotate {
          transform: rotate(180deg);
          transition: transform 0.2s;
        }

        .range-modal-overlay {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          background: rgba(0,0,0,0.3);
          z-index: 999;
          display: flex;
          align-items: flex-end;
        }

        .range-modal {
          background: #fff;
          width: 100%;
          border-radius: 16px 16px 0 0;
          padding: 16px 0;
          padding-bottom: calc(16px + var(--safe-area-bottom));
        }

        .range-option {
          padding: 16px 24px;
          font-size: 16px;
          color: #333;
          cursor: pointer;
        }

        .range-option.active {
          color: #FFB800;
          font-weight: 600;
        }

        .range-option:active {
          background: #f5f5f5;
        }
      `})]})}Wo.register($r,U1,L1,Ad,Od,qa,bs,Xa,gC,cC);const Pi=[{key:"basic",label:"收支"},{key:"category",label:"分类"},{key:"merchant",label:"商家"},{key:"project",label:"项目"},{key:"member",label:"成员"},{key:"account",label:"账户"}];function lE(){const t=Ke(),e=$s(),s=new URLSearchParams(e.search).get("tab")||"basic",[r,i]=E.useState(s),o=rs({onSwipedLeft:()=>a("next"),onSwipedRight:()=>a("prev"),preventScrollOnSwipe:!0,trackMouse:!0,delta:50,swipeDuration:500,touchEventOptions:{passive:!1}}),a=F=>{const V=Pi.findIndex(J=>J.key===r);let te=F==="next"?V+1:V-1;te<0&&(te=Pi.length-1),te>=Pi.length&&(te=0),i(Pi[te].key)},[c,u]=E.useState([]),[d,f]=E.useState([]),[h,m]=E.useState([]),[g,x]=E.useState(new Date),[v,b]=E.useState("year"),[p,y]=E.useState("monthly"),[_,j]=E.useState(!1),N=()=>{const F=g.getFullYear();if(v==="year")return`${F}年`;const V=g.getMonth()+1;return`${F}年${V}月`},C=F=>{const V=new Date(g);v==="year"?V.setFullYear(V.getFullYear()+F):V.setMonth(V.getMonth()+F),x(V)},[w,k]=E.useState("expense"),[S,P]=E.useState(null),[O,A]=E.useState(null),[U,L]=E.useState(null),[$,D]=E.useState(null),[z,M]=E.useState(null),[T,I]=E.useState(null),[R,B]=E.useState(null);E.useEffect(()=>{K()},[r,w,p,g,v]);const K=async()=>{const F=pe(),[V,te,J,he,H]=await Promise.all([uh(),F.getAll("accounts"),F.getAll("categories"),F.getAll("projects"),F.getAll("persons")]);m(J);const Q=g.getFullYear(),ae=g.getMonth()+1,fe=V.filter(be=>{const Fe=new Date(be.date);return v==="year"?Fe.getFullYear()===Q:Fe.getFullYear()===Q&&Fe.getMonth()+1===ae});r==="basic"?(ce(fe,J,te),se(fe)):r==="project"?ge(V,he):r==="member"?ue(V,H):r==="account"?Y(te,V):r==="category"?re(V,J,w):r==="merchant"&&ne(V)},se=F=>{const V={};F.forEach(he=>{const H=new Date(he.date),Q=new Date(Date.UTC(H.getFullYear(),H.getMonth(),H.getDate())),ae=Q.getUTCDay()||7;Q.setUTCDate(Q.getUTCDate()+4-ae);const fe=new Date(Date.UTC(Q.getUTCFullYear(),0,1)),be=Math.ceil(((Q-fe)/864e5+1)/7),Fe=`${Q.getUTCFullYear()}-W${be}`;V[Fe]||(V[Fe]={key:Fe,income:0,expense:0,label:`${be}周`}),he.type==="income"&&(V[Fe].income+=Number(he.amount)),he.type==="expense"&&(V[Fe].expense+=Number(he.amount))});const J=Object.values(V).sort((he,H)=>he.key.localeCompare(H.key)).slice(-12);A({weeks:J,totalIncome:J.reduce((he,H)=>he+H.income,0),totalExpense:J.reduce((he,H)=>he+H.expense,0)})},ce=(F,V,te)=>{const J=F.filter(ie=>ie.type==="income").reduce((ie,Se)=>ie+Number(Se.amount),0),he=F.filter(ie=>ie.type==="expense").reduce((ie,Se)=>ie+Number(Se.amount),0),H=J-he,Q=F.length,ae={};F.filter(ie=>ie.type==="income").forEach(ie=>{ae[ie.categoryId]=(ae[ie.categoryId]||0)+Number(ie.amount)});let fe=Object.keys(ae).map(ie=>{const Se=V.find(Ae=>Ae.id===Number(ie))||{name:"未知",icon:"❓"};return{name:Se.name,icon:Se.icon,amount:ae[ie],id:Se.id}}).sort((ie,Se)=>Se.amount-ie.amount).slice(0,3);fe.length===0&&(fe=V.filter(ie=>ie.type==="income").slice(0,3).map(ie=>({name:ie.name,icon:ie.icon,amount:0,id:ie.id})));const be={};F.filter(ie=>ie.type==="expense").forEach(ie=>{be[ie.categoryId]=(be[ie.categoryId]||0)+Number(ie.amount)});let Fe=Object.keys(be).map(ie=>{const Se=V.find(Ae=>Ae.id===Number(ie))||{name:"未知",icon:"❓"};return{name:Se.name,icon:Se.icon,amount:be[ie],id:Se.id}}).sort((ie,Se)=>Se.amount-ie.amount).slice(0,1);Fe.length===0&&(Fe=V.filter(ie=>ie.type==="expense").slice(0,1).map(ie=>({name:ie.name,icon:ie.icon,amount:0,id:ie.id})));const Ge=Array.from({length:12},(ie,Se)=>Se+1).map(ie=>{const Se=F.filter(rt=>new Date(rt.date).getMonth()+1===ie),Ae=Se.filter(rt=>rt.type==="income").reduce((rt,is)=>rt+Number(is.amount),0),Oe=Se.filter(rt=>rt.type==="expense").reduce((rt,is)=>rt+Number(is.amount),0);return{m:ie,inc:Ae,exp:Oe}}),Me=te.map(ie=>{let Se=Number(ie.balance||0);return F.forEach(Ae=>{const Oe=Number(Ae.amount);Ae.accountId===ie.id&&(Ae.type==="expense"&&(Se-=Oe),Ae.type==="income"&&(Se+=Oe),Ae.type==="transfer"&&(Se-=Oe)),Ae.toAccountId===ie.id&&Ae.type==="transfer"&&(Se+=Oe)}),{...ie,_bal:Se}}),ht=Me.filter(ie=>!["credit_card","loan"].includes(ie.type)),Kt=Me.filter(ie=>["credit_card","loan"].includes(ie.type));P({surplus:H,totalIncome:J,totalExpense:he,count:Q,topIncome:fe,topExpense:Fe,monthlyData:Ge,assets:ht,liabilities:Kt,dynAccs:Me})},ge=(F,V)=>{let te=0,J=0,he=0;const H=V.map(Q=>{const ae=F.filter(je=>je.projectId===Q.id),fe=ae.filter(je=>je.type==="income").reduce((je,Ge)=>je+Number(Ge.amount),0),be=ae.filter(je=>je.type==="expense").reduce((je,Ge)=>je+Number(Ge.amount),0),Fe=fe-be;return te+=Fe,J+=fe,he+=be,{id:Q.id,name:Q.name,icon:Q.icon,inc:fe,exp:be,bal:Fe}}).sort((Q,ae)=>Q.bal-ae.bal);L({totalSurplus:te,totalIncome:J,totalExpense:he,list:H})},ue=(F,V)=>{const te=V.map(J=>{const he=F.filter(ae=>ae.personId===J.id),H=he.filter(ae=>ae.type==="income").reduce((ae,fe)=>ae+Number(fe.amount),0),Q=he.filter(ae=>ae.type==="expense").reduce((ae,fe)=>ae+Number(fe.amount),0);return{id:J.id,name:J.name,icon:J.avatar,inc:H,exp:Q}});D({list:te})},Y=(F,V)=>{const te=F.map(H=>{let Q=Number(H.balance||0);return V.forEach(ae=>{const fe=Number(ae.amount);ae.accountId===H.id&&(ae.type==="expense"&&(Q-=fe),ae.type==="income"&&(Q+=fe),ae.type==="transfer"&&(Q-=fe)),ae.toAccountId===H.id&&ae.type==="transfer"&&(Q+=fe)}),{...H,_bal:Q}}).sort((H,Q)=>Q._bal-H._bal),J=te.reduce((H,Q)=>H+Q._bal,0),he=Array(12).fill(J);M({list:te,trend:he})},re=(F,V,te)=>{const J=F.filter(ae=>ae.type===te),he=J.reduce((ae,fe)=>ae+Number(fe.amount),0),H={};J.forEach(ae=>{H[ae.categoryId]=(H[ae.categoryId]||0)+Number(ae.amount)});const Q=Object.keys(H).map(ae=>{const fe=V.find(be=>be.id===Number(ae))||{name:"未知",icon:"❓",color:"#ccc"};return{name:fe.name,icon:fe.icon,color:fe.color,amount:H[ae],percent:he>0?H[ae]/he:0}}).sort((ae,fe)=>fe.amount-ae.amount);I({total:he,list:Q})},ne=F=>{let V=0;const te={},J=F.filter(H=>H.merchantName&&H.type==="expense");J.forEach(H=>{const Q=H.merchantName;te[Q]=(te[Q]||0)+Number(H.amount),V+=Number(H.amount)});const he=Object.entries(te).map(([H,Q])=>({name:H,amount:Q,count:J.filter(ae=>ae.merchantName===H).length})).sort((H,Q)=>Q.amount-H.amount);B({total:V,list:he})},de=F=>new Intl.NumberFormat("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(F);return l.jsxs("div",{className:"page statistics-page",...o,children:[l.jsxs("div",{className:"page-header",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(Us,{size:24})}),l.jsx("h1",{children:"报表"}),l.jsx("div",{className:"tabs-scroll",children:Pi.map(F=>l.jsx("div",{className:`tab-item ${r===F.key?"active":""}`,onClick:()=>i(F.key),children:F.label},F.key))})]}),l.jsxs("div",{className:"date-filter",children:[l.jsx("button",{className:"nav-arrow",onClick:()=>C(-1),children:l.jsx(fn,{size:20})}),l.jsxs("div",{className:"date-display-wrapper",onClick:()=>j(!0),children:[l.jsxs("span",{className:"date-display",children:["📅 ",N()]}),l.jsxs("span",{className:"mode-hint",children:["(",v==="year"?"按年":"按月",")"]})]}),l.jsx("button",{className:"nav-arrow",onClick:()=>C(1),children:l.jsx($e,{size:20})})]}),l.jsxs("div",{className:"content-scroll",children:[r==="basic"&&l.jsx(l.Fragment,{children:S?l.jsxs(l.Fragment,{children:[p==="monthly"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"stat-card mixed-theme",children:[l.jsx("div",{className:"card-overlay"}),l.jsxs("div",{className:"card-content",children:[l.jsx("div",{className:"card-top-row",children:l.jsx("span",{className:"card-title-small",children:"账本流水统计"})}),l.jsxs("div",{className:"main-value-group",children:[l.jsx("span",{className:"currency-symbol",children:"结余"}),l.jsx("span",{className:"main-amount",children:de(S.surplus)}),l.jsx("span",{className:"eye-icon",children:"👁"})]}),l.jsxs("div",{className:"card-bottom-row",children:[l.jsxs("span",{className:"sub-stat",children:["总收入 ",de(S.totalIncome)]}),l.jsx("span",{className:"divider",children:"|"}),l.jsxs("span",{className:"sub-stat",children:["总支出 ",de(S.totalExpense)]})]})]})]}),l.jsxs("div",{className:"milestone-card",children:[l.jsxs("div",{className:"milestone-left",children:[l.jsx("span",{className:"milestone-icon",children:"📊"}),l.jsx("span",{className:"milestone-title",children:"记账里程碑"})]}),l.jsx("div",{className:"milestone-right",children:l.jsxs("span",{children:["记账笔数 ",l.jsx("span",{className:"milestone-num",children:S.count})]})})]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"收入来源"}),S.topIncome.map((F,V)=>l.jsxs("div",{className:"list-row",onClick:()=>t(`/records?categoryId=${F.id||""}&range=${v}&date=${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-01`),children:[l.jsx("span",{className:"row-rank",children:V+1}),l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsx("span",{className:"row-amount",children:de(F.amount)})]},V))]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"支出分布"}),S.topExpense.map((F,V)=>l.jsxs("div",{className:"list-row-bar",onClick:()=>t(`/records?categoryId=${F.id||""}&range=${v}&date=${g.getFullYear()}-${String(g.getMonth()+1).padStart(2,"0")}-01`),children:[l.jsxs("div",{className:"row-header",children:[l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsxs("span",{className:"row-percent",children:[S.totalExpense>0?(F.amount/S.totalExpense*100).toFixed(2):"0.00","%"]}),l.jsx("span",{className:"row-amount",children:de(F.amount)})]}),l.jsx("div",{className:"progress-bar",children:l.jsx("div",{className:"fill",style:{width:S.totalExpense>0?`${F.amount/S.totalExpense*100}%`:"0%"}})})]},V))]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"月度收支趋势"}),l.jsxs("div",{className:"chart-legend-custom",children:[l.jsxs("span",{className:"legend-item",children:[l.jsx("span",{className:"dot income"}),"收入 ",de(S.totalIncome)]}),l.jsxs("span",{className:"legend-item",children:[l.jsx("span",{className:"dot expense"}),"支出 ",de(S.totalExpense)]})]}),l.jsx("div",{style:{height:180},children:l.jsx(Dg,{data:{labels:S.monthlyData.map(F=>F.m+"月"),datasets:[{label:"支出",data:S.monthlyData.map(F=>F.exp),borderColor:"#4ECDC4",backgroundColor:"#4ECDC4",pointRadius:2,tension:.4},{label:"收入",data:S.monthlyData.map(F=>F.inc),borderColor:"#FFB800",backgroundColor:"#FFB800",pointRadius:2,tension:.4}]},options:{maintainAspectRatio:!1,plugins:{legend:{display:!1},tooltip:{mode:"index",intersect:!1}},scales:{x:{grid:{display:!1}},y:{display:!1,min:0}}}})})]}),l.jsxs("div",{className:"section-card",children:[l.jsxs("div",{className:"card-header-row",children:[l.jsx("h3",{children:"资产类账户统计"}),l.jsxs("span",{className:"header-value",children:["资产 ",de(S.assets.reduce((F,V)=>F+V._bal,0))]})]}),l.jsx("div",{className:"pie-wrapper",children:l.jsx("div",{style:{width:160,height:160},children:l.jsx(Cr,{data:{labels:S.assets.map(F=>F.name),datasets:[{data:S.assets.map(F=>F._bal),backgroundColor:["#4ECDC4","#FF6B6B","#FFE66D","#FFB800","#6C5CE7","#A8E6CF"],borderWidth:0}]},options:{plugins:{legend:{display:!1}},cutout:"60%"}})})})]}),l.jsxs("div",{className:"section-card",children:[l.jsxs("div",{className:"card-header-row",children:[l.jsx("h3",{children:"负债类账户统计"}),l.jsxs("span",{className:"header-value",children:["负债 ",de(S.liabilities.reduce((F,V)=>F+Math.abs(V._bal),0))]})]}),l.jsx("div",{className:"pie-wrapper",children:l.jsx("div",{style:{width:160,height:160},children:l.jsx(Cr,{data:{labels:S.liabilities.map(F=>F.name),datasets:[{data:S.liabilities.map(F=>Math.abs(F._bal)),backgroundColor:["#FF7675","#FAB1A0","#FD79A8"],borderWidth:0}]},options:{plugins:{legend:{display:!1}},cutout:"60%"}})})})]})]}):l.jsx(l.Fragment,{children:O&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"stat-card gradient-orange",children:l.jsxs("div",{className:"card-content",children:[l.jsx("span",{className:"label",children:"近12周流水"}),l.jsxs("div",{className:"main-value",children:[l.jsx("span",{className:"unit",children:"总支出"}),l.jsx("span",{className:"amount",children:de(O.totalExpense)})]}),l.jsx("div",{className:"sub-values",children:l.jsxs("span",{children:["总收入 ",de(O.totalIncome)]})})]})}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"周趋势"}),l.jsx("div",{style:{height:150},children:l.jsx(IC,{data:{labels:O.weeks.map(F=>F.label),datasets:[{label:"支出",data:O.weeks.map(F=>F.expense),backgroundColor:"#4ECDC4",borderRadius:4},{label:"收入",data:O.weeks.map(F=>F.income),backgroundColor:"#FFB800",borderRadius:4}]},options:{maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1}},y:{display:!1}}}})})]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"周明细"}),O.weeks.slice().reverse().map((F,V)=>l.jsxs("div",{className:"list-row",children:[l.jsxs("span",{className:"row-name",children:[F.key," (",F.label,")"]}),l.jsxs("div",{className:"row-right",style:{textAlign:"right"},children:[l.jsxs("div",{className:"row-amount",style:{color:"#4ECDC4"},children:["-",de(F.expense)]}),l.jsxs("div",{className:"row-amount",style:{color:"#FFB800",fontSize:12},children:["+",de(F.income)]})]})]},V))]})]})}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"收入来源 (Top 3)"}),S.topIncome.map((F,V)=>l.jsxs("div",{className:"list-row",children:[l.jsx("span",{className:"row-rank",children:V+1}),l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsx("span",{className:"row-amount",children:de(F.amount)})]},V)),S.topIncome.length===0&&l.jsx("div",{className:"empty-row",children:"暂无收入"})]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"支出分布 (Top 1)"}),S.topExpense.map((F,V)=>l.jsxs("div",{className:"list-row-bar",children:[l.jsxs("div",{className:"row-header",children:[l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsx("span",{className:"row-percent",children:"100.00%"}),l.jsx("span",{className:"row-amount",children:de(F.amount)})]}),l.jsx("div",{className:"progress-bar",children:l.jsx("div",{className:"fill",style:{width:"100%"}})})]},V)),S.topExpense.length===0&&l.jsx("div",{className:"empty-row",children:"暂无支出"})]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"资产类账户统计"}),l.jsx("div",{className:"pie-wrapper",children:l.jsx("div",{style:{width:150,height:150},children:l.jsx(Cr,{data:{labels:S.assets.map(F=>F.name),datasets:[{data:S.assets.map(F=>F._bal),backgroundColor:["#4ECDC4","#FF6B6B","#FFE66D"]}]},options:{plugins:{legend:{display:!1}}}})})})]})]}):l.jsxs("div",{className:"empty-row",style:{marginTop:50},children:[l.jsx("div",{className:"loading-spinner"}),l.jsx("div",{style:{marginTop:10},children:"数据加载中..."})]})}),r==="category"&&T&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"type-switch",children:[l.jsx("button",{className:`switch-btn ${w==="expense"?"active":""}`,onClick:()=>k("expense"),children:"支出"}),l.jsx("button",{className:`switch-btn ${w==="income"?"active":""}`,onClick:()=>k("income"),children:"收入"})]}),l.jsxs("div",{className:"section-card",children:[l.jsxs("h3",{style:{textAlign:"center"},children:[w==="expense"?"支出":"收入","概况 ¥",de(T.total)]}),l.jsx("div",{className:"pie-wrapper",children:l.jsx("div",{style:{width:150,height:150},children:l.jsx(Cr,{data:{labels:T.list.map(F=>F.name),datasets:[{data:T.list.map(F=>F.amount),backgroundColor:T.list.map(F=>F.color||"#ccc")}]},options:{plugins:{legend:{display:!1}}}})})})]}),l.jsxs("div",{className:"section-card",children:[T.list.map((F,V)=>l.jsxs("div",{className:"list-row-bar",onClick:()=>t(`/records?categoryId=${F.id}&range=${v}&date=${g.year}-${String(g.month).padStart(2,"0")}-01`),children:[l.jsxs("div",{className:"row-header",children:[l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsxs("span",{className:"row-percent",children:[(F.percent*100).toFixed(1),"%"]}),l.jsx("span",{className:"row-amount",children:de(F.amount)})]}),l.jsx("div",{className:"progress-bar",children:l.jsx("div",{className:"fill",style:{width:`${F.percent*100}%`,background:F.color||"#4ECDC4"}})})]},V)),T.list.length===0&&l.jsx("div",{className:"empty-row",children:"暂无数据"})]})]}),r==="merchant"&&R&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"stat-card white",children:l.jsxs("div",{className:"card-content centered",children:[l.jsx("span",{className:"label-icon",children:"🏪"}),l.jsx("span",{className:"label",children:"商家总支出"}),l.jsx("div",{className:"main-value-dark",children:l.jsxs("span",{className:"amount",children:["¥",de(R.total)]})})]})}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"商家排行榜"}),R.list.map((F,V)=>l.jsxs("div",{className:"list-row",onClick:()=>t(`/records?merchantId=${F.name}&range=${v}&date=${g.year}-${String(g.month).padStart(2,"0")}-01`),children:[l.jsx("span",{className:"row-rank",children:V+1}),l.jsx("span",{className:"row-name",style:{marginLeft:8},children:F.name}),l.jsxs("div",{className:"row-right",style:{textAlign:"right"},children:[l.jsx("div",{className:"row-amount",children:de(F.amount)}),l.jsxs("div",{style:{fontSize:11,color:"#999"},children:[F.count,"笔"]})]})]},V)),R.list.length===0&&l.jsx("div",{className:"empty-row",children:"暂无商家数据"})]})]}),r==="project"&&U&&l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"stat-card white",children:l.jsxs("div",{className:"card-content centered",children:[l.jsx("span",{className:"label-icon",children:"📊"}),l.jsx("span",{className:"label",children:"总结余"}),l.jsxs("div",{className:"main-value-dark",children:[l.jsx("span",{className:"unit",children:"结余"}),l.jsx("span",{className:"amount",children:de(U.totalSurplus)})]})]})}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"项目收入统计"}),U.list.map((F,V)=>l.jsxs("div",{className:"list-row",onClick:()=>t(`/records?projectId=${F.id}&range=${v}&date=${g.year}-${String(g.month).padStart(2,"0")}-01`),children:[l.jsx("span",{className:"row-rank",children:V+1}),l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsx("span",{className:"row-amount",children:de(F.inc)})]},V))]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"项目支出统计"}),U.list.map((F,V)=>l.jsxs("div",{className:"list-row",onClick:()=>t(`/records?projectId=${F.id}&range=${v}&date=${g.year}-${String(g.month).padStart(2,"0")}-01`),children:[l.jsx("span",{className:"row-rank",children:V+1}),l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsx("span",{className:"row-amount",children:de(F.exp)})]},V))]})]}),r==="member"&&$&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"成员支出统计"}),l.jsx("div",{className:"pie-wrapper",children:l.jsx("div",{style:{width:150,height:150},children:l.jsx(Cr,{data:{labels:$.list.map(F=>F.name),datasets:[{data:$.list.map(F=>F.exp),backgroundColor:["#4ECDC4","#FF6B6B","#FFE66D"]}]},options:{plugins:{legend:{display:!1}}}})})})]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"成员收入统计"}),$.list.map((F,V)=>l.jsxs("div",{className:"list-row",children:[l.jsx("span",{className:"row-rank",children:V+1}),l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsx("span",{className:"row-amount",children:de(F.inc)})]},V))]})]}),r==="account"&&z&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"stat-card gradient-orange",children:[l.jsx("span",{className:"label",children:"净资产"}),l.jsx("div",{className:"main-value",children:l.jsx("span",{className:"amount",children:de(z.list.reduce((F,V)=>F+V._bal,0))})}),l.jsx("div",{style:{height:100,marginTop:20},children:l.jsx(Dg,{data:{labels:["1","2","3","4","5","6","7","8","9","10","11","12"],datasets:[{data:z.trend,borderColor:"#fff",tension:.4}]},options:{maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{display:!1},y:{display:!1}}}})})]}),l.jsxs("div",{className:"section-card",children:[l.jsx("h3",{children:"资产明细"}),z.list.map((F,V)=>l.jsxs("div",{className:"list-row",children:[l.jsx("span",{className:"row-rank",children:V+1}),l.jsx("span",{className:"row-icon",children:F.icon}),l.jsx("span",{className:"row-name",children:F.name}),l.jsx("span",{className:"row-amount",children:de(F._bal)})]},V))]})]})]}),l.jsx("style",{children:`
                .statistics-page { background: #f5f6fa; min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 20px; }
                .page-header { background: #fff; padding-top: calc(10px + var(--safe-area-top)); position: sticky; top: 0; z-index: 10; }
                .back-btn { padding: 10px; border: none; background: none; }
                .page-header h1 { text-align: center; font-size: 17px; font-weight: 600; margin-top: -36px; margin-bottom: 10px; pointer-events: none; }
                
                .tabs-scroll { display: flex; overflow-x: auto; padding: 0 4px; border-bottom: none; background: #fff; }
                .tab-item { padding: 12px 16px; font-size: 15px; color: #666; white-space: nowrap; transition: all 0.2s; }
                .tab-item.active { color: #333; font-weight: 600; font-size: 16px; }
                
                .date-filter { 
                    background: #fff; padding: 10px; margin-top: 1px; margin-bottom: 12px;
                    display: flex; align-items: center; justify-content: center; gap: 15px;
                }
                .nav-arrow { background: none; border: none; padding: 8px; color: #999; display: flex; align-items: center; }
                .date-display { font-weight: 600; font-size: 15px; display: flex; align-items: center; gap: 6px; cursor: pointer; color: #333; }
                .mode-hint { font-size: 11px; color: #999; font-weight: normal; }
                .view-switch-btn { 
                    margin-left: 10px; font-size: 12px; color: #4ECDC4; 
                    border: 1px solid #4ECDC4; padding: 2px 8px; 
                    background: none; border-radius: 4px; 
                }

                .content-scroll { padding: 0 16px; flex: 1; overflow-y: auto; }
                
                /* Top Card - Mixed Theme */
                .stat-card {
                    border-radius: 16px; padding: 20px; margin-bottom: 12px; position: relative; overflow: hidden; color: #fff;
                    min-height: 160px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .stat-card.mixed-theme {
                    background-image: url('https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?q=80&w=1000&auto=format&fit=crop'); 
                    background-size: cover;
                    background-position: center;
                }
                .card-overlay {
                    position: absolute; top:0; left:0; right:0; bottom:0;
                    background: rgba(0,0,0,0.2); 
                    z-index: 1;
                }
                .card-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; }
                
                .card-top-row { font-size: 13px; opacity: 0.95; }
                .main-value-group { margin: 10px 0; }
                .currency-symbol { font-size: 14px; opacity: 0.9; margin-right: 6px; }
                .main-amount { font-size: 36px; font-weight: 700; letter-spacing: -1px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .eye-icon { font-size: 14px; margin-left: 10px; opacity: 0.8; }
                
                .card-bottom-row { 
                    display: flex; align-items: center; font-size: 12px; opacity: 0.95; 
                    background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: 20px; align-self: flex-start;
                    backdrop-filter: blur(4px);
                }
                .sub-stat { margin: 0 4px; font-weight: 500; }
                .divider { opacity: 0.5; margin: 0 4px; }

                /* Milestone Card */
                .milestone-card {
                    background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 16px;
                    display: flex; align-items: center; justify-content: space-between;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
                }
                .milestone-left { display: flex; align-items: center; gap: 8px; }
                .milestone-icon { font-size: 18px; }
                .milestone-title { font-size: 14px; font-weight: 600; color: #333; }
                .milestone-right { font-size: 12px; color: #999; }
                .milestone-num { color: #333; font-weight: 600; margin-left: 4px; }

                /* Section Cards */
                .section-card { background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); }
                .section-card h3 { font-size: 14px; color: #333; margin-bottom: 12px; font-weight: 600; }
                
                .card-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .card-header-row h3 { margin-bottom: 0; }
                .header-value { font-size: 12px; color: #999; }

                /* List Item Styles */
                .list-row { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f9f9f9; cursor: pointer; }
                .list-row:last-child { border-bottom: none; }
                .row-rank { width: 20px; color: #ccc; font-size: 12px; font-weight: 500; }
                .row-icon { margin-right: 12px; font-size: 20px; width: 32px; height: 32px; background: #f8f8f8; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
                .row-name { flex: 1; font-size: 14px; color: #333; font-weight: 500; }
                .row-amount { font-size: 14px; color: #333; font-weight: 500; }
                
                /* Bar Item Styles */
                .list-row-bar { margin-bottom: 16px; cursor: pointer; }
                .row-header { display: flex; align-items: center; margin-bottom: 8px; }
                .row-percent { color: #999; font-size: 12px; margin-right: 8px; min-width: 45px; text-align: right; }
                .progress-bar { height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
                .fill { height: 100%; background: #4ECDC4; border-radius: 3px; }
                
                /* Chart Legend */
                .chart-legend-custom { display: flex; gap: 16px; margin-bottom: 10px; }
                .legend-item { font-size: 11px; color: #666; display: flex; align-items: center; gap: 4px; background: #f5f5f5; padding: 4px 8px; border-radius: 4px; }
                .dot { width: 6px; height: 6px; border-radius: 50%; }
                .dot.income { background: #FFB800; }
                .dot.expense { background: #4ECDC4; }

                .pie-wrapper { display: flex; justify-content: center; padding: 10px 0; }
                .empty-row { text-align: center; color: #ccc; padding: 20px; font-size: 12px; }
                
                .type-switch { display: flex; justify-content: center; margin-bottom: 20px; }
                .switch-btn { padding: 8px 24px; background: #fff; border: 1px solid #ddd; font-size: 14px; color: #666; }
                .switch-btn:first-child { border-radius: 20px 0 0 20px; border-right: none; }
                .switch-btn:last-child { border-radius: 0 20px 20px 0; border-left: none; }
                .switch-btn.active { background: #FFB800; color: #fff; border-color: #FFB800; }
                
                .stat-card.gradient-orange { background: linear-gradient(135deg, #FF9966 0%, #FF5E62 100%); }
                .stat-card.white { background: #fff; color: #333; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .main-value-dark { font-size: 30px; font-weight: bold; color: #333; }
                .sub-values { font-size: 12px; opacity: 0.9; display: flex; gap: 10px; }
                .row-right { margin-left: auto; }

                /* 时间选择器模态框样式 */
                .date-picker-overlay {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                    display: flex;
                    align-items: flex-end;
                }
                .date-picker-modal {
                    background: #fff;
                    width: 100%;
                    border-radius: 20px 20px 0 0;
                    padding: 20px 0;
                    padding-bottom: calc(20px + var(--safe-area-bottom));
                    animation: slideUp 0.3s ease;
                }
                .modal-header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    padding: 0 16px 16px;
                    border-bottom: 1px solid #f0f0f0;
                }
                .modal-title { font-size: 18px; font-weight: 600; }
                .close-btn { position: absolute; right: 16px; background: none; border: none; font-size: 24px; color: #999; }
                .picker-tabs {
                    display: flex;
                    justify-content: center;
                    padding: 16px 0;
                    gap: 20px;
                }
                .picker-tab { /* 模仿图片中的月/年切换按钮 */
                    padding: 8px 30px;
                    background: #f5f5f5;
                    border-radius: 4px;
                    color: #666;
                    font-size: 15px;
                }
                .picker-tab.active {
                    background: #fff5e6; /* 浅橙色 */
                    color: #FFB800;
                    font-weight: 500;
                }
                .year-range-display {
                    text-align: center;
                    font-size: 16px;
                    font-weight: 500;
                    margin: 10px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    padding: 0 20px;
                    margin-top: 10px;
                }
                .grid-item {
                    padding: 10px 0;
                    text-align: center;
                    border-radius: 8px;
                    background: #fff;
                    border: 1px solid #f0f0f0;
                    font-size: 14px;
                }
                .grid-item.active {
                    background: #FFB800; /* 选中色 橙色 */
                    color: white;
                    border-color: #FFB800;
                    box-shadow: 0 4px 10px rgba(255, 184, 0, 0.3);
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}),_&&l.jsx("div",{className:"date-picker-overlay",onClick:()=>j(!1),children:l.jsxs("div",{className:"date-picker-modal",onClick:F=>F.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("span",{className:"modal-title",children:"选择时间"}),l.jsx("button",{className:"close-btn",onClick:()=>j(!1),children:l.jsx(X,{size:24})})]}),l.jsxs("div",{className:"picker-tabs",children:[l.jsx("button",{className:`picker-tab ${v==="month"?"active":""}`,onClick:()=>b("month"),children:"月"}),l.jsx("button",{className:`picker-tab ${v==="year"?"active":""}`,onClick:()=>b("year"),children:"年"})]}),v==="year"&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"year-range-display",children:[l.jsx(fn,{size:20,color:"#666"}),l.jsx("span",{children:"2020-2029年"}),l.jsx($e,{size:20,color:"#666"})]}),l.jsx("div",{className:"grid-container",children:[2020,2021,2022,2023,2024,2025,2026,2027,2028,2029].map(F=>l.jsxs("div",{className:`grid-item ${g.getFullYear()===F?"active":""}`,onClick:()=>{const V=new Date(g);V.setFullYear(F),x(V),v==="year"&&j(!1)},children:[F,"年"]},F))})]}),v==="month"&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"year-range-display",children:[l.jsx(fn,{onClick:()=>{const F=new Date(g);F.setFullYear(F.getFullYear()-1),x(F)},size:20,color:"#666",style:{cursor:"pointer"}}),l.jsxs("span",{children:[g.getFullYear(),"年"]}),l.jsx($e,{onClick:()=>{const F=new Date(g);F.setFullYear(F.getFullYear()+1),x(F)},size:20,color:"#666",style:{cursor:"pointer"}})]}),l.jsx("div",{className:"grid-container",children:Array.from({length:12},(F,V)=>V+1).map(F=>l.jsxs("div",{className:`grid-item ${g.getMonth()+1===F?"active":""}`,onClick:()=>{const V=new Date(g);V.setMonth(F-1),x(V),j(!1)},children:[F,"月"]},F))})]})]})})]})}async function cE(t){const e=await mi(),n=await e.get("books",t);if(n){try{await WC(n.dbName)}catch(s){console.error("Failed to delete physical DB",s)}await e.delete("books",t)}}const uE="GlobalDB",dE=1;let Ma=null;async function mi(){return Ma||(Ma=await K1(uE,dE,{upgrade(t){t.objectStoreNames.contains("users")||t.createObjectStore("users",{keyPath:"id",autoIncrement:!0}).createIndex("username","username",{unique:!0}),t.objectStoreNames.contains("books")||t.createObjectStore("books",{keyPath:"id",autoIncrement:!0}).createIndex("ownerId","ownerId")}}),Ma)}async function ev(t){const n=new TextEncoder().encode(t),s=await crypto.subtle.digest("SHA-256",n);return Array.from(new Uint8Array(s)).map(i=>i.toString(16).padStart(2,"0")).join("")}async function fE(t,e){const n=await mi(),s=n.transaction("users","readwrite");if(await s.store.index("username").get(t))throw new Error("用户名已存在");const i=await ev(e),o={username:t,password:i,created_at:new Date().toISOString()},a=await s.store.add(o),c=await Ld(a,"默认账本"),u={...o,id:a,currentBookId:c};return await n.put("users",u),u}async function hE(t,e){const s=await(await mi()).getFromIndex("users","username",t),r=await ev(e);if(!s||s.password!==r)throw new Error("用户名或密码错误");return s}async function Ld(t,e,n=null){const s=await mi(),r={ownerId:t,name:e,created_at:new Date().toISOString(),cover:"📘",dbName:n||`QuickBook_${Date.now()}_${Math.random().toString(36).substr(2,5)}`};return await s.add("books",r)}async function $g(t){return await(await mi()).getAllFromIndex("books","ownerId",t)}const pE={from:t=>({upsert:async(e,n)=>(await new Promise(s=>setTimeout(s,500)),{error:null}),select:e=>({gt:(n,s)=>({order:(r,i)=>Promise.resolve({data:[],error:null})})})})},Ug=pE,Wg=[{name:"transactions",store:"transactions"},{name:"accounts",store:"accounts"},{name:"categories",store:"categories"},{name:"tags",store:"tags"},{name:"persons",store:"persons"}],Bd={sync:async()=>{try{return console.log("[Sync] Starting sync..."),await Bd.push(),await Bd.pull(),console.log("[Sync] Sync completed."),{success:!0}}catch(t){return console.error("[Sync] Error:",t),{success:!1,error:t.message}}},push:async()=>{const t=pe();for(const e of Wg){const s=(await t.getAll(e.store)).filter(o=>o.synced===0);if(s.length===0)continue;console.log(`[Sync] Pushing ${s.length} items to ${e.name}`);const{error:r}=await Ug.from(e.name).upsert(s.map(o=>({...o,updated_at:new Date(o.updatedAt).toISOString()})),{onConflict:"id"});if(r)throw new Error(`Push failed for ${e.name}: ${r.message}`);const i=t.transaction(e.store,"readwrite");for(const o of s){const a=await i.store.get(o.id);a&&await i.store.put({...a,synced:1})}await i.done}},pull:async()=>{const t=localStorage.getItem("last_pulled_at")||"1970-01-01T00:00:00.000Z",e=new Date().toISOString();for(const n of Wg){const{data:s,error:r}=await Ug.from(n.name).select("*").gt("updated_at",t);if(r)throw new Error(`Pull failed for ${n.name}: ${r.message}`);if(!s||s.length===0)continue;console.log(`[Sync] Pulled ${s.length} items for ${n.name}`);const o=pe().transaction(n.store,"readwrite");for(const a of s){const c={...a,synced:1},u=await o.store.get(c.id);u&&u.updatedAt>new Date(a.updated_at).getTime()||await o.store.put(c)}await o.done}localStorage.setItem("last_pulled_at",e)}};function mE(){const t=Ke(),[e,n]=E.useState(localStorage.getItem("current_book_name")||"我的账本"),[s,r]=E.useState(!1),[i,o]=E.useState(!1),a=rs({onSwipedRight:()=>t(-1),trackMouse:!0}),c=()=>{confirm("确定要退出登录吗？")&&(localStorage.clear(),t("/login"))},u=async()=>{if(confirm(`警告：确定要清空当前账本的所有流水和照片吗？此操作无法撤销！
(分类和账户设置将保留)`))try{await QC(),alert("数据已清空"),t("/")}catch(p){alert("清空失败: "+p.message)}},d=async()=>{i||(o(!0),setTimeout(async()=>{const p=await Bd.sync();o(!1),p.success?alert("同步完成 (模拟 Supabase 环境)"):alert("同步失败: "+p.error)},500))},f=async()=>{const p=Number(localStorage.getItem("current_book_id"));if(p&&confirm(`危险：确定要 **永久删除** 当前账本吗？
所有数据都将丢失，且无法找回！`)&&prompt('请输入 "删除" 以确认:')==="删除")try{await cE(p),localStorage.removeItem("current_book_id"),localStorage.removeItem("current_book_name"),localStorage.removeItem("current_db_name"),alert("账本已删除"),t("/books")}catch(_){alert("删除失败: "+_.message)}},h=()=>{t("/books")},m=()=>{r(!0)},g=[{icon:Kf,label:"记账设置",desc:"默认账户、提醒等",path:"/settings/bookkeeping"},{icon:Ky,label:"分类标签",desc:"管理收支分类",path:"/category-tags"},{icon:ts,label:"商家管理",desc:"管理常用商家",path:"/merchants"},{icon:So,label:"周期记账",desc:"定期自动记账",path:"/recurring"},{icon:Yy,label:"流水管理",desc:"查看所有记录",path:"/records"},{icon:xd,label:"报表分析",desc:"收支统计图表",path:"/statistics"},{icon:bd,label:"预算中心",desc:"设置月度预算",path:"/budget"},{icon:tr,label:"账户管理",desc:"银行卡、现金等",path:"/accounts"}],x=[{icon:zj,label:"导出数据",desc:"支持CSV/JSON",action:m},{icon:Zj,label:"导入数据",desc:"支持随手记/JSON恢复",path:"/import"}],v=[{icon:Pj,label:"切换账本",desc:"管理多账本",action:h},{icon:Gy,label:"退出登录",desc:"安全退出",action:c}],b=localStorage.getItem("username")||"用户";return l.jsxs("div",{className:"page settings-page",...a,children:[l.jsxs("div",{className:"top-bar",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(fn,{size:24})}),l.jsx("div",{className:"spacer"}),l.jsx("button",{className:"msg-btn",children:l.jsx(qy,{size:22})})]}),l.jsxs("div",{className:"book-name-section",children:[l.jsx("h1",{className:"book-name",children:e}),l.jsxs("div",{style:{fontSize:13,color:"#999",marginTop:4},children:["当前用户: ",b]})]}),l.jsx("div",{className:"member-card",children:l.jsxs("div",{className:"member-info",children:[l.jsx("span",{className:"member-icon",children:"🍌"}),l.jsx("span",{className:"member-label",children:"记账积分"}),l.jsx("span",{className:"member-points",children:"128"})]})}),l.jsxs("div",{className:"section",children:[l.jsx("div",{className:"section-title",children:"多端同步"}),l.jsx("div",{className:"menu-list",children:l.jsxs("div",{className:"menu-item",onClick:d,children:[l.jsx("div",{className:"menu-icon",style:{color:"#1890ff"},children:i?l.jsx(Xr,{className:"animate-spin",size:20}):l.jsx(yd,{size:20})}),l.jsx("span",{className:"menu-label",style:{color:"#1890ff"},children:"立即同步 (Supabase)"}),l.jsx(Hy,{size:18,color:"#ccc"})]})})]}),l.jsxs("div",{className:"section",children:[l.jsx("div",{className:"section-title",children:"账号与安全"}),l.jsxs("div",{className:"menu-list",children:[l.jsxs("div",{className:"menu-item",children:[l.jsx("div",{className:"menu-icon",children:l.jsx(ts,{size:20})}),l.jsx("span",{className:"menu-label",children:"当前账号"}),l.jsx("span",{className:"menu-value",children:b})]}),v.map((p,y)=>l.jsxs("div",{className:"menu-item",onClick:()=>p.action?p.action():p.path&&t(p.path),children:[l.jsx("div",{className:"menu-icon",children:l.jsx(p.icon,{size:20})}),l.jsx("span",{className:"menu-label",children:p.label}),l.jsx("span",{className:"menu-desc-text",style:{fontSize:12,color:"#999",marginRight:8},children:p.desc}),l.jsx($e,{size:18,color:"#ccc"})]},y))]})]}),l.jsxs("div",{className:"feature-cards",children:[l.jsxs("div",{className:"feature-card",onClick:()=>t("/members"),children:[l.jsx("div",{className:"card-top",children:l.jsxs("div",{className:"avatars",children:[l.jsx("span",{className:"avatar",children:"👨"}),l.jsx("span",{className:"avatar",children:"👩"}),l.jsx("span",{className:"avatar add",children:"+"})]})}),l.jsx("div",{className:"card-label",children:"成员与角色管理"})]}),l.jsxs("div",{className:"feature-card",children:[l.jsx("div",{className:"card-top",children:l.jsxs("div",{className:"storage-info",children:[l.jsx("span",{className:"storage-text",children:"本地存储"}),l.jsx("div",{className:"storage-bar",children:l.jsx("div",{className:"storage-fill",style:{width:"30%"}})})]})}),l.jsx("div",{className:"card-label",children:"我的空间"})]})]}),l.jsxs("div",{className:"quick-features",children:[l.jsxs("div",{className:"quick-item",onClick:()=>t("/records"),children:[l.jsx("div",{className:"quick-icon",children:l.jsx(In,{size:20})}),l.jsxs("div",{className:"quick-info",children:[l.jsx("span",{className:"quick-label",children:"流水回收站"}),l.jsx("span",{className:"quick-desc",children:"可恢复历史删除流水"})]}),l.jsx("span",{className:"quick-badge",children:"限免中"})]}),l.jsxs("div",{className:"quick-item",children:[l.jsx("div",{className:"quick-icon",children:l.jsx(Wj,{size:20})}),l.jsxs("div",{className:"quick-info",children:[l.jsx("span",{className:"quick-label",children:"封账"}),l.jsx("span",{className:"quick-desc",children:"封账后流水不可修改"})]}),l.jsx("span",{className:"quick-badge",children:"限免中"})]})]}),l.jsxs("div",{className:"section",children:[l.jsx("div",{className:"section-title",children:"基础功能"}),l.jsx("div",{className:"menu-list",children:g.map((p,y)=>l.jsxs("div",{className:"menu-item",onClick:()=>p.path&&t(p.path),children:[l.jsx("div",{className:"menu-icon",children:l.jsx(p.icon,{size:20})}),l.jsx("span",{className:"menu-label",children:p.label}),l.jsx($e,{size:18,color:"#ccc"})]},y))})]}),l.jsxs("div",{className:"section",children:[l.jsx("div",{className:"section-title",children:"数据管理"}),l.jsx("div",{className:"menu-list",children:x.map((p,y)=>l.jsxs("div",{className:"menu-item",onClick:()=>p.action?p.action():p.path&&t(p.path),children:[l.jsx("div",{className:"menu-icon",children:l.jsx(p.icon,{size:20})}),l.jsx("span",{className:"menu-label",children:p.label}),l.jsx("span",{className:"menu-desc-text",style:{fontSize:12,color:"#999",marginRight:8},children:p.desc}),l.jsx($e,{size:18,color:"#ccc"})]},y))})]}),l.jsx("div",{className:"section",children:l.jsx("div",{className:"menu-list",children:l.jsxs("div",{className:"menu-item",children:[l.jsx("div",{className:"menu-icon",children:l.jsx(Bj,{size:20})}),l.jsx("span",{className:"menu-label",children:"关于"}),l.jsx("span",{className:"menu-value",children:"v1.0.0"}),l.jsx($e,{size:18,color:"#ccc"})]})})}),l.jsxs("div",{className:"section",children:[l.jsx("div",{className:"section-title",style:{color:"#ff4d4f"},children:"危险区域"}),l.jsxs("div",{className:"menu-list",children:[l.jsxs("div",{className:"menu-item",onClick:u,children:[l.jsx("div",{className:"menu-icon",style:{color:"#ff4d4f"},children:l.jsx(In,{size:20})}),l.jsx("span",{className:"menu-label",style:{color:"#ff4d4f"},children:"清空账本数据"}),l.jsx($e,{size:18,color:"#ccc"})]}),l.jsxs("div",{className:"menu-item",onClick:f,children:[l.jsx("div",{className:"menu-icon",style:{color:"#ff4d4f"},children:l.jsx(ot,{size:20})}),l.jsx("span",{className:"menu-label",style:{color:"#ff4d4f"},children:"删除当前账本"}),l.jsx($e,{size:18,color:"#ccc"})]})]})]}),s&&l.jsx("div",{className:"modal-overlay",onClick:()=>r(!1),children:l.jsxs("div",{className:"modal-content",onClick:p=>p.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:"选择导出格式"}),l.jsx("button",{onClick:()=>r(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"export-options",children:[l.jsxs("div",{className:"export-item",onClick:()=>{downloadExportCSV(),r(!1)},children:[l.jsx("div",{className:"export-icon csv",children:"CSV"}),l.jsxs("div",{className:"export-info",children:[l.jsx("span",{className:"export-title",children:"导出 CSV (Excel)"}),l.jsx("span",{className:"export-desc",children:"适合在 Excel 中查看编辑"})]}),l.jsx($e,{size:18,color:"#ccc"})]}),l.jsxs("div",{className:"export-item",onClick:()=>{downloadExportFile(),r(!1)},children:[l.jsx("div",{className:"export-icon json",children:"JSON"}),l.jsxs("div",{className:"export-info",children:[l.jsx("span",{className:"export-title",children:"导出 JSON (备份)"}),l.jsx("span",{className:"export-desc",children:"包含完整数据，用于恢复备份"})]}),l.jsx($e,{size:18,color:"#ccc"})]})]})]})}),l.jsx("style",{children:`
        .settings-page {
          background: #F5F6F8;
          padding-bottom: 100px;
          min-height: 100vh;
        }

        .top-bar {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
        }

        .back-btn, .msg-btn {
          padding: 8px;
          color: #333;
          background: none;
          border: none;
        }

        .spacer {
          flex: 1;
        }

        .book-name-section {
          padding: 20px 20px 16px;
          background: #fff;
        }

        .book-name {
          font-size: 22px;
          font-weight: 600;
          color: #333;
        }

        /* 会员卡片 */
        .member-card {
          margin: 0 16px 16px;
          padding: 20px;
          background: linear-gradient(135deg, #FFE5D0 0%, #FFD4B8 100%);
          border-radius: 16px;
          margin-top: -8px;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .member-icon {
          font-size: 24px;
        }

        .member-label {
          font-size: 14px;
          color: #8B6914;
        }

        .member-points {
          font-size: 28px;
          font-weight: 700;
          color: #8B6914;
          margin-left: auto;
        }

        /* 功能卡片 */
        .feature-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 0 16px;
          margin-bottom: 16px;
        }

        .feature-card {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
        }

        .card-top {
          margin-bottom: 12px;
        }

        .avatars {
          display: flex;
          gap: 4px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .avatar.add {
          background: #fff;
          border: 1px dashed #ccc;
          color: #999;
          font-size: 18px;
        }

        .storage-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .storage-text {
          font-size: 12px;
          color: #999;
        }

        .storage-bar {
          height: 6px;
          background: #f0f0f0;
          border-radius: 3px;
          overflow: hidden;
        }

        .storage-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ECDC4 0%, #44B8A8 100%);
          border-radius: 3px;
        }

        .card-label {
          font-size: 13px;
          color: #666;
        }

        /* 快捷功能 */
        .quick-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 0 16px;
          margin-bottom: 16px;
        }

        .quick-item {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
          position: relative;
        }

        .quick-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          margin-bottom: 8px;
        }

        .quick-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .quick-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .quick-desc {
          font-size: 11px;
          color: #999;
        }

        .quick-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
          color: #fff;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 8px;
        }

        /* 分区 */
        .section {
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 13px;
          color: #999;
          padding: 12px 20px 8px;
        }

        .menu-list {
          background: #fff;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f9f9f9;
          gap: 12px;
          cursor: pointer;
        }

        .menu-item:last-child {
          border-bottom: none;
        }
        
        .menu-item:active { background: #fafafa; }

        .menu-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        .menu-label {
          flex: 1;
          font-size: 15px;
          color: #333;
        }

        .menu-value {
          font-size: 13px;
          color: #999;
          margin-right: 4px;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end; /* Mobile: bottom */
          z-index: 1000;
        }
        
        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 20px 20px 0 0;
          max-height: 80vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }
        
        .modal-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 16px 20px;
           border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 { font-size: 18px; font-weight: 600; margin: 0; }
        .modal-header button { background:none; border:none; padding:4px; }
        
        .export-options { padding: 8px 0; }
        .export-item {
           display: flex; align-items: center;
           padding: 16px 20px;
           border-bottom: 1px solid #f9f9f9;
           cursor: pointer;
        }
        .export-item:active { background: #f5f5f5; }
        
        .export-icon {
           width: 44px; height: 44px;
           border-radius: 8px;
           display: flex; align-items: center; justify-content: center;
           font-weight: 700; font-size: 14px;
           margin-right: 16px;
        }
        .export-icon.csv { background: #E8F5E9; color: #2E7D32; }
        .export-icon.json { background: #E3F2FD; color: #1565C0; }
        
        .export-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .export-title { font-size: 16px; color: #333; font-weight: 500;}
        .export-desc { font-size: 12px; color: #999; }
        
        @keyframes slideUp {
           from { transform: translateY(100%); }
           to { transform: translateY(0); }
        }

        @media (min-width: 768px) {
           .modal-overlay {
              align-items: center; justify-content: center;
           }
           .modal-content {
              width: 400px;
              border-radius: 20px;
           }
        }
      `})]})}var gE={exports:{}};(function(t){var e=function(n){var s=Object.prototype,r=s.hasOwnProperty,i=Object.defineProperty||function(M,T,I){M[T]=I.value},o,a=typeof Symbol=="function"?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",d=a.toStringTag||"@@toStringTag";function f(M,T,I){return Object.defineProperty(M,T,{value:I,enumerable:!0,configurable:!0,writable:!0}),M[T]}try{f({},"")}catch{f=function(T,I,R){return T[I]=R}}function h(M,T,I,R){var B=T&&T.prototype instanceof y?T:y,K=Object.create(B.prototype),se=new $(R||[]);return i(K,"_invoke",{value:O(M,I,se)}),K}n.wrap=h;function m(M,T,I){try{return{type:"normal",arg:M.call(T,I)}}catch(R){return{type:"throw",arg:R}}}var g="suspendedStart",x="suspendedYield",v="executing",b="completed",p={};function y(){}function _(){}function j(){}var N={};f(N,c,function(){return this});var C=Object.getPrototypeOf,w=C&&C(C(D([])));w&&w!==s&&r.call(w,c)&&(N=w);var k=j.prototype=y.prototype=Object.create(N);_.prototype=j,i(k,"constructor",{value:j,configurable:!0}),i(j,"constructor",{value:_,configurable:!0}),_.displayName=f(j,d,"GeneratorFunction");function S(M){["next","throw","return"].forEach(function(T){f(M,T,function(I){return this._invoke(T,I)})})}n.isGeneratorFunction=function(M){var T=typeof M=="function"&&M.constructor;return T?T===_||(T.displayName||T.name)==="GeneratorFunction":!1},n.mark=function(M){return Object.setPrototypeOf?Object.setPrototypeOf(M,j):(M.__proto__=j,f(M,d,"GeneratorFunction")),M.prototype=Object.create(k),M},n.awrap=function(M){return{__await:M}};function P(M,T){function I(K,se,ce,ge){var ue=m(M[K],M,se);if(ue.type==="throw")ge(ue.arg);else{var Y=ue.arg,re=Y.value;return re&&typeof re=="object"&&r.call(re,"__await")?T.resolve(re.__await).then(function(ne){I("next",ne,ce,ge)},function(ne){I("throw",ne,ce,ge)}):T.resolve(re).then(function(ne){Y.value=ne,ce(Y)},function(ne){return I("throw",ne,ce,ge)})}}var R;function B(K,se){function ce(){return new T(function(ge,ue){I(K,se,ge,ue)})}return R=R?R.then(ce,ce):ce()}i(this,"_invoke",{value:B})}S(P.prototype),f(P.prototype,u,function(){return this}),n.AsyncIterator=P,n.async=function(M,T,I,R,B){B===void 0&&(B=Promise);var K=new P(h(M,T,I,R),B);return n.isGeneratorFunction(T)?K:K.next().then(function(se){return se.done?se.value:K.next()})};function O(M,T,I){var R=g;return function(K,se){if(R===v)throw new Error("Generator is already running");if(R===b){if(K==="throw")throw se;return z()}for(I.method=K,I.arg=se;;){var ce=I.delegate;if(ce){var ge=A(ce,I);if(ge){if(ge===p)continue;return ge}}if(I.method==="next")I.sent=I._sent=I.arg;else if(I.method==="throw"){if(R===g)throw R=b,I.arg;I.dispatchException(I.arg)}else I.method==="return"&&I.abrupt("return",I.arg);R=v;var ue=m(M,T,I);if(ue.type==="normal"){if(R=I.done?b:x,ue.arg===p)continue;return{value:ue.arg,done:I.done}}else ue.type==="throw"&&(R=b,I.method="throw",I.arg=ue.arg)}}}function A(M,T){var I=T.method,R=M.iterator[I];if(R===o)return T.delegate=null,I==="throw"&&M.iterator.return&&(T.method="return",T.arg=o,A(M,T),T.method==="throw")||I!=="return"&&(T.method="throw",T.arg=new TypeError("The iterator does not provide a '"+I+"' method")),p;var B=m(R,M.iterator,T.arg);if(B.type==="throw")return T.method="throw",T.arg=B.arg,T.delegate=null,p;var K=B.arg;if(!K)return T.method="throw",T.arg=new TypeError("iterator result is not an object"),T.delegate=null,p;if(K.done)T[M.resultName]=K.value,T.next=M.nextLoc,T.method!=="return"&&(T.method="next",T.arg=o);else return K;return T.delegate=null,p}S(k),f(k,d,"Generator"),f(k,c,function(){return this}),f(k,"toString",function(){return"[object Generator]"});function U(M){var T={tryLoc:M[0]};1 in M&&(T.catchLoc=M[1]),2 in M&&(T.finallyLoc=M[2],T.afterLoc=M[3]),this.tryEntries.push(T)}function L(M){var T=M.completion||{};T.type="normal",delete T.arg,M.completion=T}function $(M){this.tryEntries=[{tryLoc:"root"}],M.forEach(U,this),this.reset(!0)}n.keys=function(M){var T=Object(M),I=[];for(var R in T)I.push(R);return I.reverse(),function B(){for(;I.length;){var K=I.pop();if(K in T)return B.value=K,B.done=!1,B}return B.done=!0,B}};function D(M){if(M){var T=M[c];if(T)return T.call(M);if(typeof M.next=="function")return M;if(!isNaN(M.length)){var I=-1,R=function B(){for(;++I<M.length;)if(r.call(M,I))return B.value=M[I],B.done=!1,B;return B.value=o,B.done=!0,B};return R.next=R}}return{next:z}}n.values=D;function z(){return{value:o,done:!0}}return $.prototype={constructor:$,reset:function(M){if(this.prev=0,this.next=0,this.sent=this._sent=o,this.done=!1,this.delegate=null,this.method="next",this.arg=o,this.tryEntries.forEach(L),!M)for(var T in this)T.charAt(0)==="t"&&r.call(this,T)&&!isNaN(+T.slice(1))&&(this[T]=o)},stop:function(){this.done=!0;var M=this.tryEntries[0],T=M.completion;if(T.type==="throw")throw T.arg;return this.rval},dispatchException:function(M){if(this.done)throw M;var T=this;function I(ge,ue){return K.type="throw",K.arg=M,T.next=ge,ue&&(T.method="next",T.arg=o),!!ue}for(var R=this.tryEntries.length-1;R>=0;--R){var B=this.tryEntries[R],K=B.completion;if(B.tryLoc==="root")return I("end");if(B.tryLoc<=this.prev){var se=r.call(B,"catchLoc"),ce=r.call(B,"finallyLoc");if(se&&ce){if(this.prev<B.catchLoc)return I(B.catchLoc,!0);if(this.prev<B.finallyLoc)return I(B.finallyLoc)}else if(se){if(this.prev<B.catchLoc)return I(B.catchLoc,!0)}else if(ce){if(this.prev<B.finallyLoc)return I(B.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(M,T){for(var I=this.tryEntries.length-1;I>=0;--I){var R=this.tryEntries[I];if(R.tryLoc<=this.prev&&r.call(R,"finallyLoc")&&this.prev<R.finallyLoc){var B=R;break}}B&&(M==="break"||M==="continue")&&B.tryLoc<=T&&T<=B.finallyLoc&&(B=null);var K=B?B.completion:{};return K.type=M,K.arg=T,B?(this.method="next",this.next=B.finallyLoc,p):this.complete(K)},complete:function(M,T){if(M.type==="throw")throw M.arg;return M.type==="break"||M.type==="continue"?this.next=M.arg:M.type==="return"?(this.rval=this.arg=M.arg,this.method="return",this.next="end"):M.type==="normal"&&T&&(this.next=T),p},finish:function(M){for(var T=this.tryEntries.length-1;T>=0;--T){var I=this.tryEntries[T];if(I.finallyLoc===M)return this.complete(I.completion,I.afterLoc),L(I),p}},catch:function(M){for(var T=this.tryEntries.length-1;T>=0;--T){var I=this.tryEntries[T];if(I.tryLoc===M){var R=I.completion;if(R.type==="throw"){var B=R.arg;L(I)}return B}}throw new Error("illegal catch attempt")},delegateYield:function(M,T,I){return this.delegate={iterator:D(M),resultName:T,nextLoc:I},this.method==="next"&&(this.arg=o),p}},n}(t.exports);try{regeneratorRuntime=e}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}})(gE);var mh=(t,e)=>`${t}-${e}-${Math.random().toString(16).slice(3,8)}`;const xE=mh;let Vg=0;var tv=({id:t,action:e,payload:n={}})=>{let s=t;return typeof s>"u"&&(s=xE("Job",Vg),Vg+=1),{id:s,action:e,payload:n}},gi={};let gh=!1;gi.logging=gh;gi.setLogging=t=>{gh=t};gi.log=(...t)=>gh?console.log.apply(void 0,t):null;const yE=tv,{log:Pa}=gi,vE=mh;let Hg=0;var bE=()=>{const t=vE("Scheduler",Hg),e={},n={};let s=[];Hg+=1;const r=()=>s.length,i=()=>Object.keys(e).length,o=()=>{if(s.length!==0){const f=Object.keys(e);for(let h=0;h<f.length;h+=1)if(typeof n[f[h]]>"u"){s[0](e[f[h]]);break}}},a=(f,h)=>new Promise((m,g)=>{const x=yE({action:f,payload:h});s.push(async v=>{s.shift(),n[v.id]=x;try{m(await v[f].apply(void 0,[...h,x.id]))}catch(b){g(b)}finally{delete n[v.id],o()}}),Pa(`[${t}]: Add ${x.id} to JobQueue`),Pa(`[${t}]: JobQueue length=${s.length}`),o()});return{addWorker:f=>(e[f.id]=f,Pa(`[${t}]: Add ${f.id}`),Pa(`[${t}]: Number of workers=${i()}`),o(),f.id),addJob:async(f,...h)=>{if(i()===0)throw Error(`[${t}]: You need to have at least one worker before adding jobs`);return a(f,h)},terminate:async()=>{Object.keys(e).forEach(async f=>{await e[f].terminate()}),s=[]},getQueueLen:r,getNumWorkers:i}};function wE(t){throw new Error('Could not dynamically require "'+t+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var kE=t=>{const e={};return typeof WorkerGlobalScope<"u"?e.type="webworker":typeof document=="object"?e.type="browser":typeof process=="object"&&typeof wE=="function"&&(e.type="node"),typeof t>"u"?e:e[t]};const jE=kE("type")==="browser",SE=jE?t=>new URL(t,window.location.href).href:t=>t;var _E=t=>{const e={...t};return["corePath","workerPath","langPath"].forEach(n=>{t[n]&&(e[n]=SE(e[n]))}),e},nv={TESSERACT_ONLY:0,LSTM_ONLY:1,TESSERACT_LSTM_COMBINED:2,DEFAULT:3};const NE="7.0.0",CE={version:NE};var EE={workerBlobURL:!0,logger:()=>{}};const ME=CE.version,PE=EE;var DE={...PE,workerPath:`https://cdn.jsdelivr.net/npm/tesseract.js@v${ME}/dist/worker.min.js`},AE=({workerPath:t,workerBlobURL:e})=>{let n;if(Blob&&URL&&e){const s=new Blob([`importScripts("${t}");`],{type:"application/javascript"});n=new Worker(URL.createObjectURL(s))}else n=new Worker(t);return n},OE=t=>{t.terminate()},TE=(t,e)=>{t.onmessage=({data:n})=>{e(n)}},zE=async(t,e)=>{t.postMessage(e)};const lu=t=>new Promise((e,n)=>{const s=new FileReader;s.onload=()=>{e(s.result)},s.onerror=({target:{error:{code:r}}})=>{n(Error(`File could not be read! Code=${r}`))},s.readAsArrayBuffer(t)}),$d=async t=>{let e=t;if(typeof t>"u")return"undefined";if(typeof t=="string")/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(t)?e=atob(t.split(",")[1]).split("").map(n=>n.charCodeAt(0)):e=await(await fetch(t)).arrayBuffer();else if(typeof HTMLElement<"u"&&t instanceof HTMLElement)t.tagName==="IMG"&&(e=await $d(t.src)),t.tagName==="VIDEO"&&(e=await $d(t.poster)),t.tagName==="CANVAS"&&await new Promise(n=>{t.toBlob(async s=>{e=await lu(s),n()})});else if(typeof OffscreenCanvas<"u"&&t instanceof OffscreenCanvas){const n=await t.convertToBlob();e=await lu(n)}else(t instanceof File||t instanceof Blob)&&(e=await lu(t));return new Uint8Array(e)};var IE=$d;const FE=DE,RE=AE,LE=OE,BE=TE,$E=zE,UE=IE;var WE={defaultOptions:FE,spawnWorker:RE,terminateWorker:LE,onMessage:BE,send:$E,loadImage:UE};const VE=_E,Cn=tv,{log:Yg}=gi,HE=mh,Ks=nv,{defaultOptions:YE,spawnWorker:KE,terminateWorker:GE,onMessage:qE,loadImage:Kg,send:XE}=WE;let Gg=0;var sv=async(t="eng",e=Ks.LSTM_ONLY,n={},s={})=>{const r=HE("Worker",Gg),{logger:i,errorHandler:o,...a}=VE({...YE,...n}),c={},u=typeof t=="string"?t.split("+"):t;let d=e,f=s;const h=[Ks.DEFAULT,Ks.LSTM_ONLY].includes(e)&&!a.legacyCore;let m,g;const x=new Promise((D,z)=>{g=D,m=z}),v=D=>{m(D.message)};let b=KE(a);b.onerror=v,Gg+=1;const p=({id:D,action:z,payload:M})=>new Promise((T,I)=>{Yg(`[${r}]: Start ${D}, action=${z}`);const R=`${z}-${D}`;c[R]={resolve:T,reject:I},XE(b,{workerId:r,jobId:D,action:z,payload:M})}),y=()=>console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)"),_=D=>p(Cn({id:D,action:"load",payload:{options:{lstmOnly:h,corePath:a.corePath,logging:a.logging}}})),j=(D,z,M)=>p(Cn({id:M,action:"FS",payload:{method:"writeFile",args:[D,z]}})),N=(D,z)=>p(Cn({id:z,action:"FS",payload:{method:"readFile",args:[D,{encoding:"utf8"}]}})),C=(D,z)=>p(Cn({id:z,action:"FS",payload:{method:"unlink",args:[D]}})),w=(D,z,M)=>p(Cn({id:M,action:"FS",payload:{method:D,args:z}})),k=(D,z)=>p(Cn({id:z,action:"loadLanguage",payload:{langs:D,options:{langPath:a.langPath,dataPath:a.dataPath,cachePath:a.cachePath,cacheMethod:a.cacheMethod,gzip:a.gzip,lstmOnly:[Ks.DEFAULT,Ks.LSTM_ONLY].includes(d)&&!a.legacyLang}}})),S=(D,z,M,T)=>p(Cn({id:T,action:"initialize",payload:{langs:D,oem:z,config:M}})),P=(D="eng",z,M,T)=>{if(h&&[Ks.TESSERACT_ONLY,Ks.TESSERACT_LSTM_COMBINED].includes(z))throw Error("Legacy model requested but code missing.");const I=z||d;d=I;const R=M||f;f=R;const K=(typeof D=="string"?D.split("+"):D).filter(se=>!u.includes(se));return u.push(...K),K.length>0?k(K,T).then(()=>S(D,I,R,T)):S(D,I,R,T)},O=(D={},z)=>p(Cn({id:z,action:"setParameters",payload:{params:D}})),A=async(D,z={},M={text:!0},T)=>p(Cn({id:T,action:"recognize",payload:{image:await Kg(D),options:z,output:M}})),U=async(D,z)=>{if(h)throw Error("`worker.detect` requires Legacy model, which was not loaded.");return p(Cn({id:z,action:"detect",payload:{image:await Kg(D)}}))},L=async()=>(b!==null&&(GE(b),b=null),Promise.resolve());qE(b,({workerId:D,jobId:z,status:M,action:T,data:I})=>{const R=`${T}-${z}`;if(M==="resolve")Yg(`[${D}]: Complete ${z}`),c[R].resolve({jobId:z,data:I}),delete c[R];else if(M==="reject")if(c[R].reject(I),delete c[R],T==="load"&&m(I),o)o(I);else throw Error(I);else M==="progress"&&i({...I,userJobId:z})});const $={id:r,worker:b,load:y,writeText:j,readText:N,removeFile:C,FS:w,reinitialize:P,setParameters:O,recognize:A,detect:U,terminate:L};return _().then(()=>k(t)).then(()=>S(t,e,s)).then(()=>g($)).catch(()=>{}),x};const rv=sv,QE=async(t,e,n)=>{const s=await rv(e,1,n);return s.recognize(t).finally(async()=>{await s.terminate()})},ZE=async(t,e)=>{const n=await rv("osd",0,e);return n.detect(t).finally(async()=>{await n.terminate()})};var JE={recognize:QE,detect:ZE},eM={AFR:"afr",AMH:"amh",ARA:"ara",ASM:"asm",AZE:"aze",AZE_CYRL:"aze_cyrl",BEL:"bel",BEN:"ben",BOD:"bod",BOS:"bos",BUL:"bul",CAT:"cat",CEB:"ceb",CES:"ces",CHI_SIM:"chi_sim",CHI_TRA:"chi_tra",CHR:"chr",CYM:"cym",DAN:"dan",DEU:"deu",DZO:"dzo",ELL:"ell",ENG:"eng",ENM:"enm",EPO:"epo",EST:"est",EUS:"eus",FAS:"fas",FIN:"fin",FRA:"fra",FRK:"frk",FRM:"frm",GLE:"gle",GLG:"glg",GRC:"grc",GUJ:"guj",HAT:"hat",HEB:"heb",HIN:"hin",HRV:"hrv",HUN:"hun",IKU:"iku",IND:"ind",ISL:"isl",ITA:"ita",ITA_OLD:"ita_old",JAV:"jav",JPN:"jpn",KAN:"kan",KAT:"kat",KAT_OLD:"kat_old",KAZ:"kaz",KHM:"khm",KIR:"kir",KOR:"kor",KUR:"kur",LAO:"lao",LAT:"lat",LAV:"lav",LIT:"lit",MAL:"mal",MAR:"mar",MKD:"mkd",MLT:"mlt",MSA:"msa",MYA:"mya",NEP:"nep",NLD:"nld",NOR:"nor",ORI:"ori",PAN:"pan",POL:"pol",POR:"por",PUS:"pus",RON:"ron",RUS:"rus",SAN:"san",SIN:"sin",SLK:"slk",SLV:"slv",SPA:"spa",SPA_OLD:"spa_old",SQI:"sqi",SRP:"srp",SRP_LATN:"srp_latn",SWA:"swa",SWE:"swe",SYR:"syr",TAM:"tam",TEL:"tel",TGK:"tgk",TGL:"tgl",THA:"tha",TIR:"tir",TUR:"tur",UIG:"uig",UKR:"ukr",URD:"urd",UZB:"uzb",UZB_CYRL:"uzb_cyrl",VIE:"vie",YID:"yid"},tM={OSD_ONLY:"0",AUTO_OSD:"1",AUTO_ONLY:"2",AUTO:"3",SINGLE_COLUMN:"4",SINGLE_BLOCK_VERT_TEXT:"5",SINGLE_BLOCK:"6",SINGLE_LINE:"7",SINGLE_WORD:"8",CIRCLE_WORD:"9",SINGLE_CHAR:"10",SPARSE_TEXT:"11",SPARSE_TEXT_OSD:"12",RAW_LINE:"13"};const nM=bE,sM=sv,rM=JE,iM=eM,oM=nv,aM=tM,{setLogging:lM}=gi;var cM={languages:iM,OEM:oM,PSM:aM,createScheduler:nM,createWorker:sM,setLogging:lM,...rM};const uM=Gd(cM),dM=async(t,e=()=>{})=>{try{const{data:{text:n}}=await uM.recognize(t,"chi_sim+eng",{logger:s=>{console.log(s),s.status==="recognizing text"&&e(s.progress)}});return console.log("OCR Text:",n),fM(n)}catch(n){throw console.error("OCR Error:",n),new Error("识别失败，请重试")}},fM=t=>{const e={amount:0,date:null,merchant:"",text:t},n=t.split(`
`).map(i=>i.trim()).filter(i=>i),s=[];n.forEach(i=>{const o=i.matchAll(/([1-9]\d*\.\d{2})/g);for(const a of o)s.push(parseFloat(a[1]));if(/合计|Total|实付|Amount/i.test(i)){const a=i.match(/(\d+\.\d{2})/);a&&(e.amount=parseFloat(a[1]))}}),e.amount===0&&s.length>0&&(e.amount=Math.max(...s));const r=/(\d{4})[-/年.](\d{1,2})[-/月.](\d{1,2})/;for(const i of n){const o=i.match(r);if(o){const a=o[1],c=o[2].padStart(2,"0"),u=o[3].padStart(2,"0");e.date=`${a}-${c}-${u}`;break}}for(const i of n)if(i.length>2&&!/\d{4}[-/年.]/.test(i)&&isNaN(parseFloat(i))){e.merchant=i;break}return e},hM=(t,e,n)=>{const s={amount:null,date:null,categoryId:null,accountId:null,remark:t};if(!t)return s;const r=/(\d+(?:\.\d{1,2})?)\s*(?:元|块|钱|yuan)?/gi;let i;const o=[];for(;(i=r.exec(t))!==null;)o.push(parseFloat(i[1]));o.length>0&&(s.amount=o[o.length-1]);const a=new Date;if(t.includes("昨天")||t.includes("yesterday")){const h=new Date(a);h.setDate(h.getDate()-1),s.date=h.toISOString().split("T")[0]}else if(t.includes("前天")){const h=new Date(a);h.setDate(h.getDate()-2),s.date=h.toISOString().split("T")[0]}else(t.includes("今天")||t.includes("today"))&&(s.date=a.toISOString().split("T")[0]);let c=null,u=0;for(const h of e)t.includes(h.name)&&h.name.length>u&&(u=h.name.length,c=h.id);s.categoryId=c;let d=null,f=0;for(const h of n)t.includes(h.name)&&h.name.length>f&&(f=h.name.length,d=h.id);return s.accountId=d,s},pM=[{key:"food",name:"食品酒水"},{key:"living",name:"居家生活"},{key:"transport",name:"行车交通"},{key:"communication",name:"交流通讯"},{key:"entertainment",name:"休闲娱乐"},{key:"social",name:"人情往来"},{key:"health",name:"医疗保健"},{key:"finance",name:"金融保险"},{key:"other",name:"其他"}];function qg(){const t=Ke(),[e]=Hf(),n=e.get("editId")||e.get("edit"),s=e.get("templateId"),r=e.get("date"),[i,o]=E.useState("expense"),[a,c]=E.useState("0.00"),[u,d]=E.useState(""),[f,h]=E.useState(!0),[m,g]=E.useState("debt_out"),[x,v]=E.useState("increase"),[b,p]=E.useState(!1),[y,_]=E.useState(!1),[j,N]=E.useState(!0),[C,w]=E.useState(null),[k,S]=E.useState(null),[P,O]=E.useState(null),[A,U]=E.useState(""),[L,$]=E.useState(()=>{const W=new Date;return new Date(W.getTime()-W.getTimezoneOffset()*6e4).toISOString().slice(0,16)}),[D,z]=E.useState(null),[M,T]=E.useState(""),[I,R]=E.useState(""),[B,K]=E.useState([]),[se,ce]=E.useState([]),[ge,ue]=E.useState([]),[Y,re]=E.useState([]),[ne,de]=E.useState([]),[F,V]=E.useState(!1),[te,J]=E.useState(!1),[he,H]=E.useState(!1),[Q,ae]=E.useState(!1),[fe,be]=E.useState(!1),[Fe,je]=E.useState(!1),[Ge,Me]=E.useState(!1),[ht,Kt]=E.useState(!1),ie=E.useRef(null),[Se,Ae]=E.useState(0),[Oe,rt]=E.useState(null),[is,_h]=E.useState([]),[Ho,f4]=E.useState(!1),[Cv,kr]=E.useState(!1),[Nh,Ch]=E.useState(""),[Eh,Yo]=E.useState(null),pc=E.useMemo(()=>Oe?URL.createObjectURL(Oe):null,[Oe]),Mh=()=>{const W=Nh.trim();if(!W){kr(!1);return}try{const q=hM(W,B,se);if(q.amount&&(c(q.amount.toFixed(2)),h(!1)),q.date){const me=new Date,we=String(me.getHours()).padStart(2,"0")+":"+String(me.getMinutes()).padStart(2,"0");$(`${q.date}T${we}`)}q.categoryId&&w(q.categoryId),q.accountId&&S(q.accountId),q.remark&&U(me=>(me?me+" ":"")+q.remark)}catch(q){console.error("Parse error",q)}Ch(""),kr(!1)},Ph=()=>{kr(!0)},Ev=async()=>{try{const W=pe(),[q,me,we,nn,Go]=await Promise.all([pi(),hh(),ph(),W.getAll("merchants"),W.getAll("projects")]),xc=q.filter(Ov=>Ov.type===i);K(xc),ce(me||[]),ue(we||[]),re(nn||[]),de(Go||[]),xc.length>0&&!C&&w(xc[0].id),(me==null?void 0:me.length)>0&&!k&&S(me[0].id),(we==null?void 0:we.length)>0&&!D&&z(we[0].id)}catch(W){console.error("加载失败:",W)}},Mv=async()=>{var W;try{const q=await eE(n);if(q){o(q.type||"expense"),c(String(q.amount||"0")),w(q.categoryId),S(q.accountId),O(q.toAccountId),U(q.remark||""),$(((W=q.date)==null?void 0:W.slice(0,16))||new Date().toISOString().slice(0,16)),z(q.personId),T(q.merchant||""),R(q.project||""),p(q.noStats||!1),_(q.noBudget||!1),q.type==="balance"&&v(q.balanceType||"increase"),(q.type==="debt_out"||q.type==="debt_in")&&(o("loan"),g(q.type)),h(!1);const me=await rE(n);_h(me||[])}}catch(q){console.error("加载编辑数据失败:",q)}},Pv=async()=>{try{const q=await pe().get("templates",Number(s));q&&(o(q.type||"expense"),c(String(q.amount||"0.00")),w(q.categoryId),S(q.accountId),U(q.remark||""),p(q.noStats||!1),_(q.noBudget||!1))}catch(W){console.error("加载模板数据失败:",W)}};E.useEffect(()=>{Ev()},[i]),E.useEffect(()=>{n&&Mv()},[n]),E.useEffect(()=>{s&&Pv()},[s]),E.useEffect(()=>{if(r&&!n){const W=new Date,q=String(W.getHours()).padStart(2,"0")+":"+String(W.getMinutes()).padStart(2,"0");$(`${r}T${q}`)}},[r,n]);const mc=W=>{if(!W)return 0;try{const q=W.split(/([+\-])/).filter(we=>we);let me=parseFloat(q[0])||0;for(let we=1;we<q.length;we+=2){const nn=q[we],Go=parseFloat(q[we+1])||0;nn==="+"?me+=Go:nn==="-"&&(me-=Go)}return me}catch{return 0}},Ws=W=>{if(W==="OK"){const q=mc(u||a);c(q.toFixed(2)),d(""),Dh();return}if(W==="DEL"){if(u)if(u.length===1)d(""),c("0.00");else{const q=u.slice(0,-1);d(q),c(mc(q).toFixed(2))}else a.length===1||a==="0.00"?c("0.00"):c(q=>q.slice(0,-1));return}if(["+","-"].includes(W)){const q=u||a;q&&!/[+\-]$/.test(q)&&d(q+W);return}if(u)if(W==="."){const q=u.split(/[+\-]/);q[q.length-1].includes(".")||d(u+W)}else{const q=u+W;d(q),c(mc(q).toFixed(2))}else f?W==="."?a.includes(".")||c(a+"."):c(a==="0.00"||a==="0"?W:a+W):(c(W),h(!0))},Dh=async()=>{const W=parseFloat(a);if(!W||W===0){alert("请输入金额");return}try{let q=i;i==="loan"&&(q=m);const me={type:q,amount:W,balanceType:i==="balance"?x:null,categoryId:C,accountId:k,toAccountId:i==="transfer"?P:null,remark:A,date:L,personId:D,merchant:M,project:I};if(n){if(await ZC(n,me),Oe){const we=new FileReader;we.readAsDataURL(Oe),we.onload=async()=>{await Lg({transactionId:n,data:we.result,createdAt:new Date().toISOString()})}}}else{const we=await X1(me);if(Oe){const nn=new FileReader;nn.readAsDataURL(Oe),nn.onload=async()=>{await Lg({transactionId:we.id,data:nn.result,createdAt:new Date().toISOString()})}}}t(-1)}catch(q){alert("保存失败: "+q.message)}},Ah=B.find(W=>W.id===C),tn=se.find(W=>W.id===k),gc=se.find(W=>W.id===P),jr=ge.find(W=>W.id===D),Dv=W=>{const q=new Date(W);return`${q.getFullYear()}年${q.getMonth()+1}月${q.getDate()}日 ${String(q.getHours()).padStart(2,"0")}:${String(q.getMinutes()).padStart(2,"0")}`},Ko=[{key:"template",label:"模板"},{key:"expense",label:"支出"},{key:"income",label:"收入"},{key:"transfer",label:"转账"},{key:"balance",label:"余额"},{key:"loan",label:"借贷"}],Oh=W=>{const q=Ko.findIndex(nn=>nn.key===i);if(q===-1)return;let me=W==="next"?q+1:q-1;if(me<0||me>=Ko.length)return;const we=Ko[me].key;we==="template"?t("/templates"):o(we)},Av=rs({onSwipedLeft:()=>Oh("next"),onSwipedRight:()=>Oh("prev"),trackMouse:!0});return l.jsxs("div",{className:"page add-page",...Av,children:[ht&&l.jsx("div",{className:"modal-overlay",style:{alignItems:"center",justifyContent:"center",zIndex:9999},children:l.jsxs("div",{className:"modal-content",style:{maxWidth:300,borderRadius:12,padding:20,paddingBottom:20},children:[l.jsx("div",{className:"voice-permission-title",children:"请允许麦克风权限以使用语音记账"}),l.jsx("div",{className:"voice-permission-actions",children:l.jsx("button",{className:"voice-permission-confirm",onClick:()=>{Kt(!1),Ph()},children:"确定"})})]})}),Cv&&l.jsx("div",{className:"modal-overlay",onClick:()=>kr(!1),children:l.jsxs("div",{className:"modal-content",onClick:W=>W.stopPropagation(),style:{maxWidth:340,borderRadius:12},children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:"✏️ 智能记账"}),l.jsx("button",{onClick:()=>kr(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{style:{padding:"16px"},children:[l.jsx("p",{style:{fontSize:13,color:"#666",marginBottom:12},children:"输入记账内容，或点击键盘的 🎤 使用语音输入："}),l.jsx("input",{type:"text",value:Nh,onChange:W=>Ch(W.target.value),onKeyDown:W=>W.key==="Enter"&&Mh(),placeholder:"例如：午餐30元、打车15、买菜50",autoFocus:!0,style:{width:"100%",padding:"12px",borderRadius:8,border:"1px solid #ddd",fontSize:16,boxSizing:"border-box"}}),l.jsxs("div",{style:{display:"flex",gap:8,marginTop:12},children:[l.jsx("button",{onClick:()=>kr(!1),style:{flex:1,padding:"10px",borderRadius:8,border:"1px solid #ddd",background:"#fff",color:"#666",cursor:"pointer"},children:"取消"}),l.jsx("button",{onClick:Mh,style:{flex:1,padding:"10px",borderRadius:8,border:"none",background:"var(--primary-color, #4CAF50)",color:"#fff",cursor:"pointer"},children:"确定"})]})]})]})}),l.jsxs("div",{className:"top-header",children:[l.jsxs("button",{className:"back-btn",onClick:()=>t(-1),children:[l.jsx(fn,{size:24}),l.jsx("span",{children:"记一笔"})]}),l.jsxs("div",{className:"header-actions",children:[l.jsx("button",{className:"custom-btn",onClick:()=>t("/settings/bookkeeping"),children:"☆自定义"}),l.jsx("button",{className:"save-btn",onClick:Dh,children:l.jsx(_o,{size:20})})]})]}),l.jsx("div",{className:"tab-bar",children:Ko.map(W=>l.jsx("button",{className:`tab-item ${i===W.key?"active":""}`,onClick:()=>{W.key==="template"?t("/templates"):o(W.key)},children:W.label},W.key))}),l.jsxs("div",{className:"amount-section",onClick:()=>N(!0),children:[l.jsxs("div",{className:"amount-display",children:[l.jsx("span",{className:"amount-value",children:a}),u&&l.jsx("span",{className:"expression",children:u})]}),l.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[is.map(W=>l.jsxs("div",{className:"thumb-box",children:[l.jsx("img",{src:W.data,onClick:()=>Yo(W.data)}),l.jsx("button",{className:"thumb-del",onClick:async q=>{q.stopPropagation(),confirm("删除此照片?")&&(await sE(W.id),_h(me=>me.filter(we=>we.id!==W.id)))},children:l.jsx(ot,{size:10})})]},W.id)),pc&&l.jsxs("div",{className:"thumb-box new",children:[l.jsx("img",{src:pc,onClick:()=>Yo(pc)}),l.jsx("button",{className:"thumb-del",onClick:W=>{W.stopPropagation(),rt(null)},children:l.jsx(ot,{size:10})})]}),l.jsxs("button",{className:"camera-btn",onClick:()=>document.getElementById("camera-input").click(),disabled:Ge,children:[Ge?l.jsx(Xr,{size:22,className:"spin"}):l.jsx(Dj,{size:22}),l.jsx("span",{children:Ge?"识别中":"拍照"})]}),l.jsxs("button",{className:`camera-btn ${Ho?"listening":""}`,onClick:Ph,disabled:Ge||Ho,children:[Ho?l.jsx(Xr,{size:22,className:"spin"}):l.jsx(Vj,{size:22}),l.jsx("span",{children:Ho?"听写中":"语音"})]})]})]}),l.jsx("input",{type:"file",id:"camera-input",accept:"image/*",capture:"environment",style:{display:"none"},onChange:async W=>{const q=W.target.files[0];if(q){rt(q),Me(!0),Ae(0),ie.current&&clearTimeout(ie.current),ie.current=setTimeout(()=>{Me(!1),alert("识别超时，请重试或手动输入")},15e3);try{const me=await dM(q,we=>{Ae(Math.floor(we*100))});if(me.amount&&(c(me.amount.toFixed(2)),h(!1)),me.date){const we=new Date,nn=String(we.getHours()).padStart(2,"0")+":"+String(we.getMinutes()).padStart(2,"0");$(`${me.date}T${nn}`)}me.merchant&&T(me.merchant),U(we=>(we?we+" ":"")+"OCR识别")}catch(me){alert("识别失败: "+me.message),rt(null)}finally{ie.current&&clearTimeout(ie.current),Me(!1),Ae(0),W.target.value=""}}}}),Ge&&l.jsx("div",{className:"ocr-progress-overlay",children:l.jsxs("div",{className:"ocr-progress-box",children:[l.jsxs("span",{children:["正在识别... ",Se,"%"]}),l.jsx("div",{className:"ocr-bar",children:l.jsx("div",{className:"ocr-fill",style:{width:`${Se}%`}})}),l.jsx("button",{className:"ocr-cancel-btn",onClick:()=>{Me(!1),ie.current&&clearTimeout(ie.current),Ae(0)},children:"取消"})]})}),Eh&&l.jsxs("div",{className:"preview-overlay",onClick:()=>Yo(null),children:[l.jsx("img",{src:Eh,className:"preview-img",alt:"Original",onClick:W=>W.stopPropagation()}),l.jsx("button",{className:"preview-close",onClick:()=>Yo(null),children:l.jsx(ot,{size:24})})]}),l.jsxs("div",{className:"form-section",children:[i==="loan"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"form-row",children:[l.jsx("div",{className:"row-icon",children:l.jsx(nm,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"类型"}),l.jsxs("div",{className:"row-value loan-type-toggle",children:[l.jsx("button",{className:m==="debt_out"?"active":"",onClick:()=>g("debt_out"),children:"借出"}),l.jsx("button",{className:m==="debt_in"?"active":"",onClick:()=>g("debt_in"),children:"借入"})]})]}),l.jsxs("div",{className:"form-row",onClick:()=>ae(!0),children:[l.jsx("div",{className:"row-icon",children:l.jsx(ts,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"成员"}),l.jsxs("div",{className:"row-value",children:[(jr==null?void 0:jr.name)||"请选择成员(必选)",l.jsx($e,{size:16,color:"#ccc"})]})]}),l.jsxs("div",{className:"form-row",onClick:()=>J(!0),children:[l.jsx("div",{className:"row-icon",children:l.jsx(tr,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"账户"}),l.jsxs("div",{className:"row-value",children:[(tn==null?void 0:tn.name)||"请选择",l.jsx(Dt,{size:16,color:"#ccc"})]})]})]}):i==="balance"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"form-row",children:[l.jsx("div",{className:"row-icon",children:l.jsx(nm,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"调整"}),l.jsxs("div",{className:"row-value loan-type-toggle",children:[l.jsx("button",{className:x==="increase"?"active":"",onClick:()=>v("increase"),children:"增加"}),l.jsx("button",{className:x==="decrease"?"active":"",onClick:()=>v("decrease"),children:"减少"})]})]}),l.jsxs("div",{className:"form-row",onClick:()=>J(!0),children:[l.jsx("div",{className:"row-icon",children:l.jsx(tr,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"账户"}),l.jsxs("div",{className:"row-value",children:[(tn==null?void 0:tn.name)||"请选择",l.jsx(Dt,{size:16,color:"#ccc"})]})]})]}):i==="transfer"?l.jsxs("div",{className:"form-row transfer-accounts",children:[l.jsx("div",{className:"row-icon",children:l.jsx(tr,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"账户"}),l.jsxs("div",{className:"transfer-pair",children:[l.jsxs("div",{className:"transfer-item",onClick:()=>J(!0),children:[l.jsx("span",{className:"transfer-type",children:"转出"}),l.jsxs("span",{className:"transfer-account",children:[(tn==null?void 0:tn.name)||"请选择","(CNY)"]})]}),l.jsx("span",{className:"transfer-arrow",children:"⇄"}),l.jsxs("div",{className:"transfer-item",onClick:()=>H(!0),children:[l.jsx("span",{className:"transfer-type",children:"转入"}),l.jsxs("span",{className:"transfer-account",children:[(gc==null?void 0:gc.name)||"请选择","(CNY)"]})]})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"form-row",onClick:()=>V(!0),children:[l.jsx("div",{className:"row-icon",children:l.jsx(Lj,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"分类"}),l.jsx("div",{className:"row-value",children:Ah?l.jsxs(l.Fragment,{children:[l.jsx("span",{children:Ah.name}),l.jsx($e,{size:16,color:"#ccc"})]}):"请选择"})]}),l.jsxs("div",{className:"form-row",onClick:()=>J(!0),children:[l.jsx("div",{className:"row-icon",children:l.jsx(tr,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"账户"}),l.jsxs("div",{className:"row-value",children:[(tn==null?void 0:tn.name)||"请选择","(CNY)",l.jsx(Dt,{size:16,color:"#ccc"})]})]})]}),l.jsxs("div",{className:"form-row",children:[l.jsx("div",{className:"row-icon",children:l.jsx(Yy,{size:18,color:"#999"})}),l.jsx("span",{className:"row-label",children:"备注"}),l.jsx("input",{type:"text",className:"row-input",placeholder:"...",value:A,onChange:W=>U(W.target.value)})]})]}),l.jsxs("div",{className:"quick-tags",style:{padding:"0 16px 16px 16px"},children:[l.jsx("button",{className:"tag-btn",onClick:()=>document.getElementById("date-picker").showPicker(),children:Dv(L)}),l.jsx("input",{type:"datetime-local",id:"date-picker",value:L,onChange:W=>$(W.target.value),style:{position:"absolute",opacity:0,pointerEvents:"none"}}),l.jsx("button",{className:"tag-btn",onClick:()=>ae(!0),children:(jr==null?void 0:jr.name)||"成员"}),l.jsx("button",{className:"tag-btn",onClick:()=>be(!0),children:M||"商家"}),l.jsx("button",{className:"tag-btn",onClick:()=>je(!0),children:I||"项目"}),l.jsx("div",{style:{flex:1}}),l.jsx("button",{className:"tag-btn",onClick:()=>N(!j),style:{background:"none",border:"none",padding:"4px",color:"#999"},children:j?l.jsx(Dt,{size:20}):l.jsx(Dt,{size:20,style:{transform:"rotate(180deg)"}})})]}),j?l.jsxs("div",{className:"keyboard-section",children:[l.jsxs("div",{className:"type-sidebar",children:[l.jsx("button",{className:`type-btn ${i==="expense"?"active":""}`,onClick:()=>o("expense"),children:"支出"}),l.jsx("button",{className:`type-btn ${i==="income"?"active":""}`,onClick:()=>o("income"),children:"收入"}),l.jsx("button",{className:`type-btn ${i==="transfer"?"active":""}`,onClick:()=>o("transfer"),children:"转账"})]}),l.jsxs("div",{className:"number-pad",children:[["7","8","9","4","5","6","1","2","3",".","0"].map(W=>l.jsx("button",{className:"num-btn",onClick:()=>Ws(W),children:W},W)),l.jsx("button",{className:"num-btn",onClick:()=>Ws("DEL"),children:l.jsx(Oj,{size:20})})]}),l.jsxs("div",{className:"action-sidebar",children:[l.jsx("button",{className:"action-btn",onClick:()=>Ws("-"),children:"−"}),l.jsx("button",{className:"action-btn",onClick:()=>Ws("+"),children:"+"}),l.jsxs("button",{className:"action-btn ok",onClick:()=>Ws("OK"),children:["确",l.jsx("br",{}),"定"]})]})]}):l.jsxs("div",{className:"bottom-actions",children:[l.jsx("button",{className:"bottom-btn outline",onClick:()=>{Ws("OK"),N(!0)},children:"再记一笔"}),l.jsx("button",{className:"bottom-btn primary",onClick:()=>{Ws("OK"),t(-1)},children:"完成"})]}),F&&l.jsx("div",{className:"modal-overlay",onClick:()=>V(!1),children:l.jsxs("div",{className:"category-modal-content",onClick:W=>W.stopPropagation(),children:[l.jsxs("div",{className:"category-toolbar",children:[l.jsx("button",{className:"toolbar-btn",children:"⊕"}),l.jsx("button",{className:"toolbar-btn",children:"⧉"}),l.jsx("button",{className:"toolbar-btn",children:"⌕"}),l.jsx("button",{className:"toolbar-close",onClick:()=>V(!1),children:l.jsx(Dt,{size:20})})]}),l.jsxs("div",{className:"category-groups",children:[pM.map(W=>{const q=B.filter(me=>me.group===W.key||!me.group&&W.key==="other");return q.length===0?null:l.jsxs("div",{className:"category-group",children:[l.jsx("h4",{className:"group-title",children:W.name}),l.jsx("div",{className:"group-items",children:q.map(me=>l.jsxs("div",{className:`cat-item ${C===me.id?"selected":""}`,onClick:()=>{w(me.id),V(!1)},children:[l.jsx("div",{className:"cat-icon",style:{backgroundColor:me.color},children:me.icon}),l.jsx("span",{children:me.name})]},me.id))})]},W.key)}),B.filter(W=>!W.group).length===B.length&&l.jsx("div",{className:"category-group",children:l.jsx("div",{className:"group-items",children:B.map(W=>l.jsxs("div",{className:`cat-item ${C===W.id?"selected":""}`,onClick:()=>{w(W.id),V(!1)},children:[l.jsx("div",{className:"cat-icon",style:{backgroundColor:W.color},children:W.icon}),l.jsx("span",{children:W.name})]},W.id))})})]})]})}),te&&l.jsx("div",{className:"modal-overlay",onClick:()=>J(!1),children:l.jsxs("div",{className:"modal-content",onClick:W=>W.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:"选择账户"}),l.jsx("button",{onClick:()=>J(!1),children:l.jsx(ot,{size:20})})]}),l.jsx("div",{className:"list-items",children:se.map(W=>l.jsxs("div",{className:"list-item",onClick:()=>{S(W.id),J(!1)},children:[l.jsx("span",{children:W.icon||"💳"}),l.jsx("span",{children:W.name})]},W.id))})]})}),he&&l.jsx("div",{className:"modal-overlay",onClick:()=>H(!1),children:l.jsxs("div",{className:"modal-content",onClick:W=>W.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:"选择转入账户"}),l.jsx("button",{onClick:()=>H(!1),children:l.jsx(ot,{size:20})})]}),l.jsx("div",{className:"list-items",children:se.filter(W=>W.id!==k).map(W=>l.jsxs("div",{className:"list-item",onClick:()=>{O(W.id),H(!1)},children:[l.jsx("span",{children:W.icon||"💳"}),l.jsx("span",{children:W.name})]},W.id))})]})}),Q&&l.jsx("div",{className:"modal-overlay",onClick:()=>ae(!1),children:l.jsxs("div",{className:"modal-content",onClick:W=>W.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:"选择成员"}),l.jsx("button",{onClick:()=>ae(!1),children:l.jsx(ot,{size:20})})]}),l.jsx("div",{className:"list-items",children:ge.map(W=>l.jsxs("div",{className:"list-item",onClick:()=>{z(W.id),ae(!1)},children:[l.jsx("span",{children:W.avatar||"👤"}),l.jsx("span",{children:W.name})]},W.id))})]})}),fe&&l.jsx("div",{className:"modal-overlay",onClick:()=>be(!1),children:l.jsxs("div",{className:"modal-content",onClick:W=>W.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:"选择商家"}),l.jsx("button",{onClick:()=>be(!1),children:l.jsx(ot,{size:20})})]}),l.jsx("div",{className:"list-items",children:Y.map(W=>l.jsxs("div",{className:"list-item",onClick:()=>{T(W.name),be(!1)},children:[l.jsx("span",{children:W.icon||"🏪"}),l.jsx("span",{children:W.name})]},W.id))})]})}),Fe&&l.jsx("div",{className:"modal-overlay",onClick:()=>je(!1),children:l.jsxs("div",{className:"modal-content",onClick:W=>W.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:"选择项目"}),l.jsx("button",{onClick:()=>je(!1),children:l.jsx(ot,{size:20})})]}),l.jsx("div",{className:"list-items",children:ne.map(W=>l.jsxs("div",{className:"list-item",onClick:()=>{R(W.name),je(!1)},children:[l.jsx("span",{children:W.icon||"📁"}),l.jsx("span",{children:W.name})]},W.id))})]})})]})}const mM=[{key:"cash",title:"现金账户",icon:kd,types:["cash","bank","other"]},{key:"virtual",title:"虚拟账户",icon:tr,types:["alipay","wechat","virtual"]},{key:"investment",title:"投资账户",icon:wd,types:["stock","fund","investment"]},{key:"receivable",title:"债权账户",icon:Kj,types:["receivable"]},{key:"credit",title:"信用账户",icon:$j,types:["credit_card","loan"]}],gM=[{value:"cash",label:"现金",icon:"💵"},{value:"bank",label:"银行卡",icon:"🏦"},{value:"alipay",label:"支付宝",icon:"💙"},{value:"wechat",label:"微信",icon:"💚"},{value:"credit_card",label:"信用卡",icon:"💳"},{value:"investment",label:"投资",icon:"📈"},{value:"other",label:"其他",icon:"📦"}];function xM(){const t=Ke(),e=rs({onSwipedRight:()=>t(-1),trackMouse:!0}),[n,s]=E.useState([]),[r,i]=E.useState(0),[o,a]=E.useState(0),[c,u]=E.useState(0),[d,f]=E.useState({cash:!0,virtual:!0,investment:!0,receivable:!0,credit:!0}),[h,m]=E.useState(!1),[g,x]=E.useState(null),[v,b]=E.useState(""),[p,y]=E.useState(""),[_,j]=E.useState("bank"),[N,C]=E.useState("🏦");E.useEffect(()=>{w()},[]);const w=async()=>{try{const D=pe(),[z,M]=await Promise.all([D.getAll("accounts"),uh()]),T=z.map(I=>{let R=Number(I.balance||0);return M.forEach(B=>{const K=Number(B.amount);B.accountId===I.id&&(B.type==="expense"&&(R-=K),B.type==="income"&&(R+=K),B.type==="transfer"&&(R-=K)),B.toAccountId===I.id&&B.type==="transfer"&&(R+=K)}),{...I,_currentBalance:R}});s(T),k(T)}catch(D){console.error("加载账户失败:",D)}},k=D=>{let z=0,M=0;D.forEach(T=>{const I=T.type||"other",R=T._currentBalance;["credit_card","loan"].includes(I)?R<0?M+=Math.abs(R):z+=R:R>=0?z+=R:M+=Math.abs(R)}),i(z),a(M),u(z-M)},S=D=>{f(z=>({...z,[D]:!z[D]}))},P=D=>n.filter(z=>D.includes(z.type||"other")),O=D=>new Intl.NumberFormat("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(D),A=()=>{x(null),b(""),y(""),j("bank"),C("🏦"),m(!0)},U=D=>{x(D.id),b(D.name),y(String(D.balance||0)),j(D.type||"bank"),C(D.icon||"🏦"),m(!0)},L=async()=>{if(!v.trim()){alert("请输入账户名称");return}try{const D=pe(),z={name:v.trim(),balance:parseFloat(p)||0,type:_,icon:N,color:"#5C7AEA"};g?await D.put("accounts",{...z,id:g}):await D.add("accounts",z),m(!1),w()}catch(D){alert("保存失败: "+D.message)}},$=async()=>{if(g&&confirm("确定要删除该账户吗？删除后无法恢复。"))try{await pe().delete("accounts",g),m(!1),w()}catch(D){alert("删除失败: "+D.message)}};return l.jsxs("div",{className:"page accounts-page",...e,children:[l.jsxs("div",{className:"page-header",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(Us,{size:22})}),l.jsx("h1",{children:"账户"}),l.jsx("button",{className:"edit-btn",onClick:A,children:l.jsx(It,{size:22})})]}),l.jsxs("div",{className:"asset-card",onClick:()=>t("/records"),children:[l.jsxs("div",{className:"asset-main",children:[l.jsx("span",{className:"net-label",children:"净资产"}),l.jsxs("span",{className:"net-amount",children:["¥ ",O(c)]})]}),l.jsxs("div",{className:"asset-details",children:[l.jsxs("div",{className:"detail-item",children:[l.jsx("span",{className:"label",children:"总资产"}),l.jsxs("span",{className:"value",children:["¥ ",O(r)]})]}),l.jsxs("div",{className:"detail-item",children:[l.jsx("span",{className:"label",children:"总负债"}),l.jsxs("span",{className:"value",children:["¥ ",O(o)]})]})]})]}),l.jsx("div",{className:"account-groups",children:mM.map(D=>{const z=P(D.types),M=z.reduce((R,B)=>R+B._currentBalance,0),T=d[D.key],I=D.icon;return l.jsxs("div",{className:"group-section",children:[l.jsxs("div",{className:"group-header",onClick:()=>S(D.key),children:[l.jsxs("div",{className:"group-title",children:[l.jsx(I,{size:16,strokeWidth:1.5}),l.jsx("span",{children:D.title}),T?l.jsx(Dt,{size:14}):l.jsx($e,{size:14})]}),l.jsx("span",{className:"group-total",children:O(M)})]}),T&&l.jsxs("div",{className:"group-list",children:[z.map(R=>l.jsxs("div",{className:"account-item",onClick:()=>t(`/records?accountId=${R.id}`),children:[l.jsx("div",{className:"account-icon",children:R.icon||"💰"}),l.jsx("div",{className:"account-info",children:l.jsx("span",{className:"account-name",children:R.name})}),l.jsxs("div",{className:"account-amount",children:[l.jsx("span",{className:R._currentBalance<0?"negative":"",children:O(R._currentBalance)}),l.jsx($e,{size:16,color:"#ccc"})]}),l.jsx("button",{className:"item-edit-btn",onClick:B=>{B.stopPropagation(),U(R)},children:l.jsx(Yf,{size:16,color:"#999"})})]},R.id)),z.length===0&&l.jsx("div",{className:"empty-group",children:"暂无账户"})]})]},D.key)})}),h&&l.jsx("div",{className:"modal-overlay",onClick:()=>m(!1),children:l.jsxs("div",{className:"modal-content",onClick:D=>D.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:g?"编辑账户":"添加账户"}),l.jsx("button",{onClick:()=>m(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"账户名称"}),l.jsx("input",{type:"text",value:v,onChange:D=>b(D.target.value),placeholder:"如：工商银行储蓄卡"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"初始余额"}),l.jsx("input",{type:"number",value:p,onChange:D=>y(D.target.value),placeholder:"0.00"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"账户类型"}),l.jsx("div",{className:"type-grid",children:gM.map(D=>l.jsxs("div",{className:`type-option ${_===D.value?"active":""}`,onClick:()=>{j(D.value),C(D.icon)},children:[l.jsx("span",{className:"type-icon",children:D.icon}),l.jsx("span",{className:"type-label",children:D.label})]},D.value))})]}),l.jsxs("div",{className:"modal-footer",children:[g&&l.jsx("button",{className:"btn-delete",onClick:$,children:"删除"}),l.jsx("button",{className:"btn-save",onClick:L,children:"保存"})]})]})}),l.jsx("style",{children:`
        .accounts-page {
          background: #f5f6fa;
          min-height: 100vh;
          padding-bottom: 40px;
        }

        /* Fixed Header */
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .page-header h1 {
          font-size: 17px;
          font-weight: 600;
          color: #333;
        }

        .back-btn, .edit-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.03);
          border: none;
          border-radius: 50%;
          color: #333;
          transition: background 0.2s;
        }
        .back-btn:active, .edit-btn:active {
          background: rgba(0,0,0,0.08);
        }

        /* Asset Card */
        .asset-card {
          margin: 16px;
          padding: 24px;
          background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
          background-image: url('https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=800&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          color: #fff;
          box-shadow: 0 10px 30px rgba(132, 250, 176, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .asset-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(46, 139, 87, 0.85) 0%, rgba(32, 178, 170, 0.85) 100%);
          z-index: 1;
        }
        
        .asset-main, .asset-details {
          position: relative;
          z-index: 2;
        }

        .asset-main { margin-bottom: 24px; text-align: center; }
        .net-label { font-size: 13px; opacity: 0.9; display: block; margin-bottom: 4px; font-weight: 500;}
        .net-amount { font-size: 36px; font-weight: 700; font-family: 'DIN Alternate', sans-serif; letter-spacing: 0.5px; }

        .asset-details { 
            display: flex; 
            justify-content: space-around; 
            background: rgba(255,255,255,0.1); 
            padding: 12px; 
            border-radius: 12px; 
            backdrop-filter: blur(5px);
        }
        .detail-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .detail-item .label { font-size: 11px; opacity: 0.8; }
        .detail-item .value { font-size: 15px; font-weight: 600; font-family: 'DIN Alternate', sans-serif; }

        /* Account Groups */
        .account-groups { padding: 0 16px; display: flex; flex-direction: column; gap: 16px; }

        .group-section {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          cursor: pointer;
          background: #fff;
          border-bottom: 1px solid transparent;
        }
        .group-header:active { background: #f9f9f9; }

        .group-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: #333;
          font-weight: 500;
        }
        .group-title svg { color: #8fd3f4; fill: #8fd3f4; fill-opacity: 0.2; }

        .group-total { font-size: 14px; color: #999; font-weight: 500; font-family: 'DIN Alternate', sans-serif; }

        .group-list {
            background: #fbfbfd;
        }

        .account-item {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-top: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background 0.2s;
        }
        .account-item:active { background: #f0f0f0; }

        .account-icon {
          width: 42px;
          height: 42px;
          background: #fff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-right: 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          border: 1px solid #f5f5f5;
        }

        .account-info { flex: 1; }
        .account-name { font-size: 15px; color: #333; font-weight: 500; }

        .account-amount {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          color: #333;
          font-weight: 600;
          font-family: 'DIN Alternate', sans-serif;
        }
        .account-amount .negative { color: #ff5252; }

        .item-edit-btn {
          width: 32px;
          height: 32px;
          margin-left: 4px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
        }
        .item-edit-btn:active {
           background: rgba(0,0,0,0.05);
        }

        .empty-group { padding: 24px; text-align: center; color: #ccc; font-size: 13px; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (min-width: 768px) {
          .modal-overlay { align-items: center; }
          .modal-content { width: 420px !important; border-radius: 20px !important; }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 24px 24px 0 0;
          padding: 24px;
          animation: slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -10px 40px rgba(0,0,0,0.1);
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .modal-header h3 { font-size: 18px; margin: 0; font-weight: 600; }
        .modal-header button { background: #f5f5f5; border: none; color: #666; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-weight: 500; }
        .form-group input {
          width: 100%;
          padding: 16px;
          background: #f7f8fa;
          border: 1px solid transparent;
          border-radius: 12px;
          font-size: 16px;
          outline: none;
          transition: all 0.2s;
          color: #333;
        }
        .form-group input:focus {
           background: #fff;
           border-color: #8fd3f4;
           box-shadow: 0 0 0 4px rgba(143, 211, 244, 0.1);
        }

        .type-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .type-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 6px;
          background: #f7f8fa;
          border-radius: 14px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        .type-option.active {
          border-color: #8fd3f4;
          background: #e6f7ff;
        }

        .type-icon { font-size: 24px; }
        .type-label { font-size: 12px; color: #555; }

        .modal-footer {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn-delete {
          padding: 16px 24px;
          background: #fff1f0;
          color: #ff4d4f;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
        }

        .btn-save {
          flex: 1;
          padding: 16px;
          background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(132, 250, 176, 0.3);
        }
        .btn-save:active { opacity: 0.9; transform: scale(0.98); }
      `})]})}function yM(){const t=Ke(),[e,n]=E.useState([]),[s,r]=E.useState([]),[i,o]=E.useState({}),[a,c]=E.useState("expense"),[u,d]=E.useState(new Date().getFullYear()),[f,h]=E.useState({budget:0,used:0,remaining:0,balance:0}),[m,g]=E.useState(!1),[x,v]=E.useState(null),[b,p]=E.useState(null),[y,_]=E.useState(""),j=new Date,N=j.getFullYear(),C=j.getMonth()+1,w=`${N}-${C.toString().padStart(2,"0")}`,k=rs({onSwipedLeft:()=>d(L=>L+1),onSwipedRight:()=>d(L=>L-1),preventScrollOnSwipe:!0,trackMouse:!0,delta:50,swipeDuration:500,touchEventOptions:{passive:!1}});E.useEffect(()=>{S()},[u]);const S=async()=>{try{const D=(await pe().getAll("budgets")).filter(K=>K.month===w);n(D);const M=(await pi()).filter(K=>K.type===a);r(M),M.length>0&&!b&&p(M[0].id);const T=await tE(u),I={};let R=0;T.filter(K=>K.type===a).forEach(K=>{I[K.categoryId]=(I[K.categoryId]||0)+Number(K.amount),R+=Number(K.amount)}),o(I);const B=D.reduce((K,se)=>K+Number(se.amount||0),0)*12;h({budget:B,used:R,remaining:Math.max(0,B-R),balance:B-R})}catch(L){console.error("加载预算失败:",L)}},P=()=>{v(null),_(""),s.length>0&&p(s[0].id),g(!0)},O=async()=>{const L=parseFloat(y);if(!b||isNaN(L)||L<=0){alert("请选择分类并输入有效金额");return}try{const $=pe(),D={categoryId:b,amount:L,month:w,spent:0};if(x)await $.put("budgets",{...D,id:x});else{if(e.find(M=>M.categoryId===b)){alert("该分类已有预算，请编辑现有预算");return}await $.add("budgets",D)}g(!1),S()}catch($){alert("保存失败: "+$.message)}},A=L=>new Intl.NumberFormat("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(L),U=s.map(L=>{const $=e.find(z=>z.categoryId===L.id),D=i[L.id]||0;return{category:L,budget:($==null?void 0:$.amount)||0,spent:D,remaining:(($==null?void 0:$.amount)||0)-D}});return l.jsxs("div",{className:"page budget-page",...k,children:[l.jsxs("div",{className:"page-header",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(Us,{size:22})}),l.jsx("h1",{children:"预算中心"}),l.jsx("button",{className:"add-btn",onClick:P,children:l.jsx(It,{size:22})})]}),l.jsxs("div",{className:"filter-bar",children:[l.jsxs("button",{className:"filter-btn active",children:["分类支出 ",l.jsx(Dt,{size:14})]}),l.jsxs("button",{className:"filter-btn",children:[u,"年 ",l.jsx(Dt,{size:14})]}),l.jsxs("button",{className:"filter-btn",children:["日期 ",l.jsx(Dt,{size:14})]})]}),l.jsx("div",{className:"overview-card",children:l.jsxs("div",{className:"overview-row",children:[l.jsxs("div",{className:"ov-item",children:[l.jsx("span",{className:"ov-label",children:"本年预算"}),l.jsx("span",{className:"ov-value",children:A(f.budget)})]}),l.jsx("div",{className:"ov-divider"}),l.jsxs("div",{className:"ov-item",children:[l.jsx("span",{className:"ov-label",children:"已用"}),l.jsx("span",{className:"ov-value",children:A(f.used)})]}),l.jsx("div",{className:"ov-divider"}),l.jsxs("div",{className:"ov-item",children:[l.jsx("span",{className:"ov-label",children:"剩余"}),l.jsx("span",{className:"ov-value",children:A(f.remaining)})]}),l.jsx("div",{className:"ov-divider"}),l.jsxs("div",{className:"ov-item",children:[l.jsx("span",{className:"ov-label",children:"结存"}),l.jsx("span",{className:`ov-value ${f.balance<0?"negative":""}`,children:A(f.balance)})]})]})}),l.jsx("div",{className:"category-budget-list",children:U.map((L,$)=>l.jsxs("div",{className:"cat-budget-item",children:[l.jsx("div",{className:"cat-icon",style:{backgroundColor:L.category.color},children:L.category.icon}),l.jsxs("div",{className:"cat-info",children:[l.jsx("span",{className:"cat-name",children:L.category.name}),l.jsx("div",{className:"cat-amounts",children:l.jsxs("span",{className:"spent",children:["支出 ",A(L.spent)]})})]}),l.jsxs("div",{className:"cat-right",children:[l.jsx("span",{className:`remaining ${L.remaining<0?"negative":""}`,children:L.budget>0?L.remaining>=0?`剩余 ${A(L.remaining)}`:`超支 ${A(-L.remaining)}`:"未设预算"}),l.jsx($e,{size:16,color:"#ccc"})]})]},L.category.id))}),m&&l.jsx("div",{className:"modal-overlay",onClick:()=>g(!1),children:l.jsxs("div",{className:"modal-content",onClick:L=>L.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:x?"编辑预算":"添加预算"}),l.jsx("button",{onClick:()=>g(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"选择分类"}),l.jsx("div",{className:"cat-select",children:s.map(L=>l.jsxs("div",{className:`cat-option ${b===L.id?"selected":""}`,onClick:()=>p(L.id),children:[l.jsx("span",{className:"cat-icon-sm",style:{backgroundColor:L.color},children:L.icon}),l.jsx("span",{className:"cat-name",children:L.name})]},L.id))})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"月预算金额"}),l.jsx("input",{type:"number",value:y,onChange:L=>_(L.target.value),placeholder:"请输入金额"})]}),l.jsx("div",{className:"modal-footer",children:l.jsx("button",{className:"btn-save",onClick:O,children:"保存"})})]})}),l.jsx("style",{children:`
        .budget-page {
          background: #f5f6f8;
          min-height: 100vh;
          padding-bottom: 100px;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
        }

        .page-header h1 { font-size: 18px; font-weight: 600; color: #333; }

        .back-btn, .add-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; color: #333;
        }

        /* 筛选栏 */
        .filter-bar {
          display: flex;
          gap: 12px;
          padding: 12px 16px;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background: #f5f5f5;
          border: none;
          border-radius: 16px;
          font-size: 13px;
          color: #666;
        }

        .filter-btn.active {
          background: #667eea;
          color: #fff;
        }

        /* 总览卡片 */
        .overview-card {
          margin: 16px;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
        }

        .overview-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ov-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
        }

        .ov-label { font-size: 12px; color: #999; }
        .ov-value { font-size: 14px; font-weight: 600; color: #333; }
        .ov-value.negative { color: #ff4d4f; }

        .ov-divider {
          width: 1px;
          height: 30px;
          background: #f0f0f0;
        }

        /* 分类预算列表 */
        .category-budget-list {
          margin: 0 16px;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
        }

        .cat-budget-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #f5f5f5;
        }

        .cat-budget-item:last-child { border-bottom: none; }

        .cat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-right: 14px;
        }

        .cat-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cat-name { font-size: 15px; color: #333; font-weight: 500; }
        .cat-amounts { font-size: 12px; color: #999; }
        .spent { color: #999; }

        .cat-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .remaining { font-size: 13px; color: #4ECDC4; }
        .remaining.negative { color: #ff4d4f; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0; bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }

        @media (min-width: 768px) {
          .modal-overlay {
            left: 50%; right: auto; width: 480px;
            transform: translateX(-50%);
          }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          max-width: 480px;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          padding-bottom: calc(80px + var(--safe-area-bottom, 0px));
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 { font-size: 18px; margin: 0; }
        .modal-header button { background: none; border: none; color: #999; }

        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .form-group input {
          width: 100%;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 10px;
          font-size: 16px;
        }

        .cat-select {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          max-height: 200px;
          overflow-y: auto;
        }

        .cat-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 10px 6px;
          background: #f5f5f5;
          border-radius: 10px;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .cat-option.selected {
          border-color: #667eea;
          background: #f0f4ff;
        }

        .cat-icon-sm {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }

        .cat-option .cat-name { font-size: 11px; color: #666; }

        .modal-footer { margin-top: 24px; }

        .btn-save {
          width: 100%;
          padding: 14px;
          background: #667eea;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
        }
      `})]})}const Xg=["📁","✈️","🏠","🎓","💒","🏥","🚗","🎉","🎁","💼","📱","🛍️","🏖️","🎯","📊"],Di=["#4ECDC4","#FF6B6B","#FFB800","#667EEA","#AA96DA","#95E1D3","#F38181","#6C5CE7"];function vM(){const t=Ke(),[e,n]=E.useState([]),[s,r]=E.useState(!1),[i,o]=E.useState(null),[a,c]=E.useState(""),[u,d]=E.useState("📁"),[f,h]=E.useState(Di[0]);E.useEffect(()=>{m()},[]);const m=async()=>{try{const y=await pe().getAll("projects");n(y||[])}catch(p){console.error("加载项目失败:",p)}},g=()=>{o(null),c(""),d(Xg[0]),h(Di[Math.floor(Math.random()*Di.length)]),r(!0)},x=p=>{o(p.id),c(p.name),d(p.icon||"📁"),h(p.color||Di[0]),r(!0)},v=async()=>{if(!a.trim()){alert("请输入项目名称");return}try{const p=pe(),y={name:a.trim(),icon:u,color:f,isDefault:!1};i?await p.put("projects",{...y,id:i}):await p.add("projects",y),r(!1),m()}catch(p){alert("保存失败: "+p.message)}},b=async()=>{if(!i)return;const p=e.find(y=>y.id===i);if(p!=null&&p.isDefault){alert("默认项目不能删除");return}if(confirm("确定要删除该项目吗？删除后无法恢复。"))try{await pe().delete("projects",i),r(!1),m()}catch(y){alert("删除失败: "+y.message)}};return l.jsxs("div",{className:"page projects-page",children:[l.jsxs("div",{className:"page-header",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(Us,{size:22})}),l.jsx("h1",{children:"项目管理"}),l.jsx("button",{className:"add-btn",onClick:g,children:l.jsx(It,{size:22})})]}),l.jsxs("div",{className:"page-content",children:[l.jsx("p",{className:"hint-text",children:"项目用于将账目分组管理，如旅行、装修等专项支出"}),l.jsxs("div",{className:"project-list",children:[e.map(p=>l.jsxs("div",{className:"project-item",onClick:()=>x(p),children:[l.jsx("div",{className:"project-icon",style:{backgroundColor:p.color||"#4ECDC4"},children:p.icon||"📁"}),l.jsxs("div",{className:"project-info",children:[l.jsx("span",{className:"project-name",children:p.name}),p.isDefault&&l.jsx("span",{className:"default-tag",children:"默认"})]}),l.jsx(Yf,{size:16,color:"#ccc"})]},p.id)),e.length===0&&l.jsxs("div",{className:"empty-state",children:[l.jsx(Sl,{size:48,color:"#ddd"}),l.jsx("p",{children:"暂无项目"}),l.jsxs("button",{className:"add-project-btn",onClick:g,children:[l.jsx(It,{size:16}),l.jsx("span",{children:"添加项目"})]})]})]})]}),s&&l.jsx("div",{className:"modal-overlay",onClick:()=>r(!1),children:l.jsxs("div",{className:"modal-content",onClick:p=>p.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:i?"编辑项目":"添加项目"}),l.jsx("button",{onClick:()=>r(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"项目名称"}),l.jsx("input",{type:"text",value:a,onChange:p=>c(p.target.value),placeholder:"如：装修、旅行、婚礼",maxLength:12})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"选择图标"}),l.jsx("div",{className:"icon-grid",children:Xg.map(p=>l.jsx("div",{className:`icon-opt ${u===p?"selected":""}`,onClick:()=>d(p),children:p},p))})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"选择颜色"}),l.jsx("div",{className:"color-grid",children:Di.map(p=>l.jsx("div",{className:`color-opt ${f===p?"selected":""}`,style:{backgroundColor:p},onClick:()=>h(p)},p))})]}),l.jsxs("div",{className:"modal-footer",children:[i&&l.jsxs("button",{className:"btn-delete",onClick:b,children:[l.jsx(In,{size:18}),l.jsx("span",{children:"删除"})]}),l.jsx("button",{className:"btn-save",onClick:v,children:"保存"})]})]})}),l.jsx("style",{children:`
        .projects-page {
          background: #f5f6f8;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }

        .page-header h1 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .back-btn, .add-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #333;
        }

        .page-content { padding: 16px; }

        .hint-text {
          font-size: 13px;
          color: #999;
          margin-bottom: 16px;
        }

        .project-list {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
        }

        .project-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
        }

        .project-item:last-child { border-bottom: none; }
        .project-item:active { background: #fafafa; }

        .project-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-right: 14px;
        }

        .project-info {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .project-name {
          font-size: 15px;
          font-weight: 500;
          color: #333;
        }

        .default-tag {
          font-size: 11px;
          padding: 2px 8px;
          background: #FFB800;
          color: #fff;
          border-radius: 10px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
        }

        .empty-state p { color: #999; margin: 16px 0; }

        .add-project-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          background: #FFB800;
          color: #fff;
          border: none;
          border-radius: 20px;
          font-size: 14px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }

        @media (min-width: 768px) {
          .modal-overlay {
             align-items: center;
          }
          .modal-content {
             width: 480px;
             max-width: 90%;
             border-radius: 20px;
          }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          padding-bottom: 40px;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 { font-size: 18px; margin: 0; }
        .modal-header button { background: none; border: none; color: #999; }

        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .form-group input {
          width: 100%;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          outline: none;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .icon-opt {
          width: 48px;
          height: 48px;
          background: #f5f5f5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .icon-opt.selected {
          border-color: #FFB800;
          background: #FFF9E6;
        }

        .color-grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .color-opt {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
        }

        .color-opt.selected {
          border-color: #333;
          transform: scale(1.1);
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-delete {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 14px 20px;
          background: #fff1f0;
          color: #ff4d4f;
          border: none;
          border-radius: 10px;
          font-size: 15px;
        }

        .btn-save {
          flex: 1;
          padding: 14px;
          background: #FFB800;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
        }
      `})]})}function bM(){const t=Ke(),[e,n]=E.useState(new Date),[s,r]=E.useState([]),[i,o]=E.useState([]),[a,c]=E.useState(null),u=rs({onSwipedLeft:()=>v(),onSwipedRight:()=>x(),preventScrollOnSwipe:!0,trackMouse:!0,delta:50,swipeDuration:500,touchEventOptions:{passive:!1}}),d=e.getFullYear(),f=e.getMonth()+1,h=new Date,m=`${h.getFullYear()}-${String(h.getMonth()+1).padStart(2,"0")}-${String(h.getDate()).padStart(2,"0")}`;E.useEffect(()=>{g()},[d,f]);const g=async()=>{try{const[k,S]=await Promise.all([fh(d,f),pi()]);r(k),o(S)}catch(k){console.error("加载失败:",k)}},x=()=>{n(new Date(d,f-2,1)),c(null)},v=()=>{n(new Date(d,f,1)),c(null)},b=k=>{if(k.target.value){const[S,P]=k.target.value.split("-");n(new Date(Number(S),Number(P)-1,1)),c(null)}},p=k=>i.find(S=>S.id===k)||{name:"未知",icon:"❓",color:"#999"},y=k=>k>=1e4?(k/1e4).toFixed(1)+"w":k>=1e3?(k/1e3).toFixed(1)+"k":k.toFixed(0),j=(()=>{const k=new Date(d,f-1,1),S=new Date(d,f,0),P=k.getDay(),O=S.getDate(),A=new Date(d,f-1,0).getDate(),U=[];for(let $=P-1;$>=0;$--)U.push({day:A-$,isEmpty:!0,isPrev:!0});for(let $=1;$<=O;$++){const D=`${d}-${String(f).padStart(2,"0")}-${String($).padStart(2,"0")}`,z=s.filter(I=>(I.date?I.date.split("T")[0]:"")===D),M=z.filter(I=>I.type==="income").reduce((I,R)=>I+Number(R.amount),0),T=z.filter(I=>I.type==="expense").reduce((I,R)=>I+Number(R.amount),0);U.push({day:$,date:D,income:M,expense:T,hasData:M>0||T>0})}const L=42-U.length;for(let $=1;$<=L;$++)U.push({day:$,isEmpty:!0,isNext:!0});return U})(),N=["日","一","二","三","四","五","六"],C=a?s.filter(k=>(k.date?k.date.split("T")[0]:"")===a):[],w=()=>{if(a){const k=new Date(a);return`${k.getFullYear()}年${k.getMonth()+1}月${k.getDate()}日`}return`${d}年${f}月`};return l.jsxs("div",{className:"page calendar-page",...u,children:[l.jsxs("div",{className:"page-header",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(fn,{size:24})}),l.jsxs("div",{className:"calendar-nav",children:[l.jsx("button",{onClick:x,className:"nav-arrow",children:l.jsx(fn,{size:20})}),l.jsxs("div",{className:"date-display",onClick:()=>document.getElementById("cal-month-picker").showPicker(),children:[l.jsxs("span",{children:[d,"年",f,"月"]}),l.jsx("input",{type:"month",id:"cal-month-picker",value:`${d}-${String(f).padStart(2,"0")}`,onChange:b,className:"hidden-picker"})]}),l.jsx("button",{onClick:v,className:"nav-arrow",children:l.jsx($e,{size:20})})]}),l.jsx("div",{style:{width:36}})]}),l.jsxs("div",{className:"calendar-container",children:[l.jsx("div",{className:"weekday-row",children:N.map((k,S)=>l.jsx("div",{className:`weekday-cell ${S===0||S===6?"weekend":""}`,children:k},k))}),l.jsx("div",{className:"days-grid",children:j.map((k,S)=>{const P=k.date===m,O=k.date===a;return l.jsx("div",{className:`day-cell ${k.isEmpty?"empty":""} ${O?"selected":""}`,onClick:()=>!k.isEmpty&&c(k.date),children:P?l.jsx("div",{className:`today-circle ${O?"selected":""}`,children:"今"}):k.hasData?l.jsxs("div",{className:`day-with-data ${O?"selected":""}`,children:[l.jsx("span",{className:"day-num",children:k.day}),l.jsx("span",{className:"day-amount",children:y(k.expense||k.income)})]}):l.jsx("span",{className:`day-number ${k.isEmpty?"muted":""}`,children:k.day})},S)})})]}),l.jsxs("div",{className:"transactions-panel",children:[l.jsx("div",{className:"selected-date-title",children:a?w():"选择日期查看详情"}),C.length===0?l.jsxs("div",{className:"empty-state",children:[l.jsx("div",{className:"empty-illustration",children:l.jsxs("div",{className:"empty-cards",children:[l.jsx("div",{className:"card-mock"}),l.jsx("div",{className:"card-icon",children:"+"})]})}),l.jsx("p",{className:"empty-title",children:"无流水"}),l.jsx("p",{className:"empty-hint",children:"点击右下角加号可快速记账"})]}):l.jsx("div",{className:"transaction-list",children:C.map(k=>{const S=p(k.categoryId);return l.jsxs("div",{className:"transaction-item",onClick:()=>t(`/add?editId=${k.id}`),children:[l.jsx("div",{className:"category-icon",style:{backgroundColor:S.color},children:S.icon}),l.jsxs("div",{className:"trans-info",children:[l.jsx("span",{className:"trans-cat",children:S.name}),k.remark&&l.jsx("span",{className:"trans-remark",children:k.remark})]}),l.jsxs("span",{className:`trans-amount ${k.type}`,children:[k.type==="expense"?"-":"+",Number(k.amount).toFixed(2)]})]},k.id)})})]}),l.jsx("button",{className:"fab-btn",onClick:()=>t(a?`/add?date=${a}`:"/add"),children:l.jsx(It,{size:24})}),l.jsx("style",{children:`
        .calendar-page {
          background: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
        }

        .back-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #333;
        }

        .calendar-nav {
           display: flex;
           align-items: center;
           gap: 12px;
        }
        
        .nav-arrow {
           background: none;
           border: none;
           padding: 4px;
           color: #666;
           cursor: pointer;
        }

        .date-display {
           font-size: 16px;
           font-weight: 600;
           color: #333;
           position: relative;
           cursor: pointer;
        }
        
        .hidden-picker {
           position: absolute;
           top: 0; left: 0;
           width: 100%; height: 100%;
           opacity: 0;
           cursor: pointer;
        }

        .calendar-container {
          padding: 0 12px;
        }

        .weekday-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 8px;
        }

        .weekday-cell {
          text-align: center;
          font-size: 12px;
          color: #999;
          padding: 8px 0;
        }

        .weekday-cell.weekend { color: #999; }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .day-cell {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
          position: relative;
          padding: 4px;
        }

        .day-cell.empty { cursor: default; }
        .day-cell.selected { background: #FFB800; color: #fff; }
        .day-cell.selected .day-num { background: #fff; color: #FFB800; }
        .day-cell.selected .day-amount { color: #fff; opacity: 0.9; }

        .day-number { font-size: 15px; color: #333; }
        .day-number.muted { color: #ddd; }

        .today-circle {
          width: 32px;
          height: 32px;
          background: #f5f5f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #333;
          border: 1px solid #e0e0e0;
        }
        .today-circle.selected { background: #fff; color: #FFB800; border: none; }

        .day-with-data {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .day-with-data .day-num {
          width: 28px;
          height: 28px;
          background: #4ECDC4;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }

        .day-amount { font-size: 10px; color: #4ECDC4; }

        .transactions-panel {
          flex: 1;
          background: #f9fafb;
          padding: 20px;
          padding-bottom: 100px;
          border-top: 1px solid #f5f5f5;
          margin-top: 10px;
        }
        
        .selected-date-title {
           font-size: 14px; color: #999; margin-bottom: 12px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
        }

        .empty-illustration { margin-bottom: 20px; }
        .empty-cards { position: relative; width: 120px; height: 80px; }
        
        .card-mock {
          position: absolute;
          width: 100px;
          height: 60px;
          background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
          border-radius: 12px;
          left: 0;
          top: 10px;
        }

        .card-icon {
          position: absolute;
          right: 0; top: 0; width: 36px; height: 36px;
          background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 20px;
          box-shadow: 0 4px 12px rgba(255, 184, 0, 0.3);
        }

        .empty-title { font-size: 16px; color: #333; margin-bottom: 8px; }
        .empty-hint { font-size: 13px; color: #999; }

        .transaction-list { display: flex; flex-direction: column; gap: 12px; }
        .transaction-item {
          display: flex; align-items: center; padding: 14px;
          background: #fff; border-radius: 12px; cursor: pointer;
        }

        .category-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; margin-right: 12px;
        }

        .trans-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .trans-cat { font-size: 15px; color: #333; }
        .trans-remark { font-size: 12px; color: #999; }
        .trans-amount { font-size: 16px; font-weight: 600; }
        .trans-amount.expense { color: #333; }
        .trans-amount.income { color: #ff6b6b; }

        .fab-btn {
          position: fixed; bottom: 84px; right: 20px;
          width: 52px; height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%);
          color: #fff; border: none;
          box-shadow: 0 4px 16px rgba(255, 184, 0, 0.4);
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
        }

        @media (min-width: 768px) {
          .fab-btn { right: calc(50% - 240px + 20px); }
        }
      `})]})}const wM=""+new URL("man-CHku5Mr4.png",import.meta.url).href,kM=""+new URL("woman-B3_qz_fj.png",import.meta.url).href,jM=""+new URL("boy-BxMzQoNI.png",import.meta.url).href,SM=""+new URL("girl-CxgdUTHV.png",import.meta.url).href,_M=""+new URL("senior_man-C-JKjHJD.png",import.meta.url).href,NM=""+new URL("senior_woman-BMMkzXGO.png",import.meta.url).href,CM=""+new URL("cat-CosEqYKK.png",import.meta.url).href,EM=""+new URL("dog-DSpTQlyp.png",import.meta.url).href,Da=[wM,kM,jM,SM,_M,NM,CM,EM,"👤","❤️","⭐","💎"];function MM(){const t=Ke(),e=rs({onSwipedRight:()=>t(-1),trackMouse:!0}),[n,s]=E.useState([]),[r,i]=E.useState({}),[o,a]=E.useState(!1),[c,u]=E.useState(null),[d,f]=E.useState(""),[h,m]=E.useState(Da[0]),g=new Date,x=g.getFullYear(),v=g.getMonth()+1;E.useEffect(()=>{b()},[]);const b=async()=>{try{const S=await ph();s(S);const P=await fh(x,v),O={};S.forEach(U=>{const L=P.filter($=>$.personId===U.id);O[U.id]={income:L.filter($=>$.type==="income").reduce(($,D)=>$+Number(D.amount),0),expense:L.filter($=>$.type==="expense").reduce(($,D)=>$+Number(D.amount),0),count:L.length}});const A=P.filter(U=>!U.personId);O.unassigned={income:A.filter(U=>U.type==="income").reduce((U,L)=>U+Number(L.amount),0),expense:A.filter(U=>U.type==="expense").reduce((U,L)=>U+Number(L.amount),0),count:A.length},i(O)}catch(S){console.error("加载失败:",S)}},p=()=>{u(null),f(""),m(Da[0]),a(!0)},y=S=>{u(S.id),f(S.name),m(S.avatar||Da[0]),a(!0)},_=async()=>{if(!d.trim()){alert("请输入成员名称");return}try{const S=pe(),P={name:d.trim(),avatar:h};c?await S.put("persons",{...P,id:c}):await S.add("persons",P),a(!1),b()}catch(S){alert("保存失败: "+S.message)}},j=async()=>{if(c&&confirm("确定要删除该成员吗？删除后无法恢复。"))try{await pe().delete("persons",c),a(!1),b()}catch(S){alert("删除失败: "+S.message)}},N=S=>new Intl.NumberFormat("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(S),C=["linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)","linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)","linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)","linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)","linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)"],w=Object.values(r).reduce((S,P)=>S+P.expense,0),k=Object.values(r).reduce((S,P)=>S+P.income,0);return l.jsxs("div",{className:"page members-page",...e,children:[l.jsxs("div",{className:"page-header",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(Us,{size:22})}),l.jsx("h1",{children:"成员管理"}),l.jsx("button",{className:"add-btn",onClick:p,children:l.jsx(It,{size:22})})]}),l.jsxs("div",{className:"members-content",children:[l.jsxs("div",{className:"summary-card",children:[l.jsxs("div",{className:"summary-title",children:[v,"月总支出"]}),l.jsxs("div",{className:"summary-amount",children:[l.jsx("span",{className:"currency",children:"¥"}),N(w)]}),l.jsxs("div",{className:"summary-row",children:[l.jsxs("span",{children:["总收入 ¥",N(k)]}),l.jsxs("span",{children:[n.length," 位成员"]})]})]}),l.jsxs("div",{className:"member-list",children:[n.map((S,P)=>{var A;const O=r[S.id]||{income:0,expense:0,count:0};return l.jsxs("div",{className:"member-item",onClick:()=>y(S),children:[l.jsx("div",{className:"member-avatar",style:{background:C[P%C.length],overflow:"hidden"},children:S.avatar&&S.avatar.length>5?l.jsx("img",{src:S.avatar,alt:"",style:{width:"100%",height:"100%",objectFit:"cover"}}):S.avatar||((A=S.name)==null?void 0:A[0])||l.jsx(ts,{size:18,color:"#fff"})}),l.jsxs("div",{className:"member-info",children:[l.jsx("span",{className:"member-name",children:S.name}),l.jsxs("span",{className:"trans-count",children:[O.count," 笔交易"]})]}),l.jsxs("div",{className:"member-stats",children:[l.jsxs("div",{className:"amount expense",children:["-",N(O.expense)]}),l.jsxs("div",{className:"amount income",children:["+",N(O.income)]})]}),l.jsx(Yf,{size:16,color:"#ccc"})]},S.id)}),r.unassigned&&r.unassigned.count>0&&l.jsxs("div",{className:"member-item unassigned",children:[l.jsx("div",{className:"member-avatar",style:{background:"#eee"},children:l.jsx(ts,{size:18,color:"#999"})}),l.jsxs("div",{className:"member-info",children:[l.jsx("span",{className:"member-name",children:"未分配"}),l.jsxs("span",{className:"trans-count",children:[r.unassigned.count," 笔交易"]})]}),l.jsxs("div",{className:"member-stats",children:[l.jsxs("div",{className:"amount expense",children:["-",N(r.unassigned.expense)]}),l.jsxs("div",{className:"amount income",children:["+",N(r.unassigned.income)]})]})]}),n.length===0&&l.jsxs("div",{className:"empty-state",children:[l.jsx("div",{className:"empty-icon",children:"👥"}),l.jsx("p",{children:"暂无成员"}),l.jsxs("button",{className:"add-member-btn",onClick:p,children:[l.jsx(It,{size:16}),l.jsx("span",{children:"添加成员"})]})]})]})]}),o&&l.jsx("div",{className:"modal-overlay",onClick:()=>a(!1),children:l.jsxs("div",{className:"modal-content",onClick:S=>S.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:c?"编辑成员":"添加成员"}),l.jsx("button",{onClick:()=>a(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"成员名称"}),l.jsx("input",{type:"text",value:d,onChange:S=>f(S.target.value),placeholder:"如：老公、老婆、孩子",maxLength:10})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"选择头像"}),l.jsx("div",{className:"avatar-grid",children:Da.map((S,P)=>l.jsx("div",{className:`avatar-opt ${h===S?"selected":""}`,onClick:()=>m(S),style:{overflow:"hidden"},children:S.length>5?l.jsx("img",{src:S,alt:"",style:{width:"100%",height:"100%",objectFit:"cover"}}):S},P))})]}),l.jsxs("div",{className:"modal-footer",children:[c&&l.jsxs("button",{className:"btn-delete",onClick:j,children:[l.jsx(In,{size:18}),l.jsx("span",{children:"删除"})]}),l.jsx("button",{className:"btn-save",onClick:_,children:"保存"})]})]})}),l.jsx("style",{children:`
        .members-page {
          background: #f5f6f8;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }

        .page-header h1 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .back-btn, .add-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #333;
        }

        .members-content { padding: 16px; }

        .summary-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
          text-align: center;
          color: #fff;
        }

        .summary-title { font-size: 14px; opacity: 0.9; margin-bottom: 8px; }
        .summary-amount { font-size: 32px; font-weight: 700; margin-bottom: 12px; }
        .summary-amount .currency { font-size: 18px; margin-right: 2px; }
        .summary-row { display: flex; justify-content: center; gap: 20px; font-size: 13px; opacity: 0.9; }

        .member-list {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
        }

        .member-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
        }

        .member-item:last-child { border-bottom: none; }
        .member-item:active { background: #fafafa; }
        .member-item.unassigned { cursor: default; }

        .member-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #fff;
          margin-right: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .member-info { flex: 1; }
        .member-name { font-size: 15px; font-weight: 500; color: #333; display: block; }
        .trans-count { font-size: 12px; color: #999; }

        .member-stats { text-align: right; margin-right: 8px; }
        .amount { font-size: 14px; font-weight: 500; }
        .amount.income { color: #ff6b6b; font-size: 12px; }
        .amount.expense { color: #333; }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
        }

        .empty-icon { font-size: 48px; margin-bottom: 12px; }
        .empty-state p { color: #999; margin-bottom: 16px; }

        .add-member-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          background: #FFB800;
          color: #fff;
          border: none;
          border-radius: 20px;
          font-size: 14px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }

        @media (min-width: 768px) {
          .modal-overlay {
             align-items: center;
          }
          .modal-content {
             width: 480px;
             max-width: 90%;
             border-radius: 20px;
          }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          padding-bottom: 40px;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 { font-size: 18px; margin: 0; }
        .modal-header button { background: none; border: none; color: #999; }

        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .form-group input {
          width: 100%;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          outline: none;
        }

        .avatar-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .avatar-opt {
          width: 48px;
          height: 48px;
          background: #f5f5f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 3px solid transparent;
          cursor: pointer;
        }

        .avatar-opt.selected {
          border-color: #FFB800;
          background: #FFF9E6;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-delete {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 14px 20px;
          background: #fff1f0;
          color: #ff4d4f;
          border: none;
          border-radius: 10px;
          font-size: 15px;
        }

        .btn-save {
          flex: 1;
          padding: 14px;
          background: #FFB800;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
        }
      `})]})}function PM(){const t=Ke(),e=[{icon:Hj,label:"支出分类",desc:"查看支出分类统计，或自定义支出分类",path:"/category-manage?type=expense"},{icon:Gj,label:"收入分类",desc:"查看收入分类统计，或自定义收入分类",path:"/category-manage?type=income"},{icon:tr,label:"账户",desc:"查看账户统计，或管理账户",path:"/accounts"},{icon:ts,label:"成员",desc:"查看成员统计，或管理成员",path:"/members"},{icon:vd,label:"商家",desc:"查看商家统计，或管理商家",path:"/merchants"},{icon:Sl,label:"项目",desc:"查看项目统计，或管理项目",path:"/projects"}];return l.jsxs("div",{className:"page category-tags-page",children:[l.jsxs("div",{className:"top-bar",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(fn,{size:24})}),l.jsx("h1",{className:"page-title",children:"分类标签"}),l.jsx("div",{className:"spacer"})]}),l.jsx("div",{className:"menu-list",children:e.map((n,s)=>l.jsxs("div",{className:"menu-item",onClick:()=>t(n.path),children:[l.jsx("div",{className:"menu-icon",children:l.jsx(n.icon,{size:22,strokeWidth:1.5})}),l.jsxs("div",{className:"menu-content",children:[l.jsx("span",{className:"menu-label",children:n.label}),l.jsx("span",{className:"menu-desc",children:n.desc})]}),l.jsx($e,{size:18,color:"#ccc"})]},s))}),l.jsx("style",{children:`
        .category-tags-page {
          background: #fff;
          min-height: 100vh;
        }

        .top-bar {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          border-bottom: 1px solid #f5f5f5;
        }

        .back-btn {
          padding: 8px;
          color: #333;
        }

        .page-title {
          font-size: 17px;
          font-weight: 600;
          margin-left: 8px;
        }

        .spacer {
          flex: 1;
        }

        .menu-list {
          padding-top: 8px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 20px;
          gap: 16px;
          border-bottom: 1px solid #f9f9f9;
        }

        .menu-item:active {
          background: #f9f9f9;
        }

        .menu-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
        }

        .menu-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-label {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .menu-desc {
          font-size: 13px;
          color: #999;
        }
      `})]})}const Qg=["🍜","🍱","🍔","☕","🛒","🥬","🚌","🚗","🚕","✈️","🏠","🏥","📱","💊","🎮","🎬","👗","💄","🎓","📚","🎁","💰","💵","🧧","💼","📈","🏦","💳","🐱","🐕"],Ai=["#FF6B6B","#4ECDC4","#FFB800","#667EEA","#FF9999","#99CCFF","#CC99FF","#FFCC99","#99FF99","#F38181"],DM=[{name:"餐饮",icon:"🍜",color:"#FF6B6B",type:"expense"},{name:"交通",icon:"🚌",color:"#4ECDC4",type:"expense"},{name:"购物",icon:"🛒",color:"#FFE66D",type:"expense"},{name:"娱乐",icon:"🎮",color:"#95E1D3",type:"expense"},{name:"居住",icon:"🏠",color:"#F38181",type:"expense"},{name:"通讯",icon:"📱",color:"#AA96DA",type:"expense"},{name:"医疗",icon:"💊",color:"#FCBAD3",type:"expense"},{name:"教育",icon:"📚",color:"#A8D8EA",type:"expense"},{name:"工资",icon:"💰",color:"#4ECDC4",type:"income"},{name:"奖金",icon:"🎁",color:"#FFE66D",type:"income"},{name:"理财",icon:"📈",color:"#95E1D3",type:"income"},{name:"兼职",icon:"💼",color:"#AA96DA",type:"income"},{name:"红包",icon:"🧧",color:"#F38181",type:"income"},{name:"其他",icon:"💵",color:"#A8D8EA",type:"income"}];function AM(){const t=Ke(),[e]=Hf(),n=e.get("type")||"expense",[s,r]=E.useState(n),[i,o]=E.useState([]),[a,c]=E.useState(!0),[u,d]=E.useState(!1),[f,h]=E.useState(null),[m,g]=E.useState(""),[x,v]=E.useState("🍜"),[b,p]=E.useState(Ai[0]);E.useEffect(()=>{y()},[]);const y=async()=>{try{c(!0);const k=pe();let S=await k.getAll("categories");if(!S||S.length===0){console.log("初始化默认分类...");for(const P of DM)await k.add("categories",P);S=await k.getAll("categories")}o(S||[])}catch(k){console.error("加载分类失败:",k)}finally{c(!1)}},_=async()=>{if(!m.trim()){alert("请输入分类名称");return}try{const k=pe(),S={name:m.trim(),type:s,icon:x,color:b};f?await k.put("categories",{...S,id:f}):await k.add("categories",S),d(!1),y()}catch(k){alert("保存失败: "+k.message)}},j=async()=>{if(f&&confirm("确定删除该分类？删除后无法恢复。"))try{await pe().delete("categories",f),d(!1),y()}catch(k){alert("删除失败: "+k.message)}},N=()=>{h(null),g(""),v(Qg[0]),p(Ai[Math.floor(Math.random()*Ai.length)]),d(!0)},C=k=>{h(k.id),g(k.name),v(k.icon||"📦"),p(k.color||Ai[0]),d(!0)},w=i.filter(k=>k.type===s);return a?l.jsx("div",{className:"page cat-manage-page",children:l.jsx("div",{className:"loading-state",children:"加载中..."})}):l.jsxs("div",{className:"page cat-manage-page",children:[l.jsxs("div",{className:"page-header",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(Us,{size:22})}),l.jsx("h1",{children:"分类管理"}),l.jsx("button",{className:"add-btn",onClick:N,children:l.jsx(It,{size:22})})]}),l.jsxs("div",{className:"tabs",children:[l.jsx("div",{className:`tab ${s==="expense"?"active":""}`,onClick:()=>r("expense"),children:"支出"}),l.jsx("div",{className:`tab ${s==="income"?"active":""}`,onClick:()=>r("income"),children:"收入"})]}),l.jsxs("div",{className:"cat-grid",children:[w.map(k=>l.jsxs("div",{className:"cat-item",onClick:()=>C(k),children:[l.jsx("div",{className:"cat-icon",style:{background:k.color||"#ccc"},children:k.icon||"📦"}),l.jsx("span",{className:"cat-name",children:k.name})]},k.id)),l.jsxs("div",{className:"cat-item add-item",onClick:N,children:[l.jsx("div",{className:"cat-icon add-icon",children:l.jsx(It,{size:24})}),l.jsx("span",{className:"cat-name",children:"添加"})]})]}),w.length===0&&l.jsxs("div",{className:"empty-tip",children:["暂无",s==="expense"?"支出":"收入","分类"]}),u&&l.jsx("div",{className:"modal-overlay",onClick:()=>d(!1),children:l.jsxs("div",{className:"modal-content",onClick:k=>k.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:f?"编辑分类":"添加分类"}),l.jsx("button",{onClick:()=>d(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"分类名称"}),l.jsx("input",{type:"text",value:m,onChange:k=>g(k.target.value),placeholder:"如：餐饮、交通",maxLength:8})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"选择图标"}),l.jsx("div",{className:"icon-grid",children:Qg.map(k=>l.jsx("div",{className:`icon-opt ${x===k?"selected":""}`,onClick:()=>v(k),children:k},k))})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"选择颜色"}),l.jsx("div",{className:"color-grid",children:Ai.map(k=>l.jsx("div",{className:`color-opt ${b===k?"selected":""}`,style:{background:k},onClick:()=>p(k),children:b===k&&l.jsx(_o,{size:14,color:"#fff"})},k))})]}),l.jsxs("div",{className:"modal-footer",children:[f&&l.jsxs("button",{className:"btn-delete",onClick:j,children:[l.jsx(In,{size:18}),l.jsx("span",{children:"删除"})]}),l.jsx("button",{className:"btn-save",onClick:_,children:"保存"})]})]})}),l.jsx("style",{children:`
        .cat-manage-page {
          background: #f5f6f8;
          min-height: 100vh;
        }

        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          color: #999;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }

        .back-btn, .add-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #333;
        }

        .page-header h1 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .tabs {
          display: flex;
          background: #fff;
          padding: 0 16px;
        }

        .tab {
          flex: 1;
          text-align: center;
          padding: 14px 0;
          font-size: 15px;
          color: #999;
          border-bottom: 2px solid transparent;
          cursor: pointer;
        }

        .tab.active {
          color: #333;
          font-weight: 600;
          border-bottom-color: #FFB800;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding: 20px 16px;
        }

        .cat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .cat-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .cat-icon.add-icon {
          background: #fff;
          color: #999;
          border: 2px dashed #ddd;
          box-shadow: none;
        }

        .cat-name {
          font-size: 12px;
          color: #666;
          text-align: center;
          max-width: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .add-item .cat-name { color: #999; }

        .empty-tip {
          text-align: center;
          color: #ccc;
          padding: 40px;
          font-size: 14px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }

        @media (min-width: 768px) {
          .modal-overlay {
             align-items: center;
          }
          .modal-content {
             width: 480px;
             max-width: 90%;
             border-radius: 20px;
          }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          padding-bottom: 40px;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 { font-size: 18px; margin: 0; }
        .modal-header button { background: none; border: none; color: #999; }

        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .form-group input {
          width: 100%;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          outline: none;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
        }

        .icon-opt {
          width: 44px;
          height: 44px;
          background: #f5f5f5;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .icon-opt.selected {
          border-color: #FFB800;
          background: #FFFAF0;
        }

        .color-grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .color-opt {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .color-opt.selected {
          border-color: #333;
          transform: scale(1.1);
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-delete {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 14px 20px;
          background: #fff1f0;
          color: #ff4d4f;
          border: none;
          border-radius: 10px;
          font-size: 15px;
        }

        .btn-save {
          flex: 1;
          padding: 14px;
          background: #FFB800;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
        }
      `})]})}function OM(){const t=Ke(),[e,n]=E.useState([]),[s,r]=E.useState(!1),[i,o]=E.useState(""),[a,c]=E.useState(""),[u,d]=E.useState("expense"),[f,h]=E.useState("monthly"),[m,g]=E.useState(1),[x,v]=E.useState(null),[b,p]=E.useState(null),[y,_]=E.useState([]),[j,N]=E.useState([]);E.useEffect(()=>{C()},[]);const C=async()=>{const S=pe(),[P,O,A]=await Promise.all([pi(),hh(),S.getAll("recurring_rules")]);_(P),N(O),n(A||[]),P.length>0&&v(P[0].id),O.length>0&&p(O[0].id)},w=async()=>{if(!i||!x||!b)return;const S={type:u,amount:parseFloat(i),remark:a||(u==="expense"?"自动记账支出":"自动记账收入"),frequency:f,day:Number(m),categoryId:x,accountId:b,lastRun:null,createdAt:new Date().toISOString()};await pe().add("recurring_rules",S),r(!1),C()},k=async S=>{if(!confirm("确定删除此规则吗？"))return;await pe().delete("recurring_rules",S),C()};return y.find(S=>S.id===x),j.find(S=>S.id===b),l.jsxs("div",{className:"page recurring-page",children:[l.jsxs("div",{className:"page-header",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(Us,{size:24})}),l.jsx("h1",{children:"周期记账"}),l.jsx("button",{className:"add-btn",onClick:()=>r(!0),children:l.jsx(It,{size:24})})]}),l.jsx("div",{className:"page-content",children:l.jsxs("div",{className:"rule-list",children:[e.map(S=>{const P=y.find(O=>O.id===S.categoryId);return l.jsxs("div",{className:"rule-item",children:[l.jsx("div",{className:"rule-icon",style:{backgroundColor:(P==null?void 0:P.color)||"#ccc"},children:(P==null?void 0:P.icon)||l.jsx(yd,{size:20})}),l.jsxs("div",{className:"rule-info",children:[l.jsx("span",{className:"rule-name",children:S.remark}),l.jsxs("span",{className:"rule-desc",children:["每月 ",S.day," 日 · ¥",S.amount]})]}),l.jsx("button",{className:"delete-btn",onClick:()=>k(S.id),children:l.jsx(In,{size:18})})]},S.id)}),e.length===0&&l.jsxs("div",{className:"empty-state",children:[l.jsx(yd,{size:48,color:"#ddd"}),l.jsx("p",{children:"暂无自动记账规则"}),l.jsx("button",{className:"btn-primary",onClick:()=>r(!0),children:"添加规则"})]})]})}),s&&l.jsx("div",{className:"modal-overlay",children:l.jsxs("div",{className:"modal-content",children:[l.jsx("h3",{children:"新建周期规则"}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"类型"}),l.jsxs("div",{className:"radio-group",children:[l.jsx("button",{className:u==="expense"?"active":"",onClick:()=>d("expense"),children:"支出"}),l.jsx("button",{className:u==="income"?"active":"",onClick:()=>d("income"),children:"收入"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"金额"}),l.jsx("input",{type:"number",value:i,onChange:S=>o(S.target.value),placeholder:"0.00"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"日期 (每月)"}),l.jsx("select",{value:m,onChange:S=>g(S.target.value),children:Array.from({length:31},(S,P)=>P+1).map(S=>l.jsxs("option",{value:S,children:[S,"日"]},S))})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"备注"}),l.jsx("input",{type:"text",value:a,onChange:S=>c(S.target.value),placeholder:"例如：房租"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"分类"}),l.jsx("select",{value:x,onChange:S=>v(Number(S.target.value)),children:y.filter(S=>S.type===u).map(S=>l.jsxs("option",{value:S.id,children:[S.icon," ",S.name]},S.id))})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"账户"}),l.jsx("select",{value:b,onChange:S=>p(Number(S.target.value)),children:j.map(S=>l.jsx("option",{value:S.id,children:S.name},S.id))})]}),l.jsxs("div",{className:"modal-actions",children:[l.jsx("button",{className:"cancel",onClick:()=>r(!1),children:"取消"}),l.jsx("button",{className:"save",onClick:w,children:"保存"})]})]})}),l.jsx("style",{children:`
                .recurring-page { background: #f5f6fa; min-height: 100vh; }
                .page-header { background: #fff; display: flex; justify-content: space-between; padding: 16px; align-items: center; padding-top: calc(16px + var(--safe-area-top)); }
                .page-header h1 { font-size: 18px; font-weight: 600; }
                .rule-list { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
                .rule-item { background: #fff; padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; }
                .rule-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; }
                .rule-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
                .rule-name { font-weight: 500; color: #333; }
                .rule-desc { font-size: 13px; color: #999; }
                .delete-btn { color: #ccc; }
                .empty-state { text-align: center; padding: 40px; color: #999; display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .btn-primary { background: #FFB800; color: #fff; border: none; padding: 10px 24px; border-radius: 20px; }
                
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
                .modal-content { background: #fff; width: 100%; max-width: 320px; border-radius: 16px; padding: 20px; }
                .modal-content h3 { text-align: center; margin-bottom: 20px; }
                .form-group { margin-bottom: 16px; }
                .form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; }
                .form-group input, .form-group select { width: 100%; padding: 8px; border: 1px solid #eee; border-radius: 8px; }
                .radio-group { display: flex; gap: 12px; }
                .radio-group button { flex: 1; padding: 8px; border: 1px solid #eee; border-radius: 8px; background: #fff; }
                .radio-group button.active { background: #e6f7ff; color: #1890ff; border-color: #1890ff; }
                
                .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
                .modal-actions button { flex: 1; padding: 10px; border-radius: 8px; border: none; font-weight: 500; }
                .cancel { background: #f5f5f5; color: #666; }
                .save { background: #FFB800; color: #fff; }
            `})]})}const Zg=["🛒","🍽️","🏦","🏬","🏪","🚌","⛽","🏥","🎬","✈️","🏨","📱","💻","🎮","📚"];function TM(){const t=Ke(),[e,n]=E.useState([]),[s,r]=E.useState({}),[i,o]=E.useState({income:0,expense:0,balance:0}),[a,c]=E.useState(!1),[u,d]=E.useState(null),[f,h]=E.useState(""),[m,g]=E.useState("🛒");E.useEffect(()=>{x()},[]);const x=async()=>{try{const j=pe();let N=await j.getAll("merchants");if(!N||N.length===0){const O=[{name:"其他",icon:"🛒"},{name:"饭堂",icon:"🍱"},{name:"银行",icon:"🏦"},{name:"商场",icon:"🛍️"},{name:"超市",icon:"🏪"},{name:"公交",icon:"🚌"}];for(const A of O)await j.add("merchants",A);N=await j.getAll("merchants")}n(N);const C=await uh(),w={};let k=0,S=0;C.forEach(O=>{const A=O.merchant||"其他";w[A]||(w[A]={income:0,expense:0});const U=Number(O.amount);O.type==="income"?(w[A].income+=U,k+=U):O.type==="expense"&&(w[A].expense+=U,S+=U)}),r(w),o({income:k,expense:S,balance:k-S});const P=N.sort((O,A)=>{var $,D,z,M;const U=Math.abs(((($=w[O.name])==null?void 0:$.income)||0)-(((D=w[O.name])==null?void 0:D.expense)||0));return Math.abs((((z=w[A.name])==null?void 0:z.income)||0)-(((M=w[A.name])==null?void 0:M.expense)||0))-U});n(P)}catch(j){console.error("加载失败:",j)}},v=()=>{d(null),h(""),g(Zg[0]),c(!0)},b=j=>{d(j.id),h(j.name),g(j.icon||"🛒"),c(!0)},p=async()=>{if(!f.trim()){alert("请输入商家名称");return}try{const j=pe(),N={name:f.trim(),icon:m};u?await j.put("merchants",{...N,id:u}):await j.add("merchants",N),c(!1),x()}catch(j){alert("保存失败: "+j.message)}},y=async()=>{if(u&&confirm("确定要删除该商家吗？"))try{await pe().delete("merchants",u),c(!1),x()}catch(j){alert("删除失败: "+j.message)}},_=j=>new Intl.NumberFormat("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(j);return l.jsxs("div",{className:"page merchants-page",children:[l.jsxs("div",{className:"banner-area",children:[l.jsxs("div",{className:"banner-header",children:[l.jsxs("button",{className:"back-btn",onClick:()=>t(-1),children:[l.jsx(fn,{size:24,color:"#fff"}),l.jsx("span",{children:"商家"})]}),l.jsx("button",{className:"more-btn",children:l.jsx(Yj,{size:24,color:"#fff"})})]}),l.jsxs("div",{className:"banner-stats",children:[l.jsxs("div",{className:"balance-row",children:[l.jsx("span",{className:"balance-value",children:_(i.balance)}),l.jsx("span",{className:"balance-label",children:"结余"})]}),l.jsxs("div",{className:"stats-row",children:[l.jsxs("span",{children:["收入 ",_(i.income)]}),l.jsx("span",{className:"divider",children:"|"}),l.jsxs("span",{children:["支出 ",_(i.expense)]})]})]})]}),l.jsx("div",{className:"merchant-list",children:e.map(j=>{const N=s[j.name]||{income:0,expense:0},C=N.income-N.expense;return l.jsxs("div",{className:"merchant-item",onClick:()=>b(j),children:[l.jsx("div",{className:"merchant-icon",children:j.icon||"🛒"}),l.jsx("span",{className:"merchant-name",children:j.name}),l.jsx("span",{className:"merchant-amount",children:_(C)}),l.jsx($e,{size:18,color:"#ccc"})]},j.id)})}),l.jsx("button",{className:"fab-btn",onClick:v,children:l.jsx(It,{size:24})}),a&&l.jsx("div",{className:"modal-overlay",onClick:()=>c(!1),children:l.jsxs("div",{className:"modal-content",onClick:j=>j.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:u?"编辑商家":"添加商家"}),l.jsx("button",{onClick:()=>c(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"商家名称"}),l.jsx("input",{type:"text",value:f,onChange:j=>h(j.target.value),placeholder:"如：超市、餐厅",maxLength:10})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"选择图标"}),l.jsx("div",{className:"icon-grid",children:Zg.map(j=>l.jsx("div",{className:`icon-opt ${m===j?"selected":""}`,onClick:()=>g(j),children:j},j))})]}),l.jsxs("div",{className:"modal-footer",children:[u&&l.jsxs("button",{className:"btn-delete",onClick:y,children:[l.jsx(In,{size:18}),l.jsx("span",{children:"删除"})]}),l.jsx("button",{className:"btn-save",onClick:p,children:"保存"})]})]})}),l.jsx("style",{children:`
        .merchants-page {
          background: #f5f6f8;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .banner-area {
          /* 使用渐变模拟天空/建筑的冷色调 */
          background: linear-gradient(160deg, #A1C4FD 0%, #C2E9FB 100%);
          position: relative;
          padding-top: var(--safe-area-top);
          padding-bottom: 70px;
          color: #fff;
        }

        .banner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #fff;
          font-size: 18px;
          padding: 8px 0;
        }

        .more-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .banner-stats {
          padding: 24px 24px;
        }

        .balance-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 8px;
        }

        .balance-value {
          font-size: 42px;
          font-weight: 500;
          font-family: 'DIN Alternate', sans-serif;
          letter-spacing: 0.5px;
        }

        .balance-label {
          font-size: 15px;
          opacity: 0.9;
        }

        .stats-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          opacity: 0.9;
        }

        .divider { opacity: 0.6; font-size: 10px; margin: 0 2px; }

        .merchant-list {
          background: #fff;
          border-radius: 20px 20px 0 0;
          margin-top: -40px;
          position: relative;
          z-index: 10;
          padding: 12px 0;
          min-height: calc(100vh - 200px);
          box-shadow: 0 -4px 16px rgba(0,0,0,0.03);
        }

        .merchant-item {
          display: flex;
          align-items: center;
          padding: 18px 24px;
          border-bottom: 1px solid #f9f9f9;
          cursor: pointer;
        }

        .merchant-item:active { background: #f9f9f9; }

        .merchant-icon {
          width: 24px;
          font-size: 24px;
          margin-right: 16px;
          text-align: center;
        }

        .merchant-name {
          flex: 1;
          font-size: 16px;
          color: #333;
        }

        .merchant-amount {
          font-size: 16px;
          color: #333;
          margin-right: 8px;
          font-family: 'DIN Alternate', sans-serif;
        }

        .fab-btn {
          position: fixed;
          bottom: 40px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%);
          color: #fff;
          border: none;
          box-shadow: 0 8px 20px rgba(255, 149, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        
        .fab-btn:active { transform: scale(0.95); }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          z-index: 1000;
        }

        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 24px 24px 0 0;
          padding: 24px;
          padding-bottom: calc(40px + var(--safe-area-bottom, 0px));
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
           from { transform: translateY(100%); }
           to { transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 { font-size: 18px; margin: 0; font-weight: 600; }
        .modal-header button { background: none; border: none; color: #999; }

        .form-group { margin-bottom: 24px; }
        .form-group label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
        }

        .form-group input {
          width: 100%;
          padding: 16px;
          background: #f7f8fa;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          color: #333;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .icon-opt {
          aspect-ratio: 1;
          background: #f7f8fa;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .icon-opt.selected {
          border-color: #FFB800;
          background: #FFF9E6;
        }

        .modal-footer {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }

        .btn-delete {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 16px 24px;
          background: #fff1f0;
          color: #ff4d4f;
          border: none;
          border-radius: 12px;
          font-weight: 500;
        }

        .btn-save {
          flex: 1;
          padding: 16px;
          background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .modal-overlay {
            align-items: center;
            justify-content: center;
          }
          .modal-content {
            width: 450px;
            border-radius: 24px;
            max-height: 80vh;
            overflow-y: auto;
          }
        }
      `})]})}function zM(){const t=Ke(),[e,n]=E.useState([]),[s,r]=E.useState([]),[i,o]=E.useState([]),[a,c]=E.useState(!1),[u,d]=E.useState(null),[f,h]=E.useState({name:"",type:"expense",amount:"",categoryId:null,accountId:null,remark:""});E.useEffect(()=>{m()},[]);const m=async()=>{try{const C=pe();if(!C.objectStoreNames.contains("templates"))n([{name:"早午晚餐",type:"expense",amount:12,remark:"示例模板",icon:"🍎"},{name:"打出租车",type:"expense",amount:20,remark:"示例模板",icon:"🚗"},{name:"早午晚步",type:"expense",amount:0,remark:"",icon:"🥗"},{name:"发薪水噢",type:"income",amount:1e4,remark:"示例模板",icon:"💰"},{name:"投资收入",type:"income",amount:284,remark:"小店分红",icon:"📈"}]);else{const S=await C.getAll("templates");n(S)}const[w,k]=await Promise.all([pi(),hh()]);r(w),o(k)}catch(C){console.error("加载模板失败:",C)}},g=()=>{var C,w;d(null),h({name:"",type:"expense",amount:"",categoryId:((C=s.find(k=>k.type==="expense"))==null?void 0:C.id)||null,accountId:((w=i[0])==null?void 0:w.id)||null,remark:""}),c(!0)},x=C=>{d(C.id),h({name:C.name,type:C.type,amount:String(C.amount||""),categoryId:C.categoryId,accountId:C.accountId,remark:C.remark||""}),c(!0)},v=async()=>{if(!f.name.trim()){alert("请输入模板名称");return}try{const C=pe(),w={...f,amount:parseFloat(f.amount)||0};u?await C.put("templates",{...w,id:u}):await C.add("templates",w),c(!1),m()}catch(C){alert("保存失败: "+C.message)}},b=async()=>{if(confirm("确定删除此模板?"))try{await pe().delete("templates",u),c(!1),m()}catch(C){alert("删除失败: "+C.message)}},p=C=>{t(`/add?templateId=${C.id}`)},y=e.filter(C=>C.type==="expense"),_=e.filter(C=>C.type==="income"),j=C=>new Intl.NumberFormat("zh-CN",{minimumFractionDigits:2,maximumFractionDigits:2}).format(C||0),N=C=>i.find(w=>w.id===C);return l.jsxs("div",{className:"page templates-page",children:[l.jsxs("div",{className:"page-header",children:[l.jsxs("button",{className:"back-btn",onClick:()=>t(-1),children:[l.jsx(Us,{size:22}),l.jsx("span",{children:"记一笔"})]}),l.jsx("span",{className:"header-action",children:"☆自定义"})]}),l.jsxs("div",{className:"tab-bar",children:[l.jsx("button",{className:"tab-item active",children:"模板"}),l.jsx("button",{className:"tab-item",onClick:()=>t("/add"),children:"支出"}),l.jsx("button",{className:"tab-item",onClick:()=>t("/add"),children:"收入"}),l.jsx("button",{className:"tab-item",onClick:()=>t("/add"),children:"转账"}),l.jsx("button",{className:"tab-item",children:"余额"}),l.jsx("button",{className:"tab-item",children:"借贷"})]}),l.jsxs("div",{className:"template-list",children:[l.jsxs("div",{className:"template-section",children:[l.jsx("h3",{className:"section-title",children:"支出模板"}),y.map(C=>{var w;return l.jsxs("div",{className:"template-item",onClick:()=>x(C),children:[l.jsx("div",{className:"template-icon",children:C.icon||"📝"}),l.jsxs("div",{className:"template-info",children:[l.jsxs("div",{className:"template-name",children:[C.name,l.jsx("span",{className:"template-amount expense",children:j(C.amount)})]}),l.jsxs("div",{className:"template-meta",children:[C.remark&&l.jsx("span",{children:C.remark}),l.jsx("span",{children:((w=N(C.accountId))==null?void 0:w.name)||"现金"})]})]}),l.jsx("button",{className:"use-btn",onClick:k=>{k.stopPropagation(),p(C)},children:"记一笔"})]},C.id||C.name)})]}),l.jsxs("div",{className:"template-section",children:[l.jsx("h3",{className:"section-title",children:"收入模板"}),_.map(C=>{var w;return l.jsxs("div",{className:"template-item",onClick:()=>x(C),children:[l.jsx("div",{className:"template-icon",children:C.icon||"💰"}),l.jsxs("div",{className:"template-info",children:[l.jsxs("div",{className:"template-name",children:[C.name,l.jsx("span",{className:"template-amount income",children:j(C.amount)})]}),l.jsxs("div",{className:"template-meta",children:[C.remark&&l.jsx("span",{children:C.remark}),l.jsx("span",{children:((w=N(C.accountId))==null?void 0:w.name)||"现金"})]})]}),l.jsx("button",{className:"use-btn",onClick:k=>{k.stopPropagation(),p(C)},children:"记一笔"})]},C.id||C.name)})]})]}),l.jsxs("div",{className:"bottom-bar",children:[l.jsxs("button",{className:"bar-btn",children:[l.jsx("span",{children:"≡"}),l.jsx("span",{children:"批量操作"}),l.jsx("small",{children:"排序、删除"})]}),l.jsx("div",{className:"bar-divider"}),l.jsxs("button",{className:"bar-btn",onClick:g,children:[l.jsx(It,{size:18}),l.jsx("span",{children:"添加模板"})]})]}),a&&l.jsx("div",{className:"modal-overlay",onClick:()=>c(!1),children:l.jsxs("div",{className:"modal-content",onClick:C=>C.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:u?"编辑模板":"添加模板"}),l.jsx("button",{onClick:()=>c(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"模板名称"}),l.jsx("input",{type:"text",value:f.name,onChange:C=>h({...f,name:C.target.value}),placeholder:"请输入模板名称"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"类型"}),l.jsxs("div",{className:"type-selector",children:[l.jsx("button",{className:f.type==="expense"?"active":"",onClick:()=>h({...f,type:"expense"}),children:"支出"}),l.jsx("button",{className:f.type==="income"?"active":"",onClick:()=>h({...f,type:"income"}),children:"收入"})]})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"金额"}),l.jsx("input",{type:"number",value:f.amount,onChange:C=>h({...f,amount:C.target.value}),placeholder:"0.00"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"备注"}),l.jsx("input",{type:"text",value:f.remark,onChange:C=>h({...f,remark:C.target.value}),placeholder:"可选备注"})]}),l.jsxs("div",{className:"modal-footer",children:[u&&l.jsxs("button",{className:"btn-delete",onClick:b,children:[l.jsx(In,{size:16})," 删除"]}),l.jsx("button",{className:"btn-save",onClick:v,children:"保存"})]})]})}),l.jsx("style",{children:`
        .templates-page {
          background: #fff;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          font-size: 16px;
          color: #333;
        }

        .header-action {
          color: #FFB800;
          font-size: 14px;
        }

        .tab-bar {
          display: flex;
          padding: 0 16px;
          border-bottom: 1px solid #f5f5f5;
          overflow-x: auto;
        }

        .tab-item {
          padding: 12px 16px;
          background: none;
          border: none;
          font-size: 15px;
          color: #999;
          white-space: nowrap;
          position: relative;
        }

        .tab-item.active {
          color: #333;
          font-weight: 600;
        }

        .tab-item.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: #FFB800;
          border-radius: 2px;
        }

        .template-list {
          padding: 16px;
        }

        .template-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 13px;
          color: #999;
          margin-bottom: 12px;
          font-weight: normal;
        }

        .template-item {
          display: flex;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f9f9f9;
        }

        .template-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #FFF5E6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-right: 12px;
        }

        .template-info {
          flex: 1;
        }

        .template-name {
          font-size: 15px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .template-amount {
          font-size: 15px;
          font-weight: 500;
        }

        .template-amount.expense { color: #FFB800; }
        .template-amount.income { color: #4ECDC4; }

        .template-meta {
          font-size: 12px;
          color: #999;
          margin-top: 4px;
          display: flex;
          gap: 8px;
        }

        .use-btn {
          padding: 8px 16px;
          background: none;
          border: 1px solid #FFB800;
          border-radius: 16px;
          color: #FFB800;
          font-size: 13px;
        }

        /* 底部操作栏 */
        .bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: 480px;
          margin: 0 auto;
          display: flex;
          background: #fff;
          border-top: 1px solid #f0f0f0;
          padding: 12px 24px;
          padding-bottom: calc(12px + var(--safe-area-bottom, 0px));
        }

        .bar-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          background: none;
          border: none;
          color: #666;
          font-size: 13px;
        }

        .bar-btn small { font-size: 11px; color: #999; }

        .bar-divider {
          width: 1px;
          background: #f0f0f0;
          margin: 0 16px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0; bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }

        @media (min-width: 768px) {
          .modal-overlay {
            align-items: center;
          }
          .modal-content {
            border-radius: 20px;
          }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          max-width: 480px;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          padding-bottom: calc(80px + var(--safe-area-bottom, 0px));
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 { font-size: 18px; margin: 0; }
        .modal-header button { background: none; border: none; color: #999; }

        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 10px;
          font-size: 16px;
        }

        .type-selector {
          display: flex;
          gap: 12px;
        }

        .type-selector button {
          flex: 1;
          padding: 12px;
          background: #f5f5f5;
          border: 2px solid transparent;
          border-radius: 10px;
          font-size: 14px;
          color: #666;
        }

        .type-selector button.active {
          border-color: #FFB800;
          background: #FFF9E6;
          color: #FFB800;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-delete {
          flex: 1;
          padding: 14px;
          background: #fff;
          border: 1px solid #ff4d4f;
          border-radius: 10px;
          color: #ff4d4f;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-save {
          flex: 2;
          padding: 14px;
          background: #FFB800;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
        }
      `})]})}var cu={};/*! For license information please see index.js.LICENSE.txt */var IM={2:t=>{function e(r,i,o){r instanceof RegExp&&(r=n(r,o)),i instanceof RegExp&&(i=n(i,o));var a=s(r,i,o);return a&&{start:a[0],end:a[1],pre:o.slice(0,a[0]),body:o.slice(a[0]+r.length,a[1]),post:o.slice(a[1]+i.length)}}function n(r,i){var o=i.match(r);return o?o[0]:null}function s(r,i,o){var a,c,u,d,f,h=o.indexOf(r),m=o.indexOf(i,h+1),g=h;if(h>=0&&m>0){for(a=[],u=o.length;g>=0&&!f;)g==h?(a.push(g),h=o.indexOf(r,g+1)):a.length==1?f=[a.pop(),m]:((c=a.pop())<u&&(u=c,d=m),m=o.indexOf(i,g+1)),g=h<m&&h>=0?h:m;a.length&&(f=[u,d])}return f}t.exports=e,e.range=s},101:function(t,e,n){var s;t=n.nmd(t),function(r){t&&t.exports,typeof global=="object"&&global;var i=function(d){this.message=d};(i.prototype=new Error).name="InvalidCharacterError";var o=function(d){throw new i(d)},a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=/[\t\n\f\r ]/g,u={encode:function(d){d=String(d),/[^\0-\xFF]/.test(d)&&o("The string to be encoded contains characters outside of the Latin1 range.");for(var f,h,m,g,x=d.length%3,v="",b=-1,p=d.length-x;++b<p;)f=d.charCodeAt(b)<<16,h=d.charCodeAt(++b)<<8,m=d.charCodeAt(++b),v+=a.charAt((g=f+h+m)>>18&63)+a.charAt(g>>12&63)+a.charAt(g>>6&63)+a.charAt(63&g);return x==2?(f=d.charCodeAt(b)<<8,h=d.charCodeAt(++b),v+=a.charAt((g=f+h)>>10)+a.charAt(g>>4&63)+a.charAt(g<<2&63)+"="):x==1&&(g=d.charCodeAt(b),v+=a.charAt(g>>2)+a.charAt(g<<4&63)+"=="),v},decode:function(d){var f=(d=String(d).replace(c,"")).length;f%4==0&&(f=(d=d.replace(/==?$/,"")).length),(f%4==1||/[^+a-zA-Z0-9/]/.test(d))&&o("Invalid character: the string to be decoded is not correctly encoded.");for(var h,m,g=0,x="",v=-1;++v<f;)m=a.indexOf(d.charAt(v)),h=g%4?64*h+m:m,g++%4&&(x+=String.fromCharCode(255&h>>(-2*g&6)));return x},version:"1.0.0"};(s=(function(){return u}).call(e,n,e,t))===void 0||(t.exports=s)}()},172:(t,e)=>{e.d=function(n){if(!n)return 0;for(var s=(n=n.toString()).length,r=n.length;r--;){var i=n.charCodeAt(r);56320<=i&&i<=57343&&r--,127<i&&i<=2047?s++:2047<i&&i<=65535&&(s+=2)}return s}},526:t=>{var e={utf8:{stringToBytes:function(n){return e.bin.stringToBytes(unescape(encodeURIComponent(n)))},bytesToString:function(n){return decodeURIComponent(escape(e.bin.bytesToString(n)))}},bin:{stringToBytes:function(n){for(var s=[],r=0;r<n.length;r++)s.push(255&n.charCodeAt(r));return s},bytesToString:function(n){for(var s=[],r=0;r<n.length;r++)s.push(String.fromCharCode(n[r]));return s.join("")}}};t.exports=e},298:t=>{var e,n;e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n={rotl:function(s,r){return s<<r|s>>>32-r},rotr:function(s,r){return s<<32-r|s>>>r},endian:function(s){if(s.constructor==Number)return 16711935&n.rotl(s,8)|4278255360&n.rotl(s,24);for(var r=0;r<s.length;r++)s[r]=n.endian(s[r]);return s},randomBytes:function(s){for(var r=[];s>0;s--)r.push(Math.floor(256*Math.random()));return r},bytesToWords:function(s){for(var r=[],i=0,o=0;i<s.length;i++,o+=8)r[o>>>5]|=s[i]<<24-o%32;return r},wordsToBytes:function(s){for(var r=[],i=0;i<32*s.length;i+=8)r.push(s[i>>>5]>>>24-i%32&255);return r},bytesToHex:function(s){for(var r=[],i=0;i<s.length;i++)r.push((s[i]>>>4).toString(16)),r.push((15&s[i]).toString(16));return r.join("")},hexToBytes:function(s){for(var r=[],i=0;i<s.length;i+=2)r.push(parseInt(s.substr(i,2),16));return r},bytesToBase64:function(s){for(var r=[],i=0;i<s.length;i+=3)for(var o=s[i]<<16|s[i+1]<<8|s[i+2],a=0;a<4;a++)8*i+6*a<=8*s.length?r.push(e.charAt(o>>>6*(3-a)&63)):r.push("=");return r.join("")},base64ToBytes:function(s){s=s.replace(/[^A-Z0-9+\/]/gi,"");for(var r=[],i=0,o=0;i<s.length;o=++i%4)o!=0&&r.push((e.indexOf(s.charAt(i-1))&Math.pow(2,-2*o+8)-1)<<2*o|e.indexOf(s.charAt(i))>>>6-2*o);return r}},t.exports=n},635:(t,e,n)=>{const s=n(31),r=n(338),i=n(221);t.exports={XMLParser:r,XMLValidator:s,XMLBuilder:i}},118:t=>{t.exports=function(e){return typeof e=="function"?e:Array.isArray(e)?n=>{for(const s of e)if(typeof s=="string"&&n===s||s instanceof RegExp&&s.test(n))return!0}:()=>!1}},705:(t,e)=>{const n=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",s="["+n+"]["+n+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*",r=new RegExp("^"+s+"$");e.isExist=function(i){return i!==void 0},e.isEmptyObject=function(i){return Object.keys(i).length===0},e.merge=function(i,o,a){if(o){const c=Object.keys(o),u=c.length;for(let d=0;d<u;d++)i[c[d]]=a==="strict"?[o[c[d]]]:o[c[d]]}},e.getValue=function(i){return e.isExist(i)?i:""},e.isName=function(i){return r.exec(i)!=null},e.getAllMatches=function(i,o){const a=[];let c=o.exec(i);for(;c;){const u=[];u.startIndex=o.lastIndex-c[0].length;const d=c.length;for(let f=0;f<d;f++)u.push(c[f]);a.push(u),c=o.exec(i)}return a},e.nameRegexp=s},31:(t,e,n)=>{const s=n(705),r={allowBooleanAttributes:!1,unpairedTags:[]};function i(p){return p===" "||p==="	"||p===`
`||p==="\r"}function o(p,y){const _=y;for(;y<p.length;y++)if(!(p[y]!="?"&&p[y]!=" ")){const j=p.substr(_,y-_);if(y>5&&j==="xml")return g("InvalidXml","XML declaration allowed only at the start of the document.",v(p,y));if(p[y]=="?"&&p[y+1]==">"){y++;break}}return y}function a(p,y){if(p.length>y+5&&p[y+1]==="-"&&p[y+2]==="-"){for(y+=3;y<p.length;y++)if(p[y]==="-"&&p[y+1]==="-"&&p[y+2]===">"){y+=2;break}}else if(p.length>y+8&&p[y+1]==="D"&&p[y+2]==="O"&&p[y+3]==="C"&&p[y+4]==="T"&&p[y+5]==="Y"&&p[y+6]==="P"&&p[y+7]==="E"){let _=1;for(y+=8;y<p.length;y++)if(p[y]==="<")_++;else if(p[y]===">"&&(_--,_===0))break}else if(p.length>y+9&&p[y+1]==="["&&p[y+2]==="C"&&p[y+3]==="D"&&p[y+4]==="A"&&p[y+5]==="T"&&p[y+6]==="A"&&p[y+7]==="["){for(y+=8;y<p.length;y++)if(p[y]==="]"&&p[y+1]==="]"&&p[y+2]===">"){y+=2;break}}return y}e.validate=function(p,y){y=Object.assign({},r,y);const _=[];let j=!1,N=!1;p[0]==="\uFEFF"&&(p=p.substr(1));for(let w=0;w<p.length;w++)if(p[w]==="<"&&p[w+1]==="?"){if(w+=2,w=o(p,w),w.err)return w}else{if(p[w]!=="<"){if(i(p[w]))continue;return g("InvalidChar","char '"+p[w]+"' is not expected.",v(p,w))}{let k=w;if(w++,p[w]==="!"){w=a(p,w);continue}{let S=!1;p[w]==="/"&&(S=!0,w++);let P="";for(;w<p.length&&p[w]!==">"&&p[w]!==" "&&p[w]!=="	"&&p[w]!==`
`&&p[w]!=="\r";w++)P+=p[w];if(P=P.trim(),P[P.length-1]==="/"&&(P=P.substring(0,P.length-1),w--),C=P,!s.isName(C)){let U;return U=P.trim().length===0?"Invalid space after '<'.":"Tag '"+P+"' is an invalid name.",g("InvalidTag",U,v(p,w))}const O=d(p,w);if(O===!1)return g("InvalidAttr","Attributes for '"+P+"' have open quote.",v(p,w));let A=O.value;if(w=O.index,A[A.length-1]==="/"){const U=w-A.length;A=A.substring(0,A.length-1);const L=h(A,y);if(L!==!0)return g(L.err.code,L.err.msg,v(p,U+L.err.line));j=!0}else if(S){if(!O.tagClosed)return g("InvalidTag","Closing tag '"+P+"' doesn't have proper closing.",v(p,w));if(A.trim().length>0)return g("InvalidTag","Closing tag '"+P+"' can't have attributes or invalid starting.",v(p,k));if(_.length===0)return g("InvalidTag","Closing tag '"+P+"' has not been opened.",v(p,k));{const U=_.pop();if(P!==U.tagName){let L=v(p,U.tagStartPos);return g("InvalidTag","Expected closing tag '"+U.tagName+"' (opened in line "+L.line+", col "+L.col+") instead of closing tag '"+P+"'.",v(p,k))}_.length==0&&(N=!0)}}else{const U=h(A,y);if(U!==!0)return g(U.err.code,U.err.msg,v(p,w-A.length+U.err.line));if(N===!0)return g("InvalidXml","Multiple possible root nodes found.",v(p,w));y.unpairedTags.indexOf(P)!==-1||_.push({tagName:P,tagStartPos:k}),j=!0}for(w++;w<p.length;w++)if(p[w]==="<"){if(p[w+1]==="!"){w++,w=a(p,w);continue}if(p[w+1]!=="?")break;if(w=o(p,++w),w.err)return w}else if(p[w]==="&"){const U=m(p,w);if(U==-1)return g("InvalidChar","char '&' is not expected.",v(p,w));w=U}else if(N===!0&&!i(p[w]))return g("InvalidXml","Extra text at the end",v(p,w));p[w]==="<"&&w--}}}var C;return j?_.length==1?g("InvalidTag","Unclosed tag '"+_[0].tagName+"'.",v(p,_[0].tagStartPos)):!(_.length>0)||g("InvalidXml","Invalid '"+JSON.stringify(_.map(w=>w.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):g("InvalidXml","Start tag expected.",1)};const c='"',u="'";function d(p,y){let _="",j="",N=!1;for(;y<p.length;y++){if(p[y]===c||p[y]===u)j===""?j=p[y]:j!==p[y]||(j="");else if(p[y]===">"&&j===""){N=!0;break}_+=p[y]}return j===""&&{value:_,index:y,tagClosed:N}}const f=new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`,"g");function h(p,y){const _=s.getAllMatches(p,f),j={};for(let N=0;N<_.length;N++){if(_[N][1].length===0)return g("InvalidAttr","Attribute '"+_[N][2]+"' has no space in starting.",b(_[N]));if(_[N][3]!==void 0&&_[N][4]===void 0)return g("InvalidAttr","Attribute '"+_[N][2]+"' is without value.",b(_[N]));if(_[N][3]===void 0&&!y.allowBooleanAttributes)return g("InvalidAttr","boolean attribute '"+_[N][2]+"' is not allowed.",b(_[N]));const C=_[N][2];if(!x(C))return g("InvalidAttr","Attribute '"+C+"' is an invalid name.",b(_[N]));if(j.hasOwnProperty(C))return g("InvalidAttr","Attribute '"+C+"' is repeated.",b(_[N]));j[C]=1}return!0}function m(p,y){if(p[++y]===";")return-1;if(p[y]==="#")return function(j,N){let C=/\d/;for(j[N]==="x"&&(N++,C=/[\da-fA-F]/);N<j.length;N++){if(j[N]===";")return N;if(!j[N].match(C))break}return-1}(p,++y);let _=0;for(;y<p.length;y++,_++)if(!(p[y].match(/\w/)&&_<20)){if(p[y]===";")break;return-1}return y}function g(p,y,_){return{err:{code:p,msg:y,line:_.line||_,col:_.col}}}function x(p){return s.isName(p)}function v(p,y){const _=p.substring(0,y).split(/\r?\n/);return{line:_.length,col:_[_.length-1].length+1}}function b(p){return p.startIndex+p[1].length}},221:(t,e,n)=>{const s=n(87),r=n(118),i={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(d,f){return f},attributeValueProcessor:function(d,f){return f},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function o(d){this.options=Object.assign({},i,d),this.options.ignoreAttributes===!0||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.ignoreAttributesFn=r(this.options.ignoreAttributes),this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=u),this.processTextOrObjNode=a,this.options.format?(this.indentate=c,this.tagEndChar=`>
`,this.newLine=`
`):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function a(d,f,h,m){const g=this.j2x(d,h+1,m.concat(f));return d[this.options.textNodeName]!==void 0&&Object.keys(d).length===1?this.buildTextValNode(d[this.options.textNodeName],f,g.attrStr,h):this.buildObjectNode(g.val,f,g.attrStr,h)}function c(d){return this.options.indentBy.repeat(d)}function u(d){return!(!d.startsWith(this.options.attributeNamePrefix)||d===this.options.textNodeName)&&d.substr(this.attrPrefixLen)}o.prototype.build=function(d){return this.options.preserveOrder?s(d,this.options):(Array.isArray(d)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(d={[this.options.arrayNodeName]:d}),this.j2x(d,0,[]).val)},o.prototype.j2x=function(d,f,h){let m="",g="";const x=h.join(".");for(let v in d)if(Object.prototype.hasOwnProperty.call(d,v))if(d[v]===void 0)this.isAttribute(v)&&(g+="");else if(d[v]===null)this.isAttribute(v)?g+="":v[0]==="?"?g+=this.indentate(f)+"<"+v+"?"+this.tagEndChar:g+=this.indentate(f)+"<"+v+"/"+this.tagEndChar;else if(d[v]instanceof Date)g+=this.buildTextValNode(d[v],v,"",f);else if(typeof d[v]!="object"){const b=this.isAttribute(v);if(b&&!this.ignoreAttributesFn(b,x))m+=this.buildAttrPairStr(b,""+d[v]);else if(!b)if(v===this.options.textNodeName){let p=this.options.tagValueProcessor(v,""+d[v]);g+=this.replaceEntitiesValue(p)}else g+=this.buildTextValNode(d[v],v,"",f)}else if(Array.isArray(d[v])){const b=d[v].length;let p="",y="";for(let _=0;_<b;_++){const j=d[v][_];if(j!==void 0)if(j===null)v[0]==="?"?g+=this.indentate(f)+"<"+v+"?"+this.tagEndChar:g+=this.indentate(f)+"<"+v+"/"+this.tagEndChar;else if(typeof j=="object")if(this.options.oneListGroup){const N=this.j2x(j,f+1,h.concat(v));p+=N.val,this.options.attributesGroupName&&j.hasOwnProperty(this.options.attributesGroupName)&&(y+=N.attrStr)}else p+=this.processTextOrObjNode(j,v,f,h);else if(this.options.oneListGroup){let N=this.options.tagValueProcessor(v,j);N=this.replaceEntitiesValue(N),p+=N}else p+=this.buildTextValNode(j,v,"",f)}this.options.oneListGroup&&(p=this.buildObjectNode(p,v,y,f)),g+=p}else if(this.options.attributesGroupName&&v===this.options.attributesGroupName){const b=Object.keys(d[v]),p=b.length;for(let y=0;y<p;y++)m+=this.buildAttrPairStr(b[y],""+d[v][b[y]])}else g+=this.processTextOrObjNode(d[v],v,f,h);return{attrStr:m,val:g}},o.prototype.buildAttrPairStr=function(d,f){return f=this.options.attributeValueProcessor(d,""+f),f=this.replaceEntitiesValue(f),this.options.suppressBooleanAttributes&&f==="true"?" "+d:" "+d+'="'+f+'"'},o.prototype.buildObjectNode=function(d,f,h,m){if(d==="")return f[0]==="?"?this.indentate(m)+"<"+f+h+"?"+this.tagEndChar:this.indentate(m)+"<"+f+h+this.closeTag(f)+this.tagEndChar;{let g="</"+f+this.tagEndChar,x="";return f[0]==="?"&&(x="?",g=""),!h&&h!==""||d.indexOf("<")!==-1?this.options.commentPropName!==!1&&f===this.options.commentPropName&&x.length===0?this.indentate(m)+`<!--${d}-->`+this.newLine:this.indentate(m)+"<"+f+h+x+this.tagEndChar+d+this.indentate(m)+g:this.indentate(m)+"<"+f+h+x+">"+d+g}},o.prototype.closeTag=function(d){let f="";return this.options.unpairedTags.indexOf(d)!==-1?this.options.suppressUnpairedNode||(f="/"):f=this.options.suppressEmptyNode?"/":`></${d}`,f},o.prototype.buildTextValNode=function(d,f,h,m){if(this.options.cdataPropName!==!1&&f===this.options.cdataPropName)return this.indentate(m)+`<![CDATA[${d}]]>`+this.newLine;if(this.options.commentPropName!==!1&&f===this.options.commentPropName)return this.indentate(m)+`<!--${d}-->`+this.newLine;if(f[0]==="?")return this.indentate(m)+"<"+f+h+"?"+this.tagEndChar;{let g=this.options.tagValueProcessor(f,d);return g=this.replaceEntitiesValue(g),g===""?this.indentate(m)+"<"+f+h+this.closeTag(f)+this.tagEndChar:this.indentate(m)+"<"+f+h+">"+g+"</"+f+this.tagEndChar}},o.prototype.replaceEntitiesValue=function(d){if(d&&d.length>0&&this.options.processEntities)for(let f=0;f<this.options.entities.length;f++){const h=this.options.entities[f];d=d.replace(h.regex,h.val)}return d},t.exports=o},87:t=>{function e(o,a,c,u){let d="",f=!1;for(let h=0;h<o.length;h++){const m=o[h],g=n(m);if(g===void 0)continue;let x="";if(x=c.length===0?g:`${c}.${g}`,g===a.textNodeName){let y=m[g];r(x,a)||(y=a.tagValueProcessor(g,y),y=i(y,a)),f&&(d+=u),d+=y,f=!1;continue}if(g===a.cdataPropName){f&&(d+=u),d+=`<![CDATA[${m[g][0][a.textNodeName]}]]>`,f=!1;continue}if(g===a.commentPropName){d+=u+`<!--${m[g][0][a.textNodeName]}-->`,f=!0;continue}if(g[0]==="?"){const y=s(m[":@"],a),_=g==="?xml"?"":u;let j=m[g][0][a.textNodeName];j=j.length!==0?" "+j:"",d+=_+`<${g}${j}${y}?>`,f=!0;continue}let v=u;v!==""&&(v+=a.indentBy);const b=u+`<${g}${s(m[":@"],a)}`,p=e(m[g],a,x,v);a.unpairedTags.indexOf(g)!==-1?a.suppressUnpairedNode?d+=b+">":d+=b+"/>":p&&p.length!==0||!a.suppressEmptyNode?p&&p.endsWith(">")?d+=b+`>${p}${u}</${g}>`:(d+=b+">",p&&u!==""&&(p.includes("/>")||p.includes("</"))?d+=u+a.indentBy+p+u:d+=p,d+=`</${g}>`):d+=b+"/>",f=!0}return d}function n(o){const a=Object.keys(o);for(let c=0;c<a.length;c++){const u=a[c];if(o.hasOwnProperty(u)&&u!==":@")return u}}function s(o,a){let c="";if(o&&!a.ignoreAttributes)for(let u in o){if(!o.hasOwnProperty(u))continue;let d=a.attributeValueProcessor(u,o[u]);d=i(d,a),d===!0&&a.suppressBooleanAttributes?c+=` ${u.substr(a.attributeNamePrefix.length)}`:c+=` ${u.substr(a.attributeNamePrefix.length)}="${d}"`}return c}function r(o,a){let c=(o=o.substr(0,o.length-a.textNodeName.length-1)).substr(o.lastIndexOf(".")+1);for(let u in a.stopNodes)if(a.stopNodes[u]===o||a.stopNodes[u]==="*."+c)return!0;return!1}function i(o,a){if(o&&o.length>0&&a.processEntities)for(let c=0;c<a.entities.length;c++){const u=a.entities[c];o=o.replace(u.regex,u.val)}return o}t.exports=function(o,a){let c="";return a.format&&a.indentBy.length>0&&(c=`
`),e(o,a,"",c)}},193:(t,e,n)=>{const s=n(705);function r(f,h){let m="";for(;h<f.length&&f[h]!=="'"&&f[h]!=='"';h++)m+=f[h];if(m=m.trim(),m.indexOf(" ")!==-1)throw new Error("External entites are not supported");const g=f[h++];let x="";for(;h<f.length&&f[h]!==g;h++)x+=f[h];return[m,x,h]}function i(f,h){return f[h+1]==="!"&&f[h+2]==="-"&&f[h+3]==="-"}function o(f,h){return f[h+1]==="!"&&f[h+2]==="E"&&f[h+3]==="N"&&f[h+4]==="T"&&f[h+5]==="I"&&f[h+6]==="T"&&f[h+7]==="Y"}function a(f,h){return f[h+1]==="!"&&f[h+2]==="E"&&f[h+3]==="L"&&f[h+4]==="E"&&f[h+5]==="M"&&f[h+6]==="E"&&f[h+7]==="N"&&f[h+8]==="T"}function c(f,h){return f[h+1]==="!"&&f[h+2]==="A"&&f[h+3]==="T"&&f[h+4]==="T"&&f[h+5]==="L"&&f[h+6]==="I"&&f[h+7]==="S"&&f[h+8]==="T"}function u(f,h){return f[h+1]==="!"&&f[h+2]==="N"&&f[h+3]==="O"&&f[h+4]==="T"&&f[h+5]==="A"&&f[h+6]==="T"&&f[h+7]==="I"&&f[h+8]==="O"&&f[h+9]==="N"}function d(f){if(s.isName(f))return f;throw new Error(`Invalid entity name ${f}`)}t.exports=function(f,h){const m={};if(f[h+3]!=="O"||f[h+4]!=="C"||f[h+5]!=="T"||f[h+6]!=="Y"||f[h+7]!=="P"||f[h+8]!=="E")throw new Error("Invalid Tag instead of DOCTYPE");{h+=9;let g=1,x=!1,v=!1,b="";for(;h<f.length;h++)if(f[h]!=="<"||v)if(f[h]===">"){if(v?f[h-1]==="-"&&f[h-2]==="-"&&(v=!1,g--):g--,g===0)break}else f[h]==="["?x=!0:b+=f[h];else{if(x&&o(f,h)){let p,y;h+=7,[p,y,h]=r(f,h+1),y.indexOf("&")===-1&&(m[d(p)]={regx:RegExp(`&${p};`,"g"),val:y})}else if(x&&a(f,h))h+=8;else if(x&&c(f,h))h+=8;else if(x&&u(f,h))h+=9;else{if(!i)throw new Error("Invalid DOCTYPE");v=!0}g++,b=""}if(g!==0)throw new Error("Unclosed DOCTYPE")}return{entities:m,i:h}}},63:(t,e)=>{const n={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(s,r){return r},attributeValueProcessor:function(s,r){return r},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(s,r,i){return s}};e.buildOptions=function(s){return Object.assign({},n,s)},e.defaultOptions=n},299:(t,e,n)=>{const s=n(705),r=n(365),i=n(193),o=n(494),a=n(118);function c(N){const C=Object.keys(N);for(let w=0;w<C.length;w++){const k=C[w];this.lastEntities[k]={regex:new RegExp("&"+k+";","g"),val:N[k]}}}function u(N,C,w,k,S,P,O){if(N!==void 0&&(this.options.trimValues&&!k&&(N=N.trim()),N.length>0)){O||(N=this.replaceEntitiesValue(N));const A=this.options.tagValueProcessor(C,N,w,S,P);return A==null?N:typeof A!=typeof N||A!==N?A:this.options.trimValues||N.trim()===N?j(N,this.options.parseTagValue,this.options.numberParseOptions):N}}function d(N){if(this.options.removeNSPrefix){const C=N.split(":"),w=N.charAt(0)==="/"?"/":"";if(C[0]==="xmlns")return"";C.length===2&&(N=w+C[1])}return N}const f=new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`,"gm");function h(N,C,w){if(this.options.ignoreAttributes!==!0&&typeof N=="string"){const k=s.getAllMatches(N,f),S=k.length,P={};for(let O=0;O<S;O++){const A=this.resolveNameSpace(k[O][1]);if(this.ignoreAttributesFn(A,C))continue;let U=k[O][4],L=this.options.attributeNamePrefix+A;if(A.length)if(this.options.transformAttributeName&&(L=this.options.transformAttributeName(L)),L==="__proto__"&&(L="#__proto__"),U!==void 0){this.options.trimValues&&(U=U.trim()),U=this.replaceEntitiesValue(U);const $=this.options.attributeValueProcessor(A,U,C);P[L]=$==null?U:typeof $!=typeof U||$!==U?$:j(U,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(P[L]=!0)}if(!Object.keys(P).length)return;if(this.options.attributesGroupName){const O={};return O[this.options.attributesGroupName]=P,O}return P}}const m=function(N){N=N.replace(/\r\n?/g,`
`);const C=new r("!xml");let w=C,k="",S="";for(let P=0;P<N.length;P++)if(N[P]==="<")if(N[P+1]==="/"){const O=p(N,">",P,"Closing Tag is not closed.");let A=N.substring(P+2,O).trim();if(this.options.removeNSPrefix){const $=A.indexOf(":");$!==-1&&(A=A.substr($+1))}this.options.transformTagName&&(A=this.options.transformTagName(A)),w&&(k=this.saveTextToParentTag(k,w,S));const U=S.substring(S.lastIndexOf(".")+1);if(A&&this.options.unpairedTags.indexOf(A)!==-1)throw new Error(`Unpaired tag can not be used as closing tag: </${A}>`);let L=0;U&&this.options.unpairedTags.indexOf(U)!==-1?(L=S.lastIndexOf(".",S.lastIndexOf(".")-1),this.tagsNodeStack.pop()):L=S.lastIndexOf("."),S=S.substring(0,L),w=this.tagsNodeStack.pop(),k="",P=O}else if(N[P+1]==="?"){let O=y(N,P,!1,"?>");if(!O)throw new Error("Pi Tag is not closed.");if(k=this.saveTextToParentTag(k,w,S),!(this.options.ignoreDeclaration&&O.tagName==="?xml"||this.options.ignorePiTags)){const A=new r(O.tagName);A.add(this.options.textNodeName,""),O.tagName!==O.tagExp&&O.attrExpPresent&&(A[":@"]=this.buildAttributesMap(O.tagExp,S,O.tagName)),this.addChild(w,A,S)}P=O.closeIndex+1}else if(N.substr(P+1,3)==="!--"){const O=p(N,"-->",P+4,"Comment is not closed.");if(this.options.commentPropName){const A=N.substring(P+4,O-2);k=this.saveTextToParentTag(k,w,S),w.add(this.options.commentPropName,[{[this.options.textNodeName]:A}])}P=O}else if(N.substr(P+1,2)==="!D"){const O=i(N,P);this.docTypeEntities=O.entities,P=O.i}else if(N.substr(P+1,2)==="!["){const O=p(N,"]]>",P,"CDATA is not closed.")-2,A=N.substring(P+9,O);k=this.saveTextToParentTag(k,w,S);let U=this.parseTextData(A,w.tagname,S,!0,!1,!0,!0);U==null&&(U=""),this.options.cdataPropName?w.add(this.options.cdataPropName,[{[this.options.textNodeName]:A}]):w.add(this.options.textNodeName,U),P=O+2}else{let O=y(N,P,this.options.removeNSPrefix),A=O.tagName;const U=O.rawTagName;let L=O.tagExp,$=O.attrExpPresent,D=O.closeIndex;this.options.transformTagName&&(A=this.options.transformTagName(A)),w&&k&&w.tagname!=="!xml"&&(k=this.saveTextToParentTag(k,w,S,!1));const z=w;if(z&&this.options.unpairedTags.indexOf(z.tagname)!==-1&&(w=this.tagsNodeStack.pop(),S=S.substring(0,S.lastIndexOf("."))),A!==C.tagname&&(S+=S?"."+A:A),this.isItStopNode(this.options.stopNodes,S,A)){let M="";if(L.length>0&&L.lastIndexOf("/")===L.length-1)A[A.length-1]==="/"?(A=A.substr(0,A.length-1),S=S.substr(0,S.length-1),L=A):L=L.substr(0,L.length-1),P=O.closeIndex;else if(this.options.unpairedTags.indexOf(A)!==-1)P=O.closeIndex;else{const I=this.readStopNodeData(N,U,D+1);if(!I)throw new Error(`Unexpected end of ${U}`);P=I.i,M=I.tagContent}const T=new r(A);A!==L&&$&&(T[":@"]=this.buildAttributesMap(L,S,A)),M&&(M=this.parseTextData(M,A,S,!0,$,!0,!0)),S=S.substr(0,S.lastIndexOf(".")),T.add(this.options.textNodeName,M),this.addChild(w,T,S)}else{if(L.length>0&&L.lastIndexOf("/")===L.length-1){A[A.length-1]==="/"?(A=A.substr(0,A.length-1),S=S.substr(0,S.length-1),L=A):L=L.substr(0,L.length-1),this.options.transformTagName&&(A=this.options.transformTagName(A));const M=new r(A);A!==L&&$&&(M[":@"]=this.buildAttributesMap(L,S,A)),this.addChild(w,M,S),S=S.substr(0,S.lastIndexOf("."))}else{const M=new r(A);this.tagsNodeStack.push(w),A!==L&&$&&(M[":@"]=this.buildAttributesMap(L,S,A)),this.addChild(w,M,S),w=M}k="",P=D}}else k+=N[P];return C.child};function g(N,C,w){const k=this.options.updateTag(C.tagname,w,C[":@"]);k===!1||(typeof k=="string"&&(C.tagname=k),N.addChild(C))}const x=function(N){if(this.options.processEntities){for(let C in this.docTypeEntities){const w=this.docTypeEntities[C];N=N.replace(w.regx,w.val)}for(let C in this.lastEntities){const w=this.lastEntities[C];N=N.replace(w.regex,w.val)}if(this.options.htmlEntities)for(let C in this.htmlEntities){const w=this.htmlEntities[C];N=N.replace(w.regex,w.val)}N=N.replace(this.ampEntity.regex,this.ampEntity.val)}return N};function v(N,C,w,k){return N&&(k===void 0&&(k=Object.keys(C.child).length===0),(N=this.parseTextData(N,C.tagname,w,!1,!!C[":@"]&&Object.keys(C[":@"]).length!==0,k))!==void 0&&N!==""&&C.add(this.options.textNodeName,N),N=""),N}function b(N,C,w){const k="*."+w;for(const S in N){const P=N[S];if(k===P||C===P)return!0}return!1}function p(N,C,w,k){const S=N.indexOf(C,w);if(S===-1)throw new Error(k);return S+C.length-1}function y(N,C,w){const k=function($,D){let z,M=arguments.length>2&&arguments[2]!==void 0?arguments[2]:">",T="";for(let I=D;I<$.length;I++){let R=$[I];if(z)R===z&&(z="");else if(R==='"'||R==="'")z=R;else if(R===M[0]){if(!M[1])return{data:T,index:I};if($[I+1]===M[1])return{data:T,index:I}}else R==="	"&&(R=" ");T+=R}}(N,C+1,arguments.length>3&&arguments[3]!==void 0?arguments[3]:">");if(!k)return;let S=k.data;const P=k.index,O=S.search(/\s/);let A=S,U=!0;O!==-1&&(A=S.substring(0,O),S=S.substring(O+1).trimStart());const L=A;if(w){const $=A.indexOf(":");$!==-1&&(A=A.substr($+1),U=A!==k.data.substr($+1))}return{tagName:A,tagExp:S,closeIndex:P,attrExpPresent:U,rawTagName:L}}function _(N,C,w){const k=w;let S=1;for(;w<N.length;w++)if(N[w]==="<")if(N[w+1]==="/"){const P=p(N,">",w,`${C} is not closed`);if(N.substring(w+2,P).trim()===C&&(S--,S===0))return{tagContent:N.substring(k,w),i:P};w=P}else if(N[w+1]==="?")w=p(N,"?>",w+1,"StopNode is not closed.");else if(N.substr(w+1,3)==="!--")w=p(N,"-->",w+3,"StopNode is not closed.");else if(N.substr(w+1,2)==="![")w=p(N,"]]>",w,"StopNode is not closed.")-2;else{const P=y(N,w,">");P&&((P&&P.tagName)===C&&P.tagExp[P.tagExp.length-1]!=="/"&&S++,w=P.closeIndex)}}function j(N,C,w){if(C&&typeof N=="string"){const k=N.trim();return k==="true"||k!=="false"&&o(N,w)}return s.isExist(N)?N:""}t.exports=class{constructor(N){this.options=N,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"},num_dec:{regex:/&#([0-9]{1,7});/g,val:(C,w)=>String.fromCharCode(Number.parseInt(w,10))},num_hex:{regex:/&#x([0-9a-fA-F]{1,6});/g,val:(C,w)=>String.fromCharCode(Number.parseInt(w,16))}},this.addExternalEntities=c,this.parseXml=m,this.parseTextData=u,this.resolveNameSpace=d,this.buildAttributesMap=h,this.isItStopNode=b,this.replaceEntitiesValue=x,this.readStopNodeData=_,this.saveTextToParentTag=v,this.addChild=g,this.ignoreAttributesFn=a(this.options.ignoreAttributes)}}},338:(t,e,n)=>{const{buildOptions:s}=n(63),r=n(299),{prettify:i}=n(728),o=n(31);t.exports=class{constructor(a){this.externalEntities={},this.options=s(a)}parse(a,c){if(typeof a!="string"){if(!a.toString)throw new Error("XML data is accepted in String or Bytes[] form.");a=a.toString()}if(c){c===!0&&(c={});const f=o.validate(a,c);if(f!==!0)throw Error(`${f.err.msg}:${f.err.line}:${f.err.col}`)}const u=new r(this.options);u.addExternalEntities(this.externalEntities);const d=u.parseXml(a);return this.options.preserveOrder||d===void 0?d:i(d,this.options)}addEntity(a,c){if(c.indexOf("&")!==-1)throw new Error("Entity value can't have '&'");if(a.indexOf("&")!==-1||a.indexOf(";")!==-1)throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if(c==="&")throw new Error("An entity with value '&' is not permitted");this.externalEntities[a]=c}}},728:(t,e)=>{function n(o,a,c){let u;const d={};for(let f=0;f<o.length;f++){const h=o[f],m=s(h);let g="";if(g=c===void 0?m:c+"."+m,m===a.textNodeName)u===void 0?u=h[m]:u+=""+h[m];else{if(m===void 0)continue;if(h[m]){let x=n(h[m],a,g);const v=i(x,a);h[":@"]?r(x,h[":@"],g,a):Object.keys(x).length!==1||x[a.textNodeName]===void 0||a.alwaysCreateTextNode?Object.keys(x).length===0&&(a.alwaysCreateTextNode?x[a.textNodeName]="":x=""):x=x[a.textNodeName],d[m]!==void 0&&d.hasOwnProperty(m)?(Array.isArray(d[m])||(d[m]=[d[m]]),d[m].push(x)):a.isArray(m,g,v)?d[m]=[x]:d[m]=x}}}return typeof u=="string"?u.length>0&&(d[a.textNodeName]=u):u!==void 0&&(d[a.textNodeName]=u),d}function s(o){const a=Object.keys(o);for(let c=0;c<a.length;c++){const u=a[c];if(u!==":@")return u}}function r(o,a,c,u){if(a){const d=Object.keys(a),f=d.length;for(let h=0;h<f;h++){const m=d[h];u.isArray(m,c+"."+m,!0,!0)?o[m]=[a[m]]:o[m]=a[m]}}}function i(o,a){const{textNodeName:c}=a,u=Object.keys(o).length;return u===0||!(u!==1||!o[c]&&typeof o[c]!="boolean"&&o[c]!==0)}e.prettify=function(o,a){return n(o,a)}},365:t=>{t.exports=class{constructor(e){this.tagname=e,this.child=[],this[":@"]={}}add(e,n){e==="__proto__"&&(e="#__proto__"),this.child.push({[e]:n})}addChild(e){e.tagname==="__proto__"&&(e.tagname="#__proto__"),e[":@"]&&Object.keys(e[":@"]).length>0?this.child.push({[e.tagname]:e.child,":@":e[":@"]}):this.child.push({[e.tagname]:e.child})}}},135:t=>{function e(n){return!!n.constructor&&typeof n.constructor.isBuffer=="function"&&n.constructor.isBuffer(n)}t.exports=function(n){return n!=null&&(e(n)||function(s){return typeof s.readFloatLE=="function"&&typeof s.slice=="function"&&e(s.slice(0,0))}(n)||!!n._isBuffer)}},542:(t,e,n)=>{(function(){var s=n(298),r=n(526).utf8,i=n(135),o=n(526).bin,a=function(c,u){c.constructor==String?c=u&&u.encoding==="binary"?o.stringToBytes(c):r.stringToBytes(c):i(c)?c=Array.prototype.slice.call(c,0):Array.isArray(c)||c.constructor===Uint8Array||(c=c.toString());for(var d=s.bytesToWords(c),f=8*c.length,h=1732584193,m=-271733879,g=-1732584194,x=271733878,v=0;v<d.length;v++)d[v]=16711935&(d[v]<<8|d[v]>>>24)|4278255360&(d[v]<<24|d[v]>>>8);d[f>>>5]|=128<<f%32,d[14+(f+64>>>9<<4)]=f;var b=a._ff,p=a._gg,y=a._hh,_=a._ii;for(v=0;v<d.length;v+=16){var j=h,N=m,C=g,w=x;h=b(h,m,g,x,d[v+0],7,-680876936),x=b(x,h,m,g,d[v+1],12,-389564586),g=b(g,x,h,m,d[v+2],17,606105819),m=b(m,g,x,h,d[v+3],22,-1044525330),h=b(h,m,g,x,d[v+4],7,-176418897),x=b(x,h,m,g,d[v+5],12,1200080426),g=b(g,x,h,m,d[v+6],17,-1473231341),m=b(m,g,x,h,d[v+7],22,-45705983),h=b(h,m,g,x,d[v+8],7,1770035416),x=b(x,h,m,g,d[v+9],12,-1958414417),g=b(g,x,h,m,d[v+10],17,-42063),m=b(m,g,x,h,d[v+11],22,-1990404162),h=b(h,m,g,x,d[v+12],7,1804603682),x=b(x,h,m,g,d[v+13],12,-40341101),g=b(g,x,h,m,d[v+14],17,-1502002290),h=p(h,m=b(m,g,x,h,d[v+15],22,1236535329),g,x,d[v+1],5,-165796510),x=p(x,h,m,g,d[v+6],9,-1069501632),g=p(g,x,h,m,d[v+11],14,643717713),m=p(m,g,x,h,d[v+0],20,-373897302),h=p(h,m,g,x,d[v+5],5,-701558691),x=p(x,h,m,g,d[v+10],9,38016083),g=p(g,x,h,m,d[v+15],14,-660478335),m=p(m,g,x,h,d[v+4],20,-405537848),h=p(h,m,g,x,d[v+9],5,568446438),x=p(x,h,m,g,d[v+14],9,-1019803690),g=p(g,x,h,m,d[v+3],14,-187363961),m=p(m,g,x,h,d[v+8],20,1163531501),h=p(h,m,g,x,d[v+13],5,-1444681467),x=p(x,h,m,g,d[v+2],9,-51403784),g=p(g,x,h,m,d[v+7],14,1735328473),h=y(h,m=p(m,g,x,h,d[v+12],20,-1926607734),g,x,d[v+5],4,-378558),x=y(x,h,m,g,d[v+8],11,-2022574463),g=y(g,x,h,m,d[v+11],16,1839030562),m=y(m,g,x,h,d[v+14],23,-35309556),h=y(h,m,g,x,d[v+1],4,-1530992060),x=y(x,h,m,g,d[v+4],11,1272893353),g=y(g,x,h,m,d[v+7],16,-155497632),m=y(m,g,x,h,d[v+10],23,-1094730640),h=y(h,m,g,x,d[v+13],4,681279174),x=y(x,h,m,g,d[v+0],11,-358537222),g=y(g,x,h,m,d[v+3],16,-722521979),m=y(m,g,x,h,d[v+6],23,76029189),h=y(h,m,g,x,d[v+9],4,-640364487),x=y(x,h,m,g,d[v+12],11,-421815835),g=y(g,x,h,m,d[v+15],16,530742520),h=_(h,m=y(m,g,x,h,d[v+2],23,-995338651),g,x,d[v+0],6,-198630844),x=_(x,h,m,g,d[v+7],10,1126891415),g=_(g,x,h,m,d[v+14],15,-1416354905),m=_(m,g,x,h,d[v+5],21,-57434055),h=_(h,m,g,x,d[v+12],6,1700485571),x=_(x,h,m,g,d[v+3],10,-1894986606),g=_(g,x,h,m,d[v+10],15,-1051523),m=_(m,g,x,h,d[v+1],21,-2054922799),h=_(h,m,g,x,d[v+8],6,1873313359),x=_(x,h,m,g,d[v+15],10,-30611744),g=_(g,x,h,m,d[v+6],15,-1560198380),m=_(m,g,x,h,d[v+13],21,1309151649),h=_(h,m,g,x,d[v+4],6,-145523070),x=_(x,h,m,g,d[v+11],10,-1120210379),g=_(g,x,h,m,d[v+2],15,718787259),m=_(m,g,x,h,d[v+9],21,-343485551),h=h+j>>>0,m=m+N>>>0,g=g+C>>>0,x=x+w>>>0}return s.endian([h,m,g,x])};a._ff=function(c,u,d,f,h,m,g){var x=c+(u&d|~u&f)+(h>>>0)+g;return(x<<m|x>>>32-m)+u},a._gg=function(c,u,d,f,h,m,g){var x=c+(u&f|d&~f)+(h>>>0)+g;return(x<<m|x>>>32-m)+u},a._hh=function(c,u,d,f,h,m,g){var x=c+(u^d^f)+(h>>>0)+g;return(x<<m|x>>>32-m)+u},a._ii=function(c,u,d,f,h,m,g){var x=c+(d^(u|~f))+(h>>>0)+g;return(x<<m|x>>>32-m)+u},a._blocksize=16,a._digestsize=16,t.exports=function(c,u){if(c==null)throw new Error("Illegal argument "+c);var d=s.wordsToBytes(a(c,u));return u&&u.asBytes?d:u&&u.asString?o.bytesToString(d):s.bytesToHex(d)}})()},285:(t,e,n)=>{var s=n(2);t.exports=function(b){return b?(b.substr(0,2)==="{}"&&(b="\\{\\}"+b.substr(2)),v(function(p){return p.split("\\\\").join(r).split("\\{").join(i).split("\\}").join(o).split("\\,").join(a).split("\\.").join(c)}(b),!0).map(d)):[]};var r="\0SLASH"+Math.random()+"\0",i="\0OPEN"+Math.random()+"\0",o="\0CLOSE"+Math.random()+"\0",a="\0COMMA"+Math.random()+"\0",c="\0PERIOD"+Math.random()+"\0";function u(b){return parseInt(b,10)==b?parseInt(b,10):b.charCodeAt(0)}function d(b){return b.split(r).join("\\").split(i).join("{").split(o).join("}").split(a).join(",").split(c).join(".")}function f(b){if(!b)return[""];var p=[],y=s("{","}",b);if(!y)return b.split(",");var _=y.pre,j=y.body,N=y.post,C=_.split(",");C[C.length-1]+="{"+j+"}";var w=f(N);return N.length&&(C[C.length-1]+=w.shift(),C.push.apply(C,w)),p.push.apply(p,C),p}function h(b){return"{"+b+"}"}function m(b){return/^-?0\d/.test(b)}function g(b,p){return b<=p}function x(b,p){return b>=p}function v(b,p){var y=[],_=s("{","}",b);if(!_)return[b];var j=_.pre,N=_.post.length?v(_.post,!1):[""];if(/\$$/.test(_.pre))for(var C=0;C<N.length;C++){var w=j+"{"+_.body+"}"+N[C];y.push(w)}else{var k,S,P=/^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(_.body),O=/^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(_.body),A=P||O,U=_.body.indexOf(",")>=0;if(!A&&!U)return _.post.match(/,.*\}/)?v(b=_.pre+"{"+_.body+o+_.post):[b];if(A)k=_.body.split(/\.\./);else if((k=f(_.body)).length===1&&(k=v(k[0],!1).map(h)).length===1)return N.map(function(ce){return _.pre+k[0]+ce});if(A){var L=u(k[0]),$=u(k[1]),D=Math.max(k[0].length,k[1].length),z=k.length==3?Math.abs(u(k[2])):1,M=g;$<L&&(z*=-1,M=x);var T=k.some(m);S=[];for(var I=L;M(I,$);I+=z){var R;if(O)(R=String.fromCharCode(I))==="\\"&&(R="");else if(R=String(I),T){var B=D-R.length;if(B>0){var K=new Array(B+1).join("0");R=I<0?"-"+K+R.slice(1):K+R}}S.push(R)}}else{S=[];for(var se=0;se<k.length;se++)S.push.apply(S,v(k[se],!1))}for(se=0;se<S.length;se++)for(C=0;C<N.length;C++)w=j+S[se]+N[C],(!p||A||w)&&y.push(w)}return y}},829:t=>{function e(u){return e=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},e(u)}function n(u){var d=typeof Map=="function"?new Map:void 0;return n=function(f){if(f===null||(h=f,Function.toString.call(h).indexOf("[native code]")===-1))return f;var h;if(typeof f!="function")throw new TypeError("Super expression must either be null or a function");if(d!==void 0){if(d.has(f))return d.get(f);d.set(f,m)}function m(){return s(f,arguments,i(this).constructor)}return m.prototype=Object.create(f.prototype,{constructor:{value:m,enumerable:!1,writable:!0,configurable:!0}}),r(m,f)},n(u)}function s(u,d,f){return s=function(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}()?Reflect.construct:function(h,m,g){var x=[null];x.push.apply(x,m);var v=new(Function.bind.apply(h,x));return g&&r(v,g.prototype),v},s.apply(null,arguments)}function r(u,d){return r=Object.setPrototypeOf||function(f,h){return f.__proto__=h,f},r(u,d)}function i(u){return i=Object.setPrototypeOf?Object.getPrototypeOf:function(d){return d.__proto__||Object.getPrototypeOf(d)},i(u)}var o=function(u){function d(f){var h;return function(m,g){if(!(m instanceof g))throw new TypeError("Cannot call a class as a function")}(this,d),(h=function(m,g){return!g||e(g)!=="object"&&typeof g!="function"?function(x){if(x===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return x}(m):g}(this,i(d).call(this,f))).name="ObjectPrototypeMutationError",h}return function(f,h){if(typeof h!="function"&&h!==null)throw new TypeError("Super expression must either be null or a function");f.prototype=Object.create(h&&h.prototype,{constructor:{value:f,writable:!0,configurable:!0}}),h&&r(f,h)}(d,u),d}(n(Error));function a(u,d){for(var f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:function(){},h=d.split("."),m=h.length,g=function(b){var p=h[b];if(!u)return{v:void 0};if(p==="+"){if(Array.isArray(u))return{v:u.map(function(_,j){var N=h.slice(b+1);return N.length>0?a(_,N.join("."),f):f(u,j,h,b)})};var y=h.slice(0,b).join(".");throw new Error("Object at wildcard (".concat(y,") is not an array"))}u=f(u,p,h,b)},x=0;x<m;x++){var v=g(x);if(e(v)==="object")return v.v}return u}function c(u,d){return u.length===d+1}t.exports={set:function(u,d,f){if(e(u)!="object"||u===null||d===void 0)return u;if(typeof d=="number")return u[d]=f,u[d];try{return a(u,d,function(h,m,g,x){if(h===Reflect.getPrototypeOf({}))throw new o("Attempting to mutate Object.prototype");if(!h[m]){var v=Number.isInteger(Number(g[x+1])),b=g[x+1]==="+";h[m]=v||b?[]:{}}return c(g,x)&&(h[m]=f),h[m]})}catch(h){if(h instanceof o)throw h;return u}},get:function(u,d){if(e(u)!="object"||u===null||d===void 0)return u;if(typeof d=="number")return u[d];try{return a(u,d,function(f,h){return f[h]})}catch{return u}},has:function(u,d){var f=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(e(u)!="object"||u===null||d===void 0)return!1;if(typeof d=="number")return d in u;try{var h=!1;return a(u,d,function(m,g,x,v){if(!c(x,v))return m&&m[g];h=f.own?m.hasOwnProperty(g):g in m}),h}catch{return!1}},hasOwn:function(u,d,f){return this.has(u,d,f||{own:!0})},isIn:function(u,d,f){var h=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};if(e(u)!="object"||u===null||d===void 0)return!1;try{var m=!1,g=!1;return a(u,d,function(x,v,b,p){return m=m||x===f||!!x&&x[v]===f,g=c(b,p)&&e(x)==="object"&&v in x,x&&x[v]}),h.validPath?m&&g:m}catch{return!1}},ObjectPrototypeMutationError:o}},47:(t,e,n)=>{var s=n(410),r=function(u){return typeof u=="string"};function i(u,d){for(var f=[],h=0;h<u.length;h++){var m=u[h];m&&m!=="."&&(m===".."?f.length&&f[f.length-1]!==".."?f.pop():d&&f.push(".."):f.push(m))}return f}var o=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,a={};function c(u){return o.exec(u).slice(1)}a.resolve=function(){for(var u="",d=!1,f=arguments.length-1;f>=-1&&!d;f--){var h=f>=0?arguments[f]:process.cwd();if(!r(h))throw new TypeError("Arguments to path.resolve must be strings");h&&(u=h+"/"+u,d=h.charAt(0)==="/")}return(d?"/":"")+(u=i(u.split("/"),!d).join("/"))||"."},a.normalize=function(u){var d=a.isAbsolute(u),f=u.substr(-1)==="/";return(u=i(u.split("/"),!d).join("/"))||d||(u="."),u&&f&&(u+="/"),(d?"/":"")+u},a.isAbsolute=function(u){return u.charAt(0)==="/"},a.join=function(){for(var u="",d=0;d<arguments.length;d++){var f=arguments[d];if(!r(f))throw new TypeError("Arguments to path.join must be strings");f&&(u+=u?"/"+f:f)}return a.normalize(u)},a.relative=function(u,d){function f(p){for(var y=0;y<p.length&&p[y]==="";y++);for(var _=p.length-1;_>=0&&p[_]==="";_--);return y>_?[]:p.slice(y,_+1)}u=a.resolve(u).substr(1),d=a.resolve(d).substr(1);for(var h=f(u.split("/")),m=f(d.split("/")),g=Math.min(h.length,m.length),x=g,v=0;v<g;v++)if(h[v]!==m[v]){x=v;break}var b=[];for(v=x;v<h.length;v++)b.push("..");return(b=b.concat(m.slice(x))).join("/")},a._makeLong=function(u){return u},a.dirname=function(u){var d=c(u),f=d[0],h=d[1];return f||h?(h&&(h=h.substr(0,h.length-1)),f+h):"."},a.basename=function(u,d){var f=c(u)[2];return d&&f.substr(-1*d.length)===d&&(f=f.substr(0,f.length-d.length)),f},a.extname=function(u){return c(u)[3]},a.format=function(u){if(!s.isObject(u))throw new TypeError("Parameter 'pathObject' must be an object, not "+typeof u);var d=u.root||"";if(!r(d))throw new TypeError("'pathObject.root' must be a string or undefined, not "+typeof u.root);return(u.dir?u.dir+a.sep:"")+(u.base||"")},a.parse=function(u){if(!r(u))throw new TypeError("Parameter 'pathString' must be a string, not "+typeof u);var d=c(u);if(!d||d.length!==4)throw new TypeError("Invalid path '"+u+"'");return d[1]=d[1]||"",d[2]=d[2]||"",d[3]=d[3]||"",{root:d[0],dir:d[0]+d[1].slice(0,d[1].length-1),base:d[2],ext:d[3],name:d[2].slice(0,d[2].length-d[3].length)}},a.sep="/",a.delimiter=":",t.exports=a},647:(t,e)=>{var n=Object.prototype.hasOwnProperty;function s(i){try{return decodeURIComponent(i.replace(/\+/g," "))}catch{return null}}function r(i){try{return encodeURIComponent(i)}catch{return null}}e.stringify=function(i,o){o=o||"";var a,c,u=[];for(c in typeof o!="string"&&(o="?"),i)if(n.call(i,c)){if((a=i[c])||a!=null&&!isNaN(a)||(a=""),c=r(c),a=r(a),c===null||a===null)continue;u.push(c+"="+a)}return u.length?o+u.join("&"):""},e.parse=function(i){for(var o,a=/([^=?#&]+)=?([^&]*)/g,c={};o=a.exec(i);){var u=s(o[1]),d=s(o[2]);u===null||d===null||u in c||(c[u]=d)}return c}},670:t=>{t.exports=function(e,n){if(n=n.split(":")[0],!(e=+e))return!1;switch(n){case"http":case"ws":return e!==80;case"https":case"wss":return e!==443;case"ftp":return e!==21;case"gopher":return e!==70;case"file":return!1}return e!==0}},494:t=>{const e=/^[-+]?0x[a-fA-F0-9]+$/,n=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const s={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};t.exports=function(r){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};if(i=Object.assign({},s,i),!r||typeof r!="string")return r;let o=r.trim();if(i.skipLike!==void 0&&i.skipLike.test(o))return r;if(i.hex&&e.test(o))return Number.parseInt(o,16);{const c=n.exec(o);if(c){const u=c[1],d=c[2];let f=((a=c[3])&&a.indexOf(".")!==-1&&((a=a.replace(/0+$/,""))==="."?a="0":a[0]==="."?a="0"+a:a[a.length-1]==="."&&(a=a.substr(0,a.length-1))),a);const h=c[4]||c[6];if(!i.leadingZeros&&d.length>0&&u&&o[2]!=="."||!i.leadingZeros&&d.length>0&&!u&&o[1]!==".")return r;{const m=Number(o),g=""+m;return g.search(/[eE]/)!==-1||h?i.eNotation?m:r:o.indexOf(".")!==-1?g==="0"&&f===""||g===f||u&&g==="-"+f?m:r:d?f===g||u+f===g?m:r:o===g||o===u+g?m:r}}return r}var a}},737:(t,e,n)=>{var s=n(670),r=n(647),i=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/,o=/[\n\r\t]/g,a=/^[A-Za-z][A-Za-z0-9+-.]*:\/\//,c=/:\d+$/,u=/^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i,d=/^[a-zA-Z]:/;function f(p){return(p||"").toString().replace(i,"")}var h=[["#","hash"],["?","query"],function(p,y){return x(y.protocol)?p.replace(/\\/g,"/"):p},["/","pathname"],["@","auth",1],[NaN,"host",void 0,1,1],[/:(\d*)$/,"port",void 0,1],[NaN,"hostname",void 0,1,1]],m={hash:1,query:1};function g(p){var y,_=(typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{}).location||{},j={},N=typeof(p=p||_);if(p.protocol==="blob:")j=new b(unescape(p.pathname),{});else if(N==="string")for(y in j=new b(p,{}),m)delete j[y];else if(N==="object"){for(y in p)y in m||(j[y]=p[y]);j.slashes===void 0&&(j.slashes=a.test(p.href))}return j}function x(p){return p==="file:"||p==="ftp:"||p==="http:"||p==="https:"||p==="ws:"||p==="wss:"}function v(p,y){p=(p=f(p)).replace(o,""),y=y||{};var _,j=u.exec(p),N=j[1]?j[1].toLowerCase():"",C=!!j[2],w=!!j[3],k=0;return C?w?(_=j[2]+j[3]+j[4],k=j[2].length+j[3].length):(_=j[2]+j[4],k=j[2].length):w?(_=j[3]+j[4],k=j[3].length):_=j[4],N==="file:"?k>=2&&(_=_.slice(2)):x(N)?_=j[4]:N?C&&(_=_.slice(2)):k>=2&&x(y.protocol)&&(_=j[4]),{protocol:N,slashes:C||x(N),slashesCount:k,rest:_}}function b(p,y,_){if(p=(p=f(p)).replace(o,""),!(this instanceof b))return new b(p,y,_);var j,N,C,w,k,S,P=h.slice(),O=typeof y,A=this,U=0;for(O!=="object"&&O!=="string"&&(_=y,y=null),_&&typeof _!="function"&&(_=r.parse),j=!(N=v(p||"",y=g(y))).protocol&&!N.slashes,A.slashes=N.slashes||j&&y.slashes,A.protocol=N.protocol||y.protocol||"",p=N.rest,(N.protocol==="file:"&&(N.slashesCount!==2||d.test(p))||!N.slashes&&(N.protocol||N.slashesCount<2||!x(A.protocol)))&&(P[3]=[/(.*)/,"pathname"]);U<P.length;U++)typeof(w=P[U])!="function"?(C=w[0],S=w[1],C!=C?A[S]=p:typeof C=="string"?~(k=C==="@"?p.lastIndexOf(C):p.indexOf(C))&&(typeof w[2]=="number"?(A[S]=p.slice(0,k),p=p.slice(k+w[2])):(A[S]=p.slice(k),p=p.slice(0,k))):(k=C.exec(p))&&(A[S]=k[1],p=p.slice(0,k.index)),A[S]=A[S]||j&&w[3]&&y[S]||"",w[4]&&(A[S]=A[S].toLowerCase())):p=w(p,A);_&&(A.query=_(A.query)),j&&y.slashes&&A.pathname.charAt(0)!=="/"&&(A.pathname!==""||y.pathname!=="")&&(A.pathname=function(L,$){if(L==="")return $;for(var D=($||"/").split("/").slice(0,-1).concat(L.split("/")),z=D.length,M=D[z-1],T=!1,I=0;z--;)D[z]==="."?D.splice(z,1):D[z]===".."?(D.splice(z,1),I++):I&&(z===0&&(T=!0),D.splice(z,1),I--);return T&&D.unshift(""),M!=="."&&M!==".."||D.push(""),D.join("/")}(A.pathname,y.pathname)),A.pathname.charAt(0)!=="/"&&x(A.protocol)&&(A.pathname="/"+A.pathname),s(A.port,A.protocol)||(A.host=A.hostname,A.port=""),A.username=A.password="",A.auth&&(~(k=A.auth.indexOf(":"))?(A.username=A.auth.slice(0,k),A.username=encodeURIComponent(decodeURIComponent(A.username)),A.password=A.auth.slice(k+1),A.password=encodeURIComponent(decodeURIComponent(A.password))):A.username=encodeURIComponent(decodeURIComponent(A.auth)),A.auth=A.password?A.username+":"+A.password:A.username),A.origin=A.protocol!=="file:"&&x(A.protocol)&&A.host?A.protocol+"//"+A.host:"null",A.href=A.toString()}b.prototype={set:function(p,y,_){var j=this;switch(p){case"query":typeof y=="string"&&y.length&&(y=(_||r.parse)(y)),j[p]=y;break;case"port":j[p]=y,s(y,j.protocol)?y&&(j.host=j.hostname+":"+y):(j.host=j.hostname,j[p]="");break;case"hostname":j[p]=y,j.port&&(y+=":"+j.port),j.host=y;break;case"host":j[p]=y,c.test(y)?(y=y.split(":"),j.port=y.pop(),j.hostname=y.join(":")):(j.hostname=y,j.port="");break;case"protocol":j.protocol=y.toLowerCase(),j.slashes=!_;break;case"pathname":case"hash":if(y){var N=p==="pathname"?"/":"#";j[p]=y.charAt(0)!==N?N+y:y}else j[p]=y;break;case"username":case"password":j[p]=encodeURIComponent(y);break;case"auth":var C=y.indexOf(":");~C?(j.username=y.slice(0,C),j.username=encodeURIComponent(decodeURIComponent(j.username)),j.password=y.slice(C+1),j.password=encodeURIComponent(decodeURIComponent(j.password))):j.username=encodeURIComponent(decodeURIComponent(y))}for(var w=0;w<h.length;w++){var k=h[w];k[4]&&(j[k[1]]=j[k[1]].toLowerCase())}return j.auth=j.password?j.username+":"+j.password:j.username,j.origin=j.protocol!=="file:"&&x(j.protocol)&&j.host?j.protocol+"//"+j.host:"null",j.href=j.toString(),j},toString:function(p){p&&typeof p=="function"||(p=r.stringify);var y,_=this,j=_.host,N=_.protocol;N&&N.charAt(N.length-1)!==":"&&(N+=":");var C=N+(_.protocol&&_.slashes||x(_.protocol)?"//":"");return _.username?(C+=_.username,_.password&&(C+=":"+_.password),C+="@"):_.password?(C+=":"+_.password,C+="@"):_.protocol!=="file:"&&x(_.protocol)&&!j&&_.pathname!=="/"&&(C+="@"),(j[j.length-1]===":"||c.test(_.hostname)&&!_.port)&&(j+=":"),C+=j+_.pathname,(y=typeof _.query=="object"?p(_.query):_.query)&&(C+=y.charAt(0)!=="?"?"?"+y:y),_.hash&&(C+=_.hash),C}},b.extractProtocol=v,b.location=g,b.trimLeft=f,b.qs=r,t.exports=b},410:()=>{},388:()=>{},805:()=>{},345:()=>{},800:()=>{}},Jg={};function Pe(t){var e=Jg[t];if(e!==void 0)return e.exports;var n=Jg[t]={id:t,loaded:!1,exports:{}};return IM[t].call(n.exports,n,n.exports,Pe),n.loaded=!0,n.exports}Pe.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return Pe.d(e,{a:e}),e},Pe.d=(t,e)=>{for(var n in e)Pe.o(e,n)&&!Pe.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},Pe.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),Pe.nmd=t=>(t.paths=[],t.children||(t.children=[]),t);var gn={};Pe.d(gn,{hT:()=>At,O4:()=>ns,Kd:()=>HM,YK:()=>YM,UU:()=>ZP,Gu:()=>lv,ky:()=>vv,h4:()=>Vo,ch:()=>hc,hq:()=>wr,i5:()=>bv});var FM=Pe(737),RM=Pe.n(FM);function uu(t){if(!Ud(t))throw new Error("Parameter was not an error")}function Ud(t){return!!t&&typeof t=="object"&&(e=t,Object.prototype.toString.call(e)==="[object Error]")||t instanceof Error;var e}class Tt extends Error{constructor(e,n){const s=[...arguments],{options:r,shortMessage:i}=function(a){let c,u="";if(a.length===0)c={};else if(Ud(a[0]))c={cause:a[0]},u=a.slice(1).join(" ")||"";else if(a[0]&&typeof a[0]=="object")c=Object.assign({},a[0]),u=a.slice(1).join(" ")||"";else{if(typeof a[0]!="string")throw new Error("Invalid arguments passed to Layerr");c={},u=u=a.join(" ")||""}return{options:c,shortMessage:u}}(s);let o=i;if(r.cause&&(o=`${o}: ${r.cause.message}`),super(o),this.message=o,r.name&&typeof r.name=="string"?this.name=r.name:this.name="Layerr",r.cause&&Object.defineProperty(this,"_cause",{value:r.cause}),Object.defineProperty(this,"_info",{value:{}}),r.info&&typeof r.info=="object"&&Object.assign(this._info,r.info),Error.captureStackTrace){const a=r.constructorOpt||this.constructor;Error.captureStackTrace(this,a)}}static cause(e){return uu(e),e._cause&&Ud(e._cause)?e._cause:null}static fullStack(e){uu(e);const n=Tt.cause(e);return n?`${e.stack}
caused by: ${Tt.fullStack(n)}`:e.stack??""}static info(e){uu(e);const n={},s=Tt.cause(e);return s&&Object.assign(n,Tt.info(s)),e._info&&Object.assign(n,e._info),n}toString(){let e=this.name||this.constructor.name||this.constructor.prototype.name;return this.message&&(e=`${e}: ${this.message}`),e}}var LM=Pe(47),Ol=Pe.n(LM);const ex="__PATH_SEPARATOR_POSIX__",tx="__PATH_SEPARATOR_WINDOWS__";function Ve(t){try{const e=t.replace(/\//g,ex).replace(/\\\\/g,tx);return encodeURIComponent(e).split(tx).join("\\\\").split(ex).join("/")}catch(e){throw new Tt(e,"Failed encoding path")}}function nx(t){return t.startsWith("/")?t:"/"+t}function To(t){let e=t;return e[0]!=="/"&&(e="/"+e),/^.+\/$/.test(e)&&(e=e.substr(0,e.length-1)),e}function BM(t){let e=new(RM())(t).pathname;return e.length<=0&&(e="/"),To(e)}function He(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(){return function(s){var r=[];if(s.length===0)return"";if(typeof s[0]!="string")throw new TypeError("Url must be a string. Received "+s[0]);if(s[0].match(/^[^/:]+:\/*$/)&&s.length>1){var i=s.shift();s[0]=i+s[0]}s[0].match(/^file:\/\/\//)?s[0]=s[0].replace(/^([^/:]+):\/*/,"$1:///"):s[0]=s[0].replace(/^([^/:]+):\/*/,"$1://");for(var o=0;o<s.length;o++){var a=s[o];if(typeof a!="string")throw new TypeError("Url must be a string. Received "+a);a!==""&&(o>0&&(a=a.replace(/^[\/]+/,"")),a=o<s.length-1?a.replace(/[\/]+$/,""):a.replace(/[\/]+$/,"/"),r.push(a))}var c=r.join("/"),u=(c=c.replace(/\/(\?|&|#[^!])/g,"$1")).split("?");return u.shift()+(u.length>0?"?":"")+u.join("&")}(typeof arguments[0]=="object"?arguments[0]:[].slice.call(arguments))}(e.reduce((s,r,i)=>((i===0||r!=="/"||r==="/"&&s[s.length-1]!=="/")&&s.push(r),s),[]))}var $M=Pe(542),Oi=Pe.n($M);const UM="abcdef0123456789";function sx(t,e){const n=t.url.replace("//",""),s=n.indexOf("/")==-1?"/":n.slice(n.indexOf("/")),r=t.method?t.method.toUpperCase():"GET",i=!!/(^|,)\s*auth\s*($|,)/.test(e.qop)&&"auth",o=`00000000${e.nc}`.slice(-8),a=function(h,m,g,x,v,b,p){const y=p||Oi()(`${m}:${g}:${x}`);return h&&h.toLowerCase()==="md5-sess"?Oi()(`${y}:${v}:${b}`):y}(e.algorithm,e.username,e.realm,e.password,e.nonce,e.cnonce,e.ha1),c=Oi()(`${r}:${s}`),u=i?Oi()(`${a}:${e.nonce}:${o}:${e.cnonce}:${i}:${c}`):Oi()(`${a}:${e.nonce}:${c}`),d={username:e.username,realm:e.realm,nonce:e.nonce,uri:s,qop:i,response:u,nc:o,cnonce:e.cnonce,algorithm:e.algorithm,opaque:e.opaque},f=[];for(const h in d)d[h]&&(h==="qop"||h==="nc"||h==="algorithm"?f.push(`${h}=${d[h]}`):f.push(`${h}="${d[h]}"`));return`Digest ${f.join(", ")}`}function iv(t){return(t.headers&&t.headers.get("www-authenticate")||"").split(/\s/)[0].toLowerCase()==="digest"}var WM=Pe(101),ov=Pe.n(WM);function rx(t){return ov().decode(t)}function ix(t,e){var n;return`Basic ${n=`${t}:${e}`,ov().encode(n)}`}const Tl=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?self:typeof window<"u"?window:globalThis,VM=Tl.fetch.bind(Tl),HM=Tl.Request,YM=Tl.Response;let At=function(t){return t.Auto="auto",t.Digest="digest",t.None="none",t.Password="password",t.Token="token",t}({}),ns=function(t){return t.DataTypeNoLength="data-type-no-length",t.InvalidAuthType="invalid-auth-type",t.InvalidOutputFormat="invalid-output-format",t.LinkUnsupportedAuthType="link-unsupported-auth",t.InvalidUpdateRange="invalid-update-range",t.NotSupported="not-supported",t}({});function av(t,e,n,s,r){switch(t.authType){case At.Auto:e&&n&&(t.headers.Authorization=ix(e,n));break;case At.Digest:t.digest=function(o,a,c){return{username:o,password:a,ha1:c,nc:0,algorithm:"md5",hasDigestAuth:!1}}(e,n,r);break;case At.None:break;case At.Password:t.headers.Authorization=ix(e,n);break;case At.Token:t.headers.Authorization=`${(i=s).token_type} ${i.access_token}`;break;default:throw new Tt({info:{code:ns.InvalidAuthType}},`Invalid auth type: ${t.authType}`)}var i}Pe(345),Pe(800);const ox="@@HOTPATCHER",KM=()=>{};function du(t){return{original:t,methods:[t],final:!1}}class GM{constructor(){this._configuration={registry:{},getEmptyAction:"null"},this.__type__=ox}get configuration(){return this._configuration}get getEmptyAction(){return this.configuration.getEmptyAction}set getEmptyAction(e){this.configuration.getEmptyAction=e}control(e){let n=arguments.length>1&&arguments[1]!==void 0&&arguments[1];if(!e||e.__type__!==ox)throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");return Object.keys(e.configuration.registry).forEach(s=>{this.configuration.registry.hasOwnProperty(s)?n&&(this.configuration.registry[s]=Object.assign({},e.configuration.registry[s])):this.configuration.registry[s]=Object.assign({},e.configuration.registry[s])}),e._configuration=this.configuration,this}execute(e){const n=this.get(e)||KM;for(var s=arguments.length,r=new Array(s>1?s-1:0),i=1;i<s;i++)r[i-1]=arguments[i];return n(...r)}get(e){const n=this.configuration.registry[e];if(!n)switch(this.getEmptyAction){case"null":return null;case"throw":throw new Error(`Failed handling method request: No method provided for override: ${e}`);default:throw new Error(`Failed handling request which resulted in an empty method: Invalid empty-action specified: ${this.getEmptyAction}`)}return function(){for(var s=arguments.length,r=new Array(s),i=0;i<s;i++)r[i]=arguments[i];if(r.length===0)throw new Error("Failed creating sequence: No functions provided");return function(){for(var o=arguments.length,a=new Array(o),c=0;c<o;c++)a[c]=arguments[c];let u=a;const d=this;for(;r.length>0;)u=[r.shift().apply(d,u)];return u[0]}}(...n.methods)}isPatched(e){return!!this.configuration.registry[e]}patch(e,n){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{chain:r=!1}=s;if(this.configuration.registry[e]&&this.configuration.registry[e].final)throw new Error(`Failed patching '${e}': Method marked as being final`);if(typeof n!="function")throw new Error(`Failed patching '${e}': Provided method is not a function`);if(r)this.configuration.registry[e]?this.configuration.registry[e].methods.push(n):this.configuration.registry[e]=du(n);else if(this.isPatched(e)){const{original:i}=this.configuration.registry[e];this.configuration.registry[e]=Object.assign(du(n),{original:i})}else this.configuration.registry[e]=du(n);return this}patchInline(e,n){this.isPatched(e)||this.patch(e,n);for(var s=arguments.length,r=new Array(s>2?s-2:0),i=2;i<s;i++)r[i-2]=arguments[i];return this.execute(e,...r)}plugin(e){for(var n=arguments.length,s=new Array(n>1?n-1:0),r=1;r<n;r++)s[r-1]=arguments[r];return s.forEach(i=>{this.patch(e,i,{chain:!0})}),this}restore(e){if(!this.isPatched(e))throw new Error(`Failed restoring method: No method present for key: ${e}`);if(typeof this.configuration.registry[e].original!="function")throw new Error(`Failed restoring method: Original method not found or of invalid type for key: ${e}`);return this.configuration.registry[e].methods=[this.configuration.registry[e].original],this}setFinal(e){if(!this.configuration.registry.hasOwnProperty(e))throw new Error(`Failed marking '${e}' as final: No method found for key`);return this.configuration.registry[e].final=!0,this}}let fu=null;function lv(){return fu||(fu=new GM),fu}function zl(t){return function(e){if(typeof e!="object"||e===null||Object.prototype.toString.call(e)!="[object Object]")return!1;if(Object.getPrototypeOf(e)===null)return!0;let n=e;for(;Object.getPrototypeOf(n)!==null;)n=Object.getPrototypeOf(n);return Object.getPrototypeOf(e)===n}(t)?Object.assign({},t):Object.setPrototypeOf(Object.assign({},t),Object.getPrototypeOf(t))}function ax(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];let s=null,r=[...e];for(;r.length>0;){const i=r.shift();s=s?cv(s,i):zl(i)}return s}function cv(t,e){const n=zl(t);return Object.keys(e).forEach(s=>{n.hasOwnProperty(s)?Array.isArray(e[s])?n[s]=Array.isArray(n[s])?[...n[s],...e[s]]:[...e[s]]:typeof e[s]=="object"&&e[s]?n[s]=typeof n[s]=="object"&&n[s]?cv(n[s],e[s]):zl(e[s]):n[s]=e[s]:n[s]=e[s]}),n}function qM(t){const e={};for(const n of t.keys())e[n]=t.get(n);return e}function Wd(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];if(e.length===0)return{};const s={};return e.reduce((r,i)=>(Object.keys(i).forEach(o=>{const a=o.toLowerCase();s.hasOwnProperty(a)?r[s[a]]=i[o]:(s[a]=o,r[o]=i[o])}),r),{})}Pe(805);const XM=typeof ArrayBuffer=="function",{toString:QM}=Object.prototype;function uv(t){return XM&&(t instanceof ArrayBuffer||QM.call(t)==="[object ArrayBuffer]")}function dv(t){return t!=null&&t.constructor!=null&&typeof t.constructor.isBuffer=="function"&&t.constructor.isBuffer(t)}function xh(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}function Vd(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const fv=xh(function(t){const e=t._digest;return delete t._digest,e.hasDigestAuth&&(t=ax(t,{headers:{Authorization:sx(t,e)}})),Vd(Il(t),function(n){let s=!1;return r=function(o){return s?o:n},(i=function(){if(n.status==401)return e.hasDigestAuth=function(o,a){if(!iv(o))return!1;const c=/([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;for(;;){const u=o.headers&&o.headers.get("www-authenticate")||"",d=c.exec(u);if(!d)break;a[d[1]]=d[2]||d[3]}return a.nc+=1,a.cnonce=function(){let u="";for(let d=0;d<32;++d)u=`${u}${UM[Math.floor(16*Math.random())]}`;return u}(),!0}(n,e),function(){if(e.hasDigestAuth)return Vd(Il(t=ax(t,{headers:{Authorization:sx(t,e)}})),function(o){return o.status==401?e.hasDigestAuth=!1:e.nc++,s=!0,o})}();e.nc++}())&&i.then?i.then(r):r(i);var r,i})}),ZM=xh(function(t,e){return Vd(Il(t),function(n){return n.ok?(e.authType=At.Password,n):n.status==401&&iv(n)?(e.authType=At.Digest,av(e,e.username,e.password,void 0,void 0),t._digest=e.digest,fv(t)):n})}),ut=xh(function(t,e){return e.authType===At.Auto?ZM(t,e):t._digest?fv(t):Il(t)});function dt(t,e,n){const s=zl(t);return s.headers=Wd(e.headers,s.headers||{},n.headers||{}),n.data!==void 0&&(s.data=n.data),n.signal&&(s.signal=n.signal),e.httpAgent&&(s.httpAgent=e.httpAgent),e.httpsAgent&&(s.httpsAgent=e.httpsAgent),e.digest&&(s._digest=e.digest),typeof e.withCredentials=="boolean"&&(s.withCredentials=e.withCredentials),s}function Il(t){const e=lv();return e.patchInline("request",n=>e.patchInline("fetch",VM,n.url,function(s){let r={};const i={method:s.method};if(s.headers&&(r=Wd(r,s.headers)),s.data!==void 0){const[o,a]=function(c){if(typeof c=="string")return[c,{}];if(dv(c))return[c,{}];if(uv(c))return[c,{}];if(c&&typeof c=="object")return[JSON.stringify(c),{"content-type":"application/json"}];throw new Error("Unable to convert request body: Unexpected body type: "+typeof c)}(s.data);i.body=o,r=Wd(r,a)}return s.signal&&(i.signal=s.signal),s.withCredentials&&(i.credentials="include"),i.headers=r,i}(n)),t)}var JM=Pe(285);const Fl=t=>{if(typeof t!="string")throw new TypeError("invalid pattern");if(t.length>65536)throw new TypeError("pattern is too long")},eP={"[:alnum:]":["\\p{L}\\p{Nl}\\p{Nd}",!0],"[:alpha:]":["\\p{L}\\p{Nl}",!0],"[:ascii:]":["\\x00-\\x7f",!1],"[:blank:]":["\\p{Zs}\\t",!0],"[:cntrl:]":["\\p{Cc}",!0],"[:digit:]":["\\p{Nd}",!0],"[:graph:]":["\\p{Z}\\p{C}",!0,!0],"[:lower:]":["\\p{Ll}",!0],"[:print:]":["\\p{C}",!0],"[:punct:]":["\\p{P}",!0],"[:space:]":["\\p{Z}\\t\\r\\n\\v\\f",!0],"[:upper:]":["\\p{Lu}",!0],"[:word:]":["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}",!0],"[:xdigit:]":["A-Fa-f0-9",!1]},Ti=t=>t.replace(/[[\]\\-]/g,"\\$&"),lx=t=>t.join(""),tP=(t,e)=>{const n=e;if(t.charAt(n)!=="[")throw new Error("not in a brace expression");const s=[],r=[];let i=n+1,o=!1,a=!1,c=!1,u=!1,d=n,f="";e:for(;i<t.length;){const x=t.charAt(i);if(x!=="!"&&x!=="^"||i!==n+1){if(x==="]"&&o&&!c){d=i+1;break}if(o=!0,x!=="\\"||c){if(x==="["&&!c){for(const[v,[b,p,y]]of Object.entries(eP))if(t.startsWith(v,i)){if(f)return["$.",!1,t.length-n,!0];i+=v.length,y?r.push(b):s.push(b),a=a||p;continue e}}c=!1,f?(x>f?s.push(Ti(f)+"-"+Ti(x)):x===f&&s.push(Ti(x)),f="",i++):t.startsWith("-]",i+1)?(s.push(Ti(x+"-")),i+=2):t.startsWith("-",i+1)?(f=x,i+=2):(s.push(Ti(x)),i++)}else c=!0,i++}else u=!0,i++}if(d<i)return["",!1,0,!1];if(!s.length&&!r.length)return["$.",!1,t.length-n,!0];if(r.length===0&&s.length===1&&/^\\?.$/.test(s[0])&&!u)return[(h=s[0].length===2?s[0].slice(-1):s[0],h.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")),!1,d-n,!1];var h;const m="["+(u?"^":"")+lx(s)+"]",g="["+(u?"":"^")+lx(r)+"]";return[s.length&&r.length?"("+m+"|"+g+")":s.length?m:g,a,d-n,!0]},Wi=function(t){let{windowsPathsNoEscape:e=!1}=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e?t.replace(/\[([^\/\\])\]/g,"$1"):t.replace(/((?!\\).|^)\[([^\/\\])\]/g,"$1$2").replace(/\\([^\/])/g,"$1")},nP=new Set(["!","?","+","*","@"]),cx=t=>nP.has(t),hu="(?!\\.)",sP=new Set(["[","."]),rP=new Set(["..","."]),iP=new Set("().*{}+?[]^$\\!"),yh="[^/]",ux=yh+"*?",dx=yh+"+?";var it,pt,Hn,Re,tt,hs,sr,ps,Dn,rr,zo,gr,hv,Os,Qa,Hd,pv;const Mt=class Mt{constructor(e,n){Lt(this,gr);ee(this,"type");Lt(this,it);Lt(this,pt);Lt(this,Hn,!1);Lt(this,Re,[]);Lt(this,tt);Lt(this,hs);Lt(this,sr);Lt(this,ps,!1);Lt(this,Dn);Lt(this,rr);Lt(this,zo,!1);let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};this.type=e,e&&Qe(this,pt,!0),Qe(this,tt,n),Qe(this,it,Z(this,tt)?Z(Z(this,tt),it):this),Qe(this,Dn,Z(this,it)===this?s:Z(Z(this,it),Dn)),Qe(this,sr,Z(this,it)===this?[]:Z(Z(this,it),sr)),e!=="!"||Z(Z(this,it),ps)||Z(this,sr).push(this),Qe(this,hs,Z(this,tt)?Z(Z(this,tt),Re).length:0)}get hasMagic(){if(Z(this,pt)!==void 0)return Z(this,pt);for(const e of Z(this,Re))if(typeof e!="string"&&(e.type||e.hasMagic))return Qe(this,pt,!0);return Z(this,pt)}toString(){return Z(this,rr)!==void 0?Z(this,rr):this.type?Qe(this,rr,this.type+"("+Z(this,Re).map(e=>String(e)).join("|")+")"):Qe(this,rr,Z(this,Re).map(e=>String(e)).join(""))}push(){for(var e=arguments.length,n=new Array(e),s=0;s<e;s++)n[s]=arguments[s];for(const r of n)if(r!==""){if(typeof r!="string"&&!(r instanceof Mt&&Z(r,tt)===this))throw new Error("invalid part: "+r);Z(this,Re).push(r)}}toJSON(){var n;const e=this.type===null?Z(this,Re).slice().map(s=>typeof s=="string"?s:s.toJSON()):[this.type,...Z(this,Re).map(s=>s.toJSON())];return this.isStart()&&!this.type&&e.unshift([]),this.isEnd()&&(this===Z(this,it)||Z(Z(this,it),ps)&&((n=Z(this,tt))==null?void 0:n.type)==="!")&&e.push({}),e}isStart(){var n;if(Z(this,it)===this)return!0;if(!((n=Z(this,tt))!=null&&n.isStart()))return!1;if(Z(this,hs)===0)return!0;const e=Z(this,tt);for(let s=0;s<Z(this,hs);s++){const r=Z(e,Re)[s];if(!(r instanceof Mt&&r.type==="!"))return!1}return!0}isEnd(){var n,s,r;if(Z(this,it)===this||((n=Z(this,tt))==null?void 0:n.type)==="!")return!0;if(!((s=Z(this,tt))!=null&&s.isEnd()))return!1;if(!this.type)return(r=Z(this,tt))==null?void 0:r.isEnd();const e=Z(this,tt)?Z(Z(this,tt),Re).length:0;return Z(this,hs)===e-1}copyIn(e){typeof e=="string"?this.push(e):this.push(e.clone(this))}clone(e){const n=new Mt(this.type,e);for(const s of Z(this,Re))n.copyIn(s);return n}static fromGlob(e){var r;let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const s=new Mt(null,void 0,n);return os(r=Mt,Os,Qa).call(r,e,s,0,n),s}toMMPattern(){if(this!==Z(this,it))return Z(this,it).toMMPattern();const e=this.toString(),[n,s,r,i]=this.toRegExpSource();if(!(r||Z(this,pt)||Z(this,Dn).nocase&&!Z(this,Dn).nocaseMagicOnly&&e.toUpperCase()!==e.toLowerCase()))return s;const o=(Z(this,Dn).nocase?"i":"")+(i?"u":"");return Object.assign(new RegExp(`^${n}$`,o),{_src:n,_glob:e})}get options(){return Z(this,Dn)}toRegExpSource(e){var c;const n=e??!!Z(this,Dn).dot;if(Z(this,it)===this&&os(this,gr,hv).call(this),!this.type){const u=this.isStart()&&this.isEnd(),d=Z(this,Re).map(m=>{var p;const[g,x,v,b]=typeof m=="string"?os(p=Mt,Os,pv).call(p,m,Z(this,pt),u):m.toRegExpSource(e);return Qe(this,pt,Z(this,pt)||v),Qe(this,Hn,Z(this,Hn)||b),g}).join("");let f="";if(this.isStart()&&typeof Z(this,Re)[0]=="string"&&(Z(this,Re).length!==1||!rP.has(Z(this,Re)[0]))){const m=sP,g=n&&m.has(d.charAt(0))||d.startsWith("\\.")&&m.has(d.charAt(2))||d.startsWith("\\.\\.")&&m.has(d.charAt(4)),x=!n&&!e&&m.has(d.charAt(0));f=g?"(?!(?:^|/)\\.\\.?(?:$|/))":x?hu:""}let h="";return this.isEnd()&&Z(Z(this,it),ps)&&((c=Z(this,tt))==null?void 0:c.type)==="!"&&(h="(?:$|\\/)"),[f+d+h,Wi(d),Qe(this,pt,!!Z(this,pt)),Z(this,Hn)]}const s=this.type==="*"||this.type==="+",r=this.type==="!"?"(?:(?!(?:":"(?:";let i=os(this,gr,Hd).call(this,n);if(this.isStart()&&this.isEnd()&&!i&&this.type!=="!"){const u=this.toString();return Qe(this,Re,[u]),this.type=null,Qe(this,pt,void 0),[u,Wi(this.toString()),!1,!1]}let o=!s||e||n?"":os(this,gr,Hd).call(this,!0);o===i&&(o=""),o&&(i=`(?:${i})(?:${o})*?`);let a="";return a=this.type==="!"&&Z(this,zo)?(this.isStart()&&!n?hu:"")+dx:r+i+(this.type==="!"?"))"+(!this.isStart()||n||e?"":hu)+ux+")":this.type==="@"?")":this.type==="?"?")?":this.type==="+"&&o?")":this.type==="*"&&o?")?":`)${this.type}`),[a,Wi(i),Qe(this,pt,!!Z(this,pt)),Z(this,Hn)]}};it=new WeakMap,pt=new WeakMap,Hn=new WeakMap,Re=new WeakMap,tt=new WeakMap,hs=new WeakMap,sr=new WeakMap,ps=new WeakMap,Dn=new WeakMap,rr=new WeakMap,zo=new WeakMap,gr=new WeakSet,hv=function(){if(this!==Z(this,it))throw new Error("should only call on root");if(Z(this,ps))return this;let e;for(this.toString(),Qe(this,ps,!0);e=Z(this,sr).pop();){if(e.type!=="!")continue;let n=e,s=Z(n,tt);for(;s;){for(let r=Z(n,hs)+1;!s.type&&r<Z(s,Re).length;r++)for(const i of Z(e,Re)){if(typeof i=="string")throw new Error("string part in extglob AST??");i.copyIn(Z(s,Re)[r])}n=s,s=Z(n,tt)}}return this},Os=new WeakSet,Qa=function(e,n,s,r){var m,g;let i=!1,o=!1,a=-1,c=!1;if(n.type===null){let x=s,v="";for(;x<e.length;){const b=e.charAt(x++);if(i||b==="\\")i=!i,v+=b;else if(o)x===a+1?b!=="^"&&b!=="!"||(c=!0):b!=="]"||x===a+2&&c||(o=!1),v+=b;else if(b!=="[")if(r.noext||!cx(b)||e.charAt(x)!=="(")v+=b;else{n.push(v),v="";const p=new Mt(b,n);x=os(m=Mt,Os,Qa).call(m,e,p,x,r),n.push(p)}else o=!0,a=x,c=!1,v+=b}return n.push(v),x}let u=s+1,d=new Mt(null,n);const f=[];let h="";for(;u<e.length;){const x=e.charAt(u++);if(i||x==="\\")i=!i,h+=x;else if(o)u===a+1?x!=="^"&&x!=="!"||(c=!0):x!=="]"||u===a+2&&c||(o=!1),h+=x;else if(x!=="[")if(cx(x)&&e.charAt(u)==="("){d.push(h),h="";const v=new Mt(x,d);d.push(v),u=os(g=Mt,Os,Qa).call(g,e,v,u,r)}else if(x!=="|"){if(x===")")return h===""&&Z(n,Re).length===0&&Qe(n,zo,!0),d.push(h),h="",n.push(...f,d),u;h+=x}else d.push(h),h="",f.push(d),d=new Mt(null,n);else o=!0,a=u,c=!1,h+=x}return n.type=null,Qe(n,pt,void 0),Qe(n,Re,[e.substring(s-1)]),u},Hd=function(e){return Z(this,Re).map(n=>{if(typeof n=="string")throw new Error("string type in extglob ast??");const[s,r,i,o]=n.toRegExpSource(e);return Qe(this,Hn,Z(this,Hn)||o),s}).filter(n=>!(this.isStart()&&this.isEnd()&&!n)).join("|")},pv=function(e,n){let s=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=!1,i="",o=!1;for(let a=0;a<e.length;a++){const c=e.charAt(a);if(r)r=!1,i+=(iP.has(c)?"\\":"")+c;else if(c!=="\\"){if(c==="["){const[u,d,f,h]=tP(e,a);if(f){i+=u,o=o||d,a+=f-1,n=n||h;continue}}c!=="*"?c!=="?"?i+=c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):(i+=yh,n=!0):(i+=s&&e==="*"?dx:ux,n=!0)}else a===e.length-1?i+="\\\\":r=!0}return[i,Wi(e),!!n,o]},Lt(Mt,Os);let Rl=Mt;const Nt=function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return Fl(e),!(!n.nocomment&&e.charAt(0)==="#")&&new Ll(e,n).match(t)},oP=/^\*+([^+@!?\*\[\(]*)$/,aP=t=>e=>!e.startsWith(".")&&e.endsWith(t),lP=t=>e=>e.endsWith(t),cP=t=>(t=t.toLowerCase(),e=>!e.startsWith(".")&&e.toLowerCase().endsWith(t)),uP=t=>(t=t.toLowerCase(),e=>e.toLowerCase().endsWith(t)),dP=/^\*+\.\*+$/,fP=t=>!t.startsWith(".")&&t.includes("."),hP=t=>t!=="."&&t!==".."&&t.includes("."),pP=/^\.\*+$/,mP=t=>t!=="."&&t!==".."&&t.startsWith("."),gP=/^\*+$/,xP=t=>t.length!==0&&!t.startsWith("."),yP=t=>t.length!==0&&t!=="."&&t!=="..",vP=/^\?+([^+@!?\*\[\(]*)?$/,bP=t=>{let[e,n=""]=t;const s=mv([e]);return n?(n=n.toLowerCase(),r=>s(r)&&r.toLowerCase().endsWith(n)):s},wP=t=>{let[e,n=""]=t;const s=gv([e]);return n?(n=n.toLowerCase(),r=>s(r)&&r.toLowerCase().endsWith(n)):s},kP=t=>{let[e,n=""]=t;const s=gv([e]);return n?r=>s(r)&&r.endsWith(n):s},jP=t=>{let[e,n=""]=t;const s=mv([e]);return n?r=>s(r)&&r.endsWith(n):s},mv=t=>{let[e]=t;const n=e.length;return s=>s.length===n&&!s.startsWith(".")},gv=t=>{let[e]=t;const n=e.length;return s=>s.length===n&&s!=="."&&s!==".."},xv=typeof process=="object"&&process?typeof cu=="object"&&cu&&cu.__MINIMATCH_TESTING_PLATFORM__||process.platform:"posix";Nt.sep=xv==="win32"?"\\":"/";const on=Symbol("globstar **");Nt.GLOBSTAR=on,Nt.filter=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return n=>Nt(n,t,e)};const rn=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Object.assign({},t,e)};Nt.defaults=t=>{if(!t||typeof t!="object"||!Object.keys(t).length)return Nt;const e=Nt;return Object.assign(function(n,s){return e(n,s,rn(t,arguments.length>2&&arguments[2]!==void 0?arguments[2]:{}))},{Minimatch:class extends e.Minimatch{constructor(n){super(n,rn(t,arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}))}static defaults(n){return e.defaults(rn(t,n)).Minimatch}},AST:class extends e.AST{constructor(n,s){super(n,s,rn(t,arguments.length>2&&arguments[2]!==void 0?arguments[2]:{}))}static fromGlob(n){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e.AST.fromGlob(n,rn(t,s))}},unescape:function(n){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e.unescape(n,rn(t,s))},escape:function(n){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e.escape(n,rn(t,s))},filter:function(n){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e.filter(n,rn(t,s))},defaults:n=>e.defaults(rn(t,n)),makeRe:function(n){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e.makeRe(n,rn(t,s))},braceExpand:function(n){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e.braceExpand(n,rn(t,s))},match:function(n,s){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return e.match(n,s,rn(t,r))},sep:e.sep,GLOBSTAR:on})};const yv=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Fl(t),e.nobrace||!/\{(?:(?!\{).)*\}/.test(t)?[t]:JM(t)};Nt.braceExpand=yv,Nt.makeRe=function(t){return new Ll(t,arguments.length>1&&arguments[1]!==void 0?arguments[1]:{}).makeRe()},Nt.match=function(t,e){const n=new Ll(e,arguments.length>2&&arguments[2]!==void 0?arguments[2]:{});return t=t.filter(s=>n.match(s)),n.options.nonull&&!t.length&&t.push(e),t};const fx=/[?*]|[+@!]\(.*?\)|\[|\]/;class Ll{constructor(e){ee(this,"options");ee(this,"set");ee(this,"pattern");ee(this,"windowsPathsNoEscape");ee(this,"nonegate");ee(this,"negate");ee(this,"comment");ee(this,"empty");ee(this,"preserveMultipleSlashes");ee(this,"partial");ee(this,"globSet");ee(this,"globParts");ee(this,"nocase");ee(this,"isWindows");ee(this,"platform");ee(this,"windowsNoMagicRoot");ee(this,"regexp");let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};Fl(e),n=n||{},this.options=n,this.pattern=e,this.platform=n.platform||xv,this.isWindows=this.platform==="win32",this.windowsPathsNoEscape=!!n.windowsPathsNoEscape||n.allowWindowsEscape===!1,this.windowsPathsNoEscape&&(this.pattern=this.pattern.replace(/\\/g,"/")),this.preserveMultipleSlashes=!!n.preserveMultipleSlashes,this.regexp=null,this.negate=!1,this.nonegate=!!n.nonegate,this.comment=!1,this.empty=!1,this.partial=!!n.partial,this.nocase=!!this.options.nocase,this.windowsNoMagicRoot=n.windowsNoMagicRoot!==void 0?n.windowsNoMagicRoot:!(!this.isWindows||!this.nocase),this.globSet=[],this.globParts=[],this.set=[],this.make()}hasMagic(){if(this.options.magicalBraces&&this.set.length>1)return!0;for(const e of this.set)for(const n of e)if(typeof n!="string")return!0;return!1}debug(){}make(){const e=this.pattern,n=this.options;if(!n.nocomment&&e.charAt(0)==="#")return void(this.comment=!0);if(!e)return void(this.empty=!0);this.parseNegate(),this.globSet=[...new Set(this.braceExpand())],n.debug&&(this.debug=function(){return console.error(...arguments)}),this.debug(this.pattern,this.globSet);const s=this.globSet.map(i=>this.slashSplit(i));this.globParts=this.preprocess(s),this.debug(this.pattern,this.globParts);let r=this.globParts.map((i,o,a)=>{if(this.isWindows&&this.windowsNoMagicRoot){const c=!(i[0]!==""||i[1]!==""||i[2]!=="?"&&fx.test(i[2])||fx.test(i[3])),u=/^[a-z]:/i.test(i[0]);if(c)return[...i.slice(0,4),...i.slice(4).map(d=>this.parse(d))];if(u)return[i[0],...i.slice(1).map(d=>this.parse(d))]}return i.map(c=>this.parse(c))});if(this.debug(this.pattern,r),this.set=r.filter(i=>i.indexOf(!1)===-1),this.isWindows)for(let i=0;i<this.set.length;i++){const o=this.set[i];o[0]===""&&o[1]===""&&this.globParts[i][2]==="?"&&typeof o[3]=="string"&&/^[a-z]:$/i.test(o[3])&&(o[2]="?")}this.debug(this.pattern,this.set)}preprocess(e){if(this.options.noglobstar)for(let s=0;s<e.length;s++)for(let r=0;r<e[s].length;r++)e[s][r]==="**"&&(e[s][r]="*");const{optimizationLevel:n=1}=this.options;return n>=2?(e=this.firstPhasePreProcess(e),e=this.secondPhasePreProcess(e)):e=n>=1?this.levelOneOptimize(e):this.adjascentGlobstarOptimize(e),e}adjascentGlobstarOptimize(e){return e.map(n=>{let s=-1;for(;(s=n.indexOf("**",s+1))!==-1;){let r=s;for(;n[r+1]==="**";)r++;r!==s&&n.splice(s,r-s)}return n})}levelOneOptimize(e){return e.map(n=>(n=n.reduce((s,r)=>{const i=s[s.length-1];return r==="**"&&i==="**"?s:r===".."&&i&&i!==".."&&i!=="."&&i!=="**"?(s.pop(),s):(s.push(r),s)},[])).length===0?[""]:n)}levelTwoFileOptimize(e){Array.isArray(e)||(e=this.slashSplit(e));let n=!1;do{if(n=!1,!this.preserveMultipleSlashes){for(let r=1;r<e.length-1;r++){const i=e[r];r===1&&i===""&&e[0]===""||i!=="."&&i!==""||(n=!0,e.splice(r,1),r--)}e[0]!=="."||e.length!==2||e[1]!=="."&&e[1]!==""||(n=!0,e.pop())}let s=0;for(;(s=e.indexOf("..",s+1))!==-1;){const r=e[s-1];r&&r!=="."&&r!==".."&&r!=="**"&&(n=!0,e.splice(s-1,2),s-=2)}}while(n);return e.length===0?[""]:e}firstPhasePreProcess(e){let n=!1;do{n=!1;for(let s of e){let r=-1;for(;(r=s.indexOf("**",r+1))!==-1;){let o=r;for(;s[o+1]==="**";)o++;o>r&&s.splice(r+1,o-r);let a=s[r+1];const c=s[r+2],u=s[r+3];if(a!==".."||!c||c==="."||c===".."||!u||u==="."||u==="..")continue;n=!0,s.splice(r,1);const d=s.slice(0);d[r]="**",e.push(d),r--}if(!this.preserveMultipleSlashes){for(let o=1;o<s.length-1;o++){const a=s[o];o===1&&a===""&&s[0]===""||a!=="."&&a!==""||(n=!0,s.splice(o,1),o--)}s[0]!=="."||s.length!==2||s[1]!=="."&&s[1]!==""||(n=!0,s.pop())}let i=0;for(;(i=s.indexOf("..",i+1))!==-1;){const o=s[i-1];if(o&&o!=="."&&o!==".."&&o!=="**"){n=!0;const a=i===1&&s[i+1]==="**"?["."]:[];s.splice(i-1,2,...a),s.length===0&&s.push(""),i-=2}}}}while(n);return e}secondPhasePreProcess(e){for(let n=0;n<e.length-1;n++)for(let s=n+1;s<e.length;s++){const r=this.partsMatch(e[n],e[s],!this.preserveMultipleSlashes);if(r){e[n]=[],e[s]=r;break}}return e.filter(n=>n.length)}partsMatch(e,n){let s=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=0,i=0,o=[],a="";for(;r<e.length&&i<n.length;)if(e[r]===n[i])o.push(a==="b"?n[i]:e[r]),r++,i++;else if(s&&e[r]==="**"&&n[i]===e[r+1])o.push(e[r]),r++;else if(s&&n[i]==="**"&&e[r]===n[i+1])o.push(n[i]),i++;else if(e[r]!=="*"||!n[i]||!this.options.dot&&n[i].startsWith(".")||n[i]==="**"){if(n[i]!=="*"||!e[r]||!this.options.dot&&e[r].startsWith(".")||e[r]==="**"||a==="a")return!1;a="b",o.push(n[i]),r++,i++}else{if(a==="b")return!1;a="a",o.push(e[r]),r++,i++}return e.length===n.length&&o}parseNegate(){if(this.nonegate)return;const e=this.pattern;let n=!1,s=0;for(let r=0;r<e.length&&e.charAt(r)==="!";r++)n=!n,s++;s&&(this.pattern=e.slice(s)),this.negate=n}matchOne(e,n){let s=arguments.length>2&&arguments[2]!==void 0&&arguments[2];const r=this.options;if(this.isWindows){const x=typeof e[0]=="string"&&/^[a-z]:$/i.test(e[0]),v=!x&&e[0]===""&&e[1]===""&&e[2]==="?"&&/^[a-z]:$/i.test(e[3]),b=typeof n[0]=="string"&&/^[a-z]:$/i.test(n[0]),p=v?3:x?0:void 0,y=!b&&n[0]===""&&n[1]===""&&n[2]==="?"&&typeof n[3]=="string"&&/^[a-z]:$/i.test(n[3])?3:b?0:void 0;if(typeof p=="number"&&typeof y=="number"){const[_,j]=[e[p],n[y]];_.toLowerCase()===j.toLowerCase()&&(n[y]=_,y>p?n=n.slice(y):p>y&&(e=e.slice(p)))}}const{optimizationLevel:i=1}=this.options;i>=2&&(e=this.levelTwoFileOptimize(e)),this.debug("matchOne",this,{file:e,pattern:n}),this.debug("matchOne",e.length,n.length);for(var o=0,a=0,c=e.length,u=n.length;o<c&&a<u;o++,a++){this.debug("matchOne loop");var d=n[a],f=e[o];if(this.debug(n,d,f),d===!1)return!1;if(d===on){this.debug("GLOBSTAR",[n,d,f]);var h=o,m=a+1;if(m===u){for(this.debug("** at the end");o<c;o++)if(e[o]==="."||e[o]===".."||!r.dot&&e[o].charAt(0)===".")return!1;return!0}for(;h<c;){var g=e[h];if(this.debug(`
globstar while`,e,h,n,m,g),this.matchOne(e.slice(h),n.slice(m),s))return this.debug("globstar found match!",h,c,g),!0;if(g==="."||g===".."||!r.dot&&g.charAt(0)==="."){this.debug("dot detected!",e,h,n,m);break}this.debug("globstar swallow a segment, and continue"),h++}return!(!s||(this.debug(`
>>> no match, partial?`,e,h,n,m),h!==c))}let x;if(typeof d=="string"?(x=f===d,this.debug("string match",d,f,x)):(x=d.test(f),this.debug("pattern match",d,f,x)),!x)return!1}if(o===c&&a===u)return!0;if(o===c)return s;if(a===u)return o===c-1&&e[o]==="";throw new Error("wtf?")}braceExpand(){return yv(this.pattern,this.options)}parse(e){Fl(e);const n=this.options;if(e==="**")return on;if(e==="")return"";let s,r=null;(s=e.match(gP))?r=n.dot?yP:xP:(s=e.match(oP))?r=(n.nocase?n.dot?uP:cP:n.dot?lP:aP)(s[1]):(s=e.match(vP))?r=(n.nocase?n.dot?wP:bP:n.dot?kP:jP)(s):(s=e.match(dP))?r=n.dot?hP:fP:(s=e.match(pP))&&(r=mP);const i=Rl.fromGlob(e,this.options).toMMPattern();return r&&typeof i=="object"&&Reflect.defineProperty(i,"test",{value:r}),i}makeRe(){if(this.regexp||this.regexp===!1)return this.regexp;const e=this.set;if(!e.length)return this.regexp=!1,this.regexp;const n=this.options,s=n.noglobstar?"[^/]*?":n.dot?"(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?":"(?:(?!(?:\\/|^)\\.).)*?",r=new Set(n.nocase?["i"]:[]);let i=e.map(c=>{const u=c.map(d=>{if(d instanceof RegExp)for(const f of d.flags.split(""))r.add(f);return typeof d=="string"?d.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):d===on?on:d._src});return u.forEach((d,f)=>{const h=u[f+1],m=u[f-1];d===on&&m!==on&&(m===void 0?h!==void 0&&h!==on?u[f+1]="(?:\\/|"+s+"\\/)?"+h:u[f]=s:h===void 0?u[f-1]=m+"(?:\\/|"+s+")?":h!==on&&(u[f-1]=m+"(?:\\/|\\/"+s+"\\/)"+h,u[f+1]=on))}),u.filter(d=>d!==on).join("/")}).join("|");const[o,a]=e.length>1?["(?:",")"]:["",""];i="^"+o+i+a+"$",this.negate&&(i="^(?!"+i+").+$");try{this.regexp=new RegExp(i,[...r].join(""))}catch{this.regexp=!1}return this.regexp}slashSplit(e){return this.preserveMultipleSlashes?e.split("/"):this.isWindows&&/^\/\/[^\/]+/.test(e)?["",...e.split(/\/+/)]:e.split(/\/+/)}match(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:this.partial;if(this.debug("match",e,this.pattern),this.comment)return!1;if(this.empty)return e==="";if(e==="/"&&n)return!0;const s=this.options;this.isWindows&&(e=e.split("\\").join("/"));const r=this.slashSplit(e);this.debug(this.pattern,"split",r);const i=this.set;this.debug(this.pattern,"set",i);let o=r[r.length-1];if(!o)for(let a=r.length-2;!o&&a>=0;a--)o=r[a];for(let a=0;a<i.length;a++){const c=i[a];let u=r;if(s.matchBase&&c.length===1&&(u=[o]),this.matchOne(u,c,n))return!!s.flipNegate||!this.negate}return!s.flipNegate&&this.negate}static defaults(e){return Nt.defaults(e).Minimatch}}function vh(t){const e=new Error(`${arguments.length>1&&arguments[1]!==void 0?arguments[1]:""}Invalid response: ${t.status} ${t.statusText}`);return e.status=t.status,e.response=t,e}function ft(t,e){const{status:n}=e;if(n===401&&t.digest)return e;if(n>=400)throw vh(e);return e}function wr(t,e){return arguments.length>2&&arguments[2]!==void 0&&arguments[2]?{data:e,headers:t.headers?qM(t.headers):{},status:t.status,statusText:t.statusText}:e}Nt.AST=Rl,Nt.Minimatch=Ll,Nt.escape=function(t){let{windowsPathsNoEscape:e=!1}=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return e?t.replace(/[?*()[\]]/g,"[$&]"):t.replace(/[?*()[\]\\]/g,"\\$&")},Nt.unescape=Wi;const SP=(hx=function(t,e,n){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const r=dt({url:He(t.remoteURL,Ve(e)),method:"COPY",headers:{Destination:He(t.remoteURL,Ve(n)),Overwrite:s.overwrite===!1?"F":"T",Depth:s.shallow?"0":"infinity"}},t,s);return o=function(a){ft(t,a)},(i=ut(r,t))&&i.then||(i=Promise.resolve(i)),o?i.then(o):i;var i,o},function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];try{return Promise.resolve(hx.apply(this,t))}catch(n){return Promise.reject(n)}});var hx,bh=Pe(635),_P=Pe(829),Vn=Pe.n(_P),Ur=function(t){return t.Array="array",t.Object="object",t.Original="original",t}(Ur||{});function Aa(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ur.Original;const s=Vn().get(t,e);return n==="array"&&Array.isArray(s)===!1?[s]:n==="object"&&Array.isArray(s)?s[0]:s}function Vo(t){return new Promise(e=>{e(function(n){const{multistatus:s}=n;if(s==="")return{multistatus:{response:[]}};if(!s)throw new Error("Invalid response: No root multistatus found");const r={multistatus:Array.isArray(s)?s[0]:s};return Vn().set(r,"multistatus.response",Aa(r,"multistatus.response",Ur.Array)),Vn().set(r,"multistatus.response",Vn().get(r,"multistatus.response").map(i=>function(o){const a=Object.assign({},o);return a.status?Vn().set(a,"status",Aa(a,"status",Ur.Object)):(Vn().set(a,"propstat",Aa(a,"propstat",Ur.Object)),Vn().set(a,"propstat.prop",Aa(a,"propstat.prop",Ur.Object))),a}(i))),r}(new bh.XMLParser({allowBooleanAttributes:!0,attributeNamePrefix:"",textNodeName:"text",ignoreAttributes:!1,removeNSPrefix:!0,numberParseOptions:{hex:!0,leadingZeros:!1},attributeValueProcessor:(n,s,r)=>s==="true"||s==="false"?s==="true":s,tagValueProcessor(n,s,r){if(!r.endsWith("propstat.prop.displayname"))return s}}).parse(t)))})}function hc(t,e){let n=arguments.length>2&&arguments[2]!==void 0&&arguments[2];const{getlastmodified:s=null,getcontentlength:r="0",resourcetype:i=null,getcontenttype:o=null,getetag:a=null}=t,c=i&&typeof i=="object"&&i.collection!==void 0?"directory":"file",u={filename:e,basename:Ol().basename(e),lastmod:s,size:parseInt(r,10),type:c,etag:typeof a=="string"?a.replace(/"/g,""):null};return c==="file"&&(u.mime=o&&typeof o=="string"?o.split(";")[0]:""),n&&(t.displayname!==void 0&&(t.displayname=String(t.displayname)),u.props=t),u}function vv(t,e){let n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],s=null;try{t.multistatus.response[0].propstat&&(s=t.multistatus.response[0])}catch{}if(!s)throw new Error("Failed getting item stat: bad response");const{propstat:{prop:r,status:i}}=s,[o,a,c]=i.split(" ",3),u=parseInt(a,10);if(u>=400){const d=new Error(`Invalid response: ${u} ${c}`);throw d.status=u,d}return hc(r,To(e),n)}function bv(t){switch(String(t)){case"-3":return"unlimited";case"-2":case"-1":return"unknown";default:return parseInt(String(t),10)}}function pu(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const wh=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{details:s=!1}=n,r=dt({url:He(t.remoteURL,Ve(e)),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,n);return pu(ut(r,t),function(i){return ft(t,i),pu(i.text(),function(o){return pu(Vo(o),function(a){const c=vv(a,e,s);return wr(i,c,s)})})})});function wv(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const NP=kv(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=function(i){if(!i||i==="/")return[];let o=i;const a=[];do a.push(o),o=Ol().dirname(o);while(o&&o!=="/");return a}(To(e));s.sort((i,o)=>i.length>o.length?1:o.length>i.length?-1:0);let r=!1;return function(i,o,a){if(typeof i[mx]=="function"){let x=function(v){try{for(;!(c=f.next()).done;)if((v=o(c.value))&&v.then){if(!gx(v))return void v.then(x,d||(d=Ot.bind(null,u=new Wr,2)));v=v.v}u?Ot(u,1,v):u=v}catch(b){Ot(u||(u=new Wr),2,b)}};var c,u,d,f=i[mx]();if(x(),f.return){var h=function(v){try{c.done||f.return()}catch{}return v};if(u&&u.then)return u.then(h,function(v){throw h(v)});h()}return u}if(!("length"in i))throw new TypeError("Object is not iterable");for(var m=[],g=0;g<i.length;g++)m.push(i[g]);return function(x,v,b){var p,y,_=-1;return function j(N){try{for(;++_<x.length&&(!b||!b());)if((N=v(_))&&N.then){if(!gx(N))return void N.then(j,y||(y=Ot.bind(null,p=new Wr,2)));N=N.v}p?Ot(p,1,N):p=N}catch(C){Ot(p||(p=new Wr),2,C)}}(),p}(m,function(x){return o(m[x])},a)}(s,function(i){return o=function(){return function(c,u){try{var d=wv(wh(t,i),function(f){if(f.type!=="directory")throw new Error(`Path includes a file: ${e}`)})}catch(f){return u(f)}return d&&d.then?d.then(void 0,u):d}(0,function(c){const u=c;return function(){if(u.status===404)return r=!0,px(Yd(t,i,{...n,recursive:!1}));throw c}()})},(a=function(){if(r)return px(Yd(t,i,{...n,recursive:!1}))}())&&a.then?a.then(o):o();var o,a},function(){return!1})});function kv(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}function CP(){}function px(t,e){return t&&t.then?t.then(CP):Promise.resolve()}const mx=typeof Symbol<"u"?Symbol.iterator||(Symbol.iterator=Symbol("Symbol.iterator")):"@@iterator";function Ot(t,e,n){if(!t.s){if(n instanceof Wr){if(!n.s)return void(n.o=Ot.bind(null,t,e));1&e&&(e=n.s),n=n.v}if(n&&n.then)return void n.then(Ot.bind(null,t,e),Ot.bind(null,t,2));t.s=e,t.v=n;const s=t.o;s&&s(t)}}const Wr=function(){function t(){}return t.prototype.then=function(e,n){const s=new t,r=this.s;if(r){const i=1&r?e:n;if(i){try{Ot(s,1,i(this.v))}catch(o){Ot(s,2,o)}return s}return this}return this.o=function(i){try{const o=i.v;1&i.s?Ot(s,1,e?e(o):o):n?Ot(s,1,n(o)):Ot(s,2,o)}catch(o){Ot(s,2,o)}},s},t}();function gx(t){return t instanceof Wr&&1&t.s}const Yd=kv(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(n.recursive===!0)return NP(t,e,n);const s=dt({url:He(t.remoteURL,(r=Ve(e),r.endsWith("/")?r:r+"/")),method:"MKCOL"},t,n);var r;return wv(ut(s,t),function(i){ft(t,i)})});var EP=Pe(388),xx=Pe.n(EP);const MP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s={};if(typeof n.range=="object"&&typeof n.range.start=="number"){let a=`bytes=${n.range.start}-`;typeof n.range.end=="number"&&(a=`${a}${n.range.end}`),s.Range=a}const r=dt({url:He(t.remoteURL,Ve(e)),method:"GET",headers:s},t,n);return o=function(a){if(ft(t,a),s.Range&&a.status!==206){const c=new Error(`Invalid response code for partial request: ${a.status}`);throw c.status=a.status,c}return n.callback&&setTimeout(()=>{n.callback(a)},0),a.body},(i=ut(r,t))&&i.then||(i=Promise.resolve(i)),o?i.then(o):i;var i,o}),PP=()=>{},DP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e,n){n.url||(n.url=He(t.remoteURL,Ve(e)));const s=dt(n,t,{});return i=function(o){return ft(t,o),o},(r=ut(s,t))&&r.then||(r=Promise.resolve(r)),i?r.then(i):r;var r,i}),AP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=dt({url:He(t.remoteURL,Ve(e)),method:"DELETE"},t,n);return i=function(o){ft(t,o)},(r=ut(s,t))&&r.then||(r=Promise.resolve(r)),i?r.then(i):r;var r,i}),OP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return function(s,r){try{var i=(o=wh(t,e,n),a=function(){return!0},c?a?a(o):o:(o&&o.then||(o=Promise.resolve(o)),a?o.then(a):o))}catch(u){return r(u)}var o,a,c;return i&&i.then?i.then(void 0,r):i}(0,function(s){if(s.status===404)return!1;throw s})});function mu(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const TP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=dt({url:He(t.remoteURL,Ve(e),"/"),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:n.deep?"infinity":"1"}},t,n);return mu(ut(s,t),function(r){return ft(t,r),mu(r.text(),function(i){if(!i)throw new Error("Failed parsing directory contents: Empty response");return mu(Vo(i),function(o){const a=nx(e);let c=function(u,d,f){let h=arguments.length>3&&arguments[3]!==void 0&&arguments[3],m=arguments.length>4&&arguments[4]!==void 0&&arguments[4];const g=Ol().join(d,"/"),{multistatus:{response:x}}=u,v=x.map(b=>{const p=function(_){try{return _.replace(/^https?:\/\/[^\/]+/,"")}catch(j){throw new Tt(j,"Failed normalising HREF")}}(b.href),{propstat:{prop:y}}=b;return hc(y,g==="/"?decodeURIComponent(To(p)):To(Ol().relative(decodeURIComponent(g),decodeURIComponent(p))),h)});return m?v:v.filter(b=>b.basename&&(b.type==="file"||b.filename!==f.replace(/\/$/,"")))}(o,nx(t.remoteBasePath||t.remotePath),a,n.details,n.includeSelf);return n.glob&&(c=function(u,d){return u.filter(f=>Nt(f.filename,d,{matchBase:!0}))}(c,n.glob)),wr(r,c,n.details)})})})});function kh(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}const zP=kh(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=dt({url:He(t.remoteURL,Ve(e)),method:"GET",headers:{Accept:"text/plain"},transformResponse:[RP]},t,n);return Bl(ut(s,t),function(r){return ft(t,r),Bl(r.text(),function(i){return wr(r,i,n.details)})})});function Bl(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const IP=kh(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=dt({url:He(t.remoteURL,Ve(e)),method:"GET"},t,n);return Bl(ut(s,t),function(r){let i;return ft(t,r),function(o,a){var c=o();return c&&c.then?c.then(a):a()}(function(){return Bl(r.arrayBuffer(),function(o){i=o})},function(){return wr(r,i,n.details)})})}),FP=kh(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{format:s="binary"}=n;if(s!=="binary"&&s!=="text")throw new Tt({info:{code:ns.InvalidOutputFormat}},`Invalid output format: ${s}`);return s==="text"?zP(t,e,n):IP(t,e,n)}),RP=t=>t;function LP(t){return new bh.XMLBuilder({attributeNamePrefix:"@_",format:!0,ignoreAttributes:!1,suppressEmptyNode:!0}).build(jv({lockinfo:{"@_xmlns:d":"DAV:",lockscope:{exclusive:{}},locktype:{write:{}},owner:{href:t}}},"d"))}function jv(t,e){const n={...t};for(const s in n)n.hasOwnProperty(s)&&(n[s]&&typeof n[s]=="object"&&s.indexOf(":")===-1?(n[`${e}:${s}`]=jv(n[s],e),delete n[s]):/^@_/.test(s)===!1&&(n[`${e}:${s}`]=n[s],delete n[s]));return n}function Kd(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}function Sv(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}const BP=Sv(function(t,e,n){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const r=dt({url:He(t.remoteURL,Ve(e)),method:"UNLOCK",headers:{"Lock-Token":n}},t,s);return Kd(ut(r,t),function(i){if(ft(t,i),i.status!==204&&i.status!==200)throw vh(i)})}),$P=Sv(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{refreshToken:s,timeout:r=UP}=n,i={Accept:"text/plain,application/xml",Timeout:r};s&&(i.If=s);const o=dt({url:He(t.remoteURL,Ve(e)),method:"LOCK",headers:i,data:LP(t.contactHref)},t,n);return Kd(ut(o,t),function(a){return ft(t,a),Kd(a.text(),function(c){const u=(h=c,new bh.XMLParser({removeNSPrefix:!0,parseAttributeValue:!0,parseTagValue:!0}).parse(h)),d=Vn().get(u,"prop.lockdiscovery.activelock.locktoken.href"),f=Vn().get(u,"prop.lockdiscovery.activelock.timeout");var h;if(!d)throw vh(a,"No lock token received: ");return{token:d,serverTimeout:f}})})}),UP="Infinite, Second-4100000000";function gu(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const WP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const n=e.path||"/",s=dt({url:He(t.remoteURL,n),method:"PROPFIND",headers:{Accept:"text/plain,application/xml",Depth:"0"}},t,e);return gu(ut(s,t),function(r){return ft(t,r),gu(r.text(),function(i){return gu(Vo(i),function(o){const a=function(c){try{const[u]=c.multistatus.response,{propstat:{prop:{"quota-used-bytes":d,"quota-available-bytes":f}}}=u;return d!==void 0&&f!==void 0?{used:parseInt(String(d),10),available:bv(f)}:null}catch{}return null}(o);return wr(r,a,e.details)})})})});function xu(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const VP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{details:s=!1}=n,r=dt({url:He(t.remoteURL,Ve(e)),method:"SEARCH",headers:{Accept:"text/plain,application/xml","Content-Type":t.headers["Content-Type"]||"application/xml; charset=utf-8"}},t,n);return xu(ut(r,t),function(i){return ft(t,i),xu(i.text(),function(o){return xu(Vo(o),function(a){const c=function(u,d,f){const h={truncated:!1,results:[]};return h.truncated=u.multistatus.response.some(m=>{var g,x;return((x=(m.status||((g=m.propstat)==null?void 0:g.status)).split(" ",3))==null?void 0:x[1])==="507"&&m.href.replace(/\/$/,"").endsWith(Ve(d).replace(/\/$/,""))}),u.multistatus.response.forEach(m=>{if(m.propstat===void 0)return;const g=m.href.split("/").map(decodeURIComponent).join("/");h.results.push(hc(m.propstat.prop,g,f))}),h}(a,e,s);return wr(i,c,s)})})})}),HP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e,n){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const r=dt({url:He(t.remoteURL,Ve(e)),method:"MOVE",headers:{Destination:He(t.remoteURL,Ve(n)),Overwrite:s.overwrite===!1?"F":"T"}},t,s);return o=function(a){ft(t,a)},(i=ut(r,t))&&i.then||(i=Promise.resolve(i)),o?i.then(o):i;var i,o});var YP=Pe(172);const KP=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e,n){let s=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{};const{contentLength:r=!0,overwrite:i=!0}=s,o={"Content-Type":"application/octet-stream"};r===!1||(o["Content-Length"]=typeof r=="number"?`${r}`:`${function(d){if(uv(d))return d.byteLength;if(dv(d))return d.length;if(typeof d=="string")return(0,YP.d)(d);throw new Tt({info:{code:ns.DataTypeNoLength}},"Cannot calculate data length: Invalid type")}(n)}`),i||(o["If-None-Match"]="*");const a=dt({url:He(t.remoteURL,Ve(e)),method:"PUT",headers:o,data:n},t,s);return u=function(d){try{ft(t,d)}catch(f){const h=f;if(h.status!==412||i)throw h;return!1}return!0},(c=ut(a,t))&&c.then||(c=Promise.resolve(c)),u?c.then(u):c;var c,u}),_v=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}(function(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const s=dt({url:He(t.remoteURL,Ve(e)),method:"OPTIONS"},t,n);return i=function(o){try{ft(t,o)}catch(a){throw a}return{compliance:(o.headers.get("DAV")??"").split(",").map(a=>a.trim()),server:o.headers.get("Server")??""}},(r=ut(s,t))&&r.then||(r=Promise.resolve(r)),i?r.then(i):r;var r,i});function so(t,e,n){return n?e?e(t):t:(t&&t.then||(t=Promise.resolve(t)),e?t.then(e):t)}const GP=jh(function(t,e,n,s,r){let i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{};if(n>s||n<0)throw new Tt({info:{code:ns.InvalidUpdateRange}},`Invalid update range ${n} for partial update`);const o={"Content-Type":"application/octet-stream","Content-Length":""+(s-n+1),"Content-Range":`bytes ${n}-${s}/*`},a=dt({url:He(t.remoteURL,Ve(e)),method:"PUT",headers:o,data:r},t,i);return so(ut(a,t),function(c){ft(t,c)})});function yx(t,e){var n=t();return n&&n.then?n.then(e):e(n)}const qP=jh(function(t,e,n,s,r){let i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{};if(n>s||n<0)throw new Tt({info:{code:ns.InvalidUpdateRange}},`Invalid update range ${n} for partial update`);const o={"Content-Type":"application/x-sabredav-partialupdate","Content-Length":""+(s-n+1),"X-Update-Range":`bytes=${n}-${s}`},a=dt({url:He(t.remoteURL,Ve(e)),method:"PATCH",headers:o,data:r},t,i);return so(ut(a,t),function(c){ft(t,c)})});function jh(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(s){return Promise.reject(s)}}}const XP=jh(function(t,e,n,s,r){let i=arguments.length>5&&arguments[5]!==void 0?arguments[5]:{};return so(_v(t,e,i),function(o){let a=!1;return yx(function(){if(o.compliance.includes("sabredav-partialupdate"))return so(qP(t,e,n,s,r,i),function(c){return a=!0,c})},function(c){let u=!1;return a?c:yx(function(){if(o.server.includes("Apache")&&o.compliance.includes("<http://apache.org/dav/propset/fs/1>"))return so(GP(t,e,n,s,r,i),function(d){return u=!0,d})},function(d){if(u)return d;throw new Tt({info:{code:ns.NotSupported}},"Not supported")})})})}),QP="https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";function ZP(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{authType:n=null,remoteBasePath:s,contactHref:r=QP,ha1:i,headers:o={},httpAgent:a,httpsAgent:c,password:u,token:d,username:f,withCredentials:h}=e;let m=n;m||(m=f||u?At.Password:At.None);const g={authType:m,remoteBasePath:s,contactHref:r,ha1:i,headers:Object.assign({},o),httpAgent:a,httpsAgent:c,password:u,remotePath:BM(t),remoteURL:t,token:d,username:f,withCredentials:h};return av(g,f,u,d,i),{copyFile:(x,v,b)=>SP(g,x,v,b),createDirectory:(x,v)=>Yd(g,x,v),createReadStream:(x,v)=>function(b,p){let y=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const _=new(xx()).PassThrough;return MP(b,p,y).then(j=>{j.pipe(_)}).catch(j=>{_.emit("error",j)}),_}(g,x,v),createWriteStream:(x,v,b)=>function(p,y){let _=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},j=arguments.length>3&&arguments[3]!==void 0?arguments[3]:PP;const N=new(xx()).PassThrough,C={};_.overwrite===!1&&(C["If-None-Match"]="*");const w=dt({url:He(p.remoteURL,Ve(y)),method:"PUT",headers:C,data:N,maxRedirects:0},p,_);return ut(w,p).then(k=>ft(p,k)).then(k=>{setTimeout(()=>{j(k)},0)}).catch(k=>{N.emit("error",k)}),N}(g,x,v,b),customRequest:(x,v)=>DP(g,x,v),deleteFile:(x,v)=>AP(g,x,v),exists:(x,v)=>OP(g,x,v),getDirectoryContents:(x,v)=>TP(g,x,v),getFileContents:(x,v)=>FP(g,x,v),getFileDownloadLink:x=>function(v,b){let p=He(v.remoteURL,Ve(b));const y=/^https:/i.test(p)?"https":"http";switch(v.authType){case At.None:break;case At.Password:{const _=rx(v.headers.Authorization.replace(/^Basic /i,"").trim());p=p.replace(/^https?:\/\//,`${y}://${_}@`);break}default:throw new Tt({info:{code:ns.LinkUnsupportedAuthType}},`Unsupported auth type for file link: ${v.authType}`)}return p}(g,x),getFileUploadLink:x=>function(v,b){let p=`${He(v.remoteURL,Ve(b))}?Content-Type=application/octet-stream`;const y=/^https:/i.test(p)?"https":"http";switch(v.authType){case At.None:break;case At.Password:{const _=rx(v.headers.Authorization.replace(/^Basic /i,"").trim());p=p.replace(/^https?:\/\//,`${y}://${_}@`);break}default:throw new Tt({info:{code:ns.LinkUnsupportedAuthType}},`Unsupported auth type for file link: ${v.authType}`)}return p}(g,x),getHeaders:()=>Object.assign({},g.headers),getQuota:x=>WP(g,x),lock:(x,v)=>$P(g,x,v),moveFile:(x,v,b)=>HP(g,x,v,b),putFileContents:(x,v,b)=>KP(g,x,v,b),partialUpdateFileContents:(x,v,b,p,y)=>XP(g,x,v,b,p,y),getDAVCompliance:x=>_v(g,x),search:(x,v)=>VP(g,x,v),setHeaders:x=>{g.headers=Object.assign({},x)},stat:(x,v)=>wh(g,x,v),unlock:(x,v,b)=>BP(g,x,v,b)}}gn.hT;gn.O4;gn.Kd;gn.YK;var Sh=gn.UU;gn.Gu;gn.ky;gn.h4;gn.ch;gn.hq;gn.i5;var Nv={exports:{}};/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/(function(t,e){((n,s)=>{t.exports=s()})(Fv,function n(){var s=typeof self<"u"?self:typeof window<"u"?window:s!==void 0?s:{},r,i=!s.document&&!!s.postMessage,o=s.IS_PAPA_WORKER||!1,a={},c=0,u={};function d(w){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(k){var S=j(k);S.chunkSize=parseInt(S.chunkSize),k.step||k.chunk||(S.chunkSize=null),this._handle=new x(S),(this._handle.streamer=this)._config=S}).call(this,w),this.parseChunk=function(k,S){var P=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<P){let A=this._config.newline;A||(O=this._config.quoteChar||'"',A=this._handle.guessLineEndings(k,O)),k=[...k.split(A).slice(P)].join(A)}this.isFirstChunk&&C(this._config.beforeFirstChunk)&&(O=this._config.beforeFirstChunk(k))!==void 0&&(k=O),this.isFirstChunk=!1,this._halted=!1;var P=this._partialLine+k,O=(this._partialLine="",this._handle.parse(P,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){if(k=O.meta.cursor,P=(this._finished||(this._partialLine=P.substring(k-this._baseIndex),this._baseIndex=k),O&&O.data&&(this._rowCount+=O.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview),o)s.postMessage({results:O,workerId:u.WORKER_ID,finished:P});else if(C(this._config.chunk)&&!S){if(this._config.chunk(O,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=O=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(O.data),this._completeResults.errors=this._completeResults.errors.concat(O.errors),this._completeResults.meta=O.meta),this._completed||!P||!C(this._config.complete)||O&&O.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),P||O&&O.meta.paused||this._nextChunk(),O}this._halted=!0},this._sendError=function(k){C(this._config.error)?this._config.error(k):o&&this._config.error&&s.postMessage({workerId:u.WORKER_ID,error:k,finished:!1})}}function f(w){var k;(w=w||{}).chunkSize||(w.chunkSize=u.RemoteChunkSize),d.call(this,w),this._nextChunk=i?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(S){this._input=S,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(k=new XMLHttpRequest,this._config.withCredentials&&(k.withCredentials=this._config.withCredentials),i||(k.onload=N(this._chunkLoaded,this),k.onerror=N(this._chunkError,this)),k.open(this._config.downloadRequestBody?"POST":"GET",this._input,!i),this._config.downloadRequestHeaders){var S,P=this._config.downloadRequestHeaders;for(S in P)k.setRequestHeader(S,P[S])}var O;this._config.chunkSize&&(O=this._start+this._config.chunkSize-1,k.setRequestHeader("Range","bytes="+this._start+"-"+O));try{k.send(this._config.downloadRequestBody)}catch(A){this._chunkError(A.message)}i&&k.status===0&&this._chunkError()}},this._chunkLoaded=function(){k.readyState===4&&(k.status<200||400<=k.status?this._chunkError():(this._start+=this._config.chunkSize||k.responseText.length,this._finished=!this._config.chunkSize||this._start>=(S=>(S=S.getResponseHeader("Content-Range"))!==null?parseInt(S.substring(S.lastIndexOf("/")+1)):-1)(k),this.parseChunk(k.responseText)))},this._chunkError=function(S){S=k.statusText||S,this._sendError(new Error(S))}}function h(w){(w=w||{}).chunkSize||(w.chunkSize=u.LocalChunkSize),d.call(this,w);var k,S,P=typeof FileReader<"u";this.stream=function(O){this._input=O,S=O.slice||O.webkitSlice||O.mozSlice,P?((k=new FileReader).onload=N(this._chunkLoaded,this),k.onerror=N(this._chunkError,this)):k=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var O=this._input,A=(this._config.chunkSize&&(A=Math.min(this._start+this._config.chunkSize,this._input.size),O=S.call(O,this._start,A)),k.readAsText(O,this._config.encoding));P||this._chunkLoaded({target:{result:A}})},this._chunkLoaded=function(O){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(O.target.result)},this._chunkError=function(){this._sendError(k.error)}}function m(w){var k;d.call(this,w=w||{}),this.stream=function(S){return k=S,this._nextChunk()},this._nextChunk=function(){var S,P;if(!this._finished)return S=this._config.chunkSize,k=S?(P=k.substring(0,S),k.substring(S)):(P=k,""),this._finished=!k,this.parseChunk(P)}}function g(w){d.call(this,w=w||{});var k=[],S=!0,P=!1;this.pause=function(){d.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){d.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(O){this._input=O,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){P&&k.length===1&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),k.length?this.parseChunk(k.shift()):S=!0},this._streamData=N(function(O){try{k.push(typeof O=="string"?O:O.toString(this._config.encoding)),S&&(S=!1,this._checkIsFinished(),this.parseChunk(k.shift()))}catch(A){this._streamError(A)}},this),this._streamError=N(function(O){this._streamCleanUp(),this._sendError(O)},this),this._streamEnd=N(function(){this._streamCleanUp(),P=!0,this._streamData("")},this),this._streamCleanUp=N(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function x(w){var k,S,P,O,A=Math.pow(2,53),U=-A,L=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,$=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,D=this,z=0,M=0,T=!1,I=!1,R=[],B={data:[],errors:[],meta:{}};function K(ue){return w.skipEmptyLines==="greedy"?ue.join("").trim()==="":ue.length===1&&ue[0].length===0}function se(){if(B&&P&&(ge("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+u.DefaultDelimiter+"'"),P=!1),w.skipEmptyLines&&(B.data=B.data.filter(function(ne){return!K(ne)})),ce()){let ne=function(de,F){C(w.transformHeader)&&(de=w.transformHeader(de,F)),R.push(de)};if(B)if(Array.isArray(B.data[0])){for(var ue=0;ce()&&ue<B.data.length;ue++)B.data[ue].forEach(ne);B.data.splice(0,1)}else B.data.forEach(ne)}function Y(ne,de){for(var F=w.header?{}:[],V=0;V<ne.length;V++){var te=V,J=ne[V],J=((he,H)=>(Q=>(w.dynamicTypingFunction&&w.dynamicTyping[Q]===void 0&&(w.dynamicTyping[Q]=w.dynamicTypingFunction(Q)),(w.dynamicTyping[Q]||w.dynamicTyping)===!0))(he)?H==="true"||H==="TRUE"||H!=="false"&&H!=="FALSE"&&((Q=>{if(L.test(Q)&&(Q=parseFloat(Q),U<Q&&Q<A))return 1})(H)?parseFloat(H):$.test(H)?new Date(H):H===""?null:H):H)(te=w.header?V>=R.length?"__parsed_extra":R[V]:te,J=w.transform?w.transform(J,te):J);te==="__parsed_extra"?(F[te]=F[te]||[],F[te].push(J)):F[te]=J}return w.header&&(V>R.length?ge("FieldMismatch","TooManyFields","Too many fields: expected "+R.length+" fields but parsed "+V,M+de):V<R.length&&ge("FieldMismatch","TooFewFields","Too few fields: expected "+R.length+" fields but parsed "+V,M+de)),F}var re;B&&(w.header||w.dynamicTyping||w.transform)&&(re=1,!B.data.length||Array.isArray(B.data[0])?(B.data=B.data.map(Y),re=B.data.length):B.data=Y(B.data,0),w.header&&B.meta&&(B.meta.fields=R),M+=re)}function ce(){return w.header&&R.length===0}function ge(ue,Y,re,ne){ue={type:ue,code:Y,message:re},ne!==void 0&&(ue.row=ne),B.errors.push(ue)}C(w.step)&&(O=w.step,w.step=function(ue){B=ue,ce()?se():(se(),B.data.length!==0&&(z+=ue.data.length,w.preview&&z>w.preview?S.abort():(B.data=B.data[0],O(B,D))))}),this.parse=function(ue,Y,re){var ne=w.quoteChar||'"',ne=(w.newline||(w.newline=this.guessLineEndings(ue,ne)),P=!1,w.delimiter?C(w.delimiter)&&(w.delimiter=w.delimiter(ue),B.meta.delimiter=w.delimiter):((ne=((de,F,V,te,J)=>{var he,H,Q,ae;J=J||[",","	","|",";",u.RECORD_SEP,u.UNIT_SEP];for(var fe=0;fe<J.length;fe++){for(var be,Fe=J[fe],je=0,Ge=0,Me=0,ht=(Q=void 0,new b({comments:te,delimiter:Fe,newline:F,preview:10}).parse(de)),Kt=0;Kt<ht.data.length;Kt++)V&&K(ht.data[Kt])?Me++:(be=ht.data[Kt].length,Ge+=be,Q===void 0?Q=be:0<be&&(je+=Math.abs(be-Q),Q=be));0<ht.data.length&&(Ge/=ht.data.length-Me),(H===void 0||je<=H)&&(ae===void 0||ae<Ge)&&1.99<Ge&&(H=je,he=Fe,ae=Ge)}return{successful:!!(w.delimiter=he),bestDelimiter:he}})(ue,w.newline,w.skipEmptyLines,w.comments,w.delimitersToGuess)).successful?w.delimiter=ne.bestDelimiter:(P=!0,w.delimiter=u.DefaultDelimiter),B.meta.delimiter=w.delimiter),j(w));return w.preview&&w.header&&ne.preview++,k=ue,S=new b(ne),B=S.parse(k,Y,re),se(),T?{meta:{paused:!0}}:B||{meta:{paused:!1}}},this.paused=function(){return T},this.pause=function(){T=!0,S.abort(),k=C(w.chunk)?"":k.substring(S.getCharIndex())},this.resume=function(){D.streamer._halted?(T=!1,D.streamer.parseChunk(k,!0)):setTimeout(D.resume,3)},this.aborted=function(){return I},this.abort=function(){I=!0,S.abort(),B.meta.aborted=!0,C(w.complete)&&w.complete(B),k=""},this.guessLineEndings=function(de,ne){de=de.substring(0,1048576);var ne=new RegExp(v(ne)+"([^]*?)"+v(ne),"gm"),re=(de=de.replace(ne,"")).split("\r"),ne=de.split(`
`),de=1<ne.length&&ne[0].length<re[0].length;if(re.length===1||de)return`
`;for(var F=0,V=0;V<re.length;V++)re[V][0]===`
`&&F++;return F>=re.length/2?`\r
`:"\r"}}function v(w){return w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function b(w){var k=(w=w||{}).delimiter,S=w.newline,P=w.comments,O=w.step,A=w.preview,U=w.fastMode,L=null,$=!1,D=w.quoteChar==null?'"':w.quoteChar,z=D;if(w.escapeChar!==void 0&&(z=w.escapeChar),(typeof k!="string"||-1<u.BAD_DELIMITERS.indexOf(k))&&(k=","),P===k)throw new Error("Comment character same as delimiter");P===!0?P="#":(typeof P!="string"||-1<u.BAD_DELIMITERS.indexOf(P))&&(P=!1),S!==`
`&&S!=="\r"&&S!==`\r
`&&(S=`
`);var M=0,T=!1;this.parse=function(I,R,B){if(typeof I!="string")throw new Error("Input must be a string");var K=I.length,se=k.length,ce=S.length,ge=P.length,ue=C(O),Y=[],re=[],ne=[],de=M=0;if(!I)return je();if(U||U!==!1&&I.indexOf(D)===-1){for(var F=I.split(S),V=0;V<F.length;V++){if(ne=F[V],M+=ne.length,V!==F.length-1)M+=S.length;else if(B)return je();if(!P||ne.substring(0,ge)!==P){if(ue){if(Y=[],ae(ne.split(k)),Ge(),T)return je()}else ae(ne.split(k));if(A&&A<=V)return Y=Y.slice(0,A),je(!0)}}return je()}for(var te=I.indexOf(k,M),J=I.indexOf(S,M),he=new RegExp(v(z)+v(D),"g"),H=I.indexOf(D,M);;)if(I[M]===D)for(H=M,M++;;){if((H=I.indexOf(D,H+1))===-1)return B||re.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:Y.length,index:M}),be();if(H===K-1)return be(I.substring(M,H).replace(he,D));if(D===z&&I[H+1]===z)H++;else if(D===z||H===0||I[H-1]!==z){te!==-1&&te<H+1&&(te=I.indexOf(k,H+1));var Q=fe((J=J!==-1&&J<H+1?I.indexOf(S,H+1):J)===-1?te:Math.min(te,J));if(I.substr(H+1+Q,se)===k){ne.push(I.substring(M,H).replace(he,D)),I[M=H+1+Q+se]!==D&&(H=I.indexOf(D,M)),te=I.indexOf(k,M),J=I.indexOf(S,M);break}if(Q=fe(J),I.substring(H+1+Q,H+1+Q+ce)===S){if(ne.push(I.substring(M,H).replace(he,D)),Fe(H+1+Q+ce),te=I.indexOf(k,M),H=I.indexOf(D,M),ue&&(Ge(),T))return je();if(A&&Y.length>=A)return je(!0);break}re.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:Y.length,index:M}),H++}}else if(P&&ne.length===0&&I.substring(M,M+ge)===P){if(J===-1)return je();M=J+ce,J=I.indexOf(S,M),te=I.indexOf(k,M)}else if(te!==-1&&(te<J||J===-1))ne.push(I.substring(M,te)),M=te+se,te=I.indexOf(k,M);else{if(J===-1)break;if(ne.push(I.substring(M,J)),Fe(J+ce),ue&&(Ge(),T))return je();if(A&&Y.length>=A)return je(!0)}return be();function ae(Me){Y.push(Me),de=M}function fe(Me){var ht=0;return ht=Me!==-1&&(Me=I.substring(H+1,Me))&&Me.trim()===""?Me.length:ht}function be(Me){return B||(Me===void 0&&(Me=I.substring(M)),ne.push(Me),M=K,ae(ne),ue&&Ge()),je()}function Fe(Me){M=Me,ae(ne),ne=[],J=I.indexOf(S,M)}function je(Me){if(w.header&&!R&&Y.length&&!$){var ht=Y[0],Kt=Object.create(null),ie=new Set(ht);let Se=!1;for(let Ae=0;Ae<ht.length;Ae++){let Oe=ht[Ae];if(Kt[Oe=C(w.transformHeader)?w.transformHeader(Oe,Ae):Oe]){let rt,is=Kt[Oe];for(;rt=Oe+"_"+is,is++,ie.has(rt););ie.add(rt),ht[Ae]=rt,Kt[Oe]++,Se=!0,(L=L===null?{}:L)[rt]=Oe}else Kt[Oe]=1,ht[Ae]=Oe;ie.add(Oe)}Se&&console.warn("Duplicate headers found and renamed."),$=!0}return{data:Y,errors:re,meta:{delimiter:k,linebreak:S,aborted:T,truncated:!!Me,cursor:de+(R||0),renamedHeaders:L}}}function Ge(){O(je()),Y=[],re=[]}},this.abort=function(){T=!0},this.getCharIndex=function(){return M}}function p(w){var k=w.data,S=a[k.workerId],P=!1;if(k.error)S.userError(k.error,k.file);else if(k.results&&k.results.data){var O={abort:function(){P=!0,y(k.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:_,resume:_};if(C(S.userStep)){for(var A=0;A<k.results.data.length&&(S.userStep({data:k.results.data[A],errors:k.results.errors,meta:k.results.meta},O),!P);A++);delete k.results}else C(S.userChunk)&&(S.userChunk(k.results,O,k.file),delete k.results)}k.finished&&!P&&y(k.workerId,k.results)}function y(w,k){var S=a[w];C(S.userComplete)&&S.userComplete(k),S.terminate(),delete a[w]}function _(){throw new Error("Not implemented.")}function j(w){if(typeof w!="object"||w===null)return w;var k,S=Array.isArray(w)?[]:{};for(k in w)S[k]=j(w[k]);return S}function N(w,k){return function(){w.apply(k,arguments)}}function C(w){return typeof w=="function"}return u.parse=function(w,k){var S=(k=k||{}).dynamicTyping||!1;if(C(S)&&(k.dynamicTypingFunction=S,S={}),k.dynamicTyping=S,k.transform=!!C(k.transform)&&k.transform,!k.worker||!u.WORKERS_SUPPORTED)return S=null,u.NODE_STREAM_INPUT,typeof w=="string"?(w=(P=>P.charCodeAt(0)!==65279?P:P.slice(1))(w),S=new(k.download?f:m)(k)):w.readable===!0&&C(w.read)&&C(w.on)?S=new g(k):(s.File&&w instanceof File||w instanceof Object)&&(S=new h(k)),S.stream(w);(S=(()=>{var P;return!!u.WORKERS_SUPPORTED&&(P=(()=>{var O=s.URL||s.webkitURL||null,A=n.toString();return u.BLOB_URL||(u.BLOB_URL=O.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",A,")();"],{type:"text/javascript"})))})(),(P=new s.Worker(P)).onmessage=p,P.id=c++,a[P.id]=P)})()).userStep=k.step,S.userChunk=k.chunk,S.userComplete=k.complete,S.userError=k.error,k.step=C(k.step),k.chunk=C(k.chunk),k.complete=C(k.complete),k.error=C(k.error),delete k.worker,S.postMessage({input:w,config:k,workerId:S.id})},u.unparse=function(w,k){var S=!1,P=!0,O=",",A=`\r
`,U='"',L=U+U,$=!1,D=null,z=!1,M=((()=>{if(typeof k=="object"){if(typeof k.delimiter!="string"||u.BAD_DELIMITERS.filter(function(R){return k.delimiter.indexOf(R)!==-1}).length||(O=k.delimiter),typeof k.quotes!="boolean"&&typeof k.quotes!="function"&&!Array.isArray(k.quotes)||(S=k.quotes),typeof k.skipEmptyLines!="boolean"&&typeof k.skipEmptyLines!="string"||($=k.skipEmptyLines),typeof k.newline=="string"&&(A=k.newline),typeof k.quoteChar=="string"&&(U=k.quoteChar),typeof k.header=="boolean"&&(P=k.header),Array.isArray(k.columns)){if(k.columns.length===0)throw new Error("Option columns is empty");D=k.columns}k.escapeChar!==void 0&&(L=k.escapeChar+U),k.escapeFormulae instanceof RegExp?z=k.escapeFormulae:typeof k.escapeFormulae=="boolean"&&k.escapeFormulae&&(z=/^[=+\-@\t\r].*$/)}})(),new RegExp(v(U),"g"));if(typeof w=="string"&&(w=JSON.parse(w)),Array.isArray(w)){if(!w.length||Array.isArray(w[0]))return T(null,w,$);if(typeof w[0]=="object")return T(D||Object.keys(w[0]),w,$)}else if(typeof w=="object")return typeof w.data=="string"&&(w.data=JSON.parse(w.data)),Array.isArray(w.data)&&(w.fields||(w.fields=w.meta&&w.meta.fields||D),w.fields||(w.fields=Array.isArray(w.data[0])?w.fields:typeof w.data[0]=="object"?Object.keys(w.data[0]):[]),Array.isArray(w.data[0])||typeof w.data[0]=="object"||(w.data=[w.data])),T(w.fields||[],w.data||[],$);throw new Error("Unable to serialize unrecognized input");function T(R,B,K){var se="",ce=(typeof R=="string"&&(R=JSON.parse(R)),typeof B=="string"&&(B=JSON.parse(B)),Array.isArray(R)&&0<R.length),ge=!Array.isArray(B[0]);if(ce&&P){for(var ue=0;ue<R.length;ue++)0<ue&&(se+=O),se+=I(R[ue],ue);0<B.length&&(se+=A)}for(var Y=0;Y<B.length;Y++){var re=(ce?R:B[Y]).length,ne=!1,de=ce?Object.keys(B[Y]).length===0:B[Y].length===0;if(K&&!ce&&(ne=K==="greedy"?B[Y].join("").trim()==="":B[Y].length===1&&B[Y][0].length===0),K==="greedy"&&ce){for(var F=[],V=0;V<re;V++){var te=ge?R[V]:V;F.push(B[Y][te])}ne=F.join("").trim()===""}if(!ne){for(var J=0;J<re;J++){0<J&&!de&&(se+=O);var he=ce&&ge?R[J]:J;se+=I(B[Y][he],J)}Y<B.length-1&&(!K||0<re&&!de)&&(se+=A)}}return se}function I(R,B){var K,se;return R==null?"":R.constructor===Date?JSON.stringify(R).slice(1,25):(se=!1,z&&typeof R=="string"&&z.test(R)&&(R="'"+R,se=!0),K=R.toString().replace(M,L),(se=se||S===!0||typeof S=="function"&&S(R,B)||Array.isArray(S)&&S[B]||((ce,ge)=>{for(var ue=0;ue<ge.length;ue++)if(-1<ce.indexOf(ge[ue]))return!0;return!1})(K,u.BAD_DELIMITERS)||-1<K.indexOf(O)||K.charAt(0)===" "||K.charAt(K.length-1)===" ")?U+K+U:K)}},u.RECORD_SEP="",u.UNIT_SEP="",u.BYTE_ORDER_MARK="\uFEFF",u.BAD_DELIMITERS=["\r",`
`,'"',u.BYTE_ORDER_MARK],u.WORKERS_SUPPORTED=!i&&!!s.Worker,u.NODE_STREAM_INPUT=1,u.LocalChunkSize=10485760,u.RemoteChunkSize=5242880,u.DefaultDelimiter=",",u.Parser=b,u.ParserHandle=x,u.NetworkStreamer=f,u.FileStreamer=h,u.StringStreamer=m,u.ReadableStreamStreamer=g,s.jQuery&&((r=s.jQuery).fn.parse=function(w){var k=w.config||{},S=[];return this.each(function(A){if(!(r(this).prop("tagName").toUpperCase()==="INPUT"&&r(this).attr("type").toLowerCase()==="file"&&s.FileReader)||!this.files||this.files.length===0)return!0;for(var U=0;U<this.files.length;U++)S.push({file:this.files[U],inputElem:this,instanceConfig:r.extend({},k)})}),P(),this;function P(){if(S.length===0)C(w.complete)&&w.complete();else{var A,U,L,$,D=S[0];if(C(w.before)){var z=w.before(D.file,D.inputElem);if(typeof z=="object"){if(z.action==="abort")return A="AbortError",U=D.file,L=D.inputElem,$=z.reason,void(C(w.error)&&w.error({name:A},U,L,$));if(z.action==="skip")return void O();typeof z.config=="object"&&(D.instanceConfig=r.extend(D.instanceConfig,z.config))}else if(z==="skip")return void O()}var M=D.instanceConfig.complete;D.instanceConfig.complete=function(T){C(M)&&M(T,D.file,D.inputElem),O()},u.parse(D.file,D.instanceConfig)}}function O(){S.splice(0,1),P()}}),o&&(s.onmessage=function(w){w=w.data,u.WORKER_ID===void 0&&w&&(u.WORKER_ID=w.workerId),typeof w.input=="string"?s.postMessage({workerId:u.WORKER_ID,results:u.parse(w.input,w.config),finished:!0}):(s.File&&w.input instanceof File||w.input instanceof Object)&&(w=u.parse(w.input,w.config))&&s.postMessage({workerId:u.WORKER_ID,results:w,finished:!0})}),(f.prototype=Object.create(d.prototype)).constructor=f,(h.prototype=Object.create(d.prototype)).constructor=h,(m.prototype=Object.create(m.prototype)).constructor=m,(g.prototype=Object.create(d.prototype)).constructor=g,u})})(Nv);var JP=Nv.exports;const e4=Gd(JP);async function t4(){const t=pe();return{version:"1.0",exportDate:new Date().toISOString(),transactions:await t.getAll("transactions"),categories:await t.getAll("categories"),tags:await t.getAll("tags"),persons:await t.getAll("persons"),accounts:await t.getAll("accounts"),photos:await t.getAll("photos")}}async function vx(t){const e=pe(),n=e.transaction(["transactions","categories","tags","persons","photos","accounts"],"readwrite");await Promise.all([n.objectStore("transactions").clear(),n.objectStore("categories").clear(),n.objectStore("tags").clear(),n.objectStore("persons").clear(),n.objectStore("photos").clear(),n.objectStore("accounts").clear()]);for(const s of t.transactions||[])await e.add("transactions",s);for(const s of t.categories||[])await e.add("categories",s);for(const s of t.tags||[])await e.add("tags",s);for(const s of t.persons||[])await e.add("persons",s);for(const s of t.photos||[])await e.add("photos",s);for(const s of t.accounts||[])await e.add("accounts",s);return!0}async function n4(t){const e=pe();let n=0,s=await e.getAll("categories"),r=await e.getAll("accounts"),i=await e.getAll("merchants"),o=await e.getAll("persons");const a=new Map;s.forEach(j=>a.set(j.name,j.id));const c=new Map;r.forEach(j=>c.set(j.name,j.id));const u=new Map;i.forEach(j=>u.set(j.name,j.id));const d=new Map;o.forEach(j=>d.set(j.name,j.id));let f=r.length>0?r[0].id:null,h=s.length>0?s[0].id:null;f||(f=await e.add("accounts",{name:"现金",type:"cash",balance:0}),c.set("现金",f)),h||(h=await e.add("categories",{name:"其他",type:"expense",icon:"🏷️"}),a.set("其他",h));const m=e.transaction(["transactions","merchants","persons","accounts"],"readwrite"),g=m.objectStore("transactions"),x=m.objectStore("merchants"),v=m.objectStore("persons"),b=m.objectStore("accounts"),p=async j=>{if(!j)return"";if(u.has(j))return j;if(!u.has(j)){const N={name:j,icon:"🏪"},C=await x.add(N);u.set(j,C)}return j},y=async j=>{if(!j)return null;if(d.has(j))return d.get(j);const N={name:j,avatar:"👤"},C=await v.add(N);return d.set(j,C),C},_=async j=>{if(!j)return f;if(c.has(j))return c.get(j);const N={name:j,type:"asset",balance:0,icon:"💳"},C=await b.add(N);return c.set(j,C),C};for(const j of t)try{let N=j.交易时间||j.日期||j.Date;if(!N)continue;N=N.replace(/\./g,"-").replace(/\//g,"-");const C=new Date(N);if(isNaN(C.getTime()))continue;const w=C.toISOString(),k=j.交易类型||j.类型||j.Type||"支出";let S="expense";k.includes("收入")?S="income":k.includes("转账")?S="transfer":k.includes("余额")&&(S="balance");const P=j.金额||j["金额(元)"]||j.Amount||"0",O=parseFloat(String(P).replace(/[¥,]/g,""));if(isNaN(O))continue;const A=j.分类||j.类别||j.交易分类||j.Category,U=j.子分类||j.子类别;let L=h;U&&a.has(U)?L=a.get(U):A&&a.has(A)&&(L=a.get(A));const $=j.账户||j.账户1||j.Account;let D=await _($),z=null;if(S==="transfer"){const ce=j.账户2||j.转入账户||j.目标账户;ce&&(z=await _(ce))}const M=j.商家||j.交易对象||j.Merchant,T=await p(M),I=j.成员||j.Member,R=await y(I),B=j.备注||j.Remark||"",K=j.项目||"",se={date:w,type:S,amount:Math.abs(O),categoryId:L,accountId:D,toAccountId:z,merchant:T,personId:R,remark:B,project:K,created_at:new Date().toISOString()};await g.add(se),n++}catch(N){console.warn("Import Skip:",j,N)}return n}async function s4(t,e,n){try{return await Sh(t,{username:e,password:n}).getDirectoryContents("/"),!0}catch(s){throw console.error("WebDAV Connection Failed:",s),new Error("连接失败，请检查配置")}}async function r4(t,e){const{davUrl:n,davUser:s,davPassword:r}=t,i=`quickbook_backup_${new Date().toISOString().split("T")[0]}.json`,o=Sh(n,{username:s,password:r}),a=JSON.stringify(e,null,2);await o.putFileContents(`/${i}`,a)}async function i4(t){const{davUrl:e,davUser:n,davPassword:s}=t,r=Sh(e,{username:n,password:s}),o=(await r.getDirectoryContents("/")).filter(u=>u.filename.startsWith("quickbook_backup_")&&u.filename.endsWith(".json")).sort((u,d)=>d.lastmod.localeCompare(u.lastmod));if(o.length===0)throw new Error("未找到备份文件");const a=o[0],c=await r.getFileContents(a.filename,{format:"text"});return JSON.parse(c)}function o4(){const t=Ke(),e=E.useRef(null),[n,s]=E.useState(!1),[r,i]=E.useState(null),[o,a]=E.useState(!1),[c,u]=E.useState(""),[d,f]=E.useState(!1),[h,m]=E.useState(()=>({provider:localStorage.getItem("cloud_provider")||"tianyi",davUrl:localStorage.getItem("cloud_dav_url")||"",davUser:localStorage.getItem("cloud_dav_user")||"",davPassword:""})),g=async y=>{if(y.provider==="dav"){if(!y.davUrl||!y.davUser||!y.davPassword){alert("请填写完整的 WebDAV 配置");return}try{u("正在验证连接..."),await s4(y.davUrl,y.davUser,y.davPassword),alert("连接成功！")}catch(_){alert("连接失败："+_.message);return}finally{u("")}}m(y),localStorage.setItem("cloud_provider",y.provider),y.davUrl&&localStorage.setItem("cloud_dav_url",y.davUrl),y.davUser&&localStorage.setItem("cloud_dav_user",y.davUser),sessionStorage.setItem("cloud_dav_password",y.davPassword),f(!1)};E.useEffect(()=>{const y=sessionStorage.getItem("cloud_dav_password");y&&m(_=>({..._,davPassword:y}))},[]);const x=async()=>{if(h.provider!=="dav"){alert("暂仅支持 WebDAV 协议同步，请在设置中配置 WebDAV"),f(!0);return}s(!0),i(null),u("正在打包数据...");try{const y=await t4();u("正在上传..."),await r4(h,y),i("success"),u("备份上传成功！")}catch(y){console.error(y),i("error"),u("上传失败: "+y.message)}finally{s(!1)}},v=async()=>{if(h.provider!=="dav"){alert("暂仅支持 WebDAV 协议同步");return}if(confirm("从云端恢复将覆盖当前本地数据，是否继续？")){s(!0),i(null),u("正在下载...");try{const y=await i4(h);u("正在恢复数据库..."),await vx(y),i("success"),u("数据恢复成功！")}catch(y){console.error(y),i("error"),u("下载失败: "+y.message)}finally{s(!1)}}},b=y=>{switch(y){case"tianyi":return"天翼云盘";case"baidu":return"百度网盘";case"dav":return"WebDAV";default:return"云盘"}},p=y=>{const _=y.target.files[0];if(!_)return;const j=_.name.toLowerCase().endsWith(".csv"),N=new FileReader;a(!0),u("正在解析数据..."),N.onload=async C=>{try{let w=C.target.result;if(j){const k=w.split(`
`);k.length>0&&k[0].includes("随手记")&&(k.shift(),w=k.join(`
`)),e4.parse(w,{header:!0,skipEmptyLines:!0,complete:async S=>{try{const P=await n4(S.data);u(`成功导入 ${P} 条记录`),setTimeout(()=>{window.location.href="/"},1500)}catch(P){u("导入出错："+P.message)}finally{a(!1)}}})}else{const k=JSON.parse(w);await vx(k),u("JSON 数据恢复成功"),a(!1)}}catch(w){u("文件解析失败："+w.message),a(!1)}},N.readAsText(_)};return l.jsxs("div",{className:"page import-page",children:[l.jsxs("div",{className:"top-bar",children:[l.jsx("button",{className:"back-btn",onClick:()=>t(-1),children:l.jsx(fn,{size:24})}),l.jsx("h1",{children:"数据备份与恢复"})]}),l.jsxs("div",{className:"content",children:[l.jsxs("div",{className:"card cloud-card",children:[l.jsxs("div",{className:"card-header",children:[l.jsx("div",{className:"icon-box cloud",children:l.jsx(Hy,{size:24})}),l.jsxs("div",{className:"card-title",children:[l.jsx("h3",{children:b(h.provider)}),l.jsx("p",{children:"自动同步备份，数据不丢失"})]}),l.jsx("button",{className:"settings-btn",onClick:()=>f(!0),children:l.jsx(Kf,{size:20})})]}),l.jsxs("div",{className:"sync-actions",children:[l.jsxs("button",{className:"sync-btn upload",onClick:x,disabled:n,children:[n?l.jsx(Xr,{className:"spin",size:20}):l.jsx(Qj,{size:20}),l.jsx("span",{children:"上传备份"})]}),l.jsxs("button",{className:"sync-btn download",onClick:v,disabled:n,children:[n?l.jsx(Xr,{className:"spin",size:20}):l.jsx(Tj,{size:20}),l.jsx("span",{children:"恢复数据"})]})]}),r==="success"&&l.jsxs("div",{className:"status-tip success",children:[l.jsx(_o,{size:14})," ",c]}),r==="error"&&l.jsxs("div",{className:"status-tip error",style:{background:"#ffebee",color:"#c62828"},children:[l.jsx(tm,{size:14})," ",c]})]}),l.jsxs("div",{className:"card local-card",children:[l.jsxs("div",{className:"card-header",children:[l.jsx("div",{className:"icon-box folder",children:l.jsx(Rj,{size:24})}),l.jsxs("div",{className:"card-title",children:[l.jsx("h3",{children:"本地导入"}),l.jsx("p",{children:"支持随手记CSV、系统备份JSON"})]})]}),l.jsx("div",{className:"import-area",onClick:()=>e.current.click(),children:l.jsxs("div",{className:"upload-placeholder",children:[l.jsx("div",{className:"up-icon",children:"⊕"}),l.jsx("p",{children:"点击选择文件 (CSV/JSON)"})]})}),l.jsx("input",{type:"file",ref:e,accept:".csv,.json",className:"hidden-input",onChange:p}),o&&l.jsxs("div",{className:"status-tip loading",children:[l.jsx(Xr,{className:"spin",size:14})," 正在处理..."]}),!o&&c&&!r&&l.jsxs("div",{className:"status-tip info",children:[c.includes("失败")?l.jsx(tm,{size:14}):l.jsx(_o,{size:14}),c]})]}),l.jsxs("div",{className:"tips-section",children:[l.jsx("h4",{children:"📝 导入说明"}),l.jsxs("ul",{children:[l.jsxs("li",{children:["支持",l.jsx("b",{children:"随手记"}),"导出文件的直接导入"]}),l.jsxs("li",{children:["支持本应用导出的 ",l.jsx("b",{children:"JSON"})," 备份文件恢复"]}),l.jsx("li",{children:"CSV文件请确保包含：日期、类型、金额、分类、账户 (会自动去除随手记头部)"})]})]})]}),d&&l.jsx("div",{className:"modal-overlay",onClick:()=>f(!1),children:l.jsxs("div",{className:"modal-content",onClick:y=>y.stopPropagation(),children:[l.jsxs("div",{className:"modal-header",children:[l.jsx("h3",{children:"同步设置"}),l.jsx("button",{onClick:()=>f(!1),children:l.jsx(ot,{size:20})})]}),l.jsxs("div",{className:"settings-form",children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"选择网盘"}),l.jsx("div",{className:"provider-options",children:["tianyi","baidu","dav"].map(y=>l.jsx("button",{className:`provider-btn ${h.provider===y?"active":""}`,onClick:()=>m({...h,provider:y}),children:b(y)},y))})]}),h.provider==="dav"&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"服务器地址 (WebDAV URL)"}),l.jsx("input",{type:"text",className:"form-input",value:h.davUrl,onChange:y=>m({...h,davUrl:y.target.value}),placeholder:"https://dav.jianguoyun.com/dav/"})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"用户名"}),l.jsx("input",{type:"text",className:"form-input",value:h.davUser,onChange:y=>m({...h,davUser:y.target.value})})]}),l.jsxs("div",{className:"form-group",children:[l.jsx("label",{children:"密码"}),l.jsx("input",{type:"password",className:"form-input",value:h.davPassword,onChange:y=>m({...h,davPassword:y.target.value}),placeholder:"WebDAV 密码"})]})]}),h.provider!=="dav"&&l.jsx("div",{className:"form-group",children:l.jsx("p",{style:{fontSize:12,color:"#999"},children:"百度网盘/天翼云盘 请使用其 WebDAV 代理服务，或者直接选择 WebDAV 模式填写对应地址。 (暂不支持直接 OAuth 登录)"})}),l.jsx("button",{className:"save-btn-full",onClick:()=>g(h),children:"保存并验证"})]})]})}),l.jsx("style",{children:`
        .import-page {
          background: #F5F6F8;
          min-height: 100vh;
        }
        .top-bar {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
        }
        .top-bar h1 { font-size: 18px; font-weight: 600; }
        .back-btn { border: none; background: none; padding: 4px; }
        
        .content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
        
        .card {
           background: #fff; border-radius: 16px; padding: 20px;
           box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        
        .card-header { display: flex; gap: 12px; margin-bottom: 20px; align-items: center; }
        .icon-box {
           width: 48px; height: 48px; border-radius: 12px;
           display: flex; align-items: center; justify-content: center;
        }
        .icon-box.cloud { background: #E3F2FD; color: #1565C0; }
        .icon-box.folder { background: #FFF3E0; color: #EF6C00; }
        
        .card-title { flex: 1; }
        .card-title h3 { font-size: 16px; font-weight: 600; margin: 0 0 4px 0; }
        .card-title p { font-size: 12px; color: #999; margin: 0; }

        .settings-btn { background: none; border: none; color: #999; padding: 8px; }
        
        .sync-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .sync-btn {
           display: flex; flex-direction: column; align-items: center; justify-content: center;
           gap: 8px; padding: 16px;
           border: 1px solid #eee; border-radius: 12px;
           background: #fafafa; color: #666; font-size: 13px;
        }
        .sync-btn:active { background: #f0f0f0; }
        .sync-btn.upload { color: #1565C0; background: #f5faff; border-color: #bbdefb; }
        .sync-btn.download { color: #2E7D32; background: #f1f8e9; border-color: #c8e6c9; }
        
        .import-area {
           border: 2px dashed #eee; border-radius: 12px;
           padding: 30px; text-align: center; cursor: pointer;
           transition: all 0.2s;
        }
        .import-area:active { background: #fafafa; border-color: #ddd; }
        .up-icon { font-size: 24px; color: #ccc; margin-bottom: 8px; }
        .upload-placeholder p { color: #999; font-size: 13px; margin: 0; }
        
        .hidden-input { display: none; }
        
        .status-tip {
           margin-top: 12px; padding: 10px; border-radius: 8px; font-size: 13px;
           display: flex; align-items: center; gap: 6px;
        }
        .status-tip.success { background: #E8F5E9; color: #2E7D32; }
        .status-tip.info { background: #E3F2FD; color: #1565C0; }
        .status-tip.loading { background: #FFF3E0; color: #EF6C00; }
        
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .tips-section { color: #999; font-size: 12px; padding: 0 8px; }
        .tips-section h4 { font-size: 13px; color: #666; margin-bottom: 8px; }
        .tips-section ul { padding-left: 20px; margin: 0; }
        .tips-section li { margin-bottom: 4px; }

        /* Modal & Form */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          background: #fff; width: 90%; max-width: 400px;
          border-radius: 16px; padding: 0; overflow: hidden;
        }
        .modal-header {
           padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;
           border-bottom: 1px solid #eee;
        }
        .modal-header h3 { font-size: 18px; margin: 0; }
        .modal-header button { background: none; border: none; }
        
        .settings-form { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .form-group label { display: block; font-size: 14px; margin-bottom: 8px; color: #666; }
        
        .provider-options { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        .provider-btn {
           padding: 8px; border: 1px solid #eee; border-radius: 8px; background: #fff; color: #666; font-size: 13px;
        }
        .provider-btn.active { background: #E3F2FD; color: #1565C0; border-color: #1565C0; }
        
        .form-input {
           width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;
        }
        
        .save-btn-full {
           width: 100%; padding: 12px; background: #FFB800; color: #fff; border: none; border-radius: 8px; font-size: 16px; margin-top: 8px;
        }
      `})]})}function a4(){const t=Ke(),[e,n]=E.useState(localStorage.getItem("add_trans_layout")||"tile"),s=()=>{const r=e==="tile"?"list":"tile";n(r),localStorage.setItem("add_trans_layout",r)};return l.jsxs("div",{className:"page settings-page",children:[l.jsx("div",{className:"top-header",children:l.jsxs("button",{className:"back-btn",onClick:()=>t(-1),children:[l.jsx(fn,{size:24}),l.jsx("span",{children:"记账设置"})]})}),l.jsxs("div",{className:"settings-list",children:[l.jsx("div",{className:"section-header",children:"记一笔设置"}),l.jsxs("div",{className:"settings-group",children:[l.jsxs("div",{className:"settings-item",onClick:s,children:[l.jsxs("div",{className:"item-left",children:[l.jsx("span",{className:"item-icon",children:"📝"}),l.jsx("span",{className:"item-label",children:"记一笔样式"})]}),l.jsxs("div",{className:"item-right",children:[l.jsx("span",{className:"value-text",children:e==="tile"?"平铺模式":"列表模式"}),l.jsx($e,{size:16,color:"#ccc"})]})]}),l.jsxs("div",{className:"settings-item",children:[l.jsxs("div",{className:"item-left",children:[l.jsx("span",{className:"item-icon",children:"🔲"}),l.jsx("span",{className:"item-label",children:"流水类型"})]}),l.jsx("div",{className:"item-right",children:l.jsx($e,{size:16,color:"#ccc"})})]}),l.jsxs("div",{className:"settings-item",children:[l.jsxs("div",{className:"item-left",children:[l.jsx("span",{className:"item-icon",children:"⚙️"}),l.jsx("span",{className:"item-label",children:"记账选项"})]}),l.jsx("div",{className:"item-right",children:l.jsx($e,{size:16,color:"#ccc"})})]})]}),l.jsx("div",{className:"section-header",children:"记账设置"}),l.jsx("div",{className:"settings-group",children:l.jsxs("div",{className:"settings-item",children:[l.jsxs("div",{className:"item-left",children:[l.jsx("span",{className:"item-icon",children:"📅"}),l.jsx("span",{className:"item-label",children:"自定义月起始日"}),l.jsx("span",{className:"badge-free",children:"限免中"})]}),l.jsxs("div",{className:"item-right",children:[l.jsx("span",{className:"value-text",children:"每月1日"}),l.jsx($e,{size:16,color:"#ccc"})]})]})})]}),l.jsx("style",{children:`
        .settings-page {
          background: #F5F6F8;
          min-height: 100vh;
        }
        
        .top-header {
          background: #fff;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          border: none;
          background: none;
          font-size: 17px;
          font-weight: 500;
          color: #333;
        }

        .settings-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
        }

        .section-header {
            font-size: 12px;
            color: #999;
            margin-bottom: 8px;
            margin-left: 4px;
        }

        .settings-group {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #f9f9f9;
          cursor: pointer;
        }
        
        .settings-item:last-child {
          border-bottom: none;
        }
        
        .settings-item:active {
          background-color: #f5f5f5;
        }

        .item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .item-icon {
            font-size: 18px;
            width: 24px;
            text-align: center;
        }

        .item-label {
          font-size: 15px;
          color: #333;
        }

        .badge-free {
            font-size: 10px;
            color: #fff;
            background: #FF6B6B;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 8px;
        }

        .item-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .value-text {
          font-size: 13px;
          color: #999;
        }
      `})]})}function l4(){const t=Ke(),[e,n]=E.useState([]),[s,r]=E.useState(!0),i=localStorage.getItem("user_id")?Number(localStorage.getItem("user_id")):null;E.useEffect(()=>{if(!i){t("/login");return}a()},[i]);const o=()=>{localStorage.clear(),t("/login")},a=async()=>{try{await mi();let d=await $g(i);d.length===0&&(await Ld(i,"默认账本","QuickBookDB"),d=await $g(i)),n(d)}catch(d){console.error(d),alert("加载账本失败")}finally{r(!1)}},c=async d=>{try{await q1(d.dbName),localStorage.setItem("current_book_id",d.id),localStorage.setItem("current_book_name",d.name),localStorage.setItem("current_db_name",d.dbName),t("/")}catch(f){console.error(f),alert("打开账本失败")}},u=async()=>{const d=prompt("请输入新账本名称:");if(d)try{await Ld(i,d),a()}catch(f){alert("创建失败: "+f.message)}};return l.jsxs("div",{className:"page book-list-page",children:[l.jsxs("div",{className:"header",children:[l.jsx("h1",{children:"我的账本"}),l.jsx("button",{className:"user-btn",onClick:o,children:l.jsx(Gy,{size:20,color:"#666"})})]}),l.jsxs("div",{className:"book-grid",children:[e.map(d=>l.jsxs("div",{className:"book-card",onClick:()=>c(d),children:[l.jsx("div",{className:"book-cover",children:d.cover}),l.jsxs("div",{className:"book-info",children:[l.jsx("span",{className:"book-name",children:d.name}),l.jsx("span",{className:"book-date",children:new Date(d.created_at).toLocaleDateString()})]})]},d.id)),l.jsxs("div",{className:"book-card add-card",onClick:u,children:[l.jsx(It,{size:32,color:"#ccc"}),l.jsx("span",{className:"add-text",children:"新建账本"})]})]}),l.jsx("style",{children:`
                .book-list-page {
                    background: #f5f6fa;
                    min-height: 100vh;
                    padding: 20px;
                }
                .header {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 30px; padding-top: var(--safe-area-top);
                }
                .header h1 { font-size: 24px; color: #333; }
                
                .book-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 20px;
                }

                .book-card {
                    background: #fff;
                    border-radius: 16px;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    cursor: pointer;
                    transition: transform 0.1s;
                }
                .book-card:active { transform: scale(0.98); }

                .book-cover {
                    font-size: 48px;
                    width: 80px; height: 100px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff;
                    box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
                }

                .book-info {
                    display: flex; flex-direction: column; align-items: center;
                }
                .book-name { font-size: 15px; font-weight: 600; color: #333; }
                .book-date { font-size: 11px; color: #999; margin-top: 4px; }

                .add-card {
                    border: 2px dashed #ddd;
                    background: none;
                    box-shadow: none;
                    justify-content: center;
                }
                .add-text { color: #999; font-size: 14px; }
            `})]})}function c4(){const t=Ke(),[e,n]=E.useState(!1),[s,r]=E.useState(""),[i,o]=E.useState(""),[a,c]=E.useState(""),u=async d=>{if(d.preventDefault(),c(""),!s||!i)return c("请输入用户名和密码");try{let f;e?f=await fE(s,i):f=await hE(s,i),localStorage.setItem("user_id",f.id),localStorage.setItem("username",f.username),t("/books")}catch(f){c(f.message)}};return l.jsxs("div",{className:"login-page",children:[l.jsxs("div",{className:"login-card",children:[l.jsx("div",{className:"logo",children:"💰"}),l.jsx("h1",{children:"极速记账"}),l.jsx("p",{className:"subtitle",children:e?"注册新账号，开启财富之旅":"欢迎回来，登录您的账号"}),a&&l.jsx("div",{className:"error-msg",children:a}),l.jsxs("form",{onSubmit:u,children:[l.jsx("div",{className:"input-group",children:l.jsx("input",{type:"text",placeholder:"用户名",value:s,onChange:d=>r(d.target.value)})}),l.jsx("div",{className:"input-group",children:l.jsx("input",{type:"password",placeholder:"密码",value:i,onChange:d=>o(d.target.value)})}),l.jsx("button",{type:"submit",className:"submit-btn",children:e?"立即注册":"登 录"})]}),l.jsx("div",{className:"toggle-link",onClick:()=>n(!e),children:e?"已有账号？去登录":"没有账号？去注册"})]}),l.jsx("style",{children:`
                .login-page {
                    height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }
                .login-card {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 40px 30px;
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
                    width: 100%;
                    max-width: 360px;
                    display: flex; flex-direction: column; align-items: center;
                    backdrop-filter: blur(10px);
                }
                .logo { 
                    font-size: 56px; 
                    margin-bottom: 16px; 
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
                    transition: transform 0.3s ease;
                }
                .logo:hover { transform: scale(1.1) rotate(5deg); }
                h1 { 
                    font-size: 26px; 
                    color: #2c3e50; 
                    margin-bottom: 8px; 
                    font-weight: 700;
                    letter-spacing: 1px;
                }
                .subtitle { 
                    color: #7f8c8d; 
                    margin-bottom: 32px; 
                    font-size: 14px; 
                }
                
                .error-msg {
                    background: #ffecb3; 
                    color: #d35400;
                    padding: 12px; 
                    border-radius: 12px; 
                    font-size: 13px;
                    width: 100%; 
                    margin-bottom: 20px; 
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 500;
                }

                form { width: 100%; display: flex; flex-direction: column; gap: 20px; }
                
                .input-group input {
                    width: 100%;
                    padding: 16px; 
                    border: 2px solid transparent; 
                    border-radius: 16px;
                    background: #f0f2f5; 
                    outline: none; 
                    transition: all 0.3s ease;
                    font-size: 15px;
                    color: #34495e;
                    box-sizing: border-box;
                }
                .input-group input:focus { 
                    border-color: #4CAF50; 
                    background: #fff; 
                    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
                }
                .input-group input::placeholder { color: #aab7b8; }
                
                .submit-btn {
                    padding: 16px; 
                    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); 
                    color: #fff;
                    border: none; 
                    border-radius: 16px; 
                    font-weight: 700; 
                    font-size: 16px;
                    cursor: pointer; 
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 20px rgba(67, 233, 123, 0.3);
                    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
                }
                .submit-btn:hover { 
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(67, 233, 123, 0.4);
                }
                .submit-btn:active { transform: translateY(0); }

                .toggle-link {
                    margin-top: 24px; 
                    color: #95a5a6; 
                    font-size: 14px; 
                    cursor: pointer;
                    transition: color 0.2s;
                    user-select: none;
                }
                .toggle-link:hover { color: #4CAF50; text-decoration: underline; }
            `})]})}function u4(){const t=Ke(),e=[{path:"/",icon:Uj,label:"流水"},{path:"/statistics",icon:Mj,label:"报表"},{action:"add",icon:It,label:"记一笔",isCenter:!0},{path:"/calendar",icon:So,label:"日历"},{path:"/settings",icon:Kf,label:"设置"}];return l.jsx("nav",{className:"bottom-nav",children:e.map((n,s)=>n.isCenter?l.jsx("button",{className:"nav-add-btn",onClick:()=>t("/add"),"aria-label":"记一笔",children:l.jsx(It,{size:28,strokeWidth:2.5})},"add"):l.jsxs(hj,{to:n.path,className:({isActive:r})=>`nav-item ${r?"active":""}`,children:[l.jsx(n.icon,{className:"nav-icon",size:22}),l.jsx("span",{className:"nav-label",children:n.label})]},n.path))})}function d4(){const t=Ke(),e=$s(),[n,s]=E.useState(!1),[r,i]=E.useState(!0);E.useEffect(()=>{(async()=>{const u=localStorage.getItem("user_id"),d=localStorage.getItem("current_db_name"),f=["/login"].includes(e.pathname),h=e.pathname==="/books";if(!u)if(f){s(!0),i(!1);return}else return i(!1),t("/login");if(u){if(h){s(!0),i(!1);return}if(!d)return i(!1),t("/books");try{await q1(d),s(!0),o()}catch(m){console.error("数据库初始化失败:",m)}finally{i(!1)}}})()},[t,e.pathname]);const o=async()=>{try{const c=pe();if(!c.objectStoreNames.contains("recurring_rules"))return;const u=await c.getAll("recurring_rules"),d=new Date,f=`${d.getFullYear()}-${d.getMonth()+1}`,h=d.getDate();for(const m of u){let g=!1;if(m.lastRun){const x=new Date(m.lastRun);`${x.getFullYear()}-${x.getMonth()+1}`===f&&(g=!0)}if(!g&&h>=m.day){console.log(`执行自动记账: ${m.remark}`);const x={type:m.type,amount:m.amount,categoryId:m.categoryId,accountId:m.accountId,date:new Date().toISOString(),remark:m.remark+" (自动记账)",fromAccountId:m.fromAccountId,toAccountId:m.toAccountId};await X1(x),m.lastRun=new Date().toISOString(),await c.put("recurring_rules",m)}}}catch(c){console.error("周期记账检查失败:",c)}};if(r)return l.jsxs("div",{className:"loading-screen",children:[l.jsx("div",{className:"loading-spinner"}),l.jsx("p",{children:"加载中..."}),l.jsx("style",{children:`
          .loading-screen {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            color: #999;
            background: #f5f6fa;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #eee;
            border-top-color: #FFB800;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `})]});if(!n)return l.jsx("div",{className:"error-screen",children:l.jsx("p",{children:"数据库初始化失败，请刷新页面重试"})});const a=e.pathname==="/";return l.jsxs("div",{className:"app",children:[l.jsxs(ej,{children:[l.jsx(Ze,{path:"/",element:l.jsx(oE,{})}),l.jsx(Ze,{path:"/records",element:l.jsx(aE,{})}),l.jsx(Ze,{path:"/statistics",element:l.jsx(lE,{})}),l.jsx(Ze,{path:"/settings",element:l.jsx(mE,{})}),l.jsx(Ze,{path:"/settings/bookkeeping",element:l.jsx(a4,{})}),l.jsx(Ze,{path:"/recurring",element:l.jsx(OM,{})}),l.jsx(Ze,{path:"/add",element:l.jsx(qg,{})}),l.jsx(Ze,{path:"/add/:type",element:l.jsx(qg,{})}),l.jsx(Ze,{path:"/accounts",element:l.jsx(xM,{})}),l.jsx(Ze,{path:"/budget",element:l.jsx(yM,{})}),l.jsx(Ze,{path:"/projects",element:l.jsx(vM,{})}),l.jsx(Ze,{path:"/calendar",element:l.jsx(bM,{})}),l.jsx(Ze,{path:"/members",element:l.jsx(MM,{})}),l.jsx(Ze,{path:"/category-tags",element:l.jsx(PM,{})}),l.jsx(Ze,{path:"/category-manage",element:l.jsx(AM,{})}),l.jsx(Ze,{path:"/merchants",element:l.jsx(TM,{})}),l.jsx(Ze,{path:"/templates",element:l.jsx(zM,{})}),l.jsx(Ze,{path:"/import",element:l.jsx(o4,{})}),l.jsx(Ze,{path:"/login",element:l.jsx(c4,{})}),l.jsx(Ze,{path:"/books",element:l.jsx(l4,{})})]}),a&&l.jsx(u4,{})]})}yu.createRoot(document.getElementById("root")).render(l.jsx(Px.StrictMode,{children:l.jsx(cj,{children:l.jsx(d4,{})})}));
