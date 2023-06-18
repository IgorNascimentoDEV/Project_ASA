import React from "react";
import { Table, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

class Maquina extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      maquina: [],
    };
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome maquina</th>
                <th>Colab</th>
                <th>Setor</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
export default Maquina;
