import React from 'react'
import {useParams} from "react-router-dom"
import {useState} from "react"
import { useEffect } from 'react';
import Loader from "../components/common/Loader";
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiConnector';
import { getCatalogPageData } from '../services/operations/catalogDetailsAPI';
import Footer from "../components/common/Footer"
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {
  const {catalogName}=useParams();
  const [loading,setLoading]=useState(false);
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [active,setActive]=useState(1);

  useEffect(()=>{
    console.log("inside the fist");
    const fetchCategories = async () => {
        setLoading(true);
        try {

          const response = await apiConnector("GET",categories.CATEGORIES_API);
          console.log("responce inside the catalog",response.data.allCategories);  
          const allCatergories=response.data.allCategories;

          const category_id=allCatergories.find((category)=>category.name.split(" ").join("-").toLowerCase()===catalogName)._id

          console.log("category_id",category_id);
          setCategoryId(category_id);

        }catch (error) {

          console.log("Error while fetching categories:",error);

        }finally {
          setLoading(false);
        }
    };
   
  fetchCategories();
  },[catalogName]);


  useEffect(()=>{
    
    if(categoryId){

      const fetchCatalogPageData=async()=>{
        setLoading(true);

        try{
          const res=await getCatalogPageData(categoryId);
          console.log("res",res);
          setCatalogPageData(res);
        }catch(error){
          console.log(error);
        }

        setLoading(false); 
      }

      fetchCatalogPageData(); 
    }
   
  },[categoryId]);


  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-66px)] place-items-center">
        <Loader />
      </div>
    )
  }


  return (
    <div className="flex-col w-full">
       {/* Hero Section */}
      <div className="bg-richblack-800 px-15 lg:px-20 xl:px-30">
        <div className="mx-auto flex min-h-65 flex-col justify-center gap-4">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5 font-semibold">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-217.5 text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

       {/* Section 1 */}
      <div className=" mx-auto w-full max-w-maxContentTab px-8 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to Get You Started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div className="pt-3">
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      
      {/* Section 2 */}
      <div className=" mx-auto w-full max-w-maxContentTab px-8 py-12 lg:max-w-maxContent">
        <div className="section_heading">
        Top Selling Courses
        </div>
        <div className="pt-4">
            <CourseSlider Courses={catalogPageData?.data?.mostSellingCourses} />
          
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto w-full max-w-maxContentTab px-8 py-12 lg:max-w-maxContent">
        <div className="section_heading">Explore Other Categories</div>
        <div className="pt-4">
            
         {catalogPageData?.data?.differentCategory.map((category) => (
          <div key={category._id} className="mb-10">
            
            <h2 className="mb-4 text-2xl font-semibold text-richblack-5">
              {category.name}
            </h2>

            <CourseSlider Courses={category.courses} />

          </div>
        ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
      
    </div>
  )
}

export default Catalog;