 //------------operators
    //$eq - equal => .find({price: {$eq:10}})
    //$ne - not equal => .find({price: {$ne:10}})
    //$lt - less than
    //$gt - greater than
    //$lte - less than or equal to
    //$gte - greater than equal to
    //$in - => .find({price: {$in:[10,11,20]}})
    //$nin - not in

    //-----------logical operators
    //or - .find().or([{name:'mosh'}, {isPublished:true}])
    //and - .find().and([{name:'mosh'}, {isPublished:true}])

    //--------update operators
    //$currentDate - update to curent date
    //$inc - increment
    //$min
    //$max
    //$mul
    //$rename

    //----------regular expression
    //.find({author:/^mosh/}) statrs with mosh
    //.find({author:/hamedanu$/i}) ends with hamedani
    //.find({author:/.*hamedanu.*/}) ends with hamedani

    //count - for counting documents

    //---------pagination implementation
    //const pageNum = 10
    //const pageSize = 10
    //.find()
    //.skip((pageNum-1)*pageSize)
    //.limit(pageSize)

    //---------upating models
    //const course = Course.find(id)
    //course.set({author:'new author'})
    //course.save()

    //Course.update({_id:id},{$set:{
        //name:'author',
        //isPublished:true
    //}})

    //Course.findByIdAndUpdate(id,{$set:{author:'jack',isPublished:true}},{new:true})

    //-------------------removing/deleting models
    //Course.findByIdAndRemove(id)
    //Course.deleteOne({_id:id})
    //Course.deleteMany()

    //---------------validation
    //new mongoose.Schema({name:{type:string,required:true,price:Number,isPublished:{type:Boolean,required:function(){return this.price > 0}}}})
    //----------isAsync validation
    //new mongoose.Schema({name:{isAsync:true,validate:function(v,callback){}}})
    //------------------lowercase
    //new mongoose.Schema({name:{lowercase:true}})

    //---------------getter and setter
    new mongoose.Schema({
        price:{
            type:Number,
            set: (v)=>Math.random(v),
            get: (v)=>Math.random(v)
        }  
    })

    const courseSchema = new mongoose.Schema({
        name:String,
        author:String,
        tags:[String],
        date:{
            type:Date,
            default: Date.now
        },
        isPublished: Boolean
    })
    
    const Course = mongoose.model('Course',courseSchema)
    
    async function createCourse(){
        const course = new Course({
            name:"Biology",
            author:"Lanre",
            tags:['look','joot'],
            isPublished:true
        })
        const result =  await course.save() 
    }
    
    async function getCourses(){
       
    
        const courses = await Course.find()
        .limit(1)
        .sort({name:-1})
        .select({name:1})
        console.info(courses) 
    }
    
    //getCourses()
    
    //createCourse()

    //------------------------modelling relationships
    //1 - Using references Normalization -> consistency, but low query performance
    let author = {
        id:1,
        name: 'Mosh'
    }

    let course = {
        author: 'id'
    }
    //2 - Using embedded documents De-normalization -> Insonsistent, but better query performance
    let course = {
        author: {
            name:'Mosh'
        }
    }
    //3 Hybride (combination of approaches 1 and 2)
    let customer = {
        author:{
            id:'ref',
            name:'Mosh'
        }
    }

    //tradeoff between query performance and consistency

    //joi-password-complexity is the package used to simulate password complexity