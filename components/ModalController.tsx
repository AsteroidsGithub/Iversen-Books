import useSharedState from '@Middleware/useSharedState';

const ModalController: React.FC<{}> = ({ children }) => {
  const { activeModal, setActiveModal } = useSharedState();
  return (
    <div>
      {activeModal != null && (
        <div
          className="flex h-screen w-full items-center justify-center bg-white/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModal(null);
          }}
        >
          <div className="z-10 mx-2 md:mx-8 flex h-fit w-fit max-w-4xl flex-col items-center rounded border-2 border-gray-100 bg-white pb-2 pt-4 md:py-8 px-1 md:px-6 shadow-md ">
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
