(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){"use strict";n(1);var a=n(9),c=(n(51),n(0));t.a=function(e){return e.href?Object(c.jsx)("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href,children:e.children}):e.to?Object(c.jsx)(a.b,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),children:e.children}):Object(c.jsx)("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"," ").concat(e.active&&"button--active"," ").concat(e.isClicked&&"button--active"),type:e.type,onClick:e.onClick,disabled:e.disabled,id:e.id||null,name:e.payment||null,value:e.id,children:e.children})}},,function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(6),c=n.n(a),r=n(12),i=n(2),s=n(1),o=function(){var e=Object(s.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1],o=Object(s.useState)(),l=Object(i.a)(o,2),u=l[0],d=l[1],j=Object(s.useRef)([]),b=Object(s.useCallback)(function(){var e=Object(r.a)(c.a.mark((function e(t){var n,r,i,s,o,l,u=arguments;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:"GET",r=u.length>2&&void 0!==u[2]?u[2]:null,i=u.length>3&&void 0!==u[3]?u[3]:{},a(!0),s=new AbortController,j.current.push(s),e.prev=6,e.next=9,fetch(t,{method:n,body:r,headers:i,signal:s.signal});case 9:return o=e.sent,e.next=12,o.json();case 12:if(l=e.sent,j.current=j.current.filter((function(e){return e!==s})),o.ok){e.next=16;break}throw new Error(l.message);case 16:return a(!1),e.abrupt("return",l);case 20:throw e.prev=20,e.t0=e.catch(6),d(e.t0.message),a(!1),e.t0;case 25:case"end":return e.stop()}}),e,null,[[6,20]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(s.useEffect)((function(){return function(){j.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:n,error:u,sendRequest:b,clearError:function(){d(null)}}}},function(e,t,n){"use strict";n(1),n(58);var a=n(0);t.a=function(e){return Object(a.jsx)("div",{className:"".concat(e.asOverlay&&"loading-spinner__overlay"),children:Object(a.jsx)("div",{className:"lds-dual-ring"})})}},,,,function(e,t,n){"use strict";n(1);var a=n(36),c=n(14),r=n(0);t.a=function(e){return Object(r.jsx)(a.a,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:Object(r.jsx)(c.a,{onClick:e.onClear,children:"Okay"}),children:Object(r.jsx)("p",{children:e.error})})}},function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(1),c=Object(a.createContext)({isLoggedIn:!1,userId:null,token:null,role:null,login:function(){},logout:function(){}})},function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var a=n(3),c=n(2),r=n(1),i=n(19),s=function(e){return{itemCount:e.reduce((function(e,t){return e+t.quantity}),0),total:e.reduce((function(e,t){return e+t.price*t.quantity}),0)}},o=function(e,t){switch(t.type){case"ADD_ITEM":return e.cartItems.find((function(e){return e.id===t.payload.id}))||e.cartItems.push(Object(a.a)(Object(a.a)({},t.payload),{},{quantity:1})),Object(a.a)(Object(a.a)({},e),{},{cartItems:Object(i.a)(e.cartItems)},s(e.cartItems));case"REMOVE_ITEM":var n=e.cartItems.filter((function(e){return e.id!==t.payload.id}));return Object(a.a)(Object(a.a)({},e),{},{cartItems:Object(i.a)(n)},s(n));case"INCREASE":var c=e.cartItems.findIndex((function(e){return e.id===t.payload.id}));return e.cartItems[c].quantity++,Object(a.a)(Object(a.a)({},e),{},{cartItems:Object(i.a)(e.cartItems)},s(e.cartItems));case"DECREASE":var r=e.cartItems.findIndex((function(e){return e.id===t.payload.id}));return e.cartItems[r].quantity--,Object(a.a)(Object(a.a)({},e),{},{cartItems:Object(i.a)(e.cartItems)},s(e.cartItems));case"ADD_BONUS_ITEM":var o={id:t.payload._id,item:t.payload.name,quantity:1,price:0};return Object(a.a)(Object(a.a)(Object(a.a)({},e),{},{cartItems:Object(i.a)(e.cartItems)},s(e.cartItems)),{},{bonusItem:o});default:return e}},l=n(0),u=Object(r.createContext)(),d={cartItems:[],itemCount:0,total:0,bonusItem:!1};t.b=function(e){var t=e.children,n=Object(r.useReducer)(o,d),i=Object(c.a)(n,2),s=i[0],j=i[1],b=Object(a.a)(Object(a.a)({},s),{},{addProduct:function(e){return j({type:"ADD_ITEM",payload:e})},removeProduct:function(e){return j({type:"REMOVE_ITEM",payload:e})},increase:function(e){return j({type:"INCREASE",payload:e})},decrease:function(e){return j({type:"DECREASE",payload:e})},addBonusItem:function(e){return j({type:"ADD_BONUS_ITEM",payload:e})}});return Object(l.jsx)(u.Provider,{value:b,children:t})}},,function(e,t,n){"use strict";n(1);var a=n(11),c=n.n(a),r=(n(59),n(0));t.a=function(e){return c.a.createPortal(Object(r.jsx)("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))}},function(e,t,n){"use strict";var a=n(2),c=n(3),r=n(1),i=n(30),s=(n(57),n(0)),o=function(e,t){switch(t.type){case"CHANGE":return Object(c.a)(Object(c.a)({},e),{},{value:t.val,isValid:!t.validators||Object(i.e)(t.val,t.validators)});case"TOUCH":return Object(c.a)(Object(c.a)({},e),{},{isTouched:!0});default:return e}};t.a=function(e){var t=Object(r.useReducer)(o,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),n=Object(a.a)(t,2),c=n[0],i=n[1],l=e.id,u=e.onInput,d=c.value,j=c.isValid;Object(r.useEffect)((function(){u(l,d,j)}),[l,d,j,u]);var b=function(t){i({type:"CHANGE",val:t.target.value,validators:e.validators})},O=function(){i({type:"TOUCH"})},p="input"===e.element?Object(s.jsx)("input",{id:e.id,type:e.type,min:e.min,max:e.max,placeholder:e.placeholder,onChange:b,onBlur:O,value:c.value}):"select"===e.element?Object(s.jsxs)("select",{id:e.id,name:e.name,onChange:b,onBlur:O,value:c.value,children:[Object(s.jsx)("option",{value:"",children:"Wybierz"}),e.options]}):Object(s.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:b,onBlur:O,value:c.value});return Object(s.jsxs)("div",{className:"form-control ".concat(!c.isValid&&c.isTouched&&"form-control--invalid"),children:[Object(s.jsx)("label",{htmlFor:e.id,children:e.label}),p,!c.isValid&&c.isTouched&&Object(s.jsx)("p",{style:"zipCode_start"===e.id||"zipCode_end"===e.id?{position:"absolute",left:"20%"}:{},children:e.errorText})]})}},,,,function(e,t,n){"use strict";n.d(t,"d",(function(){return o})),n.d(t,"c",(function(){return l})),n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return d})),n.d(t,"e",(function(){return j}));var a=n(39),c="REQUIRE",r="MINLENGTH",i="MAXLENGTH",s="EMAIL",o=function(){return{type:c}},l=function(e){return{type:"MIN",val:e}},u=function(e){return{type:"MAX",val:e}},d=function(){return{type:s}},j=function(e,t){var n,o=!0,l=Object(a.a)(t);try{for(l.s();!(n=l.n()).done;){var u=n.value;u.type===c&&(o=o&&e.trim().length>0),u.type===r&&(o=o&&e.trim().length>=u.val),u.type===i&&(o=o&&e.trim().length<=u.val),"MIN"===u.type&&(o=o&&+e>=u.val),"MAX"===u.type&&(o=o&&+e<=u.val),u.type===s&&(o=o&&/^\S+@\S+\.\S+$/.test(e))}}catch(d){l.e(d)}finally{l.f()}return o}},function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(2),c=n(24),r=n(3),i=n(1),s=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var a in e.inputs)e.inputs[a]&&(n=a===t.inputId?n&&t.isValid:n&&e.inputs[a].isValid);return Object(r.a)(Object(r.a)({},e),{},{inputs:Object(r.a)(Object(r.a)({},e.inputs),{},Object(c.a)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},o=function(e,t){var n=Object(i.useReducer)(s,{inputs:e,isValid:t}),c=Object(a.a)(n,2),r=c[0],o=c[1];return[r,Object(i.useCallback)((function(e,t,n){o({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),Object(i.useCallback)((function(e,t){o({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},function(e,t,n){"use strict";n(1),n(65);var a=n(0);t.a=function(e){return Object(a.jsx)("div",{className:"card ".concat(e.className),style:e.style,children:e.children})}},function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(2),c=n(1),r=function(){var e=Object(c.useState)(!1),t=Object(a.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)(!1),s=Object(a.a)(i,2),o=s[0],l=s[1],u=Object(c.useState)(!1),d=Object(a.a)(u,2),j=d[0],b=d[1],O=Object(c.useState)(!1),p=Object(a.a)(O,2),f=p[0],h=p[1];return Object(c.useEffect)((function(){var e=(new Date).getDay(),t=(new Date).getHours(),n=(new Date).getMinutes();switch(b(t),h(n),e){default:r("Niedziela"),l("616866d188b1a5c67bdb3547");break;case 1:r("Poniedzia\u0142ek"),l("6168665588b1a5c67bdb3539");break;case 2:r("Wtorek"),l("6168666588b1a5c67bdb353b");break;case 3:r("\u015aroda"),l("6168667c88b1a5c67bdb353d");break;case 4:r("Czwartek"),l("6168669588b1a5c67bdb3540");break;case 5:r("Pi\u0105tek"),l("616866bd88b1a5c67bdb3543");break;case 6:r("Sobota"),l("616866c888b1a5c67bdb3545")}}),[]),{today:n,dayId:o,currentHour:j,currentMinute:f}}},,,function(e,t,n){"use strict";var a=n(3),c=n(1),r=n.n(c),i=n(11),s=n.n(i),o=n(67),l=n(25),u=(n(60),n(0)),d=function(e){var t=Object(u.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[Object(u.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:e.header}),Object(u.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[Object(u.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),Object(u.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});return s.a.createPortal(t,document.getElementById("modal-hook"))};t.a=function(e){return Object(u.jsxs)(r.a.Fragment,{children:[e.show&&Object(u.jsx)(l.a,{onClick:e.onCancel}),Object(u.jsx)(o.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:Object(u.jsx)(d,Object(a.a)({},e))})]})}},,,,,function(e,t,n){},,,,,,,,,function(e,t,n){},function(e,t,n){},,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a,c=n(1),r=n.n(c),i=n(11),s=n.n(i),o=(n(50),n(6)),l=n.n(o),u=n(12),d=n(2),j=n(14),b=n(26),O=n(16),p=n(17),f=n(21),h=n(31),m=(n(61),n(9)),x=n(22),v=n(0),y=function(){var e=Object(O.a)(),t=e.isLoading,n=e.error,a=e.sendRequest,i=e.clearError,s=Object(c.useContext)(x.a),o=Object(h.a)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1),y=Object(d.a)(o,2),g=y[0],k=y[1],I=function(){var e=Object(u.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,a("".concat("https://niepospolita-restauracja.herokuapp.com","/api/user/login"),"POST",JSON.stringify({email:g.inputs.email.value,password:g.inputs.password.value}),{"Content-Type":"application/json"});case 4:n=e.sent,s.login(n.userId,n.token,n.role),alert("zalogowano"),window.location.reload(),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(1);case 12:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(v.jsxs)(r.a.Fragment,{children:[Object(v.jsx)(f.a,{error:n,onClear:i}),t&&Object(v.jsx)(p.a,{asOverlay:!0}),Object(v.jsxs)("div",{className:"admin-header",children:[Object(v.jsx)(m.b,{to:"/",children:"Wr\xf3\u0107 na stron\u0119 g\u0142\xf3wn\u0105"}),!s.isLoggedIn&&Object(v.jsxs)("form",{onSubmit:I,children:[Object(v.jsx)(b.a,{id:"email",element:"input",type:"email",label:"login:",onInput:k}),Object(v.jsx)(b.a,{id:"password",element:"input",type:"text",label:"has\u0142o:",onInput:k}),Object(v.jsx)(j.a,{type:"submit",disabled:!g.isValid,children:"ZALOGUJ"})]}),s.isLoggedIn&&Object(v.jsx)(j.a,{onClick:function(){return s.logout()},children:"Wyloguj"})]})]})},g=n(4),k=(n(62),function(){return Object(v.jsxs)("ul",{className:"nav",children:[Object(v.jsx)("li",{className:"main-navigation",children:Object(v.jsx)(m.c,{to:"/",exact:!0,children:"Zam\xf3w"})}),Object(v.jsx)("li",{className:"main-navigation",children:Object(v.jsx)(m.c,{to:"/koszyk",exact:!0,children:Object(v.jsx)("span",{class:"fas fa-shopping-cart"})})})]})}),I=n(67),N=(n(63),function(e){var t=Object(v.jsx)(I.a,{in:e.show,timeout:200,classNames:"slide-in-left",mountOnEnter:!0,unmountOnExit:!0,children:Object(v.jsx)("aside",{className:"side-drawer",onClick:e.onClick,children:e.children})});return s.a.createPortal(t,document.getElementById("drawer-hook"))}),w=n(25),E=n.p+"static/media/logo.f284211f.png",C=function(){var e=Object(c.useState)(!1),t=Object(d.a)(e,2),n=t[0],a=t[1],i=Object(O.a)(),s=i.error,o=i.clearError,l=function(){a(!1)};return Object(v.jsxs)(r.a.Fragment,{children:[Object(v.jsx)(f.a,{error:s,onClear:o}),n&&Object(v.jsx)(w.a,{onClick:l}),Object(v.jsx)(N,{show:n,onClick:l,children:Object(v.jsx)("nav",{className:"main-navigation__drawer-nav",children:Object(v.jsx)(k,{})})}),Object(v.jsxs)("div",{className:"header",children:[Object(v.jsx)("a",{href:"https://niepospolita-lublin.com",className:"logo-link",exact:!0,children:Object(v.jsxs)("div",{className:"logo title",children:[Object(v.jsx)("img",{src:E,alt:"logo",className:"logo"}),Object(v.jsx)("span",{children:"Niepospolita Restauracja"})]})}),Object(v.jsxs)("button",{className:"main-navigation__menu-btn",onClick:function(){a(!0)},children:[Object(v.jsx)("span",{}),Object(v.jsx)("span",{}),Object(v.jsx)("span",{})]}),Object(v.jsx)("div",{className:"navigation",children:Object(v.jsx)(k,{})})]})]})},S=(n(64),function(){return Object(v.jsxs)("div",{className:"footer",children:[Object(v.jsx)("a",{href:"https://niepospolita-lublin.com",className:"logo-link",exact:!0,children:Object(v.jsx)("div",{className:"footer-logo logo title",children:Object(v.jsx)("img",{src:E,alt:"logo",className:"logo"})})}),Object(v.jsx)("div",{className:"footer-menu",children:Object(v.jsxs)("ul",{className:"nav",children:[Object(v.jsx)("li",{className:"main-navigation",children:Object(v.jsx)(m.c,{to:"/",exact:!0,children:"Zam\xf3w"})}),Object(v.jsx)("li",{className:"main-navigation",children:Object(v.jsx)(m.c,{to:"/koszyk",exact:!0,children:"Koszyk"})}),Object(v.jsx)("li",{className:"main-navigation",children:Object(v.jsx)("a",{href:"https://niepospolita-lublin.com/regulamin/",exact:!0,children:"Regulamin"})})]})})]})}),A=(n(41),n(23)),z=function(e,t){return t.find((function(t){return t.id===e.id}))},D=function(e){var t=e.id,n=e.name,a=e.price,i=e.image,s=e.description,o={id:t,name:n,price:a,image:i,description:s},l=Object(c.useContext)(A.a),u=l.addProduct,d=l.cartItems,b=Object(g.g)();return Object(v.jsx)(r.a.Fragment,{children:Object(v.jsxs)("div",{className:"item-card",children:[Object(v.jsx)("div",{className:"item-card__image",children:Object(v.jsx)("img",{src:"".concat("https://niepospolita.s3.eu-central-1.amazonaws.com","/").concat(i),alt:n})}),Object(v.jsxs)("div",{className:"item-card__info",children:[Object(v.jsxs)("p",{className:"name price",children:[Object(v.jsx)("span",{style:{fontWeight:"bold",maxWidth:"70%"},children:n}),Object(v.jsxs)("span",{style:{fontWeight:"bold",marginLeft:"0.7em"},children:[a," z\u0142"]})]}),Object(v.jsx)("p",{className:"description",children:s}),!z(o,d)&&Object(v.jsx)(j.a,{onClick:function(){u(o)},children:"Dodaj do koszyka"}),z(o,d)&&Object(v.jsx)(j.a,{active:!0,onClick:function(){b.push("/koszyk")},children:"Przejd\u017a do koszyka"})]})]})})},T=n(32),_=n(33),R=function(){var e=Object(c.useState)(),t=Object(d.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(),i=Object(d.a)(r,2),s=i[0],o=i[1],j=Object(c.useState)([]),b=Object(d.a)(j,2),f=b[0],h=b[1],m=Object(c.useState)(),x=Object(d.a)(m,2),y=x[0],g=x[1],k=Object(c.useState)(!1),I=Object(d.a)(k,2),N=I[0],w=I[1],E=Object(c.useState)(!1),C=Object(d.a)(E,2),S=C[0],A=C[1],z=Object(c.useState)(!1),R=Object(d.a)(z,2),P=R[0],V=R[1],M=Object(c.useState)(!0),L=Object(d.a)(M,2),W=L[0],K=L[1],Z=Object(O.a)(),q=Z.isLoading,B=(Z.error,Z.sendRequest),G=(Z.clearError,Object(_.a)()),H=G.today,U=G.dayId;Object(c.useEffect)((function(){window.scrollTo(0,0);var e=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,c,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items/"));case 3:t=e.sent,n=t.items.filter((function(e){return!("INNE"===e.category)})),c=n.sort((function(e,t){return e.name>t.name?1:-1})),r=c.sort((function(e,t){var n,a;return(n="PRZYSTAWKI"===e.category?0:"ZUPY"===e.category?1:"SA\u0141ATY"===e.category?2:"DANIA G\u0141\xd3WNE"===e.category?3:"BURGERY I KANAPKI"===e.category?4:"DODATKI"===e.category?5:"DANIA DLA DZIECI"===e.category?6:"DESERY"===e.category?7:10)<(a="PRZYSTAWKI"===t.category?0:"ZUPY"===t.category?1:"SA\u0141ATY"===t.category?2:"DANIA G\u0141\xd3WNE"===t.category?3:"BURGERY I KANAPKI"===t.category?4:"DODATKI"===t.category?5:"DANIA DLA DZIECI"===t.category?6:"DESERY"===t.category?7:10)?-1:n>a?1:0})),a(r),o(r),e.next=13;break;case 11:e.prev=11,e.t0=e.catch(0);case 13:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B("".concat("https://niepospolita-restauracja.herokuapp.com","/api/category/"));case 3:t=e.sent,n=t.category.filter((function(e){return!("INNE"===e.name)})),h(n),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),n=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B("".concat("https://niepospolita-restauracja.herokuapp.com","/api/value/").concat("61685af0e5a81699697aeb42"));case 3:t=e.sent,g(t.value),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),c=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B("".concat("https://niepospolita-restauracja.herokuapp.com","/api/time/"));case 3:t=e.sent,w(t.time),n=t.time.find((function(e){return e._id===U})),a=n.available,K(a),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),r=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B("".concat("https://niepospolita-restauracja.herokuapp.com","/api/delivery/").concat("617bc3415add00f3c5d37619"));case 3:t=e.sent,A(t.delivery_price),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),i=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,B("".concat("https://niepospolita-restauracja.herokuapp.com","/api/bonus-delivery/").concat("6183e76c434fe163aa0696ff"));case 3:t=e.sent,V(t.bonus_delivery_price.value),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();i(),r(),e(),t(),n(),c()}),[B,U]);var Y=function(e){var t;if("WSZYSTKO"===e.target.innerHTML)t=s;else{var n=e.target.innerHTML.toLowerCase();t=s.filter((function(e){return e.category.toLowerCase().includes(n)}))}a(t)},J=f.map((function(e){return Object(v.jsx)("li",{onClick:Y,children:e.name},e.id)}));return Object(v.jsxs)("div",{className:"store",children:[Object(v.jsxs)("div",{className:"store-info",children:[Object(v.jsx)("h1",{children:"Zam\xf3w online!"}),Object(v.jsxs)("p",{children:[H&&H," -",!W&&Object(v.jsx)("b",{style:{color:"red"},children:"W dzisiejszym dniu nie dowozimy!"}),W&&Object(v.jsxs)("span",{children:[" W dzisiejszym dniu dowozimy w godzinach ",Object(v.jsx)("b",{children:N&&H&&U&&function(){var e,t;if(N&&H&&U){var n=(t=N.find((function(e){return e._id===U}))).time.start.hour,a=t.time.start.minute,c=t.time.end.hour,r=t.time.end.minute;e="".concat(n<10?"0"+n:n,":").concat(a<10?"0"+a:a," - ").concat(c<10?"0"+c:c,":").concat(r<10?"0"+r:r)}return e}()})]})]}),Object(v.jsxs)("p",{children:["Minimalna kwota zam\xf3wienia: ",Object(v.jsxs)("b",{children:[y&&y.value," z\u0142"]})]}),Object(v.jsxs)("p",{children:["Koszt dostawy: ",Object(v.jsxs)("b",{children:[S&&S.value," z\u0142"]}),". W przypadku dowozu poza Lublin koszt obliczany wg odleg\u0142o\u015bci."]}),P&&Object(v.jsxs)("p",{children:["Zam\xf3wienie powy\u017cej ",Object(v.jsxs)("b",{children:[P," z\u0142"]})," ",Object(v.jsx)("b",{style:{color:"lightgreen"},children:"dostawa gratis!"})]})]}),Object(v.jsx)(T.a,{children:Object(v.jsxs)("div",{className:"categories",children:[Object(v.jsx)("h2",{children:"Wybierz kategori\u0119"}),Object(v.jsxs)("ul",{style:{color:"white"},children:[Object(v.jsx)("li",{onClick:Y,children:"WSZYSTKO"}),f.length>0&&J]})]})}),Object(v.jsxs)("div",{className:"store-items",children:[q&&Object(v.jsx)(p.a,{asOverlay:!0}),n&&function(){var e;return n&&(e=n.filter((function(e){return!0===e.available})).map((function(e){return Object(v.jsx)(D,{id:e.id,name:e.name,price:e.price,description:e.description,image:e.image,category:e.category,available:e.available},e.id)}))),e}()]})]})},P=r.a.lazy((function(){return n.e(5).then(n.bind(null,162))})),V=r.a.lazy((function(){return Promise.all([n.e(11),n.e(6)]).then(n.bind(null,163))})),M=r.a.lazy((function(){return Promise.all([n.e(2),n.e(7)]).then(n.bind(null,169))})),L=r.a.lazy((function(){return n.e(9).then(n.bind(null,164))})),W=r.a.lazy((function(){return n.e(10).then(n.bind(null,165))})),K=r.a.lazy((function(){return n.e(8).then(n.bind(null,166))})),Z=r.a.lazy((function(){return n.e(4).then(n.bind(null,168))}));var q=function(){var e=function(){var e=Object(c.useState)(!1),t=Object(d.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)(),s=Object(d.a)(i,2),o=s[0],l=s[1],u=Object(c.useState)(!1),j=Object(d.a)(u,2),b=j[0],O=j[1],p=Object(c.useState)(!1),f=Object(d.a)(p,2),h=f[0],m=f[1],x=Object(c.useCallback)((function(e,t,n,a){r(t),O(e),m(n);var c=a||new Date((new Date).getTime()+36e5);l(c),localStorage.setItem("userData",JSON.stringify({userId:e,token:t,role:n,expiration:c.toISOString()}))}),[]),v=Object(c.useCallback)((function(){r(null),l(null),O(null),m(null),localStorage.removeItem("userData")}),[]);return Object(c.useEffect)((function(){if(n&&o){var e=o.getTime()-(new Date).getTime();a=setTimeout(v,e)}else clearTimeout(a)}),[n,v,o]),Object(c.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&new Date(e.expiration)>new Date&&x(e.userId,e.token,e.role,new Date(e.expiration))}),[x]),{token:n,login:x,logout:v,userId:b,role:h}}(),t=e.token,n=e.login,r=e.logout,i=e.userId,s=e.role,o=Object(v.jsxs)(g.d,{children:[Object(v.jsxs)(g.b,{path:"/",exact:!0,children:[Object(v.jsx)(C,{}),Object(v.jsx)(R,{})]}),Object(v.jsxs)(g.b,{path:"/koszyk",children:[Object(v.jsx)(C,{}),Object(v.jsx)(P,{})]}),Object(v.jsxs)(g.b,{path:"/special",children:[Object(v.jsx)(C,{}),Object(v.jsx)(M,{})]}),Object(v.jsxs)(g.b,{path:"/zamowienie",children:[Object(v.jsx)(C,{}),Object(v.jsx)(V,{})]}),Object(v.jsxs)(g.b,{path:"/success",children:[Object(v.jsx)(C,{}),Object(v.jsx)(L,{})]}),Object(v.jsxs)(g.b,{path:"/success-reservation",children:[Object(v.jsx)(C,{}),Object(v.jsx)(W,{})]}),Object(v.jsxs)(g.b,{path:"/failed",children:[Object(v.jsx)(C,{}),Object(v.jsx)(K,{})]}),Object(v.jsxs)(g.b,{path:"/admin",children:[Object(v.jsx)(y,{}),Object(v.jsx)(Z,{})]}),Object(v.jsx)(g.a,{to:"/"})]});return Object(v.jsx)(m.a,{children:Object(v.jsx)(x.a.Provider,{value:{isLoggedIn:!!t,token:t,userId:i,role:s,login:n,logout:r},children:Object(v.jsx)(A.b,{children:Object(v.jsxs)("div",{className:"App",style:{backgroundColor:"black",minHeight:"100vh",display:"flex",flexDirection:"column"},children:[Object(v.jsx)(c.Suspense,{fallback:Object(v.jsx)("div",{className:"center",children:Object(v.jsx)(p.a,{})}),children:o}),Object(v.jsx)(S,{})]})})})})},B=n(34),G=n(40),H=Object(G.a)("pk_live_51JnOXrGByGuq2bjBnw3P9krgrs1piJ4H62MUdbb93Jqx3W7iwsp2s3tnmpjVqqKPS69SA3RVKZO3PqjY7PORKAz700Z9PewOR3");s.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(B.Elements,{stripe:H,children:Object(v.jsx)(q,{})})}),document.getElementById("root"))}],[[66,1,3]]]);
//# sourceMappingURL=main.202cbcb7.chunk.js.map