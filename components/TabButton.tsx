const TabButton: React.FC<{
    isActive: Boolean;
    onClick: () => void;
}> = ({ children, isActive, onClick, ...props }) => (
    <div
        onClick={onClick}
        className={`group flex h-full w-full flex-grow rounded bg-gray-100 py-2.5 ${
            isActive && " border-b-4 border-blue-500"
        } ${props}`}
    >
        <p
            className={`h-full w-full text-center text-lg font-medium ${
                isActive && "text-xl font-bold"
            }`}
        >
            {children}
        </p>
    </div>
);

export default TabButton;
