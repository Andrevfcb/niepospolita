(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[6],{162:function(e,t,a){"use strict";a.r(t);var n=a(6),c=a.n(n),s=a(12),i=a(3),r=a(1),o=a.n(r),l=(a(98),a(14)),u=a(18),p=a(17),j=a(34),d=a(21),b=a(23),m=a(33),h=a(8),O=a(31),x=a(30),v=a(26),f=a(0);t.default=function(){var e=Object(r.useState)({valid:!1,message:""}),t=Object(i.a)(e,2),a=t[0],n=t[1],w=Object(p.a)(),k=w.isLoading,g=w.error,y=w.sendRequest,z=w.clearError,N=Object(r.useState)(!1),_=Object(i.a)(N,2),C=_[0],S=_[1],q=Object(r.useState)(!1),F=Object(i.a)(q,2),I=F[0],T=F[1],W=Object(r.useState)(!1),Z=Object(i.a)(W,2),E=Z[0],P=Z[1],L=Object(r.useState)(!1),M=Object(i.a)(L,2),B=M[0],J=M[1],R=Object(r.useState)(!1),V=Object(i.a)(R,2),A=V[0],D=V[1],H=Object(r.useState)(!1),K=Object(i.a)(H,2),U=K[0],G=K[1],Q=Object(r.useState)({constant:!1,own:!1}),X=Object(i.a)(Q,2),Y=X[0],$=X[1],ee=Object(r.useState)([]),te=Object(i.a)(ee,2),ae=te[0],ne=te[1],ce=Object(r.useContext)(b.a),se=ce.cartItems,ie=ce.removeProduct,re=ce.increase,oe=ce.decrease,le=ce.total,ue=ce.addBonusItem,pe=ce.bonusItem,je=ce.addTip,de=ce.removeTip,be=(ce.tip,Object(j.a)()),me=be.today,he=be.dayId,Oe=be.currentHour,xe=be.currentMinute;Object(r.useEffect)((function(){window.scrollTo(0,0);var e=function(){var e=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/value/").concat("61685af0e5a81699697aeb42"));case 3:t=e.sent,S(t.value),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),t=function(){var e=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/time/"));case 3:t=e.sent,T(t.time),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),a=function(){var e=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/delivery/").concat("617bc3415add00f3c5d37619"));case 3:t=e.sent,P(t.delivery_price.value),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),n=function(){var e=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/bonus/"));case 3:t=e.sent,ne(t.bonusItems),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),i=function(){var e=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/bonus-items/").concat("6183e735434fe163aa0696fa"));case 3:t=e.sent,D(t.bonus_items_price.value),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),r=function(){var e=Object(s.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y("".concat("https://niepospolita-restauracja.herokuapp.com","/api/bonus-delivery/").concat("6183e76c434fe163aa0696ff"));case 3:t=e.sent,J(t.bonus_delivery_price.value),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();e(),t(),a(),n(),i(),r()}),[y]),Object(r.useEffect)((function(){var e={valid:!1,message:""};if(se&&I&&me&&he&&Oe&&xe){var t=I.find((function(e){return e._id===he})),a=t.time.end.hour,c=t.time.end.minute;t.available?le<C.value?(e.valid=!1,e.message="Minimalna kwota zam\xf3wienia to ".concat(C.value," z\u0142")):a<Oe||a===Oe&&c<=xe?(e.valid=!1,e.message="W dzisiejszym dniu ju\u017c nie dowozimy. Zapraszamy ponownie."):(e.valid=!0,e.message=""):(e.valid=!1,e.message="W dzisiejszym dniu nie dowozimy")}return n(e)}),[se,I,me,he,Oe,xe,le,C]),Object(r.useEffect)((function(){$({constant:!1,own:!1}),de()}),[a.valid,le]);var ve=Object(O.a)({tip:{value:"",isValid:!1}},!1),fe=Object(i.a)(ve,2),we=fe[0],ke=fe[1],ge=function(e){G(e.target.id)},ye=function(e){var t;e.preventDefault(),"10%"===e.target.name?Y.constant?(de(),t={constant:!1,own:!1}):(t={constant:!0,own:!1},je({_id:"tip",name:"napiwek 10%",price:(.1*le).toFixed(2)})):"own"===e.target.name&&(Y.own?(de(),t={constant:!1,own:!1}):(t={constant:!1,own:!0},je({_id:"tip",name:"napiwek",price:parseFloat(we.inputs.tip.value).toFixed(2)}))),console.log(t),$(t)},ze=se.map((function(e){var t={id:e.id,name:e.name,price:e.price,image:e.image,description:e.description},a=e.price*e.quantity;return Object(f.jsxs)("li",{className:"item-card",children:[Object(f.jsx)("img",{src:"".concat("https://niepospolita.s3.eu-central-1.amazonaws.com","/").concat(e.image),alt:e.name}),Object(f.jsx)("span",{className:"item-name",children:e.name}),Object(f.jsx)("span",{class:"fas fa-minus item-quantity__handler",onClick:function(){oe(t),function(e,t){e<=0&&ie(t)}(e.quantity,t)}}),Object(f.jsx)("span",{class:"item-quantity",children:e.quantity}),Object(f.jsx)("span",{class:"fas fa-plus item-quantity__handler",onClick:function(){re(t)}}),Object(f.jsxs)("span",{class:"item-price",children:[a.toFixed(2)," z\u0142"]}),Object(f.jsx)("span",{class:"fas fa-times item-remove",onClick:function(){ie(t)}})]},e.id)})),Ne=ae.map((function(e){return Object(f.jsxs)("li",{className:"item-card bonus-item",children:[Object(f.jsx)("img",{src:"".concat("https://niepospolita.s3.eu-central-1.amazonaws.com","/").concat(e.image),alt:e.image}),Object(f.jsxs)("div",{children:[Object(f.jsx)("span",{children:e.name}),Object(f.jsx)("input",{id:e._id,type:"checkbox",onChange:ge,onClick:function(){return ue(e)},checked:e._id===(U||pe&&pe.id),style:{display:"block",margin:"auto",marginTop:"0.5em"}})]})]},e._id)}));return Object(f.jsxs)(o.a.Fragment,{children:[k&&Object(f.jsx)(u.a,{asOverlay:!0}),Object(f.jsx)(d.a,{error:g,onClear:z}),Object(f.jsxs)("div",{className:"cart",children:[Object(f.jsx)("h1",{children:"Tw\xf3j koszyk"}),se.length>0&&Object(f.jsxs)("div",{className:"cart-info",children:[Object(f.jsxs)("p",{children:["Koszt dowozu: ",Object(f.jsxs)("b",{children:[E&&E," z\u0142"]}),", w przypadku dowozu poza Lublin koszt obliczany wg odleg\u0142o\u015bci."]}),Object(f.jsx)("p",{children:"Cena produkt\xf3w zawiera koszt opakowania jednorazowego"}),B&&Object(f.jsxs)("p",{children:["Zam\xf3wienie powy\u017cej ",B," z\u0142 ",Object(f.jsx)("b",{style:{color:"lightgreen"},children:"dostawa gratis!"})]}),ae.length>0&&A&&Object(f.jsxs)("p",{children:["Zam\xf3wienie powy\u017cej ",A," z\u0142 ",Object(f.jsx)("b",{style:{color:"lightgreen"},children:"produkt gratis!"})]})]}),se.length>0&&Object(f.jsx)(m.a,{children:Object(f.jsxs)("div",{className:"cart-products",children:[Object(f.jsxs)("li",{className:"item-card titles",children:[Object(f.jsx)("span",{className:"item-name",children:"Produkt"}),Object(f.jsx)("span",{className:"item-quantity-title",children:"Ilo\u015b\u0107"}),Object(f.jsx)("span",{className:"item-price-title",children:"Cena"}),Object(f.jsx)("span",{className:"item-remove-title"})]}),ze,Object(f.jsxs)("li",{className:"item-card summary ",children:[Object(f.jsx)("span",{className:"item-name"}),Object(f.jsxs)("span",{className:"total",children:["SUMA:  ",Object(f.jsxs)("b",{style:{marginLeft:"5px",color:"white"},children:[le.toFixed(2)," z\u0142"]}),le.toFixed(2)<=B?Object(f.jsxs)("b",{children:[" + (",E," z\u0142 dostawa)"]}):Object(f.jsxs)("span",{style:{fontSize:"0.7em",color:"lightgreen"},children:["(powy\u017cej ",B," z\u0142 dostawa gratis)"]})," "]})]}),Object(f.jsx)("li",{className:"item-card__alert",children:Object(f.jsx)("span",{children:!a.valid&&C&&Object(f.jsx)("p",{style:{marginRight:"1em"},children:a.message})})}),a.valid&&Object(f.jsxs)("li",{className:"item-card tip",children:[Object(f.jsx)(l.a,{size:"small",option:"10%",active:Y.constant,onClick:ye,children:"Zostaw napiwek 10%"}),Object(f.jsx)("span",{children:"lub"}),Object(f.jsxs)("div",{children:[Object(f.jsx)(v.a,{id:"tip",element:"input",type:"number",label:"Wprowad\u017a kwot\u0119 napiwku:",validators:[Object(x.c)(),Object(x.b)(1)],errorText:"Wprowad\u017a poprawn\u0105 kwot\u0119.",onInput:ke})," z\u0142",Object(f.jsx)(l.a,{size:"small",option:"own",id:"own",active:Y.own,onClick:ye,disabled:!we.isValid,children:"Zostaw napiwek"})]})]}),le.toFixed(2)>A&&a.valid&&Object(f.jsxs)("div",{children:[Object(f.jsx)("h3",{children:"Wybierz produkt gratis"}),Object(f.jsx)("div",{className:"bonus",children:Ne})]})]})}),!se.length>0&&Object(f.jsx)("h3",{style:{color:"white"},children:"Brak produkt\xf3w w koszyku"}),se.length>0&&Object(f.jsx)(h.b,{to:"/zamowienie",children:Object(f.jsx)(l.a,{disabled:!a.valid,children:"Przejd\u017a do zam\xf3wienia"})}),!se.length>0&&Object(f.jsx)(h.b,{to:"/",children:Object(f.jsx)(l.a,{children:"Przejd\u017a do sklepu"})})]})]})}},98:function(e,t,a){}}]);
//# sourceMappingURL=6.4a1928c8.chunk.js.map