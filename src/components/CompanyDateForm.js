import Form from "react-bootstrap/Form";
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useState } from 'react'

const getCurrentFormatedDate = () => {
    let startDate = new Date('2022-02-17')
    let endDate = new Date()

    return {
        startDate: startDate.toISOString().substring(0, 10),
        endDate: endDate.toISOString().substring(0, 10)
    }
} 

export const CompanyDateForm = ({ setValue }) => {
    const [company, setCompany] = useState(1)
    const [startDate, setStartDate] = useState(getCurrentFormatedDate()['startDate'])
    const [endDate, setEndDate] = useState(getCurrentFormatedDate()['endDate'])

    const handleClick = () => {
        setValue({
            company,
            startDate,
            endDate
        })
    }

    return (
        <Container>
            <Row>
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
                        }}
                        variant='success'
                        type="submit">
                            Submit
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}