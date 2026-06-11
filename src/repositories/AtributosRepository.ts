import { IEditarAtributo } from "../controllers/schema/AtributosSchema";
import { PrismaFactory } from "../factories/PrismaFactory";
import { Atributos } from "../models/Atributos";

class AtributosRepository {
    async adicionar(nome: string) {
        return await PrismaFactory.atributos.create({data: {nome}});
    }

    async editar(dados: Atributos, id_atributo: string) {
        return await PrismaFactory.atributos.update({
            where: {
                id: id_atributo
            },
            data: dados
        });
    }

    async buscarTodos() {
        return await PrismaFactory.atributos.findMany({
            where: {
                ativo: true // erro pois n rodei o migrate dev ainda, logo prisma client não identifica
            },
            include: {
                valores_atributos: {
                    where: {
                        ativo: true // erro pois n rodei o migrate dev ainda, logo prisma client não identifica
                    },
                }
            }
        })
    }

    async excluir(id: string) {
        return await PrismaFactory.atributos.update({
            where: {
                id
            },
            data: {
                ativo: false // erro pois n rodei o migrate dev ainda, logo prisma client não identifica
            }
        })
    }
}

export default AtributosRepository;