# Five PDV

Um sistema de PDV (Ponto de Venda) moderno e minimalista para mercados e lojas, desenvolvido com Next.js, TypeScript, Material UI e Supabase.

## Características

- 📊 **Display de Total Grande** - Visualização clara e destacada do valor total da compra
- 📦 **Lista de Produtos** - Visualização de todos os itens adicionados ao carrinho
- 💳 **Múltiplas Formas de Pagamento**:
  - PIX
  - Cartão de Crédito
  - Cartão de Débito
  - Dinheiro (com cálculo automático de troco)
- 🎨 **Design Minimalista** - Interface preto e branco, limpa e profissional
- 🔤 **Material Icons** - Ícones consistentes e modernos

## Tecnologias

- [Next.js 14](https://nextjs.org/) - Framework React com App Router
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- [Material UI](https://mui.com/) - Componentes de UI
- [Tailwind CSS](https://tailwindcss.com/) - Estilização utilitária
- [Supabase](https://supabase.com/) - Banco de dados e autenticação

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/FiveTech-Solutions/five-pdv.git
cd five-pdv
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas credenciais do Supabase:
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## Configuração do Supabase

### Tabela de Produtos
```sql
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit VARCHAR(20) DEFAULT 'un',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabela de Vendas
```sql
CREATE TABLE sales (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  payments JSONB NOT NULL,
  change DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## Uso

1. **Adicionar Produtos**: Digite o código do produto e pressione Enter ou clique no botão de adicionar
2. **Ajustar Quantidade**: Use os botões + e - na lista de produtos
3. **Remover Produto**: Clique no ícone de lixeira ao lado do produto
4. **Finalizar Compra**: Clique em "Finalizar Compra" e selecione a forma de pagamento
5. **Pagamento em Dinheiro**: Informe o valor recebido para calcular automaticamente o troco

## Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
