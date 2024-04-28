export default interface Usuario {
    uid: string | null
    email: string | null
    nome: string | null
    token: string | null
    provedor: string | undefined
    imagemUrl: string | null
}