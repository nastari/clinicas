import Head from 'next/head'
import { useState, useEffect , useRef } from 'react'
import styles from '../styles/Home.module.css'
import data_ from '../data'
import { Popover,  Empty } from 'antd';

export default function Home() {
  const [ opcao , setOpcao ] = useState(0)
  const [ clinics, setClinics ] = useState([])

  const data = data_.filter( unit => { 
    unit['SERVIÇOS DISPONÍVEIS'] = unit['SERVIÇOS DISPONÍVEIS'].toLowerCase()
    if(unit["SERVIÇOS DISPONÍVEIS"].includes('pcmso')){
      unit.PCMSO = true
    } else {
      unit.PCMSO = false
    }

    if(unit["SERVIÇOS DISPONÍVEIS"].includes('ppra')){
      unit.PPRA = true
    } else {
      unit.PPRA = false
    }

    if(unit["SERVIÇOS DISPONÍVEIS"].includes('exames clínicos')){
      unit.EXCLI = true
    } else {
      unit.EXCLI = false
    }

    if(unit["SERVIÇOS DISPONÍVEIS"].includes('exames complementares')){
      unit.EXCOM = true
    } else {
      unit.EXCOM = false
    }

    unit.WHATSAPPFORMATTED = unit.WHATSAPP.replace(/[^0-9]/g, '');
    return unit
  })

  useEffect(() => {
    a()
  },[opcao]);

  function a(){
    setClinics(data)
  }

  const truncate = (input) => input.length > 25 ? `${input.substring(0, 25)}...` : input;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.content}>
        <section className={styles.left}>
              <div className={styles.header}>
                <div className={styles.fita}></div>
                <h1 className={styles.title}>VISUALIZADOR DE CLÍNICAS</h1>
              </div>
              <div className={styles.options}>
              <Popover placement="bottom" content={"Lista de Clínicas"}>
                <div onClick={() => setOpcao(0)} className={styles.option}>
                <img className={styles.icon} style={{ height: 13}} src="/housee.svg" alt=""/>
                </div>
                </Popover>
                <Popover placement="bottom" content={"Colocar Ordem Alfabética"}>
                <div onClick={() => setOpcao(1)} className={styles.option}>
               <p>ABC</p>
                </div>
                </Popover>
                <Popover placement="bottom" content={"Filtrar por PPRA"}>
                <div onClick={() => setOpcao(2)} className={styles.option}>
                  <p>PPRA</p>
                </div>
                </Popover>
                <Popover placement="bottom"  content={"Filtrar por PCMSO"}>
                <div onClick={() => setOpcao(3)} className={styles.option}>
                  <p>PCMSO</p>
                </div>
                </Popover>
                <Popover placement="bottom" content={"Filtrar por Exame Clínico"}>
                <div onClick={() => setOpcao(4)} className={styles.option}>
                  <p>EX. CLI</p>
                </div>
                </Popover>
                <Popover placement="bottom" content={"Filtrar por Exame Complementares"}>
                <div onClick={() => setOpcao(5)} className={styles.option}>
                  <p>EX. COM</p>
                </div>
                </Popover>
              </div>
      
              <div className={styles.body}>

                { clinics.length > 0 ? data.map( unit => (
                     <div className={styles.unit}>
                     <div className={styles.fita}></div>
                     <div className={styles.unitcontent}>
                       <div className={styles.infos}>
                       <div className={styles.principalinfo}>
                           <h2 className={styles.unittitle}> { truncate(unit.NOME)}</h2>
                           <p className={styles.unitp}>{ unit.EMAIL  === "" ? "Email não fornecido" : unit.EMAIL.toLowerCase()}</p>
                         </div>
                         <p className={styles.cep}>{unit.CEP}</p>
                         <Popover placement="left" content={unit.WHATSAPP}>
                         <a  target="_blank" href={`https://wa.me/+55${unit.WHATSAPPFORMATTED}?text=Olá%20${unit.NOME}.%20Estamos%20entrando%20contigo.`} >
                            <div className={styles.whats}>
                              <img src="/WhatsApp.svg" style={{ height: 35 }} alt=""/>
                            </div>
                            </a>
                            </Popover>
                       </div>
    
                       <div className={styles.abas}>
                          { unit.PCMSO && 
                           <div className={styles.aba}>
                           PCMSO
                         </div> }
                         { unit.PPRA && 
                           <div className={styles.aba}>
                           PPRA
                         </div> }
                         { unit.EXCLI && 
                           <div className={styles.aba}>
                           EX.CLI.
                         </div> }
                         { unit.EXCOM && 
                           <div className={styles.aba}>
                           EX.COM.
                         </div> }
                        
                       </div>
                     </div>
                     </div>

                )) : <Empty description="Não há clínicas nesta consulta"/> }
             
              </div>
        </section>
        <section className={styles.right}>
              {/* <div className={styles.block}>
                dddd
              </div> */}
        </section>
      </main>
    </div>
  )
}


// export async function getServerSideProps(ctx){


// const a = await fetch('https://sheetdb.io/api/v1/7jdv68gxrg0ik')


// return {
//   }
// }