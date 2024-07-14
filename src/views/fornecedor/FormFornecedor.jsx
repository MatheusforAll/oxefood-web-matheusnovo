import axios from 'axios'
//import React, { useState } from 'react'
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import InputMask from 'react-input-mask'
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react'
//import { Link } from "react-router-dom";
import MenuSistema from '../../MenuSistema'

export default function FormFornecedor() {
    const [nome, setNome] = useState()
    const [endereco, setEndereco] = useState()
    const [DataFundacao, setDataFundacao] = useState()
    const [ValorMercado, setValorMercado] = useState()
    const [PaginaWeb, setPaginaWeb] = useState()
    const [ContatoVendedor, setContatoVendedor] = useState()
    const { state } = useLocation();
    const [idFornecedor, setIdFornecedor] = useState();

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-')
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0]
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8081/api/fornecedor/" + state.id)
                .then((response) => {
                    setIdFornecedor(response.data.id)
                    setNome(response.data.nome)
                    setEndereco(response.data.endereco)
                    setDataFundacao(formatarData(response.data.DataFundacao))
                    setValorMercado(response.data.ValorMercado)
                    setPaginaWeb(response.data.PaginaWeb)
                    setContatoVendedor(response.data.ContatoVendedor)
                })
        }
    }, [state])


    function salvar() {
        let fornecedorRequest = {
            nome: nome,
            endereco: endereco,
            DataFundacao: DataFundacao,
            ValorMercado: ValorMercado,
            PaginaWeb: PaginaWeb,
            ContatoVendedor: ContatoVendedor
        }

        if (idFornecedor != null) { //Alteração:
            axios.put("http://localhost:8081/api/fornecedor/" + idFornecedor, fornecedorRequest)
                .then((response) => { console.log('Fornecedor alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um fornecedor.') })
        } else { //Cadastro:
            axios.post("http://localhost:8081/api/fornecedor", fornecedorRequest)
                .then((response) => { console.log('Fornecedor cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o fornecedor.') })
        }

    }

    return (
        <div>
            <MenuSistema />

            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    {idFornecedor === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Fornecedor &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idFornecedor != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Fornecedor &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength='100'
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Data Fundação'
                                    width={6}
                                >
                                    <InputMask
                                        mask='99/99/9999'
                                        maskChar={null}
                                        placeholder='Ex: 20/03/1985'
                                        value={DataFundacao}
                                        onChange={(e) => setDataFundacao(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Endereço'
                                    maxLength='100'
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Mercado'
                                    width={6}
                                    value={ValorMercado}
                                    onChange={e => setValorMercado(e.target.value)}
                                ></Form.Input>

                                <Form.Input
                                    fluid
                                    label='Contato do Vendedor'
                                    width={6}
                                >
                                    <InputMask
                                        mask='(99) 9999.9999'
                                        value={ContatoVendedor}
                                        onChange={(e) => setContatoVendedor(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    required
                                    fluid
                                    label='Página Web'
                                    maxLength='100'
                                    value={PaginaWeb}
                                    onChange={(e) => setNome(e.target.value)}
                                />



                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>

                            <Link to={'/list-fornecedor'}>

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
    )
}
