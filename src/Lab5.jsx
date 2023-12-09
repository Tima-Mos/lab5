import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import {Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

const Lab5 = () => {
    const grammar = {
        Q: [
            ['a', 'c', 'A'],
            ['a', 'c', 'B'],
            ['ε']
        ],
        A: [
            ['A', 'a'],
            ['A', 'b'],
            ['a']
        ],
        B: [
            // ['A'],
            ['C', 'b'],
            ['ε']
        ],
        C: [
            ['d', 'C', 'c']
            // Add more number productions if needed
            // G=([Q, A, B, C, D], [a, b, c], P, Q)
            //                           <br/>1. Q->acA|acB|ε
            //                           <br/>2. A->Aa|Ab|a
            //                           <br/>3. B->A|Cb|ε
            //                           <br/>4. C->dCc
            //                           <br/>5. D->dc
            // проверяй сперва весь стек, потом уберай по символу из начала, что бы парсер
            // пытался свернуть функцию сразу полностью а не по одной букве за раз
        ],
        D: [
            ['d', 'c']
        ],
    };

    let inputString = ""
    let stac = ""
    let corections = 1
    let temp = ""
    let result = ""
    const [stringValue, setStringValueValue] = useState("");
    const [inputField, setInputField] = useState("");
    function parceGrammar(){
        inputString = inputField
        stac = ""
        corections = 1
        temp = ""
        result = ""
        result += `\nначальный инпут: ${inputString}\n`
        for (let i = inputString.length-1; i > -1; i-- ){
            stac = stac + inputString[0];
            inputString = inputString.slice(1);
            if (inputString.length<1) {
                temp = stac
            } else {
                temp = stac.slice(1)
            }

            console.log(`стак в данный момент: ${stac}`)
            console.log(`инпут: ${inputString}`)
            result += `\nинпут: ${inputString}\nстак: ${stac}`
            if (stac === "a"){
                continue
            }
            corections = 1;
            while (corections>0 || temp !== "") {
                if (corections === 0){
                    temp = temp.slice(1);
                } else {
                    if (inputString.length<1) {
                        temp = stac
                    } else {
                        temp = stac.slice(1)
                    }
                }
                corections = 0;
                for (const [key, value] of Object.entries(grammar)) {
                    //console.log(`${key}: ${value}`);
                    value.forEach(function (item, i, arr) {
                        //console.log(item.join(''))
                        if (temp === item.join('')) {
                            corections++;
                            console.log(`${temp} -> ${key}`)
                            result += `\nсвертка: ${temp} -> ${key}`
                            stac = stac.slice(0, stac.length - temp.length)
                            temp = key.toString()
                            stac = stac + temp
                            console.log(`стак в данный момент: ${stac}`)
                            result += `\nстак: ${stac}`

                        }
                    })
                }
            }
        }
        setStringValueValue(result);
    }
    return (
        <div>
          <Container>
              <Row>
                  <Col style={{backgroundColor: "white", borderRadius: "0.375rem"}}>
                      <p style={{fontSize: "1.25rem"}}>
                          G=([Q, A, B, C, D], [a, b, c], P, Q)
                          <br/>1. Q->acA|acB|ε;
                          <br/>2. B->A|Cb|ε;
                          <br/>3. A->Aa|Ab|a;
                          <br/>4. C->dCc;
                          <br/>5. D->dc;
                      </p>
                  </Col>
                  <Col>
                      <InputGroup size="md" >
                          <Form.Control
                              aria-label="Large"
                              aria-describedby="inputGroup-sizing-sm"
                              placeholder="Введите строчку"
                              onChange={event => setInputField(event.target.value)}
                          />
                      </InputGroup>
                      <Button onClick={parceGrammar} variant="primary" size="md" style={{marginTop:"10px"}} >
                          Разложить
                      </Button>
                      {/*<div style={{backgroundColor: "white", borderRadius: "0.375rem", marginTop:"10px"}} >*/}
                      {/*    {stringValue}*/}
                      {/*</div>*/}
                      <InputGroup size="lg" style={{marginTop: "10px"}}>
                          <Form.Control as="textarea"
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        value={stringValue}
                                        readOnly={true}

                          />
                      </InputGroup>

                  </Col>
              </Row>
          </Container>
        </div>
    );
};

export default Lab5;