const CURRENCY_FORMATTER=new Intl.NumberFormat(undefined,{
currency:"USD",
style:"currency"
})

const formatCurrency=(price)=>{
return CURRENCY_FORMATTER.format(price)
}

export default formatCurrency

