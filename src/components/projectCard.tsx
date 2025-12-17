import Image from "next/image";

export function ProjectCard() {

    return (
        <div className="flex flex-col gap-3 max-w-96 md:w-[calc(33.33%-1.5rem)] min-w-[300px]">
            <Image className='object-cover rounded-2xl ' src="/brianwoodson.jpg" alt="Brian Woodson" width={350} height={350}/>
            <h3 className="text-xl font-bold">Project Name</h3>
            <p>Project Description</p>
        </div>

    )
}