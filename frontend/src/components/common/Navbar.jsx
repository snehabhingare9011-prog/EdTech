import React, { useEffect, useState } from "react";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import {Link, NavLink, matchPath, useLocation} from "react-router-dom";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineMenu,AiOutlineShoppingCart} from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Authentication/ProfileDropdown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import CTAButton from "../common/Button";

const Navbar = () => {

    const location = useLocation();

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    // const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    // Check whether current URL matches a route
    const matchRoute = (route) => {

        return matchPath(
            {
                path: route,
            },
            location.pathname
        );
    };

    // // Fetch categories
    // useEffect(() => {

    //     const fetchCategories = async () => {

    //         setLoading(true);

    //         try {

    //             const response = await apiConnector("GET",categories.CATEGORIES_API);

    //             setSubLinks(response?.data?.data || []);

    //         } catch (error) {

    //             console.log("Error while fetching categories:",error);

    //         } finally {

    //             setLoading(false);

    //         }
    //     };

    //     fetchCategories();

    // }, []);

      const subLinks = [
        {
            _id:1,
            name: "Python",
            link: "/catalog/python",
        },
        {   _id:2,
            name: "javascript hjj",
            link: "/catalog/javascript",
        },
        {  _id:3,
            name: "web-development",
            link: "/catalog/web-development",
        },
    ];


    return (
        <header className="w-full border-b border-richblack-700 bg-richblack-900">

            <div className="mx-auto flex h-20 w-11/12 max-w-[1200px] items-center justify-between">

                {/* ================= LOGO ================= */}

                <Link to="/" className="shrink-0">

                    <img
                        src={Logo}
                        alt="StudyNotion"
                        className="w-[150px]"
                    />

                </Link>


                {/* ================= DESKTOP NAVIGATION ================= */}

                <nav className="hidden md:block">

                    <ul className="flex items-center gap-8">

                        { NavbarLinks.map((link, index) => (

                            <li key={index}>

                                {link.title === "Catalog" ? (

                                    /* ============== CATALOG ============== */

                                    <div className="group relative cursor-pointer">

                                        <div className={`flex items-center gap-1 py-5 text-[18px] transition-colors ${ matchRoute( "/catalog/:catalogName" ) ? "text-yellow-50" : "text-richblack-5" } `} >

                                            <span>
                                                {link.title}
                                            </span>

                                            <span className="text-xs transition-transform duration-200 group-hover:rotate-180">
                                                ▼
                                            </span>

                                        </div>


                                        {/* ============== DROPDOWN ============== */}

                                        <div className=" invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2 rounded-lg bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 " >

                                            {/* Small triangle */}

                                            <div className=" absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white " />

                                            { loading ? (

                                                <p className="px-4 py-3 text-sm text-richblack-500">
                                                    Loading...
                                                </p>

                                            ) : subLinks.length > 0 ? (

                                                subLinks.map((category) => (

                                                    <Link key={category._id} to={`/catalog/${category.name .split(" ") .join("-") .toLowerCase()}`} className=" block rounded-md px-4 py-3 text-[16px] text-richblack-800 transition-colors hover:bg-richblack-50 hover:text-yellow-600 " >
                                                        {category.name}
                                                    </Link>

                                                ))

                                            ) : (

                                                <p className="px-4 py-3 text-sm text-richblack-500">
                                                    No categories found
                                                </p>

                                            )}

                                        </div>

                                    </div>

                                ) : (

                                    /* ============== NORMAL LINK ============== */

                                    <NavLink
                                        to={link.path}
                                        className={ ({ isActive }) => ` text-[18px]  transition-colors ${ isActive ? "text-yellow-50" : "text-richblack-5 hover:text-yellow-50" } ` } >
                                        {link.title}
                                    </NavLink>

                                )}

                            </li>

                        ))}

                    </ul>

                </nav>


                {/* ================= RIGHT SIDE ================= */}

                <div className="hidden items-center gap-4 md:flex">

                    {/* Cart */}

                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (

                        <Link to="/dashboard/cart" className=" relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-richblack-800 " >
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />

                            {totalItems > 0 && (

                                <span className=" absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-50 px-1 text-xs font-bold text-richblack-900 " >
                                    {totalItems}
                                </span>

                            )}

                        </Link>

                    )}


                    {/* Login / Signup */}

                    {!token && (

                        <div className="flex items-center gap-3">
                         
                         <CTAButton active={false} linkto={'/login'}>
                            Log in
                         </CTAButton>

                         <CTAButton active={true} linkto={'/signup'}>
                            Sign up
                         </CTAButton>
                            

                        </div>

                    )}


                    {/* Profile */}

                    {token && user && (

                        <ProfileDropdown />

                    )}

                </div>


                {/* ================= MOBILE MENU ================= */}

                <button type="button" className=" rounded-md p-2 transition-colors hover:bg-richblack-800 md:hidden " >

                    <AiOutlineMenu
                        className="text-2xl text-richblack-100"
                    />

                </button>

            </div>

        </header>
    );
};

export default Navbar;