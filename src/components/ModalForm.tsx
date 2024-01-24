import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@lib';
import { mdiCloseCircleOutline } from '@mdi/js';
import BaseIcon from './BaseIcon';
import { ScrollArea } from './ui/scroll-area';

interface IModalFormProps {
  title: string;
  children: React.ReactNode;
  modalToggleBtn: JSX.Element;
  isOpen: boolean;
  handleModalToggle: (open: boolean) => void;
  className?: string;
}

const ModalForm: React.FC<IModalFormProps> = ({
  title,
  children,
  modalToggleBtn,
  handleModalToggle,
  isOpen,
  className,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleModalToggle}>
      <AlertDialogTrigger asChild>{modalToggleBtn}</AlertDialogTrigger>
      <AlertDialogContent className={cn(' py-6 px-1', className)}>
        <AlertDialogHeader className="flex flex-row justify-between px-6 pb-4 border-b">
          <AlertDialogTitle className="text-2xl">
            {title}
          </AlertDialogTitle>

          <button
            className="text-gray-500 transition hover:text-red-600"
            onClick={() => handleModalToggle(false)}
          >
            <span className="sr-only">Dismiss popup</span>
            <BaseIcon path={mdiCloseCircleOutline} className="w-6 h-6" />
          </button>
        </AlertDialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="mx-6">{children}</div>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalForm;
