import Head from 'next/head'
import { useState, useEffect , useRef } from 'react'
import styles from '../styles/Home.module.css'
import data_ from '../data'
import { Popover,  Empty , Menu, Drawer , Divider , Col, Row } from 'antd';
import { UnorderedListOutlined, TagOutlined,  SearchOutlined ,  PlusOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
import GoogleMapReact from 'google-map-react';

export default function Home() {

  const [ opcao , setOpcao ] = useState(0)
  const [ clinics, setClinics ] = useState([])
  const [ ator, setActor ] = useState(null);
  const [ width, setWidth ] = useState(1024);

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

  useEffect(() => {
    setWidth(window.screen.width)
  },[width])

  const [visible, setVisible] = useState(false);

  const showDrawer = async (unit) => {
    const replaced = unit.ENDEREÇO.replace(/ /g, '+')
   
     const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${replaced}&key=AIzaSyBXM7zi8hwm1DX6d9jVA5PGc5h02TC3_7o`)
    
     const r = await response.json();
    //  console.log(r);
    console.log('aksdo');
    console.log(r.results[0]);
    console.log('----');
     if(r.results[0].geometry !== undefined ){
        unit.LOCATION = r.results[0].geometry.location
     } else {
      unit.LOCATION = {
        lat: 59.95,
        lng: 30.33
      }
     }
     console.log(unit);
     setActor(unit)
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
    setActor(null);
  };

  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );


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
              <Menu selectedKeys={["mail"]} mode="horizontal">
        <Menu.Item key="mail" icon={<UnorderedListOutlined />}>
        <Popover placement="top" content={"Lista de Clínicas"}>
         Listagem
         </Popover>
        </Menu.Item>
        <Menu.Item key="app" icon={<PlusOutlined />}>
        <Popover placement="top" content={"Adicionar Clínica"}>
          Clínica
          </Popover>
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SearchOutlined />} title="Filtrar por">
          
            <Menu.Item key="setting:1">PCMSO</Menu.Item>
            <Menu.Item key="setting:2">PPRA</Menu.Item>
        
            <Menu.Item key="setting:3">Exames Clínicos</Menu.Item>
            <Menu.Item key="setting:4">Exames Complementares</Menu.Item>
  
        </SubMenu>
        <SubMenu key="organize" icon={<TagOutlined />} title="Organizar por">
          
          <Menu.Item key="setting:1">Ordem Alfabética</Menu.Item>


      </SubMenu>
      </Menu>
      <Divider/>
              <div className={styles.body}>

                { clinics.length > 0 ? data.map( unit => (
                     <div className={styles.unit}>
                     <div className={styles.fita}></div>
                     <div className={styles.unitcontent}>
                       <div className={styles.infos}>
                       <div className={styles.principalinfo}>
                           <h2 onClick={() => showDrawer(unit)} className={styles.unittitle}> { truncate(unit.NOME)}</h2>
                           <p onClick={() => showDrawer(unit)} className={styles.unitp}>{ unit.EMAIL  === "" ? "Email não fornecido" : unit.EMAIL.toLowerCase()}</p>
                         </div>
                         
                         <p onClick={() => showDrawer(unit)} className={styles.cep}>{unit.CEP}</p>
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
        <Drawer
          width={width < 421 ? 300 : 620 }
          placement="right"
          closable={false}
          onClose={() => onClose()}
          visible={visible}
        >
          { ator ? 
          <>
          <h3 className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
          {ator.NOME}
        </h3>
        <h5 className="site-description-item-profile-p">Dados da Clínica</h5>
        <Row>
          <Col style={{ marginBottom: 5 }} span={12}>
            <DescriptionItem title="Nome Completo" content={ator.NOME} />
          </Col>
          <Col style={{ marginBottom: 5 }}  span={12}>
            <DescriptionItem title="Email" content={ ator.EMAIL ? ator.EMAIL : 'Não fornecido'} />
          </Col>
        </Row>
        <Row>
          <Col style={{ marginBottom: 5 }}  span={12}>
            <DescriptionItem title="Cidade" content="São Paulo" />
          </Col>
          <Col style={{ marginBottom: 5 }}  span={12}>
            <DescriptionItem title="País" content="Brasil 🇧🇷" />
          </Col>
        </Row>
        <Row>
          <Col style={{ marginBottom: 5 }}  span={12}>
            <DescriptionItem title="Registrado" content={`${ (Math.floor(Math.random()*28))} de Setembro`} />
          </Col>
          <Col style={{ marginBottom: 5 }}  span={12}>
            <DescriptionItem title="Endereço" content={ator.ENDEREÇO} />
          </Col>
        </Row>
        {/* <Row>
          <Col span={24}>
            <DescriptionItem
              title="Message"
              content="Make things as simple as possible but no simpler."
            />
          </Col>
        </Row> */}
        <Divider />
        {/* <p className="site-description-item-profile-p">Company</p>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Position" content="Programmer" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Responsibilities" content="Coding" />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Department" content="XTech" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Skills"
              content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
            />
          </Col>
        </Row> */}

    <h3>My Google Maps Demo</h3>
    <div className={styles.map}>
    <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBXM7zi8hwm1DX6d9jVA5PGc5h02TC3_7o' }}
          defaultCenter={ator.LOCATION}
          defaultZoom={ width < 421 ? 11 : 11}
        >
          <AnyReactComponent
            lat={ator.LOCATION.lat}
            lng={ator.LOCATION.lng}
            text="My Marker"
          />
        </GoogleMapReact>
          </div>
        <Divider />
        <h5 className="site-description-item-profile-p">Contato</h5>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Email" content={ator.EMAIL} />
          </Col>
          <Col span={12}>
         
            <DescriptionItem title="Telefone/WhatsApp" content={ator.WHATSAPP} />
   
          </Col>
        </Row>
         </> : null }
        </Drawer>
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

const AnyReactComponent = ({ text }) => <div>{text}</div>