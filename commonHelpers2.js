import"./assets/main-a167672d.js";import{i as r}from"./assets/vendor-77e16229.js";const o=document.querySelector(".form");o.addEventListener("submit",c);function c(i){i.preventDefault();const e=o.elements.delay.value,s=o.elements.state.value;new Promise((t,m)=>{setTimeout(()=>{s=="fulfilled"?t(`OK Fulfilled promise in ${e}ms`):m(`ERROR Rejected promise in ${e}ms`)},e)}).then(t=>{n(t,"success")}).catch(t=>{n(t,"error")}),o.reset()}function n(i,e){const s={message:i,position:"topRight",class:e,color:"white",timeout:3e3};r[e](s)}
//# sourceMappingURL=commonHelpers2.js.map