import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Upload1 = ({name,label,register,setValue,errors}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const onDrop = (acceptedFiles) => {
    console.log("accepted files", acceptedFiles);

    const selectedFile = acceptedFiles[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);

    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const removeFile = () => {
    setFile(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    disabled: !!file,

    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="h-96 w-96 border-4 bg-green-400 flex items-center justify-center"
    >
      <input {...getInputProps()} />

      {file && preview ? (
        <div>
          <p>Uploaded Image:</p>

          <img
            src={preview}
            alt="Uploaded"
            className="w-60 h-60 object-cover"
          />

          <p>{file.name}</p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation(); //"This click is only for my button. Don't pass it to my parent."
              removeFile();
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <p>Drag & Drop Image Here</p>
      )}
    </div>
  );
};

export default Upload1;