var app = getApp()
var inputContent = {}//重要代码

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

var pageData = {}
for (var i = 1; i < 5; i++) {
  (function (index) {
    pageData['slider' + index + 'change'] = function (e) {
      console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
    }
  })(i)
}
Page(pageData)



Page({
  data: {
    array: [],
    value: "初始值",
    item_list:[],
    inputContent: {},

    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],

    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
    ]    
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }, 
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    inputContent['id'] = e.detail.value
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },




  //----------------------------------------------------------------------  
  onLoad: function () {
    console.log('form发生了reset事件')
    //页面显示时执行这里面的方法 生命周期以后会讲
    var that = this;
    wx.request({
      url: 'http://116.236.115.123:8080/test.php',
      method: 'GET',
      success: function (res) {
        console.log(res);
        //console.log("-----------------------------1-----------------------------")
        //console.log(res.data);//打印请求返回的结果
        //that.setData({ item_list: res.data })
      }
    })
  },
  //事件处理函数
  onimageClick: function (event) {
    wx.navigateTo({
      url: 'http://116.236.115.123:8080/test.php',
    })
  },
  //------------------------------------------------------------
  bindChange: function (e) {
    inputContent = e.detail.value
  },
  bindButtonTap: function (e) {
    console.log('form发生了reset事件', inputContent['id'])
    var that = this;
    wx.request({
      url: ("http://116.236.115.123:8080/test.php"),//z重要代码
      method: 'GET',
      success: function (res) {   
        //console.log(res);
        //console.log(res.data);//打印请求返回的结果
        that.setData({ item_list: res.data })
      }
    })
  },

  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
  },
  switch2Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value)
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
  },
  bindFormSubmit: function (e) {
    console.log(e.detail.value.textarea)
  }
})