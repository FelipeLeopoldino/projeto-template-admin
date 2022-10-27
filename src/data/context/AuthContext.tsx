import route from 'next/router'
import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config'
import Usuario from '../../model/Usuario'
import Cookies from 'js-cookie'

interface AuthContextProps {
  usuario?: Usuario
  carregando?: boolean
  login?: (email: string, senha: string) => Promise<void>
  cadastrar?: (email: string, senha: string) => Promise<void>
  loginGoogle?: () => Promise<void>
  logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(
  usuarioFirebase: firebase.User
): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken()
  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName,
    email: usuarioFirebase.email,
    token,
    provedor: usuarioFirebase.providerData[0].providerId,
    imagemUrl: usuarioFirebase.photoURL
  }
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set('admin-template-cod3er-auth', logado, {
      expires: 7
    })
  } else {
    Cookies.remove('admin-template-cod3er-auth')
  }
}

export function AuthProvider(props) {
  const [usuario, setUsuario] = useState<Usuario>(null)
  const [carregando, setCarregando] = useState(true)

  async function configuraSessao(usuarioFirebase) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase)
      setUsuario(usuario)
      gerenciarCookie(true)
      setCarregando(false)
      return usuario.email
    } else {
      setUsuario(null)
      gerenciarCookie(false)
      setCarregando(false)
      return false
    }
  }

  async function login(email, senha) {
    try {
      setCarregando(true)
      const resp = await firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)

      await configuraSessao(resp.user)
      route.push('/')
    } finally {
      setCarregando(false)
    }
  }

  async function cadastrar(email, senha) {
    try {
      setCarregando(true)
      const resp = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)

      await configuraSessao(resp.user)
      route.push('/')
    } finally {
      setCarregando(false)
    }
  }

  async function loginGoogle() {
    const resp = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())

    await configuraSessao(resp.user)
    route.push('/')
  }

  async function logout() {
    try {
      setCarregando(true)
      await firebase.auth().signOut()
      await configuraSessao(null)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    const cancelar = firebase.auth().onIdTokenChanged(configuraSessao)
    return () => cancelar()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        cadastrar,
        login,
        loginGoogle,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
