import { Product } from '@/types';

/**
 * Mock Products Database
 * 
 * Produtos organizados por categorias para facilitar testes completos do PDV.
 * Inclui produtos de diferentes faixas de preço e unidades de medida.
 */

export const mockProducts: Product[] = [
    // ========== MERCEARIA / ALIMENTOS ==========
    {
        id: '001',
        code: '7891000100103',
        name: 'Arroz Branco Tipo 1 - 5kg',
        price: 25.90,
        unit: 'un',
    },
    {
        id: '002',
        code: '7891000100110',
        name: 'Feijão Carioca - 1kg',
        price: 8.50,
        unit: 'un',
    },
    {
        id: '003',
        code: '7891000100127',
        name: 'Feijão Preto - 1kg',
        price: 9.20,
        unit: 'un',
    },
    {
        id: '004',
        code: '7891000100134',
        name: 'Açúcar Cristal - 1kg',
        price: 5.20,
        unit: 'un',
    },
    {
        id: '005',
        code: '7891000100141',
        name: 'Açúcar Refinado - 1kg',
        price: 6.50,
        unit: 'un',
    },
    {
        id: '006',
        code: '7891000100158',
        name: 'Sal Refinado - 1kg',
        price: 2.80,
        unit: 'un',
    },
    {
        id: '007',
        code: '7891000100165',
        name: 'Óleo de Soja - 900ml',
        price: 7.90,
        unit: 'un',
    },
    {
        id: '008',
        code: '7891000100172',
        name: 'Macarrão Espaguete - 500g',
        price: 4.50,
        unit: 'un',
    },
    {
        id: '009',
        code: '7891000100189',
        name: 'Macarrão Parafuso - 500g',
        price: 4.80,
        unit: 'un',
    },
    {
        id: '010',
        code: '7891000100196',
        name: 'Farinha de Trigo - 1kg',
        price: 5.90,
        unit: 'un',
    },
    {
        id: '011',
        code: '7891000100202',
        name: 'Molho de Tomate - 340g',
        price: 3.20,
        unit: 'un',
    },
    {
        id: '012',
        code: '7891000100219',
        name: 'Extrato de Tomate - 130g',
        price: 2.50,
        unit: 'un',
    },

    // ========== BEBIDAS ==========
    {
        id: '013',
        code: '7891000200104',
        name: 'Refrigerante Cola 2L',
        price: 8.90,
        unit: 'un',
    },
    {
        id: '014',
        code: '7891000200111',
        name: 'Refrigerante Guaraná 2L',
        price: 7.50,
        unit: 'un',
    },
    {
        id: '015',
        code: '7891000200128',
        name: 'Refrigerante Laranja 2L',
        price: 6.90,
        unit: 'un',
    },
    {
        id: '016',
        code: '7891000200135',
        name: 'Água Mineral 1.5L',
        price: 2.50,
        unit: 'un',
    },
    {
        id: '017',
        code: '7891000200142',
        name: 'Suco de Laranja 1L',
        price: 9.90,
        unit: 'un',
    },
    {
        id: '018',
        code: '7891000200159',
        name: 'Suco de Uva 1L',
        price: 12.50,
        unit: 'un',
    },
    {
        id: '019',
        code: '7891000200166',
        name: 'Cerveja Lata 350ml',
        price: 3.50,
        unit: 'un',
    },
    {
        id: '020',
        code: '7891000200173',
        name: 'Cerveja Long Neck 355ml',
        price: 4.20,
        unit: 'un',
    },

    // ========== LATICÍNIOS ==========
    {
        id: '021',
        code: '7891000300105',
        name: 'Leite Integral 1L',
        price: 5.50,
        unit: 'un',
    },
    {
        id: '022',
        code: '7891000300112',
        name: 'Leite Desnatado 1L',
        price: 5.80,
        unit: 'un',
    },
    {
        id: '023',
        code: '7891000300129',
        name: 'Iogurte Natural 170g',
        price: 3.90,
        unit: 'un',
    },
    {
        id: '024',
        code: '7891000300136',
        name: 'Manteiga 200g',
        price: 12.90,
        unit: 'un',
    },
    {
        id: '025',
        code: '7891000300143',
        name: 'Margarina 500g',
        price: 6.90,
        unit: 'un',
    },
    {
        id: '026',
        code: '7891000300150',
        name: 'Queijo Mussarela Fatiado 150g',
        price: 15.90,
        unit: 'un',
    },
    {
        id: '027',
        code: '7891000300167',
        name: 'Requeijão Cremoso 200g',
        price: 8.50,
        unit: 'un',
    },

    // ========== PADARIA ==========
    {
        id: '028',
        code: '7891000400106',
        name: 'Pão Francês',
        price: 0.80,
        unit: 'un',
    },
    {
        id: '029',
        code: '7891000400113',
        name: 'Pão de Forma Integral 500g',
        price: 8.90,
        unit: 'un',
    },
    {
        id: '030',
        code: '7891000400120',
        name: 'Pão de Forma Branco 500g',
        price: 7.50,
        unit: 'un',
    },
    {
        id: '031',
        code: '7891000400137',
        name: 'Bisnaguinha 300g',
        price: 6.90,
        unit: 'un',
    },
    {
        id: '032',
        code: '7891000400144',
        name: 'Bolo de Chocolate - Fatia',
        price: 5.50,
        unit: 'un',
    },

    // ========== CAFÉ & CHÁ ==========
    {
        id: '033',
        code: '7891000500107',
        name: 'Café Torrado e Moído 500g',
        price: 18.90,
        unit: 'un',
    },
    {
        id: '034',
        code: '7891000500114',
        name: 'Café Torrado e Moído 250g',
        price: 10.50,
        unit: 'un',
    },
    {
        id: '035',
        code: '7891000500121',
        name: 'Chá Preto - Caixa 25 saquinhos',
        price: 6.90,
        unit: 'un',
    },
    {
        id: '036',
        code: '7891000500138',
        name: 'Chá de Camomila - Caixa 15 saquinhos',
        price: 5.50,
        unit: 'un',
    },

    // ========== HIGIENE PESSOAL ==========
    {
        id: '037',
        code: '7891000600108',
        name: 'Sabonete em Barra 90g',
        price: 2.50,
        unit: 'un',
    },
    {
        id: '038',
        code: '7891000600115',
        name: 'Shampoo 400ml',
        price: 12.90,
        unit: 'un',
    },
    {
        id: '039',
        code: '7891000600122',
        name: 'Condicionador 400ml',
        price: 12.90,
        unit: 'un',
    },
    {
        id: '040',
        code: '7891000600139',
        name: 'Creme Dental 90g',
        price: 5.90,
        unit: 'un',
    },
    {
        id: '041',
        code: '7891000600146',
        name: 'Desodorante Aerosol 150ml',
        price: 11.90,
        unit: 'un',
    },
    {
        id: '042',
        code: '7891000600153',
        name: 'Papel Higiênico Folha Dupla - 4 rolos',
        price: 8.50,
        unit: 'un',
    },
    {
        id: '043',
        code: '7891000600160',
        name: 'Absorvente Feminino - 8 unidades',
        price: 6.90,
        unit: 'un',
    },

    // ========== LIMPEZA ==========
    {
        id: '044',
        code: '7891000700109',
        name: 'Detergente Líquido 500ml',
        price: 2.90,
        unit: 'un',
    },
    {
        id: '045',
        code: '7891000700116',
        name: 'Sabão em Pó 1kg',
        price: 12.50,
        unit: 'un',
    },
    {
        id: '046',
        code: '7891000700123',
        name: 'Amaciante de Roupas 2L',
        price: 9.90,
        unit: 'un',
    },
    {
        id: '047',
        code: '7891000700130',
        name: 'Água Sanitária 1L',
        price: 4.50,
        unit: 'un',
    },
    {
        id: '048',
        code: '7891000700147',
        name: 'Desinfetante 500ml',
        price: 5.90,
        unit: 'un',
    },
    {
        id: '049',
        code: '7891000700154',
        name: 'Esponja de Limpeza - Pacote 3 unidades',
        price: 4.20,
        unit: 'un',
    },
    {
        id: '050',
        code: '7891000700161',
        name: 'Saco de Lixo 100L - 5 unidades',
        price: 8.90,
        unit: 'un',
    },

    // ========== SNACKS & DOCES ==========
    {
        id: '051',
        code: '7891000800100',
        name: 'Chocolate ao Leite 90g',
        price: 6.50,
        unit: 'un',
    },
    {
        id: '052',
        code: '7891000800117',
        name: 'Biscoito Recheado 140g',
        price: 3.90,
        unit: 'un',
    },
    {
        id: '053',
        code: '7891000800124',
        name: 'Biscoito Cream Cracker 200g',
        price: 4.50,
        unit: 'un',
    },
    {
        id: '054',
        code: '7891000800131',
        name: 'Salgadinho 100g',
        price: 5.90,
        unit: 'un',
    },
    {
        id: '055',
        code: '7891000800148',
        name: 'Pipoca de Microondas 100g',
        price: 4.20,
        unit: 'un',
    },
    {
        id: '056',
        code: '7891000800155',
        name: 'Bala Sortida 600g',
        price: 8.90,
        unit: 'un',
    },
    {
        id: '057',
        code: '7891000800162',
        name: 'Chiclete 5 unidades',
        price: 2.50,
        unit: 'un',
    },

    // ========== CONGELADOS ==========
    {
        id: '058',
        code: '7891000900101',
        name: 'Hambúrguer Bovino 672g',
        price: 18.90,
        unit: 'un',
    },
    {
        id: '059',
        code: '7891000900118',
        name: 'Nuggets de Frango 300g',
        price: 12.50,
        unit: 'un',
    },
    {
        id: '060',
        code: '7891000900125',
        name: 'Pizza Congelada Mussarela 460g',
        price: 15.90,
        unit: 'un',
    },
    {
        id: '061',
        code: '7891000900132',
        name: 'Batata Pré-Frita 1.5kg',
        price: 16.90,
        unit: 'un',
    },
    {
        id: '062',
        code: '7891000900149',
        name: 'Sorvete 2L',
        price: 22.90,
        unit: 'un',
    },

    // ========== UTILIDADES ==========
    {
        id: '063',
        code: '7891001000102',
        name: 'Pilha AA - Cartela 4 unidades',
        price: 12.90,
        unit: 'un',
    },
    {
        id: '064',
        code: '7891001000119',
        name: 'Pilha AAA - Cartela 4 unidades',
        price: 11.90,
        unit: 'un',
    },
    {
        id: '065',
        code: '7891001000126',
        name: 'Fósforo - Caixa 10 unidades',
        price: 5.50,
        unit: 'un',
    },
    {
        id: '066',
        code: '7891001000133',
        name: 'Vela Branca - Pacote 8 unidades',
        price: 6.90,
        unit: 'un',
    },
    {
        id: '067',
        code: '7891001000140',
        name: 'Guardanapo de Papel - 50 unidades',
        price: 3.50,
        unit: 'un',
    },
    {
        id: '068',
        code: '7891001000157',
        name: 'Papel Alumínio 7.5m',
        price: 7.90,
        unit: 'un',
    },
    {
        id: '069',
        code: '7891001000164',
        name: 'Papel Filme 30m',
        price: 6.50,
        unit: 'un',
    },
    {
        id: '070',
        code: '7891001000171',
        name: 'Palito de Dente - Caixa 100 unidades',
        price: 2.90,
        unit: 'un',
    },
];

/**
 * Função auxiliar para buscar produto por código
 */
export const findProductByCode = (code: string): Product | undefined => {
    return mockProducts.find(p => p.code === code);
};

/**
 * Função auxiliar para buscar produto por ID
 */
export const findProductById = (id: string): Product | undefined => {
    return mockProducts.find(p => p.id === id);
};

/**
 * Função auxiliar para buscar produtos por nome (busca parcial)
 */
export const searchProductsByName = (searchTerm: string): Product[] => {
    const term = searchTerm.toLowerCase();
    return mockProducts.filter(p => p.name.toLowerCase().includes(term));
};
