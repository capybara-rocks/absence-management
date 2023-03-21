import { Fragment } from 'react';
import { Dialog as UiDialog, Transition } from '@headlessui/react';

export interface DialogProps {
  isOpen: boolean;
  acceptTitle: string;
  rejectTitle?: string;
  onAccept: () => void;
  onReject?: () => void;
  onClose: (value: boolean) => void;
}

export function Dialog({
  isOpen,
  acceptTitle,
  rejectTitle,
  onAccept,
  onReject,
  onClose,
}: DialogProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <UiDialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <UiDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <UiDialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </UiDialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We've sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onAccept}
                  >
                    {acceptTitle}
                  </button>
                  {onReject && (
                    <button
                      type="button"
                      className="text-default-900 hover:bg-default-200 focus-visible:ring-default-500 bg-default-100 ml-2 inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={onReject}
                    >
                      {rejectTitle}
                    </button>
                  )}
                </div>
              </UiDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </UiDialog>
    </Transition>
  );
}

export default Dialog;
