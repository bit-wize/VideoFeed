import React from 'react'
import { useMutation } from "@apollo/client"
import UploadError from "../components/UploadError"
import UploadLayout from "../layouts/UploadLayout"
import { CREATE_POST } from '../graphql/mutations/creatPostMutation'
import { LiaFileVideo } from "react-icons/lia";
import { toast } from 'react-toastify';


function Upload() {
  const [show, setShow] = React.useState(false)
  const [fileData, setFileData] = React.useState<File | null>(null)
  const [errors, setErrors] = React.useState<string[]>([])
  const [errorType, setErrorType] = React.useState<string | null>(null)
  const [isUploading, setIsUploading] = React.useState<boolean>(false)
  const [caption, setCaption] = React.useState<string>("")
  const [file, setFile] = React.useState<File | null>(null)
  const [fileDisplay, setFileDisplay] = React.useState<string | undefined>(
    undefined
  )
  const [createPost] = useMutation(CREATE_POST, {
    onError: (err) => {
      console.log(err)
      setErrors(err.graphQLErrors[0].extensions?.errors)
    },
    variables: {
      text: caption,
      video: fileData,
    },
  })
 

const handleCreatePost = async () => {
  try {
    console.log(fileData);
    setIsUploading(true);
    await createPost();
    setIsUploading(false);
    setShow(true);
    discardFile();
    toast.success("Post created successfully");
  } catch (err) {
    console.log(err);
    toast.error("An error occurred while creating the post");
  }
};


  const dropFile = (e: React.DragEvent<HTMLLabelElement>) => {
    setErrorType(null)
    setFile(e.dataTransfer.files[0])

    const extension = e.dataTransfer.files[0].name.split(".").pop()
    if (extension !== "mp4") {
      setErrorType("file")
      return
    }

    setFileDisplay(URL.createObjectURL(e.dataTransfer.files[0]))
    console.log(fileDisplay)
  }

  React.useEffect(() => {
    console.log(caption.length)
    if (caption.length === 200) {
      setErrorType("caption")
      return
    }

    setErrorType(null)
    console.log("caption", errorType)
  }, [errorType, caption])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'video/mp4') {
        console.error('Invalid file type. Please select a video file.');
        return;
      }
      setFileData(selectedFile);
      setFileDisplay(URL.createObjectURL(selectedFile));
    }
  }


  const discardFile = () => {
    setFile(null)
    setFileDisplay(undefined)
    setCaption("")
  }

  return (
    <>
      <UploadError errorType={errorType} />
      <UploadLayout>
        <div className="w-full mt-[80px] mb-[40px] bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div>
            <div className="text-[23px] font-semibold">Upload video</div>
            <div className="text-gray-400 mt-1">
              Add a video to your account
            </div>
          </div>
          <div className="md:flex gap-6">
            {!fileDisplay ? (
              <label
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  dropFile(e);
                }}
                htmlFor='fileUpload'
                className='md:mx-0 mx-auto mt-4 mb-4 flex flex-col items-center justify-center 
                w-full h-[200px] text-center p-3 border-2 border-dashed border-[#838383] rounded-lg 
                hover:bg-gray-100 hover:border-[#a855f7] cursor-pointer
                hover:text-[#a855f7] text-[#838383]'>
                <input type='file' id='fileUpload' style={{ display: 'none' }} onChange={handleFileChange} accept='video/mp4' />
                <div className="flex flex-col items-center">
                  <LiaFileVideo size="30" />
                  <span>Drag a video or click to select</span>
                </div>
              </label>

            ) : (
              <>
                <div className="ml-[-5] flex items-center justify-center w-full h-[540px] relative">
                  <div className="bg-transparent h-full w-full" />
                  <video
                    autoPlay
                    loop
                    muted
                    className="absolute rounded mt-5 object-cover w-full h-full"
                    src={fileDisplay}
                  />
                </div>
                <div className="mt-4 mb-6">
                  <div className="mt-5">
                    <div className="flex items-center justify-between">
                      <div className="mb-1 text-[15px] font-semibold">Caption</div>
                      <div className="text-gray-400 text-[12px]">
                        {caption.length}
                      </div>
                    </div>

                    <textarea
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      maxLength={200}
                      className="w-full border p-2.5 rounded-md focus:outline-none focus:border-[#a855f7]"
                      style={{
                        minHeight: '50px',  
                        height: 'auto',    
                      }}
                    />

                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={discardFile}
                      className="px-10 py-2.5 mt-8 border text-[16px] hover:bg-gray-100 rounded-lg"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handleCreatePost}
                      className="px-10 py-2.5 mt-8 border text-[16px] text-white bg-[#a855f7]  hover:bg-[#7e22ce]  rounded-lg"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </UploadLayout>
    </>

  )
}

export default Upload