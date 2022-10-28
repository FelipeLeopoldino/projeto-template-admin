import { useState } from 'react'
import AuthInput from '../components/auth/Authinput'
import { IconeAtencao, IconeGoogle } from '../components/icons'
import useAuth from '../data/hook/UseAuth'

export default function Autenticacao() {
  const { cadastrar, login, loginGoogle } = useAuth()

  const [modo, setModo] = useState<'login' | 'cadastro'>('login')

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  function exibirErro(msg, tempoEmSegundos = 5) {
    setErro(msg)
    setTimeout(() => setErro(null), tempoEmSegundos * 1000)
  }

  async function submeter() {
    try {
      if (modo === 'login') {
        await login(email, senha)
      } else {
        await cadastrar(email, senha)
      }
    } catch (e) {
      exibirErro(e?.message ?? 'Erro desconhecido!')
    }
  }

  const urlImage = 'https://source.unsplash.com/random'

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <span>
          <img
            src={urlImage}
            alt="Imagem da Tela de Autenticação"
            className="h-screen w-full object-cover"
          />
        </span>
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3 text-black">
        <h1
          className={`
        text-2xl font-bold mb-5
      `}
        >
          {modo === 'login'
            ? 'Entre com a sua conta'
            : 'Cadastre-se na Plataforma'}
        </h1>

        {erro ? (
          <div
            className={`
            flex items-center
           bg-red-400 text-white py-3 px-5 my-2
            border border-red-700 rounded-lg
        `}
          >
            {IconeAtencao()}
            <span className="ml-3 ">{erro}</span>
          </div>
        ) : (
          false
        )}

        <span className="text-black">
          <AuthInput
            label="Email"
            tipo="email"
            valor={email}
            valorMudou={setEmail}
            obrigatorio
          />
        </span>

        <span className='text-black'>
          <AuthInput
            label="Senha"
            tipo="password"
            valor={senha}
            valorMudou={setSenha}
            obrigatorio
          />
        </span>

        <button
          onClick={submeter}
          className={`
      w-full bg-indigo-500 hover:bg-indigo-400 
      text-white rounded-lg px-4 py-3 mt-6
      `}
        >
          {modo === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>

        <hr className="my-6 border-gray-300 w-full" />

        <button
          onClick={loginGoogle}
          className={`
          flex items-center justify-center
          w-full bg-red-500 hover:bg-red-400 
         text-white rounded-lg px-4 py-3 
      
      `}
        >
          {IconeGoogle(6)}
          <span className="ml-3">Entrar com Google</span>
        </button>

        {modo === 'login' ? (
          <p className="mt-8 text-black">
            Novo por aqui?
            <a
              onClick={() => setModo('cadastro')}
              className={`
            text-blue-500 hover:text-blue-700 font-semibold
            cursor-pointer
            `}
            >
              {' '}
              Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo('login')}
              className={`
          text-blue-500 hover:text-blue-700 font-semibold
          cursor-pointer
          `}
            >
              {' '}
              Entre com a suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
