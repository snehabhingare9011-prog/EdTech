import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";

const Upload = ({
  name,
  label,
  errors,
  register,
  setValue,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const { editCourse, course } = useSelector((state) => state.course);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Existing image/video while editing/viewing
  useEffect(() => {
    if (viewData) {
      setPreview(viewData);
    }

    if (editData) {
      setPreview(editData);
    }

    // Existing course image
    if (!video && editCourse && course?.thumbnail) {
      setPreview(course.thumbnail);
    }
  }, [viewData, editData, editCourse, course, video]);

  // Preview newly selected file
  useEffect(() => {
    if (!file) {
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
    setPreview("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: !!file || !!viewData || !!editData||!!preview,
    accept: video
      ? {
          "video/*": [".mp4", ".webm", ".mov"],
        }
      : {
          "image/*": [".jpeg", ".jpg", ".png"],
        },
  });

  useEffect(() => {
    register(name, {
      required: true,
    });
  }, [register, name]);

  useEffect(() => {
    setValue(name, file);
  }, [file, name, setValue]);

  return (
    <div className="flex flex-col space-y-2">

      <label htmlFor={name} className="text-sm text-richblack-5">
        {label}{" "}
        <sup className="text-pink-200">*</sup>
      </label>

      <div
        {...getRootProps()}
        className={`${
          isDragActive
            ? "bg-richblack-600"
            : "bg-richblack-700"
        } flex min-h-62.5 cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="flex w-full flex-col items-center p-6">

            {video ? (
              <video
                src={preview}
                controls
                className="max-h-[250px] max-w-full rounded-md"
              />
            ) : (
              <img
                src={preview}
                alt="Uploaded"
                className="max-h-[200px] max-w-full rounded-md object-contain"
              />
            )}

            {file && (
              <p className="mt-3 text-sm text-richblack-200">
                {file.name}
              </p>
            )}

            { !viewData && <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                removeFile();
              }}
              className="mt-3 text-richblack-400 underline"
            >
              Cancel
            </button>}

          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6">

            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-50 text-center text-sm text-richblack-200">
              Drag and drop a {video ? "video" : "image"}, or click to{" "}
              <span className="font-semibold text-yellow-50">
                Browse
              </span>{" "}
              a file
            </p>

            {!video && (
              <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
                <li>Aspect ratio 16:9</li>
                <li>Recommended size 1024x576</li>
              </ul>
            )}

          </div>
        )}
      </div>

      {errors?.[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}

    </div>
  );
};

export default Upload;