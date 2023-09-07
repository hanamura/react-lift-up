import o,{useState as t,useEffect as e}from"react";var n="XAesA";const c=({children:c,type:l})=>{console.log(l);const[u,r]=t(0);return e((()=>{console.log("Button count updated",u)}),[u]),e((()=>(console.log("Button mounted"),()=>{console.log("Button unmounted")})),[]),o.createElement("button",{className:n,onClick:()=>r(u+1)},c," ",u)};export{c as Button};
//# sourceMappingURL=index.js.map
