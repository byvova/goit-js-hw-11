import{i as l,S as f}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const m="41828858-bc9e123a5e007e4f9a3f52776",p=document.querySelector(".container"),y=document.querySelector("input"),c=document.querySelector(".gallery"),u=document.querySelector(".loader"),g={captionsData:"alt",captionDelay:250};p.addEventListener("submit",async i=>{i.preventDefault();try{const r=encodeURIComponent(y.value.trim());if(!r){l.error({title:"Invalid Input",message:"Please enter a search term."});return}u.style.display="block";const a=`https://pixabay.com/api/?key=${m}&q=${r}`,o=await fetch(a);if(!o.ok)throw new Error("Failed to fetch images. Please try again later.");const t=(await o.json()).hits;if(u.style.display="none",c.innerHTML="",t.length===0){l.error({title:"No Results",message:"No images found. Please try a different search term."});return}c.innerHTML=t.reduce((d,s)=>d+`
            <li class="gallery-item">
                <a class="gallery-link" href="${s.webformatURL}">
                    <img class="gallery-image" src="${s.previewURL}" alt="${s.tags}" />
                </a>
                <div class="content">
                    <h4 class="titles">Likes</h4>
                    <h4 class="titles">Views</h4>
                    <h4 class="titles">Comments</h4>
                    <h4 class="titles">Downloads</h4>
                    <p class="text">${s.likes}</p>
                    <p class="text">${s.views}</p>
                    <p class="text">${s.comments}</p>
                    <p class="text">${s.downloads}</p>
                </div>
            </li>`,"");const n=new f(".gallery a",g)}catch(r){console.error("Error fetching data:",r),r instanceof TypeError?l.error({title:"Network Error",message:"Please check your internet connection and try again."}):l.error({title:"Error",message:r.message})}});
//# sourceMappingURL=commonHelpers.js.map
