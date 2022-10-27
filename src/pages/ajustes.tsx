import BotaoAlternarTema from '../components/template/BotaoAlternarTema'
import Layout from '../components/template/Layout'
import useAppData from '../data/hook/UseAppData'

export default function Ajustes() {
  const { tema, alternarTema } = useAppData()
  return (
    <Layout
      titulo="Ajustes e Configurações"
      subtitulo="Personalize o sistema por aqui"
    >
      <div className="flex justify-center">
        <h3>Conteúdo</h3>
        <span className='ml-5'>
          <BotaoAlternarTema tema={tema} alternaTema={alternarTema} />
        </span>
      </div>
    </Layout>
  )
}
