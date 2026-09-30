import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Message() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", form);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input 
                            name="name" 
                            placeholder="Your Name" 
                            value={form.name} 
                            onChange={handleChange} 
                            className="bg-background text-foreground" 
                        />
                        <Input 
                            type="email" 
                            name="email" 
                            placeholder="Your Email" 
                            value={form.email} 
                            onChange={handleChange} 
                            className="bg-background text-foreground" 
                        />
                        <Textarea 
                            name="message" 
                            placeholder="Your Message" 
                            value={form.message} 
                            onChange={handleChange} 
                            className="bg-background text-foreground" 
                        />
                        <Button type="submit" className="w-full">Send</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
