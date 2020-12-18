import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import {
  Popover,
  Menu,
  Drawer,
  Divider,
  message,
  Col,
  Row,
  Spin,
  Modal,
  Form,
  Button,
  Input,
  Checkbox,
} from 'antd';
import {
  UnorderedListOutlined,
  TagOutlined,
  SearchOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import GoogleMapReact from 'google-map-react';
import styles from '../styles/Home.module.css';
import * as fetcher from '../support/fetch';

const { SubMenu } = Menu;
const { Item } = Form;

export default function Home() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [opcao, setOpcao] = useState('lista');
  const [clinics, setClinics] = useState([]);
  const [ator, setActor] = useState(null);
  const [width, setWidth] = useState(1024);
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const fadeInRef = useRef();

  async function fetchData() {
    fadeInRef.current.style.opacity = 0.4;
    if (opcao === 'lista') {
      const clinicas__ = await fetcher.list();
      setClinics(clinicas__);
    } else if (opcao === 'plus') {
      setVisibleModal(true);
    } else if (opcao.includes('buscar')) {
      const clinics__ = await fetcher.query(opcao);
      setClinics(clinics__);
    } else if (opcao.includes('ordenar')) {
      const clinics__ = await fetcher.sort();
      setClinics(clinics__);
    }
  }

  const handleChangeOption = (e) => setOpcao(e.key);

  useEffect(() => {
    setWidth(window.screen.width);
  }, [width]);

  const showDrawer = async (unit) => {
    const replaced = unit.ENDEREÇO.replace(/ /g, '+');
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${replaced}&key=AIzaSyBXM7zi8hwm1DX6d9jVA5PGc5h02TC3_7o`
    );
    const r = await response.json();
    if (r.results[0].geometry !== undefined) {
      unit.LOCATION = r.results[0].geometry.location;
    } else {
      unit.LOCATION = {
        lat: 59.95,
        lng: 30.33,
      };
    }
    setActor(unit);
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

  const truncate = (input) =>
    input.length > 20 ? `${input.substring(0, 20)}...` : input;

  // function onChange(checkedValues) {
  //   console.log('checked = ', checkedValues);
  // }

  const onFinish = async (values) => {
    values.SERVICOS.map((service) => {
      if (service === 'PPRA') {
        values.PPRA = true;
      }

      if (service === 'PCMSO') {
        values.PCMSO = true;
      }

      if (service === 'EXCLI') {
        values.EXCLI = true;
      }

      if (service === 'EXCOM') {
        values.EXCOM = true;
      }
    });
    console.log(values);
    setLoadingSubmit(true);
    const response = await fetch('https://clinicasserver.herokuapp.com/store', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NOME: values.NOME,
        ENDEREÇO: values.ENDERECO,
        EMAIL: values.EMAIL,
        CEP: values.CEP,
        WHATSAPP: values.WHATSAPP,
        PPRA: values.PPRA,
        PCMSO: values.PCMSO,
        EXCLI: values.EXCLI,
        EXCOM: values.EXCOM,
      }),
    });
    console.log(response);
    setLoadingSubmit(false);
    setVisibleModal(false);
    if (response.ok) {
      message.success('Clínica criado com sucesso.');
    } else {
      message.warning('Erro ao criar clínica.');
    }
    setOpcao('lista');
  };

  useEffect(() => {
    fetchData();
  }, [opcao]);

  useEffect(() => {
    if (clinics.length > 0) {
      fadeInRef.current.style.opacity = 1;
    }
  }, [clinics]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Visualizador de Clínicas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.content}>
        <section className={styles.left}>
          <div className={styles.header}>
            <div className={styles.fita} />
            <h1 className={styles.title}>VISUALIZADOR DE CLÍNICAS</h1>
          </div>
          <Menu
            selectedKeys={[opcao]}
            onClick={(e) => handleChangeOption(e)}
            mode="horizontal"
          >
            {width < 421 ? (
              <>
                <Menu.Item key="lista" icon={<UnorderedListOutlined />}>
                  Listagem
                </Menu.Item>
                <Menu.Item key="plus" icon={<PlusOutlined />}>
                  Clínica
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item key="lista" icon={<UnorderedListOutlined />}>
                  <Popover placement="top" content="Lista de Clínicas">
                    Listagem
                  </Popover>
                </Menu.Item>
                <Menu.Item key="plus" icon={<PlusOutlined />}>
                  <Popover placement="top" content="Adicionar Clínica">
                    Clínica
                  </Popover>
                </Menu.Item>
              </>
            )}

            <SubMenu key="buscar" icon={<SearchOutlined />} title="Filtrar por">
              <Menu.Item key="buscar:1">PCMSO</Menu.Item>
              <Menu.Item key="buscar:2">PPRA</Menu.Item>

              <Menu.Item key="buscar:3">Exames Clínicos</Menu.Item>
              <Menu.Item key="buscar:4">Exames Complementares</Menu.Item>
            </SubMenu>
            <SubMenu key="ordenar" icon={<TagOutlined />} title="Organizar por">
              <Menu.Item key="ordenar:1">Ordem Alfabética</Menu.Item>
            </SubMenu>
          </Menu>
          <Divider />
          <div ref={fadeInRef} className={styles.body}>
            {clinics.length > 0 ? (
              clinics.map((unit, key) => (
                <div
                  key={key}
                  className={styles.unit}
                  onClick={() => showDrawer(unit)}
                >
                  <div className={styles.fita2} />
                  <div className={styles.unitcontent}>
                    <div className={styles.infos}>
                      <div className={styles.principalinfo}>
                        <h2 className={styles.unittitle}>
                          {' '}
                          {truncate(unit.NOME)}
                        </h2>
                        <p className={styles.unitp}>
                          {unit.EMAIL === ''
                            ? 'Email não fornecido'
                            : unit.EMAIL.toLowerCase()}
                        </p>
                      </div>

                      <p
                        onClick={() => showDrawer(unit)}
                        className={styles.cep}
                      >
                        {unit.CEP}
                      </p>
                      <Popover placement="left" content={unit.WHATSAPP}>
                        <a
                          rel="noreferrer"
                          target="_blank"
                          href={`https://wa.me/+55${unit.WHATSAPPFORMATTED}?text=Olá%20${unit.NOME}.%20Estamos%20entrando%20contigo.`}
                        >
                          <div className={styles.whats}>
                            <img
                              src="/WhatsApp.svg"
                              style={{ height: 35 }}
                              alt=""
                            />
                          </div>
                        </a>
                      </Popover>
                    </div>

                    <div className={styles.abas}>
                      {unit.PCMSO === true ? (
                        <div className={styles.aba}>PCMSO</div>
                      ) : null}
                      {unit.PPRA === true ? (
                        <div className={styles.aba}>PPRA</div>
                      ) : null}
                      {unit.EXCLI === true ? (
                        <div className={styles.aba}>EX.CLI.</div>
                      ) : null}
                      {unit.EXCOM === true ? (
                        <div className={styles.aba}>EX.COM.</div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', marginTop: 100 }}>
                <Spin size="large" />
              </div>
            )}
          </div>
        </section>
        <section className={styles.right}>
          <Modal
            cancelButtonProps={{ style: { display: 'none' } }}
            okButtonProps={{ style: { display: 'none' } }}
            title="Adicionar Clínica"
            centered
            visible={visibleModal}
            onOk={() => onFinish()}
            onCancel={() => {
              setOpcao('lista');
              setVisibleModal(false);
            }}
            width={width < 421 ? '95vw' : 1000}
          >
            <Form onFinish={onFinish} name="basic">
              <p>Nome da Clínica</p>
              <Item name="NOME">
                <Input placeholder="Nome do Colaborador" type="text" />
              </Item>
              <p>Email Comercial</p>
              <Item name="EMAIL">
                <Input placeholder="Email Comercial" type="email" />
              </Item>
              <Row gutter={16}>
                <Col span={18}>
                  <p>Endereço Comercial</p>
                  <Item name="ENDERECO">
                    <Input placeholder="Endereço Comercial" type="text" />
                  </Item>
                </Col>
                <Col span={6}>
                  <p>CEP</p>
                  <Item name="CEP">
                    <Input placeholder="CEP" type="text" />
                  </Item>
                </Col>
              </Row>
              <p>WhatsApp</p>
              <Item name="WHATSAPP">
                <Input placeholder="WhatsApp" type="text" />
              </Item>

              <Item name="SERVICOS">
                <Checkbox.Group
                  style={{ width: '100%' }}
                  // onChange={onChange}
                >
                  <p style={{ fontSize: 15 }}>Serviços</p>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="PPRA">PPRA</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="PCMSO">PCMSO</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="EXCLI">Exames Clínicos</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="EXCOM">Exames Complementares</Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Item>
              <Item className={styles.itemMobileButton}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingSubmit}
                  className={styles.button}
                >
                  {loadingSubmit ? '' : 'CADASTRAR'}
                </Button>
              </Item>
            </Form>
          </Modal>
          <Drawer
            width={width < 421 ? 300 : 620}
            placement="right"
            closable={false}
            onClose={() => onClose()}
            visible={visible}
          >
            {ator ? (
              <>
                <h3
                  className="site-description-item-profile-p"
                  style={{ marginBottom: 24 }}
                >
                  {ator.NOME}
                </h3>
                <h5 className="site-description-item-profile-p">
                  Dados da Clínica
                </h5>
                <Row>
                  <Col style={{ marginBottom: 5 }} span={12}>
                    <DescriptionItem
                      title="Nome Completo"
                      content={ator.NOME}
                    />
                  </Col>
                  <Col style={{ marginBottom: 5 }} span={12}>
                    <DescriptionItem
                      title="Email"
                      content={ator.EMAIL ? ator.EMAIL : 'Não fornecido'}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginBottom: 5 }} span={12}>
                    <DescriptionItem title="Cidade" content="São Paulo" />
                  </Col>
                  <Col style={{ marginBottom: 5 }} span={12}>
                    <DescriptionItem title="País" content="Brasil 🇧🇷" />
                  </Col>
                </Row>
                <Row>
                  <Col style={{ marginBottom: 5 }} span={12}>
                    <DescriptionItem
                      title="Registrado"
                      content={`${
                        Math.floor(Math.random() * 28) + 1
                      } de Dezembro`}
                    />
                  </Col>
                  <Col style={{ marginBottom: 5 }} span={12}>
                    <DescriptionItem title="Endereço" content={ator.ENDEREÇO} />
                  </Col>
                </Row>
                <Divider />

                <h3>Localização</h3>
                <div className={styles.map}>
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: 'AIzaSyBXM7zi8hwm1DX6d9jVA5PGc5h02TC3_7o',
                    }}
                    defaultCenter={ator.LOCATION}
                    defaultZoom={13}
                  >
                    <AnyReactComponent
                      lat={ator.LOCATION.lat}
                      lng={ator.LOCATION.lng}
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
                    <DescriptionItem
                      title="Telefone/WhatsApp"
                      content={ator.WHATSAPP}
                    />
                  </Col>
                </Row>
              </>
            ) : null}
          </Drawer>
        </section>
      </main>
    </div>
  );
}

const AnyReactComponent = () => (
  <img style={{ height: 20 }} src="/cc.svg" alt="" />
);
