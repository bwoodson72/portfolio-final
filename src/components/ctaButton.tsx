
export function CtaButton({label, href}:{label:string, href:string}) {

    return (
    <div className="flex justify-center gap-3 bg-blue-900 text-gray-300 hover:bg-blue-700 p-3 rounded-xl m-6 max-w-fit">
        <a className='decoration-0 font-bold text-gray-300' href={href}>{label}</a>
    </div>
    )
}