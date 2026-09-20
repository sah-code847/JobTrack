const Modal = ({ clearModal, confirmClear, message, closeModal }) => {
  return (
    <>
      {clearModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl shadow-xl w-96 text-center">
            
            <h2 className="text-xl font-bold !text-slate-900">
              {message}
            </h2>

            <div className="flex justify-center gap-3 mt-6">

              <button
                onClick={closeModal}
                className="bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300 cursor-pointer"
              >
                No
              </button>

              <button
                onClick={confirmClear}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
              >
                Yes
              </button>

            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default Modal;