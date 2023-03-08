import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Curso() {
    return <>
    <div className="container">
    <div className="row">
    <Card style={{ width: '18rem'}}>
      <Card.Img variant="top" src="matematicas.jpg" />
      <Card.Body>
        <Card.Title>Matematicas</Card.Title>
        <Card.Text>
        es la ciencia de la estructura, el orden y los patrones repetitivos que se basa en contar, medir y describir las formas.
        </Card.Text>
        <Button 
        variant="primary" >Inicia seccion para inscirbirse 
        </Button>
      </Card.Body>
    </Card>
    </div>
  </div>
    </>;
    

}
export default Curso;