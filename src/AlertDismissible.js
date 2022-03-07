import { useState } from 'react'
import {
    Alert,
    Button
} from 'react-bootstrap'

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
function formatDate(date) {
return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
].join('-');
}

export function AlertDismissible() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Sem dados para o período</Alert.Heading>
          <p>
            {`Escolha um novo período entre 17-02-2022 e ${formatDate(new Date())}`}
          </p>
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
}
