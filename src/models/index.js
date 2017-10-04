import mongoose from 'mongoose'
var Schema = mongoose.Schema;

//Resources
const resourcesSchema = new Schema({
    _id: Schema.Types.ObjectId,    
    alias: String,
    name: String,
    video: {
        type: Schema.Types.ObjectId,
        ref:'videos'
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'financecategories'
    },
    ebook:{
        type: Schema.Types.ObjectId,
        ref:'ebooks'
    },
    faq:[{
        type: Schema.Types.ObjectId,
        ref:'faqs'
    }],
    testimonial:[{
        type:  Schema.Types.ObjectId,
        ref: 'testimonials'
    }]
});


export const resourcesCollection =  mongoose.model('resources', resourcesSchema)
