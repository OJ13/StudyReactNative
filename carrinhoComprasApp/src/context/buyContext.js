import { createContext, useState } from "react";

export const BuyContext = createContext();

export default function BuyProvider({children}) {
    const [compra, setCompra]= useState([]);
    const [qtdProdutosSelecionado, setQtdProdutosSelecionado] = useState(0);

    function addProduto(produto) {
        const indexCompra = compra.findIndex(p => p.id === produto.id);
        if (indexCompra !== -1) {
            let adicionandoItem = compra;
            adicionandoItem[indexCompra].qtd = adicionandoItem[indexCompra].qtd + 1;
            adicionandoItem[indexCompra].total = adicionandoItem[indexCompra].price * adicionandoItem[indexCompra].qtd;

            setCompra(adicionandoItem);
            return;
        }

        let item = {
            ...produto,
            qtd: 1,
            total: produto.price
        }
        setCompra(p => [ ...p, item ])
    }

    function removeProduto(produto) {
        const indexCompra = compra.findIndex(p => p.id === produto.id);
        if (indexCompra !== -1) {
            let adicionandoItem = compra;
            adicionandoItem[indexCompra].qtd = adicionandoItem[indexCompra].qtd - 1;

            if (adicionandoItem[indexCompra].qtd === 0) {
                adicionandoItem.pop(adicionandoItem[indexCompra])

                setCompra(adicionandoItem);
                return;
            }
            
            adicionandoItem[indexCompra].total = adicionandoItem[indexCompra].price * adicionandoItem[indexCompra].qtd;
            setCompra(adicionandoItem);
            return;
        }
    }

    return (
        <BuyContext.Provider
            value={{ compra, addProduto, removeProduto }}
        >
            {children}
        </BuyContext.Provider>
    )
}