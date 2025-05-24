import Link from "next/link";
import { ChevronLeft, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-black text-white py-16">
                <div className="container mx-auto px-4">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm mb-6 hover:underline"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-light">
                        Contact Us
                    </h1>
                    <p className="text-neutral-300 mt-4 max-w-2xl">
                        We'd love to hear from you. Get in touch with our team
                        for any questions or assistance.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-light mb-8">
                                Get in Touch
                            </h2>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <MapPin className="h-6 w-6 text-neutral-600 mt-1" />
                                    <div>
                                        <h3 className="font-medium mb-2">
                                            Visit Our Store
                                        </h3>
                                        <p className="text-neutral-600">
                                            123 Luxury Lane
                                            <br />
                                            Fragrance District, FL 12345
                                            <br />
                                            United States
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Phone className="h-6 w-6 text-neutral-600 mt-1" />
                                    <div>
                                        <h3 className="font-medium mb-2">
                                            Call Us
                                        </h3>
                                        <p className="text-neutral-600">
                                            +1 (555) 123-4567
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            Monday - Friday, 9 AM - 6 PM EST
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Mail className="h-6 w-6 text-neutral-600 mt-1" />
                                    <div>
                                        <h3 className="font-medium mb-2">
                                            Email Us
                                        </h3>
                                        <p className="text-neutral-600">
                                            info@kanzaroyalperfumery.com
                                        </p>
                                        <p className="text-sm text-neutral-500">
                                            We'll respond within 24 hours
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Clock className="h-6 w-6 text-neutral-600 mt-1" />
                                    <div>
                                        <h3 className="font-medium mb-2">
                                            Store Hours
                                        </h3>
                                        <div className="text-neutral-600 space-y-1">
                                            <p>Monday - Friday: 10 AM - 8 PM</p>
                                            <p>Saturday: 10 AM - 6 PM</p>
                                            <p>Sunday: 12 PM - 5 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-light mb-8">
                                Send us a Message
                            </h2>
                            <form className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">
                                            First Name
                                        </Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        type="text"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        rows={6}
                                        className="mt-1"
                                        placeholder="Tell us how we can help you..."
                                    />
                                </div>

                                <Button className="w-full bg-black hover:bg-black/80">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
