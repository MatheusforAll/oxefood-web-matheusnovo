import axios from "axios"
import React, { useState } from 'react'
import MenuSistema from '../../MenuSistema'
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask'
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react'
import {
  FormGroup,
  FormField,
  Checkbox,
  Input,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react'

export default function FormProduto() {

   const [codigo, setCodigo] = useState();
   const [titulo, setTitulo] = useState();
   const [descricao, setDescricao] = useState();
   const [valorUnitario, setValorUnitario] = useState();
   const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
   const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();

   function salvar() {

		let produtoRequest = {
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo
		}
	
		axios.post("http://localhost:8081/api/produto", produtoRequest)
		.then((response) => {
		     console.log('Cliente cadastrado com sucesso.')
		})
		.catch((error) => {
		     console.log('Erro ao incluir o um cliente.')
		})
	}



  return (
    <div>
      <MenuSistema />
      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          <h2>
            {' '}
            <span style={{ color: 'darkgray' }}>
              {' '}
              Produto &nbsp;
              <Icon
                name='angle double right'
                size='small'
              />{' '}
            </span>{' '}
            Cadastro{' '}
          </h2>

          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Form>
              <Form.Group widths='equal'>
                <Form.Input
                  required
                  fluid
                  label='Título'
                  maxLength='100'
                  placeholder='Informe o título do produto'
                  value={titulo}
			onChange={e => setTitulo(e.target.value)}
                />

                <Form.Input
                  required
                  fluid
                  label='Código do Produto'
                  maxLength='100'
                  placeholder='Informe o código do produto'
                  value={codigo}
			onChange={e => setCodigo(e.target.value)}
                ></Form.Input>
              </Form.Group>

              <Form.Group>
                <FormField
                  control={TextArea}
                  label='Descrição'
                  placeholder='Informe a descrição do produto'
                  width={16}
                  value={descricao}
			onChange={e => setDescricao(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                required
                  fluid
                  label='Valor unitário'
                  width={6}
                  value={valorUnitario}
			onChange={e => setValorUnitario(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label='Tempo de entrega mínimo em minutos'
                  placeholder='30'
                  width={6}
                  value={tempoEntregaMinimo}
			onChange={e => setTempoEntregaMinimo(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label='Tempo de entrega máximo em minutos'
                  placeholder='40'
                  width={6}
                  value={tempoEntregaMaximo}
			onChange={e => setTempoEntregaMaximo(e.target.value)}
                ></Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: '4%' }}>
              <Button
                type='button'
                inverted
                circular
                icon
                labelPosition='left'
                color='orange'
              >
                <Icon name='reply' />
                <Link to={'/list-produto'}>Voltar</Link>

              </Button>

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
