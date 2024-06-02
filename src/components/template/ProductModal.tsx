interface ProductModalProps {
    openModal: boolean;
    closeModal: (event: any) => void;
}

export default function ProductModal(props: ProductModalProps) {

    if (!props.openModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Product</h3>
                    <div className="mt-2 px-7 py-3">
                        <form>
                            <div className="mb-2">
                                <input type="text" placeholder="Reference" className="px-3 py-2 border rounded w-full" />
                            </div>
                            <div className="mb-2">
                                <input type="text" placeholder="Product Name" className="px-3 py-2 border rounded w-full" />
                            </div>
                            <div className="mb-2">
                                <input type="number" placeholder="Stock" className="px-3 py-2 border rounded w-full" />
                            </div>
                        </form>
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600"
                            onClick={props.closeModal}
                        >
                            Add Product
                        </button>
                        <button
                            id="close-btn"
                            className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 mt-2"
                            onClick={props.closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}