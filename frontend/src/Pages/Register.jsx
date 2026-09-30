import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent } from "@/src/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/src/App";
import useTokenStore from "../http/store";
import { createUser } from "../http/api";
import { useMutation } from "@tanstack/react-query";
import { set } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/src/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
} from "lucide-react";


import { toast } from "sonner";
const formSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email({ message: "Invalid email address" }),
  phone: zod.string().min(10, "Phone number must be at least 10 digits"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: zod.string().min(1, "Confirm Password is required"),
  role: zod.enum(["farmer", "vendor"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});


export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "farmer",
    },
  });

  const setToken = useTokenStore((state) => state.setToken);
  const setRole = useTokenStore((state) => state.setRole);
  const setName = useTokenStore((state) => state.setName);
  const setUserId = useTokenStore((state) => state.setUserId);
  const mutation = useMutation({

      mutationFn: createUser,
      onSuccess: (res) => {
        console.log("login success", res.token);
        //redirect to dashboard
        setToken(res.token);
        setRole(res.role);
        setName(res.name);
        setUserId(res.userId);
        // auto reload the page after login
        toast.success("Registration successful");
        navigate("/");
        setLoading(false);
      },
    })

  async function onSubmit(values) {
    console.log("Form values:", values);
    setLoading(true);

    if (!values.email || !values.password) {
      toast.error("Please enter email and password");
    }
    if (values.password !== values.confirmPassword) {
      // Show Toast Form password not matching
    } else {
      mutation.mutate({
        name: values.name,
        email: values.email,
        phone: values.phone,
        address: values.address,
        experience: values.experience,
        password: values.password,
        role: values.role,
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="flex max-w-4xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mt-12 mb-12">
        <div className="w-1/2 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-700 dark:to-green-900 text-white p-8 ">
          <h2 className="text-2xl font-bold">AgriConnect</h2>
          <p className="mt-2">
            Join our growing community of farmers and wholesalers
          </p>

          <div className="mt-6">
            <h3 className="font-semibold">Benefits of Registration</h3>
            <ul className="mt-2 space-y-2">
              <li>✅ Create your market profile</li>
              <li>✅ Access to exclusive deals</li>
              <li>✅ Direct communication with buyers/sellers</li>
              <li>✅ Free market insights and analytics</li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 p-8 dark:bg-gray-800">
          <h2 className="text-xl font-bold text-center text-green-700 dark:text-green-500">
            Create Account
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
            Fill in your details to register
          </p>

          <Card className="dark:bg-gray-700 border-0">
            <CardContent className="pt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter your 10-digit phone number"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Address"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter the No. of years of experience"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                                            {/* <div className="grid gap-6 md:grid-cols-2"> */}
                            {/* <FormField
                              control={form.control}
                              name="harvestDate"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Harvest Date*</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal focus-visible:ring-green-500",
                                            !field.value &&
                                              "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-auto p-0 pointer-events-auto"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date > new Date() ||
                                          date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            /> */}

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a password"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I am registering as a</FormLabel>
                        <FormControl>
                          <RadioGroup
                            className="flex space-x-4"
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={loading}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="farmer" id="reg-farmer" />
                              <FormLabel
                                htmlFor="reg-farmer"
                                className="cursor-pointer"
                              >
                                Farmer
                              </FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="vendor" id="reg-vendor" />
                              <FormLabel
                                htmlFor="reg-vendor"
                                className="cursor-pointer"
                              >
                                Vendor
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-green-700 dark:bg-green-600 dark:hover:bg-green-500"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>

                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Already have an account?
                    </p>
                    <Link to="/login" className="block mt-2">
                      <Button
                        variant="outline"
                        className="w-full border-green-700 text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-900/30"
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
