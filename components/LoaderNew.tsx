import React from 'react'
import "./LoaderNew.css";


const LoaderNew = () => {
  return (
    <div>
      
<div className="preloader text-center max-w-[20em] w-full">
  <svg className="cart mx-auto mb-6 w-26 h-26" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
      <g className="cart__track stroke-[rgba(25,25,25,0.1)] dark:stroke-[rgba(230,230,230,0.1)]">
        <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
        <circle cx="43" cy="111" r="13" />
        <circle cx="102" cy="111" r="13" />
      </g>
      <g className="cart__lines stroke-current">
        <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" strokeDasharray="338 338" strokeDashoffset="-338" />
        <g className="cart__wheel1" transform="rotate(-90,43,111)">
          <circle className="cart__wheel-stroke" cx="43" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
        </g>
        <g className="cart__wheel2" transform="rotate(90,102,111)">
          <circle className="cart__wheel-stroke" cx="102" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
        </g>
      </g>
    </g>
  </svg>
  <div className="preloader__text relative h-[1.5em]">
    <p className="preloader__msg absolute w-full animate-msg">Bringing you the goods…</p>
    <p className="preloader__msg preloader__msg--last absolute w-full animate-msg-reverse invisible">This is taking long. Something’s wrong.</p>
  </div>
</div>


    </div>
  )
}

export default LoaderNew
