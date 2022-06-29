import useSharedState from '@Middleware/useSharedState';

const ModalController: React.FC<{}> = ({ children }) => {
  const { activeModal, setActiveModal } = useSharedState();
  return (
    <div>
      {activeModal != null && (
        <div
          className="flex h-screen w-full items-center justify-center bg-white/70"
          onClick={(e) => {
            console.log('test');
            setActiveModal(null);
          }}
        >
          <div
            className="z-10 flex h-fit w-4/5 max-w-sm flex-col items-center rounded border-2 border-gray-100 bg-white py-8 px-6 shadow-md "
            onClick={(e) => {
              e.stopPropagation();
              console.log('Prevented default');
            }} // prevent click from bubbling up to the modal
          >
            {activeModal}
          </div>
        </div>
      )}
      <div
        className={`${
          activeModal != null &&
          'fixed top-0 -z-10 block h-full w-full flex-none overflow-hidden object-cover '
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalController;
