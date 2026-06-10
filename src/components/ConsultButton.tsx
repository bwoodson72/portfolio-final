'use client'

import Link from "next/link";



 export  function ConsultButton() {

    return (
     <Link
         href = "/contact"
     className = "rounded-full bg-accent px-8 py-4 text-sm font-bold text-text transition hover:bg-accent-hover"
     aria-label = "Book a Consultation">
         Book a Consultation
     </Link>
 )
 }