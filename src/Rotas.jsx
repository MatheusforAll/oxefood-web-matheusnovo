import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import ListEntregador from './views/entregador/ListEntregador';
import FormEntregador from './views/entregador/FormEntregador';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import Home from './views/home/Home';
import FormFornecedor from './views/fornecedor/FormFornecedor';
import ListFornecedor from './views/fornecedor/ListFornecedor';
import FormConsultor from './views/consultor/FormConsultor';
import ListConsultor from './views/consultor/ListConsultor';

import FormFabricante from './views/fabricante/FormFabricante';
import ListFabricante from './views/fabricante/ListFabricante';


import FormChefe from './views/chefe/FormChefe';
import ListChefe from './views/chefe/ListChefe';



function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-produto" element={ <ListProduto/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> }/>
                <Route path="form-fornecedor" element={ <FormFornecedor/> }/>
                <Route path="list-fornecedor" element={ <ListFornecedor/> }/>
                <Route path="form-consultor" element={ <FormConsultor/> }/>
                <Route path="list-consultor" element={ <ListConsultor/> }/>
                
                <Route path="form-fabricante" element={ <FormFabricante/> }/>
                <Route path="list-fabricante" element={ <ListFabricante/> }/>

                <Route path="form-chefe" element={ <FormChefe/> }/>
                <Route path="list-chefe" element={ <ListChefe/> }
                
                 />
            </Routes>
        </>
    )
}

export default Rotas
