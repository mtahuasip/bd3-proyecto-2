import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FC } from "react";

interface AlertMessageProps {
  status: number;
  message: string;
}

export const AlertMessage: FC<AlertMessageProps> = ({ status, message }) => {
  return (
    <Alert variant={status === 0 ? "default" : "destructive"}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Ha ocurrido un error</AlertTitle>
      <AlertDescription>
        {status === 0 ? "No se pudo identificar el error" : message}
      </AlertDescription>
    </Alert>
  );
};
