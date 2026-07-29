
type PlaceholderProps = {
    title: string,
    description: string
}

export default function Placeholder({ title, description }: PlaceholderProps) {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-2xl">{title}</h1>
            <div className="text-md text-gray-500">
                {description}
            </div>
        </div>
    )
}