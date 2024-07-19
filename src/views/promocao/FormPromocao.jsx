import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormPromocao() {
    const [titulo, setTitulo] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [regra, setRegra] = useState('');
    const [valorDesconto, setValorDesconto] = useState('');
    const [idPromocao, setIdPromocao] = useState(null);
    const { state } = useLocation();

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return '';
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8081/api/promocao/" + state.id)
                .then((response) => {
                    setIdPromocao(response.data.id);
                    setTitulo(response.data.titulo);
                    setDataInicio(response.data.dataInicio);
                    setDataFim(formatarData(response.data.dataFim));
                    setRegra(response.data.regra);
                    setValorDesconto(response.data.valorDesconto);
                });
        }
    }, [state]);

    function salvar() {
        let promocaoRequest = {
            titulo: titulo,
            dataInicio: dataInicio,
            dataFim: dataFim,
            regra: regra,
            valorDesconto: valorDesconto
        };

        if (idPromocao != null) { // Alteração:
            axios.put("http://localhost:8081/api/promocao/" + idPromocao, promocaoRequest)
                .then((response) => { console.log('Promoção alterada com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar a promoção.') });
        } else { // Cadastro:
            axios.post("http://localhost:8081/api/promocao", promocaoRequest)
                .then((response) => { console.log('Promoção cadastrada com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir a promoção.') });
        }
    }

    return (
        <div>
            <MenuSistema />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    {idPromocao === null &&
                        <h2>
                            <span style={{ color: 'darkgray' }}> Promoção &nbsp;<Icon name='angle double right' size="small" /> </span>
                            Cadastro
                        </h2>
                    }
                    {idPromocao !== null &&
                        <h2>
                            <span style={{ color: 'darkgray' }}> Promoção &nbsp;<Icon name='angle double right' size="small" /> </span>
                            Alteração
                        </h2>
                    }
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength='100'
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />

                                <Form.Field>
                                    <label>Data de Início</label>
                                    <InputMask
                                        mask='99/99/9999'
                                        maskChar={null}
                                        placeholder='Ex: 20/03/2023'
                                        value={dataInicio}
                                        onChange={(e) => setDataInicio(e.target.value)}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <label>Data de Fim</label>
                                    <InputMask
                                        mask='99/99/9999'
                                        maskChar={null}
                                        placeholder='Ex: 20/03/2023'
                                        value={dataFim}
                                        onChange={(e) => setDataFim(e.target.value)}
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Regra'
                                    maxLength='100'
                                    value={regra}
                                    onChange={(e) => setRegra(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor do Desconto'
                                    maxLength='10'
                                    value={valorDesconto}
                                    onChange={(e) => setValorDesconto(e.target.value)}
                                />
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Link to={'/list-promocao'}>
                                <Button
                                    type='button'
                                    inverted
                                    circular
                                    icon
                                    labelPosition='left'
                                    color='orange'
                                >
                                    <Icon name='reply' />
                                    Voltar
                                </Button>
                            </Link>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
