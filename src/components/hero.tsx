import { CtaButton } from "./ctaButton";

export function Hero() {

    return (
        <section id='hero' className="flex justify-center w-screen h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-cover bg-center">
            <div className='p-4 flex flex-col items-center mx-auto my-auto'>
            <h1 className="text-6xl font-bold text-white">I'm Brian Woodson</h1>
            <p className="text-xl text-white">Full stack Web Developer</p>
                <CtaButton label="Get Your Project Started" href="#contact"/>
            </div>

        </section>
    )
}