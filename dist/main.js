module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=7)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-native-eventemitter")},function(e,t){e.exports=require("react-native")},function(e,t){e.exports=require("@react-native-community/async-storage")},function(e,t){e.exports=require("@emotion/hash")},function(e,t){e.exports=require("lodash.kebabcase")},function(e,t){e.exports=require("axios")},function(e,t,n){"use strict";n.r(t),n.d(t,"Editmode",(function(){return i})),n.d(t,"Chunk",(function(){return x})),n.d(t,"ChunkCollection",(function(){return D})),n.d(t,"ChunkFieldValue",(function(){return H})),n.d(t,"useChunk",(function(){return w})),n.d(t,"useGetChunk",(function(){return J})),n.d(t,"useText",(function(){return L})),n.d(t,"refreshChunks",(function(){return K}));var r=n(0),o=n.n(r);const c=Object(r.createContext)({branch:null,projectId:null,defaultChunks:[]});function i(e){var t=e.children,n=e.projectId,r=e.defaultChunks,i=e.branchId;if(!n)throw new Error("<Editmode projectId={...}> is missing a valid projectId");var a=i;return o.a.createElement(c.Provider,{value:{branch:a,projectId:n,defaultChunks:r}},t)}var a=n(1),u=n.n(a),l=n(3),s=n.n(l),f=n(2);const d="web"===f.Platform.OS?e=>localStorage.getItem(e):async e=>{try{return await s.a.getItem(e)}catch(e){console.error("Error in fetching chunk.",e)}},p="web"===f.Platform.OS?(e,t)=>localStorage.setItem(e,JSON.stringify(t)):async(e,t)=>{try{await s.a.setItem(e,JSON.stringify(t))}catch(e){console.error("Error in saving chunk.",e)}};var h=n(4),y=n.n(h),m=n(5),b=n.n(m);const v=(e,t,n)=>{let r={...e};const o=(r.content.match(/\{{(.*?)\}}/g)||[]).map(e=>e.substr(2,e.length-4));let c=!0;return o&&o.forEach((function(e){const n=t&&t[e]||"";r.content=r.content.replace(`{{${e}}}`,n),n||(c=!1)})),!c&&n&&(r=v(n,t,null)),r};var g=n(6);const O=n.n(g).a.create({baseURL:"https://api2.editmode.com/",headers:{Accept:"application/json"}});function j(){return(j=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var k=function(e,t){var n=t.imageHeight?t.imageHeight:50,r=t.imageWidth?t.imageWidth:50,c={"data-chunk":e.identifier,"data-chunk-editable":!0,"data-chunk-content-key":e.content_key,"data-chunk-type":e.chunk_type,key:e.identifier};switch(e.chunk_type){case"single_line_text":case"long_text":return o.a.createElement(f.Text,j({},c,t),e.content);case"rich_text":return o.a.createElement(f.Text,j({},c,{class:"editmode-richtext-editor"},t),e.content);case"image":return o.a.createElement(f.Image,j({},c,{source:{uri:e.content},style:{height:n,width:r},"data-chunk-editable":!1},t));default:return o.a.createElement(f.Text,t,e.content)}};function w(e="",{identifier:t,type:n,contentKey:o,variables:i}){const{projectId:a,defaultChunks:l,branch:s}=Object(r.useContext)(c),[f,h]=Object(r.useState)(void 0);o||(o=e?function(e){if("string"==typeof e)return`${b()(e.slice(0,32))}-${y()(e)}`;console.error(`Cannot compute chunk.content_key. Expected a string, received ${typeof e}.`)}(e):null);const m=t||o+a;let g;function j(e,n){O.get(e).then(e=>{if(p(m,e.data),!n){const t=v(e.data,i,g);h(t)}}).catch(e=>{console.warn(`Something went wrong trying to retrieve chunk data: ${e}. Have you provided the correct Editmode identifier (${t||o}) as a prop to your Chunk component instance?`)})}return void 0!==l&&(g=Object(r.useMemo)(()=>t?l.find(e=>e.identifier===t):l.find(e=>e.content_key===o&&e.project_id==a),[l,t])),Object(r.useEffect)(()=>{(async()=>{let r=await d(m);const c=r?JSON.parse(r):g||{chunk_type:n||"single_line_text",content:e,content_key:o};c&&h(v(c,i,g));const l=`chunks/${t||o}?project_id=${a}${s?"&branch_id="+s:""}`;j(l,r),u.a.on("refreshChunk",()=>j(l,null))})()},[m]),f?{Component:e=>k(f,e),content:f.content}:{Component:()=>null}}function _(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function x(e){var t=e.children,n=e.identifier,r=e.src,c=e.contentKey,i=_(e,["children","identifier","src","contentKey"]),a=w(r||t,{identifier:n,type:r?"image":void 0,contentKey:c,variables:i.variables}).Component;return o.a.createElement(a,i)}const P=Object(r.createContext)(null);function S(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function C(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?S(Object(n),!0).forEach((function(t){E(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):S(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function I(e,t,n,r,o,c,i){try{var a=e[c](i),u=a.value}catch(e){return void n(e)}a.done?t(u):Promise.resolve(u).then(r,o)}function $(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=e&&("undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]);if(null==n)return;var r,o,c=[],i=!0,a=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);i=!0);}catch(e){a=!0,o=e}finally{try{i||null==n.return||n.return()}finally{if(a)throw o}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return N(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return N(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function N(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function D(e){var t=e.children,n=e.className,c=e.identifier,i=e.limit,a=void 0===i?"":i,u=e.tags,l=void 0===u?[]:u,s=e.itemClass,f=void 0===s?"":s,h=$(Object(r.useState)([]),2),y=h[0],m=h[1],b=c+a+l.join("");if(Object(r.useEffect)((function(){var e;(e=regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d(b);case 2:(t=e.sent)&&(n=JSON.parse(t),m(n)),r=new URLSearchParams({limit:a,collection_identifier:c}),l.forEach((function(e){return r.append("tags[]",e)})),O.get("chunks?".concat(r)).then((function(e){p(b,e.data.chunks),t||m(e.data.chunks)})).catch((function(e){console.error("Something went wrong trying to retrieve chunk collection: ".concat(e,". Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?"))}));case 7:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,o){var c=e.apply(t,n);function i(e){I(c,r,o,i,a,"next",e)}function a(e){I(c,r,o,i,a,"throw",e)}i(void 0)}))})()}),[c]),null==y||!y.length)return null;var v=y.length?C(C({},y[0]),{},{placeholder:!0}):{};return o.a.createElement("div",{className:n+" chunks-collection-wrapper","data-chunk-cache-id":b,"data-chunk-collection-identifier":c},y.map((function(e){return o.a.createElement(P.Provider,{key:e.identifier,value:e},o.a.createElement("div",{className:"chunks-collection-item--wrapper"},t))})),y.length&&o.a.createElement(P.Provider,{key:y[0].identifier+"dummy",value:v},o.a.createElement("div",{className:f+" chunks-col-placeholder-wrapper chunks-hide"},t)))}function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function A(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?q(Object(n),!0).forEach((function(t){T(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function M(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function H(e){e.children;var t=e.identifier,n=M(e,["children","identifier"]),o=Object(r.useContext)(P);if(!o)return null;var c=o.content.find((function(e){return e.custom_field_identifier===t||e.custom_field_name===t}));if(!c)return console.warn("Could not find field ".concat(t," for ").concat(o.collection.name)),null;var i=(null==o?void 0:o.placeholder)&&A(A({},c),{},{identifier:"",content:"image"===c.chunk_type?"https://editmode.com/upload.png":""});return o&&c&&(n=A(A({},n),{},{"data-parent-identifier":o.identifier,"data-custom-field-identifier":c.custom_field_identifier})),k(i||c,n)}const J=(e,t="",n="")=>{const{projectId:o}=Object(r.useContext)(c),[i,a]=Object(r.useState)(o),[u,l]=Object(r.useState)(void 0);const s=e+i+n;if(Object(r.useEffect)(()=>{},[s]),n&&u&&"collection_item"==u.chunk_type){n=n.toLowerCase();const t=u.content.find(e=>e.custom_field_identifier.toLowerCase()==n||e.custom_field_name.toLowerCase()==n);if(!t)return console.error(`We can't find a ${e} content with ${n} field`),"";l(t)}return u&&u.content||""};function L(e,t=!0){const[n,o]=Object(r.useState)([]),c=e+"_text_chunks";if(!t)return{};const i=(e,t)=>{O.get(e).then(e=>{if(e.data.error)throw e.data.error;p(c,e.data.chunks),t||o(e.data.chunks)}).catch(e=>{console.error(`Something went wrong trying to retrieve the chunks ${e}. Have you provided the correct Editmode identifier as a prop to your ChunkCollection component instance?`)})};if(Object(r.useEffect)(()=>{(async()=>{const t=await d(c);if(t){const e=JSON.parse(t);o(e)}const n="text_chunks?project_id="+e;i(n,t),u.a.on("refreshChunk",()=>i(n,null))})()},[e]),!n&&!n.length)return null;let a={};return n&&n.forEach(e=>{if(null!==e.content_key&&("single_line_text"==e.chunk_type||"long_text"==e.chunk_type))return a[e.content_key]=e.content}),a}function K(){u.a.emit("refreshChunk")}}]);