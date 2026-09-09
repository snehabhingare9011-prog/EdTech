import ReactStarsModule from "react-rating-stars-component";
import { FaStar ,FaStarHalfAlt} from "react-icons/fa";

const ReactStars = ReactStarsModule.default;

const Practice = () => {
    let rating=2.8;
  return (
    <div className="min-h-screen bg-richblack-900 p-10">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Rating Test
      </h1>

      <ReactStars
        count={5}
        size={20}
        value={Math.round(rating*2)/2}
        edit={false}
        isHalf={true}
        color="gray"
        activeColor="#ffd700"
        emptyIcon={<FaStar />}
        filledIcon={<FaStar />}
        halfIcon={<FaStarHalfAlt />}
       
      />
    </div>
  );
};

export default Practice;


    // // HARD CODED CART DATA
    // const cart = [
    //     {
    //         _id: "course1",
    //         courseName: "The Complete Python Bootcamp From Zero to Hero in Python",
    //         thumbnail:
    //             "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    //         category: {
    //             name: "Programming"
    //         },
    //         instructor: "John Doe",
    //         price: 1700,
    //         rating: 4.8,
    //         ratingCount: 1245,
    //         totalCourses: 12,
    //         totalLessons: 85,
    //         level: "Beginner"
    //     },
    //     {
    //         _id: "course2",
    //         courseName: "The Complete React Developer Course",
    //         thumbnail:
    //             "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    //         category: {
    //             name: "Web Development"
    //         },
    //         instructor: "Jane Smith",
    //         price: 2100,
    //         rating: 4.6,
    //         ratingCount: 982,
    //         totalCourses: 10,
    //         totalLessons: 72,
    //         level: "Intermediate"
    //     },
    //     {
    //         _id: "course3",
    //         courseName: "Node.js Backend Development Masterclass",
    //         thumbnail:
    //             "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    //         category: {
    //             name: "Backend Development"
    //         },
    //         instructor: "Alex Johnson",
    //         price: 2000,
    //         rating: 4.9,
    //         ratingCount: 756,
    //         totalCourses: 15,
    //         totalLessons: 95,
    //         level: "Beginner"
    //     }
    // ];

    const totalItems = cart.length;

    const total = cart.reduce(
        (total, course) => total + course.price,
        0
    );