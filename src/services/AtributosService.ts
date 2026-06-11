import { IAdicionarAtributo, IAdicionarValor, IEditarAtributo, IEditarValor } from "../controllers/schema/AtributosSchema";
import AtributosRepository from "../repositories/AtributosRepository";
import ValoresAtributosRepository from "../repositories/ValoresAtributosRepository";

class AtributosService {

    constructor(
        private readonly _atributosRepository: AtributosRepository,
        private readonly _valoresAtributosRepository: ValoresAtributosRepository
    ) {}

    async adicionar(dados: IAdicionarAtributo) {
        const atributoAdicionado = await this._atributosRepository.adicionar(dados.nome);

        const retorno = {
            atributo: atributoAdicionado,
            valores: dados.valores
        }

        if (dados.valores) {
            const updateValoresAtributos = dados.valores.map( valor => ({
                ...valor,
                id_atributo: atributoAdicionado.id
            }))
            const contagemValoresAdicionados = await this._valoresAtributosRepository.adicionar(updateValoresAtributos);
            const valoresAtributosAdicionados = await this._valoresAtributosRepository.buscarValoresPorIdAtributo(atributoAdicionado.id)

            retorno.valores = valoresAtributosAdicionados;
        }
        console.log(retorno);
        return retorno;
    }

    async adicionarValorAtributo(dados: IAdicionarValor, id_atributo: string) {
        await this._valoresAtributosRepository.adicionar([{...dados, id_atributo}]);
        return await this._valoresAtributosRepository.buscarValoresPorIdAtributo(id_atributo);
    }

    async editarAtributo(dados: IEditarAtributo, id_atributo: string) {
        return await this._atributosRepository.editar(dados, id_atributo);
    }

    async editarValorAtributo(dados: IEditarValor, id_valor_atributo: string) {
        return await this._valoresAtributosRepository.editar(dados, id_valor_atributo);
    }

    async buscarTodos() {
        return await this._atributosRepository.buscarTodos();
    }

    async excluir(id: string) {
        return await this._atributosRepository.excluir(id);
    }

    async excluirValor(id: string) {
        return await this._valoresAtributosRepository.excluir(id);
    }

}

export default AtributosService;
