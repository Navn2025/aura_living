import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHostelById} from '../store/slice/hostel.slice';
const HostelPage=() =>
{
    const {id}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const hostel=useSelector((state) => state.hostels.selectedHostel);
    const status=useSelector((state) => state.hostels.status);
    const error=useSelector((state) => state.hostels.error);
    const [primaryImage, setPrimaryImage]=useState(hostel?.images?.length>0? hostel.images[0]:null);

    useEffect(() =>
    {
        if (id) dispatch(fetchHostelById(id));
    }, [dispatch, id]);

    useEffect(() =>
    {
        if (hostel&&hostel.images&&hostel.images.length>0)
        {
            setPrimaryImage(hostel.images[0]);
        }
    }, [hostel]);

    if (status==='loading')
    {
        return (
            <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-[#f0ebd8] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-[#f0ebd8] text-lg">Loading hostel details...</p>
                </div>
            </div>
        );
    }

    if (status==='failed')
    {
        return (
            <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center p-4">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f0ebd8">
                            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path>
                        </svg>
                    </div>
                    <p className="text-red-400 text-lg">Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!hostel)
    {
        return (
            <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center p-4">
                <p className="text-[#f0ebd8] text-lg">No hostel found.</p>
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen bg-[#0d1b2a] overflow-x-hidden">
            {/* Hero Section with Image Gallery */}
            <section className="w-full bg-[#0d1b2a] pt-20 pb-12 sm:pb-16 lg:pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0ebd8] text-[#0d1b2a] rounded-full text-xs sm:text-sm font-medium">
                            {hostel.comming_soon&&<span className="animate-pulse">🔥 Coming Soon</span>}
                            {hostel.popular&&!hostel.comming_soon&&<span>⭐ Popular Choice</span>}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#f0ebd8]">
                            {hostel.name}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[#f0ebd8]">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 20.9L16.95 23.95L15.75 18.3L20.5 14.2L14.9 13.75L12 8.5L9.1 13.75L3.5 14.2L8.25 18.3L7.05 23.95L12 20.9Z"></path>
                                </svg>
                                <span className="text-sm sm:text-base">{hostel.rating||'N/A'} Rating</span>
                            </div>
                            <span className="text-[#f0ebd8]/40">•</span>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z"></path>
                                </svg>
                                <span className="text-sm sm:text-base">{hostel.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-[#f0ebd8] p-3 sm:p-4 lg:p-6 rounded-2xl">
                            <div className="border-4 border-[#0d1b2a] rounded-xl overflow-hidden">
                                {hostel.images&&hostel.images.length>0? (
                                    <div className="space-y-4">
                                        {/* Main Image */}
                                        <div className="relative aspect-video sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#0d1b2a]">
                                            <img
                                                src={primaryImage}
                                                alt={hostel.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Thumbnails */}
                                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 p-3 sm:p-4 bg-[#0d1b2a]">
                                            {hostel.images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setPrimaryImage(img)}
                                                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${primaryImage===img
                                                        ? 'border-[#f0ebd8] scale-105'
                                                        :'border-transparent hover:border-[#f0ebd8]/50'
                                                        }`}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`View ${idx+1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ):(
                                    <div className="aspect-video flex items-center justify-center bg-[#0d1b2a] text-[#f0ebd8]">
                                        <div className="text-center space-y-3">
                                            <svg className="w-16 h-16 mx-auto opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
                                            </svg>
                                            <p className="text-lg">No images available</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Info Cards */}
            <section className="w-full bg-[#f0ebd8] py-8 sm:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="bg-[#0d1b2a] p-4 sm:p-6 rounded-xl text-center space-y-2">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                    <path d="M21 16V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V16H21ZM3 13H21V15H3V13ZM3 8H21V11H3V8ZM21 3C21.5523 3 22 3.44772 22 4V6H2V4C2 3.44772 2.44772 3 3 3H21Z"></path>
                                </svg>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-[#f0ebd8]">{hostel.totalRemainingBeds}</p>
                            <p className="text-xs sm:text-sm text-[#f0ebd8]/80">Beds Available</p>
                        </div>

                        <div className="bg-[#0d1b2a] p-4 sm:p-6 rounded-xl text-center space-y-2">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM9.71002 4.33265C6.71639 5.22535 4.458 7.8235 4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33265ZM14.29 4.33265C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22535 14.29 4.33265ZM10.0307 11H13.9693C13.8189 8.56118 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56118 10.0307 11Z"></path>
                                </svg>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-[#f0ebd8]">{hostel.gender}</p>
                            <p className="text-xs sm:text-sm text-[#f0ebd8]/80">Gender Type</p>
                        </div>

                        <div className="bg-[#0d1b2a] p-4 sm:p-6 rounded-xl text-center space-y-2">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                    <path d="M13 21V23H11V21H3C2.44772 21 2 20.5523 2 20V6H22V20C22 20.5523 21.5523 21 21 21H13ZM4 19H20V8H4V19ZM13 10H18V12H13V10ZM13 14H18V16H13V14ZM9 10V13H12V10H9ZM7 8V13C7 13.5523 7.44772 14 8 14H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 12.5523 8 12 8H7ZM2 3H22V5H2V3Z"></path>
                                </svg>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-[#f0ebd8]">{hostel.established}</p>
                            <p className="text-xs sm:text-sm text-[#f0ebd8]/80">Established</p>
                        </div>

                        <div className="bg-[#0d1b2a] p-4 sm:p-6 rounded-xl text-center space-y-2">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                    <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM6 15H8V17H6V15ZM10 11H18V13H10V11ZM10 15H15V17H10V15Z"></path>
                                </svg>
                            </div>
                            <p className="text-xl sm:text-2xl font-bold text-[#f0ebd8]">₹{hostel.price}</p>
                            <p className="text-xs sm:text-sm text-[#f0ebd8]/80">Per Month</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="w-full bg-[#0d1b2a] py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-[#f0ebd8] p-6 sm:p-8 lg:p-12 rounded-2xl space-y-6">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1b2a]">About This Hostel</h2>
                            <p className="text-base sm:text-lg text-[#0d1b2a] leading-relaxed">{hostel.description}</p>

                            {hostel.usps&&hostel.usps.length>0&&(
                                <div className="space-y-3">
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#0d1b2a]">Unique Selling Points</h3>
                                    <ul className="space-y-2">
                                        {hostel.usps.map((usp, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-base sm:text-lg text-[#0d1b2a]">
                                                <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                                    <path d="M10 15.172L19.192 5.979L20.607 7.393L10 18L3.636 11.636L5.05 10.222L10 15.172Z"></path>
                                                </svg>
                                                {usp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="w-full bg-[#f0ebd8] py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
                        <div className="text-center space-y-3 sm:space-y-4">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d1b2a]">Amenities & Features</h2>
                            <p className="text-base sm:text-lg text-[#0d1b2a]">Everything you need for comfortable living</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {hostel.features&&hostel.features.length>0? (
                                hostel.features.map((feature, idx) => (
                                    <div key={idx} className="bg-[#0d1b2a] p-4 sm:p-6 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                                    <path d="M10 15.172L19.192 5.979L20.607 7.393L10 18L3.636 11.636L5.05 10.222L10 15.172Z"></path>
                                                </svg>
                                            </div>
                                            <span className="text-base sm:text-lg font-medium text-[#f0ebd8]">{feature}</span>
                                        </div>
                                    </div>
                                ))
                            ):(
                                <p className="col-span-full text-center text-[#0d1b2a]">No features listed</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Nearby Places */}
            <section className="w-full bg-[#0d1b2a] py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f0ebd8]">What's Nearby</h2>
                            <p className="text-base sm:text-lg text-[#f0ebd8]">Convenient access to everything you need</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            {hostel.nearby1&&(
                                <div className="bg-[#f0ebd8] p-6 rounded-xl space-y-3">
                                    <div className="w-12 h-12 bg-[#0d1b2a] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f0ebd8">
                                            <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0d1b2a]">{hostel.nearby1}</h3>
                                    <p className="text-[#0d1b2a]/70">{hostel.nearby1distance}</p>
                                </div>
                            )}
                            {hostel.nearby2&&(
                                <div className="bg-[#f0ebd8] p-6 rounded-xl space-y-3">
                                    <div className="w-12 h-12 bg-[#0d1b2a] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f0ebd8">
                                            <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0d1b2a]">{hostel.nearby2}</h3>
                                    <p className="text-[#0d1b2a]/70">{hostel.nearby2distance}</p>
                                </div>
                            )}
                            {hostel.nearby3&&(
                                <div className="bg-[#f0ebd8] p-6 rounded-xl space-y-3">
                                    <div className="w-12 h-12 bg-[#0d1b2a] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f0ebd8">
                                            <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13Z"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0d1b2a]">{hostel.nearby3}</h3>
                                    <p className="text-[#0d1b2a]/70">{hostel.nearby3distance}</p>
                                </div>
                            )}
                        </div>

                        {hostel.locationLink&&(
                            <div className="mt-8 text-center">
                                <a
                                    href={hostel.locationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#f0ebd8] text-[#0d1b2a] rounded-full text-sm sm:text-base font-medium hover:bg-opacity-90 transition-all"
                                >
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z"></path>
                                    </svg>
                                    View on Google Maps
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Additional Info Cards */}
            <section className="w-full bg-[#f0ebd8] py-12 sm:py-16 lg:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-[#0d1b2a] p-6 rounded-xl space-y-3">
                            <div className="w-12 h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                    <path d="M12 19H14V6.00003L20.3939 8.74028C20.7616 8.89786 21 9.2594 21 9.65943V19H23V21H1V19H3V5.6499C3 5.25472 3.23273 4.89659 3.59386 4.73609L11.2969 1.31251C11.5493 1.20035 11.8448 1.314 11.9569 1.56634C11.9853 1.63027 12 1.69945 12 1.76941V19Z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#f0ebd8]">Hostel Type</h3>
                            <p className="text-[#f0ebd8]/80">{hostel.hostelType}</p>
                        </div>

                        <div className="bg-[#0d1b2a] p-6 rounded-xl space-y-3">
                            <div className="w-12 h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                    <path d="M2 19H22V21H2V19ZM2 5L7 8.5V13H9V8.5L14 5V17H16V5L21 8.5V17H22V7L12 1L2 7V17H2V5ZM4 9.23L4 12H6V9.23L4 9.23ZM8 10.05L8 12H10V10.05L8 10.05ZM16 8.5L18 9.5V12H20V10.05L18 9.05L16 8.05V8.5Z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#f0ebd8]">Total Capacity</h3>
                            <p className="text-[#f0ebd8]/80">{hostel.capacity} Students</p>
                        </div>

                        <div className="bg-[#0d1b2a] p-6 rounded-xl space-y-3">
                            <div className="w-12 h-12 bg-[#f0ebd8] rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d1b2a">
                                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM8.5 14.5L6 12L4.5 13.5L8.5 17.5L19 7L17.5 5.5L8.5 14.5Z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#f0ebd8]">Occupancy Rate</h3>
                            <p className="text-[#f0ebd8]/80">{hostel.occupancy}% Full</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-[#0d1b2a] py-16 sm:py-20 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0ebd8]">
                            Ready to Make This Your Home?
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-[#f0ebd8] max-w-2xl mx-auto">
                            Join the community and start your journey to success today. Book your visit or get in touch with us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate('/contact')} className="px-8 sm:px-10 py-3 sm:py-4 bg-[#f0ebd8] text-[#0d1b2a] rounded-full text-sm sm:text-base font-medium hover:bg-opacity-90 transition-all">
                                Book a Visit
                            </button>
                            <button onClick={() => navigate('/contact')} className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-[#f0ebd8] text-[#f0ebd8] rounded-full text-sm sm:text-base font-medium hover:bg-[#f0ebd8] hover:text-[#0d1b2a] transition-all">
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HostelPage;