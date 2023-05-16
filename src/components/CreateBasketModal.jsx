import { useState } from "react";

function CreateBasketModal({ isCreateBasket, setIsCreateBasket }) {
  const [buttonLoading, setButtonLoading] = useState(false);
  function createBasketToggler() {
    setIsCreateBasket((val) => !val);
  }

  function createBasketHandler() {
    console.log("clicked");
    // show the loader icon
    setButtonLoading((prev) => !prev);
    // (lly) send a post request and create a basket
    // fake API req
    setTimeout(() => setButtonLoading((prev) => !prev), 2000);
    // automatically redirect to the newly create basket route within the app
    // (maybe) show a toast notification
    // (and) close the modal
    // createBasketToggler();
  }

  return (
    <div className="modal-wrapper">
      <div className="overlay fixed inset-0 flex h-screen w-full items-center justify-center bg-black/10">
        <div className="modal-content relative w-96 rounded-lg bg-white px-4 py-6">
          <div
            onClick={() => createBasketToggler()}
            className="close-icon absolute right-2 top-2 cursor-pointer rounded-md p-0.5 transition-all hover:bg-gray-50"
          >
            <XMarkIcon className="h-5 w-5" />
          </div>
          <span>Create new basket</span>
          <input
            autoFocus
            disabled={buttonLoading}
            className="mt-4 w-full rounded-lg bg-gray-50 px-2 py-2 outline-none"
            type="text"
            placeholder="Basket name"
          />
          <button
            onClick={() => createBasketHandler()}
            disabled={buttonLoading}
            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-8 py-1.5 tracking-wide transition-all ${
              buttonLoading
                ? `cursor-not-allowed bg-yellow-200 text-gray-400`
                : `cursor-pointer bg-yellow-400 hover:bg-amber-400`
            }`}
          >
            {buttonLoading && <LoadingSpinner />}
            {buttonLoading ? "Creating" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

function XMarkIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <svg
      aria-hidden="true"
      role="status"
      className="inline h-4 w-4 animate-spin text-gray-400"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      ></path>
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="#FFF"
      ></path>
    </svg>
  );
}

export default CreateBasketModal;
