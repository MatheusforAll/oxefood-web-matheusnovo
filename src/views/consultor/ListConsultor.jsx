import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Divider, Icon, Table , Modal, Header} from 'semantic-ui-react'
import MenuSistema from '../../MenuSistema'

export default function ListConsultor() {
  const [lista, setLista] = useState([])
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();


  useEffect(() => {
    carregarLista()
  }, [])

  function carregarLista() {
    axios.get('http://localhost:8081/api/consultor').then((response) => {
      setLista(response.data)
    })
  }
  function formatarData(dataParam) {
    if (dataParam === null || dataParam === '' || dataParam === undefined) {
      return ''
    }
    let arrayData = dataParam.split('-')
    return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0]
  
  }
  function confirmaRemover(id) {
    setOpenModal(true)
    setIdRemover(id)
}
  async function remover() {

    await axios.delete('http://localhost:8081/api/consultor/' + idRemover)
    .then((response) => {

        console.log('Consultor removido com sucesso.')

        axios.get("http://localhost:8081/api/consultor")
        .then((response) => {
            setLista(response.data)
        })
    })
    .catch((error) => {
        console.log('Erro ao remover um consultor.')
    })
    setOpenModal(false)
}



   
  return (
    <div>
      <MenuSistema tela={'consultor'} />
      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          
          <h2> Consultor </h2>
          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Button
              label='Novo'
              circular
              color='orange'
              icon='clipboard outline'
              floated='right'
              as={Link}
              to='/form-consultor'
            />
            <br />
            <br />
            <br />

            <Table
              color='orange'
              sortable
              celled
            >
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((consultor) => (
                  <Table.Row key={consultor.id}>
                    <Table.Cell>{consultor.nome}</Table.Cell>
                    <Table.Cell>{consultor.cpf}</Table.Cell>
                    <Table.Cell>
                      {formatarData(consultor.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{consultor.foneCelular}</Table.Cell>
                    <Table.Cell>{consultor.foneFixo}</Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Button
                        inverted
                        circular
                        color='green'
                        title='Clique aqui para editar os dados deste consultor'
                        icon
                      >
                        <Link to="/form-consultor" state={{id: consultor.id}} style={{color: 'green'}}> <Icon name='edit' /> </Link>
                      </Button>{' '}
                      &nbsp;
                      
                      <Button
                      inverted
                      circular
                      color='red'
                      title='Clique aqui para remover este consultor'
                      icon
                      onClick={e => confirmaRemover(consultor.id)}>
                      <Icon name='trash' />
                      </Button>

                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
      <Modal
               basic
               onClose={() => setOpenModal(false)}
               onOpen={() => setOpenModal(true)}
               open={openModal}
         >
               <Header icon>
                   <Icon name='trash' />
                   <div style={{marginTop: '5%'}}> Tem certeza que deseja remover esse registro? </div>
               </Header>
               <Modal.Actions>
                   <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                       <Icon name='remove' /> Não
                   </Button>
                   <Button color='green' inverted onClick={() => remover()}>
                       <Icon name='checkmark' /> Sim
                   </Button>
               </Modal.Actions>
         </Modal>

    </div>
  )
}
