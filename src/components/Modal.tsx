export const Modal = ({ isOpen, onClose, children } : any) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-2/4 flex items-center justify-center" >
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            
          </button>
          <div className="flex flex-col items-center justify-center w-[100%]">{children}</div>
        </div>
      </div>
    );
  };
  