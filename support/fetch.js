export const list = async () => {
  const res = await fetch('https://clinicasserver.herokuapp.com/list');
  const clinics = await res.json()
  return clinics
}



export const query = async (opcao) => {

  let parameter;
  
  if(opcao==='buscar:1'){
    parameter = 'PCMSO'
  } else if ( opcao === 'buscar:2'){
    parameter ='PPRA'
  }else if ( opcao === 'buscar:3'){
    parameter = 'EXCLI'
  }else if ( opcao === 'buscar:4'){
    parameter ='EXCOM'
  }

  const res = await fetch(`https://clinicasserver.herokuapp.com/index?${parameter}=true`);
  const clinics = await res.json()
  return clinics

}


export const sort = async () => {
  const res = await fetch('https://clinicasserver.herokuapp.com/sort');
  const clinics = await res.json()
  return clinics
}
