import { createPortal } from "react-dom";

export default function ConfirmationModal({ modalData }) {

  console.log("inside confirmation modal with modalData: ", modalData);

  return createPortal(
    <div className="fixed inset-0 z-1000 mt-0! grid place-items-center overflow-auto bg-white/10 backdrop-blur-sm">
      <div className="w-11/12 max-w-87.5 rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex items-center gap-x-4">
          <button className="cursor-pointer bg-yellow-50 rounded-md py-2 px-5 font-semibold text-richblack-900"
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1Text}
          </button>
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-2 px-5 font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
