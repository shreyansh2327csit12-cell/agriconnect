import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";

const currentAuctionsMock = [
    {
        id: 1,
        item: "Vintage Painting",
        currentBid: 1200,
        endTime: "2024-03-20T15:00:00",
        bids: 15,
        status: "active"
    },
    {
        id: 2,
        item: "Rare Coin Collection",
        currentBid: 8500,
        endTime: "2024-03-18T10:00:00",
        bids: 8,
        status: "ending"
    }
];

const auctionHistory = [
    {
        id: 3,
        item: "Antique Chair",
        winner: "john@example.com",
        finalBid: 450,
        endTime: "2024-03-10T14:00:00",
        status: "completed"
    },
];

export default function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentAuctions, setCurrentAuctions] = useState(currentAuctionsMock);
    const [newProduct, setNewProduct] = useState({
        id: "",
        title: "",
        price: "",
        description: "",
        rating: "",
        imageUrl: "",
        link: ""
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    useEffect(() => {
        try {
            const token = localStorage.getItem("user-store");
            if (token) {
                const userData = JSON.parse(token);
                setIsAdmin(userData?.state?.role === "admin");
            } else {
                setIsAdmin(false);
            }
        } catch (error) {
            console.error("Error accessing user data:", error);
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDeleteAuction = (auctionId) => {
        setCurrentAuctions(prev => prev.filter(auction => auction.id !== auctionId));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);
        
        try {
            const productData = {
                ...newProduct,
                price: parseFloat(newProduct.price),
                rating: parseFloat(newProduct.rating)
            };
            
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product');
            }            
            const result = await response.json();
            console.log("Product added successfully:", result);
            setSubmitSuccess(true);
            setNewProduct({
                id: "",
                title: "",
                price: "",
                description: "",
                rating: "",
                imageUrl: "",
                link: ""
            });
            
            setTimeout(() => {
                setIsDialogOpen(false);
                setSubmitSuccess(false);
            }, 1500);
            
        } catch (error) {
            console.error("Error adding product:", error);
            setSubmitError(error.message || 'Failed to add product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-gray-100">
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center dark:bg-gray-900">
                <Card className="w-full max-w-md dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription className="dark:text-gray-400">
                            You don't have permission to access the admin panel.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => window.location.href = "/"} className="w-full">
                            Return to Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    
                    <div className="flex gap-4">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">Add New Product</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                                <DialogHeader>
                                    <DialogTitle>Add New Product</DialogTitle>
                                    <DialogDescription className="dark:text-gray-400">
                                        Enter the details for the new product. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                
                                <form onSubmit={handleAddProduct}>
                                    <div className="grid gap-4 py-4">
                                        {submitError && (
                                            <div className="col-span-4 p-3 text-sm text-white bg-red-500 rounded-md">
                                                {submitError}
                                            </div>
                                        )}
                                        
                                        {submitSuccess && (
                                            <div className="col-span-4 p-3 text-sm text-white bg-green-500 rounded-md">
                                                Product added successfully!
                                            </div>
                                        )}
                                    
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="ProductID" className="text-right dark:text-gray-300">
                                                ProductID
                                            </Label>
                                            <Input
                                                id="id"
                                                name="id"
                                                value={newProduct.id}
                                                onChange={handleInputChange}
                                                className="col-span-3 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="title" className="text-right dark:text-gray-300">
                                                Title
                                            </Label>
                                            <Input
                                                id="title"
                                                name="title"
                                                value={newProduct.title}
                                                onChange={handleInputChange}
                                                className="col-span-3 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="price" className="text-right dark:text-gray-300">
                                                Price
                                            </Label>
                                            <Input
                                                id="price"
                                                name="price"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={newProduct.price}
                                                onChange={handleInputChange}
                                                className="col-span-3 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="description" className="text-right dark:text-gray-300">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={newProduct.description}
                                                onChange={handleInputChange}
                                                className="col-span-3 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                rows={3}
                                                required
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="rating" className="text-right dark:text-gray-300">
                                                Rating
                                            </Label>
                                            <Input
                                                id="rating"
                                                name="rating"
                                                type="number"
                                                min="0"
                                                max="5"
                                                step="0.1"
                                                value={newProduct.rating}
                                                onChange={handleInputChange}
                                                className="col-span-3 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="image" className="text-right dark:text-gray-300">
                                                Image URL
                                            </Label>
                                            <Input
                                                id="imageUrl"
                                                name="imageUrl"
                                                value={newProduct.imageUrl}
                                                onChange={handleInputChange}
                                                className="col-span-3 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="Link" className="text-right dark:text-gray-300">
                                                Ecommerce Link
                                            </Label>
                                            <Input
                                                id="link"
                                                name="link"
                                                value={newProduct.link}
                                                onChange={handleInputChange}
                                                className="col-span-3 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <DialogFooter>
                                        <Button 
                                            type="button" 
                                            variant="outline" 
                                            onClick={() => setIsDialogOpen(false)}
                                            className="dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            className="dark:bg-primary dark:text-primary-foreground"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Saving...' : 'Save Product'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-xl font-semibold mb-4">Currently Running Auctions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {currentAuctions.map((auction) => (
                            <Card key={auction.id} className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle>{auction.item}</CardTitle>
                                            <CardDescription className="mt-2 dark:text-gray-400">
                                                Current Bid: ${auction.currentBid.toLocaleString()}
                                            </CardDescription>
                                        </div>
                                        <Badge variant={auction.status === "active" ? "default" : "destructive"}>
                                            {auction.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                                                Edit Auction
                                            </Button>
                                            <Button size="sm">View Details</Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="ml-auto"
                                                    >
                                                        Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                                                        <AlertDialogDescription className="dark:text-gray-400">
                                                            Are you sure you want to delete this auction? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600">
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteAuction(auction.id)}
                                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                        >
                                                            Confirm Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Order History</h2>
                    <Card className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                        <CardContent className="p-6">
                            <Table>
                                <TableHeader>
                                    <TableRow className="dark:border-gray-700">
                                        <TableHead className="dark:text-gray-300">Item</TableHead>
                                        <TableHead className="dark:text-gray-300">Winner</TableHead>
                                        <TableHead className="dark:text-gray-300">Final Bid</TableHead>
                                        <TableHead className="dark:text-gray-300">End Date</TableHead>
                                        <TableHead className="dark:text-gray-300">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {auctionHistory.map((history) => (
                                        <TableRow key={history.id} className="dark:border-gray-700">
                                            <TableCell className="font-medium">{history.item}</TableCell>
                                            <TableCell>{history.winner}</TableCell>
                                            <TableCell>${history.finalBid.toLocaleString()}</TableCell>
                                            <TableCell>
                                                {new Date(history.endTime).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-300">
                                                    {history.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}