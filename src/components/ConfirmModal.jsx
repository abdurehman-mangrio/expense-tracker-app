// components/ConfirmModal.jsx
const ConfirmModal = ({ title, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-4 w-80 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="text-gray-600 hover:underline">Cancel</button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
