import React from 'react'

function UploadError({ errorType }: { errorType: string | null }) {
    const [error, setError] = React.useState("")
    React.useEffect(() => {
        switch (errorType) {
            case "caption":
                setError("Max. 200 characters.")
                break
            case "bio":
                setError("Max. 100 characters.")
                break
            case "file":
                setError("Only .mp4 files are allowed.")
                break
            case "image":
                setError("Image size too large.")
                break
            default:
                setError("")
        }

        console.log(errorType, error)
    }, [errorType, error])

    return (
        <div className="w-[100%] relative flex justify-center">
            <div
                className={[
                    "absolute top-6 z-50 mx-auto bg-black text-white bg-opacity-70 px-14 py-3 rounded-sm",
                    errorType ? "visible" : "invisible",
                ].join(" ")}
            >
                {error}
            </div>
        </div>
    )
}

export default UploadError