// 验证是否数字（带小数点）
export function checkNumberpoint(rule, value,callback){
    let  val=Number(value);
    let numReg=/^\d+(\.\d+)?$/;
    if(numReg.test(val)){
        callback();
    }else{
        callback(new Error('请输入数字'))
    }
 }
// 只能输入英数字
export function validateENum(rule, value,callback){
    debugger
    var reg = /^[A-Za-z0-9]{1,10}$/;
    if(reg.test(value)){
        callback();
    }else{
        callback(new Error('请输入字母或数字组成编号'))
    }
 }

//电话号和固定电话验证
export function validatePhone(rule, value,callback) {
  debugger
    //电话
    const mobile =/^1[3456789]\d{9}$/;
    //固话
    const phone =/0\d{2}-\d{7,8}/;
    if(value==''||value==undefined||value==null){
      callback();
    }else {
      //if ((!mobile.test(value)) && value != '') {
        //|| !phone.test(value) 
        //!mobile.test(value)
      if ((mobile.test(value)||phone.test(value))) {
        callback();
      } else {
        callback(new Error('请输入正确的电话号码'));
      }
    }
  }
//邮箱验证
export function validateEmail(rule, value,callback) {
    ///var reg=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var reg=/^\w+@[a-z0-9]+\.[a-z]{2,4}$/
    if (value === '') {
      callback(new Error('请正确填写邮箱'));
    } else {
      if (value !== '') { 
        if(!reg.test(value)){
          callback(new Error('请输入有效的邮箱'));
        }
      }
      callback();
    }
  }
  //数字验证(decimal(20,5))
  export function validateDecimal(rule, value,callback) {
    var reg=/^\d{1,15}(\.\d{1,5})?$/
    if (value === '') {
      callback(new Error('请正确填写数字'));
    } else {
      if (value !== '') { 
        if(!reg.test(value)){
          callback(new Error('请输入有效的数字'));
        }
      }
      callback();
    }
  }
  //英文名称验证 
  export function validateEN(rule, value,callback) {
    var reg=/^[a-zA-Z]+$/
    if (value === '') {
      callback(new Error('请正确填写英文名'));
    } else {
      if (value !== '') { 
        if(!reg.test(value)){
          callback(new Error('请输入有效的英文'));
        }
      }
      callback();
    }
  }
  
    //传真号验证 
    export function validateFax(rule, value,callback) {
      var reg=/^(\d{3,4}-)?\d{7,8}$/
      if (value === '') {
        callback(new Error('请正确填写传真号'));
      } else {
        if (value !== '') { 
          if(!reg.test(value)){
            callback(new Error('请输入有效的传真号'));
          }
        }
        callback();
      }
    }
    
    //邮编校验
    export function validatezipCode(rule, value,callback) {
      var reg=/^[1-9][0-9]{5}$/
      if (value === '') {
        callback(new Error('请正确填写邮编'));
      } else {
        if (value !== '') { 
          if(!reg.test(value)){
            callback(new Error('请输入有效的邮编'));
          }
        }
        callback();
      }
    }
