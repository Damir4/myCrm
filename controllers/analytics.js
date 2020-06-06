const moment = require('moment')
const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.overview = async function(req, res) {
  let allOrders
  try {
    if(req.user.email=='administrator@mail.ru'){
      allOrders = await Order.find().sort({date:1})
    }
    else{
      allOrders = await Order.find({user: req.user.id}).sort({date:1})
    }
    const ordersMap = getOrdersMapTwo(allOrders)
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || []

    // Количество заказов вчера
    const yesterdayOrdersNumber = yesterdayOrders.length
    // Количество заказов
    const totalOrdersNumber = allOrders.length
    // Количество дней всего
    const daysNumber = Object.keys(ordersMap).length
    // Заказов в день
    const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0)
    // ((заказов вчера \ кол-во заказов в день) - 1) * 100
    // Процент для кол-ва заказов
    const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2)
    // Общая выручка
    const totalGain = calculatePrice(allOrders)
    // Выручка в день
    const gainPerDay = totalGain / daysNumber
    // Выручка за вчера
    const yesterdayGain = calculatePrice(yesterdayOrders)
    // Процент выручки
    const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2)
    // Сравнение выручки
    const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
    // Сравнение кол-ва заказов
    const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2)

    res.status(200).json({
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +yesterdayGain,
        isHigher: +gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareNumber),
        yesterday: +yesterdayOrdersNumber,
        isHigher: +ordersPercent > 0
      }
    })

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.analytics =  async function(req, res) {
  const pn = moment().weekday(0).format('YYYY-MM-DD') ;
  try {
    let Orders

      if(req.user.email=='administrator@mail.ru'){
        Orders = await Order.find()
      }
      else{
        Orders = await Order.find({user: req.user.id}).sort({date:1})
      }

    const newOrders = await dates(Orders)
    const allOrders = newOrders.filter(dt=>{
     const p = new Date(pn)
     const dd = new Date(dt.date)
    return moment(dd).isAfter(p)
    })
    const ordersMap = getOrdersMap(allOrders)
 
    
    const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

    const chart = Object.keys(ordersMap).map(label => {
      const gain = calculatePrice(ordersMap[label])
      const order = ordersMap[label].length

      return {label, order, gain}
    })


    res.status(200).json({average, chart})

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.analyticsMonth =  async function(req, res) {
  const mon = moment().startOf('month').format('YYYY-MM-DD');
  try {
    let Orders

    if(req.user.email=='administrator@mail.ru'){
      Orders = await Order.find()
    }
    else{
      Orders = await Order.find({user: req.user.id}).sort({date:1})
    }
    const newOrders = await dates(Orders)
    const allOrders = newOrders.filter(dt=>{
     const m = new Date(mon)
     const dd = new Date(dt.date)
    return dd>=m
    })
    const ordersMap = getOrdersMap(allOrders)
    const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

    const chart = Object.keys(ordersMap).map(label => {
      const gain = calculatePrice(ordersMap[label])
      const order = ordersMap[label].length

      return {label, order, gain}
    })


    res.status(200).json({average, chart})

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.analyticsQuart =  async function(req, res) {
  const quart = moment().quarter(moment().quarter()).startOf('quarter').format('YYYY-MM-DD')
   try {
    let Orders

    if(req.user.email=='administrator@mail.ru'){
      Orders = await Order.find()
    }
    else{
      Orders = await Order.find({user: req.user.id}).sort({date:1})
    }
     const newOrders = await dates(Orders)
 
     const allOrders = newOrders.filter(dt=>{
      const q = new Date(quart)
      const dd = new Date(dt.date)
     return moment(dd).isAfter(q)
     })
     const ordersMap = getOrdersMap(allOrders)
  
     
     const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)
 
     const chart = Object.keys(ordersMap).map(label => {
      
       const gain = calculatePrice(ordersMap[label])
       const order = ordersMap[label].length
 
       return {label, order, gain}
     })
 
 
     res.status(200).json({average, chart})
 
   } catch (e) {
     errorHandler(res, e)
   }
 }
 module.exports.analyticsHalf =  async function(req, res) {
  const weekday =new Date( moment().format('YYYY-MM-DD'))
  const startHalf = new Date(moment().startOf('year').format('YYYY-MM-DD'))
  const startHalf2 = new Date(moment().startOf('year').add(6,'month').format('YYYY-MM-DD'))
  let half
  if ((weekday.valueOf()>=startHalf.valueOf()) && (weekday.valueOf()<startHalf2.valueOf())){
      half = startHalf
  }
  else{
    half = startHalf2
  }
  try {
    let Orders

    if(req.user.email=='administrator@mail.ru'){
      Orders = await Order.find()
    }
    else{
      Orders = await Order.find({user: req.user.id}).sort({date:1})
    }
    const newOrders = await dates(Orders)
    
    const allOrders = newOrders.filter(dt=>{
     const p = new Date(half)
     const dd = new Date(dt.date)
    return moment(dd).isAfter(p)
    })
    const ordersMap = getOrdersMap(allOrders)
 
    
    const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

    const chart = Object.keys(ordersMap).map(label => {
     
      const gain = calculatePrice(ordersMap[label])
      const order = ordersMap[label].length

      return {label, order, gain}
    })


    res.status(200).json({average, chart})

  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.analyticsYear =  async function(req, res) {
  const year = moment().startOf('year').format('YYYY-MM-DD')
  try {
    let Orders

    if(req.user.email=='administrator@mail.ru'){
      Orders = await Order.find()
    }
    else{
      Orders = await Order.find({user: req.user.id}).sort({date:1})
    }
    const newOrders = await dates(Orders)
    
    const allOrders = newOrders.filter(dt=>{
     const p = new Date(year)
     const dd = new Date(dt.date)
    return moment(dd).isAfter(p)
    })
    const ordersMap = getOrdersMap(allOrders)
 
    
    const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2)

    const chart = Object.keys(ordersMap).map(label => {
   
      const gain = calculatePrice(ordersMap[label])
      const order = ordersMap[label].length

      return {label, order, gain}
    })


    res.status(200).json({average, chart})

  } catch (e) {
    errorHandler(res, e)
  }
}

function dates(order) {
  const dt = []
  order.forEach(ord=>{
  const obj = {}
  const d = moment(ord.date).format('YYYY-MM-DD')
  obj.date = d
  obj._id = ord._id
  obj.list = ord.list
  obj.user = ord.user
  obj.order = ord.order
  dt.push(obj)
  })
  return dt
}

function getOrdersMapTwo(orders = []) {
  const daysOrders = {}
  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY')

    if (date === moment().format('DD.MM.YYYY')) {
      return
    }

    if (!daysOrders[date]) {
      daysOrders[date] = []
    }

    daysOrders[date].push(order)
  })
  return daysOrders
}

function getOrdersMap(orders = []) {
  const daysOrders = {}
  orders.forEach(order => {
    const date = order.date
    if (date === moment().format('YYYY-MM-DD')) {
      return
    }

    if (!daysOrders[date]) {
      daysOrders[date] = []
    }

    daysOrders[date].push(order)
  })
  return daysOrders
}

function calculatePrice(orders = []) {
  return orders.reduce((total, order) => {
    const orderPrice = order.list.reduce((orderTotal, item) => {
      return orderTotal += item.cost * item.quantity
    }, 0)
    return total += orderPrice
  }, 0)
}


