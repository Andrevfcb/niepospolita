(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[4],{147:function(e,t,a){},148:function(e,t,a){},168:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a(1),c=a.n(r),i=a(37),o=(a(147),a(0)),s=function(e){var t=e.changeSection;return Object(o.jsxs)("ul",{children:[Object(o.jsx)("li",{id:"0",onClick:t,children:"Wszystkie produkty"}),Object(o.jsx)("li",{id:1,onClick:t,children:"Dodaj produkt"}),Object(o.jsx)("li",{id:2,onClick:t,children:"Zmie\u0144 produkt"}),Object(o.jsx)("li",{id:3,onClick:t,children:"Usu\u0144 produkt"}),Object(o.jsx)("li",{id:4,onClick:t,children:"Kategorie"}),Object(o.jsx)("li",{id:5,onClick:t,children:"Min. warto\u015b\u0107 zam\xf3wienia"}),Object(o.jsx)("li",{id:6,onClick:t,children:"Dow\xf3z"}),Object(o.jsx)("li",{id:7,onClick:t,children:"Min. warto\u015bci gratis"}),Object(o.jsx)("li",{id:8,onClick:t,children:"Menu degustacyjne"})]})},u=a(6),l=a.n(u),p=a(12),j=a(30),b=a(16),d=a(17),O=a(19),v=a(14),h=(a(148),function(e){var t=Object(r.useState)(),a=Object(n.a)(t,2),c=a[0],i=a[1],s=Object(r.useState)(),u=Object(n.a)(s,2),l=u[0],p=u[1],j=Object(r.useState)(!1),b=Object(n.a)(j,2),d=b[0],h=b[1],x=Object(r.useState)([]),m=Object(n.a)(x,2),f=m[0],k=m[1],y=Object(r.useState)([]),w=Object(n.a)(y,2),g=w[0],z=w[1],C=Object(r.useState)(null),S=Object(n.a)(C,2),T=(S[0],S[1]),I=Object(r.useRef)();Object(r.useEffect)((function(){if(!c&&e.previewUrl){console.log(e.previewUrl);var t="https://niepospolita.s3.eu-central-1.amazonaws.com/"+e.previewUrl;p(t)}else{if(!c)return;var a=new FileReader,n=f;a.onload=function(){"images"===e.id&&(n.push(a.result),k(n)),p(a.result)},a.readAsDataURL(c)}}),[c]);var E=function(t){T(t.target.id);var a=f,n=g;a.length>0&&(a.splice(t.target.id,1),n.splice(t.target.id,1),k(a),z(n),T(null));var r=d;n.length>1?(h(!0),r=!0):(h(!1),r=!1),e.onInput(e.id,n,r)},V=f.map((function(e,t){return Object(o.jsx)("div",{style:{height:"100%",width:"100%"},children:Object(o.jsx)("img",{src:e,alt:"Preview",id:t,onClick:E,style:{cursor:"pointer"}})},t)}));return Object(o.jsxs)("div",{className:"form-control",children:[Object(o.jsx)("input",{id:e.id,ref:I,style:{display:"none"},type:"file",accept:".jpg,.png,.jpeg",onChange:function(t){var a,n,r,c=d;z([].concat(Object(O.a)(g),[t.target.files[0]])),t.target.files&&1===t.target.files.length?(a=t.target.files[0],i(a),n=[].concat(Object(O.a)(g),[a]),h(!0),c=!0):(h(!1),c=!1),r="images"===e.id?n:a,e.onInput(e.id,r,c)}}),Object(o.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[Object(o.jsxs)("div",{className:"image-upload__preview",children:["images"===e.id&&f.length>0&&V,!("images"===e.id)&&l&&Object(o.jsx)("img",{src:l,alt:"Preview"}),"images"===e.id&&!f.length>0&&Object(o.jsx)("p",{children:"Prosz\u0119 wybra\u0107 zdj\u0119cie produktu."}),!("images"===e.id)&&!l&&Object(o.jsx)("p",{children:"Prosz\u0119 wybra\u0107 zdj\u0119cie produktu."})]}),Object(o.jsx)(v.a,{type:"button",onClick:function(){I.current.click()},children:"PICK IMAGE"})]})]})}),x=a(26),m=a(31),f=a(21),k=a(22),y=function(){var e=Object(r.useState)([]),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(b.a)(),u=s.isLoading,O=s.error,y=s.sendRequest,w=s.clearError,g=Object(r.useContext)(k.a),z=Object(m.a)({name:{value:"",isValid:!1},description:{value:"",isValid:!1},price:{value:"",isValid:!1},category:{value:"",isValid:!1},image:{value:null,isValid:!1}},!1),C=Object(n.a)(z,2),S=C[0],T=C[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/category"));case 3:t=e.sent,i(t.category),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[y]);var I=function(){var e=Object(p.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,(a=new FormData).append("name",S.inputs.name.value),a.append("description",S.inputs.description.value),a.append("price",S.inputs.price.value),a.append("category",S.inputs.category.value),a.append("image",S.inputs.image.value),e.next=10,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items/"),"POST",a,{Authorization:"Bearer "+g.token});case 10:alert("Utworzono produkt"),window.location.reload(),e.next=16;break;case 14:e.prev=14,e.t0=e.catch(1);case 16:case"end":return e.stop()}}),e,null,[[1,14]])})));return function(t){return e.apply(this,arguments)}}(),E=a.map((function(e){return Object(o.jsx)("option",{value:e.id,children:e.name})}));return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:O,onClear:w}),u&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Dodaj danie / produkt"}),Object(o.jsxs)("form",{onSubmit:I,children:[Object(o.jsx)(x.a,{id:"name",element:"input",type:"text",label:"Nazwa produktu",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 nazw\u0119.",onInput:T}),Object(o.jsx)(h,{center:!0,id:"image",onInput:T,errorText:"Wprowad\u017a zdj\u0119cie produktu."}),Object(o.jsx)(x.a,{id:"description",element:"textarea",type:"text",label:"Opis produktu",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawny opis.",onInput:T}),Object(o.jsx)(x.a,{id:"price",element:"input",type:"number",label:"Cena",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 cen\u0119.",onInput:T}),a.length>0&&Object(o.jsx)(x.a,{id:"category",element:"select",name:"select",label:"Kategoria",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 kategori\u0119.",onInput:T,options:E}),Object(o.jsx)(v.a,{type:"submit",disabled:!S.isValid,children:"DODAJ"})]})]})},w=function(){var e=Object(r.useState)(!1),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(b.a)(),u=s.isLoading,O=s.error,h=s.sendRequest,y=s.clearError,w=Object(r.useContext)(k.a),g=Object(m.a)({value:{value:"",isValid:!1}},!1),z=Object(n.a)(g,2),C=z[0],S=z[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/bonus-delivery/").concat("6183e76c434fe163aa0696ff"));case 3:t=e.sent,i(t.bonus_delivery_price),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[h]);var T=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/bonus-delivery/").concat("6183e76c434fe163aa0696ff"),"PATCH",JSON.stringify({value:parseInt(C.inputs.value.value)}),{Authorization:"Bearer "+w.token,"Content-Type":"application/json"});case 4:alert("Zaktualizowano warto\u015b\u0107"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:O,onClear:y}),u&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Zmie\u0144 minimaln\u0105 warto\u015b\u0107 darmowej op\u0142aty za dow\xf3z"}),a&&Object(o.jsxs)("form",{onSubmit:T,children:[Object(o.jsx)(x.a,{id:"value",element:"input",type:"number",label:"Minimalna warto\u015b\u0107 darmowej op\u0142aty za dow\xf3z (z\u0142)",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 warto\u015b\u0107.",onInput:S,initialValue:a.value}),Object(o.jsx)(v.a,{type:"submit",children:"ZMIE\u0143 WARTO\u015a\u0106"})]})]})},g=function(){var e=Object(r.useState)(!1),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(b.a)(),u=s.isLoading,O=s.error,h=s.sendRequest,y=s.clearError,w=Object(r.useContext)(k.a),g=Object(m.a)({value:{value:"",isValid:!1}},!1),z=Object(n.a)(g,2),C=z[0],S=z[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/bonus-items/").concat("6183e735434fe163aa0696fa"));case 3:t=e.sent,i(t.bonus_items_price),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[h]);var T=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/bonus-items/").concat("6183e735434fe163aa0696fa"),"PATCH",JSON.stringify({value:parseInt(C.inputs.value.value)}),{Authorization:"Bearer "+w.token,"Content-Type":"application/json"});case 4:alert("Zaktualizowano warto\u015b\u0107"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:O,onClear:y}),u&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Zmie\u0144 minimaln\u0105 warto\u015b\u0107 produkt\xf3w gratis"}),a&&Object(o.jsxs)("form",{onSubmit:T,children:[Object(o.jsx)(x.a,{id:"value",element:"input",type:"number",label:"Minimalna warto\u015b\u0107 produkt\xf3w gratis (z\u0142)",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 warto\u015b\u0107.",onInput:S,initialValue:a.value}),Object(o.jsx)(v.a,{type:"submit",children:"ZMIE\u0143 WARTO\u015a\u0106"})]})]})},z=function(){return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)("div",{style:{borderBottom:"1px solid black",borderTop:"1px solid black"},children:Object(o.jsx)(w,{})}),Object(o.jsx)("div",{style:{borderBottom:"1px solid black",borderTop:"1px solid black"},children:Object(o.jsx)(g,{})})]})},C=function(){var e=Object(r.useState)([]),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(r.useState)(!1),u=Object(n.a)(s,2),O=u[0],h=u[1],y=Object(b.a)(),w=y.isLoading,g=y.error,z=y.sendRequest,C=y.clearError,S=Object(r.useContext)(k.a),T=Object(m.a)({name:{value:"",isValid:!1}},!1),I=Object(n.a)(T,2),E=I[0],V=I[1],D=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,z("".concat("https://niepospolita-restauracja.herokuapp.com","/api/category/"),"POST",JSON.stringify({name:E.inputs.name.value}),{Authorization:"Bearer "+S.token,"Content-Type":"application/json"});case 4:alert("Utworzono kategori\u0119"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,z("".concat("https://niepospolita-restauracja.herokuapp.com","/api/category"));case 3:t=e.sent,i(t.category),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[z]);var N=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,z("".concat("https://niepospolita-restauracja.herokuapp.com","/api/category/").concat(O),"DELETE",null,{Authorization:"Bearer "+S.token});case 4:alert("Usuni\u0119to Kategori\u0119"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),W=a.map((function(e){return Object(o.jsx)("option",{value:e._id,children:e.name})}));return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:g,onClear:C}),w&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Dodaj kategori\u0119"}),Object(o.jsxs)("form",{onSubmit:D,children:[Object(o.jsx)(x.a,{id:"name",element:"input",type:"text",label:"Nazwa kategorii",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 nazw\u0119.",onInput:V}),Object(o.jsx)(v.a,{type:"submit",disabled:!E.isValid,children:"DODAJ"})]}),Object(o.jsx)("h2",{children:"Usu\u0144 kategori\u0119"}),a.length>0?Object(o.jsxs)("select",{name:"items",id:"items",onChange:function(e){h(e.target.value)},children:[Object(o.jsx)("option",{value:"",children:"wybierz kategori\u0119"}),W]}):Object(o.jsx)("p",{children:"Brak Kategorii"}),Object(o.jsx)(v.a,{onClick:N,disabled:!O,children:"USU\u0143"})]})},S=function(){var e=Object(r.useState)([]),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(r.useState)(!1),u=Object(n.a)(s,2),j=u[0],O=u[1],h=Object(b.a)(),x=h.isLoading,m=h.error,y=h.sendRequest,w=h.clearError,g=Object(r.useContext)(k.a);Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items"));case 3:t=e.sent,i(t.items),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[y]);var z=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items/").concat(j),"DELETE",null,{Authorization:"Bearer "+g.token});case 4:alert("Usuni\u0119to produkt"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),C=a.map((function(e){return Object(o.jsx)("option",{value:e.id,children:e.name})}));return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:m,onClear:w}),x&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Usu\u0144"}),a.length>0?Object(o.jsxs)("select",{name:"items",id:"items",onChange:function(e){O(e.target.value)},children:[Object(o.jsx)("option",{value:"",children:"wybierz produkt"}),C]}):Object(o.jsx)("p",{children:"Brak produkt\xf3w"}),Object(o.jsx)(v.a,{onClick:z,disabled:!j,children:"USU\u0143"})]})},T=function(){var e=Object(r.useState)(!1),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(b.a)(),u=s.isLoading,O=s.error,h=s.sendRequest,y=s.clearError,w=Object(r.useContext)(k.a),g=Object(m.a)({value:{value:"",isValid:!1}},!1),z=Object(n.a)(g,2),C=z[0],S=z[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/delivery/").concat("617bc3415add00f3c5d37619"));case 3:t=e.sent,i(t.delivery_price),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[h]);var T=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/delivery/").concat("617bc3415add00f3c5d37619"),"PATCH",JSON.stringify({value:parseInt(C.inputs.value.value)}),{Authorization:"Bearer "+w.token,"Content-Type":"application/json"});case 4:alert("Zaktualizowano warto\u015b\u0107"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:O,onClear:y}),u&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Zmie\u0144 warto\u015b\u0107 op\u0142aty za dow\xf3z"}),a&&Object(o.jsxs)("form",{onSubmit:T,children:[Object(o.jsx)(x.a,{id:"value",element:"input",type:"number",label:"Minimalna warto\u015b\u0107 op\u0142aty za dow\xf3z (z\u0142)",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 warto\u015b\u0107.",onInput:S,initialValue:a.value}),Object(o.jsx)(v.a,{type:"submit",children:"ZMIE\u0143 WARTO\u015a\u0106"})]})]})},I=function(){var e=Object(r.useState)(!1),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(b.a)(),u=s.isLoading,O=s.error,h=s.sendRequest,y=s.clearError,w=Object(r.useContext)(k.a),g=Object(m.a)({deliveryTime:{value:"",isValid:!1}},!1),z=Object(n.a)(g,2),C=z[0],S=z[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/deliverytime/").concat("6183c6c50e63c1ac6af40a7e"));case 3:t=e.sent,i(t.deliveryTime.time),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[h]);var T=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/deliverytime/").concat("6183c6c50e63c1ac6af40a7e"),"PATCH",JSON.stringify({time:parseInt(C.inputs.deliveryTime.value)}),{Authorization:"Bearer "+w.token,"Content-Type":"application/json"});case 4:alert("Zaktualizowano warto\u015b\u0107"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:O,onClear:y}),u&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Zmie\u0144 czas dowozu"}),a&&Object(o.jsxs)("form",{onSubmit:T,children:[Object(o.jsx)(x.a,{id:"deliveryTime",element:"input",type:"number",label:"Czas dowozu (min)",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 warto\u015b\u0107.",onInput:S,initialValue:a}),Object(o.jsx)(v.a,{type:"submit",children:"ZMIE\u0143 CZAS"})]})]})},E=function(){var e=Object(r.useState)([]),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(r.useState)(!1),u=Object(n.a)(s,2),O=u[0],h=u[1],y=Object(r.useState)(),w=Object(n.a)(y,2),g=w[0],z=w[1],C=Object(b.a)(),S=C.isLoading,T=C.error,I=C.sendRequest,E=C.clearError,V=Object(r.useContext)(k.a),D=Object(m.a)({startHour:{value:"",isValid:!1},startMinute:{value:"",isValid:!1},endHour:{value:"",isValid:!1},endMinute:{value:"",isValid:!1}},!1),N=Object(n.a)(D,2),W=N[0],A=N[1],Z=Object(m.a)({day:{value:"",isValid:!1}},!1),M=Object(n.a)(Z,2),B=M[0],_=M[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,I("".concat("https://niepospolita-restauracja.herokuapp.com","/api/time"));case 3:t=e.sent,i(t.time),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[I]),Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!B.inputs.day.value){e.next=13;break}return e.prev=1,e.next=4,I("".concat("https://niepospolita-restauracja.herokuapp.com","/api/time/").concat(B.inputs.day.value));case 4:t=e.sent,h(t.time),z(t.time.available),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(1);case 11:e.next=14;break;case 13:return e.abrupt("return");case 14:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}();e()}),[I,B.inputs.day.value]);var P=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,I("".concat("https://niepospolita-restauracja.herokuapp.com","/api/time/").concat(B.inputs.day.value),"PATCH",JSON.stringify({startHour:parseInt(W.inputs.startHour.value),startMinute:parseInt(W.inputs.startMinute.value),endHour:parseInt(W.inputs.endHour.value),endMinute:parseInt(W.inputs.endMinute.value),available:g}),{Authorization:"Bearer "+V.token,"Content-Type":"application/json"});case 4:alert("Zaktualizowano Godziny"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),R=a.map((function(e){return Object(o.jsx)("option",{value:e._id,children:e.day})}));return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:T,onClear:E}),S&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Zmie\u0144 godziny dowozu"}),a.length>0&&Object(o.jsx)(x.a,{id:"day",element:"select",name:"select",label:"Wybierz dzie\u0144",validators:[Object(j.b)()],errorText:"Wybierz poprawny dzie\u0144.",onInput:_,options:R}),O&&Object(o.jsxs)("form",{onSubmit:P,children:[Object(o.jsxs)("div",{className:"start",children:[Object(o.jsx)("span",{children:"Start: "}),Object(o.jsx)(x.a,{id:"startHour",element:"input",type:"number",min:0,max:23,validators:[Object(j.b)()],onInput:A,initialValue:O.time.start.hour}),":",Object(o.jsx)(x.a,{id:"startMinute",element:"input",type:"number",min:0,max:59,validators:[Object(j.b)()],onInput:A,initialValue:O.time.start.minute})]}),Object(o.jsxs)("div",{className:"end",children:[Object(o.jsx)("span",{children:"Koniec: "}),Object(o.jsx)(x.a,{id:"endHour",element:"input",type:"number",min:0,max:23,validators:[Object(j.b)()],onInput:A,initialValue:O.time.end.hour}),":",Object(o.jsx)(x.a,{id:"endMinute",element:"input",type:"number",min:0,max:59,validators:[Object(j.b)()],onInput:A,initialValue:O.time.end.minute}),Object(o.jsxs)("div",{className:"availability",style:{marginTop:"1em"},children:[Object(o.jsx)("label",{for:"availability",style:{fontWeight:"bold",marginBottom:"0.5rem"},children:"Dow\xf3z aktywny?"}),Object(o.jsx)("input",{id:"availability",type:"checkbox",onChange:function(){z((function(e){return!e}))},checked:g,style:{display:"block",margin:"auto"}})]})]}),Object(o.jsx)(v.a,{type:"submit",children:"ZMIE\u0143 GODZINY"})]})]})},V=function(){return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)("div",{style:{borderBottom:"1px solid black",borderTop:"1px solid black"},children:Object(o.jsx)(E,{})}),Object(o.jsx)("div",{style:{borderBottom:"1px solid black",borderTop:"1px solid black"},children:Object(o.jsx)(I,{})}),Object(o.jsx)("div",{style:{borderBottom:"1px solid black",borderTop:"1px solid black"},children:Object(o.jsx)(T,{})})]})},D=function(){var e=Object(b.a)(),t=e.isLoading,a=e.error,i=e.sendRequest,s=e.clearError,u=Object(r.useState)([]),j=Object(n.a)(u,2),O=j[0],h=j[1],x=Object(r.useState)([]),m=Object(n.a)(x,2),k=m[0],y=m[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items"));case 3:t=e.sent,h(t.items),y(t.items),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();e()}),[i]);var w=function(e){var t;return e.preventDefault(),t=k&&"available"===e.target.id?k.filter((function(e){return e.available})):k&&"not-available"===e.target.id?k.filter((function(e){return!e.available})):k,h(t)},g=O.map((function(e){return Object(o.jsxs)("li",{children:[Object(o.jsx)("img",{src:"".concat("https://niepospolita.s3.eu-central-1.amazonaws.com","/").concat(e.image),alt:e.name}),Object(o.jsxs)("div",{className:"admin-items__list-info",children:[Object(o.jsx)("span",{children:e.name}),Object(o.jsxs)("span",{children:["Cena: ",e.price,"z\u0142"]}),Object(o.jsxs)("span",{children:["Kategoria: ",e.category]}),Object(o.jsxs)("span",{children:["Dost\u0119pno\u015b\u0107: ",e.available?Object(o.jsx)("span",{style:{color:"lightgreen"},children:"DOST\u0118NE"}):Object(o.jsx)("span",{style:{color:"red"},children:"NIEDOST\u0118PNE"})]})]})]})}));return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:a,onClear:s}),t&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Wszystkie produkty"}),Object(o.jsxs)("div",{className:"admin-items",children:[Object(o.jsxs)("div",{className:"admin-items__buttons",children:[Object(o.jsx)(v.a,{id:"all",onClick:w,children:"Wszystkie"}),Object(o.jsx)(v.a,{id:"available",onClick:w,children:"Aktywne"}),Object(o.jsx)(v.a,{id:"not-available",onClick:w,children:"Nieaktywne"})]}),Object(o.jsx)("ul",{className:"admin-items__list",children:O.length>0&&g})]})]})},N=a(36),W=function(){var e=Object(b.a)(),t=e.isLoading,a=e.error,i=e.sendRequest,s=e.clearError,u=Object(r.useContext)(k.a),O=Object(r.useState)([]),h=Object(n.a)(O,2),y=h[0],w=h[1],g=Object(r.useState)(!1),z=Object(n.a)(g,2),C=z[0],S=z[1],T=Object(r.useState)([]),I=Object(n.a)(T,2),E=I[0],V=I[1],D=Object(r.useState)(!1),W=Object(n.a)(D,2),A=W[0],Z=W[1],M=Object(r.useState)(""),B=Object(n.a)(M,2),_=B[0],P=B[1],R=Object(r.useState)(!1),F=Object(n.a)(R,2),H=F[0],U=F[1],J=Object(m.a)({name:{value:"",isValid:!1}},!1),L=Object(n.a)(J,2),q=L[0],K=L[1],G=Object(m.a)({hour:{value:"",isValid:!1}},!1),Y=Object(n.a)(G,2),Q=Y[0],X=Y[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i("".concat("https://niepospolita-restauracja.herokuapp.com","/api/reservation"));case 3:t=e.sent,w(t.reservations[0].days),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[i]),Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t,a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!q.inputs.name.value){e.next=17;break}return e.prev=1,e.next=4,i("".concat("https://niepospolita-restauracja.herokuapp.com","/api/reservation/").concat(q.inputs.name.value));case 4:t=e.sent,S(t.reservation),Z(t.reservation.available.value),P(t.reservation.available.message),a=t.reservation.availableHours,n=a.sort((function(e,t){return e.hour-t.hour})),V(n),e.next=15;break;case 13:e.prev=13,e.t0=e.catch(1);case 15:e.next=18;break;case 17:return e.abrupt("return");case 18:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(){return e.apply(this,arguments)}}();e()}),[i,q.inputs.name.value]);var $=function(e){var t=E.find((function(t){return t._id===e.target.id})),a=E.filter((function(e){return!(e===t)}));V(Object.values(a))},ee=function(){var e=Object(p.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={value:A,message:_},e.prev=2,e.next=5,i("".concat("https://niepospolita-restauracja.herokuapp.com","/api/reservation/").concat(C._id),"PATCH",JSON.stringify({available:a,availableHours:E}),{"Content-Type":"application/json"});case 5:alert("Zaktualizowano"),window.location.reload(),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(2);case 11:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}(),te=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,i("".concat("https://niepospolita-restauracja.herokuapp.com","/api/reservation/").concat(C._id),"POST",JSON.stringify({hour:Q.inputs.hour.value,guests:5}),{Authorization:"Bearer "+u.token,"Content-Type":"application/json"});case 4:alert("Dodano godzin\u0119"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),ae=function(){U(!1)},ne=y.map((function(e){return Object(o.jsx)("option",{value:e._id,children:e.name})})),re=E.map((function(e,t){return Object(o.jsx)("div",{children:Object(o.jsxs)("p",{children:[Object(o.jsxs)("span",{style:{color:"black",fontWeight:"bold"},children:[e.hour,":00 "]}),Object(o.jsx)("span",{id:e._id,class:"fas fa-times",style:{cursor:"pointer",marginLeft:"1em"},onClick:$})]})},t)}));return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:a,onClear:s}),t&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)(N.a,{show:H,onCancel:ae,header:Object(o.jsx)("h2",{children:"Nowa Godzina"}),contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:Object(o.jsx)(v.a,{onClick:ae,children:"ZAMKNIJ"}),children:Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:a,onClear:s}),t&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsxs)("form",{className:"new-hour",onSubmit:te,children:[Object(o.jsx)(x.a,{id:"hour",element:"input",type:"number",label:"Godzina",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 godzin\u0119.",onInput:X}),Object(o.jsx)(v.a,{type:"submit",disabled:!Q.isValid,onClick:te,children:"DODAJ"})]})]})}),Object(o.jsx)("h2",{onClick:function(){return console.log(E)},children:"Zaktualizuj dzie\u0144 i godzin\u0119"}),y.length>0&&Object(o.jsx)(x.a,{id:"name",element:"select",name:"select",label:"Wybierz dzie\u0144",validators:[Object(j.b)()],errorText:"Wybierz dzie\u0144.",onInput:K,options:ne}),C&&Object(o.jsxs)("div",{children:[Object(o.jsx)("p",{style:{color:"black",fontWeight:"bold"},children:"Dost\u0119pne godziny:"}),re,Object(o.jsx)(v.a,{onClick:function(){U(!0)},children:"Dodaj godzin\u0119"})]}),C&&Object(o.jsxs)("form",{onSubmit:ee,children:[Object(o.jsxs)("div",{style:{borderTop:"1px solid",borderBottom:"1px solid",color:"black"},children:[Object(o.jsx)("label",{for:"available",style:{fontWeight:"bold",padding:"0.5em",display:"block"},children:"Dost\u0119pno\u015b\u0107:"}),Object(o.jsx)("input",{id:"available",type:"checkbox",onChange:function(){P(""),Z((function(e){return!e}))},checked:A,style:{display:"block",margin:"0.5em auto"}}),!A&&Object(o.jsxs)("p",{children:[Object(o.jsx)("span",{children:"Wiadomo\u015b\u0107:"}),Object(o.jsx)("textarea",{onChange:function(e){P(e.target.value)},value:_,style:{display:"block",margin:"0.5em auto"}})]})]}),Object(o.jsx)(v.a,{type:"submit",children:"ZAKTUALIZUJ"})]})]})},A=function(){var e=Object(r.useState)([]),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(r.useState)([]),u=Object(n.a)(s,2),O=u[0],h=u[1],y=Object(r.useState)(!1),w=Object(n.a)(y,2),g=w[0],z=w[1],C=Object(r.useState)(),S=Object(n.a)(C,2),T=S[0],I=S[1],E=Object(r.useState)(),V=Object(n.a)(E,2),D=V[0],N=V[1],W=Object(r.useState)(),A=Object(n.a)(W,2),Z=A[0],M=A[1],B=Object(b.a)(),_=B.isLoading,P=B.error,R=B.sendRequest,F=B.clearError,H=Object(r.useContext)(k.a),U=Object(m.a)({name:{value:"",isValid:!1},description:{value:"",isValid:!1},price:{value:"",isValid:!1},category:{value:"",isValid:!1}},!1),J=Object(n.a)(U,2),L=J[0],q=J[1],K=Object(m.a)({name:{value:"",isValid:!1}},!1),G=Object(n.a)(K,2),Y=G[0],Q=G[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R("".concat("https://niepospolita-restauracja.herokuapp.com","/api/category"));case 3:t=e.sent,i(t.category),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items"));case 3:t=e.sent,h(t.items),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e(),t()}),[R]),Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Y.inputs.name.value){e.next=15;break}return e.prev=1,e.next=4,R("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items/").concat(Y.inputs.name.value));case 4:t=e.sent,z(t.item),I(t.item.available),N(t.item.bonus),M(t.item.special),e.next=13;break;case 11:e.prev=11,e.t0=e.catch(1);case 13:e.next=16;break;case 15:return e.abrupt("return");case 16:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(){return e.apply(this,arguments)}}();e()}),[R,Y.inputs.name.value]);var X=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,R("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items/").concat(g.id),"PATCH",JSON.stringify({name:L.inputs.name.value,description:L.inputs.description.value,price:L.inputs.price.value,category:L.inputs.category.value,available:T,bonus:D,special:Z}),{Authorization:"Bearer "+H.token,"Content-Type":"application/json"});case 4:alert("Zaktualizowano produkt"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}(),$=a.map((function(e){return Object(o.jsx)("option",{value:e.id,children:e.name})})),ee=O.map((function(e){return Object(o.jsx)("option",{value:e.id,children:e.name})}));return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:P,onClear:F}),_&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Zaktualizuj danie / produkt"}),Object(o.jsx)(x.a,{id:"name",element:"select",name:"select",label:"Wybierz Produkt",validators:[Object(j.b)()],errorText:"Wybierz poprawny produkt.",onInput:Q,options:ee}),g&&Object(o.jsxs)("form",{onSubmit:X,children:[Object(o.jsx)(x.a,{id:"name",element:"input",type:"text",label:"Nazwa produktu",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 nazw\u0119.",onInput:q,initialValue:g.name}),Object(o.jsx)(x.a,{id:"description",element:"textarea",type:"text",label:"Opis produktu",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawny opis.",onInput:q,initialValue:g.description}),Object(o.jsx)(x.a,{id:"price",element:"input",type:"number",label:"Cena",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 cen\u0119.",onInput:q,initialValue:g.price}),a.length>0&&Object(o.jsx)(x.a,{id:"category",element:"select",name:"select",label:"Kategoria",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 kategori\u0119.",onInput:q,options:$,initialValue:g.category}),Object(o.jsx)("label",{for:"availability",style:{fontWeight:"bold",marginBottom:"0.5rem"},children:"Produkt dost\u0119pny?"}),Object(o.jsx)("input",{id:"availability",type:"checkbox",onChange:function(){I((function(e){return!e}))},checked:T,style:{display:"block",margin:"auto"}}),Object(o.jsx)("label",{for:"bonus",style:{fontWeight:"bold",marginBottom:"0.5rem"},children:"Produkt gratis?"}),Object(o.jsx)("input",{id:"bonus",type:"checkbox",onChange:function(){N((function(e){return!e}))},checked:D,style:{display:"block",margin:"auto"}}),Object(o.jsx)("label",{for:"special",style:{fontWeight:"bold",marginBottom:"0.5rem"},children:"Menu degustacyjne?"}),Object(o.jsx)("input",{id:"special",type:"checkbox",onChange:function(){M((function(e){return!e}))},checked:Z,style:{display:"block",margin:"auto"}}),Object(o.jsx)(v.a,{type:"submit",children:"ZMIE\u0143"})]})]})},Z=function(){var e=Object(r.useState)(!1),t=Object(n.a)(e,2),a=t[0],i=t[1],s=Object(b.a)(),u=s.isLoading,O=s.error,h=s.sendRequest,y=s.clearError,w=Object(r.useContext)(k.a),g=Object(m.a)({value:{value:"",isValid:!1}},!1),z=Object(n.a)(g,2),C=z[0],S=z[1];Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/value/").concat("61685af0e5a81699697aeb42"));case 3:t=e.sent,i(t.value),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e()}),[h]);var T=function(){var e=Object(p.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,h("".concat("https://niepospolita-restauracja.herokuapp.com","/api/value/").concat("61685af0e5a81699697aeb42"),"PATCH",JSON.stringify({newValue:parseInt(C.inputs.value.value)}),{Authorization:"Bearer "+w.token,"Content-Type":"application/json"});case 4:alert("Zaktualizowano warto\u015b\u0107"),window.location.reload(),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(1);case 10:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}();return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(f.a,{error:O,onClear:y}),u&&Object(o.jsx)(d.a,{asOverlay:!0}),Object(o.jsx)("h2",{children:"Zmie\u0144 minimaln\u0105 warto\u015b\u0107 zam\xf3wienia"}),a&&Object(o.jsxs)("form",{onSubmit:T,children:[Object(o.jsx)(x.a,{id:"value",element:"input",type:"number",label:"Minimalna warto\u015b\u0107 zam\xf3wienia (z\u0142)",validators:[Object(j.b)()],errorText:"Wprowad\u017a poprawn\u0105 warto\u015b\u0107.",onInput:S,initialValue:a.value}),Object(o.jsx)(v.a,{type:"submit",children:"ZMIE\u0143 WARTO\u015a\u0106"})]})]})};t.default=function(){var e=Object(r.useState)("0"),t=Object(n.a)(e,2),a=t[0],u=t[1],l=Object(r.useState)(!1),p=Object(n.a)(l,2),j=p[0],b=p[1],d=function(e){u(e.target.id)};return Object(o.jsxs)(c.a.Fragment,{children:[Object(o.jsx)(i.a,{show:j,onClick:function(){b(!1)},children:Object(o.jsx)("div",{className:"admin-navigation half",children:Object(o.jsx)(s,{changeSection:d})})}),Object(o.jsxs)("div",{className:"admin",children:[Object(o.jsx)("div",{className:"admin-navigation full",children:Object(o.jsx)(s,{changeSection:d})}),Object(o.jsxs)("div",{className:"admin-side-navigation",onClick:function(){b(!0)},children:[Object(o.jsx)("p",{children:"M"}),Object(o.jsx)("p",{children:"E"}),Object(o.jsx)("p",{children:"N"}),Object(o.jsx)("p",{children:"U"})]}),Object(o.jsxs)("div",{className:"admin-content",children:["0"===a&&Object(o.jsx)(D,{}),"1"===a&&Object(o.jsx)(y,{}),"2"===a&&Object(o.jsx)(A,{}),"3"===a&&Object(o.jsx)(S,{}),"4"===a&&Object(o.jsx)(C,{}),"5"===a&&Object(o.jsx)(Z,{}),"6"===a&&Object(o.jsx)(V,{}),"7"===a&&Object(o.jsx)(z,{}),"8"===a&&Object(o.jsx)(W,{})]})]})]})}}}]);
//# sourceMappingURL=4.a3aeb23f.chunk.js.map