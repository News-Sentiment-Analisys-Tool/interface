import Form from "react-bootstrap/Form";
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

export const CompanyDateForm = ({ setValue }) => {
    const [company, setCompany] = useState(1)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    
    const handleClick = () => {
        setValue({
            company,
            startDate,
            endDate
        })
    }

    return (
        <>
        <Form>
            <Form.Group className="mb-3">
                <Container>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="disabledTextInput">Date de Início</Form.Label>
                            <Form.Control  
                                type="date"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Label htmlFor="disabledTextInput">Date de Término</Form.Label>
                            <Form.Control  
                                type="date"
                                name="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)} />
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
            <Form.Group className="mb-3">
            <Container>
                    <Row>
                        <Col>
                            <Form.Label htmlFor="disabledSelect">Empresa</Form.Label>
                            <Form.Control 
                                as="select"
                                value={company}
                                onChange={e => {
                                  setCompany(e.target.value);
                                }} >
                                <option value={1} >Itaú</option>
                                <option value={2} >Petrobras</option>
                                <option value={3} >Bradesco</option>
                                <option value={4} >B3</option>
                            </Form.Control>
                        </Col>
                    </Row>
                </Container>
            </Form.Group>
            <Button onClick={(e) => {
                e.preventDefault()
                handleClick(e.target.value)
            }} type="submit">Submit</Button>
        </Form>
        </>
    )
}