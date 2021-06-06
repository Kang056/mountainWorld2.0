function backResponse(error) {
  console.log(error);
  let data;
  switch (error.type) {
    case 1:
      data = formValidate(error);
      break;
    case 2:
      data = businessValidate(error);
      break;
    default:
      console.log('type error');
      break;
  }
  return data;
}

function formValidate(error) {
  const data = {
    type: error.type,
    detail: error.detail
  };
  return data;
}

function businessValidate(error) {
  const data = {
    type: error.type,
    detail: []
  };
  detail.forEach(item => data.detail.push({fieldName: businessLog, reason: item}));
  return data;
}


// validate.js 表單驗證套件
