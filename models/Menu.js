const mongoose= require('mongoose');

//define the Menu schema
const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['spicy','sweet','sour'],  
        required:true,
    },
    Type:{
        type:String,
        enum:['Veg','Non-Veg'],
        required:true,
    },
    is_drink:{
        type:Boolean,
        required:true,
    },
    ingredients:{
        type:[String],
        default:[],
    },
    num_sales:{
        type:Number,
        default:0
    }

});

const MenuItem= mongoose.model('MenuItem',menuItemSchema);

module.exports=MenuItem;
