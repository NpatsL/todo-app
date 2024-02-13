interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (modalOpen: boolean) => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children }) => {
    return (
        <dialog
            id="my_modal_3"
            className={`modal ${modalOpen ? "modal-open" : ""}`}
        >
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        onClick={() => setModalOpen(false)}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >
                        ✕
                    </button>
                </form>
                {children}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={() => setModalOpen(false)}>close</button>
            </form>
        </dialog>
    );
};

export default Modal;
