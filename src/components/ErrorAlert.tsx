import { Alert } from "react-bootstrap";
import { useErrorStore } from "../stores";

function ErrorAlert() {
  const {mensaje, resetearError} = useErrorStore()

  if (!mensaje) {
    return <></>
  }

  return <>
    <Alert variant="danger" onClose={() => resetearError()} dismissible>
      <Alert.Heading>Error</Alert.Heading>
      <p>{mensaje}</p>
    </Alert>
  </>
}

export default ErrorAlert;
