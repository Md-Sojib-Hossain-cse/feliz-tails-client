import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import "./Faq.css";
import SectionTitle from "@/Components/SectionTitle/SectionTitle";

const Faq = () => {
    return (
        <section className="faq-bg mt-6 md:mt-8 lg:mt-12 xl:mt-16 px-4 md:px-6 lg:px-12 xl:px-24  min-h-screen pt-6 md:pt-10 lg:pt-16 xl:pt-20">
            <SectionTitle
                heading="Frequently Asked Questions"
                subHeading="Answers to Your Adoption Queries"
            ></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center">
                <div className="flex justify-center items-center">
                    <img src="https://i.ibb.co/m4zWfzV/confused-Dog.jpg" alt="confused dog" className="w-2/3 rounded-lg border-4 border-gray-200 shadow-lg" />
                </div>
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How do I adopt a pet?</AccordionTrigger>
                            <AccordionContent>
                                Browse, choose, and contact the shelter to start the adoption process.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>What is the adoption fee?</AccordionTrigger>
                            <AccordionContent>
                                Fees vary by pet and include necessary vaccinations.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Can I return a pet?</AccordionTrigger>
                            <AccordionContent>
                                Yes, most shelters allow returns within a specified period.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default Faq;