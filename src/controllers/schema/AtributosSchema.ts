import { string, object, array, InferType } from "yup";

export const Adicionar = object().shape({
    nome: string().required("o nome é obrigatório."),
    valores: array(
        object().shape({
            valor: string().required("Defina um valor para o atributo.")
        })
    ).nullable()
});

export const AdicionarValor = object().shape({
    valor: string().required("O nome do valor do atributo é obrigatório.")
});

export const EditarAtributo = object().shape({
    nome: string().required("o nome é obrigatório.")
});



export type IAdicionarAtributo = InferType<typeof Adicionar>; 
export type IAdicionarValor = InferType<typeof AdicionarValor>; 
export type IEditarAtributo = InferType<typeof EditarAtributo>;