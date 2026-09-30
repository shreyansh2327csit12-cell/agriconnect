import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Wheat,
  MapPin,
  Plus,
  Carrot,
  ArrowLeft,
  Star,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import ProductList from "../components/ProductList";
import { useParams } from "react-router-dom";
import { getFarmerById,getMyAuctions, updateUser } from "../http/api";
import { Clock, Users, BarChart2, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios"
import useTokenStore from "../http/store";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Replace with actual Cloudinary cloud name
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // Replace with your Cloudinary upload preset if applicable

const FarmerProfile = () => {
  // Normally this would come from an API or database
  const id = useTokenStore.getState().userId
  const [farmer, setFarmer] = useState();
  const [products, setProducts] = useState();
  const [uploading, setUploading] = useState();
  const [avatarUrl, setAvatarUrl] = useState();
  const [bannerUrl, setBannerUrl] = useState();

  const farmerDemo = {
    id: 1,
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    location: "Green Valley, California",
    since: "2015",
    bio: "Fourth-generation farmer specializing in organic vegetables and heritage grains. Our family farm has been practicing sustainable agriculture for over a years.",
    specialties: ["Organic Vegetables", "Heritage Grains", "Free-range Eggs"],
    certifications: ["USDA Organic", "Regenerative Organic Certified"],
    rating: 4.8,
    reviews: 127,
    phone: "(555) 123-4567",
    email: "sarah@greenfieldsfarm.com",
    products: [
      {
        id: 1,
        name: "Organic Heirloom Tomatoes",
        price: "$4.99/lb",
        image: [
          "https://images.unsplash.com/photo-1592924357190-51f7a3319392?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        ],
      },
      {
        id: 2,
        name: "Ancient Grain Wheat Berries",
        price: "$6.50/lb",
        image: [
          "https://images.unsplash.com/photo-1565806813968-a8636a640e5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        ],
      },
      {
        id: 3,
        name: "Fresh Free-Range Eggs",
        price: "$5.99/dozen",
        image: [
          "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        ],
      },
      {
        id: 4,
        name: "Fresh Free-Range Eggs",
        price: "$5.99/dozen",
        image: [
          "https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        ],
      },
    ],
  };


    const handleBannerUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset); // Using the Cloudinary upload preset

      try {
        setUploading(true);
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        if (response.data.secure_url) {
          console.log("Uploaded Image URL:", response.data.secure_url);
          setBannerUrl(response.data.secure_url); // Updating the state with the new profile image
        }
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setUploading(false);
      }
    };


  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset); // Using the Cloudinary upload preset

    try {
      setUploading(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      if (response.data.secure_url) {
        console.log("Uploaded Image URL:", response.data.secure_url);
        setAvatarUrl(response.data.secure_url); // Updating the state with the new profile image
        const userresponse = await updateUser(id,{profileImage: response.data.secure_url});
        if (response.status === 200) {
          console.log("Image updated successfully:", userresponse.data);
        } else {
          console.error("Image update failed:", userresponse.data);
        }
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };


  useEffect(() => {
    // Fetch farmer data from API or database based on farmerId
    const fetchFarmer = async () => {
      try {
        const response = await getFarmerById(id);
        setAvatarUrl(response.profileImage);
        setBannerUrl(response.bannerImage);
        setFarmer(response);
      } catch (error) {
        console.error("Failed to fetch farmer:", error);
      }
    };
    // Update farmer state with fetched data
    fetchFarmer();
  }, [id]);

  useEffect(() => {
    if (farmer) {
      const fetchProducts = async () => {
        try {
          const response = await getMyAuctions(farmer._id);
          setProducts(response);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };
      fetchProducts();
    }
  }, [farmer]);

  const showManageOptions = false;

  return (
    <div className="min-h-screen flex flex-col bg-green-50 dark:bg-gray-900">
      {/* <Navbar /> */}
      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Home</span>
          </Link>

          {/* Farmer Profile Header */}
          <div className="mb-10 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-green-100 dark:border-gray-700">
            <div className="relative h-48 bg-gradient-to-r from-green-600 to-green-400">
              <Input
                type="file"
                accept="image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                onChange={handleBannerUpload}
                disabled={uploading}
              />
              {/* <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[url('https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"></div> */}
            </div>

            <div className="relative px-6 pt-16 pb-8 sm:px-8">
              {/* Avatar */}
              <div className="absolute -top-16 left-6 sm:left-8">
                <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-lg">
                  <AvatarImage src={avatarUrl} alt={farmer?.name} />
                  <AvatarFallback className="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 text-4xl font-medium">
                    {farmer?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </Avatar>
              </div>

              <div className="md:flex md:justify-between md:items-end">
                <div>
                  <h1 className="text-3xl font-bold text-green-900 dark:text-green-100">
                    {farmer?.name}
                  </h1>
                  <div className="flex items-center mt-2 text-green-700 dark:text-green-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{farmer?.location}</span>
                  </div>

                  <div className="flex items-center mt-1 text-green-700 dark:text-green-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Farming since {farmer?.experience} years</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {farmerDemo.specialties.map((specialty, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-5 w-5 fill-current" />
                    <span className="ml-1 font-semibold text-gray-800 dark:text-gray-200">
                      {/* {farmer.rating} */}
                      4.8
                    </span>
                    <span className="ml-1 text-gray-600 dark:text-gray-400">
                      {/* ({farmer.reviews} reviews) */}
                       reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="md:col-span-1 space-y-6 w-full">
              {/* About Section */}
              <Card className="dark:bg-gray-800 dark:border-gray-700 w-full">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-300">
                    About
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">
                    {farmerDemo.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Certifications Section */}
              <Card className="dark:bg-gray-800 dark:border-gray-700 w-full">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-300">
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {farmerDemo.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-center p-2 bg-green-50 dark:bg-green-900/30 rounded-md"
                    >
                      <Wheat className="text-green-600 dark:text-green-400 mr-2 h-5 w-5" />
                      <span className="text-green-800 dark:text-green-200">
                        {cert}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card className="dark:bg-gray-800 dark:border-gray-700 w-full">
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-300">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="text-green-600 dark:text-green-400 mr-2 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {farmer?.phone}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="text-green-600 dark:text-green-400 mr-2 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {farmer?.email}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="md:col-span-2 w-full">
              <Card className="dark:bg-gray-800 dark:border-gray-700 w-full">
                <div className="flex place-content-between">
                  <CardHeader>
                    <CardTitle className="text-green-800 dark:text-green-300">
                      Listed Products
                    </CardTitle>
                    <CardDescription className="dark:text-gray-400">
                      Fresh produce from {farmer?.name}'s farm
                    </CardDescription>
                  </CardHeader>
                  <Link to="/product-form">
                    <Button
                      className="bg-green-600 hover:bg-green-700 mt-5 mr-4"
                      size="lg"
                    >
                      <Plus className="mr-2 h-4 w-4" /> List New Product
                    </Button>
                  </Link>
                </div>
                <CardContent className="px-4 md:px-8 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products?.map((product) => (
                      <div
                        key={product._id}
                        className="border border-green-100 dark:border-green-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <Card key={product._id} className="overflow-hidden p-0">
                          <div className="relative">
                            <div className="relative h-72 w-full">
                              <img
                                src={product?.images[0] || "img/1.jpg"}
                                alt={product?.description}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute top-2 right-2">
                              <Badge
                                variant="outline"
                                className="bg-white/90 text-black font-medium"
                              >
                                {product?.category}
                              </Badge>
                            </div>
                            {product.reserveMet === false && (
                              <div className="absolute bottom-2 right-2">
                                <Badge
                                  variant="outline"
                                  className="bg-amber-500/90 text-white"
                                >
                                  Reserve not met
                                </Badge>
                              </div>
                            )}
                          </div>

                          <CardContent className="p-4 pt-0">
                            <div className="mb-2">
                              <h3 className="font-semibold text-2xl line-clamp-1">
                                {product.product}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                by {product?.farmerId?.name}
                              </p>
                            </div>

                            <div className="flex justify-between items-center mb-3">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Current Price
                                </p>
                                <p className="text-lg font-bold">
                                  ₹{product?.currentBid.toLocaleString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">
                                  Apply
                                </p>
                                <p className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {product?.highestBidder.length}
                                </p>
                              </div>
                            </div>

                            {showManageOptions ? (
                              <div className="grid grid-cols-2 gap-2">
                                <Button variant="outline" size="sm">
                                  <a
                                    href={`/product/${product._id}`}
                                    className="flex items-center"
                                  >
                                    <Eye className="h-4 w-4 mr-1" /> View
                                  </a>
                                </Button>
                                <Button variant="outline" size="sm">
                                  <a
                                    href={`/product/${product._id}/stats`}
                                    className="flex items-center"
                                  >
                                    <BarChart2 className="h-4 w-4 mr-1" /> Stats
                                  </a>
                                </Button>
                              </div>
                            ) : (
                              <Button className="w-full">
                                <a href={`/farmer-product/${product._id}`}>
                                  View Product
                                </a>
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-green-100 dark:border-gray-700 pt-6 pb-6 px-8">
                  <Button
                    variant="outline"
                    className="w-full justify-center border-green-600 dark:border-green-600 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 py-6"
                  >
                    View All Products
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default FarmerProfile;
