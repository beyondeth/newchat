import * as AlertDialog from "@radix-ui/react-alert-dialog";

interface LeaveRoomAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LeaveRoomAlert({
  isOpen,
  onClose,
  onConfirm,
}: LeaveRoomAlertProps) {
  return (
    <AlertDialog.Root open={isOpen} onOpenChange={onClose}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/30" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-md">
          <AlertDialog.Title className="text-lg font-bold">
            채팅방 나가기
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 space-y-2 text-center text-gray-600">
            <p>모든 대화 내용이 삭제되며 복구할 수 없습니다.</p>
            <p>정말 나가시겠습니까?</p>
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-4">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 text-sm rounded-md border hover:bg-gray-50">
                아니오
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                예
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
