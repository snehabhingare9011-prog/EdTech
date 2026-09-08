import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import ChipInput from './ChipInput';
import Upload from './Upload';

const CourseInformation = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()
   
   
    const [loading,setLoading]=useState(false);
    const [courseCategories, setCourseCategories] = useState([])

    const getCategories=async()=>{
        try{
            setLoading(true);
            const categories =await fetchCourseCategories();
            setCourseCategories(categories);

            console.log("muze dekhna hai work krta hai ya nahi",categories)
            
        }catch(error){
            console.log("error during fetch course category",error);

        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getCategories();

    },[]);




  return (
    <div className='text-white'>

        <form>
            <label>
                Course Title <sup>*</sup>
                <br/>
                <input type="text"  placeholder='Enter Course Title'
                {...register("courseName",
                    {
                        required:{
                            value:true,
                            message:"Course title is required"
                        }
                    }
                )} className='outline'></input>
            </label>

            {errors.courseName && <p>{errors.courseName.message}</p>}
            <br/>
            <br/>
            <label>
                Course Short Description <sup>*</sup>
                <p></p>
                <textarea  placeholder="Enter Description"
                 {...register("courseDescription",{
                    required:{
                        value:true,
                        message:"Course Description is required"
                    }
                 })}
                 className='outline'
                />
            </label>

            {errors.courseDescription && <p>{errors.courseDescription.message}</p>}

            <br/>
            <br/>

            <label>
                Course Price <sup>*</sup>
                 <br/>
                <input placeholder="Enter Course Price" {...register(" price",
                    {   required:{
                            value:true,
                            message:"Course Price is required"
                        },
                        valueAsNumber:true,
                        patter:{
                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                        }
                    }
                )}/>
            </label>

            {errors.price && <p>{errors.price.message}</p>}

            <br/>
            <br/>
            <label htmlFor="category">Course Category <sup>*</sup></label>
            <br/>
            <select placeholder="Choose a category" id="category" {...register("category",
                {
                    required:"Category is required"
                }
            )}>
                <option >Choose a Category</option>
                 
                    {!loading && courseCategories?.map((category, indx) => (
                        <option key={indx} value={category?.name}> {category?.name} 
                        </option> 
                    ))}
                
              
            </select>

            {errors.category && <p>{errors.category.message}</p>}

            <br/>
            <br/>
           
            {/* Course Tags */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Course Thumbnail Image */}
             <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
            
            

        </form>

    </div>
  )
}

export default CourseInformation