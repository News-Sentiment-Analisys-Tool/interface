import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form from "react-bootstrap/Form"
import { Button, Container, Row, Col } from 'react-bootstrap'
import { SET_SIMULATOR_PARAMS } from '../actions/actionTypes'

const getCurrentFormatedDate = () => {
    let startDate = new Date('2022-02-17')
    let endDate = new Date('2022-04-04')

    return {
        startDate: startDate.toISOString().substring(0, 10),
        endDate: endDate.toISOString().substring(0, 10)
    }
}

export const CompanyDateForm = ({ setValue }) => {
    const [company, setCompany] = useState(1)
    const [indicator, setIndicator] = useState(1)
    const [slow, setSlow] = useState(10)
    const [fast, setFast] = useState(5)
    const [signal, setSignal] = useState(0)
    const [startDate, setStartDate] = useState(getCurrentFormatedDate()['startDate'])
    const [endDate, setEndDate] = useState(getCurrentFormatedDate()['endDate'])
    const [candle, setCandle] = useState(true)
    const [volume, setVolume] = useState(true)
    
    const dispatch = useDispatch()

    useEffect(() => {}, [indicator])

    const handleClick = () => {
        dispatch({
            type: SET_SIMULATOR_PARAMS,
            value: {
                company,
                startDate,
                endDate,
                indicator: parseInt(indicator),
                slow,
                fast,
                signal,
                candle,
                volume
            }
        })

        setValue({
            company,
            startDate,
            endDate,
            indicator
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
                                        <option value={1} >Itaú (ITUB4)</option>
                                        <option value={2} >Petrobras (PETR4)</option>
                                        <option value={3} >Bradesco (BRDC4)</option>
                                        <option value={4} >B3 (B3SA3)</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="disabledSelect">Indicador</Form.Label>
                                    <Form.Control 
                                        as="select"
                                        value={indicator}
                                        onChange={e => {
                                        setIndicator(e.target.value);
                                        }} >
                                        <option value={1} >MME</option>
                                        <option value={2} >MACD</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Container>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Label htmlFor="disabledTextInput">Média Exp. Lenta</Form.Label>
                                    <Form.Control  
                                        type="number"
                                        name="slow"
                                        value={slow}
                                        onChange={(e) => setSlow(e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="disabledTextInput">Média Exp. Rápida</Form.Label>
                                    <Form.Control  
                                        type="number"
                                        name="fast"
                                        value={fast}
                                        onChange={(e) => setFast(e.target.value)} />
                                </Col>
                                <Col>
                                <Form.Label htmlFor="disabledTextInput">Sinal</Form.Label>
                                <Form.Control  
                                    type="number"
                                    disabled={indicator === 1}
                                    name="signal"
                                    value={signal}
                                    onChange={(e) => setSignal(e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Check 
                                        style={{
                                            marginTop: '7.5%',
                                            marginLeft: '10%'
                                        }}
                                        type="switch"
                                        id="custom-switch"
                                        label="Mostrar Candlestick"
                                        value={candle}
                                        checked={candle}
                                        isValid={true}
                                        onChange={(e) => setCandle(!candle)}
                                    />
                                    <Form.Check 
                                        style={{
                                            marginLeft: '10%'
                                        }}
                                        type="switch"
                                        id="custom-switch"
                                        label="Mostrar Volume"
                                        value={volume}
                                        checked={volume}
                                        isValid={true}
                                        onChange={(e) => setVolume(!volume)}
                                    />
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
                            Simular
                    </Button>
                </Form>
            </Row>
        </Container>
    )
}