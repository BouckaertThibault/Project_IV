(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["signup"],{1277:function(t,a,e){},"59a5":function(t,a,e){"use strict";var s=e("7c7c"),n=e.n(s);n.a},"5c9c":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"o-container-center"},[s("div",{staticClass:"c-arrow",on:{click:t.goBack}},[s("img",{attrs:{src:e("83d8"),alt:"back"}})]),s("form",{staticClass:"c-form",on:{submit:function(a){return a.preventDefault(),t.register(a)}}},[s("h1",[t._v("Sign Up")]),s("label",{staticClass:"c-form-label"},[t._v("Username")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"c-form-input",attrs:{type:"text",placeholder:"Username",required:"",autofocus:""},domProps:{value:t.username},on:{input:function(a){a.target.composing||(t.username=a.target.value)}}}),s("label",{staticClass:"c-form-label"},[t._v("Email")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"c-form-input",attrs:{type:"email",placeholder:"Email",required:""},domProps:{value:t.email},on:{input:function(a){a.target.composing||(t.email=a.target.value)}}}),s("label",{staticClass:"c-form-label"},[t._v("Password")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"c-form-input",attrs:{type:"password",placeholder:"Password",required:""},domProps:{value:t.password},on:{input:function(a){a.target.composing||(t.password=a.target.value)}}}),s("label",{staticClass:"c-form-label"},[t._v("Confirm password")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.password_confirmation,expression:"password_confirmation"}],staticClass:"c-form-input",attrs:{type:"password",placeholder:"Password confirmation",required:""},domProps:{value:t.password_confirmation},on:{input:function(a){a.target.composing||(t.password_confirmation=a.target.value)}}}),s("primary-button",{staticClass:"signup-container-buttons",attrs:{type:"submit"}},[t._v("Next step")]),s("router-link",{staticClass:"c-swap",attrs:{to:"signin"}},[s("span",[t._v("I already have an account")])]),t.loading?s("div",{staticClass:"loader"}):t._e()],1)])},n=[],r=(e("cadf"),e("551c"),e("097d"),e("d1ca")),o={name:"signup",data:function(){return{username:"",email:"",password:"",password_confirmation:"",loading:!1}},methods:{goBack:function(){this.$router.go(-1)},register:function(){var t=this;this.loading=!0;var a={username:this.username,email:this.email,password:this.password};this.$store.dispatch("register",a).then(function(){t.loading=!1,t.$router.push("/signin")}).catch(function(a){t.loading=!1,console.log(a)})}},components:{PrimaryButton:r["a"]}},i=o,c=(e("59a5"),e("2877")),l=Object(c["a"])(i,s,n,!1,null,"481b4b46",null);l.options.__file="SignUp.vue";a["default"]=l.exports},"5f0b":function(t,a,e){"use strict";var s=e("1277"),n=e.n(s);n.a},"7c7c":function(t,a,e){},"83d8":function(t,a,e){t.exports=e.p+"img/Arrow-back.5e196fe1.svg"},d1ca:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"c-button"},[e("button",{staticClass:"c-primary-button"},[t._t("default",[t._v("Button")])],2)])},n=[],r={name:"PrimaryButton"},o=r,i=(e("5f0b"),e("2877")),c=Object(i["a"])(o,s,n,!1,null,"74a3277a",null);c.options.__file="PrimaryButton.vue";a["a"]=c.exports}}]);
//# sourceMappingURL=signup.17e00505.js.map