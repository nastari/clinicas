import Head from 'next/head'
import { useState, useEffect , useRef } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ opcao , setOpcao ] = useState(0)

  useEffect(() => {

  },[opcao])

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
                <div className={styles.option}>
                <img className={styles.icon} style={{ height: 13}} src="/housee.svg" alt=""/>
                </div>
                <div className={styles.option}>
               <p>ABC</p>
                </div>
                <div className={styles.option}>
                  <p>PPRA</p>
                </div>
                <div className={styles.option}>
                  <p>PCMSO</p>
                </div>
                <div className={styles.option}>
                  <p>E.C</p>
                </div>
                <div className={styles.option}>
                  <p>E.COM</p>
                </div>
              </div>
      
              <div className={styles.body}>
                        <div className={styles.unit}>
                        <div className={styles.fita}></div>
                        <div className={styles.unitcontent}>
                          <div className={styles.infos}>
                          <div className={styles.principalinfo}>
                              <h2 className={styles.unittitle}> { truncate('EHS SOLUÇÕES INTELIGENTES')}</h2>
                              <p className={styles.unitp}>ehssolucoes@gmail.com</p>
                            </div>
                            <p className={styles.cep}>29550-343</p>
                            <div className={styles.whats}>
                              <img src="/WhatsApp.svg" style={{ height: 35 }} alt=""/>
                            </div>
                          </div>
                          <div className={styles.abas}>
                              <div className={styles.aba}>
                                PPRA
                              </div>
                              <div className={styles.aba}>
                                PCMSO
                              </div>
                              <div className={styles.aba}>
                                E.C
                              </div>
                              <div className={styles.aba}>
                                E.COM
                              </div>
                          </div>
                        </div>
                        </div>

                        <div className={styles.unit}>
                        <div className={styles.fita}></div>
                        <div className={styles.unitcontent}>
                          <div className={styles.infos}>
                          <div className={styles.principalinfo}>
                              <h2 className={styles.unittitle}> { truncate('SAPEC SAUDE')}</h2>
                              <p className={styles.unitp}>ehssolucoes@gmail.com</p>
                            </div>
                            <p className={styles.cep}>29550-343</p>
                            <div className={styles.whats}>
                              <img src="/WhatsApp.svg" style={{ height: 35 }} alt=""/>
                            </div>
                          </div>
                          <div className={styles.abas}>
                        
                              <div className={styles.aba}>
                                PCMSO
                              </div>
                              <div className={styles.aba}>
                                E.C
                              </div>
                              <div className={styles.aba}>
                                E.COM
                              </div>
                          </div>
                        </div>
                        </div>


                        <div className={styles.unit}>
                        <div className={styles.fita}></div>
                        <div className={styles.unitcontent}>
                          <div className={styles.infos}>
                            <div className={styles.principalinfo}>
                              <h2 className={styles.unittitle}> { truncate('GEREMED SAUDE E SEGURANCA OCUPACIONAL')}</h2>
                              <p className={styles.unitp}>ehssolucoes@gmail.com</p>
                            </div>
                            <p className={styles.cep}>29550-343</p>
                            <div className={styles.whats}>
                              <img src="/WhatsApp.svg" style={{ height: 35 }} alt=""/>
                            </div>
                          </div>
                          <div className={styles.abas}>
                              <div className={styles.aba}>
                                PPRA
                              </div>
                              <div className={styles.aba}>
                                PCMSO
                              </div>
                             
                          </div>
                        </div>
                        </div>

                        <div className={styles.unit}>
                        <div className={styles.fita}></div>
                        <div className={styles.unitcontent}>
                          <div className={styles.infos}>
                          <div className={styles.principalinfo}>
                              <h2 className={styles.unittitle}>{ truncate('EHS SOLUÇÕES INTELIGENTES')}</h2>
                              <p className={styles.unitp}>ehssolucoes@gmail.com</p>
                            </div>
                            <p className={styles.cep}>29550-343</p>
                            <div className={styles.whats}>
                              <img src="/WhatsApp.svg" style={{ height: 35 }} alt=""/>
                            </div>
                          </div>
                          <div className={styles.abas}>
                              <div className={styles.aba}>
                                PPRA
                              </div>
                              <div className={styles.aba}>
                                PCMSO
                              </div>
                              <div className={styles.aba}>
                                E.C
                              </div>
 
                          </div>
                        </div>
                        </div>
             
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