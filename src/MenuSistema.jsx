import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuSistema() {

    const [activeItem, setActiveItem] = useState();

    return (
        <>
            <Menu inverted>

                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={() => setActiveItem('home')}
                    as={Link}
                    to='/'
                />

                <Menu.Item
                    name='cliente'
                    active={activeItem === 'cliente'}
                    onClick={() => setActiveItem('cliente')}
                    as={Link}
                    to='/list-cliente'
                />

                <Menu.Item
                    name='produto'
                    active={activeItem === 'produto'}
                    onClick={() => setActiveItem('produto')}
                    as={Link}
                    to='/list-produto'
                />

                <Menu.Item
                    name='entregador'
                    active={activeItem === 'entregador'}
                    onClick={() => setActiveItem('entregador')}
                    as={Link}
                    to='/list-entregador'
                />

                <Menu.Item
                    name='fornecedor'
                    active={activeItem === 'fornecedor'}
                    onClick={() => setActiveItem('fornecedor')}
                    as={Link}
                    to='/list-fornecedor'
                />

                <Menu.Item
                    name='consultor'
                    active={activeItem === 'consultor'}
                    onClick={() => setActiveItem('consultor')}
                    as={Link}
                    to='/list-consultor'
                />

                <Menu.Item
                    name='fabricante'
                    active={activeItem === 'fabricante'}
                    onClick={() => setActiveItem('fabricante')}
                    as={Link}
                    to='/list-fabricante'

                />

                
                <Menu.Item
                    name='chefe'
                    active={activeItem === 'chefe'}
                    onClick={() => setActiveItem('chefe')}
                    as={Link}
                    to='/list-chefe'
                />

            </Menu>
        </>
    )
}
