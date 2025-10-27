import { createContext, useState } from "react";

export const BuyContext = createContext();

export default function BuyProvider({children}) {
    const [compra, setCompra]= useState([]);
    const [qtdProdutosSelecionado, setQtdProdutosSelecionado] = useState(0);
    const [total, setTotal] = useState(0);

    function somaTotal(items) {
        let carrinho = items;
        let resuladoAcumulado = carrinho.reduce((p, obj) => { return p + obj.total }, 0);
        setTotal(resuladoAcumulado);
    }

    function addProduto(produto) {
        const indexCompra = compra.findIndex(p => p.id === produto.id);
        if (indexCompra !== -1) {
            let adicionandoItem = compra;
            adicionandoItem[indexCompra].qtd = adicionandoItem[indexCompra].qtd + 1;
            adicionandoItem[indexCompra].total = adicionandoItem[indexCompra].price * adicionandoItem[indexCompra].qtd;

            setCompra(adicionandoItem);
            somaTotal(adicionandoItem);
            return;
        }

        let item = {
            ...produto,
            qtd: 1,
            total: produto.price
        }
        setCompra(p => [ ...p, item ])
        somaTotal([...compra, item]);
    }

    function removeProduto(produto) {
        const indexCompra = compra.findIndex(p => p.id === produto.id);
        if (indexCompra !== -1) {
            let adicionandoItem = compra;
            adicionandoItem[indexCompra].qtd = adicionandoItem[indexCompra].qtd - 1;

            if (adicionandoItem[indexCompra].qtd === 0) {
                const listaFiltrada = compra.filter(item => item.id !== produto.id);

                setCompra(listaFiltrada);
                somaTotal(listaFiltrada);
                return;
            }
            
            adicionandoItem[indexCompra].total = adicionandoItem[indexCompra].price * adicionandoItem[indexCompra].qtd;
            setCompra(adicionandoItem);
            somaTotal(adicionandoItem);
            return;
        }
    }

    return (
        <BuyContext.Provider
            value={{ compra, total, addProduto, removeProduto }}
        >
            {children}
        </BuyContext.Provider>
    )
}