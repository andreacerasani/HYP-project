(window.webpackJsonp=window.webpackJsonp||[]).push([[9,7],{311:function(t,e,r){var content=r(325);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(42).default)("60522c1a",content,!0,{sourceMap:!1})},324:function(t,e,r){"use strict";r(311)},325:function(t,e,r){var o=r(41)(!1);o.push([t.i,'.foc:focus>.card-image[data-v-ab64ce1e]{filter:brightness(100%);transform:scale(1.1)}.trapezoid[data-v-ab64ce1e]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);height:100%;width:100%;background:var(--subtitle-color) linear-gradient(270deg,var(--subtitle-color),#fff);-webkit-clip-path:polygon(50% 100%,65% 0,100% 0,100% 100%);clip-path:polygon(50% 100%,65% 0,100% 0,100% 100%);pointer-events:none}.cards[data-v-ab64ce1e]{position:relative;border:4px solid var(--div-color-dark);border-radius:3%;overflow:hidden;background-color:#000}.cards[data-v-ab64ce1e]:hover{border:4px solid var(--subtitle-color)}.card-image[data-v-ab64ce1e]{background-position:50%;background-repeat:no-repeat;background-size:cover;height:100%;filter:brightness(70%)}.card-image[data-v-ab64ce1e]:hover{filter:brightness(100%);transform:scale(1.1)}.card-title[data-v-ab64ce1e]{text-align:left;color:var(--title-color);text-shadow:.1vw .1vw #000;pointer-events:none}.card-body[data-v-ab64ce1e]{position:absolute;top:50%;left:50%;width:100%;transform:translate(-50%,-50%);pointer-events:none}.p[data-v-ab64ce1e]{font-weight:550;font-size:1.25em;font-feature-settings:"smcp";font-variant:small-caps}',""]),t.exports=o},326:function(t,e,r){var content=r(336);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(42).default)("b48cd390",content,!0,{sourceMap:!1})},328:function(t,e,r){"use strict";r.r(e);var o={name:"ClickableImage",mixins:[r(77).a],props:{name:{type:String,required:!0},date:{type:String,required:!1,default:null},img:{type:String,required:!0},link:{type:String,required:!0},trapezoid:{type:Boolean,required:!1,default:!1}}},l=(r(324),r(19)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"cards"},[r("nuxt-link",{staticClass:"foc",attrs:{to:t.link}},[r("div",{staticClass:"card-image",style:{"background-image":"url("+t.img+")"}}),t._v(" "),t.trapezoid?r("div",{staticClass:"trapezoid"}):t._e(),t._v(" "),r("div",{staticClass:"p card-body",attrs:{id:"card-body"}},[null!==t.date?r("div",{staticClass:"card-title text-center",attrs:{id:"date"}},[t._v("\n        "+t._s(t.formatDate(t.date))+"\n      ")]):t._e(),t._v(" "),r("div",{staticClass:"card-title text-center"},[t._v(t._s(t.name))])])])],1)}),[],!1,null,"ab64ce1e",null);e.default=component.exports},335:function(t,e,r){"use strict";r(326)},336:function(t,e,r){var o=r(41)(!1);o.push([t.i,".half-side[data-v-1f6ee833]{position:relative;height:max(70vh,370px)}.bigCard[data-v-1f6ee833]{width:90%;height:60vh;min-height:350px;position:absolute;left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);font-size:2em}.smallCard[data-v-1f6ee833]{width:80%;height:18vh;min-height:100px;margin:auto}.outerLeft[data-v-1f6ee833]{background:var(--background-color)}.outerRight[data-v-1f6ee833]{background:var(--subtitle-color)}h1.left[data-v-1f6ee833]{color:var(--subtitle-color)}h1.right[data-v-1f6ee833]{color:var(--title-color)}button[data-v-1f6ee833]{color:var(--subtitle-color);background:#fff}button.left[data-v-1f6ee833]{border-color:var(--subtitle-color)}button.right[data-v-1f6ee833]{border-color:var(--div-color-light)}button.left[data-v-1f6ee833]:hover{background-color:var(--subtitle-color);color:#fff}button.right[data-v-1f6ee833]:hover{background-color:var(--div-color-light);color:#000}",""]),t.exports=o},344:function(t,e,r){"use strict";r.r(e);var o={name:"ShowcaseComponent",components:{clickableImage:r(328).default},props:{title:{type:String,required:!0},linkName:{type:String,required:!1,default:"See all"},linkPath:{type:String,required:!0},content:{type:Array,required:!0},isLeft:{type:Boolean,required:!1,default:!0}},mounted:function(){},methods:{titleClass:function(t){return t?"left":"right"},outer:function(t){return t?"outerLeft":"outerRight"}}},l=(r(335),r(19)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{class:[t.isLeft?"outerLeft":"outerRight"]},[r("div",{staticClass:"container-xl"},[r("div",{staticClass:"row pt-5 align-items-center"},[r("div",{staticClass:"empty-space col-1"}),t._v(" "),r("div",{staticClass:"col-7 text-start"},[r("h1",{class:{left:t.isLeft,right:!t.isLeft}},[t._v("\n          "+t._s(t.title)+"\n        ")])]),t._v(" "),r("div",{staticClass:"col-4 text-md-end text-sm-center pe-sm-3 pe-md-5"},[r("nuxt-link",{attrs:{to:t.linkPath}},[r("button",{staticClass:"btn",class:[t.isLeft?"left":"right"],attrs:{type:"button"}},[t._v("\n            "+t._s(t.linkName)+"\n          ")])])],1)]),t._v(" "),r("div",{staticClass:"row pt-3 pb-5 align-items-center flex-wrap",class:{"flex-row-reverse ":!t.isLeft,"flex-row flex-md-row":t.isLeft}},[r("div",{staticClass:"col-lg-7 col-sm-12 half-side"},[r("div",{staticClass:"pb-3"},[r("clickable-image",{staticClass:"bigCard",attrs:{img:t.content[0].images[0].path,name:t.content[0].title,link:t.content[0].linkPath,date:t.content[0].date,trapezoid:!1}})],1)]),t._v(" "),r("div",{staticClass:"col-lg-5 half-side"},[r("clickable-image",{staticClass:"smallCard number-1 flex-fill",attrs:{img:t.content[1].images[0].path,name:t.content[1].title,link:t.content[1].linkPath,date:t.content[1].date,trapezoid:!0}}),t._v(" "),r("br"),t._v(" "),r("clickable-image",{staticClass:"smallCard number-2 flex-fill",attrs:{img:t.content[2].images[0].path,name:t.content[2].title,link:t.content[2].linkPath,date:t.content[2].date,trapezoid:!0}}),t._v(" "),r("br"),t._v(" "),r("clickable-image",{staticClass:"smallCard number-3 flex-fill",attrs:{img:t.content[3].images[0].path,name:t.content[3].title,link:t.content[3].linkPath,date:t.content[3].date,trapezoid:!0}})],1)])])])}),[],!1,null,"1f6ee833",null);e.default=component.exports}}]);
//# sourceMappingURL=3fa9113.js.map