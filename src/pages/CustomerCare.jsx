import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Phone,
    MessageSquare,
    Search,
    ChevronDown,
    ArrowRight,
} from "lucide-react";

const faqs = [
    {
        question: "How can I track my order?",
        answer: "You can track your order from the orders section in your account dashboard.",
    },
    {
        question: "What is your refund policy?",
        answer: "Refunds are processed within 5-7 business days after approval.",
    },
    {
        question: "How do I change my account email?",
        answer: "Navigate to settings → profile → update email.",
    },
    {
        question: "What payment methods are supported?",
        answer: "We support credit cards, debit cards, and UPI payments.",
    },
];

const contactMethods = [
    {
        icon: <MessageSquare size={26} />,
        title: "Live Chat",
        desc: "Chat instantly with our support team",
    },
    {
        icon: <Mail size={26} />,
        title: "Email Support",
        desc: "We respond within 24 hours",
    },
    {
        icon: <Phone size={26} />,
        title: "Phone Support",
        desc: "Mon-Fri from 9am to 5pm",
    },
];

const CustomerCare = () => {
    const [active, setActive] = useState(null);
    const [search, setSearch] = useState("");

    const filteredFaqs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 overflow-hidden">

            {/* HERO */}
            <header className="relative pt-28 pb-36 text-center overflow-hidden">

                {/* animated gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-100 via-purple-50 to-white animate-pulse" />

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl font-black mb-6"
                >
                    How can we help?
                </motion.h1>

                <p className="text-lg text-slate-500 mb-10">
                    Find answers or contact our support team
                </p>

                {/* SEARCH */}
                <div className="max-w-xl mx-auto relative">
                    <Search className="absolute left-5 top-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search help articles..."
                        className="w-full pl-14 pr-6 py-4 rounded-2xl border bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6">

                {/* CONTACT CARDS */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {contactMethods.map((method, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -6 }}
                            className="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition"
                        >

                            {/* spotlight effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-blue-50 to-transparent rounded-3xl" />

                            <div className="mb-6 text-blue-600">{method.icon}</div>

                            <h3 className="text-xl font-bold mb-2">{method.title}</h3>

                            <p className="text-slate-500 mb-6">{method.desc}</p>

                            <div className="flex items-center font-semibold text-blue-600">
                                Get Started
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ SECTION */}
                <section className="pb-32">

                    <h2 className="text-3xl font-bold mb-10">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {filteredFaqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setActive(active === index ? null : index)}
                                    className="w-full flex justify-between items-center p-6 text-left"
                                >
                                    <span className="font-semibold">{faq.question}</span>
                                    <ChevronDown
                                        className={`transition-transform ${active === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {active === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-6 pb-6 text-slate-500"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default CustomerCare;