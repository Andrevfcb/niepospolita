(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[7],{100:function(e,t,a){},169:function(e,t,a){"use strict";a.r(t);var n=a(15),i=a(6),r=a.n(i),s=a(12),c=a(3),o=a(1),u=a.n(o),l=(a(100),a(17)),p=a(14),d=a(0),j=function(e){var t=e.id,a=e.name,n=e.price,i=e.image,r=e.description,s=e.quantity,l=e.changeClickedProductId,j=e.quantityChange,m=Object(o.useState)(s),h=Object(c.a)(m,2),b=h[0],f=h[1],y=function(e){console.log(e.target.className.includes("fa-minus")),e.target.className.includes("fa-minus")?f(b>1?function(e){return e-1}:1):f(b<9?function(e){return e+1}:9)};return Object(d.jsx)(u.a.Fragment,{children:Object(d.jsxs)("div",{className:"item-card",children:[Object(d.jsx)("div",{className:"item-card__image",children:Object(d.jsx)("img",{src:"".concat("https://niepospolita.s3.eu-central-1.amazonaws.com","/").concat(i),alt:a})}),Object(d.jsxs)("div",{className:"item-card__info",children:[Object(d.jsxs)("p",{className:" name price",children:[Object(d.jsx)("span",{style:{fontWeight:"bold"},children:a}),Object(d.jsxs)("span",{style:{fontWeight:"bold",marginLeft:"0.7em"},children:[n," z\u0142"]})]}),Object(d.jsx)("p",{className:"description",children:r}),Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{style:{color:"white"},children:"Liczba:"}),Object(d.jsx)("span",{class:"fas fa-minus item-quantity__handler",id:t,onClick:function(e){y(e),j(e)}}),Object(d.jsx)("span",{style:{color:"white"},children:b}),Object(d.jsx)("span",{class:"fas fa-plus item-quantity__handler",id:t,onClick:function(e){y(e),j(e)}}),Object(d.jsx)(p.a,{id:t,onClick:l,children:"WYBIERZ"})]})]})]})})},m=a(102),h=a.n(m),b=(a(101),a(35)),f=a(26),y=a(30),v=a(31),g=a(4),O=a(18),x=a(21);t.default=function(){var e=Object(o.useState)({availableHours:[]}),t=Object(c.a)(e,2),a=t[0],i=t[1],u=Object(o.useState)([]),m=Object(c.a)(u,2),w=m[0],k=m[1],D=Object(o.useState)(!1),q=Object(c.a)(D,2),N=(q[0],q[1]),_=Object(o.useState)(""),S=Object(c.a)(_,2),z=(S[0],S[1]),C=Object(o.useState)(),T=Object(c.a)(C,2),I=T[0],W=T[1],M=Object(o.useState)(0),V=Object(c.a)(M,2),F=(V[0],V[1]),Y=Object(o.useState)([]),H=Object(c.a)(Y,2),P=H[0],L=H[1],B=Object(o.useState)([]),E=Object(c.a)(B,2),J=E[0],R=E[1],Z=Object(o.useState)([]),A=Object(c.a)(Z,2),G=A[0],U=A[1],K=Object(l.a)(),Q=K.isLoading,X=K.error,$=K.sendRequest,ee=K.clearError,te=Object(b.useStripe)(),ae=Object(g.g)(),ne=Object(v.a)({hour:{value:"",isValid:!1},email:{value:"",isValid:!1},phone:{value:"",isValid:!1}},!1),ie=Object(c.a)(ne,2),re=ie[0],se=ie[1];Object(o.useEffect)((function(){var e,t=function(){var e=Object(s.a)(r.a.mark((function e(){var t,a,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,$("".concat("https://niepospolita-restauracja.herokuapp.com","/api/items/"));case 3:t=e.sent,a=t.items.filter((function(e){return!0===e.special})),R(a),G.length<1&&(n=[],a.map((function(e){var t={id:e._id,name:e.name,quantity:1,price:e.price,chosen:!1,description:e.description};return n.push(t)})),U(n)),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();I&&(e=I.getDay()-1)<0&&(e=6);var a=function(){var t=Object(s.a)(r.a.mark((function t(){var a,n,s,c,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,$("".concat("https://niepospolita-restauracja.herokuapp.com","/api/reservation"));case 3:a=t.sent,n=[],a.reservations[0].days.map((function(e){var t,a=e.name;"Sunday"===a?t=0:"Monday"===a?t=1:"Tuesday"===a?t=2:"Wednesday"===a?t=3:"Thursday"===a?t=4:"Friday"===a?t=5:"Saturday"===a&&(t=6);var i=e.available.value;return n.push({day:t,available:i})})),s=[],c=6,n.map((function(e){var t=(new Date).getFullYear(),a=(new Date).getMonth(),i=(new Date).getDate()+1+e.day,r=new Date(t,a,i),o=r.getDay(),u=n.find((function(e){return e.day===o}));return!0===u.available&&e.day<c?c=e.day:o===u.day&&!1===u.available?s.push(r):void 0})),I||W(new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()+1+c)),k(s),N(a.reservations[0].days[e].available.value),z(a.reservations[0].days[e].available.message),i(a.reservations[0].days[e]),re.inputs.hour.isValid&&(o=a.reservations[0].days[e].availableHours.find((function(e){return e.hour===parseInt(re.inputs.hour.value)})),F(o.guests)),t.next=19;break;case 17:t.prev=17,t.t0=t.catch(0);case 19:case"end":return t.stop()}}),t,null,[[0,17]])})));return function(){return t.apply(this,arguments)}}();a(),t()}),[$,I,re.inputs.hour.isValid,re.inputs.hour.value]);var ce=function(e){e.preventDefault();var t=e.target.value;P.includes(t)?(L((function(e){return e.filter((function(e){return!(t===e)}))})),e.target.style.background="#b39809",e.target.innerHTML="WYBIERZ",G[t].chosen=!1):(L((function(e){return[].concat(Object(n.a)(e),[t])})),e.target.style.background="#726006",e.target.innerHTML="WYBRANO",G[t].chosen=!0)},oe=function(e){e.preventDefault();var t=Object(n.a)(G);e.target.className.includes("fa-minus")?t[e.target.id].quantity>1?t[e.target.id].quantity--:t[e.target.id].quantity=1:t[e.target.id].quantity<9?t[e.target.id].quantity++:t[e.target.id].quantity=9,U(t)},ue=function(){var e=Object(s.a)(r.a.mark((function e(t){var a,n,i,s,c,o,u,l,p;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),a=0,n=[],J&&G&&G.map((function(e){if(e.chosen&&"payment-online"===t.target.id){var i={quantity:e.quantity,price_data:{currency:"pln",unit_amount:100*e.price,product_data:{name:e.name,description:e.description}}};return n.push(i)}if(e.chosen&&"payment-offline"===t.target.id){var r={quantity:e.quantity,name:e.name,price:e.price};return a+=e.price*e.quantity,n.push(r)}})),i=I.getDate(),s=I.getMonth()+1,c=I.getFullYear(),o="Data: ".concat(i,"/").concat(s,"/").concat(c," - Godzina: ").concat(re.inputs.hour.value,":00"),u={street:"",local:"",zipCode:"",city:"",message:o},"","payment-online"!==t.target.id){e.next=24;break}return e.prev=11,e.next=14,$("".concat("https://niepospolita-restauracja.herokuapp.com","/api/checkout/"),"POST",JSON.stringify({line_items:n,customer_email:re.inputs.email.value,message:o,deliveryHour:"",phone:re.inputs.phone.value,address:u,productName:"",option:"reservation"}),{"Content-Type":"application/json"});case 14:return l=e.sent,p=l.sessionId,e.next=18,te.redirectToCheckout({sessionId:p});case 18:e.next=22;break;case 20:e.prev=20,e.t0=e.catch(11);case 22:e.next=35;break;case 24:if("payment-offline"!==t.target.id){e.next=35;break}return e.prev=25,e.next=28,$("".concat("https://niepospolita-restauracja.herokuapp.com","/api/mail/"),"POST",JSON.stringify({customer_email:re.inputs.email.value,customer_phoneNumber:re.inputs.phone.value,customer_address:u,customer_items:n,total:a,delivery_info:"",bonusItemName:"",timepickerValue:"",paymentMethod:"",message:o,option:"reservation"}),{"Content-Type":"application/json"});case 28:return e.next=30,ae.push("/success-reservation");case 30:window.location.reload(),e.next=35;break;case 33:e.prev=33,e.t1=e.catch(25);case 35:case"end":return e.stop()}}),e,null,[[11,20],[25,33]])})));return function(t){return e.apply(this,arguments)}}(),le=J.map((function(e,t){var a;return G.length>0&&(a=G[t].quantity),Object(d.jsx)(j,{id:t,name:e.name,price:e.price,description:e.description,image:e.image,changeClickedProductId:ce,quantityChange:oe,quantity:a||1},t)})),pe=a.availableHours.filter((function(e){return!(0===e.guests)})).map((function(e){return Object(d.jsxs)("option",{value:e.hour,children:[e.hour,":00"]})})),de=G.map((function(e){if(e.chosen)return Object(d.jsxs)("p",{style:{color:"white"},children:[e.name," - Ilo\u015b\u0107: ",e.quantity," - Cena: ",e.price*e.quantity," z\u0142"]})}));return Object(d.jsxs)("div",{className:"special",children:[Object(d.jsx)(x.a,{error:X,onClear:ee}),Q&&Object(d.jsx)(O.a,{asOverlay:!0}),Object(d.jsxs)("div",{children:[J.length>0&&Object(d.jsxs)("div",{className:"special-items",children:[Object(d.jsx)("h1",{children:"Wybierz menu i zarezerwuj stolik"}),le]}),P.length>0&&Object(d.jsxs)("form",{className:"special-reservation",children:[Object(d.jsx)("h2",{style:{margin:"0"},children:"Uzupe\u0142nij dane:"}),Object(d.jsx)("p",{style:{fontWeight:"bold",fontSize:"1.2em"},children:"Wybrano:"}),G&&de,Object(d.jsx)("label",{style:{fontWeight:"bold",marginBottom:"0.5em",marginTop:"2em",minHeight:"28px",display:"block"},children:"Wybierz dat\u0119:"}),Object(d.jsx)(h.a,{id:"date",selected:I,onChange:function(e){W(e),re.inputs.hour.value="",re.inputs.hour.isValid=!1,F(0)},excludeDates:w,dateFormat:"dd/MM/yyyy",minDate:new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()+1),maxDate:new Date((new Date).getFullYear(),(new Date).getMonth(),(new Date).getDate()+7)}),Object(d.jsx)(f.a,{id:"hour",element:"select",name:"select",label:"Wybierz godzin\u0119:",validators:[Object(y.c)()],errorText:"Prosz\u0119 wybra\u0107 godzin\u0119.",onInput:se,options:pe}),Object(d.jsx)(f.a,{id:"email",element:"input",type:"email",label:"Podaj email:",validators:[Object(y.c)()],errorText:"Nieprawid\u0142owy email.",onInput:se}),Object(d.jsx)(f.a,{id:"phone",element:"input",type:"text",label:"Podaj nr telefonu:",validators:[Object(y.c)()],errorText:"Nieprawid\u0142owy nr telefonu.",onInput:se}),Object(d.jsx)(p.a,{id:"payment-offline",onClick:ue,disabled:I&&(!re.isValid||!re.inputs.hour.isValid||P.length<=0),children:"Zap\u0142a\u0107 na miejscu"}),Object(d.jsx)(p.a,{id:"payment-online",onClick:ue,disabled:I&&(!re.isValid||!re.inputs.hour.isValid||P.length<=0),children:"Zap\u0142a\u0107 online"})]})]})]})}}}]);
//# sourceMappingURL=7.7df88242.chunk.js.map