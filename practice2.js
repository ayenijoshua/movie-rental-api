const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })

  
const Author = mongoose.model('Author', authorSchema);

//------------Reference approach
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author:{
      type: mongoose.Schema.Types.ObjectId, // [mongoose.Schema.Types.ObjectId]
      ref:'Author'
  }
}));

//---------------Embeded object referencing
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author:authorSchema //authors:[authorSchema]
}));

async function createAuthor(name, bio, website) {  
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author')// for referentcing
    .select('name author');
    console.log(courses);
}

createAuthor('Mosh', 'My bio', 'My Website');

// createCourse('Node Course', 'authorId')

// listCourses();

//embedded examples
let course = new Course({name:'Node'}, {author:new Author({name:'Mosh'})})
course = Course.save();

//embedded examples storing arrays
let course = new Course({name:'Node'}, {
        authors:[
            new Author({name:'Mosh'}),
            new Author({name:'Josh'})
        ]  
    })
course = Course.save();

//embedded examples adding sub-socuments
let course = Course.findById(courseId)
course.authors.push(new Author({name:'Jide'}))
course.save()

//embedded examples deleting sub-socuments
let course = Course.findById(courseId)
const author = course.authors.id(authorId)
author.remove()
course.save()

//-----------------mongodb objectId
_id: 5ajejeu4uu5uuujdjdjdj

//12 bytes
//4 bytes - timestamp
//3 bytes - machine identifier
//3 bytes - process identifier
//3 bytes - counter

//--------------validating objectIds
mongoose.Types.ObjectId.isValid(id)